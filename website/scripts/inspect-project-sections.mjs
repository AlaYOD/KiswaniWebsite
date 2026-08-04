import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const urls = { source: 'https://kiswani-website-82jb.vercel.app/projects', target: 'http://localhost:8088/projects/' };
const output = {};

try {
	for (const width of [375, 768, 1440]) {
		output[width] = {};
		for (const [name, url] of Object.entries(urls)) {
			const page = await browser.newPage({ viewport: { width, height: width === 375 ? 812 : width === 768 ? 1024 : 900 } });
			await page.emulateMedia({ reducedMotion: 'reduce' });
			await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
			await page.evaluate(async () => document.fonts.ready);
			output[width][name] = await page.evaluate(() => {
				const sections = Array.from(document.querySelectorAll('main > section'));
				const rect = (element) => {
					if (!element) return null;
					const value = element.getBoundingClientRect();
					return Object.fromEntries(['x', 'y', 'width', 'height'].map((key) => [key, Math.round(value[key] * 100) / 100]));
				};
				const style = (element) => {
					if (!element) return null;
					const css = getComputedStyle(element);
					return { margin: css.margin, padding: css.padding, border: css.border, font: css.font, lineHeight: css.lineHeight, gap: css.gap };
				};
				const item = (element) => ({ rect: rect(element), style: style(element), text: element?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 120) });
				const heroInner = sections[0]?.children[4];
				const galleryInner = sections[1]?.children[1];
				const testimonialInner = sections[2]?.children[0];
				const processInner = sections[3]?.children[0];
				const ctaInner = sections[4]?.children[0];
				return {
					hero: { copy: item(heroInner?.children[0]), kicker: item(heroInner?.querySelector('div > div')), h1: item(heroInner?.querySelector('h1')), lead: item(heroInner?.querySelector('h1 + p')), actions: item(heroInner?.querySelector('h1 + p + div')) },
					gallery: { header: item(galleryInner?.children[0]), filters: item(galleryInner?.children[1]), grid: item(galleryInner?.children[2]) },
					testimonial: { inner: item(testimonialInner), image: item(testimonialInner?.children[0]), copy: item(testimonialInner?.children[1]), heading: item(testimonialInner?.children[1]?.querySelector('h2')?.parentElement?.parentElement), quoteWrap: item(testimonialInner?.children[1]?.querySelector('blockquote')?.parentElement), quote: item(testimonialInner?.children[1]?.querySelector('blockquote')), footer: item(testimonialInner?.children[1]?.children[1]) },
					process: { header: item(processInner?.children[0]), grid: item(processInner?.children[1]), cards: Array.from(processInner?.children[1]?.children || []).map(item) },
					cta: { inner: item(ctaInner), copy: item(ctaInner?.children[0]), button: item(ctaInner?.children[1]) },
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
			if (['style', 'text'].includes(key)) continue;
			compare(source[key], target[key], prefix ? `${prefix}.${key}` : key, result);
		}
		return;
	}
	if (source !== target) result[prefix] = { source, target };
};
for (const width of [375, 768, 1440]) {
	differences[width] = {};
	compare(output[width].source, output[width].target, '', differences[width]);
}
console.log(JSON.stringify(differences, null, 2));
