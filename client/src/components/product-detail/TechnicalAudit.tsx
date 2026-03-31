/**
 * TechnicalAudit — ZONE 3: Engineering Advantages grid.
 * Renders blade.components[] as an equal-height 3-column card grid on desktop.
 */

import type { Blade } from "@/data/blades";

interface TechnicalAuditProps {
  blade: Blade;
}

/** Split description into [first sentence, remainder]. */
function splitFirstSentence(text: string): [string, string] {
  const match = text.match(/^(.+?[.!?])\s+([\s\S]+)$/);
  return match ? [match[1], match[2]] : [text, ""];
}

export default function TechnicalAudit({ blade }: TechnicalAuditProps) {
  if (!blade.components || blade.components.length === 0) return null;

  return (
    <section
      aria-label="Technical audit"
      className="max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Section header */}
      <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-3">
        [ Technical Audit ]
      </p>
      <h2 className="font-black text-4xl text-[#001f4d] uppercase tracking-tight mb-8">
        Engineering Advantages
      </h2>

      {/* 3-column card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blade.components.map((comp, i) => {
          const [lead, rest] = splitFirstSentence(comp.description);

          return (
            <div
              key={comp.id}
              className="border border-slate-200 border-t-4 border-t-slate-900 p-8 bg-white flex flex-col"
            >
              {/* Index tag */}
              <div className="mb-4">
                <span className="font-mono text-[10px] text-[#003366] font-bold uppercase bg-[#003366]/10 px-2 py-0.5 tracking-widest">
                  {String(i + 1).padStart(2, "0")} — {comp.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-black text-[#001f4d] uppercase tracking-tight leading-tight mb-4">
                {comp.title}
              </h3>

              {/* Description — first sentence bolded as a scannable TL;DR */}
              <p className="text-base text-slate-600 leading-relaxed mt-auto">
                <span className="font-semibold text-slate-900">{lead}</span>
                {rest && <> {rest}</>}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
