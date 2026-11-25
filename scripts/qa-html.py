"""Inspect all built HTML and reconcile sitemap, links and reachability."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, urljoin, unquote
import xml.etree.ElementTree as ET
import json

ROOT=Path('dist/public');OUT=Path('qa-results/full-qa');ORIGIN='https://sureay.com'
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.links=[];self.ids=set();self.duplicate_ids=[];self.canonical=[];self.meta={};self.h1=0;self.images=[];self.scripts=[];self.current=None
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):
   if a['id'] in self.ids:self.duplicate_ids.append(a['id'])
   self.ids.add(a['id'])
  if tag=='a' and 'href' in a:self.links.append(a['href'])
  if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if tag=='meta':self.meta[a.get('name') or a.get('property')]=a.get('content')
  if tag=='h1':self.h1+=1
  if tag=='img':self.images.append({'src':a.get('src'),'alt':a.get('alt')})
  if tag=='script' and a.get('type')=='application/ld+json':self.current=''
 def handle_data(self,data):
  if self.current is not None:self.current+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.current is not None:
   try:self.scripts.append({'valid':True,'value':json.loads(self.current)})
   except ValueError:self.scripts.append({'valid':False})
   self.current=None

def route(file):
 p='/'+file.relative_to(ROOT).as_posix().removesuffix('index.html').rstrip('/')
 return p or '/'
pages={}
for f in ROOT.rglob('index.html'):
 p=Page();p.feed(f.read_text(encoding='utf-8'));pages[route(f)]=p
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[el.text for el in ET.parse(ROOT/'sitemap.xml').findall('.//s:loc',ns)]
paths={urlsplit(u).path.rstrip('/') or '/' for u in urls}
graph={};broken=[];anchors=[]
for path,p in pages.items():
 graph[path]=set()
 for href in p.links:
  dest=urlsplit(urljoin(ORIGIN+path,href))
  if dest.scheme not in ['http','https'] or dest.netloc not in ['sureay.com','www.sureay.com']:continue
  target=unquote(dest.path).rstrip('/') or '/'
  if target in pages:
   graph[path].add(target)
   if dest.fragment and unquote(dest.fragment) not in pages[target].ids:anchors.append({'from':path,'href':href,'target':target,'fragment':dest.fragment})
  elif not (ROOT/unquote(dest.path).lstrip('/')).is_file():broken.append({'from':path,'href':href,'target':target})
reachable=set();queue=['/']
while queue:
 p=queue.pop()
 if p in reachable:continue
 reachable.add(p);queue.extend(graph.get(p,set())-reachable)
report={'htmlCount':len(pages),'sitemapCount':len(paths),'missingHtml':sorted(paths-pages.keys()),'extraHtml':sorted(pages.keys()-paths),'unreachableFromHome':sorted(paths-reachable),'brokenCandidates':broken,'missingAnchors':anchors,'pages':[{'path':path,'h1':p.h1,'canonical':p.canonical,'description':p.meta.get('description'),'og':p.meta.get('og:url'),'duplicates':p.duplicate_ids,'jsonLdValid':all(s['valid'] for s in p.scripts),'links':len(p.links),'imagesWithoutAlt':[i for i in p.images if i['alt'] is None]} for path,p in pages.items()]}
OUT.mkdir(exist_ok=True,parents=True);(OUT/'html-link-audit.json').write_text(json.dumps(report,indent=2,ensure_ascii=False),encoding='utf-8')
print(json.dumps({k:len(v) if isinstance(v,list) else v for k,v in report.items()}))
