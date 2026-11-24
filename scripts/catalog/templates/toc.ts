import { escapeHtml } from "../utils.ts";

export interface IndexEntry {
  href: string;
  name: string;
  page: number;
}

export function buildToc(entries: IndexEntry[]) {
  return `<nav class="toc">${entries
    .map(
      ({ href, name, page }) =>
        `<a href="#${escapeHtml(href)}"><span>${escapeHtml(name)}</span><bdi>${String(page).padStart(2, "0")}</bdi></a>`
    )
    .join("")}</nav>`;
}
