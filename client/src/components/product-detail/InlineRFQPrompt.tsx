import { ArrowRight } from "lucide-react";
import type { Blade } from "@/data/blades";
import { useTranslation } from "@/lib/useTranslation";

export default function InlineRFQPrompt({
  content,
}: {
  content?: NonNullable<Blade["detailLayout"]>["inlineRfq"];
}) {
  const { t, lang } = useTranslation();
  const Heading = content ? "h2" : "h3";
  return (
    <section className="site-section site-content max-w-7xl mx-auto px-6 sm:px-8">
      <div className="border border-slate-200 border-l-4 border-l-[#001f4d] bg-slate-50 px-6 py-6 lg:px-8 lg:py-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="max-w-2xl">
          {lang !== "en" && !content && (
            <p className="font-mono text-[12px] text-muted-foreground  tracking-[0.24em] mb-2">
              {t("productDetail.inlineRfq.eyebrow")}
            </p>
          )}
          <Heading className="font-sans font-black text-xl lg:text-2xl text-[#001f4d]  tracking-tight leading-[1.08] mb-2">
            {content?.title ?? t("productDetail.inlineRfq.headline")}
          </Heading>
          <p className="text-description text-slate-600 leading-relaxed">
            {content?.description ?? t("productDetail.inlineRfq.body")}
          </p>
        </div>

        <a
          href="#rfq"
          onClick={event => {
            event.preventDefault();
            document
              .getElementById("rfq")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center justify-between gap-3 bg-[#001f4d] hover:bg-white border-2 border-[#001f4d] text-white hover:text-[#001f4d] font-black text-xs  tracking-[0.16em] px-6 py-3.5 transition-colors duration-200 rounded-none min-w-[240px]"
        >
          <span>{content?.buttonLabel ?? t("cta.sendDrawing")}</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </section>
  );
}
