/*
 * CookieConsent.tsx — Google Consent Mode v2
 * Swiss Brutalist · Deep Navy · Zero radius
 *
 * Consent logic:
 *  - index.html already handles the "default: denied" and instant restore on page load.
 *  - This component only needs to show the banner and handle the user's choice.
 *
 * Storage key: "sureay_cookie_v2"  (values: "granted" | "denied")
 */

import { useState, useEffect } from "react";
import { pageview } from "@/lib/gtag";

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
  const [visible, setVisible] = useState(false);

  // Only show the banner when no prior choice exists.
  // Consent restoration for returning visitors is handled by index.html
  // before React even mounts, so no gtag call is needed here.
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function handleAcceptAll() {
    localStorage.setItem(STORAGE_KEY, "granted");
    updateAllConsent("granted");
    // Fire the first page_view now that consent is in place
    pageview(window.location.href, document.title);
    setVisible(false);
  }

  function handleEssentialOnly() {
    localStorage.setItem(STORAGE_KEY, "denied");
    // All signals remain denied — nothing else to call
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#001f4d] border-t border-white/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm mb-1">Cookie Settings</p>
          <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
            We use analytics cookies to understand how visitors use this site.
            No advertising or third-party data is shared. You can change your
            preference at any time.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-shrink-0 items-center gap-3">
          <button
            onClick={handleEssentialOnly}
            className="border border-white/40 text-white hover:border-white px-5 py-2.5 text-sm font-semibold transition-colors duration-150 rounded-none whitespace-nowrap"
          >
            Essential Only
          </button>
          <button
            onClick={handleAcceptAll}
            className="bg-white text-[#001f4d] hover:bg-white/90 px-5 py-2.5 text-sm font-bold transition-colors duration-150 rounded-none whitespace-nowrap"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
