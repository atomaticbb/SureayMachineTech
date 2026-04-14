/**
 * scripts/catalog/templates/back-cover.ts
 *
 * Back cover page: company contact info, certifications, CTA.
 */

import { COMPANY } from "../constants.ts";

export function buildBackCover(logoSvg: string): string {
  return `
  <div class="back-cover">
    <div class="cover-bg-pattern"></div>
    <div class="back-logo">${logoSvg}</div>
    <div class="back-company">${COMPANY.name}</div>
    <div class="back-tagline">${COMPANY.tagline}</div>
    <div class="back-gold-rule"></div>
    <div class="back-cta">Request a Quotation</div>

    <div class="back-contact-grid">
      <div class="back-contact-item">
        <span class="back-contact-label">Phone / WhatsApp</span>
        <span class="back-contact-value">${COMPANY.phone}</span>
      </div>
      <div class="back-contact-item">
        <span class="back-contact-label">Email</span>
        <span class="back-contact-value">${COMPANY.email}</span>
      </div>
      <div class="back-contact-item">
        <span class="back-contact-label">Website</span>
        <span class="back-contact-value">${COMPANY.website}</span>
      </div>
      <div class="back-contact-item">
        <span class="back-contact-label">LinkedIn</span>
        <span class="back-contact-value">linkedin.com/company/sureay</span>
      </div>
    </div>

    <div class="back-address">${COMPANY.address}</div>

    <div class="back-certifications">
      <span class="back-cert-badge">ISO 9001:2015</span>
      <span class="back-cert-badge">CE Certified</span>
      <span class="back-cert-badge">SGS Audited</span>
      <span class="back-cert-badge">RoHS Compliant</span>
    </div>

    <div class="back-website-url">${COMPANY.website}</div>
  </div>`;
}
