# Project Structure

This document describes the organization of the shredder-blades-website project.

---

## Overview

The project follows a modern full-stack architecture with clear separation between:

- **Frontend** (`client/`) - React + TypeScript + Vite
- **Backend** (`server/`) - Express + TypeScript
- **Shared** (`shared/`) - Common types and validators

---

## Directory Structure

```
shredder-blades-website/
├── client/                      # Frontend application
│   ├── src/
│   │   ├── api/                # API client layer
│   │   │   ├── client.ts       # Axios instance configuration
│   │   │   ├── products.ts     # Product API calls
│   │   │   └── contact.ts      # Contact form API calls
│   │   ├── assets/             # Static assets (currently empty)
│   │   ├── components/         # React components
│   │   │   ├── layout/         # Layout components
│   │   │   │   ├── Layout.tsx  # Main layout wrapper
│   │   │   │   ├── Navbar.tsx  # Navigation bar
│   │   │   │   └── Footer.tsx  # Footer
│   │   │   ├── features/       # Feature-specific components
│   │   │   │   └── Map.tsx     # Google Maps component
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility functions
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── ...
│   │   ├── types/              # TypeScript type definitions
│   │   │   └── index.ts        # Re-exports from shared
│   │   ├── App.tsx             # Main App component
│   │   ├── main.tsx            # App entry point
│   │   └── index.css           # Global styles
│   ├── public/                 # Public static files
│   └── index.html              # HTML template
├── server/                     # Backend application
│   ├── controllers/            # Request handlers
│   │   ├── productController.ts
│   │   └── contactController.ts
│   ├── middleware/             # Express middleware
│   │   ├── errorHandler.ts    # Global error handler
│   │   ├── logger.ts           # Request logger
│   │   └── cors.ts             # CORS configuration
│   ├── routes/                 # API routes
│   │   ├── index.ts            # Route aggregator
│   │   ├── products.ts         # Product routes
│   │   └── contact.ts          # Contact routes
│   ├── services/               # Business logic
│   │   ├── productService.ts  # Product data operations
│   │   ├── emailService.ts    # Email sending logic
│   │   └── index.ts            # Service exports
│   ├── utils/                  # Utility functions (optional)
│   ├── config/                 # Configuration (optional)
│   └── index.ts                # Server entry point
├── shared/                     # Shared code between client & server
│   ├── types/                  # TypeScript type definitions
│   │   ├── product.ts          # Product types
│   │   ├── contact.ts          # Contact form types
│   │   ├── api.ts              # API response types
│   │   └── index.ts            # Type exports
│   ├── validators/             # Zod validation schemas
│   │   └── contact.ts          # Contact form validator
│   └── const.ts                # Shared constants
├── docs/                       # Documentation
│   ├── API.md                  # API documentation
│   ├── STRUCTURE.md            # This file
│   ├── DEPLOYMENT.md           # Deployment guide
│   ├── ideas.md                # Project ideas
│   └── image-urls.md           # Image resources
├── patches/                    # pnpm patches
│   └── wouter@3.7.1.patch
├── .eslintrc.cjs              # ESLint configuration
├── .prettierrc                # Prettier configuration
├── .env.example               # Environment variable template
├── .dockerignore              # Docker ignore patterns
├── .gitignore                 # Git ignore patterns
├── Dockerfile                 # Docker build configuration
├── docker-compose.yml         # Docker Compose configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
├── components.json            # shadcn/ui configuration
├── package.json               # Project dependencies
└── README.md                  # Project README
```

---

## Component Organization

### Layout Components (`client/src/components/layout/`)

Components that define the overall structure and layout of pages:

- **Layout.tsx** - Main layout wrapper with Navbar and Footer
- **Navbar.tsx** - Top navigation bar
- **Footer.tsx** - Page footer

### Feature Components (`client/src/components/features/`)

Components that implement specific features:

- **Map.tsx** - Google Maps integration

### UI Components (`client/src/components/ui/`)

Reusable UI components from shadcn/ui library. These should not be modified directly.

---

## API Layer (`client/src/api/`)

### Purpose

Centralize all API calls to the backend, providing a clean interface for components.

### Files

- **client.ts** - Axios instance with interceptors for error handling
- **products.ts** - Product-related API calls
- **contact.ts** - Contact form submission

### Usage Example

```typescript
import { getProducts, getProductById } from "@/api/products";

// In a component or hook
const products = await getProducts();
const product = await getProductById("single-shaft");
```

---

## Backend MVC Structure

### Controllers (`server/controllers/`)

Handle HTTP requests and responses. Thin layer that calls services.

### Services (`server/services/`)

Contain business logic and data operations. Should be reusable.

### Routes (`server/routes/`)

Define API endpoints and map them to controllers.

### Middleware (`server/middleware/`)

- **errorHandler** - Catches and formats errors
- **logger** - Logs requests
- **cors** - Configures CORS

---

## Shared Code (`shared/`)

### Types

TypeScript interfaces and types used by both frontend and backend.

### Validators

Zod schemas for runtime validation, primarily used in the backend but can be used in frontend for form validation.

---

## Import Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` - Maps to `client/src/*`
- `@shared/*` - Maps to `shared/*`
- `@assets/*` - Maps to `attached_assets/*` (if needed)

### Examples

```typescript
// Instead of: import { Button } from '../../../components/ui/button'
import { Button } from "@/components/ui/button";

// Instead of: import { Product } from '../../../shared/types/product'
import { Product } from "@shared/types/product";
```

---

## Adding New Features

### Adding a New Page

1. Create a page component in `client/src/pages/`
2. Import and use the `Layout` component
3. Add route in `client/src/App.tsx`

### Adding a New API Endpoint

1. Create service in `server/services/`
2. Create controller in `server/controllers/`
3. Create route in `server/routes/`
4. Import route in `server/routes/index.ts`
5. Create API function in `client/src/api/`

### Adding Shared Types

1. Add type definition in `shared/types/`
2. Export from `shared/types/index.ts`
3. Use in both client and server

---

## Best Practices

### Frontend

- Use the `Layout` component for consistent page structure
- Make API calls through the `client/src/api/` layer
- Use TypeScript types from `@shared/types`
- Keep components small and focused
- Use shadcn/ui components for UI elements

### Backend

- Keep controllers thin - delegate to services
- Put business logic in services
- Use Zod validators for request validation
- Handle errors consistently with error middleware
- Use proper HTTP status codes

### Shared

- Only put truly shared code in `shared/`
- Keep types DRY (Don't Repeat Yourself)
- Use Zod for validation schemas
- Export everything through index files

---

## File Naming Conventions

- **Components:** PascalCase (e.g., `Navbar.tsx`, `ProductCard.tsx`)
- **Pages:** PascalCase (e.g., `Home.tsx`, `About.tsx`)
- **Utilities:** camelCase (e.g., `utils.ts`, `helpers.ts`)
- **Types:** camelCase files, PascalCase exports (e.g., `product.ts` exports `Product`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

---

## Module System

The project uses **ES Modules (ESM)** throughout:

- Use `import/export` syntax
- Server-side imports of other server files must include `.js` extension
- TypeScript compiles `.ts` to `.js`, so import paths use `.js` even for `.ts` files

Example:

```typescript
// In server/routes/products.ts
import { getProducts } from "../controllers/productController.js"; // Note .js extension
```
