"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/languageContext";
import { BrandLogo } from "@/components/navbar/brandLogo";

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer
      aria-label="Site footer"
      className="w-full border-t border-border/60 bg-background text-foreground dark:border-white/10"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3 md:gap-6">
          {/* 1. Left — Brand Logo */}
          <div className="flex items-center justify-center md:justify-start">
            <BrandLogo />
          </div>

          {/* 2. Center — Copyright Notice */}
          <div className="text-center">
            <p
              className={`text-xs sm:text-sm text-muted-foreground ${
                language === "bn" ? "font-bangla" : ""
              }`}
            >
              {t("footer.copyright") || "© 2026 Biponon. All rights reserved."}
            </p>
          </div>

          {/* 3. Right — Legal Links */}
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:justify-end text-xs sm:text-sm text-muted-foreground"
          >
            <Link
              href="/privacy"
              className={`transition-colors duration-200 hover:text-primary ${
                language === "bn" ? "font-bangla" : ""
              }`}
            >
              {t("footer.privacy") || "Privacy Policy"}
            </Link>
            <Link
              href="/terms"
              className={`transition-colors duration-200 hover:text-primary ${
                language === "bn" ? "font-bangla" : ""
              }`}
            >
              {t("footer.terms") || "Terms of Service"}
            </Link>
            <Link
              href="/refund"
              className={`transition-colors duration-200 hover:text-primary ${
                language === "bn" ? "font-bangla" : ""
              }`}
            >
              {t("footer.refund") || "Refund Policy"}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
