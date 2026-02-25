import "dotenv/config";

export const CONFIG = {
  GITHUB: {
    TOKEN: process.env.GITHUB_TOKEN,
    API_URL: process.env.GITHUB_API_URL || "https://api.github.com",
  },
  GOOGLE_SHEETS: {
    KEY_JSON_PATH: process.env.GOOGLE_KEY_JSON_PATH,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    SCOPES: ["https://www.googleapis.com/auth/spreadsheets"]
  },
  REVIEWER: process.env.REVIEWER ?? "—",
};
