import { Router, Request, Response } from "express";
import { prisma } from "../db/client.js";

const router = Router();
const BASE_URL = "https://sureay.com";

// ── GET /robots.txt ───────────────────────────────────────────────────────────
router.get("/robots.txt", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(
    `User-agent: *\nDisallow: /api/\nDisallow: /admin/\n\nSitemap: ${BASE_URL}/sitemap.xml`
  );
});

// ── GET /sitemap.xml ──────────────────────────────────────────────────────────
router.get("/sitemap.xml", async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    const staticRoutes: Array<{ path: string; priority: string; changefreq: string }> = [
      { path: "/",           priority: "0.8", changefreq: "weekly"  },
      { path: "/about-us",   priority: "0.8", changefreq: "monthly" },
      { path: "/contact-us", priority: "0.8", changefreq: "monthly" },
    ];

    const staticUrls = staticRoutes
      .map(
        ({ path, priority, changefreq }) =>
          `  <url>\n    <loc>${BASE_URL}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
      )
      .join("\n");

    const productUrls = products
      .map(
        (p) =>
          `  <url>\n    <loc>${BASE_URL}/products/${p.id}</loc>\n    <lastmod>${p.updatedAt.toISOString().split("T")[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>`
      )
      .join("\n");

    const xml = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      staticUrls,
      productUrls,
      `</urlset>`,
    ].join("\n");

    res.setHeader("Content-Type", "application/xml");
    res.send(xml);
  } catch (_err) {
    res.status(500).send("Failed to generate sitemap");
  }
});

export default router;
