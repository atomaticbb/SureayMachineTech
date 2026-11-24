import { FONT_FACE_CSS } from "./fonts.ts";

export const CATALOG_CSS = `
${FONT_FACE_CSS}
@page { size: A4 landscape; margin: 0; }
:root { --navy:#001f4d; --ink:#182b42; --muted:#475c70; --line:#cfdae3; --light:#f1f5f8; }
* { box-sizing:border-box; margin:0; padding:0; }
html, body { width:297mm; }
body { color:var(--ink); background:#fff; font:10.2pt/1.45 Inter, "DejaVu Sans", Arial, sans-serif; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
a { color:inherit; text-decoration:none; }
a:focus { outline:1px solid var(--navy); }
img { display:block; max-width:100%; }
.sheet { width:297mm; height:210mm; position:relative; break-after:page; background:white; }
.sheet:last-child { break-after:auto; }
header,footer,.cover-top { display:flex; align-items:center; justify-content:space-between; }
header { height:15mm; padding:0 11mm; border-bottom:.35mm solid var(--navy); color:var(--muted); font-size:8.3pt; }
.brand { display:inline-flex; align-items:center; gap:3mm; font-family:Inter,Arial,sans-serif; color:var(--navy); font-size:13pt; letter-spacing:.04em; }
.brand svg { width:8mm; height:8mm; }
.brand svg path,.brand svg .st0 { fill:currentColor!important; }
footer { position:absolute; bottom:0; left:11mm; right:11mm; height:10mm; border-top:.25mm solid var(--line); color:var(--muted); font-size:7.8pt; }
footer bdi,.toc bdi { font:500 9pt "JetBrains Mono","DejaVu Sans Mono",monospace; color:var(--navy); }
main { padding:8mm 11mm 4mm; }
h1,h2,h3,h4 { font-weight:650; color:var(--navy); line-height:1.15; }
h2 { font-size:29pt; letter-spacing:-.035em; }
h3 { font-size:16pt; letter-spacing:-.02em; }
.eyebrow { color:var(--muted); font-weight:600; font-size:9pt; margin-bottom:2.5mm; }
.cover { background:var(--navy); color:white; }
.cover-image,.cover-shade { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.cover-shade { background:linear-gradient(90deg,rgba(0,24,56,.92),rgba(0,24,56,.34)),linear-gradient(0deg,rgba(0,20,48,.87),transparent 85%); }
.cover-top { position:absolute; top:13mm; inset-inline:13mm; padding-bottom:6mm; border-bottom:.25mm solid rgba(255,255,255,.48); }
.cover .brand,.contact .brand { color:white; }
.cover .brand svg,.contact .brand svg { width:14mm;height:14mm; }
.edition { font:12pt "JetBrains Mono",monospace; }
.cover-heading { position:absolute; inset-inline:15mm; bottom:15mm; }
.cover .eyebrow { color:#e1eaf2;font-size:13pt; }
.cover h1 { color:white; font-size:48pt; line-height:1.08; max-width:245mm; letter-spacing:-.045em; }
.cover-meta { display:flex; align-items:center; justify-content:space-between; margin-top:11mm; padding-top:5mm; border-top:.3mm solid #aec3d6; font-size:11pt; }
.directory-grid { display:grid; grid-template-columns:minmax(0,1.48fr) minmax(0,1fr); gap:13mm; }
.directory h2 { margin-bottom:6mm; font-size:25pt; }
.toc { border-top:.55mm solid var(--navy); }
.toc a { display:flex; align-items:center; justify-content:space-between; gap:4mm; padding:2.1mm 0; border-bottom:.25mm solid var(--line); font-size:11pt; line-height:1.2; }
.toc bdi { flex-shrink:0; }
.about img { width:100%; height:74mm; object-fit:cover; margin-bottom:8mm; }
.about h3 { margin-bottom:3mm; font-size:20pt; }
.about p { line-height:1.6; }
.sector-photo { border:.3mm solid var(--line); height:137mm; display:grid; grid-template: minmax(0,1fr) / minmax(0,1fr); place-items:center; }
.sector-photo img { width:93%; height:93%; object-fit:contain; }
.product-grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.72fr); gap:9mm; padding-top:6.5mm; }
.visuals { min-width:0; }
.product-photo { width:100%; height:88mm; display:grid; grid-template: minmax(0,1fr) / minmax(0,1fr); place-items:center; border:.3mm solid var(--line); }
.product-photo img { width:97%; height:97%; object-fit:contain; }
.thumbnails { display:flex; gap:2.5mm; margin-top:2.5mm; }
.thumbnails img { width:calc(50% - 1.25mm); height:33mm; object-fit:contain; border:.25mm solid var(--line); }
.product-link { display:flex; align-items:center; gap:3mm; border-top:.4mm solid var(--navy); margin-top:5mm; padding-top:3mm; font-size:9.4pt; color:var(--navy); }
.qr { flex:none; width:20mm; height:20mm; padding:1.8mm; background:white; }
.qr svg { width:100%;height:100%; }
.product-link small { display:block; overflow-wrap:anywhere; margin-top:1mm; color:var(--muted); font-size:7pt; }
.product h2 { font-size:24pt; }
.product .description { font-size:10.1pt; margin:3mm 0 4mm; }
.rule-heading { font-size:12pt; border-bottom:.5mm solid var(--navy); padding-bottom:1.8mm; }
.specs > div { display:grid; grid-template-columns:minmax(0,.46fr) minmax(0,1fr); gap:3mm; padding:1.15mm 0; border-bottom:.22mm solid var(--line); font-size:9pt; line-height:1.3; }
.specs dt { font-weight:600; color:var(--muted); }
.machines { margin-top:3.5mm; }
.machines h4 { font-size:10pt; margin-bottom:1mm; }
.machines p { font-size:8.8pt; line-height:1.4; text-align:start; }
.reference main { padding-top:6.5mm; }
.reference .eyebrow { margin-bottom:1.5mm; }
.reference h2 { font-size:22pt; margin-bottom:5mm; }
.dimension-note { margin:-1.5mm 0 3mm; color:var(--muted); font-size:9.5pt; }
.table-block + .table-block { margin-top:5mm; }
.table-block h3 { font-size:12pt; margin-bottom:2mm; }
table { border-collapse:collapse; width:100%; font-size:9.5pt; line-height:1.25; }
th,td { text-align:start; border-bottom:.22mm solid var(--line); padding:1.3mm 2mm; overflow-wrap:anywhere; }
.item-number { white-space:nowrap; overflow-wrap:normal; }
th { color:white; background:var(--navy); font-weight:600; }
td:first-child { color:var(--navy); font-weight:600; }
tbody tr:nth-child(even) { background:var(--light); }
.standards { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:7mm; margin-top:10mm; }
.standards img { width:100%; aspect-ratio:16/10; object-fit:cover; }
.standards h3 { margin:5mm 0 2mm; }
.standards p { font-size:11pt; }
.contact { background:var(--navy); color:white; padding:16mm; }
.contact-content { margin-top:24mm; max-width:230mm; }
.contact h2 { color:white; font-size:40pt; }
.contact-content p { margin:5mm 0; font-size:14pt; max-width:205mm; }
.contact-url { display:inline-block; font-weight:600; border-bottom:.4mm solid white; }
.contact-details { display:flex; gap:22mm; border-top:.3mm solid #7892ad; padding-top:8mm; margin-top:11mm; }
.contact-details small { display:block; margin-bottom:2mm; color:#ccdae6; }
.contact-details a { display:inline-block; font-size:14pt; }
.contact-footer { position:absolute; bottom:12mm; inset-inline:16mm; font-size:9pt; }
`;
