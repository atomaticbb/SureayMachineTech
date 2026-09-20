/**
 * i18n core — URL language detection and path localization.
 *
 * Default language (English) has NO URL prefix; non-default languages
 * are prefixed with /{lang}. Admin routes never receive a language prefix.
 */

export const SUPPORTED_LANGS = [
  "en",
  "es",
  "fr",
  "ru",
  "vi",
  "ar",
  "pt",
  "tr",
] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

/**
 * Languages whose translation is still in progress. They route and render so
 * they can be previewed and translated incrementally, but they are kept out of
 * every signal that tells Google the page exists in that language: no hreflang
 * alternate, no sitemap entry, no prerendered variant, and no entry in the
 * language switcher.
 *
 * Shipping a language before its copy is translated is what produced the ~115
 * "Duplicate, Google chose different canonical" issues the news section had —
 * an English page served under a localized URL and advertised as a translation.
 * Empty this list only when the locale data files are genuinely complete.
 */
export const PENDING_LANGS: readonly Lang[] = [];

export function isPendingLang(lang: Lang): boolean {
  return PENDING_LANGS.includes(lang);
}

/** Languages that are live: prefixed, indexed and offered to visitors. */
export const PUBLISHED_LANGS = SUPPORTED_LANGS.filter(l => !isPendingLang(l));

export const LANG_PREFIXES = SUPPORTED_LANGS.filter(
  (l): l is Exclude<Lang, "en"> => l !== DEFAULT_LANG
);

/** Prefixes that get prerendered / listed in the sitemap today. */
export const PUBLISHED_LANG_PREFIXES = LANG_PREFIXES.filter(
  l => !isPendingLang(l)
);

// Matches a leading "/es", "/fr", "/ru", "/vi", "/ar", "/pt" or "/tr" segment.
// The lookahead ensures "/esoteric" is NOT matched as "/es".
const LANG_REGEX = /^\/(es|fr|ru|vi|ar|pt|tr)(?=\/|$)/;

export function isSupportedLang(value: string): value is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/**
 * Extract the language from a URL pathname.
 *   "/"                            → { lang: "en", base: "" }
 *   "/products"                    → { lang: "en", base: "" }
 *   "/es"                          → { lang: "es", base: "/es" }
 *   "/es/products/granulator"      → { lang: "es", base: "/es" }
 */
export function parseLangFromPath(pathname: string): {
  lang: Lang;
  base: string;
} {
  const match = pathname.match(LANG_REGEX);
  if (match) {
    const lang = match[1] as Lang;
    return { lang, base: `/${lang}` };
  }
  return { lang: DEFAULT_LANG, base: "" };
}

/**
 * Remove any language prefix from a pathname.
 *   "/es/products" → "/products"
 *   "/es"          → "/"
 *   "/products"    → "/products"
 */
export function stripLangPrefix(pathname: string): string {
  const stripped = pathname.replace(LANG_REGEX, "");
  return stripped === "" ? "/" : stripped;
}

/**
 * Convert a canonical (English) path to the localized version.
 * Defensive: also accepts an already-prefixed path.
 *   localizedPath("/products", "es")    → "/es/products"
 *   localizedPath("/products", "en")    → "/products"
 *   localizedPath("/es/products", "fr") → "/fr/products"
 *   localizedPath("/", "es")            → "/es"
 */
export function localizedPath(path: string, lang: Lang): string {
  const clean = stripLangPrefix(path);
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/**
 * Product IDs that ship in English only — no /{lang} variants, no hreflang,
 * one sitemap entry. Use when a page goes live before its translations exist,
 * so Google never sees five English duplicates under localized URLs.
 *
 * Removing an ID here requires adding the matching entry to all five
 * data/locales/blades.*.ts arrays first — a product missing from a locale
 * array 404s in that language, it does not fall back to English.
 */
export const ENGLISH_ONLY_PRODUCT_IDS: readonly string[] = [];

/** True when `path` (prefixed or not) is an English-only product page. */
export function isEnglishOnlyProductPath(path: string): boolean {
  const clean = stripLangPrefix(path);
  return ENGLISH_ONLY_PRODUCT_IDS.some(id => clean === `/products/${id}`);
}
