"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface PurposeOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  word: string;
  imageIndex: number;
  highlightText: string;
  badgeTag: string;
  badgeText: string;
}

const PURPOSES: PurposeOption[] = [
  {
    id: "home-loan",
    label: "Buying a Home",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    word: "home loan",
    imageIndex: 0,
    highlightText: "Access discounted rates from 50+ top lenders to fund your new purchase.",
    badgeTag: "Top Lenders",
    badgeText: "Discounted Rates from top lenders",
  },
  {
    id: "refinance",
    label: "Refinancing",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    word: "refinance rate",
    imageIndex: 1,
    highlightText: "Switch to a lower rate to cut your monthly payments and unlock $2,000 to $6,000 in cashback rewards. * T&Cs apply.",
    badgeTag: "Cashback Rewards",
    badgeText: "Discounted Rate & Unlock $2,000 to $6,000 Cashback Rewards.",
  },
  {
    id: "investment",
    label: "Investing",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    word: "investment loan",
    imageIndex: 2,
    highlightText: "Optimize your investment loans with tailored P&I, interest-only, or equity release structures, backed by exclusive $2,000 to $6,000 in cashback offers. * T&Cs apply.",
    badgeTag: "Cashback Rewards",
    badgeText: "Discounted Rate & Unlock $2,000 to $6,000 Cashback Rewards.",
  },
  {
    id: "first-home",
    label: "First Home Buyer",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    word: "first home grant",
    imageIndex: 3,
    highlightText: "Access Australian Government 5% deposit schemes with zero Lenders Mortgage Insurance.",
    badgeTag: "5% Deposit Scheme",
    badgeText: "Purchase your home with 5% Deposit. No LMI",
  },
];

export default function Hero() {
  const words = ["home loan", "refinance rate", "investment loan", "first home grant"];
  const images = ["/home_loan.jpg", "/refinance.jpg", "/investment.jpg", "/hero-house.jpg"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<string>("home-loan");

  const handlePurposeSelect = (purpose: PurposeOption) => {
    setSelectedPurpose(purpose.id);
    const wordIdx = words.indexOf(purpose.word);
    if (wordIdx !== -1) {
      setCurrentWordIndex(wordIdx);
      setIsDeleting(false);
      setCurrentText(purpose.word);
    }
  };

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 80;
    const currentWord = words[currentWordIndex % words.length];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        const nextIndex = (currentWordIndex + 1) % words.length;
        setCurrentWordIndex(nextIndex);
        setSelectedPurpose(PURPOSES[nextIndex].id);
      } else {
        setCurrentText(
          currentWord.substring(0, currentText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  const activePurposeObj = PURPOSES.find((p) => p.id === selectedPurpose) || PURPOSES[0];

  const handleScrollToCalc = () => {
    const el = document.getElementById("calculators-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/calculators";
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EBF6F8] via-[#F4F9FA] to-white border-b border-teal/20 min-h-[calc(100dvh-88px)] py-14 lg:py-20 flex flex-col justify-center">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes panGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-40px, -40px); }
        }
        .animate-pan-grid {
          animation: panGrid 6s linear infinite;
        }
        @keyframes formAppear {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-form-appear {
          animation: formAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-subtle-float {
          animation: subtleFloat 4s ease-in-out infinite;
        }
      `}} />

      {/* Luminous Brand Ambient Lights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#112A46]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Delicate Architectural Pattern */}
      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 animate-pan-grid opacity-20"
          style={{
            width: 'calc(100% + 40px)',
            height: 'calc(100% + 40px)',
            backgroundImage: `linear-gradient(to right, rgba(19, 163, 181, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(19, 163, 181, 0.15) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.2fr,1fr] xl:grid-cols-[1.3fr,1fr] gap-10 lg:gap-14 xl:gap-16 items-center w-full">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center relative z-10 xl:pr-6 text-center md:text-left items-center md:items-start">
            
            {/* Professional Brand Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 bg-white/90 border border-teal/30 px-4 py-1.5 rounded-full mb-6 shadow-xs backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
              <span className="text-navy font-bold text-xs tracking-wider uppercase">
                50+ Australian Lenders • 100% Free Brokerage
              </span>
            </div>

            {/* Headline */}
            <div className="mb-5 w-full">
              <h1 className="text-fluid-h1 font-extrabold text-navy flex flex-col items-center md:items-start tracking-tight leading-[1.1]">
                <span className="block">We get you the right</span>
                <span className="text-teal block py-1 min-h-[1.2em]">
                  {currentText}
                  <span className="inline-block w-[3px] h-[0.8em] bg-teal ml-[3px] align-baseline animate-pulse" />
                </span>
                <span className="block">in Australia.</span>
              </h1>
            </div>

            <p className="text-slate text-fluid-body mb-6 max-w-xl leading-relaxed">
              Access 50+ major Australian banks and specialist lenders. We negotiate discounted rates and handle all paperwork from pre-approval to settlement.
            </p>

            {/* Purpose Selector Tabs */}
            <div className="w-full mb-6">
              <p className="text-xs font-bold text-navy uppercase tracking-wider mb-2.5 text-center md:text-left">
                Select your loan objective:
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {PURPOSES.map((purpose) => {
                  const isSelected = selectedPurpose === purpose.id;
                  return (
                    <button
                      key={purpose.id}
                      onClick={() => handlePurposeSelect(purpose)}
                      className={`group px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                        isSelected
                          ? "bg-teal text-white border-teal shadow-md shadow-teal/20 scale-[1.02]"
                          : "bg-white text-navy/85 border-slate-200/90 hover:border-teal/50 hover:text-teal hover:bg-teal/5 shadow-2xs"
                      }`}
                    >
                      <span className={`transition-colors ${isSelected ? "text-white" : "text-teal group-hover:text-teal"}`}>
                        {purpose.icon}
                      </span>
                      <span>{purpose.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Benefit Description Box */}
            <div className="bg-white/95 border border-teal/25 rounded-2xl p-4 mb-8 max-w-xl text-left w-full flex items-start gap-3 shadow-xs backdrop-blur-sm">
              <div className="w-6 h-6 rounded-full bg-teal/15 text-teal flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                ✓
              </div>
              <div>
                <p className="text-navy text-xs sm:text-sm font-medium leading-relaxed">
                  {activePurposeObj.highlightText}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 mb-10 w-full justify-center md:justify-start">
              <Button
                onClick={() => setShowForm(true)}
                variant="primary"
                size="md"
                className="w-full sm:w-auto justify-center whitespace-nowrap group shadow-lg shadow-teal/20 cursor-pointer"
              >
                Book Free Consultation
                <svg className="w-4 h-4 ml-2 inline transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>

              <button
                onClick={handleScrollToCalc}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 bg-white/90 text-navy font-bold text-sm hover:bg-white hover:border-navy transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                Estimate Repayments
                <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Trust Proof Badges */}
            <div className="w-full flex justify-center md:justify-start">
              <div className="flex flex-wrap gap-5 sm:gap-7 items-center">
                <TrustBadge
                  icon={
                    <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                  text={<>50+ Lenders<br /><span className="text-[11px] font-normal text-slate">Australia-wide</span></>}
                />
                <TrustBadge
                  icon={
                    <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  text={<>$0 Broker Fee<br /><span className="text-[11px] font-normal text-slate">100% free to you</span></>}
                />
                <TrustBadge
                  icon={
                    <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                  text={<>Best Interests Duty<br /><span className="text-[11px] font-normal text-slate">Legally on your side</span></>}
                />
              </div>
            </div>
          </div>

          {/* Right Visual Stage with Integrated Financial Widgets */}
          <div className="relative w-full flex justify-center items-center">
            
            <div className="relative z-10 w-full md:max-w-[480px] lg:max-w-[520px] mx-auto group [perspective:1000px]">
              
              {/* Outer Framed Stage */}
              <div className="p-3 bg-white/95 rounded-3xl shadow-2xl border border-white/80 ring-1 ring-slate-200/60 backdrop-blur-md relative">
                           {/* Floating Top Widget: Rate & Savings */}
                {!showForm && (
                  <div className="absolute -top-4 -right-3 sm:-right-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-teal/30 flex items-center gap-3 animate-subtle-float max-w-[270px] sm:max-w-[310px]">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal/15 text-teal flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-teal uppercase tracking-wider">
                        {activePurposeObj.badgeTag}
                      </p>
                      <p className="text-xs sm:text-sm font-extrabold text-navy leading-snug">
                        {activePurposeObj.badgeText}
                      </p>
                    </div>
                  </div>
                )}

                {/* 3D Flip Card Container */}
                <div className={`w-full transition-all duration-300 ${
                  showForm
                    ? "h-[500px] sm:h-[515px] lg:h-[530px]"
                    : "aspect-[4/5] min-h-[460px] sm:min-h-[490px] lg:min-h-[510px]"
                }`}>
                  <div className={["relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]", showForm ? 'md:[transform:rotateY(180deg)]' : ''].filter(Boolean).join(" ")}>
                    
                    {/* Front: High-Res Clean Image */}
                    <div className={`absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-2xl border border-slate-200 ${
                      showForm ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
                    }`}>
                      {images.map((src, index) => {
                        const targetIndex = activePurposeObj.imageIndex;
                        return (
                          <Image
                            key={src}
                            src={src}
                            alt="Apexia Lending Loan Guidance"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={`object-cover transition-all duration-1000 ease-in-out ${
                              targetIndex === index ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
                            }`}
                            priority={index === 0}
                          />
                        );
                      })}
                    </div>

                    {/* Back: Form (Desktop) */}
                    <div className={`hidden md:block absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full bg-white rounded-2xl shadow-xl p-5 sm:p-6 border border-slate-200 overflow-hidden ${
                      showForm ? "pointer-events-auto z-20" : "pointer-events-none opacity-0 z-0"
                    }`}>
                      <ConsultationForm onClose={() => setShowForm(false)} />
                    </div>
                  </div>
                </div>

                {/* Floating Bottom Widget: Google Verified Reviews */}
                {!showForm && (
                  <div className="absolute -bottom-4 -left-3 z-30 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-200/90 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 text-navy flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-extrabold text-navy">4.9 / 5.0</span>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate font-medium">
                        Over 300+ Verified Australian Reviews
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Mobile Form Modal */}
      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          className="md:hidden fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 bg-navy/80 backdrop-blur-sm pointer-events-auto animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-[96vw] sm:max-w-md rounded-2xl p-4 sm:p-5 relative shadow-2xl animate-form-appear max-h-[92dvh] overflow-y-auto"
          >
            <ConsultationForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </section>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 text-xs text-navy font-bold leading-tight">
      <div className="shrink-0">{icon}</div>
      <div>{text}</div>
    </div>
  );
}

function ConsultationForm({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        onClose();
      }, 2000);
    }, 1000);
  };

  if (status === "success") {
    return (
      <div className="h-full flex flex-col justify-center text-center items-center relative py-6 animate-fade-in">
        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-navy mb-1.5">Request Received!</h3>
        <p className="text-slate text-xs sm:text-sm">We&apos;ll be in touch with you shortly to schedule your consultation.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between text-left relative">
      {/* Top Header Row with Working, Explicit Button */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-navy leading-snug">
            Book a Consultation
          </h3>
          <p className="text-slate text-xs mt-0.5">
            Tell us what you&apos;re looking for, and our broker will be in touch.
          </p>
        </div>
        <button  
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center text-slate hover:text-navy hover:bg-slate-200 transition-colors bg-slate-100 rounded-full cursor-pointer z-30"
          aria-label="Close form"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Form Fields Evenly Distributed */}
      <form className="flex-1 flex flex-col justify-between" onSubmit={handleSubmit}>
        <div className="space-y-2.5 sm:space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-navy mb-1">Name *</label>
              <input
                type="text"
                required
                minLength={2}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13A3B5] focus:bg-white text-navy text-xs sm:text-sm transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-navy mb-1">Phone *</label>
              <input
                type="tel"
                required
                pattern="[0-9\\s\\-\\+\\(\\)]+"
                minLength={8}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13A3B5] focus:bg-white text-navy text-xs sm:text-sm transition-all"
                placeholder="0400 000 000"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-navy mb-1">Email *</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13A3B5] focus:bg-white text-navy text-xs sm:text-sm transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-navy mb-1">Loan Type *</label>
            <select
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13A3B5] focus:bg-white text-navy text-xs sm:text-sm transition-all appearance-none cursor-pointer"
            >
              <option value="">Select an option...</option>
              <option value="home">First Home Buyer</option>
              <option value="refinance">Refinancing</option>
              <option value="investment">Investment Loan</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-navy mb-1">Details (Optional)</label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13A3B5] focus:bg-white text-navy text-xs sm:text-sm transition-all resize-none"
              placeholder="Tell us a bit about your goals..."
            />
          </div>
        </div>

        {/* Action Button & Trust Line Pinned Cleanly to Bottom */}
        <div className="pt-2.5">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-[#13A3B5] text-white font-bold py-2.5 sm:py-3 rounded-xl hover:bg-[#108b9a] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center shadow-md shadow-[#13A3B5]/25 hover:shadow-lg hover:shadow-[#13A3B5]/35 hover:-translate-y-0.5 text-xs sm:text-sm"
          >
            {status === "submitting" ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Submit Request"}
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] sm:text-[11px] text-slate font-medium text-center">
            <span className="text-amber-500 font-bold">★ 4.9/5.0</span>
            <span>· 300+ Verified Reviews · $0 Broker Fee</span>
          </div>
        </div>
      </form>
    </div>
  );
}
