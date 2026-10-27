import React, { useRef } from "react";
import "./createFC.scss";
import NavbarPha from "../../components/navbar/NavbarPha";
import axios from "axios";
import { API_URL } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";

const CreateFC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const quantiteRef = useRef<HTMLInputElement>(null);
  const doctorRef = useRef<HTMLInputElement>(null);
  const medicamentRef = useRef<HTMLSelectElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/client/${path}/create_FC`, {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        age: ageRef.current?.value,
        dob: dobRef.current?.value,
        sex: genderRef.current?.value,
        quantite: quantiteRef.current?.value,
        doctor: doctorRef.current?.value,
        medicament: medicamentRef.current?.value,
        phoneNum: phoneRef.current?.value,
      });
      if (res.data) {
        navigate("/allFC");
      }
    } catch (err) {
      console.error("Create FC failed:", err);
    }
  };

  return (
    <div>
      <NavbarPha />
      <div className="create-FC">
        <h2>CREATE A FACTURE</h2>
        <div className="create-FC-wrapper">
          <form className="create-FC-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="First name" required ref={firstNameRef} />
            <input type="text" placeholder="Last name" required ref={lastNameRef} />
            <input type="number" placeholder="Enter age" required ref={ageRef} />
            <input type="date" placeholder="Enter DOB" ref={dobRef} />
            <select ref={genderRef} defaultValue="Gender">
              <option disabled value="Gender">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="text" placeholder="Enter quantite" required ref={quantiteRef} />
            <input type="text" placeholder="Doctor's name" required ref={doctorRef} />
            <select ref={medicamentRef} defaultValue="Medicament">
              <option disabled value="Medicament">Medicament</option>
              <option value="doliprane">doliprane</option>
              <option value="clamoxil">clamoxil</option>
              <option value="maxilase">maxilase</option>
              <option value="gripex">gripex</option>
            </select>
            <input type="text" placeholder="Phone number" required ref={phoneRef} />
            <button type="submit">CREATE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFC;
