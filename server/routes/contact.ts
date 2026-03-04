import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import { submitContactForm } from "../controllers/contactController.js";

// ── Allowed CAD/document extensions ───────────────────────────────────────────
const ALLOWED_EXT = /\.(pdf|dxf|dwg|step|stp)$/i;

const upload = multer({
  storage: multer.memoryStorage(),         // never touches disk
  limits:  { fileSize: 15 * 1024 * 1024 }, // 15 MB hard cap
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_EXT.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Allowed: .pdf .dxf .dwg .step .stp"));
    }
  },
});

// ── In-memory rate limiter ─────────────────────────────────────────────────────
// 3 submissions per IP per 15-minute window — no extra package required
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 min
const RATE_MAX_HITS  = 3;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Evict expired entries every 30 min to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((entry, ip) => {
    if (entry.resetAt < now) rateLimitMap.delete(ip);
  });
}, 30 * 60 * 1000).unref(); // .unref() so this timer never blocks process exit

function contactRateLimit(req: Request, res: Response, next: NextFunction): void {
  // Normalise IPv4-mapped IPv6 (::ffff:1.2.3.4 → 1.2.3.4)
  const ip  = (req.ip ?? req.socket.remoteAddress ?? "unknown").replace(/^::ffff:/, "");
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return next();
  }

  if (entry.count >= RATE_MAX_HITS) {
    const retryInSec = Math.ceil((entry.resetAt - now) / 1000);
    res.setHeader("Retry-After", String(retryInSec));
    res.status(429).json({
      success: false,
      message: `Too many submissions. Please wait ${Math.ceil(retryInSec / 60)} minute(s) before trying again.`,
    });
    return;
  }

  entry.count++;
  return next();
}

// ── Routes ─────────────────────────────────────────────────────────────────────
const router = Router();

router.post(
  "/contact",
  contactRateLimit,
  upload.single("attachment"),
  submitContactForm,
);

export default router;
