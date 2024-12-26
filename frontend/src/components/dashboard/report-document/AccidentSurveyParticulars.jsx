import React from "react";
import {
  convertToReadable,
  formatDate,
  reverseDate,
} from "./functions/AccidentSurveyFunctions";

const AccidentSurveyParticulars = ({ allInfo }) => {
  return (
    <div>
      <div className="d-flex gap-5">
        <h6 className="text-dark">ACCIDENT & SURVEY PARTICULARS :</h6>
      </div>
      <table style={{ width: "100%" }}>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(a) Date & Time of Accident </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span>
              {" "}
              {formatDate(allInfo?.otherInfo[0]?.DateOfAccident)},{" "}
              {convertToReadable(allInfo?.otherInfo[0]?.TimeOfAccident)}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span> (b) Place of Accident</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span> {allInfo?.otherInfo[0]?.PlaceOfLoss}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(c) Place of Survey </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span>{allInfo?.otherInfo[0]?.PlaceOfSurvey}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(d) Date of Allotment of Survey </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span> {formatDate(allInfo?.otherInfo[0]?.AddedDateTime)}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(e) Date & Time of Survey </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
          <span> {reverseDate(allInfo?.accidentDetails?.InspectionDate)}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(f) Date of Receipt of Spot Survey Report </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span> Not Conducted, As Stated By the Insured.</span>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default AccidentSurveyParticulars;
