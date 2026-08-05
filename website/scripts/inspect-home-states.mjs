import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const targets = [
  ['source', process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app'],
  ['target', process.env.TARGET_URL || 'http://localhost:8088'],
];

const readState = async (page, label, state) => {
  if (state === 'product') {
    if (label === 'source') {
      await page.getByRole('button', { name: 'View details' }).first().click();
      await page.getByRole('dialog', { name: /Golden Wall Lamp/i }).waitFor({ state: 'visible' });
    } else {
      await page.locator('[data-ks-product-open]').first().click();
      await page.locator('[data-ks-product-modal]').waitFor({ state: 'visible' });
    }
  } else if (label === 'source') {
    await page.getByRole('dialog').waitFor({ state: 'visible' });
  } else {
    await page.locator('[data-ks-contact-drawer]').waitFor({ state: 'visible' });
    await page.locator('[data-ks-contact-drawer] [role="dialog"]').waitFor({ state: 'visible' });
  }
  await page.waitForTimeout(250);
  return page.evaluate((stateName) => {
    const rect = (node) => {
      const r = node?.getBoundingClientRect();
      return r ? [r.left, r.top, r.width, r.height].map((v) => Math.round(v * 100) / 100) : null;
    };
    const css = (node) => {
      if (!node) return null;
      const s = getComputedStyle(node);
      return {
        display: s.display,
        position: s.position,
        background: s.backgroundColor,
        color: s.color,
        padding: s.padding,
        margin: s.margin,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        transform: s.transform,
        opacity: s.opacity,
      };
    };
    const dialog = [...document.querySelectorAll('[role="dialog"][aria-modal="true"]')].find((node) => {
      const r = node.getBoundingClientRect();
      const s = getComputedStyle(node);
      return r.width > 0 && r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden';
    }) || document.querySelector('[role="dialog"][aria-modal="true"]');
    const image = dialog?.querySelector('img');
    const headings = [...(dialog?.querySelectorAll('h1,h2,h3,strong,b,p,label,a,button,input,select,textarea') || [])]
      .slice(0, 32)
      .map((node) => ({
        tag: node.tagName,
        text: node.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80) || node.getAttribute('placeholder') || node.getAttribute('name') || '',
        rect: rect(node),
        css: css(node),
      }));
    return {
      dialog: { rect: rect(dialog), css: css(dialog), text: dialog?.textContent?.trim().replace(/\s+/g, ' ').slice(0, 400) },
      image: { rect: rect(image), src: image?.currentSrc || image?.src || null, natural: image ? [image.naturalWidth, image.naturalHeight] : null, css: css(image) },
      headings,
      stateName,
    };
  }, state);
};

for (const [label, url] of targets) {
  for (const state of (process.env.STATE ? [process.env.STATE] : ['product', 'contact'])) {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
    const initialUrl = state === 'contact' ? `${url.replace(/\/$/, '')}/#contact` : url;
    await page.goto(initialUrl, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(async () => document.fonts?.ready);
    const result = await readState(page, label, state);
    console.log(`${label} ${state}\n${JSON.stringify(result, null, 2)}`);
    await context.close();
  }
}

await browser.close();