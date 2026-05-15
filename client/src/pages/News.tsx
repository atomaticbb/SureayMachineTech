/**
 * News.tsx → "Corporate Dispatches"
 * Swiss Brutalist Architecture: Zero radius, high contrast, strict grids.
 * Data sourced from client/src/data/news.ts
 */

import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import { SORTED_DISPATCHES } from "@/data/news";

// ── UI Constants ──────────────────────────────────────────────────────────────

const CATEGORIES: { value: string; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "TECHNICAL GUIDE", label: "Technical Guides" },
  { value: "COMPANY NEWS", label: "Company News" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CorporateDispatches() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const allPosts = SORTED_DISPATCHES;

  const filteredDispatches =
    activeCategory === "ALL"
      ? allPosts
      : allPosts.filter(d => d.tag === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      <SEO
        title="Industry Dispatches — Blade Technology & News"
        description="Latest updates from Sureay: technology innovations, exhibition reports and company milestones in industrial blade manufacturing."
        canonicalUrl="/news"
      />
      <Navbar />

      <main className="pt-[74px]">
        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 1 — Hero
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative border-b border-slate-200 h-[420px] lg:h-[500px] overflow-hidden">
          {/* Background image */}
          <img
            src="/images/hero/product-hero.webp"
            alt="Sureay News & Industry Updates"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            width={1920}
            height={500}
            decoding="async"
          />
          {/* Text overlay */}
          <div className="relative h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-4xl">
            <p className="text-[11px] font-semibold tracking-[0.28em]  text-white/50 mb-5">
              News & Industry Updates
            </p>
            <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-black text-white  tracking-tight leading-none mb-6">
              Articles
              <br />
              and News
            </h1>
            <div className="w-12 h-[3px] bg-white/30 mb-6" />
            <p className="text-white/70 text-[16px] leading-relaxed max-w-xl">
              Latest news and technology articles about us.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 2 — Category Filter
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto border-l border-slate-200">
            <div className="flex overflow-x-auto flex-nowrap w-full no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`flex-shrink-0 min-w-fit md:flex-1 px-8 py-4 border-r border-slate-200 text-center font-mono text-[11px] font-semibold tracking-[0.16em] whitespace-nowrap transition-colors ${
                    activeCategory === cat.value
                      ? "bg-[#001f4d] text-white"
                      : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#001f4d]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 3 — Articles Grid
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8">
          {filteredDispatches.length === 0 ? (
            <p className="font-mono text-sm text-slate-400 tracking-widest">
              — No dispatches in this category —
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDispatches.map(post => (
                <Link key={post.id} href={`/news/${post.id}`}>
                  <a className="bg-white border border-slate-200 group cursor-pointer flex flex-col hover:border-[#001f4d] transition-colors duration-300">
                    {/* Image — taller for 2-col layout */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 border-b border-slate-200">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={450}
                      />
                      <div className="absolute top-0 left-0 bg-white border-b border-r border-slate-200 px-3 py-1.5">
                        <span className="font-mono text-[9px] font-bold text-[#001f4d] tracking-widest ">
                          {post.date}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-7 flex flex-col flex-grow">
                      <p className="text-[10px] font-semibold tracking-[0.22em] text-slate-400  mb-3">
                        {post.tag}
                      </p>
                      <h2 className="text-[18px] font-black text-[#001f4d]  leading-tight tracking-tight mb-3 group-hover:text-[#003366] transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="text-[15px] text-slate-500 leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <span className="text-[12px] font-black tracking-[0.16em]  text-[#001f4d] group-hover:text-[#003366] transition-colors">
                          Continue Reading →
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
