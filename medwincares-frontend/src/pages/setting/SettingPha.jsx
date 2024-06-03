import React, { useContext, useState } from "react";
import NavbarPha from "../../components/navbar/NavbarPha";
import { PharmacistContext } from "../../context/PharmacistContext";
import "./settingPha.scss";
import axios from "axios";

const SettingPha = () => {
  const { pharmacist } = useContext(PharmacistContext);

  const [updateMode, setUpdateMode] = useState(false);
  const [email, setEmail] = useState(pharmacist.email);
  const [password, setPassword] = useState(pharmacist.password);
  const [phone, setPhone] = useState(pharmacist.phone);
  const [error, setError] = useState(false);

  const handleUpdate = async () => {
    setError(false);
    try {
      const res = await axios.put(
        `http://localhost:5000/pharmacist/update/${pharmacist._id}`,
        {
          pharmacistId: pharmacist._id,
          email,
          password,
          phone,
        }
      );
      setEmail(email);
      setPassword(password);
      setPhone(phone);
      setUpdateMode(false);
      console.log(res.data);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <NavbarPha />
      <div className="settingPha">
        <div className="settingPha-wrapper">
          <div className="settingPha-item">
            <span>Name: </span>
            <p>
              {pharmacist.firstName} {pharmacist.lastName}
            </p>
          </div>
          <div className="settingPha-item">
            <span>Email:</span>
            {updateMode ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus={true}
                placeholder="Email"
                className="settingPhaInput"
              />
            ) : (
              <p>{email}</p>
            )}
          </div>
          <div className="settingPha-item">
            <span>Password: </span>
            {updateMode ? (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="settingPhaInput"
              />
            ) : (
              <p>.......</p>
            )}
          </div>
          <div className="settingPha-item">
            <span>Specialization: </span>
            <p>{pharmacist.specialization}</p>
          </div>
          <div className="settingPha-item">
            <span>Phone number: </span>
            {updateMode ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Phone number"
                className="settingPhaInput"
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
            <button onClick={(e) => setUpdateMode(true)}>
              CLICK TO UPDATE
            </button>
          )}
          {error && (
            <p className="errorMsg">Something went wrong! Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingPha;
