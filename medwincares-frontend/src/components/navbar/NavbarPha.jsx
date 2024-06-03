import React, { useContext } from "react";
import "./navbarPha.scss";
import { Link,useNavigate } from "react-router-dom";
import { PharmacistContext } from "../../context/PharmacistContext";


const NavbarPha = () => {
  const { pharmacist, dispatch } = useContext(PharmacistContext);
const navigate =useNavigate();
  const handleLogout = () => {
    console.log("clicked",pharmacist);
    dispatch({ type: "LOGOUT" });
  
navigate("/");
};


  return (
    <div className="navbarPha">
      <div className="navbarPha-wrapper">
        <div className="left">
          <img
            src="http://localhost:3000/assets/images/logo-1.jpg"
            alt="hospital-logo"
            className="hospital-logo"
          />
        </div>
        <div className="middle">
          <Link to="/HomePha" className="link">
            <span className="middle-item">Home</span>
          </Link>
          <Link to="/about" className="link">
            <span className="middle-item">About Us</span>
          </Link>
          <Link to="/guidelines" className="link">
            <span className="middle-item">Guidelines</span>
          </Link>
          <Link to="/client/register" className="link">
            <span className="middle-item">Register a client</span>
          </Link>

          <Link to="/allFC" className="link">
            <span className="middle-item">View all Factures</span>
          </Link>

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
              <Link to={"/settingsPha/"+pharmacist?._id} className="link">
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          {pharmacist? (
            <button onClick={handleLogout} className="nav-btn">
              Log out
            </button>
          ) : (
            <Link to="/pharmacist/login">
              <button className="nav-btn">Log in</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarPha;
