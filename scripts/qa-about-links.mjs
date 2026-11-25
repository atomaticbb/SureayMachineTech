/* global location */
import fs from 'node:fs';
import puppeteer from 'puppeteer';
const base='http://127.0.0.1:5173';
const langs=['en','es','fr','pt','ru','tr','vi','ar'];
const b=await puppeteer.launch({headless:true});const results=[];
try {
 for(const lang of langs){
  const p=await b.newPage();const prefix=lang==='en'?'':`/${lang}`;
  try {
   await p.goto(`${base}${prefix}/about`,{waitUntil:'domcontentloaded'});
   await p.waitForSelector(`a[href="${prefix}/contact"]`);
   const selector=`section a.self-start[href="${prefix}/contact"]`;
   await p.waitForSelector(selector);
   await p.click(selector);
   await p.waitForFunction(expected=>location.pathname===expected,{},`${prefix}/contact`);
   results.push({lang,expected:`${prefix}/contact`,actual:new URL(p.url()).pathname,pass:true});
  } catch(e){results.push({lang,pass:false,error:String(e)});} finally{await p.close();}
 }
 fs.writeFileSync('qa-results/full-qa/about-contact-links.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results));if(results.some(r=>!r.pass))process.exitCode=1;
}finally{await b.close();}
