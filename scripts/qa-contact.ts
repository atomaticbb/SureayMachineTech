import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
process.env.DATABASE_URL=`file:${path.resolve("qa-results/full-qa/qa.db").replaceAll("\\","/")}`;
process.env.RESEND_API_KEY="";
process.env.EMAIL_RECIPIENTS_OVERRIDE="qa@example.invalid";
const {createApp}=await import('../server/app');
const app=createApp();app.set('trust proxy','loopback');
const server=createServer(app);await new Promise<void>(resolve=>server.listen(4301,'127.0.0.1',resolve));
const results:unknown[]=[];let id=1;
async function check(name:string,fields:Record<string,string>,expected:number,file?:{name:string,bytes:Uint8Array},ip?:string){
 const form=new FormData();for(const [k,v] of Object.entries(fields))form.append(k,v);
 if(file)form.append('attachment',new Blob([file.bytes]),file.name);
 const response=await fetch('http://127.0.0.1:4301/api/contact',{method:'POST',body:form,headers:{'X-Forwarded-For':ip||`192.0.2.${id++}`}});
 const body=await response.json();results.push({name,expected,status:response.status,pass:response.status===expected,body,retryAfter:response.headers.get('retry-after')});
}
const good={email:'qa@example.invalid',name:'QA TEST ONLY',message:'QA isolated integration check — no email delivery.'};
try{
 await check('normal-no-mail',good,200);
 await check('invalid-email',{...good,email:'invalid'},400);
 await check('empty-message',{...good,message:''},400);
 await check('whitespace-message',{...good,message:'   '},400);
 await check('long-message',{...good,message:'x'.repeat(1001)},400);
 await check('unicode',{...good,message:'中文 — ±0.002 mm'},200);
 await check('invalid-extension',good,400,{name:'qa.exe',bytes:new TextEncoder().encode('test')});
 await check('fake-pdf',good,400,{name:'qa.pdf',bytes:new TextEncoder().encode('not a pdf')});
 await check('empty-pdf',good,400,{name:'qa.pdf',bytes:new Uint8Array()});
 await check('oversize',good,400,{name:'qa.step',bytes:new Uint8Array(15*1024*1024+1)});
 await check('at-limit',good,200,{name:'qa.step',bytes:new Uint8Array(15*1024*1024).fill(32)});
 for(const ext of ['dxf','step','stp'])await check(`text-${ext}`,good,200,{name:`qa.${ext}`,bytes:new TextEncoder().encode('ISO-10303-21; QA text fixture; END-ISO-10303-21;')});
 for(let i=1;i<=4;i++)await check(`limit-${i}`,{...good,email:'invalid'},i<=3?400:429,undefined,'198.51.100.99');
 const now=Date.now;Date.now=()=>now()+16*60*1000;
 try{await check('rate-recovery-clock-simulated',{...good,email:'invalid'},400,undefined,'198.51.100.99');}finally{Date.now=now;}
 fs.writeFileSync('qa-results/full-qa/api-results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));
}finally{server.close();const {prisma}=await import('../server/db/client');await prisma.$disconnect();}
