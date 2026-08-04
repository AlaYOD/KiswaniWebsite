/**
 * Report pixelmatch percentages for known vertical page bands.
 *
 * Usage:
 *   node scripts/analyze-visual-bands.mjs <artifact-directory> <page-name>
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const artifactDirectory = process.argv[2];
const pageName = process.argv[3];

if (!artifactDirectory || !pageName) {
	throw new Error('Artifact directory and page name are required.');
}

const bandsByViewport = {
	375: [
		['header', 0, 169],
		['hero', 169, 1303],
		['nav', 1303, 1552],
		['products', 1552, 8853],
		['cta', 8853, 9251],
		['footer', 9251, 10816],
	],
	768: [
		['header', 0, 169],
		['hero', 169, 1435],
		['nav', 1435, 1516],
		['products', 1516, 6358],
		['cta', 6358, 6868],
		['footer', 6868, 7822],
	],
	1440: [
		['header', 0, 164],
		['hero', 164, 948],
		['nav', 948, 1029],
		['products', 1029, 5103],
		['cta', 5103, 5456],
		['footer', 5456, 6041],
	],
};

for (const [viewport, bands] of Object.entries(bandsByViewport)) {
	const source = PNG.sync.read(
		await readFile(path.join(artifactDirectory, `${pageName}-${viewport}-source.png`)),
	);
	const target = PNG.sync.read(
		await readFile(path.join(artifactDirectory, `${pageName}-${viewport}-target.png`)),
	);

	console.log(`VIEW ${viewport} source ${source.width}x${source.height} target ${target.width}x${target.height}`);

	for (const [name, startY, requestedEndY] of bands) {
		const endY = Math.min(requestedEndY, source.height, target.height);
		const height = endY - startY;
		const sourceCrop = new PNG({ width: source.width, height });
		const targetCrop = new PNG({ width: source.width, height });
		const diff = new PNG({ width: source.width, height });

		PNG.bitblt(source, sourceCrop, 0, startY, source.width, height, 0, 0);
		PNG.bitblt(target, targetCrop, 0, startY, source.width, height, 0, 0);
		const mismatchedPixels = pixelmatch(
			sourceCrop.data,
			targetCrop.data,
			diff.data,
			source.width,
			height,
			{ threshold: 0.1, includeAA: false },
		);

		console.log(`${name}: ${mismatchedPixels} (${((100 * mismatchedPixels) / (source.width * height)).toFixed(3)}%)`);
	}
}
