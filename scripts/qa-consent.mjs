/* global window, document, localStorage */
import fs from 'node:fs';
import puppeteer from 'puppeteer';
const b=await puppeteer.launch({headless:true});
try{
 const p=await b.newPage();await p.setViewport({width:390,height:844});await p.setRequestInterception(true);
 p.on('request',r=>{if(r.url().endsWith('/api/region'))return r.respond({status:200,contentType:'application/json',body:JSON.stringify({requiresConsent:true,country:'DE'})});if(!r.url().startsWith('http://127.0.0.1:5173'))return r.abort();return r.continue();});
 await p.goto('http://127.0.0.1:5173',{waitUntil:'domcontentloaded'});
 await p.waitForSelector('[role="region"][aria-label="Cookie Settings"]');
 await p.locator('::-p-text(Accept All)').click();
 await p.waitForFunction(()=>localStorage.getItem('sureay_cookie_v2')==='granted');
 await p.locator('footer button').click();
 await p.waitForSelector('[role="region"][aria-label="Cookie Settings"]');
 const focused=await p.evaluate(()=>document.activeElement.textContent);
 await p.locator('::-p-text(Essential Only)').click();
 const result=await p.evaluate(()=>({stored:localStorage.getItem('sureay_cookie_v2'),focus:document.activeElement.textContent,updates:window.dataLayer.map(x=>Array.from(x)).filter(x=>x[0]==='consent')}));
 await p.reload({waitUntil:'domcontentloaded'});await p.waitForSelector('footer');
 const persisted=await p.evaluate(()=>({stored:localStorage.getItem('sureay_cookie_v2'),banner:!!document.querySelector('[role="region"][aria-label="Cookie Settings"]')}));
 const updates=result.updates.filter(x=>x[1]==='update');const last=updates.at(-1)?.[2];
 const pass=focused.trim()==='Essential Only'&&result.stored==='denied'&&result.focus.trim()==='Cookie Settings'&&Object.values(last||{}).length===4&&Object.values(last).every(x=>x==='denied')&&!persisted.banner&&persisted.stored==='denied';
 fs.writeFileSync('qa-results/full-qa/consent-retest.json',JSON.stringify({pass,focused,result,persisted},null,2));console.log(JSON.stringify({pass,focused,result,persisted}));if(!pass)process.exitCode=1;
}finally{await b.close();}
