/**
 * MobileStickyCTA Component
 * Fixed bottom CTA bar for mobile devices only
 * Improves mobile conversion rates with persistent call-to-action
 */

import React from "react";

export default function MobileStickyCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl">
      <div className="px-4 py-3 flex items-center gap-3">
        <a
          href="#rfq"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("rfq")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex-1 text-center px-6 py-3.5 bg-[#001f4d] text-white font-black text-sm uppercase tracking-widest rounded-none hover:bg-[#003080] transition-colors duration-200"
        >
          Request Quote
        </a>
      </div>
    </div>
  );
}
