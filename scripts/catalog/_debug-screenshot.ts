/**
 * scripts/catalog/_debug-screenshot.ts  (TEMPORARY — delete after redesign)
 *
 * Renders the full catalog HTML and screenshots specific .page elements to PNG
 * so we can visually verify layout without a PDF rasterizer.
 *
 * Usage:  tsx scripts/catalog/_debug-screenshot.ts 7 16 25 3
 *         (numbers = 1-based page index in the document; default 1..6)
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { blades } from "../../client/src/data/blades.ts";
import { buildFullCatalogHtml } from "./html-builder.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../../client/public");
const LOGO_PATH = path.join(PUBLIC_DIR, "sureay-logo.svg");
const OUT_DIR = path.resolve(__dirname, "../../.catalogs-dev/_shots");

async function main() {
  const wanted = process.argv.slice(2).map(Number).filter((n) => n > 0);
  const pages = wanted.length ? wanted : [1, 2, 3, 4, 5, 6];

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const html = await buildFullCatalogHtml(blades, PUBLIC_DIR, LOGO_PATH);

  const browser = await puppeteer.launch({
    headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  // A4 landscape at 96dpi ≈ 1123×794
  await page.setViewport({ width: 1123, height: 794, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 60_000 });

  // Each top-level child of <body> is one page
  const handles = await page.$$("body > div");
  console.log(`[debug] document has ${handles.length} page elements`);

  for (const idx of pages) {
    const h = handles[idx - 1];
    if (!h) {
      console.log(`  page ${idx}: out of range`);
      continue;
    }
    const out = path.join(OUT_DIR, `page-${String(idx).padStart(2, "0")}.png`);
    await h.screenshot({ path: out });
    console.log(`  ✓ page ${idx} → ${out}`);
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
