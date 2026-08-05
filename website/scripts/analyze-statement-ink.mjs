import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PNG } from 'pngjs';

const directory = process.argv[2];
const regions = {
  375: { left: 16, top: 1544, width: 343, height: 109 },
  768: { left: 32, top: 1442, width: 704, height: 121 },
  1440: { left: 210, top: 1294, width: 729, height: 145 },
};

for (const [viewport, region] of Object.entries(regions)) {
  process.stdout.write(`VIEW ${viewport}\n`);
  for (const label of ['source', 'target']) {
    const image = PNG.sync.read(await readFile(path.join(directory, `home-${viewport}-${label}.png`)));
    let ink = 0;
    let minX = region.width;
    let minY = region.height;
    let maxX = -1;
    let maxY = -1;
    let totalLuma = 0;
    for (let y = 0; y < region.height; y += 1) {
      for (let x = 0; x < region.width; x += 1) {
        const offset = ((region.top + y) * image.width + region.left + x) * 4;
        const luma = (image.data[offset] * 0.2126) + (image.data[offset + 1] * 0.7152) + (image.data[offset + 2] * 0.0722);
        totalLuma += luma;
        if (luma < 190) {
          ink += 1;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
    process.stdout.write(`${label}: ${JSON.stringify({ ink, bounds: ink ? [minX, minY, maxX, maxY] : null, averageLuma: totalLuma / (region.width * region.height) })}\n`);
  }
}
