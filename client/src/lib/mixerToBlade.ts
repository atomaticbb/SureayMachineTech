import type { Blade } from "@/data/blades";
import type { MixerPart } from "@/data/mixerParts";

/**
 * Adapts a MixerPart to the `Blade` shape so the mixer pages can reuse the
 * generic, data-driven blade components (DecisiveSpecs, TechnicalAudit,
 * ProductGrid, ProductCard) without modifying them.
 *
 * `category` / `sector` are placeholders only — none of the reused components
 * read them, and mixer filtering uses MixerPart.category directly. `link`
 * already points at /mixer-wear-parts/:slug/:id, so every reused link stays
 * inside the mixer topic cluster and never cross-links to blade products.
 */
export function mixerToBlade(part: MixerPart): Blade {
  return {
    id: part.id,
    name: part.name,
    fullName: part.fullName,
    category: "custom_profile",
    sector: "other",
    categoryDisplay: part.categoryDisplay,
    image: part.image,
    gallery: part.gallery,
    description: part.description,
    fullDescription: part.fullDescription,
    link: part.link,
    specs: part.specs,
    components: part.components,
    compatibleMachines: part.compatibleMachines,
    badge: part.badge,
    badgeColor: part.badgeColor,
    isFeatured: part.isFeatured,
  };
}
