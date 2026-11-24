import type { CatalogCopy } from "../copy.ts";
import { imageToBase64Compressed, escapeHtml } from "../utils.ts";

export async function buildCoverPage(
  title: string,
  copy: CatalogCopy,
  logo: string,
  publicDir: string,
  siteUrl: string,
  count: number
) {
  const image = await imageToBase64Compressed(
    publicDir,
    "/images/about/factory-image-02.webp",
    1650
  );
  return `<section class="sheet cover"><img class="cover-image" src="${image}" alt=""><div class="cover-shade"></div>
    <div class="cover-top"><div class="brand" dir="ltr">${logo}<b>SUREAY MACHINERY</b></div><span class="edition">${new Date().getFullYear()}</span></div>
    <div class="cover-heading"><div class="eyebrow">${escapeHtml(copy.catalog)}</div><h1>${escapeHtml(title)}</h1>
    <div class="cover-meta"><span>${escapeHtml(copy.products)} · <bdi>${count}</bdi></span><a dir="ltr" href="${siteUrl}">sureay.com</a></div></div></section>`;
}
