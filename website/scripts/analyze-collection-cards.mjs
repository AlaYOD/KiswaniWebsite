import { readFile } from 'node:fs/promises';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const artifactDirectory = process.argv[2];
if (!artifactDirectory) throw new Error('Artifact directory is required.');

const regions = {
	375: {
		card: { source: [16, 1857, 343, 269], target: [16, 1857, 343, 269] },
		image: { source: [17, 1858, 128, 267], target: [17, 1858, 128, 267] },
		content: { source: [145, 1858, 213, 267], target: [145, 1858, 213, 267] },
	},
	768: {
		card: { source: [32, 1866, 221, 530], target: [32, 1867, 221, 530] },
		image: { source: [33, 1867, 219, 219], target: [33, 1868, 219, 219] },
		content: { source: [33, 2086, 219, 309], target: [33, 2087, 219, 309] },
	},
	1440: {
		card: { source: [32, 1291, 329, 600], target: [32, 1291, 329, 600] },
		image: { source: [33, 1292, 327, 327], target: [33, 1292, 327, 327] },
		content: { source: [33, 1619, 327, 271], target: [33, 1619, 327, 271] },
	},
};

const crop = (image, [x, y, width, height]) => {
	const result = new PNG({ width, height });
	PNG.bitblt(image, result, x, y, width, height, 0, 0);
	return result;
};

for (const [viewport, viewportRegions] of Object.entries(regions)) {
	const prefix = `collection-decorative-${viewport}`;
	const source = PNG.sync.read(await readFile(path.join(artifactDirectory, `${prefix}-source.png`)));
	const target = PNG.sync.read(await readFile(path.join(artifactDirectory, `${prefix}-target.png`)));
	console.log(`VIEW ${viewport}`);

	for (const [name, coordinates] of Object.entries(viewportRegions)) {
		const sourceCrop = crop(source, coordinates.source);
		const targetCrop = crop(target, coordinates.target);
		const diff = new PNG({ width: sourceCrop.width, height: sourceCrop.height });
		const mismatch = pixelmatch(sourceCrop.data, targetCrop.data, diff.data, sourceCrop.width, sourceCrop.height, { threshold: 0.1, includeAA: false });
		console.log(`${name}: ${mismatch} (${((100 * mismatch) / (sourceCrop.width * sourceCrop.height)).toFixed(3)}%)`);
	}

	if (viewport === '375') {
		for (let index = 0; index < 24; index += 1) {
			const y = 1857 + index * 289;
			const sourceCard = crop(source, [16, y, 343, 269]);
			const targetCard = crop(target, [16, y, 343, 269]);
			const diff = new PNG({ width: 343, height: 269 });
			const mismatch = pixelmatch(sourceCard.data, targetCard.data, diff.data, 343, 269, { threshold: 0.1, includeAA: false });
			const sourceImage = crop(source, [17, y + 1, 128, 267]);
			const targetImage = crop(target, [17, y + 1, 128, 267]);
			const imageDiff = new PNG({ width: 128, height: 267 });
			const imageMismatch = pixelmatch(sourceImage.data, targetImage.data, imageDiff.data, 128, 267, { threshold: 0.1, includeAA: false });
			console.log(`card-${index + 1}: ${mismatch} (${((100 * mismatch) / (343 * 269)).toFixed(3)}%), image ${imageMismatch} (${((100 * imageMismatch) / (128 * 267)).toFixed(3)}%)`);
		}
	}}
