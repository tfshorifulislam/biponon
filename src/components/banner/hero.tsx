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
    <section className="relative isolate w-full overflow-hidden pb-20 pt-24 sm:pb-24 sm:pt-26 lg:pb-28 lg:pt-36">
      <div
        aria-hidden
        className="hero-background pointer-events-none absolute inset-0 -z-10"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left Column: Messaging & CTAs */}
          <div className="flex flex-col items-start text-left">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/50 bg-white/65 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground shadow-sm backdrop-blur-xl sm:text-[11px] sm:tracking-[0.18em] dark:border-white/10 dark:bg-black/25">
              <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary" />
              {t("hero.badge")}
            </span>

            <h1 className="section-heading mt-6 max-w-xl text-4xl leading-[1.15] tracking-tight sm:mt-7 sm:text-5xl lg:text-5xl xl:text-6xl">
              <span className="brand-gradient-text">
                {t("hero.headingGradient")}
              </span>
              <span className="section-heading-normal mt-1.5 sm:mt-2">
                {t("hero.headingNormal")}
              </span>
            </h1>

            <p className="section-description mt-5 max-w-lg text-balance sm:mt-6">
              {t("hero.description")}
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/create-website" />}
                className="h-11 w-full bg-primary px-6 text-white shadow-[0_12px_28px_-14px_rgba(0,151,107,0.7)] [background-image:var(--brand-gradient)] transition-all hover:text-white hover:shadow-[0_16px_34px_-14px_rgba(0,151,107,0.8)] sm:h-12 sm:w-auto"
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                render={<Link href="/how-it-works" />}
                className="h-11 w-full bg-background/80 px-6 backdrop-blur transition-colors hover:bg-muted sm:h-12 sm:w-auto"
              >
                <PlayCircle className="size-4" />
                {t("hero.ctaSecondary")}
              </Button>
            </div>
          </div>

          {/* Right Column: Store Demo / Preview */}
          <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-8 -bottom-8 -top-4 -z-10 rounded-[2.5rem] blur-2xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, color-mix(in srgb, var(--brand-secondary) 20%, transparent), transparent 100%)",
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
    <div className="overflow-hidden rounded-[1.4rem] border border-border bg-card text-left shadow-[0_36px_80px_-36px_rgba(15,23,42,0.45)] ring-1 ring-foreground/5 dark:ring-white/10">
      <BrowserBar />

      <div className="bg-background">
        <StoreNavbar />

        <div className="border-b border-border bg-accent px-4 py-1.5 text-center text-[10px] font-medium text-accent-foreground">
          {t("hero.preview.banner")}
        </div>

        <div className="p-3 sm:p-4">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("hero.preview.newArrivals")}
              </p>
              <p className="font-heading text-sm font-semibold text-foreground">
                {t("hero.preview.madeForEveryday")}
              </p>
            </div>
            <span className="hidden text-[10px] font-medium text-primary sm:inline">
              {t("hero.preview.viewAll")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {productItems.map((product) => (
              <div
                key={product.key}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={t(product.key)}
                    width={320}
                    height={320}
                    unoptimized
                    className="size-full object-cover"
                  />
                </div>
                <div className="px-2 py-2">
                  <p className="truncate text-[10px] font-medium text-foreground">
                    {t(product.key)}
                  </p>
                  <div className="mt-0.5 flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-primary">
                      {product.price}
                    </p>
                    <span className="grid size-4 place-items-center rounded-full border border-border text-[10px] leading-none text-muted-foreground">
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
    <div className="relative flex items-center border-b border-border bg-muted/60 px-3 py-2">
      <div className="flex gap-1.5" aria-hidden>
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
      </div>

      <div className="absolute left-1/2 top-1/2 flex w-[58%] max-w-[240px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1">
        <Lock className="size-2.5 shrink-0 text-muted-foreground" />
        <span className="truncate text-[10px] text-muted-foreground">
          nokshi.biponon.com
        </span>
      </div>
    </div>
  );
}

function StoreNavbar() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
          N
        </span>
        <span className="truncate font-heading text-sm font-semibold tracking-tight text-foreground">
          {t("hero.preview.storeName")}
        </span>
      </div>

      <div className="hidden items-center gap-4 text-[11px] font-medium text-muted-foreground sm:flex">
        <span className="text-foreground">{t("hero.preview.navShop")}</span>
        <span>{t("hero.preview.navNewIn")}</span>
        <span>{t("hero.preview.navAbout")}</span>
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
