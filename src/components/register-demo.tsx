"use client";

import { Register } from "@/components/ui/register";

// ─────────────────────────────────────────────
// All copy / config lives here — edit freely
// ─────────────────────────────────────────────
export default function RegisterDemo({ referralCode }: { referralCode?: string }) {
  return (
    <Register
      lockedReferralCode={referralCode}
      label="AI MASTERY PROGRAM 2026"
      title="Master AI & Build the Future"
      subtitle="Flexible Weekday and Weekend batches for Kids, College Students, and Professionals. Start your journey into Engineered Intelligence today."
      ageGroupOptions={["Kids", "Teens", "College Students", "Professionals"]}
      batchOptions={[
        {
          value: "us",
          label: "USA Batch",
          sublabel: "10:30 AM – 2:30 PM CST  ·  4:30 PM – 8:30 PM BST",
        },
        {
          value: "india",
          label: "India Batch",
          sublabel: "10:30 AM – 2:30 PM IST  ·  6:00 AM – 10:00 AM BST",
        },
        {
          value: "uk",
          label: "UK Batch",
          sublabel: "10:30 AM – 2:30 PM BST  ·  3:00 PM – 7:00 PM IST",
        },
        {
          value: "other",
          label: "Request a batch",
          sublabel: "Connect with us over call to discuss best time for your group.",
        },
      ]}
      referralOptions={["Social Media", "School", "Friend", "Ads", "Affiliate", "Other"]}
      consentText="I agree to receive updates regarding the program"
      submitLabel="ENROLL IN PROGRAM"
      successMessage="🎉 Your request for registration is received! We'll contact you shortly."
      toastPrerequisite="💻 A laptop is mandatory for this hands-on bootcamp. Please ensure your child has access to one before the program begins."
      contactInfo={{
        email: "register@hekahub.com",
        phone: "+91 92353 27048",
      }}
      onSubmit={async (data) => {

        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            website: "", // honeypot field — always empty for real users
          }),
        });

        if (!res.ok) {
          let errorMessage = "Registration failed";
          try {
            const err = await res.json();
            if (err.details?.fieldErrors) {
              const firstField = Object.keys(err.details.fieldErrors)[0];
              if (firstField && err.details.fieldErrors[firstField].length > 0) {
                errorMessage = err.details.fieldErrors[firstField][0];
              } else {
                errorMessage = err.error ?? errorMessage;
              }
            } else {
              errorMessage = err.error ?? errorMessage;
            }
          } catch (e) {
            // If JSON parsing fails, it's likely an HTML error page from the server
            const text = await res.text();
            console.error("Server returned non-JSON response:", text);
            errorMessage = `Server Error (${res.status}): Please check if the API route is working.`;
          }
          throw new Error(errorMessage);
        }
      }}
    />
  );
}
