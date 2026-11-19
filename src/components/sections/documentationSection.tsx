"use client";

import { BookOpen, Globe2, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/languageContext";

export function DocumentationSection() {
  const { t } = useLanguage();

  const guides = [
    {
      icon: BookOpen,
      title: t("documentation.categories.quickStart.title"),
      description: t("documentation.categories.quickStart.description"),
    },
    {
      icon: Globe2,
      title: t("documentation.categories.domains.title"),
      description: t("documentation.categories.domains.description"),
    },
    {
      icon: ShieldCheck,
      title: t("documentation.categories.payments.title"),
      description: t("documentation.categories.payments.description"),
    },
    {
      icon: Truck,
      title: t("documentation.categories.shipping.title"),
      description: t("documentation.categories.shipping.description"),
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
            {t("documentation.badge")}
          </span>
          <h2 className="section-heading mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("documentation.title")}
          </h2>
          <p className="section-description mt-4 text-base sm:text-lg">
            {t("documentation.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {guides.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border/70 bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md dark:border-white/10 dark:bg-card/60"
              >
                <div className="flex items-center gap-4">
                  <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {guide.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {guide.description}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline">
                  <span>{t("common.learnMore")}</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
