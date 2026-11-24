import type { Blade, BladeSectorType } from "./blades";

export type CatalogIndustry = Exclude<BladeSectorType, "other">;

/** Use the same product selection and order on industry pages and in their PDFs. */
export function getIndustryBlades(
  blades: Blade[],
  sector: CatalogIndustry
): Blade[] {
  const primary = blades.filter(blade =>
    sector === "wood"
      ? blade.category === "wood_chipper"
      : blade.sector === sector
  );

  if (sector !== "metal" && sector !== "paper") return primary;

  // Both industries also use the converting catalog's grooved bottom knives.
  return primary.concat(
    blades.filter(
      blade =>
        blade.id === "bottom-grooved-anvil-knives" && !primary.includes(blade)
    )
  );
}
