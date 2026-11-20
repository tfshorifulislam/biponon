"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/lib/i18n/languageContext";
import { getRefundPolicyData } from "@/lib/refund/refundData";
import { RefundHeader } from "./refundHeader";
import { RefundToc } from "./refundToc";
import { RefundContent } from "./refundContent";
import { BackToTop } from "@/components/privacy/backToTop";

export function RefundView() {
  const { language } = useLanguage();
  const isBn = language === "bn";

  const data = useMemo(() => {
    return getRefundPolicyData(language);
  }, [language]);

  return (
    <div className="w-full min-h-screen bg-background">
      <RefundHeader data={data} isBn={isBn} />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-14 items-start">
          <RefundToc
            sections={data.sections}
            tocTitle={data.tocTitle}
            backToTopLabel={data.backToTopLabel}
            isBn={isBn}
          />

          <RefundContent data={data} isBn={isBn} />
        </div>
      </main>

      <BackToTop label={data.backToTopLabel} />
    </div>
  );
}
