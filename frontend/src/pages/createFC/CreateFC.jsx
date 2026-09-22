import React, { useRef } from "react";
import "./createFC.scss";
import NavbarPha from "../../components/navbar/NavbarPha";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CreateFC = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const dobRef = useRef();
  const genderRef = useRef();
  const quantiteRef = useRef();
  const doctorRef = useRef();
  const medicamentRef = useRef();
  const phoneRef = useRef();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    try {
      const res = await axios.post(
        `http://localhost:5000/client/${path}/create_FC`,
        {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          age: ageRef.current.value,
          dob: dobRef.current.value,
          sex: genderRef.current.value,
          quantite: quantiteRef.current.value,
          doctor: doctorRef.current.value,
          medicament: medicamentRef.current.value,
          phoneNum: phoneRef.current.value,
        }
      );
      console.log(res.data);
      res.data && window.location.replace("/allFC");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavbarPha />
      <div className="create-FC">
        <h2>CREATE A FACTURE</h2>
        <div className="create-FC-wrapper">
          <form className="create-FC-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First name"
              required
              ref={firstNameRef}
            />
            <input
              type="text"
              placeholder="Last name"
              required
              ref={lastNameRef}
            />
            <input
              type="number"
              placeholder="Enter age"
              required
              ref={ageRef}
            />
            <input type="date" placeholder="Enter DOB" ref={dobRef} />
            <select ref={genderRef}>
              <option disabled selected>
                Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <input
              type="text"
              placeholder="Enter quantite"
              required
              ref={quantiteRef}
            />
            <input
              type="text"
              placeholder="Doctor's name"
              required
              ref={doctorRef}
            />
            <select ref={medicamentRef} >
              <option disabled selected>
                Medicament
              </option>
              <option value="doliprane">doliprane</option>
              <option value="clamoxil">clamoxil</option>
              <option value="maxilase">maxilase</option>
              <option value="gripex">gripex</option>
            </select>
            <input
              type="text"
              placeholder="Phone number"
              required
              ref={phoneRef}
            />
            <button type="submit">CREATE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFC;
