import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use | Apexia Lending Australia",
  description:
    "Website Terms of Use, general financial advice warning, calculator disclaimer, and terms governing the use of Apexia Lending's online services.",
};

export default function TermsOfUsePage() {
  return (
    <div className="bg-light-bg min-h-screen py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span>Terms of Use</span>
        </div>

        {/* Header Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-sm mb-10 max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal block mb-2">
            User Agreement &amp; Website Terms
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-4">
            Terms of Use
          </h1>
          <p className="text-xs text-slate">
            Last Updated: October 2026 · Governed by the Laws of Australia
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-sm max-w-4xl mx-auto space-y-8 text-slate text-sm leading-relaxed">
          
          {/* Important Warning Banner */}
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-navy space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-700">
              Important: General Advice Warning
            </h2>
            <p className="text-xs sm:text-sm text-slate leading-relaxed">
              The information and calculations provided on this website are of a general nature only and have been prepared without taking into account your objectives, financial situation, or specific needs. Before acting on any information, you should consider its appropriateness having regard to your personal circumstances. We recommend seeking professional advice or speaking with our accredited credit representative before entering into any financial commitment.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using this website (<strong>apexialending.com.au</strong>), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use and our Privacy Policy. This website is owned and operated by <strong>{BRAND.legalName}</strong> trading as <strong>{BRAND.name}</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
            </p>
            <p>
              If you do not agree to these terms, you must discontinue using our website immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">2. Nature of Mortgage Brokerage Services</h2>
            <p>
              Apexia Lending is a mortgage brokerage and credit representative. We are not a bank, authorized deposit-taking institution (ADI), or credit provider. We do not lend money directly to consumers. Our role is to compare credit products across participating Australian lenders, negotiate rates, and assist you in preparing and lodging loan applications under the <em>National Consumer Credit Protection Act 2009</em>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">3. Calculator Results &amp; Estimations</h2>
            <p>
              The loan calculators (including Borrowing Power, Mortgage Repayments, and Stamp Duty) available on this site are designed as analytical tools to provide illustrative estimates only:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Calculations are based on standard mathematical formulas, assumed interest rates, and APRA serviceability buffers;</li>
              <li>Results do not constitute a credit quote, pre-approval, loan approval, or formal offer of finance from any lender;</li>
              <li>Actual repayments, borrowing limits, and interest rates vary depending on specific lender policies, loan-to-value ratios (LVR), credit scores, and property valuations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">4. Accuracy of Information &amp; Interest Rates</h2>
            <p>
              While we take all reasonable care to ensure that interest rates, lender fees, and statutory formulas are accurate and up to date, Australian financial markets fluctuate rapidly. We make no warranty or representation as to the absolute completeness, accuracy, or currency of content displayed on this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">5. Intellectual Property Rights</h2>
            <p>
              All content on this website, including logos, text, brand marks, graphic designs, software scripts, and interface elements, is the intellectual property of <strong>{BRAND.legalName}</strong> and protected by Australian and international copyright laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, including the Australian Consumer Law (ACL), {BRAND.legalName} and its officers shall not be liable for any indirect, incidental, or consequential loss or damage arising out of your access to, or use of, this website or reliance upon any calculation or information published herein.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-navy">7. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms of Use are governed by and construed in accordance with the laws of the Commonwealth of Australia. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the Australian courts.
            </p>
            <p className="text-xs text-slate mt-2">
              For any questions regarding these terms, please contact us at <a href={`mailto:${BRAND.email}`} className="text-teal font-semibold hover:underline">{BRAND.email}</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
