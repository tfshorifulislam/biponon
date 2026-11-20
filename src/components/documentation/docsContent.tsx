"use client";

import React, { useState } from "react";
import { DocArticle } from "@/lib/docs/types";
import { useLanguage } from "@/lib/i18n/languageContext";
import {
  Clock,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Lightbulb,
  AlertTriangle,
  Info,
  ChevronUp,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsContentProps {
  article: DocArticle;
  prevArticle?: DocArticle;
  nextArticle?: DocArticle;
  onSelectArticle: (articleId: string) => void;
}

export function DocsContent({
  article,
  prevArticle,
  nextArticle,
  onSelectArticle,
}: DocsContentProps) {
  const { language } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const isBn = language === "bn";

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <article className="min-w-0 flex-1 max-w-4xl py-4 pb-16">
      {/* 1. Breadcrumbs */}
      <nav
        aria-label="Breadcrumbs"
        className="flex items-center gap-2 text-xs text-muted-foreground"
      >
        <span>{isBn ? "ডকুমেন্টেশন" : "Documentation"}</span>
        <ChevronRight className="size-3 text-muted-foreground/60" />
        <span className={isBn ? "font-bangla" : ""}>
          {article.categoryName}
        </span>
        <ChevronRight className="size-3 text-muted-foreground/60" />
        <span
          className={cn(
            "font-semibold text-foreground truncate",
            isBn ? "font-bangla" : ""
          )}
        >
          {article.title}
        </span>
      </nav>

      {/* 2. Article Header */}
      <header className="mt-6 border-b border-border/70 pb-6 dark:border-white/10">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary dark:bg-primary/20">
            {article.categoryName}
          </span>
          {article.badge && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              {article.badge}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            <span>{article.readTime}</span>
          </span>
        </div>

        <h1
          className={`font-heading mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl ${
            isBn ? "font-bangla" : ""
          }`}
        >
          {article.title}
        </h1>

        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground ${
            isBn ? "font-bangla" : ""
          }`}
        >
          {article.description}
        </p>
      </header>

      {/* 3. Article Sections */}
      <div className="mt-8 flex flex-col gap-10">
        {article.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 flex flex-col gap-4"
          >
            {/* Section Heading */}
            <h2
              className={`font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground border-b border-border/40 pb-2 dark:border-white/5 ${
                isBn ? "font-bangla" : ""
              }`}
            >
              {section.title}
            </h2>

            {/* Paragraphs */}
            {section.content.map((paragraph, pIdx) => (
              <p
                key={pIdx}
                className={`text-sm sm:text-base leading-relaxed text-foreground/90 ${
                  isBn ? "font-bangla" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}

            {/* Bullet Points */}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-2 space-y-2.5 pl-2">
                {section.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span
                      className={`text-sm sm:text-[15px] leading-relaxed text-foreground/85 ${
                        isBn ? "font-bangla" : ""
                      }`}
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Numbered Steps */}
            {section.steps && section.steps.length > 0 && (
              <div className="mt-4 flex flex-col gap-3.5">
                {section.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="flex items-start gap-4 rounded-xl border border-border/70 bg-card/60 p-4 sm:p-5 shadow-2xs backdrop-blur-sm dark:border-white/10 dark:bg-card/40"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white shadow-xs">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-heading text-sm sm:text-base font-bold text-foreground ${
                          isBn ? "font-bangla" : ""
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground ${
                          isBn ? "font-bangla" : ""
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Code Snippet Box (e.g. for DNS records) */}
            {section.codeSnippet && (
              <div className="mt-3 overflow-hidden rounded-xl border border-border/80 bg-zinc-950 text-zinc-100 shadow-md">
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs font-mono text-zinc-400">
                  <span>{section.codeSnippet.label}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(section.codeSnippet!.code, section.id)
                    }
                    className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                  >
                    {copiedKey === section.id ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">
                          {isBn ? "কপি হয়েছে!" : "Copied!"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>{isBn ? "কপি করুন" : "Copy"}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-relaxed text-zinc-200">
                  <code>{section.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Callouts (info / tip / warning) */}
            {section.callout && (
              <div
                className={cn(
                  "mt-3 flex items-start gap-3 rounded-xl border p-4 text-xs sm:text-sm leading-relaxed",
                  section.callout.type === "tip" &&
                    "border-primary/30 bg-primary/10 text-foreground dark:border-primary/40 dark:bg-primary/15",
                  section.callout.type === "warning" &&
                    "border-amber-500/30 bg-amber-500/10 text-foreground dark:border-amber-500/40 dark:bg-amber-500/15",
                  section.callout.type === "info" &&
                    "border-blue-500/30 bg-blue-500/10 text-foreground dark:border-blue-500/40 dark:bg-blue-500/15"
                )}
              >
                {section.callout.type === "tip" && (
                  <Lightbulb className="size-5 shrink-0 text-primary mt-0.5" />
                )}
                {section.callout.type === "warning" && (
                  <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                )}
                {section.callout.type === "info" && (
                  <Info className="size-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                )}
                <div className="flex-1">
                  {section.callout.title && (
                    <strong
                      className={`block font-semibold mb-1 text-foreground ${
                        isBn ? "font-bangla" : ""
                      }`}
                    >
                      {section.callout.title}
                    </strong>
                  )}
                  <span className={isBn ? "font-bangla" : ""}>
                    {section.callout.text}
                  </span>
                </div>
              </div>
            )}

            {/* Real-World Example Box */}
            {section.example && (
              <div className="mt-3 rounded-xl border border-border/80 bg-muted/40 p-5 dark:border-white/10 dark:bg-card/50">
                <div className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                  <BookOpen className="size-4 text-primary" />
                  <span className={isBn ? "font-bangla" : ""}>
                    {section.example.title}
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-foreground">
                      {isBn ? "পরিস্থিতি: " : "Scenario: "}
                    </span>
                    <span
                      className={`text-muted-foreground ${
                        isBn ? "font-bangla" : ""
                      }`}
                    >
                      {section.example.scenario}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">
                      {isBn ? "ফলাফল: " : "Outcome: "}
                    </span>
                    <span
                      className={`text-foreground/90 font-medium ${
                        isBn ? "font-bangla" : ""
                      }`}
                    >
                      {section.example.outcome}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Troubleshooting Items */}
            {section.troubleshooting &&
              section.troubleshooting.length > 0 && (
                <div className="mt-3 flex flex-col gap-3">
                  {section.troubleshooting.map((item, tIdx) => (
                    <div
                      key={tIdx}
                      className="rounded-xl border border-border/70 bg-card/60 p-4 dark:border-white/10 dark:bg-card/40"
                    >
                      <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                        <HelpCircle className="size-4 text-amber-500 shrink-0" />
                        <span className={isBn ? "font-bangla" : ""}>
                          {item.problem}
                        </span>
                      </div>
                      <p
                        className={`mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground pl-6 ${
                          isBn ? "font-bangla" : ""
                        }`}
                      >
                        {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            {/* Pro Tips List */}
            {section.tips && section.tips.length > 0 && (
              <div className="mt-3 rounded-xl border border-primary/25 bg-primary/5 p-4 sm:p-5 dark:border-primary/30 dark:bg-primary/10">
                <div className="flex items-center gap-2 font-heading text-sm font-bold text-primary">
                  <Lightbulb className="size-4" />
                  <span>{isBn ? "পেশাদার পরামর্শ" : "Pro Tips"}</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {section.tips.map((tip, tipIdx) => (
                    <li
                      key={tipIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-foreground/90"
                    >
                      <Check className="size-4 shrink-0 text-primary mt-0.5" />
                      <span className={isBn ? "font-bangla" : ""}>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* 4. Related Guides */}
      {article.relatedArticleIds && article.relatedArticleIds.length > 0 && (
        <div className="mt-12 rounded-2xl border border-border/70 bg-card/40 p-5 dark:border-white/10 dark:bg-card/30">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {isBn ? "সম্পর্কিত অন্যান্য গাইড" : "Related Guides"}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {article.relatedArticleIds.map((relId) => (
              <button
                key={relId}
                type="button"
                onClick={() => onSelectArticle(relId)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary dark:border-white/10"
              >
                <span>{relId.replace(/-/g, " ")}</span>
                <ArrowRight className="size-3 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. Previous / Next Article Navigation */}
      <div className="mt-12 flex flex-col sm:flex-row items-stretch justify-between gap-4 border-t border-border/70 pt-6 dark:border-white/10">
        {prevArticle ? (
          <button
            type="button"
            onClick={() => onSelectArticle(prevArticle.id)}
            className="group flex flex-1 flex-col items-start rounded-xl border border-border/70 bg-card/60 p-4 text-left transition-all hover:border-primary/50 hover:bg-card hover:shadow-sm dark:border-white/10 dark:bg-card/40"
          >
            <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground group-hover:text-primary">
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
              <span>{isBn ? "পূর্ববর্তী গাইড" : "Previous"}</span>
            </span>
            <span
              className={`font-heading mt-1 text-sm font-bold text-foreground line-clamp-1 ${
                isBn ? "font-bangla" : ""
              }`}
            >
              {prevArticle.title}
            </span>
          </button>
        ) : (
          <div className="flex-1" />
        )}

        {nextArticle ? (
          <button
            type="button"
            onClick={() => onSelectArticle(nextArticle.id)}
            className="group flex flex-1 flex-col items-end rounded-xl border border-border/70 bg-card/60 p-4 text-right transition-all hover:border-primary/50 hover:bg-card hover:shadow-sm dark:border-white/10 dark:bg-card/40"
          >
            <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground group-hover:text-primary">
              <span>{isBn ? "পরবর্তী গাইড" : "Next"}</span>
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
            </span>
            <span
              className={`font-heading mt-1 text-sm font-bold text-foreground line-clamp-1 ${
                isBn ? "font-bangla" : ""
              }`}
            >
              {nextArticle.title}
            </span>
          </button>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Inline Back to Top button on small screens */}
      <div className="mt-8 flex justify-center xl:hidden">
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronUp className="size-4" />
          <span>{isBn ? "পৃষ্ঠার শুরুতে যান" : "Back to Top"}</span>
        </button>
      </div>
    </article>
  );
}
