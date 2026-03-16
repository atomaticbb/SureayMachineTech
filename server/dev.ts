import 'dotenv/config';
import { createServer } from "http";
import { createApp } from "./app.js";

async function startDevServer() {
  const app = createApp({ includeRootInfo: true });
  const server = createServer(app);

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`🚀 Backend API server running on http://localhost:${port}/`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log(`🔌 API endpoint: http://localhost:${port}/api`);
  });
}

startDevServer().catch(console.error);
