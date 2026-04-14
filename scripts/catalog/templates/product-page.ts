/**
 * scripts/catalog/templates/product-page.ts
 *
 * Compact 1-page landscape product layout:
 * Top row  — photo grid (main + side thumbs) + info panel (name, desc, key specs)
 * Bottom row — full-width dimension table
 * Extra row — compatible machines + engineering advantages (shown when table is sparse)
 */

import type { Blade } from "../../../client/src/data/blades.ts";
import {
  imageToBase64Compressed,
  buildDimensionTableHtml,
  escapeHtml,
} from "../utils.ts";
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

export async function buildProductPage(
  blade: Blade,
  index: number,
  publicDir: string,
  logoSvg: string,
  pageNum: number
): Promise<string> {
  // Main product image
  const mainImgSrc = await imageToBase64Compressed(
    publicDir,
    blade.image,
    600
  );

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

  // Description — use fullDescription if available for richer content
  const rawDesc = blade.fullDescription || blade.description || "";
  const maxLen = 450;
  const shortDesc =
    rawDesc.length > maxLen ? rawDesc.substring(0, maxLen - 3) + "..." : rawDesc;

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

  // Dimension table
  const dimCount = blade.standardDimensions?.length || 0;
  const dimHtml = buildDimensionTableHtml(blade);
  const isSparse = dimCount <= SPARSE_THRESHOLD;

  // Extra content for sparse products
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
          <div class="product-features-text">${escapeHtml(shortDesc)}</div>

          ${specsHtml ? `<div class="product-specs-mini">${specsHtml}</div>` : ""}
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
