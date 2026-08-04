import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const urls = {
	source: 'https://kiswani-website-82jb.vercel.app/projects',
	target: 'http://localhost:8088/projects/',
};
const viewports = [375, 768, 1440];
const output = {};

try {
	for (const width of viewports) {
		output[width] = {};
		for (const [name, url] of Object.entries(urls)) {
			const page = await browser.newPage({ viewport: { width, height: width === 375 ? 812 : width === 768 ? 1024 : 900 } });
			await page.emulateMedia({ reducedMotion: 'reduce' });
			await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
			await page.addStyleTag({ content: '*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important}' });
			await page.evaluate(async () => {
				const images = Array.from(document.images);
				for (const image of images) image.loading = 'eager';
				for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(320, Math.floor(innerHeight * 0.75))) {
					scrollTo(0, y);
					await new Promise((resolve) => setTimeout(resolve, 50));
				}
				scrollTo(0, 0);
				await document.fonts.ready;
				await Promise.all(images.map((image) => image.decode?.().catch(() => {})));
			});
			await page.waitForTimeout(300);

			output[width][name] = await page.evaluate(() => {
				const rect = (element) => {
					if (!element) return null;
					const value = element.getBoundingClientRect();
					return Object.fromEntries(['x', 'y', 'width', 'height'].map((key) => [key, Math.round(value[key] * 100) / 100]));
				};
				const sections = Array.from(document.querySelectorAll('main > section'));
				const projects = document.querySelector('#projects');
				const projectButtons = projects ? Array.from(projects.querySelectorAll('button')).filter((button) => button.querySelector('img')) : [];
				const directChildren = (element) => element ? Array.from(element.children).map((child) => ({ tag: child.tagName, className: child.className, rect: rect(child) })) : [];
				return {
					statusClass: document.body.className,
					scrollHeight: document.documentElement.scrollHeight,
					header: rect(document.querySelector('header')),
					sections: sections.map((section, index) => ({ index, id: section.id, className: section.className, rect: rect(section), children: directChildren(section) })),
					footer: rect(document.querySelector('footer')),
					projectCards: projectButtons.map((button) => ({ rect: rect(button), text: button.innerText.replace(/\s+/g, ' ').trim(), image: button.querySelector('img')?.getAttribute('src') })),
				};
			});
			await page.close();
		}
	}
} finally {
	await browser.close();
}

const differences = {};
const compare = (source, target, prefix, result) => {
	if (Array.isArray(source) && Array.isArray(target)) {
		for (let index = 0; index < Math.max(source.length, target.length); index += 1) compare(source[index], target[index], `${prefix}[${index}]`, result);
		return;
	}
	if (source && target && typeof source === 'object' && typeof target === 'object') {
		for (const key of new Set([...Object.keys(source), ...Object.keys(target)])) {
			if (['statusClass', 'className', 'image'].includes(key)) continue;
			compare(source[key], target[key], prefix ? `${prefix}.${key}` : key, result);
		}
		return;
	}
	if (source !== target) result[prefix] = { source, target };
};

for (const width of viewports) {
	differences[width] = {};
	compare(output[width].source, output[width].target, '', differences[width]);
}

console.log(JSON.stringify(differences, null, 2));
