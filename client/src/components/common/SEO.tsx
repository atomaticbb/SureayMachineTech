import { Helmet } from "react-helmet-async";

const BRAND = "Sureay Machinery";
const BASE_URL = "https://sureay.com";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProductData {
  name: string;
  image: string; // relative (/images/…) or absolute
  description: string;
  sku?: string;
  mpn?: string;
  brand?: string; // defaults to "Sureay"
  offers?: {
    lowPrice: number;
    highPrice: number;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  productData?: ProductData;
  noIndex?: boolean;
  keywords?: string;
  breadcrumbs?: BreadcrumbItem[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Prevent </script> injection inside JSON-LD blocks. */
function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SEO({
  title,
  description,
  canonicalUrl,
  productData,
  noIndex = false,
  keywords,
  breadcrumbs,
}: SEOProps) {
  const fullTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
  const canonicalHref = canonicalUrl ? abs(canonicalUrl) : undefined;
  const ogImage = productData ? abs(productData.image) : undefined;

  const jsonLd = productData
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productData.name,
        image: [abs(productData.image)],
        description: productData.description,
        ...(productData.sku && { sku: productData.sku }),
        ...(productData.mpn && { mpn: productData.mpn }),
        brand: {
          "@type": "Brand",
          name: productData.brand ?? "Sureay",
        },
        ...(productData.offers && {
          offers: {
            "@type": "AggregateOffer",
            lowPrice: productData.offers.lowPrice,
            highPrice: productData.offers.highPrice,
            priceCurrency: "USD",
            offerCount: "1",
            availability: "https://schema.org/InStock",
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingDestination: {
                "@type": "DefinedRegion",
                addressCountry: "US",
              },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 15,
                  maxValue: 25,
                  unitCode: "DAY",
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 5,
                  maxValue: 12,
                  unitCode: "DAY",
                },
              },
            },
          },
        }),
      }
    : null;

  const breadcrumbLd = breadcrumbs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: abs(item.url),
        })),
      }
    : null;

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}

      {/* Open Graph */}
      <meta property="og:type" content={productData ? "product" : "website"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={BRAND} />
      {canonicalHref && <meta property="og:url" content={canonicalHref} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* JSON-LD Product schema */}
      {jsonLd && <script type="application/ld+json">{safeJson(jsonLd)}</script>}

      {/* JSON-LD Breadcrumb schema */}
      {breadcrumbLd && (
        <script type="application/ld+json">{safeJson(breadcrumbLd)}</script>
      )}
    </Helmet>
  );
}
