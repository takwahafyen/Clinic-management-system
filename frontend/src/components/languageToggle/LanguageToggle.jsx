import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./languageToggle.scss";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      className="language-toggle-btn"
      onClick={toggleLanguage}
      title={language === "en" ? "Passer en Français" : "Switch to English"}
      aria-label="Toggle language"
    >
      <span className="lang-flag">{language === "en" ? "🇬🇧" : "🇫🇷"}</span>
      <span className="lang-code">{language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageToggle;
