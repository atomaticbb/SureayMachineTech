import puppeteer from 'puppeteer';
const b=await puppeteer.launch({headless:true});try{const p=await b.newPage();await p.goto('http://127.0.0.1:5173/news/concrete-mixer-liner-material-ni-hard-vs-high-chrome',{waitUntil:'networkidle2'});await p.pdf({path:'qa-results/full-qa/article-print.pdf',format:'A4',printBackground:true});console.log('PDF saved');}finally{await b.close()}
