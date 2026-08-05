import { readFile, writeFile } from 'node:fs/promises';
import { PNG } from 'pngjs';

const [inputPath, outputPath, leftValue, topValue, widthValue, heightValue] = process.argv.slice(2);
if (!inputPath || !outputPath) throw new Error('Input and output PNG paths are required.');
const input = PNG.sync.read(await readFile(inputPath));
const left = Number(leftValue || 0);
const top = Number(topValue || 0);
const width = Number(widthValue || input.width);
const height = Number(heightValue || input.height);
const output = new PNG({ width, height });
PNG.bitblt(input, output, left, top, width, height, 0, 0);
await writeFile(outputPath, PNG.sync.write(output));
process.stdout.write(outputPath);
