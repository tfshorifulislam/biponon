"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/languageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users,
} from "lucide-react";

type BillingCycle = "monthly" | "halfYearly" | "yearly";

interface PlanTier {
  id: "standard" | "medium" | "premium";
  nameKey: string;
  descKey: string;
  fallbackName: string;
  fallbackDesc: string;
  isRecommended?: boolean;
  visitorFeatureKey?: string;
  fallbackVisitorFeature?: string;
  prices: {
    monthly: {
      amount: number;
      periodKey: string;
      fallbackPeriod: string;
      subtextKey?: string;
      fallbackSubtext: string;
    };
    halfYearly: {
      amount: number;
      periodKey: string;
      fallbackPeriod: string;
      subtextKey?: string;
      fallbackSubtext: string;
    };
    yearly: {
      amount: number;
      periodKey: string;
      fallbackPeriod: string;
      subtextKey?: string;
      fallbackSubtext: string;
    };
  };
}

function toBanglaDigits(num: number | string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

const STANDARD_FEATURES = [
  "Custom Domain",
  "Premium Templates",
  "Product Management",
  "Order Management",
  "Fraud Checker",
  "Cash on Delivery (COD)",
  "Payment Gateway",
  "Courier Integration",
  "Analytics Dashboard",
  "Facebook Pixel",
  "Pixel & Tracking",
  "24/7 Support",
  "Chat System",
];

const PLAN_TIERS: PlanTier[] = [
  {
    id: "standard",
    nameKey: "pricing.plans.standard.name",
    descKey: "pricing.plans.standard.desc",
    fallbackName: "Standard",
    fallbackDesc: "For vendors ready to scale.",
    prices: {
      monthly: {
        amount: 70,
        periodKey: "pricing.period30Days",
        fallbackPeriod: "/ 30 days",
        fallbackSubtext: "Billed every 30 days",
      },
      halfYearly: {
        amount: 380,
        periodKey: "pricing.period6Months",
        fallbackPeriod: "/ 6 months",
        fallbackSubtext: "৳63 / mo • Billed every 6 months",
      },
      yearly: {
        amount: 670,
        periodKey: "pricing.periodYearly",
        fallbackPeriod: "/ year",
        fallbackSubtext: "৳56 / mo • Billed annually",
      },
    },
  },
  {
    id: "medium",
    nameKey: "pricing.plans.medium.name",
    descKey: "pricing.plans.medium.desc",
    fallbackName: "Medium",
    fallbackDesc: "For growing businesses that need more power.",
    isRecommended: true,
    visitorFeatureKey: "pricing.plans.medium.visitorFeature",
    fallbackVisitorFeature: "Up to 500K Visitors",
    prices: {
      monthly: {
        amount: 150,
        periodKey: "pricing.period30Days",
        fallbackPeriod: "/ 30 days",
        fallbackSubtext: "Billed every 30 days",
      },
      halfYearly: {
        amount: 810,
        periodKey: "pricing.period6Months",
        fallbackPeriod: "/ 6 months",
        fallbackSubtext: "৳135 / mo • Billed every 6 months",
      },
      yearly: {
        amount: 1440,
        periodKey: "pricing.periodYearly",
        fallbackPeriod: "/ year",
        fallbackSubtext: "৳120 / mo • Billed annually",
      },
    },
  },
  {
    id: "premium",
    nameKey: "pricing.plans.premium.name",
    descKey: "pricing.plans.premium.desc",
    fallbackName: "Premium",
    fallbackDesc: "For high-volume businesses.",
    visitorFeatureKey: "pricing.plans.premium.visitorFeature",
    fallbackVisitorFeature: "Up to 1M Visitors",
    prices: {
      monthly: {
        amount: 200,
        periodKey: "pricing.period30Days",
        fallbackPeriod: "/ 30 days",
        fallbackSubtext: "Billed every 30 days",
      },
      halfYearly: {
        amount: 1080,
        periodKey: "pricing.period6Months",
        fallbackPeriod: "/ 6 months",
        fallbackSubtext: "৳180 / mo • Billed every 6 months",
      },
      yearly: {
        amount: 1920,
        periodKey: "pricing.periodYearly",
        fallbackPeriod: "/ year",
        fallbackSubtext: "৳160 / mo • Billed annually",
      },
    },
  },
];

export function PricingSection() {
  const { t, language } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <section
      id="pricing"
      aria-label="Pricing plans and subscription options"
      className="relative isolate w-full px-4 pt-0 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading - Exact Features Section Design System */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-xs backdrop-blur-sm dark:border-primary/25 dark:bg-primary/15">
            <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary animate-pulse" />
            {t("pricing.badge")}
          </span>

          <h2 className="font-heading mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="block">{t("pricing.headingLine1")}</span>
            <span className="brand-gradient-text inline">
              {t("pricing.headingGradient")}
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
            {t("pricing.description")}
          </p>

          {/* Compact Free Trial Banner */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs sm:text-sm text-foreground shadow-2xs backdrop-blur-sm dark:border-primary/30 dark:bg-primary/15">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-xs [background-image:var(--brand-gradient)]">
                <Clock className="size-3" />
                {t("pricing.trialBadge") || "3-day Free Trial"}
              </span>
              <span className="text-xs sm:text-sm font-medium text-foreground/90">
                {t("pricing.trialText") || "Start selling with full access before choosing a plan."}
              </span>
            </div>
          </div>

          {/* Billing Selector (Segmented Control) */}
          <div className="mt-8 flex justify-center">
            <div
              role="tablist"
              aria-label="Billing cycle selection"
              className="inline-flex items-center rounded-2xl border border-border/80 bg-muted/60 p-1.5 shadow-2xs dark:border-white/10 dark:bg-card/80"
            >
              <button
                type="button"
                role="tab"
                aria-selected={billingCycle === "monthly"}
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 outline-none select-none",
                  billingCycle === "monthly"
                    ? "bg-card text-foreground shadow-xs border border-border/80 font-bold dark:border-white/15 dark:bg-card"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{t("pricing.billing.monthly") || "Monthly"}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={billingCycle === "halfYearly"}
                onClick={() => setBillingCycle("halfYearly")}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 outline-none select-none",
                  billingCycle === "halfYearly"
                    ? "bg-card text-foreground shadow-xs border border-border/80 font-bold dark:border-white/15 dark:bg-card"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{t("pricing.billing.halfYearly") || "6 Months"}</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {t("pricing.billing.save10") || "Save 10%"}
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={billingCycle === "yearly"}
                onClick={() => setBillingCycle("yearly")}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 outline-none select-none",
                  billingCycle === "yearly"
                    ? "bg-card text-foreground shadow-xs border border-border/80 font-bold dark:border-white/15 dark:bg-card"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{t("pricing.billing.yearly") || "Yearly"}</span>
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {t("pricing.billing.save20") || "Save 20%"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLAN_TIERS.map((tier) => {
            const priceConfig = tier.prices[billingCycle];
            const rawAmount = priceConfig.amount;
            const formattedAmount =
              language === "bn"
                ? toBanglaDigits(rawAmount)
                : rawAmount.toLocaleString("en-US");

            const planName = t(tier.nameKey) || tier.fallbackName;
            const planDesc = t(tier.descKey) || tier.fallbackDesc;
            const periodLabel = t(priceConfig.periodKey) || priceConfig.fallbackPeriod;
            const subtext = priceConfig.fallbackSubtext;

            const visitorFeature = tier.visitorFeatureKey
              ? t(tier.visitorFeatureKey) || tier.fallbackVisitorFeature
              : null;

            return (
              <Card
                key={tier.id}
                className={cn(
                  "relative flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl transition-all duration-300",
                  tier.isRecommended
                    ? "border-primary/60 bg-card shadow-lg ring-1 ring-primary/25 dark:border-primary/50 dark:bg-card/90"
                    : "border-border/80 bg-card shadow-xs hover:shadow-md hover:border-primary/30 dark:border-white/10 dark:bg-card/75"
                )}
              >
                {/* Subtle Recommended Badge on Medium Card */}
                {tier.isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-xs [background-image:var(--brand-gradient)]">
                      <CheckCircle2 className="size-3" />
                      {t("pricing.recommended") || "Most Popular"}
                    </span>
                  </div>
                )}

                {/* Card Top: Name, Description & Price */}
                <CardHeader className="p-6 sm:p-7 pb-5 border-b border-border/60">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                      {planName}
                    </CardTitle>
                    {tier.isRecommended && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                        Recommended
                      </span>
                    )}
                  </div>

                  <CardDescription className="mt-1 text-xs sm:text-[13px] leading-relaxed text-muted-foreground min-h-[38px]">
                    {planDesc}
                  </CardDescription>

                  {/* Price Block */}
                  <div className="mt-4 pt-3 border-t border-border/50">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm sm:text-base font-bold text-foreground">
                        ৳
                      </span>
                      <span className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                        {formattedAmount}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                        {periodLabel}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                      {subtext}
                    </p>
                  </div>
                </CardHeader>

                {/* Card Body: Features Checklist */}
                <CardContent className="p-6 sm:p-7 flex-1 flex flex-col gap-4">
                  {/* Highlighted Extra Feature for Medium / Premium */}
                  {visitorFeature && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-bold text-primary shadow-2xs dark:border-primary/35 dark:bg-primary/15">
                      <div className="grid size-5 place-items-center rounded-md bg-primary text-white shadow-2xs [background-image:var(--brand-gradient)]">
                        <Users className="size-3" />
                      </div>
                      <span>{visitorFeature}</span>
                    </div>
                  )}

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 text-xs sm:text-[13px]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      {tier.isRecommended ? "Everything in Standard, plus:" : "Included with this plan:"}
                    </p>
                    <ul className="space-y-2">
                      {STANDARD_FEATURES.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2.5 text-foreground/90 font-medium"
                        >
                          <div className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                            <Check className="size-2.5 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                {/* Card Footer: CTA Button */}
                <CardFooter className="p-6 sm:p-7 pt-2 flex flex-col gap-2 border-t border-border/50">
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={<Link href="/create-website" />}
                    className={cn(
                      "w-full h-11 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all duration-200",
                      tier.isRecommended
                        ? "bg-primary text-white shadow-xs [background-image:var(--brand-gradient)] hover:brightness-105"
                        : "border border-border/80 bg-background text-foreground hover:bg-muted dark:border-white/15 hover:border-primary/40"
                    )}
                  >
                    <span>{t("pricing.cta") || "Start Free Trial"}</span>
                    <ArrowRight className="size-4 ml-1.5" />
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                    <ShieldCheck className="size-3 text-emerald-600 dark:text-emerald-400" />
                    <span>No credit card required • Instant setup</span>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
