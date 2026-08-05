import { readFile } from 'node:fs/promises';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const [firstPath, secondPath, topValue, bottomValue] = process.argv.slice(2);
if (!firstPath || !secondPath) throw new Error('Two PNG paths are required.');
const first = PNG.sync.read(await readFile(firstPath));
const second = PNG.sync.read(await readFile(secondPath));
if (first.width !== second.width || first.height !== second.height) {
  process.stdout.write(JSON.stringify({ first: [first.width, first.height], second: [second.width, second.height], comparable: false }));
  process.exit(0);
}
const top = Number(topValue || 0);
const bottom = Number(bottomValue || first.height);
const height = Math.max(0, Math.min(first.height, bottom) - top);
const firstCrop = new PNG({ width: first.width, height });
const secondCrop = new PNG({ width: first.width, height });
const diff = new PNG({ width: first.width, height });
PNG.bitblt(first, firstCrop, 0, top, first.width, height, 0, 0);
PNG.bitblt(second, secondCrop, 0, top, second.width, height, 0, 0);
const mismatch = pixelmatch(firstCrop.data, secondCrop.data, diff.data, first.width, height, { threshold: 0.1, includeAA: false });
process.stdout.write(JSON.stringify({ width: first.width, height, mismatch, percent: mismatch * 100 / (first.width * height) }, null, 2));
