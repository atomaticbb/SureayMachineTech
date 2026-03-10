import { Helmet } from "react-helmet-async";

const BRAND    = "Sureay Machinery";
const BASE_URL = "https://www.sureay.com";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProductData {
  name:        string;
  image:       string;   // relative (/images/…) or absolute
  description: string;
  sku?:        string;
  mpn?:        string;
  brand?:      string;   // defaults to "Sureay"
  offers?: {
    url?:             string;
    priceCurrency?:   string;
    price?:           string;
    priceValidUntil?: string;
    availability?:    string;
    itemCondition?:   string;
  };
  aggregateRating?: {
    ratingValue:  string | number;
    ratingCount:  string | number;
    bestRating?:  string | number;
    worstRating?: string | number;
  };
}

export interface SEOProps {
  title:        string;
  description:  string;
  canonicalUrl?: string;
  productData?:  ProductData;
  noIndex?:      boolean;
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
}: SEOProps) {
  const fullTitle      = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
  const canonicalHref  = canonicalUrl ? abs(canonicalUrl) : undefined;
  const ogImage        = productData ? abs(productData.image) : undefined;

  const jsonLd = productData
    ? {
        "@context": "https://schema.org",
        "@type":    "Product",
        name:        productData.name,
        image:       [abs(productData.image)],
        description: productData.description,
        ...(productData.sku && { sku: productData.sku }),
        ...(productData.mpn && { mpn: productData.mpn }),
        brand: {
          "@type": "Brand",
          name:    productData.brand ?? "Sureay",
        },
        ...(productData.offers && {
          offers: { "@type": "Offer", ...productData.offers },
        }),
        ...(productData.aggregateRating && {
          aggregateRating: { "@type": "AggregateRating", ...productData.aggregateRating },
        }),
      }
    : null;

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}

      {/* Open Graph */}
      <meta property="og:type"        content={productData ? "product" : "website"} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name"   content={BRAND} />
      {canonicalHref && <meta property="og:url"   content={canonicalHref} />}
      {ogImage        && <meta property="og:image" content={ogImage} />}

      {/* JSON-LD Product schema */}
      {jsonLd && (
        <script type="application/ld+json">{safeJson(jsonLd)}</script>
      )}
    </Helmet>
  );
}
