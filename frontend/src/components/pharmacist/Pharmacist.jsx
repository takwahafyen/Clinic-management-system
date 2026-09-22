import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PharmacistContext } from "../../context/PharmacistContext";
import "./pharmacist.scss";

const Pharmacist= () => {
  const { pharmacist, dispatch } = useContext(PharmacistContext);

  const handleLogout = () => {
    console.log("clicked");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="pharmacist">
      <div className="pharmacist-wrapper">
        <h2 className="pharmacist-heading">Our Pharmacists</h2>
        <div className="pharmacist-list">
          <div className="pharmacist-item">
            <div className="pharmacist-top">
              <img
                src="http://localhost:3000/assets/images/ppp.jpg"
                alt="rapid test"
                className="pharmacist-image"
              />
            </div>
            <p className="pharmacist-bottom">ASMA</p>
          </div>
          <div className="pharmacist-item">
            <div className="pharmacist-top">
              <img
                src="http://localhost:3000/assets/images/opp.jpg"
                alt="pcr test"
                className="pharmacist-image"
              />
            </div>
            <p className="pharmacist-bottom">ALI</p>
          </div>
          <div className="pharmacist-item">
            <div className="pharmacist-top">
              <img
                src="http://localhost:3000/assets/images/phhh.jpg"
                alt="drive thru test"
                className="pharmacist-image"
              />
            </div>
            <p className="pharmacist-bottom">SANA</p>
          </div>
          <div className="pharmacist-item">
            <div className="pharmacist-top">
              <img
                src="http://localhost:3000/assets/images/phar.jpg"
                alt="pharmacist"
                className="pharmacist-image"
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
