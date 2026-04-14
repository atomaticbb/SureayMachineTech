/**
 * scripts/catalog/templates/cover.ts
 *
 * Full-page cover: navy background, logo, sector title, company info.
 */

import { COMPANY, type SectorMeta } from "../constants.ts";

export function buildCoverPage(config: SectorMeta, logoSvg: string): string {
  const year = new Date().getFullYear();

  return `
  <div class="cover-page">
    <div class="cover-bg-pattern"></div>
    <div class="cover-accent-bar"></div>
    <div class="cover-logo">${logoSvg}</div>
    <div class="cover-year-badge">Product Catalog ${year}</div>
    <div class="cover-gold-rule"></div>
    <h1 class="cover-title">${config.title}</h1>
    <p class="cover-subtitle">${config.subtitle}</p>
    <div class="cover-meta">
      <span>${COMPANY.name}</span>
      <span>${COMPANY.iso} &nbsp;|&nbsp; ${COMPANY.founded}</span>
      <span>${COMPANY.location}</span>
    </div>
  </div>`;
}
