/**
 * scripts/gen-mixer-locale.ts
 *
 * Generates client/src/data/locales/mixer-parts.<lang>.ts and
 * mixer-content.<lang>.ts from the English sources, swapping only the
 * translatable strings for entries in scripts/mixer-i18n/<lang>.json.
 *
 * The English object is cloned structurally, so ids, links, image paths,
 * category/sector enums, relatedIds, OEM brand names and price ranges can
 * never drift between locales — only the prose changes. Strings missing
 * from a dictionary fall through to English and are reported.
 *
 * There is no working machine-translation channel in this repo (no
 * DEEPL_API_KEY, and the free Google endpoint is unreachable), so the
 * dictionaries are hand-written. Keyed by English source string rather than
 * by object path, so reordering or re-wording the source never silently
 * mismatches a translation.
 *
 * Usage:
 *   pnpm tsx scripts/gen-mixer-locale.ts --extract        # dump source strings
 *   pnpm tsx scripts/gen-mixer-locale.ts                  # all langs
 *   pnpm tsx scripts/gen-mixer-locale.ts --lang es,fr     # subset
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  mixerParts,
  mixerCategories,
  mixerCompanyFaq,
} from "../client/src/data/mixerParts.ts";
import { MIXER_CONTENT } from "../client/src/data/mixerContent.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DICT_DIR = path.resolve(ROOT, "scripts/mixer-i18n");
const OUT_DIR = path.resolve(ROOT, "client/src/data/locales");

const ALL_LANGS = ["es", "fr", "ru", "vi", "ar"] as const;
type LangCode = (typeof ALL_LANGS)[number];

// ── What never gets translated ──────────────────────────────────────────────
// Slugs, URLs, image paths, enum values, OEM brand names and numeric data.
// Keeping these identical across locales is what makes routing, related-part
// lookups and the sitemap work without knowing the active language.
const SKIP_KEYS = new Set([
  "id",
  "image",
  "gallery",
  "link",
  "src",
  "articleLink",
  "category",
  "sector",
  "badgeColor",
  "compatibleMachines",
  "relatedIds",
  "isFeatured",
  "offers",
]);

// Exact paths that must stay English even though their key is translatable
// elsewhere (`name` is a translated field on mixerCategories).
const SKIP_PATHS = new Set(["contentReviewer.name"]);

/** A string worth sending to a translator: has letters, isn't a bare code. */
function isTranslatable(value: string): boolean {
  return /\p{L}{2,}/u.test(value);
}

type Dict = Record<string, string>;

interface WalkResult {
  /** Unique English strings, in first-seen order. */
  sources: string[];
  /** English strings that had no dictionary entry. */
  missing: string[];
}

/**
 * Deep-clone `node`, replacing each translatable string with dict[value].
 * Pass an empty dict to collect the source strings without translating.
 */
function localize(
  node: unknown,
  dict: Dict,
  result: WalkResult,
  pathParts: string[] = []
): unknown {
  if (typeof node === "string") {
    if (!isTranslatable(node)) return node;
    if (!result.sources.includes(node)) result.sources.push(node);
    const hit = dict[node];
    if (hit === undefined || hit === "") {
      if (!result.missing.includes(node)) result.missing.push(node);
      return node;
    }
    return hit;
  }

  if (Array.isArray(node)) {
    return node.map(item => localize(item, dict, result, pathParts));
  }

  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      const nextPath = [...pathParts, key];
      if (SKIP_KEYS.has(key) || SKIP_PATHS.has(nextPath.join("."))) {
        out[key] = value;
        continue;
      }
      out[key] = localize(value, dict, result, nextPath);
    }
    return out;
  }

  return node;
}

function header(source: string, lang: string): string {
  return [
    "// AUTO-GENERATED — do not edit by hand.",
    `// Source:    ${source}`,
    `// Target:    ${lang}`,
    `// Generated: ${new Date().toISOString()}`,
    "// Provider:  manual (scripts/gen-mixer-locale.ts)",
    "",
  ].join("\n");
}

function loadDict(lang: LangCode): Dict {
  const file = path.join(DICT_DIR, `${lang}.json`);
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf-8")) as Dict;
}

function generate(lang: LangCode): void {
  const dict = loadDict(lang);
  const result: WalkResult = { sources: [], missing: [] };

  const parts = localize(mixerParts, dict, result, []);
  const categories = localize(mixerCategories, dict, result, []);
  const companyFaq = localize(mixerCompanyFaq, dict, result, []);
  const content = localize(MIXER_CONTENT, dict, result, []);

  const partsFile = [
    header("mixerParts.ts", lang),
    'import type {\n  MixerPart,\n  MixerCategory,\n  MixerFaq,\n} from "../mixerParts";',
    "",
    `export const mixerParts: MixerPart[] = ${JSON.stringify(parts, null, 2)};`,
    "",
    `export const mixerCategories: MixerCategory[] = ${JSON.stringify(categories, null, 2)};`,
    "",
    `export const mixerCompanyFaq: MixerFaq[] = ${JSON.stringify(companyFaq, null, 2)};`,
    "",
  ].join("\n");

  const contentFile = [
    header("mixerContent.ts", lang),
    'import type { MixerContent } from "../mixerContent";',
    "",
    `export const MIXER_CONTENT: MixerContent = ${JSON.stringify(content, null, 2)};`,
    "",
  ].join("\n");

  fs.writeFileSync(
    path.join(OUT_DIR, `mixer-parts.${lang}.ts`),
    partsFile,
    "utf-8"
  );
  fs.writeFileSync(
    path.join(OUT_DIR, `mixer-content.${lang}.ts`),
    contentFile,
    "utf-8"
  );

  const done = result.sources.length - result.missing.length;
  const pct = Math.round((done / result.sources.length) * 100);
  console.log(
    `  ${lang}: ${done}/${result.sources.length} translated (${pct}%)` +
      (result.missing.length
        ? ` — ${result.missing.length} falling back to English`
        : "")
  );
  if (result.missing.length) {
    fs.writeFileSync(
      path.join(DICT_DIR, `_missing.${lang}.json`),
      JSON.stringify(
        Object.fromEntries(result.missing.map(s => [s, ""])),
        null,
        2
      ),
      "utf-8"
    );
  } else {
    const stale = path.join(DICT_DIR, `_missing.${lang}.json`);
    if (fs.existsSync(stale)) fs.rmSync(stale);
  }
}

function extract(): void {
  const result: WalkResult = { sources: [], missing: [] };
  localize(mixerParts, {}, result, []);
  localize(mixerCategories, {}, result, []);
  localize(mixerCompanyFaq, {}, result, []);
  localize(MIXER_CONTENT, {}, result, []);
  fs.mkdirSync(DICT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DICT_DIR, "_source.json"),
    JSON.stringify(
      Object.fromEntries(result.sources.map(s => [s, ""])),
      null,
      2
    ),
    "utf-8"
  );
  const chars = result.sources.reduce((sum, s) => sum + s.length, 0);
  console.log(
    `[gen-mixer-locale] ${result.sources.length} unique strings, ${chars} chars → scripts/mixer-i18n/_source.json`
  );
}

function main(): void {
  const args = process.argv.slice(2);
  if (args.includes("--extract")) {
    extract();
    return;
  }
  const flag = args.indexOf("--lang");
  const langs =
    flag >= 0 && args[flag + 1]
      ? (args[flag + 1].split(",") as LangCode[])
      : [...ALL_LANGS];
  for (const lang of langs) {
    if (!ALL_LANGS.includes(lang)) {
      throw new Error(`Unknown lang: ${lang}. Allowed: ${ALL_LANGS.join(",")}`);
    }
  }
  fs.mkdirSync(DICT_DIR, { recursive: true });
  console.log(`[gen-mixer-locale] langs=${langs.join(",")}`);
  for (const lang of langs) generate(lang);
}

main();
