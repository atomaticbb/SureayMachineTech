/**
 * SteelGradeTable — steel grade selection guidance.
 * Renders only when blade.steelGrades is present (currently tissue log saw
 * blades only). Sits between DecisiveSpecs and ComprehensiveData.
 */

import type { Blade } from "@/data/blades";
import { TableScrollRegion } from "@/components/ui/table";
import { useTranslation } from "@/lib/useTranslation";

interface Props {
  blade: Blade;
}

export default function SteelGradeTable({ blade }: Props) {
  const { t } = useTranslation();
  const data = blade.steelGrades;
  if (!data || data.rows.length === 0) return null;

  return (
    <section
      aria-label={t("productDetail.steelGrades.headline")}
      // w-full/min-w-0: without these the section sizes to the table's
      // min-content width and pushes the page wider than the viewport on
      // mobile, so the inner overflow-x-auto never engages.
      className="site-section site-content w-full min-w-0 max-w-7xl mx-auto px-6 sm:px-8"
    >
      <h2 className="font-black text-4xl text-[#001f4d]  tracking-tight mb-6">
        {t("productDetail.steelGrades.headline")}
      </h2>

      <p className="text-description text-slate-600 leading-relaxed max-w-[80ch] mb-8">
        {[data.intro, data.outro].filter(Boolean).join(" ")}
      </p>

      <TableScrollRegion
        label={t("productDetail.steelGrades.headline")}
        pinFirstColumn
        className="border-t-2 border-t-[#001f4d] border border-slate-300"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              <th
                scope="col"
                className="px-5 py-3 font-mono text-[14px] text-slate-600  tracking-wider font-semibold"
              >
                {t("productDetail.steelGrades.colGrade")}
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-mono text-[14px] text-slate-600  tracking-wider font-semibold"
              >
                {t("productDetail.steelGrades.colHardness")}
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-mono text-[14px] text-slate-600  tracking-wider font-semibold"
              >
                {t("productDetail.steelGrades.colBestFor")}
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-mono text-[14px] text-slate-600  tracking-wider font-semibold"
              >
                {t("productDetail.steelGrades.colTradeoff")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr
                key={row.grade}
                className={`border-b border-slate-200 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
              >
                <th scope="row" className="px-5 py-4 text-left font-mono font-bold text-[16px] text-[#001f4d] align-top whitespace-nowrap">
                  {row.grade}
                </th>
                <td className="px-5 py-4 font-mono font-medium text-[16px] text-[#001f4d] align-top whitespace-nowrap">
                  {row.hardness}
                </td>
                <td className="px-5 py-4 text-[16px] text-slate-700 leading-relaxed align-top">
                  {row.bestFor}
                </td>
                <td className="px-5 py-4 text-[16px] text-muted-foreground leading-relaxed align-top">
                  {row.tradeoff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScrollRegion>

    </section>
  );
}
