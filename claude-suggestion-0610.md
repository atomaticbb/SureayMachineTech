I've gone through both files in detail — the GSC export (queries, pages, countries, devices) and the GA4 summary. Here's the honest picture: in the past 28 days sureay.com got **~2,880 impressions, only 18 clicks (0.6% CTR), average position ~29.6**. The site is being *seen* by Google for the right keywords, but it's losing on two fronts: positions stuck on pages 3–8 for the big clusters, and near-zero CTR even where you rank well. The data also exposed several technical bugs. Here's everything, ranked by priority.

---

## 🔴 Priority 0 — Bugs & technical fixes (do this week, costs almost nothing)

**1. Duplicate brand suffix in titles: "| Sureay | Sureay Blades"**
GA4 shows dozens of titles like *"Tissue Log Saw Blades | D2 Ø610–1000mm | Sureay | Sureay Blades"*. The doubled suffix wastes ~15 characters of title space, looks broken in SERPs, and hurts CTR. Fix the template so brand appears once.

**2. Untranslated i18n key rendering as a live page title**
GA4 logged a page titled `industry.plastic.seo.title | Sureay Blades`. A translation key is leaking into production — Google may be indexing that as your literal title. Audit all locales for missing keys.

**3. www vs non-www split**
GSC shows both `https://sureay.com/products/tissue-log-saw-blades` AND `https://www.sureay.com/products/tissue-log-saw-blades` earning impressions separately. You're splitting ranking signals. Set a 301 from www → non-www and verify every canonical tag points to the non-www version.

**4. Keyword cannibalization on wood chipper blades — you have at least 4 competing pages**
`/products/wood-chipper-blades`, `/products/wood-chipper-blades-industrial`, `/products/wood-chipper-blades-standard`, plus `/categories/wood-chipper-blades`. GA4 confirms multiple near-identical titles. Google can't pick a winner, so all rank mid-pack (pos 8.7–30.7). Consolidate: one strong pillar page, 301 or clearly differentiate the others (e.g., by machine type, not by vague "industrial/standard").

**5. "Shredder Blades Direct" duplicate-brand pages**
Titles like *"Shredder Blades Direct | Industrial Shredder Knives Supplier"* and *"Factory-Direct Shredder Blades | Shredder Blades Direct"* exist alongside your main shredder pages. This reads to Google as doorway/duplicate content and dilutes the Sureay brand entity. Pick one brand, consolidate or noindex the rest.

**6. Admin pages are public and tracked**
*"Admin Login"* and *"Admin Dashboard"* appear in GA4. Add `noindex` + block in robots.txt, and filter internal IPs in GA4 — 51 of your 90 "users" came via direct, much of which is likely your own team, which is also probably why "sureay" shows **89 impressions at position 1.25 with 0 clicks** (you checking rankings without clicking).

---

## 🟠 Priority 1 — CTR rescue on pages already ranking (fastest ranking gains)

This is your weirdest and most valuable finding: **pages in positions 2–8 are getting zero clicks.**

| Page | Position | Impressions | Clicks |
|---|---|---|---|
| /products/multi-shaft-blades-metal | **2.7** | 157 | **0** |
| /products (index) | 8.0 | 218 | 0 |
| /about | 5.2 | 95 | 0 |
| Homepage | 3.3 | 116 | 1 |
| /categories/shredder-blades | 11.6 | 116 | 0 |

Position 2.7 with 157 impressions and zero clicks should be earning 10–20 clicks. Actions:

- **Rewrite titles/metas on these five pages first.** Lead with the buyer's problem and a differentiator (tolerance, OEM fit, lead time), not just the product name. E.g., *"Multi-Shaft Shredder Blades for Metal — OEM-Fit, ±0.02mm, Ships Worldwide"*.
- **Add Product + FAQPage schema** to product pages and Organization schema sitewide. Your GSC "search appearance" tab shows "product snippets" already drive 658 of your impressions at only 0.76% CTR — richer snippets (price range, ratings, FAQ dropdowns) directly lift CTR here.
- Check what queries multi-shaft-blades-metal actually ranks #2–3 for (GSC page filter) — if it's low-intent queries, that explains the zero clicks and tells you what content to add.

---

## 🟡 Priority 2 — Striking-distance keywords (positions 8–20 → top 5)

These already have momentum; on-page improvements + internal links can move them within 4–8 weeks:

- **twin shaft shredder blades** — page at pos 7.7, 135 imp. Add OEM model compatibility lists, spec tables, internal links from your shredder-arrangement energy article.
- **tissue log saw blades** — pos 11.9 (and the query itself at 19.3). You already have the chipping-causes article; add 2–3 more supporting posts and interlink hard. This is your highest-converting niche.
- **wood chipper anvils** — pos 12.4, 117 imp, plus question queries like *"what does the anvil do for a wood chipper"* (pos 25). Add an FAQ section answering that exact question on the product page.
- **chipper knife angles** — pos 10.4. Your sharpening guide ranks; expand it with a bevel-angle reference table to grab the featured snippet.
- **nonwoven slitting blades** (pos 14.1), **corrugator scoring heads** (pos 13.5), **pelletizer rotor** (pos 20.3), **oem cutting blades single shaft shredder** (pos 12.9) — same playbook: deepen the page, add schema, point 3–5 internal links at each with exact-match anchor text.

---

## 🟡 Priority 3 — The big keyword clusters stuck on pages 4–8 (your largest traffic ceiling)

**Slitter knives cluster — your #1 opportunity by volume.** "rotary slitter blades" (140 imp, pos 42), "rotary slitter knives" (109, pos 40), "carbide slitter knives" (101, pos 80), plus ~15 variants totaling 500+ impressions, all ranking pages 4–9. Three problems:

1. Your category hub `/categories/slitter-knives` has **286 impressions at position 69.6** — your most-seen page is your worst-ranking one. Rebuild it as a real pillar: comparison table of all slitter types, material selection guidance, links to every product page. Right now it's likely a thin product grid.
2. **No carbide slitter knives page exists** — 101 impressions ranking at position 80 against a generic page. Create a dedicated page (TCT material specs, vs HSS/D2 comparison, regrind intervals). Queries like "tungsten carbide slitter blades" confirm demand.
3. Ambiguity between `/products/rotary-slitter-knives` and `/products/rotary-slitter-knives-paper` — differentiate clearly (general/film vs paper) or merge.

**Granulator cluster** — "plastic granulator blades" (37 imp, pos 48), "granulator knives/blades" + supplier/manufacturer variants, ~120 impressions total, all pages 4–9. Note the query **"cumberland granulator blades"** — buyers search by OEM machine brand. Add OEM compatibility content (Cumberland, Rapid, Zerma etc.) to `/products/granulator-blades`. This is exactly the machine-model strategy and the data proves it.

**Cold saw blades** — page at pos 44, with application-specific queries appearing: "for steel," "for stainless steel," "for steel service centers." Add application sections or sub-pages for each.

---

## 🟢 Priority 4 — Strategic (ongoing)

- **US-first everything.** The US is 74% of your impressions (2,142) but only 0.37% CTR at pos 30.5. Use US terminology, inches alongside mm, and US-relevant OEM brands. Germany/UK show 79/77 impressions with zero clicks at poor positions — secondary targets.
- **Backlinks remain the ceiling.** Average position ~30 across the board with decent on-page usually means low domain authority. The directory + trade-publication plan from before applies; even 15–20 relevant links would lift every cluster simultaneously.
- **AI search is already sending you traffic** — ChatGPT shows up with ~6 sessions, comparable to Bing. Your structured technical articles feed this. Keep spec tables, FAQ blocks, and clear factual claims in content; add an `llms.txt` and keep schema clean.
- **LinkedIn works** (15 sessions, your #2 referrer) — keep Lynn's posting cadence, link each new technical article.
- **Fix the 404s** GA4 caught ("404 — Blade Not Found" with traffic) — find the broken internal links or set redirects.

---
