import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./features.scss";

const Features = () => {
  const { t } = useLanguage();

  const featuresList = [
    {
      id: 1,
      title: t("features.f1Title"),
      desc: t("features.f1Desc"),
      badge: t("features.f1Badge"),
      iconSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: t("features.f2Title"),
      desc: t("features.f2Desc"),
      badge: t("features.f2Badge"),
      iconSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      id: 3,
      title: t("features.f3Title"),
      desc: t("features.f3Desc"),
      badge: t("features.f3Badge"),
      iconSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
          <path d="m8.5 8.5 7 7" />
        </svg>
      ),
    },
  ];

  return (
    <section className="features features-section">
      <div className="features-container">
        <div className="features-header">
          <span className="section-tag">{t("features.tag")}</span>
          <h2 className="section-title">{t("features.title")}</h2>
          <p className="section-desc">{t("features.desc")}</p>
        </div>

        <div className="features-grid">
          {featuresList.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <div className="card-top-row">
                <div className="card-icon">{feature.iconSvg}</div>
                <span className="card-badge">{feature.badge}</span>
              </div>
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
