/* global document, window, getComputedStyle, innerWidth, requestAnimationFrame */
import fs from 'node:fs';
import puppeteer from 'puppeteer';
const phase=process.argv[2]||'intermediate';
const base=process.env.QA_BASE||'http://127.0.0.1:4173';
const out=`qa-results/full-qa/${phase}`;fs.mkdirSync(out,{recursive:true});
const {core,viewports,locales}=JSON.parse(fs.readFileSync('qa-results/full-qa/samples.json','utf8'));
const browser=await puppeteer.launch({headless:true});
try {
 for(const {id,path} of [...core,...locales.map((path,i)=>({id:`L${i}`,path}))]){
  for(const [width,height] of (id.startsWith('L')?[[390,844]]:viewports)){
   const page=await browser.newPage();await page.setViewport({width,height});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.setRequestInterception(true);page.on('request',r=>r.url().startsWith(base)||r.url().startsWith('data:')?r.continue():r.abort());
   try {
    const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:20000});
    await page.waitForSelector('h1',{timeout:15000});await page.evaluate(()=>document.fonts.ready);
    // Trigger lazy sections and image loading without arbitrary fixed delays.
    await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(requestAnimationFrame);}window.scrollTo(0,0);});
    const data=await page.evaluate(()=>{
     const visible=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'};
     const els=[...document.querySelectorAll('body *')];
     const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
     return {viewport:[innerWidth,window.innerHeight],scrollWidth:document.documentElement.scrollWidth,title:document.title,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent),canonical:[...document.querySelectorAll('link[rel=canonical]')].map(e=>e.href),duplicateIds:ids.filter((v,i)=>ids.indexOf(v)!==i),headings:[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(e=>({tag:e.tagName,text:e.textContent,font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize})),odd:els.filter(e=>visible(e)&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())).filter(e=>{const n=parseFloat(getComputedStyle(e).fontSize);return n<12||n%2!==0}).map(e=>({tag:e.tagName,cls:e.className,size:getComputedStyle(e).fontSize,text:e.textContent.slice(0,100)})),links:[...document.querySelectorAll('a[href]')].map(e=>({href:e.href,text:e.textContent.trim(),target:e.target,rel:e.rel})),images:[...document.images].map(e=>({src:e.currentSrc||e.src,alt:e.getAttribute('alt'),width:e.naturalWidth,height:e.naturalHeight,loading:e.loading,priority:e.fetchPriority})),smallTargets:[...document.querySelectorAll('button,input,select,textarea')].filter(visible).filter(e=>{const r=e.getBoundingClientRect();return r.width<44||r.height<44}).map(e=>({tag:e.tagName,cls:e.className,label:e.getAttribute('aria-label')||e.textContent.slice(0,70),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))};
    });
    if(width===360||id.startsWith('L')){
     await page.addScriptTag({path:'qa-results/full-qa/axe.min.js'});
     data.axe=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return {violations:r.violations,incomplete:r.incomplete,passes:r.passes.map(p=>p.id)};});
    }
    await page.screenshot({path:`${out}/${id}-${width}.png`,fullPage:true});
    fs.writeFileSync(`${out}/${id}-${width}.json`,JSON.stringify({id,path,status:response.status(),errors,...data},null,2));
    console.log(`${id} ${width}: overflow=${data.scrollWidth-width} axe=${data.axe?.violations.length??'-'} odd=${data.odd.length}`);
   }catch(e){fs.writeFileSync(`${out}/${id}-${width}-error.json`,JSON.stringify({path,error:String(e)}));console.log(`${id} ${width}: ERROR ${e.message}`);}finally{await page.close();}
  }
 }
} finally {await browser.close();}
