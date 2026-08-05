import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const bases = [
  ['source', process.env.SOURCE_URL || 'https://kiswani-website-82jb.vercel.app'],
  ['target', process.env.TARGET_URL || 'http://localhost:8088'],
];
const requestedKey = process.argv[2] || '';

const rect = (node) => {
  const value = node?.getBoundingClientRect();
  return value ? { x: value.x, y: value.y, width: value.width, height: value.height } : null;
};

for (const [label, base] of bases) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026', 'seen'));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(async () => document.fonts?.ready);
  const nav = page.getByRole('navigation', { name: 'Product categories' });

  const entries = [
    ['products', /^Products/],
    ['lighting', /^Lighting fixtures/],
    ['bulbs', /^Light bulbs/],
    ['electrical', /^Electrical products/],
    ['ilite', /^i lite/],
  ].filter(([key]) => !requestedKey || requestedKey === key);
  for (const [key, name] of entries) {
    await nav.getByRole('link', { name }).hover();
    await page.locator('#collection-mega-menu').waitFor({ state: 'visible' });
    await page.waitForTimeout(40);
    const metrics = await page.evaluate((key) => {
      const rect = (node) => {
        const value = node?.getBoundingClientRect();
        return value ? { x: value.x, y: value.y, width: value.width, height: value.height } : null;
      };
      const mega = document.querySelector('#collection-mega-menu');
      const panel = mega?.firstElementChild?.matches('[hidden]') ? [...mega.children].find((item) => !item.hidden) : mega?.firstElementChild;
      const first = panel?.children?.[1]?.firstElementChild || panel?.children?.[1]?.firstElementChild?.firstElementChild;
      const intro = panel?.children?.[0];
      const h2 = intro?.querySelector('h2');
      const body = h2?.nextElementSibling;
      const cta = intro?.querySelector('a');
      const right = panel?.children?.[1];
      const grid = key === 'products' ? right : right?.firstElementChild;
      const cards = key === 'products'
        ? [...(right?.children || [])]
        : [...(right?.firstElementChild?.children || right?.children || [])];
      const card = cards[0];
      const image = card?.firstElementChild;
      const copy = card?.children?.[1];
      const detail = (node) => node ? {
        tag: node.tagName,
        rect: rect(node),
        style: cs(node),
        children: [...node.children].map((item) => ({
          tag: item.tagName,
          rect: rect(item),
          style: cs(item),
          children: [...item.children].slice(0, 4).map((child) => ({ tag: child.tagName, rect: rect(child), style: cs(child) })),
        })),
      } : null;
      const cs = (node) => {
        if (!node) return null;
        const style = getComputedStyle(node);
        return {
          display: style.display,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          padding: style.padding,
          margin: style.margin,
          gap: style.gap,
          background: style.backgroundColor,
        };
      };
      return {
        mega: rect(mega),
        panel: rect(panel),
        intro: rect(intro),
        introStyle: cs(intro),
        h2: { rect: rect(h2), style: cs(h2) },
        body: { rect: rect(body), style: cs(body) },
        cta: { rect: rect(cta), style: cs(cta) },
        right: { rect: rect(right), style: cs(right) },
        grid: grid ? {
          rect: rect(grid),
          columns: getComputedStyle(grid).gridTemplateColumns,
          autoColumns: getComputedStyle(grid).gridAutoColumns,
          width: getComputedStyle(grid).width,
          minWidth: getComputedStyle(grid).minWidth,
        } : null,
        cardCount: cards.length,
        cards: cards.slice(0, 4).map(rect),
        cardData: cards.slice(0, 5).map((item) => {
          const img = item.querySelector('img');
          return {
            text: item.textContent.trim().slice(0, 80),
            src: img?.getAttribute('src'),
            imgRect: rect(img),
            naturalWidth: img?.naturalWidth,
            naturalHeight: img?.naturalHeight,
            objectFit: img ? getComputedStyle(img).objectFit : null,
            objectPosition: img ? getComputedStyle(img).objectPosition : null,
          };
        }),
        firstCard: {
          style: cs(card),
          image: rect(image),
          imageStyle: cs(image),
          imageDetail: detail(image),
          copy: rect(copy),
          copyStyle: cs(copy),
          copyDetail: detail(copy),
        },
      };
    }, key);
    process.stdout.write(`${label} ${key}\n${JSON.stringify(metrics, null, 2)}\n`);
  }
  await context.close();
}

await browser.close();
