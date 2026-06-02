/**
 * scripts/translate-ui.ts
 *
 * Translate client/src/locales/en.json into es / fr / ru / vi.
 *
 * Output preserves keys 1:1, replaces values. `{{placeholder}}` tokens are
 * left untranslated by DeepL/MyMemory automatically (both providers treat
 * mustache-style braces as opaque).
 *
 * Usage:
 *   pnpm translate-ui                      # all 4 langs
 *   pnpm translate-ui -- --lang es         # subset
 *   pnpm translate-ui -- --force           # overwrite existing
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  preprocessGlossary,
  postprocessGlossary,
  DeepLProvider,
  MyMemoryProvider,
  GoogleTranslateUnofficialProvider,
  type LangCode,
  type TranslationProvider,
} from "./translate-lib.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LOCALES_DIR = path.resolve(ROOT, "client/src/locales");
const ALL_LANGS: LangCode[] = ["es", "fr", "ru", "vi", "ar"];

type ProviderChoice = "auto" | "deepl" | "google" | "mymemory";

function parseFlags() {
  const args = process.argv.slice(2);
  const langArg = args.find((_, i) => args[i - 1] === "--lang");
  const provArg = args.find((_, i) => args[i - 1] === "--provider");
  const langs = (langArg?.split(",") as LangCode[]) ?? ALL_LANGS;
  for (const l of langs) {
    if (!ALL_LANGS.includes(l)) throw new Error(`Unknown lang: ${l}`);
  }
  const provider = (provArg as ProviderChoice) ?? "auto";
  if (!["auto", "deepl", "google", "mymemory"].includes(provider)) {
    throw new Error(`Unknown provider: ${provider}`);
  }
  return {
    langs,
    force: args.includes("--force"),
    incremental: args.includes("--incremental"),
    provider,
  };
}

async function translateOne(
  provider: TranslationProvider,
  source: string,
  lang: LangCode
): Promise<string> {
  const { processed, placeholders } = preprocessGlossary(source, lang);
  const [translated] = await provider.translateBatch([processed], lang);
  return postprocessGlossary(translated, placeholders);
}

async function translateDict(
  source: Record<string, string>,
  lang: LangCode,
  provider: TranslationProvider
): Promise<Record<string, string>> {
  const entries = Object.entries(source);
  const keys = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

  // Apply glossary preprocessing to every value.
  const prepped = values.map(v => preprocessGlossary(v, lang));
  const sources = prepped.map(p => p.processed);

  // DeepL batches 50 at a time; MyMemory is per-string.
  const batchSize = provider.name === "deepl" ? 50 : 1;
  const translated: string[] = [];

  for (let i = 0; i < sources.length; i += batchSize) {
    const batch = sources.slice(i, i + batchSize);
    const out = await provider.translateBatch(batch, lang);
    translated.push(...out);
    process.stdout.write(
      `\r    [${provider.name}] ${translated.length}/${sources.length}     `
    );
  }
  process.stdout.write("\n");

  // Restore glossary placeholders.
  const final = translated.map((t, i) =>
    postprocessGlossary(t, prepped[i].placeholders)
  );

  const out: Record<string, string> = {};
  keys.forEach((k, i) => {
    out[k] = final[i];
  });
  return out;
}

async function main() {
  const flags = parseFlags();
  const enPath = path.join(LOCALES_DIR, "en.json");
  const en = JSON.parse(fs.readFileSync(enPath, "utf-8")) as Record<string, string>;
  console.log(`[translate-ui] en.json: ${Object.keys(en).length} keys`);

  const totalChars = Object.values(en).reduce((s, v) => s + v.length, 0);
  console.log(`[translate-ui] ${totalChars} chars per lang × ${flags.langs.length} langs`);

  const deepl = new DeepLProvider(process.env.DEEPL_API_KEY ?? "missing");
  const myMem = new MyMemoryProvider(process.env.MYMEMORY_EMAIL);
  const google = new GoogleTranslateUnofficialProvider();

  function pickProvider(lang: LangCode): TranslationProvider {
    if (flags.provider === "deepl") return deepl;
    if (flags.provider === "google") return google;
    if (flags.provider === "mymemory") return myMem;
    // auto: DeepL for ES/FR/RU (no VI/AR support); Google for VI + AR
    // (no key, no per-hour rate limit, better quality than MyMemory).
    return lang === "vi" || lang === "ar" ? google : deepl;
  }

  for (const lang of flags.langs) {
    const outPath = path.join(LOCALES_DIR, `${lang}.json`);
    const existing = fs.existsSync(outPath)
      ? (JSON.parse(fs.readFileSync(outPath, "utf-8")) as Record<string, string>)
      : {};

    // --incremental: only translate keys present in en but missing from existing.
    // Existing translations are preserved. This is the cheap way to add new
    // keys without re-spending budget on the whole dictionary.
    if (flags.incremental) {
      const missing: Record<string, string> = {};
      for (const [k, v] of Object.entries(en)) {
        if (!(k in existing)) missing[k] = v;
      }
      const missingCount = Object.keys(missing).length;
      if (missingCount === 0) {
        console.log(`  ⏭  ${lang}.json — no missing keys`);
        continue;
      }
      const provider = pickProvider(lang);
      console.log(`[${lang}] incremental: ${missingCount} missing keys via ${provider.name}`);
      const t0 = Date.now();
      const newOnly = await translateDict(missing, lang, provider);
      console.log(`    done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
      // Merge: existing wins for overlapping keys (which shouldn't exist here).
      const merged = { ...newOnly, ...existing };
      fs.writeFileSync(outPath, JSON.stringify(merged, null, 2) + "\n", "utf-8");
      console.log(`  ✓ wrote ${path.relative(ROOT, outPath)}`);
      continue;
    }

    // Full-overwrite path — skip when populated unless --force.
    if (!flags.force && Object.keys(existing).length > 0) {
      console.log(`  ⏭  ${lang}.json already populated (${Object.keys(existing).length} keys, use --force or --incremental)`);
      continue;
    }

    const provider = pickProvider(lang);
    console.log(`[${lang}] via ${provider.name}`);
    const t0 = Date.now();
    const translated = await translateDict(en, lang, provider);
    console.log(`    done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

    fs.writeFileSync(outPath, JSON.stringify(translated, null, 2) + "\n", "utf-8");
    console.log(`  ✓ wrote ${path.relative(ROOT, outPath)}`);
  }

  console.log("[translate-ui] done");
}

main().catch(err => {
  console.error("[translate-ui] fatal:", err);
  process.exit(1);
});
