/**
 * BladeHero — ZONE 1: CAD Viewport Hero.
 * Left: single product image (618px fixed width, right border only).
 * Right: title, category, description, spec bullets, CTA.
 */

import { useState } from "react";
import { ArrowRight, Download, Loader2 } from "lucide-react";
import type { Blade } from "@/data/blades";
import { getCatalogUrl } from "@/data/blades";

interface BladeHeroProps {
  blade: Blade;
}

const DOT_GRID_STYLE = {
  backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
  backgroundSize: "24px 24px",
} as const;

type CatalogState = "idle" | "form" | "loading" | "done";

export default function BladeHero({ blade }: BladeHeroProps) {
  const catalogUrl = getCatalogUrl(blade);
  const [catalogState, setCatalogState] = useState<CatalogState>("idle");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

  const handleCatalogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCatalogState("loading");
    setFormError("");

    try {
      const res = await fetch("/api/catalog-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId: blade.id }),
      });

      if (!res.ok) throw new Error();

      setCatalogState("done");

      // Trigger download
      const a = document.createElement("a");
      a.href = catalogUrl;
      a.download = "sureay-catalog.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      setCatalogState("form");
      setFormError("Something went wrong. Please try again.");
    }
  };

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
          {blade.specs &&
            blade.specs.length > 0 &&
            (() => {
              const filtered = blade.specs.filter(
                s =>
                  /^material$/i.test(s.label.trim()) ||
                  /^applications?$/i.test(s.label.trim())
              );
              return filtered.length > 0 ? (
                <ul className="space-y-2.5 pt-1">
                  {filtered.map((spec, i) => (
                    <li key={i} className="flex items-baseline gap-2">
                      <span className="text-black font-black flex-shrink-0 text-[11px]">
                        ■
                      </span>
                      <span className="text-[16px] leading-snug">
                        <span className="font-bold text-black uppercase tracking-wide">
                          {spec.label}:{" "}
                        </span>
                        <span className="text-black">{spec.value}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null;
            })()}
        </div>

        {/* CTA */}
        <div className="mt-8 space-y-3">
          <a
            href="#rfq"
            onClick={e => {
              e.preventDefault();
              document
                .getElementById("rfq")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full bg-[#001f4d] hover:bg-white border-2 border-[#001f4d] text-white hover:text-[#001f4d] font-black text-sm uppercase tracking-widest rounded-none transition-colors duration-200 flex items-center justify-between px-6 py-4"
          >
            <span>Request Engineering Quote</span>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </a>

          {/* Catalog download — email gate */}
          {catalogUrl && (
            <div className="border-2 border-slate-300">
              {/* Idle: show button */}
              {catalogState === "idle" && (
                <button
                  type="button"
                  onClick={() => setCatalogState("form")}
                  className="w-full bg-white hover:bg-slate-50 text-[#001f4d] font-bold text-sm uppercase tracking-widest transition-colors duration-200 flex items-center justify-between px-6 py-3"
                >
                  <span>Download Catalog (PDF)</span>
                  <Download className="w-4 h-4 shrink-0" />
                </button>
              )}

              {/* Form: email input */}
              {(catalogState === "form" || catalogState === "loading") && (
                <form onSubmit={handleCatalogSubmit} className="p-4 space-y-3">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    Enter your work email to download
                  </p>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full border border-slate-300 px-4 py-2.5 text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#001f4d] rounded-none"
                  />
                  {formError && (
                    <p className="text-red-500 text-xs font-mono">{formError}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={catalogState === "loading"}
                      className="flex-1 bg-[#001f4d] text-white font-black text-xs uppercase tracking-widest px-4 py-2.5 hover:bg-[#003080] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {catalogState === "loading" ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        "Send & Download"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCatalogState("idle");
                        setFormError("");
                      }}
                      className="px-4 py-2.5 border border-slate-300 text-slate-500 text-xs font-mono uppercase tracking-widest hover:border-slate-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Done: confirmation */}
              {catalogState === "done" && (
                <div className="px-6 py-3 flex items-center gap-3">
                  <span className="text-green-600 font-black text-sm">✓</span>
                  <span className="font-mono text-[11px] text-slate-600 uppercase tracking-widest">
                    Download started — check your downloads folder
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
