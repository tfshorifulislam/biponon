import { FeaturesSection } from "@/components/sections/featuresSection";

export const metadata = {
  title: "Features — Biponon",
  description: "Explore all powerful features Biponon provides to scale your store.",
};

export default function FeaturesPage() {
  return (
    <div className="pt-16 sm:pt-20">
      <FeaturesSection />
    </div>
  );
}
