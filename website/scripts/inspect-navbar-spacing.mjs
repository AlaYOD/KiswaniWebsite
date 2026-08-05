import { chromium } from 'playwright';

const targets = [
  ['source', process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app'],
  ['target', process.env.TARGET_URL || 'http://localhost:8088'],
];

const browser = await chromium.launch({ headless: true });

const rect = (node) => {
  const value = node?.getBoundingClientRect();
  return value
    ? {
        x: value.x,
        y: value.y,
        width: value.width,
        height: value.height,
      }
    : null;
};

for (const [label, url] of targets) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(async () => document.fonts?.ready);

  const data = await page.evaluate((rectSource) => {
    const rect = (node) => {
      const value = node?.getBoundingClientRect();
      return value
        ? {
            x: value.x,
            y: value.y,
            width: value.width,
            height: value.height,
          }
        : null;
    };
    const css = (node) => {
      if (!node) return null;
      const style = getComputedStyle(node);
      return {
        alignItems: style.alignItems,
        display: style.display,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        gap: style.gap,
        height: style.height,
        justifyContent: style.justifyContent,
        lineHeight: style.lineHeight,
        maxWidth: style.maxWidth,
        overflowX: style.overflowX,
        padding: style.padding,
        width: style.width,
      };
    };

    const nav = document.querySelector('nav[aria-label="Product categories"]');
    const inner = nav?.querySelector(':scope > div') || nav?.firstElementChild;
    const links = [...(inner?.querySelectorAll(':scope > a') || nav?.querySelectorAll('a') || [])];

    return {
      nav: rect(nav),
      navStyle: css(nav),
      inner: rect(inner),
      innerStyle: css(inner),
      links: links.map((link) => ({
        text: link.textContent.trim(),
        rect: rect(link),
        style: css(link),
        svg: rect(link.querySelector('svg')),
        underline: rect(link.querySelector('i, span[aria-hidden="true"]')),
      })),
    };
  }, rect.toString());

  console.log(`${label}\n${JSON.stringify(data, null, 2)}`);
  await context.close();
}

await browser.close();
