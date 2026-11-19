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
  Check,
  Clock,
  Lock,
  Plus,
  Search,
  ShoppingCart,
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

interface StepItem {
  id: string;
  number: string;
  titleKey: string;
  descKey: string;
  fallbackTitle: string;
  fallbackDesc: string;
}

const STEPS_DATA: StepItem[] = [
  {
    id: "account",
    number: "01",
    titleKey: "howItWorks.steps.step1.title",
    descKey: "howItWorks.steps.step1.description",
    fallbackTitle: "Set Up Your Account",
    fallbackDesc:
      "Create your Biponon account and get your business workspace ready. Start without unnecessary setup or complicated processes.",
  },
  {
    id: "products",
    number: "02",
    titleKey: "howItWorks.steps.step2.title",
    descKey: "howItWorks.steps.step2.description",
    fallbackTitle: "Add Your Products",
    fallbackDesc:
      "Showcase your products by adding images, descriptions, prices, and available stock.",
  },
  {
    id: "storefront",
    number: "03",
    titleKey: "howItWorks.steps.step3.title",
    descKey: "howItWorks.steps.step3.description",
    fallbackTitle: "Build Your Storefront",
    fallbackDesc:
      "Choose a visual style, customize your storefront, and preview how your store looks before publishing.",
  },
  {
    id: "launch",
    number: "04",
    titleKey: "howItWorks.steps.step4.title",
    descKey: "howItWorks.steps.step4.description",
    fallbackTitle: "Launch and Start Selling",
    fallbackDesc:
      "Publish your store, share its link with customers, and manage incoming orders from your dashboard.",
  },
];

export function HowItWorksSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, 0.1);
  const reducedMotion = useReducedMotion();

  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const STEP_DURATION = 3500; // 3.5 seconds per step

  // Precise timing refs for hover pause & resume
  const remainingTimeRef = useRef(STEP_DURATION);
  const startTimeRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle manual step selection
  const handleSelectStep = useCallback((index: number) => {
    setActiveStep(index);
    remainingTimeRef.current = STEP_DURATION;
    startTimeRef.current = Date.now();
    setResetKey((k) => k + 1);
  }, []);

  // Reliable step progression loop
  useEffect(() => {
    // If not in view or user prefers reduced motion, disable auto timer
    if (!isInView || reducedMotion) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // When hovered: pause timer and capture remaining duration
    if (isHovered) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(500, remainingTimeRef.current - elapsed);
      return;
    }

    // Active progression: run timer for the remaining duration
    startTimeRef.current = Date.now();
    const duration = remainingTimeRef.current;

    timerRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % STEPS_DATA.length);
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

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      aria-label="How Biponon works"
      className="relative isolate w-full px-4 pt-16 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-xs backdrop-blur-sm dark:border-primary/25 dark:bg-primary/15">
            <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary" />
            {t("howItWorks.badge")}
          </span>

          <h2 className="font-heading mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="block">
              {t("howItWorks.headingLine1")}
            </span>
            <span className="brand-gradient-text inline">
              {t("howItWorks.headingGradient")}
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
            {t("howItWorks.description")}
          </p>
        </div>

        {/* Main 2-Column Walkthrough Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10 xl:gap-14"
        >
          {/* Left Column: 4 Vertically Stacked Steps */}
          <div className="flex flex-col gap-3.5 lg:col-span-5">
            {STEPS_DATA.map((step, index) => {
              const isActive = activeStep === index;
              const title = t(step.titleKey) || step.fallbackTitle;
              const desc = t(step.descKey) || step.fallbackDesc;

              return (
                <div
                  key={step.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectStep(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectStep(index);
                    }
                  }}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border text-left p-5 transition-all duration-300 outline-none cursor-pointer select-none",
                    isActive
                      ? "border-primary/50 bg-card shadow-md dark:border-primary/40 dark:bg-card/90 ring-1 ring-primary/25 scale-[1.01]"
                      : "border-border/60 bg-card/40 opacity-75 hover:opacity-100 hover:border-border dark:border-white/10 dark:bg-card/30"
                  )}
                >
                  {/* Subtle active progress bar */}
                  {isActive && !reducedMotion && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 w-full bg-muted overflow-hidden">
                      <div
                        key={`progress-${activeStep}-${resetKey}`}
                        className="h-full [background-image:var(--brand-gradient)]"
                        style={{
                          animation: `howItWorksProgress ${STEP_DURATION}ms linear forwards`,
                          animationPlayState: isHovered ? "paused" : "running",
                        }}
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Step Number Badge */}
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors duration-300",
                        isActive
                          ? "bg-primary text-white shadow-xs [background-image:var(--brand-gradient)]"
                          : "bg-muted text-muted-foreground dark:bg-white/5"
                      )}
                    >
                      {step.number}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={cn(
                          "font-heading text-base sm:text-lg font-bold tracking-tight transition-colors duration-200",
                          isActive
                            ? "text-foreground"
                            : "text-foreground/80 hover:text-foreground"
                        )}
                      >
                        {title}
                      </h3>

                      <p
                        className={cn(
                          "mt-1.5 text-xs sm:text-sm leading-relaxed transition-colors duration-200",
                          isActive
                            ? "text-muted-foreground"
                            : "text-muted-foreground/75"
                        )}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: One Shared Dynamic Store Preview */}
          <div className="relative flex flex-col w-full lg:col-span-7 lg:h-full">
            {/* Subtle atmospheric ambient glow behind preview */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-50 blur-2xl dark:opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at center, color-mix(in srgb, var(--brand-primary) 18%, transparent), transparent 70%)",
              }}
            />

            {/* Browser Frame */}
            <div className="flex flex-col flex-1 h-full w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_20px_50px_-20px_rgba(15,23,42,0.2),0_1px_3px_rgba(0,0,0,0.05)] ring-1 ring-black/5 dark:border-white/10 dark:bg-card/95 dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] dark:ring-white/10">
              {/* Browser Top Navigation Bar */}
              <div className="relative flex shrink-0 items-center justify-between border-b border-border/70 bg-muted/60 px-4 py-2.5 dark:bg-white/5">
                {/* 3 browser dots */}
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-foreground/15 dark:bg-white/20" />
                  <span className="size-2.5 rounded-full bg-foreground/15 dark:bg-white/20" />
                  <span className="size-2.5 rounded-full bg-foreground/15 dark:bg-white/20" />
                </div>

                {/* Centered URL bar */}
                <div className="flex items-center justify-center gap-1.5 rounded-md border border-border/70 bg-background/80 px-3 py-1 shadow-2xs backdrop-blur-xs">
                  <Lock className="size-2.5 shrink-0 text-primary" />
                  <span className="truncate text-[10px] font-medium text-muted-foreground">
                    {activeStep === 0 && "nokshi.biponon.com/setup"}
                    {activeStep === 1 && "nokshi.biponon.com/admin/products"}
                    {activeStep === 2 && "nokshi.biponon.com"}
                    {activeStep === 3 && "nokshi.biponon.com/admin/orders"}
                  </span>
                </div>

                {/* Stage tag */}
                <div className="flex items-center gap-1.5 text-[9px] font-semibold text-primary">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  <span>Step 0{activeStep + 1}</span>
                </div>
              </div>

              {/* Dynamic Content Body (Changes based on activeStep) */}
              <div className="relative flex flex-1 flex-col w-full overflow-hidden bg-background p-4 sm:p-5 lg:p-6 min-h-[440px] lg:min-h-0">
                <div key={activeStep} className="flex flex-1 flex-col h-full w-full min-h-0 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                  {activeStep === 0 && <Step1AccountSetup />}
                  {activeStep === 1 && <Step2AddProducts />}
                  {activeStep === 2 && <Step3StorefrontDesign />}
                  {activeStep === 3 && <Step4LaunchAndOrders />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/create-website" />}
            className="group relative h-12 overflow-hidden rounded-xl bg-primary px-8 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(0,151,107,0.7)] [background-image:var(--brand-gradient)] transition-all duration-200 hover:shadow-[0_18px_36px_-12px_rgba(0,151,107,0.85)] hover:brightness-105 active:scale-[0.99]"
          >
            <span>{t("howItWorks.cta")}</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// PREVIEW 1: Step 01 — Account Setup
// ===========================================================================
function Step1AccountSetup() {
  const checklist = [
    {
      title: "Store Workspace Created",
      sub: "nokshi.biponon.com initialized",
      done: true,
    },
    {
      title: "Currency & Region Configured",
      sub: "Bangladeshi Taka (BDT ৳) & Nationwide Dispatch",
      done: true,
    },
    {
      title: "SSL Security Certificate",
      sub: "Auto-provisioned with 256-bit encryption",
      done: true,
    },
    {
      title: "Owner Identity & Verification",
      sub: "Admin rights confirmed for Farhan Ahmed",
      done: true,
    },
  ];

  return (
    <div className="flex h-full flex-1 flex-col justify-between gap-4">
      {/* Workspace Header */}
      <div className="flex flex-col gap-3 sm:gap-3.5">
        <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/40 p-3.5 dark:bg-card/70">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-base font-bold text-white [background-image:var(--brand-gradient)] shadow-xs">
              N
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading text-sm font-bold text-foreground">
                  Nokshi Studio
                </h4>
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[9px] font-semibold text-primary">
                  <span className="size-1 rounded-full bg-primary" />
                  Workspace Ready
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Store ID: #BPN-2026 • Starter Plan Active
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
            <Check className="size-3" />
            100% Set Up
          </span>
        </div>

        {/* Onboarding Checklist */}
        <div className="space-y-2 sm:space-y-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Onboarding Verification
          </p>
          {checklist.map((item, idx) => (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-background/90 p-2.5 sm:p-3 dark:bg-card/50"
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="grid size-5 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                </div>
              </div>
              <span className="text-[9px] font-semibold text-primary">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Notification */}
      <div className="rounded-xl border border-primary/20 bg-primary/10 p-3 sm:p-3.5 text-center text-xs font-medium text-primary dark:bg-primary/15">
        🎉 Setup complete! You are ready to start listing your first products.
      </div>
    </div>
  );
}

// ===========================================================================
// PREVIEW 2: Step 02 — Product Addition
// ===========================================================================
function Step2AddProducts() {
  const products = [
    {
      name: "Everyday Ceramic Mug",
      sku: "SKU-MUG-01",
      category: "Home & Pottery",
      price: "৳ 850",
      stock: "35 in stock",
      image: "/products/ceramic-mug.svg",
    },
    {
      name: "Canvas Tote Bag",
      sku: "SKU-TOT-02",
      category: "Accessories",
      price: "৳ 1,200",
      stock: "22 in stock",
      image: "/products/canvas-tote.svg",
    },
    {
      name: "Studio Headphones",
      sku: "SKU-AUD-03",
      category: "Electronics",
      price: "৳ 4,500",
      stock: "14 in stock",
      image: "/products/studio-headphones.svg",
    },
    {
      name: "Fiddle Leaf Plant",
      sku: "SKU-PLN-04",
      category: "Indoor Plants",
      price: "৳ 950",
      stock: "18 in stock",
      image: "/products/fiddle-leaf-plant.svg",
    },
  ];

  return (
    <div className="flex h-full flex-1 flex-col justify-between gap-4">
      <div className="flex flex-col gap-3">
        {/* Catalog Control Bar */}
        <div className="flex items-center justify-between border-b border-border/70 pb-3">
          <div className="flex items-center gap-2">
            <h4 className="font-heading text-sm font-bold text-foreground">
              Product Inventory
            </h4>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              4 Listed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-[10px] text-muted-foreground">
              <Search className="size-3" />
              <span>Search catalog...</span>
            </div>
            <span className="flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-[10px] font-semibold text-white [background-image:var(--brand-gradient)] shadow-xs">
              <Plus className="size-3" />
              Add Product
            </span>
          </div>
        </div>

        {/* Product Items List */}
        <div className="space-y-2 sm:space-y-2.5">
          {products.map((prod, idx) => (
            <div
              key={prod.sku}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-background/90 p-2.5 sm:p-3 transition-all hover:border-primary/40 dark:bg-card/70"
              style={{
                animationDelay: `${idx * 80}ms`,
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-11 sm:size-12 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted/60">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    width={48}
                    height={48}
                    unoptimized
                    className="size-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-foreground">
                    {prod.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {prod.category} • {prod.sku}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-primary">{prod.price}</p>
                <span className="inline-block rounded-xs bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {prod.stock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog Status Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/40 px-3 py-2.5 text-[10px] text-muted-foreground dark:bg-card/40">
        <span>Inventory status: Healthy</span>
        <span className="font-semibold text-primary">All products active</span>
      </div>
    </div>
  );
}

// ===========================================================================
// PREVIEW 3: Step 03 — Storefront Design
// ===========================================================================
function Step3StorefrontDesign() {
  const storeProducts = [
    {
      name: "Everyday Ceramic Mug",
      price: "৳ 850",
      image: "/products/ceramic-mug.svg",
    },
    {
      name: "Canvas Tote Bag",
      price: "৳ 1,200",
      image: "/products/canvas-tote.svg",
    },
    {
      name: "Studio Headphones",
      price: "৳ 4,500",
      image: "/products/studio-headphones.svg",
    },
    {
      name: "Fiddle Leaf Plant",
      price: "৳ 950",
      image: "/products/fiddle-leaf-plant.svg",
    },
  ];

  return (
    <div className="flex h-full flex-1 flex-col justify-between gap-2.5 sm:gap-3 min-h-0 overflow-hidden">
      <div className="flex flex-col gap-2 sm:gap-2.5 min-h-0">
        {/* Storefront Mini Nav */}
        <div className="flex items-center justify-between border-b border-border/70 pb-2">
          <div className="flex items-center gap-2">
            <span className="grid size-5 sm:size-6 place-items-center rounded-lg bg-primary text-[9px] sm:text-[10px] font-bold text-white">
              N
            </span>
            <span className="font-heading text-xs font-bold text-foreground">
              Nokshi Studio
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[10px] font-medium text-muted-foreground">
            <span className="font-semibold text-foreground">Shop</span>
            <span>New In</span>
            <span>Story</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Search className="size-3" />
            <span className="relative">
              <ShoppingCart className="size-3" />
              <span className="absolute -right-1 -top-1 grid size-2.5 place-items-center rounded-full bg-primary text-[6px] font-bold text-white">
                2
              </span>
            </span>
          </div>
        </div>

        {/* Promo Hero Banner inside Preview */}
        <div className="rounded-lg border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-center dark:bg-primary/15">
          <p className="text-[9px] sm:text-[10px] font-bold text-primary truncate">
            Handcrafted for Everyday Living • Free Shipping Over ৳ 2,000
          </p>
        </div>

        {/* Live Storefront Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 min-h-0">
          {storeProducts.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-lg sm:rounded-xl border border-border/70 bg-card p-1.5 sm:p-2 shadow-2xs transition-all hover:border-primary/40"
            >
              <div className="h-16 sm:h-20 w-full overflow-hidden rounded-md sm:rounded-lg bg-muted/60">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={140}
                  height={80}
                  unoptimized
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-1.5 flex flex-1 flex-col justify-between">
                <p className="truncate text-[10px] sm:text-[11px] font-semibold text-foreground">
                  {p.name}
                </p>
                <div className="mt-0.5 flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-bold text-primary">
                    {p.price}
                  </span>
                  <span className="grid size-3.5 sm:size-4 place-items-center rounded-full bg-primary/10 text-[9px] sm:text-[10px] font-bold text-primary">
                    +
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Control Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/40 px-3 py-1.5 text-[9px] sm:text-[10px] text-muted-foreground dark:bg-card/40">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-primary" />
          Theme: Emerald Minimal
        </span>
        <span className="font-semibold text-primary">Live Storefront Ready</span>
      </div>
    </div>
  );
}

// ===========================================================================
// PREVIEW 4: Step 04 — First Orders & Management
// ===========================================================================
function Step4LaunchAndOrders() {
  const recentOrders = [
    {
      id: "#BPN-2041",
      customer: "Farhan Ahmed",
      location: "Banani, Dhaka",
      items: "2x Ceramic Mug",
      amount: "৳ 1,700",
      status: "Completed",
      badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "#BPN-2042",
      customer: "Tahmina Akter",
      location: "Dhanmondi, Dhaka",
      items: "1x Canvas Tote Bag",
      amount: "৳ 1,200",
      status: "Processing",
      badge: "bg-primary/15 text-primary",
    },
    {
      id: "#BPN-2043",
      customer: "Tanvir Hasan",
      location: "Uttara, Dhaka",
      items: "1x Studio Headphones",
      amount: "৳ 4,500",
      status: "Dispatched",
      badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="flex h-full flex-1 flex-col justify-between gap-4">
      <div className="flex flex-col gap-3">
        {/* Orders Header & Live Stats */}
        <div className="border-b border-border/70 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">
                Orders & Fulfillment
              </h4>
              <p className="text-[10px] text-muted-foreground">
                Live stream of incoming customer purchases
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              Live Orders
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-border/50 bg-background/80 p-2 sm:p-2.5 dark:bg-card/70">
              <p className="text-[9px] text-muted-foreground">Today&apos;s Revenue</p>
              <p className="text-xs sm:text-sm font-bold text-foreground">৳ 7,400</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-background/80 p-2 sm:p-2.5 dark:bg-card/70">
              <p className="text-[9px] text-muted-foreground">Orders Today</p>
              <p className="text-xs sm:text-sm font-bold text-primary">3 New</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-background/80 p-2 sm:p-2.5 dark:bg-card/70">
              <p className="text-[9px] text-muted-foreground">Fulfillment</p>
              <p className="text-xs sm:text-sm font-bold text-foreground">100%</p>
            </div>
          </div>
        </div>

        {/* Live Orders Table */}
        <div className="space-y-2 sm:space-y-2.5">
          {recentOrders.map((ord, idx) => (
            <div
              key={ord.id}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-background/90 p-2.5 sm:p-3 transition-all hover:border-primary/40 dark:bg-card/70"
              style={{
                animationDelay: `${idx * 80}ms`,
              }}
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-xs font-bold text-foreground">
                    {ord.customer}
                  </p>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {ord.id}
                  </span>
                </div>
                <p className="truncate text-[10px] text-muted-foreground">
                  {ord.items} • {ord.location}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-foreground">{ord.amount}</p>
                <span
                  className={`inline-block rounded-xs px-1.5 py-0.5 text-[9px] font-semibold ${ord.badge}`}
                >
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker Activity */}
      <div className="flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 px-3.5 py-2.5 text-[10px] font-medium text-primary dark:bg-primary/15">
        <Clock className="size-3 shrink-0" />
        <span className="truncate">
          Payment confirmed via bKash for Order #BPN-2043 • Dispatching soon
        </span>
      </div>
    </div>
  );
}
