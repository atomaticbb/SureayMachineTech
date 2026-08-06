/**
 * SteelGradeTable — steel grade selection guidance.
 * Renders only when blade.steelGrades is present (currently tissue log saw
 * blades only). Sits between DecisiveSpecs and ComprehensiveData.
 */

import type { Blade } from "@/data/blades";
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
      aria-label="Steel grade selection"
      className="max-w-7xl mx-auto px-6 sm:px-8"
    >
      <p className="font-mono text-[10px] text-slate-700  tracking-widest mb-3">
        [ {t("productDetail.steelGrades.eyebrow")} ]
      </p>
      <h2 className="font-black text-4xl text-[#001f4d]  tracking-tight mb-6">
        {t("productDetail.steelGrades.headline")}
      </h2>

      <p className="text-[16px] text-slate-600 leading-relaxed max-w-[80ch] mb-8">
        {data.intro}
      </p>

      <div className="border-t-2 border-t-[#001f4d] border border-slate-300 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              <th
                scope="col"
                className="px-5 py-3 font-mono text-[11px] text-slate-600  tracking-wider font-semibold"
              >
                {t("productDetail.steelGrades.colGrade")}
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-mono text-[11px] text-slate-600  tracking-wider font-semibold"
              >
                {t("productDetail.steelGrades.colHardness")}
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-mono text-[11px] text-slate-600  tracking-wider font-semibold"
              >
                {t("productDetail.steelGrades.colBestFor")}
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-mono text-[11px] text-slate-600  tracking-wider font-semibold"
              >
                {t("productDetail.steelGrades.colTradeoff")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr
                key={row.grade}
                className={`border-b border-slate-200 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
              >
                <td className="px-5 py-4 font-mono font-bold text-[14px] text-[#001f4d] align-top whitespace-nowrap">
                  {row.grade}
                </td>
                <td className="px-5 py-4 font-mono font-medium text-[14px] text-[#001f4d] align-top whitespace-nowrap">
                  {row.hardness}
                </td>
                <td className="px-5 py-4 text-[14px] text-slate-700 leading-relaxed align-top">
                  {row.bestFor}
                </td>
                <td className="px-5 py-4 text-[14px] text-slate-500 leading-relaxed align-top">
                  {row.tradeoff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.outro && (
        <p className="text-[15px] text-slate-500 leading-relaxed mt-6">
          {data.outro}
        </p>
      )}
    </section>
  );
}
