import Link from "next/link";

import { CreateWebsiteShowcase } from "./create-website-showcase";
import { CreateWebsiteWizard } from "./create-website-wizard";

export function CreateWebsiteView() {
  return (
    <section className="relative isolate w-full overflow-hidden px-4 pt-24 pb-14 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,color-mix(in_srgb,var(--brand-soft)_55%,transparent),transparent_75%)] dark:bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,rgba(0,151,107,0.12),transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
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
      <div
        aria-hidden
        className="pointer-events-none absolute top-16 left-1/2 -z-10 h-64 w-[38rem] -translate-x-1/2 rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/10"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-card/80 shadow-[0_50px_120px_-55px_rgba(15,23,42,0.5)] ring-1 ring-foreground/5 backdrop-blur-xl sm:rounded-[1.9rem] dark:border-white/10 dark:bg-card/60 dark:ring-white/10">
          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[48%_52%]">
            <div className="relative order-1 flex min-w-0 bg-card px-4 py-8 sm:px-8 sm:py-10 lg:px-9 lg:py-12 xl:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,color-mix(in_srgb,var(--brand-soft)_70%,transparent),transparent_80%)] dark:bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(0,151,107,0.12),transparent_80%)]"
              />
              <div className="relative z-10 flex w-full min-w-0 items-center">
                <CreateWebsiteWizard />
              </div>
            </div>

            <div className="order-2 flex min-w-0">
              <CreateWebsiteShowcase />
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground/80">
          By creating a store, you agree to our{" "}
          <Link
            href="/terms"
            className="font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
