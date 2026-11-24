import { beforeAll, describe, expect, it } from "vitest";
import {
  PUBLISHED_LANG_PREFIXES,
  PUBLISHED_LANGS,
  getPageLanguages,
  localizedPath,
} from "@/lib/i18n";
import {
  appendRedirectQuery,
  CATEGORY_REDIRECTS,
  getCategoryRedirect,
  RETIRED_PRODUCT_PATHS,
} from "@shared/catalog-routing";
import {
  getBladeById,
  getBlades,
  getBladesByCategory,
  getCategories,
  getCategoryBySlug,
  getSEO,
  preloadLocale,
} from "./index";
import { bladeDetailPages } from "../blades";
import { BLADE_CATEGORIES } from "../blade-categories";
import type { Blade } from "../blades";
import { blades as publicDetails } from "../../../../scripts/catalog/translation-source";

beforeAll(async () => {
  await Promise.all(PUBLISHED_LANGS.map(preloadLocale));
});

function numericCellsMatch(source: string, translated: string | undefined) {
  // Units and prose can be localized. Bare dimensions and part numbers stay exact.
  if (
    /^SR\d{6}$/.test(source) ||
    (/\d/.test(source) && /^[\d\s.,:*×xØø°/()±+−–—‐%-]+$/.test(source))
  ) {
    expect(translated, source).toBe(source);
  }
}

function productImages(blade: Blade) {
  return {
    image: blade.image,
    pending: blade.imagePending,
    dimensions: blade.imageDimensions,
    gallery: blade.gallery,
    additional: blade.detailLayout?.additionalHeroImages?.map(
      ({ src, dimensions }) => ({ src, dimensions })
    ),
    specification: blade.detailLayout?.specificationImage?.src,
    specificationDimensions: blade.specificationImageDimensions,
    drawings: blade.drawings?.items.map(item => item.image),
    components: blade.components?.map(item => item.image),
  };
}

describe.each(PUBLISHED_LANG_PREFIXES)(
  "localized technical data in %s",
  lang => {
    it.each(publicDetails)(
      "preserves the published facts, images and FAQ for $id",
      source => {
        const blade = getBladeById(source.id, lang)!;
        expect(blade, source.id).toBeDefined();
        expect(productImages(blade)).toEqual(productImages(source));
        expect(blade.relatedBladeIds).toEqual(source.relatedBladeIds);
        expect(blade.compatibleMachines).toEqual(source.compatibleMachines);
        expect(
          blade.components?.map(c => [c.id, c.link, c.relatedBladeIds])
        ).toEqual(
          source.components?.map(c => [c.id, c.link, c.relatedBladeIds])
        );

        const dimensions = blade.standardDimensions ?? [];
        expect(dimensions).toHaveLength(source.standardDimensions?.length ?? 0);
        for (const [index, row] of (
          source.standardDimensions ?? []
        ).entries()) {
          const actual = dimensions[index];
          expect(actual.itemNo).toBe(row.itemNo);
          for (const key of Object.keys(row) as (keyof typeof row)[]) {
            numericCellsMatch(row[key]!, actual[key]);
          }
        }

        const tables = blade.detailLayout?.dimensionTables ?? [];
        expect(tables.map(t => t.id)).toEqual(
          source.detailLayout?.dimensionTables.map(t => t.id) ?? []
        );
        (source.detailLayout?.dimensionTables ?? []).forEach((table, i) => {
          expect(tables[i].columns).toHaveLength(table.columns.length);
          expect(tables[i].rows).toHaveLength(table.rows.length);
          table.rows.forEach((row, r) => {
            expect(tables[i].rows[r]).toHaveLength(row.length);
            row.forEach((value, c) =>
              numericCellsMatch(value, tables[i].rows[r][c])
            );
          });
        });

        for (const [reference, translated] of [
          [source.specs, blade.specs],
          [
            source.detailLayout?.heroSpecs ?? [],
            blade.detailLayout?.heroSpecs ?? [],
          ],
          [
            source.detailLayout?.technicalSpecs ?? [],
            blade.detailLayout?.technicalSpecs ?? [],
          ],
        ]) {
          expect(translated).toHaveLength(reference.length);
          reference.forEach((spec, i) =>
            numericCellsMatch(spec.value, translated[i].value)
          );
        }

        for (const group of ["technical", "company"] as const) {
          const faq = blade.faqs?.[group] ?? [];
          const reference = source.faqs?.[group] ?? [];
          expect(faq).toHaveLength(reference.length);
          reference.forEach((entry, i) => {
            for (const field of ["question", "answer"] as const) {
              expect(faq[i][field].trim()).not.toBe("");
              expect(faq[i][field]).not.toBe(entry[field]);
              const destinations = (value: string) =>
                [...value.matchAll(/\]\((\/[^)]+)\)/g)].map(match => match[1]);
              expect(destinations(faq[i][field])).toEqual(
                destinations(entry[field])
              );
            }
          });
        }
      }
    );
  }
);

describe.each(PUBLISHED_LANGS)("published industrial catalog in %s", lang => {
  it("publishes all seven hubs with identical membership and product URLs", () => {
    expect(
      getCategories(lang)
        .map(c => c.slug)
        .sort()
    ).toEqual(BLADE_CATEGORIES.map(c => c.slug).sort());
    for (const english of BLADE_CATEGORIES) {
      const category = getCategoryBySlug(english.slug, lang)!;
      expect(category.category).toBe(english.category);
      expect(
        getBladesByCategory(category.category, lang)
          .map(b => b.link)
          .sort()
      ).toEqual(
        getBladesByCategory(english.category, "en")
          .map(b => b.link)
          .sort()
      );
      expect(getPageLanguages(`/categories/${category.slug}`)).toEqual(
        PUBLISHED_LANGS
      );
    }
    expect(getBladesByCategory("shredder_blades", lang)).toHaveLength(8);
    expect(getBladesByCategory("shear_blades", lang)).toHaveLength(5);
    expect(getBladesByCategory("paper_cutting", lang)).toHaveLength(4);
    expect(getBladesByCategory("custom_profile", lang)).toHaveLength(5);
  });

  it("serves every public blade detail while keeping box V-grooving off the grid", () => {
    for (const source of bladeDetailPages) {
      const blade = getBladeById(source.id, lang);
      expect(blade?.link, source.id).toBe(source.link);
      expect(
        getPageLanguages(localizedPath(`/products/${source.id}`, lang))
      ).toEqual(PUBLISHED_LANGS);
    }
    expect(getBlades(lang).some(b => b.id === "box-slotting-knives")).toBe(
      false
    );
    expect(
      getBlades(lang).some(b => b.id === "corrugated-slotter-knives")
    ).toBe(true);
  });

  it("excludes withdrawn pages and keeps the filter-rod draft out of public listings", () => {
    const products = getBlades(lang);
    for (const route of RETIRED_PRODUCT_PATHS) {
      const id = route.split("/").pop()!;
      expect(getBladeById(id, lang)).toBeUndefined();
      expect(
        products.some(product => product.relatedBladeIds?.includes(id))
      ).toBe(false);
      expect(getPageLanguages(localizedPath(route, lang))).toEqual([]);
    }
    expect(
      products.some(product => product.id === "filter-rod-cutting-blades")
    ).toBe(false);
    if (lang !== "en")
      expect(getBladeById("filter-rod-cutting-blades", lang)).toBeUndefined();
  });

  it("reclassifies each former granulator product in place", () => {
    expect(getBladeById("granulator-blades", lang)?.category).toBe(
      "shredder_blades"
    );
    for (const id of [
      "strand-pelletizer-rotors",
      "continuous-melt-filter-scraper-blades",
      "cutter-compactor-blades",
      "die-face-cutting-knives",
    ]) {
      const blade = getBladeById(id, lang);
      expect(blade?.category).toBe("custom_profile");
      expect(blade?.link).toBe(`/products/${id}`);
    }
    expect(getBladeById("paper-cutting-blades", lang)?.category).toBe(
      "paper_cutting"
    );
    expect(getBladeById("three-knife-trimmer-blades", lang)?.category).toBe(
      "paper_cutting"
    );
  });
});

describe.each(PUBLISHED_LANG_PREFIXES)("localized migrated SEO in %s", lang => {
  it("uses the translated technical metadata for Cutter Compactor Blades", () => {
    const blade = getBladeById("cutter-compactor-blades", lang)!;
    const seo = getSEO(blade.id, lang);
    expect(seo.title).toBe(
      blade.seoTitle ||
        blade.detailLayout?.seoTitle ||
        blade.fullName ||
        blade.name
    );
    expect(seo.description).toBe(blade.seoDescription || blade.description);
    expect(seo.title).not.toBe(getSEO(blade.id, "en").title);
    expect(seo.description).not.toBe(getSEO(blade.id, "en").description);
  });
});

describe("localized category migrations", () => {
  for (const prefix of [
    "",
    "/en",
    ...PUBLISHED_LANG_PREFIXES.map(lang => `/${lang}`),
  ]) {
    it(`redirects ${prefix || "default"} old category URLs, preserving query before hash`, () => {
      const canonicalPrefix = prefix === "/en" ? "" : prefix;
      for (const { from, to } of CATEGORY_REDIRECTS) {
        for (const slash of ["", "/"]) {
          const target = getCategoryRedirect(prefix + from + slash)!;
          expect(target).toBe(canonicalPrefix + to);
          expect(appendRedirectQuery(target, "?part=A%2FB")).toBe(
            canonicalPrefix +
              to.split("#")[0] +
              "?part=A%2FB" +
              (to.includes("#") ? `#${to.split("#")[1]}` : "")
          );
        }
        expect(getPageLanguages(prefix + from)).toEqual([]);
      }
    });
  }
});
