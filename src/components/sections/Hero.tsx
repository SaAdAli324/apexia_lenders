"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  const words = ["home loan", "refinance rate", "investment loan"];
  const images = ["/home_loan.jpg", "/refinance.jpg", "/investment.jpg"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 80;
    const currentWord = words[currentWordIndex % words.length];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCurrentText(
          currentWord.substring(0, currentText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="relative overflow-hidden bg-white h-[calc(100dvh-88px)]">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes panGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-40px, -40px); }
        }
        .animate-pan-grid {
          animation: panGrid 3s linear infinite;
        }
        @keyframes formAppear {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-form-appear {
          animation: formAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}} />

      {/* Animated Blueprint/Finance Grid Texture (Tablet/Desktop Only) */}
      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 animate-pan-grid opacity-50"
          style={{
            width: 'calc(100% + 40px)',
            height: 'calc(100% + 40px)',
            backgroundImage: `linear-gradient(to right, rgba(19, 163, 181, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(19, 163, 181, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Soft fading mask to blend the grid smoothly into the content */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-white" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-16 relative z-10 h-full flex flex-col justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.2fr,1fr] xl:grid-cols-[1.3fr,1fr] gap-8 lg:gap-12 xl:gap-16 items-center w-full">
          {/* Left Content */}
          <div className="flex flex-col justify-center relative z-10 xl:pr-8 text-center md:text-left items-center md:items-start">
            <p className="text-navy font-bold text-xs tracking-[0.2em] uppercase mb-4 mt-4 lg:mt-0">
              Expert Home Loan. Better Outcomes.
            </p>
            <div className="mb-6 w-full">
              <h1 className="text-fluid-h1 font-bold text-navy flex flex-col items-center md:items-start">
                <span className="block">We get you the right</span>
                <span className="text-[#13A3B5] block py-1 lg:py-2 min-h-[1.2em]">
                  {currentText}
                  <span className="inline-block w-[3px] h-[0.8em] bg-[#13A3B5] ml-[2px] align-baseline animate-pulse"></span>
                </span>
                <span className="block">in Australia.</span>
              </h1>
            </div>
            <p className="text-slate text-fluid-body mb-8 max-w-xl xl:max-w-[600px]">
              Access 50+ Australian lenders and tailored loan solutions to help
              you buy, refinance or invest with confidence. 100% free brokerage
              service.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 w-full justify-center md:justify-start">
              <Button onClick={() => setShowForm(true)} variant="primary" size="md" className="w-full sm:w-auto justify-center whitespace-nowrap group lg:!px-4 lg:!py-2 lg:!text-sm xl:!px-6 xl:!py-3 xl:!text-base relative z-20">
                Book Consultation
                <svg className="w-4 h-4 ml-2 inline transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="w-full flex justify-center md:justify-start">
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-center md:items-start">
                <TrustBadge
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  text={
                    <>
                      Access to 50+<br />Australian lenders
                    </>
                  }
                />
                <TrustBadge
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  text={
                    <>
                      100% Free<br />brokerage service
                    </>
                  }
                />
                <TrustBadge
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                  text={
                    <>
                      Australian-based<br />expert team
                    </>
                  }
                />
              </div>
            </div>
          </div>

          {/* Right Image / Form */}
          <div className="absolute inset-0 md:relative md:inset-auto w-full flex justify-center items-center opacity-10 md:opacity-100 z-0 md:z-10 pointer-events-none md:pointer-events-auto overflow-hidden md:overflow-visible">
            {/* Blended background glow matching image edges */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-[#658b54]/40 via-transparent to-[#4b8dbf]/40 blur-[80px] rounded-full scale-125 z-0" />

            <div className="relative z-10 w-full h-full md:h-auto md:max-w-[500px] lg:max-w-[600px] mx-auto group md:aspect-[4/5] lg:aspect-[4/5] md:min-h-[600px] lg:min-h-[680px] [perspective:1000px]">
              <div className={["relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]", showForm ? 'md:[transform:rotateY(180deg)]' : ''].filter(Boolean).join(" ")}>
                {/* Front (Images) */}
                <div className="absolute inset-0 [backface-visibility:hidden] md:overflow-hidden md:rounded-[2rem] md:shadow-2xl transition-transform duration-700 md:group-hover:scale-[1.02]">
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-20 pointer-events-none" />
                  {images.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`Hero image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover transition-opacity duration-1000 ease-in-out ${currentWordIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                      priority={index === 0}
                    />
                  ))}
                </div>

                {/* Back (Form - Desktop Only) */}
                <div className="hidden md:block absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] w-full h-full bg-white rounded-[2rem] shadow-2xl p-6 lg:p-8 pointer-events-auto border border-slate-100 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <ConsultationForm onClose={() => setShowForm(false)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Form Modal */}
      {showForm && (
        <div className="md:hidden fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm pointer-events-auto animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl animate-form-appear max-h-[95dvh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <ConsultationForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </section>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs text-slate-light leading-snug">
      <div className="text-navy">{icon}</div>
      <span>{text}</span>
    </div>
  );
}

function ConsultationForm({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
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
      <div className="h-full flex flex-col justify-center text-center items-center relative pt-4 md:pt-0 animate-fade-in">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-navy mb-2">Request Received!</h3>
        <p className="text-slate">We&apos;ll be in touch with you shortly to schedule your consultation.</p>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col text-left relative pt-1 lg:pt-4">
      <button  
        onClick={onClose}
        className="absolute -top-3 -right-3 lg:-top-6 lg:-right-6 text-slate hover:text-navy p-2 z-10 cursor-pointer transition-transform hover:rotate-90 bg-white/80 rounded-full"
        aria-label="Close form"
      >
        <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex-1 flex flex-col justify-center h-full">
        <div className="mb-4 lg:mb-6 text-left pr-10 lg:pr-0">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-navy mb-1 lg:mb-2">Book a Consultation</h3>
          <p className="text-slate text-xs md:text-sm lg:text-base">Tell us a bit about what you&apos;re looking for, and our experts will be in touch.</p>
        </div>
        
        <form className="flex-none space-y-3 lg:space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-semibold text-navy mb-1">Name *</label>
              <input type="text" required minLength={2} className="w-full px-3 py-2.5 lg:px-4 lg:py-3 bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13A3B5] focus:bg-white text-navy text-sm lg:text-base transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-semibold text-navy mb-1">Phone *</label>
              <input type="tel" required pattern="[0-9\s\-\+\(\)]+" minLength={8} className="w-full px-3 py-2.5 lg:px-4 lg:py-3 bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13A3B5] focus:bg-white text-navy text-sm lg:text-base transition-all" placeholder="0400 000 000" />
            </div>
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-semibold text-navy mb-1">Email *</label>
            <input type="email" required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13A3B5] focus:bg-white text-navy text-sm lg:text-base transition-all" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-semibold text-navy mb-1">Loan Type *</label>
            <select required className="w-full px-3 py-2.5 lg:px-4 lg:py-3 bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13A3B5] focus:bg-white text-navy text-sm lg:text-base transition-all appearance-none cursor-pointer">
              <option value="">Select an option...</option>
              <option value="home">First Home Buyer</option>
              <option value="refinance">Refinancing</option>
              <option value="investment">Investment Loan</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-semibold text-navy mb-1">Details (Optional)</label>
            <textarea rows={3} className="w-full px-3 py-2.5 lg:px-4 lg:py-3 bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13A3B5] focus:bg-white text-navy text-sm lg:text-base transition-all resize-none" placeholder="Tell us a bit about your goals..."></textarea>
          </div>
          <div className="pt-2">
            <button type="submit" disabled={status === "submitting"} className="w-full bg-[#13A3B5] text-white font-bold py-3 lg:py-3.5 rounded-lg lg:rounded-xl hover:bg-[#108b9a] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center shadow-lg shadow-[#13A3B5]/30 hover:shadow-xl hover:shadow-[#13A3B5]/40 hover:-translate-y-0.5 text-sm lg:text-base">
              {status === "submitting" ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
