import {
  getBladeById,
  getBladeSizeRange,
  getShredderDetailBlade,
  isUpgradedShredderBlade,
  type Blade,
  type BladeSpec,
} from "@/data/blades";

export function localizedSizeRange(blade: Blade) {
  return blade.detailLayout?.sizeRange ??
    getBladeSizeRange(blade, getBladeById(blade.id) ?? blade);
}

// Translations preserve catalog row order. Resolve the row's meaning in the
// source so a localized label such as "Matériau" need never match English.
export function bladeHeroSpecs(blade: Blade, t: (key: string) => string) {
  const source = getBladeById(blade.id) ?? blade;
  const canonical = !source.detailLayout && isUpgradedShredderBlade(source)
    ? getShredderDetailBlade(source)
    : source;
  const hero = [canonical.detailLayout?.heroSpecs, blade.detailLayout?.heroSpecs] as const;
  const technical = [canonical.detailLayout?.technicalSpecs, blade.detailLayout?.technicalSpecs] as const;
  const base = [canonical.specs, blade.specs] as const;
  type Rows = readonly [BladeSpec[] | undefined, BladeSpec[] | undefined];
  function find(pattern: RegExp, groups: Rows[]) {
    for (const [sourceRows, localizedRows] of groups) {
      const index = sourceRows?.findIndex(row => pattern.test(row.label)) ?? -1;
      if (localizedRows?.[index]) return localizedRows[index];
    }
  }
  const sizeRange = localizedSizeRange(blade) ??
    find(/^sizes$/i, [hero, technical, base])?.value ?? t("bladeUi.madeToDrawing");
  const material = find(/^(?:materials?|material options)$/i, [technical, base, hero]);
  const application = find(/^applications?$/i, [hero, technical, base]);
  return {
    material: material?.value,
    specs: [
      {
        label: t("bladeUi.sizes"),
        value: blade.id === "shredder-screens"
          ? t("bladeUi.apertureRange").replace("{range}", sizeRange)
          : sizeRange,
      },
      ...(material ? [{ ...material, label: t("bladeUi.material") }] : []),
      ...(application ? [{ ...application, label: t("bladeUi.application") }] : []),
    ],
  };
}
