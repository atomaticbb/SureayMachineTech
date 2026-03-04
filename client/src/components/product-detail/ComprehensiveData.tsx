/**
 * ComprehensiveData — ZONE 4: Comprehensive Technical Data tables.
 * Accepts blade: Blade. Renders blade.specCategories[] as a responsive grid
 * of spec tables, each with a category label header.
 */

import { Link } from "wouter";
import type { Blade } from "@/data/blades";

interface ComprehensiveDataProps {
  blade: Blade;
}

export default function ComprehensiveData({ blade }: ComprehensiveDataProps) {
  if (!blade.specCategories || blade.specCategories.length === 0) return null;

  return (
    <section
      aria-label="Comprehensive technical data"
      className="max-w-7xl mx-auto px-6 sm:px-8 py-4 mt-20"
    >
      {/* Section header */}
      <p className="font-mono text-[10px] text-slate-700 uppercase tracking-widest mb-3">
        [ Engineering Reference ]
      </p>
      <h2 className="font-black text-3xl text-[#001f4d] uppercase tracking-tight mb-12">
        Comprehensive Technical Data
      </h2>

      {/* Spec category grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blade.specCategories.map((cat) => (
          <div
            key={cat.id}
            className="border border-slate-200 border-t-2 border-t-[#001f4d] bg-white"
          >
            <div className="px-5 pt-4 pb-2 border-b border-slate-100">
              <p className="font-mono text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                {cat.label}
              </p>
            </div>
            <table className="w-full text-left border-collapse">
              <tbody>
                {Object.entries(cat.specs).map(([k, v], i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-b-0">
                    <th
                      scope="row"
                      className="px-5 py-3 font-mono text-[10px] text-slate-700 uppercase tracking-widest font-normal"
                    >
                      {k}
                    </th>
                    <td className="px-5 py-3 text-right text-sm font-black text-[#001f4d]">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Download CTA */}
      {/* <div className="mt-8 flex justify-start">
        <Link href="/contact">
          <button
            type="button"
            className="border-2 border-[#001f4d] text-[#001f4d] font-black font-mono text-[11px] uppercase tracking-widest px-8 py-3 hover:bg-[#001f4d] hover:text-white transition-all rounded-none"
          >
            Download Full Datasheet (PDF)
          </button>
        </Link>
      </div> */}
    </section>
  );
}
