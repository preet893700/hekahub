import { notFound } from "next/navigation";
import { getAffiliateCoupons } from "@/lib/sheets";
import Home from "../page";

interface PageProps {
  params: Promise<{ referralCode: string }>;
}

export const revalidate = 1800; // Revalidate the list of coupons every 30 minutes

/**
 * Affiliate Dynamic Route
 * 
 * This page captures any top-level path segment as a referral code
 * and validates it against the "Affiliates" Google Sheet. If valid, 
 * it passes it to the main Home component. If invalid, it returns a 404.
 */
export default async function AffiliatePage({ params }: PageProps) {
  const { referralCode } = await params;
  
  // Sanitize the referral code for basic security
  const sanitizedCode = referralCode.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 50).toUpperCase();

  try {
    const validCoupons = await getAffiliateCoupons();
    
    // Normalize valid coupons to uppercase for comparison
    const normalizedCoupons = validCoupons.map(c => c.toUpperCase());

    if (!normalizedCoupons.includes(sanitizedCode)) {
      notFound();
    }
  } catch (error) {
    console.error("Failed to validate referral code:", error);
    notFound();
  }

  return <Home referralCode={sanitizedCode} />;
}
