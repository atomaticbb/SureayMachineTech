import fs from 'node:fs';
import { blades } from '../client/src/data/blades';
import { ALL_DISPATCHES } from '../client/src/data/news';
import { mixerParts, mixerCategories } from '../client/src/data/mixerParts';
import { PUBLISHED_LANGS } from '../client/src/lib/i18n';
const selected = new Map<string,string>();
const add=(path:string,reason:string)=>selected.set(path,reason);
['/','/products','/about','/contact'].forEach(p=>add(p,'核心页面'));
const chosen=new Map<string,string>();
for(const b of blades){if(![...chosen.values()].includes(b.category))chosen.set(b.id,b.category);if(chosen.size===6)break;}
for(const b of [...blades].sort((a,b)=>(b.fullName||b.name).length-(a.fullName||a.name).length)){if(chosen.size===8)break;chosen.set(b.id,b.category);}
for(const id of chosen.keys())add('/products/'+id,'产品类别/长标题样本');
['/plastic-industry','/metal-industry','/paper-industry'].forEach(p=>add(p,'行业模板'));
add('/mixer-wear-parts','混合机总览');mixerCategories.forEach(p=>add(p.link,'混凝土/沥青分类'));mixerParts.forEach(p=>add(p.link,'全部零件详情'));
const byLength=[...ALL_DISPATCHES].sort((a,b)=>JSON.stringify(b.content).length-JSON.stringify(a.content).length);
const ni=byLength.find(a=>/ni.hard/i.test(a.title));
if(!ni)throw new Error('Ni-Hard article not found');
add('/news/'+ni.id,'最长 Ni-Hard 主题文章');
for(const a of byLength){if([...selected.keys()].filter(p=>p.startsWith('/news/')).length===3)break;add('/news/'+a.id,'长文/复杂内容模板');}
const core=[...selected].map(([path,reason],index)=>({id:`S${String(index+1).padStart(2,'0')}`,path,reason}));
const extra=['/news','/privacy-policy','/terms','/categories/shredder-blades','/qa-does-not-exist','/products/qa-invalid','/news/qa-invalid','/mixer-wear-parts/qa-invalid/qa-invalid'];
const locales=PUBLISHED_LANGS.filter(l=>l!=='en').flatMap(l=>[`/${l}`,`/${l}/products/granulator-blades`,`/${l}/contact`]);
fs.mkdirSync('qa-results/full-qa',{recursive:true});
fs.writeFileSync('qa-results/full-qa/samples.json',JSON.stringify({core,extra,locales,viewports:[[360,640],[390,844],[412,915],[844,390],[768,1024],[1024,768],[1366,768],[1440,900],[1920,1080]],niHard:{id:ni.id,title:ni.title,serializedContentLength:JSON.stringify(ni.content).length}},null,2));
console.log({core:core.length,locales:locales.length,niHard:ni.id});
