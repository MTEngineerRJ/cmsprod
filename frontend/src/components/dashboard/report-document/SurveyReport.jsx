import React from "react";
import {  formatDate } from "./functions/SurveyReportFunctions";

const SurveyReport = ({ allInfo }) => {
  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "25px",
          marginTop: "-25px",
        }}
      ></div>
      <div>
        <div style={{ marginTop: "px" }}>
          <img
            width={421}
            height={139}
            priority
            className="w50"
            src="/assets/images/header.jpg"
            alt="1.jpg"
          />
        </div>
        <div
          style={{
            border: "1px solid black",
            marginBottom: "5px",
            marginTop: "5px",
          }}
        ></div>

        <div className="d-flex justify-content-between">
          <div>
            <label htmlFor="" className="fw-bold text-dark">
              Ref No. :
            </label>
            <span> {allInfo?.otherInfo[0]?.ReferenceNo}</span>
          </div>
          <div>
            <label htmlFor="" className="fw-bold text-dark">
              Date :{" "}
            </label>
            <span className="text-dark"> {formatDate(new Date())}</span>
          </div>
        </div>
        <div className="text-center">
          <h5 style={{ fontFamily: "sans-serif", color: "black" }}>
            MOTOR {String(allInfo?.otherInfo[0]?.InspectionType).toUpperCase()}{" "}
            SURVEY REPORT (
            {Number(allInfo?.summaryReport[0]?.CashLess) === 1
              ? "CASH LESS"
              : "NON CASHLESS"}
            )- (
            {allInfo?.otherInfo[0]?.PolicyType
              ? (allInfo?.otherInfo[0]?.PolicyType).toUpperCase()
              : "REGULAR"}
            )
          </h5>
        </div>
        <div>
          <p className="text-dark">
            This report is issued by me/us as a licensed Surveyor(s) without
            prejudice in respect of cause, nature and extent of loss/damages and
            subject to the terms and conditions of the insurance policy.
          </p>
        </div>
      </div>
    </>
  );
};

export default SurveyReport;
