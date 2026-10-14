import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

const SERVICE_TAGS: Record<string, string> = {
  "first-home-buyer": "Govt Schemes",
  "refinancing": "Rate Reduction",
  "debt-consolidation": "Single Repayment",
  "investment-property": "Portfolio Growth",
  "construction": "Progress Drawdown",
};

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 lg:py-24 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <SectionHeading
          eyebrow="Tailored Loan Solutions"
          title="Loan solutions for every stage of your journey."
          subtitle="Whether you're purchasing your first home, growing your investment portfolio, or reducing existing debt, we structure the right solution from 50+ lenders."
        />

        {/* 5 Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {services.slice(0, 5).map((service) => {
            let svgIcon;
            switch (service.slug) {
              case "first-home-buyer":
                svgIcon = (
                  <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                );
                break;
              case "refinancing":
                svgIcon = (
                  <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 15l3 3m0 0l3-3m-3 3v-6" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 9l-3-3m0 0l-3 3m3-3v6" />
                  </svg>
                );
                break;
              case "debt-consolidation":
                svgIcon = (
                  <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 6v12" />
                  </svg>
                );
                break;
              case "investment-property":
                svgIcon = (
                  <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                );
                break;
              case "construction":
                svgIcon = (
                  <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                );
                break;
              default:
                svgIcon = (
                  <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth={1.75} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 15L15 9M9 9h.01M15 15h.01" />
                  </svg>
                );
            }

            const tag = SERVICE_TAGS[service.slug];

            return (
              <div
                key={service.slug}
                id={`service-${service.slug}`}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-navy/40 hover:bg-white transition-all duration-300 group scroll-mt-28"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center group-hover:bg-teal/10 transition-colors shadow-xs">
                      {svgIcon}
                    </div>
                    {tag && (
                      <span className="text-[10px] font-bold text-navy bg-white border border-slate-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                        {tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-navy mb-2 group-hover:text-teal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 mt-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-bold text-navy group-hover:text-teal transition-colors gap-1.5"
                  >
                    Explore details
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
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
            );
          })}
        </div>

        {/* Eye-Catchy Picture Beside Content Feature Showcase */}
        <div className="bg-[#EDF7F9] rounded-3xl border border-teal/20 p-8 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Picture on Left */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/hero-house.jpg"
                  alt="Modern Australian architectural home financed through Apexia Lending"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                
                {/* Floating highlight badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-slate uppercase tracking-wider">
                        Turnaround Guarantee
                      </p>
                      <p className="text-sm font-extrabold text-navy mt-0.5">
                        24–48h Fast Pre-Approval
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-teal/15 text-teal flex items-center justify-center font-bold text-sm">
                      ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content on Right */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-teal/15 border border-teal/30 px-3.5 py-1.5 rounded-full mb-4 self-start">
                <span className="text-navy font-bold text-xs uppercase tracking-wider">
                  The Broker Advantage
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy mb-4 leading-tight">
                Unlock wholesale lender pricing without the stress of bank branches.
              </h3>

              <p className="text-slate text-sm sm:text-base leading-relaxed mb-6">
                When you walk into a single bank branch, you only get their standard retail rates and strict policies. With Apexia Lending, we search across 50+ lenders to match your financial profile with the sharpest rate and maximum borrowing power.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-teal/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy">Direct Credit Manager Negotiation</h4>
                    <p className="text-xs text-slate mt-0.5">We negotiate unpublished tier discounts not available directly to retail branch walk-ins.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-teal/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy">Zero Cost to You ($0 Broker Fee)</h4>
                    <p className="text-xs text-slate mt-0.5">Our service is 100% free—banks pay us commission upon settlement under Australian Best Interests Duty.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-teal/10 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy">End-to-End File Management</h4>
                    <p className="text-xs text-slate mt-0.5">We package, submit, and chase your file every day until your keys are in hand.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Button href="/contact" variant="primary" size="md" className="shadow-md">
                  Book Free Consultation
                </Button>
                <Link
                  href="/services"
                  className="text-sm font-bold text-navy hover:text-teal transition-colors inline-flex items-center gap-1.5"
                >
                  View all 50+ lenders
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
