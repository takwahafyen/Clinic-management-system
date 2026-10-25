import React, { useContext } from "react";
import "./navbarNurse.scss";
import { Link } from "react-router-dom";
import { NurseContext } from "../../context/NurseContext";
import ThemeToggle from "../themeToggle/ThemeToggle";
import axios from "axios";
import { API_URL } from "../../config";

const NavbarNurse = () => {
  const { nurse, dispatch } = useContext(NurseContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/nurse/logout`);
    } catch (err) {
      console.error("Nurse logout failed:", err);
    }
    dispatch({ type: "n_LOGOUT" });
  };

  return (
    <div className="navbarNurse">
      <div className="navbarNurse-wrapper">
        <div className="left">
          <img
            src="/assets/images/logo-1.jpg"
            alt="hospital-logo"
            className="hospital-logo"
          />
        </div>
        <div className="middle">
          <Link to="/HomeNurse" className="link">
            <span className="middle-item">Home</span>
          </Link>
          <Link to="/about" className="link">
            <span className="middle-item">About Us</span>
          </Link>
          <Link to="/guidelines" className="link">
            <span className="middle-item">Guidelines</span>
          </Link>
          <Link to="/patient/registerN" className="link">
            <span className="middle-item">Register a patient</span>
          </Link>
          {nurse && (
            <Link to="/allVS" className="link">
              <span className="middle-item">View all VS</span>
            </Link>
          )}

          <div className="middle-item" id="down-middle-item">
            <img
              src="https://cdn-icons-png.flaticon.com/512/892/892625.png"
              alt="down arrow"
              style={{
                width: "17px",
                height: "17px",
                marginLeft: "4px",
                marginBottom: "-3px",
              }}
            />
            <div className="down-arrow-items" id="down">
              <Link to={"/settingsN/" + nurse?._id} className="link">
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <ThemeToggle />
          {nurse ? (
            <button onClick={handleLogout} className="nav-btn">
              Log out
            </button>
          ) : (
            <Link to="/nurse/login">
              <button className="nav-btn">Log in</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarNurse;
