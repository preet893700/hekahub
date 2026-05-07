"use client";

import { Pricing } from "@/components/ui/pricing";

export default function PricingDemo() {
  const bespokePlan = {
    name: "Group Booking?",
    description: "Custom plans for schools, organisations & cohorts. Let's build something together.",
    buttonText: "LET'S TALK",
  };

  const plans = [
    {
      name: "Summer Bootcamp",
      description: "The focused sprint that turns curiosity into real AI skills — in just 8 weeks.",
      features: [
        "8 weeks of intensive AI learning",
        "160+ hours of immersive sessions",
        "40 classes · 4 hours each",
        "Weekly newsletter",
        "Completion reward kit",
        "Certificate of completion",
        "Free trial classes upon request"
      ],
      originalPrice: "1,999",
      earlyBirdPrice: "600",
      registrationFee: "99",
      buttonText: "ENROLL NOW",
      isPopular: false,
      subPrices: [
        { price: " 25", unit: "/ 4 hour class" },
        { price: " 100", unit: "/ week" },
        { price: " 350", unit: "/ month" },
        { price: " 600", unit: "/ bootcamp", originalPrice: "1,999" },
      ],
    },
    {
      name: "Annual Membership",
      description: "All bootcamps. All resources. All year — for the learner who never stops.",
      features: [
        "All seasonal bootcamps",
        "320+ hours of AI learning",
        "Crash Course Library access",
        "Live guest expert sessions",
        "Brain-first AI infographics",
        "Weekly newsletter",
        "Completion reward kit",
        "Certificate of completion",
        "Exclusive welcome enrollment gift",
      ],
      originalPrice: "4,999",
      earlyBirdPrice: "1100",
      registrationFee: "99",
      buttonText: "ENROLL NOW",
      isPopular: true,
    },
  ];

  return (
    <Pricing
      title="PRICING"
      description="Don't just learn AI — build it. Choose the path that fits your ambition, from a summer sprint to a full year of breakthroughs."
      monthlyLabel="Summer Bootcamp"
      annualLabel="Annual Membership"
      bespokePlan={bespokePlan}
      plans={plans}
    />
  );
}
