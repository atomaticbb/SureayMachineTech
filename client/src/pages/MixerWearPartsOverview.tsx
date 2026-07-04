/**
 * MixerWearPartsOverview — Mixer Wear Parts business-line landing
 * Route: /mixer-wear-parts
 *
 * Tells the wear-parts story (Ni-Hard / high-chrome materials, the casting
 * capability shared with the blade business, OEM fit, ISO) then splits to the
 * two aggregation pages. Internal links stay inside the mixer cluster.
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductGrid from "@/components/product/ProductGrid";
import ContactRFQ from "@/components/home/ContactRFQ";

import { mixerCategories, getFeaturedMixerParts } from "@/data/mixerParts";
import { mixerToBlade } from "@/lib/mixerToBlade";

const STORY = [
  {
    tag: "MATERIALS",
    title: "Ni-Hard & High-Chromium Iron",
    body: "Liners, blades and scrapers are cast in Ni-Hard and high-chromium iron above HB 600, harder than the aggregate that grinds against them. Mixing arms use tough alloy-steel casting that takes shock load without cracking.",
  },
  {
    tag: "FOUNDRY",
    title: "Lost-Foam & DISA Casting",
    body: "The same foundry and metallurgy team behind our industrial blade business casts every wear part on lost-foam and DISA green-sand lines, then machines it to the original bolt pattern for a flush, drop-in fit.",
  },
  {
    tag: "MADE TO FIT",
    title: "Reverse-Engineered to Fit",
    body: "There is no catalogue number to look up. Every part is reverse-engineered from your worn sample or plant model and machined to the original bore, bolt circle and profile — so it drops onto the shaft without shimming, drilling or field grinding.",
  },
  {
    tag: "QUALITY",
    title: "ISO 9001:2015, Factory-Direct",
    body: "Sureay is ISO 9001:2015 certified and ships factory-direct to over 50 countries, with material and hardness reports available on request. OEM/ODM programmes are welcome.",
  },
];

const HERO_TRUST = [
  "ISO 9001:2015 Certified",
  "Ni-Hard / High-Chrome Cast",
  "Made to Order",
  "Ships to 50+ Countries",
];

export default function MixerWearPartsOverview() {
  const featured = getFeaturedMixerParts(4).map(mixerToBlade);

  // Hub structured data — CollectionPage whose ItemList members are the 2
  // category hubs (not the leaf products), so schema tiers == URL tiers:
  // overview → category → product. Emitted via <SEO extraJsonLd>.
  const collectionLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Concrete & Asphalt Mixing Plant Wear Parts",
    url: "https://sureay.com/mixer-wear-parts",
    description:
      "Cast wear parts for concrete and asphalt mixing plants — mixing arms, liner plates, scrapers, blades and seals, reverse-engineered to fit the plant you run.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: mixerCategories.length,
      itemListElement: mixerCategories.map((cat, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://sureay.com${cat.link}`,
        name: cat.name,
        image: `https://sureay.com/images/mixer-parts/hero/${cat.id}-scene.webp`,
      })),
    },
  });

  return (
    <div className="min-h-screen bg-white antialiased">
      <SEO
        title="Concrete & Asphalt Mixing Plant Wear Parts | Mixing Arms, Liners, Blades"
        description="Factory-direct mixing arms, liner plates, scrapers and blades for concrete and asphalt mixing plants. Ni-Hard / high-chrome cast wear parts, OEM-fit, ISO 9001:2015."
        canonicalUrl="/mixer-wear-parts"
        brand="Sureay"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Mixer Wear Parts", url: "/mixer-wear-parts" },
        ]}
        extraJsonLd={[collectionLd]}
      />
      <Navbar />

      {/* 1 · Hero */}
      <section className="relative mt-[74px] h-[420px] lg:h-[500px] overflow-hidden border-b border-slate-200">
        {/* Right image region — full height so the whole part shows, not cropped */}
        <div className="absolute inset-y-0 right-0 h-full w-full lg:w-[46%]">
          <img
            src="/images/mixer-parts/hero/mixer-wear-parts-hero.webp"
            srcSet="/images/mixer-parts/hero/mixer-wear-parts-hero-800w.webp 800w, /images/mixer-parts/hero/mixer-wear-parts-hero.webp 1600w"
            sizes="(max-width: 1024px) 100vw, 46vw"
            alt="Cast steel mixing arm for concrete and asphalt mixers in a foundry setting"
            className="h-full w-full object-cover object-right"
            width={1600}
            height={900}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        {/* Navy panel — diagonal right edge via clip-path */}
        <div
          className="absolute inset-y-0 left-0 h-full w-full lg:w-[60%] bg-[#001f4d] flex flex-col justify-between pl-12 pr-24 sm:pl-20 sm:pr-32 lg:pl-28 lg:pr-40 py-8 lg:py-16"
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - 120px) 100%, 0 100%)",
          }}
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-white/40 mb-6 uppercase">
              Cast Wear Parts · Made to Fit Your Plant
            </p>
            <h1 className="text-[clamp(2.1rem,5.2vw,3.6rem)] font-black text-white tracking-tight leading-none mb-6">
              Concrete &amp; Asphalt
              <br />
              Mixing Plant
              <br />
              Wear Parts
            </h1>
            <div className="w-12 h-[3px] bg-white/30 mb-6" />
            <p className="text-white/70 text-[15px] lg:text-[16px] leading-relaxed max-w-lg">
              Mixing arms, liners, scrapers, blades and seals —
              reverse-engineered from your worn part or plant model to drop into
              the mixer you run.
            </p>
          </div>
          <ul className="hidden lg:flex flex-wrap gap-x-6 gap-y-2">
            {HERO_TRUST.map(item => (
              <li
                key={item}
                className="font-mono text-[11px] text-white/60 tracking-widest"
              >
                ■ {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Mixer Wear Parts" }]}
      />

      {/* Two Plant Types — primary navigation, directly under the hero */}
      <section
        aria-label="Choose a plant type"
        className="border-b border-slate-200 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 lg:py-16">
          <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-5 uppercase">
            Two Plant Types
          </p>
          <h2 className="text-[26px] lg:text-[34px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-8">
            Find parts for your plant
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mixerCategories.map(cat => (
              <Link key={cat.id} href={cat.link}>
                <a className="group block overflow-hidden bg-white border border-slate-200 hover:border-[#001f4d] hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-200">
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    {/* Default — plant scene */}
                    <img
                      src={`/images/mixer-parts/hero/${cat.id}-scene.webp`}
                      alt={cat.name}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* On hover — the parts in this category */}
                    <img
                      src={`/images/mixer-parts/hero/${cat.id}-products.webp`}
                      alt={`Wear parts for ${cat.name}`}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Grey overlay — tone down the bright plant photos */}
                    <div
                      className="absolute inset-0 bg-slate-900/25 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-slate-200 p-5 lg:p-6">
                    <div className="min-w-0">
                      <h3 className="font-black text-lg lg:text-xl text-[#001f4d] tracking-tight truncate">
                        {cat.name}
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-snug line-clamp-1 mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-[11px] font-black tracking-[0.18em] text-[#001f4d] group-hover:gap-3 transition-all">
                      VIEW PARTS
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2 · Story */}
      <section
        aria-label="Why Sureay mixer wear parts"
        className="border-b border-slate-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24">
          <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-5 uppercase">
            Wear Parts, Engineered
          </p>
          <h2 className="text-[30px] lg:text-[40px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-12 max-w-3xl">
            The metallurgy and foundry behind every part
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {STORY.map(item => (
              <div key={item.tag} className="bg-white p-6 lg:p-8 flex flex-col">
                <span className="font-mono text-[9px] text-[#003a8c] tracking-[0.28em] uppercase mb-3">
                  {item.tag}
                </span>
                <h3 className="font-black text-lg text-[#001f4d] tracking-tight leading-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-[14px] text-slate-600 leading-[1.7]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Featured parts */}
      {featured.length > 0 && (
        <section
          aria-label="Featured wear parts"
          className="border-b border-slate-200 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24">
            <p className="font-mono text-[10px] text-slate-400 tracking-[0.28em] mb-5 uppercase">
              Featured
            </p>
            <h2 className="text-[30px] lg:text-[40px] font-black text-[#001f4d] tracking-tight leading-[1.1] mb-12">
              Popular replacements
            </h2>
            <ProductGrid blades={featured} layout="grid" />
          </div>
        </section>
      )}

      <div id="rfq">
        <ContactRFQ formLocation="mixer_parts" />
      </div>
      <Footer />
    </div>
  );
}
