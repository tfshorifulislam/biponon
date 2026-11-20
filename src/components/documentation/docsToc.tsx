"use client";

import React, { useEffect, useState } from "react";
import { DocSection } from "@/lib/docs/types";
import { useLanguage } from "@/lib/i18n/languageContext";
import { ArrowUp, AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsTocProps {
  sections: DocSection[];
}

export function DocsToc({ sections }: DocsTocProps) {
  const { language } = useLanguage();
  const [userScrolledId, setUserScrolledId] = useState<string>("");

  const activeSectionId =
    userScrolledId && sections.some((s) => s.id === userScrolledId)
      ? userScrolledId
      : sections[0]?.id || "";

  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPosition) {
          setUserScrolledId(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToHeading = (id: string) => {
    setUserScrolledId(id);
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isBn = language === "bn";

  if (sections.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pl-4 border-l border-border/60 custom-scrollbar dark:border-white/10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2">
          <AlignLeft className="size-3.5 text-primary" />
          <span>{isBn ? "এই পৃষ্ঠায়" : "On This Page"}</span>
        </div>

        <nav aria-label="Table of contents" className="mt-2 flex flex-col space-y-1">
          {sections.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToHeading(sec.id)}
                className={cn(
                  "block w-full text-left text-xs transition-colors py-1 pl-2 rounded-md",
                  isActive
                    ? "font-bold text-primary bg-primary/10 dark:bg-primary/15"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                  isBn ? "font-bangla" : ""
                )}
              >
                <span className="line-clamp-1">{sec.title}</span>
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
            <div className="flex size-6 items-center justify-center rounded-full bg-muted/60 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <ArrowUp className="size-3" />
            </div>
            <span>{isBn ? "উপরে যান" : "Back to Top"}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
