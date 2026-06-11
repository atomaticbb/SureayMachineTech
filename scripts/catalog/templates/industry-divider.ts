/**
 * scripts/catalog/templates/industry-divider.ts
 *
 * Full-bleed industry section divider — echoes the cover (factory-photo wash +
 * foil-gold detailing) but distinct: oversized section numeral, huge sector
 * title, and a key-data strip. Acts as a strong visual section break.
 */

import type { IndustryHeroMeta, SectorMeta } from "../constants.ts";
import { COMPANY } from "../constants.ts";
import { imageToBase64Compressed, escapeHtml } from "../utils.ts";

export async function buildIndustryDivider(
  hero: IndustryHeroMeta,
  sector: SectorMeta,
  productCount: number,
  sectionIndex: number,
  publicDir: string,
  logoSvg: string
): Promise<string> {
  // Lead image of the industry gallery, full-bleed
  const photo = await imageToBase64Compressed(publicDir, hero.images[0], 1600);

  const num = String(sectionIndex).padStart(2, "0");

  // Data strip: dynamic product count + two static industry stats
  const stats = [
    { value: String(productCount), label: "Product Lines" },
    ...hero.stats,
  ];
  const statsHtml = stats
    .map(
      (s) => `
      <div class="divider-stat">
        <div class="divider-stat-value">${escapeHtml(s.value)}</div>
        <div class="divider-stat-label">${escapeHtml(s.label)}</div>
      </div>`
    )
    .join("");

  return `
  <div class="industry-divider">
    ${photo ? `<img class="divider-photo" src="${photo}" alt="" />` : ""}
    <div class="divider-overlay"></div>
    <div class="divider-num">${num}</div>

    <div class="divider-top">
      <div class="divider-logo">
        ${logoSvg}<span class="divider-wordmark">Sureay Blades</span>
      </div>
      <div class="divider-section-tag">Section ${num}</div>
    </div>

    <div class="divider-content">
      <div class="divider-kicker">${escapeHtml(hero.subtitle)}</div>
      <h2 class="divider-title">${escapeHtml(sector.title)}</h2>
      <div class="divider-gold-rule"></div>
      <p class="divider-body">${escapeHtml(hero.body)}</p>
      <div class="divider-stats">${statsHtml}</div>
    </div>

    <div class="divider-foot">${COMPANY.website}</div>
  </div>`;
}
