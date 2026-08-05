/**
 * Playwright + pixelmatch visual regression runner.
 *
 * Example:
 *   $env:TARGET_URL = 'http://localhost:8088'
 *   node scripts/visual-regression.mjs
 *
 * The runner writes source, target, and diff PNGs plus results.json to
 * output/playwright/visual-regression/<timestamp>/.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { chromium } from 'playwright';

const sourceBase = process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app';
const targetBase = process.env.TARGET_URL;

if (!targetBase) {
  throw new Error('TARGET_URL is required, for example http://localhost:8088.');
}

const routes = [
  { name: 'home', path: '/' },
  { name: 'collection-decorative', path: '/collections/decorative' },
  { name: 'product-kl-gl-001', path: '/products/kl-gl-001' },
  { name: 'projects', path: '/projects' },
  { name: 'checkout', path: '/checkout' },
  { name: 'about', path: '/about' },
  { name: 'support', path: '/support' },
  { name: 'privacy', path: '/privacy' },
  { name: 'terms', path: '/terms' },
  { name: 'not-found', path: '/__visual-regression-missing__' },
];

const selectedRouteNames = (process.env.VISUAL_ROUTES || '').split(',').map((value) => value.trim()).filter(Boolean);
const selectedRoutes = selectedRouteNames.length ? routes.filter((route) => selectedRouteNames.includes(route.name)) : routes;

const viewports = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
];

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputDirectory = path.join('output', 'playwright', 'visual-regression', timestamp);
await mkdir(outputDirectory, { recursive: true });

const toUrl = (base, route) => new URL(route, `${base.replace(/\/$/, '')}/`).toString();

const normalize = (image, width, height) => {
  const canvas = new PNG({ width, height, fill: true });

  // White matches the source site canvas and makes height/width drift count.
  for (let index = 0; index < canvas.data.length; index += 4) {
    canvas.data[index] = 255;
    canvas.data[index + 1] = 255;
    canvas.data[index + 2] = 255;
    canvas.data[index + 3] = 255;
  }

  PNG.bitblt(image, canvas, 0, 0, image.width, image.height, 0, 0);
  return canvas;
};

const capture = async (page, url, screenshotPath) => {
  await page.addInitScript(() => {
    window.sessionStorage.setItem('kiswani-brand-intro-2026', 'seen');
  });
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

  await page.evaluate(() => {
    document.querySelector('section[role=status], .ks-cinematic-intro, #brandIntro')?.remove();
    document.body.style.overflow = '';
  });

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
      }
      section[role="status"], .ks-cinematic-intro, #brandIntro {
        display: none !important;
      }
    `,
  });
  await page.evaluate(async () => document.fonts?.ready);

  // Resolve lazy-loaded media before the full-page capture.
  await page.evaluate(async () => {
    const images = Array.from(document.images);

    // Native lazy images can report complete before they start a request.
    // Eager mode plus a decode wait makes long mobile captures stable.
    for (const image of images) {
      image.loading = 'eager';
    }

    const step = Math.max(320, Math.floor(window.innerHeight * 0.75));
    const pageHeight = document.documentElement.scrollHeight;

    for (let offset = 0; offset < pageHeight; offset += step) {
      window.scrollTo(0, offset);
      await new Promise((resolve) => window.setTimeout(resolve, 50));
    }

    window.scrollTo(0, 0);
    await Promise.all(
      images.map(async (image) => {
        const source = image.currentSrc || image.getAttribute('src');
        if (!source) return;

        if (!image.complete) {
          await new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
          });
        }

        if (typeof image.decode === 'function' && image.naturalWidth > 0) {
          await image.decode().catch(() => {});
        }
      }),
    );
  });
  await page.evaluate(() => {
    document.querySelectorAll('section[role="status"], .ks-cinematic-intro, #brandIntro').forEach((node) => node.remove());
    document.body.style.overflow = '';
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: screenshotPath, fullPage: true, scale: 'css' });

  return {
    status: response?.status() ?? null,
    finalUrl: page.url(),
  };
};

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of viewports) {
    for (const route of selectedRoutes) {
      const sourcePage = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      const targetPage = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      await Promise.all([
        sourcePage.emulateMedia({ reducedMotion: 'reduce' }),
        targetPage.emulateMedia({ reducedMotion: 'reduce' }),
      ]);

      const prefix = `${route.name}-${viewport.name}`;
      const sourcePath = path.join(outputDirectory, `${prefix}-source.png`);
      const targetPath = path.join(outputDirectory, `${prefix}-target.png`);
      const diffPath = path.join(outputDirectory, `${prefix}-diff.png`);

      try {
        const [source, target] = await Promise.all([
          capture(sourcePage, toUrl(sourceBase, route.path), sourcePath),
          capture(targetPage, toUrl(targetBase, route.path), targetPath),
        ]);
        const sourceImage = PNG.sync.read(await (await import('node:fs/promises')).readFile(sourcePath));
        const targetImage = PNG.sync.read(await (await import('node:fs/promises')).readFile(targetPath));
        const width = Math.max(sourceImage.width, targetImage.width);
        const height = Math.max(sourceImage.height, targetImage.height);
        const sourceCanvas = normalize(sourceImage, width, height);
        const targetCanvas = normalize(targetImage, width, height);
        const diff = new PNG({ width, height });
        const mismatchedPixels = pixelmatch(
          sourceCanvas.data,
          targetCanvas.data,
          diff.data,
          width,
          height,
          { threshold: 0.1, includeAA: false },
        );
        await writeFile(diffPath, PNG.sync.write(diff));

        results.push({
          route: route.path,
          name: route.name,
          viewport,
          source,
          target,
          width,
          height,
          mismatchedPixels,
          pixelDifferencePercent: Number(((mismatchedPixels / (width * height)) * 100).toFixed(4)),
          exceedsTwoPercent: mismatchedPixels / (width * height) > 0.02,
          artifacts: { sourcePath, targetPath, diffPath },
        });
      } catch (error) {
        results.push({
          route: route.path,
          name: route.name,
          viewport,
          error: error instanceof Error ? error.message : String(error),
          exceedsTwoPercent: null,
        });
      } finally {
        await Promise.all([sourcePage.close(), targetPage.close()]);
      }
    }
  }
} finally {
  await browser.close();
}

const summary = {
  sourceBase,
  targetBase,
  thresholdPercent: 2,
  comparisonCount: results.length,
  failedCount: results.filter((result) => result.exceedsTwoPercent === true).length,
  errorCount: results.filter((result) => 'error' in result).length,
  results,
};

await writeFile(path.join(outputDirectory, 'results.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
