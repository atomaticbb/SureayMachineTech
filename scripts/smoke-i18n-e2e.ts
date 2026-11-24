/**
 * scripts/smoke-i18n-e2e.ts
 *
 * End-to-end smoke for the multilingual launch. Operates only on the
 * prerendered `dist/public` output (no server needed) and asserts the
 * full SEO + content contract per language.
 *
 * Coverage per sampled route:
 *   - <html lang="…"> matches the URL prefix
 *   - canonical points at the localized URL
 *   - hreflang alternates include all published languages and x-default
 *   - sitemap.xml includes each published home page and xhtml:link alternates
 *   - each localized page includes at least one expected navigation token
 *
 * Run: pnpm test:e2e
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { PUBLISHED_LANGS, type Lang } from "../client/src/lib/i18n.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist/public");
const SITEMAP = path.join(DIST, "sitemap.xml");
const buildLangs: Lang[] = process.env.PRERENDER_LANGS?.toLowerCase() === "en"
  ? ["en"]
  : PUBLISHED_LANGS;

// A sampling of high-value routes — Home, products listing, product detail,
// category page, contact, plus one industry page. Add/remove sparingly.
const SAMPLE_ROUTES = [
  "/",
  "/products",
  "/products/granulator-blades",
  "/categories/shredder-blades",
  "/categories/paper-cutting-knives",
  "/categories/other-custom-blades",
  "/products/corrugated-slotter-knives",
  "/products/box-slotting-knives",
  "/plastic-industry",
  "/contact",
  "/about",
];

// Tokens that, if present, prove the page actually rendered translated copy
// rather than falling through to English. One distinctive word per lang.
const LANG_TRANSLATED_TOKENS: Record<Lang, string[]> = {
  en: [],
  es: ["Productos", "Inicio", "Industria", "Cuchillas"],
  fr: ["Produits", "Accueil", "Lames", "Industrie"],
  ru: ["Промышленные ножи", "Продукция", "Главная"],
  // Navbar-rendered tokens ("Industrial Blades" / "Mixer Wear Parts") — present
  // on every page via the sitewide nav, unlike the old "Sản phẩm"/"Trang chủ"
  // picks which only ever appeared in breadcrumbs on product/category pages.
  vi: ["Lưỡi Dao Công Nghiệp", "Phụ Tùng Hao Mòn"],
  ar: ["الشفرات الصناعية", "قطع تآكل الخلاطات"],
  pt: ["Lâminas industriais", "Peças de desgaste para misturadores"],
  tr: ["Endüstriyel bıçaklar", "Mikser aşınma parçaları"],
};

interface Failure {
  route: string;
  lang: Lang;
  reason: string;
}

const failures: Failure[] = [];

function fileFor(route: string, lang: Lang): string {
  const prefix = lang === "en" ? "" : `/${lang}`;
  const full = `${prefix}${route}`;
  const segments = full === "/" ? [] : full.replace(/^\//, "").split("/");
  return path.join(DIST, ...segments, "index.html");
}

function checkRouteLang(route: string, lang: Lang): void {
  const file = fileFor(route, lang);
  if (!fs.existsSync(file)) {
    failures.push({
      route,
      lang,
      reason: `missing ${path.relative(DIST, file)}`,
    });
    return;
  }
  const html = fs.readFileSync(file, "utf-8");

  // 1. <html lang>
  const htmlLang = html.match(/<html[^>]*\blang="([a-z]{2})"/);
  if (!htmlLang) {
    failures.push({ route, lang, reason: "no <html lang>" });
  } else if (htmlLang[1] !== lang) {
    failures.push({
      route,
      lang,
      reason: `<html lang="${htmlLang[1]}"> expected "${lang}"`,
    });
  }

  // 2. canonical points to the localized URL
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (canon) {
    const expected =
      lang === "en"
        ? `https://sureay.com${route}`
        : `https://sureay.com/${lang}${route === "/" ? "" : route}`;
    if (canon[1] !== expected) {
      failures.push({
        route,
        lang,
        reason: `canonical "${canon[1]}" expected "${expected}"`,
      });
    }
  } else {
    failures.push({ route, lang, reason: "no canonical link" });
  }

  // 3. hreflang alternates — include every published language and x-default.
  const hreflangs = new Set(
    [...html.matchAll(/hreflang="([a-z-]+)"/g)].map(m => m[1])
  );
  for (const required of [...PUBLISHED_LANGS, "x-default"]) {
    if (!hreflangs.has(required)) {
      failures.push({
        route,
        lang,
        reason: `hreflang="${required}" missing`,
      });
    }
  }

  // 4. Translated tokens — at least one must appear for fully-translated langs
  const tokens = LANG_TRANSLATED_TOKENS[lang];
  if (tokens.length > 0) {
    const found = tokens.some(tok => html.includes(tok));
    if (!found) {
      failures.push({
        route,
        lang,
        reason: `no expected ${lang} token (${tokens.slice(0, 2).join("/")}…) found`,
      });
    }
  }
  if (lang !== "en" && /^\/(?:products|categories)\//.test(route)) {
    const heading = (markup: string) => markup.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
      .replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const english = fs.readFileSync(fileFor(route, "en"), "utf8");
    if (!heading(html) || heading(html) === heading(english)) {
      failures.push({ route, lang, reason: "missing translated catalog heading" });
    }
  }
}

function checkSitemap(): void {
  if (!fs.existsSync(SITEMAP)) {
    failures.push({ route: "/sitemap.xml", lang: "en", reason: "missing" });
    return;
  }
  const xml = fs.readFileSync(SITEMAP, "utf-8");

  // Expect every supported language's home as a <loc>.
  for (const lang of PUBLISHED_LANGS) {
    const prefix = lang === "en" ? "" : `/${lang}`;
    const expected = `<loc>https://sureay.com${prefix}/</loc>`;
    const expectedHome = `<loc>https://sureay.com${prefix === "" ? "/" : prefix}</loc>`;
    if (!xml.includes(expected) && !xml.includes(expectedHome)) {
      failures.push({
        route: `${prefix}/`,
        lang,
        reason: "sitemap.xml missing home <loc>",
      });
    }
  }

  // Expect xhtml namespace + alternates
  if (!xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
    failures.push({
      route: "/sitemap.xml",
      lang: "en",
      reason: "missing xhtml namespace",
    });
  }
  const alternateCount = (xml.match(/<xhtml:link/g) ?? []).length;
  if (alternateCount < 100) {
    failures.push({
      route: "/sitemap.xml",
      lang: "en",
      reason: `only ${alternateCount} xhtml:link entries — expected hundreds`,
    });
  }
}

// ── Run ────────────────────────────────────────────────────────────────────

console.log(
  `[smoke-e2e] ${SAMPLE_ROUTES.length} routes × ${buildLangs.length} langs + sitemap`
);

for (const route of SAMPLE_ROUTES) {
  for (const lang of buildLangs) {
    checkRouteLang(route, lang);
  }
}

checkSitemap();

console.log(`[smoke-e2e] checked ${SAMPLE_ROUTES.length * buildLangs.length} pages and the sitemap, ${failures.length} failures`);

if (failures.length === 0) {
  console.log("[smoke-e2e] ✓ ALL PASS");
  process.exit(0);
}

const SHOW = 30;
for (const f of failures.slice(0, SHOW)) {
  console.error(`  ✗ [${f.lang}] ${f.route} — ${f.reason}`);
}
if (failures.length > SHOW) {
  console.error(`  … and ${failures.length - SHOW} more`);
}
process.exit(1);
