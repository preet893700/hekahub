"use client";

import React, { useState } from "react";
import { MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContactLocation {
  country: string;
  address: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface ContactProps {
  label?: string;
  title?: string;
  subtitle?: string;
  benefits?: string[];
  locations?: ContactLocation[];
  contactInfo?: ContactInfo;
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
}

export function Contact({
  label = "CONTACT US",
  title = "Get in touch with us",
  subtitle = "Fill out the form below or schedule a meeting with us at your convenience.",
  benefits = [
    "Improve usability of your product",
    "Engage users at a higher level and outperform your competition",
    "Reduce the onboarding time and improve sales",
    "Balance user needs with your business goal",
  ],
  locations = [
    {
      country: "India",
      address: ["Banjara Hills, Road No 10", "Hyderabad, 500034"],
    },
    {
      country: "UAE",
      address: ["Dubai Internet City", "Dubai, UAE 00000"],
    },
  ],
  contactInfo = {
    email: "hello@hekahub.com",
    phone: "+91 98765 43210",
  },
  onSubmit,
}: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    onSubmit?.({ name, email, message });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setName("");
    setEmail("");
    setMessage("");
    setAgreed(false);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    padding: "0.875rem 0",
    color: "#fff",
    fontSize: "1rem",
    fontFamily: "var(--font-inter)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div>
      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span
          style={{
            display: "block",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "1.25rem",
            fontFamily: "var(--font-inter)",
          }}
        >
          {label}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-bebas-neue)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            margin: "0 0 1rem 0",
            lineHeight: 1,
            letterSpacing: "1px",
            color: "#fff",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "1.125rem",
            maxWidth: "520px",
            margin: "0 auto",
            fontFamily: "var(--font-inter)",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
      >
        {/* ── LEFT: FORM ── */}
        <div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {/* Name */}
            <div style={{ marginBottom: "2.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="focus:border-b-[var(--color-accent)]"
                style={inputBase}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "2.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputBase}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: "2.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Message
              </label>
              <textarea
                placeholder="Enter Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
                style={{
                  ...inputBase,
                  resize: "none",
                  display: "block",
                }}
              />
            </div>

            {/* Terms checkbox */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "2rem",
              }}
            >
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                style={{
                  width: "18px",
                  height: "18px",
                  border: `1px solid ${agreed ? "var(--color-accent)" : "rgba(255,255,255,0.2)"}`,
                  borderRadius: "3px",
                  backgroundColor: agreed ? "var(--color-accent)" : "transparent",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {agreed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                I agree with{" "}
                <a
                  href="#"
                  style={{
                    color: "#fff",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Terms and Conditions
                </a>
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreed}
              className={cn(
                "transition-all duration-300",
                agreed
                  ? "hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white"
                  : "opacity-40 cursor-not-allowed"
              )}
              style={{
                width: "100%",
                padding: "1.125rem",
                borderRadius: "999px",
                backgroundColor: submitted ? "transparent" : "#111",
                border: `1px solid ${submitted ? "var(--color-accent)" : "#333"}`,
                color: submitted ? "var(--color-accent)" : "#fff",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "var(--font-inter)",
                cursor: agreed ? "pointer" : "not-allowed",
              }}
            >
              {submitted ? "Message Sent ✓" : "Send Your Request"}
            </button>
          </form>

          {/* ── CONTACT VIA ── */}
          <div style={{ marginTop: "3.5rem" }}>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#fff",
                fontFamily: "var(--font-inter)",
                marginBottom: "1.25rem",
              }}
            >
              You can also Contact Us via
            </p>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="group hover:border-[var(--color-accent)]/50 transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: "#111",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,69,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={15} color="var(--color-accent)" />
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {contactInfo.email}
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${contactInfo.phone}`}
                className="group hover:border-[var(--color-accent)]/50 transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: "#111",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,69,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={15} color="var(--color-accent)" />
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {contactInfo.phone}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT: BENEFITS + LOCATIONS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          {/* Benefits */}
          <div>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#fff",
                fontFamily: "var(--font-inter)",
                marginBottom: "1.75rem",
              }}
            >
              With our services you can
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    color: "var(--color-text-muted)",
                    fontSize: "0.9375rem",
                    fontFamily: "var(--font-inter)",
                    lineHeight: 1.5,
                  }}
                >
                  <CheckCircle2
                    size={18}
                    color="var(--color-accent)"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

          {/* Locations */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {locations.map((loc, i) => (
              <div key={i}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.875rem",
                  }}
                >
                  <MapPin size={16} color="var(--color-accent)" />
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                      color: "#fff",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {loc.country}
                  </span>
                </div>
                {loc.address.map((line, j) => (
                  <p
                    key={j}
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-inter)",
                      margin: "0 0 0.25rem 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
