import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const width = Number(process.env.WIDTH || 1440);
const height = width === 375 ? 812 : width === 768 ? 1024 : 900;

for (const [label, url] of [
  ['source', 'https://kiswani-website-82jb.vercel.app'],
  ['target', process.env.TARGET_URL || 'http://localhost:8088'],
]) {
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

  const result = await page.evaluate((siteLabel) => {
    const root = siteLabel === 'source' ? document.querySelector('main') : document.querySelector('.ks-home');
    const read = (node, index) => {
      const rect = node.getBoundingClientRect();
      return {
        index,
        tag: node.tagName,
        className: String(node.className || ''),
        id: node.id,
        text: node.textContent?.trim().replace(/\s+/g, ' ').slice(0, 54),
        y: Math.round((rect.top + scrollY) * 100) / 100,
        height: Math.round(rect.height * 100) / 100,
      };
    };
    return {
      scrollHeight: document.documentElement.scrollHeight,
      children: [...root.children].map(read),
    };
  }, label);
  process.stdout.write(`${width} ${label}\n${JSON.stringify(result, null, 2)}\n`);
  await page.close();
}

await browser.close();
