"use client";

import Link from "next/link";

import { useLanguage } from "@/lib/i18n/languageContext";
import { AuthShowcase } from "./auth-showcase";
import { LoginForm } from "./login-form";

export function LoginView() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-3.75rem)] sm:min-h-[calc(100dvh-4.5rem)] lg:min-h-[calc(100dvh-5rem)] w-full flex-col justify-between overflow-x-clip px-4 pt-20 pb-6 sm:px-6 sm:pt-24 sm:pb-8 lg:px-8 lg:pt-24 lg:pb-8">
      {/* Background Ambience strictly clipped to prevent horizontal overflow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,color-mix(in_srgb,var(--brand-soft)_55%,transparent),transparent_75%)] dark:bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,rgba(0,151,107,0.12),transparent_75%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--brand-primary) 22%, transparent) 1px, transparent 0)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 10%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 10%, transparent 78%)",
          }}
        />
        <div className="absolute top-16 left-1/2 h-64 w-[38rem] -translate-x-1/2 rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/10" />
      </div>

      {/* Main Split Card Container */}
      <div className="relative mx-auto my-auto w-full max-w-5xl xl:max-w-6xl">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.25)] ring-1 ring-foreground/5 backdrop-blur-xl sm:rounded-3xl dark:border-white/10 dark:bg-card/75 dark:ring-white/10 dark:shadow-[0_24px_70px_-30px_rgba(0,0,0,0.6)]">
          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[46%_54%]">
            <div className="relative order-1 flex min-w-0 bg-card px-4 py-6 sm:px-8 sm:py-8 lg:px-8 lg:py-7 xl:px-10 xl:py-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,color-mix(in_srgb,var(--brand-soft)_70%,transparent),transparent_80%)] dark:bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(0,151,107,0.12),transparent_80%)]"
              />
              <div className="relative z-10 flex w-full min-w-0 flex-col justify-center">
                <LoginForm />
              </div>
            </div>

            <div className="order-2 hidden min-w-0 lg:flex">
              <AuthShowcase />
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground/80 sm:mt-4">
          {t("auth.legal.bySigningIn")}{" "}
          <Link
            href="/terms"
            className="font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            {t("auth.legal.terms")}
          </Link>{" "}
          {t("auth.legal.and")}{" "}
          <Link
            href="/privacy"
            className="font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            {t("auth.legal.privacy")}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
