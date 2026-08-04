import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PNG } from 'pngjs';

const directory = process.argv[2];
const viewport = process.argv[3] || '1440';
if (!directory) throw new Error('Artifact directory is required.');

const source = PNG.sync.read(await readFile(path.join(directory, `home-${viewport}-source.png`)));
const target = PNG.sync.read(await readFile(path.join(directory, `home-${viewport}-target.png`)));
const bounds = viewport === '375' ? [169, 995] : viewport === '768' ? [169, 1035] : [164, 1008];
const points = viewport === '1440'
  ? [[1000, 300], [1200, 500], [1100, 800], [600, 900], [50, 500]]
  : [[20, bounds[0] + 100], [Math.floor(source.width / 2), bounds[0] + 250], [source.width - 20, bounds[1] - 100]];

function pixel(image, x, y) {
  const offset = (y * image.width + x) * 4;
  return Array.from(image.data.subarray(offset, offset + 4));
}

function average(image, xStart, xEnd) {
  const sum = [0, 0, 0];
  let count = 0;
  for (let y = bounds[0]; y < bounds[1]; y += 4) {
    for (let x = xStart; x < xEnd; x += 4) {
      const value = pixel(image, x, y);
      sum[0] += value[0]; sum[1] += value[1]; sum[2] += value[2]; count++;
    }
  }
  return sum.map((value) => Math.round(value / count));
}

console.log(JSON.stringify({
  points: points.map(([x, y]) => ({ x, y, source: pixel(source, x, y), target: pixel(target, x, y) })),
  sourceLeft: average(source, 0, Math.floor(source.width / 2)),
  targetLeft: average(target, 0, Math.floor(target.width / 2)),
  sourceRight: average(source, Math.floor(source.width / 2), source.width),
  targetRight: average(target, Math.floor(target.width / 2), target.width),
}, null, 2));
