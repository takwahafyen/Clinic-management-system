import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./speciality.scss";

const Speciality = () => {
  const { doctor, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/assets/images/team-1.jpg";
  };

  const doctorsList = [
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
    <section className="speciality practitioners-section">
      <div className="section-container">
        <div className="section-header">
          <span className="badge-tag">Medical Specialists</span>
          <h2 className="title">Our Physician Staff</h2>
          <p className="subtitle">
            Board-certified practitioners delivering personalized, evidence-based care across major disciplines.
          </p>
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
              Log out Doctor
            </button>
          ) : (
            <Link to="/doctor/login">
              <button className="action-btn login">Doctor Portal Access →</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Speciality;
