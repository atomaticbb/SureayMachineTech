import FaqItem from "@/components/ui/FaqItem";
import { FAQ_ITEM_IDS } from "@/data/homeData";
import { useTranslation } from "@/lib/useTranslation";

const RFQ_IMAGE = "/images/home/rfq-workshop-discussion";
const RFQ_SRC_SET = [360, 600, 900, 1280, 1708]
  .map(width => `${RFQ_IMAGE}-${width}w.webp ${width}w`)
  .join(", ");
const RFQ_SIZES =
  "(min-width: 1920px) 795px, (min-width: 1024px) calc((100vw - 156px) / 2.22), (min-width: 768px) calc((100vw - 104px) / 2.22), (min-width: 640px) calc(100vw - 72px), calc(100vw - 48px)";

export default function TechnicalFAQ() {
  const { t, lang } = useTranslation();
  const english = lang === "en";
  const questions = FAQ_ITEM_IDS.map((id, i) => (
    <FaqItem
      key={id}
      q={t(`home.faq.items.q${id}`)}
      a={t(`home.faq.items.a${id}`)}
      index={english ? undefined : i + 1}
      defaultOpen={english && i === 0}
    />
  ));

  if (english) {
    return (
      <section aria-labelledby="home-rfq-questions" className="home-section bg-white">
        <div className="home-content grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)] md:gap-8 lg:gap-[60px]">
          <div>
            <h2
              id="home-rfq-questions"
              className="home-section-title mb-5"
            >
              {t("home.faq.headline")}
            </h2>
            <div>{questions}</div>
          </div>
          <img
            src={`${RFQ_IMAGE}-900w.webp`}
            srcSet={RFQ_SRC_SET}
            sizes={RFQ_SIZES}
            width={1708}
            height={1298}
            alt={t("home.faq.imageAlt")}
            loading="lazy"
            decoding="async"
            className="block aspect-[4/3] w-full max-h-none object-cover object-right"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-14 lg:py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="relative overflow-hidden border border-slate-200 h-[400px] lg:h-[440px] lg:sticky lg:top-20 self-start bg-slate-900">
            <img
              src={`${RFQ_IMAGE}-900w.webp`}
              srcSet={RFQ_SRC_SET}
              sizes="(min-width: 1024px) 50vw, 100vw"
              width={1708}
              height={1298}
              alt={t("home.faq.imageAlt")}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001224]/75 via-[#001f4d]/40 to-[#001f4d]/30" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
              <p className="text-[14px] font-bold  tracking-[0.3em] text-white/60 mb-3">
                {t("home.faq.imageEyebrow")}
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-[1.05] mb-3">
                {t("home.faq.imageHeadline")}
              </h3>
              <div className="w-10 h-[2px] bg-slate-400 mb-4" />
              <p className="text-sm text-white/75 leading-relaxed max-w-md">
                {t("home.faq.imageBody")}
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none flex flex-col">
            <div className="px-6 lg:px-8 pt-6 lg:pt-7 pb-5 border-b border-slate-100">
              <p className="text-muted-foreground font-bold text-xs  tracking-[0.3em] mb-3">
                {t("home.faq.eyebrow")}
              </p>
              <h3 className="font-black text-2xl md:text-3xl lg:text-[38px] text-[#001f4d] tracking-tight leading-[1.05]">
                {t("home.faq.headline")}
              </h3>
              <div className="w-14 h-[3px] bg-slate-300 mt-5 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                {t("home.faq.subtitle")}
              </p>
            </div>
            <div className="flex-1">{questions}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
