/*
 * IndustryOemPipeline — Module 4
 * Live operational interface. bg-[#001f4d] blueprint grid.
 * GPU-offloaded pulsing logic-line rail via will-change.
 * Steps hardcoded — standard 4-phase OEM engineering protocol.
 */

import { MONO } from "./types";

const STEPS = [
  { step: "01", phaseKey: "INTAKE",    protocolVersion: "2.0", technicalTitle: "TECHNICAL AUDIT",       coords: "31.56°N / 118.47°E", name: "Requirement Analysis",  desc: "Application audit and original blade specification reverse-engineering to capture exact geometry, steel grade, and tolerance requirements." },
  { step: "02", phaseKey: "DESIGN",    protocolVersion: "3.1", technicalTitle: "CAD TOPOLOGY",          coords: "31.56°N / 118.47°E", name: "Material & CAD Design", desc: "Steel grade selection, heat treatment specification, and 5-axis CNC toolpath generation against confirmed blueprint data." },
  { step: "03", phaseKey: "MACHINING", protocolVersion: "4.0", technicalTitle: "PRECISION MANUFACTURE", coords: "31.56°N / 118.47°E", name: "Manufacture & Harden",  desc: "5-axis CNC precision milling followed by in-house vacuum heat treatment to achieve target hardness and core toughness." },
  { step: "04", phaseKey: "METROLOGY", protocolVersion: "2.1", technicalTitle: "METROLOGY VALIDATION",  coords: "31.56°N / 118.47°E", name: "CMM Inspection & Ship", desc: "100% dimensional verification on CMM stations. Hardness report, material certificate, and dimensional data sheet shipped with every order." },
];

export default function IndustryOemPipeline() {
  return (
    <section className="bg-[#001f4d] border-b border-[#0a2d6e] py-12 lg:py-16 relative overflow-hidden">

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(101,170,214,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(101,170,214,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* GPU-offloaded keyframes */}
      <style>{`
        @keyframes oem-flow {
          0%   { top: 0%;               opacity: 0; }
          5%   {                         opacity: 1; }
          90%  {                         opacity: 1; }
          100% { top: calc(100% - 40px); opacity: 0; }
        }
        .oem-flow-seg {
          animation: oem-flow 3.2s ease-in-out infinite;
          will-change: top, opacity;
        }
        @keyframes oem-ping {
          0%   { transform: scale(1);   opacity: 0.9; }
          70%  { transform: scale(2.8); opacity: 0;   }
          100% { transform: scale(2.8); opacity: 0;   }
        }
        .oem-node-ping {
          animation: oem-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          will-change: transform, opacity;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">

        {/* Section header */}
        <div className="mb-10 lg:mb-12">
          <p style={MONO} className="text-[10px] text-[#65AAD6] uppercase tracking-[0.5em] mb-5">
            [ OEM_PROTOCOL / ACTIVE ]
          </p>
          <h2 className="font-black text-2xl md:text-3xl text-white uppercase tracking-tight leading-[1.0] mb-3">
            OEM Customization Process
          </h2>
          <p className="text-slate-200 text-[15px] max-w-[480px] leading-relaxed">
            Every replacement component passes through a strict 4-phase engineering protocol before shipment.
          </p>
          <div className="w-14 h-[2px] bg-[#0a2d6e] mt-5" />
        </div>

        {/* Pipeline: vertical rail + step cards */}
        <div className="relative pl-10 lg:pl-12">

          {/* Animated logic-line rail */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[#0a2d6e] overflow-hidden">
            <div
              className="oem-flow-seg absolute left-0 w-px h-10"
              style={{ background: "linear-gradient(to bottom, transparent, #65AAD6, transparent)" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-[#0a2d6e]">
            {STEPS.map((item, i) => {
              const pingDelay = `${i * 0.6}s`;
              return (
                <div
                  key={item.step}
                  className="border-b border-r border-[#0a2d6e] p-5 flex flex-col relative group overflow-hidden hover:bg-white/5 transition-colors duration-300"
                >
                  {/* Pulsing node on the rail */}
                  <div
                    className="absolute -left-[41px] lg:-left-[49px] top-5 flex-shrink-0"
                    style={{ animationDelay: pingDelay }}
                  >
                    <div className="relative w-2 h-2">
                      <div
                        className="oem-node-ping absolute inset-0 w-2 h-2 bg-[#65AAD6]"
                        style={{ animationDelay: pingDelay }}
                      />
                      <div className="relative w-2 h-2 bg-[#65AAD6]" />
                    </div>
                  </div>

                  {/* Oversized ghost step number */}
                  <span
                    className="absolute -top-2 right-4 font-black text-[96px] leading-none select-none pointer-events-none tabular-nums transition-transform duration-500 ease-out group-hover:-translate-x-[5px] group-hover:-translate-y-[5px]"
                    style={{ WebkitTextStroke: "1px #0a2d6e", color: "transparent", ...MONO }}
                  >
                    {item.step}
                  </span>

                  {/* Tactical coordinate — top right */}
                  <div className="absolute top-2 right-4">
                    <span style={MONO} className="text-[10px] text-slate-700 uppercase tracking-[0.1em]">
                      [ {item.coords} ]
                    </span>
                  </div>

                  {/* Phase number */}
                  <span style={MONO} className="text-[11px] text-[#65AAD6] uppercase tracking-[0.35em] mb-3 block">
                    {item.step}
                  </span>

                  {/* Protocol metadata */}
                  <span style={MONO} className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-2 block">
                    [ {item.phaseKey}_V.{item.protocolVersion} ]
                  </span>

                  {/* Technical title */}
                  <h3 className="font-black text-lg text-white uppercase tracking-widest leading-[1.15] mb-2">
                    {item.technicalTitle}
                  </h3>

                  {/* Description — WCAG AA: slate-200 on #001f4d */}
                  <p className="text-[15px] text-slate-200 leading-relaxed mt-auto">
                    {item.desc}
                  </p>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
