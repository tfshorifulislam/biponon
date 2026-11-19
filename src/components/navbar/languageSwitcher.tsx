"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/languageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useLanguage();

  // In English, display 'BN' as the switch action to switch to Bangla.
  // In Bangla, display 'EN' as the switch action to switch to English.
  const displayAction = language === "en" ? "BN" : "EN";
  const ariaLabel =
    language === "en"
      ? "Switch website language to Bangla"
      : "Switch website language to English";

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-primary/20 bg-primary/10 p-0.5 sm:p-1 transition-all duration-200 hover:border-primary/35 hover:bg-primary/15 dark:border-primary/25 dark:bg-primary/15 dark:hover:border-primary/40",
        className
      )}
    >
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={ariaLabel}
        title={ariaLabel}
        className="flex h-5 items-center justify-center rounded-full px-1 text-xs font-bold text-primary transition-all duration-200 "
      >
        {/* <Globe className="size-3.5 shrink-0 opacity-80" aria-hidden="true" /> */}
        <span>{displayAction}</span>
      </button>
    </div>
  );
}
