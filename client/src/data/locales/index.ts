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
 */

import { DEFAULT_LANG, type Lang } from "@/lib/i18n";
import {
  blades as bladesEn,
  type Blade,
  type BladeCategoryType,
  type BladeSectorType,
} from "../blades";
import { blades as bladesEs } from "./blades.es";
import { blades as bladesFr } from "./blades.fr";
import { blades as bladesRu } from "./blades.ru";
import { blades as bladesVi } from "./blades.vi";
import { blades as bladesAr } from "./blades.ar";

import {
  BLADE_CATEGORIES as catEn,
  type BladeCategoryMeta,
} from "../blade-categories";
import { BLADE_CATEGORIES as catEs } from "./blade-categories.es";
import { BLADE_CATEGORIES as catFr } from "./blade-categories.fr";
import { BLADE_CATEGORIES as catRu } from "./blade-categories.ru";
import { BLADE_CATEGORIES as catVi } from "./blade-categories.vi";
import { BLADE_CATEGORIES as catAr } from "./blade-categories.ar";

import {
  SEO_CONFIG as seoEn,
  type PageSEO,
} from "../../utils/seo-config";
import { SEO_CONFIG as seoEs } from "./seo-config.es";
import { SEO_CONFIG as seoFr } from "./seo-config.fr";
import { SEO_CONFIG as seoRu } from "./seo-config.ru";
import { SEO_CONFIG as seoVi } from "./seo-config.vi";
import { SEO_CONFIG as seoAr } from "./seo-config.ar";

// ── Lang → dataset maps ─────────────────────────────────────────────────────

const bladesByLang: Record<Lang, Blade[]> = {
  en: bladesEn,
  es: bladesEs,
  fr: bladesFr,
  ru: bladesRu,
  vi: bladesVi,
  ar: bladesAr,
};

const categoriesByLang: Record<Lang, BladeCategoryMeta[]> = {
  en: catEn,
  es: catEs,
  fr: catFr,
  ru: catRu,
  vi: catVi,
  ar: catAr,
};

const seoByLang: Record<Lang, Record<string, PageSEO>> = {
  en: seoEn,
  es: seoEs,
  fr: seoFr,
  ru: seoRu,
  vi: seoVi,
  ar: seoAr,
};

// ── Accessors ───────────────────────────────────────────────────────────────

export function getBlades(lang: Lang): Blade[] {
  return bladesByLang[lang] ?? bladesByLang[DEFAULT_LANG];
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
  return categoriesByLang[lang] ?? categoriesByLang[DEFAULT_LANG];
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
  const config = seoByLang[lang] ?? seoByLang[DEFAULT_LANG];
  return (
    config[pageKey] ??
    seoByLang[DEFAULT_LANG][pageKey] ??
    ({} as PageSEO)
  );
}
