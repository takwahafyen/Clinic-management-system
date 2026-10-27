import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./footer.scss";

export interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const { t } = useLanguage();

  return (
    <footer className={`footer ${className}`.trim()}>
      <div className="footer-container">
        {/* Top Emergency & Quick Contact Bar */}
        <div className="footer-contact-banner">
          <div className="banner-badge">
            <span className="pulse-dot" />
            <span className="banner-title">{t("footer.contactUs")}</span>
          </div>

          <div className="banner-items-grid">
            <div className="banner-item">
              <div className="item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="item-content">
                <span className="item-label">{t("footer.emergency24")}</span>
                <strong className="item-value">0-298-014</strong>
              </div>
            </div>

            <div className="banner-item">
              <div className="item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="item-content">
                <span className="item-label">{t("footer.facilities")}</span>
                <strong className="item-value">123 Health St, Medicity</strong>
              </div>
            </div>

            <div className="banner-item">
              <div className="item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className="item-content">
                <span className="item-label">{t("footer.fastestDept")}</span>
                <strong className="item-value">9871-985-983</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Main 4-Column Footer Navigation */}
        <div className="footer-main-grid">
          {/* Column 1: Brand & Identity */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <img
                src="/assets/images/logo-1.jpg"
                alt="Clinic Logo"
                className="footer-logo"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
              <span className="brand-title">Clinic Management System</span>
            </div>
            <p className="brand-description">{t("footer.mission")}</p>
            <div className="compliance-badges">
              <span className="badge">🔒 RBAC Protected</span>
              <span className="badge">⚡ 99.9% Uptime</span>
            </div>
          </div>

          {/* Column 2: Clinical Portals */}
          <div className="footer-col">
            <h4 className="col-title">{t("footer.clinicalPortals")}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/doctor/login">{t("footer.doctorPortal")}</Link>
              </li>
              <li>
                <Link to="/nurse/login">{t("footer.nursePortal")}</Link>
              </li>
              <li>
                <Link to="/pharmacist/login">{t("footer.pharmaPortal")}</Link>
              </li>
              <li>
                <Link to="/patient/register">{t("footer.patientReg")}</Link>
              </li>
              <li>
                <Link to="/allReports">{t("footer.allReports")}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Guides */}
          <div className="footer-col">
            <h4 className="col-title">{t("footer.platform")}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about">{t("footer.aboutUs")}</Link>
              </li>
              <li>
                <Link to="/guidelines">{t("footer.guidelines")}</Link>
              </li>
              <li>
                <a href="/health" target="_blank" rel="noopener noreferrer">
                  {t("footer.systemStatus")}
                </a>
              </li>
              <li>
                <Link to="/guidelines">{t("footer.security")}</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency & Triage */}
          <div className="footer-col">
            <h4 className="col-title">{t("footer.support")}</h4>
            <div className="support-info">
              <p>
                <strong>{t("footer.hours")}</strong>
              </p>
              <p>{t("footer.triage")}</p>
              <p className="support-email">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                support@clinic-system.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Tech Stack Bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 Clinic Management System. {t("footer.copyright")}</p>
          <div className="tech-pills">
            <span>React 18</span>
            <span>Express.js</span>
            <span>MongoDB</span>
            <span>Docker</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
