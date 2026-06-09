/**
 * Language-aware data accessors.
 *
 *   getBlades(lang)               → Blade[]                in the target language
 *   getBladeById(id, lang)        → Blade | undefined
 *   getRelatedBlades(id, lang)    → Blade[]                (same shape as English helper)
 *   getFeaturedBlades(lang)       → Blade[]
 *   getCategories(lang)           → BladeCategoryMeta[]
 *   getSEO(pageKey, lang)         → PageSEO
 *
 * Missing languages fall back to English. Slugs (`id`) stay English in every
 * locale so routing and link generation never need to know the active lang.
 *
 * News intentionally has no per-locale variant; news.ts content was excluded
 * from automated translation (see scripts/translate-data.ts comments).
 *
 * Non-English locale data is loaded on demand via preloadLocale(lang) rather
 * than statically imported. This keeps the initial shared bundle small (~350 KB
 * instead of 2.8 MB) and allows Vite to emit per-language chunks (~500 KB each)
 * that are only fetched for the language actually needed.
 */

import { DEFAULT_LANG, type Lang } from "@/lib/i18n";
import {
  blades as bladesEn,
  type Blade,
  type BladeCategoryType,
  type BladeSectorType,
} from "../blades";
import {
  BLADE_CATEGORIES as catEn,
  type BladeCategoryMeta,
} from "../blade-categories";
import {
  SEO_CONFIG as seoEn,
  type PageSEO,
} from "../../utils/seo-config";

// English data is always synchronously available.
// Non-English entries are populated by preloadLocale() below.
const bladesByLang: Partial<Record<Lang, Blade[]>> = { en: bladesEn };
const categoriesByLang: Partial<Record<Lang, BladeCategoryMeta[]>> = {
  en: catEn,
};
const seoByLang: Partial<Record<Lang, Record<string, PageSEO>>> = {
  en: seoEn,
};

// ── Dynamic locale loaders ──────────────────────────────────────────────────
// Each import() becomes its own Vite chunk (~500 KB per language) instead of
// bundling all 6 language datasets (~2.8 MB) into the shared initial bundle.

type NonEnLang = Exclude<Lang, "en">;

const LOCALE_LOADERS: Record<NonEnLang, () => Promise<void>> = {
  es: () =>
    Promise.all([
      import("./blades.es"),
      import("./blade-categories.es"),
      import("./seo-config.es"),
    ]).then(([b, c, s]) => {
      bladesByLang.es = b.blades;
      categoriesByLang.es = c.BLADE_CATEGORIES;
      seoByLang.es = s.SEO_CONFIG;
    }),
  fr: () =>
    Promise.all([
      import("./blades.fr"),
      import("./blade-categories.fr"),
      import("./seo-config.fr"),
    ]).then(([b, c, s]) => {
      bladesByLang.fr = b.blades;
      categoriesByLang.fr = c.BLADE_CATEGORIES;
      seoByLang.fr = s.SEO_CONFIG;
    }),
  ru: () =>
    Promise.all([
      import("./blades.ru"),
      import("./blade-categories.ru"),
      import("./seo-config.ru"),
    ]).then(([b, c, s]) => {
      bladesByLang.ru = b.blades;
      categoriesByLang.ru = c.BLADE_CATEGORIES;
      seoByLang.ru = s.SEO_CONFIG;
    }),
  vi: () =>
    Promise.all([
      import("./blades.vi"),
      import("./blade-categories.vi"),
      import("./seo-config.vi"),
    ]).then(([b, c, s]) => {
      bladesByLang.vi = b.blades;
      categoriesByLang.vi = c.BLADE_CATEGORIES;
      seoByLang.vi = s.SEO_CONFIG;
    }),
  ar: () =>
    Promise.all([
      import("./blades.ar"),
      import("./blade-categories.ar"),
      import("./seo-config.ar"),
    ]).then(([b, c, s]) => {
      bladesByLang.ar = b.blades;
      categoriesByLang.ar = c.BLADE_CATEGORIES;
      seoByLang.ar = s.SEO_CONFIG;
    }),
};

// Promise cache — same instance returned on re-renders so React Suspense
// (via use()) doesn't loop.
const _localePromises = new Map<NonEnLang, Promise<void>>();

/**
 * Eagerly load the locale data for `lang` and return a Promise that resolves
 * when it is ready. Returns a resolved Promise for English (always available).
 * Safe to call multiple times — subsequent calls return the cached promise.
 */
export function preloadLocale(lang: Lang): Promise<void> {
  if (lang === DEFAULT_LANG) return Promise.resolve();
  const nonEn = lang as NonEnLang;
  if (bladesByLang[nonEn]) return Promise.resolve(); // already loaded
  let p = _localePromises.get(nonEn);
  if (!p) {
    p = LOCALE_LOADERS[nonEn]();
    _localePromises.set(nonEn, p);
  }
  return p;
}

// ── Accessors ───────────────────────────────────────────────────────────────

export function getBlades(lang: Lang): Blade[] {
  return bladesByLang[lang] ?? bladesByLang[DEFAULT_LANG]!;
}

export function getBladeById(id: string, lang: Lang): Blade | undefined {
  return getBlades(lang).find(b => b.id === id);
}

export function getFeaturedBlades(lang: Lang): Blade[] {
  return getBlades(lang).filter(b => b.isFeatured);
}

export function getRelatedBlades(
  currentId: string,
  lang: Lang,
  limit = 4
): Blade[] {
  const blades = getBlades(lang);
  const current = blades.find(b => b.id === currentId);
  if (!current) return [];

  if (current.relatedBladeIds && current.relatedBladeIds.length > 0) {
    return current.relatedBladeIds
      .map(id => blades.find(b => b.id === id))
      .filter((b): b is Blade => !!b)
      .slice(0, limit);
  }

  return blades
    .filter(b => b.category === current.category && b.id !== currentId)
    .slice(0, limit);
}

export function getCategories(lang: Lang): BladeCategoryMeta[] {
  return categoriesByLang[lang] ?? categoriesByLang[DEFAULT_LANG]!;
}

export function getCategoryBySlug(
  slug: string,
  lang: Lang
): BladeCategoryMeta | undefined {
  return getCategories(lang).find(c => c.slug === slug);
}

// ── Category-derived blade helpers (lang-aware versions of the helpers
//    in blade-categories.ts). They read from the localized blades array so
//    category landing pages render translated content. ──────────────────────

export function getBladesByCategory(
  category: BladeCategoryType,
  lang: Lang
): Blade[] {
  return getBlades(lang).filter(b => b.category === category);
}

export function getSectorsForCategory(
  category: BladeCategoryType,
  lang: Lang
): BladeSectorType[] {
  const seen = new Set<BladeSectorType>();
  for (const b of getBlades(lang)) {
    if (b.category === category) seen.add(b.sector);
  }
  return Array.from(seen);
}

export function getRepresentativeBlade(
  category: BladeCategoryType,
  lang: Lang
): Blade | undefined {
  return getBlades(lang).find(b => b.category === category);
}

/** Deduplicated, order-preserving union of compatibleMachines across the
 *  category. Brand names live untranslated so any locale returns the same
 *  list. */
export function getOemMachinesForCategory(
  category: BladeCategoryType,
  lang: Lang
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const b of getBlades(lang)) {
    if (b.category !== category || !b.compatibleMachines) continue;
    for (const m of b.compatibleMachines) {
      if (!seen.has(m)) {
        seen.add(m);
        out.push(m);
      }
    }
  }
  return out;
}

/**
 * Per-page SEO config. Missing key in target lang falls back to English so
 * pages with newly-added keys never render with empty meta.
 */
export function getSEO(pageKey: string, lang: Lang): PageSEO {
  const config = seoByLang[lang] ?? seoByLang[DEFAULT_LANG]!;
  return (
    config[pageKey] ??
    seoByLang[DEFAULT_LANG]![pageKey] ??
    ({} as PageSEO)
  );
}
