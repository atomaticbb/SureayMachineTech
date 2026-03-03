/**
 * BladeHero — ZONE 1: CAD Viewport Hero.
 * Accepts blade: Blade. Owns activeGalleryIndex state.
 * Swiss Brutalist: border-2, font-mono eyebrow, font-black title, no dark mode.
 */

import { useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "wouter";
import type { Blade } from "@/data/blades";

interface BladeHeroProps {
  blade: Blade;
}

const DOT_GRID_STYLE: CSSProperties = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

export default function BladeHero({ blade }: BladeHeroProps) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Gallery — up to 4 images; fall back to main image to fill empty slots
  const galleryImages: string[] = Array.from(
    { length: 4 },
    (_, i) => blade.gallery?.[i] ?? blade.image,
  );

  // First 4 decisive specs for the hero ledger only
  const heroSpecs = (blade.specs ?? []).slice(0, 4);

  return (
    <section
      aria-label={`${blade.fullName || blade.name} — product hero`}
      className="border-2 border-[#001f4d] flex flex-col lg:flex-row overflow-hidden lg:max-h-[520px]"
    >
      {/* ── Left: CAD Viewport (60%) ─────────────────────────────────── */}
      <div className="lg:w-[60%] flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-[#001f4d] h-[300px] lg:h-auto overflow-hidden">

        {/* Main image area */}
        <div
          className="flex-grow bg-slate-100 flex items-center justify-center relative overflow-hidden"
          style={DOT_GRID_STYLE}
        >
          {/* Corner annotation — top-left */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-700 leading-snug z-10">
            [ VIEW MODE: PRODUCT RENDER ]<br />
            REF: {blade.id.toUpperCase()}
          </div>

          {/* Active blade image */}
          <img
            src={galleryImages[activeGalleryIndex]}
            alt={blade.fullName || blade.name}
            className="h-full w-full object-contain p-8 mix-blend-multiply transition-opacity duration-200"
            loading="eager"
            decoding="sync"
          />

          {/* Category tag — bottom-left */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="font-mono text-[10px] text-slate-700 uppercase tracking-widest">
              {blade.categoryDisplay}
            </span>
          </div>
        </div>

        {/* Engineering View Selector — thumbnail track */}
        <div
          className="shrink-0 h-[76px] border-t border-[#001f4d] bg-white grid grid-cols-4"
          role="group"
          aria-label="Gallery thumbnails"
        >
          {galleryImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveGalleryIndex(i)}
              aria-current={activeGalleryIndex === i ? "true" : undefined}
              aria-label={`View ${i + 1} of ${galleryImages.length}`}
              className={[
                "relative cursor-pointer overflow-hidden bg-slate-50 h-full transition-all duration-200",
                i < 3 ? "border-r border-slate-200" : "",
                activeGalleryIndex === i
                  ? "border-b-4 border-b-[#001f4d]"
                  : "border-b-4 border-b-transparent hover:bg-slate-100",
              ].join(" ")}
            >
              <span className="absolute top-1.5 left-1.5 font-mono text-[8px] text-slate-700 uppercase z-10 leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <img
                src={img}
                alt={`View ${i + 1}`}
                className={[
                  "w-full h-full object-contain p-2 mix-blend-multiply transition-all duration-200",
                  activeGalleryIndex === i
                    ? ""
                    : "grayscale opacity-60 hover:opacity-100 hover:grayscale-0",
                ].join(" ")}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Right: Spec Ledger (40%) ─────────────────────────────────── */}
      <div className="lg:w-[40%] bg-white p-5 lg:p-6 flex flex-col justify-between">
        <div>
          {/* Document tag */}
          <p className="font-mono text-[10px] font-bold text-[#003366] uppercase tracking-[0.2em] mb-2">
            [ Product Specification Sheet ]
          </p>

          {/* Product title */}
          <h1 className="font-black text-3xl text-[#001f4d] uppercase leading-none tracking-tighter mb-2">
            {blade.fullName || blade.name}
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed mb-2">
            {blade.description}
          </p>

          {/* Feature tags */}
          {blade.features && blade.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {blade.features.slice(0, 3).map((f, i) => (
                <span
                  key={i}
                  className="border border-slate-200 px-3 py-1 font-mono text-[10px] uppercase bg-slate-50 text-slate-600"
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          {/* Decisive Specs table — max 4 rows */}
          {heroSpecs.length > 0 && (
            <div className="border border-slate-200 border-t-2 border-t-[#001f4d] mb-2">
              <div className="px-4 py-1.5 border-b border-slate-100 bg-slate-50">
                <p className="font-mono text-[10px] font-bold text-slate-700 uppercase tracking-widest text-center">
                  [ Decisive Specifications ]
                </p>
              </div>
              <table className="w-full text-left border-collapse">
                <tbody>
                  {heroSpecs.map((spec, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-b-0">
                      <th
                        scope="row"
                        className="px-4 py-1.5 font-mono text-[10px] text-slate-700 uppercase tracking-widest font-normal"
                      >
                        {spec.label}
                      </th>
                      <td className="px-4 py-1.5 text-right text-sm font-black text-[#001f4d]">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bottom strip: lead time + RFQ CTA */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono">
              <div className="text-[10px] text-slate-700 uppercase tracking-widest mb-0.5">Lead Time</div>
              <div className="text-sm font-black text-[#001f4d] uppercase">
                {blade.leadTime ?? "4 – 6 Weeks"}
              </div>
            </div>
            {blade.isFeatured && (
              <div className="font-mono text-right">
                <div className="text-[10px] text-slate-700 uppercase tracking-widest mb-0.5">Status</div>
                <div className="text-sm font-black text-[#001f4d] uppercase">■ Ready to Dispatch</div>
              </div>
            )}
          </div>

          {/* Primary RFQ CTA */}
          <Link href="/contact">
            <button
              type="button"
              className="w-full bg-[#001f4d] hover:bg-white border-2 border-[#001f4d] text-white hover:text-[#001f4d] font-black text-sm uppercase tracking-widest py-3 rounded-none transition-colors duration-200"
            >
              Request Engineering Quote
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
