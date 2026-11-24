import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Blade } from "@/data/blades";
import { getBladeDimensionTables, getStandardColumns } from "@/data/blade-dimension-tables";
import { ITEM_NO_COLUMN } from "@/data/blades";
import { useTranslation } from "@/lib/useTranslation";

interface ComprehensiveDataProps {
  blade: Blade;
}

export default function ComprehensiveData({ blade }: ComprehensiveDataProps) {
  const { t } = useTranslation();
  const heading = t("productDetail.comprehensiveData.headline");
  const standardRows = blade.standardDimensions ?? [];
  const standardColumns = getStandardColumns(blade, standardRows, t);
  const dimensionTables = blade.detailLayout
    ? getBladeDimensionTables(blade, heading, standardColumns)
    : undefined;
  if (dimensionTables?.length) {
    const renderTable = (table: (typeof dimensionTables)[number]) => (
      <Table
        aria-label={table.title}
        pinFirstColumn
        className="border-collapse border border-slate-300 font-sans [&_th]:border [&_th]:border-slate-200 [&_td]:border [&_td]:border-slate-200"
      >
        <TableHeader>
          <TableRow className="border-slate-300 bg-white hover:bg-white">
            {table.columns.map(column => (
              <TableHead
                key={column}
                scope="col"
                className="h-auto whitespace-nowrap px-4 py-4 text-[14px] font-medium leading-5 text-slate-600"
              >
                {column === ITEM_NO_COLUMN ? t("bladeUi.itemNo") : column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.rows.map(([partNo, ...values]) => (
            <TableRow
              key={JSON.stringify([partNo, ...values])}
              className="border-slate-100 bg-white hover:bg-white"
            >
              <th
                scope="row"
                className="whitespace-nowrap px-4 py-3.5 text-left text-[16px] font-semibold leading-[1.4] text-[#001f4d]"
              >
                {partNo}
              </th>
              {values.map((value, index) => (
                <TableCell
                  key={table.columns[index + 1]}
                  className="whitespace-nowrap px-4 py-3.5 text-[16px] leading-[1.4] text-slate-800"
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
    return (
      <section
        aria-labelledby="product-dimensions-heading"
        className="site-section site-content max-w-7xl mx-auto px-6 max-[359px]:px-3 sm:px-8"
      >
        <h2
          id="product-dimensions-heading"
          className="mb-8 text-4xl font-black tracking-tight text-[#001f4d] sm:mb-10"
        >
          {blade.detailLayout?.dimensionsHeading ?? heading}
        </h2>
        {blade.dimensionLabels?.intro && (
          <p className="mb-5 max-w-4xl text-description text-muted-foreground">
            {blade.dimensionLabels.intro}
          </p>
        )}
        {dimensionTables.length === 1 ? (
          renderTable(dimensionTables[0])
        ) : (
          <Tabs
            key={blade.id}
            defaultValue={dimensionTables[0].id}
            className="gap-5"
          >
            <TabsList
              aria-label={blade.detailLayout?.dimensionsHeading ?? heading}
              className="h-auto w-full max-w-full justify-start gap-1 overflow-x-auto bg-white p-0 sm:w-fit sm:gap-2"
            >
              {dimensionTables.map(table => (
                <TabsTrigger
                  key={table.id}
                  value={table.id}
                  className="h-auto min-h-11 flex-auto whitespace-nowrap border-[#001f4d] bg-white px-1.5 py-2 text-[12px] font-semibold text-[#001f4d] transition-none data-[state=active]:bg-[#001f4d] data-[state=active]:text-white max-[359px]:px-1 max-[359px]:text-[11px] sm:px-5 sm:text-sm"
                >
                  {table.tabLabel}
                </TabsTrigger>
              ))}
            </TabsList>
            {dimensionTables.map(table => (
              <TabsContent
                key={table.id}
                value={table.id}
                forceMount
                className="data-[state=inactive]:hidden"
              >
                {renderTable(table)}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </section>
    );
  }

  if (!standardRows.length) return null;

  return (
    <section
      aria-label={heading}
      className="site-section site-content max-w-7xl mx-auto px-6 sm:px-8"
    >
      <h2 className="font-black text-4xl text-[#001f4d]  tracking-tight mb-10">
        {heading}
      </h2>

      <div className="mx-auto max-w-4xl border border-slate-200 border-t-2 border-t-[#001f4d]">
        <Table aria-label={heading} pinFirstColumn>
          <TableHeader>
            <TableRow className="bg-slate-100 hover:bg-slate-100 border-b border-slate-200">
              {standardColumns.map((column, index) => (
                <TableHead
                  key={index}
                  className="h-auto px-3 py-2.5 font-mono font-semibold text-[14px] tracking-wider text-slate-600"
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {standardRows.map((row, i) => (
              <TableRow
                key={i}
                className={
                  i % 2 === 0
                    ? "bg-white hover:bg-slate-50"
                    : "bg-slate-50 hover:bg-slate-50"
                }
              >
                {standardColumns.map((column, index) => (
                  <TableCell
                    key={index}
                    className={`px-3 py-2.5 font-mono text-[16px] ${
                      column.muted
                        ? "text-muted-foreground whitespace-pre-line"
                        : "font-medium text-[#001f4d]"
                    }`}
                  >
                    {column.value(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
