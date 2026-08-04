import { chromium } from 'playwright';

const pages = {
	source: 'https://kiswani-website-82jb.vercel.app/collections/decorative',
	target: 'http://localhost:8088/collections/decorative/',
};

const viewports = [375, 768, 1440];
const browser = await chromium.launch({ headless: true });
const report = {};


try {
	for (const width of viewports) {
		report[width] = {};
		for (const [name, url] of Object.entries(pages)) {
			const page = await browser.newPage({ viewport: { width, height: width === 375 ? 812 : width === 768 ? 1024 : 900 } });
			await page.emulateMedia({ reducedMotion: 'reduce' });
			await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
			await page.addStyleTag({ content: '*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important}' });
			await page.evaluate(async () => {
				for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(320, Math.floor(innerHeight * 0.75))) {
					scrollTo(0, y);
					await new Promise((resolve) => setTimeout(resolve, 50));
				}
				scrollTo(0, 0);
				await document.fonts.ready;
			});
			await page.waitForTimeout(300);

			report[width][name] = await page.evaluate((side) => {
				const rect = (element) => {
					const value = element.getBoundingClientRect();
					return {
						x: Math.round(value.x * 100) / 100,
						y: Math.round(value.y * 100) / 100,
						width: Math.round(value.width * 100) / 100,
						height: Math.round(value.height * 100) / 100,
					};
				};
				const article = side === 'source'
					? document.querySelector('#collection-products article')
					: document.querySelector('.ks-catalog-grid article');
				const imageWrapper = article?.children[0];
				const image = imageWrapper?.querySelector('img');
				const content = article?.children[1];
				const title = content?.querySelector('h3');
				const price = title?.parentElement?.nextElementSibling;
				const footer = price?.nextElementSibling;
				const quantity = footer?.children[0];
				const counter = quantity?.children[1];
				const addButton = footer?.children[1];
				const selectors = side === 'source'
					? ['header', 'main > section:first-of-type', 'main > nav', '#collection-products', '#contact', 'footer']
					: ['header', '.ks-catalog-hero', '.ks-catalog-nav', '.ks-catalog-products', '.ks-catalog-cta', 'footer'];
				const style = (element) => {
					if (!element) return null;
					const css = getComputedStyle(element);
					return {
						display: css.display,
						position: css.position,
						flex: css.flex,
						flexDirection: css.flexDirection,
						gap: css.gap,
						margin: css.margin,
						padding: css.padding,
						border: css.border,
						font: css.font,
						fontSize: css.fontSize,
						fontWeight: css.fontWeight,
						lineHeight: css.lineHeight,
						letterSpacing: css.letterSpacing,
						color: css.color,
						backgroundColor: css.backgroundColor,
						boxShadow: css.boxShadow,
					};
				};
				return {
					scrollHeight: document.documentElement.scrollHeight,
					sections: selectors.map((selector) => {
						const element = document.querySelector(selector);
						return { selector, rect: element ? rect(element) : null };
					}),
					card: {
						article: { rect: rect(article), style: style(article) },
						imageWrapper: { rect: rect(imageWrapper), style: style(imageWrapper) },
						image: { rect: rect(image), style: style(image), src: image?.src, currentSrc: image?.currentSrc, naturalWidth: image?.naturalWidth, naturalHeight: image?.naturalHeight },
						content: { rect: rect(content), style: style(content) },
						title: { rect: rect(title), style: style(title), text: title?.textContent?.trim() },
						price: { rect: rect(price), style: style(price), text: price?.textContent?.trim() },
						footer: { rect: rect(footer), style: style(footer) },
						quantity: { rect: rect(quantity), style: style(quantity) },
						counter: { rect: rect(counter), style: style(counter) },
						counterChildren: Array.from(counter?.children || []).map((element) => ({ rect: rect(element), style: style(element), html: element.outerHTML })),
						addButton: { rect: rect(addButton), style: style(addButton), html: addButton?.outerHTML },
					},
				};
			}, name);

			await page.close();
		}
	}
} finally {
	await browser.close();
}

const differences = {};

const compare = (source, target, prefix, output) => {
	if (Array.isArray(source) && Array.isArray(target)) {
		for (let index = 0; index < Math.max(source.length, target.length); index += 1) {
			compare(source[index], target[index], `${prefix}[${index}]`, output);
		}
		return;
	}

	if (source && target && typeof source === 'object' && typeof target === 'object') {
		for (const key of new Set([...Object.keys(source), ...Object.keys(target)])) {
			if (['src', 'currentSrc', 'html', 'selector'].includes(key)) continue;
			compare(source[key], target[key], prefix ? `${prefix}.${key}` : key, output);
		}
		return;
	}

	if (source !== target) {
		output[prefix] = { source, target };
	}
};

for (const width of viewports) {
	differences[width] = {};
	compare(report[width].source, report[width].target, '', differences[width]);
}

console.log(JSON.stringify(differences, null, 2));
