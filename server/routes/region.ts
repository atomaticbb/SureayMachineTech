import { Router, Request, Response } from "express";
import geoip from "geoip-lite";

const router = Router();

/**
 * Countries/regions that require explicit user consent before analytics cookies
 * can be set. Covers GDPR (EU + EEA), UK GDPR, Swiss nFADP, Brazil LGPD,
 * and China PIPL (relevant since Sureay is a Chinese company).
 */
const CONSENT_REQUIRED_COUNTRIES = new Set([
  // EU member states (GDPR)
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI",
  "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT",
  "NL", "PL", "PT", "RO", "SE", "SI", "SK",
  // EEA non-EU (GDPR applies)
  "IS", "LI", "NO",
  // Other strict regimes
  "GB", // UK GDPR
  "CH", // Swiss nFADP
  "BR", // Brazil LGPD
  "CN", // China PIPL
]);

/**
 * GET /api/region
 * Returns whether the visitor's country requires explicit consent.
 * Used by the client to decide whether to show the cookie banner.
 */
router.get("/region", (req: Request, res: Response) => {
  const forwarded = req.headers["x-forwarded-for"] as string | undefined;
  const ip =
    (forwarded ? forwarded.split(",")[0].trim() : null) ||
    req.socket.remoteAddress ||
    "";

  const geo = geoip.lookup(ip);
  const country = geo?.country ?? "XX";
  const requiresConsent = CONSENT_REQUIRED_COUNTRIES.has(country);

  // Cache for 24h — country doesn't change per visitor
  res.set("Cache-Control", "private, max-age=86400");
  res.json({ requiresConsent, country });
});

export default router;
