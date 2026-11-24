import type { CatalogCopy } from "../copy.ts";
import { escapeHtml, imageToBase64Compressed } from "../utils.ts";
import { pageHeader, pageFooter } from "./about.ts";

const standardPhotos = [
  "lathe-machining",
  "blade-probe-inspection",
  "marked-steel-billets",
];

export async function buildProcessPage(
  publicDir: string,
  logo: string,
  page: number,
  copy: CatalogCopy
) {
  const cards = await Promise.all(
    copy.standards.map(async (standard, i) => {
      const photo = await imageToBase64Compressed(
        publicDir,
        `/images/home/${standardPhotos[i]}-768w.webp`,
        660
      );
      return `<article><img src="${photo}" alt=""><h3>${escapeHtml(standard.title)}</h3><p>${escapeHtml(standard.description)}</p></article>`;
    })
  );
  return `<section class="sheet" id="standards">${pageHeader(logo, copy.catalog)}
    <main><h2>${escapeHtml(copy.standardsTitle)}</h2><div class="standards">${cards.join("")}</div></main>${pageFooter(page)}</section>`;
}
