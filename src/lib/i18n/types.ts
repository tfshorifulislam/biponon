export type Language = "en" | "bn";

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  nextLanguage: Language;
  isBangla: boolean;
}
