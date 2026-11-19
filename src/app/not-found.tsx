"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw, Store, ShoppingBag, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/languageContext";

export default function NotFound() {
  const router = useRouter();
  const { t } = useLanguage();

  function handleGoBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  }

  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div
        aria-hidden
        className="hero-background pointer-events-none absolute inset-0 -z-10"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--brand-secondary) 18%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground shadow-[0_8px_24px_-16px_rgba(0,151,107,0.45)] backdrop-blur-xl sm:text-[11px] dark:border-white/10 dark:bg-black/25">
          <span aria-hidden className="size-1.5 rounded-full bg-brand-secondary" />
          {t("notFound.badge")}
        </p>

        <div className="relative mt-8 w-full sm:mt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] blur-3xl"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--brand-secondary) 24%, transparent), transparent 100%)",
            }}
          />

          <div className="relative overflow-hidden rounded-[1.4rem] border border-white/50 bg-card/60 shadow-[0_30px_70px_-36px_rgba(15,23,42,0.45)] ring-1 ring-foreground/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
            <div className="relative flex items-center border-b border-border/60 bg-muted/30 px-4 py-2.5 dark:bg-white/5">
              <div aria-hidden className="flex gap-1.5">
                <span className="size-2 rounded-full bg-foreground/15" />
                <span className="size-2 rounded-full bg-foreground/15" />
                <span className="size-2 rounded-full bg-foreground/15" />
              </div>

              <div className="absolute left-1/2 top-1/2 flex max-w-[62%] -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-md border border-border/60 bg-background/70 px-2.5 py-1 backdrop-blur">
                <Tag aria-hidden className="size-2.5 shrink-0 text-muted-foreground" />
                <span className="truncate text-[10px] font-medium text-muted-foreground">
                  biponon.com/404
                </span>
              </div>
            </div>

            <div className="relative flex flex-col items-center px-6 pb-10 pt-10 sm:pb-12 sm:pt-12">
              <div className="relative flex items-center justify-center" aria-hidden>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="size-40 rounded-full border border-brand-primary/20 bg-brand-primary/5 blur-xl" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="size-28 rounded-full border border-brand-secondary/15 bg-brand-secondary/5 blur-xl" />
                </div>

                <span className="relative brand-gradient-text text-[6rem] font-black leading-none tracking-[-0.08em] sm:text-[8rem] lg:text-[10rem]">
                  404
                </span>
              </div>

              <div aria-hidden className="mt-8 flex items-center justify-center gap-3">
                <div className="relative group">
                  <span className="grid size-14 place-items-center rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur-sm transition-transform group-hover:scale-105">
                    <Store className="size-5 text-brand-primary" />
                  </span>
                  <span className="absolute -bottom-2 -right-2 size-4 grid place-items-center rounded-full bg-brand-primary text-[9px] font-bold text-white">
                    +
                  </span>
                </div>

                <div className="relative group">
                  <span className="grid size-14 place-items-center rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur-sm transition-transform group-hover:scale-105">
                    <ShoppingBag className="size-5 text-brand-primary" />
                  </span>
                  <span className="absolute -bottom-2 -right-2 size-4 grid place-items-center rounded-full bg-brand-secondary text-[9px] font-bold text-white">
                    1
                  </span>
                </div>

                <div className="relative group">
                  <span className="grid size-14 place-items-center rounded-xl border border-dashed border-border bg-muted/50 shadow-sm backdrop-blur-sm transition-transform group-hover:scale-105">
                    <Tag className="size-5 text-muted-foreground/70" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="section-heading mt-8 max-w-2xl sm:mt-10">
          <span className="section-heading-normal">{t("notFound.oops")}</span>
          <span className="brand-gradient-text mt-1.5 block sm:mt-2">
            {t("notFound.heading")}
          </span>
        </h1>

        <p className="section-description mt-5 max-w-xl text-balance sm:mt-6">
          {t("notFound.description")}
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/" />}
            className={cn(
              "h-11 w-full bg-primary px-6 text-white shadow-[0_12px_28px_-14px_rgba(0,151,107,0.7)] [background-image:var(--brand-gradient)] transition-all hover:text-white hover:shadow-[0_16px_34px_-14px_rgba(0,151,107,0.8)] sm:h-12 sm:w-auto"
            )}
          >
            <ArrowLeft className="size-4" />
            {t("notFound.backHome")}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleGoBack}
            className={cn(
              "h-11 w-full bg-background/80 px-6 backdrop-blur transition-colors hover:bg-muted sm:h-12 sm:w-auto"
            )}
          >
            <RotateCcw className="size-4" />
            {t("notFound.goBack")}
          </Button>
        </div>
      </div>
    </section>
  );
}
