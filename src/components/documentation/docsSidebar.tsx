"use client";

import React, { useState } from "react";
import { DocCategory } from "@/lib/docs/types";
import { useLanguage } from "@/lib/i18n/languageContext";
import {
  Rocket,
  Store,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Menu,
  X,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsSidebarProps {
  categories: DocCategory[];
  activeArticleId: string;
  onSelectArticle: (articleId: string) => void;
  onOpenSearch: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Store,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  HelpCircle,
};

export function DocsSidebar({
  categories,
  activeArticleId,
  onSelectArticle,
  onOpenSearch,
}: DocsSidebarProps) {
  const { language } = useLanguage();
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleSelect = (articleId: string) => {
    onSelectArticle(articleId);
    setIsMobileOpen(false);
  };

  const isBn = language === "bn";

  // Sidebar navigation content
  const sidebarContent = (
    <div className="flex flex-col gap-6 py-4">
      {/* Search trigger inside sidebar */}
      <button
        type="button"
        onClick={onOpenSearch}
        className="flex h-9 w-full items-center justify-between rounded-xl border border-border/80 bg-muted/40 px-3 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:bg-card hover:text-foreground dark:border-white/10 dark:bg-card/40"
      >
        <span className="flex items-center gap-2">
          <Search className="size-3.5 text-muted-foreground" />
          <span>{isBn ? "অনুসন্ধান করুন..." : "Quick search..."}</span>
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/80">
          ⌘K
        </span>
      </button>

      {/* Category Accordion Navigation */}
      <nav aria-label="Documentation Categories" className="flex flex-col gap-4">
        {categories.map((category) => {
          const isCollapsed = !!collapsedCategories[category.id];
          const IconComponent = ICON_MAP[category.iconName] || BookOpen;
          const hasActiveArticle = category.articles.some(
            (art) => art.id.toLowerCase() === activeArticleId.toLowerCase()
          );

          return (
            <div key={category.id} className="flex flex-col">
              {/* Category Header */}
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-bold uppercase tracking-wider transition-colors",
                  hasActiveArticle
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  <IconComponent className="size-4 shrink-0 text-primary" />
                  <span className={isBn ? "font-bangla" : ""}>
                    {category.name}
                  </span>
                </span>
                <span className="shrink-0 p-0.5 text-muted-foreground/70">
                  {isCollapsed ? (
                    <ChevronRight className="size-3.5" />
                  ) : (
                    <ChevronDown className="size-3.5" />
                  )}
                </span>
              </button>

              {/* Articles List under category */}
              {!isCollapsed && (
                <div className="mt-1 flex flex-col space-y-0.5 border-l border-border/60 pl-2.5 ml-4 dark:border-white/10">
                  {category.articles.map((article) => {
                    const isActive =
                      article.id.toLowerCase() ===
                      activeArticleId.toLowerCase();

                    return (
                      <button
                        key={article.id}
                        type="button"
                        onClick={() => handleSelect(article.id)}
                        className={cn(
                          "group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-all",
                          isActive
                            ? "bg-primary/10 font-bold text-primary dark:bg-primary/15"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "truncate",
                            isBn ? "font-bangla" : ""
                          )}
                        >
                          {article.title}
                        </span>
                        {isActive && (
                          <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Top Navigation Bar Toggle */}
      <div className="sticky top-20 z-30 flex items-center justify-between border-b border-border/70 bg-background/95 px-4 py-2.5 backdrop-blur-md lg:hidden dark:border-white/10">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-muted/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <Menu className="size-4 text-primary" />
          <span>{isBn ? "গাইড মেনু" : "Docs Menu"}</span>
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/60 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Search className="size-3.5" />
          <span>{isBn ? "অনুসন্ধান" : "Search"}</span>
        </button>
      </div>

      {/* Mobile Drawer (Sheet) */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex backdrop-blur-xs bg-black/40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="relative flex h-full w-[85%] max-w-xs flex-col bg-card p-5 shadow-2xl overflow-y-auto dark:bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/70 pb-3 dark:border-white/10">
              <span className="font-heading text-sm font-bold text-foreground">
                {isBn ? "ডকুমেন্টেশন মেনু" : "Documentation Menu"}
              </span>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-4 custom-scrollbar">
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}
