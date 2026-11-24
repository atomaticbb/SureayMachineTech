import type { Blade, StandardDimension } from "./blades";

const shredderDimensionOmissions: Record<string, ("col0" | "col2")[]> = {
  "twin-shaft-blades-recycling": ["col0"],
  "multi-shaft-blades-metal": ["col0"],
  "tire-shredder-blades": ["col0"],
  "twin-shaft-blades-battery": ["col0", "col2"],
};

export function getStandardColumns(
  blade: Blade,
  rows: StandardDimension[],
  t: (key: string) => string
) {
  const labels = blade.dimensionLabels;
  const specificationLabel = labels?.col0;
  const hasSpec =
    specificationLabel !== undefined &&
    rows.some(row => row.spec !== undefined);
  const hasLengthTeeth = rows.some(
    row => row.length !== undefined || row.teeth !== undefined
  );
  const hasBoreHooks = rows.some(
    row => row.bore !== undefined || row.hooks !== undefined
  );
  const columns: {
    label: string;
    value: (row: StandardDimension) => string | undefined;
    muted?: boolean;
  }[] = [];

  if (rows.some(row => row.itemNo !== undefined)) {
    columns.push({ label: t("bladeUi.itemNo"), value: row => row.itemNo });
  }
  if (hasSpec) {
    columns.push({
      label: specificationLabel,
      value: row => row.spec ?? "—",
      muted: true,
    });
  }
  columns.push(
    {
      label:
        labels?.col1 ?? t("productDetail.comprehensiveData.colOuterDiameter"),
      value: row => row.dimension ?? (hasSpec ? row.od : (row.spec ?? row.od)),
    },
    {
      label:
        labels?.col2 ?? t("productDetail.comprehensiveData.colInnerDiameter"),
      value: row =>
        hasBoreHooks ? (row.thickness ?? "—") : (row.bolt ?? row.id),
    }
  );

  const col3 =
    labels?.col3 ?? t("productDetail.comprehensiveData.colThickness");
  const col4 = labels?.col4 ?? t("productDetail.comprehensiveData.colTeeth");
  if (hasLengthTeeth) {
    columns.push(
      { label: col3, value: row => row.length ?? "—" },
      { label: col4, value: row => row.pcs ?? row.teeth ?? "—" }
    );
  } else if (hasBoreHooks) {
    columns.push(
      { label: col3, value: row => row.bore ?? "—" },
      { label: col4, value: row => row.hooks ?? "—" }
    );
  } else if (
    labels?.col3 !== undefined ||
    rows.some(row => row.thickness !== undefined || row.type !== undefined)
  ) {
    columns.push({ label: col3, value: row => row.type ?? row.thickness });
    if (rows.some(row => row.oem !== undefined)) {
      columns.push({ label: col4, value: row => row.oem ?? "—", muted: true });
    }
  }
  return columns;
}

export function getBladeDimensionTables(
  blade: Blade,
  heading: string,
  standardColumns: ReturnType<typeof getStandardColumns>
) {
  if (blade.detailLayout?.dimensionTables.length) {
    return blade.detailLayout.dimensionTables;
  }
  if (!blade.standardDimensions?.length) return [];
  const omitted = blade.detailLayout
    ? shredderDimensionOmissions[blade.id]?.map(
        key => blade.dimensionLabels?.[key]
      )
    : undefined;
  const columns = standardColumns.filter(
    column => !omitted?.includes(column.label)
  );
  return [
    {
      id: "standard-dimensions",
      title: heading,
      tabLabel: heading,
      columns: columns.map(column => column.label),
      rows: blade.standardDimensions.map(row =>
        columns.map(column => column.value(row) ?? "")
      ),
    },
  ];
}
