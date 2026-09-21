import React, { useEffect, useState } from "react";
import "./FC.scss";
import NavbarPha from "../../components/navbar/NavbarPha";
import Footer from "../../components/footer/Footer";
import SingleFC from "../../components/singleFC/SingleFC";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const FC = () => {
  const [FC, setFC] = useState([]);
  const [client, setClient] = useState([]);
  const [currC, setCurrC] = useState("ALL");
  let history = useNavigate();
  const location = useLocation();
  const arr = [
    "doliprane",
    "clamoxil",
    "maxilase",
    "gripex",
  ];


  // Fetch all FC
  useEffect(() => {
    const fetchFC = async () => {
      const res = await axios.get("http://localhost:5000/client/allFC");

      setFC(res.data);
    };
    fetchFC();
  }, []);

  // Fetch client
  useEffect(() => {
    const fetchClient = async () => {
      const res = await axios.get("http://localhost:5000/clientauth");
      setClient(res.data);
    };
    fetchClient();
  }, []);

  // const handleFilters = (e) => {
  //   let value;

  //   if (e.target.name === "status") {
  //     value = e.target.value;
  //   } else if (e.target.name === "client") {
  //     value = e.target.value.split(",")[1].trim();
  //   }
  //   setFilters({
  //     [e.target.name]: value,
  //   });
  // };

  const handleFilters = (e) => {
    let value;
    let nameOfClient;
    if (e.target.name === "medicament") {
      value = e.target.value;
      history(`/FC/${value}`);
    } else if (e.target.name === "client") {
      nameOfClient = e.target.value.split(",")[0].trim();
      value = e.target.value.split(",")[1].trim();
      setCurrC(nameOfClient);

      history(`/FC/${value}/${nameOfClient}`);
    }
  };
  console.log(currC);

  useEffect(() => {
    const fetchFilteredFC = async () => {
      try {
        let res;

        const path = location.pathname.split("/")[2];

        if (arr.includes(path)) {
          res = await axios.get(
            `http://localhost:5000/client/FC/${path}`
          );
        } else {
          res = await axios.get(
            `http://localhost:5000/client/${path}/all_FC`
          );
        }
        setFC(res.data);
      } catch (err) {}
    };
    fetchFilteredFC();
  }, [location.pathname]);

  const handleRefreshClick = async (e) => {
    e.preventDefault();
    const res = await axios.get("http://localhost:5000/client/allFC");
    setFC(res.data);
    history("/allFC");
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
              <select name="medicament" onChange={handleFilters} defaultValue="default">
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
            {FC.map((FC) => (
              <SingleFC key={FC._id} FC={FC} />
            ))}
            <p className="no-results">{FC.length===0 && "No results found"}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FC;
