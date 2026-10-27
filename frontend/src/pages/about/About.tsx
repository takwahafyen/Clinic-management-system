import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./about.scss";

const About: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="about">
        <div className="about-wrapper">
          <div className="about-top">
            <h1>
              Your reason to <span>Smile</span>.
            </h1>
            <p>
              The Clinic Management System is a professional healthcare platform
              that covers General, Cosmetic, Aesthetic and Emergency services
              &amp; facilities for you and your family — with a dedicated team
              of doctors, nurses and pharmacists at your service.
            </p>
          </div>
          <div className="about-bottom">
            <h1>
              Why <span>Choose Us</span>?
            </h1>
            <p>
              Managed directly by experienced general practitioners and
              specialist physicians, and cooperating with major insurance
              providers for the convenience of our patients.
            </p>
            <ul>
              <li>
                Professional care of the highest standards in a comfortable and
                relaxed environment.
              </li>
              <li>
                On-site healthcare services available to schools, corporate
                organisations and senior-care homes.
              </li>
              <li>
                Up-to-date clinical technologies to support your health journey
                every step of the way.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
