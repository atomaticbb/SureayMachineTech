# Sureay Machinery Tech - Project Analysis & Optimization Report

## 1. Project Overview
- **Type**: B2B Industrial Manufacturing (Blades & Knives)
- **Tech Stack**: React 19, Vite, Tailwind CSS v4, Express, Prisma, SQLite.
- **Design Philosophy**: Swiss Brutalist / High-End Corporate Industrial (Navy/Gold/Mono).

## 2. Current Architecture Analysis
- **Frontend**: Clean component separation, SEO-optimized via Puppeteer prerendering.
- **Backend**: Service-oriented architecture with Prisma ORM.
- **Data**: Product data is currently hardcoded in `client/src/data/blades.ts` (Single Source of Truth).
- **Lead Capture**: Robust RFQ form with drawing upload support and rate limiting.

## 3. Operational Recommendations

### A. Lead Management & Automation
- [ ] **Instant Alerts**: Integrate Telegram/Slack Webhooks for new RFQ notifications.
- [ ] **Auto-Responder**: Automatically send a PDF Product Catalog to the user after form submission.
- [ ] **CRM Sync**: Connect the `Contact` table with HubSpot or Zoho CRM via API.

### B. SEO & Content Strategy
- [ ] **Knowledge Base**: Add a "Technical Guides" section to target long-tail keywords (e.g., "D2 steel vs M2 for recycling").
- [ ] **Multi-language (i18n)**: Implement Russian, Spanish, and German versions to capture global market share.
- [ ] **Structured Data**: Enhance JSON-LD for Products to include `PriceSpecification` (Contact for Quote) and `AggregateRating`.

### C. Technical Automation
- [ ] **Image Pipeline**: Integrate automated WebP/AVIF conversion into the build process.
- [ ] **E2E Testing**: Add Playwright tests for the RFQ form to prevent business-critical regressions.
- [ ] **Database Backups**: Automate SQLite database snapshots to secure S3 storage.

## 4. Maintenance Checklist
- [ ] Run `pnpm lint` and `pnpm format` before every major deploy.
- [ ] Check `Analytics` table monthly for user drop-off points in the product funnel.
- [ ] Update `blades.ts` whenever new OEM models are released.

---
*Report generated on 2026-03-31 by GitHub Copilot.*
