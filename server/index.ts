import 'dotenv/config';
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createApp } from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  const app = createApp({
    staticPath,
    enableSpaFallback: true,
  });
  const server = createServer(app);

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
