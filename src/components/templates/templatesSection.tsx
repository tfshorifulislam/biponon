"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/languageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lock,
  Monitor,
  Search,
  ShoppingCart,
  Smartphone,
} from "lucide-react";

/**
 * Hook to detect viewport intersection for pausing/resuming animations.
 */
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}

/**
 * Hook to respect user's reduced motion preferences.
 */
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

// ===========================================================================
// AUTO-SCROLL ENGINE COMPONENT
// Smoothly scrolls content from top to bottom, pauses at bottom,
// returns to top, pauses, and repeats continuously.
// Operates independently for every preview instance.
// ===========================================================================
function AutoScrollFrame({
  children,
  isPaused = false,
  className,
  speed = 22, // pixels per second
}: {
  children: React.ReactNode;
  isPaused?: boolean;
  className?: string;
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const stateRef = useRef<"pauseTop" | "scrollingDown" | "pauseBottom" | "scrollingUp">("pauseTop");
  const pauseTimerRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;

    const animate = (time: number) => {
      if (!active) return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const container = containerRef.current;
      const content = contentRef.current;

      if (container && content && !isPaused) {
        const maxScroll = Math.max(0, content.offsetHeight - container.offsetHeight);

        if (maxScroll > 15) {
          switch (stateRef.current) {
            case "pauseTop":
              pauseTimerRef.current += delta;
              if (pauseTimerRef.current >= 1.6) {
                stateRef.current = "scrollingDown";
                pauseTimerRef.current = 0;
              }
              break;

            case "scrollingDown":
              offsetRef.current += speed * delta;
              if (offsetRef.current >= maxScroll) {
                offsetRef.current = maxScroll;
                stateRef.current = "pauseBottom";
                pauseTimerRef.current = 0;
              }
              break;

            case "pauseBottom":
              pauseTimerRef.current += delta;
              if (pauseTimerRef.current >= 1.6) {
                stateRef.current = "scrollingUp";
                pauseTimerRef.current = 0;
              }
              break;

            case "scrollingUp":
              // Smooth return to top
              offsetRef.current -= speed * 1.6 * delta;
              if (offsetRef.current <= 0) {
                offsetRef.current = 0;
                stateRef.current = "pauseTop";
                pauseTimerRef.current = 0;
              }
              break;
          }

          content.style.transform = `translate3d(0, -${offsetRef.current}px, 0)`;
        } else {
          content.style.transform = `translate3d(0, 0, 0)`;
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPaused, speed]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden select-none", className)}
    >
      <div
        ref={contentRef}
        className="w-full will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {children}
      </div>
    </div>
  );
}

// ===========================================================================
// TEMPLATE CONFIGURATION INTERFACE
// ===========================================================================
interface TemplateConfig {
  id: string;
  number: string;
  nameKey: string;
  taglineKey: string;
  descKey: string;
  fallbackName: string;
  fallbackTagline: string;
  fallbackDesc: string;
  subdomain: string;
  badgeType: "available" | "upcoming";
  accentColor: string;
  tags: string[];
  renderDesktop: () => React.ReactNode;
  renderMobile: () => React.ReactNode;
}

// ===========================================================================
// MAIN TEMPLATES SECTION
// ===========================================================================
export function TemplatesSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, 0.1);
  const reducedMotion = useReducedMotion();

  const templates: TemplateConfig[] = [
    {
      id: "natural",
      number: "01",
      nameKey: "templates.items.natural.name",
      taglineKey: "templates.items.natural.tagline",
      descKey: "templates.items.natural.desc",
      fallbackName: "Natural",
      fallbackTagline: "Organic, Apparel & Lifestyle",
      fallbackDesc:
        "Warm earth tones, organic textures, and relaxed typography tailored for sustainable and lifestyle brands.",
      subdomain: "bhoomi.biponon.com",
      badgeType: "available",
      accentColor: "#2D4A3E",
      tags: ["Earth Tones", "Serif Accents", "Organic Certified"],
      renderDesktop: () => <NaturalDesktopPreview />,
      renderMobile: () => <NaturalMobilePreview />,
    },
    {
      id: "sakura",
      number: "02",
      nameKey: "templates.items.sakura.name",
      taglineKey: "templates.items.sakura.tagline",
      descKey: "templates.items.sakura.desc",
      fallbackName: "Sakura",
      fallbackTagline: "Cosmetics, Beauty & Fashion",
      fallbackDesc:
        "Delicate pastels, refined typography, and elegant spacing crafted for beauty, skincare, and boutique stores.",
      subdomain: "aurabotanics.biponon.com",
      badgeType: "available",
      accentColor: "#E11D48",
      tags: ["Pastel Palette", "Boutique Layout", "Glow Aesthetic"],
      renderDesktop: () => <SakuraDesktopPreview />,
      renderMobile: () => <SakuraMobilePreview />,
    },
    {
      id: "minimal",
      number: "03",
      nameKey: "templates.items.minimal.name",
      taglineKey: "templates.items.minimal.tagline",
      descKey: "templates.items.minimal.desc",
      fallbackName: "Minimal",
      fallbackTagline: "Tech, Modern Gear & Audio",
      fallbackDesc:
        "Clean geometric grids, monochrome palette, and sharp contrast designed for electronics and modern essentials.",
      subdomain: "kairo.biponon.com",
      badgeType: "upcoming",
      accentColor: "#0F172A",
      tags: ["Monochrome Slate", "Modular Grid", "High Contrast"],
      renderDesktop: () => <MinimalDesktopPreview />,
      renderMobile: () => <MinimalMobilePreview />,
    },
    {
      id: "bold",
      number: "04",
      nameKey: "templates.items.bold.name",
      taglineKey: "templates.items.bold.tagline",
      descKey: "templates.items.bold.desc",
      fallbackName: "Bold",
      fallbackTagline: "Streetwear, Fashion & Statement",
      fallbackDesc:
        "High-impact typography, dark mode contrasts, and punchy visual blocks built for confident streetwear labels.",
      subdomain: "dhaak.biponon.com",
      badgeType: "upcoming",
      accentColor: "#F59E0B",
      tags: ["Streetwear Drops", "Heavy Condensed", "Cyber Contrast"],
      renderDesktop: () => <BoldDesktopPreview />,
      renderMobile: () => <BoldMobilePreview />,
    },
  ];

  return (
    <section
      id="templates"
      ref={sectionRef}
      aria-label="Store design collection and templates"
      className="relative isolate w-full px-4 pt-0 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading - Exact Features Section Design System */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-xs backdrop-blur-sm dark:border-primary/25 dark:bg-primary/15">
            <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary animate-pulse" />
            {t("templates.badge")}
          </span>

          <h2 className="font-heading mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="block">{t("templates.headingLine1")}</span>
            <span className="brand-gradient-text inline">
              {t("templates.headingGradient")}
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
            {t("templates.description")}
          </p>
        </div>

        {/* Template Collection 2x2 Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {templates.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              isSectionInView={isInView}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// INDIVIDUAL TEMPLATE CARD COMPONENT
// Maintains independent, simultaneous scrolling on both Desktop and Mobile.
// ===========================================================================
function TemplateCard({
  template,
  isSectionInView,
  reducedMotion,
}: {
  template: TemplateConfig;
  isSectionInView: boolean;
  reducedMotion: boolean;
}) {
  const { t } = useLanguage();
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const CYCLE_DURATION = 5000; // 5s per device state

  // Smooth automatic alternating between Desktop and Mobile
  useEffect(() => {
    if (!isSectionInView || reducedMotion || isHovered) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setDevice((prev) => (prev === "desktop" ? "mobile" : "desktop"));
    }, CYCLE_DURATION);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isSectionInView, reducedMotion, isHovered]);

  const handleSelectDevice = useCallback((mode: "desktop" | "mobile") => {
    setDevice(mode);
  }, []);

  const name = t(template.nameKey) || template.fallbackName;
  const tagline = t(template.taglineKey) || template.fallbackTagline;
  const description = t(template.descKey) || template.fallbackDesc;

  // Scrolling pause state: pauses when outside viewport, hovered, or reduced motion requested
  const isScrollPaused = !isSectionInView || reducedMotion || isHovered;

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card text-card-foreground shadow-xs transition-all duration-300 hover:shadow-lg hover:border-primary/30 dark:border-white/10 dark:bg-card/85 flex flex-col justify-between"
    >
      {/* Top Card Header */}
      <CardHeader className="p-5 sm:p-6 pb-4 border-b border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Template Identification & Status */}
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-muted-foreground/80">
              {template.number}
            </span>
            <CardTitle className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              {name}
            </CardTitle>
            {template.badgeType === "available" ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3" />
                {t("templates.availableBadge") || "Available Now"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                {t("templates.upcomingBadge") || "Showcase Preview"}
              </span>
            )}
          </div>

          {/* Interactive Desktop / Mobile Toggle Segment */}
          <div
            role="tablist"
            aria-label="Device preview mode"
            className="flex items-center rounded-lg border border-border/70 bg-muted/50 p-1 text-xs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={device === "desktop"}
              onClick={() => handleSelectDevice("desktop")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all duration-200 outline-none select-none",
                device === "desktop"
                  ? "bg-card text-foreground shadow-2xs border border-border/60 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Monitor className="size-3.5" />
              <span>{t("templates.deviceDesktop") || "Desktop"}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={device === "mobile"}
              onClick={() => handleSelectDevice("mobile")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all duration-200 outline-none select-none",
                device === "mobile"
                  ? "bg-card text-foreground shadow-2xs border border-border/60 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Smartphone className="size-3.5" />
              <span>{t("templates.deviceMobile") || "Mobile"}</span>
            </button>
          </div>
        </div>

        <p className="mt-1 text-xs font-semibold text-primary/90">
          {tagline}
        </p>
        <CardDescription className="mt-1 text-xs sm:text-[13px] leading-relaxed text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      {/* Main Preview Stage Container */}
      <CardContent className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
        <div className="relative w-full h-[340px] sm:h-[350px] rounded-xl sm:rounded-2xl border border-border/70 bg-muted/30 dark:bg-white/5 p-2 sm:p-3 overflow-hidden flex items-center justify-center">
          {/* Subtle Ambient Background Gradient */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 opacity-30 blur-2xl"
            style={{
              background: `radial-gradient(ellipse at center, ${template.accentColor} 20%, transparent 70%)`,
            }}
          />

          {/* Both Desktop & Mobile Mockups are kept actively mounted in the DOM
              so BOTH scroll continuously even when one device mode is hidden */}

          {/* Desktop Preview Frame */}
          <div
            className={cn(
              "relative w-full h-full flex flex-col rounded-xl border border-border/80 bg-background shadow-xs overflow-hidden transition-all duration-300",
              device === "desktop"
                ? "opacity-100 scale-100 pointer-events-auto z-10"
                : "opacity-0 scale-95 pointer-events-none absolute inset-2 z-0"
            )}
          >
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between border-b border-border/60 bg-muted/60 px-3 py-1.5 text-[10px] shrink-0">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2 rounded-full bg-rose-500/70" />
                <span className="size-2 rounded-full bg-amber-500/70" />
                <span className="size-2 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex items-center gap-1 rounded border border-border/60 bg-background/80 px-2 py-0.5 font-mono text-[9px] text-foreground/80">
                <Lock className="size-2.5 text-primary" />
                <span>{template.subdomain}</span>
              </div>
              <span className="text-[9px] font-semibold text-muted-foreground flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Auto-Scrolling
              </span>
            </div>

            {/* Desktop Viewport with Auto-Scroll Engine */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <AutoScrollFrame isPaused={isScrollPaused} speed={24}>
                {template.renderDesktop()}
              </AutoScrollFrame>
            </div>
          </div>

          {/* Mobile Preview Frame (Realistic Smartphone Mockup) */}
          <div
            className={cn(
              "relative w-[210px] sm:w-[225px] h-full flex flex-col rounded-[24px] border-[3px] border-border/90 bg-background shadow-md overflow-hidden transition-all duration-300",
              device === "mobile"
                ? "opacity-100 scale-100 pointer-events-auto z-10"
                : "opacity-0 scale-95 pointer-events-none absolute z-0"
            )}
          >
            {/* Mobile Dynamic Island / Speaker */}
            <div className="relative pt-1.5 pb-1 px-3 flex items-center justify-between text-[8px] font-bold text-muted-foreground bg-muted/30 border-b border-border/50 shrink-0">
              <span>9:41</span>
              <span className="w-10 h-2 bg-foreground/30 rounded-full" />
              <span className="text-[7px]">5G 100%</span>
            </div>

            {/* Mobile Viewport with Auto-Scroll Engine */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <AutoScrollFrame isPaused={isScrollPaused} speed={20}>
                {template.renderMobile()}
              </AutoScrollFrame>
            </div>

            {/* Home indicator bar */}
            <div className="py-1 flex justify-center bg-muted/20 shrink-0">
              <span className="w-16 h-1 rounded-full bg-foreground/25" />
            </div>
          </div>
        </div>
      </CardContent>

      {/* Card Footer: Tags & Action */}
      <div className="px-5 sm:px-6 pb-5 pt-1 flex flex-wrap items-center justify-between gap-3 border-t border-border/50">
        <div className="flex flex-wrap items-center gap-1.5">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {template.badgeType === "available" ? (
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/create-website" />}
            className="rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs [background-image:var(--brand-gradient)] hover:brightness-105"
          >
            <span>Choose Template</span>
            <ArrowRight className="size-3.5 ml-1" />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            render={<Link href="/create-website" />}
            className="rounded-xl text-xs font-semibold"
          >
            <span>Preview Showcase</span>
            <ExternalLink className="size-3 ml-1 text-muted-foreground" />
          </Button>
        )}
      </div>
    </Card>
  );
}

// ===========================================================================
// TEMPLATE 01: NATURAL (Bhoomi Living)
// Full multi-section storefront designed to reveal full layout on scroll.
// ===========================================================================
function NaturalDesktopPreview() {
  return (
    <div className="w-full bg-[#F9F7F1] dark:bg-[#1A1F1C] text-stone-900 dark:text-stone-100 p-2 sm:p-2.5 flex flex-col gap-2.5">
      {/* 1. Announcement Bar */}
      <div className="rounded-md bg-[#2D4A3E] px-2 py-0.5 text-center text-[9px] font-medium text-white tracking-wider">
        🌿 100% ORGANIC & SUSTAINABLE • FREE SHIPPING OVER ৳ 2,000
      </div>

      {/* 2. Store Header */}
      <div className="flex items-center justify-between border-b border-stone-300/60 dark:border-stone-800 pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="grid size-5 place-items-center rounded-full bg-[#2D4A3E] text-[10px] font-serif font-bold text-white">
            B
          </span>
          <span className="font-serif text-xs font-bold tracking-tight">
            Bhoomi Living
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-[9px] text-stone-600 dark:text-stone-400 font-medium">
          <span className="text-[#2D4A3E] dark:text-emerald-400 font-bold">Apparel</span>
          <span>Bedding</span>
          <span>Clayware</span>
          <span>Story</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
          <Search className="size-2.5" />
          <span className="text-[9px] font-semibold">Cart (2)</span>
        </div>
      </div>

      {/* 3. Hero Banner */}
      <div className="rounded-lg bg-[#EAE5D9] dark:bg-[#252C28] p-2.5 flex items-center justify-between">
        <div className="max-w-[70%]">
          <span className="text-[7px] font-bold uppercase tracking-widest text-[#2D4A3E] dark:text-emerald-400">
            Handcrafted Harvest 2026
          </span>
          <h4 className="font-serif text-xs sm:text-sm font-extrabold mt-0.5 leading-snug">
            Conscious Living, Handcrafted with Care.
          </h4>
          <p className="text-[9px] text-stone-600 dark:text-stone-400 mt-0.5">
            Pure organic cotton, handloom textiles & clay homeware shaped in Bengal.
          </p>
          <span className="inline-block mt-1.5 rounded-sm bg-[#2D4A3E] px-2 py-0.5 text-[8px] font-bold text-white">
            Shop Harvest →
          </span>
        </div>
        <div className="size-16 shrink-0 overflow-hidden rounded-md bg-stone-300/60 dark:bg-stone-700/60">
          <Image
            src="/products/canvas-tote.svg"
            alt="Organic Tote"
            width={64}
            height={64}
            unoptimized
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* 4. Curated Category Row */}
      <div className="grid grid-cols-3 gap-1.5 text-center text-[8px]">
        <div className="rounded-md bg-stone-200/60 dark:bg-stone-800/60 p-1 font-serif font-bold">
          Linen Apparel (14)
        </div>
        <div className="rounded-md bg-stone-200/60 dark:bg-stone-800/60 p-1 font-serif font-bold">
          Handloom Bedding (8)
        </div>
        <div className="rounded-md bg-stone-200/60 dark:bg-stone-800/60 p-1 font-serif font-bold">
          Clay Tableware (12)
        </div>
      </div>

      {/* 5. Populated Product Grid */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[9px] font-serif font-bold">
          <span>Featured Spring Harvest</span>
          <span className="text-[#2D4A3E] dark:text-emerald-400">View All (34) →</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="flex flex-col justify-between rounded-md border border-stone-300/60 dark:border-stone-800 bg-white/70 dark:bg-[#202723] p-1.5">
            <div className="h-12 w-full overflow-hidden rounded bg-stone-200/50">
              <Image
                src="/products/canvas-tote.svg"
                alt="Linen Shirt"
                width={48}
                height={48}
                unoptimized
                className="size-full object-cover"
              />
            </div>
            <p className="truncate text-[9px] font-serif font-bold mt-1">Linen Shirt</p>
            <p className="text-[9px] font-bold text-[#2D4A3E] dark:text-emerald-400">৳ 1,850</p>
          </div>

          <div className="flex flex-col justify-between rounded-md border border-stone-300/60 dark:border-stone-800 bg-white/70 dark:bg-[#202723] p-1.5">
            <div className="h-12 w-full overflow-hidden rounded bg-stone-200/50">
              <Image
                src="/products/ceramic-mug.svg"
                alt="Clay Candle"
                width={48}
                height={48}
                unoptimized
                className="size-full object-cover"
              />
            </div>
            <p className="truncate text-[9px] font-serif font-bold mt-1">Clay Candle</p>
            <p className="text-[9px] font-bold text-[#2D4A3E] dark:text-emerald-400">৳ 650</p>
          </div>

          <div className="flex flex-col justify-between rounded-md border border-stone-300/60 dark:border-stone-800 bg-white/70 dark:bg-[#202723] p-1.5">
            <div className="h-12 w-full overflow-hidden rounded bg-stone-200/50">
              <Image
                src="/products/fiddle-leaf-plant.svg"
                alt="Clay Planter"
                width={48}
                height={48}
                unoptimized
                className="size-full object-cover"
              />
            </div>
            <p className="truncate text-[9px] font-serif font-bold mt-1">Clay Planter</p>
            <p className="text-[9px] font-bold text-[#2D4A3E] dark:text-emerald-400">৳ 950</p>
          </div>
        </div>
      </div>

      {/* 6. Sustainability Commitments */}
      <div className="rounded-lg border border-[#2D4A3E]/30 bg-[#2D4A3E]/10 p-2 text-[9px]">
        <div className="flex items-center gap-1 font-serif font-bold text-[#2D4A3E] dark:text-emerald-400">
          <CheckCircle2 className="size-3" />
          <span>The Bhoomi Craft Promise</span>
        </div>
        <p className="text-stone-600 dark:text-stone-400 mt-0.5 text-[8px] leading-relaxed">
          100% Biodegradable packaging • Fair wages for artisan handloom weavers in Tangail.
        </p>
      </div>

      {/* 7. Customer Review Strip */}
      <div className="rounded-md border border-stone-300/60 dark:border-stone-800 bg-white/60 dark:bg-[#202723] p-2 text-[8px] italic text-stone-700 dark:text-stone-300">
        &ldquo;The linen feels breathable, weighty and timeless. Delivery in Dhaka was within 24 hours.&rdquo;
        <span className="block mt-0.5 not-italic font-bold text-[#2D4A3E] dark:text-emerald-400">
          — Sarah K., Banani ★★★★★
        </span>
      </div>

      {/* 8. Storefront Footer */}
      <div className="rounded-md bg-stone-200/70 dark:bg-stone-800/80 p-2 text-center text-[8px] text-stone-500">
        Bhoomi Living • Handcrafted Goods • nokshi.biponon.com/bhoomi
      </div>
    </div>
  );
}

function NaturalMobilePreview() {
  return (
    <div className="w-full bg-[#F9F7F1] dark:bg-[#1A1F1C] text-stone-900 dark:text-stone-100 p-2 flex flex-col gap-2">
      {/* Mobile Top Header */}
      <div className="flex items-center justify-between border-b border-stone-300/60 dark:border-stone-800 pb-1">
        <span className="text-xs font-serif font-bold text-[#2D4A3E] dark:text-emerald-400">
          ☰ Bhoomi
        </span>
        <span className="text-[8px] font-bold rounded-xs bg-[#2D4A3E] text-white px-1.5 py-0.2">
          Cart (2)
        </span>
      </div>

      {/* Compact Mobile Hero */}
      <div className="rounded-md bg-[#EAE5D9] dark:bg-[#252C28] p-2 text-center">
        <span className="text-[6px] font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-emerald-400">
          Pure Living
        </span>
        <h5 className="font-serif text-[10px] font-bold leading-tight mt-0.5">
          Conscious Living, Rooted in Nature.
        </h5>
        <span className="inline-block mt-1 rounded-xs bg-[#2D4A3E] px-2 py-0.5 text-[7px] font-bold text-white">
          Shop Harvest
        </span>
      </div>

      {/* Mobile Category Pills */}
      <div className="flex items-center gap-1 text-[7px] font-serif font-bold text-stone-600 dark:text-stone-300">
        <span className="bg-[#2D4A3E] text-white px-1.5 py-0.5 rounded">All</span>
        <span className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded">Linen</span>
        <span className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded">Pottery</span>
      </div>

      {/* 2-Col Mobile Product Grid */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded border border-stone-300/60 dark:border-stone-800 bg-white/80 dark:bg-[#202723] p-1 flex flex-col justify-between">
          <div className="h-10 w-full overflow-hidden rounded bg-stone-200/50">
            <Image
              src="/products/canvas-tote.svg"
              alt="Linen Shirt"
              width={36}
              height={36}
              unoptimized
              className="size-full object-cover"
            />
          </div>
          <p className="truncate text-[8px] font-serif font-bold mt-0.5">Linen Shirt</p>
          <p className="text-[8px] font-bold text-[#2D4A3E] dark:text-emerald-400">৳ 1,850</p>
        </div>

        <div className="rounded border border-stone-300/60 dark:border-stone-800 bg-white/80 dark:bg-[#202723] p-1 flex flex-col justify-between">
          <div className="h-10 w-full overflow-hidden rounded bg-stone-200/50">
            <Image
              src="/products/ceramic-mug.svg"
              alt="Clay Candle"
              width={36}
              height={36}
              unoptimized
              className="size-full object-cover"
            />
          </div>
          <p className="truncate text-[8px] font-serif font-bold mt-0.5">Clay Candle</p>
          <p className="text-[8px] font-bold text-[#2D4A3E] dark:text-emerald-400">৳ 650</p>
        </div>
      </div>

      {/* Mobile Sustainability Card */}
      <div className="rounded border border-[#2D4A3E]/30 bg-[#2D4A3E]/10 p-1.5 text-[7px] text-[#2D4A3E] dark:text-emerald-400 font-bold">
        ✓ 100% Organic Cotton • Fair Trade
      </div>

      {/* Mobile Testimonial */}
      <div className="rounded border border-stone-300/60 dark:border-stone-800 bg-white/60 p-1.5 text-[7px] italic text-stone-600">
        &ldquo;Breathable and beautiful linen!&rdquo; — Sarah K. ★★★★★
      </div>

      {/* Mobile Footer */}
      <div className="rounded bg-stone-200/60 p-1 text-center text-[7px] text-stone-500">
        Bhoomi Living • Mobile Store
      </div>
    </div>
  );
}

// ===========================================================================
// TEMPLATE 02: SAKURA (Aura Botanics)
// Full multi-section cosmetics & beauty storefront.
// ===========================================================================
function SakuraDesktopPreview() {
  return (
    <div className="w-full bg-[#FFF5F7] dark:bg-[#1E1418] text-rose-950 dark:text-rose-100 p-2 sm:p-2.5 flex flex-col gap-2.5">
      {/* 1. Announcement Bar */}
      <div className="rounded-md bg-[#E11D48] px-2 py-0.5 text-center text-[9px] font-medium text-white tracking-wider">
        🌸 SPRING SKINCARE DROP: COMPLIMENTARY TRAVEL MIST WITH EVERY ORDER
      </div>

      {/* 2. Store Header */}
      <div className="flex items-center justify-between border-b border-rose-200 dark:border-rose-900/60 pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-2xs">
            A
          </span>
          <span className="font-heading text-xs font-bold tracking-tight">
            Aura Botanics
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-[9px] text-rose-800 dark:text-rose-300 font-medium">
          <span className="text-rose-600 dark:text-rose-400 font-bold">Skincare</span>
          <span>Lip & Glow</span>
          <span>Serums</span>
          <span>Rituals</span>
        </div>
        <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300">
          <Search className="size-2.5" />
          <span className="text-[9px] font-semibold">Bag (3)</span>
        </div>
      </div>

      {/* 3. Hero Banner */}
      <div className="rounded-lg bg-gradient-to-r from-rose-200/70 via-pink-100 to-rose-200/50 dark:from-rose-950/70 dark:to-pink-950/50 p-2.5 flex items-center justify-between">
        <div className="max-w-[70%]">
          <span className="text-[7px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
            Botanical Alchemy
          </span>
          <h4 className="font-heading text-xs sm:text-sm font-extrabold mt-0.5 leading-snug">
            Awaken Your Skin&apos;s Natural Radiance.
          </h4>
          <p className="text-[9px] text-rose-900/80 dark:text-rose-300 mt-0.5">
            Cold-pressed rosewater elixirs & peptide formulas for youthful luminence.
          </p>
          <span className="inline-block mt-1.5 rounded-full bg-rose-600 px-2.5 py-0.5 text-[8px] font-bold text-white shadow-xs">
            Shop The Glow ✨
          </span>
        </div>
        <div className="flex flex-col items-center justify-center size-16 shrink-0 rounded-full border-2 border-rose-300/60 bg-white/80 dark:bg-rose-900/40 text-center p-1">
          <span className="text-xs font-extrabold text-rose-600 dark:text-rose-300">4.9 ★</span>
          <span className="text-[7px] text-rose-800 dark:text-rose-400">210 Reviews</span>
        </div>
      </div>

      {/* 4. Beauty Category Tabs */}
      <div className="grid grid-cols-3 gap-1.5 text-center text-[8px] font-bold">
        <div className="rounded-full bg-rose-100 dark:bg-rose-900/50 p-1 text-rose-700 dark:text-rose-300">
          Hydration Serums
        </div>
        <div className="rounded-full bg-rose-100 dark:bg-rose-900/50 p-1 text-rose-700 dark:text-rose-300">
          Velvet Lip Tints
        </div>
        <div className="rounded-full bg-rose-100 dark:bg-rose-900/50 p-1 text-rose-700 dark:text-rose-300">
          Night Peptides
        </div>
      </div>

      {/* 5. Populated Product Grid */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[9px] font-bold">
          <span>Spring Bestsellers</span>
          <span className="text-rose-600 dark:text-rose-400">Explore All →</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="flex flex-col justify-between rounded-md border border-rose-200/70 dark:border-rose-900/60 bg-white/80 dark:bg-rose-950/40 p-1.5">
            <div className="h-12 w-full rounded bg-rose-100/60 dark:bg-rose-900/30 flex items-center justify-center">
              <span className="text-lg">🧴</span>
            </div>
            <p className="truncate text-[9px] font-bold mt-1">Glow Serum</p>
            <p className="text-[9px] font-bold text-rose-600 dark:text-rose-400">৳ 1,450</p>
          </div>

          <div className="flex flex-col justify-between rounded-md border border-rose-200/70 dark:border-rose-900/60 bg-white/80 dark:bg-rose-950/40 p-1.5">
            <div className="h-12 w-full rounded bg-rose-100/60 dark:bg-rose-900/30 flex items-center justify-center">
              <span className="text-lg">💄</span>
            </div>
            <p className="truncate text-[9px] font-bold mt-1">Velvet Tint</p>
            <p className="text-[9px] font-bold text-rose-600 dark:text-rose-400">৳ 850</p>
          </div>

          <div className="flex flex-col justify-between rounded-md border border-rose-200/70 dark:border-rose-900/60 bg-white/80 dark:bg-rose-950/40 p-1.5">
            <div className="h-12 w-full rounded bg-rose-100/60 dark:bg-rose-900/30 flex items-center justify-center">
              <span className="text-lg">✨</span>
            </div>
            <p className="truncate text-[9px] font-bold mt-1">Peptide Cream</p>
            <p className="text-[9px] font-bold text-rose-600 dark:text-rose-400">৳ 2,100</p>
          </div>
        </div>
      </div>

      {/* 6. Clean Beauty Promise */}
      <div className="rounded-lg border border-rose-300/50 bg-rose-200/30 dark:bg-rose-950/50 p-2 text-[8px] text-rose-900 dark:text-rose-200">
        <span className="font-bold">✨ Clean Formula Promise:</span> 100% Cruelty Free • Dermatologist Tested • Zero Synthetic Fragrance.
      </div>

      {/* 7. Verified Customer Review */}
      <div className="rounded-md border border-rose-200 bg-white/70 dark:bg-rose-950/40 p-2 text-[8px] italic text-rose-900 dark:text-rose-200">
        &ldquo;The serum transformed my skin texture in 2 weeks. Glassy, dewy finish!&rdquo;
        <span className="block mt-0.5 not-italic font-bold text-rose-600 dark:text-rose-400">
          — Nabila R., Dhanmondi ★★★★★
        </span>
      </div>

      {/* 8. Storefront Footer */}
      <div className="rounded-md bg-rose-100/70 dark:bg-rose-950/60 p-2 text-center text-[8px] text-rose-600 dark:text-rose-400">
        Aura Botanics • Radiance Reimagined • aurabotanics.biponon.com
      </div>
    </div>
  );
}

function SakuraMobilePreview() {
  return (
    <div className="w-full bg-[#FFF5F7] dark:bg-[#1E1418] text-rose-950 dark:text-rose-100 p-2 flex flex-col gap-2">
      {/* Mobile Top Header */}
      <div className="flex items-center justify-between border-b border-rose-200 dark:border-rose-900/60 pb-1">
        <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
          ☰ Aura
        </span>
        <span className="text-[8px] font-bold rounded-full bg-rose-500 text-white px-2 py-0.2">
          Bag (3)
        </span>
      </div>

      {/* Compact Mobile Hero */}
      <div className="rounded-md bg-rose-200/60 dark:bg-rose-950/70 p-2 text-center">
        <span className="text-[6px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Spring Drop
        </span>
        <h5 className="text-[10px] font-bold leading-tight mt-0.5">
          Awaken Your Skin&apos;s Radiance.
        </h5>
        <span className="inline-block mt-1 rounded-full bg-rose-600 px-2.5 py-0.5 text-[7px] font-bold text-white">
          Shop The Glow
        </span>
      </div>

      {/* 2-Col Mobile Product Grid */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded border border-rose-200/70 dark:border-rose-900/60 bg-white/80 dark:bg-rose-950/40 p-1 flex flex-col justify-between">
          <div className="h-10 w-full rounded bg-rose-100/60 flex items-center justify-center">
            <span className="text-sm">🧴</span>
          </div>
          <p className="truncate text-[8px] font-bold mt-0.5">Glow Serum</p>
          <p className="text-[8px] font-bold text-rose-600 dark:text-rose-400">৳ 1,450</p>
        </div>

        <div className="rounded border border-rose-200/70 dark:border-rose-900/60 bg-white/80 dark:bg-rose-950/40 p-1 flex flex-col justify-between">
          <div className="h-10 w-full rounded bg-rose-100/60 flex items-center justify-center">
            <span className="text-sm">💄</span>
          </div>
          <p className="truncate text-[8px] font-bold mt-0.5">Velvet Tint</p>
          <p className="text-[8px] font-bold text-rose-600 dark:text-rose-400">৳ 850</p>
        </div>
      </div>

      {/* Mobile Clean Beauty Badge */}
      <div className="rounded border border-rose-300/40 bg-rose-200/30 p-1.5 text-[7px] text-rose-700 font-bold">
        ✓ 100% Vegan & Cruelty Free
      </div>

      {/* Mobile Review */}
      <div className="rounded border border-rose-200 bg-white/60 p-1.5 text-[7px] italic text-rose-700">
        &ldquo;Glassy, dewy finish on skin.&rdquo; — Nabila R. ★★★★★
      </div>

      {/* Mobile Footer */}
      <div className="rounded bg-rose-100/60 p-1 text-center text-[7px] text-rose-600">
        Aura Botanics • Mobile Store
      </div>
    </div>
  );
}

// ===========================================================================
// TEMPLATE 03: MINIMAL (Kairo Objects)
// Full multi-section hardware & tech gear storefront.
// ===========================================================================
function MinimalDesktopPreview() {
  return (
    <div className="w-full bg-[#FAFAFA] dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 p-2 sm:p-2.5 flex flex-col gap-2.5">
      {/* 1. Announcement Bar */}
      <div className="rounded-md bg-slate-900 dark:bg-white px-2 py-0.5 text-center text-[9px] font-mono font-semibold text-white dark:text-slate-900 tracking-wider">
        PRECISION HARDWARE • NEXT-DAY DISPATCH ACROSS BANGLADESH
      </div>

      {/* 2. Store Header */}
      <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-black tracking-tighter">
            KAIRO //
          </span>
        </div>
        <div className="flex items-center gap-2.5 font-mono text-[9px] text-slate-600 dark:text-slate-400">
          <span className="text-slate-900 dark:text-white font-bold">Audio</span>
          <span>Power</span>
          <span>Workspace</span>
          <span>Specs</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-800 dark:text-slate-200">
          <Search className="size-2.5" />
          <span>Cart [1]</span>
        </div>
      </div>

      {/* 3. Hero Banner */}
      <div className="rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-[#121824] p-2.5 flex items-center justify-between">
        <div className="max-w-[70%]">
          <span className="font-mono text-[7px] font-bold uppercase tracking-widest text-slate-500">
            SERIES 04 • AUDIO
          </span>
          <h4 className="font-heading text-xs sm:text-sm font-black mt-0.5 leading-snug">
            Form Meets Pure Performance.
          </h4>
          <p className="font-mono text-[9px] text-slate-600 dark:text-slate-400 mt-0.5">
            CNC machined aluminum housing with custom 40mm beryllium drivers.
          </p>
          <span className="inline-block mt-1.5 rounded-sm bg-slate-900 dark:bg-white px-2 py-0.5 font-mono text-[8px] font-bold text-white dark:text-slate-900">
            View Specs →
          </span>
        </div>
        <div className="size-16 shrink-0 overflow-hidden rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
          <Image
            src="/products/studio-headphones.svg"
            alt="Headphones"
            width={56}
            height={56}
            unoptimized
            className="size-full object-contain"
          />
        </div>
      </div>

      {/* 4. Modular Categories Bar */}
      <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[8px] font-bold">
        <div className="rounded border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#121824] p-1">
          01 / High-Fi Audio
        </div>
        <div className="rounded border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#121824] p-1">
          02 / MagLock Power
        </div>
        <div className="rounded border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#121824] p-1">
          03 / Desk Objects
        </div>
      </div>

      {/* 5. Populated Product Grid */}
      <div className="space-y-1">
        <div className="flex items-center justify-between font-mono text-[9px] font-black">
          <span>CATALOG ARCHIVE</span>
          <span className="text-slate-500">4 Items Active</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="flex flex-col justify-between rounded-md border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#121824] p-1.5">
            <div className="h-12 w-full overflow-hidden rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Image
                src="/products/studio-headphones.svg"
                alt="Headphones"
                width={40}
                height={40}
                unoptimized
                className="size-full object-contain"
              />
            </div>
            <p className="truncate font-mono text-[9px] font-bold mt-1">ANC Headset</p>
            <p className="font-mono text-[9px] font-black text-slate-900 dark:text-white">৳ 5,800</p>
          </div>

          <div className="flex flex-col justify-between rounded-md border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#121824] p-1.5">
            <div className="h-12 w-full overflow-hidden rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-base font-mono font-bold text-slate-500">15W</span>
            </div>
            <p className="truncate font-mono text-[9px] font-bold mt-1">Wireless Pad</p>
            <p className="font-mono text-[9px] font-black text-slate-900 dark:text-white">৳ 1,950</p>
          </div>

          <div className="flex flex-col justify-between rounded-md border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#121824] p-1.5">
            <div className="h-12 w-full overflow-hidden rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-base font-mono font-bold text-slate-500">ALU</span>
            </div>
            <p className="truncate font-mono text-[9px] font-bold mt-1">Desk Stand</p>
            <p className="font-mono text-[9px] font-black text-slate-900 dark:text-white">৳ 2,400</p>
          </div>
        </div>
      </div>

      {/* 6. Hardware Specifications Strip */}
      <div className="rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-[#121824] p-2 font-mono text-[8px]">
        <span className="font-bold">SYSTEM SPEC:</span> Aerospace Anodized Aluminum • 3-Year Hardware Warranty.
      </div>

      {/* 7. Sound Engineer Review */}
      <div className="rounded-md border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#121824] p-2 font-mono text-[8px] text-slate-700 dark:text-slate-300">
        &ldquo;Zero acoustic distortion. Build precision at its absolute peak.&rdquo;
        <span className="block mt-0.5 font-black text-slate-900 dark:text-white">
          — Farhan T., Gulshan Studio [Verified]
        </span>
      </div>

      {/* 8. Storefront Footer */}
      <div className="rounded-md bg-slate-200 dark:bg-slate-900 p-2 text-center font-mono text-[8px] text-slate-500">
        KAIRO // Precision Objects • kairo.biponon.com
      </div>
    </div>
  );
}

function MinimalMobilePreview() {
  return (
    <div className="w-full bg-[#FAFAFA] dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 p-2 flex flex-col gap-2">
      {/* Mobile Top Header */}
      <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-1">
        <span className="font-mono text-xs font-black">
          ☰ KAIRO //
        </span>
        <span className="font-mono text-[8px] font-bold rounded-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-1.5 py-0.2">
          Cart [1]
        </span>
      </div>

      {/* Compact Mobile Hero */}
      <div className="rounded-md border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-[#121824] p-2 text-center">
        <span className="font-mono text-[6px] font-bold uppercase tracking-widest text-slate-500">
          SERIES 04
        </span>
        <h5 className="font-heading text-[10px] font-black leading-tight mt-0.5">
          Pure Performance.
        </h5>
        <span className="inline-block mt-1 rounded-xs bg-slate-900 dark:bg-white px-2 py-0.5 font-mono text-[7px] font-bold text-white dark:text-slate-900">
          View Specs →
        </span>
      </div>

      {/* 2-Col Mobile Product Grid */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#121824] p-1 flex flex-col justify-between">
          <div className="h-10 w-full rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Image
              src="/products/studio-headphones.svg"
              alt="Headphones"
              width={28}
              height={28}
              unoptimized
              className="size-full object-contain"
            />
          </div>
          <p className="truncate font-mono text-[8px] font-bold mt-0.5">ANC Headset</p>
          <p className="font-mono text-[8px] font-black text-slate-900 dark:text-white">৳ 5,800</p>
        </div>

        <div className="rounded border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#121824] p-1 flex flex-col justify-between">
          <div className="h-10 w-full rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <span className="font-mono text-[10px] font-bold text-slate-500">15W</span>
          </div>
          <p className="truncate font-mono text-[8px] font-bold mt-0.5">Wireless Pad</p>
          <p className="font-mono text-[8px] font-black text-slate-900 dark:text-white">৳ 1,950</p>
        </div>
      </div>

      {/* Mobile Spec Strip */}
      <div className="rounded border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-[#121824] p-1.5 font-mono text-[7px]">
        ✓ CNC Aluminum • 3-Yr Warranty
      </div>

      {/* Mobile Review */}
      <div className="rounded border border-slate-300 bg-white p-1.5 font-mono text-[7px] text-slate-600">
        &ldquo;Sound precision at its peak.&rdquo; — Farhan T.
      </div>

      {/* Mobile Footer */}
      <div className="rounded bg-slate-200 p-1 text-center font-mono text-[7px] text-slate-500">
        KAIRO // Mobile Interface
      </div>
    </div>
  );
}

// ===========================================================================
// TEMPLATE 04: BOLD (Dhaak Collective)
// Full multi-section dark streetwear & statement apparel storefront.
// ===========================================================================
function BoldDesktopPreview() {
  return (
    <div className="w-full bg-[#0E0E12] text-white p-2 sm:p-2.5 flex flex-col gap-2.5 border border-zinc-800">
      {/* 1. Announcement Bar */}
      <div className="rounded-md bg-[#F59E0B] px-2 py-0.5 text-center text-[9px] font-black text-black tracking-widest uppercase">
        ⚡ SEASON DROP 03 LIVE NOW • STRICTLY LIMITED QUANTITIES
      </div>

      {/* 2. Store Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="font-heading text-xs font-black tracking-widest text-[#F59E0B]">
            DHAAK // CO.
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-[9px] text-zinc-400 font-extrabold uppercase">
          <span className="text-[#F59E0B]">Drop 03</span>
          <span>Hoodies</span>
          <span>Cargo</span>
          <span>Lookbook</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-200">
          <ShoppingCart className="size-2.5 text-[#F59E0B]" />
          <span className="text-[9px] font-bold">Cart (4)</span>
        </div>
      </div>

      {/* 3. Hero Banner */}
      <div className="rounded-lg border border-zinc-800 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 p-2.5 flex items-center justify-between">
        <div className="max-w-[70%]">
          <span className="inline-block rounded-xs bg-red-600 px-1 py-0.2 text-[7px] font-black uppercase tracking-widest text-white">
            LIMITED DROP // 100 PIECES
          </span>
          <h4 className="font-heading text-xs sm:text-sm font-black mt-0.5 leading-snug tracking-tight text-white">
            BUILT FOR THE CONCRETE JUNGLE.
          </h4>
          <p className="text-[9px] text-zinc-400 mt-0.5">
            450GSM heavyweight combed cotton, custom boxy fit designed in Dhaka.
          </p>
          <span className="inline-block mt-1.5 rounded-sm bg-[#F59E0B] px-2 py-0.5 text-[8px] font-black text-black">
            GET THE DROP ↗
          </span>
        </div>
        <div className="size-16 shrink-0 overflow-hidden rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1">
          <Image
            src="/products/canvas-tote.svg"
            alt="Streetwear Bag"
            width={48}
            height={48}
            unoptimized
            className="size-full object-cover invert"
          />
        </div>
      </div>

      {/* 4. Drop Selector Tabs */}
      <div className="grid grid-cols-3 gap-1.5 text-center text-[8px] font-black uppercase">
        <div className="rounded bg-zinc-900 border border-zinc-800 p-1 text-[#F59E0B]">
          {"// Hoodies (450G)"}
        </div>
        <div className="rounded bg-zinc-900 border border-zinc-800 p-1 text-zinc-400">
          {"// Graphic Tees"}
        </div>
        <div className="rounded bg-zinc-900 border border-zinc-800 p-1 text-zinc-400">
          {"// Tactical Cargo"}
        </div>
      </div>

      {/* 5. Populated Streetwear Product Grid */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider">
          <span>DROP 03 ARCHIVE</span>
          <span className="text-red-500 font-bold">Only 12 Left</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="flex flex-col justify-between rounded-md border border-zinc-800 bg-zinc-950 p-1.5">
            <div className="h-12 w-full rounded bg-zinc-900 flex items-center justify-center">
              <span className="text-base font-black text-[#F59E0B]">HOOD</span>
            </div>
            <p className="truncate text-[9px] font-black mt-1">450G Hoodie</p>
            <p className="text-[9px] font-black text-[#F59E0B]">৳ 2,650</p>
          </div>

          <div className="flex flex-col justify-between rounded-md border border-zinc-800 bg-zinc-950 p-1.5">
            <div className="h-12 w-full rounded bg-zinc-900 flex items-center justify-center">
              <span className="text-base font-black text-[#F59E0B]">TEE</span>
            </div>
            <p className="truncate text-[9px] font-black mt-1">Graphic Tee</p>
            <p className="text-[9px] font-black text-[#F59E0B]">৳ 1,250</p>
          </div>

          <div className="flex flex-col justify-between rounded-md border border-zinc-800 bg-zinc-950 p-1.5">
            <div className="h-12 w-full rounded bg-zinc-900 flex items-center justify-center">
              <span className="text-base font-black text-[#F59E0B]">CARGO</span>
            </div>
            <p className="truncate text-[9px] font-black mt-1">Cargo Pants</p>
            <p className="text-[9px] font-black text-[#F59E0B]">৳ 2,900</p>
          </div>
        </div>
      </div>

      {/* 6. Street Cred & Materials Strip */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-[8px] text-zinc-300">
        <span className="font-black text-[#F59E0B]">AUTHENTIC SPEC:</span> Heavyweight French Terry • Hand Screenprinted in Old Dhaka.
      </div>

      {/* 7. Verified Streetwear Buyer Quote */}
      <div className="rounded-md border border-zinc-800 bg-zinc-950 p-2 text-[8px] italic text-zinc-300">
        &ldquo;The boxy silhouette is insane. Heavyweight fabric that actually holds structure.&rdquo;
        <span className="block mt-0.5 not-italic font-black text-[#F59E0B]">
          — Tanvir H., Uttara [Verified Drop 03]
        </span>
      </div>

      {/* 8. Storefront Footer */}
      <div className="rounded-md bg-zinc-900 border border-zinc-800 p-2 text-center text-[8px] font-black text-zinc-500 uppercase">
        DHAAK // CO. • ALL RIGHTS RESERVED • dhaak.biponon.com
      </div>
    </div>
  );
}

function BoldMobilePreview() {
  return (
    <div className="w-full bg-[#0E0E12] text-white p-2 flex flex-col gap-2">
      {/* Mobile Top Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-1">
        <span className="font-heading text-xs font-black text-[#F59E0B]">
          ☰ DHAAK //
        </span>
        <span className="text-[8px] font-black rounded-xs bg-[#F59E0B] text-black px-1.5 py-0.2">
          Cart (4)
        </span>
      </div>

      {/* Compact Mobile Hero */}
      <div className="rounded-md border border-zinc-800 bg-zinc-900 p-2 text-center">
        <span className="text-[6px] font-black uppercase tracking-wider text-red-500">
          DROP 03 // LIVE
        </span>
        <h5 className="font-heading text-[10px] font-black leading-tight mt-0.5">
          BUILT FOR THE STREETS.
        </h5>
        <span className="inline-block mt-1 rounded-xs bg-[#F59E0B] px-2 py-0.5 text-[7px] font-black text-black">
          SHOP DROP ↗
        </span>
      </div>

      {/* 2-Col Mobile Product Grid */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded border border-zinc-800 bg-zinc-950 p-1 flex flex-col justify-between">
          <div className="h-10 w-full rounded bg-zinc-900 flex items-center justify-center">
            <span className="text-xs font-black text-[#F59E0B]">HOOD</span>
          </div>
          <p className="truncate text-[8px] font-black mt-0.5">450G Hoodie</p>
          <p className="text-[8px] font-black text-[#F59E0B]">৳ 2,650</p>
        </div>

        <div className="rounded border border-zinc-800 bg-zinc-950 p-1 flex flex-col justify-between">
          <div className="h-10 w-full rounded bg-zinc-900 flex items-center justify-center">
            <span className="text-xs font-black text-[#F59E0B]">TEE</span>
          </div>
          <p className="truncate text-[8px] font-black mt-0.5">Graphic Tee</p>
          <p className="text-[8px] font-black text-[#F59E0B]">৳ 1,250</p>
        </div>
      </div>

      {/* Mobile Streetwear Spec */}
      <div className="rounded border border-zinc-800 bg-zinc-900 p-1.5 text-[7px] text-[#F59E0B] font-black">
        ✓ 450GSM Combed Cotton • Boxy Fit
      </div>

      {/* Mobile Review */}
      <div className="rounded border border-zinc-800 bg-zinc-950 p-1.5 text-[7px] italic text-zinc-400">
        &ldquo;The boxy silhouette is insane!&rdquo; — Tanvir H.
      </div>

      {/* Mobile Footer */}
      <div className="rounded bg-zinc-900 p-1 text-center text-[7px] font-black text-zinc-500 uppercase">
        DHAAK // Mobile Drop
      </div>
    </div>
  );
}
