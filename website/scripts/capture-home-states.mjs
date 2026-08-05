import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const sourceBase = process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app';
const targetBase = process.env.TARGET_URL || 'http://localhost:8088';
const outputDirectory = path.resolve(process.argv[2] || 'output/playwright/home-state-qa');

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const errors = [];

async function createPage(baseUrl, reducedMotion = 'reduce') {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 1,
    reducedMotion,
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(`${baseUrl}: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`${baseUrl}: ${message.text()}`);
  });
  return { context, page };
}

async function captureProductModal(baseUrl, label) {
  const { context, page } = await createPage(baseUrl);
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  const response = await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 });
  if (!response?.ok()) throw new Error(`${label} product state returned ${response?.status()}`);
  await page.evaluate(async () => document.fonts?.ready);

  if (label === 'source') {
    await page.getByRole('button', { name: 'View details' }).first().click();
    await page.getByRole('dialog', { name: /Golden Wall Lamp/i }).waitFor({ state: 'visible' });
  } else {
    await page.locator('[data-ks-product-open]').first().click();
    await page.locator('[data-ks-product-modal]').waitFor({ state: 'visible' });
  }
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outputDirectory, `product-modal-${label}.png`) });
  await context.close();
}

async function captureContactDrawer(baseUrl, label) {
  const { context, page } = await createPage(baseUrl);
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  const url = `${baseUrl.replace(/\/$/, '')}/#contact`;
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  if (!response?.ok()) throw new Error(`${label} contact state returned ${response?.status()}`);
  await page.evaluate(async () => document.fonts?.ready);
  if (label === 'source') {
    await page.getByRole('dialog').waitFor({ state: 'visible' });
  } else {
    await page.locator('[data-ks-contact-drawer]').waitFor({ state: 'visible' });
  }
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outputDirectory, `contact-drawer-${label}.png`) });
  await context.close();
}

async function captureIntro(baseUrl, label) {
  const { context, page } = await createPage(baseUrl, 'no-preference');
  await page.addInitScript(() => sessionStorage.removeItem('kiswani-brand-intro-2026'));
  const response = await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  if (!response?.ok()) throw new Error(`${label} intro state returned ${response?.status()}`);
  await page.evaluate(async () => document.fonts?.ready);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outputDirectory, `intro-${label}.png`) });
  await context.close();
}

for (const [baseUrl, label] of [[sourceBase, 'source'], [targetBase, 'target']]) {
  await captureProductModal(baseUrl, label);
  await captureContactDrawer(baseUrl, label);
  await captureIntro(baseUrl, label);
}

await browser.close();

if (errors.length) {
  throw new Error(`Browser errors:\n${errors.join('\n')}`);
}

process.stdout.write(JSON.stringify({
  outputDirectory,
  viewport: { width: 375, height: 812, deviceScaleFactor: 1 },
  states: ['product-modal', 'contact-drawer', 'intro'],
  errors,
}, null, 2));
