"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/lib/i18n/languageContext";
import { getTermsPolicyData } from "@/lib/terms/termsData";
import { TermsHeader } from "./termsHeader";
import { TermsToc } from "./termsToc";
import { TermsContent } from "./termsContent";
import { BackToTop } from "@/components/privacy/backToTop";

export function TermsView() {
  const { language } = useLanguage();
  const isBn = language === "bn";

  const data = useMemo(() => {
    return getTermsPolicyData(language);
  }, [language]);

  return (
    <div className="w-full min-h-screen bg-background">
      <TermsHeader data={data} isBn={isBn} />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-14 items-start">
          <TermsToc
            sections={data.sections}
            tocTitle={data.tocTitle}
            backToTopLabel={data.backToTopLabel}
            isBn={isBn}
          />

          <TermsContent data={data} isBn={isBn} />
        </div>
      </main>

      <BackToTop label={data.backToTopLabel} />
    </div>
  );
}
