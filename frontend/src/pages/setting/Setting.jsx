import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Context } from "../../context/Context";
import "./setting.scss";
import axios from "axios";
import { API_URL } from "../../config";

const Setting = () => {
  const { doctor } = useContext(Context);

  const [updateMode, setUpdateMode] = useState(false);
  const [email, setEmail] = useState(doctor.email);
  // Password is never returned by the API — always start empty so the field is blank
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(doctor.phone);
  const [error, setError] = useState(false);

  const handleUpdate = async () => {
    setError(false);
    try {
      await axios.put(`${API_URL}/doctor/update/${doctor._id}`, {
        doctorId: doctor._id,
        email,
        // Only send password when the user actually typed one
        ...(password && { password }),
        phone,
      });
      setUpdateMode(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="setting">
        <div className="setting-wrapper">
          <div className="setting-item">
            <span>Name: </span>
            <p>
              {doctor.firstName} {doctor.lastName}
            </p>
          </div>
          <div className="setting-item">
            <span>Email:</span>
            {updateMode ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus={true}
                placeholder="Email"
                className="settingInput"
              />
            ) : (
              <p>{email}</p>
            )}
          </div>
          <div className="setting-item">
            <span>Password: </span>
            {updateMode ? (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password (leave blank to keep current)"
                className="settingInput"
              />
            ) : (
              <p>·······</p>
            )}
          </div>
          <div className="setting-item">
            <span>Specialization: </span>
            <p>{doctor.specialization}</p>
          </div>
          <div className="setting-item">
            <span>Phone number: </span>
            {updateMode ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Phone number"
                className="settingInput"
              />
            ) : (
              <p>{phone}</p>
            )}
          </div>
          {updateMode ? (
            <button type="submit" onClick={handleUpdate}>
              UPDATE
            </button>
          ) : (
            <button onClick={() => setUpdateMode(true)}>CLICK TO UPDATE</button>
          )}
          {error && (
            <p className="errorMsg">Something went wrong! Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
