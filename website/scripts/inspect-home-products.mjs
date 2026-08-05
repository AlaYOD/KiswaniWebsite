import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const width = Number(process.env.WIDTH || 1440);
const height = width === 375 ? 812 : width === 768 ? 1024 : 900;
const output = [];

for (const [label, url] of [
  ['source', process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app'],
  ['target', process.env.TARGET_URL || 'http://localhost:8088'],
]) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.evaluate(async () => document.fonts?.ready);
  output.push(await page.evaluate((siteLabel) => {
    const section = document.querySelector('#products');
    const inner = siteLabel === 'source' ? section?.querySelector(':scope > div.relative.z-10') : section?.querySelector('.ks-products__inner');
    const head = inner?.children[0];
    const grid = siteLabel === 'source' ? inner?.children[1] : section?.querySelector('.ks-product-grid');
    const cards = [...(grid?.children || [])].filter((node) => node.getBoundingClientRect().height > 0);
    const read = (node) => {
      if (!node) return null;
      const rect = node.getBoundingClientRect();
      const css = getComputedStyle(node);
      return {
        rect: [rect.left, rect.top + scrollY, rect.width, rect.height].map((value) => Math.round(value * 100) / 100),
        display: css.display,
        grid: css.gridTemplateColumns,
        gap: css.gap,
        margin: [css.marginTop, css.marginRight, css.marginBottom, css.marginLeft],
        padding: [css.paddingTop, css.paddingRight, css.paddingBottom, css.paddingLeft],
        transform: css.transform,
      };
    };
    return {
      label: siteLabel,
      section: read(section),
      inner: read(inner),
      head: read(head),
      grid: read(grid),
      cards: cards.map(read),
      firstCardChildren: cards[0] ? [...cards[0].children].map(read) : [],
    };
  }, label));
  await context.close();
}

console.log(JSON.stringify(output, null, 2));
await browser.close();
