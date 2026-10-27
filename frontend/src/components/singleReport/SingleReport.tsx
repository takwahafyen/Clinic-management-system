import React from "react";
import "./singleReport.scss";

export interface ReportData {
  _id?: string;
  firstName?: string;
  lastName?: string;
  age?: number | string;
  dob?: string;
  sex?: string;
  medicament?: string;
  status?: string;
  doctor?: string;
  createdAt?: string;
  [key: string]: any;
}

export interface SingleReportProps {
  report: ReportData;
}

const SingleReport: React.FC<SingleReportProps> = ({ report }) => {
  return (
    <div className="report-item">
      <div className="report-item-row">
        <span>Patient's name: </span>
        <p>
          {report.firstName} {report.lastName}
        </p>
      </div>
      <div className="report-item-row">
        <span>Age: </span>
        <p>{report.age}</p>
      </div>
      <div className="report-item-row">
        <span>DOB: </span>
        <p>{report.dob}</p>
      </div>
      <div className="report-item-row">
        <span>Sex: </span>
        <p>{report.sex}</p>
      </div>
      <div className="report-item-row">
        <span>medicament: </span>
        <p>{report.medicament}</p>
      </div>
      <div className="report-item-row">
        <span>Status: </span>
        <p>{report.status}</p>
      </div>
      <div className="report-item-row">
        <span>Treatment By: </span>
        <p>{report.doctor}</p>
      </div>
      <div className="report-item-row">
        <span>Date: </span>
        <p>{report.createdAt}</p>
      </div>
    </div>
  );
};

export default SingleReport;
