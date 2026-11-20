import type { Metadata } from "next";
import { RefundView } from "@/components/refund/refundView";

export const metadata: Metadata = {
  title: "Refund Policy — Biponon",
  description:
    "Review Biponon's subscription refund terms, billing dispute procedures, 3-day free trial policy, and merchant cancellation guidelines.",
};

export default function RefundPage() {
  return <RefundView />;
}
