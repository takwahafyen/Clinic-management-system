import React, { useState } from "react";
import "./pharmacistSignup.scss";
import axios from "axios";
import { API_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setErrorMsg("");
    try {
      const res = await axios.post(`${API_URL}/pharmacist/register`, {
        firstName,
        lastName,
        email,
        password,
        specialization,
        phone,
        passcode,
      });
      if (res.data) {
        navigate("/pharmacist/login");
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Registration failed");
      setError(true);
    }
  };

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
          src="/assets/images/medwin-cares.png"
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
          <p className="errorMsg">{errorMsg || "The email or phone is already registered!"}</p>
        )}
      </div>
    </div>
  );
};

export default PharmacistSignup;
