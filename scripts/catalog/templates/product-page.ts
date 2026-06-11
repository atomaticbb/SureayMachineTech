/**
 * scripts/catalog/templates/product-page.ts
 *
 * Two layouts share one data-prep path (dispatched by `index`):
 *  - index 0 (first product of each sector) → HERO layout: large image + navy
 *    info panel + full-width gold spec bar + dimension table. Breaks the rhythm.
 *  - otherwise → COMPACT layout: photo grid + info panel + full-width table.
 */

import type { Blade } from "../../../client/src/data/blades.ts";
import {
  imageToBase64Compressed,
  buildDimensionTableHtml,
  buildFeaturesHtml,
  generateQrSvg,
  escapeHtml,
} from "../utils.ts";
import { COMPANY } from "../constants.ts";
import { pageHeader, pageFooter } from "./about.ts";

/** Threshold: if dimension rows ≤ this, show extra content below */
const SPARSE_THRESHOLD = 5;

function buildMachinesHtml(machines: string[] | undefined): string {
  if (!machines || machines.length === 0) return "";
  const tags = machines
    .map((m) => `<span class="product-machine-tag">${escapeHtml(m)}</span>`)
    .join("");
  return `
    <div class="product-machines-strip">
      <div class="product-machines-label">Compatible Machines</div>
      <div class="product-machines-tags">${tags}</div>
    </div>`;
}

function buildAdvantagesHtml(
  components: Blade["components"] | undefined
): string {
  if (!components || components.length === 0) return "";
  const cards = components
    .slice(0, 3)
    .map(
      (c) => `
      <div class="product-advantage-card">
        <div class="product-advantage-tag">${escapeHtml(c.tag)}</div>
        <div class="product-advantage-title">${escapeHtml(c.title)}</div>
        <div class="product-advantage-desc">${escapeHtml(c.description)}</div>
      </div>`
    )
    .join("");
  return `
    <div class="product-advantages">
      <div class="product-advantages-label">Engineering Advantages</div>
      <div class="product-advantages-grid">${cards}</div>
    </div>`;
}

/** QR card → live product page. `onDark` styles it for the navy hero panel. */
function buildQrCard(
  qrSvg: string,
  urlDisplay: string,
  onDark = false
): string {
  return `
    <div class="product-qr${onDark ? " on-dark" : ""}">
      <div class="product-qr-code">${qrSvg}</div>
      <div class="product-qr-text">
        <div class="product-qr-label">Scan · Live Specs &amp; RFQ</div>
        <div class="product-qr-url">${escapeHtml(urlDisplay)}</div>
      </div>
    </div>`;
}

export async function buildProductPage(
  blade: Blade,
  index: number,
  publicDir: string,
  logoSvg: string,
  pageNum: number
): Promise<string> {
  const isHero = index === 0;

  // Main product image — larger for the hero layout
  const mainImgSrc = await imageToBase64Compressed(
    publicDir,
    blade.image,
    isHero ? 1000 : 600
  );

  // QR code → live product page
  const productUrl = `${COMPANY.websiteUrl}${blade.link}`;
  const qrSvg = await generateQrSvg(productUrl);
  const productUrlDisplay = productUrl.replace(/^https?:\/\//, "");

  // Dimension table (shared)
  const dimHtml = buildDimensionTableHtml(blade);

  if (isHero) {
    return buildHeroLayout(
      blade,
      mainImgSrc,
      qrSvg,
      productUrlDisplay,
      dimHtml,
      logoSvg,
      pageNum
    );
  }

  return buildCompactLayout(
    blade,
    mainImgSrc,
    qrSvg,
    productUrlDisplay,
    dimHtml,
    publicDir,
    logoSvg,
    pageNum
  );
}

// ── HERO layout (first product of a sector) ─────────────────────────────────────

function buildHeroLayout(
  blade: Blade,
  mainImgSrc: string,
  qrSvg: string,
  productUrlDisplay: string,
  dimHtml: string,
  logoSvg: string,
  pageNum: number
): string {
  const featuresHtml = buildFeaturesHtml(blade, 320);

  // Up to 4 headline specs for the gold spec bar
  const barSpecs = (blade.specs || []).slice(0, 4);
  const specBarHtml = barSpecs.length
    ? `<div class="hero-spec-bar">${barSpecs
        .map(
          (s) => `
        <div class="hero-spec">
          <div class="hero-spec-value">${escapeHtml(s.value)}</div>
          <div class="hero-spec-label">${escapeHtml(s.label)}</div>
        </div>`
        )
        .join("")}</div>`
    : "";

  return `
  <div class="product-page product-page-hero page">
    ${pageHeader(logoSvg)}

    <div class="hero-body">
      <div class="hero-top">
        <div class="hero-img">
          ${mainImgSrc ? `<img src="${mainImgSrc}" alt="${escapeHtml(blade.name)}" />` : ""}
          <span class="hero-img-tag">Featured</span>
        </div>
        <div class="hero-panel">
          <span class="hero-eyebrow">${escapeHtml(blade.categoryDisplay)}</span>
          <h2 class="hero-name">${escapeHtml(blade.name)}</h2>
          <p class="hero-fullname">${escapeHtml(blade.fullName || "")}</p>
          <div class="hero-gold-rule"></div>
          <div class="hero-features">${featuresHtml}</div>
          ${buildQrCard(qrSvg, productUrlDisplay, true)}
        </div>
      </div>

      ${specBarHtml}

      ${dimHtml ? `
      <div class="product-bottom">
        <div class="product-table-title">Standard Dimensions</div>
        ${dimHtml}
      </div>` : ""}
    </div>

    ${pageFooter(pageNum)}
  </div>`;
}

// ── COMPACT layout (remaining products) ─────────────────────────────────────────

async function buildCompactLayout(
  blade: Blade,
  mainImgSrc: string,
  qrSvg: string,
  productUrlDisplay: string,
  dimHtml: string,
  publicDir: string,
  logoSvg: string,
  pageNum: number
): Promise<string> {
  // Gallery thumbnails (up to 3 others besides main)
  const thumbImages = (blade.gallery || [])
    .filter((img) => img !== blade.image)
    .slice(0, 3);
  const thumbSrcs = await Promise.all(
    thumbImages.map((img) => imageToBase64Compressed(publicDir, img, 250))
  );
  const thumbsHtml = thumbSrcs
    .filter(Boolean)
    .map(
      (src) =>
        `<div class="product-photo-thumb"><img src="${src}" alt="" /></div>`
    )
    .join("");

  // Features copy — clean intro paragraphs, sentence-safe, no Markdown residue
  const featuresHtml = buildFeaturesHtml(blade);

  // Key specs (up to 6 for the mini grid)
  const keySpecs = (blade.specs || []).slice(0, 6);
  const specsHtml = keySpecs
    .map(
      (s) => `
      <div class="product-spec-item">
        <div class="product-spec-label">${escapeHtml(s.label)}</div>
        <div class="product-spec-value">${escapeHtml(s.value)}</div>
      </div>`
    )
    .join("");

  // Extra content for sparse products
  const dimCount = blade.standardDimensions?.length || 0;
  const isSparse = dimCount <= SPARSE_THRESHOLD;
  const machinesHtml = isSparse
    ? buildMachinesHtml(blade.compatibleMachines)
    : "";
  const advantagesHtml = isSparse
    ? buildAdvantagesHtml(blade.components)
    : "";
  const hasExtra = machinesHtml || advantagesHtml;

  return `
  <div class="product-page page">
    ${pageHeader(logoSvg)}

    <div class="product-body${isSparse ? " sparse" : ""}">
      <!-- Top row: photos + info -->
      <div class="product-top">
        <div class="product-photos">
          <div class="product-photo-main">
            ${mainImgSrc ? `<img src="${mainImgSrc}" alt="${escapeHtml(blade.name)}" />` : ""}
          </div>
          ${thumbsHtml ? `<div class="product-photo-side">${thumbsHtml}</div>` : ""}
        </div>

        <div class="product-info">
          <div class="product-name-bar">
            <h2 class="product-name">${escapeHtml(blade.name)}</h2>
            <p class="product-name-en">${escapeHtml(blade.fullName || "")}</p>
          </div>
          <span class="product-category-badge">${escapeHtml(blade.categoryDisplay)}</span>

          <div class="product-features-title">Features</div>
          <div class="product-features-text">${featuresHtml}</div>

          <div class="product-info-footer">
            ${specsHtml ? `<div class="product-specs-mini">${specsHtml}</div>` : ""}
            ${buildQrCard(qrSvg, productUrlDisplay)}
          </div>
        </div>
      </div>

      <!-- Bottom row: full-width dimension table -->
      ${dimHtml ? `
      <div class="product-bottom">
        <div class="product-table-title">Standard Dimensions</div>
        ${dimHtml}
      </div>` : ""}

      <!-- Extra content when table is sparse -->
      ${hasExtra ? `
      <div class="product-extra">
        ${machinesHtml}
        ${advantagesHtml}
      </div>` : ""}
    </div>

    ${pageFooter(pageNum)}
  </div>`;
}
