import 'dotenv/config';
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import { corsMiddleware } from "./middleware/cors.js";
import { analyticsMiddleware } from "./middleware/analytics.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // ── 1. Security & Parsers ────────────────────────────────────────────────
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc:  ["'self'"],
        scriptSrc:   ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
        styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc:     ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc:      ["'self'", "data:", "blob:", "https://www.google-analytics.com", "https://www.googletagmanager.com"],
        connectSrc:  ["'self'", "https://www.google-analytics.com", "https://region1.google-analytics.com"],
        objectSrc:   ["'none'"],
        frameSrc:    ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));
  app.use(express.json({ limit: '50kb' }));
  app.use(cookieParser());
  app.use(corsMiddleware);

  // ── 2. Healthcheck — early exit before logger / analytics ───────────────
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ── 3. Logger ────────────────────────────────────────────────────────────
  app.use(logger);

  // ── 4. API Routes ────────────────────────────────────────────────────────
  app.use("/api", routes);

  // ── 5. Static Files ──────────────────────────────────────────────────────
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // ── 6. SPA Fallback — analytics scoped to page views only ───────────────
  app.get("*", analyticsMiddleware, (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // ── 7. Error Handler ─────────────────────────────────────────────────────
  app.use(errorHandler);

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
