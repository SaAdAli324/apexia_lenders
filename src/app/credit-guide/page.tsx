import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Credit Guide & Complaints Procedure | Apexia Lending Australia",
  description:
    "Apexia Lending's statutory Credit Guide under the National Consumer Credit Protection Act 2009. Details on our licensing, Best Interests Duty, commissions, and AFCA dispute resolution.",
};

export default function CreditGuidePage() {
  return (
    <div className="bg-light-bg min-h-screen py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span>Credit Guide</span>
        </div>

        {/* Header Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-sm mb-10 max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal block mb-2">
            Statutory Regulatory Document (NCCP Act 2009)
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-4">
            Credit Guide &amp; Complaints Policy
          </h1>
          <p className="text-xs text-slate leading-relaxed">
            This document outlines critical information about our credit services, licensing authorizations, remuneration disclosure, and dispute resolution processes under Australian credit law.
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-sm max-w-4xl mx-auto space-y-8 text-slate text-sm leading-relaxed">
          
          {/* Section 1: Entity Details */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-navy border-b border-border pb-2">
              1. Credit Representative &amp; Licensing Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="text-xs font-bold uppercase text-slate">Operating Trading Name</p>
                <p className="font-bold text-navy text-sm sm:text-base">{BRAND.name}</p>
                <p className="text-slate">Corporate Entity: {BRAND.legalName}</p>
                <p className="text-slate">Email: {BRAND.email}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="text-xs font-bold uppercase text-slate">Licensing Details</p>
                <p className="font-bold text-navy">Credit Representative Number (CRN): {BRAND.creditRepresentativeNumber}</p>
                <p className="text-slate">Authorised under Australian Credit Licence (ACL): {BRAND.australianCreditLicence}</p>
                <p className="text-slate">Industry Body: AFCA Member</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed">
              We are authorized under our Credit Representative appointment to provide credit assistance to consumers, including recommending home loans, investment property loans, and debt consolidation facilities.
            </p>
          </section>

          {/* Section 2: Best Interests Duty */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy border-b border-border pb-2">
              2. Our Legal Obligations to You (Best Interests Duty)
            </h2>
            <p>
              Under Part 3-5A of the <em>National Consumer Credit Protection Act 2009 (NCCPA)</em>, mortgage brokers are subject to a statutory <strong>Best Interests Duty (BID)</strong>. This means we are legally required to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Act in your best interests at all times when providing credit assistance;</li>
              <li>Give priority to your interests over our own or those of any lender or third party;</li>
              <li>Thoroughly inquire into your financial situation, requirements, and objectives before presenting loan options;</li>
              <li>Ensure that any recommended credit contract is not unsuitable for your specific needs.</li>
            </ul>
            <p className="text-xs italic bg-teal/5 p-3 rounded-lg border border-teal/20 text-navy">
              Note: Retail bank branch employees are generally exempt from the Best Interests Duty and are only permitted to recommend their employer&apos;s products.
            </p>
          </section>

          {/* Section 3: Panel Lenders */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy border-b border-border pb-2">
              3. Our Panel of 50+ Australian Lenders
            </h2>
            <p>
              We maintain direct and aggregated access to more than 50 Australian banks, credit unions, and non-bank lenders, including:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed text-navy font-medium">
              Commonwealth Bank, Westpac, ANZ, NAB, Macquarie Bank, ING, St.George Bank, Bank of Queensland, Suncorp Bank, Bankwest, ubank, ME Bank, Auswide Bank, Beyond Bank, AMP Bank, Pepper Money, Liberty Financial, Firstmac, Resimac, and 30+ other accredited institutions.
            </div>
          </section>

          {/* Section 4: Fees and Commissions */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy border-b border-border pb-2">
              4. Fees &amp; Commission Transparency
            </h2>
            <p>
              <strong>Do you pay us a fee?</strong> No. For standard residential home loan applications, our brokerage service is 100% free of charge to you.
            </p>
            <p>
              <strong>How are we paid?</strong> We receive remuneration directly from the lender when your loan settles:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Upfront Commission:</strong> Usually ranges between 0.50% and 0.70% (+ GST) of the net loan amount settled, paid by the lender once settlement takes place.</li>
              <li><strong>Trail Commission:</strong> Usually ranges between 0.15% and 0.20% (+ GST) per annum based on your remaining monthly loan balance for ongoing file management and rate review support.</li>
            </ul>
            <p className="text-xs text-slate">
              Lenders do not charge you a higher interest rate or fee because you used a broker. We provide a full Written Credit Proposal detailing exact dollar amounts of commissions before you submit your formal application.
            </p>
          </section>

          {/* Section 5: Dispute Resolution & AFCA */}
          <section className="space-y-4 pt-2">
            <h2 className="text-lg font-bold text-navy border-b border-border pb-2">
              5. Dispute Resolution &amp; Complaints Process
            </h2>
            <p>
              We are committed to delivering the highest caliber of professional service. However, if you are dissatisfied with any aspect of our service, we have an established dispute resolution procedure:
            </p>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-navy">
                  Step 1: Internal Dispute Resolution (IDR)
                </h3>
                <p className="text-xs leading-relaxed text-slate">
                  Please contact our Complaints Officer outlining the nature of your concern:
                </p>
                <div className="text-xs text-navy font-medium space-y-0.5">
                  <p><strong>Complaints Officer — {BRAND.name}</strong></p>
                  <p>Email: <a href={`mailto:${BRAND.email}`} className="text-teal hover:underline">{BRAND.email}</a></p>
                </div>
                <p className="text-xs text-slate leading-relaxed">
                  We will acknowledge receipt of your complaint within 1 business day and provide a comprehensive written determination within 30 calendar days, in accordance with ASIC Regulatory Guide 271.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F0FAF9] border border-teal/30 space-y-2">
                <h3 className="text-sm font-bold text-navy">
                  Step 2: External Dispute Resolution (AFCA)
                </h3>
                <p className="text-xs leading-relaxed text-slate">
                  If we cannot resolve your complaint to your satisfaction, or if 30 days have elapsed without a resolution, you have the statutory right to refer the matter to the <strong>Australian Financial Complaints Authority (AFCA)</strong>.
                </p>
                <div className="text-xs text-navy font-medium space-y-1 bg-white p-3 rounded-xl border border-teal/20">
                  <p><strong>Australian Financial Complaints Authority (AFCA)</strong></p>
                  <p>Toll-Free Phone: <span className="text-teal font-bold">1800 931 678</span></p>
                  <p>Email: <a href="mailto:info@afca.org.au" className="text-teal hover:underline">info@afca.org.au</a></p>
                  <p>Website: <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">www.afca.org.au</a></p>
                  <p>Postal Address: GPO Box 3, Melbourne VIC 3001</p>
                </div>
                <p className="text-[11px] text-slate-light leading-relaxed">
                  AFCA provides fair and independent financial services complaint resolution that is completely free to Australian consumers.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
