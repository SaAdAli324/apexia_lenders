import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Apexia Lending — Free Mortgage Consultation",
  description:
    "Get in touch with Apexia Lending. Schedule a free home loan consultation with an accredited mortgage broker to compare 50+ Australian lenders.",
};

export default function ContactPage() {
  return (
    <div className="bg-light-bg min-h-screen">
      {/* Hero Header */}
      <section className="bg-navy text-white pt-14 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#13A3B5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Contact Us</span>
          </div>

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal/20 text-teal border border-teal/30 mb-4">
              Free Nationwide Consultation
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Let&apos;s Discuss Your Home Loan Goals.
            </h1>
            <p className="text-base sm:text-lg text-slate-light leading-relaxed">
              Whether you are buying your first home, refinancing to slash monthly repayments, or building an investment portfolio, we are here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Form & Details */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Contact Information & Highlights */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal">
                  Direct Inquiries
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1 mb-3">
                  How to Reach Us
                </h2>
                <p className="text-sm text-slate leading-relaxed">
                  As a nationwide mortgage brokerage, we conduct consultations via phone, video call, or secure digital correspondence, accommodating your schedule across all Australian time zones.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-border shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate">Email Enquiries</h3>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-base font-bold text-navy hover:text-teal transition-colors mt-0.5 block"
                    >
                      {BRAND.email}
                    </a>
                    <p className="text-xs text-slate-light mt-1">Average response within 2 business hours</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-border shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate">Operating Hours</h3>
                    <p className="text-sm font-bold text-navy mt-0.5">Monday – Friday: 8:30 AM – 6:30 PM</p>
                    <p className="text-sm font-semibold text-navy">Saturday: 9:00 AM – 4:00 PM AEST</p>
                    <p className="text-xs text-slate-light mt-1">Evening appointments available by prior request</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-border shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate">Service Coverage</h3>
                    <p className="text-sm font-bold text-navy mt-0.5">Nationwide Australia</p>
                    <p className="text-xs text-slate mt-1">
                      Licensed credit assistance across NSW, VIC, QLD, WA, SA, TAS, ACT, and NT.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Box */}
              <div className="p-6 rounded-2xl bg-[#F0FAF9] border border-teal/20 space-y-2">
                <div className="flex items-center gap-2 text-teal font-bold text-sm">
                  <span>★ ★ ★ ★ ★</span>
                  <span className="text-navy text-xs">4.9/5 Client Rating</span>
                </div>
                <p className="text-xs text-slate leading-relaxed">
                  Every enquiry is confidential, does not impact your credit score, and carries zero broker fees under our lender-paid remuneration model.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-xl">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal">
                    Online Request
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-navy mt-1">
                    Send Us an Enquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate mt-1">
                    Complete this quick form and our broker will review your scenario and respond with tailored lending options.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal">
              Quick Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
              What Happens After You Submit?
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-navy mb-1">1. Initial Scenario Review</h4>
              <p className="text-xs text-slate leading-relaxed">
                We review your requested loan type, target purchase price or existing loan balance, and state-specific grants.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-navy mb-1">2. Lender Comparison &amp; Rate Shortlist</h4>
              <p className="text-xs text-slate leading-relaxed">
                We filter through our 50+ lender panel to identify banks offering the sharpest rates, maximum borrowing capacity, and cashback incentives for your specific profile.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-bold text-navy mb-1">3. Zero Obligation Discussion</h4>
              <p className="text-xs text-slate leading-relaxed">
                We present our findings to you in plain English. There is never any obligation or pressure to proceed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
