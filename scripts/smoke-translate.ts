/**
 * scripts/smoke-translate.ts
 *
 * One-shot real-API check to confirm the DeepL key + MyMemory work.
 * Tiny payload (3 strings × 4 langs) → cheap, won't dent the Free quota.
 *
 * Run: pnpm test:translate
 */

import "dotenv/config";
import {
  DeepLProvider,
  MyMemoryProvider,
  translateAll,
  type LangCode,
} from "./translate-lib.ts";

const SAMPLE = [
  "Industrial blades manufactured in China",
  "Our shredder blades use tungsten carbide for wear resistance",
  "Vacuum heat treatment ensures consistent Rockwell hardness",
];

async function main() {
  const key = process.env.DEEPL_API_KEY;
  if (!key) {
    console.error("[smoke] DEEPL_API_KEY missing in .env — aborting");
    process.exit(1);
  }

  const deepL = new DeepLProvider(key);
  const myMem = new MyMemoryProvider(undefined, undefined, 100);
  let pass = 0;
  let fail = 0;

  for (const lang of ["es", "fr", "ru"] as LangCode[]) {
    process.stdout.write(`[deepl ${lang}] `);
    try {
      const out = await translateAll(deepL, SAMPLE, lang);
      const ok =
        out.length === SAMPLE.length &&
        out.every(s => typeof s === "string" && s.length > 0) &&
        // Glossary check — at least one canonical term per language present
        out.some(s => s.toLowerCase().includes("carburo") || s.toLowerCase().includes("carbure") || s.toLowerCase().includes("карбид"));
      if (!ok) throw new Error("output failed assertions");
      console.log("OK");
      console.log(`   → ${out[0].slice(0, 80)}…`);
      pass++;
    } catch (e) {
      console.log(`FAIL — ${(e as Error).message}`);
      fail++;
    }
  }

  // MyMemory — Vietnamese
  process.stdout.write(`[mymemory vi] `);
  try {
    const out = await translateAll(myMem, SAMPLE, "vi");
    const ok =
      out.length === SAMPLE.length &&
      out.every(s => typeof s === "string" && s.length > 0);
    if (!ok) throw new Error("output failed assertions");
    console.log("OK");
    console.log(`   → ${out[0].slice(0, 80)}…`);
    pass++;
  } catch (e) {
    console.log(`FAIL — ${(e as Error).message}`);
    fail++;
  }

  console.log(`\n[smoke] ${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}

main().catch(err => {
  console.error("[smoke] fatal:", err);
  process.exit(1);
});
