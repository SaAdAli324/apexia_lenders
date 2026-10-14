import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SERVICES_DATA } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Mortgage & Loan Services | Apexia Lending Australia",
  description:
    "Explore our complete range of mortgage brokerage services. First home buyer loans, refinancing, investment property finance, construction loans, and debt consolidation.",
};

export default function ServicesPage() {
  const servicesList = Object.values(SERVICES_DATA);

  return (
    <div className="bg-light-bg min-h-screen">
      {/* Hero Header */}
      <section className="bg-navy text-white pt-14 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#13A3B5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Services</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal/20 text-teal border border-teal/30 mb-6">
              50+ Australian Lenders Compared
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Tailored Loan Solutions for Every Property Journey
            </h1>
            <p className="text-base sm:text-lg text-slate-light leading-relaxed">
              From entering the property market with government guarantee schemes to refinancing for immediate cash flow relief, we match your circumstances with the sharpest loan structures across Australia.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Lending Panel"
            title="Comprehensive Mortgage Brokerage Services"
            subtitle="Select a loan category below to explore specific features, eligibility guidelines, and lender policies."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-3xl p-8 border border-border shadow-xs hover:shadow-xl hover:border-teal/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-bold text-teal bg-teal/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {service.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate">Free Service</span>
                  </div>

                  <h3 className="text-xl font-bold text-navy group-hover:text-teal transition-colors mb-2">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                    {service.keyBenefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-navy font-medium">
                        <span className="text-teal font-bold shrink-0">✓</span>
                        <span>{benefit.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-50 text-navy font-bold text-sm hover:bg-teal hover:text-white transition-all group-hover:bg-teal group-hover:text-white"
                  >
                    <span>Explore Loan Details</span>
                    <span className="text-xs">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How the Process Works */}
      <section className="py-16 sm:py-20 bg-white border-y border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Simple 4-Step Process"
            title="How We Get Your Loan Approved"
            subtitle="We handle the heavy lifting from comparison to settlement so you can focus on finding the right property."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <span className="text-3xl font-extrabold text-teal/40 block mb-2">01</span>
              <h4 className="text-base font-bold text-navy mb-1.5">Free Consultation</h4>
              <p className="text-xs text-slate leading-relaxed">
                We review your income, existing commitments, and goals to establish your true borrowing power.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <span className="text-3xl font-extrabold text-teal/40 block mb-2">02</span>
              <h4 className="text-base font-bold text-navy mb-1.5">50+ Lender Audit</h4>
              <p className="text-xs text-slate leading-relaxed">
                We shortlist 2 to 3 leading lender packages that match your criteria with sharp interest rates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <span className="text-3xl font-extrabold text-teal/40 block mb-2">03</span>
              <h4 className="text-base font-bold text-navy mb-1.5">Application &amp; Approval</h4>
              <p className="text-xs text-slate leading-relaxed">
                We package and submit your file, answering lender credit queries until formal approval is granted.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <span className="text-3xl font-extrabold text-teal/40 block mb-2">04</span>
              <h4 className="text-base font-bold text-navy mb-1.5">Settlement &amp; Beyond</h4>
              <p className="text-xs text-slate leading-relaxed">
                We coordinate with your conveyancer for settlement and conduct ongoing annual reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Banner */}
      <section className="py-16 sm:py-20 bg-light-bg">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-navy to-[#18395e] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Online Financial Tools
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Check Your Borrowing Power &amp; Repayments
              </h2>
              <p className="text-sm text-slate-light leading-relaxed">
                Use our APRA-compliant Australian calculators to test your borrowing capacity, monthly repayments, and stamp duty costs in real-time.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Button href="/calculators#borrowing-power" variant="primary" size="lg">
                Borrowing Power
              </Button>
              <Button href="/calculators#repayments" variant="outlineLight" size="lg">
                Repayments Calculator
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
