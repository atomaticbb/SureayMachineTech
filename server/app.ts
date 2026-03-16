import express from "express";
import compression from "compression";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./routes/index.js";
import seoRouter from "./routes/seo.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import { corsMiddleware } from "./middleware/cors.js";
import { analyticsMiddleware } from "./middleware/analytics.js";

type CreateAppOptions = {
  staticPath?: string;
  enableSpaFallback?: boolean;
  includeRootInfo?: boolean;
};

export function createApp({
  staticPath,
  enableSpaFallback = false,
  includeRootInfo = false,
}: CreateAppOptions = {}) {
  const app = express();

  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://www.googletagmanager.com",
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
          ],
          fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
          imgSrc: [
            "'self'",
            "data:",
            "blob:",
            "https://www.google-analytics.com",
            "https://www.googletagmanager.com",
          ],
          connectSrc: [
            "'self'",
            "https://analytics.google.com",
            "https://www.google-analytics.com",
            "https://region1.google-analytics.com",
            "https://stats.g.doubleclick.net",
          ],
          objectSrc: ["'none'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );
  app.use(express.json({ limit: "50kb" }));
  app.use(cookieParser());
  app.use(corsMiddleware);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use(logger);

  if (includeRootInfo) {
    app.get("/", (_req, res) => {
      res.json({
        message: "Shredder Blades Backend API",
        version: "1.0.0",
        endpoints: {
          health: "/health",
          api: "/api",
          admin: "/api/admin",
        },
      });
    });
  }

  app.use("/api", routes);
  app.use("/", seoRouter);

  if (staticPath) {
    app.use(express.static(staticPath));
  }

  if (enableSpaFallback && staticPath) {
    app.get("*", analyticsMiddleware, (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  app.use(errorHandler);

  return app;
}