import { useTranslation } from "@/lib/useTranslation";

interface Block {
  labelKey: string;
  titleKey: string;
  summaryKey: string;
  pointKeys: [string, string];
  imageSrc: string;
  imageAltKey: string;
}

const BLOCKS: Block[] = [
  {
    labelKey: "home.mfg.block1.label",
    titleKey: "home.mfg.block1.title",
    summaryKey: "home.mfg.block1.summary",
    pointKeys: ["home.mfg.block1.point1", "home.mfg.block1.point2"],
    imageSrc: "/images/process/cnc-precision-grinding.webp",
    imageAltKey: "home.mfg.block1.imageAlt",
  },
  {
    labelKey: "home.mfg.block2.label",
    titleKey: "home.mfg.block2.title",
    summaryKey: "home.mfg.block2.summary",
    pointKeys: ["home.mfg.block2.point1", "home.mfg.block2.point2"],
    imageSrc: "/images/process/blade-quality-inspection.webp",
    imageAltKey: "home.mfg.block2.imageAlt",
  },
  {
    labelKey: "home.mfg.block3.label",
    titleKey: "home.mfg.block3.title",
    summaryKey: "home.mfg.block3.summary",
    pointKeys: ["home.mfg.block3.point1", "home.mfg.block3.point2"],
    imageSrc: "/images/common/material-selection.webp",
    imageAltKey: "home.mfg.block3.imageAlt",
  },
];

export default function ManufacturingBlocks() {
  const { t } = useTranslation();
  return (
    <section className="bg-white border-t border-slate-200">
      <div className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 lg:pt-20 pb-10 lg:pb-12">
          <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-4">
            {t("home.mfg.eyebrow")}
          </p>
          <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#001f4d] tracking-tight leading-[1.05] max-w-3xl">
            {t("home.mfg.headline")}
          </h2>
          <p className="text-slate-500 max-w-2xl text-sm md:text-base leading-relaxed mt-4">
            {t("home.mfg.subtitle")}
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
                key={block.titleKey}
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
                      alt={t(block.imageAltKey)}
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
                  <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-3">
                    {t(block.labelKey)}
                  </p>
                  <h3 className="font-black text-2xl md:text-[30px] text-[#001f4d] tracking-tight leading-[1.08] mb-5 max-w-2xl">
                    {t(block.titleKey)}
                  </h3>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
                    {t(block.summaryKey)}
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    {block.pointKeys.map(pointKey => (
                      <div
                        key={pointKey}
                        className="border-l-2 border-slate-200 pl-4"
                      >
                        <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">
                          {t(pointKey)}
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
