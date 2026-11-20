"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/smoothScrollProvider";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  label: string;
}

export function BackToTop({ label }: BackToTopProps) {
  const { scrollTo } = useSmoothScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    scrollTo(0, { duration: 0.9 });
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label={label}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-border/80 bg-background/90 px-3.5 py-2.5 text-xs font-semibold text-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-card hover:text-primary hover:shadow-xl dark:border-white/10 dark:bg-card/90",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp className="size-4 text-primary shrink-0" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
