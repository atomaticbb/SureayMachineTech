/**
 * MixerWearPartsTeaser — homepage section for the parallel Mixer Wear Parts
 * business line, shown right below "Markets We Serve". The header mirrors the
 * TabEcosystem section for consistency; the cards mirror the /mixer-wear-parts
 * "Two Plant Types" section (scene→products hover cross-fade, greyed down).
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { mixerCategories } from "@/data/mixerParts";

export default function MixerWearPartsTeaser() {
  return (
    <section
      aria-label="Mixer Wear Parts"
      className="border-y border-slate-200 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24">
        {/* Header — mirrors the TabEcosystem "Markets We Serve" section */}
        <div className="mb-10 lg:mb-14">
          <p className="text-slate-500 font-bold text-xs tracking-[0.3em] mb-3">
            Beyond Blades
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] tracking-tight leading-[1.05] max-w-xl">
              Concrete &amp; Asphalt <br />
              Mixing Plant Wear Parts
            </h2>
            <p className="text-slate-500 max-w-sm text-sm md:text-base leading-relaxed md:text-right">
              Cast mixing arms, liners, scrapers and blades in Ni-Hard and
              high-chromium iron — OEM-fit replacements that drop into the plant
              you already run.
            </p>
          </div>
          <div className="w-14 h-[3px] bg-slate-300 mt-8" />
        </div>

        {/* Cards — /mixer-wear-parts "Two Plant Types" style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mixerCategories.map(cat => (
            <Link key={cat.id} href={cat.link}>
              <a className="group block overflow-hidden bg-white border border-slate-200 hover:border-[#001f4d] hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-200">
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  {/* Default — plant scene */}
                  <img
                    src={`/images/mixer-parts/hero/${cat.id}-scene.webp`}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* On hover — the parts in this category */}
                  <img
                    src={`/images/mixer-parts/hero/${cat.id}-products.webp`}
                    alt={`Wear parts for ${cat.name}`}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Grey overlay — tone down the bright plant photos */}
                  <div
                    className="absolute inset-0 bg-slate-900/25 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-slate-200 p-5 lg:p-6">
                  <div className="min-w-0">
                    <h3 className="font-black text-lg lg:text-xl text-[#001f4d] tracking-tight truncate">
                      {cat.name}
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-snug line-clamp-1 mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-[11px] font-black tracking-[0.18em] text-[#001f4d] group-hover:gap-3 transition-all">
                    VIEW PARTS
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
