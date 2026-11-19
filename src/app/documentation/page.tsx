import { DocumentationSection } from "@/components/sections/documentationSection";

export const metadata = {
  title: "Documentation — Biponon",
  description: "Guides, tutorials, and API documentation for Biponon store owners.",
};

export default function DocumentationPage() {
  return (
    <div className="pt-16 sm:pt-20">
      <DocumentationSection />
    </div>
  );
}
