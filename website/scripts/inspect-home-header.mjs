import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const width = Number(process.env.WIDTH || 1440);
const height = width === 375 ? 812 : width === 768 ? 1024 : 900;
for (const [label, url] of [['source','https://kiswani-website-82jb.vercel.app'],['target',process.env.TARGET_URL || 'http://localhost:8088']]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  const result = await page.evaluate((siteLabel) => {
    const header = document.querySelector('header');
    const utility = siteLabel === 'source' ? header.children[0] : header.querySelector('.ks-utility');
    const dark = siteLabel === 'source' ? header.children[1] : null;
    const mainbar = siteLabel === 'source' ? dark.children[0] : header.querySelector('.ks-mainbar');
    const mainbarInner = siteLabel === 'source' ? mainbar : header.querySelector('.ks-mainbar__inner');
    const mobileSearch = siteLabel === 'source' ? dark.children[1] : header.querySelector('.ks-mobile-header-search');
    const nav = siteLabel === 'source' ? header.children[2] : header.querySelector('.ks-desktop-nav');
    const read = (node) => {
      if (!node) return null;
      const rect = node.getBoundingClientRect();
      const css = getComputedStyle(node);
      return {
        tag: node.tagName.toLowerCase(), text: node.textContent?.trim().replace(/\s+/g,' ').slice(0,80) || '',
        rect: [rect.left,rect.top+scrollY,rect.width,rect.height].map(v=>Math.round(v*100)/100),
        display: css.display, grid: css.gridTemplateColumns, gap: css.gap,
        padding: [css.paddingTop,css.paddingRight,css.paddingBottom,css.paddingLeft],
        font: [css.fontSize,css.fontWeight,css.lineHeight,css.letterSpacing],
        color: css.color, background: css.backgroundColor, border: css.border,
      };
    };
    const logo = mainbarInner?.querySelector('a');
    const search = mainbarInner?.querySelector('form');
    const actions = mainbarInner ? [...mainbarInner.children].at(-1) : null;
    return {
      label: siteLabel, header: read(header), utility: read(utility), utilityChain: utility ? [read(utility.firstElementChild),read(utility.firstElementChild?.firstElementChild)] : [],
      utilityItems: utility ? [...utility.querySelectorAll('a,svg,i')].map(read) : [],
      mainbar: read(mainbar), mainbarInner: read(mainbarInner), logo: read(logo), logoImage: read(logo?.querySelector('img')),
      search: read(search), actions: read(actions), actionItems: actions ? [...actions.children].map(read) : [],
      mobileSearch: read(mobileSearch), mobileSearchForm: read(mobileSearch?.querySelector('form')),
      nav: read(nav), navItems: nav ? [...nav.querySelectorAll(':scope a')].map(read) : [],
    };
  }, label);
  console.log(JSON.stringify(result));
  await page.close();
}
await browser.close();
