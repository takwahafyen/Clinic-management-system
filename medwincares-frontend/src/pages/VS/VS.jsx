import React, { useEffect, useState } from "react";
import "./VS.scss";
import NavbarNurse from "../../components/navbar/NavbarNurse";
import Footer from "../../components/footer/Footer";
import SingleVS from "../../components/singleVS/SingleVS";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VS = () => {
  const [VS, setVS] = useState([]);
  const [patients, setPatients] = useState([]);
  const [currP, setCurrP] = useState("ALL");
  let history = useNavigate();
  const location = useLocation();

  const arr = [
    "Non_Diabetic",
    "Diabete_Type1",
    "Diabete_Type2",
    "Diabete_Type3",
  ];

  // Fetch all VS
  useEffect(() => {
    const fetchVS = async () => {
      try {
        const res = await axios.get("http://localhost:5000/patients/allVS");
        setVS(res.data);
      } catch (err) {
        console.error("Error fetching VS:", err);
      }
    };
    fetchVS();
  }, []);

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/patientauth");
        setPatients(res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  const handleFilters = (e) => {
    const value = e.target.value;

    if (!value) {
      return;
    }

    if (e.target.name === "Diabetic_status") {
      history(`/VS/${value}`);
    } else if (e.target.name === "patient") {
      const [nameOfPatient] = value.split(",").map((item) => item.trim());
      setCurrP(nameOfPatient);
      history(`/VS/${nameOfPatient}`);
    } else if (e.target.name === "searchByName") {
      searchByName(value);
    }
  };

  // Ajoutez une nouvelle fonction pour la recherche par nom
  const searchByName = async (name) => {
    try {
      const res = await axios.get(`http://localhost:5000/patients/VS/${encodeURIComponent(name)}`);
      setVS(res.data);
    } catch (err) {
      console.error("Error fetching VS by name:", err);
    }
  };

  useEffect(() => {
    const fetchFilteredVS = async () => {
      try {
        const path = location.pathname.split("/")[2];
        let res;

        if (arr.includes(path)) {
          res = await axios.get(`http://localhost:5000/patients/VS/${path}`);
        } else {
          res = await axios.get(`http://localhost:5000/patients/${path}/all_VS`);
        }

        setVS(res.data);
      } catch (err) {
        console.error("Error fetching filtered VS:", err);
      }
    };
    fetchFilteredVS();
  }, [location.pathname]);

  const handleRefreshClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/patients/allVS");
      setVS(res.data);
      history("/allVS");
    } catch (err) {
      console.error("Error refreshing VS:", err);
    }
  };

  return (
    <div>
      <NavbarNurse />
      <div className="VS">
        <div className="VS-wrapper">
          <h3>{currP === "ALL" ? "ALL" : currP + "'s"} VITAL SIGNS</h3>
          <div>
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/basic-monochrome-icon/refresh-149.png"
              alt="refresh-icon"
              className="refresh-icon"
              onClick={handleRefreshClick}
            />
          </div>
          <div className="VS-top">
            <div className="VS-top-left">
              <label>Patient's diabetic status: </label>
              <select name="Diabetic_status" onChange={handleFilters} defaultValue="default">
                <option value="default" disabled>
                  Diabetic_Status
                </option>
                <option value="Non_Diabetic">Non_Diabetic</option>
                <option value="Diabete_Type1">Diabete_Type 1</option>
                <option value="Diabete_Type2">Diabete_Type 2</option>
                <option value="Diabete_Type3">Diabete_Type 3</option>
              </select>
            </div>
            
          </div>
          <div className="VS-bottom">
            {VS.map((singleVS) => (
              <SingleVS key={singleVS._id} VS={singleVS} />
            ))}
            <p className="no-results">{VS.length === 0 && "No results found"}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VS;