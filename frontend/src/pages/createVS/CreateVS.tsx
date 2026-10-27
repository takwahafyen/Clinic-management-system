import React, { useRef } from "react";
import "./createVS.scss";
import NavbarNurse from "../../components/navbar/NavbarNurse";
import axios from "axios";
import { API_URL } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";

const CreateVS = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const blood_pressureRef = useRef<HTMLInputElement>(null);
  const doctorRef = useRef<HTMLInputElement>(null);
  const Diabetic_statusRef = useRef<HTMLSelectElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/patients/${path}/create_VS`, {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        age: ageRef.current?.value,
        dob: dobRef.current?.value,
        sex: genderRef.current?.value,
        blood_pressure: blood_pressureRef.current?.value,
        doctor: doctorRef.current?.value,
        Diabetic_status: Diabetic_statusRef.current?.value,
        phoneNum: phoneRef.current?.value,
      });
      if (res.data) {
        navigate("/allVS");
      }
    } catch (err) {
      console.error("Create VS failed:", err);
    }
  };

  return (
    <div>
      <NavbarNurse />
      <div className="create-VS">
        <h2>CREATE A VITAL SIGN</h2>
        <div className="create-VS-wrapper">
          <form className="create-VS-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="First name" required ref={firstNameRef} />
            <input type="text" placeholder="Last name" required ref={lastNameRef} />
            <input type="number" placeholder="Enter age" required ref={ageRef} />
            <input type="date" placeholder="Enter DOB" ref={dobRef} />
            <select defaultValue="" ref={genderRef} required>
              <option value="" disabled>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="text" placeholder="Enter blood pressure" required ref={blood_pressureRef} />
            <input type="text" placeholder="Doctor's name" required ref={doctorRef} />
            <select defaultValue="" ref={Diabetic_statusRef} required>
              <option value="" disabled>Diabetic_Status</option>
              <option value="Non_Diabetic">Non_Diabetic</option>
              <option value="Diabete_Type1">Diabete_Type1</option>
              <option value="Diabete_Type 2">Diabete_Type 2</option>
              <option value="Diabete_Type3">Diabete_Type3</option>
            </select>
            <input type="text" placeholder="Phone number" required ref={phoneRef} />
            <button type="submit">CREATE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVS;
