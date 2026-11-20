"use client";

import React, { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export interface GlobalLoadingProps {
  /**
   * When true (default), covers the entire viewport with a fixed backdrop.
   * When false, renders as a centered flex container within its parent element.
   */
  fullscreen?: boolean;
  /**
   * Style of the continuous loading indicator:
   * - "progress" (default): A slim, modern horizontal gradient progress bar.
   * - "dots": Three subtle pulsing dots with staggered delay.
   */
  variant?: "progress" | "dots";
  /**
   * Additional CSS classes for custom styling or positioning.
   */
  className?: string;
}

const STORAGE_KEY = "biponon_language";
const LANGUAGE_CHANGE_EVENT = "biponon_language_change";

function subscribeLanguage(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, callback);
  };
}

function getLanguageSnapshot(): "en" | "bn" {
  if (typeof window === "undefined") {
    return "en";
  }
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val === "bn" || val === "en" ? val : "en";
  } catch {
    return "en";
  }
}

function getLanguageServerSnapshot(): "en" | "bn" {
  return "en";
}

export function GlobalLoading({
  fullscreen = true,
  variant = "progress",
  className,
}: GlobalLoadingProps) {
  // Synchronize directly with the project's language store to prevent context errors during root/error pre-renders
  const language = useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    getLanguageServerSnapshot
  );
  const isBn = language === "bn";

  const loadingText = isBn
    ? "আপনার অভিজ্ঞতা প্রস্তুত করা হচ্ছে..."
    : "Loading your experience...";

  return (
    <>
      <style>{`
        @keyframes biponon-progress-indeterminate {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(35%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes biponon-dot-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
        .biponon-progress-bar {
          animation: biponon-progress-indeterminate 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .biponon-dot {
          animation: biponon-dot-pulse 1.4s ease-in-out infinite;
        }
        .biponon-dot-1 {
          animation-delay: 0s;
        }
        .biponon-dot-2 {
          animation-delay: 0.2s;
        }
        .biponon-dot-3 {
          animation-delay: 0.4s;
        }
        @media (prefers-reduced-motion: reduce) {
          .biponon-progress-bar {
            animation: none !important;
            width: 100% !important;
            transform: none !important;
            opacity: 0.85 !important;
          }
          .biponon-dot {
            animation: none !important;
            opacity: 0.8 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-label={isBn ? "লোড হচ্ছে..." : "Loading..."}
        className={cn(
          "flex flex-col items-center justify-center transition-colors duration-200",
          fullscreen
            ? "fixed inset-0 z-50 bg-white dark:bg-[#090d0b] text-foreground px-4"
            : "min-h-[50vh] w-full bg-transparent text-foreground px-4 py-12",
          className
        )}
      >
        <div className="flex flex-col items-center text-center">
          {/* Centered Biponon Brand Logo */}
          <div className="flex items-center gap-3 select-none">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00976B] to-[#00BB7D] text-lg font-bold text-white shadow-md shadow-[#00976B]/20 sm:size-12 sm:text-xl">
              b
            </span>
            <span className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              biponon
            </span>
          </div>

          {/* Animated Loading Indicator */}
          <div className="mt-6 mb-3">
            {variant === "dots" ? (
              <div
                className="flex items-center justify-center gap-2 py-1"
                role="progressbar"
                aria-label={isBn ? "লোড হচ্ছে" : "Loading progress"}
              >
                <span className="biponon-dot biponon-dot-1 size-2 rounded-full bg-gradient-to-br from-[#00976B] to-[#00BB7D]" />
                <span className="biponon-dot biponon-dot-2 size-2 rounded-full bg-gradient-to-br from-[#00976B] to-[#00BB7D]" />
                <span className="biponon-dot biponon-dot-3 size-2 rounded-full bg-gradient-to-br from-[#00976B] to-[#00BB7D]" />
              </div>
            ) : (
              <div
                className="relative h-1 w-44 sm:w-52 overflow-hidden rounded-full bg-muted dark:bg-white/10"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={isBn ? "লোড হচ্ছে" : "Loading progress"}
              >
                <div className="biponon-progress-bar h-full w-3/5 rounded-full bg-gradient-to-r from-[#00976B] via-[#00BB7D] to-[#00976B]" />
              </div>
            )}
          </div>

          {/* Localized Loading Text */}
          <p
            className={cn(
              "text-xs sm:text-sm font-medium text-muted-foreground/90 tracking-wide select-none",
              isBn && "font-bangla"
            )}
          >
            {loadingText}
          </p>
        </div>
      </div>
    </>
  );
}
