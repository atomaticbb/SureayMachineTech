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

  // 安全响应头
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc:  ["'self'", "'unsafe-inline'"],   // Vite 注入的 inline script
        styleSrc:   ["'self'", "'unsafe-inline'"],
        imgSrc:     ["'self'", "data:", "blob:"],
        connectSrc: ["'self'"],
        fontSrc:    ["'self'", "data:"],
        objectSrc:  ["'none'"],
        frameSrc:   ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false, // 避免破坏非 COEP 资源
  }));

  // 中间件
  app.use(express.json({ limit: '50kb' }));
  app.use(cookieParser());
  app.use(corsMiddleware);
  app.use(logger);
  app.use(analyticsMiddleware);

  // 健康检查
  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API 路由
  app.use("/api", routes);

  // 静态文件服务
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // SPA 路由回退
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // 错误处理（必须放最后）
  app.use(errorHandler);

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
