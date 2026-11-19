"use client";

import {
  LayoutTemplate,
  CreditCard,
  Boxes,
  Truck,
  Percent,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/languageContext";

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: LayoutTemplate,
      title: t("features.items.storeBuilder.title"),
      description: t("features.items.storeBuilder.description"),
    },
    {
      icon: CreditCard,
      title: t("features.items.payments.title"),
      description: t("features.items.payments.description"),
    },
    {
      icon: Boxes,
      title: t("features.items.inventory.title"),
      description: t("features.items.inventory.description"),
    },
    {
      icon: Truck,
      title: t("features.items.courier.title"),
      description: t("features.items.courier.description"),
    },
    {
      icon: Percent,
      title: t("features.items.marketing.title"),
      description: t("features.items.marketing.description"),
    },
    {
      icon: BarChart3,
      title: t("features.items.analytics.title"),
      description: t("features.items.analytics.description"),
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
            {t("features.badge")}
          </span>
          <h2 className="section-heading mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("features.title")}
          </h2>
          <p className="section-description mt-4 text-base sm:text-lg">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md dark:border-white/10 dark:bg-card/60"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-heading mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
