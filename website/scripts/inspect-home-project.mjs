import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const width = Number(process.env.WIDTH || 1440);
const height = width === 375 ? 812 : width === 768 ? 1024 : 900;
const sites = [
  ['source', 'https://kiswani-website-82jb.vercel.app'],
  ['target', process.env.TARGET_URL || 'http://localhost:8088'],
];

const output = [];
for (const [label, url] of sites) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.evaluate(() => document.querySelector('#featured-project')?.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(500);
  output.push(await page.evaluate((siteLabel) => {
    const section = document.querySelector('#featured-project');
    const inner = siteLabel === 'source' ? section?.querySelector(':scope > div.relative.z-10') : section?.querySelector('.ks-featured-project__inner');
    const head = siteLabel === 'source' ? inner?.children[0] : section?.querySelector('.ks-featured-project__head');
    const comparison = siteLabel === 'source' ? inner?.children[1] : section?.querySelector('.ks-project-compare');
    const visual = comparison?.firstElementChild;
    const controls = siteLabel === 'source' ? inner?.children[2] : section?.querySelector('.ks-featured-project__controls');
    const read = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const css = getComputedStyle(element);
      return {
        tag: element.tagName.toLowerCase(),
        text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 90) || '',
        rect: [rect.left, rect.top + scrollY, rect.width, rect.height].map((v) => Math.round(v * 100) / 100),
        display: css.display,
        grid: css.gridTemplateColumns,
        gap: css.gap,
        padding: [css.paddingTop, css.paddingRight, css.paddingBottom, css.paddingLeft],
        margin: [css.marginTop, css.marginRight, css.marginBottom, css.marginLeft],
        font: [css.fontSize, css.fontWeight, css.lineHeight, css.letterSpacing],
        background: css.backgroundColor,
        filter: css.filter,
        clip: css.clipPath,
      };
    };
    return {
      label: siteLabel,
      section: read(section), inner: read(inner), head: read(head),
      headChildren: head ? [...head.children].map(read) : [],
      kicker: read(head?.querySelector('p')),
      h2: read(head?.querySelector('h2')),
      comparison: read(comparison), visual: read(visual),
      visualChildren: visual ? [...visual.children].map(read) : [],
      facts: read(siteLabel === 'source' ? visual?.lastElementChild : visual?.querySelector('.ks-project-compare__facts')),
      factChildren: [...(siteLabel === 'source' ? visual?.lastElementChild?.children || [] : visual?.querySelector('.ks-project-compare__facts')?.children || [])].map(read),
      controls: read(controls), controlChildren: controls ? [...controls.children].map(read) : [],
      buttons: controls ? [...controls.querySelectorAll('button')].map(read) : [],
      links: controls ? [...controls.querySelectorAll('a')].map(read) : [],
    };
  }, label));
  await context.close();
}

console.log(JSON.stringify(output, null, 2));
await browser.close();
