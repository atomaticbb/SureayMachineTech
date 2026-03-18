/*
 * IndustryBlueprintDashboard — Module 3
 * Pain-point vs Solution narrative split + 4-column instrument spec grid.
 * bg-white. No images. Typography only.
 */

import type { IndustryNarrative, IndustrySpec } from "./types";

// ── Renders one spec cell ─────────────────────────────────────────────────────
function SpecCell({ spec }: { spec: IndustrySpec }) {
  return (
    <div className="border-b border-r border-slate-200 p-5 sm:p-7 lg:p-10 flex flex-col justify-between min-h-[180px] lg:min-h-[220px] hover:bg-slate-50 transition-colors duration-300">
      <span className="block text-[10.5px] font-black text-slate-400 uppercase tracking-[0.3em]">
        {spec.label}
      </span>
      <div className="mt-8">
        {spec.isTextual ? (
          <span className="block font-black text-2xl lg:text-[28px] text-[#001f4d] tracking-tight leading-[1.1] mb-3 uppercase">
            {spec.mainValue.split("\\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </span>
        ) : (
          <span className="block font-black text-4xl text-[#001f4d] tracking-tight leading-none mb-3">
            {spec.mainValue}
            {spec.unit && (
              <span className="text-xl tracking-normal ml-1">{spec.unit}</span>
            )}
          </span>
        )}
        <span className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-widest">
          {spec.subtext}
        </span>
      </div>
    </div>
  );
}

interface Props {
  narrative: IndustryNarrative;
  specs:     IndustrySpec[];
}

export default function IndustryBlueprintDashboard({ narrative, specs }: Props) {
  const { challengeTitle, challengeBody, solutionTitle, solutionBody, highlightToken } = narrative;

  // Split solution body around the highlight token if provided
  const solutionParts = highlightToken ? solutionBody.split(highlightToken) : null;

  return (
    <section className="bg-white border-b border-slate-200 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Pain vs Solution narrative ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-28">

          {/* Challenge */}
          <div>
            <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.5em] mb-5">
              [ The Industry Challenge ]
            </p>
            <h2 className="font-black text-2xl md:text-3xl text-[#001f4d] uppercase tracking-tight leading-[1.05] mb-6">
              {challengeTitle}
            </h2>
            <p className="text-slate-600 text-[15px] leading-relaxed max-w-[480px] tracking-[0.015em]">
              {challengeBody}
            </p>
          </div>

          {/* Solution */}
          <div className="relative">
            <div className="hidden lg:block absolute -left-10 xl:-left-12 top-2 bottom-2 w-px bg-slate-200" />
            <p className="font-black text-[10px] text-[#65AAD6] uppercase tracking-[0.5em] mb-5">
              [ Sureay Engineered Solution ]
            </p>
            <h2 className="font-black text-2xl md:text-3xl text-[#001f4d] uppercase tracking-tight leading-[1.05] mb-6">
              {solutionTitle}
            </h2>
            <p className="text-slate-600 text-[15px] leading-relaxed max-w-[480px] tracking-[0.015em]">
              {solutionParts ? (
                <>
                  {solutionParts[0]}
                  <strong className="font-black text-[#003366]">{highlightToken}</strong>
                  {solutionParts[1]}
                </>
              ) : solutionBody}
            </p>
          </div>

        </div>

        {/* ── 4-Column Spec Dashboard ── */}
        <div>
          <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.5em] mb-6">
            [ Verified Production Specs ]
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200">
            {specs.map((spec) => (
              <SpecCell key={spec.label} spec={spec} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
