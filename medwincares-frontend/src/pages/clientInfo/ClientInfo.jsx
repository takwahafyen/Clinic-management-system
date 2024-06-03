import React, { useEffect, useState } from "react";
import "./clientInfo.scss";
import NavbarPha from "../../components/navbar/NavbarPha";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const ClientInfo = () => {
  const [client, setClient] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [updateMode, setUpdateMode] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/clientauth/clientInfo/${path}`
        );
        setClient(res.data);
        setPhone(res.data.phoneNo);
      } catch (err) {}
    };
    fetchClient();
  }, [path]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      await axios.put(`http://localhost:5000/clientauth/update/${path}`, {
        phoneNo: phone,
      });

      setUpdateMode(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <NavbarPha />
      <div className="client-info">
        <div className="client-info-wrapper">
          <div className="client-info-item">
            <span>First name: </span>
            <p>{client.firstName}</p>
          </div>
          <div className="client-info-item">
            <span>Last name: </span>
            <p>{client.lastName}</p>
          </div>
          <div className="client-info-item">
            <span>Phone number: </span>
            {updateMode ? (
              <input
                type="text"
                placeholder="Phone number"
                value={phone}
                required
                autoFocus={true}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              <p>{phone}</p>
            )}
          </div>
          <div className="client-info-item">
            <Link to={`/client/${path}/create_FC`}>
              <button>CREATE A FACTURE</button>
            </Link>
            {updateMode ? (
              <button onClick={handleUpdate}>CLICK TO UPDATE</button>
            ) : (
              <button onClick={(e) => setUpdateMode(true)}>
                UPDATE Client
              </button>
            )}
            <Link to="/allFC">
              <button>VIEW FACTURE</button>
            </Link>
           
          </div>
        
        
          {error && (
            <p className="errorMsg">Something went wrong! Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
