import { PricingSection } from "@/components/sections/pricingSection";

export const metadata = {
  title: "Pricing — Biponon",
  description: "Transparent pricing plans for every stage of your e-commerce business.",
};

export default function PricingPage() {
  return (
    <div className="pt-16 sm:pt-20">
      <PricingSection />
    </div>
  );
}
