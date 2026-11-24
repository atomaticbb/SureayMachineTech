import { COMPANY } from "../constants.ts";
import type { CatalogCopy } from "../copy.ts";
import { escapeHtml, imageToBase64Compressed } from "../utils.ts";

export function pageHeader(logo: string, label: string) {
  return `<header><div class="brand" dir="ltr">${logo}<b>SUREAY</b></div><span>${escapeHtml(label)}</span></header>`;
}

export function pageFooter(page: number) {
  return `<footer><span dir="ltr">${escapeHtml(COMPANY.name)}</span><bdi>${String(page).padStart(2, "0")}</bdi></footer>`;
}

export async function buildAboutPage(
  copy: CatalogCopy,
  publicDir: string,
  logo: string,
  index: string
) {
  const photo = await imageToBase64Compressed(
    publicDir,
    "/images/about/factory-00.webp",
    1100
  );
  return `<section class="sheet directory" id="index">${pageHeader(logo, copy.catalog)}
    <main class="directory-grid"><div class="directory-index"><h2>${escapeHtml(copy.contents)}</h2>${index}</div>
    <aside class="about"><img src="${photo}" alt=""><h3>${escapeHtml(copy.aboutTitle)}</h3><p>${escapeHtml(copy.aboutBody)}</p></aside>
    </main>${pageFooter(2)}</section>`;
}
