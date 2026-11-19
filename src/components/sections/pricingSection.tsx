"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/languageContext";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const { t } = useLanguage();

  const starterFeatures = [
    t("pricing.plans.starter.features.0"),
    t("pricing.plans.starter.features.1"),
    t("pricing.plans.starter.features.2"),
    t("pricing.plans.starter.features.3"),
    t("pricing.plans.starter.features.4"),
  ];

  const growthFeatures = [
    t("pricing.plans.growth.features.0"),
    t("pricing.plans.growth.features.1"),
    t("pricing.plans.growth.features.2"),
    t("pricing.plans.growth.features.3"),
    t("pricing.plans.growth.features.4"),
    t("pricing.plans.growth.features.5"),
  ];

  const enterpriseFeatures = [
    t("pricing.plans.enterprise.features.0"),
    t("pricing.plans.enterprise.features.1"),
    t("pricing.plans.enterprise.features.2"),
    t("pricing.plans.enterprise.features.3"),
    t("pricing.plans.enterprise.features.4"),
  ];

  const plans = [
    {
      name: t("pricing.plans.starter.name"),
      price: t("pricing.plans.starter.price"),
      period: t("pricing.plans.starter.period"),
      description: t("pricing.plans.starter.description"),
      cta: t("pricing.plans.starter.cta"),
      popular: false,
      features: starterFeatures,
      href: "/create-website",
    },
    {
      name: t("pricing.plans.growth.name"),
      price: t("pricing.plans.growth.price"),
      period: t("pricing.plans.growth.period"),
      description: t("pricing.plans.growth.description"),
      cta: t("pricing.plans.growth.cta"),
      popular: true,
      features: growthFeatures,
      href: "/create-website",
    },
    {
      name: t("pricing.plans.enterprise.name"),
      price: t("pricing.plans.enterprise.price"),
      period: t("pricing.plans.enterprise.period"),
      description: t("pricing.plans.enterprise.description"),
      cta: t("pricing.plans.enterprise.cta"),
      popular: false,
      features: enterpriseFeatures,
      href: "/create-website",
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
            {t("pricing.badge")}
          </span>
          <h2 className="section-heading mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("pricing.title")}
          </h2>
          <p className="section-description mt-4 text-base sm:text-lg">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "relative flex flex-col justify-between rounded-3xl border p-8 shadow-sm transition-all duration-200",
                plan.popular
                  ? "border-primary/60 bg-card shadow-lg ring-2 ring-primary/20 dark:border-primary/50"
                  : "border-border/70 bg-card/60 dark:border-white/10"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                  {t("pricing.plans.growth.popular")}
                </span>
              )}

              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-xs sm:text-sm">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                        <Check className="size-3" />
                      </span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  size="lg"
                  className={cn(
                    "w-full rounded-xl transition-all",
                    plan.popular
                      ? "bg-primary text-primary-foreground shadow-md hover:brightness-105"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  )}
                  nativeButton={false}
                  render={<Link href={plan.href} />}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
