"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/languageContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

export function MobileNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
    <div className="flex w-full items-center justify-between lg:hidden">
      <BrandLogo />

      <div className="flex items-center gap-1.5 sm:gap-2">
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

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label={t("nav.openMenu")}
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent side="right" className="w-[85%] max-w-sm p-0">
            <SheetHeader className="border-b p-5">
              <SheetTitle className="sr-only">{t("nav.menuTitle")}</SheetTitle>
              <SheetDescription className="sr-only">
                {t("nav.menuDescription")}
              </SheetDescription>
              <BrandLogo />
            </SheetHeader>

            <nav
              aria-label="Mobile navigation"
              className="flex-1 overflow-y-auto p-3"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActiveRoute(pathname, link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted hover:text-brand",
                          active
                            ? "bg-[#00976B] text-white dark:text-black"
                            : "text-foreground",
                        )}
                      >
                        {t(link.key)}
                        <ArrowRight
                          className={cn(
                            "size-4",
                            active
                              ? "text-white dark:text-black"
                              : "text-muted-foreground",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <SheetFooter className="border-t p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1 py-1">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("nav.languageLabel")}
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2">
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
                </div>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="h-11 w-full"
                nativeButton={false}
                render={
                  <Link href="/login" onClick={() => setOpen(false)} />
                }
              >
                {t("nav.login")}
              </Button>
              <Button
                size="lg"
                className="h-11 w-full"
                nativeButton={false}
                render={
                  <Link
                    href="/create-website"
                    onClick={() => setOpen(false)}
                  />
                }
              >
                {t("nav.createWebsite")}
                <ArrowRight className="size-4" />
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
