import * as path from "path";
import * as url from "url";
import dotenv from "dotenv";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

dotenv.config({ path: path.join(PROJECT_ROOT, ".env") });

function requireEnv(envName) {
  const value = process.env[envName];
  if (!value || value.trim() === "") {
    throw new Error(`❌ Missing required environment variable: ${envName}`);
  }
  return value;
}

export const CONFIG = {
  GITHUB: {
    TOKEN: requireEnv("GITHUB_TOKEN"),
    API_URL: process.env.GITHUB_API_URL || "https://api.github.com",
  },
  GOOGLE_SHEETS: {
    KEY_JSON_PATH: path.join(PROJECT_ROOT, requireEnv("GOOGLE_KEY_JSON_PATH")),
    SPREADSHEET_ID: requireEnv("SPREADSHEET_ID"),
    SCOPES: ["https://www.googleapis.com/auth/spreadsheets"],
  },
  REVIEWER: process.env.REVIEWER ?? "—",
};
