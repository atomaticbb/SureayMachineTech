import { describe, expect, it } from "vitest";
import { bladeDetailPages } from "./blades";
import { getSEO } from "../utils/seo-config";

describe("English product SEO acceptance", () => {
  it("uses the catalog as the source of unique product titles and descriptions", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const headings = new Set<string>();

    for (const blade of bladeDetailPages) {
      const seo = getSEO(blade.id);
      const catalogTitle = blade.seoTitle || blade.detailLayout?.seoTitle;
      expect(catalogTitle, blade.id).toBeTruthy();
      expect(seo.title, blade.id).toBe(catalogTitle);
      expect(seo.description, blade.id).toBe(
        blade.seoDescription ?? blade.description
      );
      expect(seo.title, blade.id).not.toMatch(/\|\s*Sureay\s*$/i);
      titles.add(seo.title!);
      descriptions.add(seo.description!);
      headings.add(blade.detailLayout?.heroTitle || blade.fullName);
    }

    expect(titles.size).toBe(bladeDetailPages.length);
    expect(descriptions.size).toBe(bladeDetailPages.length);
    expect(headings.size).toBe(bladeDetailPages.length);
  });

  it("provides six to eight distinct technical questions without a company column", () => {
    for (const blade of bladeDetailPages) {
      expect(blade.faqs, blade.id).toBeDefined();
      const { technical, company } = blade.faqs!;
      expect(technical.length, blade.id).toBeGreaterThanOrEqual(6);
      expect(technical.length, blade.id).toBeLessThanOrEqual(8);
      expect(company, blade.id).toEqual([]);
      expect(new Set(technical.map(item => item.question)).size, blade.id).toBe(
        technical.length
      );
      for (const item of technical) {
        expect(item.question.trim(), blade.id).toMatch(/\?$/);
        expect(item.answer.trim(), `${blade.id}: ${item.question}`).not.toBe(
          ""
        );
      }
    }
  });
});
