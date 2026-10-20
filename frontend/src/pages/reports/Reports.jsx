import React, { useEffect, useState } from "react";
import "./reports.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SingleReport from "../../components/singleReport/SingleReport";
import axios from "axios";
import { API_URL } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [currP, setCurrP] = useState("ALL");
  const navigate = useNavigate();
  const location = useLocation();

  const arr = ["Urgent", "Stable"];

  // Fetch all reports on initial load
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`${API_URL}/patients/allReports`);
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, []);

  const handleFilters = (e) => {
    if (e.target.name === "status") {
      const value = e.target.value;
      navigate(`/reports/${value}`);
    } else if (e.target.name === "patient") {
      const nameOfPatient = e.target.value.split(",")[0].trim();
      const value = e.target.value.split(",")[1].trim();
      setCurrP(nameOfPatient);
      navigate(`/reports/${value}/${nameOfPatient}`);
    }
  };

  // Fetch filtered reports only when a route filter param is provided
  useEffect(() => {
    const fetchFilteredReports = async () => {
      const path = location.pathname.split("/")[2];
      if (!path) return;

      try {
        let res;
        if (arr.includes(path)) {
          res = await axios.get(`${API_URL}/patients/reports/${path}`);
        } else {
          res = await axios.get(`${API_URL}/patients/${path}/all_reports`);
        }
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching filtered reports:", err);
      }
    };
    fetchFilteredReports();
  }, [location.pathname]);

  const handleRefreshClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/patients/allReports`);
      setReports(res.data);
      navigate("/allReports");
    } catch (err) {
      console.error("Error refreshing reports:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="reports">
        <div className="reports-wrapper">
          <h3>{currP === "ALL" ? "ALL" : currP + "'s"} REPORTS</h3>
          <div>
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/basic-monochrome-icon/refresh-149.png"
              alt="refresh-icon"
              className="refresh-icon"
              onClick={handleRefreshClick}
            />
          </div>
          <div className="reports-top">
            <div className="reports-top-left">
              <label>Patient's status: </label>
              <select name="status" onChange={handleFilters} defaultValue="default">
                <option value="default" disabled>
                  Status
                </option>
                <option value="Urgent">Urgent</option>
                <option value="Stable">Stable</option>
              </select>
            </div>
          </div>
          <div className="reports-bottom">
            {reports.map((report) => (
              <SingleReport key={report._id} report={report} />
            ))}
            <p className="no-results">
              {reports.length === 0 && "No results found"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reports;
