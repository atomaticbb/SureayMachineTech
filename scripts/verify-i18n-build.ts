/**
 * scripts/verify-i18n-build.ts
 *
 * Post-build sanity check for multi-language prerender output.
 *
 * Asserts:
 *   1. Every canonical English route has a corresponding index.html.
 *   2. Each published language has an HTML file for every translated route.
 *   3. The HTML files are non-empty and contain a <html> opening tag.
 *
 * Exit code 0 → all assertions pass. Non-zero → first failure logged.
 *
 * Run with:    pnpm test:build
 * Run subset:  PRERENDER_LANGS=en pnpm test:build  (only checks English)
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
  localizedPath,
} from "../client/src/lib/i18n.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "../dist/public");

// Mirrors CANONICAL_ROUTES in prerender.ts. Kept duplicate-but-co-located so a
// drift between the two surfaces immediately as a failed assertion.
const CANONICAL_ROUTES: string[] = [
  "/",
  "/products",
  "/about",
  "/contact",
  "/custom",
  "/plastic-industry",
  "/metal-industry",
  "/paper-industry",
  "/new-energy-industry",
  "/converting-industry",
  "/wood-industry",
  "/news",
  "/privacy-policy",
  "/terms",
  ...bladeDetailPages.map(b => `/products/${b.id}`),
  ...BLADE_CATEGORIES.map(c => `/categories/${c.slug}`),
  ...ALL_DISPATCHES.map(a => `/news/${a.id}`),
  // mixer wear parts: overview + 2 categories + 11 products (multilingual)
  "/mixer-wear-parts",
  ...mixerCategories.map(c => c.link),
  ...mixerParts.map(p => p.link),
];

const PRERENDER_LANGS_RAW = (
  process.env.PRERENDER_LANGS ?? "all"
).toLowerCase();
const EXPECT_MULTI_LANG = PRERENDER_LANGS_RAW !== "en";

const failures: string[] = [];

function routeToFile(route: string): string {
  const segments = route === "/" ? [] : route.replace(/^\//, "").split("/");
  return path.join(DIST_DIR, ...segments, "index.html");
}

function assertFile(route: string, label: string): void {
  const file = routeToFile(route);
  if (!fs.existsSync(file)) {
    failures.push(`[${label}] missing file for route "${route}" → ${file}`);
    return;
  }
  const stat = fs.statSync(file);
  if (!stat.isFile() || stat.size < 100) {
    failures.push(`[${label}] empty/tiny file for "${route}" (${stat.size} B)`);
    return;
  }
  // Cheap content sanity — every prerendered page must have <html and <body
  const content = fs.readFileSync(file, "utf-8");
  if (!content.includes("<html")) {
    failures.push(`[${label}] no <html> tag in "${route}"`);
  }
  if (!content.includes("<body")) {
    failures.push(`[${label}] no <body> tag in "${route}"`);
  }
  // Navbar (and thus LanguageSwitcher) renders on every public page.
  // The data-current-lang attribute confirms the switcher ran inside
  // the correct LangProvider scope.
  if (!content.includes('data-testid="language-switcher"')) {
    failures.push(`[${label}] LanguageSwitcher missing in "${route}"`);
  }
  // Assert the switcher saw the correct language — catches any
  // wouter-base / LangProvider wiring regression.
  if (!content.includes(`data-current-lang="${label}"`)) {
    failures.push(
      `[${label}] LanguageSwitcher did not see lang="${label}" in "${route}"`
    );
  }
  // SEO essentials (Task 3.4):
  //   <html lang="..."> must match the route's language.
  //   hreflang link tags must exist for all published languages
  //     plus an x-default entry. Match by attribute value rather than
  //     fragile substring so attribute order doesn't matter.
  const htmlLangRe = /<html[^>]*\blang="([a-z]{2})"/;
  const htmlLangMatch = content.match(htmlLangRe);
  if (!htmlLangMatch) {
    failures.push(`[${label}] no <html lang="…"> in "${route}"`);
  } else if (htmlLangMatch[1] !== label) {
    failures.push(
      `[${label}] <html lang="${htmlLangMatch[1]}"> does not match expected "${label}" in "${route}"`
    );
  }

  const languages = getPageLanguages(route);
  const expectedHreflangs =
    languages.length > 1
      ? [...languages, ...(languages.includes("en") ? ["x-default"] : [])]
      : [];
  const actualHreflangs = [...content.matchAll(/hreflang="([a-z-]+)"/g)].map(
    match => match[1]
  );
  if (
    JSON.stringify(actualHreflangs.sort()) !==
    JSON.stringify(expectedHreflangs.sort())
  ) {
    failures.push(`[${label}] incorrect hreflang languages in "${route}"`);
  }
}

console.log(`[verify] DIST_DIR = ${DIST_DIR}`);
console.log(
  `[verify] EXPECT_MULTI_LANG = ${EXPECT_MULTI_LANG} (PRERENDER_LANGS=${PRERENDER_LANGS_RAW})`
);
console.log(`[verify] canonical routes: ${CANONICAL_ROUTES.length}`);

if (!fs.existsSync(DIST_DIR)) {
  console.error(`[verify] FAIL — dist directory not found: ${DIST_DIR}`);
  process.exit(1);
}

// 1. English routes — always required.
let expected = 0;
for (const route of CANONICAL_ROUTES) {
  if (!getPageLanguages(route).includes("en")) continue;
  assertFile(route, "en");
  expected++;
}

// 2. Per-language routes — required when EXPECT_MULTI_LANG.
//    English-only routes are skipped.
if (EXPECT_MULTI_LANG) {
  for (const route of CANONICAL_ROUTES) {
    for (const lang of getPageLanguages(route).filter(lang => lang !== "en")) {
      assertFile(localizedPath(route, lang), lang);
      expected++;
    }
  }
}

// 3. Summary.
if (failures.length === 0) {
  console.log(`[verify] OK — ${expected} prerendered HTML files validated`);
  process.exit(0);
}

console.error(
  `\n[verify] FAIL — ${failures.length} of ${expected} checks failed:`
);
const SHOW = 25;
for (const msg of failures.slice(0, SHOW)) {
  console.error("  - " + msg);
}
if (failures.length > SHOW) {
  console.error(`  ... and ${failures.length - SHOW} more`);
}
process.exit(1);
