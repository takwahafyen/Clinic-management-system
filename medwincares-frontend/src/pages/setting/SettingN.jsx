import React, { useContext, useState } from "react";
import NavbarNurse from "../../components/navbar/NavbarNurse";
import { NurseContext } from "../../context/NurseContext";
import "./settingN.scss";
import axios from "axios";

const SettingN = () => {
  const { nurse } = useContext(NurseContext);

  const [updateMode, setUpdateMode] = useState(false);
  const [email, setEmail] = useState(nurse.email);
  const [password, setPassword] = useState(nurse.password);
  const [phone, setPhone] = useState(nurse.phone);
  const [error, setError] = useState(false);

  const handleUpdate = async () => {
    setError(false);
    try {
      const res = await axios.put(
        `http://localhost:5000/nurse/update/${nurse._id}`,
        {
          nurseId: nurse._id,
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
      <NavbarNurse />
      <div className="settingN">
        <div className="settingN-wrapper">
          <div className="settingN-item">
            <span>Name: </span>
            <p>
              {nurse.firstName} {nurse.lastName}
            </p>
          </div>
          <div className="settingN-item">
            <span>Email:</span>
            {updateMode ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus={true}
                placeholder="Email"
                className="settingNInput"
              />
            ) : (
              <p>{email}</p>
            )}
          </div>
          <div className="settingN-item">
            <span>Password: </span>
            {updateMode ? (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="settingNInput"
              />
            ) : (
              <p>.......</p>
            )}
          </div>
          <div className="settingN-item">
            <span>Specialization: </span>
            <p>{nurse.specialization}</p>
          </div>
          <div className="settingN-item">
            <span>Phone number: </span>
            {updateMode ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Phone number"
                className="settingNInput"
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

export default SettingN;
