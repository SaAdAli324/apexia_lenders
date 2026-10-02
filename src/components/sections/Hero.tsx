"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  const words = ["home loan", "refinance rate", "investment loan", "commercial loan"];
  const images = ["/home_loan.jpg", "/refinance.jpg", "/investment.jpg", "/commercial.jpg"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 80;
    const currentWord = words[currentWordIndex];

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
    <section className="relative overflow-hidden bg-white lg:min-h-[calc(100vh-88px)] flex items-center">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes panGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-40px, -40px); }
        }
        .animate-pan-grid {
          animation: panGrid 3s linear infinite;
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

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center relative z-10">
            <p className="text-navy font-bold text-xs tracking-[0.2em] uppercase mb-4 mt-4 lg:mt-0">
              Expert Home Loans. Better Outcomes.
            </p>
            <div className="h-[190px] min-[320px]:h-[130px] sm:h-[150px] md:h-[180px] lg:h-[220px] xl:h-[240px] mb-6">
              <h1 className="text-fluid-h1 font-bold text-navy">
                We get you the right{" "}
                <span className="text-[#13A3B5]">
                  {currentText}
                  <span className="inline-block w-[3px] h-[0.8em] bg-[#13A3B5] ml-[2px] align-baseline animate-pulse"></span>
                </span>{" "}
                in Australia.
              </h1>
            </div>
            <p className="text-slate text-fluid-body mb-8 max-w-lg">
              Access 50+ Australian lenders and tailored loan solutions to help
              you buy, refinance or invest with confidence. 100% free brokerage
              service.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 w-full">
              <Button href="/contact" variant="primary" size="md" className="w-full sm:w-auto justify-center whitespace-nowrap group lg:!px-4 lg:!py-2 lg:!text-sm xl:!px-6 xl:!py-3 xl:!text-base">
                Get Started
                <svg className="w-4 h-4 ml-2 inline transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button href="/calculators" variant="outline" size="md" className="w-full sm:w-auto justify-center whitespace-nowrap group lg:!px-4 lg:!py-2 lg:!text-sm xl:!px-6 xl:!py-3 xl:!text-base">
                Calculate Rates
                <svg className="w-4 h-4 ml-2 inline transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button href="/contact" variant="ghost" size="md" className="w-full sm:w-auto justify-center px-2 whitespace-nowrap group lg:!px-2 lg:!py-2 lg:!text-sm xl:!text-base">
                Book Consultation
                <svg className="w-4 h-4 ml-2 inline transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="w-full flex justify-center md:justify-start">
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-start">
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

          {/* Right Image */}
          <div className="absolute inset-0 md:relative md:inset-auto w-full flex justify-center items-center opacity-10 md:opacity-100 z-0 md:z-10 pointer-events-none md:pointer-events-auto overflow-hidden md:overflow-visible">
            {/* Blended background glow matching image edges */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-[#658b54]/40 via-transparent to-[#4b8dbf]/40 blur-[80px] rounded-full scale-125 z-0" />

            <div className="relative z-10 w-full h-full md:h-auto md:max-w-[500px] lg:max-w-[600px] mx-auto group md:aspect-[4/5] lg:aspect-[3/4]">
              <div className="absolute inset-0 md:overflow-hidden md:rounded-[2rem] md:shadow-2xl transition-transform duration-700 md:group-hover:scale-[1.02]">
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
            </div>
          </div>
        </div>
      </div>
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
