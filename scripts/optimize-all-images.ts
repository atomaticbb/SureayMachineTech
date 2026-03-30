/**
 * Image optimization script:
 * 1. Convert content PNGs to WebP (skip PWA/favicon PNGs)
 * 2. Compress oversized WebP files (>300KB) to max 1920px, quality 80
 *
 * Usage: pnpm tsx scripts/optimize-all-images.ts [--dry-run]
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, "..", "client", "public", "images");
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;
const COMPRESS_THRESHOLD_KB = 300;
const DRY_RUN = process.argv.includes("--dry-run");

// PWA/favicon PNGs that must stay as PNG
const SKIP_PNGS = new Set([
  "web-app-manifest-512x512.png",
  "web-app-manifest-192x192.png",
  "apple-touch-icon.png",
  "favicon-96x96.png",
]);

interface Stats {
  pngsConverted: number;
  webpsCompressed: number;
  totalSavedBytes: number;
  skipped: number;
  errors: string[];
}

const stats: Stats = {
  pngsConverted: 0,
  webpsCompressed: 0,
  totalSavedBytes: 0,
  skipped: 0,
  errors: [],
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function convertPngToWebp(filePath: string): Promise<void> {
  const fileName = path.basename(filePath);
  if (SKIP_PNGS.has(fileName)) {
    stats.skipped++;
    return;
  }

  const originalSize = fs.statSync(filePath).size;
  const webpPath = filePath.replace(/\.png$/i, ".webp");
  const relPath = path.relative(IMAGES_DIR, filePath);

  if (DRY_RUN) {
    console.log(`[DRY RUN] Would convert PNG: ${relPath} (${formatBytes(originalSize)})`);
    stats.pngsConverted++;
    return;
  }

  try {
    await sharp(filePath)
      .resize(MAX_WIDTH, MAX_WIDTH, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(webpPath);

    const newSize = fs.statSync(webpPath).size;
    const saved = originalSize - newSize;

    // Remove original PNG
    fs.unlinkSync(filePath);

    stats.pngsConverted++;
    stats.totalSavedBytes += saved;
    console.log(
      `  PNG -> WebP: ${relPath}  ${formatBytes(originalSize)} -> ${formatBytes(newSize)}  (saved ${formatBytes(saved)})`
    );
  } catch (error) {
    const msg = `Failed to convert ${relPath}: ${(error as Error).message}`;
    stats.errors.push(msg);
    console.error(`  ERROR: ${msg}`);
  }
}

async function compressWebp(filePath: string): Promise<void> {
  const originalSize = fs.statSync(filePath).size;

  // Skip small files and responsive variants (already optimized)
  if (originalSize < COMPRESS_THRESHOLD_KB * 1024) {
    stats.skipped++;
    return;
  }

  const fileName = path.basename(filePath);
  if (/-\d+w\.webp$/.test(fileName)) {
    stats.skipped++;
    return;
  }

  const relPath = path.relative(IMAGES_DIR, filePath);

  if (DRY_RUN) {
    console.log(`[DRY RUN] Would compress WebP: ${relPath} (${formatBytes(originalSize)})`);
    stats.webpsCompressed++;
    return;
  }

  try {
    // Read into buffer to avoid Windows file lock issues
    const inputBuffer = fs.readFileSync(filePath);
    const outputBuffer = await sharp(inputBuffer)
      .resize(MAX_WIDTH, MAX_WIDTH, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toBuffer();

    const newSize = outputBuffer.length;

    // Only replace if we actually saved space
    if (newSize < originalSize) {
      const saved = originalSize - newSize;
      fs.writeFileSync(filePath, outputBuffer);

      stats.webpsCompressed++;
      stats.totalSavedBytes += saved;
      console.log(
        `  Compressed: ${relPath}  ${formatBytes(originalSize)} -> ${formatBytes(newSize)}  (saved ${formatBytes(saved)})`
      );
    } else {
      stats.skipped++;
      console.log(`  Skipped (already optimal): ${relPath}`);
    }
  } catch (error) {
    const msg = `Failed to compress ${relPath}: ${(error as Error).message}`;
    stats.errors.push(msg);
    console.error(`  ERROR: ${msg}`);
  }
}

async function walkDirectory(dir: string): Promise<{ pngs: string[]; webps: string[] }> {
  const pngs: string[] = [];
  const webps: string[] = [];

  function walk(d: string) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const fullPath = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".png")) {
        pngs.push(fullPath);
      } else if (entry.name.endsWith(".webp")) {
        webps.push(fullPath);
      }
    }
  }

  walk(dir);
  return { pngs, webps };
}

async function main() {
  console.log(DRY_RUN ? "=== DRY RUN MODE ===\n" : "");
  console.log(`Image directory: ${IMAGES_DIR}`);
  console.log(`Max width: ${MAX_WIDTH}px | WebP quality: ${WEBP_QUALITY} | Compress threshold: ${COMPRESS_THRESHOLD_KB}KB\n`);

  const { pngs, webps } = await walkDirectory(IMAGES_DIR);

  // Step 1: Convert PNGs
  console.log(`--- Step 1: Convert ${pngs.length} PNG files to WebP ---`);
  for (const png of pngs) {
    await convertPngToWebp(png);
  }

  // Step 2: Compress oversized WebPs (including newly converted ones)
  // Re-scan to pick up newly created WebP files from PNG conversion
  const { webps: allWebps } = await walkDirectory(IMAGES_DIR);
  const oversized = allWebps.filter(
    (f) => fs.statSync(f).size >= COMPRESS_THRESHOLD_KB * 1024 && !/-\d+w\.webp$/.test(path.basename(f))
  );

  console.log(`\n--- Step 2: Compress ${oversized.length} WebP files over ${COMPRESS_THRESHOLD_KB}KB ---`);
  for (const webp of allWebps) {
    await compressWebp(webp);
  }

  // Summary
  console.log("\n========== SUMMARY ==========");
  console.log(`PNGs converted to WebP: ${stats.pngsConverted}`);
  console.log(`WebP files compressed:  ${stats.webpsCompressed}`);
  console.log(`Files skipped:          ${stats.skipped}`);
  console.log(`Total space saved:      ${formatBytes(stats.totalSavedBytes)}`);
  if (stats.errors.length > 0) {
    console.log(`\nErrors (${stats.errors.length}):`);
    stats.errors.forEach((e) => console.log(`  - ${e}`));
  }
  console.log("=============================");
}

main().catch(console.error);
