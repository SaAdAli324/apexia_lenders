"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

type RateCategory = "all" | "purchase" | "refinance" | "first-home" | "investor";

interface RateProduct {
  id: string;
  category: "purchase" | "refinance" | "first-home" | "investor";
  title: string;
  badge: string;
  isSpecial?: boolean;
  rate: string;
  comparisonRate: string;
  type: string;
  highlights: string[];
  sampleRepayment: string;
}

const PRODUCTS: RateProduct[] = [
  {
    id: "refinance-cashback",
    category: "refinance",
    title: "Refinance Cashback Package",
    badge: "Up to $2,000 Cashback",
    isSpecial: true,
    rate: "5.79%",
    comparisonRate: "6.09%*",
    type: "Variable Rate • P&I",
    highlights: [
      "Up to $2,000 cash rebate on eligible refinances",
      "100% full offset account with unlimited redraw",
      "No ongoing monthly bank account keeping fees",
    ],
    sampleRepayment: "$3,518 / mo",
  },
  {
    id: "owner-occupied-discount",
    category: "purchase",
    title: "Owner-Occupied Home Loan",
    badge: "Competitive Tier",
    rate: "5.84%",
    comparisonRate: "6.14%*",
    type: "Variable Rate • P&I",
    highlights: [
      "Wholesale pricing discount for strong LVR files",
      "Flexible weekly, fortnightly, or monthly payments",
      "Dedicated loan specialist managing settlement",
    ],
    sampleRepayment: "$3,537 / mo",
  },
  {
    id: "first-home-scheme",
    category: "first-home",
    title: "First Home Guarantee Scheme",
    badge: "5% Deposit • Zero LMI",
    isSpecial: true,
    rate: "5.89%",
    comparisonRate: "6.19%*",
    type: "Variable Rate • P&I",
    highlights: [
      "Buy with 5% deposit with NO Lenders Mortgage Insurance",
      "Save up to $25,000+ on upfront borrowing costs",
      "Full assistance applying for state government grants",
    ],
    sampleRepayment: "$3,556 / mo",
  },
  {
    id: "investor-growth",
    category: "investor",
    title: "Investment Property Loan",
    badge: "Investor Rate",
    rate: "6.14%",
    comparisonRate: "6.45%*",
    type: "Variable / Fixed Options",
    highlights: [
      "Interest-only payment options available up to 5 years",
      "Multiple security and equity release structures",
      "Tax-effective offset accounts for property investors",
    ],
    sampleRepayment: "$3,653 / mo",
  },
];

export default function FeaturedRates() {
  const [activeTab, setActiveTab] = useState<RateCategory>("all");

  const filteredProducts = activeTab === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeTab);

  const handleEnquire = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#EDF7F9] via-[#F4FAFA] to-white border-y border-teal/20 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Market Rate Comparison"
            title="Featured Home Loan Rates in Australia"
            subtitle="We compare 50+ lenders to uncover wholesale discounts and broker-negotiated rates that aren't advertised in local bank branches."
            align="left"
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 shrink-0 pb-2">
            {[
              { id: "all", label: "All Featured" },
              { id: "purchase", label: "Buying a Home" },
              { id: "refinance", label: "Refinancing" },
              { id: "first-home", label: "First Home Buyer" },
              { id: "investor", label: "Investors" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as RateCategory)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-navy text-white shadow-md border border-navy"
                    : "bg-white text-slate border border-slate-200 hover:border-teal/50 hover:text-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-navy/40 transition-all duration-300 group relative"
            >
              <div>
                {/* Unified Professional Badges - Cohesive Brand Colors */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      product.isSpecial
                        ? "bg-navy text-white border-navy"
                        : "bg-slate-100 text-navy border-slate-200"
                    }`}
                  >
                    {product.badge}
                  </span>
                  <span className="text-[11px] text-slate font-medium">
                    {product.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-navy group-hover:text-teal transition-colors mb-4 leading-snug">
                  {product.title}
                </h3>

                {/* Big Rate Display */}
                <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-200/80">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight font-sans">
                      {product.rate}
                    </span>
                    <span className="text-xs font-bold text-slate">p.a.</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate mt-1.5 pt-1.5 border-t border-slate-200/60">
                    <span>Comparison rate:</span>
                    <span className="font-bold text-navy">{product.comparisonRate}</span>
                  </div>
                </div>

                {/* Estimated Repayment Callout */}
                <div className="mb-5 pb-5 border-b border-slate-100">
                  <div className="text-xs text-slate font-medium">Estimated Monthly Repayment:</div>
                  <div className="text-sm font-bold text-navy mt-0.5">
                    {product.sampleRepayment}
                    <span className="text-[11px] font-normal text-slate-light ml-1">
                      ($600k / 30 yrs)
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2.5 text-xs text-slate mb-6">
                  {product.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-teal shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="leading-snug">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={handleEnquire}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-navy text-white hover:bg-teal transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                Check My Eligibility
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Compliant Footnote */}
        <div className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate leading-relaxed">
          <p>
            *<strong>Comparison Rate Warning:</strong> Comparison rates are based on a secured loan of $150,000 over a term of 25 years. WARNING: This comparison rate applies only to the example or examples given. Different amounts and terms will result in different comparison rates. Costs such as redraw fees or early repayment fees, and cost savings such as fee waivers, are not included in the comparison rate but may influence the cost of the loan. Interest rates shown are indicative and subject to lender approval and eligibility criteria.
          </p>
        </div>
      </div>
    </section>
  );
}
