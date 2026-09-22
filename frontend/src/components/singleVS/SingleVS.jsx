import React from "react";
import "./singleVS.scss";

const SingleVS = ({ VS }) => {
  return (
    <div className="VS-item">
      <div className="VS-item-row">
        <span>Patient's name: </span>
        <p>
          {VS.firstName} {VS.lastName}
        </p>
      </div>
      <div className="VS-item-row">
        <span>Age: </span>
        <p>{VS.age}</p>
      </div>
      <div className="VS-item-row">
        <span>DOB: </span>
        <p>{VS.dob}</p>
      </div>
      <div className="VS-item-row">
        <span>Sex: </span>
        <p>{VS.sex}</p>
      </div>
      <div className="VS-item-row">
        <span>Blood_pressure: </span>
        <p>{VS.blood_pressure}</p>
      </div>
      <div className="VS-item-row">
        <span>Diabetic_Status: </span>
        <p>{VS.Diabetic_status}</p>
      </div>
      <div className="VS-item-row">
        <span>Treatment By: </span>
        <p>
          {VS.doctor} 
        </p>
      </div>
      <div className="VS-item-row">
        <span>Date: </span>
        <p>{VS.createdAt}</p>
      </div>
    </div>
  );
};

export default SingleVS;
