"use client";

import { useEffect, useState } from "react";
import { TOTAL_LENDERS } from "@/data/lenders";

const ALL_LOGOS = [
  // Group 1 - The 6 specific banks requested + 6 other major banks
  "/lender-logos/anz bank.png",
  "/lender-logos/estpac bank.png",
  "/lender-logos/NAB-National-Australia-Bank-logo.png",
  "/lender-logos/bank of melbourne.png",
  "/lender-logos/common wealth bank.png",
  "/lender-logos/me bank.png",
  "/lender-logos/macquarie.png",
  "/lender-logos/ing bank.png",
  "/lender-logos/u bank.png",
  "/lender-logos/amp.png",
  "/lender-logos/bankwest.png",
  "/lender-logos/heritage bank.png",
  
  // Group 2 - The remaining banks
  "/lender-logos/Gateway bank.png",
  "/lender-logos/auswide bank.png",
  "/lender-logos/better choice bank.png",
  "/lender-logos/bluestone.png",
  "/lender-logos/connective bank.png",
  "/lender-logos/first mac bank.png",
  "/lender-logos/health professional bank.png",
  "/lender-logos/my state bank.png",
  "/lender-logos/resimac bank.png",
  "/lender-logos/teachers mutual bank.png",
  "/lender-logos/anz bank.png", // padded to complete the set of 12
  "/lender-logos/common wealth bank.png", // padded to complete the set of 12
];

export default function TrustBar() {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev === 0 ? 1 : 0));
    }, 4500); // swap every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-light-bg py-16 lg:py-24 relative overflow-hidden flex flex-col items-center min-h-[600px]">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-iso {
          0%, 100% { transform: translateZ(0px); }
          50% { transform: translateZ(30px); }
        }
      `}} />

      <div className="w-full transition-all duration-500 ease-in-out flex-1 flex flex-col justify-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden lg:overflow-visible">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side: Text */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start z-10 pt-10 lg:pt-0">
              <p className="text-teal font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4 inline-block bg-[#13A3B5]/10 px-4 py-1.5 rounded-full">
                More Choice. Better Loan.
              </p>
              <h2 className="text-fluid-h2 font-bold text-navy mb-5 leading-tight">
                We compare {TOTAL_LENDERS}+ lenders <br className="hidden xl:block" />so you don&apos;t have to.
              </h2>
              <p className="text-slate text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
                From major banks to specialist lenders, we compare hundreds of
                loan products to find the right fit for your goals and your future.
              </p>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal text-white font-bold text-sm rounded-xl hover:bg-teal-light transition-all shadow-[0_4px_14px_0_rgba(19,163,181,0.39)] hover:shadow-[0_6px_20px_rgba(19,163,181,0.23)] hover:-translate-y-0.5 group"
              >
                See our lender panel
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Right Side: Isometric Grid */}
            <div 
              className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center"
              style={{ perspective: '2000px' }}
            >
               {/* Decorative background glow */}
               <div className="absolute inset-0 bg-gradient-to-tr from-[#13A3B5]/10 to-transparent blur-[80px] rounded-full scale-110 pointer-events-none" />
               
               <div 
                 className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                 style={{
                   transform: "rotateX(50deg) rotateZ(-45deg)",
                   transformStyle: "preserve-3d"
                 }}
               >
                 {Array.from({ length: 12 }).map((_, i) => {
                   // Calculate wave delay based on row and col for a cascading float effect
                   const row = Math.floor(i / 3);
                   const col = i % 3;
                   const delay = (row + col) * 0.4;
                   
                   const logo1 = ALL_LOGOS[i];
                   const logo2 = ALL_LOGOS[i + 12];
                   
                   return (
                     <div 
                       key={i}
                       className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-center group transition-colors duration-300 hover:bg-[#13A3B5]/5 cursor-pointer"
                       style={{ 
                         animation: "float-iso 4s ease-in-out infinite",
                         animationDelay: `${delay}s`,
                         // Isometric 3D shadow: casts straight down on the screen
                         boxShadow: '12px 12px 0px 0px rgba(19, 163, 181, 0.05), 20px 20px 25px -5px rgba(0,0,0,0.1)'
                       }}
                     >
                        {/* The logo flat on the tile, counter-rotated in 2D to be horizontal */}
                        <div 
                          className="absolute w-[120%] h-[120%] flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                          style={{ transform: "rotateZ(45deg)" }}
                        >
                            <img 
                              src={logo1} 
                              className={`absolute w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain mix-blend-multiply transition-opacity duration-1000 ${page === 0 ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'}`} 
                            />
                            <img 
                              src={logo2} 
                              className={`absolute w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain mix-blend-multiply transition-opacity duration-1000 ${page === 1 ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'}`} 
                            />
                        </div>
                     </div>
                   )
                 })}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
