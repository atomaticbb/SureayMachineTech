import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { BLADE_CATEGORIES } from "./blade-categories";
import { getDispatchById } from "./news";

describe("English category selection guides", () => {
  it("links every non-Slitter hub to distinct published technical articles", () => {
    const categories = BLADE_CATEGORIES.filter(
      category => category.slug !== "slitter-knives"
    );
    expect(categories).toHaveLength(6);
    for (const category of categories) {
      const guide = category.selectionGuide;
      expect(guide?.title, category.slug).toBeTruthy();
      expect(guide?.articles.length, category.slug).toBeGreaterThan(0);
      const ids = guide!.articles.map(article => article.id);
      expect(new Set(ids).size, category.slug).toBe(ids.length);
      for (const id of ids) {
        expect(getDispatchById(id)?.content.length, id).toBeGreaterThan(0);
      }
    }
  });

  it("uses measured WebP article covers with matching responsive candidates", async () => {
    const publicFile = (src: string) =>
      fileURLToPath(new URL(`../../public${src}`, import.meta.url));
    for (const category of BLADE_CATEGORIES) {
      for (const entry of category.selectionGuide?.articles ?? []) {
        const image = entry.image ?? getDispatchById(entry.id)!.image;
        const original = await sharp(publicFile(image)).metadata();
        expect(original.format, image).toBe("webp");
        expect([original.width, original.height], image).toEqual([
          entry.width,
          entry.height,
        ]);
        expect(entry.smallerWidths.length, image).toBeGreaterThan(0);
        for (const width of entry.smallerWidths) {
          const candidate = image.replace(/\.webp$/, `-${width}w.webp`);
          const resized = await sharp(publicFile(candidate)).metadata();
          expect(resized.format, candidate).toBe("webp");
          expect(resized.width, candidate).toBe(width);
          expect(resized.hasAlpha, candidate).toBe(original.hasAlpha);
          expect(
            Math.abs(resized.height! - (entry.height * width) / entry.width),
            candidate
          ).toBeLessThanOrEqual(1);
        }
      }
    }
  });
});
