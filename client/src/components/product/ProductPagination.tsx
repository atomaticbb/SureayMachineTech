/**
 * ProductPagination — page control for the blade catalogue grid.
 *
 * Markup mirrors the pagination in pages/News.tsx (« / numbered / » + progress
 * bar + N/total) so the two paginated surfaces look identical. It is a copy
 * rather than a shared extraction because News.tsx is hardcoded English with no
 * i18n, and this one is translated.
 *
 * Every page number is rendered — no ellipsis windowing. Fine while the
 * catalogue produces a handful of pages; revisit past ~10.
 */

import { useTranslation } from "@/lib/useTranslation";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-col items-center gap-4"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label={t("common.previous")}
          className="font-mono w-10 h-10 border border-slate-200 text-[13px] text-slate-500 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#001f4d] hover:text-[#001f4d] transition-colors duration-200"
        >
          «
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            aria-current={n === currentPage ? "page" : undefined}
            className={`font-mono w-10 h-10 border text-[13px] transition-colors duration-200 ${
              n === currentPage
                ? "border-[#001f4d] bg-[#001f4d] text-white"
                : "border-slate-200 text-slate-500 hover:border-[#001f4d] hover:text-[#001f4d]"
            }`}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label={t("common.next")}
          className="font-mono w-10 h-10 border border-slate-200 text-[13px] text-slate-500 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#001f4d] hover:text-[#001f4d] transition-colors duration-200"
        >
          »
        </button>
      </div>

      <div className="w-48 h-[2px] bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-[#001f4d] transition-all duration-300"
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        />
      </div>
      <p className="font-mono text-[10px] text-slate-400 tracking-[0.3em]">
        {currentPage} / {totalPages}
      </p>
    </nav>
  );
}
