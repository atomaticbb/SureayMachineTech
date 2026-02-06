# ===================================
# Stage 1: Builder
# ===================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Copy Prisma schema (needed for postinstall hook)
COPY prisma ./prisma

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of source code
COPY . .

# Generate Prisma client and build
RUN pnpm db:generate && pnpm build:full

# ===================================
# Stage 2: Production
# ===================================
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Copy Prisma schema and migrations before install (needed for postinstall hook)
COPY --from=builder /app/prisma ./prisma

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Copy startup script
COPY start.sh ./start.sh
RUN chmod +x start.sh

# Set environment first
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL="file:/app/prisma/data/database.db"

# Create directory for database with proper permissions
RUN mkdir -p /app/prisma/data && \
    chmod 755 /app/prisma && \
    chmod 755 /app/prisma/data

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["./start.sh"]

