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
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BadgePercent,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Eye,
  Globe,
  Headphones,
  LayoutTemplate,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareQuote,
  Package,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sliders,
  Star,
  Store,
  Truck,
  Zap,
} from "lucide-react";

/**
 * Hook to detect viewport intersection for pausing/resuming animation.
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

interface StepMeta {
  id: string;
  number: string;
  titleKey: string;
  descKey: string;
  fallbackName: string;
  fallbackDesc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BUILDER_STEPS: StepMeta[] = [
  {
    id: "identity",
    number: "01",
    titleKey: "storeBuilder.steps.step1.name",
    descKey: "storeBuilder.steps.step1.desc",
    fallbackName: "Store Identity",
    fallbackDesc: "Logo, name & branding",
    icon: Store,
  },
  {
    id: "catalog",
    number: "02",
    titleKey: "storeBuilder.steps.step2.name",
    descKey: "storeBuilder.steps.step2.desc",
    fallbackName: "Product Catalog",
    fallbackDesc: "Items, prices & stock",
    icon: Package,
  },
  {
    id: "layout",
    number: "03",
    titleKey: "storeBuilder.steps.step3.name",
    descKey: "storeBuilder.steps.step3.desc",
    fallbackName: "Homepage Layout",
    fallbackDesc: "Banners & grid structure",
    icon: LayoutTemplate,
  },
  {
    id: "promo",
    number: "04",
    titleKey: "storeBuilder.steps.step4.name",
    descKey: "storeBuilder.steps.step4.desc",
    fallbackName: "Promotional Sections",
    fallbackDesc: "Deals & discount alerts",
    icon: BadgePercent,
  },
  {
    id: "styling",
    number: "05",
    titleKey: "storeBuilder.steps.step5.name",
    descKey: "storeBuilder.steps.step5.desc",
    fallbackName: "Brand Styling",
    fallbackDesc: "Colors & typography",
    icon: Palette,
  },
  {
    id: "feedback",
    number: "06",
    titleKey: "storeBuilder.steps.step6.name",
    descKey: "storeBuilder.steps.step6.desc",
    fallbackName: "Customer Feedback",
    fallbackDesc: "Reviews & social proof",
    icon: MessageSquareQuote,
  },
  {
    id: "support",
    number: "07",
    titleKey: "storeBuilder.steps.step7.name",
    descKey: "storeBuilder.steps.step7.desc",
    fallbackName: "Help & Support",
    fallbackDesc: "FAQ & live chat channel",
    icon: Headphones,
  },
  {
    id: "delivery",
    number: "08",
    titleKey: "storeBuilder.steps.step8.name",
    descKey: "storeBuilder.steps.step8.desc",
    fallbackName: "Delivery Setup",
    fallbackDesc: "Shipping zones & fees",
    icon: Truck,
  },
  {
    id: "payment",
    number: "09",
    titleKey: "storeBuilder.steps.step9.name",
    descKey: "storeBuilder.steps.step9.desc",
    fallbackName: "Payment Setup",
    fallbackDesc: "bKash, cards & COD",
    icon: CreditCard,
  },
  {
    id: "review",
    number: "10",
    titleKey: "storeBuilder.steps.step10.name",
    descKey: "storeBuilder.steps.step10.desc",
    fallbackName: "Final Review",
    fallbackDesc: "Pre-launch verification",
    icon: Rocket,
  },
];

export function StoreBuilderSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, 0.1);
  const reducedMotion = useReducedMotion();

  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [mobileTab, setMobileTab] = useState<"preview" | "inspector">("preview");

  const STEP_DURATION = 3500; // 3.5 seconds per step

  // Precise timing refs for hover pause & resume
  const remainingTimeRef = useRef(STEP_DURATION);
  const startTimeRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Manual step selection
  const handleSelectStep = useCallback((index: number) => {
    setActiveStep(index);
    remainingTimeRef.current = STEP_DURATION;
    startTimeRef.current = Date.now();
    setResetKey((k) => k + 1);
  }, []);

  const handleNextStep = useCallback(() => {
    handleSelectStep((activeStep + 1) % BUILDER_STEPS.length);
  }, [activeStep, handleSelectStep]);

  const handlePrevStep = useCallback(() => {
    handleSelectStep((activeStep - 1 + BUILDER_STEPS.length) % BUILDER_STEPS.length);
  }, [activeStep, handleSelectStep]);

  // Reliable progression loop
  useEffect(() => {
    if (!isInView || reducedMotion) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (isHovered) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(500, remainingTimeRef.current - elapsed);
      return;
    }

    startTimeRef.current = Date.now();
    const duration = remainingTimeRef.current;

    timerRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % BUILDER_STEPS.length);
      remainingTimeRef.current = STEP_DURATION;
      startTimeRef.current = Date.now();
      setResetKey((k) => k + 1);
    }, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [activeStep, resetKey, isInView, reducedMotion, isHovered]);

  const activeStepData = BUILDER_STEPS[activeStep];
  const progressPercent = Math.round(((activeStep + 1) / BUILDER_STEPS.length) * 100);

  return (
    <section
      id="store-builder"
      ref={sectionRef}
      aria-label="10-step Biponon store builder"
      className="relative isolate w-full px-4 pt-20 pb-0 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-xs backdrop-blur-sm dark:border-primary/25 dark:bg-primary/15">
            <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary animate-pulse" />
            {t("storeBuilder.badge")}
          </span>

          <h2 className="font-heading mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="block">{t("storeBuilder.headingLine1")}</span>
            <span className="brand-gradient-text inline">
              {t("storeBuilder.headingGradient")}
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
            {t("storeBuilder.description")}
          </p>
        </div>

        {/* Dashboard Browser Mockup Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mt-12 sm:mt-16 w-full"
        >
          {/* Ambient Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-40 blur-3xl dark:opacity-25"
            style={{
              background:
                "radial-gradient(ellipse at center, color-mix(in srgb, var(--brand-primary) 18%, transparent), transparent 70%)",
            }}
          />

          {/* Browser Window Frame */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18),0_1px_3px_rgba(0,0,0,0.05)] ring-1 ring-black/5 dark:border-white/10 dark:bg-card/95 dark:shadow-[0_28px_70px_-20px_rgba(0,0,0,0.7)] dark:ring-white/10">
            {/* Top Browser Bar */}
            <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-border/70 bg-muted/60 px-4 py-2.5 dark:bg-white/5">
              {/* Left dots and App title */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-rose-500/70" />
                  <span className="size-2.5 rounded-full bg-amber-500/70" />
                  <span className="size-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="hidden sm:inline-block text-[11px] font-semibold text-muted-foreground/80 pl-1 border-l border-border/60">
                  Biponon Storefront Studio
                </span>
              </div>

              {/* Centered URL Bar */}
              <div className="order-last sm:order-none flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg border border-border/70 bg-background/80 px-3 py-1 text-xs shadow-2xs backdrop-blur-xs">
                <Lock className="size-3 shrink-0 text-primary" />
                <span className="truncate text-[11px] font-medium text-foreground/85">
                  nokshi.biponon.com
                </span>
                <span className="ml-1 text-[10px] text-muted-foreground/75 font-mono">
                  (Live Preview)
                </span>
              </div>

              {/* Step indicator & autosave badge */}
              <div className="flex items-center gap-2">
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Autosaved
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  Step {activeStepData.number}/10
                </span>
              </div>
            </div>

            {/* Mobile Tab Switcher (< lg) */}
            <div className="flex lg:hidden items-center border-b border-border/70 bg-muted/30 p-2">
              <div className="grid grid-cols-2 gap-1 w-full max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={() => setMobileTab("preview")}
                  className={cn(
                    "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all",
                    mobileTab === "preview"
                      ? "bg-card text-foreground shadow-xs border border-border/60"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Eye className="size-3.5" />
                  Store Preview
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab("inspector")}
                  className={cn(
                    "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all",
                    mobileTab === "inspector"
                      ? "bg-card text-foreground shadow-xs border border-border/60"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Sliders className="size-3.5" />
                  Customizer
                </button>
              </div>
            </div>

            {/* Main 3-Panel Editor Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
              {/* ---------------------------------------------------- */}
              {/* LEFT PANEL: Setup Navigation (10 Steps)              */}
              {/* ---------------------------------------------------- */}
              <div className="hidden lg:flex lg:col-span-3 flex-col border-r border-border/70 bg-muted/20 dark:bg-card/40">
                {/* Panel Header */}
                <div className="p-3.5 border-b border-border/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading font-bold text-foreground">
                      Store Roadmap
                    </span>
                    <span className="text-[10px] font-bold text-primary">
                      {progressPercent}% Complete
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full [background-image:var(--brand-gradient)] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* 10 Steps List */}
                <div className="flex-1 p-2 space-y-1">
                  {BUILDER_STEPS.map((step, idx) => {
                    const isActive = activeStep === idx;
                    const isCompleted = idx < activeStep;
                    const Icon = step.icon;
                    const title = t(step.titleKey) || step.fallbackName;
                    const desc = t(step.descKey) || step.fallbackDesc;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleSelectStep(idx)}
                        className={cn(
                          "relative w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all duration-200 outline-none select-none",
                          isActive
                            ? "bg-primary/10 text-primary border border-primary/30 shadow-2xs dark:bg-primary/15"
                            : "hover:bg-muted/60 text-muted-foreground hover:text-foreground border border-transparent"
                        )}
                      >
                        {/* Step Icon or Checkmark */}
                        <div
                          className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold transition-colors",
                            isActive
                              ? "bg-primary text-white [background-image:var(--brand-gradient)] shadow-xs"
                              : isCompleted
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-muted text-muted-foreground dark:bg-white/5"
                          )}
                        >
                          {isCompleted ? (
                            <Check className="size-3.5 stroke-[2.5]" />
                          ) : (
                            <Icon className="size-3.5" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p
                              className={cn(
                                "truncate text-xs font-bold tracking-tight",
                                isActive ? "text-foreground" : "text-foreground/80"
                              )}
                            >
                              {title}
                            </p>
                            <span className="text-[9px] font-mono opacity-60">
                              {step.number}
                            </span>
                          </div>
                          <p className="truncate text-[10px] text-muted-foreground">
                            {desc}
                          </p>
                        </div>

                        {/* Subtle mini progress line on active step */}
                        {isActive && !reducedMotion && (
                          <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden rounded-b-xl">
                            <div
                              key={`left-progress-${activeStep}-${resetKey}`}
                              className="h-full [background-image:var(--brand-gradient)]"
                              style={{
                                animation: `howItWorksProgress ${STEP_DURATION}ms linear forwards`,
                                animationPlayState: isHovered ? "paused" : "running",
                              }}
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* CENTER PANEL: Live Storefront Preview (Dominant)     */}
              {/* ---------------------------------------------------- */}
              <div
                className={cn(
                  "lg:col-span-6 flex flex-col bg-background p-3.5 sm:p-4.5 overflow-hidden border-b lg:border-b-0 lg:border-r border-border/70",
                  mobileTab === "inspector" && "hidden lg:flex"
                )}
              >
                {/* Mobile Step Strip (< lg) */}
                <div className="flex lg:hidden items-center justify-between mb-3 pb-2 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="grid size-6 place-items-center rounded-lg bg-primary text-[10px] font-bold text-white">
                      {activeStepData.number}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        {t(activeStepData.titleKey) || activeStepData.fallbackName}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Step {activeStep + 1} of 10
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="p-1 rounded-md border border-border/60 hover:bg-muted text-muted-foreground"
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="p-1 rounded-md border border-border/60 hover:bg-muted text-muted-foreground"
                    >
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inner Storefront Canvas */}
                <div
                  key={activeStep}
                  className="flex flex-1 flex-col justify-between h-full w-full min-h-0 overflow-hidden rounded-xl border border-border/70 bg-card p-3 sm:p-3.5 shadow-2xs animate-in fade-in zoom-in-95 duration-300 pointer-events-none select-none"
                >
                  <LiveStorefrontPreview activeStep={activeStep} />
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* RIGHT PANEL: Customization Inspector                  */}
              {/* ---------------------------------------------------- */}
              <div
                className={cn(
                  "lg:col-span-3 flex flex-col bg-muted/20 dark:bg-card/40 p-3 sm:p-4",
                  mobileTab === "preview" && "hidden lg:flex"
                )}
              >
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-1.5">
                    <Sliders className="size-3.5 text-primary" />
                    <span className="font-heading text-xs font-bold text-foreground">
                      Inspector
                    </span>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                    Configuring #{activeStepData.number}
                  </span>
                </div>

                {/* Contextual Settings Body */}
                <div
                  key={`inspector-${activeStep}`}
                  className="mt-3 flex-1 flex flex-col justify-between animate-in fade-in duration-300"
                >
                  <CustomizationInspector activeStep={activeStep} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// CENTER PANEL: Live Storefront Switcher
// ===========================================================================
function LiveStorefrontPreview({ activeStep }: { activeStep: number }) {
  switch (activeStep) {
    case 0:
      return <StorefrontStep1Identity />;
    case 1:
      return <StorefrontStep2Catalog />;
    case 2:
      return <StorefrontStep3Layout />;
    case 3:
      return <StorefrontStep4Promo />;
    case 4:
      return <StorefrontStep5Styling />;
    case 5:
      return <StorefrontStep6Feedback />;
    case 6:
      return <StorefrontStep7Support />;
    case 7:
      return <StorefrontStep8Delivery />;
    case 8:
      return <StorefrontStep9Payment />;
    case 9:
      return <StorefrontStep10Review />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Step 01: Store Identity
// ---------------------------------------------------------------------------
function StorefrontStep1Identity() {
  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full min-h-0 gap-2.5">
      {/* Top Identity Header */}
      <div className="flex items-center justify-between rounded-lg border border-primary/40 bg-primary/5 px-3 py-2 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-white shadow-xs [background-image:var(--brand-gradient)]">
            N
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-xs font-bold text-foreground">Nokshi Studio</span>
              <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                Verified
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">Handcrafted Artisanal Living</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background/80 px-2 py-1 text-[10px] font-mono text-foreground/80">
          <Globe className="size-3 text-primary" />
          <span>nokshi.biponon.com</span>
        </div>
      </div>

      {/* Hero Storefront Branding Canvas */}
      <div className="relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-muted/40 p-3 sm:p-4">
        <div className="max-w-[90%]">
          <span className="inline-block rounded-xs bg-primary/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary">
            Storefront Identity
          </span>
          <h3 className="font-heading mt-1 text-sm sm:text-base font-extrabold text-foreground">
            Preserving Bengal&apos;s Timeless Clay Traditions
          </h3>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Ethically crafted pottery, organic tableware, and lifestyle ceramics designed for modern, mindful homes.
          </p>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[10px]">
          <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-background px-2 py-0.5 font-medium text-foreground">
            <MapPin className="size-2.5 text-primary" /> Banani, Dhaka
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-background px-2 py-0.5 font-medium text-foreground">
            <Clock className="size-2.5 text-primary" /> Est. 2024
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-background px-2 py-0.5 font-medium text-foreground">
            <ShieldCheck className="size-2.5 text-emerald-600 dark:text-emerald-400" /> SSL 256-bit Encrypted
          </span>
        </div>
      </div>

      {/* Brand Assets & Header Navigation Preview */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Live Storefront Header
        </p>
        <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/40 p-2 text-[11px]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-foreground">Catalog</span>
            <span className="text-muted-foreground">New In</span>
            <span className="text-muted-foreground">Pottery</span>
            <span className="text-muted-foreground">Our Story</span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="size-3 text-muted-foreground" />
            <div className="relative">
              <ShoppingCart className="size-3.5 text-foreground" />
              <span className="absolute -right-1.5 -top-1.5 grid size-3 place-items-center rounded-full bg-primary text-[7px] font-bold text-white">
                2
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          Brand identity active & verified across all pages
        </span>
        <span className="font-semibold text-primary">Step 01 Configured</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 02: Product Catalog
// ---------------------------------------------------------------------------
function StorefrontStep2Catalog() {
  const products = [
    {
      name: "Glazed Ceramic Mug",
      price: "৳ 850",
      image: "/products/ceramic-mug.svg",
      sku: "NK-MUG-01",
      stock: "14 In Stock",
      stockColor: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      name: "Organic Canvas Tote",
      price: "৳ 1,200",
      image: "/products/canvas-tote.svg",
      sku: "NK-TOT-03",
      stock: "4 Left (Low)",
      stockColor: "text-amber-600 bg-amber-500/10 border-amber-500/20",
    },
    {
      name: "Acoustic Headphones",
      price: "৳ 4,500",
      image: "/products/studio-headphones.svg",
      sku: "NK-AUD-05",
      stock: "22 In Stock",
      stockColor: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      name: "Fiddle Leaf Fig Plant",
      price: "৳ 950",
      image: "/products/fiddle-leaf-plant.svg",
      sku: "NK-PLT-02",
      stock: "9 In Stock",
      stockColor: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full min-h-0 gap-2.5">
      {/* Category Filter Bar */}
      <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="rounded-md bg-primary px-2 py-0.5 font-bold text-white shadow-2xs">
            All (12)
          </span>
          <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-muted-foreground">
            Clayware (5)
          </span>
          <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-muted-foreground">
            Totes (4)
          </span>
          <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-muted-foreground">
            Plants (3)
          </span>
        </div>
        <span className="text-[10px] font-mono font-medium text-muted-foreground">
          Showing 4 Items
        </span>
      </div>

      {/* Populated 4-Product Catalog Grid */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {products.map((item) => (
          <div
            key={item.sku}
            className="flex flex-col justify-between rounded-lg border border-border/70 bg-card p-2 shadow-2xs transition-all hover:border-primary/40"
          >
            <div className="flex items-start gap-2">
              <div className="size-11 shrink-0 overflow-hidden rounded-md bg-muted/60">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={44}
                  height={44}
                  unoptimized
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold text-foreground">{item.name}</p>
                <p className="text-[9px] font-mono text-muted-foreground">SKU: {item.sku}</p>
                <p className="mt-0.5 text-xs font-bold text-primary">{item.price}</p>
              </div>
            </div>
            <div className="mt-1.5 flex items-center justify-between border-t border-border/50 pt-1 text-[9px]">
              <span className={cn("rounded-xs border px-1.5 py-0.2 font-medium", item.stockColor)}>
                {item.stock}
              </span>
              <span className="font-semibold text-primary">In Catalog</span>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Management Status */}
      <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] text-emerald-700 dark:text-emerald-300">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="size-3.5" />
          Live Inventory Sync active • Real-time low stock alerts enabled
        </span>
        <span className="font-mono font-bold">12 Total SKUs</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 03: Homepage Layout
// ---------------------------------------------------------------------------
function StorefrontStep3Layout() {
  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full min-h-0 gap-2.5">
      {/* Store Navigation Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded-md bg-primary text-[10px] font-bold text-white">N</span>
          <span className="font-heading text-xs font-bold text-foreground">Nokshi Studio</span>
        </div>
        <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground font-medium">
          <span className="text-primary font-semibold">Home</span>
          <span>New In</span>
          <span>Pottery</span>
          <span>Contact</span>
        </div>
        <ShoppingCart className="size-3 text-muted-foreground" />
      </div>

      {/* Split Hero Section */}
      <div className="rounded-xl border border-primary/40 bg-primary/10 p-3 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-7">
            <span className="inline-block rounded-xs bg-primary/20 px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider text-primary">
              Spring 2025 Collection
            </span>
            <h3 className="font-heading text-xs sm:text-sm font-extrabold text-foreground mt-0.5 leading-snug">
              Handcrafted Ceramics For Mindful Spaces.
            </h3>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
              Thoughtfully curated tableware and lifestyle goods, sustainably shaped in Bengal.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-[10px] font-bold text-white shadow-2xs">
                Explore Catalog <ArrowRight className="size-2.5" />
              </span>
              <span className="rounded-md border border-border/70 bg-background px-2 py-1 text-[10px] font-medium text-foreground">
                Our Story
              </span>
            </div>
          </div>
          <div className="sm:col-span-5 flex justify-center">
            <div className="relative size-20 sm:size-24 overflow-hidden rounded-xl border border-primary/20 bg-background/90 p-1.5 shadow-xs">
              <Image
                src="/products/ceramic-mug.svg"
                alt="Featured Product"
                width={80}
                height={80}
                unoptimized
                className="size-full object-contain"
              />
              <span className="absolute bottom-1 right-1 rounded-xs bg-primary/90 px-1 py-0.2 text-[8px] font-bold text-white">
                ৳ 850
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Categories Strip */}
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Curated Category Grid
        </p>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-border/70 bg-card p-1.5 text-center">
            <p className="text-[10px] font-bold text-foreground">Tableware</p>
            <p className="text-[8px] text-muted-foreground">Mugs & Bowls</p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card p-1.5 text-center">
            <p className="text-[10px] font-bold text-foreground">Textiles</p>
            <p className="text-[8px] text-muted-foreground">Canvas Totes</p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card p-1.5 text-center">
            <p className="text-[10px] font-bold text-foreground">Botanicals</p>
            <p className="text-[8px] text-muted-foreground">Indoor Planters</p>
          </div>
        </div>
      </div>

      {/* Layout Tag Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <LayoutTemplate className="size-3 text-primary" />
          Active Architecture: Split Hero + 3-Block Category Showcase
        </span>
        <span className="font-semibold text-primary">Responsive 12-Col</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 04: Promotional Sections
// ---------------------------------------------------------------------------
function StorefrontStep4Promo() {
  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full min-h-0 gap-2.5">
      {/* Top Floating Marquee Banner */}
      <div className="flex items-center justify-between rounded-lg bg-primary px-3 py-1.5 text-[10px] font-bold text-white shadow-xs [background-image:var(--brand-gradient)]">
        <span className="flex items-center gap-1.5">
          <Zap className="size-3" />
          FLASH SPRING SALE: 20% OFF SITEWIDE
        </span>
        <span className="rounded-xs bg-white/20 px-1.5 py-0.2 font-mono text-[9px]">
          CODE: NOKSHI20
        </span>
      </div>

      {/* Limited Time Offer Card with Countdown */}
      <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5 sm:p-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block rounded-xs bg-rose-500/20 px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Limited-Time Deal
            </span>
            <h4 className="font-heading text-xs sm:text-sm font-extrabold text-foreground mt-0.5">
              Spring Pottery Bundle Deal
            </h4>
            <p className="text-[10px] text-muted-foreground">
              Buy 2 handcrafted clay mugs, get 20% off plus free shipping across Dhaka.
            </p>
          </div>
          {/* Countdown Clock */}
          <div className="flex items-center gap-1 text-center font-mono">
            <div className="rounded-md border border-border/70 bg-background px-1.5 py-1">
              <span className="block text-xs font-extrabold text-foreground">02</span>
              <span className="block text-[7px] text-muted-foreground uppercase">Days</span>
            </div>
            <span className="text-xs font-bold text-muted-foreground">:</span>
            <div className="rounded-md border border-border/70 bg-background px-1.5 py-1">
              <span className="block text-xs font-extrabold text-foreground">14</span>
              <span className="block text-[7px] text-muted-foreground uppercase">Hrs</span>
            </div>
            <span className="text-xs font-bold text-muted-foreground">:</span>
            <div className="rounded-md border border-border/70 bg-background px-1.5 py-1">
              <span className="block text-xs font-extrabold text-rose-600 dark:text-rose-400">36</span>
              <span className="block text-[7px] text-muted-foreground uppercase">Min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Product Cards */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        <div className="rounded-lg border border-border/70 bg-card p-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="rounded-xs bg-rose-500/15 px-1 py-0.2 text-[8px] font-bold text-rose-600 dark:text-rose-400">
              -20% OFF
            </span>
            <span className="text-[9px] font-mono text-muted-foreground line-through">৳ 1,700</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="size-10 shrink-0 overflow-hidden rounded bg-muted/60">
              <Image
                src="/products/ceramic-mug.svg"
                alt="Clay Mug Set"
                width={40}
                height={40}
                unoptimized
                className="size-full object-cover"
              />
            </div>
            <div>
              <p className="truncate text-[10px] font-bold text-foreground">Clay Mug Set (x2)</p>
              <p className="text-xs font-extrabold text-primary">৳ 1,360</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-card p-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="rounded-xs bg-amber-500/15 px-1 py-0.2 text-[8px] font-bold text-amber-700 dark:text-amber-400">
              SPECIAL COMBO
            </span>
            <span className="text-[9px] font-mono text-muted-foreground line-through">৳ 2,150</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="size-10 shrink-0 overflow-hidden rounded bg-muted/60">
              <Image
                src="/products/canvas-tote.svg"
                alt="Tote + Plant"
                width={40}
                height={40}
                unoptimized
                className="size-full object-cover"
              />
            </div>
            <div>
              <p className="truncate text-[10px] font-bold text-foreground">Tote & Planter</p>
              <p className="text-xs font-extrabold text-primary">৳ 1,650</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Ribbon */}
      <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px]">
        <div className="flex items-center gap-1.5 text-primary font-bold">
          <BadgePercent className="size-3.5" />
          <span>Coupon &apos;NOKSHI20&apos; auto-applied at checkout</span>
        </div>
        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
          Save 20%
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 05: Brand Styling
// ---------------------------------------------------------------------------
function StorefrontStep5Styling() {
  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full min-h-0 gap-2.5">
      {/* Palette Design Token Swatches */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
          Active Brand Palette: Emerald Artisan
        </p>
        <div className="grid grid-cols-4 gap-2 text-center text-[9px]">
          <div className="rounded-lg border border-border/60 bg-[#00976B] p-2 text-white shadow-2xs font-semibold">
            <div className="text-[10px] font-bold">Primary</div>
            <div className="opacity-80 font-mono mt-0.5">#00976B</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-[#064E3B] p-2 text-white shadow-2xs font-semibold">
            <div className="text-[10px] font-bold">Forest</div>
            <div className="opacity-80 font-mono mt-0.5">#064E3B</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-[#F7F5F0] p-2 text-zinc-900 shadow-2xs font-semibold">
            <div className="text-[10px] font-bold">Warm Sand</div>
            <div className="opacity-80 font-mono mt-0.5">#F7F5F0</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-[#FF6B4A] p-2 text-white shadow-2xs font-semibold">
            <div className="text-[10px] font-bold">Terracotta</div>
            <div className="opacity-80 font-mono mt-0.5">#FF6B4A</div>
          </div>
        </div>
      </div>

      {/* Live Themed Storefront Component */}
      <div className="rounded-xl border border-[#00976B]/40 bg-[#00976B]/5 p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#00976B]/20 pb-1.5">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-lg bg-[#00976B] text-[11px] font-bold text-white shadow-2xs">
              N
            </span>
            <span className="font-heading text-xs font-bold text-foreground">
              Nokshi Studio • Styled Theme
            </span>
          </div>
          <span className="rounded-full bg-[#00976B]/15 px-2 py-0.5 text-[9px] font-bold text-[#00976B]">
            Font: Hind Siliguri + Inter
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-3 items-center">
          <div>
            <h4 className="font-heading text-xs font-bold text-foreground">
              Clay Pour-Over Carafe
            </h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Natural unglazed terracotta finish with hand-brushed emerald lip.
            </p>
            <p className="mt-1 text-xs font-extrabold text-[#00976B]">
              ৳ 1,450 BDT
            </p>
          </div>
          <div className="space-y-1.5">
            <button
              type="button"
              className="w-full rounded-lg bg-[#00976B] py-1.5 text-center text-[10px] font-bold text-white shadow-xs hover:brightness-105"
            >
              Add to Basket (12px Radius)
            </button>
            <button
              type="button"
              className="w-full rounded-lg border border-[#00976B]/40 bg-transparent py-1 text-center text-[10px] font-semibold text-[#00976B]"
            >
              Secondary Outline
            </button>
          </div>
        </div>
      </div>

      {/* Typography Tokens Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Palette className="size-3 text-primary" />
          Corner Radius: 12px • Shadow: Soft Subtle • Typography: Inter + Hind Siliguri
        </span>
        <span className="font-semibold text-primary">Live CSS Tokens</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 06: Customer Feedback
// ---------------------------------------------------------------------------
function StorefrontStep6Feedback() {
  const reviews = [
    {
      name: "Farhan Ahmed",
      location: "Banani, Dhaka",
      verified: true,
      time: "2 days ago",
      comment:
        "The glazed ceramic mug arrived in pristine condition within 24 hours. The texture and glaze look even better in person. 10/10!",
    },
    {
      name: "Nusrat Jahan",
      location: "Chittagong",
      verified: true,
      time: "5 days ago",
      comment:
        "Heavy-duty organic canvas tote with clean stitching. Packed with biodegradable materials. Will definitely order again!",
    },
  ];

  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full min-h-0 gap-2.5">
      {/* Overall Score Summary */}
      <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 sm:p-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <span className="font-heading text-xl font-extrabold text-foreground">4.9</span>
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3 fill-amber-500 text-amber-500" />
              ))}
            </div>
          </div>
          <div className="border-l border-amber-500/30 pl-3">
            <p className="text-xs font-bold text-foreground">Customer Satisfaction</p>
            <p className="text-[10px] text-muted-foreground">
              Based on 184 verified orders across Bangladesh • 98% recommend
            </p>
          </div>
        </div>
        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[9px] font-bold text-amber-700 dark:text-amber-300">
          Top Rated Store
        </span>
      </div>

      {/* Real Customer Review Cards */}
      <div className="space-y-2 flex-1">
        {reviews.map((r) => (
          <div
            key={r.name}
            className="rounded-lg border border-border/70 bg-card p-2 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="grid size-5 place-items-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-foreground">{r.name}</span>
                  <span className="ml-1 text-[9px] text-muted-foreground">({r.location})</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-2.5" /> Verified
                </span>
                <span className="text-[9px] text-muted-foreground">• {r.time}</span>
              </div>
            </div>
            <p className="mt-1 text-[10px] leading-relaxed text-foreground/85 italic">
              &ldquo;{r.comment}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {/* Social Proof Trust Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Star className="size-3 text-amber-500 fill-amber-500" />
          Google Reviews & Facebook Ratings integrated with automatic sync
        </span>
        <span className="font-semibold text-primary">184 Reviews</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 07: Help & Support
// ---------------------------------------------------------------------------
function StorefrontStep7Support() {
  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full min-h-0 gap-2.5">
      {/* Support Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
        <div>
          <h4 className="font-heading text-xs font-bold text-foreground">
            Customer Care & Live Help Desk
          </h4>
          <p className="text-[10px] text-muted-foreground">
            Multi-channel support channels integrated directly on your storefront.
          </p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Agents Online
        </span>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center rounded-lg bg-emerald-600 text-white shadow-2xs">
              <MessageCircle className="size-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-foreground">WhatsApp Support</p>
              <p className="text-[9px] font-mono text-emerald-700 dark:text-emerald-300">
                +880 1712-345678
              </p>
            </div>
          </div>
          <p className="mt-1.5 text-[9px] text-muted-foreground">
            Average response: Under 2 mins • Direct customer chat
          </p>
        </div>

        <div className="rounded-lg border border-border/70 bg-card p-2.5 shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
              <Mail className="size-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-foreground">Help Desk Email</p>
              <p className="text-[9px] font-mono text-muted-foreground">
                support@nokshi.biponon.com
              </p>
            </div>
          </div>
          <p className="mt-1.5 text-[9px] text-muted-foreground">
            24/7 automated ticketing with SLA guarantee
          </p>
        </div>
      </div>

      {/* FAQ Drawer Preview */}
      <div className="space-y-1.5 rounded-lg border border-border/70 bg-card p-2.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Storefront FAQ Drawer Preview
        </p>
        <div className="space-y-1 text-[10px]">
          <div className="rounded-md border border-border/50 bg-muted/40 p-1.5">
            <p className="font-bold text-foreground">Q: How fast is delivery inside Dhaka?</p>
            <p className="text-muted-foreground mt-0.5">
              A: Standard delivery takes 24 to 48 hours via express courier.
            </p>
          </div>
          <div className="rounded-md border border-border/50 bg-muted/40 p-1.5">
            <p className="font-bold text-foreground">Q: What is your replacement policy?</p>
            <p className="text-muted-foreground mt-0.5">
              A: 7-day hassle-free replacement for any damaged pottery or goods.
            </p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Bubble Preview */}
      <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] text-emerald-700 dark:text-emerald-300">
        <span className="flex items-center gap-1.5 font-semibold">
          <MessageCircle className="size-3.5" />
          Live Floating WhatsApp Widget active on bottom-right corner of store
        </span>
        <span className="font-bold">Instant Connect</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 08: Delivery Setup
// ---------------------------------------------------------------------------
function StorefrontStep8Delivery() {
  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full min-h-0 gap-2.5">
      {/* Shipping Zones */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Configured Delivery Zones
          </p>
          <span className="text-[9px] font-bold text-primary">All BD Divisions Covered</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-primary/40 bg-primary/5 p-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-foreground">Inside Dhaka</span>
              <span className="text-xs font-extrabold text-primary">৳ 60</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Next-day delivery (24h) via Pathao Express
            </p>
            <div className="mt-1 flex items-center gap-1 text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-2.5" /> Auto Parcel Creation
            </div>
          </div>

          <div className="rounded-lg border border-border/70 bg-card p-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-foreground">Nationwide</span>
              <span className="text-xs font-extrabold text-foreground">৳ 120</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              48–72 hours across all 64 districts
            </p>
            <div className="mt-1 flex items-center gap-1 text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-2.5" /> Steadfast & RedX API
            </div>
          </div>
        </div>
      </div>

      {/* Free Delivery Threshold Incentive */}
      <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-2.5 sm:p-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-foreground">Free Delivery Threshold</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">Orders Over ৳ 2,000</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Cart progress indicator nudges shoppers to increase basket value:
        </p>
        <div className="mt-2 h-1.5 w-full rounded-full bg-blue-500/20 overflow-hidden">
          <div className="h-full bg-blue-600 dark:bg-blue-400 w-3/4 rounded-full" />
        </div>
        <div className="mt-1 flex items-center justify-between text-[9px] font-medium text-muted-foreground">
          <span>Current cart: ৳ 1,500</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">Add ৳ 500 for Free Shipping!</span>
        </div>
      </div>

      {/* Integrated Courier Badges */}
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Connected Logistics Partners
        </p>
        <div className="flex items-center gap-2 text-[10px] font-medium">
          <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-foreground">
            Pathao Express
          </span>
          <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-foreground">
            Steadfast Courier
          </span>
          <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-foreground">
            RedX Logistics
          </span>
        </div>
      </div>

      {/* Live Tracking Status */}
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Truck className="size-3 text-primary" />
          Automated SMS tracking link sent to customers on dispatch
        </span>
        <span className="font-semibold text-primary">Live API</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 09: Payment Setup
// ---------------------------------------------------------------------------
function StorefrontStep9Payment() {
  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full min-h-0 gap-2.5">
      {/* Checkout Screen Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
        <div>
          <h4 className="font-heading text-xs font-bold text-foreground">
            Customer Checkout & Payment Gateways
          </h4>
          <p className="text-[10px] text-muted-foreground">
            Seamless multi-gateway payment interface for Bangladeshi shoppers.
          </p>
        </div>
        <span className="flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
          <Lock className="size-2.5" /> 256-Bit SSL Secured
        </span>
      </div>

      {/* Order Summary Strip */}
      <div className="rounded-lg border border-border/70 bg-card p-2 text-[10px]">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Glazed Ceramic Mug (x1)</span>
          <span className="font-mono text-foreground font-semibold">৳ 850</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground mt-0.5">
          <span>Delivery (Inside Dhaka)</span>
          <span className="font-mono text-foreground font-semibold">৳ 60</span>
        </div>
        <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mt-0.5">
          <span>Coupon (NOKSHI20)</span>
          <span className="font-mono font-bold">-৳ 170</span>
        </div>
        <div className="mt-1 flex items-center justify-between border-t border-border/60 pt-1 text-xs font-bold">
          <span className="text-foreground">Total Payable</span>
          <span className="font-mono text-primary text-sm">৳ 740 BDT</span>
        </div>
      </div>

      {/* Payment Gateway Options */}
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Select Payment Method
        </p>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          {/* bKash (Selected) */}
          <div className="rounded-lg border-2 border-primary bg-primary/5 p-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">bKash Payment</span>
              <span className="grid size-3.5 place-items-center rounded-full bg-primary text-[8px] font-bold text-white">
                ✓
              </span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Instant OTP checkout • 5% Cashback offer
            </p>
          </div>

          {/* Nagad */}
          <div className="rounded-lg border border-border/70 bg-card p-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">Nagad Wallet</span>
              <span className="size-3 rounded-full border border-border" />
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Zero convenience fee • Fast settlement
            </p>
          </div>

          {/* Cards */}
          <div className="rounded-lg border border-border/70 bg-card p-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">Cards (Visa/MC)</span>
              <span className="size-3 rounded-full border border-border" />
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Debit & credit cards via SSLCommerz
            </p>
          </div>

          {/* Cash on Delivery */}
          <div className="rounded-lg border border-border/70 bg-card p-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">Cash on Delivery</span>
              <span className="size-3 rounded-full border border-border" />
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Pay ৳ 740 when parcel is delivered
            </p>
          </div>
        </div>
      </div>

      {/* Settlement Guarantee Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CreditCard className="size-3 text-primary" />
          Automated T+1 daily settlement directly to your local bank account
        </span>
        <span className="font-semibold text-primary">0% Hidden Fees</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 10: Final Review & Celebratory Pre-Launch Modal
// ---------------------------------------------------------------------------
function StorefrontStep10Review() {
  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full min-h-0 gap-2.5">
      {/* Complete Polished Storefront Header */}
      <div className="flex items-center justify-between rounded-lg border border-border/70 bg-card px-3 py-1.5 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-lg bg-primary text-[10px] font-bold text-white shadow-2xs [background-image:var(--brand-gradient)]">
            N
          </span>
          <div>
            <span className="font-heading text-xs font-bold text-foreground">Nokshi Studio</span>
            <span className="ml-1.5 rounded-xs bg-emerald-500/15 px-1 py-0.2 text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
              Live Ready
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
          <span className="text-foreground font-semibold">Storefront</span>
          <span>Catalog (12)</span>
          <span>Cart (1)</span>
        </div>
      </div>

      {/* Celebratory Launch Pre-Flight Card */}
      <div className="rounded-xl border border-primary/40 bg-gradient-to-br from-primary/15 via-background to-emerald-500/10 p-3 sm:p-3.5 text-center shadow-xs">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white shadow-xs [background-image:var(--brand-gradient)]">
          <Rocket className="size-3" />
          STORE 100% READY TO PUBLISH
        </div>

        <h3 className="font-heading mt-2 text-xs sm:text-sm font-extrabold text-foreground">
          Congratulations! Nokshi Studio is Launch-Ready.
        </h3>
        <p className="mt-0.5 text-[10px] text-muted-foreground max-w-md mx-auto">
          All 10 setup stages have been verified and linked. Your store is primed to receive visitors and accept orders.
        </p>

        {/* 6-Grid Pre-Flight Checklist */}
        <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-left text-[9px] sm:text-[10px]">
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background/80 p-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3 shrink-0" />
            <span className="truncate text-foreground font-medium">Store Identity</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background/80 p-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3 shrink-0" />
            <span className="truncate text-foreground font-medium">Product Catalog</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background/80 p-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3 shrink-0" />
            <span className="truncate text-foreground font-medium">Promo Banners</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background/80 p-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3 shrink-0" />
            <span className="truncate text-foreground font-medium">Brand Styling</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background/80 p-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3 shrink-0" />
            <span className="truncate text-foreground font-medium">Shipping Zones</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background/80 p-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3 shrink-0" />
            <span className="truncate text-foreground font-medium">bKash & Payments</span>
          </div>
        </div>

        {/* Big Launch CTA */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/create-website" />}
            className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs [background-image:var(--brand-gradient)] hover:brightness-105"
          >
            <span>Launch Live Storefront</span>
            <ArrowRight className="size-3.5 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* Production Domain Badge */}
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5 font-medium">
          <Globe className="size-3 text-primary" />
          Production URL: <strong className="text-foreground">nokshi.biponon.com</strong>
        </span>
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          SSL Active
        </span>
      </div>
    </div>
  );
}

// ===========================================================================
// RIGHT PANEL: Customization Inspector Component
// ===========================================================================
function CustomizationInspector({ activeStep }: { activeStep: number }) {
  switch (activeStep) {
    case 0: // Store Identity
      return (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Store Name
            </label>
            <div className="mt-1 rounded-lg border border-border/70 bg-background px-2.5 py-1.5 text-xs font-bold text-foreground">
              Nokshi Studio
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Subdomain URL
            </label>
            <div className="mt-1 flex items-center justify-between rounded-lg border border-border/70 bg-background px-2.5 py-1.5 text-xs text-foreground">
              <span>nokshi.biponon.com</span>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded-xs">
                Active
              </span>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Brand Monogram
            </label>
            <div className="mt-1 flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-lg bg-primary text-sm font-bold text-white shadow-2xs [background-image:var(--brand-gradient)]">
                N
              </span>
              <span className="text-[10px] text-muted-foreground">
                Vector monogram uploaded & verified
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-2 text-[10px] text-emerald-700 dark:text-emerald-300">
            ✓ Store header identity synchronized with live subdomain.
          </div>
        </div>
      );

    case 1: // Product Catalog
      return (
        <div className="space-y-3">
          <div className="rounded-lg border border-border/60 bg-background p-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              Catalog Metrics
            </p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">12 Total Products</span>
              <span className="text-[10px] font-semibold text-primary">4 Active on Display</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Categories
            </label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                Clayware (5)
              </span>
              <span className="rounded-md border border-border/60 bg-background px-2 py-0.5 text-[10px] text-foreground">
                Totes (4)
              </span>
              <span className="rounded-md border border-border/60 bg-background px-2 py-0.5 text-[10px] text-foreground">
                Plants (3)
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-2 text-[10px] text-emerald-700 dark:text-emerald-300">
            ✓ Stock tracking enabled with automated alerts under 5 units.
          </div>
        </div>
      );

    case 2: // Homepage Layout
      return (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Layout Structure
            </label>
            <div className="mt-1 space-y-1.5">
              <div className="flex items-center justify-between rounded-lg border border-primary/40 bg-primary/10 p-2 text-xs font-semibold text-primary">
                <span>Split Hero + Curated Grid</span>
                <Check className="size-3" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background p-2 text-xs text-muted-foreground">
                <span>Fullwidth Minimal Showcase</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Grid Density
            </label>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              <div className="rounded-lg border border-primary/40 bg-primary/10 p-1.5 text-center text-[10px] font-bold text-primary">
                4-Col Desktop
              </div>
              <div className="rounded-lg border border-border/60 bg-background p-1.5 text-center text-[10px] text-muted-foreground">
                2-Col Mobile
              </div>
            </div>
          </div>
        </div>
      );

    case 3: // Promotional Sections
      return (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Promo Banner State
            </label>
            <div className="mt-1 flex items-center justify-between rounded-lg border border-border/60 bg-background p-2 text-xs">
              <span className="font-semibold text-foreground">Top Marquee Ticker</span>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded-xs">
                Enabled
              </span>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Active Coupon
            </label>
            <div className="mt-1 rounded-lg border border-primary/30 bg-primary/5 p-2 text-xs font-mono font-bold text-primary">
              NOKSHI20 (20% Off)
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Countdown Urgency
            </label>
            <div className="mt-1 text-[10px] text-muted-foreground">
              Flash timer active • Auto-expires in 02d : 14h : 36m
            </div>
          </div>
        </div>
      );

    case 4: // Brand Styling
      return (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Primary Brand Accent
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="size-6 rounded-full bg-[#00976B] ring-2 ring-primary ring-offset-2 flex items-center justify-center text-white text-[10px]">
                ✓
              </div>
              <div className="size-6 rounded-full bg-[#2563EB] opacity-60" />
              <div className="size-6 rounded-full bg-[#7C3AED] opacity-60" />
              <div className="size-6 rounded-full bg-[#EA580C] opacity-60" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Typography Pair
            </label>
            <div className="mt-1 rounded-lg border border-border/60 bg-background p-2 text-xs font-semibold text-foreground">
              Hind Siliguri + Inter
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Corner Radius
            </label>
            <div className="mt-1 text-xs text-muted-foreground font-mono">
              Rounded (12px)
            </div>
          </div>
        </div>
      );

    case 5: // Customer Feedback
      return (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Reviews Integration
            </label>
            <div className="mt-1 rounded-lg border border-border/60 bg-background p-2 text-xs">
              <div className="flex items-center justify-between font-semibold">
                <span>Verified Buyer Widget</span>
                <span className="text-primary text-[10px]">Active</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Display Filter
            </label>
            <div className="mt-1 rounded-lg border border-border/60 bg-background p-2 text-[10px] text-muted-foreground">
              Showing 4★ & 5★ reviews automatically
            </div>
          </div>
          <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 p-2 text-[10px] text-amber-700 dark:text-amber-300">
            ★ Social proof increases checkout conversion by up to 34%.
          </div>
        </div>
      );

    case 6: // Help & Support
      return (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              WhatsApp Integration
            </label>
            <div className="mt-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              +880 1712-345678 (Connected)
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Floating Widget
            </label>
            <div className="mt-1 rounded-lg border border-border/60 bg-background p-2 text-xs text-muted-foreground">
              Bottom Right corner with greeting popup
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              FAQ Accordion
            </label>
            <div className="mt-1 text-[10px] text-muted-foreground">
              2 shipping and returns questions active
            </div>
          </div>
        </div>
      );

    case 7: // Delivery Setup
      return (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Shipping Rates
            </label>
            <div className="mt-1 space-y-1 text-xs">
              <div className="flex justify-between rounded-md border border-border/60 bg-background p-1.5">
                <span>Inside Dhaka</span>
                <span className="font-bold text-foreground">৳ 60 (24h)</span>
              </div>
              <div className="flex justify-between rounded-md border border-border/60 bg-background p-1.5">
                <span>Nationwide</span>
                <span className="font-bold text-foreground">৳ 120 (48h)</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Free Delivery Rule
            </label>
            <div className="mt-1 rounded-lg border border-primary/30 bg-primary/5 p-2 text-xs font-bold text-primary">
              Orders Over ৳ 2,000
            </div>
          </div>
        </div>
      );

    case 8: // Payment Setup
      return (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Active Gateways
            </label>
            <div className="mt-1 space-y-1.5 text-xs">
              <div className="flex items-center justify-between rounded-md border border-border/60 bg-background p-2">
                <span className="font-semibold text-foreground">bKash & Nagad</span>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded-xs">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/60 bg-background p-2">
                <span className="font-semibold text-foreground">Cards (Visa/MC)</span>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded-xs">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/60 bg-background p-2">
                <span className="font-semibold text-foreground">Cash on Delivery</span>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded-xs">
                  Active
                </span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground">
            Daily T+1 automated bank settlement enabled.
          </div>
        </div>
      );

    case 9: // Final Review
      return (
        <div className="space-y-3">
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-2.5">
            <p className="text-[10px] font-bold text-primary uppercase">
              Pre-Launch Checklist
            </p>
            <div className="mt-2 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                <span>Storefront Design</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                <span>Catalog & Stock (12 Items)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                <span>Shipping Zones Configured</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                <span>Payment Gateways Live</span>
              </div>
            </div>
          </div>

          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/create-website" />}
            className="w-full h-10 rounded-xl bg-primary text-xs font-bold text-white shadow-xs [background-image:var(--brand-gradient)] hover:brightness-105"
          >
            <span>Publish Storefront</span>
            <Rocket className="size-3.5 ml-1.5" />
          </Button>
        </div>
      );

    default:
      return null;
  }
}
