/**
 * scripts/catalog/templates/cover.ts
 *
 * Full-bleed cover: factory photo + navy gradient wash + foil-gold detailing.
 */

import { COMPANY, type SectorMeta } from "../constants.ts";
import { imageToBase64Compressed } from "../utils.ts";

const COVER_PHOTO = "/images/about/factory-image-02.webp";

export async function buildCoverPage(
  config: SectorMeta,
  logoSvg: string,
  publicDir: string
): Promise<string> {
  const year = new Date().getFullYear();
  const photo = await imageToBase64Compressed(publicDir, COVER_PHOTO, 1800);

  return `
  <div class="cover-page">
    ${photo ? `<img class="cover-photo" src="${photo}" alt="" />` : ""}
    <div class="cover-overlay"></div>
    <div class="cover-frame"></div>

    <div class="cover-top">
      <div class="cover-logo">
        ${logoSvg}<span class="cover-wordmark">Sureay Machinery</span>
      </div>
      <div class="cover-year-badge">Product Catalog · ${year}</div>
    </div>

    <div class="cover-content">
      <div class="cover-gold-rule"></div>
      <div class="cover-kicker">${COMPANY.tagline}</div>
      <h1 class="cover-title">${config.title}</h1>
      <p class="cover-subtitle">${config.subtitle}</p>
      <div class="cover-meta">
        <span>${COMPANY.iso}</span>
        <span>${COMPANY.founded}</span>
        <span>${COMPANY.location}</span>
        <span>${COMPANY.website}</span>
      </div>
    </div>
  </div>`;
}
