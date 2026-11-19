"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/navbar/brandLogo";
import { useLanguage } from "@/lib/i18n/languageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30 dark:bg-black/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-1">
            <BrandLogo />
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-foreground">
              {t("footer.productTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/features"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                >
                  {t("footer.links.features")}
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                >
                  {t("footer.links.howItWorks")}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                >
                  {t("footer.links.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                >
                  {t("footer.links.documentation")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-foreground">
              {t("footer.companyTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/#about"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                >
                  {t("footer.links.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                >
                  {t("footer.links.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#careers"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                >
                  {t("footer.links.careers")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-foreground">
              {t("footer.legalTitle")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/#privacy"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                >
                  {t("footer.links.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#terms"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                >
                  {t("footer.links.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <p className="text-xs text-muted-foreground/80">
            {t("footer.madeWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
