import { describe, it, expect } from "vitest";
import {
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  LANG_PREFIXES,
  isSupportedLang,
  parseLangFromPath,
  stripLangPrefix,
  localizedPath,
} from "./i18n";

describe("SUPPORTED_LANGS / DEFAULT_LANG / LANG_PREFIXES", () => {
  it("includes the six launch languages (en + 5 translated)", () => {
    expect(SUPPORTED_LANGS).toEqual(["en", "es", "fr", "ru", "vi", "ar"]);
  });

  it("uses en as the default", () => {
    expect(DEFAULT_LANG).toBe("en");
  });

  it("LANG_PREFIXES is SUPPORTED_LANGS minus the default", () => {
    expect(LANG_PREFIXES).toEqual(["es", "fr", "ru", "vi", "ar"]);
    expect(LANG_PREFIXES).not.toContain(DEFAULT_LANG);
  });
});

describe("isSupportedLang", () => {
  it("returns true for supported languages", () => {
    expect(isSupportedLang("en")).toBe(true);
    expect(isSupportedLang("es")).toBe(true);
    expect(isSupportedLang("vi")).toBe(true);
    expect(isSupportedLang("ar")).toBe(true);
  });

  it("returns false for unknown values", () => {
    expect(isSupportedLang("de")).toBe(false);
    expect(isSupportedLang("")).toBe(false);
    expect(isSupportedLang("EN")).toBe(false); // case-sensitive
  });
});

describe("parseLangFromPath", () => {
  it("returns default lang with empty base for root", () => {
    expect(parseLangFromPath("/")).toEqual({ lang: "en", base: "" });
  });

  it("returns default lang for un-prefixed paths", () => {
    expect(parseLangFromPath("/products")).toEqual({ lang: "en", base: "" });
    expect(parseLangFromPath("/products/granulator-blades")).toEqual({
      lang: "en",
      base: "",
    });
    expect(parseLangFromPath("/about")).toEqual({ lang: "en", base: "" });
  });

  it("extracts each supported non-default language", () => {
    expect(parseLangFromPath("/es")).toEqual({ lang: "es", base: "/es" });
    expect(parseLangFromPath("/fr")).toEqual({ lang: "fr", base: "/fr" });
    expect(parseLangFromPath("/ru")).toEqual({ lang: "ru", base: "/ru" });
    expect(parseLangFromPath("/vi")).toEqual({ lang: "vi", base: "/vi" });
  });

  it("extracts language from nested paths", () => {
    expect(parseLangFromPath("/es/products")).toEqual({
      lang: "es",
      base: "/es",
    });
    expect(parseLangFromPath("/fr/products/granulator-blades")).toEqual({
      lang: "fr",
      base: "/fr",
    });
    expect(parseLangFromPath("/ru/news/some-article-id")).toEqual({
      lang: "ru",
      base: "/ru",
    });
  });

  it("handles trailing slash on the language segment", () => {
    expect(parseLangFromPath("/es/")).toEqual({ lang: "es", base: "/es" });
  });

  it("does NOT match a similar but longer prefix", () => {
    // "/esoteric" must not be parsed as language "es"
    expect(parseLangFromPath("/esoteric")).toEqual({ lang: "en", base: "" });
    expect(parseLangFromPath("/france")).toEqual({ lang: "en", base: "" });
    expect(parseLangFromPath("/russian-knives")).toEqual({
      lang: "en",
      base: "",
    });
  });

  it("extracts Arabic (RTL) language", () => {
    expect(parseLangFromPath("/ar")).toEqual({ lang: "ar", base: "/ar" });
    expect(parseLangFromPath("/ar/products")).toEqual({ lang: "ar", base: "/ar" });
  });

  it("does NOT match unknown two-letter codes", () => {
    expect(parseLangFromPath("/de/products")).toEqual({ lang: "en", base: "" });
    expect(parseLangFromPath("/zh/products")).toEqual({ lang: "en", base: "" });
  });

  it("ignores admin paths even though no prefix is expected", () => {
    expect(parseLangFromPath("/admin")).toEqual({ lang: "en", base: "" });
    expect(parseLangFromPath("/admin/login")).toEqual({ lang: "en", base: "" });
  });
});

describe("stripLangPrefix", () => {
  it("returns root unchanged", () => {
    expect(stripLangPrefix("/")).toBe("/");
  });

  it("returns un-prefixed paths unchanged", () => {
    expect(stripLangPrefix("/products")).toBe("/products");
    expect(stripLangPrefix("/products/granulator-blades")).toBe(
      "/products/granulator-blades"
    );
  });

  it("strips a leading language segment", () => {
    expect(stripLangPrefix("/es")).toBe("/");
    expect(stripLangPrefix("/es/")).toBe("/");
    expect(stripLangPrefix("/es/products")).toBe("/products");
    expect(stripLangPrefix("/fr/products/granulator-blades")).toBe(
      "/products/granulator-blades"
    );
  });

  it("does not strip false matches", () => {
    expect(stripLangPrefix("/esoteric")).toBe("/esoteric");
    expect(stripLangPrefix("/products/es")).toBe("/products/es"); // 'es' not at start
  });
});

describe("localizedPath", () => {
  it("returns the canonical path unchanged for default lang", () => {
    expect(localizedPath("/", "en")).toBe("/");
    expect(localizedPath("/products", "en")).toBe("/products");
    expect(localizedPath("/products/granulator-blades", "en")).toBe(
      "/products/granulator-blades"
    );
  });

  it("prepends the prefix for non-default languages", () => {
    expect(localizedPath("/", "es")).toBe("/es");
    expect(localizedPath("/products", "es")).toBe("/es/products");
    expect(localizedPath("/products/granulator-blades", "fr")).toBe(
      "/fr/products/granulator-blades"
    );
    expect(localizedPath("/about", "ru")).toBe("/ru/about");
    expect(localizedPath("/contact", "vi")).toBe("/vi/contact");
  });

  it("is idempotent against already-prefixed paths", () => {
    // The language switcher may pass /es/products when switching to fr
    expect(localizedPath("/es/products", "fr")).toBe("/fr/products");
    expect(localizedPath("/es/products", "en")).toBe("/products");
    expect(localizedPath("/fr/", "es")).toBe("/es");
    expect(localizedPath("/es", "en")).toBe("/");
  });

  it("preserves nested product detail and news detail paths", () => {
    expect(localizedPath("/products/twin-shaft-blades-recycling", "fr")).toBe(
      "/fr/products/twin-shaft-blades-recycling"
    );
    expect(localizedPath("/news/some-dispatch-id", "ru")).toBe(
      "/ru/news/some-dispatch-id"
    );
  });
});

describe("round-trip: parse ∘ localize is consistent", () => {
  const canonicalPaths = [
    "/",
    "/products",
    "/products/granulator-blades",
    "/categories/slitter-knives",
    "/plastic-industry",
    "/about",
    "/contact",
    "/news",
    "/news/some-article",
  ];

  for (const path of canonicalPaths) {
    for (const lang of SUPPORTED_LANGS) {
      it(`localize(${path}, ${lang}) → parse → ${lang}`, () => {
        const localized = localizedPath(path, lang);
        const parsed = parseLangFromPath(localized);
        expect(parsed.lang).toBe(lang);
        expect(stripLangPrefix(localized)).toBe(path);
      });
    }
  }
});
