/**
 * PageMeta Component
 * Declarative SEO meta tags and JSON-LD structured data management
 * Replaces imperative DOM manipulation with clean React pattern
 */

import { useEffect } from "react";

interface SchemaProduct {
  "@context": string;
  "@type": string;
  name: string;
  image: string | string[];
  description: string;
  sku?: string;
  mpn?: string;
  brand: {
    "@type": string;
    name: string;
  };
  category?: string;
  offers?: {
    "@type": string;
    url?: string;
    priceCurrency: string;
    price?: string;
    priceValidUntil?: string;
    availability: string;
    itemCondition?: string;
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string | number;
    ratingCount: string | number;
    bestRating?: string | number;
    worstRating?: string | number;
  };
}

interface PageMetaProps {
  title: string;
  description: string;
  image?: string;
  schema?: SchemaProduct | null;
  siteName?: string;
}

export default function PageMeta({
  title,
  description,
  image,
  schema,
  siteName = "Sureay Heavy Machinery"
}: PageMetaProps) {
  useEffect(() => {
    // Update document title
    const fullTitle = `${title} | ${siteName}`;
    document.title = fullTitle;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Add JSON-LD structured data if provided
    let structuredDataScript: HTMLScriptElement | null = null;
    if (schema) {
      // Remove only the previously injected dynamic JSON-LD (not the static org schema in index.html)
      const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new JSON-LD script tagged so we can find it on next render
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.setAttribute('data-dynamic', 'true');
      structuredDataScript.text = JSON.stringify(schema);
      document.head.appendChild(structuredDataScript);
    }

    // Cleanup function
    return () => {
      document.title = siteName;

      // Remove JSON-LD script on unmount
      if (structuredDataScript && document.head.contains(structuredDataScript)) {
        structuredDataScript.remove();
      }
    };
  }, [title, description, schema, siteName]);

  // This component doesn't render anything visible
  return null;
}
