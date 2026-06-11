/**
 * scripts/catalog/styles.ts
 *
 * Print-optimized CSS — A4 Landscape, compact brochure style.
 */

import { COLORS } from "./constants.ts";
import { FONT_FACE_CSS } from "./fonts.ts";

export const CATALOG_CSS = `
${FONT_FACE_CSS}

@page {
  size: A4 landscape;
  margin: 0;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: 0 !important;
}

body {
  font-family: "Inter", sans-serif;
  color: ${COLORS.textPrimary};
  background: ${COLORS.white};
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  font-size: 9pt;
  line-height: 1.5;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1.15;
}

/* ── shared header / footer ────────────────────────────── */

.page {
  width: 297mm;
  height: 210mm;
  position: relative;
  overflow: hidden;
  break-after: page;
}

.page-header {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 11mm;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8mm;
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.borderColor};
  z-index: 10;
}

.page-header-logo {
  display: flex;
  align-items: center;
  gap: 2.5mm;
}

.page-header-logo svg { width: 7mm; height: auto; }
.page-header-logo svg .st0,
.page-header-logo svg path { fill: ${COLORS.navy} !important; }

.page-header-company {
  font-family: "Oswald", sans-serif;
  font-size: 9pt;
  font-weight: 700;
  color: ${COLORS.navy};
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.page-header-website {
  font-family: "JetBrains Mono", monospace;
  font-size: 6.5pt;
  color: ${COLORS.gold};
  letter-spacing: 0.05em;
}

.page-footer {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 8mm;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8mm;
  background: ${COLORS.navy};
  color: rgba(255,255,255,0.7);
  font-size: 6pt;
  z-index: 10;
}

.page-footer-left {
  font-family: "JetBrains Mono", monospace;
  letter-spacing: 0.03em;
}

.page-footer-right {
  display: flex;
  align-items: center;
  gap: 5mm;
  font-family: "JetBrains Mono", monospace;
  letter-spacing: 0.03em;
}

.page-number {
  background: ${COLORS.gold};
  color: ${COLORS.navy};
  font-weight: 700;
  font-size: 6.5pt;
  padding: 0.8mm 2.5mm;
  font-family: "Oswald", sans-serif;
}

/* ── COVER ─────────────────────────────────────────────── */

.cover-page {
  width: 297mm;
  height: 210mm;
  background: ${COLORS.navyDark};
  color: ${COLORS.white};
  position: relative;
  overflow: hidden;
  break-after: page;
}

/* Full-bleed factory photo */
.cover-photo {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}

/* Navy wash — dark on the left/bottom for legibility, reveals factory at right */
.cover-overlay {
  position: absolute; inset: 0;
  background:
    linear-gradient(100deg,
      rgba(0,18,50,0.97) 0%,
      rgba(0,24,62,0.90) 28%,
      rgba(0,31,77,0.55) 56%,
      rgba(0,31,77,0.28) 80%,
      rgba(0,18,50,0.72) 100%),
    linear-gradient(0deg, rgba(0,12,34,0.88) 0%, rgba(0,12,34,0) 46%);
}

/* Foil-stamp inner frame (metallic gold gradient border) */
.cover-frame {
  position: absolute; inset: 8mm;
  border: 0.6mm solid transparent;
  border-image: linear-gradient(135deg,#f6d97a,#e8b84b,#b8862b,#e8b84b,#f6d97a) 1;
  pointer-events: none;
}

.cover-top {
  position: absolute; top: 15mm; left: 18mm; right: 18mm;
  display: flex; align-items: center; justify-content: space-between;
}

.cover-logo { display: flex; align-items: center; gap: 4mm; }
.cover-logo svg { width: 15mm; height: auto; }
.cover-logo svg .st0,
.cover-logo svg path { fill: ${COLORS.white} !important; }
.cover-wordmark {
  font-family: "Oswald", sans-serif;
  font-size: 13pt; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: ${COLORS.white};
}

.cover-year-badge {
  font-family: "Oswald", sans-serif;
  font-size: 9pt; font-weight: 600;
  color: ${COLORS.navy};
  background: linear-gradient(135deg,#f6d97a,#e8b84b 50%,#cf9a33);
  padding: 2mm 5mm;
  letter-spacing: 0.16em; text-transform: uppercase;
}

.cover-content {
  position: absolute; left: 18mm; right: 18mm; bottom: 19mm;
}

.cover-gold-rule {
  width: 38mm; height: 1.4mm;
  background: linear-gradient(90deg,#f6d97a,#e8b84b,#b8862b);
  margin-bottom: 6mm;
}

.cover-kicker {
  font-family: "JetBrains Mono", monospace;
  font-size: 8pt; color: ${COLORS.gold};
  letter-spacing: 0.22em; text-transform: uppercase;
  margin-bottom: 4mm;
}

.cover-title {
  font-size: 46pt; font-weight: 700;
  line-height: 1.0; margin-bottom: 4mm;
  max-width: 210mm;
}

.cover-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 13pt; font-weight: 300;
  color: rgba(255,255,255,0.82);
  text-transform: none; letter-spacing: 0;
  margin-bottom: 9mm;
}

.cover-meta {
  display: flex; align-items: center;
  font-family: "JetBrains Mono", monospace;
  font-size: 7pt; color: rgba(255,255,255,0.6);
  text-transform: uppercase; letter-spacing: 0.12em;
}
.cover-meta span {
  padding: 0 5mm;
  border-left: 1px solid rgba(232,184,75,0.5);
}
.cover-meta span:first-child { padding-left: 0; border-left: none; }

/* ── ABOUT ─────────────────────────────────────────────── */

.about-page { width: 297mm; height: 210mm; break-after: page; }

.about-layout {
  display: flex;
  height: calc(210mm - 11mm - 8mm);
  margin-top: 11mm;
}

.about-left {
  width: 130mm;
  background: ${COLORS.coldGray};
  overflow: hidden;
}

.about-left img {
  width: 100%; height: 100%; object-fit: cover;
}

.about-right {
  flex: 1;
  padding: 6mm 8mm;
  display: flex;
  flex-direction: column;
}

.about-title {
  font-size: 24pt; color: ${COLORS.navy};
  margin-bottom: 1.5mm;
}

.about-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 8pt; color: ${COLORS.gold};
  text-transform: uppercase; letter-spacing: 0.1em;
  font-weight: 600; margin-bottom: 4mm;
}

.about-text {
  font-size: 8pt; color: ${COLORS.textPrimary};
  line-height: 1.65; flex: 1;
}
.about-text p { margin-bottom: 2.5mm; }

.about-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid ${COLORS.navy};
  margin-top: 4mm;
}

.about-stat {
  padding: 3mm 4mm; text-align: center;
  border-right: 1px solid rgba(0,31,77,0.15);
}
.about-stat:last-child { border-right: none; }

.about-stat-value {
  font-family: "Oswald", sans-serif;
  font-size: 18pt; font-weight: 700;
  color: ${COLORS.navy}; line-height: 1;
}

.about-stat-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 5.5pt; color: ${COLORS.textSecondary};
  text-transform: uppercase; letter-spacing: 0.08em;
  margin-top: 1mm;
}

.about-certs {
  display: flex; gap: 2.5mm;
  margin-top: 3mm; flex-wrap: wrap;
}

.about-cert {
  font-family: "JetBrains Mono", monospace;
  font-size: 5.5pt; color: ${COLORS.navy};
  border: 1px solid ${COLORS.borderColor};
  padding: 1mm 3mm; text-transform: uppercase;
  letter-spacing: 0.06em; background: ${COLORS.coldGray};
}

/* ── INDUSTRY DIVIDER PAGE ────────────────────────────── */

.industry-divider {
  width: 297mm; height: 210mm;
  background: ${COLORS.navyDark};
  color: ${COLORS.white};
  position: relative; overflow: hidden;
  break-after: page;
}

.divider-photo {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}

.divider-overlay {
  position: absolute; inset: 0;
  background:
    linear-gradient(100deg,
      rgba(0,18,50,0.52) 0%,
      rgba(0,24,62,0.46) 30%,
      rgba(0,31,77,0.30) 58%,
      rgba(0,31,77,0.15) 82%,
      rgba(0,18,50,0.40) 100%),
    linear-gradient(0deg, rgba(0,12,34,0.82) 0%, rgba(0,12,34,0) 52%);
}

/* Oversized faint section numeral, upper-right */
.divider-num {
  position: absolute;
  top: -8mm; right: 8mm;
  font-family: "Oswald", sans-serif;
  font-size: 150pt; font-weight: 700;
  line-height: 1;
  color: rgba(232,184,75,0.12);
  letter-spacing: -0.02em;
}

.divider-top {
  position: absolute; top: 15mm; left: 18mm; right: 18mm;
  display: flex; align-items: center; justify-content: space-between;
}
.divider-logo { display: flex; align-items: center; gap: 4mm; }
.divider-logo svg { width: 13mm; height: auto; }
.divider-logo svg .st0,
.divider-logo svg path { fill: ${COLORS.white} !important; }
.divider-wordmark {
  font-family: "Oswald", sans-serif;
  font-size: 11pt; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: ${COLORS.white};
}
.divider-section-tag {
  font-family: "JetBrains Mono", monospace;
  font-size: 7.5pt; color: ${COLORS.gold};
  letter-spacing: 0.16em; text-transform: uppercase;
  border: 1px solid rgba(232,184,75,0.6);
  padding: 1.5mm 4mm;
}

.divider-content {
  position: absolute; left: 18mm; right: 18mm; bottom: 20mm;
  max-width: 215mm;
}
.divider-kicker {
  font-family: "Inter", sans-serif;
  font-size: 10pt; font-weight: 600;
  color: ${COLORS.gold};
  text-transform: uppercase; letter-spacing: 0.06em;
  margin-bottom: 4mm; line-height: 1.3;
}
.divider-title {
  font-size: 40pt; font-weight: 700;
  line-height: 1.0; margin-bottom: 4mm;
  color: ${COLORS.white};
}
.divider-gold-rule {
  width: 34mm; height: 1.4mm;
  background: linear-gradient(90deg,#f6d97a,#e8b84b,#b8862b);
  margin-bottom: 5mm;
}
.divider-body {
  font-family: "Inter", sans-serif;
  font-size: 9pt; font-weight: 300;
  color: rgba(255,255,255,0.82);
  line-height: 1.6; max-width: 165mm;
  margin-bottom: 8mm;
}

/* Key-data strip */
.divider-stats {
  display: flex; align-items: stretch;
  border-top: 1px solid rgba(255,255,255,0.18);
  padding-top: 5mm;
}
.divider-stat {
  padding-right: 14mm; margin-right: 14mm;
  border-right: 1px solid rgba(255,255,255,0.18);
}
.divider-stat:last-child { border-right: none; margin-right: 0; padding-right: 0; }
.divider-stat-value {
  font-family: "Oswald", sans-serif;
  font-size: 18pt; font-weight: 600;
  color: ${COLORS.gold}; line-height: 1;
  margin-bottom: 1.5mm;
}
.divider-stat-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 6.5pt; color: rgba(255,255,255,0.6);
  text-transform: uppercase; letter-spacing: 0.1em;
}

.divider-foot {
  position: absolute; right: 18mm; bottom: 11mm;
  font-family: "JetBrains Mono", monospace;
  font-size: 7pt; color: rgba(255,255,255,0.45);
  letter-spacing: 0.12em;
}

/* ── PRODUCT PAGE ──────────────────────────────────────── */
/* Top row: photos grid (left) + info (right)              */
/* Bottom row: full-width dimension table                  */

.product-page { width: 297mm; height: 210mm; break-after: page; }

.product-body {
  margin-top: 11mm;
  height: calc(210mm - 11mm - 8mm);
  display: flex;
  flex-direction: column;
  padding: 0 7mm;
}

/* ─ Top row ─ */
.product-top {
  display: flex;
  gap: 5mm;
  min-height: 85mm;
  flex-shrink: 0;
  padding-top: 4mm;
}

/* When data-sparse, size sections to content (extra row + QR fill the page);
   forcing flex-grow here previously overflowed the info column onto the table. */
.product-body.sparse .product-top { flex: 0 0 auto; }
.product-body.sparse .product-bottom { flex: 0 0 auto; }

/* Photo grid: main + gallery side */
.product-photos {
  width: 145mm;
  flex-shrink: 0;
  display: flex;
  gap: 2mm;
}

.product-photo-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #eef1f5 0%, #dde2e8 100%);
  border: 1px solid ${COLORS.borderColor};
  overflow: hidden;
  padding: 4mm;
}

.product-photo-main img {
  max-width: 100%; max-height: 100%; object-fit: contain;
}

.product-photo-side {
  width: 42mm;
  display: flex;
  flex-direction: column;
  gap: 2mm;
}

.product-photo-thumb {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eef1f5;
  border: 1px solid ${COLORS.borderColor};
  overflow: hidden;
  padding: 2mm;
}

.product-photo-thumb img {
  max-width: 100%; max-height: 100%; object-fit: contain;
}

/* Info panel */
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name-bar {
  background: ${COLORS.navy};
  color: ${COLORS.white};
  padding: 3mm 4mm;
  margin-bottom: 3mm;
}

.product-name {
  font-size: 14pt; line-height: 1.1;
  margin-bottom: 0.5mm; color: ${COLORS.white};
}

.product-name-en {
  font-family: "Inter", sans-serif;
  font-size: 7pt; color: rgba(255,255,255,0.6);
  text-transform: none; letter-spacing: 0; font-weight: 400;
}

.product-category-badge {
  display: inline-block;
  background: ${COLORS.gold};
  color: ${COLORS.navy};
  font-family: "Oswald", sans-serif;
  font-size: 6pt; font-weight: 600;
  padding: 0.8mm 2.5mm;
  text-transform: uppercase; letter-spacing: 0.06em;
  margin-top: 2mm;
}

.product-features-title {
  font-family: "Oswald", sans-serif;
  font-size: 9pt; font-weight: 600;
  color: ${COLORS.navy}; text-transform: uppercase;
  margin-bottom: 1.5mm; margin-top: 2mm;
}

.product-features-text {
  font-size: 7.5pt; color: ${COLORS.textPrimary};
  line-height: 1.55;
}
.product-features-text p { margin-bottom: 1.8mm; }
.product-features-text p:last-child { margin-bottom: 0; }

/* Bottom group of the info panel: specs grid + QR card, pinned to bottom */
.product-info-footer { margin-top: auto; }

.product-specs-mini {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border: 1px solid ${COLORS.borderColor};
}

/* QR card — scannable link to the live product page */
.product-qr {
  display: flex;
  align-items: center;
  gap: 3mm;
  margin-top: 2.5mm;
  padding: 2.5mm 3mm;
  background: ${COLORS.coldGray};
  border: 1px solid ${COLORS.borderColor};
  border-left: 2mm solid ${COLORS.gold};
}
.product-qr-code {
  width: 15mm; height: 15mm; flex-shrink: 0;
  background: ${COLORS.white};
}
.product-qr-code svg { width: 100%; height: 100%; display: block; }
.product-qr-text { display: flex; flex-direction: column; gap: 1mm; }
.product-qr-label {
  font-family: "Oswald", sans-serif;
  font-size: 7.5pt; font-weight: 600;
  color: ${COLORS.navy};
  text-transform: uppercase; letter-spacing: 0.04em;
}
.product-qr-url {
  font-family: "JetBrains Mono", monospace;
  font-size: 6.5pt; color: ${COLORS.textSecondary};
  letter-spacing: 0.02em;
}

.product-spec-item {
  padding: 1.5mm 3mm;
  border-bottom: 1px solid ${COLORS.borderColor};
  border-right: 1px solid ${COLORS.borderColor};
}
.product-spec-item:nth-child(2n) { border-right: none; }

.product-spec-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 5.5pt; color: ${COLORS.textSecondary};
  text-transform: uppercase; letter-spacing: 0.06em;
}

.product-spec-value {
  font-family: "Oswald", sans-serif;
  font-size: 8.5pt; font-weight: 600;
  color: ${COLORS.navy};
}

/* ─ Bottom row: full-width table ─ */
.product-bottom {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 4mm;
  padding-top: 4mm;
  border-top: 1px solid ${COLORS.borderColor};
  min-height: 0;
}

.product-table-title {
  font-family: "Oswald", sans-serif;
  font-size: 9pt; font-weight: 600;
  color: ${COLORS.navy}; text-transform: uppercase;
  margin-bottom: 1.5mm;
  display: flex; align-items: center; gap: 2mm;
}

.product-table-title::before {
  content: ""; width: 2.5mm; height: 2.5mm;
  background: ${COLORS.gold};
  display: inline-block; flex-shrink: 0;
}

.spec-table {
  width: 100%; border-collapse: collapse;
  font-size: 7pt;
  border: 1px solid ${COLORS.borderColor};
}

.spec-table th {
  background: ${COLORS.navy};
  color: ${COLORS.white};
  font-family: "JetBrains Mono", monospace;
  font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 1.8mm 3mm; text-align: left;
  font-size: 6.5pt;
}

.spec-table td {
  padding: 1.5mm 3mm;
  border-bottom: 1px solid ${COLORS.borderColor};
  font-family: "JetBrains Mono", monospace;
  font-size: 7pt; color: ${COLORS.navy};
}

.spec-table tr:nth-child(even) td {
  background: ${COLORS.coldGray};
}

.spec-table-caption {
  font-size: 6pt; color: ${COLORS.textSecondary};
  font-style: italic; margin-top: 1mm;
}

/* ─ Extra content for sparse products ─ */
.product-extra {
  display: flex;
  gap: 4mm;
  padding-top: 3mm;
  flex: 1;
  align-items: flex-start;
}

.product-machines-strip {
  flex: 1;
}

.product-machines-label {
  font-family: "Oswald", sans-serif;
  font-size: 8pt; font-weight: 600;
  color: ${COLORS.navy}; text-transform: uppercase;
  margin-bottom: 2mm;
  display: flex; align-items: center; gap: 2mm;
}

.product-machines-label::before {
  content: ""; width: 2.5mm; height: 2.5mm;
  background: ${COLORS.gold};
  display: inline-block; flex-shrink: 0;
}

.product-machines-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5mm;
}

.product-machine-tag {
  font-family: "JetBrains Mono", monospace;
  font-size: 6.5pt; color: ${COLORS.navy};
  background: ${COLORS.coldGray};
  border: 1px solid ${COLORS.borderColor};
  padding: 1.2mm 3mm;
  text-transform: uppercase; letter-spacing: 0.04em;
}

.product-advantages {
  flex: 2;
}

.product-advantages-label {
  font-family: "Oswald", sans-serif;
  font-size: 8pt; font-weight: 600;
  color: ${COLORS.navy}; text-transform: uppercase;
  margin-bottom: 2mm;
  display: flex; align-items: center; gap: 2mm;
}

.product-advantages-label::before {
  content: ""; width: 2.5mm; height: 2.5mm;
  background: ${COLORS.gold};
  display: inline-block; flex-shrink: 0;
}

.product-advantages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5mm;
}

.product-advantage-card {
  background: ${COLORS.coldGray};
  border-left: 2px solid ${COLORS.gold};
  padding: 2.5mm 3mm;
}

.product-advantage-tag {
  font-family: "JetBrains Mono", monospace;
  font-size: 5pt; color: ${COLORS.gold};
  text-transform: uppercase; letter-spacing: 0.06em;
  margin-bottom: 0.5mm;
}

.product-advantage-title {
  font-family: "Oswald", sans-serif;
  font-size: 7.5pt; font-weight: 600;
  color: ${COLORS.navy};
  margin-bottom: 0.5mm;
}

.product-advantage-desc {
  font-size: 6.8pt; color: #334155;
  line-height: 1.45;
}

/* ── PRODUCT PAGE — HERO (first product of a sector) ────── */

.product-page-hero .hero-body {
  margin-top: 11mm;
  height: calc(210mm - 11mm - 8mm);
  display: flex; flex-direction: column;
  padding: 5mm 7mm 0 7mm;
}

.hero-top { display: flex; height: 98mm; flex-shrink: 0; }

.hero-img {
  position: relative;
  width: 162mm; flex-shrink: 0;
  background: linear-gradient(145deg,#eef1f5 0%,#dde2e8 100%);
  border: 1px solid ${COLORS.borderColor};
  display: flex; align-items: center; justify-content: center;
  padding: 6mm; overflow: hidden;
}
.hero-img img { max-width: 100%; max-height: 100%; object-fit: contain; }
.hero-img-tag {
  position: absolute; top: 0; left: 0;
  background: ${COLORS.gold}; color: ${COLORS.navy};
  font-family: "Oswald", sans-serif;
  font-size: 7pt; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.12em;
  padding: 1.5mm 4mm;
}

.hero-panel {
  flex: 1;
  background: ${COLORS.navy};
  color: ${COLORS.white};
  padding: 7mm 8mm;
  display: flex; flex-direction: column;
}
.hero-eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 7pt; color: ${COLORS.gold};
  text-transform: uppercase; letter-spacing: 0.14em;
  margin-bottom: 3mm;
}
.hero-name {
  font-size: 21pt; font-weight: 700; line-height: 1.05;
  color: ${COLORS.white}; margin-bottom: 1.5mm;
}
.hero-fullname {
  font-family: "Inter", sans-serif;
  font-size: 8pt; font-weight: 300;
  color: rgba(255,255,255,0.6);
  text-transform: none; letter-spacing: 0;
  margin-bottom: 4mm;
}
.hero-gold-rule {
  width: 30mm; height: 1.2mm;
  background: linear-gradient(90deg,#f6d97a,#e8b84b,#b8862b);
  margin-bottom: 4mm;
}
.hero-features {
  font-size: 8pt; color: rgba(255,255,255,0.85);
  line-height: 1.55; flex: 1;
}
.hero-features p { margin-bottom: 2mm; }
.hero-features p:last-child { margin-bottom: 0; }

/* Full-width gold spec bar — headline specs under the hero */
.hero-spec-bar {
  display: flex;
  background: ${COLORS.navyDark};
  margin-top: 4mm; flex-shrink: 0;
}
.hero-spec {
  flex: 1;
  padding: 3.5mm 5mm;
  border-right: 1px solid rgba(255,255,255,0.12);
  overflow: hidden;
}
.hero-spec:last-child { border-right: none; }
.hero-spec-value {
  font-family: "Oswald", sans-serif;
  font-size: 11pt; font-weight: 600;
  color: ${COLORS.gold}; line-height: 1.15;
  margin-bottom: 1mm;
}
.hero-spec-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 6pt; color: rgba(255,255,255,0.6);
  text-transform: uppercase; letter-spacing: 0.08em;
}

/* QR card — dark variant for the navy hero panel */
.product-qr.on-dark {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  border-left: 2mm solid ${COLORS.gold};
  margin-top: 4mm;
}
.product-qr.on-dark .product-qr-label { color: ${COLORS.white}; }
.product-qr.on-dark .product-qr-url { color: rgba(255,255,255,0.6); }

/* ── MANUFACTURING PROCESS ─────────────────────────────── */

.process-page { width: 297mm; height: 210mm; break-after: page; }

.process-content {
  margin-top: 11mm;
  height: calc(210mm - 11mm - 8mm);
  padding: 4mm 7mm;
  display: flex;
  flex-direction: column;
}

.process-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 3mm;
}

.process-title {
  font-size: 20pt; color: ${COLORS.navy};
  margin-bottom: 0;
}

.process-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 8pt; color: ${COLORS.gold};
  text-transform: uppercase; letter-spacing: 0.1em;
  font-weight: 600;
}

.process-intro {
  font-size: 7.5pt; color: ${COLORS.textPrimary};
  line-height: 1.5; margin-bottom: 3mm;
}

.process-flow {
  display: flex;
  align-items: center;
  margin-bottom: 4mm;
}

.process-step {
  background: ${COLORS.navy};
  color: ${COLORS.white};
  font-family: "Oswald", sans-serif;
  font-size: 7pt; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.04em;
  padding: 2mm 3.5mm;
  white-space: nowrap;
}

.process-arrow {
  color: ${COLORS.gold};
  font-size: 10pt; font-weight: 700;
  padding: 0 0.5mm;
}

/* 2-row grid: images top, details bottom */
.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5mm;
  margin-bottom: 4mm;
  flex: 1;
}

.process-img-card {
  position: relative;
  overflow: hidden;
}

.process-img-card img {
  width: 100%; height: 100%; object-fit: cover;
}

.process-img-label {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: rgba(0,31,77,0.85);
  color: ${COLORS.white};
  font-family: "JetBrains Mono", monospace;
  font-size: 6pt; padding: 1.5mm 2.5mm;
  text-transform: uppercase; letter-spacing: 0.06em;
}

.process-details-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4mm;
}

.process-detail-item {
  display: flex;
  gap: 2mm;
  align-items: flex-start;
  background: ${COLORS.coldGray};
  border-left: 2px solid ${COLORS.gold};
  padding: 3mm;
}

.process-detail-num {
  font-family: "Oswald", sans-serif;
  font-size: 16pt; font-weight: 700;
  color: ${COLORS.gold};
  line-height: 1; flex-shrink: 0; width: 7mm;
}

.process-detail-text { flex: 1; }

.process-detail-title {
  font-family: "Oswald", sans-serif;
  font-size: 8pt; font-weight: 600;
  color: ${COLORS.navy}; text-transform: uppercase;
  margin-bottom: 0.5mm;
}

.process-detail-desc {
  font-size: 6.5pt; color: ${COLORS.textSecondary};
  line-height: 1.4;
}

/* ── BACK COVER ────────────────────────────────────────── */

.back-cover {
  width: 297mm; height: 210mm;
  background: ${COLORS.navy};
  color: ${COLORS.white};
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  text-align: center; padding: 30mm;
  position: relative; break-before: page;
}

.back-cover .cover-bg-pattern {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image:
    repeating-linear-gradient(135deg,
      rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px,
      transparent 1px, transparent 12px);
  pointer-events: none;
}

.back-logo { width: 28mm; margin-bottom: 6mm; }
.back-logo svg .st0,
.back-logo svg path { fill: ${COLORS.white} !important; }

.back-company {
  font-family: "Oswald", sans-serif;
  font-size: 15pt; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em;
  margin-bottom: 2mm;
}

.back-tagline {
  font-size: 9pt; color: rgba(255,255,255,0.6);
  margin-bottom: 10mm;
}

.back-gold-rule {
  width: 30mm; height: 2px;
  background: ${COLORS.gold};
  margin: 0 auto 7mm auto;
}

.back-contact-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 5mm; text-align: left;
  margin-bottom: 10mm; width: 100%; max-width: 120mm;
}

.back-contact-item {
  display: flex; flex-direction: column; gap: 0.5mm;
}

.back-contact-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 5.5pt; color: rgba(255,255,255,0.4);
  text-transform: uppercase; letter-spacing: 0.12em;
}

.back-contact-value {
  font-size: 8.5pt; color: ${COLORS.white}; font-weight: 500;
}

.back-address {
  font-size: 7pt; color: rgba(255,255,255,0.45);
  line-height: 1.5; max-width: 140mm; margin-bottom: 7mm;
}

.back-certifications { display: flex; gap: 4mm; }

.back-cert-badge {
  font-family: "JetBrains Mono", monospace;
  font-size: 5.5pt; color: ${COLORS.gold};
  border: 1px solid rgba(232,184,75,0.3);
  padding: 1mm 3mm; text-transform: uppercase;
  letter-spacing: 0.06em;
}

.back-website-url {
  font-family: "Oswald", sans-serif;
  font-size: 10pt; color: rgba(255,255,255,0.25);
  text-transform: uppercase; letter-spacing: 0.2em;
  position: absolute; bottom: 10mm;
}
`;
