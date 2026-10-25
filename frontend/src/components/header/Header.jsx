import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./header.scss";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="header">
      <div className="header-container">
        {/* Left Column: Hero Copy & Actions */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span className="badge-text">{t("hero.badge")}</span>
          </div>

          <h1 className="hero-title">
            {t("hero.titlePart1")} <br />
            <span className="gradient-text">{t("hero.titleGradient")}</span>
          </h1>

          <p className="hero-subtitle">{t("hero.subtitle")}</p>

          <div className="hero-actions">
            <Link to="/patient/register" className="btn-primary">
              {t("hero.ctaRegister")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/about" className="btn-secondary">
              {t("hero.ctaExplore")}
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">{t("hero.statUptime")}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">3 Roles</span>
              <span className="stat-label">{t("hero.statRoles")}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">{t("hero.statSecured")}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive MedTech Dashboard Preview */}
        <div className="hero-visual">
          <div className="visual-background-glow" />
          <div className="mockup-card main-card">
            <div className="card-header">
              <div className="patient-avatar">
                <img src="/assets/images/nurse-1.jpg" alt="Patient Care Specialist" />
              </div>
              <div className="patient-details">
                <span className="patient-name">{t("hero.liveDesk")}</span>
                <span className="patient-id">{t("hero.specialty")}</span>
              </div>
              <span className="status-chip active">{t("hero.activeSession")}</span>
            </div>

            <div className="vital-grid">
              <div className="vital-box">
                <span className="vital-label">{t("hero.heartRate")}</span>
                <div className="vital-value-row">
                  <span className="vital-value">72</span>
                  <span className="vital-unit">bpm</span>
                </div>
                <span className="vital-status normal">● {t("hero.normalRhythm")}</span>
              </div>
              <div className="vital-box">
                <span className="vital-label">{t("hero.bloodPressure")}</span>
                <div className="vital-value-row">
                  <span className="vital-value">120/80</span>
                  <span className="vital-unit">mmHg</span>
                </div>
                <span className="vital-status normal">● {t("hero.optimal")}</span>
              </div>
              <div className="vital-box">
                <span className="vital-label">{t("hero.diabeticStatus")}</span>
                <div className="vital-value-row">
                  <span className="vital-value">{t("hero.nonDiabetic")}</span>
                </div>
                <span className="vital-status verified">✓ {t("hero.verified")}</span>
              </div>
            </div>

            {/* Floating Mini Notification Badge */}
            <div className="floating-badge">
              <div className="badge-icon">💊</div>
              <div className="badge-info">
                <strong>{t("hero.prescriptionReady")}</strong>
                <span>{t("hero.pharmacistValidated")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
