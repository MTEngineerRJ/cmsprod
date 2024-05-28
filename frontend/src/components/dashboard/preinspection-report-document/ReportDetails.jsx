import React from "react";
// import { formatDate } from "./functions/SurveyReportFunctions";

const ReportDetails = ({allInfo}) => {
  function getCurrentDate() {
    const today = new Date();
    
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundColor: "white",
          width: "100%",
          // height: "25px",
          // marginTop: "-25px",
        }}
      ></div>
      <div className="">
        <div style={{ textAlign: "center" }}>
          <img
            width={481}
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

        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            border: "2px solid #2e008b",
            padding: "5px",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          <div>
            <label htmlFor="" className="fw-bold text-dark">
              Report Id :
            </label>
            <span> {allInfo?.claimDetails?.length > 0 ? allInfo?.claimDetails[0].ReferenceNo : '----' } </span>
          </div>
          <div>
            <label htmlFor="" className="fw-bold text-dark fs-6">
              {allInfo?.vehicleDetails[0]?.VehicleType === "2W" ? 
              "Two Wheeler Inspection Report" :
              allInfo?.vehicleDetails[0]?.VehicleType === "4W" ? 
              "Four Wheeler Inspection Report" :
              "Commercial Wheeler Inspection Report"
              }
              
            </label>
            {/* <span> {allInfo?.otherInfo[0]?.ReferenceNo}</span> */}
          </div>
          <div>
            <label htmlFor="" className="fw-bold text-dark">
              Date :{" "}
            </label>
            <span className="text-dark"> {getCurrentDate()}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDetails;
function getCurrentDate() {
  const today = new Date();
  
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}