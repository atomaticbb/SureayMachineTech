import type { Blade, BladeSectorType } from "../../client/src/data/blades.ts";
import { COMPANY, SECTOR_CONFIG, type SectorMeta } from "./constants.ts";
import { catalogCopy as copy } from "./copy.ts";
import { CATALOG_CSS } from "./styles.ts";
import { escapeHtml, readSvgFile } from "./utils.ts";
import { buildCoverPage } from "./templates/cover.ts";
import { buildAboutPage } from "./templates/about.ts";
import { buildProcessPage } from "./templates/process.ts";
import { buildProductPages } from "./templates/product-page.ts";
import { buildBackCover } from "./templates/back-cover.ts";
import { buildIndustryDivider } from "./templates/industry-divider.ts";
import { buildToc, type IndexEntry } from "./templates/toc.ts";

async function buildBook(
  blades: Blade[],
  publicDir: string,
  logoPath: string,
  sector?: BladeSectorType
) {
  const logo = readSvgFile(logoPath);
  const title = sector ? copy.sectors[sector] : copy.complete;
  const sections: string[] = [];
  const index: IndexEntry[] = [];
  let nextPage = 3; // Cover and contents each occupy one physical page.
  async function products(items: Blade[]): Promise<IndexEntry[]> {
    const entries: IndexEntry[] = [];
    for (const blade of items) {
      entries.push({
        href: "product-" + blade.id,
        name: blade.name,
        page: nextPage,
      });
      const sheets = await buildProductPages(
        blade,
        publicDir,
        logo,
        nextPage,
        copy
      );
      sections.push(...sheets);
      nextPage += sheets.length;
    }
    return entries;
  }
  if (sector) {
    index.push(...(await products(blades)));
  } else {
    const order = new Set([
      ...(Object.keys(SECTOR_CONFIG) as BladeSectorType[]),
      ...blades.map(b => b.sector),
    ]);
    for (const key of order) {
      const items = blades.filter(b => b.sector === key);
      if (!items.length) continue;
      const page = nextPage++;
      const position = sections.length;
      index.push({ href: "sector-" + key, name: copy.sectors[key], page });
      const entries = await products(items);
      const image = items.find(b => b.image && !b.imagePending)?.image ?? "";
      sections.splice(
        position,
        0,
        await buildIndustryDivider(
          key,
          copy.sectors[key],
          entries,
          image,
          publicDir,
          logo,
          page,
          copy
        )
      );
    }
  }
  index.push(
    { href: "standards", name: copy.standardsTitle, page: nextPage },
    { href: "contact", name: copy.contact, page: nextPage + 1 }
  );
  const [cover, contents, standards] = await Promise.all([
    buildCoverPage(
      title,
      copy,
      logo,
      publicDir,
      COMPANY.websiteUrl + "/products",
      blades.length
    ),
    buildAboutPage(copy, publicDir, logo, buildToc(index)),
    buildProcessPage(publicDir, logo, nextPage, copy),
  ]);
  const contact = buildBackCover(
    logo,
    copy,
    COMPANY.websiteUrl + "/contact"
  );
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
    <title>${escapeHtml(title)} | Sureay</title><style>${CATALOG_CSS}</style></head><body>${[cover, contents, ...sections, standards, contact].join("")}</body></html>`;
}

export function buildCatalogHtml(
  blades: Blade[],
  config: SectorMeta,
  publicDir: string,
  logoPath: string
) {
  const sector = Object.entries(SECTOR_CONFIG).find(
    ([, entry]) => entry.filename === config.filename
  )?.[0] as BladeSectorType | undefined;
  if (!sector) throw new Error("Unknown sector catalog: " + config.filename);
  return buildBook(blades, publicDir, logoPath, sector);
}

export function buildFullCatalogHtml(
  blades: Blade[],
  publicDir: string,
  logoPath: string
) {
  return buildBook(blades, publicDir, logoPath);
}
