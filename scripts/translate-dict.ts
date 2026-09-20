/**
 * scripts/translate-dict.ts
 *
 * Fills a translation dictionary from DeepL, applying the same glossary the
 * rest of the pipeline uses so product terminology stays consistent.
 *
 * Two shapes, because the repo has two kinds of dictionary:
 *
 *   --mode dict   scripts/<name>-i18n/<lang>.json  — keys ARE the English
 *                 source string (mixer + blade generators read this form).
 *                 Source list comes from the sibling _source*.json files.
 *
 *   --mode ui     client/src/locales/<lang>.json   — keys are identifiers and
 *                 values are the copy. English comes from en.json. Existing
 *                 non-English values are left alone, so hand-written entries
 *                 are never overwritten.
 *
 * Both modes only translate what is still missing, which makes reruns cheap
 * and lets a partially hand-translated file be finished off automatically.
 *
 * Usage:
 *   pnpm tsx scripts/translate-dict.ts --mode ui   --lang pt,tr [--ns industry]
 *   pnpm tsx scripts/translate-dict.ts --mode dict --dir mixer-i18n --lang pt,tr
 *   ... add --dry-run to price it first
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  preprocessGlossary,
  postprocessGlossary,
  DeepLProvider,
  type LangCode,
} from "./translate-lib.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 && i + 1 < process.argv.length
    ? process.argv[i + 1]
    : undefined;
}
const DRY = process.argv.includes("--dry-run");

function readJson(p: string): Record<string, string> {
  return JSON.parse(fs.readFileSync(p, "utf-8")) as Record<string, string>;
}

function writeJson(p: string, obj: Record<string, string>): void {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf-8");
}

/** English strings still needing a translation, plus a writer for the result. */
interface Job {
  label: string;
  pending: string[];
  apply: (translated: Map<string, string>) => void;
}

function uiJob(lang: LangCode, ns: string | undefined): Job {
  const locDir = path.resolve(ROOT, "client/src/locales");
  const en = readJson(path.join(locDir, "en.json"));
  const outPath = path.join(locDir, `${lang}.json`);
  const cur = fs.existsSync(outPath) ? readJson(outPath) : {};
  const keys = Object.keys(en).filter(k => {
    if (ns && k.split(".")[0] !== ns) return false;
    // Untranslated == still byte-identical to the English source.
    return (cur[k] ?? en[k]) === en[k];
  });
  const pending = [...new Set(keys.map(k => en[k]))];
  return {
    label: `ui ${lang}${ns ? ` [${ns}]` : ""}`,
    pending,
    apply: map => {
      for (const k of keys) {
        const hit = map.get(en[k]);
        if (hit) cur[k] = hit;
      }
      const ordered: Record<string, string> = {};
      for (const k of Object.keys(en)) ordered[k] = cur[k] ?? en[k];
      writeJson(outPath, ordered);
    },
  };
}

function dictJob(lang: LangCode, dir: string): Job {
  const dictDir = path.resolve(ROOT, "scripts", dir);
  const sources = fs
    .readdirSync(dictDir)
    .filter(f => f.startsWith("_source") && f.endsWith(".json"));
  if (sources.length === 0) {
    throw new Error(
      `No _source*.json in scripts/${dir} — run the generator with --extract first`
    );
  }
  const all: string[] = [];
  for (const f of sources) {
    for (const k of Object.keys(readJson(path.join(dictDir, f)))) {
      if (!all.includes(k)) all.push(k);
    }
  }
  const outPath = path.join(dictDir, `${lang}.json`);
  const cur = fs.existsSync(outPath) ? readJson(outPath) : {};
  const pending = all.filter(en => !cur[en]);
  return {
    label: `dict ${dir}/${lang}`,
    pending,
    apply: map => {
      for (const en of pending) {
        const hit = map.get(en);
        if (hit) cur[en] = hit;
      }
      writeJson(
        outPath,
        Object.fromEntries(all.filter(k => cur[k]).map(k => [k, cur[k]]))
      );
    },
  };
}

async function usage(key: string): Promise<string> {
  const base = key.endsWith(":fx")
    ? "https://api-free.deepl.com"
    : "https://api.deepl.com";
  const r = (await (
    await fetch(`${base}/v2/usage`, {
      headers: { Authorization: `DeepL-Auth-Key ${key}` },
    })
  ).json()) as { character_count: number; character_limit: number };
  return `${r.character_count.toLocaleString()}/${r.character_limit.toLocaleString()} used (${(r.character_limit - r.character_count).toLocaleString()} left)`;
}

async function main(): Promise<void> {
  const key = process.env.DEEPL_API_KEY;
  if (!key) throw new Error("DEEPL_API_KEY missing in environment");
  const mode = arg("--mode") ?? "ui";
  const langs = (arg("--lang")?.split(",") ?? []) as LangCode[];
  if (langs.length === 0) throw new Error("--lang is required");
  const ns = arg("--ns");
  const dir = arg("--dir") ?? "mixer-i18n";

  const provider = new DeepLProvider(key);
  console.log(`[translate-dict] DeepL ${await usage(key)}`);

  for (const lang of langs) {
    const job = mode === "ui" ? uiJob(lang, ns) : dictJob(lang, dir);
    const chars = job.pending.reduce((s, t) => s + t.length, 0);
    console.log(
      `  ${job.label}: ${job.pending.length} strings, ${chars.toLocaleString()} chars`
    );
    if (DRY || job.pending.length === 0) continue;

    // Glossary placeholders survive translation, then get swapped back.
    const prepped = job.pending.map(t => preprocessGlossary(t, lang));
    const out: string[] = [];
    for (let i = 0; i < prepped.length; i += 50) {
      const batch = prepped.slice(i, i + 50).map(p => p.processed);
      out.push(...(await provider.translateBatch(batch, lang)));
      process.stdout.write(`\r    ${out.length}/${prepped.length}   `);
    }
    process.stdout.write("\n");

    const map = new Map<string, string>();
    job.pending.forEach((src, i) =>
      map.set(src, postprocessGlossary(out[i], prepped[i].placeholders))
    );
    job.apply(map);
    console.log(`    ✓ ${job.label} written`);
  }
  if (!DRY) console.log(`[translate-dict] DeepL ${await usage(key)}`);
}

main().catch(err => {
  console.error("[translate-dict] fatal:", err);
  process.exit(1);
});
