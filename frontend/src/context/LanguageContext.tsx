import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export type SupportedLanguage = "en" | "fr";

const translations: Record<SupportedLanguage, any> = { en, fr };

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  isFrench: boolean;
  isEnglish: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const savedLang = localStorage.getItem("clinic_lang");
      if (savedLang === "en" || savedLang === "fr") {
        return savedLang as SupportedLanguage;
      }
    } catch (e) {
      // ignore
    }
    return "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem("clinic_lang", language);
      document.documentElement.setAttribute("lang", language);
    } catch (e) {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    if (lang === "en" || lang === "fr") {
      setLanguageState(lang);
    }
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "fr" : "en"));
  };

  const t = (key: string): string => {
    if (!key) return "";
    const keys = key.split(".");

    let value: any = translations[language];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    if (value !== undefined) return String(value);

    let fallback: any = translations.en;
    for (const k of keys) {
      if (fallback && fallback[k] !== undefined) {
        fallback = fallback[k];
      } else {
        fallback = undefined;
        break;
      }
    }

    return fallback !== undefined ? String(fallback) : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isFrench: language === "fr",
        isEnglish: language === "en",
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en",
      setLanguage: () => {},
      toggleLanguage: () => {},
      isFrench: false,
      isEnglish: true,
      t: (key: string) => {
        if (!key) return "";
        const keys = key.split(".");
        let value: any = en;
        for (const k of keys) {
          if (value && value[k] !== undefined) {
            value = value[k];
          } else {
            return key;
          }
        }
        return String(value);
      },
    };
  }
  return context;
};
