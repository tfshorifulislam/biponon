"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/languageContext";
import { useSmoothScroll } from "@/components/providers/smoothScrollProvider";
import { BrandLogo } from "./brandLogo";
import { LanguageSwitcher } from "./languageSwitcher";
import { navLinks, NavLinkItem } from "./navLinks";
import {
  getActiveHomepageSection,
  getSectionScrollTop,
} from "./navScrollUtils";

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

export function DesktopNavbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { scrollTo } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const isScrollingToRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Track active section on homepage scroll using unified navbar-adjusted reference position
  useEffect(() => {
    if (pathname !== "/") return;

    let ticking = false;
    const onScroll = () => {
      // Do not override active section while smooth scrolling to a clicked link
      if (isScrollingToRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!isScrollingToRef.current) {
            setActiveSection(getActiveHomepageSection());
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // User manual wheel or touch breaks programmatic scroll lock
    const onUserInteraction = () => {
      isScrollingToRef.current = null;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onUserInteraction, { passive: true });
    window.addEventListener("touchstart", onUserInteraction, { passive: true });

    // Initial check scheduled via requestAnimationFrame
    const rafId = window.requestAnimationFrame(() => {
      if (!isScrollingToRef.current) {
        setActiveSection(getActiveHomepageSection());
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [pathname]);

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

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: NavLinkItem) => {
      if (pathname === "/" && link.sectionId) {
        e.preventDefault();
        const targetEl = document.getElementById(link.sectionId);
        if (targetEl) {
          const targetScroll = getSectionScrollTop(targetEl);

          // 1. Make the target section active immediately
          setActiveSection(link.sectionId);
          isScrollingToRef.current = link.sectionId;

          // Lock active section during smooth scrolling animation (~1s)
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingToRef.current = null;
            scrollTimeoutRef.current = null;
            // Verify and re-confirm active section at final resting position
            setActiveSection(getActiveHomepageSection());
          }, 1100);

          // 2. Scroll to the actual TOP of target section positioned just below sticky navbar
          scrollTo(targetScroll, { duration: 1.0 });

          // 3. Update URL hash cleanly
          window.history.pushState(
            null,
            "",
            link.sectionId === "hero" ? "/" : `#${link.sectionId}`
          );
        }
      }
    },
    [pathname, scrollTo]
  );

  const isLinkActive = useCallback(
    (link: NavLinkItem) => {
      if (pathname.startsWith("/documentation")) {
        return link.href === "/documentation";
      }
      if (pathname === "/") {
        if (link.href === "/documentation") return false;
        return link.sectionId === activeSection;
      }
      return link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
    },
    [pathname, activeSection]
  );

  return (
    <nav
      aria-label="Main navigation"
      className="hidden w-full items-center justify-between gap-2 xl:gap-6 lg:flex"
    >
      <BrandLogo />

      <ul className="flex items-center gap-0.5 xl:gap-1">
        {navLinks.map((link) => {
          const active = isLinkActive(link);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-2 py-1.5 text-xs font-medium transition-colors hover:bg-muted hover:text-foreground xl:px-2.5 xl:py-2 xl:text-sm",
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
