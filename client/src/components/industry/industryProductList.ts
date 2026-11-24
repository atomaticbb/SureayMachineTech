import { getBladeOffer, type Blade } from "@/data/blades";
import { localizedPath, type Lang } from "@/lib/i18n";

export function industryProductList(
  blades: Blade[],
  name: string,
  path: string,
  lang: Lang
) {
  const origin = "https://sureay.com";
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: origin + localizedPath(path, lang),
    numberOfItems: blades.length,
    itemListElement: blades.map((blade, index) => {
      const url = origin + localizedPath(blade.link, lang);
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: blade.name,
          description: blade.description,
          url,
          ...(!blade.imagePending && { image: origin + blade.image }),
          brand: { "@type": "Brand", name: "Sureay" },
          offers: { ...getBladeOffer(blade.id), url },
        },
      };
    }),
  });
}
