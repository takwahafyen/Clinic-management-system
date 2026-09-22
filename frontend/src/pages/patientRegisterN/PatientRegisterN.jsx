import axios from "axios";
import React, { useState } from "react";
import NavbarNurse from "../../components/navbar/NavbarNurse";
import "./patientRegisterN.scss";

const PatientRegisterN = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        "http://localhost:5000/patientauth/registerN",
        {
          firstName,
          lastName,
          phoneNo: phone,
        }
      );
      res.data &&
        window.location.replace(`/patients/patientInfon/${res.data._id}`);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <NavbarNurse />
      <div className="patient-registerN">
        <div className="patient-registerN-wrapper">
          <img
            src="http://localhost:3000/assets/images/medwin-cares.png"
            alt="website logo"
          />
          <form className="patient-registerN-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone number"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">REGISTER</button>
            {error && (
              <p className="errorMsg">Somthing went wrong! Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegisterN;
