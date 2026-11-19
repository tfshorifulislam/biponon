import HeroSection from "@/components/banner/hero";
import { StatsSection } from "@/components/banner/statsSection";
import { FeaturesSection } from "@/components/features/featuresSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </>
  );
}
