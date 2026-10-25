import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Left Column: Hero Copy & Actions */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span className="badge-text">Next-Gen Healthcare Management Platform</span>
          </div>

          <h1 className="hero-title">
            Healthcare Management, <br />
            <span className="gradient-text">Intelligently Unified.</span>
          </h1>

          <p className="hero-subtitle">
            Seamlessly coordinate doctors, nurses, and pharmacists in one secure,
            role-protected clinical workspace. Real-time vital signs, consultation
            reports, and medication tracking.
          </p>

          <div className="hero-actions">
            <Link to="/patient/register" className="btn-primary">
              Register a Patient
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
              Explore Services
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">System Uptime</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">3 Roles</span>
              <span className="stat-label">Doctor, Nurse, Pharma</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">RBAC Secured</span>
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
                <span className="patient-name">Live Consultation Desk</span>
                <span className="patient-id">Dr. Ada Lovelace • Cardiology</span>
              </div>
              <span className="status-chip active">Active Session</span>
            </div>

            <div className="vital-grid">
              <div className="vital-box">
                <span className="vital-label">Heart Rate</span>
                <div className="vital-value-row">
                  <span className="vital-value">72</span>
                  <span className="vital-unit">bpm</span>
                </div>
                <span className="vital-status normal">● Normal Rhythm</span>
              </div>
              <div className="vital-box">
                <span className="vital-label">Blood Pressure</span>
                <div className="vital-value-row">
                  <span className="vital-value">120/80</span>
                  <span className="vital-unit">mmHg</span>
                </div>
                <span className="vital-status normal">● Optimal</span>
              </div>
              <div className="vital-box">
                <span className="vital-label">Diabetic Status</span>
                <div className="vital-value-row">
                  <span className="vital-value">Non-Diabetic</span>
                </div>
                <span className="vital-status verified">✓ Verified</span>
              </div>
            </div>

            {/* Floating Mini Notification Badge */}
            <div className="floating-badge">
              <div className="badge-icon">💊</div>
              <div className="badge-info">
                <strong>Prescription Ready</strong>
                <span>Pharmacist validated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
