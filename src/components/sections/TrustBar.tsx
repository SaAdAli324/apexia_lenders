"use client";

import { useEffect, useState, useRef } from "react";
import { TOTAL_LENDERS } from "@/data/lenders";

// ==========================================
// ANIMATED COUNTER COMPONENT
// ==========================================
function AnimatedCounter({ target, duration = 2000 }: { target: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOutExpo * target));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    animationFrameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [target, duration, isVisible]);

  return <span ref={ref}>{count}</span>;
}

const ALL_LOGOS = [
  "/lender-logos/1.png", "/lender-logos/2.png", "/lender-logos/3.png", "/lender-logos/6.png",
  "/lender-logos/7.png", "/lender-logos/8.png", "/lender-logos/10.png", "/lender-logos/11.png",
  "/lender-logos/12.png", "/lender-logos/13.png", "/lender-logos/14.png", "/lender-logos/15.png",
  "/lender-logos/16.png", "/lender-logos/17.png", "/lender-logos/18.png", "/lender-logos/19.png",
  "/lender-logos/21.png", "/lender-logos/22.png", "/lender-logos/23.png", "/lender-logos/24.png",
  "/lender-logos/25.png"
];

const ROW_1_LOGOS = ALL_LOGOS.slice(0, 11);
const ROW_2_LOGOS = ALL_LOGOS.slice(11);

// ==========================================
// VARIANT 1: Infinite Horizontal Marquee
// ==========================================
function MarqueeRow({ logos, reverse = false }: { logos: string[], reverse?: boolean }) {
  const duplicatedLogos = [...logos, ...logos];
  return (
    <div className="flex overflow-hidden group w-full">
      <div 
        className={`flex whitespace-nowrap w-max gap-4 pr-4 sm:gap-6 sm:pr-6 lg:gap-8 lg:pr-8 hover:[animation-play-state:paused] ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {duplicatedLogos.map((src, idx) => (
          <div 
            key={`${src}-${idx}`}
            className="w-32 h-16 sm:w-40 sm:h-20 lg:w-48 lg:h-24 bg-white border-2 border-slate-100/80 rounded-2xl flex items-center justify-center shrink-0 p-4 lg:p-5 hover:border-[#13A3B5]/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 cursor-pointer shadow-sm"
          >
            <img src={src} alt="Lender Logo" className="w-full h-full object-contain mix-blend-multiply opacity-70 hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

function VariantMarquee() {
  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <p className="text-teal font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4 inline-block bg-[#13A3B5]/10 px-4 py-1.5 rounded-full">
          More Choice. Better Loan.
        </p>
        <h2 className="text-fluid-h2 font-bold text-navy mb-5 max-w-2xl mx-auto leading-tight">
          We compare {TOTAL_LENDERS}+ lenders <br className="hidden sm:block" />so you don&apos;t have to.
        </h2>
        <p className="text-slate text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
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

      <div className="relative w-full max-w-[1800px] mx-auto py-2">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-light-bg to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-light-bg to-transparent z-10 pointer-events-none"></div>

        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <MarqueeRow logos={ROW_1_LOGOS} />
          <MarqueeRow logos={ROW_2_LOGOS} reverse={true} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VARIANT 2: Interactive Split Grid
// ==========================================
function VariantGrid() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <p className="text-teal font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4 inline-block bg-[#13A3B5]/10 px-4 py-1.5 rounded-full">
            More Choice. Better Loan.
          </p>
          <h2 className="text-fluid-h2 font-bold text-navy mb-5">
            We compare {TOTAL_LENDERS}+ lenders <br className="hidden xl:block" />so you don&apos;t have to.
          </h2>
          <p className="text-slate text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
            From major banks to specialist lenders, we compare hundreds of
            loan products to find the right fit for your goals and your future.
          </p>
          <a
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal text-white font-bold text-sm rounded-xl hover:bg-teal-light transition-all shadow-[0_4px_14px_0_rgba(19,163,181,0.39)] hover:-translate-y-0.5 group"
          >
            See our lender panel
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="relative">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#13A3B5]/20 to-navy/10 blur-[80px] rounded-full scale-110 pointer-events-none" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 relative z-10 group/grid">
            {ALL_LOGOS.slice(0, 11).map((src, idx) => (
              <div 
                key={idx}
                className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-4 sm:p-5 h-20 sm:h-24 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(19,163,181,0.15)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer hover:border-white group-hover/grid:[&:not(:hover)]:opacity-50 group-hover/grid:[&:not(:hover)]:scale-95"
              >
                <img src={src} alt="Lender Logo" className="w-full h-full object-contain mix-blend-multiply transition-all duration-300" />
              </div>
            ))}
            <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl p-4 sm:p-5 h-20 sm:h-24 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-[0_8px_30px_rgb(19,163,181,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <span className="text-navy font-bold text-xl sm:text-2xl leading-tight">+{TOTAL_LENDERS - 11}</span>
              <span className="text-[10px] sm:text-xs text-slate font-semibold uppercase tracking-wider">Lenders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VARIANT 3: Vertical Staggered Marquee
// ==========================================
function VerticalMarqueeCol({ logos, reverse = false, speed = 30 }: { logos: string[], reverse?: boolean, speed?: number }) {
  const duplicatedLogos = [...logos, ...logos, ...logos]; // Triple to ensure smooth long scroll
  return (
    <div className="flex flex-col overflow-hidden w-full h-[400px] sm:h-[500px] relative">
      <div 
        className={`flex flex-col w-full gap-4 pb-4 hover:[animation-play-state:paused] ${
          reverse ? 'animate-marquee-y-reverse' : 'animate-marquee-y'
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedLogos.map((src, idx) => (
          <div 
            key={`${src}-${idx}`}
            className="w-full h-20 sm:h-24 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-4 hover:border-[#13A3B5]/40 transition-colors shadow-sm cursor-pointer"
          >
            <img src={src} alt="Lender Logo" className="w-full h-full object-contain mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}

function VariantVertical() {
  const col1 = ALL_LOGOS.slice(0, 7);
  const col2 = ALL_LOGOS.slice(7, 14);
  const col3 = ALL_LOGOS.slice(14, 21);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start lg:pr-8">
          <p className="text-teal font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4 inline-block bg-[#13A3B5]/10 px-4 py-1.5 rounded-full">
            More Choice. Better Loan.
          </p>
          <h2 className="text-fluid-h2 font-bold text-navy mb-5">
            We compare {TOTAL_LENDERS}+ lenders <br className="hidden xl:block" />so you don&apos;t have to.
          </h2>
          <p className="text-slate text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
            From major banks to specialist lenders, we compare hundreds of
            loan products to find the right fit for your goals and your future.
          </p>
          <a
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal text-white font-bold text-sm rounded-xl hover:bg-teal-light transition-all shadow-md hover:-translate-y-0.5 group"
          >
            See our lender panel
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="relative h-[400px] sm:h-[500px] overflow-hidden w-full max-w-[600px] mx-auto lg:mx-0">
          {/* Top & Bottom Fade Masks */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-light-bg to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-light-bg to-transparent z-10 pointer-events-none"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 h-full">
            <VerticalMarqueeCol logos={col1} speed={25} />
            <VerticalMarqueeCol logos={col2} speed={30} reverse={true} />
            <div className="hidden sm:block">
              <VerticalMarqueeCol logos={col3} speed={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VARIANT 4: Slot Animation
// ==========================================
function LogoSlot({ logos, delay, tick }: { logos: string[], delay: number, tick: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (tick === 0) return;
    const timer = setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % logos.length);
        setAnimating(false);
      }, 700); // matches CSS animation duration
    }, delay);

    return () => clearTimeout(timer);
  }, [tick, delay, logos.length]);

  const nextIndex = (currentIndex + 1) % logos.length;

  return (
    <div className="relative h-24 w-32 sm:h-32 sm:w-48 lg:h-36 lg:w-56 flex items-center justify-center overflow-hidden shrink-0 mx-auto">
      <img
        src={logos[currentIndex]}
        alt="Lender Logo"
        className={`absolute w-full h-full object-contain mix-blend-multiply ${
          animating ? "animate-slot-out" : ""
        }`}
      />
      {animating && (
        <img
          src={logos[nextIndex]}
          alt="Lender Logo"
          className="absolute w-full h-full object-contain mix-blend-multiply animate-slot-in"
        />
      )}
    </div>
  );
}

function VariantSlotAnimation() {
  const SLOT_1 = ALL_LOGOS.slice(0, 4);
  const SLOT_2 = ALL_LOGOS.slice(4, 8);
  const SLOT_3 = ALL_LOGOS.slice(8, 12);
  const SLOT_4 = ALL_LOGOS.slice(12, 16);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
      <div className="mb-14">
        <span className="inline-block px-5 py-2 bg-teal text-white text-xs sm:text-sm font-bold rounded-full mb-6 shadow-sm">
          Our Lenders
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-navy max-w-4xl mx-auto leading-tight mb-4 tracking-tight">
          We search through thousands of loan products with access to over {TOTAL_LENDERS} lenders
        </h2>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 lg:gap-12 w-full mt-16 max-w-full xl:max-w-[1300px] mx-auto min-h-[120px]">
        <LogoSlot logos={SLOT_1} delay={0} tick={tick} />
        <LogoSlot logos={SLOT_2} delay={200} tick={tick} />
        <LogoSlot logos={SLOT_3} delay={400} tick={tick} />
        <LogoSlot logos={SLOT_4} delay={600} tick={tick} />
      </div>
    </div>
  );
}

// ==========================================
// VARIANT 5: Static Grid (Original)
// ==========================================
function VariantStaticGrid() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <p className="text-teal font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4 inline-block bg-[#13A3B5]/10 px-4 py-1.5 rounded-full">
            More Choice. Better Loan.
          </p>
          <h2 className="text-fluid-h2 font-bold text-navy mb-5">
            We compare {TOTAL_LENDERS}+ lenders <br className="hidden xl:block" />so you don&apos;t have to.
          </h2>
          <p className="text-slate text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
            From major banks to specialist lenders, we compare hundreds of
            loan products to find the right fit for your goals and your future.
          </p>
          <a
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal text-white font-bold text-sm rounded-xl hover:bg-teal-light transition-all shadow-[0_4px_14px_0_rgba(19,163,181,0.39)] hover:-translate-y-0.5 group"
          >
            See our lender panel
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 relative z-10">
          {ALL_LOGOS.slice(0, 5).map((src, idx) => (
            <div 
              key={idx}
              className="bg-white border-2 border-slate-100 rounded-xl p-4 sm:p-5 h-20 sm:h-24 flex items-center justify-center shadow-sm"
            >
              <img src={src} alt="Lender Logo" className="w-full h-full object-contain opacity-80" />
            </div>
          ))}
          <div className="bg-slate-50 border-2 border-slate-100 rounded-xl p-4 sm:p-5 h-20 sm:h-24 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-navy font-bold text-xl sm:text-2xl leading-tight"><AnimatedCounter target={TOTAL_LENDERS} duration={2500} />+</span>
            <span className="text-[10px] sm:text-xs text-slate font-semibold uppercase tracking-wider">Lenders</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VARIANT 6: Orbital Ecosystem
// ==========================================
function OrbitRing({ radius, duration, reverse, logos, startAngle = 0 }: { radius: number, duration: number, reverse?: boolean, logos: string[], startAngle?: number }) {
  return (
    <div 
       className={`absolute left-1/2 top-1/2 rounded-full border border-slate-200/50 ${reverse ? 'animate-orbit-reverse' : 'animate-orbit'}`}
       style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius, animationDuration: `${duration}s` }}
    >
      {logos.map((src, i) => {
         const angle = startAngle + (i / logos.length) * 360;
         return (
           <div 
             key={i} 
             className="absolute left-1/2 top-1/2"
             style={{ 
               transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
               width: 0, height: 0
             }}
           >
             <div 
                className={`absolute left-1/2 top-1/2 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 ${reverse ? 'animate-orbit' : 'animate-orbit-reverse'}`}
                style={{ animationDuration: `${duration}s`, marginLeft: '-50%', marginTop: '-50%' }}
             >
                <img src={src} className="w-6 h-6 sm:w-10 sm:h-10 object-contain mix-blend-multiply opacity-90" />
             </div>
           </div>
         );
      })}
    </div>
  )
}

function VariantOrbital() {
  const innerLogos = ALL_LOGOS.slice(0, 2);
  const middleLogos = ALL_LOGOS.slice(2, 5);
  const outerLogos = ALL_LOGOS.slice(5, 8);

  return (
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

        {/* Right Side: Orbital Animation */}
        <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center lg:translate-x-12">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#13A3B5]/10 to-transparent blur-[80px] rounded-full scale-110 pointer-events-none" />
          
          <div className="relative w-full h-full scale-[0.65] sm:scale-90 lg:scale-100 flex items-center justify-center origin-center">
            <OrbitRing radius={150} duration={40} logos={innerLogos} startAngle={0} />
            <OrbitRing radius={240} duration={40} logos={middleLogos} startAngle={90} />
            <OrbitRing radius={330} duration={40} logos={outerLogos} startAngle={30} />

            {/* Core Center Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full shadow-[0_0_50px_rgba(19,163,181,0.25)] border border-[#13A3B5]/20 flex flex-col items-center justify-center z-10">
              <div className="absolute inset-0 rounded-full animate-ping bg-[#13A3B5]/20 opacity-50" style={{ animationDuration: '3s' }} />
              <span className="text-teal font-black text-4xl leading-none"><AnimatedCounter target={TOTAL_LENDERS} duration={2500} />+</span>
              <span className="text-[10px] text-navy font-bold uppercase tracking-widest mt-1">Lenders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VARIANT 7: 3D Isometric Platform
// ==========================================
function VariantIsometric() {
  const logos = ALL_LOGOS.slice(0, 12); // 3x4 grid

  return (
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
             {logos.map((src, i) => {
               // Calculate wave delay based on row and col for a cascading float effect
               const row = Math.floor(i / 3);
               const col = i % 3;
               const delay = (row + col) * 0.4;
               
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
                        <img src={src} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain mix-blend-multiply opacity-80 group-hover:opacity-100" />
                    </div>
                 </div>
               )
             })}
           </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT & TOGGLE
// ==========================================
export default function TrustBar() {
  const [variant, setVariant] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(7);

  return (
    <section className="bg-light-bg py-16 lg:py-24 relative overflow-hidden flex flex-col items-center min-h-[600px]">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes marquee-y {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-33.333%); }
        }
        @keyframes marquee-y-reverse {
          0% { transform: translateY(-33.333%); }
          100% { transform: translateY(0%); }
        }
        @keyframes slotOut {
          0% { transform: translateY(0); }
          25% { transform: translateY(15%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes slotIn {
          0% { transform: translateY(100%); }
          25% { transform: translateY(115%); }
          100% { transform: translateY(0); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-marquee { animation: marquee 35s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 35s linear infinite; }
        .animate-marquee-y { animation: marquee-y 20s linear infinite; }
        .animate-marquee-y-reverse { animation: marquee-y-reverse 20s linear infinite; }
        .animate-slot-out { animation: slotOut 0.7s cubic-bezier(0.5, 0, 0.2, 1) forwards; }
        .animate-slot-in { animation: slotIn 0.7s cubic-bezier(0.5, 0, 0.2, 1) forwards; }
        .animate-orbit { animation: orbit linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse linear infinite; }
        @keyframes float-iso {
          0%, 100% { transform: translateZ(0px); }
          50% { transform: translateZ(30px); }
        }
      `}} />

      {/* Client Review Toggle Panel (Only visible to help client decide) */}
      <div className="mb-12 bg-white rounded-full shadow-md p-1.5 flex flex-wrap justify-center relative z-50 border border-slate-100 max-w-full overflow-x-auto">
        <button 
          onClick={() => setVariant(1)}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors whitespace-nowrap ${variant === 1 ? 'bg-navy text-white' : 'text-slate hover:text-navy hover:bg-slate-50'}`}
        >
          Option 1: Horizontal Marquee
        </button>
        <button 
          onClick={() => setVariant(2)}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors whitespace-nowrap ${variant === 2 ? 'bg-navy text-white' : 'text-slate hover:text-navy hover:bg-slate-50'}`}
        >
          Option 2: Interactive Grid
        </button>
        <button 
          onClick={() => setVariant(3)}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors whitespace-nowrap ${variant === 3 ? 'bg-navy text-white' : 'text-slate hover:text-navy hover:bg-slate-50'}`}
        >
          Option 3: Vertical Scroll
        </button>
        <button 
          onClick={() => setVariant(4)}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors whitespace-nowrap ${variant === 4 ? 'bg-navy text-white' : 'text-slate hover:text-navy hover:bg-slate-50'}`}
        >
          Option 4: Slot Animation
        </button>
        <button 
          onClick={() => setVariant(5)}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors whitespace-nowrap ${variant === 5 ? 'bg-navy text-white' : 'text-slate hover:text-navy hover:bg-slate-50'}`}
        >
          Option 5: Static Grid
        </button>
        <button 
          onClick={() => setVariant(6)}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors whitespace-nowrap ${variant === 6 ? 'bg-navy text-white' : 'text-slate hover:text-navy hover:bg-slate-50'}`}
        >
          Option 6: Orbital Network
        </button>
        <button 
          onClick={() => setVariant(7)}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors whitespace-nowrap ${variant === 7 ? 'bg-navy text-white' : 'text-slate hover:text-navy hover:bg-slate-50'}`}
        >
          Option 7: 3D Isometric Platform
        </button>
      </div>

      <div className="w-full transition-all duration-500 ease-in-out flex-1 flex flex-col justify-center">
        {variant === 1 && <VariantMarquee />}
        {variant === 2 && <VariantGrid />}
        {variant === 3 && <VariantVertical />}
        {variant === 4 && <VariantSlotAnimation />}
        {variant === 5 && <VariantStaticGrid />}
        {variant === 6 && <VariantOrbital />}
        {variant === 7 && <VariantIsometric />}
      </div>
    </section>
  );
}
