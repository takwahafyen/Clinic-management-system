import React from "react";
import "./singleVS.scss";

export interface VSData {
  _id?: string;
  firstName?: string;
  lastName?: string;
  age?: number | string;
  dob?: string;
  sex?: string;
  blood_pressure?: string;
  Diabetic_status?: string;
  doctor?: string;
  createdAt?: string;
  [key: string]: any;
}

export interface SingleVSProps {
  VS: VSData;
}

const SingleVS: React.FC<SingleVSProps> = ({ VS }) => {
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
        <p>{VS.doctor}</p>
      </div>
      <div className="VS-item-row">
        <span>Date: </span>
        <p>{VS.createdAt}</p>
      </div>
    </div>
  );
};

export default SingleVS;
