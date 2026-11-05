/** Run after the full build: pnpm test:seo. No audit/customer data is written. */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const dist = path.resolve("dist/public");
const origin = "https://sureay.com";
const failures: string[] = [];
const incoming = new Set<string>();
const normalize = (value: string) => value.replace(/\/$/, "") || "/";
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
const sitemap = [
  ...fs
    .readFileSync(path.join(dist, "sitemap.xml"), "utf8")
    .matchAll(/<loc>(.*?)<\/loc>/g),
].map(match => normalize(new URL(match[1]).pathname));
for (const route of sitemap) {
  if (!routes.has(route))
    failures.push(`${route}: sitemap URL has no prerendered HTML`);
}
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  for (const file of files) {
    const route = normalize(
      "/" + path.relative(dist, path.dirname(file)).replaceAll("\\", "/")
    );
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
    for (const json of data.json) {
      try {
        JSON.parse(json);
      } catch {
        fail("invalid JSON-LD syntax");
      }
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
      if (/^\/(admin|api)(\/|$)/.test(target)) continue;
      // Keep known legacy redirects working, but do not require an HTML file.
      if (
        /^\/(?:(?:en|es|fr|ru|vi|ar|pt|tr)\/)?(?:categories\/wood-chipper-blades|products\/wood-chipper-blades-(?:industrial|standard))$/.test(
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
for (const route of sitemap.filter(route =>
  route.endsWith("/products/special-shaped-blades")
)) {
  if (!incoming.has(route))
    failures.push(`${route}: missing internal entry link`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `[SEO] ${files.length} HTML files / ${sitemap.length} sitemap URLs passed. JSON-LD syntax only; indexing and rich-result eligibility require separate verification.`
  );
}
