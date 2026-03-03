/**
 * TechnicalAudit — ZONE 3: Engineering Audit Log + Single Sticky Viewport.
 * Accepts blade: Blade. Renders blade.components[] as stacked text items
 * alongside a sticky image panel.
 */

import type { CSSProperties } from "react";
import type { Blade } from "@/data/blades";

interface TechnicalAuditProps {
  blade: Blade;
}

const DOT_GRID_STYLE: CSSProperties = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

export default function TechnicalAudit({ blade }: TechnicalAuditProps) {
  if (!blade.components || blade.components.length === 0) return null;

  return (
    <section
      aria-label="Technical audit"
      className="max-w-7xl mx-auto px-6 sm:px-8 mt-16"
    >
      {/* Section header */}
      <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-3">
        [ Technical Audit ]
      </p>
      <h2 className="font-black text-3xl text-[#001f4d] uppercase tracking-tight mb-12">
        Engineering Advantages
      </h2>

      {/* Two-column: text left + single sticky viewport right */}
      <div className="flex items-start gap-12">

        {/* Left — stacked audit entries (55%) */}
        <div className="lg:w-[55%] shrink-0 flex flex-col space-y-24 py-10">
          {blade.components.map((comp, i) => (
            <div key={comp.id} className="flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] text-[#003366] font-bold uppercase bg-[#003366]/10 px-2 py-0.5 tracking-widest">
                  {String(i + 1).padStart(2, "0")} — {comp.tag}
                </span>
                <span className="font-mono text-[10px] text-slate-700 uppercase tracking-widest">
                  Status: Verified
                </span>
              </div>
              <h3 className="text-2xl font-black text-[#001f4d] uppercase tracking-tight leading-[1.05]">
                {comp.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {comp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right — single sticky visual viewport (45%) */}
        <div className="hidden lg:block lg:w-[45%] shrink-0">
          <div
            className="sticky top-32 h-[500px] w-full bg-slate-100 border border-slate-200 flex items-center justify-center relative overflow-hidden will-change-transform transform-gpu"
            style={DOT_GRID_STYLE}
          >
            {/* Corner label */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-700 leading-snug z-10">
              [ MACRO METALLURGY VIEWPORT ]<br />
              REF: {blade.id.toUpperCase()}
            </div>

            <img
              src={blade.gallery?.[4] ?? blade.image}
              alt={`${blade.name} — detail view`}
              className="h-full w-full object-contain p-10 mix-blend-multiply"
              loading="lazy"
              decoding="async"
            />

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white/70 px-4 py-2 flex justify-between items-center">
              <span className="font-mono text-[9px] text-slate-700 uppercase tracking-widest">
                ■ CMM Verified · ISO 9001:2015
              </span>
              <span className="font-mono text-[9px] text-slate-300 uppercase tracking-widest">
                Scale: 1:1.000
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
