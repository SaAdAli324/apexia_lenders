import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import ContactFormSection from "@/components/sections/ContactFormSection";
import AwardBanner from "@/components/sections/AwardBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <HowItWorks />
      <Testimonials />
      <ContactFormSection />
      <AwardBanner />
    </>
  );
}
