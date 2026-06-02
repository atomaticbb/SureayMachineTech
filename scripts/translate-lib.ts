/**
 * scripts/translate-lib.ts
 *
 * Pure logic + provider clients for translating UI dictionaries and TS data
 * files. The CLI entry point (translate-data.ts / translate-ui.ts) imports
 * from here. Tests live in translate-lib.test.ts and mock global fetch.
 *
 * Provider routing:
 *   es / fr / ru → DeepL (Free)
 *   vi           → MyMemory (free, no key required)
 */

export type LangCode = "es" | "fr" | "ru" | "vi";

// ── Field extraction ─────────────────────────────────────────────────────────

export interface TranslatableField {
  path: (string | number)[];
  value: string;
}

/**
 * Object keys that must NEVER be translated — they are slugs, identifiers,
 * URLs, file paths, brand names, technical enums, or numeric data.
 * Drives extractTranslatableFields' recursion.
 */
export const NON_TRANSLATABLE_KEYS = new Set([
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
  "category", // BladeCategoryType enum
  "sector", // BladeSectorType enum
  "badgeColor", // UI color enum
  "compatibleMachines", // OEM brand names (Vecoplan, BHS, EREMA…)
  "relatedBladeIds",
  "isFeatured",
  "offers", // price range, numbers
  "catalogUrl",
  "mpn",
  "sku",
  "ctaHref",
  "videoUrl",
  // Whole arrays of technical / numeric / brand-model codes — translation
  // adds noise (DeepL mis-translates "HRC 58-62" and "Komatsu LG-1500").
  // Column headers for these tables live in en.json (product.tableHeader.*)
  // and the cell values are dimensional codes that read the same in any
  // language. Burn DeepL budget on copy that actually changes per locale.
  "standardDimensions",
  "specs",
  // Bulk long-form arrays — skipped from automated translation because
  // MyMemory's per-hour rate cap can't sustain the volume. FAQ rich
  // results and audit-log content stay English for launch and may be
  // back-filled later via a paid provider or manual review.
  "faqs",
  "components",
]);

const URL_LIKE = /^(https?:\/\/|\/[A-Za-z0-9_\-/]|mailto:|tel:)/;
const FILE_LIKE = /\.(webp|png|jpg|jpeg|svg|gif|pdf|mp4|webm|avif|dxf|dwg|step|stp)(\?|$)/i;

function isTranslatableString(s: string): boolean {
  const trimmed = s.trim();
  if (trimmed.length < 2) return false;
  if (URL_LIKE.test(trimmed)) return false;
  if (FILE_LIKE.test(trimmed)) return false;
  return true;
}

export function extractTranslatableFields(
  obj: unknown,
  path: (string | number)[] = [],
  skipKeys: ReadonlySet<string> = NON_TRANSLATABLE_KEYS
): TranslatableField[] {
  const out: TranslatableField[] = [];

  if (typeof obj === "string") {
    if (isTranslatableString(obj)) out.push({ path, value: obj });
    return out;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      out.push(...extractTranslatableFields(item, [...path, i], skipKeys));
    });
    return out;
  }

  if (obj && typeof obj === "object") {
    for (const [key, val] of Object.entries(obj)) {
      if (skipKeys.has(key)) continue;
      out.push(...extractTranslatableFields(val, [...path, key], skipKeys));
    }
  }

  return out;
}

/**
 * Apply a parallel array of translations back into a deep clone of the
 * original structure, mirroring the paths captured during extraction.
 */
export function applyTranslations<T>(
  obj: T,
  fields: TranslatableField[],
  translations: string[]
): T {
  if (fields.length !== translations.length) {
    throw new Error(
      `applyTranslations: ${fields.length} fields vs ${translations.length} translations`
    );
  }

  const clone = JSON.parse(JSON.stringify(obj));

  fields.forEach((field, i) => {
    if (field.path.length === 0) {
      // Root is a string — caller should handle that case separately.
      throw new Error("applyTranslations: cannot replace root-level string");
    }
    let target: Record<string | number, unknown> = clone;
    for (let j = 0; j < field.path.length - 1; j++) {
      target = target[field.path[j]] as Record<string | number, unknown>;
    }
    target[field.path[field.path.length - 1]] = translations[i];
  });

  return clone;
}

// ── Glossary ─────────────────────────────────────────────────────────────────
// Industry-specific terminology that must stay consistent across the catalog.
// Applied via placeholder substitution: English term → __G0__ → target term.
// Order matters: list longer phrases BEFORE their substrings so the regex
// doesn't shadow ("rotary slitter knives" before "slitter").

export const GLOSSARY: Record<LangCode, Record<string, string>> = {
  es: {
    "Rotary slitter knives": "cuchillas rotativas de corte longitudinal",
    "rotary slitter knives": "cuchillas rotativas de corte longitudinal",
    "granulator blades": "cuchillas de granulador",
    "shredder blades": "cuchillas trituradoras",
    "tungsten carbide": "carburo de tungsteno",
    "pelletizer blades": "cuchillas de peletizadora",
    "guillotine blades": "cuchillas de guillotina",
    "shear blades": "cuchillas de cizalla",
    "circular knives": "cuchillas circulares",
    "log saw blades": "sierras circulares para troncos",
    "heat treatment": "tratamiento térmico",
    "Rockwell hardness": "dureza Rockwell",
    "powder metallurgy": "pulvimetalurgia",
    "cold-work tool steel": "acero para herramientas de trabajo en frío",
    "vacuum heat treatment": "tratamiento térmico al vacío",
    "CMM inspection": "inspección CMM",
  },
  fr: {
    "Rotary slitter knives": "couteaux rotatifs de refente",
    "rotary slitter knives": "couteaux rotatifs de refente",
    "granulator blades": "lames de granulateur",
    "shredder blades": "lames de broyeur",
    "tungsten carbide": "carbure de tungstène",
    "pelletizer blades": "lames de granuleuse",
    "guillotine blades": "lames de guillotine",
    "shear blades": "lames de cisaille",
    "circular knives": "couteaux circulaires",
    "log saw blades": "lames de scie circulaire pour rondins",
    "heat treatment": "traitement thermique",
    "Rockwell hardness": "dureté Rockwell",
    "powder metallurgy": "métallurgie des poudres",
    "cold-work tool steel": "acier à outils pour travail à froid",
    "vacuum heat treatment": "traitement thermique sous vide",
    "CMM inspection": "contrôle CMM",
  },
  ru: {
    "Rotary slitter knives": "ротационные ножи для продольной резки",
    "rotary slitter knives": "ротационные ножи для продольной резки",
    "granulator blades": "ножи для гранулятора",
    "shredder blades": "ножи для шредера",
    "tungsten carbide": "карбид вольфрама",
    "pelletizer blades": "ножи для пеллетайзера",
    "guillotine blades": "гильотинные ножи",
    "shear blades": "ножницы для резки",
    "circular knives": "дисковые ножи",
    "log saw blades": "дисковые пилы для бревен",
    "heat treatment": "термическая обработка",
    "Rockwell hardness": "твёрдость по Роквеллу",
    "powder metallurgy": "порошковая металлургия",
    "cold-work tool steel": "инструментальная сталь для холодной обработки",
    "vacuum heat treatment": "вакуумная термообработка",
    "CMM inspection": "контроль на КИМ",
  },
  vi: {
    "Rotary slitter knives": "dao cắt rotary",
    "rotary slitter knives": "dao cắt rotary",
    "granulator blades": "dao máy nghiền",
    "shredder blades": "dao máy cắt",
    "tungsten carbide": "hợp kim cacbua vonfram",
    "pelletizer blades": "dao máy tạo hạt",
    "guillotine blades": "dao cắt giấy",
    "shear blades": "dao cắt thép",
    "circular knives": "dao tròn",
    "log saw blades": "lưỡi cưa tròn cho gỗ tròn",
    "heat treatment": "xử lý nhiệt",
    "Rockwell hardness": "độ cứng Rockwell",
    "powder metallurgy": "luyện kim bột",
    "cold-work tool steel": "thép dụng cụ gia công nguội",
    "vacuum heat treatment": "xử lý nhiệt chân không",
    "CMM inspection": "kiểm tra CMM",
  },
};

/**
 * Wrap glossary terms in opaque placeholders before sending to the
 * translation API. The provider returns the same placeholders untouched,
 * which we then swap for the target-language term.
 *
 * Placeholders use a leading "z" so MyMemory's tokenizer doesn't break them
 * into segments (DeepL handles ALL_CAPS_UNDERSCORE fine; MyMemory sometimes
 * doesn't).
 */
export function preprocessGlossary(
  text: string,
  lang: LangCode
): { processed: string; placeholders: Map<string, string> } {
  const map = GLOSSARY[lang] ?? {};
  const placeholders = new Map<string, string>();
  let processed = text;
  let i = 0;
  for (const [en, targetTerm] of Object.entries(map)) {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "g");
    if (regex.test(processed)) {
      const placeholder = `zGTR${i}zGTR`;
      processed = processed.replace(regex, placeholder);
      placeholders.set(placeholder, targetTerm);
      i++;
    }
  }
  return { processed, placeholders };
}

export function postprocessGlossary(
  translated: string,
  placeholders: Map<string, string>
): string {
  let result = translated;
  for (const [placeholder, term] of placeholders.entries()) {
    // Some translators (Google) capitalize the leading letter of a sentence,
    // turning "zGTR0zGTR" into "ZGTR0zGTR". Match case-insensitively against
    // the exact placeholder shape so post-replacement still works.
    const pattern = new RegExp(
      placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "gi"
    );
    result = result.replace(pattern, term);
  }
  return result;
}

// ── Translation providers ────────────────────────────────────────────────────

export interface TranslationProvider {
  readonly name: string;
  readonly supportedLangs: ReadonlyArray<LangCode>;
  /** Translate a batch of English source strings to the target language. */
  translateBatch(texts: string[], targetLang: LangCode): Promise<string[]>;
}

const DEEPL_LANG_MAP: Record<string, string> = {
  es: "ES",
  fr: "FR",
  ru: "RU",
};

export class DeepLProvider implements TranslationProvider {
  readonly name = "deepl";
  readonly supportedLangs: ReadonlyArray<LangCode> = ["es", "fr", "ru"];

  constructor(
    private readonly apiKey: string,
    private readonly endpoint = "https://api-free.deepl.com/v2/translate"
  ) {}

  async translateBatch(
    texts: string[],
    targetLang: LangCode
  ): Promise<string[]> {
    const deepLCode = DEEPL_LANG_MAP[targetLang];
    if (!deepLCode) {
      throw new Error(`DeepL does not support target lang: ${targetLang}`);
    }
    if (texts.length === 0) return [];

    const body = new URLSearchParams();
    for (const t of texts) body.append("text", t);
    body.append("target_lang", deepLCode);
    body.append("source_lang", "EN");
    body.append("preserve_formatting", "1");

    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${this.apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!res.ok) {
      throw new Error(`DeepL ${res.status}: ${await res.text()}`);
    }

    const data = (await res.json()) as {
      translations: { text: string }[];
    };
    return data.translations.map(t => t.text);
  }
}

/**
 * Google Translate via the unofficial `translate_a/single` endpoint —
 * the same one Chrome's built-in translator uses. No API key, no setup,
 * and Vietnamese support is on par with the paid Translate API. The
 * trade-off is unofficial-stability: a flag could disappear or rate
 * limits could tighten, so this is best for one-shot batch work rather
 * than production runtime translation.
 *
 * Response shape (segmented):
 *   [[["translated A", "source A", null, null, ...],
 *     ["translated B", "source B", null, null, ...]], ...]
 * The first dimension's items each carry one sentence segment — we
 * concatenate them to recover the full translation.
 */
export class GoogleTranslateUnofficialProvider implements TranslationProvider {
  readonly name = "google";
  readonly supportedLangs: ReadonlyArray<LangCode> = ["es", "fr", "ru", "vi"];

  constructor(
    private readonly delayMs = 150,
    private readonly maxRetries = 4,
    private readonly endpoint = "https://translate.googleapis.com/translate_a/single"
  ) {}

  private async fetchOne(
    text: string,
    targetLang: LangCode
  ): Promise<string> {
    const url = new URL(this.endpoint);
    url.searchParams.set("client", "gtx");
    url.searchParams.set("sl", "en");
    url.searchParams.set("tl", targetLang);
    url.searchParams.set("dt", "t");
    url.searchParams.set("q", text);

    let lastErr: unknown = null;
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const res = await fetch(url.toString());
        if (!res.ok) {
          lastErr = new Error(`Google ${res.status}`);
          if (res.status === 429 || res.status >= 500) {
            const wait = 3000 * (attempt + 1) ** 2;
            await new Promise(r => setTimeout(r, wait));
            continue;
          }
          throw lastErr;
        }
        const data = (await res.json()) as unknown;
        if (!Array.isArray(data) || !Array.isArray((data as unknown[])[0])) {
          throw new Error("Google response shape unexpected");
        }
        const segments: string[] = [];
        for (const item of (data as unknown[][])[0]) {
          if (Array.isArray(item) && typeof item[0] === "string") {
            segments.push(item[0]);
          }
        }
        return segments.join("");
      } catch (err) {
        lastErr = err;
        if (attempt < this.maxRetries - 1) {
          await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
        }
      }
    }
    throw lastErr instanceof Error
      ? lastErr
      : new Error(`Google failed after ${this.maxRetries} attempts`);
  }

  async translateBatch(
    texts: string[],
    targetLang: LangCode
  ): Promise<string[]> {
    const out: string[] = [];
    for (const text of texts) {
      out.push(await this.fetchOne(text, targetLang));
      if (this.delayMs > 0) await new Promise(r => setTimeout(r, this.delayMs));
    }
    return out;
  }
}

export class MyMemoryProvider implements TranslationProvider {
  readonly name = "mymemory";
  readonly supportedLangs: ReadonlyArray<LangCode> = ["es", "fr", "ru", "vi"];

  constructor(
    private readonly email?: string,
    private readonly endpoint = "https://api.mymemory.translated.net/get",
    // Default 400ms gives ~2.5 req/sec — well under MyMemory's typical
    // rate-limit threshold. Lower values trigger HTTP 429 after ~300 calls.
    private readonly delayMs = 400,
    private readonly maxRetries = 5
  ) {}

  private async fetchOne(
    text: string,
    targetLang: LangCode
  ): Promise<string> {
    const params = new URLSearchParams({
      q: text,
      langpair: `en|${targetLang}`,
      ...(this.email ? { de: this.email } : {}),
    });

    // 429 backoff schedule: 10s, 30s, 60s, 120s, 180s — covers a transient
    // per-minute rate-limit window without leaning on the daily quota.
    const BACKOFF_429_MS = [10_000, 30_000, 60_000, 120_000, 180_000];

    let lastErr: unknown = null;
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const res = await fetch(`${this.endpoint}?${params.toString()}`);
        if (!res.ok) {
          if (res.status === 429) {
            lastErr = new Error(`MyMemory http 429`);
            const wait = BACKOFF_429_MS[Math.min(attempt, BACKOFF_429_MS.length - 1)];
            process.stdout.write(`\n      [rate-limit] sleeping ${wait / 1000}s…\n`);
            await new Promise(r => setTimeout(r, wait));
            continue;
          }
          if (res.status === 503 || res.status >= 500) {
            lastErr = new Error(`MyMemory http ${res.status}`);
            await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
            continue;
          }
          throw new Error(`MyMemory ${res.status}: ${await res.text()}`);
        }
        const data = (await res.json()) as {
          responseStatus: number | string;
          responseData?: { translatedText?: string };
        };
        const status = Number(data.responseStatus);
        if (status === 200) {
          return data.responseData?.translatedText ?? text;
        }
        if (status === 429) {
          // Body-level 429 — daily quota. Same backoff path; if we keep hitting
          // it after multiple retries the caller will see a hard failure.
          lastErr = new Error(`MyMemory body 429 (quota)`);
          const wait = BACKOFF_429_MS[Math.min(attempt, BACKOFF_429_MS.length - 1)];
          process.stdout.write(`\n      [quota] sleeping ${wait / 1000}s…\n`);
          await new Promise(r => setTimeout(r, wait));
          continue;
        }
        lastErr = new Error(`MyMemory responseStatus=${status}`);
        await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
      } catch (err) {
        lastErr = err;
        if (attempt < this.maxRetries - 1) {
          await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
          continue;
        }
      }
    }
    throw lastErr instanceof Error
      ? lastErr
      : new Error(`MyMemory failed after ${this.maxRetries} attempts`);
  }

  async translateBatch(
    texts: string[],
    targetLang: LangCode
  ): Promise<string[]> {
    const out: string[] = [];
    for (const text of texts) {
      out.push(await this.fetchOne(text, targetLang));
      if (this.delayMs > 0) await new Promise(r => setTimeout(r, this.delayMs));
    }
    return out;
  }
}

// ── Batched translation with glossary handling ───────────────────────────────

/**
 * Translate an array of strings with glossary preprocessing + batching.
 * Batch size is provider-dependent (DeepL: 50, MyMemory: 1).
 */
export async function translateAll(
  provider: TranslationProvider,
  texts: string[],
  targetLang: LangCode,
  options: { batchSize?: number; onProgress?: (done: number, total: number) => void } = {}
): Promise<string[]> {
  if (!provider.supportedLangs.includes(targetLang)) {
    throw new Error(
      `Provider ${provider.name} does not support ${targetLang}`
    );
  }
  const batchSize = options.batchSize ?? (provider.name === "deepl" ? 50 : 1);

  // Preprocess all texts with glossary.
  const prepped = texts.map(t => preprocessGlossary(t, targetLang));
  const sources = prepped.map(p => p.processed);

  const results: string[] = [];
  for (let i = 0; i < sources.length; i += batchSize) {
    const batch = sources.slice(i, i + batchSize);
    const translated = await provider.translateBatch(batch, targetLang);
    for (let j = 0; j < translated.length; j++) {
      const restored = postprocessGlossary(translated[j], prepped[i + j].placeholders);
      results.push(restored);
    }
    options.onProgress?.(Math.min(i + batchSize, sources.length), sources.length);
  }

  return results;
}

// ── Provider routing ─────────────────────────────────────────────────────────

export function getProviderForLang(lang: LangCode): TranslationProvider {
  if (lang === "vi") {
    return new MyMemoryProvider(process.env.MYMEMORY_EMAIL);
  }
  const key = process.env.DEEPL_API_KEY;
  if (!key) {
    throw new Error("DEEPL_API_KEY missing in environment");
  }
  return new DeepLProvider(key);
}
