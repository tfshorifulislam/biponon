"use client";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/languageContext";
import {
  getDocsCategories,
  getDocArticle,
  getAdjacentArticles,
} from "@/lib/docs/docsData";
import { DocsHeader } from "@/components/documentation/docsHeader";
import { DocsSidebar } from "@/components/documentation/docsSidebar";
import { DocsContent } from "@/components/documentation/docsContent";
import { DocsToc } from "@/components/documentation/docsToc";
import { DocsSearchDialog } from "@/components/documentation/docsSearchDialog";

const DEFAULT_ARTICLE_ID = "introduction";

function DocumentationView() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const contentAreaRef = useRef<HTMLDivElement>(null);

  const guideParam = searchParams.get("guide");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Active article ID is derived from selected state or URL search param
  const activeArticleId =
    selectedArticleId || guideParam || DEFAULT_ARTICLE_ID;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Categories in current language
  const categories = useMemo(() => {
    return getDocsCategories(language);
  }, [language]);

  // Current active article in current language
  const activeArticle = useMemo(() => {
    return (
      getDocArticle(activeArticleId, language) ||
      getDocArticle(DEFAULT_ARTICLE_ID, language) ||
      categories[0].articles[0]
    );
  }, [activeArticleId, language, categories]);

  // Previous and next article navigation
  const adjacent = useMemo(() => {
    return getAdjacentArticles(activeArticle.id, language);
  }, [activeArticle.id, language]);

  // Switch article handler with URL sync
  const handleSelectArticle = useCallback((articleId: string) => {
    setSelectedArticleId(articleId);

    // Update URL query parameter without full page reload
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("guide", articleId);
      window.history.pushState({}, "", url.toString());

      // Scroll content area smoothly into view if on mobile or lower on page
      if (contentAreaRef.current) {
        const top =
          contentAreaRef.current.getBoundingClientRect().top +
          window.scrollY -
          90;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update dynamic document title
  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title} — Biponon Documentation`;
    }
  }, [activeArticle]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      {/* 1. Header with Eyebrow, Heading, Search Bar & Quick-Start Cards */}
      <DocsHeader
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectArticle={handleSelectArticle}
      />

      {/* 2. Main 3-Column Documentation Container */}
      <div
        ref={contentAreaRef}
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-10">
          {/* Left Column: Navigation Sidebar */}
          <DocsSidebar
            categories={categories}
            activeArticleId={activeArticle.id}
            onSelectArticle={handleSelectArticle}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Center Column: Article Content */}
          <DocsContent
            article={activeArticle}
            prevArticle={adjacent.prev}
            nextArticle={adjacent.next}
            onSelectArticle={handleSelectArticle}
          />

          {/* Right Column: Table of Contents */}
          <DocsToc sections={activeArticle.sections} />
        </div>
      </div>

      {/* 3. Search Modal Dialog */}
      <DocsSearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}

function DocsLoadingFallback() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center pt-32">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-xs text-muted-foreground font-medium">
          Loading documentation...
        </span>
      </div>
    </div>
  );
}

export default function DocumentationPage() {
  return (
    <Suspense fallback={<DocsLoadingFallback />}>
      <DocumentationView />
    </Suspense>
  );
}
