import React from "react";
import { useRef, useState } from "react";

const DetailsOfLoadChalaan = ({ allInfo ,spotInfo}) => {
  const pdfRef = useRef();
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const dateParts = new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .split("/");
    const formattedDate =
      dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2];
    return formattedDate;
  };

  return (
    <div>
      <div className="d-flex gap-5">
        <h6 className="text-dark">
          6. DETAILS OF LOAD CHALLAN / TRIP SHEET DETAILS :
        </h6>
      </div>
      <table style={{ width: "100%" }}>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(a) Nature of Goods Carried and Packing </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span>
              {" "}
              {spotInfo.AccidentDetailsSpot?.NatureOfGoodsInLoad}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span> (b) Weight of Goods Carried</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span> {spotInfo?.AccidentDetailsSpot?.WeightOfGoodsInLoad}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(c) Origin - Destination</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span>{spotInfo?.AccidentDetailsSpot?.OriginToDestInLoad}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(d) L/R Invoice No. & Date</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span> {spotInfo?.AccidentDetailsSpot?.LRInvoiceNoInLoad}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "35%" }} className="text-start">
            <span>(e) Transporter Name </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "55%" }} className="text-start">
            <span>
              {" "}
              {spotInfo?.AccidentDetailsSpot?.TransporterNameInLoad}
            </span>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default DetailsOfLoadChalaan;
