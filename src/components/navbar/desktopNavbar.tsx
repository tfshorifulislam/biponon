"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/languageContext";
import { BrandLogo } from "./brandLogo";
import { LanguageSwitcher } from "./languageSwitcher";
import { navLinks } from "./navLinks";

const THEME_CHANGE_EVENT = "biponon_theme_change";

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function getThemeSnapshot(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  try {
    if (document.documentElement.classList.contains("dark")) return "dark";
    const stored = localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function getThemeServerSnapshot(): "light" | "dark" {
  return "light";
}

function isActiveRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNavbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
        window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
      }
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const nextTheme = isDark ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", nextTheme);
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    } catch {}
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="hidden w-full items-center justify-between gap-3 xl:gap-8 lg:flex"
    >
      <BrandLogo />

      <ul className="flex items-center gap-0.5 xl:gap-1">
        {navLinks.map((link) => {
          const active = isActiveRoute(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-muted hover:text-foreground xl:px-3 xl:py-2 xl:text-sm",
                  active
                    ? "bg-[#00976B] text-white dark:text-black"
                    : "text-muted-foreground",
                )}
              >
                {t(link.key)}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex shrink-0 items-center gap-1.5 xl:gap-2">
        <LanguageSwitcher />

        <span
          className="text-muted-foreground/40 text-xs font-light select-none"
          aria-hidden="true"
        >
          |
        </span>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:hover:bg-white/10"
        >
          {theme === "dark" ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </button>

        <div
          role="group"
          aria-label="Account actions"
          className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/50 p-1 dark:border-white/10 dark:bg-white/5"
        >
          <Button
            variant="ghost"
            className="h-9 rounded-full px-3 text-xs font-medium text-muted-foreground transition-all hover:bg-background/70 hover:text-foreground xl:h-10 xl:px-4 xl:text-sm dark:hover:bg-white/10"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            {t("nav.login")}
          </Button>
          <Button
            className="h-9 rounded-full bg-primary px-3 text-xs font-semibold text-white shadow-[0_6px_16px_-8px_rgba(0,151,107,0.6)] transition-all [background-image:var(--brand-gradient)] hover:text-white hover:shadow-[0_8px_20px_-8px_rgba(0,151,107,0.7)] hover:brightness-[1.03] xl:h-10 xl:px-4 xl:text-sm"
            nativeButton={false}
            render={<Link href="/create-website" />}
          >
            {t("nav.createWebsite")}
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
