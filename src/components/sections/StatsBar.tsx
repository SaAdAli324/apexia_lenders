"use client";

import { TOTAL_LENDERS } from "@/data/lenders";

const STATS = [
  {
    number: `${TOTAL_LENDERS}+`,
    label: "Australian Lenders",
    subtext: "Major banks & specialist lenders compared",
    icon: (
      <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    number: "$0",
    label: "Broker Fee to You",
    subtext: "100% free service, paid by the lender",
    icon: (
      <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "5.79%*",
    label: "Starting Rates",
    subtext: "Competitive wholesale & broker pricing",
    icon: (
      <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    number: "24–48h",
    label: "Fast Pre-Approval",
    subtext: "Rapid turnaround on urgent loan files",
    icon: (
      <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function StatsBar() {
  return (
    <section className="bg-navy border-b border-navy-light/40 py-10 lg:py-12 relative z-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-start ${
                i > 0 ? "pt-6 lg:pt-0 lg:pl-8" : ""
              }`}
            >
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-11 h-11 rounded-xl bg-teal/15 flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  {stat.number}
                </span>
              </div>
              <p className="text-white font-bold text-sm sm:text-base mt-1">
                {stat.label}
              </p>
              <p className="text-white/60 text-xs sm:text-sm mt-0.5 leading-snug">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
