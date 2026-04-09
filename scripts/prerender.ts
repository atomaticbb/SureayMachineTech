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
import { ALL_DISPATCHES } from "../client/src/data/news.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "../dist/public");
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const CONCURRENCY = 3; // parallel Puppeteer pages
const TIMEOUT_MS = 25_000; // per-route navigation + selector timeout

// ── Route manifest ─────────────────────────────────────────────────────────────

const ROUTES: string[] = [
  "/",
  "/products",
  "/about",
  "/contact",
  "/plastic-industry",
  "/metal-industry",
  "/paper-industry",
  "/new-energy-industry",
  "/converting-industry",
  "/news",
  // dynamic product pages — derived from static blade data
  ...blades.map(b => `/products/${b.id}`),
  // dynamic news detail pages — derived from static article data
  ...ALL_DISPATCHES.map(a => `/news/${a.id}`),
];

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
    // Suppress non-critical console noise from the rendered page
    page.on("console", () => {});
    page.on("pageerror", () => {});

    await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "networkidle0",
      timeout: TIMEOUT_MS,
    });

    // Wait until React has mounted at least one child inside #root
    await page.waitForSelector("#root > *", { timeout: TIMEOUT_MS });

    // Wait until react-helmet-async has flushed its tags into <head>
    // (it marks every managed tag with data-rh="true")
    await page.waitForSelector('meta[data-rh="true"]', { timeout: TIMEOUT_MS });

    const html = await page.evaluate(() => document.documentElement.outerHTML);
    persistHtml(route, html);
    console.log(`  ✓  ${route}`);
  } catch (err) {
    // Log and skip — one bad route must never crash the CI pipeline
    console.error(
      `  ✗  ${route}  (${err instanceof Error ? err.message : err})`
    );
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

  console.log("\n[prerender] done\n");
}

main().catch(err => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
