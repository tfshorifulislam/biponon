import HeroSection from "@/components/banner/hero";
import { StatsSection } from "@/components/banner/statsSection";
import { FeaturesSection } from "@/components/features/featuresSection";
import { HowItWorksSection } from "@/components/how-it-works/howItWorksSection";
import { StoreBuilderSection } from "@/components/store-builder/storeBuilderSection";
import { TemplatesSection } from "@/components/templates/templatesSection";
import { PricingSection } from "@/components/pricing/pricingSection";
import { TestimonialsSection } from "@/components/testimonials/testimonialsSection";
import { FaqSection } from "@/components/faq/faqSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StoreBuilderSection />
      <TemplatesSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
