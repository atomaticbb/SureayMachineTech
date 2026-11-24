import type { Blade } from "@/data/blades";
import { useTranslation } from "@/lib/useTranslation";

interface Props {
  blade: Blade;
}

export default function CompatibleMachines({ blade }: Props) {
  const { t, lang } = useTranslation();
  if (!blade.compatibleMachines?.length) return null;
  const description = blade.compatibleMachinesIntro ??
    t("bladeUi.machineReplacement").replace("{name}", blade.name.toLocaleLowerCase(lang));

  return (
    <section
      aria-label={t("productDetail.compatibleMachines.headline")}
      className="site-section site-content max-w-7xl mx-auto px-6 sm:px-8"
    >
      <h2
        className="font-black text-4xl text-[#001f4d] tracking-tight mb-6"
      >
        {t("productDetail.compatibleMachines.headline")}
      </h2>

      {description && (
        <p className="mb-6 max-w-4xl text-description text-slate-600 leading-relaxed">
          {description}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {blade.compatibleMachines.map(brand => (
          <span
            key={brand}
            className="border-t-2 border-t-[#001f4d] border border-slate-300 bg-white
                       px-4 py-2 font-mono text-[16px] text-[#001f4d] font-semibold
                        tracking-wide"
          >
            {brand}
            <sup className="ms-0.5 text-[12px] leading-none">®</sup>
          </span>
        ))}
      </div>

    </section>
  );
}
