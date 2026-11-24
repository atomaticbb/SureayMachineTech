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
import { blades as sourceBlades } from "./catalog/translation-source.ts";
import type { Blade } from "../client/src/data/blades.ts";

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

// Keys we want to ADD this run. They're in NON_TRANSLATABLE_KEYS by default
// (the W2/W3 launch budget excluded them); a relaxed skip set is built here.
const INCLUDE_KEYS = ["faqs", "components"] as const;
const RELAXED_SKIP = new Set(NON_TRANSLATABLE_KEYS);
for (const k of INCLUDE_KEYS) RELAXED_SKIP.delete(k);

// Eligible languages — those whose base data file has been written (i.e.
// not a stub). VI + AR were translated through Google when DeepL had no
// support for them; everything else, including pt and tr, goes via DeepL.
const ALL_INCREMENTAL_LANGS: LangCode[] = [
  "es",
  "fr",
  "ru",
  "vi",
  "ar",
  "pt",
  "tr",
];

function providerFor(lang: LangCode): TranslationProvider {
  if (lang === "vi" || lang === "ar")
    return new GoogleTranslateUnofficialProvider();
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

  const sections = sourceBlades.map(({ id, faqs, components }) => ({ id, faqs, components }));
  const newFields = extractTranslatableFields(sections, [], RELAXED_SKIP);

  const summary = countFields(newFields);
  console.log(
    `[incremental] source has ${summary.fields} new fields, ${summary.chars} chars per lang`
  );

  if (flags.dryRun) return;

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
    console.log(
      `[incremental] could not check DeepL quota: ${(e as Error).message}`
    );
  }

  for (const lang of flags.langs) {
    const outPath = localePath(lang);
    if (!fs.existsSync(outPath)) {
      console.error(
        `[${lang}] ✗ ${outPath} not found — run translate-data first`
      );
      continue;
    }

    const existingMod = (await import(pathToFileURL(outPath).href)) as { blades: Blade[] };
    const existingBlades = existingMod.blades;
    const existingIds = new Set(existingBlades.map(blade => blade.id));
    if (existingIds.size !== existingBlades.length || existingIds.size !== sections.length ||
        sections.some(section => !existingIds.has(section.id))) {
      throw new Error(`Update the base ${lang} catalog to the current public product IDs before merging FAQ and component translations.`);
    }
    const provider = providerFor(lang);
    console.log(
      `\n[${lang}] adding ${INCLUDE_KEYS.join(" + ")} via ${provider.name}`
    );
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
      if (out.length !== batch.length || out.some(t => !t?.trim())) {
        throw new Error(`Incomplete ${lang} translation batch beginning at field ${i}.`);
      }
      translated.push(...out);
      if (
        translated.length === sources.length ||
        translated.length % 50 === 0
      ) {
        process.stdout.write(
          `\r  [${provider.name}] ${translated.length}/${sources.length}   `
        );
      }
    }
    process.stdout.write("\n");
    const restored = translated.map((t, i) =>
      postprocessGlossary(t, prepped[i].placeholders)
    );

    const translatedSections = new Map(
      applyTranslations(sections, newFields, restored).map(section => [section.id, section])
    );
    const merged = existingBlades.map(blade => {
      const section = translatedSections.get(blade.id)!;
      return { ...blade, faqs: section.faqs, components: section.components };
    });

    // Rewrite the TS file. Header is preserved style + bumped provenance.
    const header = [
      "// AUTO-GENERATED — do not edit by hand.",
      "// Source:    blades.ts",
      `// Target:    ${lang}`,
      `// Generated: ${new Date().toISOString()}`,
      `// Provider:  ${provider.name} (incremental: faqs + components)`,
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
