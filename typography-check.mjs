/* global document, innerWidth, getComputedStyle, performance */
import puppeteer from 'puppeteer';
import fs from 'node:fs';
const out='qa-results/typography';fs.mkdirSync(out,{recursive:true});
const browser=await puppeteer.launch({headless:true});
const results=[];
for(const width of [360,1440]){
 for(const route of ['/','/about','/contact','/products','/products/granulator-blades','/plastic-industry','/mixer-wear-parts/concrete-mixing-plant/concrete-mixer-blade','/news/granulator-rotor-bed-knife-configuration']){
  const page=await browser.newPage();await page.setViewport({width,height:900});await page.setCacheEnabled(false); await page.setRequestInterception(true); page.on('request',r=>r.url().startsWith('http://127.0.0.1:4173')||r.url().startsWith('data:')?r.continue():r.abort());
  await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'domcontentloaded'});
  await page.waitForSelector('h1',{timeout:20000});await page.evaluate(()=>document.fonts.ready);
  const result=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,heading:[...document.querySelectorAll('h1,h2,h3')].slice(0,5).map(e=>({tag:e.tagName,font:getComputedStyle(e).fontFamily,size:getComputedStyle(e).fontSize})),odd:[...document.querySelectorAll('body *')].filter(e=>e.childNodes.length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&e.getBoundingClientRect().width>0).filter(e=>{const n=parseFloat(getComputedStyle(e).fontSize);return n<12||n%2!==0}).slice(0,10).map(e=>({tag:e.tagName,size:getComputedStyle(e).fontSize,text:e.textContent.slice(0,40)})),fonts:performance.getEntriesByType('resource').filter(e=>e.name.includes('.woff2')).map(e=>({url:e.name,encoded:e.encodedBodySize,transfer:e.transferSize}))}));
  results.push({route,...result});await page.screenshot({path:`${out}/${width}-${route.replaceAll('/','')||'home'}.png`,fullPage:false});await page.close();
 }
}
const page=await browser.newPage();await page.goto('http://127.0.0.1:4173');await page.setCacheEnabled(false);
const manifest=JSON.parse(fs.readFileSync('client/public/fonts/manifest.json','utf8'));
const totals=await page.evaluate(async files=>{performance.clearResourceTimings();for(const f of files)await fetch('/fonts/'+f.file,{cache:'reload'}).then(r=>r.arrayBuffer());return performance.getEntriesByType('resource').filter(e=>e.name.includes('.woff2')).map(e=>({url:e.name,encoded:e.encodedBodySize,transfer:e.transferSize}));},manifest);
fs.writeFileSync(out+'/results.json',JSON.stringify({results,totals},null,2));console.log(JSON.stringify(results.map(({route,width,scroll,odd})=>({route,width,scroll,odd}))));await browser.close();
