import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Australian Home Loan Guide | Apexia Lending",
  description:
    "The step-by-step guide to securing a home loan in Australia. Learn about deposits, LMI, pre-approval, offset accounts, government schemes, and settlement.",
};

export default function HomeLoanGuidePage() {
  return (
    <div className="bg-light-bg min-h-screen py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span>Home Loan Guide</span>
        </div>

        {/* Hero Header */}
        <div className="bg-navy rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#13A3B5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal/20 text-teal border border-teal/30">
              Buyer Roadmap &amp; Knowledge Base
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              The Complete Australian Home Loan Guide
            </h1>
            <p className="text-base sm:text-lg text-slate-light leading-relaxed">
              Navigating the Australian mortgage landscape can feel overwhelming. From saving your deposit and decoding bank jargon to auction pre-approval and settlement, here is everything you need to know.
            </p>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Main Guide Content */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-border shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h2 className="text-xl font-bold text-navy">
                  Saving Your Deposit &amp; Understanding LMI
                </h2>
              </div>
              <p className="text-sm text-slate leading-relaxed">
                Traditionally, Australian banks prefer a <strong>20% deposit</strong> to avoid <strong>Lenders Mortgage Insurance (LMI)</strong>. LMI is an insurance policy that protects the bank (not you) if you default on your mortgage.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
                <p className="font-bold text-navy">Low-Deposit Alternatives:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate">
                  <li><strong>Home Guarantee Scheme (HGS):</strong> Eligible first home buyers can purchase with as little as a 5% deposit with zero LMI, as the Federal Government guarantees the remaining 15%.</li>
                  <li><strong>Family Guarantor Loans:</strong> Parents can pledge equity in their home as additional security, enabling a 0% cash deposit purchase without LMI.</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-border shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h2 className="text-xl font-bold text-navy">
                  Calculating Your True Borrowing Power
                </h2>
              </div>
              <p className="text-sm text-slate leading-relaxed">
                Banks don&apos;t just look at what you earn—they stress-test your capacity under mandatory <strong>APRA serviceability buffers</strong>. This means if current variable rates are 6.00%, lenders assess your ability to repay at 9.00% (adding a 3.00% buffer).
              </p>
              <p className="text-sm text-slate leading-relaxed">
                Lenders also factor in <strong>credit card limits</strong> (treating every $10,000 credit limit as approximately $300 - $380/month in mandatory repayment commitments, even if your balance is zero) and declare living expenses using the Household Expenditure Method (HEM).
              </p>
              <div className="pt-2">
                <Link
                  href="/calculators#borrowing-power"
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal hover:underline"
                >
                  <span>Test your borrowing power with our APRA calculator →</span>
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-border shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <h2 className="text-xl font-bold text-navy">
                  Choosing Between Fixed, Variable &amp; Split Rates
                </h2>
              </div>
              <p className="text-sm text-slate leading-relaxed">
                Structuring your loan properly can save you tens of thousands of dollars over a 30-year term:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-navy mb-1">Variable Rate Loans</h4>
                  <p className="text-slate text-xs leading-relaxed">
                    Provide maximum flexibility, 100% offset accounts, unlimited extra repayments, and redraw facilities. Interest rates fluctuate with RBA cash rate decisions.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-navy mb-1">Fixed Rate Loans</h4>
                  <p className="text-slate text-xs leading-relaxed">
                    Locks your interest rate and monthly repayment for 1 to 5 years, providing budgeting certainty. However, extra repayments are usually capped and break costs apply if you exit early.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-8 border border-border shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <h2 className="text-xl font-bold text-navy">
                  Securing Pre-Approval &amp; Formal Settlement
                </h2>
              </div>
              <p className="text-sm text-slate leading-relaxed">
                Before attending open inspections or bidding at auctions, obtaining <strong>formal conditional pre-approval</strong> gives you a verified price ceiling valid for 90 days.
              </p>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span><strong>Offer Accepted:</strong> You sign the Contract of Sale with a finance clause or auction confirmation.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span><strong>Valuation:</strong> The lender orders an independent valuation of the property to confirm its security value.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span><strong>Formal Approval &amp; Loan Documents:</strong> The bank issues formal approval and digital mortgage contracts.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal font-bold">✓</span>
                  <span><strong>Settlement:</strong> PEXA digital settlement takes place, funds are transferred to the vendor, and keys are handed over!</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Tools & Consultation Card */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* Calculator Card */}
            <div className="bg-white rounded-3xl p-6 border border-border shadow-xs space-y-4">
              <h3 className="text-base font-bold text-navy border-b border-border pb-3">
                Mortgage Calculators
              </h3>
              <p className="text-xs text-slate leading-relaxed">
                Crunch the numbers before you shop. All tools are updated with 2026 APRA guidelines.
              </p>
              <div className="space-y-2">
                <Link
                  href="/calculators#borrowing-power"
                  className="block p-3 rounded-xl bg-slate-50 hover:bg-teal/10 hover:text-teal text-navy font-semibold text-xs transition-colors"
                >
                  Borrowing Power Calculator →
                </Link>
                <Link
                  href="/calculators#repayments"
                  className="block p-3 rounded-xl bg-slate-50 hover:bg-teal/10 hover:text-teal text-navy font-semibold text-xs transition-colors"
                >
                  Mortgage Repayments Calculator →
                </Link>
                <Link
                  href="/calculators#stamp-duty"
                  className="block p-3 rounded-xl bg-slate-50 hover:bg-teal/10 hover:text-teal text-navy font-semibold text-xs transition-colors"
                >
                  Stamp Duty &amp; Upfront Costs →
                </Link>
              </div>
            </div>

            {/* Free Advice Banner */}
            <div className="bg-[#112A46] rounded-3xl p-6 text-white space-y-3">
              <span className="text-xs font-bold text-teal uppercase tracking-wider block">
                Expert Assistance
              </span>
              <h4 className="text-lg font-bold">
                Get Personalized Advice from Farid
              </h4>
              <p className="text-xs text-slate-light leading-relaxed">
                Have questions about your specific borrowing situation? We compare 50+ lenders to match you with the right loan.
              </p>
              <div className="pt-2">
                <Button href="/contact" variant="primary" size="sm" className="w-full text-center">
                  Book Free Consultation
                </Button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
