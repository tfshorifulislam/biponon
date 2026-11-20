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
  BarChart3,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  CreditCard,
  Layers,
  LayoutTemplate,
  Lock,
  MoreHorizontal,
  Package,
  Palette,
  Plus,
  Search,
  ShoppingBag,
  Store,
  TrendingUp,
  Truck,
} from "lucide-react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const SCENE_DURATION = 4800;

interface Scene {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
  render: () => ReactNode;
}

const scenes: Scene[] = [
  {
    id: "store-builder",
    number: "01",
    label: "Store Builder",
    shortLabel: "Builder",
    render: () => <StoreBuilderScene />,
  },
  {
    id: "products",
    number: "02",
    label: "Product Management",
    shortLabel: "Products",
    render: () => <ProductManagementScene />,
  },
  {
    id: "orders",
    number: "03",
    label: "Order Management",
    shortLabel: "Orders",
    render: () => <OrderManagementScene />,
  },
  {
    id: "templates",
    number: "04",
    label: "Store Templates",
    shortLabel: "Templates",
    render: () => <StoreTemplatesScene />,
  },
];

export function AuthShowcase() {
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
      aria-label="Biponon platform preview"
      className="relative isolate flex min-h-full flex-col justify-between gap-6 overflow-hidden bg-[#04281e] px-5 py-6 text-white sm:px-7 sm:py-8 lg:px-8 lg:py-9"
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

      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-white/80 uppercase backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-[#7bf7c8] shadow-[0_0_10px_rgba(123,247,200,0.9)] animate-auth-pulse-soft" />
          Live platform preview
        </span>

        <h2 className="font-heading mt-5 max-w-xl text-2xl leading-[1.14] font-extrabold tracking-tight text-balance sm:text-[1.8rem] lg:text-[2.05rem]">
          Everything You Need to{" "}
          <span className="text-[#8ff5ce]">Build and Grow</span> Your Online
          Store.
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
          Create your storefront, manage products and orders, and grow your
          business — all in one place.
        </p>
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden rounded-[1.35rem] border border-white/15 bg-white/5 shadow-[0_35px_80px_-35px_rgba(0,0,0,0.85)] backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="size-2 rounded-full bg-rose-400/80" />
              <span className="size-2 rounded-full bg-amber-300/80" />
              <span className="size-2 rounded-full bg-emerald-300/80" />
            </div>

            <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md border border-white/10 bg-black/20 px-2 py-1 text-[9px] text-white/65">
              <Lock className="size-2.5 shrink-0 text-[#7bf7c8]" />
              <span className="truncate">app.biponon.com/dashboard</span>
            </div>

            <span className="flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-100">
              <span className="size-1 rounded-full bg-[#7bf7c8]" />
              Live
            </span>
          </div>

          <div className="relative h-[336px] overflow-hidden p-2 sm:h-[352px] sm:p-2.5 lg:h-[360px]">
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

        <div className="mt-3 grid grid-cols-4 gap-1.5">
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
                  <span className="xl:hidden">{scene.shortLabel}</span>
                  <span className="hidden xl:inline">{scene.label}</span>
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

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-[10px] text-white/50">
        <span className="inline-flex items-center gap-1.5">
          <BadgeCheck className="size-3.5 text-[#7bf7c8]" />
          Secure, encrypted access
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="flex -space-x-1" aria-hidden>
            <span className="size-4 rounded-full border border-[#04281e] bg-emerald-300/80" />
            <span className="size-4 rounded-full border border-[#04281e] bg-teal-300/70" />
            <span className="size-4 rounded-full border border-[#04281e] bg-emerald-500/70" />
          </span>
          Trusted by growing merchants
        </span>
      </div>
    </section>
  );
}

const storeProducts = [
  {
    name: "Ceramic Mug",
    price: "$24",
    image: "/products/ceramic-mug.svg",
  },
  {
    name: "Canvas Tote",
    price: "$38",
    image: "/products/canvas-tote.svg",
  },
  {
    name: "Headphones",
    price: "$89",
    image: "/products/studio-headphones.svg",
  },
];

const themeOptions = [
  { name: "Dawn", background: "#F7F3EA", accent: "#2D4A3E" },
  { name: "Forest", background: "#E9F7F0", accent: "#00976B" },
  { name: "Studio", background: "#F3F4F6", accent: "#1F2937" },
];

const brandColors = ["#00976B", "#0F766E", "#E11D48", "#F59E0B"];

function StoreBuilderScene() {
  return (
    <div className="flex h-full flex-col gap-2.5 rounded-xl border border-border/70 bg-card p-2.5 text-card-foreground shadow-sm sm:p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Store className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] leading-tight font-semibold">
              Nokshi Studio
            </p>
            <p className="truncate text-[8px] text-muted-foreground">
              Store builder · Draft
            </p>
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-2 py-1 text-[8px] font-semibold text-primary-foreground shadow-xs">
          <ArrowUpRight className="size-2.5" />
          Publish
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_0.85fr] gap-2">
        <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border/70 bg-background">
          <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-2 py-1.5">
            <span className="flex gap-1" aria-hidden>
              <span className="size-1.5 rounded-full bg-foreground/15" />
              <span className="size-1.5 rounded-full bg-foreground/15" />
              <span className="size-1.5 rounded-full bg-foreground/15" />
            </span>
            <span className="truncate rounded-sm bg-background/85 px-1.5 py-0.5 text-[7px] text-muted-foreground">
              nokshi.biponon.com
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-2">
            <div className="flex items-center justify-between">
              <span className="font-heading text-[9px] font-extrabold tracking-tight">
                NOKSHI
              </span>
              <span className="flex gap-1 text-[6px] text-muted-foreground">
                <span>Shop</span>
                <span>Story</span>
                <span className="font-semibold text-primary">New in</span>
              </span>
            </div>

            <div className="relative overflow-hidden rounded-md bg-[color-mix(in_srgb,var(--brand-primary)_15%,transparent)] p-2">
              <span className="text-[6px] font-bold tracking-[0.14em] text-primary uppercase">
                New season
              </span>
              <p className="font-heading text-[11px] leading-tight font-extrabold">
                Made for everyday.
              </p>
              <p className="text-[7px] text-muted-foreground">
                Minimal goods, thoughtful details.
              </p>
              <span className="mt-1 inline-flex rounded-sm bg-primary px-1.5 py-0.5 text-[6px] font-semibold text-primary-foreground">
                Shop now
              </span>
              <span
                aria-hidden
                className="absolute -top-2 -right-2 size-10 rounded-full bg-primary/15 blur-md"
              />
            </div>

            <div className="grid grid-cols-3 gap-1">
              {storeProducts.map((product) => (
                <div
                  key={product.name}
                  className="rounded border border-border/60 bg-card p-1"
                >
                  <div className="flex h-8 items-center justify-center rounded-sm bg-muted/50">
                    <Image
                      src={product.image}
                      alt=""
                      width={26}
                      height={26}
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
        </div>

        <div className="flex min-h-0 flex-col gap-1.5 rounded-lg border border-border/70 bg-background p-2">
          <p className="flex items-center gap-1 text-[9px] font-semibold">
            <Palette className="size-3 text-primary" />
            Theme
          </p>

          <div className="grid grid-cols-3 gap-1">
            {themeOptions.map((theme, index) => (
              <div
                key={theme.name}
                className={cn(
                  "overflow-hidden rounded-md border p-0.5",
                  index === 1
                    ? "border-primary ring-1 ring-primary/20"
                    : "border-border/60"
                )}
              >
                <div
                  className="flex h-6 flex-col gap-0.5 rounded-sm p-0.5"
                  style={{ backgroundColor: theme.background }}
                >
                  <span
                    className="h-1 w-full rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <span
                    className="h-1 w-2/3 rounded-full opacity-35"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <span
                    className="h-2 w-full rounded-sm opacity-20"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>
                <p className="mt-0.5 truncate text-center text-[6px] font-medium text-muted-foreground">
                  {theme.name}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-0.5 text-[9px] font-semibold">Brand color</p>
          <div className="flex items-center gap-1.5">
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

          <div className="mt-auto space-y-1">
            <div className="flex items-center justify-between rounded-md bg-muted/60 px-1.5 py-1 text-[7px]">
              <span className="text-muted-foreground">Typography</span>
              <span className="font-semibold">Inter</span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-muted/60 px-1.5 py-1 text-[7px]">
              <span className="text-muted-foreground">Contrast</span>
              <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <CircleCheck className="size-2" />
                AA
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[8px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-auth-pulse-soft" />
          Autosaved just now
        </span>
        <span className="hidden items-center gap-1 sm:flex">
          <Layers className="size-2.5" />
          3 pages
        </span>
      </div>
    </div>
  );
}

const productRows = [
  {
    name: "Everyday Ceramic Mug",
    sku: "MUG-014",
    price: "$24",
    stock: "42 in stock",
    level: 84,
    tone: "emerald",
    image: "/products/ceramic-mug.svg",
  },
  {
    name: "Canvas Tote Bag",
    sku: "TOTE-008",
    price: "$38",
    stock: "8 low stock",
    level: 22,
    tone: "amber",
    image: "/products/canvas-tote.svg",
  },
  {
    name: "Studio Headphones",
    sku: "AUD-021",
    price: "$89",
    stock: "26 in stock",
    level: 58,
    tone: "emerald",
    image: "/products/studio-headphones.svg",
  },
  {
    name: "Fiddle Leaf Planter",
    sku: "HOME-032",
    price: "$19",
    stock: "64 in stock",
    level: 92,
    tone: "emerald",
    image: "/products/fiddle-leaf-plant.svg",
  },
];

function ProductManagementScene() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl border border-border/70 bg-card p-2.5 text-card-foreground shadow-sm sm:p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Package className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] leading-tight font-semibold">
              Product management
            </p>
            <p className="truncate text-[8px] text-muted-foreground">
              124 products · 4 collections
            </p>
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-2 py-1 text-[8px] font-semibold text-primary-foreground shadow-xs">
          <Plus className="size-2.5" />
          Add product
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <div className="rounded-lg border border-border/60 bg-background px-2 py-1.5">
          <p className="text-[7px] text-muted-foreground">Active</p>
          <p className="text-[12px] font-extrabold tracking-tight">124</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-background px-2 py-1.5">
          <p className="text-[7px] text-muted-foreground">Low stock</p>
          <p className="text-[12px] font-extrabold tracking-tight text-amber-600 dark:text-amber-400">
            8
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-background px-2 py-1.5">
          <p className="text-[7px] text-muted-foreground">In stock</p>
          <p className="text-[12px] font-extrabold tracking-tight text-primary">
            96%
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/40 px-2 py-1">
        <span className="flex items-center gap-1 text-[8px] text-muted-foreground">
          <Search className="size-2.5" />
          Search catalog
        </span>
        <span className="text-[7px] text-muted-foreground">Updated now</span>
      </div>

      <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden">
        {productRows.map((product, index) => (
          <div
            key={product.sku}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border border-border/60 bg-background px-1.5 py-1.5",
              index === 0 && "animate-auth-row-in"
            )}
          >
            <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted/50">
              <Image
                src={product.image}
                alt=""
                width={28}
                height={28}
                unoptimized
                className="h-6 w-auto object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[8.5px] leading-tight font-semibold">
                {product.name}
              </p>
              <p className="truncate text-[6.5px] text-muted-foreground">
                {product.sku}
              </p>
            </div>

            <span className="hidden w-9 shrink-0 sm:block">
              <span className="block h-1 overflow-hidden rounded-full bg-muted">
                <span
                  className={cn(
                    "block h-full origin-left rounded-full animate-auth-bar",
                    product.tone === "amber" ? "bg-amber-500" : "bg-primary"
                  )}
                  style={{ width: `${product.level}%` }}
                />
              </span>
            </span>

            <span className="shrink-0 text-[8px] font-semibold tabular-nums">
              {product.price}
            </span>

            <span
              className={cn(
                "hidden shrink-0 rounded-full px-1.5 py-0.5 text-[6px] font-semibold sm:inline-flex",
                product.tone === "amber"
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              )}
            >
              {product.stock}
            </span>

            {index === 0 ? (
              <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[6px] font-bold text-primary sm:hidden">
                New
              </span>
            ) : null}

            <MoreHorizontal className="size-3 shrink-0 text-muted-foreground/70" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[8px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-auth-pulse-soft" />
          Catalog synced
        </span>
        <span>Showing 4 of 124</span>
      </div>
    </div>
  );
}

const orderRows = [
  {
    id: "#BP-1042",
    customer: "Rahim A.",
    amount: "$82.00",
    status: "Processing",
    tone: "amber",
  },
  {
    id: "#BP-1041",
    customer: "Nabila R.",
    amount: "$146.00",
    status: "Packed",
    tone: "blue",
  },
  {
    id: "#BP-1040",
    customer: "Tanvir H.",
    amount: "$64.00",
    status: "Delivered",
    tone: "emerald",
  },
];

const statusTones: Record<string, string> = {
  amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  blue: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
};

function OrderManagementScene() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl border border-border/70 bg-card p-2.5 text-card-foreground shadow-sm sm:p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <ShoppingBag className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] leading-tight font-semibold">
              Order management
            </p>
            <p className="truncate text-[8px] text-muted-foreground">
              Live fulfillment overview
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[7px] font-semibold text-primary">
          <span className="size-1.5 rounded-full bg-primary animate-auth-pulse-soft" />
          This week
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <div className="rounded-lg border border-border/60 bg-background px-2 py-1.5">
          <p className="flex items-center gap-1 text-[7px] text-muted-foreground">
            <CreditCard className="size-2.5 text-primary" />
            Revenue
          </p>
          <p className="text-[12px] font-extrabold tracking-tight">$2,480</p>
          <p className="inline-flex items-center gap-0.5 text-[6.5px] font-semibold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="size-2" />
            18.4%
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-background px-2 py-1.5">
          <p className="flex items-center gap-1 text-[7px] text-muted-foreground">
            <BarChart3 className="size-2.5 text-primary" />
            Orders
          </p>
          <p className="text-[12px] font-extrabold tracking-tight">34</p>
          <p className="text-[6.5px] text-muted-foreground">+6 today</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-background px-2 py-1.5">
          <p className="flex items-center gap-1 text-[7px] text-muted-foreground">
            <Clock3 className="size-2.5 text-amber-500" />
            Pending
          </p>
          <p className="text-[12px] font-extrabold tracking-tight">6</p>
          <p className="text-[6.5px] text-amber-600 dark:text-amber-400">
            Needs action
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-1.5">
        {orderRows.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-2 rounded-lg border border-border/60 bg-background px-2 py-1.5"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted/60 text-[7px] font-bold text-foreground/70">
              {order.customer.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[8.5px] leading-tight font-semibold">
                {order.id} · {order.customer}
              </p>
              <p className="truncate text-[6.5px] text-muted-foreground">
                Paid via bKash · 2 items
              </p>
            </div>
            <span className="shrink-0 text-[8px] font-semibold tabular-nums">
              {order.amount}
            </span>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[6px] font-semibold",
                statusTones[order.tone]
              )}
            >
              {order.status === "Delivered" ? (
                <CircleCheck className="size-2" />
              ) : order.status === "Packed" ? (
                <Truck className="size-2" />
              ) : (
                <span className="size-1 rounded-full bg-current" />
              )}
              {order.status}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/10 px-2 py-1.5">
        <div className="flex items-center justify-between gap-2 text-[7.5px]">
          <span className="flex items-center gap-1 font-semibold text-primary">
            <Truck className="size-2.5" />
            Order #BP-1042 is being prepared
          </span>
          <span className="text-muted-foreground">Step 2 of 4</span>
        </div>
        <span className="mt-1 block h-1 overflow-hidden rounded-full bg-primary/15">
          <span className="block h-full w-[58%] origin-left rounded-full bg-primary animate-auth-bar" />
        </span>
      </div>
    </div>
  );
}

const templateOptions = [
  {
    id: "natural",
    name: "Natural",
    field: "Bhoomi",
    headline: "Handcrafted calm.",
    tagline: "Organic lifestyle",
    background: "#F9F7F1",
    foreground: "#1F352C",
    accent: "#2D4A3E",
    serif: true,
  },
  {
    id: "sakura",
    name: "Sakura",
    field: "Aura",
    headline: "Glow, naturally.",
    tagline: "Beauty & skincare",
    background: "#FFF5F7",
    foreground: "#4C0519",
    accent: "#E11D48",
    serif: false,
  },
  {
    id: "minimal",
    name: "Minimal",
    field: "Kairo",
    headline: "Pure performance.",
    tagline: "Tech & audio",
    background: "#FAFAFA",
    foreground: "#0F172A",
    accent: "#0F172A",
    serif: false,
  },
  {
    id: "bold",
    name: "Bold",
    field: "Dhaak",
    headline: "Built for impact.",
    tagline: "Streetwear drops",
    background: "#0E0E12",
    foreground: "#FFFFFF",
    accent: "#F59E0B",
    serif: false,
  },
];

function StoreTemplatesScene() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl border border-border/70 bg-card p-2.5 text-card-foreground shadow-sm sm:p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <LayoutTemplate className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] leading-tight font-semibold">
              Store templates
            </p>
            <p className="truncate text-[8px] text-muted-foreground">
              Pick a look that fits your brand
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-border/70 bg-background px-2 py-1 text-[7px] font-semibold text-muted-foreground">
          4 designs
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5">
        {templateOptions.map((template, index) => (
          <div
            key={template.id}
            className={cn(
              "relative flex min-h-0 flex-col overflow-hidden rounded-lg border p-1.5",
              index === 0
                ? "border-transparent ring-2 ring-primary/70"
                : "border-black/10 dark:border-white/10"
            )}
            style={{
              backgroundColor: template.background,
              color: template.foreground,
            }}
          >
            <div className="flex items-center justify-between text-[6px] font-semibold tracking-wider uppercase opacity-65">
              <span>{template.name}</span>
              <span>{template.field}</span>
            </div>

            <p
              className="mt-1 text-[10px] leading-tight font-extrabold"
              style={{
                fontFamily: template.serif
                  ? "Georgia, 'Times New Roman', serif"
                  : undefined,
              }}
            >
              {template.headline}
            </p>
            <p className="text-[6.5px] opacity-60">{template.tagline}</p>

            <div className="mt-auto grid grid-cols-3 gap-1 pt-1.5">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  className="h-5 rounded-sm"
                  style={{
                    backgroundColor: template.accent,
                    opacity: 0.16 + item * 0.12,
                  }}
                />
              ))}
            </div>

            {index === 0 ? (
              <span className="absolute top-1 right-1 inline-flex items-center gap-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[5.5px] font-bold text-white shadow-xs">
                <Check className="size-1.5" strokeWidth={3} />
                Active
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[8px] text-muted-foreground">
        <span>Natural, Sakura + 2 more</span>
        <span className="inline-flex items-center gap-0.5 font-semibold text-primary">
          Browse all
          <ChevronRight className="size-2.5" />
        </span>
      </div>
    </div>
  );
}
