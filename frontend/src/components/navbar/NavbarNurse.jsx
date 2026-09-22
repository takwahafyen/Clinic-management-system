import React, { useContext } from "react";
import "./navbarNurse.scss";
import { Link ,useNavigate} from "react-router-dom";
import { NurseContext } from "../../context/NurseContext";

//const NavbarNurse = () => {
  //const { nurse, dispatch } = useContext(NurseContext);

 // const handleLogout = () => {
    //console.log("clicked", nurse);
    //dispatch({ type: "LOGOUT" });
 // };
  const NavbarNurse = () => {
    const { nurse, dispatch } = useContext(NurseContext);
    const navigate = useNavigate(); // Initialize useNavigate
  
   
      
    const handleLogout = () => {
      console.log("clicked", nurse);
      dispatch({ type: "LOGOUT" });
      
      // Redirect to the desired route after logging out
      navigate("/"); // Change "/" to the desired route
    };
  return (
    <div className="navbarNurse">
      <div className="navbarNurse-wrapper">
        <div className="left">
          <img
            src="http://localhost:3000/assets/images/logo-1.jpg"
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
          
            <Link to="/allVS" className="link">
              <span className="middle-item">View all vital signs</span>
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
              <Link to={"/settingsN/"+nurse?._id} className="link">
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
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
