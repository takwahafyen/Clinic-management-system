import React, { useRef } from "react";
import "./createReport.scss";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { API_URL } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";

const CreateReport = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const medicamentRef = useRef<HTMLInputElement>(null);
  const doctorRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/patients/${path}/create_report`, {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        age: ageRef.current?.value,
        dob: dobRef.current?.value,
        sex: genderRef.current?.value,
        medicament: medicamentRef.current?.value,
        doctor: doctorRef.current?.value,
        status: statusRef.current?.value,
        phoneNum: phoneRef.current?.value,
      });
      if (res.data) {
        navigate("/allReports");
      }
    } catch (err) {
      console.error("Create report failed:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create-report">
        <h2>CREATE A REPORT</h2>
        <div className="create-report-wrapper">
          <form className="create-report-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="First name" required ref={firstNameRef} />
            <input type="text" placeholder="Last name" required ref={lastNameRef} />
            <input type="number" placeholder="Enter age" required ref={ageRef} />
            <input type="date" placeholder="Enter DOB" ref={dobRef} />
            <select ref={genderRef} defaultValue="Gender">
              <option disabled value="Gender">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="text" placeholder="Enter medicament" required ref={medicamentRef} />
            <input type="text" placeholder="Doctor's name" required ref={doctorRef} />
            <select ref={statusRef} defaultValue="Status">
              <option disabled value="Status">Status</option>
              <option value="Urgent">Urgent</option>
              <option value="Stable">Stable</option>
            </select>
            <input type="text" placeholder="Phone number" required ref={phoneRef} />
            <button type="submit">CREATE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReport;
