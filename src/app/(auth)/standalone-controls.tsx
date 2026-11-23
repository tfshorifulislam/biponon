"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import { LanguageSwitcher } from "@/components/navbar/languageSwitcher";

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

export function StandaloneTopControls() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const toggleTheme = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-end p-4 sm:p-6 lg:p-8">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-2.5 py-1 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-card/70">
        <LanguageSwitcher />
        <span
          className="select-none text-xs font-light text-muted-foreground/40"
          aria-hidden="true"
        >
          |
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:hover:bg-white/10"
        >
          {theme === "dark" ? (
            <Moon className="size-3.5" />
          ) : (
            <Sun className="size-3.5" />
          )}
        </button>
      </div>
    </header>
  );
}
