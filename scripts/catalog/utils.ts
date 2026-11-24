/**
 * scripts/catalog/utils.ts
 *
 * Utility functions for catalog PDF generation:
 * - Image to base64 data URI
 * - Markdown heading parser
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";
import QRCode from "qrcode";
import type { Blade, BladeSpec, BladeComponent } from "../../client/src/data/blades.ts";

// ── Image encoding ────────────────────────────────────────────────────────────

// Cache to avoid re-encoding the same image
const imageCache = new Map<string, string>();

export function imageToBase64(publicDir: string, imagePath: string): string {
  const absPath = path.join(publicDir, imagePath.replace(/^\//, ""));
  if (imageCache.has(absPath)) return imageCache.get(absPath)!;
  if (!fs.existsSync(absPath)) return "";
  const buf = fs.readFileSync(absPath);
  const ext = path.extname(absPath).toLowerCase();
  const mime =
    ext === ".webp"
      ? "image/webp"
      : ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
          ? "image/jpeg"
          : ext === ".svg"
            ? "image/svg+xml"
            : "application/octet-stream";
  const result = `data:${mime};base64,${buf.toString("base64")}`;
  imageCache.set(absPath, result);
  return result;
}

/**
 * Resize + compress image for PDF embedding (smaller file size).
 * Returns JPEG base64 data URI capped at maxWidth px.
 */
export async function imageToBase64Compressed(
  publicDir: string,
  imagePath: string,
  maxWidth = 600
): Promise<string> {
  const absPath = path.join(publicDir, imagePath.replace(/^\//, ""));
  const cacheKey = `${absPath}:${maxWidth}`;
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey)!;
  if (!fs.existsSync(absPath)) return "";
  const buf = await sharp(absPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 75 })
    .toBuffer();
  const result = `data:image/jpeg;base64,${buf.toString("base64")}`;
  imageCache.set(cacheKey, result);
  return result;
}

export function readSvgFile(filePath: string): string {
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf-8");
}

// ── Markdown-like heading parser ──────────────────────────────────────────────

/**
 * Converts simple markdown headings (## Title) and paragraphs into HTML.
 * Only handles ## headings + double-newline paragraph breaks.
 */
export function parseMarkdownToHtml(text: string): string {
  if (!text) return "";

  const lines = text.split("\n");
  const htmlParts: string[] = [];
  let currentParagraph: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const content = currentParagraph.join(" ").trim();
      if (content) {
        htmlParts.push(`<p>${content}</p>`);
      }
      currentParagraph = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      const heading = trimmed.replace(/^##\s+/, "");
      htmlParts.push(`<h3>${heading}</h3>`);
    } else if (trimmed === "") {
      flushParagraph();
    } else {
      currentParagraph.push(trimmed);
    }
  }

  flushParagraph();
  return htmlParts.join("\n");
}

// ── QR code (inline SVG) ────────────────────────────────────────────────────────

/** Generate a crisp inline-SVG QR code for the given URL (navy on white). */
export async function generateQrSvg(url: string): Promise<string> {
  return QRCode.toString(url, {
    type: "svg",
    margin: 0,
    color: { dark: "#001f4dff", light: "#ffffffff" },
    errorCorrectionLevel: "M",
  });
}

// ── Specs grid builder ────────────────────────────────────────────────────────

export function buildSpecsHtml(specs: BladeSpec[]): string {
  if (!specs || specs.length === 0) return "";
  return specs
    .map(
      (s) => `
    <div class="spec-item">
      <div class="spec-label">${escapeHtml(s.label)}</div>
      <div class="spec-value">${escapeHtml(s.value)}</div>
    </div>`
    )
    .join("");
}

// ── Engineering advantage cards ───────────────────────────────────────────────

export function buildComponentsHtml(components: BladeComponent[]): string {
  if (!components || components.length === 0) return "";

  const cards = components
    .map(
      (c) => `
    <div class="advantage-card">
      <div class="advantage-tag">${escapeHtml(c.tag)}</div>
      <div class="advantage-title">${escapeHtml(c.title)}</div>
      <div class="advantage-desc">${escapeHtml(c.description)}</div>
    </div>`
    )
    .join("");

  return `<div class="advantages-grid">${cards}</div>`;
}

// ── Compatible machines list ──────────────────────────────────────────────────

export function buildMachinesHtml(machines: string[] | undefined): string {
  if (!machines || machines.length === 0) return "";

  const tags = machines
    .map((m) => `<span class="machine-tag">${escapeHtml(m)}</span>`)
    .join("");

  return `
    <div class="machines-section">
      <div class="tech-section-header">
        <span class="tech-section-number">04</span>
        <h3 class="tech-section-title">Compatible Machines</h3>
      </div>
      <div class="machines-grid">${tags}</div>
    </div>`;
}

// ── FAQ section ───────────────────────────────────────────────────────────────

export function buildFaqHtml(
  faqs: Blade["faqs"]
): string {
  if (!faqs) return "";

  const allFaqs = [
    ...(faqs.technical || []),
    ...(faqs.company || []),
  ];

  if (allFaqs.length === 0) return "";

  // Limit to 4 FAQs for print space
  const limited = allFaqs.slice(0, 4);

  const items = limited
    .map(
      (f) => `
    <div class="faq-item">
      <div class="faq-question">${escapeHtml(f.question)}</div>
      <div class="faq-answer">${escapeHtml(f.answer)}</div>
    </div>`
    )
    .join("");

  return `
    <div class="faq-section">
      <div class="tech-section-header">
        <span class="tech-section-number">05</span>
        <h3 class="tech-section-title">Frequently Asked Questions</h3>
      </div>
      ${items}
    </div>`;
}

// ── HTML escaping ─────────────────────────────────────────────────────────────

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
