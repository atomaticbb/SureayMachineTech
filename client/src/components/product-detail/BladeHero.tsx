/**
 * BladeHero — ZONE 1: CAD Viewport Hero.
 * Left: single product image (618px fixed width, right border only).
 * Right: title, category, description, spec bullets, CTA.
 */

import { ArrowRight } from "lucide-react";
import type { Blade } from "@/data/blades";

interface BladeHeroProps {
  blade: Blade;
}

const DOT_GRID_STYLE = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
} as const;

export default function BladeHero({ blade }: BladeHeroProps) {
  return (
    <section
      aria-label={`${blade.fullName || blade.name} — product hero`}
      className="flex flex-col lg:flex-row overflow-hidden"
    >

      {/* ── Left: Product Image (580px) ───────────────────────── */}
      <div className="lg:w-[580px] lg:shrink-0 border-r border-slate-200">
        <div
          className="h-[320px] lg:h-[520px] bg-slate-100 flex items-center justify-center overflow-hidden"
          style={DOT_GRID_STYLE}
        >
          <img
            src={blade.image}
            alt={blade.fullName || blade.name}
            className="h-full w-full object-contain p-3 mix-blend-multiply"
            loading="eager"
            decoding="async"
            width={580}
            height={520}
          />
        </div>
      </div>

      {/* ── Right: Product Info ───────────────────────────────── */}
      <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between">
        <div className="space-y-5">

          {/* H1 — full product name */}
          <h1 className="font-black text-[26px] text-[#001f4d] uppercase leading-[1.15] tracking-tight">
            {blade.fullName || blade.name}
          </h1>

          {/* Category */}
          <p className="text-[16px] font-bold text-black uppercase tracking-widest border-l-2 border-[#001f4d] pl-3">
            {blade.categoryDisplay}
          </p>

          {/* Description */}
          {(blade.description || blade.fullDescription) && (
            <p className="text-[16px] text-black leading-relaxed">
              {blade.description || blade.fullDescription}
            </p>
          )}

          {/* Spec bullets — Material & Applications */}
          {blade.specs && blade.specs.length > 0 && (() => {
            const filtered = blade.specs.filter((s) =>
              /^material$/i.test(s.label.trim()) || /^applications?$/i.test(s.label.trim())
            );
            return filtered.length > 0 ? (
              <ul className="space-y-2.5 pt-1">
                {filtered.map((spec, i) => (
                  <li key={i} className="flex items-baseline gap-2">
                    <span className="text-black font-black flex-shrink-0 text-[11px]">■</span>
                    <span className="text-[16px] leading-snug">
                      <span className="font-bold text-black uppercase tracking-wide">{spec.label}: </span>
                      <span className="text-black">{spec.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null;
          })()}

        </div>

        {/* CTA */}
        <div className="mt-8">
          <a
            href="#rfq"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("rfq")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full bg-[#001f4d] hover:bg-white border-2 border-[#001f4d] text-white hover:text-[#001f4d] font-black text-sm uppercase tracking-widest rounded-none transition-colors duration-200 flex items-center justify-between px-6 py-4"
          >
            <span>Request Engineering Quote</span>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </a>
        </div>
      </div>

    </section>
  );
}
