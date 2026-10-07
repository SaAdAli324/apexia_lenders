"use client";

import { useEffect, useState } from "react";
import { TOTAL_LENDERS } from "@/data/lenders";

// Grouping the 21 available logos into 6 distinct disjoint sets so no two blocks show the same logo.
const LOGO_SETS = [
  ["/lender-logos/1.png", "/lender-logos/10.png", "/lender-logos/16.png", "/lender-logos/23.png"],
  ["/lender-logos/2.png", "/lender-logos/11.png", "/lender-logos/17.png", "/lender-logos/24.png"],
  ["/lender-logos/3.png", "/lender-logos/12.png", "/lender-logos/18.png", "/lender-logos/25.png"],
  ["/lender-logos/6.png", "/lender-logos/13.png", "/lender-logos/19.png"],
  ["/lender-logos/7.png", "/lender-logos/14.png", "/lender-logos/21.png"],
  ["/lender-logos/8.png", "/lender-logos/15.png", "/lender-logos/22.png"],
];

// Unique animation intervals (in ms) for each block to ensure desynchronized fading
const TIMINGS = [2500, 2200, 2800, 3100, 2400, 2900];

function AnimatedLogoBlock({ logos, intervalMs }: { logos: string[]; intervalMs: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % logos.length);
        setIsFadingOut(false);
      }, 500); 
    }, intervalMs);

    return () => clearInterval(timer);
  }, [logos, intervalMs]);

  return (
    <div className="bg-white border-2 border-slate-200 rounded w-full h-16 sm:h-24 lg:h-[72px] xl:h-24 flex items-center justify-center shadow-sm relative overflow-hidden">
      <img
        src={logos[currentIndex]}
        alt="Lender Logo"
        className={`w-full h-full object-contain p-2 transition-all duration-500 ease-in-out ${
          isFadingOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      />
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="bg-light-bg py-14 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Copy */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <p className="text-navy font-bold text-xs tracking-[0.2em] uppercase mb-3">
              More Choice. Better Loans.
            </p>
            <h2 className="text-fluid-h2 font-bold text-navy mb-4">
              We compare {TOTAL_LENDERS}+ lenders<br className="hidden lg:block" />so you don&apos;t have to.
            </h2>
            <p className="text-slate text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
              From major banks to specialist lenders, we compare hundreds of
              loan products to find the right fit for your goals and your future.
            </p>
            <a
              href="/services"
              className="inline-flex items-center gap-2 text-navy font-bold text-sm mt-6 hover:text-navy-light transition-colors"
            >
              See our lender panel
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right — Lender Logos */}
          <div className="flex flex-col gap-4 lg:ml-auto w-full lg:w-auto mt-8 lg:mt-0 items-center lg:items-end">
            {/* Top Row: 3 Lenders */}
            <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
              {LOGO_SETS.slice(0, 3).map((logos, index) => (
                <div key={`top-${index}`} className="w-28 sm:w-44 lg:w-[116px] xl:w-44">
                  <AnimatedLogoBlock logos={logos} intervalMs={TIMINGS[index]} />
                </div>
              ))}
            </div>
            
            {/* Bottom Row: 3 Lenders + Extra Card */}
            <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
              {LOGO_SETS.slice(3, 6).map((logos, index) => (
                <div key={`bottom-${index}`} className="w-24 sm:w-36 lg:w-24 xl:w-36">
                  <AnimatedLogoBlock logos={logos} intervalMs={TIMINGS[index + 3]} />
                </div>
              ))}
              
              <div className="bg-white border-2 border-slate-200 rounded w-24 sm:w-36 lg:w-24 xl:w-36 h-16 sm:h-24 lg:h-[72px] xl:h-24 flex flex-col items-center justify-center text-center shadow-sm shrink-0">
                <span className="text-navy font-bold text-lg sm:text-xl leading-tight">+{TOTAL_LENDERS - 6}</span>
                <span className="text-[10px] sm:text-xs text-slate font-medium">more lenders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
