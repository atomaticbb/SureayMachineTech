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
    // ── Anti-hotlinking: block cross-origin image embedding ────────────────
    // Only blocks requests where a Referer header IS present but originates
    // from a foreign domain — i.e. a competitor's site embedding your images.
    // No-Referer requests (Googlebot, direct browser access, social scrapers)
    // pass through untouched so SEO and link previews are never affected.
    app.use((req, res, next) => {
      if (
        (req.method !== "GET" && req.method !== "HEAD") ||
        !req.path.startsWith("/images/")
      ) {
        return next();
      }

      const referer = (req.headers.referer ??
        req.headers.referrer) as string | undefined;

      // No Referer = direct access / crawler / social scraper → allow
      if (!referer) {
        return next();
      }

      try {
        const { hostname } = new URL(referer);
        if (
          hostname === "sureay.com" ||
          hostname.endsWith(".sureay.com") ||
          hostname === "localhost"
        ) {
          return next();
        }
      } catch {
        // Malformed Referer header — deny
      }

      return res.status(403).send("Direct image access forbidden");
    });
    // ───────────────────────────────────────────────────────────────────────

    // Serve all static assets (JS, CSS, images, root index.html, paths with
    // trailing slash that already have index.html). redirect:false prevents
    // 301 trailing-slash redirects that cause Google crawl loops.
    app.use(express.static(staticPath, { redirect: false }));

    // Probe for a prerendered index.html for clean paths that lack a trailing
    // slash (e.g. /products/shredder-blades → .../shredder-blades/index.html).
    // express.static never serves directory index files without a redirect when
    // redirect:false is set, so we resolve them here before the SPA fallback.
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") return next();
      const probe = path.join(staticPath, req.path, "index.html");
      res.sendFile(probe, (err) => {
        if (err) next();
      });
    });
  }

  if (enableSpaFallback && staticPath) {
    app.get("*", analyticsMiddleware, (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  app.use(errorHandler);

  return app;
}