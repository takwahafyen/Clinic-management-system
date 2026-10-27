import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useLanguage } from "../../context/LanguageContext";
import "./speciality.scss";

export interface DoctorCardInfo {
  id: number;
  name: string;
  specialty: string;
  rating: string;
  img: string;
}

export interface SpecialityProps {
  className?: string;
}

const Speciality: React.FC<SpecialityProps> = ({ className = "" }) => {
  const { doctor, dispatch } = useContext(Context) as any;
  const { t } = useLanguage();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/assets/images/team-1.jpg";
  };

  const doctorsList: DoctorCardInfo[] = [
    {
      id: 1,
      name: "Dr. Mohamed",
      specialty: "General Surgery",
      rating: "4.9",
      img: "/assets/images/chur.png",
    },
    {
      id: 2,
      name: "Dr. Ali",
      specialty: "Ophthalmology",
      rating: "4.8",
      img: "/assets/images/team-3.jpg",
    },
    {
      id: 3,
      name: "Dr. Houda",
      specialty: "Pediatrics",
      rating: "5.0",
      img: "/assets/images/team-2.jpg",
    },
    {
      id: 4,
      name: "Dr. Hani",
      specialty: "Orthopedics",
      rating: "4.9",
      img: "/assets/images/team-1.jpg",
    },
  ];

  return (
    <section className={`speciality practitioners-section ${className}`.trim()}>
      <div className="section-container">
        <div className="section-header">
          <span className="badge-tag">{t("doctors.tag")}</span>
          <h2 className="title">{t("doctors.title")}</h2>
          <p className="subtitle">{t("doctors.desc")}</p>
        </div>

        <div className="practitioners-grid">
          {doctorsList.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="card-image-wrapper">
                <img
                  src={doc.img}
                  alt={doc.name}
                  onError={handleImageError}
                  className="doctor-photo"
                />
                <span className="rating-badge">★ {doc.rating}</span>
              </div>
              <div className="card-body">
                <div className="name-row">
                  <h3 className="doctor-name">{doc.name}</h3>
                  <span className="verified-badge" title="Board Certified">✓</span>
                </div>
                <span className="specialty-chip">{doc.specialty}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer-action">
          {doctor ? (
            <button onClick={handleLogout} className="action-btn logout">
              {t("doctors.logout")}
            </button>
          ) : (
            <Link to="/doctor/login">
              <button className="action-btn login">{t("doctors.portal")}</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Speciality;
