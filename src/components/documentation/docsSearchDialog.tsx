"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useLanguage } from "@/lib/i18n/languageContext";
import { searchDocs } from "@/lib/docs/docsData";
import {
  Search,
  X,
  ArrowRight,
  FileText,
  Command,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (articleId: string) => void;
}

function DocsSearchDialogModal({
  onClose,
  onSelectArticle,
}: Omit<DocsSearchDialogProps, "isOpen">) {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Compute live search results without effect-driven state
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchDocs(query, language);
  }, [query, language]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length > 0 ? (prev + 1) % results.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length > 0 ? (prev - 1 + results.length) % results.length : 0
        );
      } else if (e.key === "Enter") {
        if (results[selectedIndex]) {
          onSelectArticle(results[selectedIndex].articleId);
          onClose();
        }
      }
    },
    [results, selectedIndex, onClose, onSelectArticle]
  );

  const popularTags =
    language === "bn"
      ? [
          { label: "ডোমেন", query: "ডোমেন" },
          { label: "বিকাশ", query: "বিকাশ" },
          { label: "কুরিয়ার", query: "কুরিয়ার" },
          { label: "পণ্য আপলোড", query: "পণ্য" },
          { label: "পিক্সেল", query: "পিক্সেল" },
          { label: "মূল্যতালিকা", query: "প্ল্যান" },
        ]
      : [
          { label: "Custom Domain", query: "domain" },
          { label: "bKash Setup", query: "bKash" },
          { label: "Couriers", query: "courier" },
          { label: "Add Product", query: "product" },
          { label: "Facebook Pixel", query: "pixel" },
          { label: "Pricing Plans", query: "pricing" },
        ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:p-6 sm:pt-24 backdrop-blur-md bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-2xl flex-col rounded-2xl border border-border/80 bg-card text-card-foreground shadow-2xl overflow-hidden transition-all duration-200 dark:border-white/10 dark:bg-card/95"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3.5 dark:border-white/10">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              language === "bn"
                ? "ডকুমেন্টেশন খুঁজুন (যেমন: ডোমেন, বিকাশ, কুরিয়ার)..."
                : "Search documentation guides, settings, and APIs..."
            }
            className={`w-full bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground outline-none ${
              language === "bn" ? "font-bangla" : ""
            }`}
          />
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
              }}
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 rounded border border-border/70 bg-muted/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              <Command className="size-3" />
              <span>K</span>
            </div>
          )}
        </div>

        {/* Popular Tags when query is empty */}
        {!query && (
          <div className="p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {language === "bn" ? "জনপ্রিয় অনুসন্ধান" : "Popular Searches"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => {
                    setQuery(tag.query);
                    setSelectedIndex(0);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-3 py-1.5 text-xs text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary ${
                    language === "bn" ? "font-bangla" : ""
                  }`}
                >
                  <Search className="size-3 text-muted-foreground" />
                  <span>{tag.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {language === "bn"
                ? `${results.length}টি ফলাফল পাওয়া গেছে`
                : `${results.length} guides found`}
            </div>
            <div className="mt-1 flex flex-col gap-1">
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.articleId}
                    type="button"
                    onClick={() => {
                      onSelectArticle(item.articleId);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "flex w-full items-start justify-between gap-3 rounded-xl p-3 text-left transition-colors",
                      isSelected
                        ? "bg-primary/10 text-primary border border-primary/25"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <FileText
                        className={cn(
                          "size-4 shrink-0 mt-0.5",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-md font-medium",
                              isSelected
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {item.categoryName}
                          </span>
                          <span
                            className={`text-sm font-semibold truncate ${
                              language === "bn" ? "font-bangla" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <p
                          className={`mt-1 text-xs text-muted-foreground line-clamp-1 ${
                            language === "bn" ? "font-bangla" : ""
                          }`}
                        >
                          {item.matchedSnippet || item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className={cn(
                        "size-4 shrink-0 transition-transform",
                        isSelected
                          ? "translate-x-0.5 text-primary"
                          : "text-muted-foreground opacity-50"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {query && results.length === 0 && (
          <div className="p-8 text-center">
            <BookOpen className="mx-auto size-8 text-muted-foreground/60" />
            <h4
              className={`mt-3 text-sm font-semibold text-foreground ${
                language === "bn" ? "font-bangla" : ""
              }`}
            >
              {language === "bn"
                ? `"${query}" এর জন্য কোনো গাইড পাওয়া যায়নি`
                : `No guides found for "${query}"`}
            </h4>
            <p
              className={`mt-1 text-xs text-muted-foreground ${
                language === "bn" ? "font-bangla" : ""
              }`}
            >
              {language === "bn"
                ? "বানান পরীক্ষা করুন বা অন্য কোনো সাধারণ কীওয়ার্ড দিয়ে অনুসন্ধান করুন।"
                : "Check your spelling or try searching for another keyword (e.g. domain, bkash, order)."}
            </p>
          </div>
        )}

        {/* Modal Footer / Keyboard Shortcuts */}
        <div className="flex items-center justify-between border-t border-border/70 bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground dark:border-white/10">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[10px]">
                ↑
              </kbd>{" "}
              <kbd className="rounded border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[10px]">
                ↓
              </kbd>{" "}
              {language === "bn" ? "ন্যাভিগেট" : "Navigate"}
            </span>
            <span>
              <kbd className="rounded border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[10px]">
                Enter
              </kbd>{" "}
              {language === "bn" ? "নির্বাচন" : "Select"}
            </span>
          </div>
          <span>
            <kbd className="rounded border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[10px]">
              Esc
            </kbd>{" "}
            {language === "bn" ? "বন্ধ করুন" : "Close"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function DocsSearchDialog(props: DocsSearchDialogProps) {
  if (!props.isOpen) return null;
  return (
    <DocsSearchDialogModal
      onClose={props.onClose}
      onSelectArticle={props.onSelectArticle}
    />
  );
}
