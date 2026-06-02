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
 */

import { DEFAULT_LANG, type Lang } from "./i18n";
import en from "../locales/en.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import ru from "../locales/ru.json";
import vi from "../locales/vi.json";
import ar from "../locales/ar.json";

export type Dictionary = Record<string, string>;

const dictionaries: Record<Lang, Dictionary> = {
  en: en as Dictionary,
  es: es as Dictionary,
  fr: fr as Dictionary,
  ru: ru as Dictionary,
  vi: vi as Dictionary,
  ar: ar as Dictionary,
};

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
  return dictionaries[lang];
}
