# Sureay Machinery Technology - Industrial Blades & Knives Website

A full-stack B2B marketing and product catalog website for [Sureay Machinery Technology Co., Ltd.](https://www.sureay.com), an ISO 9001:2015 certified manufacturer of precision industrial blades and cutting knives based in Ma'anshan City, Anhui Province, China.

## Features

- **React 19 SPA** with Wouter routing and lazy-loaded pages
- **Prerendering** via Puppeteer for SEO-friendly static HTML output
- **Product catalog** with 8 blade categories, filterable grid, and full spec sheets
- **Contact & RFQ forms** with file upload support (DXF drawings)
- **Admin CRM dashboard** with JWT authentication, inquiry management, follow-ups, and analytics
- **Email notifications** via Resend API on form submission
- **Google Analytics 4** with Consent Mode v2
- **Structured data** (Schema.org JSON-LD) for Organization, Product, and ItemList
- **SEO assets**: sitemap.xml, robots.txt, multi-format favicons, canonical tags
- **Deployable** via Docker + Coolify (full-stack, self-hosted)

## Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)

## Quick Start

### Prerequisites

- Node.js 20 or higher
- pnpm 10

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd SureayMachineTech

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up the database
pnpm db:generate
pnpm db:seed

# Start development server
pnpm dev
```

The frontend is available at `http://localhost:5173` and the API at `http://localhost:3000`.

## Project Structure

```
SureayMachineTech/
├── client/                    # Frontend (React SPA)
│   ├── index.html             # HTML shell (GA4, favicons, JSON-LD)
│   ├── public/                # Static assets
│   │   ├── images/            # Product images (WebP)
│   │   ├── sitemap.xml
│   │   ├── robots.txt
│   │   ├── site.webmanifest
│   │   └── favicon.ico/.svg/.png
│   └── src/
│       ├── App.tsx            # Router, auth guard, lazy loading
│       ├── pages/             # Page-level route components
│       ├── components/
│       │   ├── layout/        # Navbar, Footer, MegaMenu
│       │   ├── home/          # Hero, AuthorityCarousel, TabEcosystem, ContactRFQ
│       │   ├── product/       # ProductCard, ProductGrid
│       │   ├── product-detail/# BladeHero, TechSpecsTable, DecisiveSpecs
│       │   ├── industry/      # Industry landing page sections
│       │   ├── common/        # SEO, Breadcrumbs, TrustBadges
│       │   └── ui/            # shadcn/ui components
│       ├── data/
│       │   ├── blades.ts      # Master product catalog (source of truth)
│       │   ├── homeData.ts    # Home page content
│       │   └── news.ts        # News/articles
│       ├── api/               # API client functions
│       ├── contexts/          # ThemeContext
│       └── hooks/             # usePageTracking, etc.
│
├── server/                    # Backend (Express API)
│   ├── index.ts               # App entry point + security middleware
│   ├── routes/                # products, contact, auth, admin, seo
│   ├── controllers/           # Request handlers
│   ├── middleware/            # auth, cors, logger, errorHandler, analytics
│   ├── services/              # Business logic
│   └── db/                    # Database access layer
│
├── shared/                    # Shared types and validators (client + server)
│   ├── types/
│   └── validators/            # Zod schemas
│
├── prisma/
│   ├── schema.prisma          # SQLite database schema
│   └── seed.ts                # Database seed script
│
├── scripts/
│   ├── generate-sitemap.ts    # Generates client/public/sitemap.xml
│   └── prerender.ts           # Puppeteer SSG prerender script
│
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml
└── vite.config.ts
```

## Pages

### Public

| Route               | Page                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `/`                 | Home — hero, authority carousel, manufacturing blocks, product tab ecosystem, news grid, RFQ form |
| `/products`         | Product list — filterable catalog by category and industry sector                                 |
| `/products/:id`     | Product detail — full spec sheet, dimensions table, gallery, trust bar, CTA                       |
| `/plastic-industry` | Plastic recycling industry landing page                                                           |
| `/metal-industry`   | Metal processing industry landing page                                                            |
| `/paper-industry`   | Paper/tissue converting industry landing page                                                     |
| `/about`            | Company story and manufacturing capabilities                                                      |
| `/contact`          | Contact form with DXF file upload and RFQ                                                         |
| `/news`             | Technical articles grid                                                                           |
| `/news/:id`         | Individual article page                                                                           |

### Admin (JWT protected)

| Route          | Description                                            |
| -------------- | ------------------------------------------------------ |
| `/admin/login` | Admin login                                            |
| `/admin`       | Dashboard — contacts, inquiries, follow-ups, analytics |

## Development

### Available Scripts

```bash
# Start development server (frontend + backend concurrently)
pnpm dev

# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix

# Format code
pnpm format

# Database
pnpm db:generate
pnpm db:seed

# Docker
pnpm docker:build
pnpm docker:run
pnpm docker:stop
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Server
NODE_ENV=development
PORT=3000
ALLOWED_ORIGINS=http://localhost:5173

# Database
DATABASE_URL=file:./prisma/dev.db

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@sureay.com
EMAIL_TO=sales@sureay.com

# Frontend
VITE_API_URL=http://localhost:3000
```

### Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`

## Building

```bash
# Build frontend (Vite) + run Puppeteer prerender
pnpm build

# Build frontend + bundle server with esbuild
pnpm build:full

# Start production server
pnpm start
```

Build output:

- Frontend: `dist/public/` (served by Express)
- Server bundle: `dist/index.js`

## Deployment

The site runs on **Coolify** (self-hosted, Docker). The Express server serves both the API and the prerendered static files.

### Docker

```bash
# Build and start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The multi-stage Dockerfile installs Chromium for Puppeteer prerendering in the builder stage and produces a minimal production image on Node 20 Debian. The server exposes port 3000 with a `/health` endpoint.

### Key Production Environment Variables

```env
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://www.sureay.com
DATABASE_URL=file:/app/data/prod.db
RESEND_API_KEY=...
```

## Tech Stack

### Frontend

| Technology         | Purpose                      |
| ------------------ | ---------------------------- |
| React 19           | UI framework                 |
| TypeScript         | Type safety                  |
| Vite 7             | Build tool and dev server    |
| Tailwind CSS v4    | Utility-first styling        |
| shadcn/ui          | Component library (Radix UI) |
| Framer Motion      | Animations                   |
| Wouter             | Lightweight SPA routing      |
| React Hook Form    | Form handling                |
| Zod                | Schema validation            |
| react-helmet-async | Per-page SEO meta + JSON-LD  |
| Lucide React       | Icons                        |

### Backend

| Technology        | Purpose               |
| ----------------- | --------------------- |
| Express 4         | Web framework         |
| TypeScript        | Type safety           |
| Prisma 6 + SQLite | ORM and database      |
| Helmet.js         | HTTP security headers |
| Resend            | Transactional email   |
| JWT + bcryptjs    | Admin authentication  |
| Zod               | Request validation    |

### Infrastructure

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| Puppeteer          | SSG prerendering for SEO        |
| Docker             | Containerization                |
| Coolify            | Self-hosted deployment platform |
| Google Analytics 4 | Analytics with Consent Mode v2  |
| pnpm 10            | Package manager                 |

## Architecture

- **Frontend**: React SPA with lazy-loaded routes. Product data lives in `client/src/data/blades.ts` as the single source of truth. API calls go through `client/src/api/`. Per-page SEO is handled by `react-helmet-async` with JSON-LD structured data.
- **Backend**: Express MVC (controllers → services → db). Contact form submissions are stored in SQLite, trigger email via Resend, and are tracked in the Analytics table. The admin dashboard reads from all tables behind a JWT auth guard.
- **Prerendering**: `scripts/prerender.ts` uses Puppeteer to crawl all routes and write static HTML files to `dist/public/`, enabling search engine indexing without a server-side rendering framework.
- **Shared code**: TypeScript interfaces and Zod validators in `shared/` are imported by both client and server to keep types consistent.

## License

MIT License — see LICENSE file for details.

## Contact

- Website: https://www.sureay.com
- Company: Sureay Machinery Technology Co., Ltd., Ma'anshan City, Anhui Province, China
