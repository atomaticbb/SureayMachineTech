/**
 * usePageTracking.ts — SPA route-change → GA4 page_view
 * Hooks into wouter's useLocation; fires whenever the pathname changes.
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { pageview } from "@/lib/gtag";

function isLikelyI18nKey(value: string): boolean {
  return /^[a-z0-9_-]+(?:\.[a-z0-9_-]+){2,}$/i.test(value.trim());
}

export function usePageTracking(): void {
  const [location] = useLocation();

  useEffect(() => {
    if (location === "/admin" || location.startsWith("/admin/")) {
      return;
    }

    if (isLikelyI18nKey(document.title)) {
      return;
    }

    pageview(window.location.href, document.title);
  }, [location]);
}
