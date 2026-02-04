# Likun Shredder Blades & Knives Website

A modern, full-stack web application for showcasing industrial shredder blades and cutting tools. Built with React, TypeScript, Express, and featuring a clean MVC architecture.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite, Express
- **Component Library**: shadcn/ui with Tailwind CSS
- **Full-Stack Architecture**: Separated frontend, backend, and shared code
- **API Layer**: RESTful API with proper error handling
- **Type Safety**: Full TypeScript coverage with shared types
- **Validation**: Zod schemas for runtime validation
- **Docker Ready**: Containerized deployment setup
- **Production Ready**: ESLint, Prettier, comprehensive documentation

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- pnpm (or use corepack)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/shredder-blades-website.git
cd shredder-blades-website

# Enable pnpm
corepack enable

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
shredder-blades-website/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── api/        # API client layer
│   │   ├── components/ # React components (layout, features, ui)
│   │   ├── pages/      # Page components
│   │   ├── types/      # TypeScript types
│   │   └── ...
│   └── index.html
├── server/             # Backend Express application
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Express middleware
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── index.ts       # Server entry point
├── shared/            # Shared code between client & server
│   ├── types/        # Shared TypeScript types
│   └── validators/   # Zod validation schemas
├── docs/             # Documentation
│   ├── API.md
│   ├── STRUCTURE.md
│   └── DEPLOYMENT.md
└── ...
```

See [docs/STRUCTURE.md](docs/STRUCTURE.md) for detailed structure documentation.

## 💻 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix

# Format code
pnpm format

# Docker commands
pnpm docker:build
pnpm docker:run
pnpm docker:stop
```

### Development Workflow

1. **Start the dev server**: `pnpm dev`
2. **Make changes** to frontend or backend
3. **Hot reload** automatically updates the browser
4. **Type check**: Run `pnpm type-check` to verify types
5. **Lint**: Run `pnpm lint` before committing

### Adding New Features

#### Frontend Component

```typescript
// client/src/components/features/MyComponent.tsx
import { Button } from '@/components/ui/button';

export default function MyComponent() {
  return <Button>Click me</Button>;
}
```

#### API Endpoint

```typescript
// 1. Add service (server/services/myService.ts)
export const getData = async () => {
  /* ... */
};

// 2. Add controller (server/controllers/myController.ts)
export const handleGetData = async (req, res, next) => {
  /* ... */
};

// 3. Add route (server/routes/myRoutes.ts)
router.get("/data", handleGetData);

// 4. Add to main router (server/routes/index.ts)
import myRoutes from "./myRoutes.js";
router.use("/", myRoutes);

// 5. Create API client (client/src/api/myApi.ts)
export const getData = async () => {
  const response = await apiClient.get("/data");
  return response.data;
};
```

## 🏗️ Building

### Development Build

```bash
pnpm build
```

This creates:

- Frontend: `dist/public/` (served by Express)
- Backend: `dist/index.js` (Node.js server)

### Production Build

```bash
NODE_ENV=production pnpm build
pnpm start
```

## 🚢 Deployment

### Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Manual Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions including:

- Docker deployment
- PM2 deployment
- Nginx configuration
- SSL/HTTPS setup
- Production checklist

### Environment Variables

Key environment variables for production:

```env
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://yourdomain.com
```

See `.env.example` for all available options.

## 📚 Documentation

- [API Documentation](docs/API.md) - REST API endpoints and usage
- [Project Structure](docs/STRUCTURE.md) - Detailed code organization
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment instructions

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Wouter** - Lightweight routing
- **Axios** - HTTP client
- **Zod** - Schema validation
- **React Hook Form** - Form handling
- **Sonner** - Toast notifications

### Backend

- **Express** - Web framework
- **TypeScript** - Type safety
- **Zod** - Request validation
- **CORS** - Cross-origin support

### Development

- **pnpm** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **esbuild** - Fast bundler for backend

### Infrastructure

- **Docker** - Containerization
- **Nginx** - Reverse proxy (recommended)
- **PM2** - Process manager (alternative)

## 🏗️ Architecture

### Frontend Architecture

- **Component-based**: Reusable UI components
- **API Layer**: Centralized API calls with error handling
- **Type Safety**: Full TypeScript coverage
- **State Management**: React hooks and context

### Backend Architecture

- **MVC Pattern**: Controllers, Services, Routes
- **Middleware**: Error handling, logging, CORS
- **Type Safety**: Shared types with frontend
- **Validation**: Zod schemas for request validation

### Code Sharing

- **Types**: Shared TypeScript interfaces
- **Validators**: Shared Zod schemas
- **Constants**: Shared configuration

## 🔧 Configuration

### Path Aliases

The project uses TypeScript path aliases:

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`

Example:

```typescript
import { Button } from "@/components/ui/button";
import { Product } from "@shared/types";
```

### Linting & Formatting

```bash
# Run ESLint
pnpm lint

# Fix ESLint issues
pnpm lint:fix

# Format with Prettier
pnpm format
```

Configuration files:

- `.eslintrc.cjs` - ESLint rules
- `.prettierrc` - Prettier formatting rules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`pnpm type-check && pnpm lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation for new features
- Ensure type safety with TypeScript
- Test your changes thoroughly

## 📝 License

MIT License - see LICENSE file for details

## 📧 Contact

For inquiries about the products or this project:

- Email: contact@yourdomain.com
- Website: https://yourdomain.com

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Express](https://expressjs.com/) - Fast, minimalist web framework

---

Made with ❤️ for the industrial recycling industry
