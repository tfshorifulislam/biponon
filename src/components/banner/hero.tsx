"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Lock,
  PlayCircle,
  Search,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/languageContext";

const productItems = [
  {
    key: "hero.preview.products.ceramicMug",
    fallbackName: "Everyday Ceramic Mug",
    price: "$24",
    image: "/products/ceramic-mug.svg",
  },
  {
    key: "hero.preview.products.canvasTote",
    fallbackName: "Canvas Tote Bag",
    price: "$38",
    image: "/products/canvas-tote.svg",
  },
  {
    key: "hero.preview.products.studioHeadphones",
    fallbackName: "Studio Headphones",
    price: "$89",
    image: "/products/studio-headphones.svg",
  },
  {
    key: "hero.preview.products.fiddleLeafPlant",
    fallbackName: "Fiddle Leaf Plant",
    price: "$32",
    image: "/products/fiddle-leaf-plant.svg",
  },
];

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate w-full overflow-hidden px-4 pt-24 pb-0 sm:px-6 sm:pt-28 lg:px-8 lg:pt-36">
      <div
        aria-hidden
        className="hero-background pointer-events-none absolute inset-0 -z-10"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          {/* Left Column: Messaging & CTAs */}
          <div className="flex flex-col items-start text-left">
            {/* Subtle premium eyebrow badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-xs backdrop-blur-sm dark:border-primary/25 dark:bg-primary/15">
              <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary" />
              {t("hero.badge")}
            </span>

            {/* Bold, impactful main heading */}
            <h1 className="font-heading mt-6 max-w-xl text-3xl font-extrabold tracking-tight text-foreground sm:mt-7 sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] xl:leading-[1.12]">
              <span className="block">
                {t("hero.headingLine1")}
              </span>
              <span className="brand-gradient-text inline">
                  {t("hero.headingGradient")}
              </span>
            </h1>

            {/* Clear, refined description */}
            <p className="section-description mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              {t("hero.description")}
            </p>

            {/* CTA action buttons */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/create-website" />}
                className="group relative h-12 w-full overflow-hidden rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(0,151,107,0.7)] [background-image:var(--brand-gradient)] transition-all duration-200 hover:shadow-[0_18px_36px_-12px_rgba(0,151,107,0.85)] hover:brightness-105 active:scale-[0.99] sm:w-auto"
              >
                <span>{t("hero.ctaPrimary")}</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                render={<Link href="/how-it-works" />}
                className="h-12 w-full rounded-xl border-border/80 bg-background/60 px-6 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:border-foreground/20 hover:bg-muted active:scale-[0.99] sm:w-auto"
              >
                <PlayCircle className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                <span>{t("hero.ctaSecondary")}</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Store Demo / Preview */}
          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            {/* Soft atmospheric ambient light */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-70 blur-2xl dark:opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse at center, color-mix(in srgb, var(--brand-primary) 18%, transparent), transparent 70%)",
              }}
            />
            <StorePreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function StorePreview() {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-card text-left shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25),0_1px_3px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-all duration-200 dark:border-white/10 dark:bg-card/95 dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] dark:ring-white/10">
      <BrowserBar />

      <div className="bg-background">
        <StoreNavbar />

        <div className="border-b border-border/60 bg-primary/10 px-4 py-1.5 text-center text-[10px] font-semibold tracking-wide text-primary dark:bg-primary/15">
          {t("hero.preview.banner")}
        </div>

        <div className="p-3.5 sm:p-5">
          <div className="mb-3.5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("hero.preview.newArrivals")}
              </p>
              <p className="font-heading text-sm font-semibold text-foreground">
                {t("hero.preview.madeForEveryday")}
              </p>
            </div>
            <span className="hidden cursor-pointer text-[10px] font-semibold text-primary transition-colors hover:underline sm:inline">
              {t("hero.preview.viewAll")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {productItems.map((product) => (
              <div
                key={product.key}
                className="group overflow-hidden rounded-xl border border-border/70 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
              >
                <div className="aspect-square overflow-hidden bg-muted/60">
                  <Image
                    src={product.image}
                    alt={t(product.key)}
                    width={320}
                    height={320}
                    unoptimized
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-2.5">
                  <p className="truncate text-[10px] font-medium text-foreground">
                    {t(product.key)}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-[11px] font-bold text-primary">
                      {product.price}
                    </p>
                    <span className="grid size-4 place-items-center rounded-full border border-border/80 text-[10px] font-semibold leading-none text-muted-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      +
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserBar() {
  return (
    <div className="relative flex items-center border-b border-border/70 bg-muted/60 px-3.5 py-2.5 dark:bg-white/5">
      <div className="flex gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-foreground/15 dark:bg-white/20" />
        <span className="size-2.5 rounded-full bg-foreground/15 dark:bg-white/20" />
        <span className="size-2.5 rounded-full bg-foreground/15 dark:bg-white/20" />
      </div>

      <div className="absolute left-1/2 top-1/2 flex w-[55%] max-w-[240px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-md border border-border/70 bg-background/80 px-2 py-0.5 shadow-2xs backdrop-blur-xs sm:w-[60%] sm:px-2.5 sm:py-1">
        <Lock className="size-2.5 shrink-0 text-primary" />
        <span className="truncate text-[10px] font-medium text-muted-foreground">
          nokshi.biponon.com
        </span>
      </div>
    </div>
  );
}

function StoreNavbar() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground shadow-2xs">
          N
        </span>
        <span className="truncate font-heading text-sm font-semibold tracking-tight text-foreground">
          {t("hero.preview.storeName")}
        </span>
      </div>

      <div className="hidden items-center gap-4 text-[11px] font-medium text-muted-foreground sm:flex">
        <span className="font-semibold text-foreground">{t("hero.preview.navShop")}</span>
        <span className="transition-colors hover:text-foreground">{t("hero.preview.navNewIn")}</span>
        <span className="transition-colors hover:text-foreground">{t("hero.preview.navAbout")}</span>
      </div>

      <div className="flex shrink-0 items-center gap-2.5 text-muted-foreground">
        <Search className="size-3.5" />
        <span className="relative">
          <ShoppingCart className="size-3.5" />
          <span className="absolute -right-1.5 -top-1.5 grid size-3 place-items-center rounded-full bg-primary text-[7px] font-bold leading-none text-primary-foreground">
            2
          </span>
        </span>
      </div>
    </div>
  );
}
