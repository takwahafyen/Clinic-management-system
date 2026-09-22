
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./pharmacistSignin.scss";
import { useRef } from "react";
import { PharmacistContext } from "../../context/PharmacistContext";
import axios from "axios";

const PharmacistSignin = () => {
  const pharmacistEmailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(PharmacistContext);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: "p_LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/pharmacist/login", {
        email: pharmacistEmailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res.data);
      dispatch({ type: "p_LOGIN_SUCCESS", payload: res.data });


    } catch (err) {
      setError(true);
      dispatch({ type: "p_LOGIN_FAILURE" });
    }
  };

  return (
    <div className="pharmacist-signin">
      <Link to="/" className="link">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7618/7618370.png"
          alt="back btn"
          className="back-btn"
        />
      </Link>
      <div className="pharmacist-signin-wrapper">
        <img
          src="http://localhost:3000/assets/images/medwin-cares.png"
          alt="hospital-logo"
          className="pharmacist-signup-image"
        />
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            ref={pharmacistEmailRef}
          />
          <input
            type="password"
            placeholder="Password"
            required
            ref={passwordRef}
          />
          <button type="submit" disabled={isFetching}>
            LOGIN
          </button>
        </form>
        <p className="register-info">
          Are you new here?
          <Link to="/pharmacist/register">
            <span> Register</span>
          </Link>
        </p>
        {error && (
          <p className="errorMsg">Something went wrong! Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default PharmacistSignin;