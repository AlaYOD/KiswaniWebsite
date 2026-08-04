import { chromium } from 'playwright';

const sourceBase = process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app';
const targetBase = process.env.TARGET_URL || 'http://localhost:8088';
const widths = [375, 768, 1440];

const browser = await chromium.launch({ headless: true });

async function inspect(label, base, width) {
  const context = await browser.newContext({
    viewport: { width, height: width === 375 ? 812 : width === 768 ? 1024 : 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(4_000);

  const result = await page.evaluate(() => {
    const compact = (element, index) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const heading = element.querySelector('h1,h2,h3,p');
      return {
        index,
        tag: element.tagName.toLowerCase(),
        id: element.id || '',
        className: typeof element.className === 'string' ? element.className : '',
        top: Math.round(rect.top + scrollY),
        height: Math.round(rect.height),
        width: Math.round(rect.width),
        background: style.backgroundColor,
        padding: [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft],
        text: heading?.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) || '',
      };
    };

    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    return {
      url: location.href,
      scrollHeight: document.documentElement.scrollHeight,
      header: header ? compact(header, 0) : null,
      mainTop: main ? Math.round(main.getBoundingClientRect().top + scrollY) : null,
      mainChildren: main ? Array.from(main.children).map(compact) : [],
      footer: footer ? compact(footer, 0) : null,
    };
  });

  await context.close();
  return { label, width, ...result };
}

const results = [];
for (const width of widths) {
  results.push(await inspect('source', sourceBase, width));
  results.push(await inspect('target', targetBase, width));
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
