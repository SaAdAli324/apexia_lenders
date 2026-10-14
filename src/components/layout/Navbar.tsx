"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOAN_NAV_ITEMS, CALCULATOR_NAV_ITEMS } from "@/lib/constants";
import Button from "@/components/ui/Button";



export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"loans" | "calculators" | null>(null);
  const [mobileLoansOpen, setMobileLoansOpen] = useState(false);
  const [mobileCalcsOpen, setMobileCalcsOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const handleMouseEnter = (type: "loans" | "calculators") => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const isCalculatorsActive = pathname.startsWith("/calculators");
  const isLoansActive = pathname.startsWith("/services");

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 -ml-2">
            <img 
              src="/logo.png" 
              alt="Apexia Lending Logo" 
              className="object-contain h-12 md:h-14 w-auto" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* Home */}
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/" ? "text-navy font-semibold" : "text-slate hover:text-navy"
              }`}
            >
              Home
            </Link>

            {/* Loans Dropdown */}
            <div
              className="group relative"
              onMouseEnter={() => handleMouseEnter("loans")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link
                  href="/services"
                  className={`text-sm font-medium transition-colors py-2 ${
                    isLoansActive
                      ? "text-teal font-semibold"
                      : "text-slate hover:text-navy group-hover:text-teal"
                  }`}
                >
                  Loans
                </Link>
                <button
                  type="button"
                  id="loans-nav-btn"
                  onClick={() => setActiveDropdown(activeDropdown === "loans" ? null : "loans")}
                  className="py-2 pl-1.5 pr-1 text-slate-light hover:text-teal group-hover:text-teal cursor-pointer"
                  aria-label="Toggle loans dropdown"
                  aria-expanded={activeDropdown === "loans"}
                  aria-haspopup="true"
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "loans" ? "rotate-180 text-teal" : "text-slate-light group-hover:text-teal group-hover:rotate-180"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Loans Mega Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[540px] z-50 transition-all duration-150 ${
                  activeDropdown === "loans" ? "block" : "hidden group-hover:block"
                }`}
                onMouseEnter={() => handleMouseEnter("loans")}
                onMouseLeave={handleMouseLeave}
              >
                  <div className="bg-white rounded-2xl border border-border shadow-xl p-5 overflow-hidden">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate block">
                          Loans We Provide
                        </span>
                        <p className="text-xs text-navy font-medium mt-0.5">
                          Tailored mortgage solutions across 50+ Australian lenders
                        </p>
                      </div>
                      <Link
                        href="/services"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-semibold text-teal hover:underline flex items-center gap-1"
                      >
                        View all
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {LOAN_NAV_ITEMS.map((loan) => (
                        <Link
                          key={loan.slug}
                          href={loan.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-3 rounded-xl hover:bg-slate-50 transition-colors group block"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-navy group-hover:text-teal transition-colors">
                              {loan.title}
                            </span>
                            <span className="text-[10px] font-semibold text-teal bg-teal/10 px-2 py-0.5 rounded-md whitespace-nowrap">
                              {loan.tag}
                            </span>
                          </div>
                          <p className="text-xs text-slate mt-0.5 leading-normal">
                            {loan.desc}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-border bg-slate-50/70 -mx-5 -mb-5 px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>$0 Broker fee · Tailored loan structuring</span>
                      </div>
                      <Link
                        href="/contact"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-navy hover:text-teal transition-colors"
                      >
                        Speak with Farid →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            {/* Calculators Dropdown */}
            <div
              className="group relative"
              onMouseEnter={() => handleMouseEnter("calculators")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link
                  href="/calculators"
                  className={`text-sm font-medium transition-colors py-2 ${
                    isCalculatorsActive
                      ? "text-teal font-semibold"
                      : "text-slate hover:text-navy group-hover:text-teal"
                  }`}
                >
                  Calculators
                </Link>
                <button
                  type="button"
                  id="calculators-nav-btn"
                  onClick={() => setActiveDropdown(activeDropdown === "calculators" ? null : "calculators")}
                  className="py-2 pl-1.5 pr-1 text-slate-light hover:text-teal group-hover:text-teal cursor-pointer"
                  aria-label="Toggle calculators dropdown"
                  aria-expanded={activeDropdown === "calculators"}
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "calculators" ? "rotate-180 text-teal" : "text-slate-light group-hover:text-teal group-hover:rotate-180"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Calculators Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[460px] z-50 transition-all duration-150 ${
                  activeDropdown === "calculators" ? "block" : "hidden group-hover:block"
                }`}
                onMouseEnter={() => handleMouseEnter("calculators")}
                onMouseLeave={handleMouseLeave}
              >
                  <div className="bg-white rounded-2xl border border-border shadow-xl p-5 overflow-hidden">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate block">
                          Mortgage Calculators
                        </span>
                        <p className="text-xs text-navy font-medium mt-0.5">
                          Accurate, APRA-compliant Australian financial tools
                        </p>
                      </div>
                      <Link
                        href="/calculators"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-semibold text-teal hover:underline flex items-center gap-1"
                      >
                        All tools
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    <div className="space-y-1">
                      {CALCULATOR_NAV_ITEMS.map((calc) => (
                        <Link
                          key={calc.slug}
                          href={calc.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-3 rounded-xl hover:bg-slate-50 transition-colors group block"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-navy group-hover:text-teal transition-colors">
                              {calc.title}
                            </span>
                            <span className="text-[10px] font-semibold text-teal bg-teal/10 px-2 py-0.5 rounded-md whitespace-nowrap">
                              {calc.tag}
                            </span>
                          </div>
                          <p className="text-xs text-slate mt-0.5 leading-normal">
                            {calc.desc}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-border bg-slate-50/70 -mx-5 -mb-5 px-5 py-3 flex items-center justify-between">
                      <span className="text-xs text-slate">
                        Updated with 2026 tax &amp; stamp duty brackets
                      </span>
                      <Link
                        href="/calculators"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-navy hover:text-teal transition-colors"
                      >
                        Open Calculators Hub →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            {/* About Us */}
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                pathname === "/about" ? "text-teal font-semibold" : "text-slate hover:text-navy"
              }`}
            >
              About Us
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                pathname === "/contact" ? "text-teal font-semibold" : "text-slate hover:text-navy"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Button href="/contact" variant="primary" size="sm">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-navy rounded-lg hover:bg-light-bg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white animate-in slide-in-from-top duration-200 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <nav className="flex flex-col px-4 py-4 space-y-1">
            {/* Home */}
            <Link
              href="/"
              className="px-4 py-2.5 text-sm font-semibold text-navy hover:bg-light-bg rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            {/* Loans Accordion */}
            <div className="border-b border-border/60 py-1">
              <button
                type="button"
                onClick={() => setMobileLoansOpen(!mobileLoansOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-navy hover:bg-light-bg rounded-lg transition-colors"
              >
                <span>Loans We Provide</span>
                <svg
                  className={`w-4 h-4 text-slate transition-transform duration-200 ${
                    mobileLoansOpen ? "rotate-180 text-teal" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileLoansOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/50 rounded-xl my-1">
                  {LOAN_NAV_ITEMS.map((loan) => (
                    <Link
                      key={loan.slug}
                      href={loan.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate hover:text-navy hover:bg-white rounded-lg transition-colors"
                    >
                      <span className="text-navy font-semibold">{loan.title}</span>
                      <span className="text-[9px] font-bold text-teal bg-teal/10 px-1.5 py-0.5 rounded">
                        {loan.tag}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-xs font-bold text-teal hover:underline"
                  >
                    View All Loan Solutions →
                  </Link>
                </div>
              )}
            </div>

            {/* Calculators Accordion */}
            <div className="border-b border-border/60 py-1">
              <button
                type="button"
                onClick={() => setMobileCalcsOpen(!mobileCalcsOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-navy hover:bg-light-bg rounded-lg transition-colors"
              >
                <span className={isCalculatorsActive ? "text-teal font-bold" : ""}>Calculators</span>
                <svg
                  className={`w-4 h-4 text-slate transition-transform duration-200 ${
                    mobileCalcsOpen ? "rotate-180 text-teal" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileCalcsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/50 rounded-xl my-1">
                  <Link
                    href="/calculators"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-teal hover:bg-white rounded-lg transition-colors"
                  >
                    <span>All Calculators Hub</span>
                    <span className="text-[9px] font-bold bg-teal text-white px-1.5 py-0.5 rounded">
                      Hub
                    </span>
                  </Link>
                  {CALCULATOR_NAV_ITEMS.map((calc) => (
                    <Link
                      key={calc.slug}
                      href={calc.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate hover:text-navy hover:bg-white rounded-lg transition-colors"
                    >
                      <span className="text-navy font-semibold">{calc.title}</span>
                      <span className="text-[9px] font-bold text-teal bg-teal/10 px-1.5 py-0.5 rounded">
                        {calc.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About Us */}
            <Link
              href="/about"
              className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                pathname === "/about" ? "text-teal bg-teal/10 font-bold" : "text-navy hover:bg-light-bg"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              About Us
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                pathname === "/contact" ? "text-teal bg-teal/10 font-bold" : "text-navy hover:bg-light-bg"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>

            {/* Book Consultation Button */}
            <div className="pt-4 px-2">
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                className="w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Book Consultation
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
