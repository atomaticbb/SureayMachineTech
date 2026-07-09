/**
 * scripts/indexnow-ping.ts
 *
 * Manually notify Bing/Yandex (via the shared IndexNow protocol) that URLs
 * have changed. NOT run automatically by `pnpm build` — IndexNow verifies
 * key ownership by fetching the key file from the live domain at ping time,
 * so this must only be run after a deploy is actually live, not during it.
 *
 * Usage:
 *   pnpm indexnow-ping                                  # submit every URL in sitemap.xml
 *   pnpm indexnow-ping -- --url https://sureay.com/news/some-article
 *   pnpm indexnow-ping -- --url https://sureay.com/a --url https://sureay.com/b
 *   pnpm indexnow-ping -- --dry-run                      # print the payload, no network call
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP_PATH = path.resolve(__dirname, "../client/public/sitemap.xml");
const HOST = "sureay.com";
const KEY = "19c713ca439f92d70ffe1c0913df46f2";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

function parseArgs(): { urls: string[]; dryRun: boolean } {
  const args = process.argv.slice(2);
  const urls: string[] = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--url" && args[i + 1]) {
      urls.push(args[i + 1]);
      i++;
    }
  }
  return { urls, dryRun: args.includes("--dry-run") };
}

function urlsFromSitemap(): string[] {
  const xml = fs.readFileSync(SITEMAP_PATH, "utf-8");
  const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
  return Array.from(matches, m => m[1]);
}

async function main() {
  const { urls: explicitUrls, dryRun } = parseArgs();
  const urlList = explicitUrls.length > 0 ? explicitUrls : urlsFromSitemap();

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  console.log(`[indexnow-ping] ${urlList.length} URL(s) to submit`);
  if (urlList.length <= 10) {
    urlList.forEach(u => console.log(`  - ${u}`));
  }

  if (dryRun) {
    console.log("[indexnow-ping] --dry-run, not sending. Payload:");
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  console.log(`[indexnow-ping] response: ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const body = await res.text();
    console.error(body);
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error("[indexnow-ping] failed:", err);
  process.exitCode = 1;
});
