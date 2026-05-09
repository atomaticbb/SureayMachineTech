import { Router } from "express";

const router = Router();

// /robots.txt and /sitemap.xml are served as static files from dist/public/
// via express.static — no dynamic routes needed.

export default router;
