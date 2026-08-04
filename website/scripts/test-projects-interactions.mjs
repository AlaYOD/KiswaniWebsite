import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
const pageErrors = [];

page.on('console', (message) => {
	if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', (error) => pageErrors.push(error.message));

try {
	const response = await page.goto('http://localhost:8088/projects/', { waitUntil: 'networkidle', timeout: 60000 });
	const cards = page.locator('[data-project-card]');
	const visibleCount = async () => cards.evaluateAll((items) => items.filter((item) => !item.hidden).length);

	const initialCards = await visibleCount();
	await page.locator('[data-project-filter="residential"]').click();
	const residentialCards = await visibleCount();
	const residentialPressed = await page.locator('[data-project-filter="residential"]').getAttribute('aria-pressed');
	await page.locator('[data-project-filter="all"]').click();
	const restoredCards = await visibleCount();

	await cards.first().click();
	const dialogVisible = await page.locator('[data-project-dialog]').isVisible();
	const dialogTitle = await page.locator('[data-project-dialog-title]').textContent();
	await page.keyboard.press('Escape');
	const dialogClosed = await page.locator('[data-project-dialog]').isHidden();

	await page.locator('[data-project-testimonial="next"]').click();
	const testimonialLocation = await page.locator('[data-project-testimonial-location]').textContent();
	const testimonialCount = await page.locator('[data-project-testimonial-count]').textContent();

	await page.locator('[data-project-contact-open]').last().click();
	const contactVisible = await page.locator('[data-project-contact]').isVisible();
	await page.locator('[data-project-contact-close]').click();
	const contactClosed = await page.locator('[data-project-contact]').isHidden();

	const result = {
		status: response?.status(),
		initialCards,
		residentialCards,
		residentialPressed,
		restoredCards,
		dialogVisible,
		dialogTitle: dialogTitle?.trim(),
		dialogClosed,
		testimonialLocation: testimonialLocation?.trim(),
		testimonialCount: testimonialCount?.trim(),
		contactVisible,
		contactClosed,
		consoleErrors,
		pageErrors,
	};

	const passed = result.status === 200
		&& initialCards === 10
		&& residentialCards === 4
		&& residentialPressed === 'true'
		&& restoredCards === 10
		&& dialogVisible
		&& result.dialogTitle === 'Warm dining residence'
		&& dialogClosed
		&& result.testimonialLocation === 'Bethlehem'
		&& result.testimonialCount === '02 / 03'
		&& contactVisible
		&& contactClosed
		&& consoleErrors.length === 0
		&& pageErrors.length === 0;

	console.log(JSON.stringify({ passed, ...result }, null, 2));
	if (!passed) process.exitCode = 1;
} finally {
	await browser.close();
}
