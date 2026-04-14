/**
 * scripts/catalog/templates/about.ts
 *
 * Company introduction: landscape layout with factory photo left, text right.
 */

import { COMPANY } from "../constants.ts";
import { imageToBase64Compressed } from "../utils.ts";

export async function buildAboutPage(
  publicDir: string,
  logoSvg: string,
  pageNum: number
): Promise<string> {
  const factoryImg = await imageToBase64Compressed(
    publicDir,
    "/images/about/factory-00.webp",
    900
  );

  return `
  <div class="about-page page">
    ${pageHeader(logoSvg)}

    <div class="about-layout">
      <div class="about-left">
        ${factoryImg ? `<img src="${factoryImg}" alt="Sureay Factory" />` : ""}
      </div>

      <div class="about-right">
        <h2 class="about-title">About Sureay</h2>
        <p class="about-subtitle">Professional Machine Blades Manufacturer</p>

        <div class="about-text">
          <p>
            Sureay Machinery Technology Co., Ltd. is an enterprise integrating R&amp;D, production, sales and
            cutting solutions. Founded in 2008 in Ma'anshan, Anhui Province — China's renowned "City of Blades"
            — Sureay has grown into a leading manufacturer of precision industrial blades and machine knives,
            serving customers across 50+ countries worldwide.
          </p>
          <p>
            Our 15,000 m² smart factory is equipped with 20+ multi-axis CNC machining centers, vacuum heat
            treatment furnaces, a full metallurgical laboratory, and CMM inspection stations. We specialize in
            slitter knives, shredder blades, granulator knives, log saw blades, metal processing blades, and
            precision cutting tools for the new energy sector.
          </p>
          <p>
            With ISO 9001:2015 certification and a commitment to OEM-grade quality, we provide customers with
            high-performance, cost-effective blade solutions — from material selection and heat treatment to
            precision grinding and final inspection. Every blade is manufactured to meet the most demanding
            industrial standards.
          </p>
        </div>

        <div class="about-stats">
          <div class="about-stat">
            <div class="about-stat-value">15+</div>
            <div class="about-stat-label">Years Experience</div>
          </div>
          <div class="about-stat">
            <div class="about-stat-value">10,000+</div>
            <div class="about-stat-label">Blade Designs</div>
          </div>
          <div class="about-stat">
            <div class="about-stat-value">50+</div>
            <div class="about-stat-label">Countries Served</div>
          </div>
          <div class="about-stat">
            <div class="about-stat-value">98%</div>
            <div class="about-stat-label">Client Retention</div>
          </div>
        </div>

        <div class="about-certs">
          <span class="about-cert">ISO 9001:2015</span>
          <span class="about-cert">CE Certified</span>
          <span class="about-cert">SGS Audited</span>
          <span class="about-cert">RoHS Compliant</span>
          <span class="about-cert">CMM Verified</span>
        </div>
      </div>
    </div>

    ${pageFooter(pageNum)}
  </div>`;
}

// Shared header / footer — used by all inner pages
export function pageHeader(logoSvg: string): string {
  return `
  <div class="page-header">
    <div class="page-header-logo">
      ${logoSvg}
      <span class="page-header-company">Sureay</span>
    </div>
    <span class="page-header-website">${COMPANY.website}</span>
  </div>`;
}

export function pageFooter(pageNum: number, totalPages?: number): string {
  return `
  <div class="page-footer">
    <span class="page-footer-left">${COMPANY.name}</span>
    <div class="page-footer-right">
      <span>Tel: ${COMPANY.phone}</span>
      <span>Email: ${COMPANY.email}</span>
      <span>${COMPANY.website}</span>
      <span class="page-number">Page ${String(pageNum).padStart(2, "0")}${totalPages ? "/" + String(totalPages).padStart(2, "0") : ""}</span>
    </div>
  </div>`;
}
