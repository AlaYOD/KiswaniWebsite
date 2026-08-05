import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const bases = [
  ['source', process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app'],
  ['target', process.env.TARGET_URL || 'http://localhost:8088'],
];

for (const [label, base] of bases) {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(async () => document.fonts?.ready);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.locator('#mobile-navigation').waitFor({ state: 'visible' });
  const products = page.locator('#mobile-navigation').getByRole('button', { name: /^Products/ });

  const read = async (state) => page.evaluate((state) => {
    const aside = document.querySelector('#mobile-navigation');
    const body = aside.querySelector('nav');
    const head = aside.firstElementChild;
    const foot = aside.lastElementChild;
    const productButton = [...body.querySelectorAll('button')].find((button) => button.textContent.trim().startsWith('Products'));
    const panel = productButton?.parentElement?.children?.[1];
    const viewAll = panel?.querySelector('a');
    const cardCandidates = panel ? [...panel.querySelectorAll('a')].filter((link) => link !== viewAll && link.querySelector('img')) : [];
    const rect = (node) => {
      const value = node?.getBoundingClientRect();
      return value ? { x: value.x, y: value.y, width: value.width, height: value.height } : null;
    };
    const style = (node) => {
      if (!node) return null;
      const value = getComputedStyle(node);
      return {
        display: value.display,
        fontSize: value.fontSize,
        fontWeight: value.fontWeight,
        lineHeight: value.lineHeight,
        padding: value.padding,
        margin: value.margin,
        gap: value.gap,
      };
    };
    return {
      state,
      aside: rect(aside),
      head: rect(head),
      body: rect(body),
      foot: rect(foot),
      buttons: [...body.querySelectorAll('button')].slice(0, 5).map((node) => ({ rect: rect(node), style: style(node) })),
      panel: rect(panel),
      viewAll: { rect: rect(viewAll), style: style(viewAll) },
      cards: cardCandidates.slice(0, 1).map((node) => ({
        rect: rect(node),
        style: style(node),
        image: rect(node.querySelector('img')?.parentElement),
        children: [...node.children].map((child) => ({
          tag: child.tagName,
          rect: rect(child),
          style: style(child),
          grandchildren: [...child.children].map((item) => ({ tag: item.tagName, rect: rect(item), style: style(item) })),
        })),
      })),
    };
  }, state);

  process.stdout.write(`${label} closed\n${JSON.stringify(await read('closed'), null, 2)}\n`);
  await products.click();
  process.stdout.write(`${label} products\n${JSON.stringify(await read('products'), null, 2)}\n`);
  await context.close();
}

await browser.close();
