/*
 * CookieConsent.tsx — Google Consent Mode v2 with geo-aware auto-grant
 *
 * Consent logic:
 *  1. index.html sets default: denied + wait_for_update:500 before React mounts.
 *  2. index.html also restores a previously stored "granted" choice immediately,
 *     so returning visitors never see the banner.
 *  3. On first visit, this component calls GET /api/region.
 *     - Non-GDPR region → auto-grant, save to localStorage, no banner shown.
 *       GA4 receives the consent update within the wait_for_update window and
 *       counts the first page_view with full consent.
 *     - GDPR/restricted region → show banner and let the user choose.
 *     - API failure → show banner (safe default).
 *
 * Storage key: "sureay_cookie_v2"  (values: "granted" | "denied")
 */

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { pageview } from "@/lib/gtag";
import { useTranslation } from "@/lib/useTranslation";

const STORAGE_KEY = "sureay_cookie_v2";

/** Update all four Consent Mode v2 signals at once. */
function updateAllConsent(value: "granted" | "denied"): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

export default function CookieConsent() {
  const { t } = useTranslation();
  // null = checking region (show nothing), false = no banner, true = show banner
  const [showBanner, setShowBanner] = useState<boolean | null>(null);

  const firstButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const reopen = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setShowBanner(true);
    };
    window.addEventListener("sureay:cookie-settings", reopen);
    return () => window.removeEventListener("sureay:cookie-settings", reopen);
  }, []);
  useEffect(() => {
    if (showBanner && returnFocus.current) firstButton.current?.focus();
  }, [showBanner]);
  function closeBanner() {
    setShowBanner(false);
    returnFocus.current?.focus();
    returnFocus.current = null;
  }

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    // Returning visitor: preference already stored, index.html handled the
    // consent restore — nothing left to do here.
    if (stored !== null) {
      setShowBanner(false);
      return;
    }

    // First visit: ask the server which regulatory zone the visitor is in.
    axios
      .get<{ requiresConsent: boolean; country: string }>("/api/region")
      .then(({ data }) => {
        if (localStorage.getItem(STORAGE_KEY) !== null) return;
        if (!data.requiresConsent) {
          // Non-GDPR region — grant immediately without showing a banner.
          // GA4's wait_for_update window is still open, so the first page_view
          // queued by usePageTracking will be sent with granted consent.
          localStorage.setItem(STORAGE_KEY, "granted");
          updateAllConsent("granted");
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }
      })
      .catch(() => {
        // Do not reopen after a choice made while the request was pending.
        if (localStorage.getItem(STORAGE_KEY) === null) setShowBanner(true);
      });
  }, []);

  function handleAcceptAll() {
    localStorage.setItem(STORAGE_KEY, "granted");
    updateAllConsent("granted");
    // The wait_for_update window has long passed by now (user read the banner),
    // so fire a fresh page_view with the newly granted consent.
    pageview(window.location.href, document.title);
    closeBanner();
  }

  function handleEssentialOnly() {
    localStorage.setItem(STORAGE_KEY, "denied");
    updateAllConsent("denied");
    window.gtag?.("set", "user_data", {});
    closeBanner();
  }

  if (!showBanner) return null;

  return (
    <div role="region" aria-label={t("cookieConsent.title")} className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#001f4d] border-t border-white/20 shadow-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm mb-1">
            {t("cookieConsent.title")}
          </p>
          <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
            {t("cookieConsent.body")}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:flex-shrink-0">
          <button
            ref={firstButton}
            onClick={handleEssentialOnly}
            className="border border-white/40 text-white hover:border-white px-5 py-2.5 text-sm font-semibold transition-colors duration-150 rounded-none whitespace-normal break-words min-h-11"
          >
            {t("cookieConsent.essentialOnly")}
          </button>
          <button
            onClick={handleAcceptAll}
            className="bg-white text-[#001f4d] hover:bg-white/90 px-5 py-2.5 text-sm font-bold transition-colors duration-150 rounded-none whitespace-normal break-words min-h-11"
          >
            {t("cookieConsent.acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
