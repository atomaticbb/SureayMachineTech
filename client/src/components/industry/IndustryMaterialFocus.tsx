/*
 * IndustryMaterialFocus — Module 5
 * Physical catalog layout. Material sample cards.
 * All images: loading="lazy" decoding="async"
 * REF IDs and spec values: JetBrains Mono
 */

import type { IndustryMaterial } from "./types";
import { MONO } from "./types";

interface Props {
  materials: IndustryMaterial[];
}

export default function IndustryMaterialFocus({ materials }: Props) {
  return (
    <section className="bg-white border-b border-slate-200 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="mb-14">
          <p className="font-bold text-[11px] text-slate-400 uppercase tracking-[0.45em] mb-3">
            Application Engineering
          </p>
          <h2 className="font-black text-2xl md:text-3xl text-[#001f4d] uppercase tracking-tight leading-[1.0]">
            Materials We Process.
          </h2>
          <div className="w-14 h-[3px] bg-slate-300 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {materials.map((mat, i) => (
            <div
              key={mat.name}
              className="bg-white border border-slate-200 hover:border-[#001f4d] overflow-hidden flex flex-col transition-colors duration-150"
            >
              {/* Image */}
              <div className="aspect-[3/2] overflow-hidden flex-shrink-0">
                <img
                  src={mat.image}
                  alt={mat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Data tray */}
              <div className="p-8 flex flex-col flex-grow bg-white">
                <div className="flex justify-end mb-3">
                  <span
                    style={MONO}
                    className="text-[10px] text-slate-400 uppercase"
                  >
                    REF ID: {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-black text-lg text-[#001f4d] uppercase tracking-tight mb-4">
                  {mat.name}
                </h3>

                <div className="mt-auto">
                  <div className="flex items-baseline justify-between py-2.5 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">
                      Abrasion
                    </span>
                    <span
                      style={MONO}
                      className="text-[13px] font-black text-[#001f4d] uppercase"
                    >
                      {mat.abrasion}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between py-2.5 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">
                      Grade
                    </span>
                    <span
                      style={MONO}
                      className="text-[13px] font-black text-[#001f4d]"
                    >
                      {mat.grade}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
