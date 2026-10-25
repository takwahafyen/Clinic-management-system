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

  return (
    <div className="speciality">
      <div className="speciality-wrapper">
        <h2 className="speciality-heading">Our Doctors</h2>
        <div className="speciality-list">
          <div className="speciality-item">
            <div className="sitem-top">
              <img
                src="/assets/images/chur.png"
                alt="laboratory"
                onError={handleImageError}
              />
            </div>
            <div className="sitem-bottom">
              <span className="speciality-subheading">Docteur Mohamed</span>
              <div className="speciality-info">
                <span>Surgeon</span>
                <button>More info</button>
              </div>
            </div>
          </div>
          <div className="speciality-item">
            <div className="sitem-top">
              <img
                src="/assets/images/team-3.jpg"
                alt="ophthalmology"
                onError={handleImageError}
              />
            </div>
            <div className="sitem-bottom">
              <span className="speciality-subheading">Docteur Ali</span>
              <div className="speciality-info">
                <span>Ophthalmologist</span>
                <button>More info</button>
              </div>
            </div>
          </div>
          <div className="speciality-item">
            <div className="sitem-top">
              <img
                src="/assets/images/team-2.jpg"
                alt="pediatrics"
                onError={handleImageError}
              />
            </div>
            <div className="sitem-bottom">
              <span className="speciality-subheading">Dr. Houda</span>
              <div className="speciality-info">
                <span>Pediatrician</span>
                <button>More info</button>
              </div>
            </div>
          </div>
          <div className="speciality-item">
            <div className="sitem-top">
              <img
                src="/assets/images/team-1.jpg"
                alt="orthopedics"
                onError={handleImageError}
              />
            </div>
            <div className="sitem-bottom">
              <span className="speciality-subheading">Docteur Hani</span>
              <div className="speciality-info">
                <span>Orthopedist</span>
                <button>More info</button>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          {doctor ? (
            <button onClick={handleLogout} className="nav-btn">
              Log out doctor
            </button>
          ) : (
            <Link to="/doctor/login">
              <button className="nav-btn">Login Doctor</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Speciality;
