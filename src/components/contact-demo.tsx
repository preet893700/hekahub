"use client";

import { Contact } from "@/components/ui/contact";

export default function ContactDemo() {
  const benefits = [
    "Improve usability of your product",
    "Engage users at a higher level and outperform your competition",
    "Reduce the onboarding time and improve sales",
    "Balance user needs with your business goal",
  ];

  const locations = [
    {
      country: "India",
      address: ["Banjara Hills, Road No 10", "Hyderabad, 500034"],
    },
    {
      country: "UAE",
      address: ["Dubai Internet City", "Dubai, UAE 00000"],
    },
  ];

  const contactInfo = {
    email: "hello@hekahub.com",
    phone: "+91 98765 43210",
  };

  return (
    <Contact
      label="CONTACT US"
      title="Get in touch with us"
      subtitle="Fill out the form below or schedule a meeting with us at your convenience."
      benefits={benefits}
      locations={locations}
      contactInfo={contactInfo}
    />
  );
}
