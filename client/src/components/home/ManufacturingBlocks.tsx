import ZLayoutFeature from "@/components/ui/ZLayoutFeature";

export default function ManufacturingBlocks() {
  return (
    <section>

      {/* Section header */}
      <div className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-10">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">
            Why Choose Us
          </p>
          <h2 className="font-black text-3xl md:text-4xl lg:text-[42px] text-[#001f4d] uppercase tracking-tight leading-[1.05] max-w-3xl">
            Precision Engineering.
          </h2>
          <div className="w-14 h-[3px] bg-slate-300 mt-6" />
        </div>
      </div>

      {/* Block 1 — White, image left */}
      <div className="bg-white py-20 lg:py-24">
        <ZLayoutFeature
          label="Advanced Manufacturing"
          title="5-Axis CNC & Precision Grinding"
          paragraphs={[
            <><strong className="text-slate-700">5-axis CNC machining centers</strong> and advanced profile grinders execute complex bevels and verified edge geometries across the full blade profile. All cutting surfaces are ground in a single setup to eliminate cumulative error.</>,
            <>In-house <strong className="text-slate-700">vacuum heat treatment</strong> locks in optimal hardness for high-alloy steels prior to final grinding — eliminating thermal distortion and guaranteeing dimensional stability in the finished blade.</>,
          ]}
          imageSrc="/images/process/cnc-precision-grinding.webp"
          imageAlt="5-axis CNC precision grinding of industrial blades at Sureay Machinery"
          imagePosition="left"
        />
      </div>

      {/* Block 2 — Slate-50, image right */}
      <div className="bg-slate-50 border-t border-b border-slate-200 py-20 lg:py-24">
        <ZLayoutFeature
          label="Quality Assurance"
          title="Zero Compromise on Tolerances"
          paragraphs={[
            <>Every blade undergoes a full dimensional audit using <strong className="text-slate-700">fully automated Coordinate Measuring Machines (CMM)</strong> and optical laser scanners before shipment. No batch is released without a signed inspection report.</>,
            <>Edge tolerances are held to <strong className="text-slate-700">±0.002 mm</strong> with <strong className="text-slate-700">100% CMM-verified</strong> flatness across the full blade length. For high-speed production lines, this eliminates OEM break-in periods and guarantees a verified drop-in fit.</>,
          ]}
          imageSrc="/images/process/quality-control.webp"
          imageAlt="CMM coordinate measuring machine quality inspection of industrial cutting blades"
          imagePosition="right"
        />
      </div>

      {/* Block 3 — White, image left */}
      <div className="bg-white py-20 lg:py-24">
        <ZLayoutFeature
          label="Core Solutions"
          title="Engineered for Extreme Applications"
          paragraphs={[
            <>From high-speed tissue converting to heavy-duty solid waste processing, our industrial machine knives are built for <strong className="text-slate-700">severe abrasion and high-impact load cycles</strong>. Steel grade selection is matched to your specific feed material and throughput rate.</>,
            <>Whether the specification demands the <strong className="text-slate-700">mirror-polished finish (Ra ≤ 0.4 μm)</strong> of a log-saw blade or the <strong className="text-slate-700">D2 / SKD-11 toughness</strong> of a granulator rotor, we engineer to extend regrind intervals and maximize verified uptime.</>,
          ]}
          imageSrc="/images/products/blades/tissue-log-saw-blades.webp"
          imageAlt="Mirror-polished tissue log-saw blade engineered for extreme applications"
          imagePosition="left"
        />
      </div>

    </section>
  );
}
