/**
 * PageMeta — thin wrapper over <SEO> that preserves the legacy prop shape.
 * New code should import SEO directly.
 */
import SEO from "./SEO";
import type { ProductData } from "./SEO";

interface PageMetaProps {
  title: string;
  description: string;
  image?: string;
  schema?: {
    name: string;
    image: string | string[];
    description: string;
    sku?: string;
    mpn?: string;
    brand: { "@type": string; name: string };
  } | null;
  siteName?: string;
}

export default function PageMeta({
  title,
  description,
  image,
  schema,
}: PageMetaProps) {
  const productData: ProductData | undefined = schema
    ? {
        name: schema.name,
        image:
          image ??
          (Array.isArray(schema.image) ? schema.image[0] : schema.image),
        description: schema.description,
        sku: schema.sku,
        mpn: schema.mpn,
        brand: schema.brand.name,
      }
    : undefined;

  return (
    <SEO title={title} description={description} productData={productData} />
  );
}
