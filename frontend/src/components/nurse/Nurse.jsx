import "./nurse.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NurseContext } from "../../context/NurseContext";

const Nurse = () => {
  const { nurse, dispatch } = useContext(NurseContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/assets/images/nurse-1.jpg";
  };

  const nursesImages = [
    {
      id: 1,
      src: "/assets/images/nurse-1.jpg",
      alt: "nurse 1",
      contentHead: "Nurse 1",
    },
    {
      id: 2,
      src: "/assets/images/nurse-2.jpg",
      alt: "nurse 2",
      contentHead: "Nurse 2",
    },
    {
      id: 3,
      src: "/assets/images/nurse-3.jpg",
      alt: "nurse 3",
      contentHead: "Nurse 3",
    },
    {
      id: 4,
      src: "/assets/images/gyna.jpg",
      alt: "nurse 4",
      contentHead: "Nurse 4",
    },
  ];

  return (
    <div className="nurse">
      <div className="nurse-wrapper">
        <h2 className="nurse-heading">Our Nurses</h2>
        {nursesImages.map((nurse) => (
          <div className="fdesc-item" key={nurse.id}>
            <div className="fimagecontainer">
              <div className="fcolor">
                <img
                  src={nurse.src}
                  alt={nurse.alt}
                  className={`fimage${nurse.id}`}
                  onError={handleImageError}
                />
              </div>
            </div>
            <div className={`fcontent${nurse.id}`}>
              <div className="fcontent-text">
                <h3>{nurse.contentHead}</h3>
                <p>{nurse.contentInfo}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="right">
          {nurse ? (
            <button onClick={handleLogout} className="nav-btn">
              Logout Nurse
            </button>
          ) : (
            <Link to="/nurse/login">
              <button className="nav-btn">Login Nurses</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nurse;
