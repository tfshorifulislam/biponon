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
        className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-bold tracking-wider text-primary transition-all duration-200 hover:bg-primary/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:text-primary dark:hover:bg-primary/25"
      >
        <Globe className="size-3.5 shrink-0 opacity-80" aria-hidden="true" />
        <span>{displayAction}</span>
      </button>
    </div>
  );
}
