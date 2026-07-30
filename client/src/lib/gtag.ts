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

/**
 * Normalize a user-entered phone number to E.164, or undefined when it can't
 * be trusted. The forms have no country selector and the placeholder asks for
 * "+1 555 123 4567", so input without a leading "+" has an unknown country
 * code — send nothing rather than a wrong hash that drags the match rate down.
 */
function toE164(phone?: string): string | undefined {
  const trimmed = phone?.trim();
  if (!trimmed?.startsWith("+")) return undefined;
  const digits = trimmed.slice(1).replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : undefined;
}

/**
 * Fire GA4 `generate_lead` with the user data enhanced conversions needs.
 * `gtag('set','user_data')` must run before the event so it rides along;
 * gtag.js hashes the values client-side, so plaintext never leaves the browser.
 * Requires ad_user_data consent — see the Consent Mode block in index.html.
 */
export function trackLead(
  user: { email?: string; phone?: string },
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || !window.gtag) return;

  const email = user.email?.trim().toLowerCase();
  const phoneNumber = toE164(user.phone);
  if (email || phoneNumber) {
    window.gtag("set", "user_data", {
      ...(email ? { email } : {}),
      ...(phoneNumber ? { phone_number: phoneNumber } : {}),
    });
  }
  window.gtag("event", "generate_lead", params);
}
