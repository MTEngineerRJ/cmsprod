import React from "react";
import { formatDate, addCommasToNumber } from "./functions/InsuranceParticularFunctions";
const InsuranceParticulars = ({ allInfo }) => {
  return (
    <div>
      <h6 className="text-dark" style={{ color: "black" }}>
        INSURANCE PARTICULARS :
      </h6>

      <table style={{ width: "100%" }}>
        <tr>
          <td style={{ width: "25%" }} className="text-start">
            <span>(a) Policy / Cover Note No. </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "40%" }} className="text-start">
            <span className="fw-bold text-dark">
              {allInfo?.otherInfo[0]?.PolicyNumber}
            </span>
          </td>
          <td style={{ width: "30%" }}>
            <div className="d-flex gap-4" style={{ marginLeft: "" }}>
              <div>
                <label htmlFor="">IDV</label>
              </div>
              <div>
                <span style={{ marginLeft: "12px" }}>:</span>
              </div>
              <span> ₹ {addCommasToNumber(allInfo?.otherInfo[0]?.IDV)}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ width: "25%" }} className="">
            <span> (b) Period of Insurance</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "40%" }} className="text-start">
            <span>
              {formatDate(allInfo?.otherInfo[0]?.PolicyPeriodStart)} to{" "}
              {formatDate(allInfo?.otherInfo[0]?.PolicyPeriodEnd)}
            </span>
          </td>
          <td style={{ width: "30%" }}>
            <div className="d-flex gap-1" style={{ marginLeft: "" }}>
              <div>
                <label htmlFor="">Claim No.</label>
              </div>
              <div>
                <span>:</span>
              </div>
              <span> {allInfo?.otherInfo[0]?.ClaimNumber} </span>
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ width: "25%" }} className="text-start">
            <span>(c) Endorsement </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "40%" }} className="text-start">
            <span> --</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "25%" }} className="text-start">
            <span>(d) Insurers</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "40%" }} className="text-start">
            <span>
              {" "}
              {String(
                allInfo?.otherInfo[0]?.InsuranceCompanyNameAddress
              ).toUpperCase()}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="d-flex align-item-start">
            <span>(e) Insured</span>
          </td>
          <td style={{ width: "5%", marginTop: "-10px" }} className="">
            <span>:</span>
          </td>
          <td style={{ width: "40%" }} className="text-start">
            <span>
              {" "}
              {allInfo?.otherInfo[0]?.InsuredName}
              {allInfo?.otherInfo[0]?.InsuredMobileNo1 === null
                ? allInfo?.otherInfo[0]?.InsuredMobileNo1
                : allInfo?.otherInfo[0]?.InsuredMobileNo1}{" "}
              <br />
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="d-flex align-item-start">
            <span>(f) Address</span>
          </td>
          <td style={{ width: "5%" }} className="">
            <span>:</span>
          </td>
          <td style={{ width: "40%" }} className="text-start">
            <span>{allInfo?.otherInfo[0]?.PermanentAddress}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "25%" }} className="text-start">
            <span>(g) H.P.A. </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "40%" }} className="text-start">
            <span>
              {" "}
              {allInfo?.otherInfo[0]?.HPA
                ? allInfo?.otherInfo[0]?.HPA
                : "-"}{" "}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "25%" }} className="text-start">
            <span>(h) Appointed By </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "40%" }} className="text-start">
            <span> {allInfo?.otherInfo[0]?.ClaimServicingOffice}</span>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default InsuranceParticulars;
