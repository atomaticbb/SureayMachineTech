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
