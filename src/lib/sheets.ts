import { google } from "googleapis";

// Module-level cache for auth client
let cachedAuth: any = null;

export async function appendRegistration(row: string[]): Promise<void> {
  const spreadsheetId = process.env.SHEET_ID;

  if (!spreadsheetId) {
    console.error("DEBUG: SHEET_ID is missing from environment");
    throw new Error("Configuration error: SHEET_ID is missing");
  }

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
        // console.log("DEBUG: Using individual Google credentials");

        let privateKey = process.env.GOOGLE_PRIVATE_KEY;

        // 1. Find the exact start and end of the PEM block to ignore extra quotes/junk
        const startMarker = "-----BEGIN PRIVATE KEY-----";
        const endMarker = "-----END PRIVATE KEY-----";

        if (privateKey.includes(startMarker) && privateKey.includes(endMarker)) {
          const start = privateKey.indexOf(startMarker);
          const end = privateKey.indexOf(endMarker) + endMarker.length;
          privateKey = privateKey.substring(start, end);
        }

        // 2. Robust newline replacement (handles \\n, \\\\n, etc.)
        privateKey = privateKey.replace(/\\+n/g, '\n').trim();

        credentials = {
          client_email: process.env.GOOGLE_CLIENT_EMAIL.trim().replace(/^["']|["']$/g, ''),
          private_key: privateKey,
          project_id: process.env.GOOGLE_PROJECT_ID?.trim().replace(/^["']|["']$/g, '') || "",
        };
      } else if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        // 2. Fallback to parsing the full JSON string if individual keys aren't set
        // console.log("DEBUG: Falling back to JSON string parsing");
        let cleanedJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON.trim();
        if (cleanedJson.startsWith("'") && cleanedJson.endsWith("'")) {
          cleanedJson = cleanedJson.substring(1, cleanedJson.length - 1);
        }

        try {
          credentials = JSON.parse(cleanedJson);
        } catch (e) {
          // Final attempt for double-escaped strings
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

  const sheets = google.sheets({ version: "v4", auth: cachedAuth });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Registrations!A:J", // Fixed: A to J matches your 10 columns
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
