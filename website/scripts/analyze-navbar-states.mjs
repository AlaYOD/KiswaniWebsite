import { readFile } from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const directory = path.resolve(process.argv[2] || 'output/playwright/navbar-qa-2026-08-05');
const states = {
  'desktop-closed': [[0, 164]],
  'desktop-products': [[0, 164], [164, 594]],
  'desktop-lighting-fixtures': [[0, 164], [164, 624]],
  'mobile-menu': [[0, 812]],
  'mobile-products': [[0, 812]],
};
const details = {
  'desktop-products': [
    ['intro', 0, 164, 389, 595],
    ['card-images', 389, 164, 1440, 385],
    ['card-copy', 389, 385, 1440, 595],
  ],
  'desktop-lighting-fixtures': [
    ['intro', 0, 164, 490, 625],
    ['section-images', 490, 164, 1440, 310],
    ['section-copy', 490, 310, 1440, 625],
  ],
  'mobile-menu': [
    ['drawer', 0, 0, 345, 812],
    ['backdrop', 345, 0, 375, 812],
  ],
  'mobile-products': [
    ['drawer', 0, 0, 345, 812],
    ['backdrop', 345, 0, 375, 812],
  ],
};

const crop = (image, start, end) => {
  const height = Math.min(image.height, end) - start;
  const result = new PNG({ width: image.width, height });
  PNG.bitblt(image, result, 0, start, image.width, height, 0, 0);
  return result;
};

const cropRect = (image, left, top, right, bottom) => {
  const width = right - left;
  const height = bottom - top;
  const result = new PNG({ width, height });
  PNG.bitblt(image, result, left, top, width, height, 0, 0);
  return result;
};

for (const [state, bands] of Object.entries(states)) {
  const source = PNG.sync.read(await readFile(path.join(directory, `source-${state}.png`)));
  const target = PNG.sync.read(await readFile(path.join(directory, `target-${state}.png`)));
  process.stdout.write(`STATE ${state} ${source.width}x${source.height}\n`);
  for (const [start, end] of bands) {
    const a = crop(source, start, end);
    const b = crop(target, start, end);
    const count = pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: .1, includeAA: false });
    const percent = count * 100 / (a.width * a.height);
    process.stdout.write(`  y${start}-${end}: ${percent.toFixed(3)}%\n`);
  }
  for (const [name, left, top, right, bottom] of details[state] || []) {
    const a = cropRect(source, left, top, right, bottom);
    const b = cropRect(target, left, top, right, bottom);
    const count = pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: .1, includeAA: false });
    process.stdout.write(`  ${name}: ${(count * 100 / (a.width * a.height)).toFixed(3)}%\n`);
  }
}
