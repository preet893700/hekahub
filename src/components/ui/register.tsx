"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";


// ─────────────────────────────────────────────
// TYPES & CONFIG
// ─────────────────────────────────────────────
export interface RegisterConfig {
  label?: string;
  title?: string;
  subtitle?: string;
  ageGroupOptions?: string[];
  batchOptions?: { label: string; sublabel: string; value: string }[];
  referralOptions?: string[];
  consentText?: string;
  submitLabel?: string;
  successMessage?: string;
  toastPrerequisite?: string;
}

export interface RegisterProps extends RegisterConfig {
  onSubmit?: (data: RegisterFormData) => void;
  onAffiliateSubmit?: (data: AffiliateFormData) => void;
  contactInfo?: {
    email: string;
    phone: string;
  };
  lockedReferralCode?: string;
}

export interface AffiliateFormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  promotionMethod: string;
  couponCode: string;
  consentUpdates: boolean;
}


export interface RegisterFormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  city: string;
  studentEmail: string;
  studentCountryCode: string;
  studentPhone: string;
  studentName: string;
  ageGroup: string;
  programType: string;
  batchTiming: string;
  isTrial: boolean;
  trialSlot: string;
  referralSource: string;
  referralName: string;
  consentUpdates: boolean;
}

// ─────────────────────────────────────────────
// DEFAULT CONFIG — edit all copy here
// ─────────────────────────────────────────────
const DEFAULT_CONFIG: Required<RegisterConfig> = {
  label: "AI MASTERY PROGRAM 2026",
  title: "Join the AI Revolution",
  subtitle:
    "Flexible Weekday and Weekend batches for Kids, College Students, and Professionals. Start your journey into Engineered Intelligence today.",
  ageGroupOptions: ["Kids", "Teens", "College Students", "Professionals"],
  batchOptions: [
    {
      value: "morning",
      label: "Morning Batch",
      sublabel: "9:00 AM – 11:00 AM IST  ·  11:30 PM – 1:30 AM EDT",
    },
    {
      value: "evening",
      label: "Evening Batch",
      sublabel: "5:00 PM – 7:00 PM IST  ·  7:30 AM – 9:30 AM EDT",
    },
  ],
  referralOptions: ["Social Media", "School", "Friend", "Ads", "Other"],
  consentText: "I agree to receive updates regarding the program",
  submitLabel: "REGISTER FOR SUMMER INTERNSHIP",
  successMessage: "🎉 You're registered! We'll contact you shortly.",
  toastPrerequisite:
    "💻 Please note: A laptop is mandatory for this hands-on bootcamp.",
};

// ─────────────────────────────────────────────
// STYLE TOKENS
// ─────────────────────────────────────────────
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

const labelBase: React.CSSProperties = {
  display: "block",
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
  marginBottom: "0.625rem",
  fontFamily: "var(--font-inter)",
};

const fieldWrap: React.CSSProperties = { marginBottom: "2.25rem" };

// ─────────────────────────────────────────────
// CUSTOM DROPDOWN
// ─────────────────────────────────────────────
interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
  disabled?: boolean;
}

function CustomDropdown({
  id,
  value,
  onChange,
  options,
  placeholder = "Select…",
  required,
  disabled,
  multiple,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedValues = multiple ? value.split(',').filter(Boolean).map(v => v.trim()) : [value];
  const selectedOptions = options.filter((o) => selectedValues.includes(o.value));
  
  let displayText = placeholder;
  if (selectedOptions.length > 0) {
    if (multiple && selectedOptions.length > 2) {
      displayText = `${selectedOptions[0].label}, ${selectedOptions[1].label} + ${selectedOptions.length - 2} more`;
    } else if (multiple) {
      displayText = selectedOptions.map(o => o.label).join(", ");
    } else {
      displayText = selectedOptions[0].label;
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", zIndex: open ? 9999 : 1 }} id={id}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((p) => !p)}
        style={{
          ...inputBase,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          paddingRight: "0.5rem",
          color: selectedOptions.length > 0 ? "#fff" : "rgba(255,255,255,0.35)",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <span style={{ fontFamily: "var(--font-inter)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {displayText}
        </span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            marginLeft: "0.5rem"
          }}
        >
          <path
            d="M1 1l5 5 5-5"
            stroke="#666"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            backgroundColor: "#111", // Solid dark background to prevent bleed-through
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            overflowY: "auto",
            maxHeight: "280px",
            zIndex: 10000, // Boosted even higher
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            pointerEvents: "auto",
          }}
          className="custom-scrollbar"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              disabled={opt.disabled}
              onClick={() => {
                if (!opt.disabled) {
                  if (multiple) {
                    let newValues;
                    if (selectedValues.includes(opt.value)) {
                      newValues = selectedValues.filter(v => v !== opt.value);
                    } else {
                      newValues = [...selectedValues, opt.value];
                    }
                    onChange(newValues.join(", "));
                  } else {
                    onChange(opt.value);
                    setOpen(false);
                  }
                }
              }}
              style={{
                width: "100%",
                padding: "0.875rem 1.25rem",
                backgroundColor:
                  selectedValues.includes(opt.value) ? "rgba(255,69,0,0.08)" : "transparent",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                color: opt.disabled
                  ? "rgba(255,255,255,0.15)"
                  : selectedValues.includes(opt.value) ? "var(--color-accent)" : "#fff",
                fontFamily: "var(--font-inter)",
                fontSize: "0.9375rem",
                textAlign: "left",
                cursor: opt.disabled ? "not-allowed" : "pointer",
                transition: "background 0.15s",
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
                opacity: opt.disabled ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!opt.disabled && !selectedValues.includes(opt.value))
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                if (!opt.disabled && !selectedValues.includes(opt.value))
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  <span>{opt.label}</span>
                  {opt.sublabel && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: selectedValues.includes(opt.value) ? "rgba(255,69,0,0.7)" : "rgba(255,255,255,0.35)",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {opt.sublabel}
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {opt.disabled && (
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,69,0,0.5)', fontWeight: 600 }}>
                      Slot Filled
                    </span>
                  )}
                  {multiple && selectedValues.includes(opt.value) && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      {/* Hidden native input for required validation tooltip */}
      {required && (
        <input
          tabIndex={-1}
          id={`${id}-hidden-input`}
          style={{
            opacity: 0,
            width: "100%",
            height: "1px",
            position: "absolute",
            top: "2.5rem", // Positioned where the trigger text is
            left: 0,
            pointerEvents: "none",
            zIndex: -1
          }}
          value={value || ""}
          required
          onChange={() => { }}
          onInvalid={(e) => {
            (e.target as HTMLInputElement).setCustomValidity("Please select an option from the list.");
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// AGE GROUP SCROLLER
// ─────────────────────────────────────────────
function AgeGroupScroller({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        paddingTop: "0.625rem",
        paddingBottom: "0.5rem",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {options.map((g) => {
        const active = value === g;
        return (
          <button
            key={g}
            type="button"
            onClick={() => onChange(g)}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              border: `1px solid ${active ? "var(--color-accent)" : "rgba(255,255,255,0.12)"}`,
              backgroundColor: active ? "var(--color-accent)" : "transparent",
              color: active ? "#fff" : "rgba(255,255,255,0.5)",
              fontSize: "0.8125rem",
              fontFamily: "var(--font-inter)",
              fontWeight: active ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.18s",
              lineHeight: 1,
            }}
          >
            {g}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────
function Toast({
  message,
  type = "success",
  prerequisite,
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  prerequisite: string;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 20000,
        maxWidth: "400px",
        width: "calc(100vw - 4rem)",
        backgroundColor: "#111",
        border: `1px solid ${type === "error" ? "rgba(255,68,68,0.3)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: "20px",
        padding: "1.5rem",
        boxShadow: "0 24px 60px rgba(0,0,0,0.9)",
        fontFamily: "var(--font-inter)",
        animation: "toastIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
      }}
    >
      {/* Success/Error Message */}
      <div style={{ position: "relative" }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-0.5rem",
            right: "-0.5rem",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.35)",
            cursor: "pointer",
            fontSize: "1.25rem",
            lineHeight: 1,
            padding: "0.25rem",
          }}
          aria-label="Close"
        >
          ✕
        </button>

        <p
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: type === "error" ? "#ff4444" : "#fff",
            margin: "0 1.5rem 0.75rem 0",
            lineHeight: 1.4,
          }}
        >
          {message}
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.08)",
          margin: "0.875rem 0",
        }}
      />

      {/* Prerequisite */}
      <div style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
        <span style={{ fontSize: "1rem", flexShrink: 0 }}>⚠️</span>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-text-muted)",
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          {prerequisite}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FIELD & INPUT — defined at module scope to
// prevent remount on every render (fixes focus loss)
// ─────────────────────────────────────────────
function Field({
  id,
  label: lbl,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ ...fieldWrap, position: "relative" }}>
      <label htmlFor={id} style={labelBase}>
        {lbl}
      </label>
      {children}
    </div>
  );
}

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { id: string }
) {
  return (
    <input
      {...props}
      style={{ ...inputBase, ...props.style }}
      className={cn("register-input", props.className)}
    />
  );
}

function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      id="reg-country-code"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...inputBase,
        width: "88px",
        flexShrink: 0,
        cursor: "pointer",
        appearance: "none" as const,
        WebkitAppearance: "none",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0rem center",
        paddingRight: "1rem",
      }}
      className="register-input"
    >
      <option value="+91" style={{ backgroundColor: "#111" }}>🇮🇳 +91</option>
      <option value="+971" style={{ backgroundColor: "#111" }}>🇦🇪 +971</option>
      <option value="+1" style={{ backgroundColor: "#111" }}>🇺🇸 +1</option>
      <option value="+44" style={{ backgroundColor: "#111" }}>🇬🇧 +44</option>
      <option value="+966" style={{ backgroundColor: "#111" }}>🇸🇦 +966</option>
      <option value="+974" style={{ backgroundColor: "#111" }}>🇶🇦 +974</option>
      <option value="+60" style={{ backgroundColor: "#111" }}>🇲🇾 +60</option>
    </select>
  );
}

// ─────────────────────────────────────────────
// EMPTY FORM STATE
// ─────────────────────────────────────────────
const EMPTY_FORM: RegisterFormData = {
  fullName: "",
  email: "",
  countryCode: "+91",
  phone: "",
  city: "",
  studentEmail: "",
  studentCountryCode: "+91",
  studentPhone: "",
  studentName: "",
  ageGroup: "",
  programType: "",
  batchTiming: "",
  isTrial: false,
  trialSlot: "",
  referralSource: "",
  referralName: "",
  consentUpdates: false,
};

const EMPTY_AFFILIATE_FORM: AffiliateFormData = {
  fullName: "",
  email: "",
  countryCode: "+91",
  phone: "",
  promotionMethod: "",
  couponCode: "",
  consentUpdates: false,
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function Register({
  label = DEFAULT_CONFIG.label,
  title = DEFAULT_CONFIG.title,
  subtitle = DEFAULT_CONFIG.subtitle,
  ageGroupOptions = DEFAULT_CONFIG.ageGroupOptions,
  batchOptions = DEFAULT_CONFIG.batchOptions,
  referralOptions = DEFAULT_CONFIG.referralOptions,
  consentText = DEFAULT_CONFIG.consentText,
  submitLabel = DEFAULT_CONFIG.submitLabel,
  successMessage = DEFAULT_CONFIG.successMessage,
  toastPrerequisite = DEFAULT_CONFIG.toastPrerequisite,
  contactInfo,
  onSubmit,
  onAffiliateSubmit,
  lockedReferralCode,
}: RegisterProps) {

  const [formMode, setFormMode] = useState<"batch" | "affiliate">("batch");
  const [form, setForm] = useState<RegisterFormData>(EMPTY_FORM);
  const [affiliateForm, setAffiliateForm] = useState<AffiliateFormData>(EMPTY_AFFILIATE_FORM);
  const [generatedCoupon, setGeneratedCoupon] = useState<string | null>(null);

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocked, setIsLocked] = useState(!!lockedReferralCode);

  // Affiliate / Locked Referral Logic
  useEffect(() => {
    if (lockedReferralCode) {
      setIsLocked(true);
      setForm((p) => ({
        ...p,
        referralSource: "Affiliate",
        referralName: lockedReferralCode,
      }));
    }
  }, [lockedReferralCode]);

  const setField = (key: keyof RegisterFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const setAffiliateField = (key: keyof AffiliateFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setAffiliateForm((p) => ({ ...p, [key]: e.target.value }));

  // Clear custom validity when these fields change
  useEffect(() => {
    if (form.ageGroup) {
      (document.getElementById('reg-age-group-hidden-input') as HTMLInputElement)?.setCustomValidity("");
    }
  }, [form.ageGroup]);

  useEffect(() => {
    if (form.programType) {
      (document.getElementById('reg-program-hidden-input') as HTMLInputElement)?.setCustomValidity("");
    }
  }, [form.programType]);

  useEffect(() => {
    if (form.trialSlot || !form.isTrial) {
      (document.getElementById('reg-trial-slot-hidden-input') as HTMLInputElement)?.setCustomValidity("");
    }
  }, [form.trialSlot, form.isTrial]);

  useEffect(() => {
    if (form.referralSource) {
      (document.getElementById('reg-referral-hidden-input') as HTMLInputElement)?.setCustomValidity("");
    }
  }, [form.referralSource]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formMode === "batch") {
      if (!form.consentUpdates || isSubmitting) return;
      setIsSubmitting(true);
      try {
        await onSubmit?.(form);
        setToast({
          show: true,
          type: "success",
          message: successMessage,
        });
        setForm(EMPTY_FORM);
        setIsLocked(false);
      } catch (error: any) {
        setToast({
          show: true,
          type: "error",
          message: error.message || "Something went wrong. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Affiliate submission
      if (!affiliateForm.consentUpdates || isSubmitting) return;
      setIsSubmitting(true);

      try {
        // Generate Coupon Code: HEKA-<FIRSTNAME>50
        const firstName = affiliateForm.fullName.split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase();
        const code = `HEKA-${firstName}50`;
        const finalData = { ...affiliateForm, couponCode: code };

        await onAffiliateSubmit?.(finalData);

        setGeneratedCoupon(code);
        setAffiliateForm(EMPTY_AFFILIATE_FORM);
      } catch (error: any) {
        setToast({
          show: true,
          type: "error",
          message: error.message || "Affiliate request failed. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      {/* ── TOAST ── */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          prerequisite={toastPrerequisite}
          onClose={() => setToast((p) => ({ ...p, show: false }))}
        />
      )}

      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
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
            maxWidth: "560px",
            margin: "0 auto 2.5rem auto",
            fontFamily: "var(--font-inter)",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>

        {/* ── TOGGLE SWITCH ── */}
        <div
          style={{
            display: "inline-flex",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "999px",
            padding: "0.35rem",
            border: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0.35rem",
              bottom: "0.35rem",
              left: formMode === "batch" ? "0.35rem" : "50%",
              width: "calc(50% - 0.35rem)",
              backgroundColor: "var(--color-accent)",
              borderRadius: "999px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 0,
            }}
          />
          <button
            type="button"
            onClick={() => {
              setFormMode("batch");
              setGeneratedCoupon(null);
            }}
            style={{
              position: "relative",
              zIndex: 1,
              padding: "0.6rem 1.5rem",
              fontSize: "0.875rem",
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              color: formMode === "batch" ? "#fff" : "rgba(255,255,255,0.6)",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "color 0.3s",
              borderRadius: "999px",
            }}
          >
            Batch Registration
          </button>
          <button
            type="button"
            onClick={() => {
              setFormMode("affiliate");
              setGeneratedCoupon(null);
            }}
            style={{
              position: "relative",
              zIndex: 1,
              padding: "0.6rem 1.5rem",
              fontSize: "0.875rem",
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              color: formMode === "affiliate" ? "#fff" : "rgba(255,255,255,0.6)",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "color 0.3s",
              borderRadius: "999px",
            }}
          >
            Affiliate Registration
          </button>
        </div>
      </div>

      {/* ── FORM ── */}
      <form onSubmit={handleSubmit} style={{ position: "relative" }}>

        {/* ================= BATCH FORM ================= */}
        <div 
          style={{ 
            display: formMode === "batch" ? "block" : "none",
            animation: formMode === "batch" ? "formSwitch 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none",
            position: "relative",
            zIndex: 10, // Higher than the button
          }}
        >
          {/* ══ Student Information — 2+2 grid ══ */}
          <SectionDivider label="Student Information" />
          <div className="register-grid">
            {/* LEFT — Student Name, Age Group, Email */}
            <div>
              <Field id="reg-student-name" label="Full Name *">
                <Input
                  id="reg-student-name"
                  type="text"
                  placeholder="e.g. Jamie Doe"
                  value={form.studentName || ""}
                  onChange={setField("studentName")}
                  required={formMode === "batch"}
                />
              </Field>

              {/* Age Group pill scroller */}
              <Field id="reg-age-group" label={`Age Group *${form.ageGroup ? ` — ${form.ageGroup}` : ""}`}>
                <AgeGroupScroller
                  options={ageGroupOptions}
                  value={form.ageGroup}
                  onChange={(v) => setForm((p) => ({ ...p, ageGroup: v }))}
                />
                <input
                  tabIndex={-1}
                  id="reg-age-group-hidden-input"
                  style={{
                    opacity: 0,
                    width: "100%",
                    height: "1px",
                    position: "absolute",
                    top: "2.5rem", // Positioned over the age group pills
                    left: 0,
                    pointerEvents: "none",
                    zIndex: -1
                  }}
                  value={form.ageGroup || ""}
                  required={formMode === "batch"}
                  onChange={() => { }}
                  onInvalid={(e) => {
                    (e.target as HTMLInputElement).setCustomValidity("Please select an age group.");
                  }}
                />
              </Field>

              <Field id="reg-student-email" label={`Email Address ${(form.ageGroup === 'Kids' || form.ageGroup === 'Teens') ? '(Optional)' : '*'}`}>
                <Input
                  id="reg-student-email"
                  type="email"
                  placeholder="student@example.com"
                  value={form.studentEmail || ""}
                  onChange={setField("studentEmail")}
                  required={formMode === "batch" && !(form.ageGroup === 'Kids' || form.ageGroup === 'Teens')}
                />
              </Field>
            </div>

            {/* RIGHT — Program Type, Batch Timing, Phone, City */}
            <div>
              <Field id="reg-program" label="Program Type *">
                <CustomDropdown
                  id="reg-program"
                  value={form.programType}
                  onChange={(v) => setForm((p) => ({ ...p, programType: v }))}
                  options={[
                    { value: "weekday", label: "Weekday Batch" },
                    { value: "weekend", label: "Weekend Batch" },
                    { value: "bootcamp", label: "Summer Bootcamp" },
                    { value: "annual", label: "Annual Membership" },
                  ]}
                  placeholder="Select program"
                  required={formMode === "batch"}
                />
              </Field>

              <Field id="reg-batch" label="Preferred Batch Timing *">
                <Input
                  id="reg-batch"
                  type="text"
                  placeholder="e.g. Evenings, Weekends, 5PM IST"
                  value={form.batchTiming || ""}
                  onChange={setField("batchTiming")}
                  required={formMode === "batch"}
                />
              </Field>

              <Field id="reg-student-phone" label={`Phone Number ${(form.ageGroup === 'Kids' || form.ageGroup === 'Teens') ? '(Optional)' : '*'}`}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                  <CountrySelect
                    value={form.studentCountryCode}
                    onChange={(v) => setForm((p) => ({ ...p, studentCountryCode: v }))}
                  />
                  <Input
                    id="reg-student-phone"
                    type="tel"
                    placeholder="(555) 555-1234"
                    value={form.studentPhone || ""}
                    onChange={setField("studentPhone")}
                    required={formMode === "batch" && !(form.ageGroup === 'Kids' || form.ageGroup === 'Teens')}
                    style={{ flex: 1 }}
                  />
                </div>
              </Field>
            </div>
          </div>

          <div className="register-grid" style={{ marginBottom: "2.5rem" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field id="reg-city" label="City / Location (Optional)">
                <Input
                  id="reg-city"
                  type="text"
                  placeholder="e.g. Delhi, India / Dallas TX, USA"
                  value={form.city || ""}
                  onChange={setField("city")}
                />
              </Field>
            </div>
          </div>

          {/* ══ Parent's Information (Conditional) ══ */}
          {(form.ageGroup === "Kids" || form.ageGroup === "Teens") && (
            <>
              <SectionDivider label="Parent's Information" />
              <div className="register-grid" style={{ marginBottom: "2.5rem" }}>
                {/* LEFT — Parent Name, Email */}
                <div>
                  <Field id="reg-fullname" label="Full Name *">
                    <Input
                      id="reg-fullname"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={form.fullName || ""}
                      onChange={setField("fullName")}
                      required={formMode === "batch" && (form.ageGroup === "Kids" || form.ageGroup === "Teens")}
                    />
                  </Field>

                  <Field id="reg-email" label="Email Address *">
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email || ""}
                      onChange={setField("email")}
                      required={formMode === "batch" && (form.ageGroup === "Kids" || form.ageGroup === "Teens")}
                    />
                  </Field>
                </div>

                {/* RIGHT — Phone */}
                <div>
                  <Field id="reg-phone" label="Phone Number *">
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                      <CountrySelect
                        value={form.countryCode}
                        onChange={(v) => setForm((p) => ({ ...p, countryCode: v }))}
                      />
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder="(555) 555-1234"
                        value={form.phone || ""}
                        onChange={setField("phone")}
                        required={formMode === "batch" && (form.ageGroup === "Kids" || form.ageGroup === "Teens")}
                        style={{ flex: 1 }}
                      />
                    </div>
                  </Field>
                </div>
              </div>
            </>
          )}

          {/* ══ Final Details ══ */}
          <SectionDivider label="Final Details" />

          {/* How did you hear — LEFT | Referral Name — RIGHT */}
          <div className="register-grid" style={{ marginBottom: form.isTrial ? "0" : "2.25rem" }}>
            {/* LEFT — How did you hear */}
            <div>
              <Field id="reg-referral" label="How did you hear about us? *">
                <CustomDropdown
                  id="reg-referral"
                  value={form.referralSource}
                  onChange={(v) => setForm((p) => ({ ...p, referralSource: v, referralName: "" }))}
                  options={
                    isLocked
                      ? [{ value: "Affiliate", label: "Affiliate" }]
                      : (referralOptions || []).map((r) => ({ 
                          value: r, 
                          label: r,
                          // Ensure Affiliate isn't accidentally disabled by any parent logic
                          disabled: false 
                        }))
                  }
                  placeholder="Select source"
                  required={formMode === "batch"}
                  disabled={isLocked}
                />
              </Field>
            </div>

            {/* RIGHT — Referral Name (Conditional) */}
            <div>
              {form.referralSource && (
                <Field id="reg-referral-name" label="Referral Name (Optional)">
                  <Input
                    id="reg-referral-name"
                    type="text"
                    placeholder={
                      form.referralSource === "Friend"
                        ? "e.g. Tom Hanks"
                        : form.referralSource === "School"
                          ? "e.g. Teacher / School name"
                          : form.referralSource === "Affiliate"
                            ? (isLocked ? "Partner Code Applied" : "Enter Affiliate Code")
                            : form.referralSource === "Social Media"
                              ? "e.g. @hekahub"
                              : "Name or handle (optional)"
                    }
                    value={form.referralName || ""}
                    onChange={setField("referralName")}
                    readOnly={isLocked}
                    style={isLocked ? { color: "var(--color-accent)", opacity: 0.8, cursor: "not-allowed" } : {}}
                  />
                </Field>
              )}
            </div>
          </div>

          {/* Trial Class Checkbox */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              marginBottom: form.isTrial ? "1.5rem" : "2.5rem",
            }}
          >
            <button
              type="button"
              id="reg-is-trial"
              onClick={() =>
                setForm((p) => ({ ...p, isTrial: !p.isTrial, trialSlot: !p.isTrial ? p.trialSlot : "" }))
              }
              style={{
                width: "18px",
                height: "18px",
                border: `1px solid ${form.isTrial ? "var(--color-accent)" : "rgba(255,255,255,0.2)"}`,
                borderRadius: "3px",
                backgroundColor: form.isTrial ? "var(--color-accent)" : "transparent",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {form.isTrial && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <span
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-inter)",
              }}
            >
              Want to book a <b style={{ color: '#fff' }}>Free Trial Class</b>? No payment required!
            </span>
          </div>

          {/* EXTRA ROW for Trial Slot */}
          {form.isTrial && (
            <div className="register-grid" style={{ marginBottom: '2.5rem' }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <Field id="reg-trial-slot" label="Select Free Trial Slot *">
                  <CustomDropdown
                    id="reg-trial-slot"
                    value={form.trialSlot}
                    onChange={(v) => setForm((p) => ({ ...p, trialSlot: v }))}
                    options={[
                      { value: "April 18", label: "Saturday, April 18th", disabled: true },
                      { value: "April 19", label: "Sunday, April 19th", disabled: true },
                      { value: "April 25", label: "Saturday, April 25th", disabled: true },
                      { value: "April 26", label: "Sunday, April 26th", disabled: true },
                      { value: "May 2", label: "Saturday, May 2nd", disabled: true },
                      { value: "May 3", label: "Sunday, May 3rd", disabled: true },
                      { value: "May 10", label: "Sunday, May 10th", disabled: true },
                      { value: "May 11", label: "Monday, May 11th" },
                      { value: "May 17", label: "Sunday, May 17th" },
                      { value: "May 18", label: "Monday, May 18th" },
                      { value: "May 24", label: "Sunday, May 24th" },
                      { value: "May 25", label: "Monday, May 25th" },
                      { value: "May 31", label: "Sunday, May 31st" },
                      { value: "June 1", label: "Monday, June 1st" },
                    ]}
                    placeholder="Select weekend slot"
                    required={formMode === "batch"}
                  />
                </Field>
              </div>
            </div>
          )}
        </div>

        {/* ================= AFFILIATE FORM ================= */}
        <div 
          style={{ 
            display: formMode === "affiliate" ? "block" : "none",
            animation: formMode === "affiliate" ? "formSwitch 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none",
            position: "relative",
            zIndex: 10, // Higher than the button
          }}
        >
          <SectionDivider label="Affiliate Details" />
          <div className="register-grid">
            {/* LEFT */}
            <div>
              <Field id="aff-fullname" label="Full Name *">
                <Input
                  id="aff-fullname"
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={affiliateForm.fullName || ""}
                  onChange={setAffiliateField("fullName")}
                  required={formMode === "affiliate"}
                />
              </Field>

              <Field id="aff-email" label="Email Address *">
                <Input
                  id="aff-email"
                  type="email"
                  placeholder="you@example.com"
                  value={affiliateForm.email || ""}
                  onChange={setAffiliateField("email")}
                  required={formMode === "affiliate"}
                />
              </Field>
            </div>

            {/* RIGHT */}
            <div>
              <Field id="aff-phone" label="Phone Number *">
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                  <CountrySelect
                    value={affiliateForm.countryCode}
                    onChange={(v) => setAffiliateForm((p) => ({ ...p, countryCode: v }))}
                  />
                  <Input
                    id="aff-phone"
                    type="tel"
                    placeholder="(555) 555-1234"
                    value={affiliateForm.phone || ""}
                    onChange={setAffiliateField("phone")}
                    required={formMode === "affiliate"}
                    style={{ flex: 1 }}
                  />
                </div>
              </Field>

              <Field id="aff-promo" label="How will you promote? (Optional)">
                <CustomDropdown
                  id="aff-promo"
                  value={affiliateForm.promotionMethod}
                  onChange={(v) => setAffiliateForm((p) => ({ ...p, promotionMethod: v }))}
                  options={[
                    { value: "Social Media", label: "Social Media (Insta, Twitter, etc)" },
                    { value: "School / College Network", label: "School / College Network" },
                    { value: "Professional Network", label: "Professional Network" },
                    { value: "Website / Blog", label: "Website / Blog" },
                    { value: "Other", label: "Other" },
                  ]}
                  placeholder="Select promotion method"
                  multiple
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Consent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
            marginBottom: "2.5rem",
          }}
        >
          <button
            type="button"
            id="reg-consent"
            onClick={() => {
              if (formMode === "batch") {
                setForm((p) => ({ ...p, consentUpdates: !p.consentUpdates }))
              } else {
                setAffiliateForm((p) => ({ ...p, consentUpdates: !p.consentUpdates }))
              }
            }}
            style={{
              width: "18px",
              height: "18px",
              border: `1px solid ${(formMode === "batch" ? form.consentUpdates : affiliateForm.consentUpdates) ? "var(--color-accent)" : "rgba(255,255,255,0.2)"}`,
              borderRadius: "3px",
              backgroundColor: (formMode === "batch" ? form.consentUpdates : affiliateForm.consentUpdates) ? "var(--color-accent)" : "transparent",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {(formMode === "batch" ? form.consentUpdates : affiliateForm.consentUpdates) && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <span
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-inter)",
            }}
          >
            {consentText}
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!(formMode === "batch" ? form.consentUpdates : affiliateForm.consentUpdates) || isSubmitting}
          className={cn(
            "group relative overflow-hidden px-8 py-5 rounded-full font-bold text-sm tracking-[0.15em] uppercase transition-all duration-500",
            (formMode === "batch" ? form.consentUpdates : affiliateForm.consentUpdates) && !isSubmitting
              ? "bg-[#ff4500] text-white shadow-[0_10px_30px_rgba(255,69,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,69,0,0.4)] hover:-translate-y-1 active:scale-[0.98]"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50 border border-white/5"
          )}
          style={{
            width: "100%",
            fontFamily: "var(--font-inter)",
            zIndex: 1, // Explicitly keep it lower than an open dropdown
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>{formMode === "batch" ? submitLabel : "BECOME AN AFFILIATE"}</span>
            )}
          </span>

          {/* Hover Glow Effect */}
          {(formMode === "batch" ? form.consentUpdates : affiliateForm.consentUpdates) && !isSubmitting && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />
          )}
        </button>

        {/* ── SUCCESS CARD (COUPON GENERATED) ── */}
        {formMode === "affiliate" && generatedCoupon && (
          <div
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0) scale(1)";
              el.style.boxShadow = "0 14px 45px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)";
              el.style.borderColor = "rgba(255,255,255,0.12)";
              const glare = el.querySelector('.glass-glare') as HTMLElement;
              if (glare) {
                glare.style.transform = "rotate(30deg) translateY(40%) translateX(20%)";
                glare.style.opacity = "0.6";
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0) scale(1)";
              el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)";
              el.style.borderColor = "rgba(255,255,255,0.08)";
              const glare = el.querySelector('.glass-glare') as HTMLElement;
              if (glare) {
                glare.style.transform = "rotate(30deg) translateY(-20%) translateX(-10%)";
                glare.style.opacity = "1";
              }
            }}
            style={{
              marginTop: "2.5rem",
              padding: "2rem",
              borderRadius: "1.5rem",
              background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,69,0,0.04) 100%)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              borderLeft: "1px solid rgba(255,255,255,0.15)",
              textAlign: "center",
              animation: "toastIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transformOrigin: "center center",
              cursor: "default"
            }}
          >
            {/* Specular Highlight Reflection */}
            <div
              className="glass-glare"
              style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: "linear-gradient(to bottom right, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0) 100%)",
                transform: "rotate(30deg) translateY(-20%) translateX(-10%)",
                pointerEvents: "none",
                transition: "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.7s ease",
              }}
            />
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#fff", fontFamily: "var(--font-inter)", fontSize: "1.5rem", fontWeight: 600 }}>
              🎉 Welcome to the Program!
            </h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem", fontFamily: "var(--font-inter)" }}>
              Your application is received. Start sharing your unique referral code below to earn rewards!
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem 1rem 0.75rem 1.5rem",
                backgroundColor: "#000",
                border: "1px dashed rgba(255,69,0,0.5)",
                borderRadius: "999px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "var(--color-accent)",
                  letterSpacing: "2px",
                }}
              >
                {generatedCoupon}
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`https://hekahub.com/${generatedCoupon}`);
                  setToast({ show: true, type: "success", message: "Referral Link copied to clipboard!" });
                }}
                className="group hover:bg-[var(--color-accent)] transition-colors"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "#fff",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-inter)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy Link
              </button>
            </div>
          </div>
        )}
      </form>

      {/* ── CONTACT VIA ── */}
      {contactInfo && (
        <div style={{ marginTop: "4rem", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#fff",
              fontFamily: "var(--font-inter)",
              marginBottom: "1.5rem",
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            Related to any issues or doubts contact us via
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: 'center' }}>
            {/* Email */}
            <a
              href={`mailto:${contactInfo.email}`}
              className="group hover:border-[var(--color-accent)]/50 transition-colors duration-300"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.5rem",
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
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {contactInfo.email}
              </span>
            </a>

            {/* Phone */}
            <a
              href={`https://wa.me/${contactInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent("Hi HekaHub! I'm having some trouble with the registration process for the Summer Internship. Can you please help me out?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:border-[var(--color-accent)]/50 transition-colors duration-300"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.5rem",
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
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {contactInfo.phone}
              </span>
            </a>

          </div>
        </div>
      )}
    </div>

  );
}

// ─────────────────────────────────────────────
// SECTION DIVIDER
// ─────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "2rem",
        marginTop: "0.5rem",
      }}
    >
      <span
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-accent)",
          fontFamily: "var(--font-inter)",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.08)",
        }}
      />
    </div>
  );
}