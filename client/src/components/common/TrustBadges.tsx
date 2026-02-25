/**
 * TrustBadges — horizontal strip of manufacturing/certification trust signals
 * Appears between the hero and body sections of blade detail pages.
 */

interface TrustBadgesProps {
  className?: string;
}

export default function TrustBadges({ className = "" }: TrustBadgesProps) {
  return (
    <div
      className={`bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700 py-3 lg:py-4 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-max gap-8">

          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <svg className="w-4 h-4 text-[#003366] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            ISO 9001:2015 Certified
          </div>

          <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-slate-600"></div>

          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <svg className="w-4 h-4 text-[#003366] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            In-house Heat Treatment
          </div>

          <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-slate-600"></div>

          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <svg className="w-4 h-4 text-[#003366] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Strict Dimensional Tolerances
          </div>

          <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-slate-600"></div>

          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <svg className="w-4 h-4 text-[#003366] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Global Door-to-Door
          </div>

        </div>
      </div>
    </div>
  );
}
