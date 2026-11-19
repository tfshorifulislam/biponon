import HeroSection from "@/components/banner/hero";
import { FeaturesSection } from "@/components/sections/featuresSection";
import { HowItWorksSection } from "@/components/sections/howItWorksSection";
import { PricingSection } from "@/components/sections/pricingSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
    </>
  );
}
