import React, { useEffect, useState } from "react";
import "./VS.scss";
import NavbarNurse from "../../components/navbar/NavbarNurse";
import Footer from "../../components/footer/Footer";
import SingleVS from "../../components/singleVS/SingleVS";
import { SkeletonGrid } from "../../components/skeleton/SkeletonCard";
import axios from "axios";
import { API_URL } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";

const VS = () => {
  const [VSList, setVSList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currP, setCurrP] = useState("ALL");
  const navigate = useNavigate();
  const location = useLocation();

  const arr = [
    "Non_Diabetic",
    "Diabete_Type1",
    "Diabete_Type2",
    "Diabete_Type3",
  ];

  // Fetch all VS on initial load
  useEffect(() => {
    const fetchVS = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/patients/allVS`);
        setVSList(res.data);
      } catch (err) {
        console.error("Error fetching VS:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVS();
  }, []);

  const handleFilters = (e) => {
    const value = e.target.value;
    if (!value) return;

    if (e.target.name === "Diabetic_status") {
      navigate(`/VS/${value}`);
    } else if (e.target.name === "patient") {
      const [nameOfPatient] = value.split(",").map((item) => item.trim());
      setCurrP(nameOfPatient);
      navigate(`/VS/${nameOfPatient}`);
    } else if (e.target.name === "searchByName") {
      searchByName(value);
    }
  };

  const searchByName = async (name) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/patients/VS/${encodeURIComponent(name)}`
      );
      setVSList(res.data);
    } catch (err) {
      console.error("Error fetching VS by name:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filtered VS only when route parameter exists
  useEffect(() => {
    const fetchFilteredVS = async () => {
      const path = location.pathname.split("/")[2];
      if (!path) return;

      setLoading(true);
      try {
        let res;
        if (arr.includes(path)) {
          res = await axios.get(`${API_URL}/patients/VS/${path}`);
        } else {
          res = await axios.get(`${API_URL}/patients/${path}/all_VS`);
        }
        setVSList(res.data);
      } catch (err) {
        console.error("Error fetching filtered VS:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredVS();
  }, [location.pathname, arr]);

  const handleRefreshClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/patients/allVS`);
      setVSList(res.data);
      navigate("/allVS");
    } catch (err) {
      console.error("Error refreshing VS:", err);
    } finally {
      setLoading(false);
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
              <select
                name="Diabetic_status"
                onChange={handleFilters}
                defaultValue="default"
              >
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
            {loading ? (
              <SkeletonGrid count={3} />
            ) : VSList.length > 0 ? (
              VSList.map((singleVS) => (
                <SingleVS key={singleVS._id} VS={singleVS} />
              ))
            ) : (
              <p className="no-results">No results found</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VS;
