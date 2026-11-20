"use client";

import React, { useEffect, useState } from "react";
import { AlignLeft, ArrowUp, ChevronDown, Check } from "lucide-react";
import { RefundSection } from "@/lib/refund/refundData";
import { useSmoothScroll } from "@/components/providers/smoothScrollProvider";
import { cn } from "@/lib/utils";

interface RefundTocProps {
  sections: RefundSection[];
  tocTitle: string;
  backToTopLabel: string;
  isBn: boolean;
}

export function RefundToc({
  sections,
  tocTitle,
  backToTopLabel,
  isBn,
}: RefundTocProps) {
  const { scrollTo } = useSmoothScroll();
  const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (sections.length === 0) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 120;

          // When near bottom of page, highlight the last section
          if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 60
          ) {
            setActiveSectionId(sections[sections.length - 1].id);
            ticking = false;
            return;
          }

          // Search from bottom to top
          for (let i = sections.length - 1; i >= 0; i--) {
            const sec = sections[i];
            const el = document.getElementById(sec.id);
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY;
              if (scrollPosition >= top) {
                setActiveSectionId(sec.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToHeading = (id: string) => {
    setActiveSectionId(id);
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const topOffset = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 88);
      scrollTo(topOffset, { duration: 0.9 });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const scrollToTop = () => {
    scrollTo(0, { duration: 0.9 });
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  const currentSection = sections.find((s) => s.id === activeSectionId) || sections[0];

  return (
    <>
      {/* Mobile Sticky Quick-Jump Bar */}
      <div className="lg:hidden sticky top-16 sm:top-20 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2.5 bg-background/95 backdrop-blur-md border-b border-border/80 shadow-2xs">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between gap-3 rounded-xl border border-border/80 bg-card/80 px-4 py-2.5 text-xs font-semibold text-foreground shadow-2xs transition-all hover:border-primary/40 dark:border-white/10 dark:bg-card"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="flex items-center gap-2 min-w-0">
            <AlignLeft className="size-4 text-primary shrink-0" />
            <span className="text-muted-foreground shrink-0">{tocTitle}:</span>
            <span className={`truncate text-foreground font-bold ${isBn ? "font-bangla" : ""}`}>
              {currentSection?.number}. {currentSection?.title}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
              isMobileMenuOpen && "rotate-180"
            )}
          />
        </button>

        {/* Mobile Dropdown Panel */}
        {isMobileMenuOpen && (
          <div
            data-lenis-prevent
            className="mt-2 max-h-72 overflow-y-auto rounded-xl border border-border/80 bg-card p-2 shadow-xl backdrop-blur-lg dark:border-white/15"
          >
            <nav className="space-y-1">
              {sections.map((section) => {
                const isActive = activeSectionId === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToHeading(section.id)}
                    className={cn(
                      "w-full flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-left text-xs transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-bold dark:bg-primary/20"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] opacity-75 shrink-0">
                        {section.number}
                      </span>
                      <span className={`truncate ${isBn ? "font-bangla" : ""}`}>
                        {section.title}
                      </span>
                    </span>
                    {isActive && <Check className="size-3.5 text-primary shrink-0" />}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-28 self-start">
        <div className="rounded-2xl border border-border/70 bg-card/60 p-5 shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-card/40">
          <div className="flex items-center justify-between pb-3.5 border-b border-border/60 dark:border-white/10">
            <div className="flex items-center gap-2 text-foreground font-bold text-sm tracking-tight">
              <AlignLeft className="size-4 text-primary" />
              <h2 className={isBn ? "font-bangla" : ""}>{tocTitle}</h2>
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-mono font-semibold text-primary dark:bg-primary/20">
              {sections.length}
            </span>
          </div>

          <nav
            data-lenis-prevent
            aria-label="Table of contents"
            className="mt-4 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-muted"
          >
            {sections.map((section) => {
              const isActive = activeSectionId === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToHeading(section.id)}
                  className={cn(
                    "group w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs transition-all duration-200 outline-none select-none",
                    isActive
                      ? "bg-primary/15 text-primary font-bold shadow-2xs dark:bg-primary/20"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-5 place-items-center rounded-md font-mono text-[10px] shrink-0 transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20 group-hover:text-foreground"
                    )}
                  >
                    {section.number}
                  </span>
                  <span
                    className={cn(
                      "truncate transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                      isBn ? "font-bangla" : ""
                    )}
                  >
                    {section.title}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-3.5 border-t border-border/60 dark:border-white/10">
            <button
              type="button"
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/80 py-2 text-xs font-semibold text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-card hover:text-primary dark:border-white/10 dark:bg-card/60"
            >
              <ArrowUp className="size-3.5" />
              <span className={isBn ? "font-bangla" : ""}>{backToTopLabel}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
