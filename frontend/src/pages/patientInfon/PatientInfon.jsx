import React, { useEffect, useState } from "react";
import "./patientInfon.scss";
import NavbarNurse from "../../components/navbar/NavbarNurse";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
const PatientInfon = () => {
  const [patient, setPatient] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [updateMode, setUpdateMode] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/patientauth/patientInfon/${path}`
        );
        setPatient(res.data);
        setPhone(res.data.phoneNo);
      } catch (err) {}
    };
    fetchPatient();
  }, [path]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      await axios.put(`http://localhost:5000/patientauth/update/${path}`, {
        phoneNo: phone,
      });

      setUpdateMode(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
  
    <div>
      <NavbarNurse />
      <div className="patient-info">
        <div className="patient-info-wrapper">
          <div className="patient-infon-item">
            <span>First name: </span>
            <p>{patient.firstName}</p>
          </div>
          <div className="patient-infon-item">
            <span>Last name: </span>
            <p>{patient.lastName}</p>
          </div>
          <div className="patient-infon-item">
            <span>Phone number: </span>
            {updateMode ? (
              <input
                type="text"
                placeholder="Phone number"
                value={phone}
                required
                autoFocus={true}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              <p>{phone}</p>
            )}
          </div>
          <div className="patient-infon-item">
            <Link to={`/patient/${path}/create_VS`}>
              <button>CREATE A VITAL SIGN</button>
            </Link>
            {updateMode ? (
              <button onClick={handleUpdate}>CLICK TO UPDATE</button>
            ) : (
              <button onClick={(e) => setUpdateMode(true)}>
                UPDATE PATIENT
              </button>
            )}
            <Link to="/allVS">
              <button>VIEW ALL VITAL SIGNS</button>
            </Link>
            
          </div>
        
        
          {error && (
            <p className="errorMsg">Something went wrong! Please try again.</p>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default PatientInfon;
