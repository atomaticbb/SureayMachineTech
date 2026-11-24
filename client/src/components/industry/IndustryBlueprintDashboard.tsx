/*
 * IndustryBlueprintDashboard — Module 3
 * Pain-point vs Solution narrative split + 4-column instrument spec grid.
 * bg-white. No images. Typography only.
 */

import type { IndustryNarrative, IndustrySpec } from "./types";
import { useTranslation } from "@/lib/useTranslation";

// ── Renders one spec cell ─────────────────────────────────────────────────────
function SpecCell({ spec }: { spec: IndustrySpec }) {
  return (
    <div className="border-b border-r border-slate-200 p-5 sm:p-7 lg:p-10 flex flex-col justify-between min-h-[180px] lg:min-h-[220px] hover:bg-slate-50 transition-colors duration-300">
      <span className="block text-[14px] font-black text-muted-foreground  tracking-[0.3em]">
        {spec.label}
      </span>
      <div className="mt-8">
        {spec.isTextual ? (
          <span className="block font-display font-bold text-4xl text-[#001f4d] tracking-tight leading-[1.1] mb-3">
            {spec.mainValue.split(/\\n|\n/).map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </span>
        ) : (
          <span className="block font-display font-bold text-4xl text-[#001f4d] tracking-tight leading-none mb-3">
            {spec.mainValue}
            {spec.unit && (
              <span className="text-xl tracking-normal ml-1">{spec.unit}</span>
            )}
          </span>
        )}
        <span className="block text-[14px] font-bold text-muted-foreground  tracking-widest">
          {spec.subtext}
        </span>
      </div>
    </div>
  );
}

interface Props {
  narrative: IndustryNarrative;
  specs: IndustrySpec[];
}

export default function IndustryBlueprintDashboard({
  narrative,
  specs,
}: Props) {
  const { t } = useTranslation();
  const {
    challengeTitle,
    challengeBody,
    solutionTitle,
    solutionBody,
    highlightToken,
  } = narrative;

  // Split solution body around the highlight token if provided
  const solutionParts = highlightToken && solutionBody.includes(highlightToken)
    ? solutionBody.split(highlightToken)
    : null;

  return (
    <section className="site-section bg-white border-b border-slate-200 py-20 lg:py-28">
      <div className="site-content max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── Pain vs Solution narrative ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-28">
          {/* Challenge */}
          <div>

            <h2 className="font-black text-2xl md:text-3xl text-[#001f4d]  tracking-tight leading-[1.05] mb-6">
              {challengeTitle}
            </h2>
            <p className="text-description text-slate-600 leading-relaxed max-w-[480px] tracking-[0.015em]">
              {challengeBody}
            </p>
          </div>

          {/* Solution */}
          <div className="relative">
            <div className="hidden lg:block absolute -left-10 xl:-left-12 top-2 bottom-2 w-px bg-slate-200" />

            <h2 className="font-black text-2xl md:text-3xl text-[#001f4d]  tracking-tight leading-[1.05] mb-6">
              {solutionTitle}
            </h2>
            <p className="text-description text-slate-600 leading-relaxed max-w-[480px] tracking-[0.015em]">
              {solutionParts ? (
                <>
                  {solutionParts[0]}
                  <strong className="font-black text-[#003366]">
                    {highlightToken}
                  </strong>
                  {solutionParts[1]}
                </>
              ) : (
                solutionBody
              )}
            </p>
          </div>
        </div>

        {/* ── 4-Column Spec Dashboard ── */}
        <div>
          <h2 className="font-black text-2xl md:text-3xl text-[#001f4d] tracking-tight mb-6">
            {t("industry.production.specs")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200">
            {specs.map(spec => (
              <SpecCell key={spec.label} spec={spec} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
