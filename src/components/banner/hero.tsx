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

const products = [
  {
    name: "Everyday Ceramic Mug",
    price: "$24",
    image: "/products/ceramic-mug.svg",
  },
  {
    name: "Canvas Tote Bag",
    price: "$38",
    image: "/products/canvas-tote.svg",
  },
  {
    name: "Studio Headphones",
    price: "$89",
    image: "/products/studio-headphones.svg",
  },
  {
    name: "Fiddle Leaf Plant",
    price: "$32",
    image: "/products/fiddle-leaf-plant.svg",
  },
];

export default function HeroSection() {
  return (
    <section className="relative isolate w-full overflow-hidden pb-20 pt-10 sm:pb-24 sm:pt-14 lg:pt-16">
      <div
        aria-hidden
        className="hero-background pointer-events-none absolute inset-0 -z-10"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground shadow-sm backdrop-blur sm:text-[11px] sm:tracking-[0.18em]">
          <span className="size-1.5 shrink-0 rounded-full bg-brand-secondary" />
          YOUR BUSINESS. YOUR BRAND. YOUR ONLINE STORE.
        </span>

        <h1 className="section-heading mt-6 max-w-4xl text-4xl tracking-tight sm:mt-7 sm:text-5xl lg:text-6xl">
          <span className="brand-gradient-text">
            Start Your Online Business.
          </span>
          <span className="section-heading-normal mt-1.5 sm:mt-2">
            Build. Sell. Grow with Biponon.
          </span>
        </h1>

        <p className="section-description mt-5 max-w-xl text-balance sm:mt-6">
          Everything you need to create, manage, and grow your online store —
          all in one platform.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/signup" />}
            className="h-11 w-full bg-primary px-6 text-white shadow-[0_12px_28px_-14px_rgba(0,151,107,0.7)] [background-image:var(--brand-gradient)] transition-all hover:text-white hover:shadow-[0_16px_34px_-14px_rgba(0,151,107,0.8)] sm:w-auto"
          >
            Start Selling for Free
            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<Link href="/how-it-works" />}
            className="h-11 w-full bg-background/80 px-6 backdrop-blur transition-colors hover:bg-muted sm:w-auto"
          >
            <PlayCircle className="size-4" />
            See How It Works
          </Button>
        </div>

        <div className="relative mt-12 w-full max-w-2xl sm:mt-16">
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
    </section>
  );
}

function StorePreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_30px_70px_-32px_rgba(15,23,42,0.4)] ring-1 ring-foreground/5 dark:ring-white/10">
      <BrowserBar />

      <div className="bg-background">
        <StoreNavbar />

        <div className="border-b border-border bg-accent px-4 py-1.5 text-center text-[10px] font-medium text-accent-foreground">
          Free delivery on orders over $50
        </div>

        <div className="p-3 sm:p-4">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                New arrivals
              </p>
              <p className="font-heading text-sm font-semibold text-foreground">
                Made for everyday
              </p>
            </div>
            <span className="hidden text-[10px] font-medium text-primary sm:inline">
              View all
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.name}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={320}
                    height={320}
                    unoptimized
                    className="size-full object-cover"
                  />
                </div>
                <div className="px-2 py-2">
                  <p className="truncate text-[10px] font-medium text-foreground">
                    {product.name}
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
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
          N
        </span>
        <span className="truncate font-heading text-sm font-semibold tracking-tight text-foreground">
          Nokshi Studio
        </span>
      </div>

      <div className="hidden items-center gap-4 text-[11px] font-medium text-muted-foreground sm:flex">
        <span className="text-foreground">Shop</span>
        <span>New in</span>
        <span>About</span>
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
