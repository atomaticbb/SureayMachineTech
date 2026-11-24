import { useTranslation } from "@/lib/useTranslation";

interface Block {
  labelKey: string;
  titleKey: string;
  summaryKey: string;
  pointKeys: [string, string];
  imageAltKey: string;
  image: {
    name: string;
    width: number;
    height: number;
    variants: number[];
  };
}

const IMAGE_SIZES =
  "(min-width: 1920px) 590px, (min-width: 1024px) calc((100vw - 150px) / 3), (min-width: 768px) calc((100vw - 92px) / 2), (min-width: 640px) calc(100vw - 74px), calc(100vw - 50px)";

const BLOCKS: Block[] = [
  {
    labelKey: "home.mfg.block1.label",
    titleKey: "home.mfg.block1.title",
    summaryKey: "home.mfg.block1.summary",
    pointKeys: ["home.mfg.block1.point1", "home.mfg.block1.point2"],
    imageAltKey: "home.mfg.block1.imageAlt",
    image: {
      name: "lathe-machining",
      width: 1280,
      height: 720,
      variants: [360, 480, 768, 1280],
    },
  },
  {
    labelKey: "home.mfg.block2.label",
    titleKey: "home.mfg.block2.title",
    summaryKey: "home.mfg.block2.summary",
    pointKeys: ["home.mfg.block2.point1", "home.mfg.block2.point2"],
    imageAltKey: "home.mfg.block2.imageAlt",
    image: {
      name: "blade-probe-inspection",
      width: 1200,
      height: 675,
      variants: [360, 480, 768, 1200],
    },
  },
  {
    labelKey: "home.mfg.block3.label",
    titleKey: "home.mfg.block3.title",
    summaryKey: "home.mfg.block3.summary",
    pointKeys: ["home.mfg.block3.point1", "home.mfg.block3.point2"],
    imageAltKey: "home.mfg.block3.imageAlt",
    image: {
      name: "marked-steel-billets",
      width: 1200,
      height: 675,
      variants: [360, 480, 768, 1200],
    },
  },
];

export default function ManufacturingBlocks() {
  const { t, lang } = useTranslation();
  const english = lang === "en";
  const sectionBorder = english ? "" : "border-t border-slate-200";
  return (
    <section className={`home-section bg-white ${sectionBorder}`}>
      <div className={`bg-white ${sectionBorder}`}>
        <div className={`home-content max-w-7xl mx-auto px-6 sm:px-8 ${english ? "pb-5 lg:pb-6" : "pt-16 pb-10 lg:pt-20 lg:pb-12"}`}>
          {lang !== "en" && (
            <p className="text-muted-foreground font-bold text-xs  tracking-[0.3em] mb-4">
              {t("home.mfg.eyebrow")}
            </p>
          )}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className={english ? "home-section-title" : "font-black text-2xl md:text-3xl lg:text-[38px] text-[#001f4d] tracking-tight leading-[1.05] max-w-xl"}>
              {t("home.mfg.headline")}
            </h2>
          </div>
          {!english && <div className="w-14 h-[3px] bg-slate-300 mt-6" />}
        </div>
      </div>

      <div className={`home-content max-w-7xl mx-auto px-6 sm:px-8 ${english ? "" : "pb-14 lg:pb-20"}`}>
        <div className={english ? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6" : "bg-white"}>
          {BLOCKS.map((block, index) => {
            const reverse = index % 2 === 1;
            const image = block.image;
            const imagePath = `/images/home/${image.name}`;

            return (
              <div
                key={block.titleKey}
                className={english ? "flex min-w-0 flex-col border border-[#E5E9EF] bg-white" : "grid grid-cols-1 lg:grid-cols-12 lg:gap-12 gap-8 py-10 lg:py-14 border-b border-slate-100 last:border-0"}
              >
                <div
                  className={english ? undefined : `lg:col-span-5 ${reverse ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className={`relative overflow-hidden border-slate-200 ${english ? "aspect-video border-b bg-slate-100" : "h-[260px] border bg-slate-50 md:h-[300px] lg:h-[340px]"}`}>
                    <img
                      src={`${imagePath}-${image.width}w.webp`}
                      srcSet={image.variants
                        .map(width => `${imagePath}-${width}w.webp ${width}w`)
                        .join(", ")}
                      sizes={english ? IMAGE_SIZES : "(min-width: 1280px) 480px, (min-width: 1024px) 42vw, 100vw"}
                      width={image.width}
                      height={image.height}
                      alt={t(block.imageAltKey)}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {!english && <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/30 to-transparent" />}
                  </div>
                </div>

                <div
                  className={english ? "flex flex-1 flex-col gap-3 p-4" : `lg:col-span-7 flex flex-col justify-center ${reverse ? "lg:order-1" : "lg:order-2"}`}
                >
                  {english ? (
                    <>
                      <h3 className="text-[18px] font-black leading-[1.2] tracking-tight text-[#001f4d]">
                        {t(block.titleKey)}
                      </h3>
                      <p className="text-[16px] leading-[1.4] text-slate-700">
                        {t(block.summaryKey)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-muted-foreground font-bold text-xs  tracking-[0.3em] mb-3">
                        {t(block.labelKey)}
                      </p>
                      <h3 className="text-2xl md:text-[32px] text-[#001f4d] tracking-tight leading-[1.08] max-w-2xl mb-5 font-black">
                        {t(block.titleKey)}
                      </h3>
                      <p className="text-description text-muted-foreground leading-relaxed max-w-2xl mb-6">
                        {t(block.summaryKey)}
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        {block.pointKeys.map(pointKey => (
                          <p key={pointKey} className="border-l-2 border-slate-200 pl-4 text-description text-slate-600 leading-relaxed">
                            {t(pointKey)}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
