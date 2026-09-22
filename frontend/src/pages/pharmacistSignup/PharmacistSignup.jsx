import React, { useState } from "react";
import "./pharmacistSignup.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const PharmacistSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorMsg("");
    try {
      const res = await axios.post("http://localhost:5000/pharmacist/register", {
        firstName,
        lastName,
        email,
        password,
        specialization,
        phone,
        passcode,
      });
      res.data && window.location.replace("/pharmacist/login");
    } catch (err) {
      setErrorMsg(err.msg);
      setError(true);
    }
  };
  console.log(errorMsg);

  return (
    <div className="pharmacist-signup">
      <Link to="/" className="link">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7618/7618370.png"
          alt="back btn"
          className="back-btn"
        />
      </Link>
      <div className="pharmacist-signup-wrapper">
        <img
          src="http://localhost:3000/assets/images/medwin-cares.png"
          alt="hospital-logo"
          className="pharmacist-signup-image"
        />
        <form onSubmit={handleSubmit}>
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
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Specialization"
            required
            onChange={(e) => setSpecialization(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone no."
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passcode"
            required
            onChange={(e) => setPasscode(e.target.value)}
          />
          <button type="submit">REGISTER</button>
          <p className="login-info">
            Already registered?{" "}
            <Link to="/pharmacist/login">
              <span>Login</span>
            </Link>
          </p>
        </form>
        {error && (
          <p className="errorMsg">The email or phone is already registered!</p>
        )}
      </div>
    </div>
  );
};

export default PharmacistSignup;
