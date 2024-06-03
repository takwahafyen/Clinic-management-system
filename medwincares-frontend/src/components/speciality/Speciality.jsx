import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import './speciality.scss';

const Speciality = () => {
  const { doctor, dispatch } = useContext(Context);

  const handleLogout = () => {
    console.log("clicked");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="speciality">
      <div className="speciality-wrapper">
        <h2 className="speciality-heading">Our Doctors</h2>
        <div className="speciality-list">
          <div className="speciality-item">
            <div className="sitem-top">
              <img
                src="http://localhost:3000/assets/images/chur.png"
                alt="laboratory"
              />
            </div>
            <div className="sitem-bottom">
              <span className="speciality-subheading">
                Docteur Mohamed
              </span>
              <div className="speciality-info">
                <span>churgien</span>
                <button>More info</button>
              </div>
            </div>
          </div>
          <div className="speciality-item">
            <div className="sitem-top">
              <img
                src="http://localhost:3000/assets/images/team-3.jpg"
                alt="gynecology"
              />
            </div>
            <div className="sitem-bottom">
              <span className="speciality-subheading"> Docteur Ali</span>
              <div className="speciality-info">
                <span>ophthalmologist</span>
                <button>More info</button>
              </div>
            </div>
          </div>
          <div className="speciality-item">
            <div className="sitem-top">
              <img
                src="http://localhost:3000/assets/images/team-2.jpg"
                alt="machines"
              />
            </div>
            <div className="sitem-bottom">
              <span className="speciality-subheading">D.Houda</span>
              <div className="speciality-info">
                <span>pediatrician</span>
                <button>More info</button>
              </div>
            </div>
          </div>
          <div className="speciality-item">
            <div className="sitem-top">
              <img
                src="http://localhost:3000/assets/images/team-1.jpg"
                alt="machines"
              />
            </div>
            <div className="sitem-bottom">
              <span className="speciality-subheading">Docteur hani</span>
              <div className="speciality-info">
                <span>orthopedist</span>
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
