import { Link } from "wouter";

export default function HomeHero() {
  return (
    <section className="relative w-full h-[515px] overflow-hidden bg-slate-900">
      {/* Hero image — LCP optimised: fetchpriority high, eager load */}
      <img
        src="/images/hero/homehero.webp"
        alt="Sureay Machinery precision industrial blade manufacturing facility"
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-[2px] bg-white/50" />
            <p className="text-white/60 font-semibold text-xs uppercase tracking-[0.28em]">
              Sureay Machinery Manufacturing Co., Ltd.
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-[42px] font-black text-white leading-[1.05] mb-6 tracking-tight">
            Precision Industrial Blades &amp; Recycling Solutions
          </h1>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <button className="bg-white text-[#003366] hover:bg-[#003366] hover:text-white px-9 py-3.5 font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl rounded-none">
                Get a Quote
              </button>
            </Link>
            <Link href="/products">
              <button className="bg-transparent text-white border-2 border-white/60 hover:bg-white hover:text-[#003366] hover:border-white px-9 py-3.5 font-black text-sm uppercase tracking-widest transition-all duration-300 rounded-none">
                View Our Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
