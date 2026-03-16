/*
 * IndustryOemPipeline — Module 4
 * Live operational interface. bg-[#001f4d] blueprint grid.
 * GPU-offloaded pulsing logic-line rail via will-change.
 * Steps hardcoded — standard 4-phase OEM engineering protocol.
 */

import { MONO } from "./types";

const STEPS = [
  {
    step: "01",
    phaseKey: "INTAKE",
    technicalTitle: "SEND DRAWING OR SAMPLE",
    name: "Requirement Intake",
    desc: "You send the drawing, used sample, machine model, or key dimensions. We review the application, blade geometry, and any known fit or wear issues.",
  },
  {
    step: "02",
    phaseKey: "REVIEW",
    technicalTitle: "ENGINEERING REVIEW",
    name: "Material And Tolerance Confirmation",
    desc: "Our team confirms steel grade, heat treatment direction, tolerance target, and any OEM-fit details needed before quotation or production approval.",
  },
  {
    step: "03",
    phaseKey: "PRODUCTION",
    technicalTitle: "MACHINING AND HARDENING",
    name: "Production Execution",
    desc: "The blade moves into CNC machining, heat treatment, and precision grinding based on the approved specification and application requirement.",
  },
  {
    step: "04",
    phaseKey: "DELIVERY",
    technicalTitle: "INSPECTION AND SHIPMENT",
    name: "Final Verification",
    desc: "Before dispatch, dimensions and hardness are checked and the order is prepared with the required inspection records for delivery.",
  },
];

export default function IndustryOemPipeline() {
  return (
    <section className="bg-[#001f4d] border-b border-[#0a2d6e] py-10 lg:py-12 relative overflow-hidden">

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
        <div className="mb-8 lg:mb-10">
          <p style={MONO} className="text-[10px] text-[#65AAD6] uppercase tracking-[0.5em] mb-5">
            [ OEM_PROTOCOL / ACTIVE ]
          </p>
          <h2 className="font-black text-2xl md:text-3xl text-white uppercase tracking-tight leading-[1.0] mb-3">
            OEM Process From Drawing Review To Delivery
          </h2>
          <p className="text-slate-200 text-[15px] max-w-[480px] leading-relaxed">
            A custom blade order moves through four clear steps so you know what to send, what we confirm, and what gets checked before shipment.
          </p>
          <div className="w-14 h-[2px] bg-[#0a2d6e] mt-5" />
        </div>

        {/* Pipeline: vertical rail + step cards */}
        <div className="relative pl-8 lg:pl-10">

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
                  className="border-b border-r border-[#0a2d6e] p-4 lg:p-5 flex flex-col relative group overflow-hidden hover:bg-white/5 transition-colors duration-300"
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
                    className="absolute top-1 right-3 font-black text-[72px] leading-none select-none pointer-events-none tabular-nums transition-transform duration-500 ease-out group-hover:-translate-x-[3px] group-hover:-translate-y-[3px]"
                    style={{ WebkitTextStroke: "1px rgba(10,45,110,0.65)", color: "transparent", ...MONO }}
                  >
                    {item.step}
                  </span>

                  {/* Phase number */}
                  <span style={MONO} className="text-[11px] text-[#65AAD6] uppercase tracking-[0.35em] mb-2 block">
                    Step {item.step}
                  </span>

                  <span style={MONO} className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-2 block">
                    [ {item.phaseKey} ]
                  </span>

                  {/* Technical title */}
                  <h3 className="font-black text-base lg:text-lg text-white uppercase tracking-[0.16em] leading-[1.15] mb-2">
                    {item.technicalTitle}
                  </h3>

                  <p className="text-[12px] text-[#65AAD6] uppercase tracking-[0.18em] mb-3">
                    {item.name}
                  </p>

                  {/* Description — WCAG AA: slate-200 on #001f4d */}
                  <p className="text-[14px] text-slate-200 leading-relaxed mt-auto max-w-[22rem]">
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
