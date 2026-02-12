/**
 * MobileStickyCTA Component
 * Fixed bottom CTA bar for mobile devices only
 * Improves mobile conversion rates with persistent call-to-action
 */

import React from "react";
import { Link } from "wouter";

export default function MobileStickyCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl">
      <div className="px-4 py-3 flex items-center gap-3">
        <Link href="/contact">
          <a className="flex-1 text-center px-6 py-3.5 bg-[#FF6600] text-white font-bold text-base rounded-lg hover:bg-[#FF7700] transition-colors duration-300 active:scale-95">
            Request Quote
          </a>
        </Link>
      </div>
    </div>
  );
}
