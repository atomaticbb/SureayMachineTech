const BLOCKS = [
  {
    label: "Advanced Manufacturing",
    title: "Controlled Machining For Stable Fit And Geometry",
    summary:
      "When you are replacing OEM blades or qualifying a new supplier, the first question is simple: will the geometry and fit stay consistent from one batch to the next?",
    points: [
      "5-axis CNC machining and profile grinding keep bevels, edge alignment, and overall geometry repeatable from prototype through repeat production.",
      "In-house vacuum heat treatment and final grinding help control distortion before shipment, reducing fit problems and uneven wear in service.",
    ],
    imageSrc: "/images/process/cnc-precision-grinding.webp",
    imageAlt:
      "5-axis CNC precision grinding of industrial blades at Sureay Machinery",
  },
  {
    label: "Inspection Assurance",
    title: "Tolerance Control That Lowers Replacement Risk",
    summary:
      "A replacement blade should not create uncertainty on the shop floor. You need confidence that it will install correctly and run without extra adjustment time.",
    points: [
      "CMM inspection and optical verification are completed before release, so dimensional compliance is confirmed rather than assumed.",
      "Where the application requires it, edge tolerances can be held down to ±0.002 mm to support high-speed drop-in replacement requirements.",
    ],
    imageSrc: "/images/process/quality-control.webp",
    imageAlt:
      "CMM coordinate measuring machine quality inspection of industrial cutting blades",
  },
  {
    label: "Application Engineering",
    title: "Material Selection Based On Real Cutting Conditions",
    summary:
      "Blade performance is rarely decided by the catalog name alone. Abrasion level, impact load, line speed, and finish requirement usually matter more.",
    points: [
      "We match steel grade and heat treatment to the actual operating condition, whether the line is converting tissue, shredding plastics, or slitting metal coils.",
      "The result is a recommendation aimed at longer regrind intervals, more predictable blade life, and fewer avoidable replacements.",
    ],
    imageSrc: "/images/products/blades/tissue-log-saw-blades.webp",
    imageAlt:
      "Mirror-polished tissue log-saw blade engineered for industrial converting applications",
  },
];

export default function ManufacturingBlocks() {
  return (
    <section className="bg-white border-t border-slate-200">
      <div className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 lg:pt-20 pb-10 lg:pb-12">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-4">
            Engineering Confidence
          </p>
          <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] uppercase tracking-tight leading-[1.05] max-w-3xl">
            The Engineering Standards Behind Our Blades
          </h2>
          <p className="text-slate-500 max-w-2xl text-sm md:text-base leading-relaxed mt-4">
            We eliminate the guesswork from industrial sourcing. Every Sureay blade guarantees exact OEM fitment, strict dimensional tolerances, and metallurgy optimized for your real-world cutting conditions.
          </p>
          <div className="w-14 h-[3px] bg-slate-300 mt-6" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-14 lg:pb-20">
        <div className="bg-white">
          {BLOCKS.map((block, index) => {
            const reverse = index % 2 === 1;

            return (
              <div
                key={block.title}
                className={[
                  "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 px-0 py-10 lg:py-14 border-b border-slate-100 last:border-0",
                ].join(" ")}
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
                    {block.points.map((point) => (
                      <div key={point} className="border-l-2 border-slate-200 pl-4">
                        <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
