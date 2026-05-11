import Home from "../page";

interface PageProps {
  params: Promise<{ referralCode: string }>;
}

/**
 * Affiliate Dynamic Route
 * 
 * This page captures any top-level path segment as a referral code
 * and passes it to the main Home component to pre-fill the registration form.
 */
export default async function AffiliatePage({ params }: PageProps) {
  const { referralCode } = await params;
  
  // Sanitize the referral code for basic security
  const sanitizedCode = referralCode.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 50);

  return <Home referralCode={sanitizedCode} />;
}
