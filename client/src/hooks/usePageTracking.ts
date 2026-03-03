/**
 * usePageTracking.ts — SPA route-change → GA4 page_view
 * Hooks into wouter's useLocation; fires whenever the pathname changes.
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { pageview } from "@/lib/gtag";

export function usePageTracking(): void {
  const [location] = useLocation();

  useEffect(() => {
    pageview(window.location.href, document.title);
  }, [location]);
}
