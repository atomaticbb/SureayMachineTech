/**
 * scripts/prerender.ts
 *
 * Post-build prerender: spins up a local static server, visits every route
 * with Puppeteer, and writes the fully-rendered HTML to dist/public.
 *
 * Blade IDs are read directly from the static data file — no Express required.
 * One timing-out route is logged and skipped; it never aborts the whole run.
 */

import puppeteer, { type Browser } from "puppeteer";
import http, { type Server } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// tsx resolves .ts imports at runtime — no compilation step needed
import { blades } from "../client/src/data/blades.ts";
import { BLADE_CATEGORIES } from "../client/src/data/blade-categories.ts";
import { ALL_DISPATCHES } from "../client/src/data/news.ts";
import { LANG_PREFIXES } from "../client/src/lib/i18n.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "../dist/public");
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const CONCURRENCY = 3; // parallel Puppeteer pages
const TIMEOUT_MS = 45_000; // per-route navigation + selector timeout

// Tracks routes whose prerender threw — exit 1 at end so CI hard-fails.
const FAILED_ROUTES: string[] = [];

// ── Route manifest ─────────────────────────────────────────────────────────────
// Admin routes are intentionally excluded: they require auth and never need SEO.

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
  // dynamic product pages — derived from static blade data
  ...blades.map(b => `/products/${b.id}`),
  // dynamic category aggregation pages — derived from static category metadata
  ...BLADE_CATEGORIES.map(c => `/categories/${c.slug}`),
  // dynamic news detail pages — derived from static article data
  ...ALL_DISPATCHES.map(a => `/news/${a.id}`),
];

// Expand canonical English routes across all non-default languages.
// LANG_PREFIXES is ["es", "fr", "ru", "vi"] for phase 1; Arabic added in phase 2.
// Set PRERENDER_LANGS=en to skip the multi-lang expansion (fast dev iteration).
const PRERENDER_LANGS_RAW = (process.env.PRERENDER_LANGS ?? "all").toLowerCase();
const SHOULD_EXPAND_LANGS = PRERENDER_LANGS_RAW !== "en";

const ROUTES: string[] = SHOULD_EXPAND_LANGS
  ? [
      ...CANONICAL_ROUTES,
      ...LANG_PREFIXES.flatMap(lang =>
        CANONICAL_ROUTES.map(r => (r === "/" ? `/${lang}` : `/${lang}${r}`))
      ),
    ]
  : CANONICAL_ROUTES;

// ── MIME types (no extra dependency) ──────────────────────────────────────────

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

// ── SPA-aware static file server ───────────────────────────────────────────────

function startStaticServer(): Promise<Server> {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = (req.url ?? "/").split("?")[0];
      let filePath = path.join(DIST_DIR, urlPath);

      // directory → try index.html inside it
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      // file exists on disk → serve it
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const mime = MIME[path.extname(filePath)] ?? "application/octet-stream";
        res.writeHead(200, { "Content-Type": mime });
        res.end(fs.readFileSync(filePath));
        return;
      }

      // SPA fallback — let Wouter handle client-side routing
      const indexPath = path.join(DIST_DIR, "index.html");
      if (!fs.existsSync(indexPath)) {
        res.writeHead(500);
        res.end("dist/public/index.html missing");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.readFileSync(indexPath));
    });

    server.on("error", reject);
    server.listen(PORT, "127.0.0.1", () => {
      console.log(`  [server] ${BASE_URL}`);
      resolve(server);
    });
  });
}

// ── Write prerendered HTML to disk ─────────────────────────────────────────────

function persistHtml(route: string, html: string): void {
  // "/"             → dist/public/index.html
  // "/about"        → dist/public/about/index.html
  // "/products/xyz" → dist/public/products/xyz/index.html
  const segments = route === "/" ? [] : route.replace(/^\//, "").split("/");
  const outputDir = path.join(DIST_DIR, ...segments);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(outputDir, "index.html"),
    `<!DOCTYPE html>\n${html}`,
    "utf-8"
  );
}

// ── Render a single route with Puppeteer ───────────────────────────────────────

async function renderRoute(browser: Browser, route: string): Promise<void> {
  const page = await browser.newPage();
  try {
    // Capture page console errors/warnings (info/log is too noisy)
    page.on("console", msg => {
      const t = msg.type();
      if (t === "error" || t === "warning") {
        console.error(`  [console:${t}] ${route}: ${msg.text()}`);
      }
    });
    page.on("pageerror", err => {
      console.error(`  [js-error] ${route}: ${err.message}`);
    });
    // Log any request that fails outright (would catch chunk-load failures
    // that trigger lazyWithRetry's window.location.reload loop)
    page.on("requestfailed", req => {
      const failure = req.failure();
      // Aborts are expected (we abort all external requests via interception),
      // so only log actual failures, not our deliberate aborts.
      const errText = failure?.errorText ?? "";
      if (errText && errText !== "net::ERR_FAILED" && errText !== "net::ERR_ABORTED") {
        console.error(`  [req-fail] ${route}: ${req.url()} -> ${errText}`);
      }
    });

    // Block all external requests so networkidle2 is reached quickly.
    // GA4's wait_for_update + gtag/js keep connections open indefinitely
    // in Docker build environments, causing every route to timeout.
    await page.setRequestInterception(true);
    page.on("request", req => {
      const url = req.url();
      if (url.startsWith(BASE_URL) || url.startsWith("data:")) {
        req.continue();
      } else {
        req.abort();
      }
    });

    await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "load",
      timeout: TIMEOUT_MS,
    });

    // Wait until React has mounted at least one child inside #root
    await page.waitForSelector("#root > *", { timeout: TIMEOUT_MS });

    // Wait until react-helmet-async has flushed its tags into <head>.
    // Primary signal: data-rh="true" attribute on any managed tag.
    // Fallback: title changed from the index.html default (proves helmet fired
    // even if the attribute is absent in some edge case).
    await page.waitForFunction(
      () =>
        document.querySelectorAll('[data-rh="true"]').length > 0 ||
        document.title !== "Precision Industrial Blades | Sureay",
      { timeout: TIMEOUT_MS }
    );

    // Wait until h1 is in the DOM — ensures lazy-loaded page components have
    // fully rendered before we capture the HTML (guards against SEO audits
    // that report "missing H1" when the snapshot was taken too early).
    await page.waitForSelector("h1", { timeout: TIMEOUT_MS });

    const html = await page.evaluate(() => document.documentElement.outerHTML);
    persistHtml(route, html);

    // CI gate: a valid prerendered page must be at least 20 KB.
    // Anything smaller is the raw Vite SPA shell — fail the build immediately.
    const segments = route === "/" ? [] : route.replace(/^\//, "").split("/");
    const outFile = path.join(DIST_DIR, ...segments, "index.html");
    const bytes = fs.statSync(outFile).size;
    if (bytes < 20_000) {
      console.error(
        `  ✗  ${route}  (output only ${bytes} bytes — prerender likely failed)`
      );
      process.exit(1);
    }

    console.log(`  ✓  ${route}`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  ✗  ${route}  (${msg})`);
    // Dump head + root contents + URL so we can see exactly what state the
    // page reached when it failed (not just the unchanged head template).
    try {
      const diag = await page.evaluate(() => {
        const root = document.getElementById("root");
        return {
          currentUrl: location.href,
          title: document.title,
          rhMetaCount: document.querySelectorAll('[data-rh="true"]').length,
          rootChildren: root?.children.length ?? -1,
          rootInner: (root?.innerHTML ?? "(no #root)").slice(0, 2000),
        };
      });
      console.error(
        `  ── failure diag ──\n` +
          `  url: ${diag.currentUrl}\n` +
          `  title: ${diag.title}\n` +
          `  data-rh tags in DOM: ${diag.rhMetaCount}\n` +
          `  #root children: ${diag.rootChildren}\n` +
          `  #root innerHTML (first 2KB):\n${diag.rootInner}\n` +
          `  ── end diag ──`
      );
    } catch {
      // page may already be closed/crashed — ignore
    }
    FAILED_ROUTES.push(route);
  } finally {
    await page.close();
  }
}

// ── Bounded concurrency pool ───────────────────────────────────────────────────

async function renderAll(browser: Browser, routes: string[]): Promise<void> {
  const queue = [...routes];

  async function worker(): Promise<void> {
    let route: string | undefined;
    while ((route = queue.shift()) !== undefined) {
      await renderRoute(browser, route);
    }
  }

  // Run CONCURRENCY workers; each drains from the shared queue
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, routes.length) }, worker)
  );
}

// ── Entry point ────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log(
    `\n[prerender] ${ROUTES.length} routes  concurrency=${CONCURRENCY}\n`
  );

  if (!fs.existsSync(DIST_DIR)) {
    console.error(
      `[prerender] ERROR: ${DIST_DIR} not found — run 'vite build' first`
    );
    process.exit(1);
  }

  const server = await startStaticServer();
  const browser = await puppeteer.launch({
    // 'shell' uses legacy headless mode — lighter weight, better compatibility
    // with Docker-in-Docker (DinD) environments where kernel capabilities are
    // restricted. The new headless mode (headless: true) requires more system
    // resources that may not be available in Coolify/DinD build contexts.
    headless: "shell",
    // pipe:true uses IPC pipe instead of WebSocket for CDP — avoids ECONNRESET
    // crashes that occur in Docker build layers where the kernel restricts
    // unprivileged WebSocket connections to spawned child processes.
    pipe: true,
    args: [
      "--no-sandbox", // required inside Docker / rootless
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage", // use disk instead of /dev/shm
      "--disable-gpu",
      "--disable-software-rasterizer", // no software GL rasterization
      "--disable-extensions",
      "--disable-background-networking",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
      "--disable-hang-monitor",
      "--disable-ipc-flooding-protection",
      "--disable-popup-blocking",
      "--disable-prompt-on-repost",
      "--disable-breakpad",
      "--disable-sync",
      "--disable-translate",
      "--metrics-recording-only",
      "--no-first-run",
      "--no-default-browser-check",
      "--mute-audio",
      "--hide-scrollbars",
    ],
  });

  try {
    await renderAll(browser, ROUTES);
  } finally {
    await browser.close();
    await new Promise<void>(resolve => server.close(() => resolve()));
  }

  if (FAILED_ROUTES.length > 0) {
    console.error(
      `\n[prerender] FAILED — ${FAILED_ROUTES.length} route(s) did not prerender:`
    );
    for (const r of FAILED_ROUTES) console.error(`  - ${r}`);
    console.error("\n[prerender] build aborted — see DOM snapshots above for cause\n");
    process.exit(1);
  }

  console.log("\n[prerender] done\n");
}

main().catch(err => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
