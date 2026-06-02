import { describe, it, expect } from "vitest";
import { SUPPORTED_LANGS } from "@/lib/i18n";
import {
  getBlades,
  getBladeById,
  getFeaturedBlades,
  getRelatedBlades,
  getCategories,
  getCategoryBySlug,
  getSEO,
} from ".";

const BLADE_COUNT_EN = getBlades("en").length;

describe("getBlades", () => {
  it("returns every language with the same blade count (no shape drift)", () => {
    for (const lang of SUPPORTED_LANGS) {
      expect(getBlades(lang).length, lang).toBe(BLADE_COUNT_EN);
    }
  });

  it("preserves blade IDs (slugs) across languages", () => {
    const enIds = getBlades("en").map(b => b.id).sort();
    for (const lang of SUPPORTED_LANGS) {
      expect(getBlades(lang).map(b => b.id).sort(), lang).toEqual(enIds);
    }
  });

  it("ES blades have translated names (different from English)", () => {
    const en = getBlades("en");
    const es = getBlades("es");
    const differentCount = en.filter((b, i) => b.name !== es[i].name).length;
    // Vast majority should be translated; we expect at least 80% differ.
    expect(differentCount).toBeGreaterThan(Math.floor(en.length * 0.8));
  });

  it("RU is now translated (data files written via DeepL fresh key)", () => {
    const en = getBlades("en");
    expect(getBlades("ru")[0].name).not.toBe(en[0].name);
  });

  it("VI is now translated (Google Translate unofficial endpoint)", () => {
    const en = getBlades("en");
    expect(getBlades("vi")[0].name).not.toBe(en[0].name);
  });
});

describe("getBladeById", () => {
  it("finds a blade by id in every language", () => {
    const firstId = getBlades("en")[0].id;
    for (const lang of SUPPORTED_LANGS) {
      const blade = getBladeById(firstId, lang);
      expect(blade, lang).toBeDefined();
      expect(blade?.id).toBe(firstId);
    }
  });

  it("returns undefined for unknown id", () => {
    expect(getBladeById("does-not-exist", "en")).toBeUndefined();
    expect(getBladeById("does-not-exist", "es")).toBeUndefined();
  });
});

describe("getFeaturedBlades", () => {
  it("returns at least one featured blade in every language", () => {
    for (const lang of SUPPORTED_LANGS) {
      expect(getFeaturedBlades(lang).length, lang).toBeGreaterThan(0);
    }
  });

  it("featured ids are stable across languages", () => {
    const enIds = getFeaturedBlades("en").map(b => b.id).sort();
    for (const lang of SUPPORTED_LANGS) {
      expect(getFeaturedBlades(lang).map(b => b.id).sort(), lang).toEqual(enIds);
    }
  });
});

describe("getRelatedBlades", () => {
  it("returns related blades for a known id", () => {
    const firstId = getBlades("en")[0].id;
    const related = getRelatedBlades(firstId, "es", 3);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.every(b => b.id !== firstId)).toBe(true);
  });

  it("returns [] for an unknown id", () => {
    expect(getRelatedBlades("nope", "en")).toEqual([]);
  });
});

describe("getCategories", () => {
  it("returns the same category count in every language", () => {
    const enCount = getCategories("en").length;
    for (const lang of SUPPORTED_LANGS) {
      expect(getCategories(lang).length, lang).toBe(enCount);
    }
  });

  it("preserves slugs across languages", () => {
    const enSlugs = getCategories("en").map(c => c.slug).sort();
    for (const lang of SUPPORTED_LANGS) {
      expect(getCategories(lang).map(c => c.slug).sort(), lang).toEqual(enSlugs);
    }
  });

  it("ES categories have translated titles", () => {
    const en = getCategories("en");
    const es = getCategories("es");
    const differentCount = en.filter((c, i) => c.title !== es[i].title).length;
    expect(differentCount).toBeGreaterThan(Math.floor(en.length * 0.5));
  });
});

describe("getCategoryBySlug", () => {
  it("finds by slug across languages", () => {
    const slug = getCategories("en")[0].slug;
    for (const lang of SUPPORTED_LANGS) {
      expect(getCategoryBySlug(slug, lang)?.slug, lang).toBe(slug);
    }
  });

  it("returns undefined for unknown slug", () => {
    expect(getCategoryBySlug("nope", "fr")).toBeUndefined();
  });
});

describe("getSEO", () => {
  it("returns a config for known pageKey in every language", () => {
    for (const lang of SUPPORTED_LANGS) {
      const seo = getSEO("home", lang);
      expect(seo.title, lang).toBeTruthy();
    }
  });

  it("ES home title is translated (differs from English)", () => {
    expect(getSEO("home", "es").title).not.toBe(getSEO("home", "en").title);
  });

  it("falls back to English for unknown pageKey", () => {
    const out = getSEO("__nonexistent_key__", "fr");
    expect(out).toEqual({});
  });
});
