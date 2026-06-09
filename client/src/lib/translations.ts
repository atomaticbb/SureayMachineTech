/**
 * Translation dictionary registry and lookup.
 *
 * Pure logic only — no React. Tested in translations.test.ts.
 * The React hook lives in useTranslation.ts.
 *
 * Lookup order:
 *   1. dictionary for the requested language
 *   2. English fallback
 *   3. the key itself (so missing keys are visible in the UI)
 *
 * English is statically imported (always available). Non-English dictionaries
 * are loaded on demand via loadDictionary(lang) — called by preloadLocale() in
 * data/locales/index.ts so the UI strings are ready before any page renders.
 */

import { DEFAULT_LANG, type Lang } from "./i18n";
import en from "../locales/en.json";

export type Dictionary = Record<string, string>;

const dictionaries: Partial<Record<Lang, Dictionary>> = {
  en: en as Dictionary,
};

// Promise cache — same instance returned on concurrent calls so we don't
// trigger duplicate dynamic imports while the first one is in flight.
const _dictPromises = new Map<Lang, Promise<void>>();

export function loadDictionary(lang: Lang): Promise<void> {
  if (lang === DEFAULT_LANG || dictionaries[lang]) return Promise.resolve();
  let p = _dictPromises.get(lang);
  if (!p) {
    if (lang === "es")
      p = import("../locales/es.json").then(m => {
        dictionaries.es = m.default as unknown as Dictionary;
      });
    else if (lang === "fr")
      p = import("../locales/fr.json").then(m => {
        dictionaries.fr = m.default as unknown as Dictionary;
      });
    else if (lang === "ru")
      p = import("../locales/ru.json").then(m => {
        dictionaries.ru = m.default as unknown as Dictionary;
      });
    else if (lang === "vi")
      p = import("../locales/vi.json").then(m => {
        dictionaries.vi = m.default as unknown as Dictionary;
      });
    else if (lang === "ar")
      p = import("../locales/ar.json").then(m => {
        dictionaries.ar = m.default as unknown as Dictionary;
      });
    else p = Promise.resolve();
    _dictPromises.set(lang, p);
  }
  return p;
}

export function translate(key: string, lang: Lang): string {
  return (
    dictionaries[lang]?.[key] ?? dictionaries[DEFAULT_LANG]?.[key] ?? key
  );
}

/** Test-only: replace a dictionary entirely. Not exported from the index. */
export function _setDictionaryForTest(lang: Lang, dict: Dictionary): void {
  dictionaries[lang] = dict;
}

/** Test-only: read back a dictionary (so tests can restore state). */
export function _getDictionaryForTest(lang: Lang): Dictionary {
  return dictionaries[lang]!;
}
