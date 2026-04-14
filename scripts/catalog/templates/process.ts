/**
 * scripts/catalog/templates/process.ts
 *
 * Manufacturing process page: process flow, equipment photos, step descriptions.
 * Uses 4-column grid layout.
 */

import { imageToBase64Compressed } from "../utils.ts";
import { pageHeader, pageFooter } from "./about.ts";

interface ProcessStep {
  image: string;
  label: string;
}

interface ProcessDetail {
  num: string;
  title: string;
  desc: string;
}

const PROCESS_IMAGES: ProcessStep[] = [
  {
    image: "/images/process/premium-steel-selection.webp",
    label: "Raw Material Selection",
  },
  {
    image: "/images/process/vacuum-heat-treatment.webp",
    label: "Heat Treatment",
  },
  {
    image: "/images/process/cnc-precision-grinding.webp",
    label: "CNC Precision Grinding",
  },
  {
    image: "/images/process/quality-control.webp",
    label: "Quality Inspection",
  },
];

const PROCESS_FLOW = [
  "Material Selection",
  "Forging",
  "Heat Treatment",
  "Tempering",
  "CNC Machining",
  "Precision Grinding",
  "QC Inspection",
  "Packaging",
];

const PROCESS_DETAILS: ProcessDetail[] = [
  {
    num: "01",
    title: "Material Selection",
    desc: "Premium tool steels (D2, SKD-11, HSS, Tungsten Carbide) selected based on application requirements for optimal hardness, toughness and wear resistance.",
  },
  {
    num: "02",
    title: "Heat Treatment",
    desc: "Vacuum heat treatment furnaces ensure precise temperature control, enhancing blade hardness (HRC 58-65) and dimensional stability.",
  },
  {
    num: "03",
    title: "Precision CNC Machining",
    desc: "20+ multi-axis CNC centers with tolerances to ±0.005mm. Advanced surface grinding achieves Ra 0.2μm finish quality.",
  },
  {
    num: "04",
    title: "Quality Control",
    desc: "Full CMM dimensional inspection, hardness testing, and metallographic analysis. Every blade verified before shipment.",
  },
];

export async function buildProcessPage(
  publicDir: string,
  logoSvg: string,
  pageNum: number
): Promise<string> {
  const processImgs = await Promise.all(
    PROCESS_IMAGES.map(async (p) => {
      const src = await imageToBase64Compressed(publicDir, p.image, 400);
      return `
      <div class="process-img-card">
        ${src ? `<img src="${src}" alt="${p.label}" />` : ""}
        <div class="process-img-label">${p.label}</div>
      </div>`;
    })
  );

  const processImgsHtml = processImgs.join("");

  const flowHtml = PROCESS_FLOW.map(
    (step, i) =>
      `<span class="process-step">${step}</span>${i < PROCESS_FLOW.length - 1 ? '<span class="process-arrow">›</span>' : ""}`
  ).join("");

  const detailsHtml = PROCESS_DETAILS.map(
    (d) => `
    <div class="process-detail-item">
      <span class="process-detail-num">${d.num}</span>
      <div class="process-detail-text">
        <div class="process-detail-title">${d.title}</div>
        <div class="process-detail-desc">${d.desc}</div>
      </div>
    </div>`
  ).join("");

  return `
  <div class="process-page page">
    ${pageHeader(logoSvg)}

    <div class="process-content">
      <div class="process-header-row">
        <div>
          <h2 class="process-title">Manufacturing Process</h2>
          <p class="process-subtitle">Strict Quality Control at Every Stage</p>
        </div>
      </div>

      <p class="process-intro">
        Best material selection + advanced heat treatment + precision CNC machining
        + rigorous quality management = the best industrial blades.
      </p>

      <div class="process-flow">${flowHtml}</div>

      <div class="process-grid">${processImgsHtml}</div>

      <div class="process-details-row">${detailsHtml}</div>
    </div>

    ${pageFooter(pageNum)}
  </div>`;
}
