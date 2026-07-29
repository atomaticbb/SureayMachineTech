/**
 * ProductFacetSidebar — two-axis facet filter for the blade catalogue.
 *
 * Semantics: OR within a group, AND across groups. Each option's count is
 * recomputed against the *other* group's current selection, so the numbers
 * always tell you what you'd get if you ticked that box. Options that would
 * yield nothing are disabled rather than hidden — the catalogue's two axes are
 * heavily correlated (only 15 of 56 category×sector pairs exist), so hiding
 * them would make the sidebar flicker on every click.
 *
 * Renders once: on <lg it is a disclosure panel above the grid, on lg+ it is
 * the sticky left column. Same markup, different container classes.
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  type Blade,
  type BladeCategoryType,
  type BladeSectorType,
} from "@/data/blades";
import { SECTOR_LABEL_KEY } from "@/data/blade-categories";
import { useTranslation } from "@/lib/useTranslation";

// analyticsName stays fixed English so GA4 dimensions aggregate consistently
// across locales; labelKey drives the translated, visible text.
export const CATEGORY_FACETS: {
  value: BladeCategoryType;
  labelKey: string;
  analyticsName: string;
}[] = [
  {
    value: "slitter_knives",
    labelKey: "productList.filters.slitterKnives",
    analyticsName: "Slitter Knives",
  },
  {
    value: "shredder_blades",
    labelKey: "productList.filters.shredderBlades",
    analyticsName: "Shredder Blades",
  },
  {
    value: "granulator_blades",
    labelKey: "productList.filters.granulatorBlades",
    analyticsName: "Granulator Blades",
  },
  {
    value: "log_saw_blades",
    labelKey: "productList.filters.logSawBlades",
    analyticsName: "Log Saw Blades",
  },
  {
    value: "shear_blades",
    labelKey: "productList.filters.shearBlades",
    analyticsName: "Shear Blades",
  },
  {
    value: "cold_saw_blades",
    labelKey: "productList.filters.coldSawBlades",
    analyticsName: "Cold Saw Blades",
  },
  {
    value: "wood_chipper",
    labelKey: "productList.filters.woodChipperBlades",
    analyticsName: "Wood Chipper Blades",
  },
  {
    value: "custom_profile",
    labelKey: "productList.filters.customBlades",
    analyticsName: "Custom Blades",
  },
];

// Order is display order; the labels themselves come from SECTOR_LABEL_KEY so
// the sector → i18n-key mapping lives in exactly one place.
export const SECTOR_FACETS: {
  value: BladeSectorType;
  labelKey: string;
}[] = (
  [
    "recycling",
    "paper",
    "converting",
    "metal",
    "new_energy",
    "wood",
    "other",
  ] as const
).map(value => ({ value, labelKey: SECTOR_LABEL_KEY[value] }));

interface ProductFacetSidebarProps {
  /** The full, unfiltered catalogue — counts are always derived from this. */
  blades: Blade[];
  categories: BladeCategoryType[];
  sectors: BladeSectorType[];
  onToggleCategory: (value: BladeCategoryType) => void;
  onToggleSector: (value: BladeSectorType) => void;
  onClearCategories: () => void;
  onClearSectors: () => void;
  /** Pixel offset for the sticky column, tracking the filter bar above it. */
  stickyTop: number;
}

function FacetRow({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string;
  count: number;
  checked: boolean;
  onToggle: () => void;
}) {
  // A checked option must stay clickable even at count 0, otherwise a selection
  // in the other group can strand it as un-untickable.
  const disabled = count === 0 && !checked;

  return (
    <label
      className={`flex items-center gap-2.5 py-[5px] ${
        disabled ? "cursor-not-allowed" : "cursor-pointer group"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onToggle}
        className="appearance-none w-[13px] h-[13px] shrink-0 border border-slate-300 bg-white checked:bg-[#001f4d] checked:border-[#001f4d] disabled:border-slate-200 disabled:bg-slate-50 group-hover:border-[#001f4d] cursor-pointer disabled:cursor-not-allowed transition-colors"
      />
      <span
        className={`flex-1 text-[13px] leading-snug transition-colors ${
          disabled
            ? "text-slate-300"
            : checked
              ? "text-[#001f4d] font-bold"
              : "text-slate-600 group-hover:text-[#001f4d]"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-mono text-[11px] tabular-nums ${
          disabled
            ? "text-slate-200"
            : checked
              ? "text-[#001f4d]"
              : "text-slate-400"
        }`}
      >
        {count}
      </span>
    </label>
  );
}

export default function ProductFacetSidebar({
  blades,
  categories,
  sectors,
  onToggleCategory,
  onToggleSector,
  onClearCategories,
  onClearSectors,
  stickyTop,
}: ProductFacetSidebarProps) {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // OR within a group, AND across groups: a group's own selection is ignored
  // when counting its own options.
  const bySectorOnly = sectors.length
    ? blades.filter(b => sectors.includes(b.sector))
    : blades;
  const byCategoryOnly = categories.length
    ? blades.filter(b => categories.includes(b.category))
    : blades;

  const activeCount = categories.length + sectors.length;

  const groups = (
    <>
      <div>
        <div className="flex items-baseline justify-between border-b-2 border-[#001f4d] pb-2 mb-2">
          <h2 className="font-mono text-[11px] font-black text-[#001f4d] tracking-[0.18em] uppercase">
            {t("productList.facets.categoryHeading")}
          </h2>
          {categories.length > 0 && (
            <button
              type="button"
              onClick={onClearCategories}
              className="font-mono text-[10px] text-slate-400 tracking-[0.12em] hover:text-[#001f4d] transition-colors"
            >
              {t("productList.facets.clear")}
            </button>
          )}
        </div>
        {CATEGORY_FACETS.map(f => (
          <FacetRow
            key={f.value}
            label={t(f.labelKey)}
            count={bySectorOnly.filter(b => b.category === f.value).length}
            checked={categories.includes(f.value)}
            onToggle={() => onToggleCategory(f.value)}
          />
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-baseline justify-between border-b-2 border-[#001f4d] pb-2 mb-2">
          <h2 className="font-mono text-[11px] font-black text-[#001f4d] tracking-[0.18em] uppercase">
            {t("productList.facets.sectorHeading")}
          </h2>
          {sectors.length > 0 && (
            <button
              type="button"
              onClick={onClearSectors}
              className="font-mono text-[10px] text-slate-400 tracking-[0.12em] hover:text-[#001f4d] transition-colors"
            >
              {t("productList.facets.clear")}
            </button>
          )}
        </div>
        {SECTOR_FACETS.map(f => (
          <FacetRow
            key={f.value}
            label={t(f.labelKey)}
            count={byCategoryOnly.filter(b => b.sector === f.value).length}
            checked={sectors.includes(f.value)}
            onToggle={() => onToggleSector(f.value)}
          />
        ))}
      </div>
    </>
  );

  return (
    <aside
      className="lg:sticky lg:overflow-y-auto lg:pr-1"
      style={{
        top: stickyTop,
        maxHeight: `calc(100vh - ${stickyTop + 24}px)`,
      }}
    >
      <button
        type="button"
        onClick={() => setMobileOpen(o => !o)}
        aria-expanded={mobileOpen}
        className="lg:hidden w-full flex items-center justify-between border border-slate-200 px-4 py-3 font-mono text-[12px] font-bold text-[#001f4d] tracking-[0.14em] uppercase hover:border-[#001f4d] transition-colors"
      >
        <span className="flex items-center gap-2">
          {t("productList.facets.filters")}
          {activeCount > 0 && (
            <span className="bg-[#001f4d] text-white px-1.5 py-0.5 text-[10px]">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`${mobileOpen ? "block border border-t-0 border-slate-200 p-4" : "hidden"} lg:block lg:border-0 lg:p-0`}
      >
        {groups}
      </div>
    </aside>
  );
}
