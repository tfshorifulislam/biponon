import type { Metadata } from "next";
import { PrivacyView } from "@/components/privacy/privacyView";

export const metadata: Metadata = {
  title: "Privacy Policy — Biponon",
  description:
    "Learn how Biponon collects, uses, stores, and protects personal and business information for merchants, store shoppers, and platform visitors.",
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
