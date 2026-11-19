"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { translations } from "./translations";
import type { Language } from "./types";

const STORAGE_KEY = "biponon_language";
const LANGUAGE_CHANGE_EVENT = "biponon_language_change";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  nextLanguage: Language;
  isBangla: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function subscribe(callback: () => void): () => void {
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

function getSnapshot(): Language {
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

function getServerSnapshot(): Language {
  return "en";
}

function getNestedValue(obj: unknown, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Synchronize document attributes with external DOM
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-lang", language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
    } catch {
      // Storage unavailable
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const next: Language = language === "en" ? "bn" : "en";
    setLanguage(next);
  }, [language, setLanguage]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const activeDict = translations[language];
      let val = getNestedValue(activeDict, key);

      // Fallback to English if translation is missing in the active language
      if (val === undefined && language !== "en") {
        val = getNestedValue(translations.en, key);
      }

      if (val === undefined) {
        return key;
      }

      if (params) {
        let interpolated = val;
        for (const [paramKey, paramVal] of Object.entries(params)) {
          interpolated = interpolated.replace(
            new RegExp(`{${paramKey}}`, "g"),
            String(paramVal)
          );
        }
        return interpolated;
      }

      return val;
    },
    [language]
  );

  const nextLanguage: Language = language === "en" ? "bn" : "en";
  const isBangla = language === "bn";

  const contextValue = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      nextLanguage,
      isBangla,
    }),
    [language, setLanguage, toggleLanguage, t, nextLanguage, isBangla]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
