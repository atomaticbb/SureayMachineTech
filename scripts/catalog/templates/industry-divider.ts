/**
 * scripts/catalog/templates/industry-divider.ts
 *
 * Full-page industry section divider for the complete product catalog.
 * Left side: title + subtitle + description text.
 * Right side: 2×2 photo grid from the industry hero gallery.
 */

import type { IndustryHeroMeta } from "../constants.ts";
import { COLORS } from "../constants.ts";
import { imageToBase64Compressed, escapeHtml } from "../utils.ts";
import { pageHeader, pageFooter } from "./about.ts";

export async function buildIndustryDivider(
  hero: IndustryHeroMeta,
  productCount: number,
  publicDir: string,
  logoSvg: string,
  pageNum: number
): Promise<string> {
  const imgSrcs = await Promise.all(
    hero.images.map((img) => imageToBase64Compressed(publicDir, img, 400))
  );

  const gridHtml = imgSrcs
    .filter(Boolean)
    .map(
      (src) =>
        `<div class="industry-grid-img"><img src="${src}" alt="" /></div>`
    )
    .join("");

  return `
  <div class="industry-divider page">
    ${pageHeader(logoSvg)}

    <div class="industry-divider-body">
      <div class="industry-divider-left">
        <div class="industry-divider-badge">${productCount} Products</div>
        <h2 class="industry-divider-title">${escapeHtml(hero.title)}</h2>
        <div class="industry-divider-gold-rule"></div>
        <p class="industry-divider-subtitle">${escapeHtml(hero.subtitle)}</p>
        <p class="industry-divider-body-text">${escapeHtml(hero.body)}</p>
      </div>
      <div class="industry-divider-right">
        <div class="industry-grid">${gridHtml}</div>
      </div>
    </div>

    ${pageFooter(pageNum)}
  </div>`;
}
