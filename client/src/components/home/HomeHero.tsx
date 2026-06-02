import { Link } from "wouter";
import { useTranslation } from "@/lib/useTranslation";

export default function HomeHero() {
  const { t } = useTranslation();
  return (
    <section className="relative w-full h-[calc(100svh-68px)] min-h-[560px] overflow-hidden bg-slate-900">
      {/* Hero image — LCP optimised: fetchpriority high, eager load */}
      <img
        src="/images/hero/homehero.webp"
        alt={t("home.hero.imageAlt")}
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-[2px] bg-white/50" />
            <p className="text-white/60 font-semibold text-xs  tracking-[0.28em]">
              {t("home.hero.eyebrow")}
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(1.75rem,6vw,2.75rem)] font-black text-white leading-[1.05] mb-6 tracking-tight">
            {t("home.hero.headline")}
          </h1>

          <p className="max-w-2xl text-base md:text-lg text-white/90 leading-relaxed mb-8">
            {t("home.hero.body")}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <button className="bg-white text-[#003366] border-2 border-white hover:bg-[#003366] hover:text-white hover:border-[#003366] px-7 sm:px-9 py-3.5 min-h-[44px] font-black text-sm  tracking-widest transition-all duration-300 rounded-none">
                {t("home.hero.ctaPrimary")}
              </button>
            </Link>
            <Link href="/products">
              <button className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#003366] px-7 sm:px-9 py-3.5 min-h-[44px] font-black text-sm  tracking-widest transition-all duration-300 rounded-none">
                {t("home.hero.ctaSecondary")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
