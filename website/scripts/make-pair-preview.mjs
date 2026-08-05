import path from 'node:path';
import sharp from 'sharp';

const [leftPath, rightPath, outputPath, widthValue] = process.argv.slice(2);

if (!leftPath || !rightPath || !outputPath) {
  throw new Error('Left image, right image, and output paths are required.');
}

const panelWidth = Number(widthValue || 320);
const [left, right] = await Promise.all([
  sharp(leftPath).resize({ width: panelWidth }).jpeg({ quality: 42 }).toBuffer({ resolveWithObject: true }),
  sharp(rightPath).resize({ width: panelWidth }).jpeg({ quality: 42 }).toBuffer({ resolveWithObject: true }),
]);

const height = Math.max(left.info.height, right.info.height);
await sharp({
  create: {
    width: panelWidth * 2,
    height,
    channels: 3,
    background: '#ffffff',
  },
})
  .composite([
    { input: left.data, left: 0, top: 0 },
    { input: right.data, left: panelWidth, top: 0 },
  ])
  .jpeg({ quality: 42, chromaSubsampling: '4:2:0' })
  .toFile(path.resolve(outputPath));

process.stdout.write(path.resolve(outputPath));
