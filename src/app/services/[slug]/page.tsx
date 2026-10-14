import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SERVICES_DATA, type ServiceDetail } from "@/lib/services-data";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return {
      title: "Service Not Found | Apexia Lending",
    };
  }

  return {
    title: `${service.title} | Apexia Lending Australia`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service: ServiceDetail | undefined = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-light-bg min-h-screen">
      {/* Hero Header */}
      <section className="bg-navy text-white pt-14 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#13A3B5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:underline">Services</Link>
            <span>/</span>
            <span>{service.title}</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal/20 text-teal border border-teal/30 mb-6">
              {service.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-light leading-relaxed mb-8">
              {service.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Book Free Consultation
              </Button>
              <Button
                href={service.relatedCalculator.href}
                variant="outlineLight"
                size="lg"
              >
                {service.relatedCalculator.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* In-Depth Overview & Key Benefits */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal">
                  Comprehensive Guide
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1 mb-4">
                  How {service.title} Work with Apexia Lending
                </h2>
                <p className="text-sm sm:text-base text-slate leading-relaxed">
                  {service.heroSummary}
                </p>
              </div>

              {/* 4 Benefits Cards */}
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-bold text-navy">Key Advantages of Working With Us</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-white border border-border shadow-xs">
                      <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-sm mb-3">
                        ✓
                      </div>
                      <h4 className="text-sm font-bold text-navy mb-1.5">{benefit.title}</h4>
                      <p className="text-xs text-slate leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Who It's For & Calculator Teaser */}
            <div className="lg:col-span-5 space-y-6">
              {/* Who It's For Card */}
              <div className="bg-white rounded-3xl p-8 border border-border shadow-lg space-y-5">
                <h3 className="text-lg font-bold text-navy border-b border-border pb-3">
                  Who Is This Loan Solution For?
                </h3>
                <ul className="space-y-3">
                  {service.whoItsFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-navy">
                      <span className="text-teal font-bold shrink-0 mt-0.5">●</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Calculator Highlight Card */}
              <div className="bg-[#F0FAF9] rounded-3xl p-8 border border-teal/20 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal block">
                  Interactive Calculator
                </span>
                <h4 className="text-lg font-bold text-navy">
                  {service.relatedCalculator.title}
                </h4>
                <p className="text-xs text-slate leading-relaxed">
                  {service.relatedCalculator.description}
                </p>
                <Link
                  href={service.relatedCalculator.href}
                  className="inline-flex items-center gap-2 font-bold text-xs text-teal hover:underline"
                >
                  <span>{service.relatedCalculator.buttonText}</span>
                </Link>
              </div>

              {/* Zero Fee Callout */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 mb-1">
                  <span>●</span>
                  <span>100% Free Mortgage Brokerage</span>
                </div>
                <p className="text-xs text-slate leading-relaxed">
                  Australian lenders pay our fee upon loan settlement. You receive professional, unbiased credit advice governed by the Best Interests Duty with zero out-of-pocket broker costs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="py-16 sm:py-20 bg-white border-y border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Application Roadmap"
            title={`Your Path to ${service.title}`}
            subtitle="Here is what you can expect when applying through our 50+ lender network."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {service.processSteps.map((step) => (
              <div key={step.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-2xl font-extrabold text-teal block mb-2">{step.step}</span>
                <h4 className="text-sm font-bold text-navy mb-1.5">{step.title}</h4>
                <p className="text-xs text-slate leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan-Specific FAQs */}
      <section className="py-16 sm:py-20 bg-light-bg">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <SectionHeading
            eyebrow="Common Inquiries"
            title={`Frequently Asked Questions About ${service.title}`}
            subtitle="Clear answers to help you make informed borrowing decisions."
          />

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-border shadow-xs">
                <h4 className="text-sm sm:text-base font-bold text-navy mb-2">
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-slate leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Explore {service.title}?
          </h2>
          <p className="text-sm sm:text-base text-slate-light leading-relaxed">
            Speak with our accredited broker today. We will assess your eligibility and present the top loan options tailored to your profile.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
