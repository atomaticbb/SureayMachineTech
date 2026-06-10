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

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { blades } from "../client/src/data/blades.ts";
import { BLADE_CATEGORIES } from "../client/src/data/blade-categories.ts";
import { ALL_DISPATCHES } from "../client/src/data/news.ts";
import {
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  localizedPath,
} from "../client/src/lib/i18n.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.resolve(__dirname, "../client/public/sitemap.xml");
const BASE_URL = "https://sureay.com";
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert "16.MAR.2026" → "2026-03-16" */
const MONTH_MAP: Record<string, string> = {
  JAN: "01",
  FEB: "02",
  MAR: "03",
  APR: "04",
  MAY: "05",
  JUN: "06",
  JUL: "07",
  AUG: "08",
  SEP: "09",
  OCT: "10",
  NOV: "11",
  DEC: "12",
};

function parseDate(raw: string): string {
  const [dd, mon, yyyy] = raw.split(".");
  const mm = MONTH_MAP[mon?.toUpperCase()];
  if (!mm || !dd || !yyyy) return TODAY;
  return `${yyyy}-${mm}-${dd.padStart(2, "0")}`;
}

interface UrlEntry {
  /** Canonical path (without language prefix), e.g. "/products/granulator-blades". */
  path: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

/** Expand a canonical entry into one <url> per language with shared
 *  xhtml:link rel="alternate" hreflang block. Google requires every
 *  language version to list every alternate (including itself + x-default). */
function expandUrlEntry(entry: UrlEntry): string[] {
  const alternates = [
    ...SUPPORTED_LANGS.map(lang => ({
      hreflang: lang,
      href: `${BASE_URL}${localizedPath(entry.path, lang)}`,
    })),
    // x-default points to the un-prefixed English version.
    {
      hreflang: "x-default",
      href: `${BASE_URL}${localizedPath(entry.path, DEFAULT_LANG)}`,
    },
  ];

  const alternateLines = alternates.map(
    a =>
      `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`
  );

  return SUPPORTED_LANGS.map(lang => {
    const loc = `${BASE_URL}${localizedPath(entry.path, lang)}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      ...alternateLines,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      "  </url>",
    ].join("\n");
  });
}

// ── Route definitions ─────────────────────────────────────────────────────────

const corePages: UrlEntry[] = [
  { path: "/", lastmod: TODAY, changefreq: "weekly", priority: "1.0" },
  { path: "/products", lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { path: "/about", lastmod: TODAY, changefreq: "yearly", priority: "0.6" },
  { path: "/contact", lastmod: TODAY, changefreq: "yearly", priority: "0.7" },
];

const industryPages: UrlEntry[] = [
  { path: "/plastic-industry", lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
  { path: "/metal-industry", lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
  { path: "/paper-industry", lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
  { path: "/new-energy-industry", lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
  { path: "/converting-industry", lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
  { path: "/wood-industry", lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
  { path: "/custom", lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
];

const EXCLUDED_PRODUCT_IDS = new Set([
  "wood-chipper-blades-industrial",
  "wood-chipper-blades-standard",
]);

const EXCLUDED_CATEGORY_SLUGS = new Set(["wood-chipper-blades"]);

const productPages: UrlEntry[] = blades
  .filter(b => !EXCLUDED_PRODUCT_IDS.has(b.id))
  .map(b => ({
  path: `/products/${b.id}`,
  lastmod: TODAY,
  changefreq: "monthly",
  priority: "0.85",
}));

const categoryPages: UrlEntry[] = BLADE_CATEGORIES
  .filter(c => !EXCLUDED_CATEGORY_SLUGS.has(c.slug))
  .map(c => ({
  path: `/categories/${c.slug}`,
  lastmod: TODAY,
  changefreq: "monthly",
  priority: "0.85",
}));

const latestNewsDate = ALL_DISPATCHES.reduce((latest, article) => {
  const parsed = parseDate(article.date);
  return parsed > latest ? parsed : latest;
}, TODAY);

const newsListPage: UrlEntry = {
  path: "/news",
  lastmod: latestNewsDate,
  changefreq: "weekly",
  priority: "0.7",
};

const newsArticles: UrlEntry[] = ALL_DISPATCHES.map(a => ({
  path: `/news/${a.id}`,
  lastmod: parseDate(a.date),
  changefreq: "never",
  priority: "0.6",
}));

// ── Render ────────────────────────────────────────────────────────────────────

const sections = [
  "  <!-- Core Pages -->",
  ...corePages.flatMap(expandUrlEntry),
  "",
  "  <!-- Industry Landing Pages -->",
  ...industryPages.flatMap(expandUrlEntry),
  "",
  "  <!-- Category Aggregation Pages -->",
  ...categoryPages.flatMap(expandUrlEntry),
  "",
  "  <!-- Product Detail Pages -->",
  ...productPages.flatMap(expandUrlEntry),
  "",
  "  <!-- News -->",
  ...expandUrlEntry(newsListPage),
  ...newsArticles.flatMap(expandUrlEntry),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  "",
  sections.join("\n"),
  "",
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(OUTPUT, xml, "utf-8");
const canonicalCount =
  corePages.length +
  industryPages.length +
  categoryPages.length +
  productPages.length +
  1 +
  newsArticles.length;
const totalUrlCount = canonicalCount * SUPPORTED_LANGS.length;
console.log(`[sitemap] ${OUTPUT}`);
console.log(
  `[sitemap] ${totalUrlCount} URLs written (${canonicalCount} canonical × ${SUPPORTED_LANGS.length} langs)`
);
