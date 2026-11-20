"use client";

import React, { useEffect, useState } from "react";
import { AlignLeft, ArrowUp, ChevronDown, Check } from "lucide-react";
import { TermsSection } from "@/lib/terms/termsData";
import { useSmoothScroll } from "@/components/providers/smoothScrollProvider";
import { cn } from "@/lib/utils";

interface TermsTocProps {
  sections: TermsSection[];
  tocTitle: string;
  backToTopLabel: string;
  isBn: boolean;
}

export function TermsToc({
  sections,
  tocTitle,
  backToTopLabel,
  isBn,
}: TermsTocProps) {
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
      {/* Mobile Quick-Jump Dropdown Bar */}
      <div className="lg:hidden mb-8 sticky top-16 z-30 -mx-4 px-4 py-2.5 bg-background/90 backdrop-blur-md border-b border-border/60 dark:border-white/10 sm:-mx-6 sm:px-6">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-left text-xs font-medium text-foreground shadow-xs"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="font-mono font-bold text-primary">{currentSection?.number}</span>
            <span className={`truncate font-semibold ${isBn ? "font-bangla" : ""}`}>
              {currentSection?.title}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200 shrink-0",
              isMobileMenuOpen ? "rotate-180" : ""
            )}
          />
        </button>

        {isMobileMenuOpen && (
          <div className="mt-2 max-h-72 overflow-y-auto rounded-xl border border-border/80 bg-card p-2 shadow-lg dark:border-white/10 custom-scrollbar">
            <div className="flex flex-col gap-0.5">
              {sections.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToHeading(sec.id)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors",
                      isActive
                        ? "bg-primary/10 font-bold text-primary dark:bg-primary/15"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                      isBn ? "font-bangla" : ""
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[11px] text-primary/70">{sec.number}</span>
                      <span className="truncate">{sec.title}</span>
                    </div>
                    {isActive && <Check className="size-3.5 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3 pl-1 border-r border-border/60 custom-scrollbar dark:border-white/10">
          <div className="flex items-center gap-2 pb-3 border-b border-border/50 text-xs font-bold uppercase tracking-wider text-muted-foreground dark:border-white/10">
            <AlignLeft className="size-3.5 text-primary" />
            <span className={isBn ? "font-bangla" : ""}>{tocTitle}</span>
          </div>

          <nav aria-label="Terms of Service Sections" className="mt-3 flex flex-col space-y-1">
            {sections.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToHeading(sec.id)}
                  className={cn(
                    "group flex items-start gap-2.5 w-full text-left text-xs transition-all py-1.5 px-2 rounded-lg",
                    isActive
                      ? "font-semibold text-primary bg-primary/10 dark:bg-primary/15 shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    isBn ? "font-bangla" : ""
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] shrink-0 pt-0.5",
                      isActive
                        ? "font-bold text-primary"
                        : "text-muted-foreground/70 group-hover:text-primary"
                    )}
                  >
                    {sec.number}
                  </span>
                  <span className="line-clamp-1 leading-relaxed">{sec.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Back to Top */}
          <div className="mt-8 border-t border-border/60 pt-4 dark:border-white/10">
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <div className="flex size-6 items-center justify-center rounded-full bg-muted/60 transition-colors group-hover:bg-primary/10 group-hover:text-primary dark:bg-white/5">
                <ArrowUp className="size-3" />
              </div>
              <span className={isBn ? "font-bangla" : ""}>{backToTopLabel}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
