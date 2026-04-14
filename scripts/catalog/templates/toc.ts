/**
 * scripts/catalog/templates/toc.ts
 *
 * Table of contents page: product index with numbering.
 */

import type { Blade } from "../../../client/src/data/blades.ts";
import type { SectorMeta } from "../constants.ts";
import { escapeHtml } from "../utils.ts";

export function buildTocPage(
  sectorBlades: Blade[],
  config: SectorMeta
): string {
  const rows = sectorBlades
    .map(
      (blade, i) => `
    <tr>
      <td class="toc-index">${String(i + 1).padStart(2, "0")}</td>
      <td class="toc-name">${escapeHtml(blade.name)}</td>
      <td class="toc-category">${escapeHtml(blade.categoryDisplay)}</td>
    </tr>`
    )
    .join("");

  return `
  <div class="toc-page">
    <p class="section-tag">[ Contents ]</p>
    <h2 class="section-title">${escapeHtml(config.title)} — Product Index</h2>
    <div class="section-rule"></div>
    <table class="toc-table">${rows}</table>
  </div>`;
}
