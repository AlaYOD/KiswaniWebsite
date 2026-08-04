import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const viewportWidth = Number(process.env.WIDTH || 1440);
const viewportHeight = viewportWidth === 375 ? 812 : viewportWidth === 768 ? 1024 : 900;
const sources = [
  ['source', process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app'],
  ['target', process.env.TARGET_URL || 'http://localhost:8088'],
];

const result = [];
for (const [label, url] of sources) {
  const context = await browser.newContext({ viewport: { width: viewportWidth, height: viewportHeight }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(4_000);
  result.push(await page.evaluate((pageLabel) => {
    const read = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const css = getComputedStyle(element);
      return {
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === 'string' ? element.className : '',
        text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120) || '',
        rect: [Math.round(rect.left), Math.round(rect.top + scrollY), Math.round(rect.width), Math.round(rect.height)],
        display: css.display,
        backgroundImage: css.backgroundImage,
        backgroundSize: css.backgroundSize,
        objectFit: css.objectFit,
        objectPosition: css.objectPosition,
        font: [css.fontFamily, css.fontSize, css.fontWeight, css.lineHeight, css.letterSpacing],
        margin: [css.marginTop, css.marginRight, css.marginBottom, css.marginLeft],
        padding: [css.paddingTop, css.paddingRight, css.paddingBottom, css.paddingLeft],
      };
    };
    const hero = document.querySelector('main > section:first-child');
    const metrics = document.querySelector('main > section:nth-child(2)');
    const statement = document.querySelector('main > section:nth-child(4)');
    return {
      label: pageLabel,
      viewport: [innerWidth, innerHeight],
      hero: read(hero),
      heroDirectChildren: hero ? Array.from(hero.children).map(read) : [],
      heroMedia: read(hero?.querySelector('img, .ks-hero__image')),
      h1: read(hero?.querySelector('h1')),
      heroParagraphs: hero ? Array.from(hero.querySelectorAll('p')).map(read) : [],
      heroLinks: hero ? Array.from(hero.querySelectorAll('a')).map(read) : [],
      metrics: read(metrics),
      metricItems: metrics ? Array.from(metrics.querySelectorAll(':scope > div > div, :scope > div')).map(read) : [],
      statement: read(statement),
      statementChildren: statement ? Array.from(statement.children).map(read) : [],
      statementInnerChildren: statement?.firstElementChild ? Array.from(statement.firstElementChild.children).map(read) : [],
      statementH2: read(statement?.querySelector('h2')),
      statementParagraph: read(statement?.querySelector(':scope > p')),
    };
  }, label));
  await context.close();
}

console.log(JSON.stringify(result, null, 2));
await browser.close();
