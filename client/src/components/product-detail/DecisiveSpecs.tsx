/**
 * DecisiveSpecs — Decisive Specifications table.
 * Two-column layout: specs on the left, product image on the right.
 * Header and footnote sit outside the flex row so the image height
 * matches the table height exactly.
 */

import type { CSSProperties } from "react";
import type { Blade } from "@/data/blades";

interface DecisiveSpecsProps {
  blade: Blade;
}

const DOT_GRID_STYLE: CSSProperties = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

export default function DecisiveSpecs({ blade }: DecisiveSpecsProps) {
  const specs = blade.specs ?? [];
  if (specs.length === 0) return null;

  const panelImage = blade.gallery?.[4] ?? blade.image;

  return (
    <section
      aria-label="Decisive specifications"
      className="max-w-7xl mx-auto px-6 sm:px-8"
    >
      {/* Section header — outside the flex row */}
      <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-3">
        [ Engineering Reference ]
      </p>
      <h2 className="font-black text-4xl text-[#001f4d] uppercase tracking-tight mb-10">
        Decisive Specifications
      </h2>

      {/* Flex row: table left, image right — equal height */}
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-stretch">

        {/* Left — specs table only */}
        <div className="w-full lg:w-[500px] xl:w-[540px] flex-shrink-0">
          <div className="border-t-2 border-t-[#001f4d] border border-slate-300 overflow-hidden h-full">
            <table className="w-full text-left border-collapse">
              <tbody>
                {specs.map((spec, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-200 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-3.5 border-r border-slate-200 font-mono text-[11px] text-slate-600 uppercase tracking-wider font-semibold w-[36%] lg:w-[28%]"
                    >
                      {spec.label}
                    </th>
                    <td className="px-6 py-3.5 text-sm font-bold text-[#001f4d]">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right — product image */}
        <div className="flex-1 min-w-0">
          <div
            className="w-full aspect-[4/3] border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center"
            style={DOT_GRID_STYLE}
          >
            <img
              src={panelImage}
              alt={blade.fullName || blade.name}
              className="w-full h-full object-contain p-8 mix-blend-multiply"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

      </div>

      {/* Footnote — outside the flex row */}
      <p className="font-mono text-[11px] text-slate-500 uppercase tracking-widest mt-4">
        ■ All values verified via CMM inspection · ISO 9001:2015
      </p>
    </section>
  );
}
