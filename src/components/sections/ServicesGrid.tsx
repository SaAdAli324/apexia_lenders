import { services } from "@/data/services";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ServicesGrid() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tailored Loan Solutions"
          title="Solutions for every stage of your journey."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-2 xl:gap-6">
          {services.slice(0, 5).map((service) => {
            let svgIcon;
            switch (service.slug) {
              case "first-home-buyer":
                svgIcon = <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
                break;
              case "refinancing":
                svgIcon = <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 15l3 3m0 0l3-3m-3 3v-6" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 9l-3-3m0 0l-3 3m3-3v6" /></svg>;
                break;
              case "debt-consolidation":
                svgIcon = <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 10h16M4 14h16M4 18h16" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 6v12" /></svg>; // Approximate list/consolidation
                break;
              case "investment-property":
                svgIcon = <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3v18h18" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 14l5-5 4 4 5-5" /></svg>;
                break;
              case "construction":
                svgIcon = <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>; // Actually construction in screenshot is %
                break;
              default:
                svgIcon = <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth={1}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 15L15 9M9 9h.01M15 15h.01" /></svg>; // Fallback to % icon
            }

            return (
              <Card
                key={service.slug}
                icon={svgIcon as any}
                title={service.slug === "construction" ? "Fixed & Variable Rates with Offset/Redraw" : service.title}
                description={service.description}
                href={`/services/${service.slug}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
