import { readFile } from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const directory=process.argv[2];
const regions={
  375:[['top',1371,1435],['index',1435,1512],['gap-one',1512,1544],['heading',1544,1653],['gap-two',1653,1685],['body',1685,1777],['bottom',1777,1840]],
  768:[['top',1237,1333],['index',1333,1410],['gap-one',1410,1442],['heading',1442,1563],['gap-two',1563,1595],['body',1595,1659],['bottom',1659,1755]],
  1440:[['top',1198,1294],['content',1294,1439],['bottom',1439,1535]],
};
for(const [viewport,bands] of Object.entries(regions)){
 const source=PNG.sync.read(await readFile(path.join(directory,`home-${viewport}-source.png`)));
 const target=PNG.sync.read(await readFile(path.join(directory,`home-${viewport}-target.png`)));
 console.log(`VIEW ${viewport}`);
 for(const [name,start,end] of bands){const h=end-start,a=new PNG({width:source.width,height:h}),b=new PNG({width:source.width,height:h}),d=new PNG({width:source.width,height:h});PNG.bitblt(source,a,0,start,source.width,h,0,0);PNG.bitblt(target,b,0,start,source.width,h,0,0);const n=pixelmatch(a.data,b.data,d.data,source.width,h,{threshold:.1,includeAA:false});console.log(`${name}: ${((n*100)/(source.width*h)).toFixed(3)}%`);}
}
