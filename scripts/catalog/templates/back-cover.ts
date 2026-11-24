import { COMPANY } from "../constants.ts";
import type { CatalogCopy } from "../copy.ts";
import { escapeHtml } from "../utils.ts";

export function buildBackCover(
  logo: string,
  copy: CatalogCopy,
  contactUrl: string
) {
  return `<section class="sheet contact" id="contact"><div class="brand" dir="ltr">${logo}<b>SUREAY MACHINERY</b></div>
    <div class="contact-content"><h2>${escapeHtml(copy.contact)}</h2><p>${escapeHtml(copy.contactBody)}</p>
    <a class="contact-url" dir="ltr" href="${contactUrl}">${escapeHtml(contactUrl.replace("https://", ""))}</a>
    <div class="contact-details"><div><small>${escapeHtml(copy.email)}</small><a dir="ltr" href="mailto:${COMPANY.email}">${COMPANY.email}</a></div>
    <div><small>${escapeHtml(copy.phone)}</small><a dir="ltr" href="tel:${COMPANY.phone.replace(/[^+\d]/g, "")}">${escapeHtml(COMPANY.phone)}</a></div></div></div>
    <div class="contact-footer" dir="ltr">${escapeHtml(COMPANY.name)}</div></section>`;
}
