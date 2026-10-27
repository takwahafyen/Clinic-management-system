import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PharmacistContext } from "../../context/PharmacistContext";
import { useLanguage } from "../../context/LanguageContext";
import "./pharmacist.scss";

export interface PharmacistCardInfo {
  id: number;
  name: string;
  specialty: string;
  src: string;
  license: string;
}

export interface PharmacistProps {
  className?: string;
}

const Pharmacist: React.FC<PharmacistProps> = ({ className = "" }) => {
  const { pharmacist, dispatch } = useContext(PharmacistContext) as any;
  const { t } = useLanguage();

  const handleLogout = () => {
    dispatch({ type: "p_LOGOUT" });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/assets/images/phar.jpg";
  };

  const pharmacistsList: PharmacistCardInfo[] = [
    {
      id: 1,
      name: "Asma Trabelsi",
      specialty: "Clinical Pharmacist",
      src: "/assets/images/ppp.jpg",
      license: "Lic. #PH-8921",
    },
    {
      id: 2,
      name: "Ali Mansour",
      specialty: "Prescription Specialist",
      src: "/assets/images/opp.jpg",
      license: "Lic. #PH-7714",
    },
    {
      id: 3,
      name: "Sana Bouaziz",
      specialty: "Hospital Dispensary",
      src: "/assets/images/phhh.jpg",
      license: "Lic. #PH-9042",
    },
    {
      id: 4,
      name: "Senda Ben Amor",
      specialty: "Drug Safety & Interactions",
      src: "/assets/images/phar.jpg",
      license: "Lic. #PH-6530",
    },
  ];

  return (
    <section className={`pharmacist pharmacists-section ${className}`.trim()}>
      <div className="section-container">
        <div className="section-header">
          <span className="badge-tag">{t("pharmacists.tag")}</span>
          <h2 className="title">{t("pharmacists.title")}</h2>
          <p className="subtitle">{t("pharmacists.desc")}</p>
        </div>

        <div className="pharmacists-grid">
          {pharmacistsList.map((item) => (
            <div className="pharmacist-card" key={item.id}>
              <div className="card-image-wrapper">
                <img
                  src={item.src}
                  alt={item.name}
                  onError={handleImageError}
                  className="pharmacist-photo"
                />
                <span className="license-badge">{item.license}</span>
              </div>
              <div className="card-body">
                <h3 className="pharmacist-name">{item.name}</h3>
                <span className="pharmacist-specialty">{item.specialty}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer-action">
          {pharmacist ? (
            <button onClick={handleLogout} className="action-btn logout">
              {t("pharmacists.logout")}
            </button>
          ) : (
            <Link to="/pharmacist/login">
              <button className="action-btn login">{t("pharmacists.portal")}</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pharmacist;
