/**
 * scripts/gen-blade-locale.ts
 *
 * Generates client/src/data/locales/{blades,blade-categories,seo-config}.<lang>.ts
 * from the English sources, swapping only translatable strings for entries in
 * scripts/blade-i18n/<lang>.json.
 *
 * Same contract as gen-mixer-locale.ts: the English object is cloned
 * structurally, so ids, slugs, links, image paths, OEM brand names, steel
 * grades and dimension tables cannot drift between locales — only prose
 * changes. Strings missing from a dictionary fall through to English and are
 * reported, so a half-finished language is visible rather than silent.
 *
 * Used for languages translated by hand (see PENDING_LANGS in lib/i18n.ts).
 * Languages translated through the DeepL pipeline go via translate-data.ts
 * instead; both write the same output files, so do not run both for one lang.
 *
 * Usage:
 *   pnpm tsx scripts/gen-blade-locale.ts --extract            # dump source strings
 *   pnpm tsx scripts/gen-blade-locale.ts --lang pt            # one language
 *   pnpm tsx scripts/gen-blade-locale.ts --lang pt,tr         # several
 *   pnpm tsx scripts/gen-blade-locale.ts --lang pt --file blades
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { blades } from "../client/src/data/blades.ts";
import { BLADE_CATEGORIES } from "../client/src/data/blade-categories.ts";
import { SEO_CONFIG } from "../client/src/utils/seo-config.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DICT_DIR = path.resolve(ROOT, "scripts/blade-i18n");
const OUT_DIR = path.resolve(ROOT, "client/src/data/locales");

const ALL_LANGS = ["pt", "tr"] as const;
type LangCode = (typeof ALL_LANGS)[number];

/**
 * Never translated. Slugs, URLs, image paths and enum values must stay
 * identical across locales or routing breaks. `specs` and `standardDimensions`
 * follow the existing blade convention: their values are steel grades,
 * hardness codes and millimetre ranges that read the same in any language,
 * and the column headers live in en.json instead.
 */
const SKIP_KEYS = new Set([
  "id",
  "slug",
  "link",
  "href",
  "url",
  "image",
  "images",
  "gallery",
  "icon",
  "logo",
  "email",
  "phone",
  "whatsapp",
  "category",
  "sector",
  "badgeColor",
  "compatibleMachines",
  "relatedBladeIds",
  "isFeatured",
  "offers",
  "catalogUrl",
  "mpn",
  "sku",
  "ctaHref",
  "videoUrl",
  "standardDimensions",
  "specs",
  "ogImage",
  "canonical",
]);

interface Target {
  key: string;
  value: unknown;
  outFile: (lang: string) => string;
  typeImport: string;
  exportName: string;
  typeName: string;
}

const TARGETS: Target[] = [
  {
    key: "blades",
    value: blades,
    outFile: l => `blades.${l}.ts`,
    typeImport: 'import type { Blade } from "../blades";',
    exportName: "blades",
    typeName: "Blade[]",
  },
  {
    key: "blade-categories",
    value: BLADE_CATEGORIES,
    outFile: l => `blade-categories.${l}.ts`,
    typeImport: 'import type { BladeCategoryMeta } from "../blade-categories";',
    exportName: "BLADE_CATEGORIES",
    typeName: "BladeCategoryMeta[]",
  },
  {
    key: "seo-config",
    value: SEO_CONFIG,
    outFile: l => `seo-config.${l}.ts`,
    typeImport: 'import type { PageSEO } from "../../utils/seo-config";',
    exportName: "SEO_CONFIG",
    typeName: "Record<string, PageSEO>",
  },
];

type Dict = Record<string, string>;

interface WalkResult {
  sources: string[];
  missing: string[];
}

/** A string worth translating: contains letters, not a bare code. */
function isTranslatable(value: string): boolean {
  return /\p{L}{2,}/u.test(value);
}

function localize(node: unknown, dict: Dict, result: WalkResult): unknown {
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
  if (Array.isArray(node)) return node.map(i => localize(i, dict, result));
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      out[key] = SKIP_KEYS.has(key) ? value : localize(value, dict, result);
    }
    return out;
  }
  return node;
}

function loadDict(lang: LangCode): Dict {
  const file = path.join(DICT_DIR, `${lang}.json`);
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf-8")) as Dict;
}

function header(source: string, lang: string): string {
  return [
    "// AUTO-GENERATED — do not edit by hand.",
    `// Source:    ${source}`,
    `// Target:    ${lang}`,
    `// Generated: ${new Date().toISOString()}`,
    "// Provider:  manual (scripts/gen-blade-locale.ts)",
    "",
  ].join("\n");
}

function generate(lang: LangCode, only: string[]): void {
  const dict = loadDict(lang);
  const result: WalkResult = { sources: [], missing: [] };

  for (const t of TARGETS) {
    if (!only.includes(t.key)) continue;
    const translated = localize(t.value, dict, result);
    const body = [
      header(`${t.key}.ts`, lang),
      t.typeImport,
      "",
      `export const ${t.exportName}: ${t.typeName} = ${JSON.stringify(translated, null, 2)};`,
      "",
    ].join("\n");
    fs.writeFileSync(path.join(OUT_DIR, t.outFile(lang)), body, "utf-8");
  }

  const done = result.sources.length - result.missing.length;
  const pct = result.sources.length
    ? Math.round((done / result.sources.length) * 100)
    : 100;
  console.log(
    `  ${lang}: ${done}/${result.sources.length} translated (${pct}%)` +
      (result.missing.length
        ? ` — ${result.missing.length} falling back to English`
        : "")
  );
  const missFile = path.join(DICT_DIR, `_missing.${lang}.json`);
  if (result.missing.length) {
    fs.writeFileSync(
      missFile,
      JSON.stringify(
        Object.fromEntries(result.missing.map(s => [s, ""])),
        null,
        2
      ),
      "utf-8"
    );
  } else if (fs.existsSync(missFile)) {
    fs.rmSync(missFile);
  }
}

function extract(): void {
  fs.mkdirSync(DICT_DIR, { recursive: true });
  for (const t of TARGETS) {
    const result: WalkResult = { sources: [], missing: [] };
    localize(t.value, {}, result);
    const chars = result.sources.reduce((s, x) => s + x.length, 0);
    fs.writeFileSync(
      path.join(DICT_DIR, `_source.${t.key}.json`),
      JSON.stringify(
        Object.fromEntries(result.sources.map(s => [s, ""])),
        null,
        2
      ),
      "utf-8"
    );
    console.log(
      `  ${t.key.padEnd(18)} ${String(result.sources.length).padStart(5)} strings  ${String(chars).padStart(7)} chars`
    );
  }
}

function main(): void {
  const args = process.argv.slice(2);
  const flag = (name: string): string | undefined => {
    const i = args.indexOf(name);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : undefined;
  };
  if (args.includes("--extract")) {
    extract();
    return;
  }
  const langs = (flag("--lang")?.split(",") as LangCode[]) ?? [...ALL_LANGS];
  for (const l of langs) {
    if (!ALL_LANGS.includes(l)) {
      throw new Error(`Unknown lang: ${l}. Allowed: ${ALL_LANGS.join(",")}`);
    }
  }
  const only = flag("--file")?.split(",") ?? TARGETS.map(t => t.key);
  for (const k of only) {
    if (!TARGETS.find(t => t.key === k)) {
      throw new Error(
        `Unknown file: ${k}. Allowed: ${TARGETS.map(t => t.key).join(",")}`
      );
    }
  }
  fs.mkdirSync(DICT_DIR, { recursive: true });
  console.log(
    `[gen-blade-locale] langs=${langs.join(",")} files=${only.join(",")}`
  );
  for (const lang of langs) generate(lang, only);
}

main();
