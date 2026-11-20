"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/lib/i18n/languageContext";
import { getPrivacyPolicyData } from "@/lib/privacy/privacyData";
import { PrivacyHeader } from "./privacyHeader";
import { PrivacyToc } from "./privacyToc";
import { PrivacyContent } from "./privacyContent";
import { BackToTop } from "./backToTop";

export function PrivacyView() {
  const { language } = useLanguage();
  const isBn = language === "bn";

  const data = useMemo(() => {
    return getPrivacyPolicyData(language);
  }, [language]);

  return (
    <div className="w-full min-h-screen bg-background">
      <PrivacyHeader data={data} isBn={isBn} />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-14 items-start">
          <PrivacyToc
            sections={data.sections}
            tocTitle={data.tocTitle}
            backToTopLabel={data.backToTopLabel}
            isBn={isBn}
          />

          <PrivacyContent data={data} isBn={isBn} />
        </div>
      </main>

      <BackToTop label={data.backToTopLabel} />
    </div>
  );
}
