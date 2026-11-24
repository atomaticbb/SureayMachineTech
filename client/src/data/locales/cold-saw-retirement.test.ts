import { beforeAll, describe, expect, it } from "vitest";
import { getPageLanguages, localizedPath, SUPPORTED_LANGS } from "@/lib/i18n";
import {
  getBladeById,
  getBlades,
  getCategories,
  getRelatedBlades,
  preloadLocale,
} from "./index";

beforeAll(async () => {
  await Promise.all(SUPPORTED_LANGS.map(preloadLocale));
});

describe("retired Cold Saw catalog entries", () => {
  it.each(SUPPORTED_LANGS)(
    "removes product and category entries in %s",
    lang => {
      expect(getBladeById("metal-cold-saw-blades", lang)).toBeUndefined();
      expect(getCategories(lang).some(c => c.slug === "cold-saw-blades")).toBe(
        false
      );
      for (const blade of getBlades(lang)) {
        expect(getRelatedBlades(blade.id, lang).map(b => b.id)).not.toContain(
          "metal-cold-saw-blades"
        );
      }
    }
  );
});

describe("Slotter product routes", () => {
  it.each(SUPPORTED_LANGS)("keeps the greyboard product in %s", lang => {
    const box = "/products/box-slotting-knives";
    expect(getBladeById("box-slotting-knives", lang)?.id).toBe(
      "box-slotting-knives"
    );
    expect(localizedPath(box, lang)).toBe(
      lang === "en" ? box : `/${lang}${box}`
    );
    expect(getPageLanguages(box)).toContain(lang);
    expect(getBladeById("corrugated-slotter-knives", lang)?.id).toBe(
      "corrugated-slotter-knives"
    );
  });

  it("advertises a separate corrugated knife page in each language", () => {
    expect(getPageLanguages("/products/corrugated-slotter-knives")).toEqual(
      SUPPORTED_LANGS
    );
  });
});
