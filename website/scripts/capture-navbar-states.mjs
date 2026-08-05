import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const sourceBase = process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app';
const targetBase = process.env.TARGET_URL || 'http://localhost:8088';
const outputDirectory = path.resolve(process.argv[2] || 'output/playwright/navbar-qa');
const includeTarget = process.argv.includes('--target');

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];

async function setupPage(baseUrl, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(`${baseUrl}: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`${baseUrl}: ${message.text()}`);
  });
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  const response = await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 });
  if (!response?.ok()) throw new Error(`${baseUrl} returned ${response?.status()}`);
  await page.evaluate(async () => document.fonts?.ready);
  return { context, page };
}

async function waitForVisibleImages(page, rootSelector) {
  await page.locator(rootSelector).evaluate(async (root) => {
    const images = [...root.querySelectorAll('img')].filter((image) => image.getClientRects().length);
    await Promise.all(images.map((image) => image.decode?.().catch(() => undefined)));
  });
}

async function captureDesktop(baseUrl, label) {
  const { context, page } = await setupPage(baseUrl, { width: 1440, height: 900 });

  const nav = page.getByRole('navigation', { name: 'Product categories' });
  await nav.getByRole('link', { name: /^Products/ }).hover();
  await page.locator('#collection-mega-menu').waitFor({ state: 'visible' });
  await waitForVisibleImages(page, '#collection-mega-menu');
  await page.waitForTimeout(80);
  await page.screenshot({ path: path.join(outputDirectory, `${label}-desktop-products.png`) });

  await page.mouse.move(12, 760);
  await page.locator('#collection-mega-menu').waitFor({ state: 'hidden' });
  await page.waitForTimeout(80);
  await page.screenshot({ path: path.join(outputDirectory, `${label}-desktop-closed.png`) });

  await nav.getByRole('link', { name: /^Lighting fixtures/ }).hover();
  await page.locator('#collection-mega-menu').waitFor({ state: 'visible' });
  await waitForVisibleImages(page, '#collection-mega-menu');
  await page.waitForTimeout(80);
  await page.screenshot({ path: path.join(outputDirectory, `${label}-desktop-lighting-fixtures.png`) });
  await context.close();
}

async function captureMobile(baseUrl, label) {
  const { context, page } = await setupPage(baseUrl, { width: 375, height: 812 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.locator('#mobile-navigation').waitFor({ state: 'visible' });
  await waitForVisibleImages(page, '#mobile-navigation');
  await page.waitForTimeout(80);
  await page.screenshot({ path: path.join(outputDirectory, `${label}-mobile-menu.png`) });

  await page.locator('#mobile-navigation').getByRole('button', { name: /^Products/ }).click();
  await waitForVisibleImages(page, '#mobile-navigation');
  await page.waitForTimeout(80);
  await page.screenshot({ path: path.join(outputDirectory, `${label}-mobile-products.png`) });
  await context.close();
}

const targets = includeTarget ? [[sourceBase, 'source'], [targetBase, 'target']] : [[sourceBase, 'source']];
for (const [baseUrl, label] of targets) {
  await captureDesktop(baseUrl, label);
  await captureMobile(baseUrl, label);
}

await browser.close();
if (errors.length) throw new Error(`Browser errors:\n${errors.join('\n')}`);

process.stdout.write(JSON.stringify({ outputDirectory, includeTarget, errors }, null, 2));
