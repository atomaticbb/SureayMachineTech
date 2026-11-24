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

import { bladeDetailPages } from "../client/src/data/blades.ts";
import { BLADE_CATEGORIES } from "../client/src/data/blade-categories.ts";
import { ALL_DISPATCHES } from "../client/src/data/news.ts";
import { mixerParts, mixerCategories } from "../client/src/data/mixerParts.ts";
import {
  getPageLanguages,
  DEFAULT_LANG,
  localizedPath,
} from "../client/src/lib/i18n.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.resolve(__dirname, "../client/public/sitemap.xml");
const BASE_URL = "https://sureay.com";
// Omit lastmod when no verified content modification date is available.

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
  if (!mm || !dd || !yyyy) return "";
  return `${yyyy}-${mm}-${dd.padStart(2, "0")}`;
}

interface UrlEntry {
  /** Canonical path (without language prefix), e.g. "/products/granulator-blades". */
  path: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
}

/** Expand a canonical entry into one <url> per language with shared
 *  xhtml:link rel="alternate" hreflang block. Google requires every
 *  language version to list every alternate (including itself + x-default). */
function expandUrlEntry(entry: UrlEntry): string[] {
  const languages = getPageLanguages(entry.path);
  if (languages.length === 1 && languages[0] === DEFAULT_LANG) {
    return [singleUrlEntry(entry)];
  }
  const alternates = [
    ...languages.map(lang => ({
      hreflang: lang,
      href: `${BASE_URL}${localizedPath(entry.path, lang)}`,
    })),
    // x-default points to the un-prefixed English version.
    ...(languages.includes(DEFAULT_LANG) ? [{
      hreflang: "x-default",
      href: `${BASE_URL}${localizedPath(entry.path, DEFAULT_LANG)}`,
    }] : []),
  ];

  const alternateLines = alternates.map(
    a =>
      `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`
  );

  return languages.map(lang => {
    const loc = `${BASE_URL}${localizedPath(entry.path, lang)}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      ...alternateLines,
      ...(entry.lastmod ? [`    <lastmod>${entry.lastmod}</lastmod>`] : []),
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      "  </url>",
    ].join("\n");
  });
}

// ── Route definitions ─────────────────────────────────────────────────────────

const corePages: UrlEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/products", changefreq: "weekly", priority: "0.9" },
  { path: "/about", changefreq: "yearly", priority: "0.6" },
  { path: "/contact", changefreq: "yearly", priority: "0.7" },
];

// Privacy Policy / Terms — English-only (no multilingual variants), same as
// news.
const legalPages: UrlEntry[] = [
  {
    path: "/privacy-policy",
    changefreq: "yearly",
    priority: "0.3",
  },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

const industryPages: UrlEntry[] = [
  {
    path: "/plastic-industry",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/metal-industry",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/paper-industry",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/new-energy-industry",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/converting-industry",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/wood-industry",
    changefreq: "monthly",
    priority: "0.8",
  },
  { path: "/custom", changefreq: "monthly", priority: "0.8" },
];

const productPages: UrlEntry[] = bladeDetailPages.map(b => ({
  path: `/products/${b.id}`,
  changefreq: "monthly",
  priority: "0.85",
}));

const categoryPages: UrlEntry[] = BLADE_CATEGORIES.map(category => ({
  path: `/categories/${category.slug}`,
  changefreq: "monthly",
  priority: "0.85",
}));

// Mixer Wear Parts — fully translated, so these expand with hreflang like
// product pages. 14 canonical URLs: 1 overview + 2 categories + 11 products.
const mixerPages: UrlEntry[] = [
  {
    path: "/mixer-wear-parts",
    changefreq: "monthly",
    priority: "0.9",
  },
  ...mixerCategories.map(c => ({
    path: c.link,
    changefreq: "monthly",
    priority: "0.85",
  })),
  ...mixerParts.map(p => ({
    path: p.link,
    changefreq: "monthly",
    priority: "0.85",
  })),
];

const latestNewsDate = ALL_DISPATCHES.reduce((latest, article) => {
  const parsed = parseDate(article.date);
  return parsed > latest ? parsed : latest;
}, "");

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

/** Render a single <url> block (no hreflang alternates). Used for pages
 *  that intentionally exist only in English (e.g. news). */
function singleUrlEntry(entry: UrlEntry): string {
  return [
    "  <url>",
    `    <loc>${BASE_URL}${entry.path}</loc>`,
    ...(entry.lastmod ? [`    <lastmod>${entry.lastmod}</lastmod>`] : []),
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    "  </url>",
  ].join("\n");
}

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
  "  <!-- Mixer Wear Parts -->",
  ...mixerPages.flatMap(expandUrlEntry),
  "",
  "  <!-- Legal Pages (English only — no multilingual variants) -->",
  ...legalPages.map(singleUrlEntry),
  "",
  "  <!-- News (English only — no multilingual variants) -->",
  singleUrlEntry(newsListPage),
  ...newsArticles.map(singleUrlEntry),
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
const totalUrlCount = (xml.match(/<loc>/g) ?? []).length;
console.log(`[sitemap] ${OUTPUT}`);
console.log(
  `[sitemap] ${totalUrlCount} URLs written using each page's published languages`
);
