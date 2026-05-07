"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

export interface PricingFeature {
  text: string;
}

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
  monthlyLabel?: string;
  annualLabel?: string;
  annualDiscount?: string;
  bespokePlan: BespokePlan;
  plans: PricingPlan[];
}

export function Pricing({
  title = "PRICING",
  description = "From launch to scale, we've got you covered at every stage.",
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  annualDiscount = "",
  bespokePlan,
  plans,
}: PricingProps) {
  const [activePlan, setActivePlan] = useState<"weekly" | "internship">("internship");

  const handleWhatsApp = (type: "weekly" | "bulk") => {
    const phone = "9235327048";
    let message = "";
    if (type === "weekly") {
      message = "Hi HekaHub! I'm interested in the Weekly AI Classes. I'd love to learn more about how students build a project every week and the details of the weekly showcases. Could you share more info?";
    } else {
      message = "Hi HekaHub! I'm interested in Bulk Booking for our group/organization. We'd like to discuss a customized plan and curriculum for our students. Let's connect!";
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

  return (

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>

      {/* Left Column - Text & Bespoke */}
      <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(3.5rem, 6vw, 6rem)', margin: 0, lineHeight: 0.9, letterSpacing: '1px', textTransform: 'uppercase' }}>
          {title}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '0.75rem', marginBottom: '1.25rem', fontFamily: 'var(--font-inter)' }}>
          {description}
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '999px', padding: '0.25rem', marginBottom: '2rem', alignSelf: 'flex-start' }}>
          <button
            onClick={() => setActivePlan("weekly")}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '999px',
              backgroundColor: activePlan === "weekly" ? '#222' : 'transparent',
              color: activePlan === "weekly" ? '#fff' : '#888',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-inter)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            {monthlyLabel}
          </button>
          <button
            onClick={() => setActivePlan("internship")}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '999px',
              backgroundColor: activePlan === "internship" ? '#222' : 'transparent',
              color: activePlan === "internship" ? '#fff' : '#888',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-inter)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            {annualLabel} <span style={{ color: '#ff4500' }}>{annualDiscount}</span>
          </button>
        </div>


        <div style={{ width: '100%', height: '1px', backgroundColor: '#333', marginBottom: '2rem' }}></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-inter)', fontWeight: 600, margin: 0, color: '#fff' }}>{bespokePlan.name}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem', maxWidth: '200px' }}>{bespokePlan.description}</p>
          </div>
          <button
            onClick={() => handleWhatsApp("bulk")}
            style={{ padding: '0.75rem 1.5rem', borderRadius: '999px', backgroundColor: 'transparent', border: '1px solid #333', color: '#ff4500', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.2s', cursor: 'pointer' }}
            className="hover:border-[#ff4500]"
          >
            {bespokePlan.buttonText}
          </button>

        </div>
      </div>

      {/* Plan Cards */}
      {plans.map((plan, idx) => {
        const isCurrentlyHighlighted =
          (activePlan === "weekly" && (plan.name.toLowerCase().includes("bootcamp") || plan.name.toLowerCase().includes("weekly"))) ||
          (activePlan === "internship" && (plan.name.toLowerCase().includes("annual") || plan.name.toLowerCase().includes("internship")));

        return (
          <div key={idx} style={{
            backgroundColor: isCurrentlyHighlighted ? '#0a0a0a' : '#111',
            borderRadius: '12px',
            padding: '1.75rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            border: '1px solid #222',
            position: 'relative',
            borderTop: isCurrentlyHighlighted ? '2px solid #ff4500' : '1px solid #222',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isCurrentlyHighlighted ? 'scale(1.02)' : 'scale(1)'
          }} className="hover:shadow-xl hover:shadow-[#ff4500]/5">
            <div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-inter)', fontWeight: 500, margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {plan.name}
                {isCurrentlyHighlighted && (
                  <span style={{ fontSize: '0.6rem', color: '#ff4500', fontWeight: 600, letterSpacing: '1px' }}>(ACTIVE)</span>
                )}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.6rem', fontSize: '0.8rem', paddingBottom: '1rem', borderBottom: '1px solid #222' }}>
                {plan.description}
              </p>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', color: '#ccc', padding: 0, fontSize: '0.875rem' }}>
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx}>
                  <span style={{ color: '#ff4500', marginRight: '0.5rem' }}>+</span> {feature}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid #222' }}>
              {/* One line space for future content */}
              <div style={{ height: '1.5rem' }} />

              {/* Early Bird Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(255,69,0,0.08)', border: '1px solid rgba(255,69,0,0.3)', borderRadius: '999px', padding: '0.2rem 0.65rem', marginBottom: '0.7rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff4500', display: 'inline-block' }} />
                <span style={{ fontSize: '0.6rem', color: '#ff4500', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-inter)' }}>Early Bird Offer</span>
              </div>

              {plan.subPrices ? (
                <div style={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  marginBottom: '1rem'
                }}>
                  {plan.subPrices.map((sub, sIdx) => (
                    <div key={sIdx} style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.4rem',
                      color: '#fff',
                      fontFamily: 'var(--font-inter)',
                      lineHeight: 1
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>$</span>
                        <span style={{ fontWeight: 700, fontSize: '1.75rem', letterSpacing: '0.05em' }}>{sub.price.trim()}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginLeft: '0.2rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>
                          {sub.unit}
                        </span>
                        {sub.originalPrice && (
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#444',
                            textDecoration: 'line-through',
                            fontWeight: 400,
                            fontFamily: 'var(--font-inter)'
                          }}>
                            ${sub.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Registration fee for Summer Bootcamp */}
                  <div style={{ fontSize: '0.78rem', color: '#555', fontFamily: 'var(--font-inter)', marginTop: '0.5rem' }}>
                    + <span style={{ color: '#888' }}>${plan.registrationFee}</span> registration fee
                  </div>
                </div>
              ) : (
                <>
                  {/* Early bird price */}
                  <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-inter)', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'baseline', gap: '0.4rem', lineHeight: 1 }}>
                    <span style={{ fontSize: '1.5rem' }}>$</span>
                    {plan.earlyBirdPrice}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginLeft: '0.2rem' }}>
                      <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>
                        / {plan.name.toLowerCase().includes("bootcamp") ? "bootcamp" : "seat"}
                      </span>
                      <span style={{
                        fontSize: '1.1rem',
                        color: '#444',
                        textDecoration: 'line-through',
                        fontWeight: 400,
                        fontFamily: 'var(--font-inter)'
                      }}>
                        ${plan.originalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Registration fee */}
                  <div style={{ fontSize: '0.78rem', color: '#555', fontFamily: 'var(--font-inter)', marginTop: '0.35rem', marginBottom: '1rem' }}>
                    + <span style={{ color: '#888' }}>${plan.registrationFee}</span> registration fee
                  </div>
                </>
              )}

              <button
                onClick={() => {
                  if (plan.name.toLowerCase().includes("weekly")) handleWhatsApp("weekly");
                  else handleEnroll();
                }}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  borderRadius: '999px',
                  backgroundColor: isCurrentlyHighlighted ? '#111' : '#1a1a1a',
                  border: '1px solid #222',
                  color: '#ff4500',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }} className="hover:border-[#ff4500]/50 hover:bg-[#222]">
                {plan.buttonText}
              </button>
            </div>
          </div>
        )
      })}


    </div>
  );
}
