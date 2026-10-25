import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

const translations = { en, fr };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const savedLang = localStorage.getItem("clinic_lang");
      if (savedLang === "en" || savedLang === "fr") {
        return savedLang;
      }
    } catch (e) {
      // ignore
    }
    return "en"; // Default to English as requested
  });

  useEffect(() => {
    try {
      localStorage.setItem("clinic_lang", language);
      document.documentElement.setAttribute("lang", language);
    } catch (e) {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang) => {
    if (lang === "en" || lang === "fr") {
      setLanguageState(lang);
    }
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "fr" : "en"));
  };

  /**
   * Helper function for dot-notation translation lookups.
   * Example: t("navbar.home") -> "Home" (en) / "Accueil" (fr)
   */
  const t = (key) => {
    if (!key) return "";
    const keys = key.split(".");

    // Lookup in active language dictionary
    let value = translations[language];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    if (value !== undefined) return value;

    // Fallback to English dictionary
    let fallback = translations.en;
    for (const k of keys) {
      if (fallback && fallback[k] !== undefined) {
        fallback = fallback[k];
      } else {
        fallback = undefined;
        break;
      }
    }

    return fallback !== undefined ? fallback : key;
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Safe fallback for isolated unit tests rendered without LanguageProvider
    return {
      language: "en",
      setLanguage: () => {},
      toggleLanguage: () => {},
      isFrench: false,
      isEnglish: true,
      t: (key) => {
        if (!key) return "";
        const keys = key.split(".");
        let value = en;
        for (const k of keys) {
          if (value && value[k] !== undefined) {
            value = value[k];
          } else {
            return key;
          }
        }
        return value;
      },
    };
  }
  return context;
};
