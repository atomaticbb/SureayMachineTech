/** Verify the real Express responses against existing build output. No generation. */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { Server } from "node:http";
import { createApp } from "../server/app.ts";
import { blades } from "../client/src/data/blades.ts";
import {
  PUBLISHED_LANG_PREFIXES,
  localizedPath,
} from "../client/src/lib/i18n.ts";
import {
  CATEGORY_REDIRECTS,
  RETIRED_PRODUCT_PATHS,
} from "../shared/catalog-routing.ts";

const dist = path.resolve("dist/public");
const englishOnly = process.env.PRERENDER_LANGS?.toLowerCase() === "en";
const preservedProducts = [
  "granulator-blades",
  "strand-pelletizer-rotors",
  "continuous-melt-filter-scraper-blades",
  "cutter-compactor-blades",
  "die-face-cutting-knives",
  "special-shaped-blades",
];
const retiredColdPaths = [
  "/products/metal-cold-saw-blades",
  "/categories/cold-saw-blades",
];
let checks = 0;

async function withServer(
  staticPath: string,
  verify: (base: string) => Promise<void>
): Promise<void> {
  // SPA analytics are intentionally disabled: this check makes no DB writes.
  const server: Server = createApp({ staticPath }).listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  try {
    await verify(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close(error => (error ? reject(error) : resolve()));
      server.closeIdleConnections();
    });
  }
}

async function responseAt(base: string, route: string, expected: number) {
  const response = await fetch(base + route, {
    redirect: "manual",
    signal: AbortSignal.timeout(10000),
  });
  assert.equal(
    response.status,
    expected,
    `${route}: expected HTTP ${expected}`
  );
  checks++;
  return response;
}

async function verifyRedirects(base: string) {
  for (const { from, to } of CATEGORY_REDIRECTS) {
    for (const prefix of [
      "",
      "/en",
      ...PUBLISHED_LANG_PREFIXES.map(lang => `/${lang}`),
    ]) {
      for (const suffix of ["", "/"]) {
        for (const query of ["", "?utm_source=release-check&part=A%2FB"]) {
          const route = prefix + from + suffix + query;
          const response = await responseAt(base, route, 301);
          const expected = new URL((prefix === "/en" ? "" : prefix) + to, base);
          expected.search = query;
          assert.equal(
            response.headers.get("location"),
            expected.pathname + expected.search + expected.hash,
            `${route}: wrong redirect destination or lost query/hash`
          );
          await response.text();
        }
      }
    }
  }
}

async function verifyColdRetirement(base: string) {
  for (const prefix of [
    "",
    "/en",
    ...PUBLISHED_LANG_PREFIXES.map(lang => `/${lang}`),
  ]) {
    for (const route of retiredColdPaths) {
      for (const suffix of ["", "/?utm_source=release-check"]) {
        const response = await responseAt(base, prefix + route + suffix, 410);
        assert.equal(
          response.headers.get("location"),
          null,
          "Gone pages must not redirect"
        );
        await response.text();
      }
    }
  }
}

async function verifyLivePage(base: string, route: string) {
  const file = path.join(dist, route, "index.html");
  assert(fs.existsSync(file), `${route}: missing prerendered HTML`);
  const response = await responseAt(base, route, 200);
  assert.equal(
    response.headers.get("location"),
    null,
    `${route}: unexpected redirect`
  );
  const html = await response.text();
  assert.equal(
    html,
    fs.readFileSync(file, "utf8"),
    `${route}: server did not return this page's HTML`
  );
  return html;
}

async function verifyProductRetirement(base: string) {
  for (const route of RETIRED_PRODUCT_PATHS) {
    for (const prefix of [
      "",
      "/en",
      ...PUBLISHED_LANG_PREFIXES.map(lang => `/${lang}`),
    ]) {
      for (const suffix of ["", "/?utm_source=release-check"]) {
        const response = await responseAt(base, prefix + route + suffix, 410);
        assert.equal(response.headers.get("location"), null);
        await response.text();
      }
    }
  }
}

assert(
  fs.existsSync(dist),
  "Build output missing; build before running the release gate"
);
await withServer(dist, async base => {
  await verifyRedirects(base);
  await verifyColdRetirement(base);
  await verifyProductRetirement(base);
  const releaseLocales = englishOnly
    ? ["en" as const]
    : ["en" as const, ...PUBLISHED_LANG_PREFIXES];
  for (const lang of releaseLocales) {
    for (const { to } of CATEGORY_REDIRECTS) {
      const target = new URL(localizedPath(to, lang), base);
      const html = await verifyLivePage(base, target.pathname);
      if (target.hash)
        assert(
          html.includes(`id="${target.hash.slice(1)}"`),
          `${lang}: missing ${to} redirect anchor`
        );
    }
  }
  for (const id of preservedProducts) {
    assert.equal(
      blades.find(blade => blade.id === id)?.link,
      id === "special-shaped-blades" ? "/custom" : `/products/${id}`,
      `${id}: original product URL changed`
    );
    await verifyLivePage(base, `/products/${id}`);
  }
  const box = "/products/box-slotting-knives";
  const corrugated = "/products/corrugated-slotter-knives";
  for (const lang of releaseLocales) {
    const boxUrl = localizedPath(box, lang);
    const corrugatedUrl = localizedPath(corrugated, lang);
    const boxHtml = await verifyLivePage(base, boxUrl);
    const corrugatedHtml = await verifyLivePage(base, corrugatedUrl);
    assert(
      boxHtml.includes(`rel="canonical" href="https://sureay.com${boxUrl}"`)
    );
    assert(
      corrugatedHtml.includes(
        `rel="canonical" href="https://sureay.com${corrugatedUrl}"`
      )
    );
    assert(
      corrugatedHtml.includes(`href="${boxUrl}"`),
      `${corrugatedUrl}: missing link to box V-grooving`
    );
    for (const alternate of ["en" as const, ...PUBLISHED_LANG_PREFIXES]) {
      assert(
        corrugatedHtml.includes(
          `hreflang="${alternate}" href="https://sureay.com${localizedPath(corrugated, alternate)}"`
        ),
        `${corrugatedUrl}: missing alternate ${alternate}`
      );
    }
    for (const route of [
      "/categories/paper-cutting-knives",
      "/categories/other-custom-blades",
      "/products/stationary-scrap-shear-blades",
      "/products/flying-shear-blades",
      "/products/paper-sheeter-knives",
      "/products/saddle-stitcher-trimmer-knives",
    ]) {
      await verifyLivePage(base, localizedPath(route, lang));
    }
  }
});

// A stale prerender must never take precedence over a redirect or a 410 rule.
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "sureay-routing-"));
try {
  for (const route of [
    ...CATEGORY_REDIRECTS.map(rule => rule.from),
    ...retiredColdPaths,
    ...RETIRED_PRODUCT_PATHS,
  ]) {
    for (const prefix of [
      "",
      "/en",
      ...PUBLISHED_LANG_PREFIXES.map(lang => `/${lang}`),
    ]) {
      const folder = path.join(temporary, prefix + route);
      fs.mkdirSync(folder, { recursive: true });
      fs.writeFileSync(
        path.join(folder, "index.html"),
        "<!doctype html><h1>Stale page must never be served</h1>"
      );
    }
  }
  await withServer(temporary, async base => {
    await verifyRedirects(base);
    await verifyColdRetirement(base);
    await verifyProductRetirement(base);
  });
} finally {
  assert.equal(path.dirname(temporary), path.resolve(os.tmpdir()));
  assert(path.basename(temporary).startsWith("sureay-routing-"));
  fs.rmSync(temporary, { recursive: true, force: true });
}

console.log(
  `[routing] ${checks} HTTP checks passed: 301 destinations, query/hash, 410 retirement, original URLs and stale-file precedence (${englishOnly ? "English" : "all languages"}).`
);
