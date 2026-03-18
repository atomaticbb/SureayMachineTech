/**
 * scripts/generate-sitemap.ts
 *
 * Generates client/public/sitemap.xml from the static data sources.
 * Runs automatically as part of `pnpm build` — never edit sitemap.xml by hand.
 *
 * Priority model:
 *   1.0  Homepage
 *   0.9  Product listing
 *   0.85 Product detail pages
 *   0.8  Industry landing pages
 *   0.7  News listing, Contact
 *   0.6  News articles, About
 */

import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { blades }         from "../client/src/data/blades.ts";
import { ALL_DISPATCHES } from "../client/src/data/news.ts";

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT     = path.resolve(__dirname, "../client/public/sitemap.xml");
const BASE_URL   = "https://www.sureay.com";
const TODAY      = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert "16.MAR.2026" → "2026-03-16" */
const MONTH_MAP: Record<string, string> = {
  JAN: "01", FEB: "02", MAR: "03", APR: "04",
  MAY: "05", JUN: "06", JUL: "07", AUG: "08",
  SEP: "09", OCT: "10", NOV: "11", DEC: "12",
};

function parseDate(raw: string): string {
  const [dd, mon, yyyy] = raw.split(".");
  const mm = MONTH_MAP[mon?.toUpperCase()];
  if (!mm || !dd || !yyyy) return TODAY;
  return `${yyyy}-${mm}-${dd.padStart(2, "0")}`;
}

interface UrlEntry {
  loc:        string;
  lastmod:    string;
  changefreq: string;
  priority:   string;
}

function url(entry: UrlEntry): string {
  return [
    "  <url>",
    `    <loc>${entry.loc}</loc>`,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    "  </url>",
  ].join("\n");
}

// ── Route definitions ─────────────────────────────────────────────────────────

const corePages: UrlEntry[] = [
  { loc: `${BASE_URL}/`,               lastmod: TODAY,  changefreq: "weekly",  priority: "1.0" },
  { loc: `${BASE_URL}/products`,       lastmod: TODAY,  changefreq: "weekly",  priority: "0.9" },
  { loc: `${BASE_URL}/about`,          lastmod: TODAY,  changefreq: "yearly",  priority: "0.6" },
  { loc: `${BASE_URL}/contact`,        lastmod: TODAY,  changefreq: "yearly",  priority: "0.7" },
];

const industryPages: UrlEntry[] = [
  { loc: `${BASE_URL}/plastic-industry`, lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/metal-industry`,   lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
  { loc: `${BASE_URL}/paper-industry`,   lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
];

const productPages: UrlEntry[] = blades.map((b) => ({
  loc:        `${BASE_URL}/products/${b.id}`,
  lastmod:    TODAY,
  changefreq: "monthly",
  priority:   "0.85",
}));

const newsListPage: UrlEntry = {
  loc:        `${BASE_URL}/news`,
  lastmod:    parseDate(ALL_DISPATCHES[0]?.date ?? ""),
  changefreq: "weekly",
  priority:   "0.7",
};

const newsArticles: UrlEntry[] = ALL_DISPATCHES.map((a) => ({
  loc:        `${BASE_URL}/news/${a.id}`,
  lastmod:    parseDate(a.date),
  changefreq: "never",
  priority:   "0.6",
}));

// ── Render ────────────────────────────────────────────────────────────────────

const sections = [
  "  <!-- Core Pages -->",
  ...corePages.map(url),
  "",
  "  <!-- Industry Landing Pages -->",
  ...industryPages.map(url),
  "",
  "  <!-- Product Detail Pages -->",
  ...productPages.map(url),
  "",
  "  <!-- News -->",
  url(newsListPage),
  ...newsArticles.map(url),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  "",
  sections.join("\n"),
  "",
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(OUTPUT, xml, "utf-8");
console.log(`[sitemap] ${OUTPUT}`);
console.log(`[sitemap] ${corePages.length + industryPages.length + productPages.length + 1 + newsArticles.length} URLs written`);
