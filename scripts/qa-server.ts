import "dotenv/config";
import path from "node:path";
import { createServer } from "node:http";

// This runner must never read/write the configured production database.
process.env.DATABASE_URL = `file:${path.resolve("qa-results/full-qa/qa.db").replaceAll("\\", "/")}`;
process.env.EMAIL_RECIPIENTS_OVERRIDE = process.env.QA_TEST_EMAIL || "qa@example.invalid";
if (process.env.QA_SEND_REAL_EMAIL !== "1") process.env.RESEND_API_KEY = "";
const { createApp } = await import("../server/app");
const app = createApp({ staticPath: path.resolve("dist/public"), enableSpaFallback: true });
const port = Number(process.env.QA_PORT || 4300);
createServer(app).listen(port, "127.0.0.1", () => {
  console.log(`QA server http://127.0.0.1:${port}; real email=${process.env.QA_SEND_REAL_EMAIL === "1"}`);
});
