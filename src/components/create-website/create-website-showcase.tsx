"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FocusEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleCheck,
  Globe,
  ImagePlus,
  LayoutTemplate,
  Lock,
  Palette,
  Rocket,
  ShoppingBag,
  Store,
  TrendingUp,
} from "lucide-react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const SCENE_DURATION = 4800;

const products = [
  { name: "Ceramic Mug", price: "$24", image: "/products/ceramic-mug.svg" },
  { name: "Canvas Tote", price: "$38", image: "/products/canvas-tote.svg" },
  {
    name: "Headphones",
    price: "$89",
    image: "/products/studio-headphones.svg",
  },
];

const templates = [
  {
    name: "Natural",
    background: "#F9F7F1",
    accent: "#2D4A3E",
    headline: "Handcrafted calm.",
  },
  {
    name: "Sakura",
    background: "#FFF5F7",
    accent: "#E11D48",
    headline: "Glow, naturally.",
  },
  {
    name: "Minimal",
    background: "#FAFAFA",
    accent: "#0F172A",
    headline: "Pure performance.",
  },
  {
    name: "Bold",
    background: "#0E0E12",
    accent: "#F59E0B",
    headline: "Built for impact.",
  },
];

const brandColors = ["#00976B", "#0F766E", "#E11D48", "#F59E0B"];

interface Scene {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
  render: () => ReactNode;
}

const scenes: Scene[] = [
  {
    id: "create-store",
    number: "01",
    label: "Create Your Store",
    shortLabel: "Create",
    render: () => <CreateStoreScene />,
  },
  {
    id: "customize-design",
    number: "02",
    label: "Customize Your Design",
    shortLabel: "Customize",
    render: () => <CustomizeScene />,
  },
  {
    id: "launch-business",
    number: "03",
    label: "Launch Your Business",
    shortLabel: "Launch",
    render: () => <LaunchScene />,
  },
];

export function CreateWebsiteShowcase() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = () => setDocumentVisible(!document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || !documentVisible) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % scenes.length);
    }, SCENE_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex, documentVisible, paused, reducedMotion]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setPaused(false);
      }
    },
    []
  );

  const progressPaused = paused || reducedMotion || !documentVisible;

  return (
    <section
      aria-label="Biponon store creation preview"
      className="relative isolate flex h-full min-h-full w-full flex-1 min-w-0 flex-col justify-between gap-4 sm:gap-5 overflow-hidden bg-[#04281e] px-5 py-6 text-white sm:px-7 sm:py-7 lg:px-8 lg:py-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={handleBlur}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 12% 0%, rgba(0,187,125,0.34), transparent 56%), radial-gradient(90% 80% at 88% 100%, rgba(0,151,107,0.38), transparent 60%), linear-gradient(160deg, #052b20 0%, #04261c 46%, #031b14 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(90% 70% at 50% 30%, black 20%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(90% 70% at 50% 30%, black 20%, transparent 85%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 -z-10 size-72 rounded-full bg-[#00bb7d]/20 blur-3xl"
      />

      <div className="relative z-10 w-full">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-white/80 uppercase backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-[#7bf7c8] shadow-[0_0_10px_rgba(123,247,200,0.9)] animate-auth-pulse-soft" />
          Website builder
        </span>

        <h2 className="font-heading mt-3.5 max-w-xl text-xl leading-[1.18] font-extrabold tracking-tight text-balance xl:mt-4 xl:text-2xl">
          Everything You Need to{" "}
          <span className="text-[#8ff5ce]">Launch Your Store</span>.
        </h2>
        <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-white/60 xl:text-sm">
          Create your storefront, customize your brand, and start selling — all
          in one place.
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col justify-between min-h-0">
        <div className="flex w-full flex-1 flex-col min-h-0 overflow-hidden rounded-[1.35rem] border border-white/15 bg-white/5 shadow-[0_35px_80px_-35px_rgba(0,0,0,0.85)] backdrop-blur-sm">
          <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="size-2 rounded-full bg-rose-400/80" />
              <span className="size-2 rounded-full bg-amber-300/80" />
              <span className="size-2 rounded-full bg-emerald-300/80" />
            </div>

            <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md border border-white/10 bg-black/20 px-2 py-1 text-[9px] text-white/65">
              <Lock className="size-2.5 shrink-0 text-[#7bf7c8]" />
              <span className="truncate">app.biponon.com/setup</span>
            </div>

            <span className="flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-100">
              <span className="size-1 rounded-full bg-[#7bf7c8]" />
              Live
            </span>
          </div>

          <div className="relative w-full flex-1 min-h-[350px] sm:min-h-[380px] xl:min-h-[410px] overflow-hidden p-2 sm:p-2.5">
            {scenes.map((scene, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={scene.id}
                  role="group"
                  aria-label={scene.label}
                  aria-hidden={!isActive}
                  className={cn(
                    "absolute inset-2 transition-[opacity,transform] duration-500 ease-out sm:inset-2.5",
                    isActive
                      ? "translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none translate-y-2 scale-[0.985] opacity-0"
                  )}
                >
                  <div
                    key={isActive ? `${scene.id}-active` : `${scene.id}-idle`}
                    className="h-full"
                  >
                    {scene.render()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 grid w-full grid-cols-3 gap-1.5 shrink-0">
          {scenes.map((scene, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => handleSelect(index)}
                aria-pressed={isActive}
                aria-label={`Show scene ${scene.number}: ${scene.label}`}
                className={cn(
                  "group relative overflow-hidden rounded-xl border px-1.5 py-2 text-left transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none",
                  isActive
                    ? "border-white/25 bg-white/15 text-white shadow-[0_10px_24px_-18px_rgba(0,0,0,0.9)]"
                    : "border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:bg-white/10 hover:text-white/80"
                )}
              >
                <span className="flex items-center justify-between gap-1">
                  <span className="font-mono text-[9px] tracking-wider opacity-70">
                    {scene.number}
                  </span>
                  {isActive ? (
                    <span className="size-1.5 rounded-full bg-[#7bf7c8] animate-auth-pulse-soft" />
                  ) : null}
                </span>
                <span className="mt-0.5 block truncate text-[9.5px] font-semibold sm:text-[10.5px]">
                  <span className="sm:hidden">{scene.shortLabel}</span>
                  <span className="hidden sm:inline">{scene.label}</span>
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-white/10"
                >
                  {isActive && !reducedMotion ? (
                    <span
                      key={activeIndex}
                      className="block h-full origin-left bg-[#7bf7c8] animate-[auth-scene-progress_4.8s_linear_forwards]"
                      style={{
                        animationPlayState: progressPaused
                          ? "paused"
                          : "running",
                      }}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex w-full shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-[10px] text-white/50">
        <span className="inline-flex items-center gap-1.5">
          <BadgeCheck className="size-3.5 text-[#7bf7c8]" />
          Secure, encrypted setup
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Globe className="size-3.5 text-[#7bf7c8]" />
          Free .biponon.com store URL
        </span>
      </div>
    </section>
  );
}

function CreateStoreScene() {
  return (
    <div className="flex h-full flex-col gap-2.5 rounded-xl border border-border/70 bg-card p-2.5 text-card-foreground shadow-sm sm:p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Store className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] leading-tight font-semibold">
              Create your store
            </p>
            <p className="truncate text-[8px] text-muted-foreground">
              Step 1 of 3 · Store profile
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[7px] font-semibold text-primary">
          <span className="size-1 rounded-full bg-primary animate-auth-pulse-soft" />
          2 min setup
        </span>
      </div>

      <div className="grid min-h-0 flex-1 gap-2 sm:grid-cols-[1.15fr_0.85fr]">
        <div className="flex min-h-0 flex-col gap-1.5 rounded-lg border border-border/70 bg-background p-2">
          <p className="text-[7px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            Store name
          </p>
          <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card px-2 py-1.5">
            <span className="brand-gradient grid size-6 shrink-0 place-items-center rounded-md text-[10px] font-black text-white">
              n
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-semibold">Nokshi Studio</p>
              <p className="truncate text-[7px] text-muted-foreground">
                Handmade lifestyle goods
              </p>
            </div>
            <Check className="size-3 shrink-0 text-primary" strokeWidth={3} />
          </div>

          <p className="mt-0.5 text-[7px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            Category
          </p>
          <div className="flex items-center justify-between rounded-md border border-border/60 bg-card px-2 py-1.5">
            <span className="truncate text-[8px]">Fashion & Apparel</span>
            <ChevronRight className="size-2.5 rotate-90 text-muted-foreground" />
          </div>

          <p className="mt-0.5 text-[7px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            Store URL
          </p>
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-card px-2 py-1.5">
            <Globe className="size-2.5 shrink-0 text-primary" />
            <span className="truncate font-mono text-[7.5px] text-muted-foreground">
              nokshi.biponon.com
            </span>
            <CircleCheck className="ml-auto size-2.5 shrink-0 text-emerald-500" />
          </div>

          <div className="mt-auto space-y-1">
            <div className="flex items-center justify-between rounded-md bg-muted/60 px-1.5 py-1 text-[7px]">
              <span className="text-muted-foreground">SSL Security</span>
              <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <CircleCheck className="size-2" />
                Active
              </span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-muted/60 px-1.5 py-1 text-[7px]">
              <span className="text-muted-foreground">Hosting</span>
              <span className="font-semibold text-foreground">Included</span>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-2 rounded-lg border border-border/70 bg-background p-2">
          <p className="flex items-center gap-1 text-[9px] font-semibold">
            <ImagePlus className="size-3 text-primary" />
            Brand asset
          </p>

          <div className="grid flex-1 place-items-center rounded-md border border-dashed border-border/80 bg-muted/30 p-2">
            <div className="text-center">
              <span className="brand-gradient mx-auto grid size-10 place-items-center rounded-xl text-[1.1rem] font-black text-white shadow-xs">
                n
              </span>
              <p className="mt-1.5 text-[7px] font-medium text-muted-foreground">
                Logo uploaded
              </p>
            </div>
          </div>

          <div>
            <p className="text-[7px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
              Brand color
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              {brandColors.map((color, index) => (
                <span
                  key={color}
                  className={cn(
                    "grid size-4 place-items-center rounded-full",
                    index === 0
                      ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
                      : "ring-1 ring-border"
                  )}
                  style={{ backgroundColor: color }}
                >
                  {index === 0 ? (
                    <Check className="size-2.5 text-white" strokeWidth={3} />
                  ) : null}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <span className="flex h-6 items-center justify-center gap-1 rounded-md bg-primary text-[8px] font-semibold text-primary-foreground">
              Continue to identity
              <ChevronRight className="size-2.5" />
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[8px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-auth-pulse-soft" />
          Profile saved automatically
        </span>
        <span className="flex items-center gap-0.5">
          Step 1 of 3
          <ChevronRight className="size-2.5" />
        </span>
      </div>
    </div>
  );
}

function CustomizeScene() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl border border-border/70 bg-card p-2.5 text-card-foreground shadow-sm sm:p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Palette className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] leading-tight font-semibold">
              Customize your design
            </p>
            <p className="truncate text-[8px] text-muted-foreground">
              Live storefront editor
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[7px] font-semibold text-primary">
          <span className="size-1 rounded-full bg-primary animate-auth-pulse-soft" />
          Live preview
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[0.8fr_1.2fr] gap-2">
        <div className="flex min-h-0 flex-col gap-1.5 overflow-hidden rounded-lg border border-border/70 bg-background p-1.5">
          <p className="flex items-center gap-1 px-0.5 text-[7.5px] font-semibold">
            <LayoutTemplate className="size-2.5 text-primary" />
            Templates
          </p>
          {templates.map((template, index) => (
            <div
              key={template.name}
              className={cn(
                "min-w-0 rounded-md border p-1",
                index === 1
                  ? "border-primary ring-1 ring-primary/20"
                  : "border-border/60"
              )}
            >
              <div
                className="flex h-5 items-center justify-between rounded-sm px-1"
                style={{ backgroundColor: template.background }}
              >
                <span
                  className="truncate text-[5.5px] font-bold tracking-wider uppercase"
                  style={{ color: template.accent }}
                >
                  {template.name}
                </span>
                <span
                  className="h-1.5 w-3 rounded-full"
                  style={{ backgroundColor: template.accent, opacity: 0.65 }}
                />
              </div>
              <p className="mt-0.5 truncate text-[5.5px] text-muted-foreground">
                {template.headline}
              </p>
            </div>
          ))}
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border/70 bg-background">
          <div className="flex items-center gap-1 border-b border-border/60 bg-muted/40 px-2 py-1">
            <span className="flex gap-0.5" aria-hidden>
              <span className="size-1 rounded-full bg-foreground/15" />
              <span className="size-1 rounded-full bg-foreground/15" />
              <span className="size-1 rounded-full bg-foreground/15" />
            </span>
            <span className="truncate rounded-sm bg-background/90 px-1.5 py-0.5 text-[6px] text-muted-foreground">
              nokshi.biponon.com
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-2">
            <div className="flex items-center justify-between">
              <span className="font-heading text-[8px] font-extrabold tracking-tight">
                NOKSHI
              </span>
              <span className="flex gap-1 text-[5.5px] text-muted-foreground">
                <span>Shop</span>
                <span>Story</span>
                <span className="font-semibold text-primary">New in</span>
              </span>
            </div>

            <div className="relative overflow-hidden rounded-md bg-[#FFF5F7] p-2 text-[#4C0519]">
              <span className="text-[5.5px] font-bold tracking-[0.14em] text-[#E11D48] uppercase">
                Sakura collection
              </span>
              <p className="mt-0.5 text-[10px] leading-tight font-extrabold">
                Glow, naturally.
              </p>
              <p className="text-[6px] opacity-65">
                Soft essentials for everyday rituals.
              </p>
              <span className="mt-1 inline-flex rounded-sm bg-[#E11D48] px-1.5 py-0.5 text-[5.5px] font-semibold text-white">
                Shop the edit
              </span>
              <span
                aria-hidden
                className="absolute -top-2 -right-2 size-8 rounded-full bg-[#E11D48]/15 blur-md"
              />
            </div>

            <div className="grid grid-cols-3 gap-1">
              {products.map((product, index) => (
                <div
                  key={product.name}
                  className={cn(
                    "rounded border border-border/60 bg-card p-1",
                    index === 0 && "animate-auth-row-in"
                  )}
                >
                  <div className="flex h-7 items-center justify-center rounded-sm bg-muted/50">
                    <Image
                      src={product.image}
                      alt=""
                      width={24}
                      height={24}
                      unoptimized
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                  <p className="mt-0.5 truncate text-[5.5px] font-semibold">
                    {product.name}
                  </p>
                  <p className="text-[5.5px] font-semibold text-primary">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between rounded-md bg-muted/50 px-1.5 py-1">
              <span className="text-[6px] text-muted-foreground">
                Accent color
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-[#E11D48]" />
                <span className="text-[6px] font-semibold">Sakura</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[8px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <CircleCheck className="size-2.5 text-emerald-500" />
          Design changes saved
        </span>
        <span>4 templates</span>
      </div>
    </div>
  );
}

function LaunchScene() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card p-2.5 text-card-foreground shadow-sm sm:p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Rocket className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] leading-tight font-semibold">
              Your store is live
            </p>
            <p className="truncate text-[8px] text-muted-foreground">
              nokshi.biponon.com
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[7px] font-semibold text-emerald-600 dark:text-emerald-300">
          <span className="size-1 rounded-full bg-emerald-500 animate-auth-pulse-soft" />
          Published
        </span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border/70 bg-background">
        <div className="flex items-center justify-between border-b border-border/60 px-2 py-1.5">
          <span className="font-heading text-[9px] font-extrabold tracking-tight">
            NOKSHI
          </span>
          <span className="flex items-center gap-1.5 text-[6px] text-muted-foreground">
            <span>Shop</span>
            <span>Story</span>
            <span className="inline-flex items-center gap-0.5 font-semibold text-foreground">
              <ShoppingBag className="size-2" />
              Cart
            </span>
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-[1.1fr_0.9fr] gap-1.5 p-2">
          <div className="relative flex flex-col justify-center overflow-hidden rounded-md bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)] px-2.5 py-2">
            <span className="text-[5.5px] font-bold tracking-[0.14em] text-primary uppercase">
              New season
            </span>
            <p className="mt-0.5 font-heading text-[13px] leading-tight font-extrabold">
              Made for everyday.
            </p>
            <p className="mt-0.5 max-w-[11rem] text-[6.5px] text-muted-foreground">
              Minimal goods, thoughtful details, made to last.
            </p>
            <span className="mt-1.5 inline-flex w-fit items-center gap-0.5 rounded-sm bg-primary px-1.5 py-0.5 text-[6px] font-semibold text-primary-foreground">
              Shop now
              <ArrowUpRight className="size-2" />
            </span>
            <span
              aria-hidden
              className="absolute -top-3 -right-3 size-12 rounded-full bg-primary/15 blur-lg"
            />
          </div>

          <div className="grid min-h-0 grid-cols-3 gap-1">
            {products.map((product, index) => (
              <div
                key={product.name}
                className={cn(
                  "flex flex-col overflow-hidden rounded border border-border/60 bg-card p-1",
                  index === 1 && "animate-auth-float"
                )}
              >
                <div className="flex min-h-0 flex-1 items-center justify-center rounded-sm bg-muted/50">
                  <Image
                    src={product.image}
                    alt=""
                    width={28}
                    height={28}
                    unoptimized
                    className="h-6 w-auto object-contain"
                  />
                </div>
                <p className="mt-0.5 truncate text-[6px] font-semibold">
                  {product.name}
                </p>
                <p className="text-[6px] font-semibold text-primary">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-2 py-1 text-[6px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <TrendingUp className="size-2.5 text-emerald-500" />
            First orders ready
          </span>
          <span>Free delivery over $50</span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 text-[8px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <CircleCheck className="size-2.5 text-emerald-500" />
          Store published successfully
        </span>
        <span className="inline-flex items-center gap-0.5 font-semibold text-primary">
          Visit store
          <ChevronRight className="size-2.5" />
        </span>
      </div>
    </div>
  );
}
