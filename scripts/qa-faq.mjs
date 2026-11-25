/* global document */
import fs from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:5173';
import puppeteer from 'puppeteer';
const browser=await puppeteer.launch({headless:true});
try {
 const page=await browser.newPage();
 await page.setRequestInterception(true);
 page.on('request',r=>r.url().startsWith(base)?r.continue():r.abort());
 await page.goto(base,{waitUntil:'domcontentloaded'});
 const selector='button[aria-controls][aria-expanded]';
 await page.waitForFunction(() => [...document.querySelectorAll('button[aria-controls]')].some(e => document.getElementById(e.getAttribute('aria-controls'))?.hidden));
 const triggers=await page.$$(selector);const result=[];
 for(const trigger of triggers){
  const panel=await trigger.evaluate(e=>!!document.getElementById(e.getAttribute('aria-controls')));
  if(!panel)continue;
  const before=await trigger.evaluate(e=>({expanded:e.getAttribute('aria-expanded'),hidden:document.getElementById(e.getAttribute('aria-controls')).hidden}));
  if(!before.hidden)continue;
  await trigger.focus();await page.keyboard.press('Enter');
  const expanded=await trigger.evaluate(e=>e.getAttribute('aria-expanded')==='true'&&!document.getElementById(e.getAttribute('aria-controls')).hidden);
  await page.keyboard.press('Space');
  const collapsed=await trigger.evaluate(e=>e.getAttribute('aria-expanded')==='false'&&document.getElementById(e.getAttribute('aria-controls')).hidden);
  result.push({before,expanded,collapsed});
 }
 const pass=result.length>0&&result.every(r=>r.expanded&&r.collapsed);
 fs.writeFileSync('qa-results/full-qa/faq-keyboard.json',JSON.stringify({pass,result},null,2));
 console.log(JSON.stringify({pass,count:result.length}));if(!pass)process.exitCode=1;
}finally{await browser.close();}
