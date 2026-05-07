import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? "";
  
  // Individual variables
  const rawEmail = process.env.GOOGLE_CLIENT_EMAIL ?? "not set";
  const rawKey = process.env.GOOGLE_PRIVATE_KEY ?? "not set";
  const rawProject = process.env.GOOGLE_PROJECT_ID ?? "not set";
  const rawSheet = process.env.SHEET_ID ?? "not set";
  const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "not set";

  // Processed key (what the code actually tries to use)
  let processedKey = rawKey;
  const startMarker = "-----BEGIN PRIVATE KEY-----";
  const endMarker = "-----END PRIVATE KEY-----";
  
  if (processedKey.includes(startMarker) && processedKey.includes(endMarker)) {
    const start = processedKey.indexOf(startMarker);
    const end = processedKey.indexOf(endMarker) + endMarker.length;
    processedKey = processedKey.substring(start, end);
  }
  
  processedKey = processedKey.replace(/\\+n/g, '\n').trim();

  const debugInfo = {
    service: "DANGER - Full Credentials Debugger",
    note: "This exposes private keys. Delete this file after troubleshooting.",
    timestamp: new Date().toISOString(),
    
    // 1. Raw values exactly as they come from process.env
    rawEnvironment: {
      GOOGLE_CLIENT_EMAIL: rawEmail,
      GOOGLE_PRIVATE_KEY: rawKey,
      GOOGLE_PROJECT_ID: rawProject,
      SHEET_ID: rawSheet,
      NEXT_PUBLIC_BASE_URL: rawBaseUrl,
      GOOGLE_SERVICE_ACCOUNT_JSON: rawJson
    },

    // 2. How the key looks after processing
    processedKeyInfo: {
      length: processedKey.length,
      startsWithHeader: processedKey.startsWith("-----BEGIN PRIVATE KEY-----"),
      endsWithFooter: processedKey.endsWith("-----END PRIVATE KEY-----\n") || processedKey.endsWith("-----END PRIVATE KEY-----"),
      first50Chars: processedKey.substring(0, 50),
      last50Chars: processedKey.substring(processedKey.length - 50),
      hasActualNewlines: processedKey.includes('\n'),
      hasLiteralBackslashN: processedKey.includes('\\n')
    },

    // 3. Metadata
    envVarsFound: {
      EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
      KEY: !!process.env.GOOGLE_PRIVATE_KEY,
      PROJECT: !!process.env.GOOGLE_PROJECT_ID,
      JSON: !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    }
  };

  return NextResponse.json(debugInfo, { status: 200 });
}
