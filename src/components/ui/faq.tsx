"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current?.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className="border-b border-white/10 overflow-hidden transition-colors duration-300 bg-transparent"
    >
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span 
          className="transition-colors duration-300"
          style={{ 
            fontFamily: 'var(--font-inter)', 
            fontSize: '1.125rem', 
            color: isOpen ? 'var(--color-accent)' : '#fff', 
            fontWeight: 500 
          }}
        >
          {question}
        </span>
        <span className={cn(
          "flex-shrink-0 ml-4 transition-transform duration-300",
          isOpen ? "text-[var(--color-accent)] rotate-180" : "text-white/40"
        )}>
          <ChevronDown size={20} />
        </span>
      </button>
      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ height: height !== undefined ? height : 0, opacity: isOpen ? 1 : 0 }}
      >
        <div ref={contentRef} className="pb-6 pt-0">
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface FAQData {
  question: string;
  answer: string;
}

export interface FAQProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionLink?: string;
  faqs: FAQData[];
}

export function FAQ({
  title = "Frequently Asked Questions",
  description = "Didn't find the right answer? Contact us to ask your own",
  actionText = "Contact Us",
  actionLink = "#",
  faqs,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midPoint);
  const rightColumnFaqs = faqs.slice(midPoint);

  return (
    <div className="flex flex-col gap-12 max-w-7xl mx-auto px-4 py-20">
      
      {/* Header Section - Centered */}
      <div className="flex flex-col items-center text-center space-y-6">
        <h2 style={{ 
          fontFamily: 'var(--font-bebas-neue)', 
          fontSize: 'clamp(3rem, 8vw, 6rem)', 
          margin: 0, 
          lineHeight: 1, 
          letterSpacing: '1px', 
          color: '#fff' 
        }}>
          {title}
        </h2>
        <p style={{ 
          color: 'var(--color-text-muted)', 
          fontSize: '1.125rem', 
          maxWidth: '600px',
          fontFamily: 'var(--font-inter)' 
        }}>
          {description}
        </p>
        
        <a 
          href={actionLink} 
          className="group flex items-center gap-2 px-8 py-3 bg-[var(--color-accent)] text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[var(--color-accent)]/20"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {actionText}
          <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* FAQ Items - Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 items-start mt-8">
        {/* Left Column */}
        <div className="flex flex-col">
          {leftColumnFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          {rightColumnFaqs.map((faq, index) => (
            <FAQItem
              key={index + midPoint}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index + midPoint}
              onClick={() => toggleFAQ(index + midPoint)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
