import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const width = Number(process.env.WIDTH || 768);
const height = width === 375 ? 812 : width === 768 ? 1024 : 900;
for (const [label, url] of [['source', 'https://kiswani-website-82jb.vercel.app'], ['target', 'http://localhost:8088']]) {
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
    const hero = document.querySelector('#top');
    const content = siteLabel === 'source' ? hero.lastElementChild.firstElementChild : hero.querySelector('.ks-hero__content');
    const read = (node) => {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      return {
        tag: node.tagName,
        className: String(node.className || ''),
        text: node.textContent?.trim().replace(/\s+/g, ' ').slice(0, 50),
        rect: [rect.left, rect.top + scrollY, rect.width, rect.height].map((value) => Math.round(value * 100) / 100),
        display: style.display,
        boxSizing: style.boxSizing,
        lineHeight: style.lineHeight,
        borderTopWidth: style.borderTopWidth,
        marginTop: style.marginTop,
        marginBottom: style.marginBottom,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
      };
    };
    const scene = siteLabel === 'source' ? content.lastElementChild : content.querySelector('.ks-hero__scene');
    return {
      content: read(content),
      children: [...content.children].map(read),
      scene: read(scene),
      sceneChildren: [...scene.children].map(read),
    };
  }, label);
  process.stdout.write(`${label}\n${JSON.stringify(result, null, 2)}\n`);
  await page.close();
}
await browser.close();
