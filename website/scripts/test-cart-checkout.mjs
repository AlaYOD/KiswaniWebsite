import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(error.message));
await page.addInitScript(() => {

  window.open = (...args) => {
    window.__kiswaniOpened = args;
    return null;
  };
});

await page.goto('http://localhost:8088/collections/decorative/', { waitUntil: 'networkidle' });
await page.evaluate(() => localStorage.removeItem('kiswani-shopping-cart'));
await page.reload({ waitUntil: 'networkidle' });
const firstCard = page.locator('[data-ks-catalog-card]').first();
await firstCard.locator('[data-catalog-quantity="increase"]').click();
await firstCard.locator('.ks-catalog-add').click();
await page.locator('[data-ks-cart-overlay]').waitFor({ state: 'visible' });
const collection = {
  drawerOpen: await page.locator('[data-ks-cart-overlay]').evaluate((node) => node.classList.contains('is-open')),
  count: await page.locator('.ks-cart-link b').textContent(),
  drawerItems: await page.locator('.ks-cart-line').count(),
};
await page.locator('[data-ks-cart-close]').click();

await page.goto('http://localhost:8088/products/kl-gl-001/', { waitUntil: 'networkidle' });
await page.locator('[data-product-quantity="increase"]').click();
await page.locator('.ks-product-purchase > button').click();
await page.locator('[data-ks-cart-overlay]').waitFor({ state: 'visible' });
const product = {
  count: await page.locator('.ks-cart-link b').textContent(),
  quantity: await page.locator('.ks-cart-line__quantity input').inputValue(),
  stored: await page.evaluate(() => localStorage.getItem('kiswani-shopping-cart')),
};
await page.locator('[data-ks-cart-close]').click();

await page.goto('http://localhost:8088/checkout/', { waitUntil: 'networkidle' });
const checkoutBefore = {
  count: await page.locator('[data-ks-checkout-count]').textContent(),
  items: await page.locator('.ks-checkout-item').count(),
  submitEnabled: !(await page.locator('.ks-checkout-submit').isDisabled()),
};
await page.locator('input[name="name"]').fill('Cart Integration QA');
await page.locator('input[name="phone"]').fill('+970599000000');
await page.locator('input[name="email"]').fill('cart-qa@example.com');
await page.locator('input[name="city"]').fill('Ramallah');
await page.locator('select[name="project_type"]').selectOption({ label: 'Home / Residential' });
await page.locator('.ks-checkout-submit').click();
await page.locator('[data-ks-checkout-success]').waitFor({ state: 'visible', timeout: 15000 });
const checkoutAfter = {
  success: await page.locator('[data-ks-checkout-success]').isVisible(),
  whatsappUrl: await page.evaluate(() => window.__kiswaniOpened?.[0] || ''),
};

console.log(JSON.stringify({ collection, product, checkoutBefore, checkoutAfter, errors }, null, 2));
await browser.close();

if (
  !collection.drawerOpen || collection.count !== '2' || collection.drawerItems !== 1 ||
  product.count !== '4' || product.quantity !== '4' ||
  checkoutBefore.count !== '4' || checkoutBefore.items !== 1 || !checkoutBefore.submitEnabled ||
  !checkoutAfter.success || !checkoutAfter.whatsappUrl.startsWith('https://wa.me/970599671209') || errors.length
) {
  process.exitCode = 1;
}
