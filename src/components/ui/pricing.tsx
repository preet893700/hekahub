"use client";

import React, { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export interface PricingPlan {
  name: string;
  isPopular?: boolean;
  description: string;
  features: string[];
  originalPrice: string;
  earlyBirdPrice: string;
  registrationFee: string;
  buttonText: string;
  subPrices?: {
    price: string;
    unit: string;
    originalPrice?: string;
  }[];
}

export interface BespokePlan {
  name: string;
  description: string;
  buttonText: string;
}

export interface PricingProps {
  title: string;
  description: string;
  bespokePlan: BespokePlan;
  plans: PricingPlan[];
}

export function Pricing({
  title = "PRICING",
  description = "From launch to scale, we've got you covered at every stage.",
  bespokePlan,
  plans,
}: PricingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // Use 1024px for wide card breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleWhatsApp = (type: "weekly" | "bulk") => {
    const phone = "9235327048";
    let message = "";
    if (type === "weekly") {
      message =
        "Hi HekaHub! I'm interested in the Weekly AI Classes. I'd love to learn more about how students build a project every week and the details of the weekly showcases. Could you share more info?";
    } else {
      message =
        "Hi HekaHub! I'm interested in Bulk Booking for our group/organization. We'd like to discuss a customized plan and curriculum for our students. Let's connect!";
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleEnroll = () => {
    const element = document.getElementById("register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextPlan = () => setCurrentIndex((prev) => Math.min(prev + 1, plans.length - 1));
  const prevPlan = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) {
      nextPlan();
    } else if (offset > 50 || velocity > 500) {
      prevPlan();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextPlan();
      if (e.key === "ArrowLeft") prevPlan();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [plans.length]);

  return (
    <div className="flex flex-col gap-10 md:gap-14 w-full max-w-[1600px] mx-auto overflow-visible relative">
      {/* ── Header Row ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-xl">
          <h2 className="font-bebas text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wide uppercase m-0 text-white">
            {title}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base lg:text-lg mt-4 font-inter">
            {description}
          </p>
        </div>

        {/* Group Booking (Secondary CTA) */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-5 md:p-6 flex flex-col gap-3 min-w-[300px] max-w-sm shrink-0 shadow-xl shadow-black/50">
          <div>
            <h3 className="text-lg md:text-xl font-inter font-semibold m-0 text-white">
              {bespokePlan.name}
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm mt-1.5 leading-relaxed">
              {bespokePlan.description}
            </p>
          </div>
          <button
            onClick={() => handleWhatsApp("bulk")}
            className="px-5 py-2.5 rounded-full bg-transparent border border-[#333] text-[#ff4500] text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:border-[#ff4500] hover:bg-[#ff4500]/5 self-start mt-2"
          >
            {bespokePlan.buttonText}
          </button>
        </div>
      </div>

      {/* ── Tabs / Pills ────────────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center pb-4 pt-2 gap-2 md:gap-3 px-4 md:px-8 w-full max-w-7xl mx-auto">
        {plans.map((plan, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "px-3.5 py-1.5 md:px-6 md:py-3 rounded-xl md:rounded-full text-[0.7rem] sm:text-xs md:text-base font-semibold md:font-medium transition-all duration-500 whitespace-nowrap border outline-none focus-visible:ring-2 focus-visible:ring-[#ff4500] relative overflow-hidden group",
                isActive
                  ? "bg-[#ff4500] text-white border-[#ff4500] shadow-[0_0_20px_rgba(255,69,0,0.3)]"
                  : "bg-transparent text-white/80 border-white/20 hover:text-[#ff4500] hover:border-[#ff4500]/50 hover:bg-[#ff4500]/5"
              )}
            >
              <span className="relative z-10">{plan.name}</span>
            </button>
          );
        })}
      </div>

      {/* ── Cinematic Carousel (Wide Bento Cards) ──────────────────── */}
      <div className="relative h-[800px] md:h-[540px] lg:h-[480px] w-full flex items-center justify-center perspective-[2500px] mt-4 mb-16 md:mb-8">
        {plans.map((plan, idx) => {
          const isActive = idx === currentIndex;
          const diff = idx - currentIndex;
          const isVisible = Math.abs(diff) <= 2;

          if (!isVisible) return null;

          const getX = () => {
            if (diff === 0) return "0%";
            if (diff === -1) return isMobile ? "-105%" : "-65%";
            if (diff === 1) return isMobile ? "105%" : "65%";
            if (diff === -2) return isMobile ? "-210%" : "-130%";
            if (diff === 2) return isMobile ? "210%" : "130%";
            return "0%";
          };

          const getScale = () => {
            if (diff === 0) return 1;
            if (Math.abs(diff) === 1) return isMobile ? 0.95 : 0.85;
            return isMobile ? 0.9 : 0.75;
          };

          const getRotateY = () => {
            if (isMobile) return 0;
            if (diff === 0) return 0;
            if (diff === -1) return 12;
            if (diff === 1) return -12;
            if (diff === -2) return 20;
            if (diff === 2) return -20;
            return 0;
          };

          const getZIndex = () => {
            if (diff === 0) return 30;
            if (Math.abs(diff) === 1) return 20;
            return 10;
          };

          return (
            <motion.div
              key={idx}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              animate={{
                x: getX(),
                scale: getScale(),
                opacity: diff === 0 ? 1 : Math.abs(diff) === 1 ? 0.4 : 0,
                rotateY: getRotateY(),
                zIndex: getZIndex(),
                filter: diff === 0 ? "blur(0px) brightness(1)" : "blur(4px) brightness(0.5)",
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 25,
                mass: 0.8,
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
              className={cn(
                "absolute w-[92vw] md:w-[660px] lg:w-[720px] xl:w-[780px] h-full rounded-[2rem] cursor-grab active:cursor-grabbing",
                "bg-[#050505] border border-[#222] overflow-hidden",
                isActive ? "shadow-[0_20px_60px_-15px_rgba(255,69,0,0.3)] ring-1 ring-[#ff4500]/50" : "shadow-2xl"
              )}
            >
              {/* Premium Top Highlight */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff4500] to-transparent opacity-80 z-50" />
              )}

              <div className="w-full h-full p-2 md:p-3 flex flex-col md:flex-row gap-2 md:gap-3 pointer-events-none">

                {/* ── LEFT BENTO: Header + Features ── */}
                <div className="md:w-[40%] lg:w-[38%] flex flex-col bg-[#111] border border-[#222] rounded-[1.25rem] p-4 md:p-5 relative overflow-hidden h-full">
                  <h3 className="text-2xl md:text-3xl font-bebas tracking-wide m-0 text-white flex items-center gap-3 relative z-10">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex-1 overflow-y-auto no-scrollbar mask-image-b relative z-10">
                    <ul className="flex flex-col gap-3 text-zinc-300 text-sm md:text-[0.85rem]">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#ff4500] shrink-0 opacity-80 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Subtle background glow for active card */}
                  {isActive && (
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#ff4500] rounded-full blur-[100px] opacity-10 pointer-events-none" />
                  )}
                </div>

                {/* ── RIGHT BENTO GRID ── */}
                <div className="flex-1 md:w-[60%] lg:w-[62%] flex flex-col gap-2 md:gap-3 h-full">

                  {/* Top Row: Description & Enroll */}
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 flex-none md:flex-[0.8]">

                    {/* Small Bento 1: Description */}
                    <div className="flex-[1.4] lg:flex-[1.5] bg-[#111] border border-[#222] rounded-[1.25rem] p-4 flex items-center justify-center sm:justify-start text-center sm:text-left">
                      <p className="text-zinc-400 text-xs md:text-sm lg:text-[0.9rem] leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Small Bento 2: Enroll Button */}
                    <div className="flex-1 bg-[#111] border border-[#222] rounded-[1.25rem] p-4 flex flex-col items-center justify-center gap-2">
                      <button
                        disabled={!isActive}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnroll();
                        }}
                        className={cn(
                          "w-full py-3 px-4 rounded-full font-bold tracking-wide uppercase transition-all duration-300 pointer-events-auto text-[0.8rem]",
                          isActive
                            ? "bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/10"
                            : "bg-[#1a1a1a] text-zinc-500 border border-[#333] cursor-not-allowed"
                        )}
                      >
                        {plan.buttonText}
                      </button>
                      <span className="text-[0.55rem] text-zinc-500 uppercase tracking-widest font-semibold mt-1">Secure your spot</span>
                    </div>

                  </div>

                  {/* Bottom Row: Pricing Details */}
                  <div className="bg-[#111] border border-[#222] rounded-[1.25rem] p-4 md:px-5 flex-1 flex flex-col justify-center relative overflow-hidden">
                    <div className="inline-flex items-center gap-2 bg-[#ff4500]/10 border border-[#ff4500]/30 rounded-full px-2.5 py-1 mb-3 self-start relative z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500] animate-pulse" />
                      <span className="text-[0.6rem] text-[#ff4500] font-bold tracking-widest uppercase font-inter">
                        Early Bird Offer
                      </span>
                    </div>

                    <div className="relative z-10">
                      {plan.subPrices ? (
                        <div className="flex flex-col">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                            {plan.subPrices.map((sub, sIdx) => (
                              <div key={sIdx} className="flex items-baseline gap-1.5 text-white font-inter">
                                <span className="text-xs font-bold text-zinc-500">$</span>
                                <span className="font-bold text-xl lg:text-2xl tracking-tight">
                                  {sub.price.trim()}
                                </span>
                                <span className="text-[0.7rem] lg:text-xs text-zinc-400 ml-1">{sub.unit}</span>
                                {sub.originalPrice && (
                                  <span className="text-[0.7rem] text-zinc-600 line-through decoration-zinc-600 decoration-1 ml-2">
                                    ${sub.originalPrice}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="text-[0.65rem] text-zinc-500 font-inter mt-3 pt-3 border-t border-[#222]/50 inline-flex items-center gap-1.5">
                            <span className="text-[#ff4500]">+</span> <span className="text-zinc-300 font-medium">${plan.registrationFee}</span> registration fee
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex flex-wrap items-baseline gap-2 text-white font-inter">
                            <span className="text-lg md:text-xl text-zinc-500 font-bold">$</span>
                            <span className="text-3xl lg:text-5xl font-bold tracking-tighter">
                              {plan.earlyBirdPrice}
                            </span>
                            <div className="flex items-center gap-2 ml-2">
                              <span className="text-xs lg:text-sm text-zinc-400">/ seat</span>
                              <span className="text-xs lg:text-sm text-zinc-600 line-through decoration-zinc-600 decoration-1">
                                ${plan.originalPrice}
                              </span>
                            </div>
                          </div>
                          <div className="text-[0.65rem] md:text-xs text-zinc-500 font-inter mt-3 pt-3 border-t border-[#222]/50 inline-flex items-center gap-1.5">
                            <span className="text-[#ff4500]">+</span> <span className="text-zinc-300 font-medium">${plan.registrationFee}</span> registration fee
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}

        {/* ── Desktop Side Navigation Arrows ────────────────────────────── */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between items-center px-4 lg:px-12 xl:px-20 z-40 pointer-events-none">
          <button
            onClick={prevPlan}
            disabled={currentIndex === 0}
            className="p-4 rounded-full border border-[#333] bg-[#0a0a0a]/80 backdrop-blur-md text-white disabled:opacity-0 transition-all duration-300 hover:bg-[#222] hover:scale-110 active:scale-90 pointer-events-auto shadow-2xl"
            aria-label="Previous Plan"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextPlan}
            disabled={currentIndex === plans.length - 1}
            className="p-4 rounded-full border border-[#333] bg-[#0a0a0a]/80 backdrop-blur-md text-white disabled:opacity-0 transition-all duration-300 hover:bg-[#222] hover:scale-110 active:scale-90 pointer-events-auto shadow-2xl"
            aria-label="Next Plan"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* ── Mobile Nav & Desktop Dots ──────────────────────────────── */}
        <div className="absolute -bottom-8 md:-bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 z-40">
          <button
            onClick={prevPlan}
            disabled={currentIndex === 0}
            className="md:hidden p-3 rounded-full border border-[#333] bg-[#0a0a0a]/80 backdrop-blur-md text-white disabled:opacity-20 transition-all hover:bg-[#222] hover:scale-110 active:scale-90"
            aria-label="Previous Plan"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2.5">
            {plans.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  idx === currentIndex ? "w-8 bg-white" : "w-1.5 bg-[#444] hover:bg-[#666]"
                )}
                aria-label={`Go to plan ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextPlan}
            disabled={currentIndex === plans.length - 1}
            className="md:hidden p-3 rounded-full border border-[#333] bg-[#0a0a0a]/80 backdrop-blur-md text-white disabled:opacity-20 transition-all hover:bg-[#222] hover:scale-110 active:scale-90"
            aria-label="Next Plan"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}