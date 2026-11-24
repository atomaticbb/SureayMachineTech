import type { Blade } from "../../../client/src/data/blades.ts";
import {
  getStandardColumns,
  getBladeDimensionTables,
} from "../../../client/src/data/blade-dimension-tables.ts";
import { COMPANY } from "../constants.ts";
import type { CatalogCopy } from "../copy.ts";
import {
  escapeHtml,
  generateQrSvg,
  imageToBase64Compressed,
} from "../utils.ts";
import { pageHeader, pageFooter } from "./about.ts";

type Table = ReturnType<typeof getBladeDimensionTables>[number];

function dimensionPages(blade: Blade, copy: CatalogCopy): Table[][] {
  const labels: Record<string, string> = {
    "bladeUi.itemNo": copy.itemNo,
    "productDetail.comprehensiveData.colOuterDiameter": copy.od,
    "productDetail.comprehensiveData.colInnerDiameter": copy.id,
    "productDetail.comprehensiveData.colThickness": copy.thickness,
    "productDetail.comprehensiveData.colTeeth": copy.teeth,
  };
  const cols = getStandardColumns(
    blade,
    blade.standardDimensions ?? [],
    key => labels[key]
  );
  const tables = getBladeDimensionTables(blade, copy.dimensions, cols);
  const pages: Table[][] = [];
  let space = 0;
  for (const table of tables) {
    let part: Table | undefined;
    // Reserve a heading and column headings each time a table starts or continues.
    // Long model names wrap in narrower columns, consuming an extra printed line.
    const charsPerLine = Math.max(15, Math.floor(140 / table.columns.length));
    for (const row of table.rows) {
      const units = Math.max(
        1,
        ...row.map(value => Math.ceil(value.length / charsPerLine))
      );
      if (space < units + (part ? 0 : 4)) {
        pages.push([]);
        space = 20;
        part = undefined;
      }
      if (!part) {
        part = { ...table, rows: [] };
        pages[pages.length - 1].push(part);
        space -= 4;
      }
      part.rows.push(row);
      space -= units;
    }
  }
  return pages;
}

function renderTable(table: Table, copy: CatalogCopy) {
  const headers = table.columns
    .map(
      c =>
        `<th scope="col">${escapeHtml(c === "Item No." ? copy.itemNo : c)}</th>`
    )
    .join("");
  const rows = table.rows
    .map(
      row =>
        `<tr>${row.map(v => `<td><bdi${/^SR\d{6}$/.test(v) ? ' class="item-number"' : ""} dir="${/^[\s+±<≥≤=ØΦ×∅0-9]|^SR\d/.test(v) ? "ltr" : "auto"}">${escapeHtml(v || "—")}</bdi></td>`).join("")}</tr>`
    )
    .join("");
  return `<div class="table-block"><h3>${escapeHtml(table.title)}</h3><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

export async function buildProductPages(
  blade: Blade,
  publicDir: string,
  logo: string,
  firstPage: number,
  copy: CatalogCopy
): Promise<string[]> {
  const url = `${COMPANY.websiteUrl}/products/${blade.id}`;
  const [image, qr] = await Promise.all([
    blade.image && !blade.imagePending
      ? imageToBase64Compressed(publicDir, blade.image, 900)
      : Promise.resolve(""),
    generateQrSvg(url),
  ]);
  const specs = blade.detailLayout?.technicalSpecs?.length
    ? blade.detailLayout.technicalSpecs
    : blade.specs;
  const images = (blade.gallery ?? [])
    .filter((v, i, all) => v !== blade.image && all.indexOf(v) === i)
    .slice(0, 2);
  const gallery = blade.imagePending
    ? []
    : await Promise.all(
        images.map(v => imageToBase64Compressed(publicDir, v, 360))
      );
  const qrLink = `<a class="product-link" href="${url}"><span class="qr">${qr}</span><span><b>${escapeHtml(copy.viewProduct)}</b><small dir="ltr">${url.replace("https://", "")}</small></span></a>`;
  const intro = `<section class="sheet product" id="product-${escapeHtml(blade.id)}">${pageHeader(logo, copy.catalog)}
    <main class="product-grid"><div class="visuals">
      ${image ? `<div class="product-photo"><img src="${image}" alt="${escapeHtml(blade.name)}"></div>` : ""}
      ${
        gallery.some(Boolean)
          ? `<div class="thumbnails">${gallery
              .filter(Boolean)
              .map(src => `<img src="${src}" alt="">`)
              .join("")}</div>`
          : ""
      }
      ${qrLink}</div><div class="product-copy">
      <div class="eyebrow">${escapeHtml(blade.categoryDisplay)}</div><h2>${escapeHtml(blade.name)}</h2>
      <p class="description">${escapeHtml(blade.description)}</p>
      <h3 class="rule-heading">${escapeHtml(copy.specifications)}</h3>
      <dl class="specs">${specs.map(s => `<div><dt>${escapeHtml(s.label)}</dt><dd><bdi>${escapeHtml(s.value)}</bdi></dd></div>`).join("")}</dl>
      ${blade.compatibleMachines?.length ? `<div class="machines"><h4>${escapeHtml(copy.machines)}</h4><p dir="ltr">${blade.compatibleMachines.map(escapeHtml).join(" · ")}</p></div>` : ""}
    </div></main>${pageFooter(firstPage)}</section>`;
  const details = dimensionPages(blade, copy).map(
    (tables, index) =>
      `<section class="sheet reference">${pageHeader(logo, copy.dimensions)}
      <main><div class="eyebrow">${escapeHtml(blade.categoryDisplay)}</div><h2>${escapeHtml(blade.name)}</h2>
      ${index === 0 && blade.dimensionLabels?.intro ? `<p class="dimension-note">${escapeHtml(blade.dimensionLabels.intro)}</p>` : ""}
      ${tables.map(t => renderTable(t, copy)).join("")}</main>${pageFooter(firstPage + index + 1)}</section>`
  );
  return [intro, ...details];
}
