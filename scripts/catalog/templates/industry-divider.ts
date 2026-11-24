import type { CatalogCopy } from "../copy.ts";
import { escapeHtml, imageToBase64Compressed } from "../utils.ts";
import { pageHeader, pageFooter } from "./about.ts";
import { buildToc, type IndexEntry } from "./toc.ts";

export async function buildIndustryDivider(
  sector: string,
  title: string,
  entries: IndexEntry[],
  image: string,
  publicDir: string,
  logo: string,
  page: number,
  copy: CatalogCopy
) {
  const photo = image
    ? await imageToBase64Compressed(publicDir, image, 850)
    : "";
  return `<section class="sheet directory" id="sector-${escapeHtml(sector)}">${pageHeader(logo, copy.contents)}
    <main class="directory-grid"><div class="directory-index"><h2>${escapeHtml(title)}</h2>${buildToc(entries)}</div>
    ${photo ? `<aside class="sector-photo"><img src="${photo}" alt=""></aside>` : ""}
    </main>${pageFooter(page)}</section>`;
}
