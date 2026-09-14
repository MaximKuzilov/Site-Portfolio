"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type Locale, defaultLocale, getDictionary, type Dictionary } from "@/lib/i18n";

interface LangContextValue {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: Dictionary;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "portfolio-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "ru" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  const setLang = (newLang: Locale) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    document.documentElement.lang = newLang;
  };

  const t = getDictionary(lang);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
}
