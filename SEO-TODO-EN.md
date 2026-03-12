# Sureay Machine Tech - SEO & Website Improvement TODO

**Created:** 2026-03-11
**Priority System:** 🔴 Critical | 🟡 Important | 🟢 Nice to Have

---

## ✅ Completed

- [x] Create robots.txt file
- [x] Add meta descriptions for all pages (seo-config.ts)
- [x] Implement Product Schema utilities (product-schema.ts)
- [x] Add new metal cutting blade products
- [x] Update sitemap.xml with new products
- [x] Update all news article IDs to descriptive names
- [x] Push all changes to GitHub
- [x] Google Search Console Setup (sitemap submitted, key pages indexed)
- [x] Analytics & Tracking (GA4 setup, GTM, conversion goals)
- [x] **Product Schema on all product detail pages** (SEO.tsx, ProductDetail.tsx)
- [x] **Organization Schema on homepage** (Home.tsx JSON-LD)
- [x] **Breadcrumb Schema on all pages** (SEO.tsx BreadcrumbList + visual Breadcrumbs on all pages)
- [x] **Meta keywords added** to all pages (SEO.tsx keywords prop + seo-config.ts)
- [x] **Thumbnail alt text fixed** in BladeHero.tsx (descriptive per blade name)
- [x] **Gzip compression enabled** on Express server (compression middleware)
- [x] **JavaScript code splitting** configured in Vite (vendor/router/ui/radix chunks)

---

## 🔴 Priority 1: Critical (Week 1)

### Google Search Console Setup
- [ ] Deploy website via Coolify
- [ ] Submit sitemap.xml to Google Search Console
  - URL: https://search.google.com/search-console/
- [ ] Request indexing for key pages:
  - [ ] Homepage (/)
  - [ ] Products page (/products)
  - [ ] All 8 product detail pages
  - [ ] All 3 industry pages
- [ ] **FIX FAVICON/ICON ISSUE** (not showing in Google search)
- [ ] Verify robots.txt is accessible at https://www.sureay.com/robots.txt
- [ ] Monitor Coverage report for indexing errors

### Analytics & Tracking
- [ ] Set up Google Analytics 4 (GA4)
  - Sign up at: https://analytics.google.com/
  - Create property for www.sureay.com
  - Add tracking code to website
- [ ] Set up Google Tag Manager (optional but recommended)
- [ ] Configure basic conversion goals in GA4

---

## 🟡 Priority 2: Important (Week 2-3)

### Structured Data Implementation
- [x] Add Product Schema to all product detail pages
  - SEO.tsx renders Product JSON-LD; all ProductDetail pages use it
- [x] Add Organization Schema to homepage
  - Added `ORGANIZATION_LD` JSON-LD block to Home.tsx
- [x] Add Breadcrumb Schema to all pages
  - SEO.tsx now emits BreadcrumbList JSON-LD when `breadcrumbs` prop provided
  - Visual `<Breadcrumbs>` component added to ProductDetail, ProductListPage, all 3 industry pages

### Content Optimization
- [x] Add alt text to ALL product images
  - BladeHero thumbnail alt fixed: `"View 1"` → `"[blade name] — view 1"`
  - All other product/factory images already had descriptive alt text
- [ ] Optimize image file names (use descriptive names)
  - **SKIP** — renaming would break existing image references across the codebase
- [x] Add missing meta keywords where relevant
  - `SEO.tsx` now supports `keywords` prop; all product & industry pages pass keywords from `seo-config.ts`
  - Homepage keywords meta tag added inline

### Technical SEO
- [ ] Test page speed with Google PageSpeed Insights
  - **ACTION REQUIRED:** Visit https://pagespeed.web.dev/ after deployment
  - Target: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [x] Implement lazy loading for images
  - Most images already use `loading="lazy"` / `loading="eager"` appropriately
- [x] Minimize JavaScript bundle size
  - Vite `manualChunks` added: vendor / router / ui / radix split
- [x] Enable gzip/brotli compression on server
  - `compression` middleware added as first middleware in Express server

### Internal Linking
- [x] Create internal linking strategy
  - `relatedBladeIds` in blades.ts maps cross-links per product
- [x] Link related products to each other
  - `CompatibleTooling` zone renders related blade cards on every product page
- [ ] Link from news articles to product pages
  - **TODO:** Review news article content and add product page links inline
- [x] Add "Related Products" section
  - `CompatibleTooling` component serves as "Related Products" (Zone 6 on product pages)
- [x] Create hub pages (category pages with links to products)
  - `/plastic-industry`, `/metal-industry`, `/paper-industry` all list+link products
- [x] Use descriptive anchor text
  - Product links use blade names in anchor text throughout

---

## 🟢 Priority 3: Growth (Week 4+)

### Content Expansion
- [ ] Create case studies page
  - Showcase real customer applications
  - Include before/after data
- [ ] Add technical specifications guide
  - Blade selection matrix
  - Material comparison chart
- [ ] Create industry glossary
  - Define technical terms
  - Internal links to products
- [ ] Start technical blog
  - Publish 1-2 articles per month
  - Topics: blade maintenance, material selection, troubleshooting

### Backlink Building
- [ ] Submit to B2B directories
  - [ ] ThomasNet (https://www.thomasnet.com/)
  - [ ] Alibaba (https://www.alibaba.com/)
  - [ ] Made-in-China (https://www.made-in-china.com/)
  - [ ] Global Sources
- [ ] Join industry associations
  - [ ] Research relevant manufacturing associations
- [ ] Create guest blog content
  - Identify industry publications
  - Pitch technical articles
- [ ] Request customer testimonials with backlinks

### Local SEO
- [ ] Create/claim Google Business Profile
  - Add business info, photos, location
- [ ] Ensure NAP consistency (Name, Address, Phone)
- [ ] List in Chinese business directories
- [ ] Create location-specific page (Ma'anshan, China)

### E-E-A-T Signals (Trust & Authority)
- [ ] Add certifications page
  - Showcase ISO 9001:2015
  - Display quality certifications
- [ ] Create team/engineers page
  - Show expertise and experience
  - Add professional headshots
- [ ] Improve contact information visibility
  - Add to header/footer
  - Create dedicated contact section
- [ ] Add customer logos/testimonials section
- [ ] Display security badges (HTTPS, certifications)

---

## 🎥 Multimedia Content

### Video Marketing
- [ ] Create product demo videos
  - Blade manufacturing process
  - Quality inspection process
  - Installation/maintenance guides
- [ ] Upload to YouTube
  - Optimize video titles and descriptions
  - Add captions/subtitles
  - Link back to website
- [ ] Embed videos on product pages

### Visual Content
- [ ] Create infographics
  - Blade selection flowchart
  - Manufacturing process
  - Quality standards
- [ ] Add before/after comparison images
- [ ] Create downloadable PDF guides

---

## 🔍 Ongoing Monitoring & Optimization

### Weekly Tasks
- [ ] Check Google Search Console for errors
- [ ] Monitor keyword rankings
- [ ] Review Google Analytics traffic data
- [ ] Check for broken links

### Monthly Tasks
- [ ] Review and update meta descriptions
- [ ] Add new news/blog articles
- [ ] Build 2-3 quality backlinks
- [ ] Analyze competitor SEO strategies
- [ ] Review Core Web Vitals performance

### Quarterly Tasks
- [ ] Audit and update existing content
- [ ] Review and refresh old news articles
- [ ] Conduct keyword research for new opportunities
- [ ] Test and optimize conversion rates

---

## 📊 Tools & Resources

### Free Tools
- Google Search Console: https://search.google.com/search-console/
- Google Analytics 4: https://analytics.google.com/
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Google Rich Results Test: https://search.google.com/test/rich-results
- Bing Webmaster Tools: https://www.bing.com/webmasters/
- Favicon Generator: https://realfavicongenerator.net/

### Paid Tools (Optional)
- Ahrefs: Backlink analysis & keyword research
- SEMrush: Comprehensive SEO toolkit
- Screaming Frog: Technical SEO audits

---

## 🎯 Success Metrics

### 3-Month Goals
- [ ] 100+ pages indexed in Google
- [ ] Top 10 ranking for 5+ target keywords
- [ ] 50+ backlinks from quality sources
- [ ] 1000+ organic visitors per month

### 6-Month Goals
- [ ] Top 5 ranking for primary keywords
- [ ] 100+ backlinks
- [ ] 3000+ organic visitors per month
- [ ] 10+ qualified leads per month from organic search

### 12-Month Goals
- [ ] #1 ranking for "precision industrial blades manufacturer"
- [ ] 200+ quality backlinks
- [ ] 10,000+ organic visitors per month
- [ ] 50+ qualified leads per month

---

## 📝 Notes

- **SEO is a marathon, not a sprint** - Results typically take 3-6 months
- **Focus on quality over quantity** - Better to have 10 quality backlinks than 100 low-quality ones
- **Create content for users first, search engines second**
- **Monitor and adapt** - SEO best practices evolve, stay updated

---

**Last Updated:** 2026-03-12
**Next Review Date:** 2026-04-11
