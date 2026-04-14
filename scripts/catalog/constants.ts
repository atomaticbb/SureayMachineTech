/**
 * scripts/catalog/constants.ts
 *
 * Company info, sector metadata, and design tokens for PDF catalog generation.
 */

export const COMPANY = {
  name: "Sureay Machinery Technology Co., Ltd.",
  tagline: "Precision Industrial Blades — Engineered for Performance",
  iso: "ISO 9001:2015 Certified",
  founded: "Est. 2008",
  location: "Ma'anshan, Anhui, China",
  address:
    "Industrial Development Zone, Bowang Town, Bowang District, Ma'anshan City, Anhui Province 243131, China",
  phone: "+86-156-5553-0829",
  email: "lynn@sureay.com",
  website: "www.sureay.com",
  websiteUrl: "https://www.sureay.com",
  linkedin: "https://www.linkedin.com/company/sureay",
};

export const COLORS = {
  navy: "#001f4d",
  navyDark: "#001232",
  logoBlue: "#003366",
  gold: "#e8b84b",
  white: "#ffffff",
  coldGray: "#f8fafc",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  borderColor: "#e2e8f0",
  footerBg: "#0a1219",
};

export interface SectorMeta {
  title: string;
  subtitle: string;
  filename: string;
  description: string;
}

/** Hero data for industry divider pages in the full catalog */
export interface IndustryHeroMeta {
  title: string;
  subtitle: string;
  body: string;
  /** First 4 gallery images from the industry page hero */
  images: string[];
}

export const INDUSTRY_HERO: Record<string, IndustryHeroMeta> = {
  recycling: {
    title: "Plastic Recycling Shredder & Granulator Blade Supplier",
    subtitle: "Precision Knives, Filterless Systems & OEM Wear Parts",
    body: "Sureay Machinery specializes in manufacturing premium industrial knives, melt filtration equipment, and high-wear components for the plastics recycling industry. Our material expertise in D2, SKD-11, and tungsten carbide ensures maximum blade life in shredding, granulating, and extrusion applications.",
    images: [
      "/images/applications/plastic-industry/single-shredder-blades-04.webp",
      "/images/applications/plastic-industry/mutil-shaft-shredder-blades.webp",
      "/images/applications/plastic-industry/four-shaft-shredder-blade-00.webp",
      "/images/applications/plastic-industry/shredder-blades-03.webp",
    ],
  },
  paper: {
    title: "Paper, Tissue & Corrugated Knife Manufacturer",
    subtitle: "Log Saw Blades, Slitter Knives, Trimmer Blades & OEM Wear Parts",
    body: "Sureay Machinery manufactures triple-ground tissue log saw blades, rewinder perforation knives, precision slitting tooling, and corrugated slitter-scorer blades engineered for maximum throughput in high-speed converting lines.",
    images: [
      "/images/applications/tissue-industry/tissue-and-paper.webp",
      "/images/applications/tissue-industry/tissue-log-saw-blades-02.webp",
      "/images/applications/tissue-industry/paper-cutting-blades-02.webp",
      "/images/applications/tissue-industry/granulator-blades-05.webp",
    ],
  },
  metal: {
    title: "Industrial Metal Slitting & Shear Blade Manufacturer",
    subtitle: "Slitter Knives, Shear Blades & OEM Wear Parts",
    body: "Sureay Machinery manufactures through-hardened circular slitter knives, guillotine shear blades, and precision punch-and-die sets engineered for continuous-run metal coil processing. Every knife profile is reverse-engineered from OEM drawings, then precision-ground on our 5-axis CNC equipment.",
    images: [
      "/images/applications/metal-industry/metal-slitter-knives-04.webp",
      "/images/applications/metal-industry/single-shredder-blades-010.webp",
      "/images/applications/metal-industry/metal-shear-blades-00.webp",
      "/images/applications/metal-industry/metal-slitter-knives-00.webp",
    ],
  },
  converting: {
    title: "Flexible Converting & Packaging Slitter Knife Supplier",
    subtitle: "Film · Nonwoven · PSA Tape · Label Converting Blades",
    body: "Sureay Machinery manufactures precision circular slitter knives and specialty cutting tools for the flexible packaging, nonwoven fabric, and label converting industries. From matched shear pairs for film slitting to DLC-coated blades for PSA tape lines, every knife is precision ground to ±0.002mm.",
    images: [
      "/images/applications/converting-industry/converting-industry.webp",
      "/images/applications/converting-industry/rotary-slitter-knives-02.webp",
      "/images/applications/converting-industry/rotary-slitter-knives-08.webp",
      "/images/applications/converting-industry/rotary-slitter-knives-09.webp",
    ],
  },
  new_energy: {
    title: "Lithium Battery & New Energy Precision Slitting Knife Supplier",
    subtitle: "Zero-Notch Carbide Electrode Slitting · EV Cell Manufacturing",
    body: "Sureay Machinery manufactures tungsten carbide circular slitting knives for lithium-ion battery electrode foil processing — the critical upstream step in EV cell, energy storage, and consumer electronics battery manufacturing.",
    images: [
      "/images/applications/energy-industry/knives-using-in-energy-industry.webp",
      "/images/applications/energy-industry/slitting-blades.webp",
      "/images/applications/energy-industry/slitting-blades-11.webp",
      "/images/applications/energy-industry/slitting-blades-12.webp",
    ],
  },
};

export const SECTOR_CONFIG: Record<string, SectorMeta> = {
  recycling: {
    title: "Recycling Industry",
    subtitle: "Shredder, Granulator & Crusher Blades",
    filename: "sureay-recycling-blades-catalog.pdf",
    description:
      "Industrial blades engineered for plastic recycling, tire shredding, and waste processing applications.",
  },
  paper: {
    title: "Paper & Tissue Industry",
    subtitle: "Slitter, Log Saw & Trimmer Blades",
    filename: "sureay-paper-blades-catalog.pdf",
    description:
      "Precision cutting knives for tissue converting, corrugated board processing, and paper finishing.",
  },
  metal: {
    title: "Metal Processing Industry",
    subtitle: "Coil Slitting, Shear & Cold Saw Blades",
    filename: "sureay-metal-blades-catalog.pdf",
    description:
      "Heavy-duty blades for metal coil slitting, plate shearing, and cold sawing operations.",
  },
  converting: {
    title: "Converting Industry",
    subtitle: "Rotary Slitter & Nonwoven Knives",
    filename: "sureay-converting-blades-catalog.pdf",
    description:
      "High-precision slitter knives for film, foil, nonwoven, and flexible packaging converting.",
  },
  new_energy: {
    title: "New Energy Industry",
    subtitle: "Battery Electrode Slitting & Recycling Blades",
    filename: "sureay-new-energy-blades-catalog.pdf",
    description:
      "Ultra-precision blades for lithium battery electrode slitting and battery recycling.",
  },
};
