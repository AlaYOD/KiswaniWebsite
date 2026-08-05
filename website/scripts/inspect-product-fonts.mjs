import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
for (const [label,url] of [['source','https://kiswani-website-82jb.vercel.app/products/kl-gl-001'],['target','http://localhost:8088/products/kl-gl-001/']]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.emulateMedia({ reducedMotion:'reduce' });
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026','seen'));
  await page.goto(url,{waitUntil:'networkidle',timeout:60000});
  await page.evaluate(async () => document.fonts?.ready);
  const data = await page.evaluate(() => {
    const sels = ['html','body','.ks-product','h1','.ks-product-description','.ks-product-price b','.ks-product-summary b','.ks-desktop-nav a','.ks-footer h2'];
    return Object.fromEntries(sels.map((sel)=>{
      const node = document.querySelector(sel) || (sel==='html' ? document.documentElement : sel==='body' ? document.body : null);
      const cs = node ? getComputedStyle(node) : null;
      return [sel, cs ? {fontFamily:cs.fontFamily,fontWeight:cs.fontWeight,fontSize:cs.fontSize,lineHeight:cs.lineHeight,letterSpacing:cs.letterSpacing,webkitFontSmoothing:cs.webkitFontSmoothing,textRendering:cs.textRendering} : null];
    }));
  });
  console.log(label, JSON.stringify(data,null,2));
  await page.close();
}
await browser.close();
