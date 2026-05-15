/**
 * product-schema.ts
 * Generate JSON-LD structured data for product pages
 * https://schema.org/Product
 */

import type { Blade } from "@/data/blades";

export interface ProductSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  brand: {
    "@type": string;
    name: string;
  };
  manufacturer: {
    "@type": string;
    name: string;
    url: string;
    address: {
      "@type": string;
      addressCountry: string;
      addressRegion: string;
      addressLocality: string;
    };
  };
  image: string[];
  offers?: {
    "@type": string;
    availability: string;
    priceCurrency?: string;
    price?: string;
    url: string;
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: string;
  };
}

/**
 * Generate Product Schema JSON-LD for a blade product
 */
export function generateProductSchema(blade: Blade): ProductSchema {
  const baseUrl = "https://sureay.com";

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: blade.fullName || blade.name,
    description: blade.description,
    brand: {
      "@type": "Brand",
      name: "Sureay",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sureay Machinery Technology Co., Ltd.",
      url: baseUrl,
      address: {
        "@type": "PostalAddress",
        addressCountry: "CN",
        addressRegion: "Anhui",
        addressLocality: "Ma'anshan",
      },
    },
    image: blade.gallery?.map(img => `${baseUrl}${img}`) || [
      `${baseUrl}${blade.image}`,
    ],
  };
}

/**
 * Generate Organization Schema (for homepage and about page)
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sureay Machinery Technology Co., Ltd.",
    url: "https://sureay.com",
    logo: "https://sureay.com/images/logo/sureay-logo.webp",
    description:
      "Leading manufacturer of precision industrial blades for plastic recycling, metal processing, and paper converting since 2008.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CN",
      addressRegion: "Anhui Province",
      addressLocality: "Ma'anshan City",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "info@sureay.com",
      availableLanguage: ["English", "Chinese"],
    },
    sameAs: [
      // Add social media profiles when available
      // "https://www.linkedin.com/in/lynn-shang-sureay",
      // "https://www.facebook.com/sureay",
    ],
    foundingDate: "2008",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "50-100",
    },
  };
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://sureay.com${item.url}`,
    })),
  };
}

/**
 * Generate FAQ Schema
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Render JSON-LD script tag content
 */
export function renderJsonLd(schema: any): string {
  return JSON.stringify(schema, null, 2);
}
