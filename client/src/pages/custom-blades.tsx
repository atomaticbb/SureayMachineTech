/*
 * custom-blades.tsx — Special-Shaped & Custom Profile Blades
 * Swiss Brutalist B2B · Deep Navy · Zero rounded corners
 * Hero follows ProductListPage pattern: left navy diagonal + right image
 */

import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import SEO from "@/components/common/SEO";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactRFQ from "@/components/home/ContactRFQ";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqItem from "@/components/ui/FaqItem";

// ─── Capabilities ─────────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    label: "Drawing-to-Blade",
    title: "Any Profile. Any Geometry. Exact Tolerance.",
    summary:
      "Submit your DXF, DWG, STEP file — or send a worn physical sample. We reverse-engineer the geometry, verify it on a CMM, and manufacture to your exact specification. No standard catalog required.",
    points: [
      "5-axis CNC profile grinding handles concave radii, angled bevels, serrated edges, asymmetric cross-sections, and multi-step profiles that standard tooling cannot reach.",
      "Dimensional tolerances held to ±0.02 mm on profile and ±0.005 mm on critical edge geometry — documented on a CMM inspection certificate with every order.",
    ],
    imageSrc: "/images/products/blades/special-shaped-knife.webp",
    imageAlt: "Custom profile special-shaped industrial blades overview",
  },
  {
    label: "Material Engineering",
    title: "Steel and Carbide Grade Matched to Your Cutting Condition",
    summary:
      "Custom geometry does not mean compromising on material performance. We select and heat-treat every alloy to the actual operating load — abrasion level, impact risk, temperature, and required edge life.",
    points: [
      "D2 cold-work tool steel (HRC 60–62) for high-abrasion, moderate-impact cutting. H13 hot-work steel (HRC 48–52) where thermal cycling is severe. PM-HSS and solid carbide for the most demanding profiles.",
      "Vacuum heat treatment and deep cryogenic post-treatment eliminate retained austenite and maximize dimensional stability across the full production run.",
    ],
    imageSrc: "/images/process/material-choosing.webp",
    imageAlt: "Material selection for custom profile industrial blades",
  },
  {
    label: "OEM Drop-In Replacement",
    title: "Reverse-Engineered to Fit. Certified to Ship.",
    summary:
      "Whether you are replacing a discontinued OEM part or qualifying a new supplier for a proprietary machine knife, we match fit and function with full documentation.",
    points: [
      "CMM verification confirms dimensional compliance before shipment. Hardness certificate, steel mill traceability, and heat treatment batch records included as standard.",
      "Compatible with any machine platform — no drawings needed if you supply a worn sample or key dimensions. First-article inspection report available on request.",
    ],
    imageSrc: "/images/process/CMM-verification.webp",
    imageAlt: "CMM quality inspection of custom special-shaped blades",
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────────
const PROCESS = [
  {
    step: "01",
    title: "Upload Drawing or Send Sample",
    body: "Share your DXF / DWG / STEP file via the form below, or ship a physical sample. We accept any format — even a dimensioned sketch.",
  },
  {
    step: "02",
    title: "Engineering Review & Quotation",
    body: "Our application engineers review geometry, material options, and tolerances. You receive a detailed quotation within 1–2 business days.",
  },
  {
    step: "03",
    title: "First-Article Sample",
    body: "We manufacture a sample batch with CMM inspection report. Approve dimensions, edge geometry, and hardness before committing to full production.",
  },
  {
    step: "04",
    title: "Batch Production & Delivery",
    body: "Full production run with consistent quality. Every shipment includes hardness certificate, dimensional report, and material traceability.",
  },
];

// ─── Profile Types ────────────────────────────────────────────────────────────
const PROFILES = [
  "Straight Knives (Single / Double Bevel)",
  "Circular Disc Blades (Any OD / ID)",
  "Serrated & Perforated Edges",
  "Multi-Step & Shoulder Profiles",
  "Asymmetric Cross-Sections",
  "Hook / Hook-and-Tooth Forms",
  "Conical & Tapered Profiles",
  "Carbide-Tipped Composite Blades",
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  {
    value: "1 Piece",
    label: "Minimum Order Quantity",
    sub: "Custom & Prototype",
  },
  {
    value: "7 Days",
    label: "Drawing to First Sample",
    sub: "From Drawing Approval",
  },
  {
    value: "ISO 9001:2015",
    label: "Quality Management",
    sub: "Certified",
  },
  {
    value: "Drawing or Sample",
    label: "Input Accepted",
    sub: "DXF / DWG / STEP / Physical",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is the minimum order quantity for custom profile blades?",
    a: "Our minimum order quantity is 1 piece. We accept single-piece prototype orders, first-article samples, and full production runs on the same manufacturing line. There is no volume threshold required to place a custom order.",
  },
  {
    q: "What drawing formats do you accept for custom blade orders?",
    a: "We accept DXF, DWG, and STEP files as standard. PDF drawings with full dimensioning are also accepted. If you do not have a drawing, you can ship a physical sample or worn blade — we will reverse-engineer the geometry on our CMM and produce a drawing for your approval before manufacturing.",
  },
  {
    q: "How long does it take to receive a first-article sample?",
    a: "Standard lead time from drawing approval to first-article sample dispatch is 7 working days for most profiles in D2 or H13 steel. Carbide-tipped or solid carbide profiles require 10–14 working days. Complex multi-step or tight-tolerance profiles may require additional time — confirmed at quotation stage.",
  },
  {
    q: "What materials are available for custom profile blades?",
    a: "We manufacture custom profiles in D2 cold-work tool steel (HRC 60–62), H13 hot-work tool steel (HRC 48–52), PM-HSS powder-metallurgy high-speed steel, and solid tungsten carbide. Material selection is matched to your cutting condition — abrasion level, impact load, temperature, and required edge life — at the quotation stage.",
  },
  {
    q: "Can you reverse-engineer a blade from a physical sample without a drawing?",
    a: "Yes. Send us the worn or undamaged sample and we will measure all critical dimensions on our coordinate measuring machine (CMM), produce a dimensioned drawing, and submit it for your approval. Manufacturing starts only after you confirm the drawing is correct. The CMM report is included with the first-article shipment.",
  },
  {
    q: "What quality documentation is included with every custom blade order?",
    a: "Every custom blade shipment includes: Rockwell HRC hardness test certificate, CMM dimensional inspection report confirming all critical dimensions and tolerances, steel mill material traceability certificate, and heat treatment batch certificate. First-article orders additionally include a first-article inspection report (FAIR). Enhanced documentation packages for ISO 9001 qualification are available on request.",
  },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Special-Shaped & Custom Profile Industrial Blades",
      description:
        "Precision-manufactured custom profile and special-shaped industrial blades produced from customer DXF/DWG/STEP drawings or physical samples. D2, H13, PM-HSS, and solid carbide. Tolerances to ±0.02 mm. MOQ 1 piece.",
      image: "https://sureay.com/images/products/blades/special-shaped-knife.webp",
      url: "https://sureay.com/custom-blades",
      brand: { "@type": "Brand", name: "Sureay" },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "20",
        highPrice: "800",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Sureay Machinery Technology Co., Ltd." },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function CustomBlades() {
  return (
    <>
      <SEO
        title="Special-Shaped & Custom Profile Blades — OEM Manufacturing"
        description="Sureay manufactures special-shaped and custom profile industrial blades from customer drawings or samples. D2, H13, PM-HSS, carbide. ±0.02 mm tolerance. DXF/DWG/STEP accepted."
        canonicalUrl="/custom-blades"
        keywords="custom profile blades, special shaped industrial knives, OEM custom blades manufacturer, special knife profiles, custom machine knives DXF"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(PAGE_SCHEMA)}</script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 pt-[74px]">
        <Navbar />

        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Special-Shaped Blades" },
          ]}
        />

        {/* ── Hero (ProductListPage pattern) ──────────────────────────────── */}
        <section className="relative border-b border-slate-200 h-[420px] lg:h-[500px] overflow-hidden">
          {/* Right: full-bleed placeholder image */}
          <img
            src="/images/products/blades/special-shaped-knife-01.webp"
            alt="Custom profile special-shaped industrial blades"
            fetchPriority="high"
            decoding="async"
            width={2048}
            height={2048}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-90 saturate-75"
          />

          {/* Left: navy diagonal panel */}
          <div
            className="absolute inset-y-0 left-0 h-full bg-[#001f4d] flex flex-col justify-between pl-12 pr-24 sm:pl-20 sm:pr-32 lg:pl-28 lg:pr-40 py-8 lg:py-16 w-full lg:w-[62%]"
            style={{
              clipPath: "polygon(0 0, 100% 0, calc(100% - 120px) 100%, 0 100%)",
            }}
          >
            <div>
              <p className="font-mono text-[10px] text-white/40 tracking-[0.35em] uppercase mb-8 hidden sm:block">
                [ CUSTOM MANUFACTURING — SPECIAL-SHAPED BLADES ]
              </p>

              <h1 className="text-[clamp(1.75rem,6vw,3.25rem)] font-black text-white uppercase tracking-tight leading-[1.0] mb-8">
                Special-Shaped
                <br />
                &amp; Custom
                <br />
                Profile Blades
              </h1>

              <div className="border-l-4 border-white/30 pl-5 max-w-xl mb-10">
                <p className="text-white/70 text-base leading-relaxed">
                  Send your drawing or a worn sample. We manufacture any blade
                  profile — any geometry, any alloy — with CMM-verified
                  tolerances and full material documentation.
                </p>
              </div>
            </div>

            <a href="#rfq" className="self-start">
              <button className="bg-white text-[#003366] hover:bg-slate-100 px-7 py-3 font-black text-[13px] uppercase tracking-widest transition-colors rounded-none">
                Upload Drawing →
              </button>
            </a>

          </div>
        </section>

        {/* ── Stats Strip ─────────────────────────────────────────────────── */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={[
                    "px-6 md:px-8 py-10 flex flex-col gap-1.5",
                    i % 2 === 0 ? "border-r border-slate-200" : "",
                    i < 2 ? "border-b border-slate-200 md:border-b-0" : "",
                    i < 3 ? "md:border-r border-slate-200" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400">
                    {stat.sub}
                  </p>
                  <p className="text-[clamp(1rem,2.5vw,1.5rem)] font-black text-[#001f4d] leading-tight tracking-tight font-mono">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-500 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Capabilities ────────────────────────────────────────────────── */}
        <section id="capabilities" className="bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 lg:pt-20 pb-10 lg:pb-12">
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-4">
              Custom Manufacturing
            </p>
            <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] uppercase tracking-tight leading-[1.05] max-w-3xl">
              From Drawing to Finished Blade
            </h2>
            <div className="w-14 h-[3px] bg-slate-300 mt-6" />
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-14 lg:pb-20">
            {CAPABILITIES.map((block, index) => {
              const reverse = index % 2 === 1;
              return (
                <motion.div
                  key={block.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 lg:py-14 border-b border-slate-100 last:border-0"
                >
                  <div
                    className={[
                      "lg:col-span-5",
                      reverse ? "lg:order-2" : "lg:order-1",
                    ].join(" ")}
                  >
                    <div className="relative h-[260px] md:h-[300px] lg:h-[340px] overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={block.imageSrc}
                        alt={block.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/30 to-transparent" />
                    </div>
                  </div>
                  <div
                    className={[
                      "lg:col-span-7 flex flex-col justify-center",
                      reverse ? "lg:order-1" : "lg:order-2",
                    ].join(" ")}
                  >
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">
                      {block.label}
                    </p>
                    <h3 className="font-black text-2xl md:text-[30px] text-[#001f4d] uppercase tracking-tight leading-[1.08] mb-5 max-w-2xl">
                      {block.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
                      {block.summary}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {block.points.map(point => (
                        <div
                          key={point}
                          className="border-l-2 border-slate-200 pl-4"
                        >
                          <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Profile Types ────────────────────────────────────────────────── */}
        <section className="bg-slate-50 border-y border-slate-200 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="lg:pt-2">
                <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-4">
                  Profile Range
                </p>
                <h2 className="font-black text-2xl md:text-[32px] text-[#001f4d] uppercase tracking-tight leading-[1.05] mb-6">
                  We Manufacture Any Profile
                </h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                  No profile is too complex. If it can be defined in a drawing,
                  we can grind it. The list below covers the most common
                  requests — contact us for any geometry not listed.
                </p>
                <a href="#rfq">
                  <button className="bg-[#001f4d] text-white hover:bg-[#003366] px-7 py-3.5 font-black text-sm uppercase tracking-widest transition-colors rounded-none">
                    Discuss Your Profile →
                  </button>
                </a>
              </div>

              <div className="border border-slate-200 bg-white">
                {PROFILES.map((profile, i) => (
                  <div
                    key={profile}
                    className={[
                      "px-6 py-5 flex items-center gap-4",
                      i < PROFILES.length - 1 ? "border-b border-slate-100" : "",
                    ].join(" ")}
                  >
                    <span className="w-[3px] h-5 bg-[#001f4d] flex-shrink-0" />
                    <span className="text-[13px] font-semibold text-slate-700 tracking-[0.06em]">
                      {profile}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Process Timeline ─────────────────────────────────────────────── */}
        <section className="bg-white border-b border-slate-200 py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-4">
              How It Works
            </p>
            <h2 className="font-black text-2xl md:text-[32px] text-[#001f4d] uppercase tracking-tight leading-[1.05] mb-12 max-w-xl">
              Drawing to Delivery in 4 Steps
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 divide-y divide-slate-200 sm:divide-y-0">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, delay: i * 0.1 },
                    },
                  }}
                  className={[
                    "p-7",
                    i % 2 === 0 && i < 3 ? "sm:border-r border-slate-200" : "",
                    i < 2 ? "sm:border-b border-slate-200 lg:border-b-0" : "",
                    i >= 2 ? "sm:border-t border-slate-200 lg:border-t-0" : "",
                    i < 3 ? "lg:border-r border-slate-200" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <p className="font-mono text-[28px] font-black text-slate-200 leading-none mb-4">
                    {step.step}
                  </p>
                  <h3 className="font-black text-[14px] uppercase tracking-[0.1em] text-[#001f4d] mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="bg-slate-50 border-y border-slate-200 py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left: heading */}
              <div className="lg:sticky lg:top-24 self-start">
                <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-4">
                  Common Questions
                </p>
                <h2 className="font-black text-2xl md:text-[32px] text-[#001f4d] uppercase tracking-tight leading-[1.05] mb-6">
                  Questions Before
                  <br />
                  Sending a Drawing
                </h2>
                <div className="w-14 h-[3px] bg-slate-300 mb-6" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-sm">
                  Straight answers to what most OEM engineers ask before
                  submitting a custom blade inquiry.
                </p>
              </div>

              {/* Right: accordion */}
              <div className="bg-white border border-slate-200">
                {FAQS.map((item, i) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} index={i + 1} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RFQ Form ─────────────────────────────────────────────────────── */}
        <div id="rfq">
          <ContactRFQ productName="Special-Shaped / Custom Profile Blades" />
        </div>

        <Footer />
      </div>
    </>
  );
}
