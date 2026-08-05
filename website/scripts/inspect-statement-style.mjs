import { chromium } from 'playwright';

const urls = {
  source: 'https://kiswani-website-82jb.vercel.app',
  target: 'http://localhost:8088',
};

const browser = await chromium.launch({ headless: true });

for (const width of [375, 768, 1440]) {
  for (const [name, url] of Object.entries(urls)) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.addInitScript(() => sessionStorage.setItem('kiswani:intro:seen', '1'));
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.querySelector('[data-cinematic-intro]')?.remove();
      window.scrollTo(0, document.querySelector('.ks-statement, section:nth-of-type(3)')?.offsetTop || 1200);
    });
    await page.waitForTimeout(800);

    const result = await page.evaluate((isSource) => {
      const section = isSource
        ? [...document.querySelectorAll('main > section')][2]
        : document.querySelector('.ks-statement');
      const heading = isSource
        ? [...section.querySelectorAll('p,h1,h2,h3')].find((node) => node.textContent?.trim() === 'Lighting is the soul of the space.')
        : section.querySelector('h2,.ks-statement__headline');
      const style = getComputedStyle(heading);
      const keys = [
        'display', 'margin', 'padding', 'color', 'fontFamily', 'fontSize', 'fontStyle',
        'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'textWrap',
        'fontKerning', 'fontFeatureSettings', 'fontVariantLigatures', 'textRendering',
        'webkitFontSmoothing', 'width', 'height',
      ];
      return {
        tag: heading.tagName,
        className: heading.className,
        html: heading.outerHTML,
        styles: Object.fromEntries(keys.map((key) => [key, style[key]])),
      };
    }, name === 'source');

    process.stdout.write(`${width} ${name}\n${JSON.stringify(result, null, 2)}\n`);
    await page.close();
  }
}

await browser.close();
