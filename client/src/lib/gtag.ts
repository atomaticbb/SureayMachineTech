/**
 * gtag.ts — Typed GA4 helper
 * Wraps `window.gtag` so all call sites are type-safe and tree-shakeable.
 * Replace G-XXXXXXXXXX with your real Measurement ID.
 */

export const GA_MEASUREMENT_ID = "G-NDTDXJNB51";

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetId: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/** Fire a GA4 page_view manually (used by usePageTracking). */
export function pageview(url: string, title?: string): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_location: url,
    page_title: title ?? document.title,
    send_to: GA_MEASUREMENT_ID,
  });
}

/** Generic GA4 event wrapper. */
export function gtagEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}
