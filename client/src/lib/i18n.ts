/**
 * i18n core — URL language detection and path localization.
 *
 * Default language (English) has NO URL prefix; non-default languages
 * are prefixed with /{lang}. Admin routes never receive a language prefix.
 */

export const SUPPORTED_LANGS = ["en", "es", "fr", "ru", "vi", "ar"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export const LANG_PREFIXES = SUPPORTED_LANGS.filter(
  (l): l is Exclude<Lang, "en"> => l !== DEFAULT_LANG
);

// Matches a leading "/es", "/fr", "/ru", "/vi", or "/ar" segment.
// The lookahead ensures "/esoteric" is NOT matched as "/es".
const LANG_REGEX = /^\/(es|fr|ru|vi|ar)(?=\/|$)/;

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
export const ENGLISH_ONLY_PRODUCT_IDS: readonly string[] = [
  "tungsten-carbide-slitter-knives",
];

/** True when `path` (prefixed or not) is an English-only product page. */
export function isEnglishOnlyProductPath(path: string): boolean {
  const clean = stripLangPrefix(path);
  return ENGLISH_ONLY_PRODUCT_IDS.some(id => clean === `/products/${id}`);
}
