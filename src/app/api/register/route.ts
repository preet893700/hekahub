import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { appendRegistration } from "@/lib/sheets";

export const dynamic = "force-dynamic";

const PROGRAM_LABELS: Record<string, string> = {
  bootcamp: "Summer Bootcamp",
  annual: "Annual Membership",
  weekday: "Weekday Batch",
  weekend: "Weekend Batch",
};

const registerSchema = z.object({
  fullName: z.string().min(2).max(100).trim(),
  email: z.string().email().max(200).toLowerCase().trim(),
  countryCode: z.string().regex(/^\+\d{1,4}$/),
  phone: z.string().min(6).max(15).regex(/^[\d\s]+$/),
  city: z.string().max(100).optional().transform((v) => v?.trim() || ""),
  studentName: z.string().min(2).max(100).trim(),
  grade: z.string().min(1),
  programType: z.enum(["bootcamp", "annual", "weekday", "weekend"]),
  batchTiming: z.string().min(1).max(200).trim(),
  referralSource: z.enum(["Social Media", "School", "Friend", "Ads", "Other"]),
  referralName: z.string().max(100).optional().transform((v) => v?.trim() || ""),
  consentUpdates: z.literal(true),
  website: z.string().optional(), // Honeypot field
});

export async function POST(req: NextRequest) {
  // 1. Rate Limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  const { success, resetAt } = rateLimit(ip);
  if (!success) {
    const waitMinutes = resetAt ? Math.ceil((resetAt - Date.now()) / 60000) : 60;
    return NextResponse.json(
      { error: `Too many requests. Please try again in ${waitMinutes} minutes.` },
      { status: 429 }
    );
  }

  // 2. Input Parsing
  let body;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // 3. Validation
  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const data = result.data;

  // 4. Honeypot Check (after validation)
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 5. Row Construction
  const row = [
    data.fullName,                          // A: Parent's Full Name
    `${data.countryCode} ${data.phone}`,     // B: Phone Number
    data.email,                             // C: Email Address
    data.city,                              // D: City / Location
    data.studentName,                       // E: Student's Full Name
    PROGRAM_LABELS[data.programType],       // F: Program Type
    data.batchTiming,                       // G: Preferred Batch Timing
    data.grade,                             // H: Grade
    data.referralSource,                    // I: How did you hear about us?
    data.referralName,                      // J: Referral Name
  ];

  // 6. Sheet Write
  try {
    await appendRegistration(row);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error: any) {
    console.error("Registration submission failed:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to save registration" },
      { status: 500 }
    );
  }
}

// 7. Method Guard & Health Check
export async function GET(req: NextRequest) {
  let credentialsValid = false;
  try {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      credentialsValid = true;
    }
  } catch (e) {
    credentialsValid = false;
  }

  const status = {
    service: "Registration API",
    status: "active",
    config: {
      hasSheetId: !!process.env.SHEET_ID,
      hasCredentials: !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
      isCredentialsValid: credentialsValid,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.get("host")}` || req.nextUrl.origin,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(status, { status: 200 });
}
