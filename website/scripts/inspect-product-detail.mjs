import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const viewports = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
];
const pages = [
  ['source', 'https://kiswani-website-82jb.vercel.app/products/kl-gl-001'],
  ['target', 'http://localhost:8088/products/kl-gl-001/'],
];

const selectors = {
  header: '.ks-header, header',
  hero: '.ks-product-hero, main section:first-of-type',
  breadcrumb: '.ks-product-breadcrumb, nav[aria-label="Breadcrumb"], [class*=breadcrumb]',
  panel: '.ks-product-panel',
  media: '.ks-product-media',
  primary: '.ks-product-primary',
  thumbs: '.ks-product-thumbs',
  copy: '.ks-product-copy',
  kicker: '.ks-kicker',
  h1: '.ks-product-copy h1, h1',
  desc: '.ks-product-description',
  price: '.ks-product-price',
  summary: '.ks-product-summary',
  note: '.ks-product-note',
  quantity: '.ks-product-quantity',
  purchase: '.ks-product-purchase',
  specs: '.ks-product-specs',
  related: '.ks-product-related',
  cta: '.ks-product-cta',
  footer: 'footer',
};

function round(value) { return Math.round(value * 100) / 100; }

const browser = await chromium.launch({ headless: true });
const report = {};
try {
  for (const viewport of viewports) {
    report[viewport.name] = {};
    for (const [label, url] of pages) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.evaluate(() => {
        document.querySelectorAll('section[role="status"], .ks-cinematic-intro, #brandIntro').forEach((node) => node.remove());
        document.body.style.overflow = '';
      });
      await page.addStyleTag({ content: '*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}' });
      await page.evaluate(async () => document.fonts?.ready);
      await page.evaluate(async () => {
        const images = [...document.images];
        images.forEach((img) => { img.loading = 'eager'; });
        const step = Math.max(320, Math.floor(innerHeight * 0.75));
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        scrollTo(0, 0);
      });
      await page.waitForTimeout(300);
      report[viewport.name][label] = await page.evaluate((selectors) => {
        const round = (value) => Math.round(value * 100) / 100;
        const out = { scrollHeight: document.documentElement.scrollHeight, bodyClass: document.body.className, sections: {} };
        for (const [key, selector] of Object.entries(selectors)) {
          const node = document.querySelector(selector);
          if (!node) { out.sections[key] = null; continue; }
          const rect = node.getBoundingClientRect();
          const cs = getComputedStyle(node);
          out.sections[key] = {
            tag: node.tagName.toLowerCase(),
            className: String(node.className || ''),
            text: key === 'h1' || key === 'kicker' ? node.textContent.trim().replace(/\s+/g, ' ').slice(0, 120) : undefined,
            rect: { x: round(rect.x), y: round(rect.y + scrollY), w: round(rect.width), h: round(rect.height) },
            display: cs.display,
            gridTemplateColumns: cs.gridTemplateColumns,
            padding: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].join(' '),
            margin: [cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft].join(' '),
            font: key === 'h1' || key === 'desc' || key === 'kicker' ? `${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight} ${cs.fontFamily}` : undefined,
            color: key === 'h1' || key === 'desc' || key === 'kicker' ? cs.color : undefined,
          };
        }
        const firstImage = document.querySelector('.ks-product-primary img, main img');
        out.primaryImage = firstImage ? { src: firstImage.currentSrc || firstImage.src, natural: [firstImage.naturalWidth, firstImage.naturalHeight] } : null;
        return out;
      }, selectors);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile('output/playwright/product-detail-metrics.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
