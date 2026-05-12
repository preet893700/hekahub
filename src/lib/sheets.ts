import { google } from "googleapis";

// Module-level cache for auth client
let cachedAuth: any = null;

async function getAuthClient() {
  const hasIndividualVars = process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY;
  const hasJsonString = !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!hasIndividualVars && !hasJsonString) {
    console.error("DEBUG: Google credentials are missing from environment");
    throw new Error("Configuration error: Google credentials are missing");
  }

  // 1. Try individual environment variables first (Cleanest approach)
  if (!cachedAuth) {
    try {
      let credentials;

      if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
        let privateKey = process.env.GOOGLE_PRIVATE_KEY;
        const startMarker = "-----BEGIN PRIVATE KEY-----";
        const endMarker = "-----END PRIVATE KEY-----";

        if (privateKey.includes(startMarker) && privateKey.includes(endMarker)) {
          const start = privateKey.indexOf(startMarker);
          const end = privateKey.indexOf(endMarker) + endMarker.length;
          privateKey = privateKey.substring(start, end);
        }

        privateKey = privateKey.replace(/\\+n/g, '\n').trim();

        credentials = {
          client_email: process.env.GOOGLE_CLIENT_EMAIL.trim().replace(/^["']|["']$/g, ''),
          private_key: privateKey,
          project_id: process.env.GOOGLE_PROJECT_ID?.trim().replace(/^["']|["']$/g, '') || "",
        };
      } else if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        let cleanedJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON.trim();
        if (cleanedJson.startsWith("'") && cleanedJson.endsWith("'")) {
          cleanedJson = cleanedJson.substring(1, cleanedJson.length - 1);
        }

        try {
          credentials = JSON.parse(cleanedJson);
        } catch (e) {
          if (cleanedJson.includes('\\"')) {
            const repaired = cleanedJson.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            credentials = JSON.parse(repaired);
          } else {
            throw e;
          }
        }

        if (credentials.private_key) {
          credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
        }
      } else {
        throw new Error("No Google credentials found (check GOOGLE_CLIENT_EMAIL or GOOGLE_SERVICE_ACCOUNT_JSON)");
      }

      cachedAuth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
    } catch (error: any) {
      console.error("Google Auth Setup Failed:", error.message);
      throw new Error(`Auth Configuration Error: ${error.message}`);
    }
  }

  return cachedAuth;
}

export async function appendRegistration(row: string[]): Promise<void> {
  const spreadsheetId = process.env.SHEET_ID;

  if (!spreadsheetId) {
    console.error("DEBUG: SHEET_ID is missing from environment");
    throw new Error("Configuration error: SHEET_ID is missing");
  }

  const auth = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Registrations!A:N", // Updated to A:N for 14 columns
      valueInputOption: "RAW",
      requestBody: {
        values: [row],
      },
    });
  } catch (error: any) {
    console.error("Sheets API call failed:", error.message);
    throw error;
  }
}

export async function appendAffiliate(row: string[]): Promise<void> {
  const spreadsheetId = process.env.SHEET_ID;

  if (!spreadsheetId) {
    throw new Error("Configuration error: SHEET_ID is missing");
  }

  const auth = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Affiliates!A:F",
      valueInputOption: "RAW",
      requestBody: {
        values: [row],
      },
    });
  } catch (error: any) {
    console.error("Sheets API call failed:", error.message);
    throw error;
  }
}

export async function getAffiliateCoupons(): Promise<string[]> {
  const spreadsheetId = process.env.SHEET_ID;

  if (!spreadsheetId) {
    console.error("DEBUG: SHEET_ID is missing from environment");
    return [];
  }

  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Affiliates!F:F", // Assuming CouponCode is the 6th column (A=1, B=2, C=3, D=4, E=5, F=6)
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // Return all values from column F, excluding the header (index 0) if it exists, and empty rows.
    return rows.map((row) => row[0]).filter((code) => typeof code === 'string' && code.trim().length > 0);
  } catch (error: any) {
    console.error("Failed to fetch affiliate coupons:", error.message);
    return [];
  }
}

