import React from "react";
import "./singleFC.scss";

const SingleFC = ({ FC }) => {
  return (
    <div className="FC-item">
      <div className="FC-item-row">
        <span>Client's name: </span>
        <p>
          {FC.firstName} {FC.lastName}
        </p>
      </div>
      <div className="FC-item-row">
        <span>Age: </span>
        <p>{FC.age}</p>
      </div>
      <div className="FC-item-row">
        <span>DOB: </span>
        <p>{FC.dob}</p>
      </div>
      <div className="FC-item-row">
        <span>Sex: </span>
        <p>{FC.sex}</p>
      </div>
      <div className="FC-item-row">
        <span>Quantite: </span>
        <p>{FC.quantite}</p>
      </div>
      <div className="FC-item-row">
        <span>medicament: </span>
        <p>{FC.medicament}</p>
      </div>
      <div className="FC-item-row">
        <span>Treatment By: </span>
        <p>
          {FC.doctor} 
        </p>
      </div>
      <div className="FC-item-row">
        <span>Date: </span>
        <p>{FC.createdAt}</p>
      </div>
    </div>
  );
};

export default SingleFC;
