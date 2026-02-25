/**
 * ProductGrid — renders a collection of ProductCards
 * layout='list'  → stacked flex-col (used in BladeListPage sidebar layout)
 * layout='grid'  → 3-col card grid (future use)
 * layout='related' → 3-col grid of compact related cards (used in BladeDetail)
 */

import { type Blade } from "@/data/blades";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  blades: Blade[];
  layout?: "list" | "grid" | "related";
  onShowAll?: () => void;
}

export default function ProductGrid({
  blades,
  layout = "list",
  onShowAll,
}: ProductGridProps) {
  if (blades.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <svg
          className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
          No blades found for this category.
        </p>
        {onShowAll && (
          <button
            onClick={onShowAll}
            className="mt-4 text-[#003366] dark:text-blue-400 font-semibold hover:underline text-sm"
          >
            Show all blades
          </button>
        )}
      </div>
    );
  }

  if (layout === "related") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blades.map((blade) => (
          <ProductCard key={blade.id} blade={blade} variant="related" />
        ))}
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blades.map((blade) => (
          <ProductCard key={blade.id} blade={blade} variant="list" />
        ))}
      </div>
    );
  }

  // layout === "list"
  return (
    <div className="flex flex-col gap-5">
      {blades.map((blade) => (
        <ProductCard key={blade.id} blade={blade} variant="list" />
      ))}
    </div>
  );
}
