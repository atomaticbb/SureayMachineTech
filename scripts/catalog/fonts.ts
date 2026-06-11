/**
 * scripts/catalog/fonts.ts
 *
 * Self-hosted @font-face CSS for the PDF catalog. The three families are
 * variable woff2 files (latin subset) committed under ./fonts/, base64-embedded
 * as data URLs so Puppeteer's setContent renders fully offline — no dependency
 * on fonts.googleapis.com (which is unreachable from CN build machines).
 *
 * Files fetched once via the loli.net Google-Fonts mirror; each family is a
 * single variable font, so one @font-face with a font-weight range covers all
 * weights the catalog uses.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FONTS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "fonts");

function dataUrl(file: string): string {
  const b64 = fs.readFileSync(path.join(FONTS_DIR, file)).toString("base64");
  return `data:font/woff2;base64,${b64}`;
}

interface FaceDef {
  family: string;
  file: string;
  /** Variable-font weight axis range, as "<min> <max>" */
  weightRange: string;
}

const FACES: FaceDef[] = [
  { family: "Inter", file: "inter.woff2", weightRange: "100 900" },
  { family: "Oswald", file: "oswald.woff2", weightRange: "200 700" },
  { family: "JetBrains Mono", file: "jetbrainsmono.woff2", weightRange: "100 800" },
];

export const FONT_FACE_CSS = FACES.map(
  (f) => `
@font-face {
  font-family: "${f.family}";
  font-style: normal;
  font-weight: ${f.weightRange};
  font-display: block;
  src: url(${dataUrl(f.file)}) format("woff2");
}`
).join("\n");
