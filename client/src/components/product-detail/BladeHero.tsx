/**
 * BladeHero — ZONE 1: CAD Viewport Hero.
 * Accepts blade: Blade. Owns activeGalleryIndex state.
 * Swiss Brutalist: 12-col grid (5/7 split), no borders on image col,
 * industrial data rail, arrow CTA, 2-tag trust strip.
 */

import { useState, useCallback } from "react";
import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { Blade } from "@/data/blades";

interface BladeHeroProps {
  blade: Blade;
}

const DOT_GRID_STYLE: CSSProperties = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

// ── Magnifier constants ────────────────────────────────────────────────────
const ZOOM = 2.5; // in-place scale factor on hover

interface ZoomState {
  active: boolean;
  ox: number; // transform-origin x (%)
  oy: number; // transform-origin y (%)
}

export default function BladeHero({ blade }: BladeHeroProps) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [zoom, setZoom] = useState<ZoomState>({ active: false, ox: 50, oy: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      active: true,
      ox: ((e.clientX - rect.left) / rect.width) * 100,
      oy: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setZoom({ active: false, ox: 50, oy: 50 });
  }, []);

  // Gallery — up to 4 images; fall back to main image to fill empty slots
  const galleryImages: string[] = Array.from(
    { length: 4 },
    (_, i) => blade.gallery?.[i] ?? blade.image,
  );

  return (
    <section
      aria-label={`${blade.fullName || blade.name} — product hero`}
      className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-slate-200 border-t-4 border-t-[#001f4d]"
    >

      {/* ── Left: CAD Viewport (6 cols) ──────────────────────────── */}
      <div className="lg:col-span-6 flex flex-col overflow-hidden">

        {/* Main image area — zoom in-place on hover */}
        <div
          className="h-[400px] bg-slate-100 flex items-center justify-center relative overflow-hidden"
          style={{ ...DOT_GRID_STYLE, cursor: "zoom-in" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Corner annotation — top-left */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-500 leading-snug z-10 pointer-events-none">
            [ VIEW MODE: PRODUCT RENDER ]<br />
            REF: {blade.id.toUpperCase()}
          </div>

          {/* Active blade image — scales at cursor origin on hover */}
          <img
            src={galleryImages[activeGalleryIndex]}
            alt={blade.fullName || blade.name}
            className="h-full w-full object-contain p-8 mix-blend-multiply"
            style={{
              transformOrigin: `${zoom.ox}% ${zoom.oy}%`,
              transform: zoom.active ? `scale(${ZOOM})` : "scale(1)",
              transition: "transform 0.25s ease",
            }}
            loading="eager"
            decoding="sync"
          />

        </div>

        {/* Engineering View Selector — thumbnail track, no borders */}
        <div
          className="shrink-0 h-[76px] bg-white grid grid-cols-4"
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
                activeGalleryIndex === i
                  ? "border-b-2 border-b-[#001f4d]"
                  : "border-b-2 border-b-transparent hover:bg-slate-100",
              ].join(" ")}
            >
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

        {/* Trust strip — below thumbnail track */}
        <div className="flex items-center justify-center gap-6 px-4 py-2.5 border-t border-slate-100 bg-white">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">■ ISO 9001:2015 Certified</span>
          <span className="w-px h-3 bg-slate-200" aria-hidden="true" />
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">■ Global Door-to-Door Delivery</span>
        </div>
      </div>
      <div className="lg:col-span-6 p-5 lg:p-8 flex flex-col justify-between lg:border-l lg:border-slate-200">
        <div className="space-y-5">
          {/* Document tag */}
          <p className="font-mono text-[10px] font-bold text-[#003366] uppercase tracking-[0.2em]">
            [ Product Specification Sheet ]
          </p>

          {/* H1 — full product name */}
          <h1 className="font-black text-2xl lg:text-3xl text-[#001f4d] uppercase leading-[1.1] tracking-tight">
            {blade.fullName || blade.name}
          </h1>

          {/* H2 — category label */}
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest border-l-2 border-[#001f4d] pl-3">
            {blade.categoryDisplay}
          </p>

          {/* Description */}
          {(blade.description || blade.fullDescription) && (
            <p className="text-[15px] text-slate-600 leading-relaxed">
              {blade.description || blade.fullDescription}
            </p>
          )}

          {/* Material + Applications spec bullets */}
          {blade.specs && blade.specs.length > 0 && (() => {
            const filtered = blade.specs.filter((s) =>
              /^material$/i.test(s.label.trim()) || /^applications?$/i.test(s.label.trim())
            );
            return filtered.length > 0 ? (
              <ul className="space-y-2.5 pt-1">
                {filtered.map((spec, i) => (
                  <li key={i} className="flex items-baseline gap-2">
                    <span className="text-[#001f4d] font-black flex-shrink-0 text-[11px]">■</span>
                    <span className="text-[14px] leading-snug font-bold">
                      <span className="font-bold text-slate-800 uppercase tracking-wide">{spec.label}: </span>
                      <span className="text-slate-600 font-bold">{spec.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null;
          })()}
        </div>

        {/* CTA buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/contact">
            <button
              type="button"
              className="w-full bg-[#001f4d] hover:bg-white border-2 border-[#001f4d] text-white hover:text-[#001f4d] font-black text-sm uppercase tracking-widest rounded-none transition-colors duration-200 flex items-center justify-between px-6 py-4"
            >
              <span>Request Engineering Quote</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
