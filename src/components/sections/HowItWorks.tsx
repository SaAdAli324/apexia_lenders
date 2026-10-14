"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import Button from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    title: "Tell us about your goals",
    description:
      "Share your property ambitions and financial scenario in a quick, obligation-free chat.",
  },
  {
    number: "02",
    title: "We compare 50+ lenders",
    description:
      "We scan hundreds of loan products across major banks and specialist lenders to find wholesale discounts.",
  },
  {
    number: "03",
    title: "We recommend top-matched loans",
    description:
      "You receive transparent, side-by-side loan recommendations detailing exact rates, repayments, and savings.",
  },
  {
    number: "04",
    title: "We manage the paperwork",
    description:
      "We package your documents, submit the application, and chase lender credit assessors every step of the way.",
  },
  {
    number: "05",
    title: "You settle with confidence",
    description:
      "Celebrate your loan approval and settlement smoothly, with ongoing rate reviews for years to come.",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 lg:py-24 bg-[#FAF9F5] border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <SectionHeading
          eyebrow="Simple 5-Step Process"
          title="From first conversation to keys in hand."
          subtitle="We eliminate bank queues, confusing paperwork, and settlement anxiety by guiding you through every stage."
        />

        {/* 2-Column Picture Beside Content Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Picture */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/investment.jpg"
                alt="Happy Australian homeowners holding house keys after settlement"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />

              {/* Bottom floating achievement card */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-teal/15 text-teal flex items-center justify-center font-bold text-lg shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy">
                      100% Free Brokerage Guidance
                    </p>
                    <p className="text-[11px] text-slate mt-0.5">
                      Australian Best Interests Duty compliant.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Step Roadmap */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={step.number}
                    onClick={() => setActiveStep(idx)}
                    className={`rounded-2xl p-5 border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white border-navy shadow-md scale-[1.01]"
                        : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isActive
                            ? "bg-navy text-white"
                            : "bg-slate-100 text-slate"
                        }`}
                      >
                        {step.number}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold text-navy text-base leading-snug">
                          {step.title}
                        </h4>
                        <p className="text-slate text-xs sm:text-sm mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 flex items-center gap-4">
              <Button href="/contact" variant="primary" size="md" className="shadow-md">
                Start Step 1: Free Consultation
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
