import path from "node:path";
import { describe, expect, it } from "vitest";
import { blades } from "../../client/src/data/blades";
import { getIndustryBlades } from "../../client/src/data/industry-blades";
import { buildFullCatalogHtml } from "./html-builder";
import { blades as detailBlades } from "./translation-source";

describe("printed blade catalog", () => {
  it("keeps the cross-listed bottom knives in both applicable industry booklets", () => {
    for (const sector of ["metal", "paper"] as const) {
      const ids = getIndustryBlades(blades, sector).map(blade => blade.id);
      expect(
        ids.filter(id => id === "bottom-grooved-anvil-knives")
      ).toHaveLength(1);
    }
  });

  it("prints each listed product exactly once, including wood and custom blades", async () => {
    const listedIds = new Set(blades.map(blade => blade.id));
    const products = detailBlades.filter(blade => listedIds.has(blade.id));
    const publicDir = path.resolve("client/public");
    const html = await buildFullCatalogHtml(
      products,
      publicDir,
      path.join(publicDir, "sureay-logo.svg")
    );
    expect(html).toContain('<html lang="en">');
    expect(html).toContain("Industrial Blade Catalog");
    const printed = [...html.matchAll(/id="product-([^"]+)"/g)].map(
      match => match[1]
    );
    expect(printed.sort()).toEqual(blades.map(blade => blade.id).sort());
    for (const blade of products) {
      expect(html).toContain(
        `href="https://sureay.com/products/${blade.id}"`
      );
    }
    expect(html).toContain("SR001154");
    expect(html).toContain("SR006101");
  }, 30_000);
});
