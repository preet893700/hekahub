"use client";

import { FAQ } from "@/components/ui/faq";

export default function FAQDemo() {
  const faqs = [
    {
      question: "Who is this program for?",
      answer: "It's designed for students aged 10-15 who are curious about the future. No prior coding experience is required—we start from the absolute basics and build up to advanced AI logic.",
    },
    {
      question: "How is the 8-week curriculum structured?",
      answer: "The program follows our unique Orbital Curriculum across 40 intensive classes. It's designed to take students on a progressive journey, moving from foundational AI concepts to building complex, intelligent systems.",
    },
    {
      question: "Do parents need a technical background to support their children?",
      answer: "Not at all. The program is fully mentored by experts who handle the technical heavy lifting. Parents can simply watch their children transform into confident AI creators.",
    },
    {
      question: "What is the difference between the Summer Bootcamp and Annual Membership?",
      answer: "The Summer Bootcamp is an intensive 8-week launchpad. The Annual Membership is a long-term commitment to excellence, providing access to all seasonal bootcamps, guest expert sessions, and our full library of AI resources for the entire year.",
    },
    {
      question: "Is a laptop mandatory for the workshop?",
      answer: "Yes. This is a hands-on, build-first program. To participate in coding sessions and project work, a laptop is essential for every student.",
    },
    {
      question: "What is 'Zero-Cost Innovation' and why do we teach it?",
      answer: "We teach students how to build high-impact AI products using powerful free-tier APIs. This 'Zero-Cost Innovation' approach ensures they can continue to build and experiment independently without worrying about expensive subscriptions.",
    },
    {
      question: "Will students receive a certificate upon completion?",
      answer: "Absolutely! Upon successful completion of the program and the final project showcase, students receive a HekaHub Certificate of AI Excellence to recognize their technical achievements.",
    },
    {
      question: "How does this program help with a student's future profile?",
      answer: "Beyond coding, we focus on portfolio building. By the end of the program, students will have 20+ real-world projects to showcase, demonstrating their technical mastery and problem-solving skills to schools and future opportunities.",
    },
    {
      question: "Are there different batches for different time zones?",
      answer: "Yes, we offer specialized batches for India, the USA, and the UK. You can select the batch that best fits your schedule during the registration process.",
    },
    {
      question: "How do I secure the Early Bird pricing and complete enrollment?",
      answer: "Simply register through our enrollment form. Our team will reach out to you via Email with the payment details and the next steps to secure your spot in the upcoming cohort.",
    },
  ];


  return (
    <FAQ
      title="Frequently Asked Questions"
      description="Can't find what you're looking for? Reach out to us directly."
      actionText="Contact Us"
      actionLink="mailto:register@hekahub.com"

      faqs={faqs}
    />
  );
}
