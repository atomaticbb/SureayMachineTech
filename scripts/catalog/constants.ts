import type { CatalogIndustry } from "../../client/src/data/industry-blades.ts";

export const COMPANY = {
  name: "Sureay Machinery Technology Co., Ltd.",
  address:
    "Industrial Development Zone, Bowang Town, Bowang District, Ma'anshan City, Anhui Province 243131, China",
  phone: "+86 180 0555 0657",
  email: "lynn@sureay.com",
  website: "sureay.com",
  websiteUrl: "https://sureay.com",
};

export interface SectorMeta {
  title: string;
  filename: string;
}

export const SECTOR_CONFIG = {
  recycling: {
    title: "Plastics & Recycling",
    filename: "sureay-recycling-blades-catalog.pdf",
  },
  paper: {
    title: "Paper & Tissue",
    filename: "sureay-paper-blades-catalog.pdf",
  },
  metal: {
    title: "Metal Processing",
    filename: "sureay-metal-blades-catalog.pdf",
  },
  converting: {
    title: "Flexible Converting & Packaging",
    filename: "sureay-converting-blades-catalog.pdf",
  },
  new_energy: {
    title: "Battery Manufacturing & Recycling",
    filename: "sureay-new-energy-blades-catalog.pdf",
  },
  wood: {
    title: "Wood Processing",
    filename: "sureay-wood-blades-catalog.pdf",
  },
} satisfies Record<CatalogIndustry, SectorMeta>;
