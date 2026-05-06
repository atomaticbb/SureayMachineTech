/*
 * IndustryOemPipeline — Module 4
 * Top / Bottom split: left-aligned header above a horizontal stepper.
 * Swiss Brutalist: dark navy bg, blueprint grid, square nodes, mono labels.
 */

import { MONO } from "./types";

const STEPS = [
  {
    step: "01",
    title: "Send Drawing Or Sample",
    desc: "Send your drawing, used sample, machine model, or key dimensions. We review the application, blade geometry, material being cut, and any known fit or wear issues from your current supplier.",
  },
  {
    step: "02",
    title: "Engineering Review",
    desc: "Our engineers confirm steel grade, heat treatment direction, tolerance target, edge profile, and all OEM-fit details. Any open questions are resolved before quotation or production approval is issued.",
  },
  {
    step: "03",
    title: "Machining And Hardening",
    desc: "The blade moves into CNC machining, vacuum heat treatment, and precision grinding in a controlled sequence. Each stage is tracked against the approved specification to prevent distortion and geometry drift.",
  },
  {
    step: "04",
    title: "Inspection And Shipment",
    desc: "Final dimensions, hardness, and edge condition are verified against specification before dispatch. The order is packed and shipped with the required inspection records, and material certification documents.",
  },
];

export default function IndustryOemPipeline() {
  return (
    <section className="bg-[#001f4d] border-b border-[#001f4d] py-16 lg:py-20 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* ── Top: Section header ───────────────────────────────────────────── */}
        <div className="mb-14 lg:mb-16">
          <p className="text-[#65AAD6] font-bold text-xs  tracking-[0.3em] mb-4">
            OEM Custom Manufacturing
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-white  tracking-tight leading-[1.05] max-w-2xl">
              OEM Process From Drawing To Delivery
            </h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-white text-[#001f4d] border border-white hover:bg-[#001f4d] hover:text-white px-6 py-3 text-[13px] font-black tracking-[0.18em] rounded-none transition-colors duration-200 flex-shrink-0 self-start sm:self-auto"
            >
              Get In Touch
            </a>
          </div>
          <p className="text-[16px] text-slate-300 leading-relaxed max-w-xl mt-4">
            A custom blade order moves through four clear steps — so you know
            what to send, what we confirm, and what gets checked before
            shipment.
          </p>
          <div className="w-14 h-[3px] bg-[#65AAD6]/40 mt-6" />
        </div>

        {/* ── Bottom: Horizontal stepper ────────────────────────────────────── */}

        {/* Desktop (lg+): single continuous line, nodes on top */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Single h-px line running through the center of all nodes */}
            <div
              className="absolute left-0 right-0 h-px bg-white/30"
              style={{ top: "1.5rem" }}
            />

            <div className="grid grid-cols-4 gap-6 px-6">
              {STEPS.map(item => (
                <div key={item.step} className="flex flex-col">
                  {/* Circle node — z-10 sits above the continuous line */}
                  <div className="relative z-10 w-12 h-12 rounded-full border-2 border-white bg-[#001f4d] flex items-center justify-center flex-shrink-0">
                    <span
                      style={MONO}
                      className="text-[14px] font-black text-white"
                    >
                      {item.step}
                    </span>
                  </div>

                  {/* Step content */}
                  <div className="mt-6">
                    <h3 className="font-black text-white tracking-tight leading-[1.2] text-[15px] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile (below lg): vertical stack, no connecting lines */}
        <div className="lg:hidden flex flex-col gap-0">
          {STEPS.map((item, i) => (
            <div
              key={item.step}
              className={`flex gap-5 pb-8 ${i < STEPS.length - 1 ? "border-b border-[#65AAD6]/20 mb-8" : ""}`}
            >
              {/* Square node */}
              <div className="w-11 h-11 rounded-full border-2 border-white bg-[#001f4d] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span
                  style={MONO}
                  className="text-[13px] font-black text-white"
                >
                  {item.step}
                </span>
              </div>

              {/* Step content */}
              <div>
                <h3 className="font-black text-white  tracking-tight leading-[1.2] text-[15px] mb-2">
                  {item.title}
                </h3>
                <p className="text-[15px] text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
