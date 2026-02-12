/**
 * CTAButtons Component - Call-to-action buttons
 * Used in MachineDetail page for inquiry and PDF download actions
 */

import React from "react";
import { Link } from "wouter";

interface CTAButtonsProps {
  showPDF?: boolean;
  pdfUrl?: string;
  leadTime?: string;
}

export default function CTAButtons({ showPDF = false, pdfUrl, leadTime }: CTAButtonsProps) {
  return (
    <div className="space-y-4">
      {/* Primary CTA - Request Quote */}
      <Link href="/contact">
        <a className="group relative w-full px-8 py-4 bg-gradient-to-r from-[#003366] to-[#004080] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex items-center justify-center">
          <span className="absolute inset-0 bg-[#FF6600] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          <span className="relative flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Request Quote
          </span>
        </a>
      </Link>

      {/* Secondary CTA - Download PDF */}
      {showPDF && pdfUrl && (
        <a
          href={pdfUrl}
          download
          className="group relative w-full px-8 py-4 bg-white dark:bg-slate-800 text-[#003366] dark:text-white font-bold text-lg rounded-xl border-2 border-[#003366] dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 flex items-center justify-center"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Datasheet (PDF)
          </span>
        </a>
      )}

      {/* Lead Time Information */}
      {leadTime && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Typical lead time: <span className="font-semibold text-slate-900 dark:text-white">{leadTime}</span></span>
        </div>
      )}
    </div>
  );
}
