/*
 * IndustryOemPipeline — Module 4 (redesign)
 * Light-gray ground, Swiss-industrial spec-sheet aesthetic.
 * Navy structure, plain mono step labels.
 */

import { motion } from "framer-motion";
import { FileUp, Ruler, Cog, PackageCheck, type LucideIcon } from "lucide-react";
import { MONO } from "./types";

const STEPS: { step: string; icon: LucideIcon; title: string; desc: string }[] = [
  {
    step: "01",
    icon: FileUp,
    title: "Send Drawing Or Sample",
    desc: "Send your drawing, used sample, machine model, or key dimensions. We review the application, blade geometry, material being cut, and any known fit or wear issues from your current supplier.",
  },
  {
    step: "02",
    icon: Ruler,
    title: "Engineering Review",
    desc: "Our engineers confirm steel grade, heat treatment direction, tolerance target, edge profile, and all OEM-fit details. Any open questions are resolved before quotation or production approval is issued.",
  },
  {
    step: "03",
    icon: Cog,
    title: "Machining And Hardening",
    desc: "The blade moves into CNC machining, vacuum heat treatment, and precision grinding in a controlled sequence. Each stage is tracked against the approved specification to prevent distortion and geometry drift.",
  },
  {
    step: "04",
    icon: PackageCheck,
    title: "Inspection And Shipment",
    desc: "Final dimensions, hardness, and edge condition are verified against specification before dispatch. The order is packed and shipped with the required inspection records, and material certification documents.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: "easeOut" as const,
    },
  }),
};

export default function IndustryOemPipeline() {
  return (
    <section className="bg-slate-100 py-16 lg:py-24">

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* ── Section header ── */}
        <div className="mb-14 lg:mb-20">
          <p
            style={MONO}
            className="text-slate-400 text-[11px] font-bold tracking-[0.32em] uppercase mb-4"
          >
            OEM Custom Manufacturing
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="font-black text-[#001f4d] text-2xl md:text-3xl lg:text-[36px] tracking-tight leading-[1.05] max-w-lg">
              From Drawing To Delivery
            </h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-[#001f4d] text-white border border-[#001f4d] hover:bg-transparent hover:text-[#001f4d] px-6 py-3 text-[14px] font-black tracking-[0.2em] transition-colors duration-200 flex-shrink-0 self-start sm:self-auto"
            >
              GET IN TOUCH
            </a>
          </div>

          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-[500px] mt-5">
            Four clear steps: you know what to send, what we confirm, and what
            gets checked before shipment.
          </p>
        </div>

        {/* ── Steps grid — desktop (lg+) ── */}
        <div className="hidden lg:grid grid-cols-4">
          {STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="border-t-[3px] border-[#001f4d] pt-6 pb-10 pr-10"
            >
              {/* Step icon */}
              <item.icon className="w-8 h-8 text-[#001f4d] mb-5" strokeWidth={1.75} />

              <h3 className="font-black text-[#001f4d] text-[16px] tracking-tight leading-[1.25] mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Steps list — mobile (below lg) ── */}
        <div className="lg:hidden space-y-0">
          {STEPS.map((item, i) => (
            <div
              key={item.step}
              className={`border-t-[3px] border-[#001f4d] pt-5 pb-7 ${
                i < STEPS.length - 1 ? "mb-6" : ""
              }`}
            >
              {/* Step icon */}
              <item.icon className="w-8 h-8 text-[#001f4d] mb-4" strokeWidth={1.75} />

              <h3 className="font-black text-[#001f4d] text-[16px] tracking-tight leading-[1.25] mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 text-[15px] leading-relaxed pr-10">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
