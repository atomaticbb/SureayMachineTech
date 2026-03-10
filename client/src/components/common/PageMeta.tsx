/**
 * PageMeta — thin wrapper over <SEO> that preserves the legacy prop shape.
 * New code should import SEO directly.
 */
import SEO from "./SEO";
import type { ProductData } from "./SEO";

interface PageMetaProps {
  title:       string;
  description: string;
  image?:      string;
  schema?:     { name: string; image: string | string[]; description: string; sku?: string; mpn?: string; brand: { "@type": string; name: string }; offers?: { "@type": string; url?: string; priceCurrency: string; price?: string; priceValidUntil?: string; availability: string; itemCondition?: string }; aggregateRating?: { "@type": string; ratingValue: string | number; ratingCount: string | number; bestRating?: string | number; worstRating?: string | number } } | null;
  siteName?:   string;
}

export default function PageMeta({ title, description, image, schema }: PageMetaProps) {
  const productData: ProductData | undefined = schema
    ? {
        name:        schema.name,
        image:       image ?? (Array.isArray(schema.image) ? schema.image[0] : schema.image),
        description: schema.description,
        sku:         schema.sku,
        mpn:         schema.mpn,
        brand:       schema.brand.name,
        offers:      schema.offers
          ? {
              url:             schema.offers.url,
              priceCurrency:   schema.offers.priceCurrency,
              price:           schema.offers.price,
              priceValidUntil: schema.offers.priceValidUntil,
              availability:    schema.offers.availability,
              itemCondition:   schema.offers.itemCondition,
            }
          : undefined,
        aggregateRating: schema.aggregateRating
          ? {
              ratingValue:  schema.aggregateRating.ratingValue,
              ratingCount:  schema.aggregateRating.ratingCount,
              bestRating:   schema.aggregateRating.bestRating,
              worstRating:  schema.aggregateRating.worstRating,
            }
          : undefined,
      }
    : undefined;

  return <SEO title={title} description={description} productData={productData} />;
}
