import { Router, Request, Response, NextFunction } from "express";
import { submitCatalogDownload } from "../controllers/catalogDownloadController.js";

// Simple rate limit: 10 requests per IP per 15 minutes
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 10;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

setInterval(
  () => {
    const now = Date.now();
    rateLimitMap.forEach((entry, ip) => {
      if (entry.resetAt < now) rateLimitMap.delete(ip);
    });
  },
  30 * 60 * 1000
).unref();

function rateLimit(req: Request, res: Response, next: NextFunction): void {
  const ip = (req.ip ?? req.socket.remoteAddress ?? "unknown").replace(
    /^::ffff:/,
    ""
  );
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return next();
  }

  if (entry.count >= RATE_MAX) {
    res.status(429).json({ success: false, message: "Too many requests." });
    return;
  }

  entry.count++;
  return next();
}

const router = Router();
router.post("/catalog-download", rateLimit, submitCatalogDownload);

export default router;
