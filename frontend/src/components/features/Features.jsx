import React from "react";
import "./features.scss";

const Features = () => {
  const featuresList = [
    {
      id: 1,
      title: "Patient Registration & RBAC",
      desc: "Fast, centralized intake with strict role-based access control protecting medical confidentiality at every step.",
      badge: "Security",
      iconSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Real-Time Vital Signs & Reports",
      desc: "Instant logging of blood pressure, blood glucose, and consultation summaries with direct doctor-nurse synchronization.",
      badge: "Clinical Care",
      iconSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Medication & Pharmacy Records",
      desc: "Comprehensive drug inventory tracking and prescription delivery management directly handled by licensed pharmacists.",
      badge: "Pharmacy",
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
          <span className="section-tag">Platform Core Capabilities</span>
          <h2 className="section-title">Engineered for Clinical Excellence</h2>
          <p className="section-desc">
            Everything your medical staff needs to deliver prompt, accurate, and coordinated patient care.
          </p>
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
