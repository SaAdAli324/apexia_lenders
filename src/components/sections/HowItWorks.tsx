"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "1",
    title: "Tell us about you",
    description:
      "Share your goals and financial situation in a quick, no-obligation chat.",
    icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  },
  {
    number: "2",
    title: "We compare 50+ lenders",
    description:
      "We assess hundreds of loan products to find the right fit for you.",
    icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  },
  {
    number: "3",
    title: "We recommend the best options",
    description:
      "You'll receive tailored recommendations with clear savings insights.",
    icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    number: "4",
    title: "We handle the paperwork",
    description:
      "We manage the entire application process, from start to finish.",
    icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
  {
    number: "5",
    title: "You settle with confidence",
    description:
      "Relax while we finalise your loan and get you approved.",
    icon: <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
];

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-24 bg-white border-t border-border/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="A simple process. Better results."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-4 xl:gap-8 mt-12 relative" onMouseLeave={() => setHoveredStep(null)}>

          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className="relative group flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-6 lg:gap-0 max-w-[280px] sm:max-w-xs mx-auto lg:max-w-none lg:mx-0"
              onMouseEnter={() => setHoveredStep(index)}
            >
              {/* Left/Top Column (Circle) */}
              <div className="shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center lg:mb-8 relative z-10 shadow-sm transition-colors duration-300 ${
                    hoveredStep !== null && index <= hoveredStep ? 'bg-teal text-white' : 'bg-navy text-white'
                  }`}
                >
                  <span className="text-white text-xs font-bold">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Connector Line to Next Step */}
              {index < 4 && (
                <>
                  {/* Desktop Horizontal Line */}
                  <div className="hidden lg:block absolute top-[15px] left-[50%] w-[calc(100%+16px)] xl:w-[calc(100%+32px)] h-[2px] z-0">
                    <div className="absolute inset-0 bg-slate-light/30" />
                    <div 
                      className="absolute left-0 top-0 h-full bg-teal transition-all duration-500 ease-in-out" 
                      style={{ 
                        width: hoveredStep !== null && hoveredStep > index ? '100%' : '0%',
                        opacity: hoveredStep !== null ? 1 : 0
                      }} 
                    />
                  </div>

                  {/* Mobile Vertical Line */}
                  <div className="lg:hidden absolute top-[16px] left-[15px] w-[2px] h-[calc(100%+48px)] z-0">
                    <div className="absolute inset-0 bg-slate-light/30" />
                    <div 
                      className="absolute left-0 top-0 w-full bg-teal transition-all duration-500 ease-in-out" 
                      style={{ 
                        height: hoveredStep !== null && hoveredStep > index ? '100%' : '0%',
                        opacity: hoveredStep !== null ? 1 : 0
                      }} 
                    />
                  </div>
                </>
              )}

              {/* Right/Bottom Column (Content) */}
              <div className="flex flex-col items-start lg:items-center pt-1 lg:pt-0 w-full">
                <div className="flex flex-row lg:flex-col items-center lg:items-center gap-3 lg:gap-0 mb-2 lg:mb-0">
                  {/* Icon */}
                  <div className="text-navy lg:mb-4 shrink-0 [&>svg]:w-6 [&>svg]:h-6 lg:[&>svg]:w-12 lg:[&>svg]:h-12 flex items-center justify-center">
                    {step.icon}
                  </div>

                  <h3 className="text-base lg:text-sm font-bold text-navy lg:h-10 px-0 lg:px-2 leading-snug">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-slate text-[13px] lg:text-[11px] leading-relaxed px-0 lg:px-2">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
