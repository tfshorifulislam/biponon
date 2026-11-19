"use client";

import { useLanguage } from "@/lib/i18n/languageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Laptop,
  Monitor,
  Package,
  Search,
  Share2,
  Smartphone,
  Sparkles,
  Tablet,
  Truck,
} from "lucide-react";

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section
      id="features"
      aria-label="Biponon platform features"
      className="relative isolate w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-xs backdrop-blur-sm dark:border-primary/25 dark:bg-primary/15">
            <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary" />
            {t("features.badge")}
          </span>

          <h2 className="font-heading mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("features.heading")}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
            {t("features.description")}
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:mt-16 sm:gap-8">
          {/* Card 1: Order Fulfillment */}
          <Card className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-0 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.15)] dark:border-white/10 dark:bg-card/40 dark:hover:border-primary/40 dark:hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.25)]">
            <CardHeader className="p-5 sm:p-6 pb-4">
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/15">
                <Truck className="size-5" />
              </div>
              <CardTitle className="text-lg sm:text-xl">
                {t("features.items.fulfillment.title")}
              </CardTitle>
              <CardDescription className="mt-1.5">
                {t("features.items.fulfillment.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
              <FulfillmentPreview />
            </CardContent>
          </Card>

          {/* Card 2: Connected Marketing */}
          <Card className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-0 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.15)] dark:border-white/10 dark:bg-card/40 dark:hover:border-primary/40 dark:hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.25)]">
            <CardHeader className="p-5 sm:p-6 pb-4">
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/15">
                <Share2 className="size-5" />
              </div>
              <CardTitle className="text-lg sm:text-xl">
                {t("features.items.marketing.title")}
              </CardTitle>
              <CardDescription className="mt-1.5">
                {t("features.items.marketing.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
              <MarketingPreview />
            </CardContent>
          </Card>

          {/* Card 3: Performance Insights */}
          <Card className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-0 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.15)] dark:border-white/10 dark:bg-card/40 dark:hover:border-primary/40 dark:hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.25)]">
            <CardHeader className="p-5 sm:p-6 pb-4">
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/15">
                <ArrowUpRight className="size-5" />
              </div>
              <CardTitle className="text-lg sm:text-xl">
                {t("features.items.insights.title")}
              </CardTitle>
              <CardDescription className="mt-1.5">
                {t("features.items.insights.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
              <InsightsPreview />
            </CardContent>
          </Card>

          {/* Card 4: Shopping Experience */}
          <Card className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-0 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.15)] dark:border-white/10 dark:bg-card/40 dark:hover:border-primary/40 dark:hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.25)]">
            <CardHeader className="p-5 sm:p-6 pb-4">
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/15">
                <Laptop className="size-5" />
              </div>
              <CardTitle className="text-lg sm:text-xl">
                {t("features.items.experience.title")}
              </CardTitle>
              <CardDescription className="mt-1.5">
                {t("features.items.experience.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
              <ExperiencePreview />
            </CardContent>
          </Card>

          {/* Card 5: Simplified Operations */}
          <Card className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-0 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.15)] dark:border-white/10 dark:bg-card/40 dark:hover:border-primary/40 dark:hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.25)]">
            <CardHeader className="p-5 sm:p-6 pb-4">
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/15">
                <Package className="size-5" />
              </div>
              <CardTitle className="text-lg sm:text-xl">
                {t("features.items.operations.title")}
              </CardTitle>
              <CardDescription className="mt-1.5">
                {t("features.items.operations.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
              <OperationsPreview />
            </CardContent>
          </Card>

          {/* Card 6: Store Customization */}
          <Card className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-0 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.15)] dark:border-white/10 dark:bg-card/40 dark:hover:border-primary/40 dark:hover:shadow-[0_16px_36px_-12px_rgba(0,151,107,0.25)]">
            <CardHeader className="p-5 sm:p-6 pb-4">
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/15">
                <Sparkles className="size-5" />
              </div>
              <CardTitle className="text-lg sm:text-xl">
                {t("features.items.customization.title")}
              </CardTitle>
              <CardDescription className="mt-1.5">
                {t("features.items.customization.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
              <CustomizationPreview />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Preview 1: Order Fulfillment Interface
// ---------------------------------------------------------------------------
function FulfillmentPreview() {
  return (
    <div className="h-52 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-3 sm:p-3.5 backdrop-blur-xs dark:border-white/10 dark:bg-muted/10">
      <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
        <div className="flex items-center gap-1.5">
          <Package className="size-3.5 text-primary" />
          <span className="text-[11px] font-semibold text-foreground">
            Order #BPN-8941
          </span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          In Transit
        </span>
      </div>

      {/* Progress Stepper */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[9px] font-medium text-muted-foreground">
          <span className="font-semibold text-primary">Confirmed</span>
          <span className="font-semibold text-primary">Packed</span>
          <span className="font-semibold text-primary">Dispatched</span>
          <span>Delivered</span>
        </div>

        {/* Stepper bar */}
        <div className="relative mt-1.5 h-1.5 w-full rounded-full bg-border/60 dark:bg-white/10">
          <div
            className="absolute left-0 top-0 h-full rounded-full [background-image:var(--brand-gradient)]"
            style={{ width: "75%" }}
          />
        </div>
      </div>

      {/* Delivery Details Card */}
      <div className="mt-3 rounded-lg border border-border/60 bg-background/80 p-2.5 dark:bg-card/70">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-medium text-muted-foreground">Courier</span>
          <span className="font-semibold text-foreground">
            Express Parcel BD
          </span>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px]">
          <span className="font-medium text-muted-foreground">Destination</span>
          <span className="truncate font-semibold text-foreground">
            Banani, Dhaka
          </span>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px]">
          <span className="font-medium text-muted-foreground">Expected</span>
          <span className="font-semibold text-primary">Today by 4:30 PM</span>
        </div>
      </div>

      {/* Ticker status */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <Clock className="size-3 text-primary" />
        <span className="truncate">Out for delivery • Rider dispatched</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Preview 2: Connected Marketing Integrations Interface
// ---------------------------------------------------------------------------
function MarketingPreview() {
  const channels = [
    {
      name: "Meta Product Catalog",
      sub: "Synced 8m ago • 142 items",
      status: "Active",
      badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
    {
      name: "Google Merchant Center",
      sub: "Auto-indexed feed • 0 errors",
      status: "Synced",
      badgeClass: "bg-primary/15 text-primary",
    },
    {
      name: "WhatsApp Order Alerts",
      sub: "Instant updates enabled",
      status: "Connected",
      badgeClass: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
    },
  ];

  return (
    <div className="h-52 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-3 sm:p-3.5 backdrop-blur-xs dark:border-white/10 dark:bg-muted/10">
      <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
        <span className="text-[11px] font-semibold text-foreground">
          Channels & Feeds
        </span>
        <span className="flex items-center gap-1 text-[10px] font-medium text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          Live Connected
        </span>
      </div>

      <div className="mt-2.5 space-y-2">
        {channels.map((ch) => (
          <div
            key={ch.name}
            className="flex items-center justify-between rounded-lg border border-border/50 bg-background/80 px-2.5 py-1.5 dark:bg-card/70"
          >
            <div className="min-w-0 pr-2">
              <p className="truncate text-[10px] font-semibold text-foreground">
                {ch.name}
              </p>
              <p className="truncate text-[9px] text-muted-foreground">
                {ch.sub}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${ch.badgeClass}`}
            >
              {ch.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex items-center justify-between rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[9px] font-medium text-primary dark:bg-primary/15">
        <span>Attribution Tracker</span>
        <span className="font-bold">+18.4% Conversions</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Preview 3: Performance Insights Analytics Dashboard
// ---------------------------------------------------------------------------
function InsightsPreview() {
  const barHeights = [40, 58, 48, 72, 65, 88, 100];
  const days = ["S", "S", "M", "T", "W", "T", "F"];

  return (
    <div className="h-52 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-3 sm:p-3.5 backdrop-blur-xs dark:border-white/10 dark:bg-muted/10">
      {/* Top Stat */}
      <div className="flex items-start justify-between border-b border-border/50 pb-2.5">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Total Net Revenue
          </span>
          <p className="font-heading text-lg font-bold text-foreground">
            ৳ 2,48,500
          </p>
        </div>
        <span className="inline-flex items-center gap-0.5 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
          <ArrowUpRight className="size-3" />
          +24.8%
        </span>
      </div>

      {/* Mini Bar Chart */}
      <div className="mt-3">
        <div className="flex h-16 items-end justify-between gap-1.5 px-1">
          {barHeights.map((height, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-xs [background-image:var(--brand-gradient)] opacity-90 transition-all hover:opacity-100"
                style={{ height: `${height}%` }}
              />
              <span className="text-[8px] font-semibold text-muted-foreground">
                {days[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Metrics Bar */}
      <div className="mt-2.5 grid grid-cols-3 gap-1 rounded-lg border border-border/50 bg-background/80 p-1.5 text-center dark:bg-card/70">
        <div>
          <p className="text-[8px] text-muted-foreground">Orders</p>
          <p className="text-[10px] font-bold text-foreground">342</p>
        </div>
        <div className="border-x border-border/50">
          <p className="text-[8px] text-muted-foreground">Avg. Value</p>
          <p className="text-[10px] font-bold text-foreground">৳ 1,820</p>
        </div>
        <div>
          <p className="text-[8px] text-muted-foreground">Conversion</p>
          <p className="text-[10px] font-bold text-primary">3.9%</p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Preview 4: Seamless Shopping Experience (Responsive Storefronts)
// ---------------------------------------------------------------------------
function ExperiencePreview() {
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-3 sm:p-3.5 backdrop-blur-xs dark:border-white/10 dark:bg-muted/10">
      <div className="flex items-center justify-between border-b border-border/50 pb-2">
        <span className="text-[11px] font-semibold text-foreground">
          Multi-Device Storefront
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
          Responsive
        </span>
      </div>

      {/* Layered responsive mockups */}
      <div className="relative mt-2.5 flex h-28 items-center justify-center">
        {/* Desktop screen (Back) */}
        <div className="absolute left-2 top-0 h-24 w-44 rounded-lg border border-border/70 bg-background shadow-xs dark:bg-card">
          <div className="flex h-3.5 items-center gap-1 border-b border-border/60 bg-muted/60 px-1.5">
            <span className="size-1 rounded-full bg-foreground/20" />
            <span className="size-1 rounded-full bg-foreground/20" />
            <span className="size-1 rounded-full bg-foreground/20" />
            <span className="ml-1 h-1.5 w-16 rounded-xs bg-foreground/10" />
          </div>
          <div className="p-1.5">
            <div className="h-3 w-14 rounded-xs bg-primary/20" />
            <div className="mt-1 grid grid-cols-3 gap-1">
              <div className="h-10 rounded-xs bg-muted/60" />
              <div className="h-10 rounded-xs bg-muted/60" />
              <div className="h-10 rounded-xs bg-muted/60" />
            </div>
          </div>
        </div>

        {/* Tablet screen (Middle) */}
        <div className="absolute left-20 top-2 h-22 w-28 rounded-md border border-border/70 bg-background/95 shadow-sm dark:bg-card/95">
          <div className="flex h-3 items-center justify-between border-b border-border/60 px-1">
            <span className="h-1 w-6 rounded-xs bg-foreground/20" />
            <span className="size-1 rounded-full bg-foreground/20" />
          </div>
          <div className="grid grid-cols-2 gap-1 p-1">
            <div className="h-9 rounded-xs bg-muted/80" />
            <div className="h-9 rounded-xs bg-muted/80" />
          </div>
        </div>

        {/* Smartphone screen (Foreground) */}
        <div className="absolute right-3 top-1 h-26 w-16 rounded-lg border-2 border-primary/30 bg-background shadow-md dark:bg-card">
          <div className="mx-auto mt-0.5 h-1 w-5 rounded-full bg-foreground/20" />
          <div className="p-1">
            <div className="h-10 rounded-xs bg-primary/10" />
            <div className="mt-1 h-1.5 w-10 rounded-xs bg-foreground/30" />
            <div className="mt-0.5 h-1 w-7 rounded-xs bg-primary" />
            <div className="mt-1 h-2.5 w-full rounded-xs bg-primary text-[6px] font-bold text-white flex items-center justify-center">
              Buy Now
            </div>
          </div>
        </div>
      </div>

      {/* Breakpoints indicator */}
      <div className="mt-1 flex items-center justify-between rounded-lg border border-border/50 bg-background/80 px-2 py-1.5 text-[9px] text-muted-foreground dark:bg-card/70">
        <span className="flex items-center gap-1 font-semibold text-foreground">
          <Monitor className="size-3 text-primary" /> Desktop
        </span>
        <span className="flex items-center gap-1 font-semibold text-foreground">
          <Tablet className="size-3 text-primary" /> Tablet
        </span>
        <span className="flex items-center gap-1 font-semibold text-foreground">
          <Smartphone className="size-3 text-primary" /> Mobile
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Preview 5: Simplified Business Operations (Order Management)
// ---------------------------------------------------------------------------
function OperationsPreview() {
  const orders = [
    {
      buyer: "Farhan Ahmed",
      id: "Ord #2041",
      amount: "৳ 2,400",
      status: "Paid",
      badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
    {
      buyer: "Tahmina Akter",
      id: "Ord #2040",
      amount: "৳ 1,850",
      status: "Processing",
      badge: "bg-primary/15 text-primary",
    },
    {
      buyer: "Tanvir Hasan",
      id: "Ord #2039",
      amount: "৳ 4,500",
      status: "Dispatched",
      badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="h-52 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-3 sm:p-3.5 backdrop-blur-xs dark:border-white/10 dark:bg-muted/10">
      {/* Search Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-2">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Search className="size-3" />
          <span className="text-[10px] font-medium">Recent Activity</span>
        </div>
        <span className="rounded-xs border border-border/60 bg-background/80 px-1.5 py-0.5 text-[9px] font-medium text-foreground dark:bg-card">
          All Orders
        </span>
      </div>

      {/* Orders List */}
      <div className="mt-2.5 space-y-2">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="flex items-center justify-between rounded-lg border border-border/50 bg-background/80 px-2.5 py-1.5 dark:bg-card/70"
          >
            <div>
              <p className="text-[10px] font-bold text-foreground">
                {ord.buyer}
              </p>
              <p className="text-[9px] text-muted-foreground">{ord.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-foreground">
                {ord.amount}
              </p>
              <span
                className={`inline-block rounded-xs px-1.5 py-0.2 text-[8px] font-semibold ${ord.badge}`}
              >
                {ord.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[9px] text-muted-foreground">
        <span>Instant Search & Export</span>
        <span className="font-semibold text-primary">Live Dashboard</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Preview 6: Store Customization & Styling
// ---------------------------------------------------------------------------
function CustomizationPreview() {
  const colors = [
    { code: "#00976B", active: true },
    { code: "#2563EB", active: false },
    { code: "#7C3AED", active: false },
    { code: "#EA580C", active: false },
  ];

  return (
    <div className="h-52 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-3 sm:p-3.5 backdrop-blur-xs dark:border-white/10 dark:bg-muted/10">
      <div className="flex items-center justify-between border-b border-border/50 pb-2">
        <span className="text-[11px] font-semibold text-foreground">
          Store Appearance
        </span>
        <span className="flex items-center gap-1 text-[9px] font-semibold text-primary">
          <CheckCircle2 className="size-3" />
          Auto-Saved
        </span>
      </div>

      {/* Palette Picker */}
      <div className="mt-2.5 rounded-lg border border-border/50 bg-background/80 p-2 dark:bg-card/70">
        <div className="flex items-center justify-between text-[9px]">
          <span className="font-medium text-muted-foreground">
            Brand Accent Color
          </span>
          <span className="font-bold text-primary">#00976B</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          {colors.map((c) => (
            <div
              key={c.code}
              className="flex size-5 items-center justify-center rounded-full shadow-2xs"
              style={{ backgroundColor: c.code }}
            >
              {c.active && <Check className="size-3 text-white" />}
            </div>
          ))}
        </div>
      </div>

      {/* Layout Controls */}
      <div className="mt-2 space-y-1.5">
        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/80 px-2.5 py-1.5 text-[10px] dark:bg-card/70">
          <span className="font-medium text-muted-foreground">Header Style</span>
          <span className="font-semibold text-foreground">Floating Pill</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/80 px-2.5 py-1.5 text-[10px] dark:bg-card/70">
          <span className="font-medium text-muted-foreground">
            Product Grid
          </span>
          <span className="font-semibold text-primary">4-Column Fluid</span>
        </div>
      </div>

      {/* Typography indicator */}
      <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
        <span>Typography: Inter & Hind Siliguri</span>
        <span className="font-semibold text-foreground">Customizable</span>
      </div>
    </div>
  );
}
