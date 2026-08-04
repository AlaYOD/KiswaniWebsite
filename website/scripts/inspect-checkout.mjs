import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const urls = { source: 'https://kiswani-website-82jb.vercel.app/checkout', target: 'http://localhost:8088/checkout/' };
const output = {};

try {
	for (const width of [375, 768, 1440]) {
		output[width] = {};
		for (const [name, url] of Object.entries(urls)) {
			const page = await browser.newPage({ viewport: { width, height: width === 375 ? 812 : width === 768 ? 1024 : 900 } });
			await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
			await page.evaluate(async () => document.fonts.ready);
			output[width][name] = await page.evaluate(() => {
				const rect = (element) => {
					if (!element) return null;
					const value = element.getBoundingClientRect();
					return Object.fromEntries(['x', 'y', 'width', 'height'].map((key) => [key, Math.round(value[key] * 100) / 100]));
				};
				const item = (element) => ({ rect: rect(element), tag: element?.tagName, className: element?.className, text: element?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 100) });
				const sections = Array.from(document.querySelectorAll('main > section'));
				const heroInner = sections[0]?.children[0];
				const bodyInner = sections[1]?.children[0];
				const summary = bodyInner?.children[0];
				const form = bodyInner?.children[1];
				return {
					scrollHeight: document.documentElement.scrollHeight,
					header: rect(document.querySelector('header')),
					sections: sections.map(item),
					hero: { inner: item(heroInner), back: item(heroInner?.children[0]), grid: item(heroInner?.children[1]), copy: item(heroInner?.children[1]?.children[0]), count: item(heroInner?.children[1]?.children[1]) },
					body: { inner: item(bodyInner), summary: item(summary), summaryHeading: item(summary?.children[0]), empty: item(summary?.children[1]), form: item(form), formChildren: Array.from(form?.children || []).map(item) },
					footer: rect(document.querySelector('body > div > footer, body > footer')),
				};
			});
			await page.close();
		}
	}
} finally {
	await browser.close();
}

console.log(JSON.stringify(output, null, 2));
