import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLang } from "@/contexts/LangContext";
import {
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  localizedPath,
  type Lang,
} from "@/lib/i18n";

const BRAND = "Sureay";
const BASE_URL = "https://sureay.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/hero/homehero.webp`;

// One trailing brand segment: "| Sureay", "| Sureay Machinery",
// "| Sureay Blades", optionally with " Technology". Stripped repeatedly so an
// already-doubled suffix collapses before we re-append the canonical one.
const TRAILING_BRAND =
  /\s*\|\s*Sureay(?:\s+(?:Machinery|Blades))?(?:\s+Technology)?\s*$/i;

function isLikelyI18nKey(value: string): boolean {
  // Matches dotted keys like "industry.plastic.seo.title".
  return /^[a-z0-9_-]+(?:\.[a-z0-9_-]+){2,}$/i.test(value.trim());
}

function normalizeTitle(rawTitle: string): string {
  let title = rawTitle.trim();
  if (!title || isLikelyI18nKey(title)) {
    return BRAND;
  }

  // Collapse any (even doubled) trailing brand suffix, then append exactly one.
  while (TRAILING_BRAND.test(title)) {
    title = title.replace(TRAILING_BRAND, "").trim();
  }

  return title ? `${title} | ${BRAND}` : BRAND;
}

function dirForLang(lang: Lang): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProductData {
  name: string;
  image: string; // relative (/images/…) or absolute
  images?: string[]; // additional gallery images
  description: string;
  sku?: string;
  mpn?: string;
  brand?: string; // defaults to "Sureay"
  material?: string; // e.g. "D2 / SKD11 / M2 HSS"
  specs?: { label: string; value: string }[];
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
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Additional JSON-LD blocks to inject (e.g. ItemList on the homepage).
   *  Pass already-stringified JSON, one entry per script tag. */
  extraJsonLd?: string[];
  /** Route-scoped LCP image preload (relative path, e.g. "/images/hero/homehero.webp").
   *  Only set this on the one page where the image is actually the LCP candidate. */
  preloadImage?: string;
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
  ogImage,
  noIndex = false,
  keywords,
  breadcrumbs,
  extraJsonLd,
  preloadImage,
}: SEOProps) {
  const lang = useLang();
  const fullTitle = normalizeTitle(title);

  // English-only sections — no language prefix or multilingual hreflang.
  // News, Mixer Wear Parts, Privacy Policy, and Terms exist only in English.
  const isNewsPath =
    canonicalUrl === "/news" || (canonicalUrl?.startsWith("/news/") ?? false);
  const isMixerPath = canonicalUrl?.startsWith("/mixer-wear-parts") ?? false;
  const isLegalPath =
    canonicalUrl === "/privacy-policy" || canonicalUrl === "/terms";
  const isEnglishOnly = isNewsPath || isMixerPath || isLegalPath;

  // Canonical for the CURRENT page (lang-localized). Callers pass the
  // language-agnostic canonical (e.g. "/products/granulator-blades") and
  // we prepend the active language prefix.
  const canonicalHref = canonicalUrl
    ? abs(isEnglishOnly ? canonicalUrl : localizedPath(canonicalUrl, lang))
    : undefined;

  // hreflang alternates — one link per supported language plus x-default.
  // English-only sections (news, mixer) are excluded: no localized variants.
  const hreflangs =
    canonicalUrl && !isEnglishOnly
      ? SUPPORTED_LANGS.map(altLang => ({
          lang: altLang,
          href: abs(localizedPath(canonicalUrl, altLang)),
        }))
      : [];

  const resolvedOgImage = productData
    ? abs(productData.image)
    : ogImage
      ? abs(ogImage)
      : DEFAULT_OG_IMAGE;

  const allImages = productData
    ? [
        abs(productData.image),
        ...(productData.images ?? [])
          .map(abs)
          .filter(u => u !== abs(productData.image)),
      ]
    : [];

  const jsonLd = productData
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productData.name,
        url: canonicalHref,
        image: allImages,
        description: productData.description,
        ...(productData.sku && { sku: productData.sku }),
        ...(productData.mpn && { mpn: productData.mpn }),
        ...(productData.material && { material: productData.material }),
        ...(productData.specs &&
          productData.specs.length > 0 && {
            additionalProperty: productData.specs.map(spec => ({
              "@type": "PropertyValue",
              name: spec.label,
              value: spec.value,
            })),
          }),
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
                  minValue: 1,
                  maxValue: 15,
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
          item: abs(localizedPath(item.url, lang)),
        })),
      }
    : null;

  // Direct fallback: set document.title even if Helmet effects stall (React 19 + headless)
  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  // og:locale is the BCP-47 format ("es" → "es_ES"). Keep the mapping local
  // to this component; covers the 6 launch languages.
  const ogLocale: Record<Lang, string> = {
    en: "en_US",
    es: "es_ES",
    fr: "fr_FR",
    ru: "ru_RU",
    vi: "vi_VN",
    ar: "ar_AE",
  };

  return (
    <Helmet>
      {/* Document-level — drives <html lang/dir> for screen readers and CSS */}
      <html lang={lang} dir={dirForLang(lang)} />

      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
      {preloadImage && (
        <link
          rel="preload"
          href={abs(preloadImage)}
          as="image"
          type="image/webp"
        />
      )}

      {/* hreflang alternates — one per supported language + x-default → English */}
      {hreflangs.map(({ lang: alt, href }) => (
        <link key={alt} rel="alternate" hrefLang={alt} href={href} />
      ))}
      {canonicalUrl && !isEnglishOnly && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={abs(localizedPath(canonicalUrl, DEFAULT_LANG))}
        />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={productData ? "product" : "website"} />
      <meta property="og:locale" content={ogLocale[lang]} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={BRAND} />
      {canonicalHref && <meta property="og:url" content={canonicalHref} />}
      <meta property="og:image" content={resolvedOgImage} />

      {/* JSON-LD Product schema */}
      {jsonLd && <script type="application/ld+json">{safeJson(jsonLd)}</script>}

      {/* JSON-LD Breadcrumb schema */}
      {breadcrumbLd && (
        <script type="application/ld+json">{safeJson(breadcrumbLd)}</script>
      )}

      {/* Caller-supplied JSON-LD (e.g. homepage ItemList) — kept inside the
          single Helmet instance so the page never needs a second one. */}
      {extraJsonLd?.map((block, i) => (
        <script key={i} type="application/ld+json">
          {block.replace(/</g, "\\u003c")}
        </script>
      ))}
    </Helmet>
  );
}
