import { Link } from "wouter";
import { ECOSYSTEMS } from "@/data/homeData";

export default function TabEcosystem() {
  return (
    <section className="bg-white border-t border-slate-200 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-10 lg:mb-14">
          <p className="text-slate-500 font-bold text-xs tracking-[0.3em] mb-3">
            Markets We Serve
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] tracking-tight leading-[1.05] max-w-xl">
              Choose Your Industry. <br />
              Find Your Blade.
            </h2>
            <p className="text-slate-500 max-w-sm text-sm md:text-base leading-relaxed md:text-right">
              Select your application below to explore blade materials, OEM
              compatibilities, and cutting solutions tailored to your production
              line.
            </p>
          </div>
          <div className="w-14 h-[3px] bg-slate-300 mt-8" />
        </div>

        {/* 2×3 grid — 6 industries, clean 16:9 cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {ECOSYSTEMS.map((eco) => (
            <Link key={eco.industry} href={eco.href}>
              <a className="relative overflow-hidden block group aspect-video rounded-none">
                {/* Photo */}
                <img
                  src={eco.image}
                  alt={eco.industry}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />

                {/* Gradient — lifts from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/90 via-[#001224]/30 to-transparent group-hover:from-[#001224]/75 transition-colors duration-300" />

                {/* White reveal bar at bottom edge */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/60 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                {/* Text */}
                <div className="relative z-10 flex flex-col justify-end h-full p-4 lg:p-6">
                  <p className="font-mono text-[10px] lg:text-[11px] tracking-[0.28em] text-white/50 mb-2 uppercase leading-none">
                    {eco.label}
                  </p>
                  <p className="text-white font-black text-base lg:text-[20px] tracking-tight leading-tight">
                    {eco.industry}
                  </p>
                  <p className="font-mono text-[10px] lg:text-[12px] tracking-[0.22em] text-white font-bold mt-2.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out underline underline-offset-4 decoration-white/60 decoration-[1.5px]">
                    EXPLORE
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
