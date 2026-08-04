import { readFile } from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const directory = process.argv[2];
if (!directory) throw new Error('Artifact directory is required.');
const regions = {
  375: [['utility',0,36],['mainbar',36,112],['mobile-search',112,169]],
  768: [['utility',0,36],['mainbar',36,112],['mobile-search',112,169]],
  1440: [['utility',0,36],['mainbar',36,112],['desktop-nav',112,164]],
};

for (const [viewport, bands] of Object.entries(regions)) {
  const source = PNG.sync.read(await readFile(path.join(directory, `home-${viewport}-source.png`)));
  const target = PNG.sync.read(await readFile(path.join(directory, `home-${viewport}-target.png`)));
  console.log(`VIEW ${viewport}`);
  for (const [name, start, end] of bands) {
    const height = end - start;
    const a = new PNG({ width: source.width, height });
    const b = new PNG({ width: source.width, height });
    const diff = new PNG({ width: source.width, height });
    PNG.bitblt(source, a, 0, start, source.width, height, 0, 0);
    PNG.bitblt(target, b, 0, start, source.width, height, 0, 0);
    const count = pixelmatch(a.data, b.data, diff.data, source.width, height, { threshold: .1, includeAA: false });
    console.log(`${name}: ${((count * 100) / (source.width * height)).toFixed(3)}%`);
  }
}
