import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NurseContext } from "../../context/NurseContext";
import { useLanguage } from "../../context/LanguageContext";
import "./nurse.scss";

const Nurse = () => {
  const { nurse, dispatch } = useContext(NurseContext);
  const { t } = useLanguage();

  const handleLogout = () => {
    dispatch({ type: "n_LOGOUT" });
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/assets/images/nurse-1.jpg";
  };

  const nursesList = [
    {
      id: 1,
      name: "Florence Nightingale",
      role: "Head Nurse • Critical Care",
      src: "/assets/images/nurse-1.jpg",
      status: t("nurses.onShift"),
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Emergency & Trauma",
      src: "/assets/images/nurse-2.jpg",
      status: t("nurses.onShift"),
    },
    {
      id: 3,
      name: "Claire Bennett",
      role: "Pediatric Care",
      src: "/assets/images/nurse-3.jpg",
      status: t("nurses.onShift"),
    },
    {
      id: 4,
      name: "Emma Watson",
      role: "Gynecology & Maternity",
      src: "/assets/images/gyna.jpg",
      status: t("nurses.onShift"),
    },
  ];

  return (
    <section className="nurse nurses-section">
      <div className="section-container">
        <div className="section-header">
          <span className="badge-tag">{t("nurses.tag")}</span>
          <h2 className="title">{t("nurses.title")}</h2>
          <p className="subtitle">{t("nurses.desc")}</p>
        </div>

        <div className="nurses-grid">
          {nursesList.map((item) => (
            <div className="nurse-card" key={item.id}>
              <div className="card-image-wrapper">
                <img
                  src={item.src}
                  alt={item.name}
                  onError={handleImageError}
                  className="nurse-photo"
                />
                <span className="status-badge">
                  <span className="dot" />
                  {item.status}
                </span>
              </div>
              <div className="card-body">
                <h3 className="nurse-name">{item.name}</h3>
                <span className="nurse-role">{item.role}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer-action">
          {nurse ? (
            <button onClick={handleLogout} className="action-btn logout">
              {t("nurses.logout")}
            </button>
          ) : (
            <Link to="/nurse/login">
              <button className="action-btn login">{t("nurses.portal")}</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Nurse;
