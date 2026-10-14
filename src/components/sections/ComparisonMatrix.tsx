"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface ComparisonRow {
  feature: string;
  description: string;
  apexia: string;
  apexiaDetail: string;
  bank: string;
  bankDetail: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    feature: "Lender Choice",
    description: "Number of options available to you",
    apexia: "50+ Lenders & Banks",
    apexiaDetail: "Access to Big 4, challenger banks, and specialist non-bank lenders",
    bank: "1 Bank Only",
    bankDetail: "Only allowed to sell their own branded loan products",
  },
  {
    feature: "Legal Duty of Care",
    description: "Who they legally work for",
    apexia: "Best Interests Duty (BID)",
    apexiaDetail: "Legally mandated by Australian law to put your interests first",
    bank: "The Bank's Shareholders",
    bankDetail: "Tied to sales targets and internal bank profit margins",
  },
  {
    feature: "Rate Negotiation",
    description: "Leverage to get rate discounts",
    apexia: "High Negotiation Power",
    apexiaDetail: "We pit competing lenders against each other for unpublished discounts",
    bank: "Take-It-or-Leave-It",
    bankDetail: "Staff generally offer standard branch carded rates",
  },
  {
    feature: "Cost to You",
    description: "Brokerage fees or charges",
    apexia: "$0 Free Service",
    apexiaDetail: "Lenders pay us commission upon settlement—never any fee to you",
    bank: "Standard Bank Fees",
    bankDetail: "Subject to application, package, and settlement fees",
  },
  {
    feature: "Ongoing Rate Reviews",
    description: "Protection against the 'loyalty tax'",
    apexia: "Proactive Annual Reviews",
    apexiaDetail: "We regularly review your rate and renegotiate with your lender",
    bank: "Rarely Reviewed",
    bankDetail: "Banks typically reserve their sharpest rates for new customers only",
  },
  {
    feature: "Application & Process",
    description: "Managing the paperwork and approval",
    apexia: "Complete End-to-End Service",
    apexiaDetail: "We package, lodge, and manage the file right through to settlement",
    bank: "Manual DIY Chasing",
    bankDetail: "You coordinate documents, branch appointments, and call centres",
  },
];

export default function ComparisonMatrix() {
  const handleScrollToContact = () => {
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#0B1D33] text-white border-b border-navy-light/40 relative overflow-hidden">
      {/* Subtle ambient teal background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#1A3E66]/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="The Broker Advantage"
          title="Apexia Lending vs Walking into a Big 4 Bank"
          subtitle="Why thousands of Australian property buyers choose an independent mortgage broker rather than walking straight into a single bank branch."
          light={true}
        />

        {/* Desktop Table View - High Contrast Premium Midnight Theme */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-[#0F2540]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-[#0A192F]">
                <th className="py-5 px-6 font-bold text-white text-sm uppercase tracking-wider w-1/3">
                  What Matters Most
                </th>
                <th className="py-5 px-6 font-bold text-white text-sm uppercase tracking-wider w-1/3 bg-teal/20 border-x border-teal/30 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-teal font-extrabold">Apexia Lending</span>
                    <span className="bg-teal text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-normal shadow-xs">
                      Your Advantage
                    </span>
                  </div>
                </th>
                <th className="py-5 px-6 font-bold text-white/60 text-sm uppercase tracking-wider w-1/3">
                  Going Direct to a Bank
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {COMPARISONS.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={idx % 2 === 0 ? "bg-[#0F2540]" : "bg-[#0B1E34]"}
                >
                  {/* Feature */}
                  <td className="py-5 px-6 align-top">
                    <p className="font-bold text-white text-base">{row.feature}</p>
                    <p className="text-xs text-white/50 mt-0.5">{row.description}</p>
                  </td>

                  {/* Apexia Lending */}
                  <td className="py-5 px-6 align-top bg-teal/5 border-x border-teal/20 relative">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{row.apexia}</p>
                        <p className="text-xs text-white/70 mt-1 leading-relaxed">{row.apexiaDetail}</p>
                      </div>
                    </div>
                  </td>

                  {/* Single Bank */}
                  <td className="py-5 px-6 align-top">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 text-white/40 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-white/70 text-sm">{row.bank}</p>
                        <p className="text-xs text-white/40 mt-1 leading-relaxed">{row.bankDetail}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Cards View */}
        <div className="lg:hidden space-y-4">
          {COMPARISONS.map((row) => (
            <div
              key={row.feature}
              className="bg-[#0F2540] rounded-2xl border border-white/15 p-5 shadow-sm space-y-4"
            >
              <div>
                <h4 className="font-bold text-white text-base">{row.feature}</h4>
                <p className="text-xs text-white/50">{row.description}</p>
              </div>

              {/* Apexia */}
              <div className="bg-teal/10 border border-teal/30 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-teal uppercase tracking-wider">
                    Apexia Lending
                  </span>
                  <div className="w-5 h-5 rounded-full bg-teal text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                </div>
                <p className="font-bold text-white text-sm">{row.apexia}</p>
                <p className="text-xs text-white/80 mt-1">{row.apexiaDetail}</p>
              </div>

              {/* Single Bank */}
              <div className="bg-black/20 border border-white/10 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Single Bank
                  </span>
                  <span className="text-white/40 text-xs font-bold">✕</span>
                </div>
                <p className="font-medium text-white/70 text-sm">{row.bank}</p>
                <p className="text-xs text-white/40 mt-1">{row.bankDetail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-teal/20 via-navy-light/40 to-teal/20 border border-teal/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to see what 50+ lenders offer you?
            </h3>
            <p className="text-white/80 text-sm max-w-xl">
              Get an obligation-free loan review. We compare policies, calculate your borrowing power, and find the right rate.
            </p>
          </div>
          <Button
            onClick={handleScrollToContact}
            variant="primary"
            size="md"
            className="w-full sm:w-auto shrink-0 shadow-lg cursor-pointer"
          >
            Start Free Assessment
          </Button>
        </div>
      </div>
    </section>
  );
}
