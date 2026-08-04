import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
for (const [label, url] of [
  ['source', 'https://kiswani-website-82jb.vercel.app/'],
  ['target', 'http://localhost:8088/'],
]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.addStyleTag({ content: '*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}' });
  await page.evaluate(async () => document.fonts?.ready);
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    images.forEach((image) => { image.loading = 'eager'; });
    const step = Math.max(320, Math.floor(innerHeight * 0.75));
    const pageHeight = document.documentElement.scrollHeight;
    for (let offset = 0; offset < pageHeight; offset += step) {
      scrollTo(0, offset);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    scrollTo(0, 0);
    await Promise.all(images.map((image) => image.decode?.().catch(() => {})));
  });
  await page.waitForTimeout(300);
  console.log(label, await page.evaluate(() => {
    const hero = document.querySelector('#top');
    const image = hero?.querySelector('img');
    const background = hero?.querySelector('.ks-hero__image');
    return {
      image: image?.currentSrc || null,
      background: background ? getComputedStyle(background).backgroundImage : null,
      scene: hero?.querySelector('[data-ks-scene-name], .text-sm.font-semibold')?.textContent?.trim() || null,
      reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
      intro: Boolean(document.querySelector('section[role=status]')),
    };
  }));
  await page.close();
}
await browser.close();
