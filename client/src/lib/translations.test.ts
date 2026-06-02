import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  translate,
  _setDictionaryForTest,
  _getDictionaryForTest,
} from "./translations";
import type { Lang } from "./i18n";

const SNAPSHOT: Partial<Record<Lang, Record<string, string>>> = {};

describe("translate", () => {
  beforeEach(() => {
    // Snapshot the real (loaded-from-JSON) dictionaries so individual tests
    // can mutate them in isolation.
    (["en", "es", "fr", "ru", "vi"] as const).forEach(lang => {
      SNAPSHOT[lang] = { ..._getDictionaryForTest(lang) };
    });
  });

  afterEach(() => {
    (["en", "es", "fr", "ru", "vi"] as const).forEach(lang => {
      _setDictionaryForTest(lang, SNAPSHOT[lang]!);
    });
  });

  it("returns the English value when lang is en", () => {
    expect(translate("nav.home", "en")).toBe("Home");
    expect(translate("nav.products", "en")).toBe("Products");
    expect(translate("cta.getQuote", "en")).toBe("GET A QUOTE");
  });

  it("returns the translated value for all populated dictionaries", () => {
    // All five launch languages have populated dictionaries now.
    expect(translate("nav.home", "en")).toBe("Home");
    expect(translate("nav.home", "es")).not.toBe("Home"); // Inicio
    expect(translate("nav.home", "fr")).not.toBe("Home"); // Accueil
    expect(translate("nav.home", "ru")).not.toBe("Home"); // Главная
    expect(translate("nav.home", "vi")).not.toBe("Home"); // Trang chủ
  });

  it("uses the localized value when present, otherwise English", () => {
    _setDictionaryForTest("es", { "nav.home": "Inicio" });

    expect(translate("nav.home", "es")).toBe("Inicio");
    expect(translate("nav.products", "es")).toBe("Products"); // fallback
    expect(translate("nav.home", "en")).toBe("Home"); // unchanged
  });

  it("returns the key itself when no language has it", () => {
    expect(translate("nonexistent.key", "en")).toBe("nonexistent.key");
    expect(translate("nonexistent.key", "fr")).toBe("nonexistent.key");
  });

  it("never returns undefined or empty string for known keys", () => {
    const keys = [
      "nav.home",
      "nav.products",
      "nav.industry",
      "nav.news",
      "nav.about",
      "nav.contact",
      "cta.getQuote",
      "common.loading",
      "common.allProducts",
      "footer.rights",
    ];
    for (const key of keys) {
      for (const lang of ["en", "es", "fr", "ru", "vi"] as const) {
        const value = translate(key, lang);
        expect(value, `${key} in ${lang}`).toBeTruthy();
        expect(typeof value).toBe("string");
      }
    }
  });

  it("treats empty-string values in dictionary as missing (key-fallback)", () => {
    // ?? falls through nullish only — empty strings DO win against the
    // English fallback. Document this behavior so future translation files
    // don't accidentally ship empty strings.
    _setDictionaryForTest("es", { "nav.home": "" });
    expect(translate("nav.home", "es")).toBe("");
    // The behavior above means W2's translation script MUST filter empty
    // strings before writing the JSON. Tracked in Task 2.4 validation.
  });
});
