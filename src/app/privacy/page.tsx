import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Apexia Lending Australia",
  description:
    "Apexia Lending's Privacy Policy explaining how personal and credit information is collected, used, and protected under the Privacy Act 1988 (Cth).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-light-bg min-h-screen py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span>Privacy Policy</span>
        </div>

        {/* Header Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-sm mb-10 max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal block mb-2">
            Legal &amp; Regulatory Disclosure
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate">
            Last Updated: October 2026 · Governed by the Privacy Act 1988 (Cth) and Australian Privacy Principles (APPs)
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-sm max-w-4xl mx-auto space-y-8 text-slate text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">1. Commitment to Your Privacy</h2>
            <p>
              <strong>{BRAND.legalName}</strong> (trading as <strong>{BRAND.name}</strong>, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal and financial information. We handle all personal information in accordance with the <em>Privacy Act 1988 (Cth)</em>, the <em>Australian Privacy Principles (APPs)</em>, and the <em>Credit Reporting Privacy Code</em>.
            </p>
            <p>
              This Privacy Policy explains how we collect, hold, use, and disclose personal and credit-related information in the course of providing mortgage brokerage and credit assistance services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">2. Information We Collect</h2>
            <p>
              To provide credit assistance and evaluate loan options across our panel of 50+ lenders, we must collect comprehensive financial information, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Identity Details:</strong> Full name, date of birth, residential address, driver&apos;s licence number, passport details, and citizenship status.</li>
              <li><strong>Financial Details:</strong> Employment history, payslips, tax returns, bank statements, living expenses, assets, liabilities, and superannuation balances.</li>
              <li><strong>Credit Information:</strong> Credit scores, repayment history, default listings, and information provided by credit reporting bodies (such as Equifax, Experian, or illion).</li>
              <li><strong>Property Details:</strong> Purchase contracts, council rate notices, and valuation documentation for security properties.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">3. How Information Is Collected</h2>
            <p>
              We collect personal information directly from you via our online consultation forms, email correspondence, document uploads, and telephone interviews. We may also obtain information from third parties with your explicit written consent, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Credit reporting bodies to assess your borrowing profile;</li>
              <li>Your accountant, financial planner, or conveyancer;</li>
              <li>Lenders, banks, and mortgage aggregators participating in our panel.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">4. Purpose of Collection and Use</h2>
            <p>
              We collect, hold, and use your personal and credit information for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Assessing your eligibility for credit products under the <em>National Consumer Credit Protection Act 2009</em>;</li>
              <li>Satisfying our statutory <strong>Best Interests Duty (BID)</strong> by recommending suitable credit options;</li>
              <li>Submitting formal mortgage loan applications to banks and lenders on your behalf;</li>
              <li>Complying with mandatory legal obligations, including the <em>Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (AML/CTF)</em>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">5. Disclosure of Your Information</h2>
            <p>
              We will only disclose your information to third parties who assist us in managing your mortgage application, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Prospective lenders and credit providers participating in our panel;</li>
              <li>Mortgage aggregation groups and IT systems providers (including lead and CRM platforms such as Privyr);</li>
              <li>Property valuers, title insurers, conveyancers, and legal representatives;</li>
              <li>Government regulators, law enforcement, or external dispute resolution bodies (AFCA) when required by law.</li>
            </ul>
            <p>
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">6. Data Storage &amp; Security</h2>
            <p>
              We take all reasonable steps to protect your personal information from misuse, loss, unauthorized access, modification, or disclosure. All digital documents are stored in secure, encrypted cloud environments with multi-factor authentication.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">7. Accessing and Correcting Your Information</h2>
            <p>
              Under the APPs, you have the right to request access to personal information we hold about you and request corrections if any information is inaccurate, out-of-date, or incomplete.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-navy">8. Contact Our Privacy Officer</h2>
            <p>
              If you have any questions or wish to lodge a privacy complaint, please contact our designated privacy officer:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1">
              <p><strong>Privacy Officer — {BRAND.name}</strong></p>
              <p>Operating Entity: {BRAND.legalName}</p>
              <p>Email: <a href={`mailto:${BRAND.email}`} className="text-teal font-semibold hover:underline">{BRAND.email}</a></p>
              <p>Location: Nationwide Australia</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
