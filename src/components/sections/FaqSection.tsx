"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How can Apexia Lending provide a 100% free brokerage service?",
    answer:
      "In Australia, mortgage brokers are paid a commission directly by the lender when your loan settles. This service costs you nothing extra—lenders do not charge higher interest rates or fees when you apply through a broker. In fact, because we compare 50+ lenders and negotiate rate discounts, our clients frequently secure better rates than those advertised in retail bank branches.",
  },
  {
    question: "Will exploring my loan options or checking borrowing capacity hurt my credit score?",
    answer:
      "No. Having a consultation, assessing your borrowing power, and reviewing potential lenders with Apexia does NOT impact your credit score. We only submit a formal credit enquiry once you have selected your preferred loan package and officially authorized us to lodge your application with that specific lender.",
  },
  {
    question: "How much deposit do I need to buy a home in Australia?",
    answer:
      "While a 20% deposit avoids Lenders Mortgage Insurance (LMI), you do not need 20% to buy a home. Many Australian lenders accept deposits as low as 5% to 10%. Furthermore, eligible first home buyers can access the Australian Government's Home Guarantee Scheme (HGS), allowing you to purchase with just a 5% deposit with zero LMI fees.",
  },
  {
    question: "How long does home loan pre-approval take?",
    answer:
      "Turnaround times depend on the specific lender and loan complexity. With fast-track digital lenders on our 50+ panel, initial pre-approval can occur within 24 to 48 hours. Major banks typically take between 3 to 7 business days. If you are attending an upcoming auction or have tight contract conditions, we match you with lenders who meet your timeline.",
  },
  {
    question: "What is the difference between an interest rate and a comparison rate?",
    answer:
      "The interest rate is the base percentage charged on your loan balance. The comparison rate reflects the true annual cost of the loan by combining the interest rate with mandatory upfront and ongoing fees (such as monthly account keeping fees or annual package fees). It helps you accurately compare the total cost between different loan products.",
  },
  {
    question: "Can you help if I am self-employed or have non-traditional income?",
    answer:
      "Yes. Self-employed borrowers, subcontractors, and business owners frequently face rigid lending criteria at single branch banks. We work with specialist Alt-Doc and Low-Doc lenders across our panel who evaluate business bank statements, BAS statements, or accountant declarations instead of requiring standard 2-year tax returns.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleScrollToContact = () => {
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#F0FAF9] border-b border-teal/20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about working with an Australian mortgage broker and securing your home loan."
        />

        {/* 2-Column Picture Beside Content Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Picture & Quick Help Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/refinance.jpg"
                alt="Borrowers reviewing mortgage refinance options with confidence"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-teal">
                  Personal Guidance
                </p>
                <h4 className="text-xl font-bold mt-1 text-white">
                  Have a specific loan scenario?
                </h4>
                <p className="text-xs text-white/80 mt-1.5 leading-relaxed">
                  Every borrower is unique. Speak directly with our broker to evaluate your exact borrowing capacity.
                </p>
                <button
                  onClick={handleScrollToContact}
                  className="mt-4 px-4 py-2.5 bg-teal text-white rounded-xl text-xs font-bold hover:bg-teal-light transition-colors shadow-md cursor-pointer flex items-center gap-2"
                >
                  Book Free 15-Min Chat
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion FAQs */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-navy text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "bg-navy text-white rotate-180"
                          : "bg-slate-100 text-slate hover:bg-slate-200"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
