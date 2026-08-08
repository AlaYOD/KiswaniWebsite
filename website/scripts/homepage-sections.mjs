/**
 * Section-by-section homepage parity.
 *
 * A whole-page pixel average hides localized breakage — a completely wrong
 * header on a tall page still scores under 1%. This crops each top-level region
 * (header, every `main > section`, footer) out of both full-page captures and
 * scores them independently, so each section gets its own number.
 *
 *   $env:TARGET_URL = 'http://localhost:8088'
 *   $env:W = '1440'      # optional, defaults to all of 375/768/1440
 *   node scripts/homepage-sections.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { chromium } from 'playwright';

const sourceBase = process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app';
const targetBase = process.env.TARGET_URL || 'http://localhost:8088';
const route = process.env.ROUTE || '/';
const viewports = process.env.W
  ? [{ name: process.env.W, width: Number(process.env.W), height: 900 }]
  : [
      { name: '375', width: 375, height: 812 },
      { name: '768', width: 768, height: 1024 },
      { name: '1440', width: 1440, height: 900 },
    ];

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputDirectory = path.join('output', 'playwright', 'homepage-sections', timestamp);
await mkdir(outputDirectory, { recursive: true });

const regionScript = () => {
  const out = [];
  const label = (el, fallback) => {
    const heading = el.querySelector('h1, h2');
    const text = heading?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 28);
    return text || fallback;
  };
  const push = (name, el) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    out.push({ name, y: Math.round(r.top + scrollY), h: Math.round(r.height) });
  };

  // Both builds contain more than one <header>/<footer> — the mobile drawer and
  // the cart drawer have their own. Take the largest rendered one, which is the
  // page-level landmark.
  const largest = (selector) =>
    [...document.querySelectorAll(selector)]
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.width > 0 && r.height > 0)
      .sort((a, b) => b.r.width * b.r.height - a.r.width * a.r.height)[0]?.el;

  push('header', largest('header'));

  // Every direct child of <main>, not just <section>. The gold motif divider is a
  // bare <div> between two sections, so a section-only sweep never compared it —
  // and it was rendering vertically instead of horizontally the whole time.
  [...(document.querySelector('main')?.children ?? [])].forEach((node, i) => {
    const rect = node.getBoundingClientRect();
    if (rect.height < 2) return;
    push(`${String(i).padStart(2, '0')}-${node.tagName.toLowerCase()}-${label(node, node.className ? String(node.className).split(' ')[0] : 'block')}`, node);
  });

  push('footer', largest('footer'));
  return out;
};

const capture = async (page, url, screenshotPath) => {
  await page.addInitScript(() => window.sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await page.addStyleTag({
    content: `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important;caret-color:transparent!important}
      section[role="status"],.ks-cinematic-intro,#brandIntro{display:none!important}`,
  });
  await page.evaluate(() => document.fonts?.ready);
  await page.evaluate(async () => {
    for (const image of document.images) image.loading = 'eager';
    const step = Math.max(320, Math.floor(window.innerHeight * 0.75));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map(async (image) => {
        if (!image.complete) await new Promise((r) => { image.addEventListener('load', r, { once: true }); image.addEventListener('error', r, { once: true }); });
        if (image.naturalWidth > 0) await image.decode?.().catch(() => {});
      }),
    );
  });
  await page.evaluate(() => {
    document.querySelectorAll('section[role="status"], .ks-cinematic-intro, #brandIntro').forEach((n) => n.remove());
    document.body.style.overflow = '';
  });
  await page.waitForFunction(() => (document.body?.innerText ?? '').trim().length > 500, undefined, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: screenshotPath, fullPage: true, scale: 'css' });
  const text = await page.evaluate(() => (document.body?.innerText ?? '').trim());
  if (text.length < 120 || /This page couldn.t load|Application error|GATEWAY_TIMEOUT/i.test(text)) {
    throw new Error(`unusable render (${text.length} chars): ${JSON.stringify(text.slice(0, 100).replace(/\s+/g, ' '))}`);
  }

  const regions = await page.evaluate(regionScript);
  // A partly-hydrated render can pass the text check yet expose no landmarks.
  if (regions.length < 3) {
    throw new Error(`render exposed only ${regions.length} region(s); page did not finish laying out`);
  }
  return regions;
};

const cropRegion = (png, y, h) => {
  const top = Math.max(0, Math.min(y, png.height - 1));
  const height = Math.max(1, Math.min(h, png.height - top));
  const out = new PNG({ width: png.width, height });
  PNG.bitblt(png, out, 0, top, png.width, height, 0, 0);
  return out;
};

const padTo = (image, width, height) => {
  const canvas = new PNG({ width, height, fill: true });
  for (let i = 0; i < canvas.data.length; i += 4) {
    canvas.data[i] = 255; canvas.data[i + 1] = 255; canvas.data[i + 2] = 255; canvas.data[i + 3] = 255;
  }
  PNG.bitblt(image, canvas, 0, 0, Math.min(image.width, width), Math.min(image.height, height), 0, 0);
  return canvas;
};

const browser = await chromium.launch();
let worst = 0;

try {
  for (const viewport of viewports) {
    const sourcePath = path.join(outputDirectory, `${viewport.name}-source.png`);
    const targetPath = path.join(outputDirectory, `${viewport.name}-target.png`);

    // The deployed reference frequently fails its client render, and once a page
    // is in that state a reload does not recover it — each attempt needs a fresh
    // page.
    const captureWithRetry = async (url, file) => {
      let lastError;
      for (let attempt = 1; attempt <= 4; attempt += 1) {
        const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        try {
          return await capture(page, url, file);
        } catch (error) {
          lastError = error;
          await page.waitForTimeout(2500);
        } finally {
          await page.close();
        }
      }
      throw lastError;
    };

    let sourceRegions;
    let targetRegions;
    try {
      sourceRegions = await captureWithRetry(sourceBase + route, sourcePath);
      targetRegions = await captureWithRetry(targetBase + route, targetPath);
    } catch (error) {
      console.log(`\n=== ${viewport.name}px === capture failed: ${error.message}`);
      continue;
    }

    const sourceImage = PNG.sync.read(await (await import('node:fs/promises')).readFile(sourcePath));
    const targetImage = PNG.sync.read(await (await import('node:fs/promises')).readFile(targetPath));

    console.log(`\n=== ${viewport.name}px ===`);
    if (sourceRegions.length !== targetRegions.length) {
      console.log(`STRUCTURAL: source has ${sourceRegions.length} regions, target has ${targetRegions.length}`);
      console.log('   source:', sourceRegions.map((r) => r.name).join(', '));
      console.log('   target:', targetRegions.map((r) => r.name).join(', '));
    }

    console.log(`${'section'.padEnd(34)}${'src y,h'.padEnd(16)}${'wp y,h'.padEnd(16)}${'diff'.padStart(8)}`);
    const count = Math.min(sourceRegions.length, targetRegions.length);
    for (let i = 0; i < count; i += 1) {
      const s = sourceRegions[i];
      const t = targetRegions[i];
      const sourceCrop = cropRegion(sourceImage, s.y, s.h);
      const targetCrop = cropRegion(targetImage, t.y, t.h);
      const width = Math.max(sourceCrop.width, targetCrop.width);
      const height = Math.max(sourceCrop.height, targetCrop.height);
      const a = padTo(sourceCrop, width, height);
      const b = padTo(targetCrop, width, height);
      const diff = new PNG({ width, height });
      const mismatched = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.1, includeAA: false });
      const percent = (mismatched / (width * height)) * 100;
      worst = Math.max(worst, percent);
      const flag = percent > 2 ? '  <== FAIL' : '';
      if (percent > 1) await writeFile(path.join(outputDirectory, `${viewport.name}-${s.name.replace(/[^\w-]/g, '_')}-diff.png`), PNG.sync.write(diff));
      console.log(
        `${s.name.slice(0, 33).padEnd(34)}${`${s.y},${s.h}`.padEnd(16)}${`${t.y},${t.h}`.padEnd(16)}${percent.toFixed(2).padStart(7)}%${flag}`,
      );
    }

  }
} finally {
  await browser.close();
}

console.log(`\nartifacts: ${outputDirectory}`);
console.log(worst > 2 ? `WORST SECTION ${worst.toFixed(2)}% — above the 2% gate` : `All sections within 2% (worst ${worst.toFixed(2)}%)`);
