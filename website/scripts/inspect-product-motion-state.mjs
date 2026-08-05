import { chromium } from 'playwright';

const width = Number(process.env.WIDTH || 768);
const height = width === 375 ? 812 : width === 768 ? 1024 : 900;
const browser = await chromium.launch({ headless: true });
for (const [label, url] of [['source', 'https://kiswani-website-82jb.vercel.app/'], ['target', 'http://localhost:8088/']]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.addStyleTag({ content: '*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}' });
  await page.evaluate(async () => document.fonts?.ready);
  await page.evaluate(async () => {
    const images = [...document.images];
    images.forEach((image) => { image.loading = 'eager'; });
    const step = Math.max(320, Math.floor(innerHeight * 0.75));
    for (let offset = 0; offset < document.documentElement.scrollHeight; offset += step) {
      scrollTo(0, offset);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    scrollTo(0, 0);
    await Promise.all(images.map((image) => image.decode?.().catch(() => {})));
  });
  await page.waitForTimeout(300);
  const result = await page.evaluate(() => {
    const products = document.querySelector('#products');
    return [...products.querySelectorAll('[style]')].map((node) => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return {
        tag: node.tagName,
        className: String(node.className || '').slice(0, 160),
        inline: node.getAttribute('style'),
        opacity: style.opacity,
        transform: style.transform,
        rect: [rect.left, rect.top + scrollY, rect.width, rect.height].map((value) => Math.round(value * 100) / 100),
      };
    }).filter((item) => item.opacity !== '1' || item.transform !== 'none').slice(0, 40);
  });
  process.stdout.write(`${width} ${label}\n${JSON.stringify(result, null, 2)}\n`);
  await page.close();
}
await browser.close();
