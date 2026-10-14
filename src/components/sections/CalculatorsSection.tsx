"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { paymentPerPeriod, generateAmortisationSchedule } from "@/lib/calculators/finance";

const calculatorCards = [
  {
    title: "Borrowing Power",
    subtitle: "How much can I borrow?",
    description:
      "Find out your borrowing capacity based on your income, living expenses, and current APRA serviceability guidelines.",
    href: "/calculators#borrowing-power",
    badge: "Most popular",
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Repayments & Amortisation",
    subtitle: "What will I pay?",
    description:
      "Calculate monthly, fortnightly, or weekly loan repayments, total interest, and test how rate rises could affect your budget.",
    href: "/calculators#repayments",
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Stamp Duty & Concessions",
    subtitle: "What are the upfront costs?",
    description:
      "Understand state transfer duty and explore potential first home buyer concessions across all Australian states and territories.",
    href: "/calculators#stamp-duty",
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function CalculatorsSection() {
  const [loanAmount, setLoanAmount] = useState<number>(650000);
  const [interestRate, setInterestRate] = useState<number>(5.79);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [frequency, setFrequency] = useState<"monthly" | "fortnightly" | "weekly">("monthly");
  const [loanPurpose, setLoanPurpose] = useState<"owner" | "investment">("owner");

  const estPropertyValue = Math.round(loanAmount / 0.8);
  const estDeposit = estPropertyValue - loanAmount;

  const periodsPerYear = frequency === "monthly" ? 12 : frequency === "fortnightly" ? 26 : 52;
  const periodicPayment = Math.round(paymentPerPeriod(loanAmount, interestRate / 100, loanTerm, periodsPerYear));
  const totalRepayments = Math.round(periodicPayment * periodsPerYear * loanTerm);
  const totalInterest = Math.max(0, totalRepayments - loanAmount);

  // Standard benchmark difference vs standard 6.45% bank rate
  const benchmarkPayment = Math.round(paymentPerPeriod(loanAmount, 0.0645, loanTerm, periodsPerYear));
  const periodicSavings = Math.max(0, benchmarkPayment - periodicPayment);
  const annualSavings = Math.round(periodicSavings * periodsPerYear);

  const [graphTab, setGraphTab] = useState<"breakdown" | "amortisation">("breakdown");
  const [hoveredPoint, setHoveredPoint] = useState<{ year: number; balance: number } | null>(null);

  const amortisationSchedule = generateAmortisationSchedule(loanAmount, interestRate / 100, loanTerm);
  const totalCostVal = totalRepayments > 0 ? totalRepayments : 1;
  const principalRatio = Math.min(1, Math.max(0, loanAmount / totalCostVal));
  const interestRatio = Math.min(1, Math.max(0, totalInterest / totalCostVal));
  const principalPercent = Math.round(principalRatio * 100);
  const interestPercent = Math.max(0, 100 - principalPercent);

  // Donut geometry (radius 36, circumference ~226.19)
  const donutRadius = 36;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const principalStroke = principalRatio * donutCircumference;
  const interestStroke = interestRatio * donutCircumference;

  // Amortisation curve geometry
  const curveWidth = 320;
  const curveHeight = 110;
  const curvePad = { top: 12, right: 12, bottom: 20, left: 38 };
  const plotW = curveWidth - curvePad.left - curvePad.right;
  const plotH = curveHeight - curvePad.top - curvePad.bottom;

  const points = amortisationSchedule.map((pt, i) => {
    const x = curvePad.left + (i / (amortisationSchedule.length - 1)) * plotW;
    const ratio = loanAmount > 0 ? pt.balance / loanAmount : 0;
    const y = curvePad.top + (1 - ratio) * plotH;
    return { ...pt, x, y };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, "");
  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${(curvePad.top + plotH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(curvePad.top + plotH).toFixed(1)} Z`
    : "";

  const handleConsultation = () => {
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <section id="calculators-section" className="py-20 lg:py-24 bg-gradient-to-b from-[#EDF7F9] via-[#F5FAFA] to-[#EDF7F9] border-b border-teal/20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Work Out Your Numbers"
          title="Interactive Repayment Estimator & Calculators"
          subtitle="Adjust the sliders below to see your estimated repayments and how much you could save by negotiating across 50+ lenders."
        />

        {/* Live Interactive Quick Estimator Card */}
        <div className="bg-white rounded-3xl border border-teal/20 shadow-md p-6 sm:p-8 lg:p-9 mb-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Controls - Perfectly proportioned and balanced */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              {/* Purpose Selector */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-navy">
                  Loan Configuration
                </span>
                <div className="inline-flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setLoanPurpose("owner");
                      if (interestRate === 6.14) setInterestRate(5.79);
                    }}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      loanPurpose === "owner"
                        ? "bg-navy text-white shadow-xs"
                        : "text-slate hover:text-navy"
                    }`}
                  >
                    Owner Occupied
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoanPurpose("investment");
                      if (interestRate === 5.79) setInterestRate(6.14);
                    }}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      loanPurpose === "investment"
                        ? "bg-navy text-white shadow-xs"
                        : "text-slate hover:text-navy"
                    }`}
                  >
                    Investment (+0.35%)
                  </button>
                </div>
              </div>

              {/* Slider 1: Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-navy">
                    Loan Amount
                  </label>
                  <span className="text-xl font-extrabold text-teal">
                    ${loanAmount.toLocaleString("en-AU")}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={2000000}
                  step={25000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal"
                />
                <div className="flex gap-2 mt-2">
                  {[400000, 650000, 850000, 1200000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setLoanAmount(val)}
                      className={`text-xs px-2.5 py-1 rounded-md border cursor-pointer transition-colors ${
                        loanAmount === val
                          ? "bg-navy text-white border-navy"
                          : "bg-slate-50 text-slate hover:bg-slate-100 border-border"
                      }`}
                    >
                      ${val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}k`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-navy">
                    Interest Rate (% p.a.)
                  </label>
                  <span className="text-xl font-extrabold text-navy">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={4.5}
                  max={8.5}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal"
                />
                <div className="flex justify-between text-[11px] text-slate-light mt-1">
                  <span>4.50%</span>
                  <span>{loanPurpose === "investment" ? "6.14% (Specialist Tier)" : "5.79% (Specialist / Broker Tier)"}</span>
                  <span>8.50%</span>
                </div>
              </div>

              {/* Loan Term & Payment Frequency */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    Loan Term
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[20, 25, 30].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setLoanTerm(term)}
                        className={`py-2 text-xs font-bold rounded-lg border cursor-pointer transition-colors ${
                          loanTerm === term
                            ? "bg-navy text-white border-navy"
                            : "bg-white text-slate border-border hover:bg-slate-50"
                        }`}
                      >
                        {term} Yrs
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    Payment Frequency
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(["monthly", "fortnightly", "weekly"] as const).map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setFrequency(freq)}
                        className={`py-2 text-xs font-bold rounded-lg border capitalize cursor-pointer transition-colors ${
                          frequency === freq
                            ? "bg-teal text-white border-teal"
                            : "bg-white text-slate border-border hover:bg-slate-50"
                        }`}
                      >
                        {freq === "fortnightly" ? "Fortnight" : freq}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time 80% LVR & Deposit Guidance Card */}
              <div className="bg-gradient-to-r from-[#EDF7F9] to-white border border-teal/20 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal/15 text-teal flex items-center justify-center font-extrabold text-xs shrink-0">
                    80%
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-navy">
                        Est. Property Value:
                      </span>
                      <span className="text-xs font-extrabold text-teal">
                        ${estPropertyValue.toLocaleString("en-AU")}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate mt-0.5">
                      Deposit needed: <strong className="text-navy font-semibold">${estDeposit.toLocaleString("en-AU")}</strong> (20% deposit avoids LMI)
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-teal bg-white border border-teal/20 px-2.5 py-1 rounded-full shrink-0 shadow-2xs hidden sm:inline-block">
                  ✓ No LMI
                </span>
              </div>

              {/* 3 Broker Value Micro-Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-teal/10 text-teal flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-navy">50+ Lenders</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-teal/10 text-teal flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-navy">$0 Broker Fee</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-teal/10 text-teal flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-navy">Fast Approvals</span>
                </div>
              </div>
            </div>

            {/* Right Result Card with Live Visual Graph */}
            <div className="lg:col-span-5 bg-navy rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-teal/15 blur-3xl rounded-full pointer-events-none" />

              <div>
                {/* Header & Repayment figure */}
                <div className="flex justify-between items-start mb-1">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-wider">
                    Estimated Repayment
                  </p>
                  <span className="text-[11px] font-semibold text-teal bg-teal/15 border border-teal/25 px-2 py-0.5 rounded-full capitalize">
                    {frequency}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    ${periodicPayment.toLocaleString("en-AU")}
                  </span>
                  <span className="text-sm font-semibold text-teal capitalize">
                    / {frequency === "monthly" ? "mo" : frequency === "fortnightly" ? "fortnight" : "wk"}
                  </span>
                </div>

                {annualSavings > 0 && (
                  <div className="bg-teal/15 border border-teal/30 rounded-xl p-3 mb-5 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-teal/20 text-teal flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-white leading-tight">
                        Save up to ~${annualSavings.toLocaleString("en-AU")}/year
                      </p>
                      <p className="text-white/60 text-[11px]">
                        vs. standard 6.45% unnegotiated bank rates.
                      </p>
                    </div>
                  </div>
                )}

                {/* Live Graph Visualizer Box */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 backdrop-blur-xs">
                  {/* Graph Header & Switcher */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                      Cost Visualizer
                    </span>
                    <div className="inline-flex bg-white/10 p-0.5 rounded-lg text-[11px] font-semibold">
                      <button
                        type="button"
                        onClick={() => setGraphTab("breakdown")}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          graphTab === "breakdown"
                            ? "bg-teal text-white shadow-xs font-bold"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        Loan Split
                      </button>
                      <button
                        type="button"
                        onClick={() => setGraphTab("amortisation")}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          graphTab === "amortisation"
                            ? "bg-teal text-white shadow-xs font-bold"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        Payoff Curve
                      </button>
                    </div>
                  </div>

                  {/* Tab Views Container - Fixed height ensures ZERO layout shift when toggling tabs */}
                  <div className="relative h-[155px]">
                    {/* View 1: Loan Split Donut & Proportional Bar */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-200 ${
                        graphTab === "breakdown" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 sm:gap-4 my-auto py-0.5">
                        {/* Donut Chart SVG */}
                        <div className="relative w-22 h-22 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
                          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 select-none">
                            {/* Background Ring */}
                            <circle
                              cx="50"
                              cy="50"
                              r={donutRadius}
                              fill="none"
                              stroke="rgba(255,255,255,0.08)"
                              strokeWidth="11"
                            />
                            {/* Principal Arc */}
                            <circle
                              cx="50"
                              cy="50"
                              r={donutRadius}
                              fill="none"
                              stroke="#13A3B5"
                              strokeWidth="11"
                              strokeDasharray={`${principalStroke} ${donutCircumference}`}
                              strokeDashoffset={0}
                              strokeLinecap="round"
                              className="transition-all duration-500"
                            />
                            {/* Interest Arc */}
                            <circle
                              cx="50"
                              cy="50"
                              r={donutRadius}
                              fill="none"
                              stroke="#F59E0B"
                              strokeWidth="11"
                              strokeDasharray={`${interestStroke} ${donutCircumference}`}
                              strokeDashoffset={-principalStroke}
                              strokeLinecap="round"
                              className="transition-all duration-500"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                            <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider">
                              Principal
                            </span>
                            <span className="text-xs font-extrabold text-teal">
                              {principalPercent}%
                            </span>
                          </div>
                        </div>

                        {/* Breakdown Progress Bars */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="flex items-center gap-1.5 text-white/80 font-medium truncate">
                                <span className="w-2 h-2 rounded-full bg-teal shrink-0" />
                                Principal
                              </span>
                              <span className="font-bold text-white text-xs shrink-0 ml-1">
                                ${loanAmount.toLocaleString("en-AU")}
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${principalPercent}%` }}
                                className="h-full bg-teal rounded-full transition-all duration-300"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="flex items-center gap-1.5 text-white/80 font-medium truncate">
                                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                                Total Interest
                              </span>
                              <span className="font-bold text-amber-300 text-xs shrink-0 ml-1">
                                ${totalInterest.toLocaleString("en-AU")}
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${interestPercent}%` }}
                                className="h-full bg-amber-400 rounded-full transition-all duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Summary total */}
                      <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs shrink-0 h-7">
                        <span className="text-white/60">Total Cost ({loanTerm} yrs):</span>
                        <span className="font-bold text-teal text-sm">
                          ${totalRepayments.toLocaleString("en-AU")}
                        </span>
                      </div>
                    </div>

                    {/* View 2: Amortisation Payoff Curve */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-200 ${
                        graphTab === "amortisation" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                      }`}
                    >
                      <div className="relative w-full h-[112px] flex items-center justify-center">
                        <svg
                          viewBox={`0 0 ${curveWidth} ${curveHeight}`}
                          className="w-full h-full max-h-[112px] overflow-visible select-none"
                          role="img"
                          aria-label="Mortgage payoff curve"
                        >
                          <defs>
                            <linearGradient id="calcCurveGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#13A3B5" stopOpacity="0.45" />
                              <stop offset="90%" stopColor="#13A3B5" stopOpacity="0.02" />
                            </linearGradient>
                          </defs>

                          {/* Base Grid Line */}
                          <line
                            x1={curvePad.left}
                            y1={curvePad.top + plotH}
                            x2={curveWidth - curvePad.right}
                            y2={curvePad.top + plotH}
                            stroke="rgba(255,255,255,0.15)"
                            strokeWidth="1"
                          />

                          {/* Y-axis Labels */}
                          <text
                            x={curvePad.left - 6}
                            y={curvePad.top + 4}
                            textAnchor="end"
                            className="text-[9px] fill-white/50 font-mono"
                          >
                            ${Math.round(loanAmount / 1000)}k
                          </text>
                          <text
                            x={curvePad.left - 6}
                            y={curvePad.top + plotH + 3}
                            textAnchor="end"
                            className="text-[9px] fill-white/50 font-mono"
                          >
                            $0
                          </text>

                          {/* Area & Stroke Path */}
                          <path d={areaD} fill="url(#calcCurveGrad)" />
                          <path
                            d={pathD}
                            fill="none"
                            stroke="#13A3B5"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* X-axis Ticks */}
                          {[0, Math.round(loanTerm / 2), loanTerm].map((yr) => {
                            const xPos = curvePad.left + (yr / loanTerm) * plotW;
                            return (
                              <text
                                key={yr}
                                x={xPos}
                                y={curvePad.top + plotH + 14}
                                textAnchor="middle"
                                className="text-[9px] fill-white/50 font-sans"
                              >
                                Yr {yr}
                              </text>
                            );
                          })}

                          {/* Active Hover Marker */}
                          {hoveredPoint && (
                            <g pointerEvents="none">
                              <circle
                                cx={curvePad.left + (hoveredPoint.year / loanTerm) * plotW}
                                cy={curvePad.top + (1 - (loanAmount > 0 ? hoveredPoint.balance / loanAmount : 0)) * plotH}
                                r="4.5"
                                fill="#13A3B5"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                              />
                            </g>
                          )}

                          {/* Hover Catchers */}
                          {points.map((p, idx) => {
                            const colW = plotW / (points.length - 1);
                            return (
                              <rect
                                key={idx}
                                x={p.x - colW / 2}
                                y={curvePad.top}
                                width={colW}
                                height={plotH}
                                fill="transparent"
                                onMouseEnter={() => setHoveredPoint(p)}
                                onTouchStart={() => setHoveredPoint(p)}
                                onMouseLeave={() => setHoveredPoint(null)}
                                className="cursor-crosshair"
                              />
                            );
                          })}
                        </svg>
                      </div>

                      {/* Readout Under Curve */}
                      <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs shrink-0 h-7">
                        {hoveredPoint ? (
                          <>
                            <span className="text-white/70">
                              Year <strong className="text-white">{hoveredPoint.year}</strong> balance:
                            </span>
                            <span className="font-extrabold text-teal">
                              ${hoveredPoint.balance.toLocaleString("en-AU")}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-white/60 text-[11px]">
                              Hover curve to inspect balance
                            </span>
                            <span className="font-bold text-teal text-xs">
                              {loanTerm} Yrs to $0
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <button
                onClick={handleConsultation}
                className="w-full py-3.5 px-4 bg-teal hover:bg-teal-light text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-teal/20 cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                Compare 50+ Lenders For This Loan
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Deep-Dive Calculators Header */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-navy">
            Explore Our Comprehensive Calculator Suite
          </h3>
          <p className="text-slate text-sm mt-1">
            Need exact APRA serviceability or state stamp duty figures? Use our specialized tools.
          </p>
        </div>

        {/* 3 Calculator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {calculatorCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between hover:shadow-md hover:border-navy/40 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-teal/10 transition-colors">
                    {card.icon}
                  </div>
                  {card.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-navy bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                      {card.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-navy group-hover:text-teal transition-colors mb-1">
                  {card.title}
                </h3>
                <p className="text-xs font-semibold text-teal uppercase tracking-wider mb-3">
                  {card.subtitle}
                </p>
                <p className="text-sm text-slate leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-border">
                <Link
                  href={card.href}
                  className="inline-flex items-center text-sm font-bold text-navy group-hover:text-teal transition-colors"
                >
                  Open Full Calculator
                  <svg
                    className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
