import { Router, Request, Response } from "express";

const router = Router();
const BASE_URL = "https://www.sureay.com";

// ── GET /robots.txt ───────────────────────────────────────────────────────────
router.get("/robots.txt", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(
    `User-agent: *\nDisallow: /api/\nDisallow: /admin/\n\nSitemap: ${BASE_URL}/sitemap.xml`
  );
});

// /sitemap.xml is served as a static file from dist/public/sitemap.xml
// via express.static — no dynamic route needed.

export default router;
