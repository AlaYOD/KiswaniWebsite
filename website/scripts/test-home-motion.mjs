import { chromium } from 'playwright';

const baseUrl = process.env.TARGET_URL || 'http://localhost:8088';
const browser = await chromium.launch({ headless: true });

function check(condition, message) {
  if (!condition) throw new Error(message);
}

const introContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
const introPage = await introContext.newPage();
await introPage.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60_000 });
check(await introPage.locator('[data-ks-cinematic-intro]').isVisible(), 'The cinematic intro did not appear on a first session visit.');
check(await introPage.locator('body').evaluate((node) => node.classList.contains('ks-intro-locked')), 'The cinematic intro did not lock background scrolling.');
await introPage.keyboard.press('Escape');
await introPage.waitForTimeout(80);
check(await introPage.locator('[data-ks-cinematic-intro]').evaluate((node) => node.classList.contains('is-leaving')), 'Escape did not start the cinematic intro exit.');
await introPage.waitForTimeout(950);
check(await introPage.locator('[data-ks-cinematic-intro]').count() === 0, 'The cinematic intro remained mounted after its exit.');
check(await introPage.evaluate(() => sessionStorage.getItem('kiswani-brand-intro-2026')) === 'seen', 'The cinematic intro session state was not saved.');
await introPage.reload({ waitUntil: 'networkidle' });
check(await introPage.locator('[data-ks-cinematic-intro]').count() === 0, 'The cinematic intro repeated in the same session.');
await introContext.close();

const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
const page = await context.newPage();
const consoleErrors = [];
const pageErrors = [];
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
page.on('pageerror', (error) => pageErrors.push(error.message));
await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60_000 });
await page.waitForTimeout(120);

check(await page.locator('html').evaluate((node) => node.classList.contains('ks-motion-ready')), 'The homepage motion system did not initialize.');
check(await page.locator('.ks-header').evaluate((node) => node.classList.contains('is-visible')), 'The header entrance did not complete.');
check(await page.locator('.ks-hero__content > h1').evaluate((node) => node.classList.contains('ks-reveal')), 'The hero stagger motion was not attached.');

await page.evaluate(() => scrollTo(0, 420));
await page.waitForTimeout(80);
const heroParallax = await page.locator('[data-ks-hero]').evaluate((node) => ({
  image: Number.parseFloat(node.style.getPropertyValue('--ks-hero-image-y')),
  content: Number.parseFloat(node.style.getPropertyValue('--ks-hero-content-y')),
}));
check(heroParallax.image > 0 && heroParallax.content > 0, 'Hero image/content parallax did not respond to scrolling.');

await page.locator('.ks-metrics').scrollIntoViewIfNeeded();
await page.waitForTimeout(1350);
const metricValues = await page.locator('[data-ks-metric]').allTextContents();
check(metricValues.join('|') === '90+|48H|360\u00b0', `Metric counters did not reach their source values: ${metricValues.join('|')}`);

const sectionChecks = [
  ['.ks-statement', '.ks-statement__inner > h2', 'statement reveal'],
  ['.ks-collections', '.ks-category-card', 'collection-card reveal'],
  ['.ks-stories', '.ks-story--main', 'visual-story reveal'],
  ['.ks-types', '.ks-type-card', 'lighting-type reveal'],
  ['.ks-products', '.ks-product-card', 'product-card reveal'],
  ['.ks-featured-project', '.ks-featured-project', 'featured-project illumination'],
  ['.ks-footer--v2', '.ks-footer--v2', 'footer illumination'],
];

for (const [sectionSelector, stateSelector, label] of sectionChecks) {
  await page.locator(sectionSelector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  const active = await page.locator(stateSelector).first().evaluate((node) => node.classList.contains('is-visible') || node.classList.contains('is-illuminated'));
  check(active, `The ${label} did not activate in view.`);
}

await page.locator('.ks-products').scrollIntoViewIfNeeded();
await page.waitForTimeout(120);
check(await page.locator('.ks-products').evaluate((node) => node.classList.contains('is-illuminated')), 'The track lights did not illuminate.');
check((await page.locator('.ks-products__spot-head').first().evaluate((node) => getComputedStyle(node).animationName)).includes('ks-track-sway'), 'The track-light sway animation is not running.');
check((await page.locator('.ks-marquee__track').evaluate((node) => getComputedStyle(node).animationName)).includes('ks-source-marquee'), 'The lighting-category marquee is not running.');

const firstCategory = page.locator('.ks-category-card').first();
await firstCategory.scrollIntoViewIfNeeded();
const categoryBox = await firstCategory.boundingBox();
if (categoryBox) await page.mouse.move(categoryBox.x + categoryBox.width * 0.78, categoryBox.y + categoryBox.height * 0.3);
await page.waitForTimeout(40);
check(Number.parseFloat(await firstCategory.evaluate((node) => node.style.getPropertyValue('--ks-tilt-y'))) !== 0, 'The collection-card pointer tilt did not respond.');

check(consoleErrors.length === 0, `Console errors: ${consoleErrors.join(' | ')}`);
check(pageErrors.length === 0, `Page errors: ${pageErrors.join(' | ')}`);
await context.close();

const reducedContext = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60_000 });
check(await reducedPage.locator('[data-ks-cinematic-intro]').count() === 0, 'Reduced motion did not bypass the cinematic intro.');
check(!(await reducedPage.locator('html').evaluate((node) => node.classList.contains('ks-motion-ready'))), 'Reduced motion still initialized scroll animations.');
await reducedContext.close();

await browser.close();
process.stdout.write(JSON.stringify({
  url: baseUrl,
  cinematicIntro: 'passed',
  heroParallaxAndStagger: 'passed',
  metricCounters: 'passed',
  inViewSectionMotion: 'passed',
  fixtureAndMarqueeMotion: 'passed',
  collectionPointerTilt: 'passed',
  reducedMotion: 'passed',
  consoleErrors,
  pageErrors,
}, null, 2));
