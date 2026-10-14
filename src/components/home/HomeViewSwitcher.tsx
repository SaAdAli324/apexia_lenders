"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

// Enhanced (New) Components
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import TrustBar from "@/components/sections/TrustBar";
import FeaturedRates from "@/components/sections/FeaturedRates";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CalculatorsSection from "@/components/sections/CalculatorsSection";
import ComparisonMatrix from "@/components/sections/ComparisonMatrix";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import AwardBanner from "@/components/sections/AwardBanner";

// Original Components
import HeroOriginal from "@/components/sections/HeroOriginal";
import ServicesGridOriginal from "@/components/sections/ServicesGridOriginal";
import HowItWorksOriginal from "@/components/sections/HowItWorksOriginal";

export type HomeVersion = "original" | "enhanced";

const emptySubscribe = () => () => {};

export default function HomeViewSwitcher() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [version, setVersion] = useState<HomeVersion>("enhanced");
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      // Check URL search params for direct client links (e.g. ?v=original or ?mode=original)
      const params = new URLSearchParams(window.location.search);
      const urlVersion = params.get("v") || params.get("mode") || params.get("version");
      if (urlVersion === "original" || urlVersion === "enhanced") {
        setVersion(urlVersion);
        return;
      }

      // Check localStorage preference
      const saved = localStorage.getItem("apexia_home_version");
      if (saved === "original" || saved === "enhanced") {
        setVersion(saved);
      }
    });
  }, []);

  const handleSwitch = (newVersion: HomeVersion) => {
    setVersion(newVersion);
    if (typeof window !== "undefined") {
      localStorage.setItem("apexia_home_version", newVersion);
      const url = new URL(window.location.href);
      url.searchParams.set("v", newVersion);
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <>
      {/* Dynamic Homepage Sections */}
      {version === "original" ? (
        <>
          <HeroOriginal />
          <TrustBar />
          <ServicesGridOriginal />
          {/* Calculators section preserved as requested */}
          <CalculatorsSection />
          <HowItWorksOriginal />
          <Testimonials />
          <ContactFormSection />
          <AwardBanner />
        </>
      ) : (
        <>
          <Hero />
          <StatsBar />
          <TrustBar />
          <FeaturedRates />
          <ServicesGrid />
          <CalculatorsSection />
          <ComparisonMatrix />
          <HowItWorks />
          <Testimonials />
          <FaqSection />
          <ContactFormSection />
          <AwardBanner />
        </>
      )}

      {/* Floating Client Comparison Controller (Fixed Bottom-Right) */}
      {isClient && (
        <aside
          aria-label="Client View Mode Switcher"
          className="fixed bottom-5 right-5 z-50 select-none print:hidden"
        >
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="group flex items-center gap-2 bg-[#112A46] text-white px-4 py-2.5 rounded-full shadow-2xl border border-white/20 hover:bg-[#13A3B5] transition-all duration-200 cursor-pointer text-xs font-semibold"
              title="Expand presentation controls"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{version === "original" ? "Original View" : "Enhanced View ✨"}</span>
              <span className="text-white/60 group-hover:text-white transition-colors">↗</span>
            </button>
          ) : (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 sm:p-4 max-w-[340px] text-navy transition-all duration-300 ring-1 ring-black/5">
              {/* Header with Title and Minimize */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#13A3B5] animate-ping" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    Client Presentation Mode
                  </span>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-slate-400 hover:text-navy p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer text-xs leading-none"
                  title="Minimize switcher"
                  aria-label="Minimize switcher"
                >
                  ✕
                </button>
              </div>

              {/* Version Toggle Buttons */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-3">
                <button
                  type="button"
                  onClick={() => handleSwitch("original")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                    version === "original"
                      ? "bg-white text-[#112A46] shadow-sm ring-1 ring-slate-200"
                      : "text-slate-500 hover:text-navy"
                  }`}
                >
                  Original (V1)
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitch("enhanced")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                    version === "enhanced"
                      ? "bg-[#112A46] text-white shadow-sm"
                      : "text-slate-500 hover:text-navy"
                  }`}
                >
                  Enhanced (New)
                  <span className="text-amber-400 text-[10px]">✨</span>
                </button>
              </div>

              {/* Info Description */}
              <div className="text-[11px] leading-relaxed text-slate-500 bg-slate-50 rounded-lg p-2.5 border border-slate-200/60">
                {version === "original" ? (
                  <p>
                    <strong className="text-navy font-semibold">Original Layout Active:</strong> Reverted to original hero and sections, with the <strong className="text-teal font-semibold">Calculator suite preserved</strong>.
                  </p>
                ) : (
                  <p>
                    <strong className="text-navy font-semibold">Enhanced Layout Active:</strong> Includes today&apos;s 3D Hero, Stats bar, Wholesale Rates, Comparison Matrix, and FAQ.
                  </p>
                )}
              </div>

              {/* Quick direct share hint */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>Direct link URL synced (?v={version})</span>
                <button
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="text-teal font-bold hover:underline cursor-pointer"
                  title="Copy direct link for client"
                >
                  Copy URL
                </button>
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
}
