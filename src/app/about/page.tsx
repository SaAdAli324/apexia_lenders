import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us | Apexia Lending — Australian Mortgage Brokerage",
  description:
    "Learn about Apexia Lending, an independent Australian mortgage brokerage comparing 50+ lenders to secure the right home loan with zero broker fees.",
};

export default function AboutPage() {
  return (
    <div className="bg-light-bg min-h-screen">
      {/* Hero Header */}
      <section className="bg-navy text-white pt-14 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#13A3B5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal/20 text-teal border border-teal/30 mb-6">
              Australian Credit Representative
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Expert Home Loans. Built Around Your Best Interests.
            </h1>
            <p className="text-base sm:text-lg text-slate-light leading-relaxed">
              Apexia Lending is an independent Australian mortgage brokerage dedicated to simplifying home finance. We analyze loan products from over 50 banks and specialist lenders to negotiate sharper rates and manage your journey from enquiry to settlement—completely free of charge.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-white border-b border-border py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-navy">50+</p>
              <p className="text-xs sm:text-sm text-slate font-medium mt-1">Lenders &amp; Banks Compared</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-teal">$0</p>
              <p className="text-xs sm:text-sm text-slate font-medium mt-1">Broker Fee to You</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-navy">100%</p>
              <p className="text-xs sm:text-sm text-slate font-medium mt-1">Best Interests Duty (BID)</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-teal">Nationwide</p>
              <p className="text-xs sm:text-sm text-slate font-medium mt-1">Serving All Australian States</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative / Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Our Story &amp; Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-snug">
                Why Apexia Lending Was Created
              </h2>
              <p className="text-sm sm:text-base text-slate leading-relaxed">
                When homeowners go directly to a retail bank branch, they are only offered that single bank&apos;s branded products, regardless of whether a competitor across the street has a rate that is 0.70% cheaper or a policy that accommodates their specific income scenario.
              </p>
              <p className="text-sm sm:text-base text-slate leading-relaxed">
                Operated by <strong>Zawak Private Ltd</strong> under the brand name <strong>Apexia Lending</strong>, our brokerage was built to shift the balance of power back to Australian borrowers. We operate with zero lender bias. By surveying 50+ of Australia&apos;s leading financial institutions—including the Big 4, regional customer-owned banks, and wholesale non-bank funders—we pinpoint loans tailored precisely to your goals.
              </p>
              
              <div className="p-5 rounded-2xl bg-teal/5 border border-teal/20 text-navy">
                <p className="text-xs font-bold uppercase tracking-wider text-teal mb-1">
                  Australian Legal Protection
                </p>
                <p className="text-sm text-slate leading-relaxed">
                  Under the statutory <strong>Best Interests Duty (BID)</strong> enacted in the National Consumer Credit Protection Act 2009, mortgage brokers in Australia are legally required to put your interests first. Banks and their branch staff are exempt from this law.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-xl space-y-6">
                <h3 className="text-xl font-bold text-navy border-b border-border pb-4">
                  What Sets Apexia Apart
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy">Tailored, Not Automated</h4>
                      <p className="text-xs text-slate mt-1 leading-relaxed">
                        Every application is evaluated with personalized attention. We delve into the nuances of your income structure, whether PAYG, contractor, or self-employed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy">End-to-End File Packaging</h4>
                      <p className="text-xs text-slate mt-1 leading-relaxed">
                        We don&apos;t just advise—we prepare your entire file, liaise with bank credit assessors, coordinate property valuations, and manage conveyancers through to settlement.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy">Proactive Annual Rate Reviews</h4>
                      <p className="text-xs text-slate mt-1 leading-relaxed">
                        Our relationship doesn&apos;t end at key handover. We periodically review your rate against prevailing market deals to protect you from the lender loyalty tax.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy">Zero Fees to You</h4>
                      <p className="text-xs text-slate mt-1 leading-relaxed">
                        Lenders pay us a standard commission after your loan successfully settles. You get full access to expert mortgage brokerage without paying a single dollar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Compliance & Regulatory Information */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Compliance &amp; Governance"
            title="Fully Licensed &amp; Regulated in Australia"
            subtitle="Apexia Lending adheres to the strictest professional, ethical, and regulatory standards set by Australian financial authorities."
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-navy mb-1">Licensing &amp; Authorization</h3>
              <p className="text-xs text-slate leading-relaxed">
                Credit Representative Number 554111 is authorised under Australian Credit Licence 389328. Authorized to provide credit assistance across Australia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-teal text-white flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-navy mb-1">AFCA Member</h3>
              <p className="text-xs text-slate leading-relaxed">
                Full member of the Australian Financial Complaints Authority (AFCA), providing borrowers with independent, external dispute resolution.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-navy mb-1">Privacy &amp; Data Security</h3>
              <p className="text-xs text-slate leading-relaxed">
                Committed to the Australian Privacy Principles (APPs) and Privacy Act 1988 (Cth). Your personal and financial data is stored securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 sm:py-20 bg-light-bg">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to Find Your Ideal Mortgage?
              </h2>
              <p className="text-sm sm:text-base text-slate-light leading-relaxed">
                Compare over 50 Australian lenders, check your genuine borrowing capacity, and get clear guidance with no broker fees.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Book Free Consultation
                </Button>
                <Button href="/calculators" variant="outlineLight" size="lg">
                  Explore Calculators
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
