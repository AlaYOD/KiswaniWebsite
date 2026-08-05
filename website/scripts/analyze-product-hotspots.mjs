import { readFile } from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const dir = process.argv[2];
const name = process.argv[3];
if (!dir || !name) throw new Error('usage: node scripts/analyze-product-hotspots.mjs <dir> <name>');
for (const vp of ['375','768','1440']) {
  const source = PNG.sync.read(await readFile(path.join(dir, `${name}-${vp}-source.png`)));
  const target = PNG.sync.read(await readFile(path.join(dir, `${name}-${vp}-target.png`)));
  const w = Math.max(source.width, target.width);
  const h = Math.max(source.height, target.height);
  const normalize = (img) => {
    const canvas = new PNG({ width: w, height: h, fill: true });
    for (let i = 0; i < canvas.data.length; i += 4) { canvas.data[i]=255; canvas.data[i+1]=255; canvas.data[i+2]=255; canvas.data[i+3]=255; }
    PNG.bitblt(img, canvas, 0, 0, img.width, img.height, 0, 0);
    return canvas;
  };
  const s = normalize(source); const t = normalize(target);
  const rowCounts = new Array(h).fill(0);
  let total = 0;
  for (let y=0; y<h; y++) {
    for (let x=0; x<w; x++) {
      const i = (y*w+x)*4;
      const dr=Math.abs(s.data[i]-t.data[i]); const dg=Math.abs(s.data[i+1]-t.data[i+1]); const db=Math.abs(s.data[i+2]-t.data[i+2]); const da=Math.abs(s.data[i+3]-t.data[i+3]);
      if (Math.max(dr,dg,db,da) > 24) { rowCounts[y]++; total++; }
    }
  }
  const bands=[]; let start=null; let sum=0; let peak=0;
  for (let y=0; y<h; y++) {
    const count=rowCounts[y]; const hot=count > w*0.015;
    if (hot && start===null) { start=y; sum=0; peak=0; }
    if (hot) { sum += count; peak=Math.max(peak,count); }
    if ((!hot || y===h-1) && start!==null) { bands.push({ y1:start, y2:y-1, height:y-start, pixels:sum, peak }); start=null; }
  }
  bands.sort((a,b)=>b.pixels-a.pixels);
  console.log(`VIEW ${vp} ${w}x${h} total ${total} ${(total/(w*h)*100).toFixed(4)}%`);
  console.log(bands.slice(0,12));
}
