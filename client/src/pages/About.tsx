/*
 * About Page — "Digital Prospectus" for Sureay Manufacturing
 * Industrial-muscle design: asymmetric hero, bento facility, timeline, OEM funnel
 */

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import OEMConversionFunnel from "@/components/sections/OEMConversionFunnel";
import {
  Award,
  Factory,
  Globe,
  Users,
  Shield,
  Flame,
  Truck,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO — Asymmetrical "Industrial Muscle"
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-900 overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/factory.webp"
            alt="Sureay Manufacturing Facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-36 pb-24 lg:pt-44 lg:pb-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-[#FF6600]"></div>
              <span className="text-[#FF6600] tracking-[0.2em] text-xs font-bold uppercase">
                About Sureay
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Engineering Blade{" "}
              <span className="text-[#FF6600]">Excellence</span>{" "}
              Since 2008
            </h1>
            <p className="text-lg lg:text-xl text-white max-w-xl leading-relaxed">
              Xunrui (Sureay) Machinery specializes in high-performance industrial blades, precision machine knives, and recycling equipment — engineered for the world's most demanding production environments.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. FACILITY — Bento Box Layout + Embedded Stats
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-8 bg-[#FF6600]"></div>
              <span className="text-[#FF6600] tracking-[0.2em] text-xs font-bold uppercase">
                Our Facility
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight mb-4">
              State-of-the-Art Manufacturing
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Our 15,000 m² facility in Ma'anshan houses advanced CNC machining centers, vacuum heat treatment furnaces, and comprehensive metrology equipment.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">

            {/* Main: Wide factory floor (large) */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden group aspect-[4/3] lg:aspect-auto lg:row-span-2">
              <img
                src="/images/about/factory-00.webp"
                alt="Sureay factory floor — CNC machining centers"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-white font-bold text-lg">CNC Machining Workshop</p>
                <p className="text-blue-200 text-sm">20+ multi-axis CNC machining centers</p>
              </div>
            </div>

            {/* Top-right: CNC closeup */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden group aspect-video">
              <img
                src="/images/process/cnc-precision-grinding.webp"
                alt="CNC precision grinding of industrial blade"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5 z-10">
                <p className="text-white font-bold text-sm">Precision Grinding</p>
                <p className="text-blue-200 text-xs">Tight tolerance CNC finishing</p>
              </div>
            </div>

            {/* Bottom-right split: Heat Treatment + QC */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 lg:gap-5">
              <div className="relative rounded-2xl overflow-hidden group aspect-square">
                <img
                  src="/images/process/heat-treatment.webp"
                  alt="Vacuum heat treatment furnace"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-white font-bold text-xs">Heat Treatment</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group aspect-square">
                <img
                  src="/images/common/Quality-Inspection.webp"
                  alt="CMM dimensional inspection"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-white font-bold text-xs">Quality Control</p>
                </div>
              </div>
            </div>

          </div>

          {/* Stats Strip — anchored to facility */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { num: "15+",     label: "Years of Experience" },
              { num: "10,000+", label: "Blade Designs Delivered" },
              { num: "98%",     label: "Customer Satisfaction" },
              { num: "50+",     label: "Countries Served" },
            ].map((s, i) => (
              <div key={i} className="text-center py-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
                <p className="text-3xl md:text-4xl font-black text-[#003366] dark:text-white tracking-tight">{s.num}</p>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. OUR STORY — Blockquote + Vertical Timeline
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-[2px] w-8 bg-[#FF6600]"></div>
              <span className="text-[#FF6600] tracking-[0.2em] text-xs font-bold uppercase">
                Our Journey
              </span>
              <div className="h-[2px] w-8 bg-[#FF6600]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] dark:text-white">
              Our Story
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: Oversized Blockquote */}
            <div>
              <blockquote className="border-l-4 border-[#FF6600] pl-6 lg:pl-8 mb-10">
                <p className="text-2xl lg:text-3xl font-bold text-[#003366] dark:text-white leading-snug italic">
                  "We don't just supply blades — we are your strategic partner in maximizing uptime and cutting performance."
                </p>
              </blockquote>
              <div className="space-y-5 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                <p>
                  Since 2008, Xunrui (Sureay) Machinery has been at the forefront of precision blade manufacturing. We deliver engineering-driven solutions through our comprehensive range of industrial blades, machine knives, and recycling equipment.
                </p>
                <p>
                  By merging material science with advanced CNC manufacturing, we analyze each customer's application requirements. Whether processing tissue, plastics, metals, or composites, we optimize steel grade selection, heat treatment, and edge geometry to maximize service life and minimize downtime.
                </p>
              </div>
            </div>

            {/* Right: Vertical Industrial Timeline */}
            <div className="relative pl-8 lg:pl-10">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700"></div>

              <div className="space-y-10">
                {[
                  {
                    year: "2008",
                    title: "Founded in Ma'anshan",
                    desc: "Established as an industrial blade manufacturer with 500 m² workshop and 12 founding engineers.",
                  },
                  {
                    year: "2012",
                    title: "Expanded to 5,000 m²",
                    desc: "Added vacuum heat treatment furnaces and CNC grinding lines. Began exporting to Southeast Asia.",
                  },
                  {
                    year: "2016",
                    title: "ISO 9001 Certification",
                    desc: "Achieved ISO 9001:2015 certification. Launched OEM partnerships with European machine builders.",
                  },
                  {
                    year: "2020",
                    title: "15,000 m² Smart Factory",
                    desc: "Relocated to a modern facility with 20+ CNC centers, metallurgical lab, and CMM inspection stations.",
                  },
                  {
                    year: "2024",
                    title: "Global Reach: 50+ Countries",
                    desc: "Serving recycling, paper converting, and plastic processing industries worldwide with 10,000+ blade designs.",
                  },
                ].map((milestone, i) => (
                  <div key={i} className="relative">
                    {/* Dot on the timeline */}
                    <div className="absolute -left-8 lg:-left-10 top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-[3px] border-[#003366] dark:border-blue-400 z-10"></div>
                    {/* Accent dot for latest */}
                    {i === 4 && (
                      <div className="absolute -left-8 lg:-left-10 top-1 w-5 h-5 rounded-full bg-[#FF6600] border-[3px] border-[#FF6600] z-10"></div>
                    )}
                    <div>
                      <span className="inline-block text-[#FF6600] text-xs font-black tracking-[0.2em] uppercase mb-1">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-bold text-[#003366] dark:text-white mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. VALUES — Technical Cards + Certification Badge Strip
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-[2px] w-8 bg-[#FF6600]"></div>
              <span className="text-[#FF6600] tracking-[0.2em] text-xs font-bold uppercase">
                Our Principles
              </span>
              <div className="h-[2px] w-8 bg-[#FF6600]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] dark:text-white mb-4">
              Core Values
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              The principles that guide every blade we engineer
            </p>
          </div>

          {/* Values Grid — technical card design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto mb-16">
            {[
              {
                icon: Factory,
                title: "Manufacturing Excellence",
                desc: "State-of-the-art CNC machining centers and vacuum heat treatment facilities ensure consistent quality and precision in every blade we produce.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Serving recycling facilities and industrial operators worldwide with responsive engineering support and fast international shipping.",
              },
              {
                icon: Users,
                title: "Customer Partnership",
                desc: "We work closely with OEM machine builders and end-users to understand unique challenges and develop solutions that maximize uptime.",
              },
              {
                icon: Award,
                title: "Quality Commitment",
                desc: "ISO 9001 certified processes and rigorous quality control ensure every blade meets or exceeds OEM specifications.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="flex gap-5 p-6 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#003366] dark:hover:border-blue-500 transition-colors duration-200 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#003366]/10 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-[#003366]/20 transition-colors">
                  <v.icon className="w-6 h-6 text-[#003366] dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#003366] dark:text-white mb-1.5">
                    {v.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications — horizontal badge strip */}
          <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-8 px-6">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-6">
              Certifications & Standards
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
              {[
                { icon: Shield, label: "ISO 9001:2015" },
                { icon: Award,  label: "CE Certified" },
                { icon: Globe,  label: "SGS Verified" },
                { icon: Flame,  label: "RoHS Compliant" },
                { icon: Truck,  label: "Global Door-to-Door" },
              ].map((cert, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center group-hover:border-[#003366] dark:group-hover:border-blue-400 transition-colors">
                    <cert.icon className="w-6 h-6 text-[#003366] dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-center">
                    {cert.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <OEMConversionFunnel />

      <Footer />
    </div>
  );
}
