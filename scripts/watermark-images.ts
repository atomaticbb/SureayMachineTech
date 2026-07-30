/**
 * Watermark real factory/workshop photos with a small "SUREAY.COM" mark
 * (bottom-right, semi-transparent) to deter direct image theft.
 *
 * Only meant for real photographs (factory floor, shipment, equipment) —
 * not for studio product renders on product pages.
 *
 * Usage: pnpm tsx scripts/watermark-images.ts <file1.webp> [file2.webp ...]
 *        pnpm tsx scripts/watermark-images.ts --dry-run <file1.webp>
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const WATERMARK_TEXT = "SUREAY.COM";
const DRY_RUN = process.argv.includes("--dry-run");
const files = process.argv.slice(2).filter(arg => !arg.startsWith("--"));

function buildWatermarkSvg(imgWidth: number, imgHeight: number): Buffer {
  const fontSize = Math.max(16, Math.round(imgWidth / 28));
  const paddingX = Math.round(fontSize * 0.9);
  const paddingY = Math.round(fontSize * 1.1);

  const svg = `
    <svg width="${imgWidth}" height="${imgHeight}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="${imgWidth - paddingX}"
        y="${imgHeight - paddingY}"
        text-anchor="end"
        font-family="Arial, Helvetica, sans-serif"
        font-size="${fontSize}"
        font-weight="700"
        letter-spacing="1"
        fill="rgba(255,255,255,0.55)"
        stroke="rgba(0,0,0,0.45)"
        stroke-width="${Math.max(1, Math.round(fontSize / 14))}"
        paint-order="stroke fill"
      >${WATERMARK_TEXT}</text>
    </svg>
  `;

  return Buffer.from(svg);
}

async function watermarkFile(filePath: string): Promise<void> {
  const absPath = path.resolve(filePath);

  if (!fs.existsSync(absPath)) {
    console.error(`  SKIP (not found): ${filePath}`);
    return;
  }

  const inputBuffer = fs.readFileSync(absPath);
  const metadata = await sharp(inputBuffer).metadata();
  const { width, height } = metadata;

  if (!width || !height) {
    console.error(`  SKIP (no dimensions): ${filePath}`);
    return;
  }

  if (DRY_RUN) {
    console.log(`[DRY RUN] Would watermark: ${filePath} (${width}x${height})`);
    return;
  }

  const watermarkSvg = buildWatermarkSvg(width, height);
  const outputBuffer = await sharp(inputBuffer)
    .composite([{ input: watermarkSvg, gravity: "southeast" }])
    .webp({ quality: 80, effort: 6 })
    .toBuffer();

  fs.writeFileSync(absPath, outputBuffer);
  console.log(`  Watermarked: ${filePath}`);
}

async function main() {
  if (files.length === 0) {
    console.error(
      "Usage: pnpm tsx scripts/watermark-images.ts <file1.webp> [file2.webp ...]"
    );
    process.exit(1);
  }

  console.log(DRY_RUN ? "=== DRY RUN MODE ===\n" : "");
  for (const file of files) {
    await watermarkFile(file);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
