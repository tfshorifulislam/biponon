"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/languageContext";
import { cn } from "@/lib/utils";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  labelKey: string;
  defaultLabel: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: "vendors",
    target: 64,
    suffix: "+",
    labelKey: "stats.vendors",
    defaultLabel: "Vendors",
  },
  {
    id: "orders",
    target: 34,
    suffix: "+",
    labelKey: "stats.ordersPlaced",
    defaultLabel: "Orders Placed",
  },
  {
    id: "templates",
    target: 55,
    suffix: "",
    labelKey: "stats.templates",
    defaultLabel: "Templates",
  },
  {
    id: "uptime",
    target: 100,
    suffix: "%",
    labelKey: "stats.uptime",
    defaultLabel: "Uptime",
  },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function toBanglaDigits(num: number | string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

export function StatsSection() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);

  // Initial counts start at 0
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          // Check prefers-reduced-motion
          const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          if (prefersReducedMotion) {
            setCounts(STATS_DATA.map((s) => s.target));
            return;
          }

          const duration = 1800; // ~1.8 seconds
          const startTime = performance.now();

          const frame = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);

            setCounts(
              STATS_DATA.map((s) => Math.round(s.target * easedProgress))
            );

            if (progress < 1) {
              requestAnimationFrame(frame);
            } else {
              setCounts(STATS_DATA.map((s) => s.target));
            }
          };

          requestAnimationFrame(frame);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Biponon platform statistics"
      className="relative z-10 w-full px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 -mt-6 sm:-mt-8 lg:-mt-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-3 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.12)] ring-1 ring-black/5 backdrop-blur-xl sm:rounded-3xl sm:p-8 lg:p-10 dark:border-white/10 dark:bg-card/60 dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] dark:ring-white/10">
          {/* Subtle decorative background shimmer */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-20 -top-20 -z-10 h-20 rounded-full opacity-40 blur-3xl dark:opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at center, color-mix(in srgb, var(--brand-secondary) 25%, transparent), transparent 70%)",
            }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS_DATA.map((stat, idx) => {
              const currentVal = counts[idx];
              const displayVal =
                language === "bn"
                  ? toBanglaDigits(currentVal)
                  : String(currentVal);
              const label = t(stat.labelKey);

              return (
                <div
                  key={stat.id}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 text-center sm:p-6",
                    // Mobile 2x2 grid dividers:
                    idx % 2 === 0
                      ? "border-r border-border/60"
                      : "",
                    idx < 2
                      ? "border-b border-border/60 lg:border-b-0"
                      : "",
                    // Desktop dividers:
                    idx < STATS_DATA.length - 1
                      ? "lg:border-r lg:border-border/60"
                      : "lg:border-r-0"
                  )}
                >
                  <div className="flex items-baseline justify-center">
                    <span className="font-heading brand-gradient-text text-3xl font-black tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl">
                      {displayVal}
                      <span className="inline">{stat.suffix}</span>
                    </span>
                  </div>

                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground sm:mt-2 sm:text-sm sm:tracking-wider">
                    {label || stat.defaultLabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
