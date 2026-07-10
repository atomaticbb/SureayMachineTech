import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";

export default function InlineRFQPrompt() {
  const { t } = useTranslation();
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="border border-slate-200 border-l-4 border-l-[#001f4d] bg-slate-50 px-6 py-6 lg:px-8 lg:py-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] text-slate-500  tracking-[0.24em] mb-2">
            [ {t("productDetail.inlineRfq.eyebrow")} ]
          </p>
          <h3 className="font-black text-xl lg:text-2xl text-[#001f4d]  tracking-tight leading-[1.08] mb-2">
            {t("productDetail.inlineRfq.headline")}
          </h3>
          <p className="text-[16px] text-slate-600 leading-relaxed">
            {t("productDetail.inlineRfq.body")}
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
          <span>{t("cta.sendDrawing")}</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </section>
  );
}
