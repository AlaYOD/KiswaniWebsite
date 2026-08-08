/**
 * Typography parity checker.
 *
 * Walks every element that owns visible text on both the deployed source and the
 * WordPress target, matches them by their text content (class names differ
 * between the two), and reports any difference in font family, size, weight,
 * line-height, or letter-spacing. Results are grouped by target selector so each
 * line is one fix rather than one occurrence.
 *
 * This catches what the pixel comparison cannot: a label at the wrong weight or
 * a numeral at the wrong size is only a few hundred pixels, far below the 2%
 * whole-page gate, but is plainly wrong when you look at it.
 *
 *   $env:W = '1440'          # viewport width, default 1440
 *   $env:ROUTES = '/,/about' # comma-separated, defaults to the main routes
 *   node scripts/typography-parity.mjs
 */

import { chromium } from 'playwright';

const routes = (process.env.ROUTES || '/,/collections/decorative,/products/kl-gl-001,/projects,/checkout,/about,/support,/privacy,/terms').split(',');
const width = Number(process.env.W || 1440);
const SOURCE = 'https://kiswani-website-82jb.vercel.app';
const TARGET = 'http://localhost:8088';

const collect = () => {
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const seen = new Map();
  const out = [];

  const pathOf = (el) => {
    const parts = [];
    for (let n = el; n && n.tagName && parts.length < 4; n = n.parentElement) {
      const cls = String(n.className || '').split(' ').filter((c) => c && !/^(is-|has-)/.test(c))[0];
      parts.unshift(n.tagName.toLowerCase() + (cls ? '.' + cls : ''));
      if (cls && cls.startsWith('ks-')) break;
    }
    return parts.join(' > ');
  };

  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('[hidden]')) continue;
    const tag = el.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') continue;

    let own = '';
    for (const node of el.childNodes) if (node.nodeType === 3) own += node.nodeValue;
    own = norm(own);
    if (own.length < 2) continue;

    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;

    const key = own.slice(0, 60);
    const ordinal = (seen.get(key) ?? 0) + 1;
    seen.set(key, ordinal);

    out.push({
      key: `${key}#${ordinal}`,
      text: key,
      path: pathOf(el),
      family: cs.fontFamily.split(',')[0].replace(/["']/g, ''),
      size: cs.fontSize,
      weight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      spacing: cs.letterSpacing,
      // Wrapping mode changes where lines break even when every metric matches.
      wrap: cs.textWrap || cs.textWrapStyle || '',
    });
  }
  return out;
};

const browser = await chromium.launch();
const findings = new Map();
let compared = 0;

for (const route of routes) {
  const grab = async (base) => {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: 'networkidle', timeout: 90000 });
    await page.evaluate(() => document.fonts?.ready);
    await page.evaluate(() => {
      document.querySelectorAll('section[role="status"], .ks-cinematic-intro, #brandIntro').forEach((n) => n.remove());
    });
    await page.waitForTimeout(400);
    const data = await page.evaluate(collect);
    await ctx.close();
    return data;
  };

  const src = await grab(SOURCE);
  const tgt = await grab(TARGET);
  const tgtByKey = new Map(tgt.map((e) => [e.key, e]));

  for (const s of src) {
    const t = tgtByKey.get(s.key);
    if (!t) continue;
    compared += 1;
    const diffs = [];
    for (const prop of ['family', 'size', 'weight', 'lineHeight', 'spacing', 'wrap']) {
      if (s[prop] !== t[prop]) diffs.push(`${prop} src=${s[prop]} wp=${t[prop]}`);
    }
    if (!diffs.length) continue;
    // Group identical problems on the same target selector.
    const sig = `${t.path} :: ${diffs.join(' | ')}`;
    if (!findings.has(sig)) findings.set(sig, { path: t.path, diffs, routes: new Set(), samples: new Set() });
    const f = findings.get(sig);
    f.routes.add(route);
    if (f.samples.size < 3) f.samples.add(s.text.slice(0, 34));
  }
}

await browser.close();

const list = [...findings.values()].sort((a, b) => b.routes.size - a.routes.size);
console.log(`viewport ${width}px — ${compared} matched elements, ${list.length} distinct typography problems\n`);
for (const f of list) {
  console.log(`${f.path}`);
  console.log(`   routes : ${[...f.routes].join(', ')}`);
  console.log(`   sample : ${[...f.samples].map((s) => `"${s}"`).join(', ')}`);
  for (const d of f.diffs) console.log(`   ${d}`);
  console.log();
}
