/* global document, window */
import fs from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:5173';
import puppeteer from 'puppeteer';
const browser=await puppeteer.launch({headless:true});
try {
 const page=await browser.newPage();await page.setViewport({width:360,height:640});
 await page.setRequestInterception(true);page.on('request',r=>r.url().startsWith(base)?r.continue():r.abort());
 await page.goto(base+'/news/lithium-battery-electrode-slitting-knives-guide',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('main table');
 const regions=await page.$$('main [role="region"][tabindex="0"]');const result=[];
 for(const el of regions){
  const before=await el.evaluate(e=>({left:e.scrollLeft,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,label:e.getAttribute('aria-label')}));
  if(before.scrollWidth<=before.clientWidth)continue;
  await el.focus();await page.keyboard.press('ArrowRight');
  await new Promise(resolve=>setTimeout(resolve,300));
  const after=await el.evaluate(e=>({left:e.scrollLeft,focused:document.activeElement===e}));
  result.push({before,after,pass:after.focused&&after.left>before.left&&!!before.label});
 }
 await page.addScriptTag({path:'qa-results/full-qa/axe.min.js'});
 const axe=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'rule',values:['scrollable-region-focusable']}});return r.violations;});
 const pass=result.length===2&&result.every(r=>r.pass)&&axe.length===0;
 fs.writeFileSync('qa-results/full-qa/article-table-keyboard.json',JSON.stringify({pass,result,axe},null,2));
 console.log(JSON.stringify({pass,result,axeCount:axe.length}));if(!pass)process.exitCode=1;
}finally{await browser.close();}
