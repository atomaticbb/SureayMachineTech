/**
 * scripts/catalog/html-builder.ts
 *
 * Assembles complete HTML documents for PDF catalog generation.
 *
 * Per-sector: Cover → About → Products (1 page each) → Process → Back Cover
 * Full:       Cover → About → [Industry Divider → Products]×N → Process → Back Cover
 */

import type { Blade } from "../../client/src/data/blades.ts";
import type { SectorMeta, IndustryHeroMeta } from "./constants.ts";
import { COMPANY, SECTOR_CONFIG, INDUSTRY_HERO } from "./constants.ts";
import { CATALOG_CSS } from "./styles.ts";
import { readSvgFile } from "./utils.ts";
import { buildCoverPage } from "./templates/cover.ts";
import { buildAboutPage } from "./templates/about.ts";
import { buildProcessPage } from "./templates/process.ts";
import { buildProductPage } from "./templates/product-page.ts";
import { buildBackCover } from "./templates/back-cover.ts";
import { buildIndustryDivider } from "./templates/industry-divider.ts";

export async function buildCatalogHtml(
  sectorBlades: Blade[],
  config: SectorMeta,
  publicDir: string,
  logoPath: string
): Promise<string> {
  const logoSvg = readSvgFile(logoPath);

  const cover = buildCoverPage(config, logoSvg);
  const about = await buildAboutPage(publicDir, logoSvg, 1);

  // Products start at page 2 (after about)
  const productPages = await Promise.all(
    sectorBlades.map((blade, i) =>
      buildProductPage(blade, i, publicDir, logoSvg, 2 + i)
    )
  );
  const products = productPages.join("\n");

  // Process page comes after all products
  const processPageNum = 2 + sectorBlades.length;
  const process = await buildProcessPage(publicDir, logoSvg, processPageNum);

  const backCover = buildBackCover(logoSvg);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title} — Sureay Product Catalog</title>
  <style>${CATALOG_CSS}</style>
</head>
<body>
  ${cover}
  ${about}
  ${products}
  ${process}
  ${backCover}
</body>
</html>`;
}

/**
 * Build a complete catalog containing ALL products, grouped by industry.
 * Structure: Cover → About → [Industry Divider → Products]×N → Process → Back Cover
 */
export async function buildFullCatalogHtml(
  allBlades: Blade[],
  publicDir: string,
  logoPath: string
): Promise<string> {
  const logoSvg = readSvgFile(logoPath);
  const year = new Date().getFullYear();

  // Full catalog cover config
  const fullConfig: SectorMeta = {
    title: "Complete Product Catalog",
    subtitle: "Industrial Blades & Cutting Solutions",
    filename: "sureay-complete-product-catalog.pdf",
    description:
      "Full product catalog covering all industrial blade categories across recycling, paper, metal, converting, and new energy industries.",
  };

  const cover = buildCoverPage(fullConfig, logoSvg);
  const about = await buildAboutPage(publicDir, logoSvg, 1);

  // Build industry sections in sector order
  const sectorOrder = Object.keys(SECTOR_CONFIG);
  const sections: string[] = [];
  let pageNum = 2;

  for (const sectorKey of sectorOrder) {
    const sectorBlades = allBlades.filter((b) => b.sector === sectorKey);
    if (sectorBlades.length === 0) continue;

    const hero = INDUSTRY_HERO[sectorKey];
    if (hero) {
      const divider = await buildIndustryDivider(
        hero,
        sectorBlades.length,
        publicDir,
        logoSvg,
        pageNum
      );
      sections.push(divider);
      pageNum++;
    }

    for (let i = 0; i < sectorBlades.length; i++) {
      const productPage = await buildProductPage(
        sectorBlades[i],
        i,
        publicDir,
        logoSvg,
        pageNum
      );
      sections.push(productPage);
      pageNum++;
    }
  }

  const process = await buildProcessPage(publicDir, logoSvg, pageNum);
  const backCover = buildBackCover(logoSvg);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complete Product Catalog ${year} — Sureay Machinery</title>
  <style>${CATALOG_CSS}</style>
</head>
<body>
  ${cover}
  ${about}
  ${sections.join("\n")}
  ${process}
  ${backCover}
</body>
</html>`;
}
