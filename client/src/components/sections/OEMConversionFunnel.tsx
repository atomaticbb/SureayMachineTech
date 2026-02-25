/**
 * OEMConversionFunnel — dark navy 3-step OEM process section with CTA buttons
 * Appears at the bottom of blade detail pages.
 * Entirely static (no props required beyond optional className for outer spacing).
 */

import { Link } from "wouter";

interface OEMConversionFunnelProps {
  className?: string;
}

export default function OEMConversionFunnel({ className = "" }: OEMConversionFunnelProps) {
  return (
    <section className={`relative py-12 bg-[#003366] overflow-hidden ${className}`}>
      {/* Blueprint SVG Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="oem-funnel-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#oem-funnel-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">

        {/* Top: The Hook */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Seamless Custom OEM Process
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed">
            Can't find your exact dimensions? Submit your drawings or physical samples. Our metallurgy team will engineer the optimal blade for your application.
          </p>
        </div>

        {/* Middle: 3-Step Grid */}
        <div className="relative">
          {/* Desktop connector */}
          <div className="hidden md:block absolute top-[32px] left-[16.66%] right-[16.66%] h-0 border-t-2 border-dashed border-blue-400/40 z-0"></div>
          {/* Mobile connector */}
          <div className="md:hidden absolute top-[32px] bottom-[32px] left-[32px] w-0 border-l-2 border-dashed border-blue-400/40 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4">

            {/* Step 1 */}
            <div className="relative z-10 flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-3 md:text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-blue-400/40 flex flex-col items-center justify-center flex-shrink-0 group-hover:border-white group-hover:shadow-lg transition-all duration-300">
                <span className="text-blue-300 text-[10px] font-black tracking-widest uppercase mb-0.5 group-hover:text-[#FF6600] transition-colors">STEP</span>
                <span className="text-white text-3xl font-black leading-none">01</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Send Drawing / Sample</h3>
                <p className="text-sm text-blue-200 leading-relaxed">Provide an OEM part number, CAD file (.DXF / .PDF), or physical blade sample. We accept all standard formats.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-3 md:text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-blue-400/40 flex flex-col items-center justify-center flex-shrink-0 group-hover:border-white group-hover:shadow-lg transition-all duration-300">
                <span className="text-blue-300 text-[10px] font-black tracking-widest uppercase mb-0.5 group-hover:text-[#FF6600] transition-colors">STEP</span>
                <span className="text-white text-3xl font-black leading-none">02</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Material &amp; HRC Matching</h3>
                <p className="text-sm text-blue-200 leading-relaxed">Our engineers select the optimal steel grade (D2, SKD11, Carbide) and specify the precise vacuum heat treatment cycle.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-3 md:text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-[#FF6600] flex flex-col items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-all duration-300">
                <span className="text-[#FF6600] text-[10px] font-black tracking-widest uppercase mb-0.5">STEP</span>
                <span className="text-white text-3xl font-black leading-none">03</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Precision Machining &amp; QC</h3>
                <p className="text-sm text-blue-200 leading-relaxed">CNC grinding to tight tolerances, followed by rigorous hardness testing and full dimensional inspection before delivery.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom: CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link href="/contact">
            <a className="px-10 py-4 bg-[#FF6600] hover:bg-[#E55A00] text-white font-bold text-center rounded-lg shadow-2xl hover:shadow-[#FF6600]/50 transition-all duration-300 hover:scale-105 transform inline-block">
              Submit Requirements
            </a>
          </Link>
          <Link href="/contact">
            <a className="px-10 py-4 bg-transparent border-2 border-white hover:border-[#FF6600] text-white hover:text-[#FF6600] font-bold text-center rounded-lg transition-all duration-300 hover:scale-105 transform inline-flex items-center justify-center">
              Custom OEM Services
            </a>
          </Link>
        </div>

      </div>
    </section>
  );
}
