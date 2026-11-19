"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | HTMLElement | number,
    options?: {
      offset?: number;
      immediate?: boolean;
      duration?: number;
      easing?: (t: number) => number;
    }
  ) => void;
}

class LenisStore {
  private lenis: Lenis | null = null;
  private listeners: Set<() => void> = new Set();

  get() {
    return this.lenis;
  }

  set(instance: Lenis | null) {
    this.lenis = instance;
    this.listeners.forEach((listener) => listener());
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
}

const lenisStore = new LenisStore();

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export function useSmoothScroll(): SmoothScrollContextType {
  return useContext(SmoothScrollContext);
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const lenis = useSyncExternalStore(
    lenisStore.subscribe,
    () => lenisStore.get(),
    () => null
  );

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    // If user prefers reduced motion, do not initialize smooth scrolling
    if (reducedMotion) {
      const active = lenisStore.get();
      if (active) {
        active.destroy();
        lenisStore.set(null);
      }
      return;
    }

    // Initialize Lenis with natural, premium duration and smooth exponential easing
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoResize: true,
      prevent: (node) => {
        // Allow inner scrollable containers (e.g. mobile navigation sheets, modals, dropdowns)
        return (
          node.hasAttribute("data-lenis-prevent") ||
          node.classList.contains("overflow-y-auto") ||
          node.classList.contains("overflow-auto")
        );
      },
    });

    lenisStore.set(lenisInstance);

    // Use requestAnimationFrame loop with clean cancellation
    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle anchor clicks on the page (e.g. href="#features")
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("#") ||
        (href.startsWith("/#") && window.location.pathname === "/")
      ) {
        const hash = href.startsWith("/#") ? href.slice(1) : href;
        if (hash === "#" || hash.length <= 1) return;

        try {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            lenisInstance.scrollTo(targetEl as HTMLElement, {
              offset: -76, // Offset to clear floating navbar
              duration: 1.2,
            });
            window.history.pushState(null, "", hash);
          }
        } catch {}
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Check if URL has a hash on mount
    if (window.location.hash) {
      try {
        const targetEl = document.querySelector(window.location.hash);
        if (targetEl) {
          setTimeout(() => {
            lenisInstance.scrollTo(targetEl as HTMLElement, {
              offset: -76,
              immediate: true,
            });
          }, 100);
        }
      } catch {}
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      lenisStore.set(null);
    };
  }, [reducedMotion]);

  // Reset scroll to top on page navigation in Next.js App Router
  useEffect(() => {
    const active = lenisStore.get();
    if (active) {
      active.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  const scrollTo = useCallback(
    (
      target: string | HTMLElement | number,
      options?: {
        offset?: number;
        immediate?: boolean;
        duration?: number;
        easing?: (t: number) => number;
      }
    ) => {
      const active = lenisStore.get();
      if (active) {
        active.scrollTo(target, options);
      } else if (typeof window !== "undefined") {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
        } else if (typeof target === "string") {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  const contextValue = useMemo<SmoothScrollContextType>(
    () => ({ lenis, scrollTo }),
    [lenis, scrollTo]
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
