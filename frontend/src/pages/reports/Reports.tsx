import React, { useEffect, useState } from "react";
import "./reports.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SingleReport from "../../components/singleReport/SingleReport";
import { SkeletonGrid } from "../../components/skeleton/SkeletonCard";
import axios from "axios";
import { API_URL } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";

const REPORT_STATUSES = ["Urgent", "Stable"];

const Reports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currP, setCurrP] = useState("ALL");
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch all reports on initial load
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/patients/allReports`);
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

      setLoading(true);
      try {
        let res;
        if (REPORT_STATUSES.includes(path)) {
          res = await axios.get(`${API_URL}/patients/reports/${path}`);
        } else {
          res = await axios.get(`${API_URL}/patients/${path}/all_reports`);
        }
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching filtered reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredReports();
  }, [location.pathname]);

  const handleRefreshClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/patients/allReports`);
      setReports(res.data);
      navigate("/allReports");
    } catch (err) {
      console.error("Error refreshing reports:", err);
    } finally {
      setLoading(false);
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
                <option value="default" disabled>Status</option>
                <option value="Urgent">Urgent</option>
                <option value="Stable">Stable</option>
              </select>
            </div>
          </div>
          <div className="reports-bottom">
            {loading ? (
              <SkeletonGrid count={3} />
            ) : reports.length > 0 ? (
              reports.map((report) => (
                <SingleReport key={report._id} report={report} />
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

export default Reports;
