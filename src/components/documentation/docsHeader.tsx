"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/languageContext";
import {
  Search,
  Rocket,
  Package,
  Palette,
  ArrowRight,
  Command,
} from "lucide-react";

interface DocsHeaderProps {
  onOpenSearch: () => void;
  onSelectArticle: (articleId: string) => void;
}

export function DocsHeader({
  onOpenSearch,
  onSelectArticle,
}: DocsHeaderProps) {
  const { language } = useLanguage();

  const isBn = language === "bn";

  const quickStartCards = [
    {
      id: "creating-first-store",
      title: isBn ? "শুরুর নির্দেশিকা" : "Getting Started",
      description: isBn
        ? "অ্যাকাউন্ট তৈরি করুন ও প্রথম অনলাইন স্টোর চালু করুন।"
        : "Create your account and launch your first store.",
      icon: Rocket,
      badge: isBn ? "পদক্ষেপ ০১" : "Step 01",
    },
    {
      id: "adding-first-product",
      title: isBn ? "পণ্য ও অর্ডার পরিচালনা" : "Store Management",
      description: isBn
        ? "পণ্য আপলোড, স্টক আপডেট ও কাস্টমার অর্ডার হ্যান্ডেল করুন।"
        : "Learn how to manage products, orders, and customers.",
      icon: Package,
      badge: isBn ? "পদক্ষেপ ০২" : "Step 02",
    },
    {
      id: "customizing-storefront",
      title: isBn ? "স্টোর কাস্টমাইজেশন" : "Store Customization",
      description: isBn
        ? "পছন্দের টেমপ্লেট বেছে নিজের ব্র্যান্ড আইডেন্টিটি সাজিয়ে তুলুন।"
        : "Customize your storefront and build your brand identity.",
      icon: Palette,
      badge: isBn ? "পদক্ষেপ ০৩" : "Step 03",
    },
  ];

  return (
    <div className="relative isolate w-full border-b border-border/60 bg-muted/20 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-16 lg:pt-36 dark:border-white/10 dark:bg-card/30">
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,151,107,0.12),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-xs backdrop-blur-sm dark:border-primary/25 dark:bg-primary/15">
            <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary animate-pulse" />
            {isBn ? "ডকুমেন্টেশন ও সহায়িকা" : "DOCUMENTATION"}
          </span>

          {/* Heading */}
          <h1 className="font-heading mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="block">
              {isBn
                ? "আপনার অনলাইন স্টোর তৈরির"
                : "Everything You Need to Build"}
            </span>
            <span className="brand-gradient-text inline">
              {isBn ? "যাবতীয় নির্দেশিকা ও গাইড" : "Your Online Store"}
            </span>
          </h1>

          {/* Description */}
          <p
            className={`mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed ${
              isBn ? "font-bangla" : ""
            }`}
          >
            {isBn
              ? "সহজ ও বিস্তারিত নির্দেশিকা অনুসরণ করে Biponon-এ নিজের অনলাইন স্টোর তৈরি, কাস্টমাইজ, লঞ্চ ও পরিচালনা করার সব উপায় জানুন।"
              : "Learn how to create, customize, launch, and manage your online store with Biponon through simple step-by-step guides."}
          </p>

          {/* Search Trigger Bar */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onOpenSearch}
              className="group flex h-12 w-full max-w-xl items-center justify-between rounded-2xl border border-border/80 bg-card/90 px-4 text-sm text-muted-foreground shadow-xs backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card hover:shadow-md dark:border-white/10 dark:bg-card/70 dark:hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <Search className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                <span
                  className={`text-sm text-muted-foreground/80 group-hover:text-foreground ${
                    isBn ? "font-bangla" : ""
                  }`}
                >
                  {isBn
                    ? "ডকুমেন্টেশন গাইড খুঁজুন (যেমন: ডোমেন, বিকাশ, ক্যাটালগ)..."
                    : "Search documentation (e.g., custom domain, bKash, orders)..."}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 rounded-md border border-border/70 bg-muted/60 px-2 py-1 text-[11px] font-mono text-muted-foreground group-hover:border-primary/30 group-hover:text-primary">
                <Command className="size-3" />
                <span>K</span>
              </div>
            </button>
          </div>
        </div>

        {/* 3 Quick-Start Cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {quickStartCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onSelectArticle(card.id)}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card/75 p-5 sm:p-6 text-left shadow-xs backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg dark:border-white/10 dark:bg-card/50 dark:hover:border-primary/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:bg-primary/15">
                      <Icon className="size-5" />
                    </div>
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      {card.badge}
                    </span>
                  </div>

                  <h3
                    className={`font-heading mt-4 text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors ${
                      isBn ? "font-bangla" : ""
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground ${
                      isBn ? "font-bangla" : ""
                    }`}
                  >
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                  <span>{isBn ? "গাইড পড়ুন" : "Read guide"}</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
