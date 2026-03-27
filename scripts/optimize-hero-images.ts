/**
 * scripts/optimize-hero-images.ts
 *
 * Generates responsive image variants for IndustryHero gallery images.
 * Run once: pnpm tsx scripts/optimize-hero-images.ts
 *
 * For each source image it produces:
 *   {name}-320w.webp  — 320 px wide, quality 80 (1× desktop / mobile fallback)
 *   {name}-640w.webp  — 640 px wide, quality 82 (2× retina desktop)
 *
 * Oversized originals (> 300 KB) are also recompressed in-place at quality 82
 * with a 1920 px max-width cap, preserving aspect ratio.
 */

import sharp from "sharp";
import { readdir, rename, rm, stat } from "fs/promises";
import { join, basename, extname } from "path";

// Gallery image directories used by IndustryHero across all industry pages
const GALLERY_DIRS = [
  "client/public/images/applications/tissue-industry",
  "client/public/images/applications/plastic-industry",
  "client/public/images/applications/metal-industry",
  "client/public/images/applications/converting-industry",
  "client/public/images/applications/energy-industry",
];

// Original files > COMPRESS_THRESHOLD bytes will be recompressed in-place
const COMPRESS_THRESHOLD = 300 * 1024; // 300 KB
const VARIANT_WIDTHS = [320, 640] as const;
const VARIANT_QUALITY = 82;
const ORIGINAL_QUALITY = 82;
const ORIGINAL_MAX_WIDTH = 1920;

const IMAGE_RE = /\.(webp|jpg|jpeg|png)$/i;
// Skip files that are already generated variants
const VARIANT_RE = /-\d+w\.(webp|jpg|jpeg|png)$/i;

async function processDir(dir: string) {
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    console.warn(`  [skip] directory not found: ${dir}`);
    return;
  }

  const sources = entries.filter(
    (f) => IMAGE_RE.test(f) && !VARIANT_RE.test(f)
  );

  if (sources.length === 0) {
    console.log(`  [skip] no source images in ${dir}`);
    return;
  }

  for (const file of sources) {
    const srcPath = join(dir, file);
    const ext = extname(file); // e.g. ".webp"
    const name = basename(file, ext); // e.g. "tissue-and-paper"

    const { size } = await stat(srcPath);
    const sizeKB = Math.round(size / 1024);

    console.log(`\n  Processing: ${file}  (${sizeKB} KB)`);

    // 1. Generate responsive variants ------------------------------------------
    for (const width of VARIANT_WIDTHS) {
      const outPath = join(dir, `${name}-${width}w.webp`);
      await sharp(srcPath)
        .resize(width, undefined, { withoutEnlargement: true })
        .webp({ quality: VARIANT_QUALITY })
        .toFile(outPath);
      const { size: outSize } = await stat(outPath);
      console.log(
        `    → ${name}-${width}w.webp  (${Math.round(outSize / 1024)} KB)`
      );
    }

    // 2. Recompress original in-place if oversized ------------------------------
    if (size > COMPRESS_THRESHOLD) {
      const tmpPath = srcPath + ".opt.tmp";
      await sharp(srcPath)
        .resize(ORIGINAL_MAX_WIDTH, undefined, { withoutEnlargement: true })
        .webp({ quality: ORIGINAL_QUALITY })
        .toFile(tmpPath);

      const { size: newSize } = await stat(tmpPath);
      try {
        await rm(srcPath);
        await rename(tmpPath, srcPath);
        console.log(
          `    ✓ original recompressed: ${sizeKB} KB → ${Math.round(newSize / 1024)} KB`
        );
      } catch (err: unknown) {
        // File locked by dev server (EBUSY) — clean up tmp and skip
        await rm(tmpPath).catch(() => {});
        const code = (err as NodeJS.ErrnoException).code;
        console.warn(
          `    ⚠ could not replace original (${code}) — variants generated, original unchanged`
        );
      }
    }
  }
}

async function main() {
  console.log("=== optimize-hero-images ===\n");
  for (const dir of GALLERY_DIRS) {
    console.log(`Directory: ${dir}`);
    await processDir(dir);
  }
  console.log("\n=== Done ===");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
