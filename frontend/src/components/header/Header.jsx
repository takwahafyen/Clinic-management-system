import React from "react";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="left-header">
          <div className="left-header-wrapper">
            <h1 className="header-heading">"Your Health, Our Priority"</h1>
            <p className="header-para">
              ElevateWellnessCenter provides excellant service by prioritizing
              the safety and security of patients.
            </p>
            <iframe
              width="500"
              height="300"
              src="https://www.youtube.com/embed/OF_nPut3HW8?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div
          className="right-header"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(47, 131, 241, 0.5), rgba(47, 131, 241, 0.5)), url(/assets/images/bac.jpg)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Header;
