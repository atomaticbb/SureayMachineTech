/** Run after the full build: pnpm test:seo. No audit/customer data is written. */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";
import { blades } from "../client/src/data/blades.ts";
import { BLADE_CATEGORIES } from "../client/src/data/blade-categories.ts";
import {
  getPageLanguages,
  isSupportedLang,
  localizedPath,
  parseLangFromPath,
} from "../client/src/lib/i18n.ts";
import {
  getCategoryRedirect,
  isRetiredProductPath,
} from "../shared/catalog-routing.ts";

const dist = path.resolve("dist/public");
const origin = "https://sureay.com";
const englishOnly = process.env.PRERENDER_LANGS?.toLowerCase() === "en";
const failures: string[] = [];
const incoming = new Set<string>();
const normalize = (value: string) => value.replace(/\/$/, "") || "/";
const inScope = (route: string) =>
  !englishOnly || parseLangFromPath(route).lang === "en";
function retiredPath(route: string): boolean {
  return (
    Boolean(getCategoryRedirect(route)) || isRetiredProductPath(route) ||
    /^\/(?:(?:en|es|fr|ru|vi|ar|pt|tr)\/)?(?:products\/metal-cold-saw-blades|categories\/cold-saw-blades)$/.test(
      normalize(route)
    )
  );
}
const files: string[] = [];
function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name === "index.html") files.push(file);
  }
}
walk(dist);
const routes = new Set(
  files.map(file =>
    normalize(
      "/" + path.relative(dist, path.dirname(file)).replaceAll("\\", "/")
    )
  )
);
for (const route of routes) {
  if (retiredPath(route))
    failures.push(`${route}: retired URL still has publishable HTML`);
}
const sitemapXml = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const sitemap = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match =>
  normalize(new URL(match[1]).pathname)
);
const sitemapRoutes = new Set(sitemap);
for (const route of sitemap) {
  if (retiredPath(route)) failures.push(`${route}: retired URL is in sitemap`);
  if (!getPageLanguages(route).includes(parseLangFromPath(route).lang))
    failures.push(`${route}: sitemap advertises an unavailable language`);
  if (inScope(route) && !routes.has(route))
    failures.push(`${route}: sitemap URL has no prerendered HTML`);
}
for (const match of sitemapXml.matchAll(
  /<xhtml:link\b[^>]*\bhref="([^"]+)"/g
)) {
  const target = normalize(new URL(match[1], origin).pathname);
  if (retiredPath(target) || !sitemapRoutes.has(target))
    failures.push(
      `${target}: sitemap alternate is retired or absent from sitemap`
    );
}
for (const category of ["shredder-blades", "other-custom-blades"]) {
  if (!sitemapRoutes.has(`/categories/${category}`))
    failures.push(`${category}: category missing from sitemap`);
}
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  for (const file of files) {
    const route = normalize(
      "/" + path.relative(dist, path.dirname(file)).replaceAll("\\", "/")
    );
    if (!inScope(route)) continue;
    const data = await page.evaluate(
      html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return {
          title: doc.title,
          description: doc
            .querySelector('meta[name="description"]')
            ?.getAttribute("content"),
          canonical: [...doc.querySelectorAll('link[rel="canonical"]')].map(
            el => el.getAttribute("href")
          ),
          og: doc
            .querySelector('meta[property="og:url"]')
            ?.getAttribute("content"),
          robots:
            doc.querySelector('meta[name="robots"]')?.getAttribute("content") ??
            "",
          h1: doc.querySelectorAll("h1").length,
          lang: doc.documentElement.lang,
          links: [...doc.querySelectorAll("a[href]")].map(
            el => el.getAttribute("href")!
          ),
          alternates: [
            ...doc.querySelectorAll('link[rel="alternate"][hreflang]'),
          ].map(el => ({
            lang: el.getAttribute("hreflang")!,
            href: el.getAttribute("href")!,
          })),
          cards: [...doc.querySelectorAll("main #products a[href]")]
            .filter(el => el.querySelector("h3") && el.querySelector("img"))
            .map(el => el.getAttribute("href")!),
          images: [...doc.querySelectorAll("img[src]")].map(
            el => el.getAttribute("src")!
          ),
          json: [
            ...doc.querySelectorAll('script[type="application/ld+json"]'),
          ].map(el => el.textContent ?? ""),
        };
      },
      fs.readFileSync(file, "utf8")
    );
    const fail = (message: string) => failures.push(`${route}: ${message}`);
    if (route === "/404") {
      if (!/noindex/i.test(data.robots)) fail("404 must be noindex");
    } else {
      if (!data.title || !data.description || !data.lang || data.h1 !== 1)
        fail("missing title/description/lang or H1 count is not one");
      if (/noindex/i.test(data.robots))
        fail("public page unexpectedly noindex");
      if (
        data.canonical.length !== 1 ||
        normalize(data.canonical[0] ?? "") !== normalize(origin + route)
      )
        fail("canonical is not uniquely self-referencing");
      if (data.og !== data.canonical[0]) fail("og:url differs from canonical");
    }
    const jsonDocuments: Record<string, unknown>[] = [];
    for (const json of data.json) {
      try {
        const document = JSON.parse(json);
        jsonDocuments.push(document);
        const checkStructuredLinks = (value: unknown): void => {
          if (typeof value === "string" && /^(?:https?:\/\/|\/)/.test(value)) {
            const url = new URL(value, origin);
            if (url.origin === origin && retiredPath(url.pathname))
              fail(`structured data links to retired URL ${value}`);
          } else if (value && typeof value === "object") {
            Object.values(value).forEach(checkStructuredLinks);
          }
        };
        checkStructuredLinks(document);
      } catch {
        fail("invalid JSON-LD syntax");
      }
    }
    for (const alternate of data.alternates) {
      const target = new URL(alternate.href, origin);
      const language = alternate.lang === "x-default" ? "en" : alternate.lang;
      if (!isSupportedLang(language)) {
        fail(`unknown hreflang ${alternate.lang}`);
        continue;
      }
      const expected = localizedPath(route, language);
      if (
        target.origin !== origin ||
        normalize(target.pathname) !== normalize(expected) ||
        retiredPath(target.pathname)
      )
        fail(`incorrect hreflang target ${alternate.lang}: ${alternate.href}`);
      if (
        !getPageLanguages(target.pathname).includes(
          parseLangFromPath(target.pathname).lang
        )
      )
        fail(`hreflang targets unavailable language ${alternate.href}`);
      if (inScope(target.pathname) && !routes.has(normalize(target.pathname)))
        fail(`hreflang target has no HTML ${alternate.href}`);
    }
    const meta = BLADE_CATEGORIES.find(category =>
      route.endsWith(`/categories/${category.slug}`)
    );
    if (meta) {
      const expected = blades
        .filter(blade => blade.category === meta.category)
        .map(blade => localizedPath(blade.link, parseLangFromPath(route).lang))
        .sort();
      const cards = data.cards.map(href =>
        normalize(new URL(href, origin).pathname)
      );
      const lists = jsonDocuments.filter(
        document => document["@type"] === "ItemList"
      );
      const items = (lists[0]?.itemListElement ?? []) as {
        url?: string;
        position?: number;
      }[];
      const itemPaths = items.map(item =>
        normalize(new URL(item.url ?? "/", origin).pathname)
      );
      if (
        lists.length !== 1 ||
        JSON.stringify(cards) !== JSON.stringify(itemPaths)
      )
        fail(
          "category cards and ItemList must contain the same products in the same order"
        );
      if (
        !expected.length ||
        JSON.stringify([...cards].sort()) !== JSON.stringify(expected)
      )
        fail("category cards do not match blades.ts membership");
      if (items.some((item, index) => item.position !== index + 1))
        fail("ItemList positions must be consecutive from 1");
    }
    for (const src of data.images) {
      const url = new URL(src, origin + route);
      if (
        url.origin === origin &&
        !fs.existsSync(path.join(dist, decodeURIComponent(url.pathname)))
      )
        fail(`missing image ${src}`);
    }
    for (const href of data.links) {
      const url = new URL(href, origin + route);
      if (url.origin !== origin) continue;
      const target = normalize(url.pathname);
      if (retiredPath(target)) fail(`link targets retired URL ${href}`);
      // Historical URLs deliberately return 410. Their existence is valid;
      // publishing internal links to them is not.
      if (
        /^\/(es|fr|ru|vi|ar|pt|tr)\/(news(?:\/|$)|privacy-policy$|terms$)/.test(
          target
        )
      )
        fail(`link targets removed English-only variant ${href}`);
      if (target !== route) incoming.add(target);
      if (
        routes.has(target) ||
        fs.existsSync(path.join(dist, decodeURIComponent(url.pathname)))
      )
        continue;
      // An English preview does not generate existing translated pages.
      if (englishOnly && !inScope(target) && sitemapRoutes.has(target))
        continue;
      if (/^\/(admin|api)(\/|$)/.test(target)) continue;
      // Keep known legacy redirects working, but do not require an HTML file.
      if (
        /^\/(?:(?:en|es|fr|ru|vi|ar|pt|tr)\/)?products\/wood-chipper-blades-(?:industrial|standard)$/.test(
          target
        )
      )
        continue;
      fail(`unresolved internal link ${href}`);
    }
  }
} finally {
  await browser.close();
}
for (const route of sitemap.filter(
  route => inScope(route) && route.endsWith("/products/special-shaped-blades")
)) {
  if (!incoming.has(route))
    failures.push(`${route}: missing internal entry link`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `[SEO] ${files.filter(file => inScope("/" + path.relative(dist, path.dirname(file)).replaceAll("\\", "/"))).length} HTML files checked (${englishOnly ? "English" : "all languages"}); sitemap, internal links, metadata and migrated category ItemLists passed.`
  );
}
