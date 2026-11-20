import type { Metadata } from "next";
import { TermsView } from "@/components/terms/termsView";

export const metadata: Metadata = {
  title: "Terms of Service — Biponon",
  description:
    "Read the Terms of Service for Biponon — the e-commerce platform for Bangladeshi merchants and entrepreneurs. Learn about merchant responsibilities, subscriptions, payment terms, and platform rules.",
};

export default function TermsPage() {
  return <TermsView />;
}
