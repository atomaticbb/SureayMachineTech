import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/lib/useTranslation";

const HERO_SLIDES = [
  {
    label: "Industrial blades",
    titleKey: "home.hero.headline",
    bodyKey: "home.hero.body",
    altKey: "home.hero.imageAlt",
    image: "/images/hero/homehero.webp",
    mobileImage: "/images/home/hero-blades-mobile.webp",
    width: 1680,
    height: 620,
  },
  {
    label: "Mixer wear parts",
    titleKey: "mixer.hub.title",
    bodyKey: "home.hero.mixerBody",
    altKey: "home.hero.mixerImageAlt",
    image: "/images/home/hero-mixer-chamber-1920w.webp",
    mobileImage: "/images/home/hero-mixer-mobile.webp",
    width: 1920,
    height: 1080,
  },
] as const;

function HomeHeroCarousel() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const isPlaying = playing && !reduceMotion;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => {
      setActive(current => (current + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [active, isPlaying]);

  return (
    <section
      aria-label="Product highlights"
      aria-roledescription="carousel"
      className="relative h-[calc(100svh-153px-env(safe-area-inset-bottom))] min-h-[460px] overflow-hidden bg-[#0b1827] lg:h-[calc(100svh-74px)] lg:min-h-[560px]"
    >
      {HERO_SLIDES.map((slide, index) => {
        const visible = active === index;
        const Heading = index === 0 ? "h1" : "h2";
        return (
          <div
            key={slide.label}
            role="group"
            aria-label={slide.label}
            aria-roledescription="slide"
            aria-hidden={!visible}
            className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-500 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <picture>
              <source media="(max-width: 639px)" srcSet={slide.mobileImage} />
              {index === 1 && (
                <source
                  srcSet={`/images/home/hero-mixer-chamber-960w.webp 960w, ${slide.image} 1920w`}
                  sizes="100vw"
                />
              )}
              <img
                src={slide.image}
                alt={t(slide.altKey)}
                fetchPriority={index === 0 ? "high" : "low"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                width={slide.width}
                height={slide.height}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#020b16]/95 via-[#071321]/40 to-transparent sm:bg-gradient-to-r sm:from-[#020b16]/90 sm:via-[#071321]/40" />
            <div className="home-content relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 sm:justify-center sm:px-8 sm:pb-12 lg:px-12">
              <Heading className="mb-4 max-w-2xl text-[32px] font-black leading-[1.08] tracking-tight text-white lg:text-[46px]">
                {t(slide.titleKey)}
              </Heading>
              <p className="max-w-xl text-[18px] leading-relaxed text-white/90">
                {t(slide.bodyKey)}
              </p>
            </div>
          </div>
        );
      })}
      <div className="home-content absolute inset-x-0 bottom-5 mx-auto flex max-w-7xl items-center px-6 sm:px-8 lg:px-12">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            aria-label={`Show ${slide.label.toLowerCase()}`}
            aria-pressed={index === active}
            onClick={() => {
              setActive(index);
              setPlaying(false);
            }}
            className="grid min-h-11 min-w-11 place-items-center focus-visible:outline-2 focus-visible:outline-white"
          >
            <span className={`h-[3px] w-8 ${index === active ? "bg-white" : "bg-white/45"}`} />
          </button>
        ))}
        {!reduceMotion && (
          <button
            type="button"
            aria-label={playing ? "Pause carousel" : "Play carousel"}
            onClick={() => setPlaying(current => !current)}
            className="grid min-h-11 min-w-11 place-items-center text-white focus-visible:outline-2 focus-visible:outline-white"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
        )}
      </div>
    </section>
  );
}

export default function HomeHero() {
  const { t, lang } = useTranslation();
  if (lang === "en") return <HomeHeroCarousel />;
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
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-[2px] bg-white/50" />
            <p className="text-white/60 font-semibold text-xs  tracking-[0.28em]">
              {t("home.hero.eyebrow")}
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-[30px] lg:text-[46px] font-black text-white leading-[1.05] mb-6 tracking-tight">
            {t("home.hero.headline")}
          </h1>

          <p className="text-description max-w-2xl text-white/90 leading-relaxed mb-8">
            {t("home.hero.body")}
          </p>

          {/* CTAs — solid primary + two framed (outline) secondaries */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact">
              <button className="bg-white text-[#003366] border-2 border-white hover:bg-[#003366] hover:text-white hover:border-[#003366] px-7 py-3.5 min-h-[44px] font-black text-sm  tracking-widest transition-all duration-300 rounded-none">
                {t("home.hero.ctaPrimary")}
              </button>
            </Link>
            <Link href="/products">
              <button className="bg-transparent text-white border-2 border-white/70 hover:bg-white hover:text-[#003366] hover:border-white px-7 py-3.5 min-h-[44px] font-black text-sm  tracking-widest transition-all duration-300 rounded-none">
                {t("nav.industrialBlades")}
              </button>
            </Link>
            <Link href="/mixer-wear-parts">
              <button className="bg-transparent text-white border-2 border-white/70 hover:bg-white hover:text-[#003366] hover:border-white px-7 py-3.5 min-h-[44px] font-black text-sm  tracking-widest transition-all duration-300 rounded-none">
                {t("nav.mixerWearParts")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
