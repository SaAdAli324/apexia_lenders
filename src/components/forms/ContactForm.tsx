"use client";

import { useState } from "react";
import { AUSTRALIAN_STATES, LOAN_TYPES } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production, this would POST to an API route or email service
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-fluid-h3 font-bold text-navy mb-2">Thank you!</h3>
        <p className="text-slate">
          We&apos;ve received your enquiry and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          className="w-full px-4 py-3 border border-border/50 text-sm bg-white text-navy placeholder:text-slate focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy transition-colors"
          placeholder="First name"
        />
        <input
          id="lastName"
          name="lastName"
          type="text"
          required
          className="w-full px-4 py-3 border border-border/50 text-sm bg-white text-navy placeholder:text-slate focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy transition-colors"
          placeholder="Last name"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 border border-border/50 text-sm bg-white text-navy placeholder:text-slate focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy transition-colors"
          placeholder="Email address"
        />
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full px-4 py-3 border border-border/50 text-sm bg-white text-navy placeholder:text-slate focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy transition-colors"
          placeholder="Phone number"
        />
      </div>

      <div>
        <p className="text-xs text-navy mb-1.5 font-medium mt-2">What are you looking to achieve?</p>
        <select
          id="loanType"
          name="loanType"
          className="w-full px-4 py-3 border border-border/50 text-sm bg-white text-slate focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy transition-colors appearance-none"
        >
          <option value="">Select a loan type...</option>
          {LOAN_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full px-4 py-3 border border-border/50 text-sm bg-white text-navy placeholder:text-slate focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy transition-colors resize-none mt-2"
          placeholder="Additional information (optional)"
        />
      </div>

      <div className="flex items-center gap-2 py-2">
        <input
          type="checkbox"
          id="privacy"
          required
          className="rounded-sm border-border/50 text-navy focus:ring-navy w-3.5 h-3.5"
        />
        <label htmlFor="privacy" className="text-[11px] text-slate">
          I agree to the{" "}
          <a href="/privacy-policy" className="text-navy font-semibold hover:underline">
            Privacy Policy
          </a>{" "}
          and consent to be contacted.
        </label>
      </div>

      <Button type="submit" variant="primary" size="md" className="w-full text-sm font-bold">
        Book Free Consultation
        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Button>
    </form>
  );
}
