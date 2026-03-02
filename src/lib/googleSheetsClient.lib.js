import { google } from 'googleapis';
import { CONFIG } from '../constants/index.js';

const auth = new google.auth.GoogleAuth({
  keyFile: CONFIG.GOOGLE_SHEETS.KEY_JSON_PATH,
  scopes: CONFIG.GOOGLE_SHEETS.SCOPES,
});

export const googleSheetsClient = google.sheets({ version: 'v4', auth });

export async function appendSpreadsheet(
  spreadsheetId,
  range,
  values,
  valueInputOption = 'USER_ENTERED',
) {
  const result = await googleSheetsClient.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption,
    insertDataOption: 'INSERT_ROWS',
    resource: { values },
  });

  return result;
}
