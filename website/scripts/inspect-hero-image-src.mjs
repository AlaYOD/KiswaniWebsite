import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
for (const width of [375, 768, 1440]) {
  const height = width === 375 ? 812 : width === 768 ? 1024 : 900;
  for (const [label, url] of [['source', 'https://kiswani-website-82jb.vercel.app'], ['target', 'http://localhost:8088']]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(async () => document.fonts?.ready);
    const result = await page.evaluate((siteLabel) => {
      const hero = document.querySelector('#top');
      const image = siteLabel === 'source' ? hero?.querySelector('img') : hero?.querySelector('[data-ks-hero-image-element]');
      if (!image) return null;
      const rect = image.getBoundingClientRect();
      const style = getComputedStyle(image);
      return {
        src: image.getAttribute('src'),
        currentSrc: image.currentSrc,
        srcset: image.getAttribute('srcset'),
        sizes: image.getAttribute('sizes'),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        rect: [rect.left, rect.top + scrollY, rect.width, rect.height],
        objectFit: style.objectFit,
        objectPosition: style.objectPosition,
        transform: style.transform,
        filter: style.filter,
      };
    }, label);
    process.stdout.write(`${width} ${label}\n${JSON.stringify(result, null, 2)}\n`);
    await page.close();
  }
}
await browser.close();
