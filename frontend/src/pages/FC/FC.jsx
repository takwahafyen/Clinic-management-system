import React, { useEffect, useState } from "react";
import "./FC.scss";
import NavbarPha from "../../components/navbar/NavbarPha";
import Footer from "../../components/footer/Footer";
import SingleFC from "../../components/singleFC/SingleFC";
import axios from "axios";
import { API_URL } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";

const FC = () => {
  const [FCList, setFCList] = useState([]);
  const [currC, setCurrC] = useState("ALL");
  const navigate = useNavigate();
  const location = useLocation();

  const arr = ["doliprane", "clamoxil", "maxilase", "gripex"];

  // Fetch all FC on initial load
  useEffect(() => {
    const fetchFC = async () => {
      try {
        const res = await axios.get(`${API_URL}/client/allFC`);
        setFCList(res.data);
      } catch (err) {
        console.error("Error fetching FC:", err);
      }
    };
    fetchFC();
  }, []);

  const handleFilters = (e) => {
    if (e.target.name === "medicament") {
      const value = e.target.value;
      navigate(`/FC/${value}`);
    } else if (e.target.name === "client") {
      const nameOfClient = e.target.value.split(",")[0].trim();
      const value = e.target.value.split(",")[1].trim();
      setCurrC(nameOfClient);
      navigate(`/FC/${value}/${nameOfClient}`);
    }
  };

  // Fetch filtered FC only when route filter param is provided
  useEffect(() => {
    const fetchFilteredFC = async () => {
      const path = location.pathname.split("/")[2];
      if (!path) return;

      try {
        let res;
        if (arr.includes(path)) {
          res = await axios.get(`${API_URL}/client/FC/${path}`);
        } else {
          res = await axios.get(`${API_URL}/client/${path}/all_FC`);
        }
        setFCList(res.data);
      } catch (err) {
        console.error("Error fetching filtered FC:", err);
      }
    };
    fetchFilteredFC();
  }, [location.pathname]);

  const handleRefreshClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/client/allFC`);
      setFCList(res.data);
      navigate("/allFC");
    } catch (err) {
      console.error("Error refreshing FC:", err);
    }
  };

  return (
    <div>
      <NavbarPha />
      <div className="FC">
        <div className="FC-wrapper">
          <h3>{currC === "ALL" ? "ALL" : currC + "'s"} Facture</h3>
          <div>
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/basic-monochrome-icon/refresh-149.png"
              alt="refresh-icon"
              className="refresh-icon"
              onClick={handleRefreshClick}
            />
          </div>
          <div className="FC-top">
            <div className="FC-top-left">
              <label>Client's medicament: </label>
              <select
                name="medicament"
                onChange={handleFilters}
                defaultValue="default"
              >
                <option value="default" disabled>
                  medicament
                </option>
                <option value="doliprane">doliprane</option>
                <option value="clamoxil">clamoxil</option>
                <option value="maxilase">maxilase</option>
                <option value="gripex">gripex</option>
              </select>
            </div>
          </div>
          <div className="FC-bottom">
            {FCList.map((item) => (
              <SingleFC key={item._id} FC={item} />
            ))}
            <p className="no-results">
              {FCList.length === 0 && "No results found"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FC;
