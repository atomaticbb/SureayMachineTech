---
name: news-publishing-workflow
description: "Use when adding or updating website news posts, including Chinese requests like 增加news, 新闻发布, 生成文章, 图片描述, 产品内链, 更新sitemap. Generates image content briefs when images are not specified, drafts complete SEO-ready news content, inserts relevant product internal links, and updates sitemap entries safely."
argument-hint: "新闻标题 + 文章要点（可选：目标产品、发布日期、是否已有图片）"
user-invocable: true
---

# News Publishing Workflow

## Outcome

Produce and publish a complete news item for this project with:
- A finished article suitable for the site tone and B2B audience
- Image content descriptions if the user did not provide image direction
- Product-related internal links embedded naturally in the article
- Sitemap updated to include the new news URL

## Use When

Use this skill when the user asks to:
- Add a new news post
- Provide a title or rough draft and request a polished final article
- Generate image directions/prompts for manual image creation
- Add product internal links to improve SEO and conversion
- Update sitemap after publishing a news page

## Inputs

Expected input from user:
- Required: title or topic
- Optional: rough draft/body, target products, publish date, preferred language, image requirements

If critical information is missing, ask only for what blocks publication.

## Project-Specific File Targets

Primary files to update:
- `client/src/data/news.ts` for news content source
- `client/public/sitemap.xml` and/or sitemap generation sources used by this repo
- If route inventory changed, update `scripts/generate-sitemap.ts` accordingly

Always inspect existing structures before editing to match current schema.

## Procedure

1. Gather and normalize inputs
- Capture title, audience, language, and any supplied draft text.
- Generate a URL-safe slug from the title if missing.
- Determine publication date (user-provided or today).

2. Decide image branch
- If user provided image requirements/assets: use those directly.
- If user did NOT specify images: generate 2-4 image content descriptions.
- Use a structured template per image:
  - Scene: environment and manufacturing context
  - Subject: blade/product focus and key action
  - Composition: camera angle, framing, and depth
  - Lighting: realistic industrial lighting direction
  - Text overlay: optional headline/subheadline if needed
  - Negative constraints: what should not appear in the image

3. Draft final article
- Produce a complete article structure: headline, intro, body sections, and conclusion/CTA.
- Keep content factual, industrial B2B oriented, and aligned with Sureay brand tone.
- Avoid unverifiable claims; prefer practical manufacturing details and buyer value.

4. Add product-related internal links
- Identify 2-4 relevant internal pages from existing site/product data, including product category pages and product detail pages.
- Insert links contextually in body paragraphs (not link stuffing).
- Anchor text should be descriptive and natural.

5. Update repository content
- Add/update the item in `client/src/data/news.ts` using existing type/schema.
- Ensure slug/path matches the URL used in sitemap.
- Prioritize updating sitemap generation sources first, then regenerate `client/public/sitemap.xml` so the news URL is included.

6. Validate
- Confirm no schema/type break in news data.
- Confirm sitemap contains the new canonical URL.
- Run project checks when possible (type-check/build or targeted verification).

7. Report
- Summarize what was created: article title, slug, image descriptions count, inserted internal links, sitemap update status.
- Call out any assumptions requiring user confirmation.

## Decision Points

- Language:
  - If user language is Chinese, default output to Chinese unless requested otherwise.
- Image generation:
  - If no image instructions are supplied, image descriptions are mandatory.
- Internal links:
  - Prefer product category + detail page combination when both are relevant.
  - If no relevant product page is found, ask user to confirm candidate pages before publishing.
- Sitemap path handling:
  - Default strategy: update generation source, then regenerate sitemap.
  - Fall back to direct XML edit only when generation path is unavailable.

## Quality Checklist

A task is complete only when all checks pass:
- News entry exists in project news data file and matches existing schema
- Article is complete (not outline-only)
- Product internal links are present and relevant
- Image descriptions are included when user did not provide image specs
- Sitemap includes the new news URL
- Changes are limited to files required for publication

## Guardrails

- Do not fabricate certifications, test results, or customer names.
- Do not add unrelated style refactors.
- Keep edits surgical and consistent with existing code style.
- If there is uncertainty about product-link relevance, ask before finalizing.
