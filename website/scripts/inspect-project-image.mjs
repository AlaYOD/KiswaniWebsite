import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const width = Number(process.env.WIDTH || 1440);
const height = width === 375 ? 812 : width === 768 ? 1024 : 900;

for (const [label, url] of [['source', 'https://kiswani-website-82jb.vercel.app'], ['target', process.env.TARGET_URL || 'http://localhost:8088']]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.addStyleTag({ content: '*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important}' });
  await page.evaluate(async () => {
    document.querySelector('#featured-project')?.scrollIntoView({ block: 'center' });
    await new Promise((resolve) => setTimeout(resolve, 300));
  });
  const result = await page.evaluate((siteLabel) => {
    const section = document.querySelector('#featured-project');
    const images = [...section.querySelectorAll('img')];
    const read = (node) => {
      const rect = node.getBoundingClientRect();
      const css = getComputedStyle(node);
      return {
        rect: [rect.left, rect.top + scrollY, rect.width, rect.height].map((v) => Math.round(v * 100) / 100),
        src: node.currentSrc,
        natural: [node.naturalWidth, node.naturalHeight],
        position: css.position,
        inset: [css.top, css.right, css.bottom, css.left],
        size: [css.width, css.height],
        object: [css.objectFit, css.objectPosition],
        filter: css.filter,
        transform: css.transform,
      };
    };
    return {
      label: siteLabel,
      wrappers: [...images].map((image) => read(image.parentElement)),
      images: images.map(read),
    };
  }, label);
  console.log(JSON.stringify(result));
  await page.close();
}

await browser.close();
