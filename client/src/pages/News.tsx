/**
 * News.tsx → "Corporate Dispatches"
 * Swiss Brutalist Architecture: Zero radius, high contrast, strict grids.
 * Data sourced from client/src/data/news.ts
 */

import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllDispatches, getFeaturedDispatch } from "@/data/news";

// ── UI Constants ──────────────────────────────────────────────────────────────

const CATEGORIES = ["ALL", "TECH INNOVATION", "EXHIBITIONS", "COMPANY UPDATES"];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CorporateDispatches() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const featured   = getFeaturedDispatch();
  const allPosts   = getAllDispatches();

  const filteredDispatches =
    activeCategory === "ALL"
      ? allPosts
      : allPosts.filter((d) => d.tag === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      <Navbar />

      <main className="pt-[74px]">

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 1 — The Press Viewport (Featured Article)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-slate-200">
          <Link href={`/news/${featured.id}`}>
          <a className="flex flex-col lg:flex-row min-h-[500px]">

            {/* Left: Featured Image */}
            <div className="lg:w-[60%] relative overflow-hidden bg-slate-200 min-h-[300px] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-slate-200 group cursor-pointer">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute top-0 left-0 bg-white border-b border-r border-slate-200 px-4 py-2">
                <span className="font-mono text-[10px] font-bold text-[#001f4d] tracking-widest uppercase">
                  {featured.date}
                </span>
              </div>
            </div>

            {/* Right: Featured Content */}
            <div className="lg:w-[40%] bg-[#001f4d] text-white p-10 lg:p-16 flex flex-col justify-center">
              <p className="font-mono text-[10px] text-cyan-400 tracking-[0.25em] uppercase mb-4">
                {featured.tag}
              </p>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05] mb-6">
                {featured.title}
              </h1>
              <p className="text-white/70 text-sm leading-relaxed mb-10 max-w-md">
                {featured.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-white/20 pt-6">
                <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
                  READ TIME: {featured.readTime}
                </span>
                <span className="font-black text-sm uppercase tracking-widest hover:text-cyan-400 transition-colors">
                  READ DISPATCH ↗
                </span>
              </div>
            </div>

          </a>
          </Link>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 2 — The Index Ledger (Category Filter)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-slate-200 sticky ">
          <div className="max-w-7xl mx-auto border-l border-slate-200">
            <div className="flex overflow-x-auto flex-nowrap w-full no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 min-w-fit md:flex-1 px-8 py-4 border-r border-slate-200 text-center font-mono text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? "bg-[#001f4d] text-white"
                      : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#001f4d]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ZONE 3 — The Archive Matrix (Articles Grid)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 lg:px-8">
          {filteredDispatches.length === 0 ? (
            <p className="font-mono text-sm text-slate-400 uppercase tracking-widest">
              — NO DISPATCHES IN THIS CATEGORY —
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDispatches.map((post) => (
                <Link key={post.id} href={`/news/${post.id}`}>
                <a className="bg-white border border-slate-200 group cursor-pointer flex flex-col hover:border-[#001f4d] transition-colors duration-300">

                  {/* Image Viewport */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border-b border-slate-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-0 left-0 bg-white border-b border-r border-slate-200 px-3 py-1.5">
                      <span className="font-mono text-[9px] font-bold text-[#001f4d] tracking-widest uppercase">
                        {post.date}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="font-mono text-[9px] text-slate-400 tracking-[0.2em] mb-3 uppercase">
                      {post.tag}
                    </p>
                    <h2 className="text-xl font-black text-[#001f4d] uppercase leading-tight tracking-tight mb-3 group-hover:text-cyan-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    {/* Meta Footer */}
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                      <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase">
                        READ TIME: {post.readTime}
                      </span>
                      <span className="font-black text-[#001f4d] text-lg leading-none group-hover:translate-x-1 transition-transform">
                        →
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
