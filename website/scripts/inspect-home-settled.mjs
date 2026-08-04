import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const width = Number(process.env.WIDTH || 768);
const height = width === 375 ? 812 : width === 768 ? 1024 : 900;
for (const [label,url] of [['source','https://kiswani-website-82jb.vercel.app'],['target',process.env.TARGET_URL || 'http://localhost:8088']]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => sessionStorage.setItem('kiswani-brand-intro-2026','seen'));
  await page.goto(url,{waitUntil:'networkidle',timeout:60000});
  await page.addStyleTag({content:'*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}'});
  await page.evaluate(async()=>document.fonts?.ready);
  await page.evaluate(async()=>{
    const images=[...document.images]; images.forEach(image=>image.loading='eager');
    const step=Math.max(320,Math.floor(innerHeight*.75));
    for(let offset=0;offset<document.documentElement.scrollHeight;offset+=step){scrollTo(0,offset);await new Promise(resolve=>setTimeout(resolve,50));}
    scrollTo(0,0); await Promise.all(images.map(image=>image.decode?.().catch(()=>{})));
  });
  await page.waitForTimeout(300);
  console.log(label,JSON.stringify(await page.evaluate((siteLabel)=>{
    const read=(node)=>{if(!node)return null;const r=node.getBoundingClientRect();const c=getComputedStyle(node);return {rect:[r.left,r.top+scrollY,r.width,r.height].map(v=>Math.round(v*100)/100),transform:c.transform,opacity:c.opacity};};
    const hero=document.querySelector('#top');
    const statement=siteLabel==='source'?[...document.querySelectorAll('main>section')][2]:document.querySelector('.ks-statement');
    return {heroImage:read(siteLabel==='source'?hero?.firstElementChild:hero?.querySelector('.ks-hero__image')),heroContent:read(siteLabel==='source'?hero?.lastElementChild?.firstElementChild:hero?.querySelector('.ks-hero__content')),statement:read(statement),statementChildren:statement?.firstElementChild?[...statement.firstElementChild.children].map(read):[]};
  },label)));
  await page.close();
}
await browser.close();
