import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { appendAffiliate } from "@/lib/sheets";

export const dynamic = "force-dynamic";

const affiliateSchema = z.object({
  fullName: z.string().min(2, "Full name is not valid").max(100).trim(),
  email: z.string().email("Email is not valid").max(200).toLowerCase().trim(),
  countryCode: z.string().regex(/^\+\d{1,4}$/, "Country code is not valid"),
  phone: z.string().min(10, "Phone number is not valid").max(15, "Phone number is not valid").regex(/^[\d\s\-\.\(\)]+$/, "Phone number is not valid"),
  promotionMethod: z.string().max(200).optional().transform((v) => v?.trim() || ""),
  couponCode: z.string().min(1).max(50).trim(),
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
  const result = affiliateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const data = result.data;

  // 4. Honeypot Check
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 5. Row Construction: Timestamp, FullName, Email, Phone, PromotionMethod, CouponCode
  
  // Helper to format date like "12th May, 8:50 AM IST"
  const getFormattedISTDate = () => {
    const now = new Date();
    const day = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric" });
    const month = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", month: "short" });
    
    const getOrdinalNum = (n: number) => {
      return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    };
    
    const time = now.toLocaleString("en-IN", { 
      timeZone: "Asia/Kolkata", 
      hour: "numeric", 
      minute: "2-digit", 
      hour12: true 
    }).toUpperCase();
    
    return `${getOrdinalNum(parseInt(day))} ${month}, ${time} IST`;
  };

  const timestamp = getFormattedISTDate();
  const phoneFull = `${data.countryCode} ${data.phone}`;
  
  const row = [
    timestamp,
    data.fullName,
    data.email,
    phoneFull,
    data.promotionMethod,
    data.couponCode
  ];

  // 6. Sheet Write
  try {
    await appendAffiliate(row);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error: any) {
    console.error("Affiliate submission failed:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to save affiliate" },
      { status: 500 }
    );
  }
}
