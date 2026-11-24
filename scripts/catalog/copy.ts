import type { BladeSectorType } from "../../client/src/data/blades.ts";
import site from "../../client/src/locales/en.json";

// Shared technical labels and engineering standards match the English website.
export const catalogCopy = {
  catalog: "Product catalog",
  complete: "Industrial Blade Catalog",
  contents: "Contents",
  viewProduct: "Full specifications and quotation",
  aboutBody:
    "Sureay manufactures industrial blades in Ma’anshan, China. To identify a replacement blade, compare the cutting application, mounting dimensions and material grade with the requirements on your machine drawing.",
  contactBody:
    "For a quotation, send your drawing or sample, the machine model and the quantity required. Include the catalog item number if available.",
  sectors: {
    recycling: site["productList.sectors.recycling"],
    paper: "Paper, tissue and print finishing",
    metal: site["footer.industry.metal"],
    converting: "Film, nonwovens and flexible packaging",
    new_energy: "Battery manufacturing and recycling",
    wood: site["footer.industry.wood"],
    other: "Custom blades",
  } satisfies Record<BladeSectorType, string>,
  aboutTitle: site["nav.about"],
  products: site["nav.products"],
  specifications: site["bladeUi.technicalSpecifications"],
  machines: site["product.heading.compatibleMachines"],
  standardsTitle: site["home.mfg.headline"],
  standards: ([1, 2, 3] as const).map(number => ({
    title: site[`home.mfg.block${number}.title`],
    description: site[`home.mfg.block${number}.summary`],
  })),
  contact: site["nav.contact"],
  email: site["footer.email"],
  phone: site["contactPage.form.phoneLabel"],
  dimensions: site["product.heading.comprehensiveData"],
  itemNo: site["bladeUi.itemNo"],
  od: site["product.tableHeader.outerDiameter"],
  id: site["product.tableHeader.innerDiameter"],
  thickness: site["product.tableHeader.thickness"],
  teeth: site["product.tableHeader.teeth"],
  specification: site["product.tableHeader.specification"],
};

export type CatalogCopy = typeof catalogCopy;
