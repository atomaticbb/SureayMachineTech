# CLAUDE.md

This file provides context and conventions for working in this repository.

## Project Overview

B2B marketing and product catalog website for **Sureay Machinery Technology Co., Ltd.** — an ISO 9001:2015 certified Chinese manufacturer of industrial blades and cutting knives. The site targets international OEM buyers in the plastic recycling, metal processing, and paper converting industries.

Live site: https://www.sureay.com

## Commands

```bash
# Development (frontend + backend concurrently)
pnpm dev

# Type checking
pnpm type-check          # tsc --noEmit

# Linting
pnpm lint                # eslint
pnpm lint:fix

# Formatting
pnpm format              # prettier --write .

# Production build (sitemap + Vite + Puppeteer prerender)
pnpm build

# Full build (above + esbuild server bundle)
pnpm build:full

# Start production server
pnpm start

# Database
pnpm db:generate         # prisma generate
pnpm db:migrate          # prisma migrate dev
pnpm db:migrate:prod     # prisma migrate deploy
pnpm db:push             # prisma db push (schema push without migration)
pnpm db:seed             # tsx prisma/seed.ts
pnpm db:studio           # prisma studio (GUI)
pnpm db:reset            # prisma migrate reset

# Docker
pnpm docker:build
pnpm docker:run          # docker-compose up -d
pnpm docker:stop         # docker-compose down
```

## Architecture

```
client/     React 19 SPA (Vite, Tailwind CSS v4, shadcn/ui)
server/     Express 4 API (TypeScript, Prisma + SQLite)
shared/     Types and Zod validators used by both
prisma/     Schema and seed script
scripts/    Puppeteer prerender (SSG for SEO)
```

**Dev ports:** Frontend on `5173`, API on `3000`. Vite proxies `/api` and `/health` to `localhost:3000`.

**Build output:** `dist/public/` (static files), `dist/index.js` (bundled server).

**Deployment:** Docker + Coolify (self-hosted). Express serves both `/api` and the prerendered static files from `dist/public/`.

## Path Aliases

```typescript
@/*        → client/src/*
@shared/*  → shared/*
@assets/*  → attached_assets/*
```

## Key Files

| File | Role |
|---|---|
| `client/src/data/blades.ts` | **Single source of truth** for the product catalog. All product data, types (`Blade`, `BladeCategoryType`, `BladeSectorType`, etc.), and dimension tables live here. Never duplicate product data elsewhere. |
| `client/src/App.tsx` | Router, providers, lazy-loaded pages, `ProtectedRoute` for admin |
| `shared/types/product.ts` | `Product`, `ProductSpecs`, `BladeCategory`, `MachineryCategory` types |
| `shared/types/contact.ts` | `ContactFormData`, `ContactSubmissionResponse` |
| `shared/validators/contact.ts` | Zod `ContactFormSchema` — used on both client and server |
| `server/routes/index.ts` | Mounts all sub-routers under `/api` |
| `server/index.ts` | Express app entry (production): compression, helmet, CORS, static serving |
| `server/dev.ts` | Express dev entry (used with `tsx watch`) |
| `scripts/prerender.ts` | Puppeteer crawls all routes and writes static HTML to `dist/public/` |
| `scripts/generate-sitemap.ts` | Generates `client/public/sitemap.xml` at build time |
| `client/index.html` | GA4 snippet, JSON-LD (Organization schema), favicons |

## Frontend Conventions

### Component structure

Pages live in `client/src/pages/`. Each page wraps content in `<Navbar>` and `<Footer>` and includes an `<SEO>` component at the top for per-page meta tags.

```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";

export default function MyPage() {
  return (
    <>
      <SEO title="..." description="..." />
      <Navbar />
      <main>...</main>
      <Footer />
    </>
  );
}
```

### Design system

The site uses a **Swiss Brutalist / High-End Corporate Industrial** visual language:

- **Colors:** Deep navy `#001f4d` (primary), white `#ffffff`, gold accent `#e8b84b`
- **No border-radius** — use `rounded-none` everywhere
- **No drop shadows**
- **Typography:** Monospace labels with uppercase and letter-spacing for spec data
- **Motion:** Framer Motion for entrance animations; keep subtle

Do not introduce soft rounded cards, pastel colors, or generic SaaS UI patterns.

### State and data fetching

- No global state library. Use React hooks and context.
- API calls go through functions in `client/src/api/`.
- Use `axios` for API client calls; use raw `fetch` for form submissions with `multipart/form-data`.

### Analytics

Track meaningful user interactions with `gtagEvent` from `@/lib/gtag`:

```typescript
import { gtagEvent } from "@/lib/gtag";
gtagEvent({ action: "form_submit", category: "contact", label: "rfq" });
```

### Routing

Uses `wouter` (not React Router). Use `useLocation` and `Link` from `wouter`.

## Backend Conventions

### Server layer pattern (MVC)

```
routes/      → validates input, calls controller
controllers/ → orchestrates service calls, sends response
services/    → business logic
db/          → database access (Prisma queries)
```

### Authentication

Admin routes are protected by `authMiddleware` (JWT via HTTP-only cookie). The cookie is set on `POST /api/auth/login` and verified on `GET /api/auth/me`.

### Contact form

- Route: `POST /api/contact`
- multer `memoryStorage`, 15 MB limit, accepts `.pdf .dxf .dwg .step .stp`
- Custom in-memory rate limiter: 3 submissions per IP per 15 minutes
- On success: stores in `Contact` table, sends email via Resend, logs to `EmailLog`

### Error handling

All async route handlers must call `next(err)` on error. The global `errorHandler` middleware in `server/middleware/errorHandler.ts` formats the response.

### Adding a new API endpoint

1. `server/services/myService.ts` — business logic
2. `server/controllers/myController.ts` — request/response handling
3. `server/routes/myRoutes.ts` — route definitions
4. `server/routes/index.ts` — mount the new router

## Shared Code

Always put types and validators in `shared/` when they are needed by both client and server. Import with `@shared/types` or `@shared/validators`.

## Database

SQLite via Prisma. Schema is in `prisma/schema.prisma`.

After changing the schema:
- Development: `pnpm db:migrate` (creates a migration file)
- Production: `pnpm db:migrate:prod` (applies pending migrations)
- Quick iteration: `pnpm db:push` (no migration file, dev only)

The `postinstall` script runs `prisma generate` automatically after `pnpm install`.

## Code Style

Enforced by ESLint (flat config, v9) and Prettier. Key rules:

- **Prettier:** double quotes, semicolons, `trailingComma: "es5"`, `printWidth: 80`, 2-space indent, LF line endings
- `no-console` is a **warning** — avoid leaving console logs in committed code
- `@typescript-eslint/no-explicit-any` is a **warning** — type everything properly
- Unused variables prefixed with `_` are ignored by ESLint
- `react/react-in-jsx-scope` is off (React 19 automatic JSX runtime)

Run `pnpm lint:fix && pnpm format` before committing.

## Environment Variables

```env
# Database
DATABASE_URL="file:./prisma/data/database.db"

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@sureay.com
EMAIL_TO=sales@sureay.com

# Server
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://www.sureay.com

# Frontend (Vite — must be prefixed VITE_)
VITE_API_URL=https://api.sureay.com
VITE_ANALYTICS_ENDPOINT=/api/analytics
```

Frontend environment variables must be prefixed with `VITE_` to be exposed to the browser bundle.

## SEO Notes

- Per-page meta tags and JSON-LD are set via `react-helmet-async` in the `<SEO>` component.
- The `scripts/prerender.ts` Puppeteer script generates static HTML for all routes at build time — this is what search engines index.
- `client/public/sitemap.xml` is **auto-generated** by `scripts/generate-sitemap.ts` at build time. Update the script when adding new routes.
- Structured data (Schema.org) for the Organization is in `client/index.html`. Per-product JSON-LD is rendered by the Product Detail page.

## Product Catalog

All product data is in `client/src/data/blades.ts`. The `Blade` interface includes:

- `id` — URL slug used in `/products/:id`
- `category` — one of `BladeCategoryType` (8 values)
- `sector` — one of `BladeSectorType` (recycling, paper, converting, metal, other)
- `standardDimensions` — array of `StandardDimension` rows for the spec table
- `dimensionLabels` — optional column header overrides for non-circular blades

When adding a new product, add it only to `blades.ts`. Do not add product data to the database seed or any other file unless explicitly required.
