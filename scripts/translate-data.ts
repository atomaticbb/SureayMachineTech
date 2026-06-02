/**
 * scripts/translate-data.ts
 *
 * Translate source data files (blades / blade-categories / news / seo-config)
 * into client/src/data/locales/{file}.{lang}.ts for each target language.
 *
 * Excluded by design:
 *   - homeData.ts — imports lucide-react icons, not JSON-serializable.
 *     Home content will be translated via en.json + t() in W3.
 *
 * Usage:
 *   pnpm translate-data                          # all files × all langs
 *   pnpm translate-data -- --lang es,fr          # subset of langs
 *   pnpm translate-data -- --file blades,news    # subset of files
 *   pnpm translate-data -- --dry-run             # extract & report, no API
 *   pnpm translate-data -- --force               # overwrite existing outputs
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

import {
  extractTranslatableFields,
  applyTranslations,
  preprocessGlossary,
  postprocessGlossary,
  DeepLProvider,
  MyMemoryProvider,
  GoogleTranslateUnofficialProvider,
  type LangCode,
  type TranslationProvider,
  type TranslatableField,
} from "./translate-lib.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.resolve(ROOT, "client/src/data/locales");
// JSONL checkpoint files survive crashes — re-running picks up where it left
// off. Deleted automatically after the final .ts file is written.
const CACHE_DIR = path.resolve(ROOT, "scripts/.translation-cache");

// ── Target manifest ─────────────────────────────────────────────────────────

interface ExportSpec {
  /** Variable name as exported from the source. */
  name: string;
  /** Type annotation written to the output (e.g. "Blade[]"). */
  typeName: string;
  /** Type import line for the output file. */
  typeImport: string; // e.g. `import type { Blade } from "../blades";`
}

type ProviderName = "deepl" | "google" | "mymemory";

interface Target {
  /** Slug used in the output filename and CLI --file flag. */
  key: string;
  /** Absolute path to the source module. */
  sourcePath: string;
  exports: ExportSpec[];
  /**
   * Default provider for ES/FR/RU. VI always uses MyMemory regardless
   * (DeepL Free does not support Vietnamese).
   */
  defaultProvider: ProviderName;
  /**
   * Path segments that override defaultProvider → MyMemory. Used to keep
   * DeepL Free quota under the 500K/month ceiling by routing long-form
   * content (FAQs, news bodies, audit-log items) to MyMemory.
   */
  mymemoryPathSegments?: string[];
}

const TARGETS: Target[] = [
  {
    key: "blades",
    sourcePath: path.resolve(ROOT, "client/src/data/blades.ts"),
    exports: [
      {
        name: "blades",
        typeName: "Blade[]",
        typeImport: 'import type { Blade } from "../blades";',
      },
    ],
    defaultProvider: "deepl",
    // FAQs and components are skipped at the extractor level (see
    // NON_TRANSLATABLE_KEYS) — too bulky for MyMemory's per-hour rate cap.
    // Stays English at launch; back-fill via paid provider or manual later.
  },
  {
    key: "blade-categories",
    sourcePath: path.resolve(ROOT, "client/src/data/blade-categories.ts"),
    exports: [
      {
        name: "BLADE_CATEGORIES",
        typeName: "BladeCategoryMeta[]",
        typeImport:
          'import type { BladeCategoryMeta } from "../blade-categories";',
      },
    ],
    defaultProvider: "deepl",
  },
  // news.ts is intentionally not translated for launch — articles are
  // long-form blog content; SEO impact concentrates in product / category
  // pages. News stays English; revisit when a paid translation channel is
  // available.
  {
    key: "seo-config",
    sourcePath: path.resolve(ROOT, "client/src/utils/seo-config.ts"),
    exports: [
      {
        name: "SEO_CONFIG",
        typeName: "Record<string, PageSEO>",
        typeImport: 'import type { PageSEO } from "../../utils/seo-config";',
      },
    ],
    defaultProvider: "deepl",
  },
];

function routeField(
  field: TranslatableField,
  lang: LangCode,
  target: Target
): ProviderName {
  // DeepL has no Vietnamese support and MyMemory is too rate-limited for
  // batch work — Google's public translate endpoint covers VI cleanly.
  // Arabic also routes through Google (DeepL Free does not support AR).
  if (lang === "vi" || lang === "ar") return "google";
  if (target.defaultProvider === "mymemory") return "mymemory";
  if (
    target.mymemoryPathSegments?.some(seg => field.path.includes(seg))
  ) {
    return "mymemory";
  }
  return "deepl";
}

const ALL_LANGS: LangCode[] = ["es", "fr", "ru", "vi", "ar"];

// ── CLI parsing ─────────────────────────────────────────────────────────────

interface Flags {
  langs: LangCode[];
  fileKeys: string[];
  dryRun: boolean;
  force: boolean;
}

function parseFlags(): Flags {
  const args = process.argv.slice(2);
  const get = (flag: string): string | undefined => {
    const i = args.indexOf(flag);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : undefined;
  };

  const langs = (get("--lang")?.split(",") as LangCode[]) ?? ALL_LANGS;
  for (const l of langs) {
    if (!ALL_LANGS.includes(l)) {
      throw new Error(`Unknown lang: ${l}. Allowed: ${ALL_LANGS.join(",")}`);
    }
  }
  const fileKeys =
    get("--file")?.split(",") ?? TARGETS.map(t => t.key);
  for (const k of fileKeys) {
    if (!TARGETS.find(t => t.key === k)) {
      throw new Error(
        `Unknown file: ${k}. Allowed: ${TARGETS.map(t => t.key).join(",")}`
      );
    }
  }
  return {
    langs,
    fileKeys,
    dryRun: args.includes("--dry-run"),
    force: args.includes("--force"),
  };
}

// ── Output serialization ────────────────────────────────────────────────────

function serializeOutput(
  target: Target,
  values: Record<string, unknown>,
  lang: LangCode,
  provider: string
): string {
  const header = [
    "// AUTO-GENERATED — do not edit by hand.",
    `// Source:    ${path.basename(target.sourcePath)}`,
    `// Target:    ${lang}`,
    `// Generated: ${new Date().toISOString()}`,
    `// Provider:  ${provider}`,
    "",
  ].join("\n");

  const imports = target.exports.map(e => e.typeImport).join("\n");

  const body = target.exports
    .map(e => {
      const json = JSON.stringify(values[e.name], null, 2);
      return `export const ${e.name}: ${e.typeName} = ${json};\n`;
    })
    .join("\n");

  return `${header}${imports}\n\n${body}`;
}

// ── Bucket translation helper (resumable via JSONL checkpoint) ──────────────

/**
 * Translate a bucket of fields with a per-batch JSONL checkpoint at
 * cachePath. If cachePath already exists (previous partial run), resume
 * from the last completed item. Caller is responsible for deleting the
 * cache file after the final TS output is committed to disk.
 */
async function runBucketResumable(
  label: ProviderName,
  provider: TranslationProvider,
  fields: TranslatableField[],
  lang: LangCode,
  cachePath: string
): Promise<string[]> {
  // Apply glossary preprocessing (English → placeholders that survive both
  // DeepL and MyMemory unchanged).
  const prepped = fields.map(f => preprocessGlossary(f.value, lang));
  const sources = prepped.map(p => p.processed);

  // Resume from previous run, if any.
  let translated: string[] = [];
  if (fs.existsSync(cachePath)) {
    const lines = fs
      .readFileSync(cachePath, "utf-8")
      .split("\n")
      .filter(Boolean);
    translated = lines.map(l => JSON.parse(l) as string);
    if (translated.length > sources.length) {
      // Source shrank since last run — invalidate cache rather than guess.
      console.log(
        `    [${label}] cache stale (had ${translated.length}, need ${sources.length}) — restarting`
      );
      fs.rmSync(cachePath);
      translated = [];
    } else if (translated.length > 0) {
      console.log(
        `    [${label}] resuming from cache: ${translated.length}/${sources.length} already done`
      );
    }
  }

  if (translated.length === sources.length) {
    return translated.map((t, i) =>
      postprocessGlossary(t, prepped[i].placeholders)
    );
  }

  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  const stream = fs.createWriteStream(cachePath, { flags: "a" });
  const batchSize = provider.name === "deepl" ? 50 : 1;
  const t0 = Date.now();

  try {
    for (let i = translated.length; i < sources.length; i += batchSize) {
      const batch = sources.slice(i, i + batchSize);
      const out = await provider.translateBatch(batch, lang);
      for (const t of out) {
        stream.write(JSON.stringify(t) + "\n");
        translated.push(t);
      }
      if (
        translated.length === sources.length ||
        translated.length % 50 === 0 ||
        translated.length - i >= batchSize
      ) {
        const pct = Math.round((translated.length / sources.length) * 100);
        process.stdout.write(
          `\r    [${label}] ${translated.length}/${sources.length} (${pct}%)         `
        );
      }
    }
  } finally {
    stream.end();
    await new Promise<void>(resolve => stream.on("close", () => resolve()));
  }

  process.stdout.write(
    `\r    [${label}] ${translated.length}/${sources.length} done in ${((Date.now() - t0) / 1000).toFixed(1)}s         \n`
  );

  return translated.map((t, i) =>
    postprocessGlossary(t, prepped[i].placeholders)
  );
}

// ── Per-target translation ──────────────────────────────────────────────────

async function translateTarget(
  target: Target,
  lang: LangCode,
  flags: Flags,
  providers: Record<ProviderName, TranslationProvider>
): Promise<void> {
  const outputFile = path.join(OUTPUT_DIR, `${target.key}.${lang}.ts`);

  if (!flags.force && !flags.dryRun && fs.existsSync(outputFile)) {
    console.log(`  ⏭  ${target.key}.${lang}.ts already exists (use --force)`);
    return;
  }

  const sourceMod = (await import(pathToFileURL(target.sourcePath).href)) as Record<
    string,
    unknown
  >;

  const translatedValues: Record<string, unknown> = {};
  const usedProviders = new Set<ProviderName>();

  for (const exportDef of target.exports) {
    const value = sourceMod[exportDef.name];
    if (value === undefined) {
      throw new Error(`Export "${exportDef.name}" not found in ${target.sourcePath}`);
    }

    const fields = extractTranslatableFields(value);

    // Bucket fields by routed provider; remember each field's original
    // index so the merged output preserves the source order.
    const routes = fields.map(f => routeField(f, lang, target));
    const ALL_PROVIDERS: ProviderName[] = ["deepl", "google", "mymemory"];
    const buckets: Record<ProviderName, { fields: TranslatableField[]; idx: number[] }> = {
      deepl: { fields: [], idx: [] },
      google: { fields: [], idx: [] },
      mymemory: { fields: [], idx: [] },
    };
    fields.forEach((f, i) => {
      buckets[routes[i]].fields.push(f);
      buckets[routes[i]].idx.push(i);
    });

    const summary = ALL_PROVIDERS.map(p => {
      const chars = buckets[p].fields.reduce((s, f) => s + f.value.length, 0);
      return `${p} ${buckets[p].fields.length} (${chars}ch)`;
    }).join(" · ");
    console.log(
      `  · ${exportDef.name}: ${fields.length} fields  →  ${summary}`
    );

    if (flags.dryRun) {
      translatedValues[exportDef.name] = value;
      continue;
    }

    // Run each non-empty bucket through its provider with JSONL checkpoint.
    const results = new Array<string>(fields.length);
    for (const providerName of ALL_PROVIDERS) {
      const bucket = buckets[providerName];
      if (bucket.fields.length === 0) continue;
      const cachePath = path.join(
        CACHE_DIR,
        `${target.key}.${exportDef.name}.${lang}.${providerName}.jsonl`
      );
      const out = await runBucketResumable(
        providerName,
        providers[providerName],
        bucket.fields,
        lang,
        cachePath
      );
      bucket.idx.forEach((origIdx, j) => {
        results[origIdx] = out[j];
      });
      usedProviders.add(providerName);
    }

    translatedValues[exportDef.name] = applyTranslations(value, fields, results);
  }

  if (flags.dryRun) return;

  const providerLabel = Array.from(usedProviders).sort().join("+") || "deepl";
  const content = serializeOutput(target, translatedValues, lang, providerLabel);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputFile, content, "utf-8");
  console.log(`  ✓ wrote ${path.relative(ROOT, outputFile)}`);

  // Translation succeeded end-to-end — clear the checkpoint files for this
  // (target, lang) pair so a future re-run with --force starts fresh.
  for (const exportDef of target.exports) {
    for (const p of ["deepl", "google", "mymemory"] as ProviderName[]) {
      const cachePath = path.join(
        CACHE_DIR,
        `${target.key}.${exportDef.name}.${lang}.${p}.jsonl`
      );
      if (fs.existsSync(cachePath)) fs.rmSync(cachePath);
    }
  }

  // Post-write verification: re-import and check field count matches.
  // Use a cache-buster so node re-evaluates the freshly written file.
  const verifyMod = (await import(
    `${pathToFileURL(outputFile).href}?ts=${Date.now()}`
  )) as Record<string, unknown>;
  for (const exportDef of target.exports) {
    const verifyFields = extractTranslatableFields(verifyMod[exportDef.name]);
    const originalFields = extractTranslatableFields(
      (sourceMod as Record<string, unknown>)[exportDef.name]
    );
    if (verifyFields.length !== originalFields.length) {
      throw new Error(
        `Verify FAIL for ${target.key}.${lang}.ts:${exportDef.name} — ${verifyFields.length} fields in output vs ${originalFields.length} in source`
      );
    }
  }
  console.log(`    verified shape matches source`);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const flags = parseFlags();
  console.log(
    `[translate-data] langs=${flags.langs.join(",")} files=${flags.fileKeys.join(",")} dryRun=${flags.dryRun} force=${flags.force}\n`
  );

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Build providers once. DeepL key is only required if any non-VI lang is
  // requested; MyMemory always available (VI + bucket overrides).
  const needsDeepL = flags.langs.some(l => l !== "vi");
  if (needsDeepL && !flags.dryRun && !process.env.DEEPL_API_KEY) {
    throw new Error("DEEPL_API_KEY missing in environment");
  }
  const providers: Record<ProviderName, TranslationProvider> = {
    deepl: new DeepLProvider(process.env.DEEPL_API_KEY ?? "missing-key"),
    google: new GoogleTranslateUnofficialProvider(),
    mymemory: new MyMemoryProvider(process.env.MYMEMORY_EMAIL),
  };
  if (process.env.MYMEMORY_EMAIL) {
    console.log(`[translate-data] MyMemory email registered (50K words/day)\n`);
  } else {
    console.log(
      `[translate-data] WARNING — MYMEMORY_EMAIL not set; MyMemory limit is 1000 words/day per IP\n`
    );
  }

  for (const lang of flags.langs) {
    console.log(`── ${lang.toUpperCase()} ──`);
    for (const target of TARGETS) {
      if (!flags.fileKeys.includes(target.key)) continue;
      console.log(`[${lang}] ${target.key}`);
      try {
        await translateTarget(target, lang, flags, providers);
      } catch (err) {
        console.error(
          `  ✗ ${target.key}.${lang} — ${err instanceof Error ? err.message : err}`
        );
        process.exit(1);
      }
    }
    console.log();
  }

  console.log("[translate-data] done");
}

main().catch(err => {
  console.error("[translate-data] fatal:", err);
  process.exit(1);
});
