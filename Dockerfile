# ===================================
# Stage 1: Builder (Debian for Chrome compatibility)
# ===================================
FROM node:20 AS builder

WORKDIR /app

# Install Chrome dependencies for Puppeteer (Debian apt-get).
# Puppeteer will download its own Chrome binary during `pnpm install`.
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Copy Prisma schema (needed for postinstall hook)
COPY prisma ./prisma

# Install dependencies
RUN pnpm install --frozen-lockfile

# Manually install Chrome for Puppeteer (pnpm blocks postinstall scripts by default)
# Create a stable symlink so ENV can reference it
RUN pnpm exec puppeteer browsers install chrome && \
    ln -s /root/.cache/puppeteer/chrome/linux-*/chrome-linux64/chrome /usr/local/bin/chrome

# Set fixed path for puppeteer-core (doesn't auto-detect installed browsers)
ENV PUPPETEER_EXECUTABLE_PATH=/usr/local/bin/chrome

# Copy rest of source code
COPY . .

# Generate Prisma client and build
# --mount=type=tmpfs gives Chromium a proper /dev/shm (Docker build layers
# restrict the kernel's shared-memory device which causes Chrome to crash).
RUN --mount=type=tmpfs,target=/dev/shm \
    pnpm db:generate && pnpm build:full

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

