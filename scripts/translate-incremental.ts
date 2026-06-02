/**
 * scripts/translate-incremental.ts
 *
 * Add faqs + components translations to existing per-language blade files.
 * These two arrays were excluded from Task 2.3a–b (MyMemory rate-limit
 * defense). Now that a fresh DeepL key is available, translate them
 * incrementally and merge into the existing locale files — keeping all
 * previously-translated fields intact.
 *
 * Usage:
 *   pnpm translate-incremental                    # all eligible langs, real run
 *   pnpm translate-incremental -- --dry-run       # extract & report cost
 *   pnpm translate-incremental -- --lang es,fr    # subset
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
  NON_TRANSLATABLE_KEYS,
  DeepLProvider,
  MyMemoryProvider,
  GoogleTranslateUnofficialProvider,
  type LangCode,
  type TranslatableField,
  type TranslationProvider,
} from "./translate-lib.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LOCALES_DIR = path.resolve(ROOT, "client/src/data/locales");
const SOURCE_BLADES = path.resolve(ROOT, "client/src/data/blades.ts");

// Keys we want to ADD this run. They're in NON_TRANSLATABLE_KEYS by default
// (the W2/W3 launch budget excluded them); a relaxed skip set is built here.
const INCLUDE_KEYS = ["faqs", "components"] as const;
const RELAXED_SKIP = new Set(NON_TRANSLATABLE_KEYS);
for (const k of INCLUDE_KEYS) RELAXED_SKIP.delete(k);

// Eligible languages — those whose base data file has been written (i.e.
// not a stub). VI + AR use Google Translate; the others use DeepL.
const ALL_INCREMENTAL_LANGS: LangCode[] = ["es", "fr", "ru", "vi", "ar"];

function providerFor(lang: LangCode): TranslationProvider {
  if (lang === "vi" || lang === "ar") return new GoogleTranslateUnofficialProvider();
  const key = process.env.DEEPL_API_KEY;
  if (!key) throw new Error("DEEPL_API_KEY missing for non-VI/AR lang");
  return new DeepLProvider(key);
}

interface Flags {
  langs: LangCode[];
  dryRun: boolean;
}

function parseFlags(): Flags {
  const args = process.argv.slice(2);
  const langArg = args.find((_, i) => args[i - 1] === "--lang");
  const langs = (langArg?.split(",") as LangCode[]) ?? ALL_INCREMENTAL_LANGS;
  for (const l of langs) {
    if (!ALL_INCREMENTAL_LANGS.includes(l)) {
      throw new Error(`Unknown lang: ${l}`);
    }
  }
  return { langs, dryRun: args.includes("--dry-run") };
}

function localePath(lang: LangCode): string {
  return path.join(LOCALES_DIR, `blades.${lang}.ts`);
}

interface CountSummary {
  fields: number;
  chars: number;
}

function countFields(fields: TranslatableField[]): CountSummary {
  return {
    fields: fields.length,
    chars: fields.reduce((s, f) => s + f.value.length, 0),
  };
}

async function main() {
  const flags = parseFlags();

  // Load source (English) blades.
  const sourceMod = (await import(pathToFileURL(SOURCE_BLADES).href)) as {
    blades: unknown[];
  };
  const sourceBlades = sourceMod.blades;

  // Extract with the relaxed skip set, then keep ONLY fields whose path
  // crosses one of the INCLUDE_KEYS — that's what we're adding this round.
  const allFields = extractTranslatableFields(sourceBlades, [], RELAXED_SKIP);
  const newFields = allFields.filter(f =>
    f.path.some(
      seg => typeof seg === "string" && (INCLUDE_KEYS as readonly string[]).includes(seg)
    )
  );

  const summary = countFields(newFields);
  console.log(
    `[incremental] source has ${summary.fields} new fields, ${summary.chars} chars per lang`
  );

  // DeepL Free quota status — informational.
  const deeplKey = process.env.DEEPL_API_KEY;
  if (!deeplKey) throw new Error("DEEPL_API_KEY missing");

  // Print current usage and budget headroom so the operator can stop early.
  try {
    const res = await fetch("https://api-free.deepl.com/v2/usage", {
      headers: { Authorization: `DeepL-Auth-Key ${deeplKey}` },
    });
    const data = (await res.json()) as {
      character_count: number;
      character_limit: number;
    };
    const remaining = data.character_limit - data.character_count;
    const cost = summary.chars * flags.langs.length;
    console.log(
      `[incremental] DeepL: ${data.character_count}/${data.character_limit} used (${remaining} remaining), this run costs ~${cost} chars`
    );
    if (cost > remaining) {
      console.log(
        `[incremental] WARNING: requested cost (${cost}) exceeds DeepL budget (${remaining}). Some langs will hit quota errors.`
      );
    }
  } catch (e) {
    console.log(`[incremental] could not check DeepL quota: ${(e as Error).message}`);
  }

  if (flags.dryRun) {
    console.log("[incremental] dry-run — no API calls");
    return;
  }

  for (const lang of flags.langs) {
    const outPath = localePath(lang);
    if (!fs.existsSync(outPath)) {
      console.error(`[${lang}] ✗ ${outPath} not found — run translate-data first`);
      continue;
    }

    const provider = providerFor(lang);
    console.log(`\n[${lang}] adding ${INCLUDE_KEYS.join(" + ")} via ${provider.name}`);
    const t0 = Date.now();

    // Translate the source-extracted English values for this language.
    const englishTexts = newFields.map(f => f.value);
    const prepped = englishTexts.map(t => preprocessGlossary(t, lang));
    const sources = prepped.map(p => p.processed);

    const translated: string[] = [];
    // Google (per-text) reports more useful progress at small batch sizes.
    const batchSize = provider.name === "deepl" ? 50 : 1;
    for (let i = 0; i < sources.length; i += batchSize) {
      const batch = sources.slice(i, i + batchSize);
      const out = await provider.translateBatch(batch, lang);
      translated.push(...out);
      if (translated.length === sources.length || translated.length % 50 === 0) {
        process.stdout.write(
          `\r  [${provider.name}] ${translated.length}/${sources.length}   `
        );
      }
    }
    process.stdout.write("\n");
    const restored = translated.map((t, i) =>
      postprocessGlossary(t, prepped[i].placeholders)
    );

    // Load the existing locale file with a cache-busting query so a re-run
    // sees the freshly-written output if we're scripting back-to-back.
    const existingMod = (await import(
      `${pathToFileURL(outPath).href}?ts=${Date.now()}`
    )) as { blades: unknown[] };
    const existingBlades = existingMod.blades;

    // Apply translations into the EXISTING translated structure. The field
    // paths from the source extraction are valid against the locale file
    // because the schema is shape-identical.
    const merged = applyTranslations(existingBlades, newFields, restored);

    // Rewrite the TS file. Header is preserved style + bumped provenance.
    const header = [
      "// AUTO-GENERATED — do not edit by hand.",
      "// Source:    blades.ts",
      `// Target:    ${lang}`,
      `// Generated: ${new Date().toISOString()}`,
      "// Provider:  deepl (incremental: faqs + components)",
      "",
      'import type { Blade } from "../blades";',
      "",
    ].join("\n");
    const body = `export const blades: Blade[] = ${JSON.stringify(merged, null, 2)};\n`;
    fs.writeFileSync(outPath, header + body, "utf-8");

    console.log(
      `[${lang}] ✓ ${path.relative(ROOT, outPath)}  (${((Date.now() - t0) / 1000).toFixed(1)}s)`
    );
  }

  console.log("\n[incremental] done");
  void MyMemoryProvider; // imported only to keep types stable for future VI run
}

main().catch(err => {
  console.error("[incremental] fatal:", err);
  process.exit(1);
});
