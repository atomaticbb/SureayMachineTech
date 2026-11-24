import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import puppeteer, { type Browser } from "puppeteer";
import {
  blades,
  getShredderDetailBlade,
  isUpgradedShredderBlade,
} from "../client/src/data/blades.ts";
import {
  getIndustryBlades,
  type CatalogIndustry,
} from "../client/src/data/industry-blades.ts";
import { COMPLETE_CATALOG_FILENAME } from "../client/src/lib/catalogPdf.ts";
import { PUBLISHED_LANG_PREFIXES } from "../client/src/lib/i18n.ts";
import { SECTOR_CONFIG } from "./catalog/constants.ts";
import {
  buildCatalogHtml,
  buildFullCatalogHtml,
} from "./catalog/html-builder.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicDir = path.join(root, "client/public");
const logo = path.join(publicDir, "sureay-logo.svg");
const isDev = process.argv.includes("--dev");
const outputDir = path.join(
  root,
  isDev ? ".catalogs-dev" : "dist/public/catalogs"
);
const products = blades.map(blade =>
  isUpgradedShredderBlade(blade) && !blade.detailLayout
    ? getShredderDetailBlade(blade)
    : blade
);
const sectors = Object.keys(SECTOR_CONFIG) as CatalogIndustry[];

async function render(browser: Browser, html: string, file: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const page = await browser.newPage();
  try {
    await page.emulateMediaType("print");
    await page.setContent(html, { waitUntil: "load", timeout: 120_000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images, img => img.decode()));
    });
    await page.pdf({
      path: file,
      format: "A4",
      landscape: true,
      preferCSSPageSize: true,
      printBackground: true,
      timeout: 120_000,
    });
  } finally {
    await page.close();
  }
}

// Switch each public file only after the whole set has rendered successfully.
function publish(source: string, target: string) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const temp = target + "." + randomUUID() + ".tmp";
  try {
    fs.copyFileSync(source, temp);
    fs.renameSync(temp, target);
  } finally {
    fs.rmSync(temp, { force: true });
  }
}

async function main() {
  if (!isDev && !fs.existsSync(path.join(root, "dist/public"))) {
    throw new Error(
      "Build the site first, or run pnpm catalogs for local preview."
    );
  }
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "sureay-catalogs-"));
  const files: string[] = [];
  try {
    const browser = await puppeteer.launch({
      headless: "shell",
      pipe: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });
    try {
      const save = async (filename: string, html: string) => {
        await render(browser, html, path.join(temporary, filename));
        files.push(filename);
      };
      for (const sector of sectors) {
        const config = SECTOR_CONFIG[sector];
        const selected = getIndustryBlades(products, sector);
        if (!selected.length) throw new Error(`Empty catalog: ${sector}`);
        await save(
          config.filename,
          await buildCatalogHtml(selected, config, publicDir, logo)
        );
      }
      await save(
        COMPLETE_CATALOG_FILENAME,
        await buildFullCatalogHtml(products, publicDir, logo)
      );
    } finally {
      await browser.close();
    }
    for (const directory of [outputDir, path.join(publicDir, "catalogs")]) {
      for (const file of files) {
        publish(path.join(temporary, file), path.join(directory, file));
      }
      // A previous build may have copied language-specific PDFs into this directory.
      for (const prefix of PUBLISHED_LANG_PREFIXES) {
        for (const file of files) {
          fs.rmSync(path.join(directory, prefix, file), { force: true });
        }
      }
    }
    console.log(
      `[catalogs] Published ${files.length} English PDFs to ${outputDir} and the local site.`
    );
  } finally {
    // Only the private directory allocated by mkdtempSync above is removed.
    if (
      path.dirname(temporary) === path.resolve(os.tmpdir()) &&
      path.basename(temporary).startsWith("sureay-catalogs-")
    ) {
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  }
}

main().catch(error => {
  console.error("[catalogs]", error);
  process.exitCode = 1;
});
