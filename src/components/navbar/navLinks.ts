export interface NavLinkItem {
  key: string;
  label: string;
  href: string;
  sectionId?: string;
}

export const HOMEPAGE_SECTION_IDS = [
  "hero",
  "features",
  "how-it-works",
  "store-builder",
  "templates",
  "pricing",
  "faq",
] as const;

export const navLinks: readonly NavLinkItem[] = [
  { key: "nav.home", label: "Home", href: "/", sectionId: "hero" },
  { key: "nav.features", label: "Features", href: "/#features", sectionId: "features" },
  { key: "nav.howItWorks", label: "Process", href: "/#how-it-works", sectionId: "how-it-works" },
  { key: "nav.storeBuilder", label: "Builder", href: "/#store-builder", sectionId: "store-builder" },
  { key: "nav.templates", label: "Designs", href: "/#templates", sectionId: "templates" },
  { key: "nav.pricing", label: "Pricing", href: "/#pricing", sectionId: "pricing" },
  { key: "nav.documentation", label: "Docs", href: "/documentation" },
] as const;
