import React from "react";
import { useRef, useState } from "react";

const FatalityInjuries = ({ allInfo, spotInfo }) => {
  const pdfRef = useRef();
  

  return (
    <div>
      <div className="d-flex gap-5">
        <h6 className="text-dark">9. FATALITY / INJURIES DETAILS :</h6>
      </div>
      <table style={{ width: "100%" }}>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(a) Details of TP Vehicle </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span> {spotInfo?.AccidentDetailsSpot?.TransporterNameInLoad}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span> (b) Death/Injury Details of Insured Vehicle</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span> {"-"}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(c) No of Passangers of Insured Vehicle</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span>{spotInfo?.AccidentDetailsSpot?.NoOfPassengersInLoad}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(d) Death/Injury Details of TP</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span> {"-"}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(e) Third Party Property Damages</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span>
              {" "}
              {spotInfo?.AccidentDetailsSpot?.NatureOfFoodsThirdParty} with
              Quantity as
              {spotInfo?.AccidentDetailsSpot?.QuantityOfGoodsThirdParty} , from{" "}
              {spotInfo?.AccidentDetailsSpot?.OriginToDestThirdParty} with LR
              Invoice as :{spotInfo?.AccidentDetailsSpot?.LRInvoiceNoThirdParty}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(f) Person available on spot</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span> {spotInfo?.AccidentDetailsSpot?.PersonArrestedOnSpot}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(g) Vehicle Will be Shifted to</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span> {spotInfo?.AccidentDetailsSpot?.Vehicle_Shifted_To}</span>
          </td>
        </tr>
      </table>

      <div
        style={{
          border: "1px solid black",
          marginBottom: "5px",
          marginTop: "5px",
        }}
      ></div>

      <div className="d-flex gap-5">
        <h6 className="text-dark">10. POLICE ACTION :</h6>
      </div>
      <table style={{ width: "100%" }}>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(a) The accident has been reported to the police </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span>
              {" "}
              {Number(spotInfo?.AccidentDetailsSpot?.StationDiaryNo) > 0
                ? "Yes"
                : "No"}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span> (b) Name of Police Station</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span>
              {" "}
              {Number(spotInfo?.AccidentDetailsSpot?.StationDiaryNo) > 0
                ? spotInfo?.AccidentDetailsSpot?.PoliceStationName
                : "-"}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(c) FIR No. And Date & Section</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span>
              {Number(spotInfo?.AccidentDetailsSpot?.StationDiaryNo) > 0
                ? `${spotInfo?.AccidentDetailsSpot?.StationDiaryNo} , ${spotInfo?.AccidentDetailsSpot?.LoadChallan ? spotInfo?.AccidentDetailsSpot?.LoadChallan : "-"}`
                : "-,-"}
            </span>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default FatalityInjuries;
