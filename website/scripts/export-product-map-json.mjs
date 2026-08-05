import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourcePath = path.resolve('lib/product-map.ts');
const outputPath = path.resolve('wordpress-theme/kiswani-lights-v2/data/product-map.json');
const source = await readFile(sourcePath, 'utf8');
const marker = 'export const productMapGroups: ProductMapGroup[] = ';
const start = source.indexOf(marker);
if (start < 0) throw new Error('productMapGroups export was not found.');

const jsonStart = start + marker.length;
const jsonEnd = source.indexOf('\n];', jsonStart);
if (jsonEnd < 0) throw new Error('productMapGroups array end was not found.');

const productMap = JSON.parse(`${source.slice(jsonStart, jsonEnd)}\n]`);
await writeFile(outputPath, `${JSON.stringify(productMap, null, 2)}\n`, 'utf8');
process.stdout.write(`${productMap.length} groups exported to ${outputPath}`);
