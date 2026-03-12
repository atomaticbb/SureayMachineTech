import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getAllDispatches } from "@/data/news";

// Latest 3 non-featured articles — single source of truth shared with /news page
const LATEST = getAllDispatches().slice(0, 3);

export default function NewsGrid() {
  return (
    <section className="bg-white border-t border-slate-200 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">
              Knowledge Hub
            </p>
            <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] uppercase tracking-tight leading-[1.05]">
              News &amp; Articles
            </h2>
            <div className="w-14 h-[3px] bg-slate-300 mt-6" />
          </div>
          <Link href="/news">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#003366] hover:text-[#001f4d] transition-colors border-b-2 border-[#003366] hover:border-[#001f4d] pb-0.5">
              View All Dispatches
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Article cards — style mirrors /news page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LATEST.map((article) => (
            <Link key={article.id} href={`/news/${article.id}`}>
              <a className="bg-white border border-slate-200 group cursor-pointer flex flex-col hover:border-[#001f4d] transition-colors duration-300 h-full">

                {/* Image with date stamp */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-0 left-0 bg-white border-b border-r border-slate-200 px-3 py-1.5">
                    <span className="font-mono text-[9px] font-bold text-[#001f4d] tracking-widest uppercase">
                      {article.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="font-mono text-[9px] text-slate-400 tracking-[0.2em] mb-3 uppercase">
                    {article.tag}
                  </p>
                  <h3 className="text-lg font-black text-[#001f4d] uppercase leading-tight tracking-tight mb-3 group-hover:text-cyan-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                    <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase">
                      READ TIME: {article.readTime}
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

      </div>
    </section>
  );
}
