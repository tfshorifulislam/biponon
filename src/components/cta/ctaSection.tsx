"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/languageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CtaSection() {
  const { t, language } = useLanguage();

  const handleScrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById("pricing");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="cta"
      aria-label="Call to action — Start your online store"
      className="relative isolate w-full px-4 pt-0 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Prominent Brand-Green Gradient Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-[#006648] via-[#00976B] to-[#00BB7D] p-8 shadow-xl sm:p-12 lg:p-16 lg:shadow-2xl">
          {/* Subtle Background Radial Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-[#00402c]/40 blur-2xl"
          />

          {/* Decorative Subtle Geometric Rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 size-80 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-104 rounded-full border border-white/5"
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-12">
            {/* Left Content Column */}
            <div className="max-w-2xl">
              {/* Eyebrow Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-xs backdrop-blur-md">
                <span className="size-1.5 shrink-0 rounded-full bg-white animate-pulse" />
                <span className={language === "bn" ? "font-bangla" : ""}>
                  {t("cta.eyebrow") || "READY TO GROW YOUR BUSINESS?"}
                </span>
              </span>

              {/* Main Heading */}
              <h2
                className={`font-heading mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.15] ${
                  language === "bn" ? "font-bangla" : ""
                }`}
              >
                {t("cta.heading") || "Your Online Store Starts Here."}
              </h2>

              {/* Supporting Description */}
              <p
                className={`mt-4 text-base sm:text-lg leading-relaxed text-white/90 ${
                  language === "bn" ? "font-bangla" : ""
                }`}
              >
                {t("cta.description") ||
                  "Stop managing everything manually. Build your own online store, manage your business in one place, and start growing with Biponon."}
              </p>
            </div>

            {/* Right Action Column */}
            <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:items-start lg:items-end">
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                {/* Primary CTA: Start Free Trial */}
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/create-website" />}
                  className="h-12 w-full rounded-xl bg-white px-6 font-bold text-[#007a57] shadow-lg transition-all duration-200 hover:bg-white/95 hover:text-[#006648] hover:shadow-xl sm:w-auto text-base"
                >
                  <span className={language === "bn" ? "font-bangla" : ""}>
                    {t("cta.primaryButton") || "Start Your Free Trial"}
                  </span>
                  <ArrowRight className="size-4" />
                </Button>

                {/* Secondary CTA: Explore Pricing */}
                <Button
                  size="lg"
                  variant="outline"
                  nativeButton={false}
                  render={
                    <Link
                      href="#pricing"
                      onClick={handleScrollToPricing}
                    />
                  }
                  className="h-12 w-full rounded-xl border-white/30 bg-white/10 px-6 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:text-white sm:w-auto text-base"
                >
                  <span className={language === "bn" ? "font-bangla" : ""}>
                    {t("cta.secondaryButton") || "Explore Pricing"}
                  </span>
                </Button>
              </div>

              {/* Supporting Reassurance Text */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/85">
                <CheckCircle2 className="size-4 text-white shrink-0" />
                <span className={language === "bn" ? "font-bangla" : ""}>
                  {t("cta.supportingText") ||
                    "3-day free trial. No coding required."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
