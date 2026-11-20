"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Calendar, RefreshCw, Globe2 } from "lucide-react";
import { PrivacyPolicyData } from "@/lib/privacy/privacyData";

interface PrivacyHeaderProps {
  data: PrivacyPolicyData;
  isBn: boolean;
}

export function PrivacyHeader({ data, isBn }: PrivacyHeaderProps) {
  return (
    <div className="relative isolate w-full border-b border-border/60 bg-muted/20 pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-16 lg:pt-32 dark:border-white/10 dark:bg-card/30">
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,151,107,0.12),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
          <Link
            href="/"
            className="transition-colors hover:text-primary font-medium"
          >
            {data.breadcrumbHome}
          </Link>
          <ChevronRight className="size-3.5 text-muted-foreground/60 shrink-0" />
          <span className={`font-semibold text-foreground ${isBn ? "font-bangla" : ""}`}>
            {data.breadcrumbCurrent}
          </span>
        </nav>

        <div className="mt-6 max-w-3xl">
          {/* Eyebrow Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-xs backdrop-blur-sm dark:border-primary/25 dark:bg-primary/15">
            <ShieldCheck className="size-3.5 text-primary" />
            <span>{data.eyebrow}</span>
          </span>

          {/* Heading */}
          <h1 className="font-heading mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span>{data.title} </span>
            <span className="brand-gradient-text inline">{data.titleHighlight}</span>
          </h1>

          {/* Description */}
          <p
            className={`mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed ${
              isBn ? "font-bangla" : ""
            }`}
          >
            {data.description}
          </p>

          {/* Meta Info Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-3.5 py-2 shadow-2xs backdrop-blur-sm dark:border-white/10 dark:bg-card/50">
              <Calendar className="size-4 text-primary shrink-0" />
              <span className="text-muted-foreground">{data.effectiveDateLabel}:</span>
              <span className="font-semibold text-foreground">{data.effectiveDate}</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-3.5 py-2 shadow-2xs backdrop-blur-sm dark:border-white/10 dark:bg-card/50">
              <RefreshCw className="size-4 text-primary shrink-0" />
              <span className="text-muted-foreground">{data.lastUpdatedLabel}:</span>
              <span className="font-semibold text-foreground">{data.lastUpdatedDate}</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-3.5 py-2 shadow-2xs backdrop-blur-sm dark:border-white/10 dark:bg-card/50">
              <Globe2 className="size-4 text-primary shrink-0" />
              <span className="text-muted-foreground">{data.scopeLabel}:</span>
              <span className={`font-semibold text-foreground ${isBn ? "font-bangla" : ""}`}>
                {data.scopeValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
