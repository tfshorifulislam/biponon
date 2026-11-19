"use client";

import { Sparkles, PackagePlus, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n/languageContext";

export function HowItWorksSection() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Sparkles,
      number: t("howItWorks.steps.step1.number"),
      title: t("howItWorks.steps.step1.title"),
      description: t("howItWorks.steps.step1.description"),
    },
    {
      icon: PackagePlus,
      number: t("howItWorks.steps.step2.number"),
      title: t("howItWorks.steps.step2.title"),
      description: t("howItWorks.steps.step2.description"),
    },
    {
      icon: TrendingUp,
      number: t("howItWorks.steps.step3.number"),
      title: t("howItWorks.steps.step3.title"),
      description: t("howItWorks.steps.step3.description"),
    },
  ];

  return (
    <section className="relative w-full border-y border-border/60 bg-muted/20 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
            {t("howItWorks.badge")}
          </span>
          <h2 className="section-heading mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("howItWorks.title")}
          </h2>
          <p className="section-description mt-4 text-base sm:text-lg">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-start rounded-2xl border border-border/60 bg-card p-8 shadow-sm backdrop-blur dark:border-white/10 dark:bg-card/60"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <span className="font-heading text-2xl font-bold text-muted-foreground/40">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading mt-6 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
