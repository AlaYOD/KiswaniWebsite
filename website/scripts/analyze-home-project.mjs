import { readFile } from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const directory = process.argv[2];
if (!directory) throw new Error('Artifact directory is required.');

const bands = {
  375: [['top-padding',11967,12031],['heading',12031,12405],['visual-top',12405,12481],['visual-image',12481,12866],['controls',12866,13345],['bottom-padding',13345,13409]],
  768: [['top-padding',7263,7359],['heading',7359,7645],['visual-top',7645,8030],['visual-facts',8030,8207],['controls',8207,8645],['bottom-padding',8645,8741]],
  1440: [['top-padding',5505,5617],['heading',5617,5902],['visual-top',5902,6407],['visual-facts',6407,6564],['controls',6564,6772],['bottom-padding',6772,6884]],
};

for (const [viewport, regions] of Object.entries(bands)) {
  const source = PNG.sync.read(await readFile(path.join(directory, `home-${viewport}-source.png`)));
  const target = PNG.sync.read(await readFile(path.join(directory, `home-${viewport}-target.png`)));
  console.log(`VIEW ${viewport}`);
  for (const [name, start, end] of regions) {
    const height = end - start;
    const sourceCrop = new PNG({ width: source.width, height });
    const targetCrop = new PNG({ width: source.width, height });
    const diff = new PNG({ width: source.width, height });
    PNG.bitblt(source, sourceCrop, 0, start, source.width, height, 0, 0);
    PNG.bitblt(target, targetCrop, 0, start, source.width, height, 0, 0);
    const count = pixelmatch(sourceCrop.data, targetCrop.data, diff.data, source.width, height, { threshold: .1, includeAA: false });
    console.log(`${name}: ${((count * 100) / (source.width * height)).toFixed(3)}%`);
  }
}
