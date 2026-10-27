import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./languageToggle.scss";

export interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = "" }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      className={`language-toggle-btn ${className}`.trim()}
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
