import 'dotenv/config';
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import { corsMiddleware } from "./middleware/cors.js";
import { analyticsMiddleware } from "./middleware/analytics.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startDevServer() {
  const app = express();
  const server = createServer(app);

  // 中间件
  app.use(express.json());
  app.use(cookieParser());
  app.use(corsMiddleware);
  app.use(logger);
  app.use(analyticsMiddleware);

  // 根路径
  app.get("/", (req, res) => {
    res.json({
      message: "Shredder Blades Backend API",
      version: "1.0.0",
      endpoints: {
        health: "/health",
        api: "/api",
        admin: "/api/admin"
      }
    });
  });

  // 健康检查
  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API 路由
  app.use("/api", routes);

  // 错误处理（必须放最后）
  app.use(errorHandler);

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`🚀 Backend API server running on http://localhost:${port}/`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log(`🔌 API endpoint: http://localhost:${port}/api`);
  });
}

startDevServer().catch(console.error);
