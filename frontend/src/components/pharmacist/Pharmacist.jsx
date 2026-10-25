import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PharmacistContext } from "../../context/PharmacistContext";
import "./pharmacist.scss";

const Pharmacist = () => {
  const { pharmacist, dispatch } = useContext(PharmacistContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleImageError = (e) => {
    // Fallback to a guaranteed available pharmacist image if specific image fails
    e.target.onerror = null;
    e.target.src = "/assets/images/phar.jpg";
  };

  return (
    <div className="pharmacist">
      <div className="pharmacist-wrapper">
        <h2 className="pharmacist-heading">Our Pharmacists</h2>
        <div className="pharmacist-list">
          <div className="pharmacist-item">
            <div className="pharmacist-top">
              <img
                src="/assets/images/ppp.jpg"
                alt="pharmacist Asma"
                className="pharmacist-image"
                onError={handleImageError}
              />
            </div>
            <p className="pharmacist-bottom">ASMA</p>
          </div>
          <div className="pharmacist-item">
            <div className="pharmacist-top">
              <img
                src="/assets/images/opp.jpg"
                alt="pharmacist Ali"
                className="pharmacist-image"
                onError={handleImageError}
              />
            </div>
            <p className="pharmacist-bottom">ALI</p>
          </div>
          <div className="pharmacist-item">
            <div className="pharmacist-top">
              <img
                src="/assets/images/phhh.jpg"
                alt="pharmacist Sana"
                className="pharmacist-image"
                onError={handleImageError}
              />
            </div>
            <p className="pharmacist-bottom">SANA</p>
          </div>
          <div className="pharmacist-item">
            <div className="pharmacist-top">
              <img
                src="/assets/images/phar.jpg"
                alt="pharmacist Senda"
                className="pharmacist-image"
                onError={handleImageError}
              />
            </div>
            <p className="pharmacist-bottom">SENDA</p>
          </div>
        </div>

        <div className="right">
          {pharmacist ? (
            <button onClick={handleLogout} className="nav-btn">
              Logout Pharmacist
            </button>
          ) : (
            <Link to="/pharmacist/login">
              <button className="nav-btn">Login Pharmacist</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pharmacist;
