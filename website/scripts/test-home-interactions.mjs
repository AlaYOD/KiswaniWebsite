import { chromium } from 'playwright';

const baseUrl = process.env.TARGET_URL || 'http://localhost:8088';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
const page = await context.newPage();
const consoleErrors = [];
const pageErrors = [];
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
page.on('pageerror', (error) => pageErrors.push(error.message));
await page.addInitScript(() => {
  sessionStorage.setItem('kiswani-brand-intro-2026', 'seen');
  localStorage.removeItem('kiswani-shopping-cart');
});

const response = await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 });
await page.evaluate(async () => document.fonts?.ready);

function check(condition, message) {
  if (!condition) throw new Error(message);
}

check(response?.status() === 200, `Homepage returned ${response?.status()}.`);

const initialHero = await page.locator('[data-ks-hero-image-element]').getAttribute('src');
await page.locator('[data-ks-scene="1"]').first().click();
await page.waitForTimeout(50);
const changedHero = await page.locator('[data-ks-hero-image-element]').getAttribute('src');
check(initialHero !== changedHero && changedHero.includes('hero-decorative.webp'), 'Hero scene did not change to the decorative image.');
check((await page.locator('[data-ks-scene-index]').textContent())?.trim() === '02', 'Hero scene index did not update.');

await page.locator('.ks-menu-toggle').click();
check(await page.locator('#mobile-navigation').evaluate((node) => node.classList.contains('is-open') && node.getAttribute('aria-hidden') === 'false'), 'Mobile menu did not open.');
const mobileProducts = page.locator('#mobile-navigation').getByRole('button', { name: /^Products/ });
await mobileProducts.click();
check(await mobileProducts.getAttribute('aria-expanded') === 'true', 'Mobile Products accordion did not expand.');
check(await page.locator('[data-ks-mobile-panel="all"]').evaluate((node) => !node.hidden), 'Mobile Products panel remained hidden.');
await page.keyboard.press('Escape');
await page.waitForTimeout(360);
check(await page.locator('#mobile-navigation').evaluate((node) => !node.classList.contains('is-open') && node.getAttribute('aria-hidden') === 'true'), 'Mobile menu did not close with Escape.');

const headerSearch = page.locator('.ks-mobile-header-search input');
await headerSearch.fill('Travertine');
await page.locator('.ks-mobile-header-search form').evaluate((form) => form.requestSubmit());
await page.waitForTimeout(100);
const filteredCount = await page.locator('[data-ks-product-card]:visible').count();
const filteredValue = await page.locator('[data-ks-product-search]').inputValue();
check(filteredCount === 3, `Header search did not filter the product grid to three Travertine products (count ${filteredCount}, value ${filteredValue}, URL ${page.url()}).`);
await page.locator('[data-ks-product-search]').fill('');
check(await page.locator('[data-ks-product-card]:visible').count() === 8, 'Product search did not restore all eight products.');
await page.locator('[data-ks-product-search]').fill('KL-GL-001');
check(await page.locator('[data-ks-product-card]:visible').count() === 1, 'Product search did not match a product code.');
await page.locator('[data-ks-product-search]').fill('Decorative');
check(await page.locator('[data-ks-product-card]:visible').count() === 4, 'Product search did not match the product category.');
await page.locator('[data-ks-product-search]').fill('no-such-kiswani-product');
check(await page.locator('[data-ks-product-card]:visible').count() === 0, 'No-result search still showed product cards.');
check(await page.locator('[data-ks-products-empty]').isVisible(), 'No-result search state was not shown.');
await page.locator('[data-ks-product-clear]').click();
check(await page.locator('[data-ks-product-card]:visible').count() === 8, 'Clear search did not restore all eight products.');

const firstCard = page.locator('[data-ks-product-card]').first();
await firstCard.locator('[data-ks-product-open]').first().click();
await page.waitForTimeout(40);
check(await page.locator('[data-ks-product-modal]').evaluate((node) => !node.hidden && node.classList.contains('is-open')), 'Product modal did not open.');
check((await page.locator('[data-ks-product-modal-title]').textContent())?.trim() === 'Golden Wall Lamp - 2 Bulb', 'Product modal did not render the selected product.');
await page.locator('[data-ks-product-modal-thumb="1"]').click();
check(await page.locator('[data-ks-product-modal-image]').getAttribute('data-view') === '1', 'Product modal gallery did not change views.');
await page.locator('[data-ks-product-modal-quantity="increase"]').click();
check(await page.locator('#ks-product-modal-quantity').inputValue() === '2', 'Product modal quantity did not increase.');
check(!(await page.locator('[data-ks-product-modal-total-wrap]').getAttribute('hidden')), 'Product modal quantity total remained hidden.');
await page.keyboard.press('Escape');
await page.waitForTimeout(320);
check(await page.locator('[data-ks-product-modal]').evaluate((node) => node.hidden), 'Product modal did not close with Escape.');

await firstCard.locator('.ks-product-footer span button').nth(1).click();
check(await firstCard.locator('input[type=number]').inputValue() === '2', 'Quantity increase did not update the first product.');
await firstCard.locator('.ks-add').click();
await page.waitForTimeout(80);
check(await page.locator('[data-ks-cart-overlay]').evaluate((node) => !node.hidden && node.classList.contains('is-open')), 'Add to cart did not open the cart drawer.');
check((await page.locator('.ks-cart-link > b').textContent())?.trim() === '2', 'Cart badge count is not two.');
check(!(await page.locator('.ks-cart-link > b').getAttribute('hidden')), 'Cart badge remained hidden after adding a product.');
check(await page.locator('.ks-cart-line').count() === 1, 'Cart line was not rendered.');
await page.locator('[data-ks-cart-close]').first().click();
await page.waitForTimeout(30);

const range = page.locator('[data-ks-project-range]');
await range.evaluate((node) => { node.value = '73'; node.dispatchEvent(new Event('input', { bubbles: true })); });
check((await page.locator('[data-ks-project-after]').getAttribute('style'))?.includes('27%'), 'Project comparison clip did not update to 73%.');
check((await page.locator('[data-ks-project-handle]').getAttribute('style'))?.includes('73%'), 'Project comparison handle did not update to 73%.');
const temperature = page.locator('[data-ks-temperature]').nth(1);
await temperature.click();
check(await temperature.evaluate((node) => node.classList.contains('is-active') && node.getAttribute('aria-pressed') === 'true'), 'Project temperature control did not activate.');

await page.evaluate(() => { window.open = (url) => { window.__ksOpenedUrl = String(url); return null; }; });
await page.locator('[data-ks-contact-open]').click();
await page.waitForTimeout(30);
check(await page.locator('[data-ks-contact-drawer]').evaluate((node) => !node.hidden && node.classList.contains('is-open') && node.getAttribute('aria-hidden') === 'false'), 'Contact drawer did not open.');
await page.locator('[data-ks-contact-form] input[name=name]').fill('Test User');
await page.locator('[data-ks-contact-form] input[name=phone]').fill('+970599000000');
await page.locator('[data-ks-contact-form] select[name=projectType]').selectOption('Residential');
await page.locator('[data-ks-contact-form] textarea[name=details]').fill('Living room lighting test');
await page.locator('[data-ks-contact-form]').evaluate((form) => form.requestSubmit());
await page.waitForTimeout(30);
const openedUrl = await page.evaluate(() => window.__ksOpenedUrl || '');
check(openedUrl.startsWith('https://wa.me/970599671209?text='), 'Contact form did not prepare the WhatsApp URL.');
check(!(await page.locator('[data-ks-contact-status]').getAttribute('hidden')), 'Contact form success state remained hidden.');
await page.keyboard.press('Escape');
await page.waitForTimeout(460);
check(await page.locator('[data-ks-contact-drawer]').evaluate((node) => node.hidden), 'Contact drawer did not close with Escape.');

await page.goto(`${baseUrl.replace(/\/$/, '')}/#contact`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(40);
check(await page.locator('[data-ks-contact-drawer]').evaluate((node) => !node.hidden && node.classList.contains('is-open')), 'Contact hash did not open the project drawer.');
await page.keyboard.press('Escape');
await page.waitForTimeout(460);
check(!page.url().endsWith('#contact'), 'Closing the contact drawer did not clear the contact hash.');

const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const desktopPage = await desktopContext.newPage();
await desktopPage.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
await desktopPage.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 });
const desktopNav = desktopPage.getByRole('navigation', { name: 'Product categories' });
const desktopProducts = desktopNav.getByRole('link', { name: /^Products/ });
await desktopProducts.hover();
check(await desktopPage.locator('#collection-mega-menu').isVisible(), 'Desktop Products mega menu did not open on hover.');
check(await desktopProducts.getAttribute('aria-expanded') === 'true', 'Desktop Products link did not expose its expanded state.');
check(await desktopPage.locator('[data-ks-mega-panel="all"]').evaluate((node) => !node.hidden), 'Desktop Products mega panel remained hidden.');
const desktopLighting = desktopNav.getByRole('link', { name: /^Lighting fixtures/ });
await desktopLighting.hover();
check(await desktopLighting.getAttribute('aria-expanded') === 'true', 'Desktop Lighting fixtures link did not expose its expanded state.');
check(await desktopPage.locator('[data-ks-mega-panel="lighting-fixtures"]').evaluate((node) => !node.hidden), 'Desktop Lighting fixtures mega panel remained hidden.');
await desktopPage.keyboard.press('Escape');
await desktopPage.waitForTimeout(30);
check(await desktopPage.locator('#collection-mega-menu').evaluate((node) => node.getAttribute('aria-hidden') === 'true'), 'Desktop mega menu did not close with Escape.');
await desktopContext.close();

check(pageErrors.length === 0, `Page errors: ${pageErrors.join(' | ')}`);
check(consoleErrors.length === 0, `Console errors: ${consoleErrors.join(' | ')}`);

process.stdout.write(JSON.stringify({
  url: baseUrl,
  status: response?.status(),
  heroScene: 'passed',
  mobileMenu: 'passed',
  desktopMegaMenus: 'passed',
  headerAndProductSearch: 'passed',
  productModal: 'passed',
  quantityAndCart: 'passed',
  featuredProject: 'passed',
  contactDrawerAndWhatsApp: 'passed',
  consoleErrors,
  pageErrors,
}, null, 2));

await browser.close();
