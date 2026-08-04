/**
 * Report homepage pixel differences section by section.
 * Usage: node scripts/analyze-home-bands.mjs <artifact-directory>
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const artifactDirectory = process.argv[2];
if (!artifactDirectory) throw new Error('Artifact directory is required.');

const bandsByViewport = {
  375: [
    ['header', 0, 169],
    ['hero', 169, 995],
    ['metrics', 995, 1299],
    ['motif', 1299, 1371],
    ['statement', 1371, 1840],
    ['collections', 1840, 3886],
    ['stories', 3886, 5343],
    ['types', 5343, 6514],
    ['products', 6514, 11901],
    ['marquee', 11901, 11967],
    ['featured-project', 11967, 13409],
    ['contact', 13409, 13929],
    ['footer', 13929, 15494],
  ],
  768: [
    ['header', 0, 169],
    ['hero', 169, 1035],
    ['metrics', 1035, 1165],
    ['motif', 1165, 1237],
    ['statement', 1237, 1755],
    ['collections', 1755, 3016],
    ['stories', 3016, 4380],
    ['types', 4380, 5173],
    ['products', 5173, 7197],
    ['marquee', 7197, 7263],
    ['featured-project', 7263, 8741],
    ['contact', 8741, 9293],
    ['footer', 9293, 10247],
  ],
  1440: [
    ['header', 0, 164],
    ['hero', 164, 1008],
    ['metrics', 1008, 1126],
    ['motif', 1126, 1198],
    ['statement', 1198, 1535],
    ['collections', 1535, 2362],
    ['stories', 2362, 3295],
    ['types', 3295, 3886],
    ['products', 3886, 5439],
    ['marquee', 5439, 5505],
    ['featured-project', 5505, 6884],
    ['contact', 6884, 7473],
    ['footer', 7473, 8058],
  ],
};

for (const [viewport, bands] of Object.entries(bandsByViewport)) {
  const source = PNG.sync.read(await readFile(path.join(artifactDirectory, `home-${viewport}-source.png`)));
  const target = PNG.sync.read(await readFile(path.join(artifactDirectory, `home-${viewport}-target.png`)));
  console.log(`VIEW ${viewport}`);
  for (const [name, startY, requestedEndY] of bands) {
    const endY = Math.min(requestedEndY, source.height, target.height);
    const height = endY - startY;
    const sourceCrop = new PNG({ width: source.width, height });
    const targetCrop = new PNG({ width: source.width, height });
    const diff = new PNG({ width: source.width, height });
    PNG.bitblt(source, sourceCrop, 0, startY, source.width, height, 0, 0);
    PNG.bitblt(target, targetCrop, 0, startY, source.width, height, 0, 0);
    const mismatched = pixelmatch(sourceCrop.data, targetCrop.data, diff.data, source.width, height, { threshold: 0.1, includeAA: false });
    console.log(`${name}: ${((100 * mismatched) / (source.width * height)).toFixed(3)}%`);
  }
}
