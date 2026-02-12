/*
 * Home Page - Modern B2B Industrial Machinery Website
 * Based on reference design: homepage.html
 */

import { Link } from "wouter";
import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// CountUp Animation Component
function CountUpNumber({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        // Check if value has decimals
        const hasDecimals = value % 1 !== 0;
        const formatted = hasDecimals
          ? latest.toFixed(1) // Show 1 decimal place
          : Math.floor(latest).toLocaleString(); // Show whole number with commas
        ref.current.textContent = formatted + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix, value]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f7f8] dark:bg-[#0f1923]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] lg:h-[731px] overflow-hidden">
        <div className="absolute inset-0 bg-black/35 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-center bg-cover"
          style={{backgroundImage: "url('/images/hero/home.webp')"}} />

        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h2 className="text-[28px] font-bold text-white mb-4">
              Sureay Machinery Manufacturing Co., Ltd.
            </h2>
            <h1 className="text-[48px] font-black text-white leading-[1.1] mb-6 tracking-tight">
              OEM Industrial Blades, Press Brake Tooling & Machines
            </h1>
            <p className="text-base text-slate-200 mb-10 max-w-2xl leading-relaxed">
              Professional OEM manufacturer of industrial knives, press brake dies, and CNC machinery. We provide high-precision OEM services for global brands. Factory direct pricing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <button className="bg-[#003366] hover:bg-white text-white hover:text-[#003366] px-10 py-4 rounded-md text-base font-bold transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105 transform">
                  Get a Quick Quote
                </button>
              </Link>
              <Link href="/products">
                <button className="bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-[#003366] px-10 py-4 rounded-md text-base font-bold transition-all duration-300 hover:scale-105 transform shadow-2xl">
                  View Catalog
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories - Industrial Poster Style */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Poster 01: SHEET METAL MACHINERY */}
            <Link href="/products/machinery">
              <div className="group cursor-pointer overflow-hidden relative h-[600px] min-h-[70vh]">
                {/* Layer 1: Background Image */}
                <img
                  alt="Sheet Metal Machinery"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  src="/images/products/machinery.webp"
                />

                {/* Layer 2: Heavy Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                {/* Layer 3: Watermark Number */}
                <div className="absolute top-8 right-8 text-9xl font-black text-white/5 pointer-events-none select-none leading-none">
                  01
                </div>

                {/* Layer 4: Content - Bottom Aligned */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
                  {/* Orange Accent Bar */}
                  <div className="w-2 h-16 bg-[#FF6600] flex-shrink-0 mr-6 transition-all duration-300 group-hover:h-20"></div>

                  {/* Text Content */}
                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase leading-[0.9] mb-4 transition-transform duration-300 ease-out group-hover:-translate-y-2">
                      SHEET METAL<br />MACHINERY
                    </h3>

                    {/* Tagline - Reveal on Hover */}
                    <p className="text-sm text-white/80 tracking-widest uppercase font-bold mb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      CNC Press Brakes & Shears
                    </p>

                    {/* Action Link */}
                    <div className="inline-flex items-center gap-2 group/link">
                      <span className="text-white text-sm font-bold uppercase tracking-wider border-b-2 border-white/0 group-hover/link:border-white/100 transition-all duration-300">VIEW DETAILS</span>
                      <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Poster 02: PRECISION TOOLING */}
            <Link href="/products/molds">
              <div className="group cursor-pointer overflow-hidden relative h-[600px] min-h-[70vh]">
                {/* Layer 1: Background Image */}
                <img
                  alt="Precision Tooling"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  src="/images/products/molds.webp"
                />

                {/* Layer 2: Heavy Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                {/* Layer 3: Watermark Number */}
                <div className="absolute top-8 right-8 text-9xl font-black text-white/5 pointer-events-none select-none leading-none">
                  02
                </div>

                {/* Layer 4: Content - Bottom Aligned */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
                  {/* Orange Accent Bar */}
                  <div className="w-2 h-16 bg-[#FF6600] flex-shrink-0 mr-6 transition-all duration-300 group-hover:h-20"></div>

                  {/* Text Content */}
                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase leading-[0.9] mb-4 transition-transform duration-300 ease-out group-hover:-translate-y-2">
                      PRECISION<br />TOOLING
                    </h3>

                    {/* Tagline - Reveal on Hover */}
                    <p className="text-sm text-white/80 tracking-widest uppercase font-bold mb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Amada & Trumpf Style Dies
                    </p>

                    {/* Action Link */}
                    <div className="inline-flex items-center gap-2 group/link">
                      <span className="text-white text-sm font-bold uppercase tracking-wider border-b-2 border-white/0 group-hover/link:border-white/100 transition-all duration-300">VIEW DETAILS</span>
                      <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Poster 03: INDUSTRIAL BLADES */}
            <Link href="/products/blades">
              <div className="group cursor-pointer overflow-hidden relative h-[600px] min-h-[70vh]">
                {/* Layer 1: Background Image */}
                <img
                  alt="Industrial Blades"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  src="/images/products/blades.webp"
                />

                {/* Layer 2: Heavy Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                {/* Layer 3: Watermark Number */}
                <div className="absolute top-8 right-8 text-9xl font-black text-white/5 pointer-events-none select-none leading-none">
                  03
                </div>

                {/* Layer 4: Content - Bottom Aligned */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
                  {/* Orange Accent Bar */}
                  <div className="w-2 h-16 bg-[#FF6600] flex-shrink-0 mr-6 transition-all duration-300 group-hover:h-20"></div>

                  {/* Text Content */}
                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase leading-[0.9] mb-4 transition-transform duration-300 ease-out group-hover:-translate-y-2">
                      INDUSTRIAL<br />BLADES
                    </h3>

                    {/* Tagline - Reveal on Hover */}
                    <p className="text-sm text-white/80 tracking-widest uppercase font-bold mb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      H13 / SKD11 Metallurgy
                    </p>

                    {/* Action Link */}
                    <div className="inline-flex items-center gap-2 group/link">
                      <span className="text-white text-sm font-bold uppercase tracking-wider border-b-2 border-white/0 group-hover/link:border-white/100 transition-all duration-300">VIEW DETAILS</span>
                      <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Stats Bar - Modern Contrast */}
      <section className="relative w-full bg-[#f8f9fa] dark:bg-[#0a0e1a] py-12 lg:py-16 overflow-hidden">
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(#003366 1px, transparent 1px), linear-gradient(90deg, #003366 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}></div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#003366] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#003366] to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Block 1: Years */}
            <div className="relative bg-gradient-to-br from-[#003366] to-[#004488] p-8 group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white/40"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white/40"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="mb-2 text-[9px] font-bold text-white/50 uppercase tracking-[0.3em]">
                  EST. 2008
                </div>
                <div className="font-black text-6xl lg:text-7xl mb-3 tabular-nums text-white" style={{
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}>
                  <CountUpNumber value={15} suffix="+" duration={2} />
                </div>
                <div className="h-[2px] w-12 bg-gradient-to-r from-white/60 to-transparent mb-2"></div>
                <div className="text-[10px] font-bold text-white/70 uppercase tracking-[0.25em]">
                  YEARS
                </div>
              </div>
            </div>

            {/* Block 2: Plant Size */}
            <div className="relative bg-gradient-to-br from-[#003366] to-[#004488] p-8 group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white/40"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white/40"></div>

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="mb-2 text-[9px] font-bold text-white/50 uppercase tracking-[0.3em]">
                  FACILITY
                </div>
                <div className="font-black text-6xl lg:text-7xl mb-3 tabular-nums text-white" style={{
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}>
                  <CountUpNumber value={43000} suffix="" duration={2} />
                </div>
                <div className="h-[2px] w-12 bg-gradient-to-r from-white/60 to-transparent mb-2"></div>
                <div className="text-[10px] font-bold text-white/70 uppercase tracking-[0.25em]">
                  SQ. METERS
                </div>
              </div>
            </div>

            {/* Block 3: Countries */}
            <div className="relative bg-gradient-to-br from-[#003366] to-[#004488] p-8 group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white/40"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white/40"></div>

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="mb-2 text-[9px] font-bold text-white/50 uppercase tracking-[0.3em]">
                  WORLDWIDE
                </div>
                <div className="font-black text-6xl lg:text-7xl mb-3 tabular-nums text-white" style={{
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}>
                  <CountUpNumber value={30} suffix="+" duration={2} />
                </div>
                <div className="h-[2px] w-12 bg-gradient-to-r from-white/60 to-transparent mb-2"></div>
                <div className="text-[10px] font-bold text-white/70 uppercase tracking-[0.25em]">
                  COUNTRIES
                </div>
              </div>
            </div>

            {/* Block 4: Production Output */}
            <div className="relative bg-gradient-to-br from-[#003366] to-[#004488] p-8 group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white/40"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white/40"></div>

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="mb-2 text-[9px] font-bold text-white/50 uppercase tracking-[0.3em]">
                  PRODUCTION
                </div>
                <div className="font-black text-6xl lg:text-7xl mb-3 tabular-nums text-white" style={{
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}>
                  <CountUpNumber value={3.5} suffix="M+" duration={2} />
                </div>
                <div className="h-[2px] w-12 bg-gradient-to-r from-white/60 to-transparent mb-2"></div>
                <div className="text-[10px] font-bold text-white/70 uppercase tracking-[0.25em]">
                  Parts Annually
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-black text-4xl md:text-5xl text-[#003366] dark:text-white uppercase mb-4">
              Industry <span className="text-slate-300 dark:text-slate-700" style={{
                WebkitTextStroke: '1.5px #003366',
                color: 'transparent'
              }}>SOLUTIONS</span>
            </h2>
            <div className="w-24 h-1 bg-[#FF6600] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Solution 1: Automotive */}
            <article className="bg-white dark:bg-slate-800 shadow-lg group hover:shadow-2xl transition-shadow duration-300">
              <div className="h-64 overflow-hidden">
                <img
                  alt="Automotive Manufacturing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/hero/hero.webp"
                />
              </div>
              <div className="p-8 border-b-4 border-transparent group-hover:border-[#FF6600] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-black text-xl text-[#003366] dark:text-white uppercase">Automotive</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  High-precision components for assembly lines and engine manufacturing.
                </p>
                <Link href="/applications">
                  <a className="text-[#FF6600] font-bold text-sm uppercase tracking-wider hover:text-[#003366] dark:hover:text-white transition-colors">
                    Learn More →
                  </a>
                </Link>
              </div>
            </article>

            {/* Solution 2: Metal Recycling */}
            <article className="bg-white dark:bg-slate-800 shadow-lg group hover:shadow-2xl transition-shadow duration-300">
              <div className="h-64 overflow-hidden">
                <img
                  alt="Metal Recycling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/hero/hero.webp"
                />
              </div>
              <div className="p-8 border-b-4 border-transparent group-hover:border-[#FF6600] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-black text-xl text-[#003366] dark:text-white uppercase">Metal Recycling</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  Robust blades and shredders designed for heavy-duty metal processing.
                </p>
                <Link href="/applications">
                  <a className="text-[#FF6600] font-bold text-sm uppercase tracking-wider hover:text-[#003366] dark:hover:text-white transition-colors">
                    Learn More →
                  </a>
                </Link>
              </div>
            </article>

            {/* Solution 3: Construction */}
            <article className="bg-white dark:bg-slate-800 shadow-lg group hover:shadow-2xl transition-shadow duration-300">
              <div className="h-64 overflow-hidden">
                <img
                  alt="Construction"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/hero/hero.webp"
                />
              </div>
              <div className="p-8 border-b-4 border-transparent group-hover:border-[#FF6600] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-black text-xl text-[#003366] dark:text-white uppercase">Construction</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  Structural steel processing tools for large-scale infrastructure projects.
                </p>
                <Link href="/applications">
                  <a className="text-[#FF6600] font-bold text-sm uppercase tracking-wider hover:text-[#003366] dark:hover:text-white transition-colors">
                    Learn More →
                  </a>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="font-black text-4xl md:text-5xl text-[#003366] dark:text-white uppercase mb-4">
              Why Choose <span className="text-slate-300 dark:text-slate-700" style={{
                WebkitTextStroke: '1.5px #003366',
                color: 'transparent'
              }}>SUREAY</span>
            </h2>
            <div className="w-24 h-1 bg-[#FF6600] mx-auto mt-6"></div>
            <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
              Excellence in manufacturing, precision in delivery, partnership in success.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large Left Card - Factory */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden h-full min-h-[450px] shadow-2xl group">
                <div className="absolute inset-0">
                  <img
                    src="/images/hero/hero.webp"
                    alt="Factory"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/95 via-[#003366]/60 to-transparent"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="mb-4">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                      THE SOURCE FACTORY
                    </h3>
                    <p className="text-gray-200 text-base leading-relaxed mb-4">
                      50,000+ square meters of integrated manufacturing facilities in Maanshan, China's precision machinery hub.
                    </p>
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-start">
                        <span className="text-[#FF6600] mr-3 mt-1">✓</span>
                        <span className="text-sm">ISO 9001:2015 Certified Production Lines</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF6600] mr-3 mt-1">✓</span>
                        <span className="text-sm">Advanced CNC Machining Centers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FF6600] mr-3 mt-1">✓</span>
                        <span className="text-sm">In-House Heat Treatment & Testing Labs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - 3 Stacked Cards */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Integrated Ecology Card */}
              <article className="bg-white dark:bg-slate-800 shadow-lg group hover:shadow-2xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-end justify-end mb-6">
                    <span className="inline-block px-3 py-1 bg-[#003366] text-white text-xs font-bold rounded-full">01</span>
                  </div>
                  <h3 className="font-black text-2xl text-[#003366] dark:text-white uppercase mb-4">
                    Integrated Ecology
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                    From raw material procurement to finished product delivery - complete vertical integration ensures quality control at every stage of production.
                  </p>
                </div>
              </article>

              {/* Precision Technology Card */}
              <article className="bg-white dark:bg-slate-800 shadow-lg group hover:shadow-2xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-end justify-end mb-6">
                    <span className="inline-block px-3 py-1 bg-[#003366] text-white text-xs font-bold rounded-full">02</span>
                  </div>
                  <h3 className="font-black text-2xl text-[#003366] dark:text-white uppercase mb-4">
                    Precision Technology
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                    ±0.01mm tolerance machining with German-imported CNC grinders and Swiss coordinate measuring systems for aerospace-grade precision.
                  </p>
                </div>
              </article>

              {/* Global Reach Card */}
              <article className="bg-white dark:bg-slate-800 shadow-lg group hover:shadow-2xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-end justify-end mb-6">
                    <span className="inline-block px-3 py-1 bg-[#003366] text-white text-xs font-bold rounded-full">03</span>
                  </div>
                  <h3 className="font-black text-2xl text-[#003366] dark:text-white uppercase mb-4">
                    Global Reach
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                    Serving 80+ countries with localized technical support, multilingual sales teams, and strategic partnerships with industry leaders worldwide.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>


      {/* Get A Quote Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Left: Header + Contact */}
            <div className="flex flex-col">
              {/* Section Header */}
              <div className="mb-8">
                <h2 className="font-black text-4xl md:text-5xl text-[#003366] dark:text-white uppercase mb-4">
                  Get in Touch with Our Engineer
                  {/* <span className="text-slate-300 dark:text-slate-700" style={{
                    WebkitTextStroke: '1.5px #003366',
                    color: 'transparent'
                  }}>QUOTE</span> */}
                </h2>
                <div className="w-24 h-1 bg-[#FF6600] mb-6"></div>
                <p className="text-base text-slate-600 dark:text-slate-400">
                  Discuss your industry needs with our expert engineers and get a custom solution.
                </p>
              </div>

              {/* Contact Details - Prominent */}
              <div className="flex-1 flex flex-col justify-center space-y-5">
                {/* Email */}
                <a href="mailto:sales@sureaymachinery.com" className="group block">
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-[#003366] hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-5">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#003366] to-[#004488] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-bold">Email Us</div>
                        <div className="text-lg font-bold text-[#003366] dark:text-white group-hover:text-[#004488] transition-colors">
                          sales@sureaymachinery.com
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-[#003366] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a href="tel:+8615655530829" className="group block">
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-[#003366] hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-5">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#003366] to-[#004488] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-bold">Call Us</div>
                        <div className="text-lg font-bold text-[#003366] dark:text-white group-hover:text-[#004488] transition-colors">
                          +86 156 5553 0829
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-[#003366] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* WhatsApp - Direct Engineer Line */}
                <a
                  href="https://wa.me/8615655530829"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-[#128C7E] p-6 rounded-md shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-5">
                      {/* WhatsApp Icon */}
                      <div className="flex-shrink-0 w-14 h-14 bg-white/15 backdrop-blur-sm rounded-md flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Label */}
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-xs text-white/90 uppercase tracking-wider font-bold">TECHNICAL SUPPORT</div>
                          {/* Pulsing Green Dot */}
                          <div className="relative flex items-center">
                            <span className="absolute inline-flex h-2 w-2 rounded-full bg-[#4ade80] opacity-75 animate-ping"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ade80]"></span>
                          </div>
                          <span className="text-xs text-white/90 font-semibold">Online Now</span>
                        </div>

                        {/* Main Text */}
                        <div className="text-lg font-black text-white mb-1">
                          Chat with Engineer
                        </div>

                        {/* Subtext */}
                        <div className="text-xs text-white/70 font-medium">
                          Avg. response time: &lt; 5 mins
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <svg className="w-5 h-5 text-white/80 group-hover:translate-x-1 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: Quote Form */}
            <div className="flex flex-col">
              <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-lg p-8 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                <h3 className="text-2xl font-black text-[#003366] dark:text-white uppercase mb-2">Request Quote</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Fill in your details and our engineering team will respond within 24 hours.
                </p>

                <form className="flex-1 flex flex-col space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Your Name *</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-[#FF6600] focus:ring-2 focus:ring-[#FF6600]/20 transition-all dark:bg-slate-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Company Email *</label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-[#FF6600] focus:ring-2 focus:ring-[#FF6600]/20 transition-all dark:bg-slate-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-[#FF6600] focus:ring-2 focus:ring-[#FF6600]/20 transition-all dark:bg-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Message *</label>
                    <textarea
                      rows={3}
                      placeholder="Describe your requirements, quantities, dimensions, materials, etc."
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6600] focus:ring-2 focus:ring-[#FF6600]/20 transition-all resize-vertical dark:bg-slate-700 dark:text-white"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#003366] hover:bg-[#004488] text-white py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    Submit Quote Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
}
