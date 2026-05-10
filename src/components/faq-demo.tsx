"use client";

import { FAQ } from "@/components/ui/faq";

export default function FAQDemo() {
  const faqs = [
    {
      question: "Who is this program for?",
      answer: "HekaHub is designed for curious minds of all ages—from Kids (10+) and Teens to College Students and Working Professionals. Our curriculum is tailored to bridge the gap between curiosity and professional-grade AI engineering.",
    },
    {
      question: "How is the curriculum structured?",
      answer: "The program follows a mastery-based roadmap across 8 intensive modules. It's designed to take you on a progressive journey, moving from foundational AI logic to building complex, intelligent systems and a founder-level capstone project.",
    },
    {
      question: "Do I need any prior technical or coding background?",
      answer: "Not at all. We teach AI from first principles. If you can use a computer and have a problem-solving mindset, you can master AI. Our mentors handle the technical heavy lifting, guiding you through every line of code.",
    },
    {
      question: "What is the difference between the intensive batches and Annual Membership?",
      answer: "The intensive batches (Weekday/Weekend) are focused 52-week tracks for deep mastery. The Annual Membership provides an all-access pass to all seasonal bootcamps, guest expert sessions, and our full library of AI resources for the entire year.",
    },
    {
      question: "Is a laptop mandatory for the workshop?",
      answer: "Yes. This is a hands-on, build-first program. To participate in engineering sessions and project work, a laptop is essential for every learner.",
    },
    {
      question: "Will I receive a certificate upon completion?",
      answer: "Absolutely! Upon successful completion of the program and the final project showcase, you will receive the **HekaHub Certificate** to recognize your technical mastery and ability to build lean AI solutions.",
    },
    {
      question: "How does this program help with my career or college profile?",
      answer: "Beyond coding, we focus on portfolio building. By the end of the program, you will have 20+ real-world projects to showcase, demonstrating your technical mastery and problem-solving skills to employers, universities, and investors.",
    },
    {
      question: "Are there different batches for different time zones?",
      answer: "Yes, we offer specialized batches for India, the USA, and the UK. You can select the batch that best fits your schedule during the registration process.",
    },
    {
      question: "How do I secure the Early Bird pricing?",
      answer: "Simply register through our enrollment form. Our team will reach out to you via Email with the payment details and the next steps to secure your spot in the upcoming cohort and lock in the Early Bird rate.",
    },
  ];


  return (
    <FAQ
      title="Frequently Asked Questions"
      description="Can't find what you're looking for? Reach out to us directly."
      actionText="Contact Us"
      actionLink={`https://wa.me/919235327048?text=${encodeURIComponent("Hi HekaHub! I have some questions about the AI Master Roadmap. Can you help me?")}`}

      faqs={faqs}
    />
  );
}
