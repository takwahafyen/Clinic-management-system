import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./nurseSignin.scss"; 
import { useRef } from "react";
import { NurseContext } from "../../context/NurseContext"; // Use the common context
import axios from "axios";

const NurseSignin = () => {
  const nurseEmailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(NurseContext); // Use the common context
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: "n_LOGIN_START" }); // Use the common LOGIN_START action type
    try {
      const res = await axios.post("http://localhost:5000/nurse/login", {
        email: nurseEmailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res.data);
      dispatch({ type: "n_LOGIN_SUCCESS", payload: res.data }); // Use the common LOGIN_SUCCESS action type
    } catch (err) {
      setError(true);
      dispatch({ type: "n_LOGIN_FAILURE" }); // Use the common LOGIN_FAILURE action type
    }
  };

  return (
    <div className="nurse-signin">
      <Link to="/" className="link">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7618/7618370.png"
          alt="back btn"
          className="back-btn"
        />
      </Link>
      <div className="nurse-signin-wrapper">
        <img
          src="http://localhost:3000/assets/images/medwin-cares.png"
          alt="hospital-logo"
          className="nurse-signup-image"
        />
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            ref={nurseEmailRef}
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
          <Link to="/nurse/register">
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

export default NurseSignin;
