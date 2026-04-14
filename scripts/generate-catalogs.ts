/**
 * scripts/generate-catalogs.ts
 *
 * Post-build script: generates PDF catalogs using Puppeteer.
 * - 5 per-sector catalogs (recycling, paper, metal, converting, new_energy)
 * - 1 complete catalog with all products grouped by industry
 *
 * Run standalone:  pnpm catalogs
 * Part of build:   pnpm build (runs after prerender)
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { blades } from "../client/src/data/blades.ts";
import { SECTOR_CONFIG } from "./catalog/constants.ts";
import { buildCatalogHtml, buildFullCatalogHtml } from "./catalog/html-builder.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../client/public");
const DIST_DIR = path.resolve(__dirname, "../dist/public");
const LOGO_PATH = path.join(PUBLIC_DIR, "sureay-logo.svg");

// Allow outputting to dist/public/catalogs (build) or a dev directory
const isDev = process.argv.includes("--dev");
const OUTPUT_DIR = isDev
  ? path.resolve(__dirname, "../.catalogs-dev")
  : path.join(DIST_DIR, "catalogs");

// In dev mode, also copy PDFs to client/public/catalogs/ for Vite dev server
const VITE_PUBLIC_CATALOGS = path.resolve(__dirname, "../client/public/catalogs");

async function renderPdf(
  browser: ReturnType<typeof puppeteer.launch> extends Promise<infer B> ? B : never,
  html: string,
  outputPath: string
): Promise<void> {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 30_000 });
  await page.pdf({
    path: outputPath,
    landscape: true,
    format: "A4",
    printBackground: true,
    margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    displayHeaderFooter: false,
  });
  await page.close();
}

async function main(): Promise<void> {
  const sectorKeys = Object.keys(SECTOR_CONFIG);

  console.log(
    `\n[catalogs] Generating ${sectorKeys.length} sector catalogs + 1 complete catalog\n`
  );

  // In production build mode, dist/public must exist
  if (!isDev && !fs.existsSync(DIST_DIR)) {
    console.error(
      `[catalogs] ERROR: ${DIST_DIR} not found — run 'vite build' first`
    );
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "shell",
    pipe: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-software-rasterizer",
      "--disable-extensions",
      "--disable-background-networking",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
      "--disable-hang-monitor",
      "--disable-ipc-flooding-protection",
      "--disable-popup-blocking",
      "--disable-prompt-on-repost",
      "--disable-breakpad",
      "--disable-sync",
      "--disable-translate",
      "--metrics-recording-only",
      "--no-first-run",
      "--no-default-browser-check",
      "--mute-audio",
      "--hide-scrollbars",
    ],
  });

  try {
    // ── Per-sector catalogs ──────────────────────────────
    for (const sectorKey of sectorKeys) {
      const config = SECTOR_CONFIG[sectorKey];
      const sectorBlades = blades.filter((b) => b.sector === sectorKey);

      if (sectorBlades.length === 0) {
        console.log(`  —  ${config.title} (0 products, skipped)`);
        continue;
      }

      const html = await buildCatalogHtml(
        sectorBlades,
        config,
        PUBLIC_DIR,
        LOGO_PATH
      );

      const outputPath = path.join(OUTPUT_DIR, config.filename);
      await renderPdf(browser, html, outputPath);

      const sizeMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(1);
      console.log(
        `  ✓  ${config.filename}  (${sectorBlades.length} products, ${sizeMB} MB)`
      );
    }

    // ── Full catalog ─────────────────────────────────────
    const fullHtml = await buildFullCatalogHtml(blades, PUBLIC_DIR, LOGO_PATH);
    const fullFilename = "sureay-complete-product-catalog.pdf";
    const fullPath = path.join(OUTPUT_DIR, fullFilename);
    await renderPdf(browser, fullHtml, fullPath);

    const fullSizeMB = (fs.statSync(fullPath).size / 1024 / 1024).toFixed(1);
    console.log(
      `  ✓  ${fullFilename}  (${blades.length} products, ${fullSizeMB} MB)`
    );
  } finally {
    await browser.close();
  }

  // Copy all PDFs to client/public/catalogs/ so Vite dev server can serve them
  // and they're included in the production build's static assets
  fs.mkdirSync(VITE_PUBLIC_CATALOGS, { recursive: true });
  const pdfFiles = fs
    .readdirSync(OUTPUT_DIR)
    .filter((f) => f.endsWith(".pdf"));
  for (const f of pdfFiles) {
    fs.copyFileSync(
      path.join(OUTPUT_DIR, f),
      path.join(VITE_PUBLIC_CATALOGS, f)
    );
  }
  console.log(
    `[catalogs] Copied ${pdfFiles.length} PDFs → client/public/catalogs/`
  );

  console.log(`\n[catalogs] Done → ${OUTPUT_DIR}\n`);
}

main().catch((err) => {
  console.error("[catalogs] fatal:", err);
  process.exit(1);
});
