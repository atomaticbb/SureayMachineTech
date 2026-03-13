# Sureay Machinery B2B Website — Consolidated Audit & Action Plan

> **Scope:** Homepage · Product List · Product Detail · Industry Pages · About · Contact
> **Sources:** Multi-dimensional code/SEO/UX audit · B2B buyer journey analysis · Product detail deep-dive
> **Date:** 2026-03-13
> **Priority Levels:** 🔴 P0 Critical · 🟠 P1 High · 🟡 P2 Medium · 🟢 P3 Low / Enhancement

---

## Executive Summary

The site has a strong visual identity (Swiss Brutalist / Industrial), solid zone composition, and meaningful structured data. The core architecture is sound. However, there are **6 P0 issues** that actively block SEO, conversion, or trust — including built-but-never-mounted components, a critical CTA routing bug, and fake structured data. Several P1 and P2 items will meaningfully improve buyer confidence and search rankings once the P0 blockers are cleared.

---

## 🔴 P0 — Critical (Fix Before Next Deploy)

### P0-1 · Product Page CTA Routes to `/contact` Instead of `#rfq`

**Files:** `client/src/components/product-detail/BladeHero.tsx` · `MobileStickyCTA.tsx`
**Dimension:** Conversion — **Highest Impact Issue on the Site**

Both the hero CTA ("Request Quote") and the mobile sticky CTA link to `/contact`, navigating the buyer entirely off the product page. The `ContactRFQ` section already exists at the bottom of every product detail page with the `id="rfq"` anchor — but neither CTA points to it.

The effect: every buyer who clicks "Request Quote" on a product page is sent to a generic contact form, losing all product context, and must scroll back or use the browser back button to return.

**Fix:**
```tsx
// BladeHero.tsx and MobileStickyCTA.tsx
// Before
href="/contact"
// After
href="#rfq"
```

---

### P0-2 · `TrustBar` and `TrustProtocol` Components Built but Never Mounted

**Files:** `client/src/components/product-detail/TrustBar.tsx` · `TrustProtocol.tsx` · `ProductDetail.tsx`
**Dimension:** B2B Trust · Conversion

Two fully-implemented trust components — including a "2-Year Global Warranty" signal and protocol breakdown — exist in the codebase but are never imported or rendered in `ProductDetail.tsx`. The warranty claim is completely invisible to every buyer on every product page.

**Fix:** Import and mount both in `ProductDetail.tsx`. Recommended position: `TrustBar` directly below `BladeHero` (above the fold on most screens); `TrustProtocol` between `TechnicalAudit` and `ContactRFQ`.

---

### P0-3 · `blade.features[]` Array Never Rendered on Product Detail Pages

**Files:** `client/src/data/blades.ts` · `ProductDetail.tsx`
**Dimension:** B2B Conversion · SEO

Every `Blade` object carries a `features` array with detailed selling-point copy (typically 3–4 bullets). This data is populated but zero rendering code reads it anywhere in the product detail zone chain. The content is invisible to buyers and not indexed by search engines.

**Fix:** Render `blade.features` as a bulleted list in `ProductOverview` or as a dedicated "Key Advantages" zone between `DecisiveSpecs` and `ComprehensiveData`.

---

### P0-4 · Hardcoded Fake Aggregate Rating in Product Schema

**File:** `client/src/pages/ProductDetail.tsx`
**Dimension:** SEO · B2B Trust

All product pages share a hardcoded `aggregateRating: { ratingValue: 4.9, reviewCount: 47 }` in the JSON-LD Product schema. This data is not sourced from real reviews.

**Risk:** Google can and does manually penalise sites for fake review markup. Losing rich result eligibility affects every product page's CTR in search.

**Fix:** Remove `aggregateRating` from the schema entirely until verified third-party reviews are integrated. A missing rating is better than a fabricated one.

---

### P0-5 · New Product `three-knife-trimmer-blades` Missing from `seo-config.ts`

**File:** `client/src/utils/seo-config.ts`
**Dimension:** SEO

`three-knife-trimmer-blades` has no entry in `SEO_CONFIG`. `getSEO("three-knife-trimmer-blades")` silently falls back to a generic title/description. The product page is actively crawlable (it's in `sitemap.xml`) but serves duplicate/generic meta to search engines.

**Fix:** Add a dedicated entry to `SEO_CONFIG`:

```typescript
"three-knife-trimmer-blades": {
  title: "HSS/TC Three-Knife Trimmer Blades for Müller Martini, Heidelberg & Kolbus",
  description:
    "OEM-fit replacement knife sets (1 Front + 2 Side) for Müller Martini 301/361/3675 Orbit, Heidelberg, and Kolbus trimmers. Available in HSS (Duritan) and Tungsten Carbide (TC/Widia). Custom dimensions on request.",
  keywords:
    "three knife trimmer blades, Müller Martini replacement knives, bookbinding trimmer knives, HSS trimmer blades, TC trimmer blades, Heidelberg trimmer knife, Kolbus trimmer blade set",
  ogImage: "/images/products/paper-cutting-blades/muller-martini-trimmer-blades-00.webp",
},
```

---

### P0-6 · Duplicate Component Filenames Create Silent Import Risk

**Files:** `sections/ProductHero.tsx` vs `product-detail/ProductHero.tsx`; `ui/ZLayoutFeature.tsx` vs `sections/ZLayoutFeature.tsx`
**Dimension:** Code Maintainability

Two unrelated components share the same filename. An incorrect auto-import silently renders the wrong component — especially dangerous in a Vite/TypeScript project where both may resolve without a type error.

**Fix:** Rename to unambiguous names — e.g., `sections/SectionProductHero.tsx` and `ui/ZLayoutCard.tsx`. Update all imports accordingly.

---

## 🟠 P1 — High Priority

### P1-1 · `MobileStickyCTA` Violates the Site Design System

**File:** `client/src/components/product-detail/MobileStickyCTA.tsx`
**Dimension:** UI · Brand Consistency

The mobile sticky CTA uses `#FF6600` orange and `rounded-lg` — neither exists anywhere else in the site's design language. The design system specifies `#001f4d` (navy) primary, `#e8b84b` gold accent, and `rounded-none` for all interactive elements. This component looks like it belongs to a different product.

**Fix:** Replace `#FF6600` with `#001f4d` or `#e8b84b`. Replace `rounded-lg` with `rounded-none`. Align button style with `ContactRFQ`'s primary CTA button.

---

### P1-2 · Homepage Hero Communicates Brand, Not Value

**File:** `client/src/components/home/HomeHero.tsx`
**Dimension:** B2B Conversion · UI Design

The current hero contains only a headline and two CTAs. There is no sub-headline describing *what the buyer gets*, no trust signal above the fold, and no differentiation from any other manufacturer.

B2B buyers need to answer three questions in 3 seconds: (1) What do you make? (2) Can you do OEM/custom? (3) Why you and not a competitor? The headline answers #1 but not #2 or #3.

**Additionally:** Fixed height `h-[515px]` can clip on tall mobile landscape viewports, and there is no overlay gradient — the text can become unreadable on lighter hero images.

**Fix:**
- Sub-headline: *"ISO 9001:2015 OEM manufacturer · 15+ years · Shipped to 50+ countries"*
- Trust line below CTAs: *"15-day sample lead time · Custom OEM accepted · MOQ from 1 set"*
- Overlay: `bg-gradient-to-r from-black/60 to-transparent`

---

### P1-3 · Homepage `ManufacturingBlocks` Is Placed Before Products

**File:** `client/src/components/home/ManufacturingBlocks.tsx` (used in `Home.tsx`)
**Dimension:** B2B UX · Conversion

Three large Z-layout blocks (5-Axis CNC, CMM Tolerance, Extreme Applications) appear before the industry/product navigation. These blocks answer "how good are you" — but buyers arriving from search need "what can you make for me" first.

**Current scroll path:** Hero → Product carousel → 3 screens of manufacturing detail → Industry tabs
**Required scroll path:** Hero (with value prop) → Industry quick-entry → Products → Trust → RFQ

A B2B buyer's median homepage dwell time is under 10 seconds. This structure buries the product/industry selector 3 full screens down.

**Fix:** Move `ManufacturingBlocks` to the About page or the product detail `TechnicalAudit` zone. On the homepage, replace it with a 3-column industry quick-entry (Recycling / Paper / Metal icon cards).

---

### P1-4 · `BladeHero` Spec Panel Filters to Only 2 Spec Types

**File:** `client/src/components/product-detail/BladeHero.tsx`
**Dimension:** B2B Conversion

The right-column spec panel filters specs to show only `label === "Material"` or `label === "Applications"`. For some products this renders only 1–2 lines. All other specs (tolerance, hardness, compatible brands) are buried below the fold in `DecisiveSpecs`.

B2B buyers scan specs first — they bounce before scrolling if nothing technical is visible in the hero.

**Fix:** Show all specs (up to 5) without filtering, or add a `heroSpecLabels?: string[]` field to the `Blade` interface for per-product control.

---

### P1-5 · `decoding="sync"` on Hero Image Blocks Main Thread

**File:** `client/src/components/home/HomeHero.tsx`
**Dimension:** Performance

`decoding="sync"` forces the browser to decode the LCP image on the main thread before painting. The image should have `fetchpriority="high"` (to prioritise the network fetch) but `decoding="async"` (to not block the main thread during decode).

**Fix:**
```tsx
// Before
decoding="sync"
// After
decoding="async"
```

---

### P1-6 · No Trust Strip on Product List Page

**File:** `client/src/pages/ProductListPage.tsx`
**Dimension:** B2B Trust · Conversion

The product list page goes directly from the hero to the filter sidebar. International buyers landing on `/products` from Google have no trust anchor before they start evaluating products — no ISO badge, year of establishment, country count, or OEM signal.

**Fix:** Add a slim 3-column stat strip below the hero: *"Est. 2008 · ISO 9001:2015 · 50+ Export Markets"*. Reuse the same stat strip component from `About.tsx`. Under 20 lines of JSX.

---

### P1-7 · Homepage `NewsGrid` Disrupts the Buyer Funnel

**File:** `client/src/components/home/NewsGrid.tsx` (used in `Home.tsx`)
**Dimension:** B2B Conversion

The news section takes a full viewport screen (3 article cards) and is positioned between the industry tabs and the contact section. A buyer from "shredder blade supplier" search who has not found their product is confronted with technical articles — the conversion funnel breaks at this point.

News content has SEO value but zero conversion value at mid-page. It should appear after the RFQ section, or be reduced to a slim 1-row link list with lower visual weight.

**Fix:** Move `NewsGrid` to below `ContactRFQ` (last section on homepage), or reduce to a "Latest Updates" slim bar with 3 text links.

---

### P1-8 · Industry Pages Not Verified to Include `three-knife-trimmer-blades`

**Files:** `client/src/pages/paper-industry.tsx` · `IndustryToolingMatrix`
**Dimension:** Code · SEO

`paper-industry.tsx` should show products where `sector === "paper" || sector === "converting"`. However, `IndustryToolingMatrix` likely has hardcoded product references rather than dynamically consuming the filter result — the new product may not appear even though the sector matches.

**Action:** Audit `IndustryToolingMatrix` and add `three-knife-trimmer-blades` if it uses hardcoded IDs.

---

### P1-9 · Contact Page Email Address Exposed in Plain Text

**File:** `client/src/pages/Contact.tsx`
**Dimension:** Security

`lynn@sureay.com` is rendered as plain text in the HTML. Scrapers harvest this within hours of first indexing.

**Fix:** Obfuscate with CSS direction trick, render the address via JS after mount, or replace the static text with a `mailto:` link excluded from the initial HTML payload.

---

## 🟡 P2 — Medium Priority

### P2-1 · Product Detail Zone Order Puts `ComprehensiveData` Too Far Down

**File:** `client/src/pages/ProductDetail.tsx`
**Dimension:** B2B UX · Conversion

Current zone order: Hero → DecisiveSpecs → **ProductOverview (prose)** → ComprehensiveData → TechnicalAudit → OemPipeline → Related → ContactRFQ

The standard dimensions table (`ComprehensiveData`) should come immediately after `DecisiveSpecs` — both are data-scanning actions. The prose `ProductOverview` can follow after the buyer has confirmed spec fit.

**Recommended order:**
```
Zone 1: BladeHero
Zone 2: DecisiveSpecs        ← specs summary
Zone 3: ComprehensiveData    ← dimensions table (moved up)
Zone 4: ProductOverview      ← prose + features[]
Zone 5: TechnicalAudit
Zone 6: CompatibleTooling
Zone 7: ContactRFQ
```

---

### P2-2 · `IndustryOemPipeline` Repeats Verbatim on Every Product Page

**Files:** `ProductDetail.tsx` · `ProductListPage.tsx` · three industry pages · `About.tsx`
**Dimension:** B2B Trust · Code

The "4-Phase OEM Protocol" component appears 8+ times across the site with identical content. A buyer who browses 3 product pages sees the exact same block 3 times. This makes the site feel template-generated and damages professional credibility.

**Fix:**
- Keep on: Industry pages (3) + About page — these are discovery contexts
- Remove from: All 8 product detail pages + product list page
- On product detail pages, replace with 2 lines of inline text inside `ContactRFQ`: *"After inquiry, we follow a 4-phase OEM protocol — drawing review, sample, approval, production."*

---

### P2-3 · `ProductOverview` Fixed TCO Paragraph Is Identical on Every Product

**File:** `client/src/components/product-detail/ProductOverview.tsx`
**Dimension:** SEO · B2B Content

The TCO paragraph ("Total cost of ownership is the measure that matters…") and the four `TRUST_POINTS` (ISO 9001 / Heat Treatment / ±0.05mm / Global Delivery) are hardcoded and render identically on every product page. This creates duplicate content across all 8+ product URLs and provides no product-specific value to the buyer.

**Fix:**
- Delete the hardcoded TCO paragraph entirely
- Move `TRUST_POINTS` into `BladeHero`'s trust strip (already has the right visual position)
- `ProductOverview` should render only `blade.description` + `blade.fullDescription` + `blade.features` — all product-specific content

---

### P2-4 · `ContactRFQ` Has No Product Context Pre-Fill

**File:** `client/src/components/product-detail/ContactRFQ.tsx`
**Dimension:** B2B Conversion

When a buyer submits the RFQ form at the bottom of a product page, the form does not pre-populate the product name or ID. The sales team receives a generic inquiry with no product reference unless the buyer manually types it.

**Fix:** Pass `blade.name` or `blade.id` as a prop and inject it as a hidden field or pre-filled "Product of Interest" field in the form. This requires a one-line change in `ProductDetail.tsx` and a prop addition in `ContactRFQ`.

---

### P2-5 · No Visible Breadcrumbs on Product Detail Pages

**File:** `client/src/components/common/Breadcrumbs.tsx` (exists but not rendered on product detail)
**Dimension:** SEO · UX

`Breadcrumbs.tsx` exists and `SEO.tsx` emits `BreadcrumbList` JSON-LD. However, the visible breadcrumb trail is not rendered on product detail pages. Google uses the visible trail to validate the structured data — if they do not match, the JSON-LD may be disregarded.

**Fix:** Import and render `<Breadcrumbs>` in `ProductDetail.tsx` above `BladeHero`.

---

### P2-6 · Industry Pages Lack a Fast Path to Product Detail

**Files:** All three industry page components
**Dimension:** B2B UX · Conversion

Buyers who land on an industry page from Google search (e.g. "plastic shredder blade manufacturer") and want to jump directly to a product must scroll the entire page to find `IndustryToolingMatrix`. There is no above-fold product sidebar or sticky quick-link panel.

**Fix:** Add a 3–5 item product shortcut list at the top of each industry page hero, or add a sticky "Jump to Products" anchor link in the hero area.

---

### P2-7 · Industry Page H1s Are Not Keyword-Differentiated

**Files:** All three industry pages
**Dimension:** SEO

Current H1s are generic ("Metal Processing Tooling & Coil Slitting Equipment"). High-converting B2B search queries carry manufacturer/supplier signals that are missing.

**Fix:**
- *"Industrial Metal Slitting & Shear Blade Manufacturer"*
- *"Paper & Bookbinding Knife Manufacturer — HSS & TC"*
- *"Plastic Recycling Shredder & Granulator Blade Supplier"*

---

### P2-8 · About Page Certification Claims Lack Verification Links

**File:** `client/src/pages/About.tsx`
**Dimension:** B2B Trust

The certification grid (ISO 9001:2015, CE, SGS, RoHS) shows badges that link to nothing. Enterprise OEM procurement managers from Europe and North America require downloadable PDF certificates or at minimum a "Certificate available on request" CTA.

**Fix:** Link each badge to `/docs/iso-cert.pdf` or a "Request Certificate" modal.

---

### P2-9 · No WhatsApp Click-to-Chat on Product Pages

**File:** `client/src/components/product-detail/MobileStickyCTA.tsx` et al
**Dimension:** B2B Conversion

The contact page exposes WhatsApp (`+86 156-5553-0829`) but individual product and industry pages have no direct click-to-chat shortcut. For an Asian OEM supplier targeting international buyers, in-page WhatsApp access directly reduces friction-to-inquiry.

**Fix:** Add a WhatsApp floating button (`wa.me/+8615655530829`) at the product detail and industry page level. A fixed bottom-right icon takes ~10 lines of JSX.

---

### P2-10 · About Page `CountUp` Statistics Have No Source Attribution

**File:** `client/src/pages/About.tsx`
**Dimension:** B2B Trust

The animated stats (15+ years, 10,000+ designs, 98% retention, 50+ countries) have no footnote or basis. European and North American procurement managers are increasingly skeptical of unsourced statistics.

**Fix:** Add a micro-footnote below the stat grid: *"Based on 2024 internal records"* or *"Based on 2024 customer survey (n=120)"*.

---

### P2-11 · Product List Page Has No Result Count or Sort

**File:** `client/src/pages/ProductListPage.tsx`
**Dimension:** UX

The grid shows products with no count indicator and no sort control. Systematic procurement managers need quantitative feedback.

**Fix:** Add `{filteredBlades.length} products found` counter above the grid. Add a `<select>` sort control (Featured / A–Z).

---

### P2-12 · Admin Page Bundle Not Audited for Code-Split Correctness

**File:** `client/src/pages/Admin.tsx`
**Dimension:** Performance

At 40 KB source, `Admin.tsx` is the largest page file. It is wrapped in `React.lazy` via `ProtectedRoute`, which should code-split it correctly. Confirm the lazy boundary is working and consider splitting heavy data-table sub-components.

---

## 🟢 P3 — Low Priority / Enhancement

### P3-1 · `AuthorityCarousel` Subtitle Is an Unsupported Self-Claim

**File:** `client/src/components/home/AuthorityCarousel.tsx`
**Dimension:** B2B Trust · Conversion

> "The definitive OEM source for precision blades and cutting solutions."

This is a pure marketing assertion with no data. B2B buyers are immune to this language and skip it.

**Fix:** Replace with concrete stats: *"9 product families · 50+ countries · 15-day sample lead time"*

---

### P3-2 · ProductCard "View Details" CTA Text Is Generic

**File:** `client/src/components/product/ProductCard.tsx`
**Dimension:** B2B UX

"View Details →" is standard filler copy. It sets no expectation about what the buyer will find.

**Fix:** Change to "View Specs & Request Quote →" to prime the buyer for the product detail page purpose.

---

### P3-3 · No `hreflang` Tags

**File:** `client/src/components/common/SEO.tsx`
**Dimension:** SEO

If a Chinese-language version is planned, `hreflang="zh-CN"` / `hreflang="en"` should be added now. Even without a Chinese version, a self-referencing `hreflang="en"` is best practice.

---

### P3-4 · `meta keywords` Tags Emitted on All Pages

**File:** `client/src/utils/seo-config.ts`
**Dimension:** SEO

Google has ignored `<meta name="keywords">` since 2009. It adds payload with no ranking benefit. Remove to reduce HTML size.

---

### P3-5 · Product Card Descriptions Truncated Without Visual Indicator

**File:** `client/src/components/product/ProductCard.tsx`
**Dimension:** UI

Descriptions are clamped with no ellipsis or "…more" affordance visible to the user. The shadcn `Tooltip` already used in the project can surface the full text on hover.

---

### P3-6 · Footer and Navbar Not Audited for All Industry Page Links

**Files:** `Footer.tsx` · `Navbar.tsx` / `MegaMenu.tsx`
**Dimension:** UX · SEO (Internal Linking)

Verify all three industry pages appear in both mega menu and footer navigation. Missing internal links reduce PageRank flow to these pages.

---

### P3-7 · `robots.txt` Not Confirmed

**Dimension:** SEO · Security

Confirm `client/public/robots.txt` exists and disallows `/admin`, `/api`, and `/admin-login`. Verify Vercel rewrites do not expose the admin route to indexing.

---

## Summary Table

| ID | Priority | Area | Effort | Impact |
|---|---|---|---|---|
| P0-1 | 🔴 Critical | Conversion | Low | Very High |
| P0-2 | 🔴 Critical | Trust · Conversion | Low | Very High |
| P0-3 | 🔴 Critical | SEO · Content | Low | High |
| P0-4 | 🔴 Critical | SEO · Trust | Low | Very High |
| P0-5 | 🔴 Critical | SEO | Low | High |
| P0-6 | 🔴 Critical | Code | Medium | Medium |
| P1-1 | 🟠 High | UI · Brand | Low | High |
| P1-2 | 🟠 High | Conversion · UI | Medium | Very High |
| P1-3 | 🟠 High | B2B UX · Conversion | Medium | Very High |
| P1-4 | 🟠 High | Conversion · UI | Low | High |
| P1-5 | 🟠 High | Performance | Low | Medium |
| P1-6 | 🟠 High | B2B Trust | Low | High |
| P1-7 | 🟠 High | Conversion | Low | High |
| P1-8 | 🟠 High | Code · SEO | Low | Medium |
| P1-9 | 🟠 High | Security | Low | Medium |
| P2-1 | 🟡 Medium | B2B UX | Low | Medium |
| P2-2 | 🟡 Medium | B2B Trust · Code | Low | Medium |
| P2-3 | 🟡 Medium | SEO · Content | Low | Medium |
| P2-4 | 🟡 Medium | Conversion | Low | Medium |
| P2-5 | 🟡 Medium | SEO · UX | Low | Medium |
| P2-6 | 🟡 Medium | B2B UX | Medium | Medium |
| P2-7 | 🟡 Medium | SEO | Low | Medium |
| P2-8 | 🟡 Medium | B2B Trust | Medium | High |
| P2-9 | 🟡 Medium | Conversion | Low | High |
| P2-10 | 🟡 Medium | B2B Trust | Low | Low |
| P2-11 | 🟡 Medium | UX | Low | Low |
| P2-12 | 🟡 Medium | Performance | Low | Low |
| P3-1 | 🟢 Low | B2B Trust | Low | Low |
| P3-2 | 🟢 Low | UX | Low | Low |
| P3-3 | 🟢 Low | SEO | Low | Low |
| P3-4 | 🟢 Low | SEO | Low | Low |
| P3-5 | 🟢 Low | UI | Low | Low |
| P3-6 | 🟢 Low | UX · SEO | Low | Medium |
| P3-7 | 🟢 Low | SEO · Security | Low | Medium |

---

## Recommended Action Order

### Sprint 1 — Fix Before Any Marketing Push

1. **P0-1** — Fix CTA `href="/contact"` → `href="#rfq"` in `BladeHero` + `MobileStickyCTA`
2. **P0-2** — Mount `TrustBar` and `TrustProtocol` in `ProductDetail.tsx`
3. **P0-3** — Render `blade.features[]` in `ProductOverview` or a dedicated zone
4. **P0-4** — Remove fake `aggregateRating` from Product JSON-LD schema
5. **P0-5** — Add `three-knife-trimmer-blades` entry to `seo-config.ts`
6. **P1-5** — Fix `decoding="sync"` → `decoding="async"` on hero image
7. **P1-9** — Obfuscate `lynn@sureay.com` on Contact page

### Sprint 2 — Conversion and Trust Improvements

8. **P1-1** — Fix `MobileStickyCTA` colors and border-radius to match design system
9. **P1-2** — Upgrade `HomeHero` with value sub-headline + trust line + overlay gradient
10. **P1-3** — Restructure homepage: move `ManufacturingBlocks` to About, add industry quick-entry above carousel
11. **P1-4** — Remove `BladeHero` spec filter, show all specs (up to 5)
12. **P1-6** — Add trust stat strip to Product List page
13. **P1-7** — Move `NewsGrid` to below `ContactRFQ` on homepage
14. **P2-1** — Reorder product detail zones: move `ComprehensiveData` before `ProductOverview`
15. **P2-2** — Remove `IndustryOemPipeline` from all product detail pages
16. **P2-3** — Delete hardcoded TCO paragraph in `ProductOverview`, move `TRUST_POINTS` to `BladeHero`
17. **P2-9** — Add WhatsApp floating button to product detail and industry pages

### Sprint 3 — SEO and Content Polish

18. **P2-4** — Add product context pre-fill to `ContactRFQ`
19. **P2-5** — Add visible `<Breadcrumbs>` to `ProductDetail.tsx`
20. **P2-7** — Revise industry page H1s with manufacturer/supplier keywords
21. **P2-8** — Link certification badges to PDFs or "Request Certificate" modal
22. **P1-8** — Verify `three-knife-trimmer-blades` appears on Paper Industry page
23. **P3-1** — Replace `AuthorityCarousel` subtitle with concrete stats
24. **P3-2** — Change ProductCard CTA to "View Specs & Request Quote →"

### Backlog

- P2-6 Industry page fast-path to products
- P2-10 About page stat footnotes
- P2-11 Product list result count + sort
- P0-6 Rename duplicate component files
- P3-6 Nav/footer industry page audit
- P3-7 `robots.txt` audit
