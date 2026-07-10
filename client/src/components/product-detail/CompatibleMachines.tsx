import type { Blade } from "@/data/blades";
import { useTranslation } from "@/lib/useTranslation";

interface Props {
  blade: Blade;
}

export default function CompatibleMachines({ blade }: Props) {
  const { t } = useTranslation();
  if (!blade.compatibleMachines?.length) return null;

  return (
    <section
      aria-label="Compatible machine brands"
      className="max-w-7xl mx-auto px-6 sm:px-8"
    >
      <p className="font-mono text-[10px] text-slate-700  tracking-widest mb-3">
        [ {t("categoryPage.oemCompatibility")} ]
      </p>
      <h2 className="font-black text-4xl text-[#001f4d]  tracking-tight mb-10">
        {t("productDetail.compatibleMachines.headline")}
      </h2>

      <div className="flex flex-wrap gap-3">
        {blade.compatibleMachines.map((brand) => (
          <span
            key={brand}
            className="border-t-2 border-t-[#001f4d] border border-slate-300 bg-white
                       px-4 py-2 font-mono text-[13px] text-[#001f4d] font-semibold
                        tracking-wide"
          >
            {brand}&#174;
          </span>
        ))}
      </div>

      <p className="font-mono text-[11px] text-slate-500  tracking-widest mt-6">
        &#174; {t("productDetail.compatibleMachines.disclaimer")}
      </p>
    </section>
  );
}
