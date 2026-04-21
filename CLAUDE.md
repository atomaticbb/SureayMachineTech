# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

B2B product catalog for **Sureay Machinery Technology Co., Ltd.** — Chinese manufacturer of industrial blades targeting international OEM buyers. Live: https://www.sureay.com

## Commands

```bash
pnpm dev              # frontend (5173) + backend (3000) concurrently
pnpm build            # generate-sitemap → vite build → puppeteer prerender
pnpm build:full       # above + esbuild server bundle
pnpm type-check
pnpm lint:fix && pnpm format   # run before committing

# DB
pnpm db:migrate       # dev (creates migration file)
pnpm db:migrate:prod  # production
pnpm db:push          # quick schema push, no migration (dev only)
pnpm db:studio
```

## Architecture

```
client/   React 19 SPA (Vite, Tailwind v4, shadcn/ui, wouter)
server/   Express 4 API (TypeScript, Prisma + SQLite)
shared/   Types + Zod validators shared by both
scripts/  Puppeteer prerender (SSG) + sitemap generator
```

**Deployment:** Docker + Coolify. Express serves `/api` + prerendered static files from `dist/public/`.

**Path aliases:** `@/*` → `client/src/*`, `@shared/*` → `shared/*`

## Key Files

| File | Role |
|------|------|
| `client/src/data/blades.ts` | **Single source of truth** for the product catalog — never duplicate product data elsewhere |
| `client/src/App.tsx` | Router, providers, lazy pages, `ProtectedRoute` for admin |
| `scripts/prerender.ts` | Puppeteer crawls all routes → static HTML in `dist/public/` |
| `scripts/generate-sitemap.ts` | Auto-generates `client/public/sitemap.xml` — update when adding routes |
| `client/index.html` | GA4 snippet + Organization JSON-LD |

## Frontend

**Page template** — every page uses:
```tsx
<><SEO title="..." description="..." /><Navbar /><main>...</main><Footer /></>
```

**Design system — Swiss Brutalist / Industrial:**
- Colors: navy `#001f4d`, white `#ffffff`, gold `#e8b84b`
- `rounded-none` everywhere — no border-radius, no drop shadows
- Monospace uppercase labels with letter-spacing for spec data
- Framer Motion for entrance animations (keep subtle)

**Data/state:** No global state library. API calls via `client/src/api/` using `axios`; file uploads use raw `fetch`. Router is `wouter` — use `useLocation`/`Link` from there, not React Router.

**Analytics:** `gtagEvent({ action, category, label })` from `@/lib/gtag`.

## Backend

Server follows routes → controllers → services → db (Prisma) layering.

Admin routes use `authMiddleware` (JWT via HTTP-only cookie set on `POST /api/auth/login`).

Contact form (`POST /api/contact`): multer memoryStorage, 15 MB, `.pdf .dxf .dwg .step .stp`, rate-limited to 3/IP/15 min, stores to DB + Resend email.

New endpoint: create service → controller → route file → mount in `server/routes/index.ts`.

## Product Catalog

`client/src/data/blades.ts` — `Blade` type includes `id` (URL slug), `category` (`BladeCategoryType`), `sector` (`BladeSectorType`), `standardDimensions`, optional `dimensionLabels`. Add new products only here.

## SEO

- `<SEO>` component uses `react-helmet-async` for per-page meta + JSON-LD
- Prerender writes static HTML at build time — that's what search engines index
- Update `scripts/generate-sitemap.ts` when adding routes

## Code Style

Prettier: double quotes, semicolons, `trailingComma: "es5"`, 80-char width, 2-space indent, LF. ESLint: `no-console` and `no-explicit-any` are warnings.

## Environment Variables

```
DATABASE_URL            # SQLite path
RESEND_API_KEY          # email sending
EMAIL_FROM / EMAIL_TO
PORT / ALLOWED_ORIGINS
VITE_API_URL            # must be VITE_ prefix to reach browser bundle
VITE_ANALYTICS_ENDPOINT
```

## Behavioral Guidelines

Tradeoff: These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

Before implementing: state assumptions explicitly; surface multiple interpretations instead of picking silently; push back if a simpler approach exists; stop and ask when something is unclear.

### 2. Simplicity First

Minimum code that solves the problem. No features beyond what was asked, no single-use abstractions, no speculative flexibility. If 200 lines could be 50, rewrite it.

### 3. Surgical Changes

Touch only what you must. Don't improve adjacent code, formatting, or comments. Match existing style. Mention unrelated dead code — don't delete it. Remove only the imports/variables YOUR changes made unused.

Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

Transform tasks into verifiable goals ("Fix the bug" → "Write a test that reproduces it, then make it pass"). For multi-step tasks, state a brief plan with verify steps before starting.
