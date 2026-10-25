import React, { useContext } from "react";
import "./navbarPha.scss";
import { Link } from "react-router-dom";
import { PharmacistContext } from "../../context/PharmacistContext";
import ThemeToggle from "../themeToggle/ThemeToggle";
import LanguageToggle from "../languageToggle/LanguageToggle";
import { useLanguage } from "../../context/LanguageContext";
import axios from "axios";
import { API_URL } from "../../config";

const NavbarPha = () => {
  const { pharmacist, dispatch } = useContext(PharmacistContext);
  const { t } = useLanguage();

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/pharmacist/logout`);
    } catch (err) {
      console.error("Pharmacist logout failed:", err);
    }
    dispatch({ type: "p_LOGOUT" });
  };

  return (
    <div className="navbarPha">
      <div className="navbarPha-wrapper">
        <div className="left">
          <img
            src="/assets/images/logo-1.jpg"
            alt="hospital-logo"
            className="hospital-logo"
          />
        </div>
        <div className="middle">
          <Link to="/HomePha" className="link">
            <span className="middle-item">{t("navbar.home")}</span>
          </Link>
          <Link to="/about" className="link">
            <span className="middle-item">{t("navbar.about")}</span>
          </Link>
          <Link to="/guidelines" className="link">
            <span className="middle-item">{t("navbar.guidelines")}</span>
          </Link>
          <Link to="/client/register" className="link">
            <span className="middle-item">{t("navbar.registerClient")}</span>
          </Link>
          {pharmacist && (
            <Link to="/allFC" className="link">
              <span className="middle-item">{t("navbar.viewFC")}</span>
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
              <Link to={"/settingsPha/" + pharmacist?._id} className="link">
                <span>{t("navbar.settings")}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <LanguageToggle />
          <ThemeToggle />
          {pharmacist ? (
            <button onClick={handleLogout} className="nav-btn">
              {t("navbar.logout")}
            </button>
          ) : (
            <Link to="/pharmacist/login">
              <button className="nav-btn">{t("navbar.login")}</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarPha;
