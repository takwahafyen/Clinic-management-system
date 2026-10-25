import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NurseContext } from "../../context/NurseContext";
import "./nurse.scss";

const Nurse = () => {
  const { nurse, dispatch } = useContext(NurseContext);

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
      status: "On Shift",
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Emergency & Trauma",
      src: "/assets/images/nurse-2.jpg",
      status: "On Shift",
    },
    {
      id: 3,
      name: "Claire Bennett",
      role: "Pediatric Care",
      src: "/assets/images/nurse-3.jpg",
      status: "Available",
    },
    {
      id: 4,
      name: "Emma Watson",
      role: "Gynecology & Maternity",
      src: "/assets/images/gyna.jpg",
      status: "On Shift",
    },
  ];

  return (
    <section className="nurse nurses-section">
      <div className="section-container">
        <div className="section-header">
          <span className="badge-tag">Nursing & Patient Care</span>
          <h2 className="title">Our Dedicated Nurses</h2>
          <p className="subtitle">
            24/7 continuous monitoring, patient assessment, and compassionate bedside care.
          </p>
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
              Log out Nurse
            </button>
          ) : (
            <Link to="/nurse/login">
              <button className="action-btn login">Nurse Portal Access →</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Nurse;
