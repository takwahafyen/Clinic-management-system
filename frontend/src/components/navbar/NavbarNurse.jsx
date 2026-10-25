import React, { useContext } from "react";
import "./navbarNurse.scss";
import { Link } from "react-router-dom";
import { NurseContext } from "../../context/NurseContext";
import ThemeToggle from "../themeToggle/ThemeToggle";
import LanguageToggle from "../languageToggle/LanguageToggle";
import { useLanguage } from "../../context/LanguageContext";
import axios from "axios";
import { API_URL } from "../../config";

const NavbarNurse = () => {
  const { nurse, dispatch } = useContext(NurseContext);
  const { t } = useLanguage();

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
            <span className="middle-item">{t("navbar.home")}</span>
          </Link>
          <Link to="/about" className="link">
            <span className="middle-item">{t("navbar.about")}</span>
          </Link>
          <Link to="/guidelines" className="link">
            <span className="middle-item">{t("navbar.guidelines")}</span>
          </Link>
          <Link to="/patient/registerN" className="link">
            <span className="middle-item">{t("navbar.registerPatient")}</span>
          </Link>
          {nurse && (
            <Link to="/allVS" className="link">
              <span className="middle-item">{t("navbar.viewVS")}</span>
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
                <span>{t("navbar.settings")}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <LanguageToggle />
          <ThemeToggle />
          {nurse ? (
            <button onClick={handleLogout} className="nav-btn">
              {t("navbar.logout")}
            </button>
          ) : (
            <Link to="/nurse/login">
              <button className="nav-btn">{t("navbar.login")}</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarNurse;
