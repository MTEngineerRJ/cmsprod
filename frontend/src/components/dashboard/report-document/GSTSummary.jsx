import React, { useEffect } from "react";
import Image from "next/image";
import { useRef, useState } from "react";
import { numberToWords } from "number-to-words";
import {
  calculateGSTWholeSectionVauesWithGST2,
  calculateGSTWholeSectionGST2,
  addCommasToNumber,
  getTotalDepreciationValueOnly,
  getTotalNonMetaDepreciationValueOnly,
  getTotalLabourAssessedGST2,
  calculateLabourDepreciations,
  convertToProperHTML,
  addVariables,
  getTotalLabourAssessed2,
  getGSTSummaryLabourDetails,
  roundOff,
} from "./functions/GSTSummaryFunctions";

import { getSummaryTotalWithLessSalvage } from "./functions/SummaryOfAssessmentFunctions";

const GSTSummary = ({ totalIMTLabourValue, totalIMTNewPartValue, allInfo }) => {
  const pdfRef = useRef();

  const [allGST, setGST] = useState([]);

  const [noGST, setNoGST] = useState([]);

  const [allGSTType, setAllGSTType] = useState([]);

  const lessExcess = Number(allInfo?.summaryReport[0]?.LessExcess) || 0;
  const lessSalvage = Number(allInfo?.summaryReport[0]?.ExpectedSalvage) || 0;

  const [splitText, setSplitText] = useState([]);

  const text = convertToProperHTML(
    addVariables(allInfo, allInfo?.summaryReport[0]?.SummaryNotes)
  );

  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const sum = Number(totalIMTLabourValue) + Number(totalIMTNewPartValue);
    setTotalValue(sum / 2);
  }, [totalIMTLabourValue, totalIMTNewPartValue]);

  useEffect(() => {
    let array = [];
    const newParts = allInfo?.newPartsDetails;
    newParts?.map((part, index) => {
      let indexValue = -1;
      array?.map((temp, idx) => {
        if (String(temp.field) === String(part.NewPartsGSTPct) && part.IsImt === 0) {
          indexValue = idx;
        }
      });

      if (indexValue === -1) {
        const newField = {
          field: part.NewPartsGSTPct,
          value: 1,
        };
        array.push(newField);
      }
    });

    array.sort((a, b) => parseFloat(a.field) - parseFloat(b.field));
    console.log("array", array);
    setAllGSTType(array);
  }, [allInfo]);

  useEffect(() => {
    let array = [],
      array2 = [];
    const labours = allInfo?.labourDetails;
    labours?.map((part, index) => {
      if (Number(part.IsGSTIncluded) % 2 === 0 && part.IsImt === 0) {
        const newRow = {
          ...part,
          pos: index + 1,
        };
        array.push(newRow);
      } else if(part.IsImt === 0) {
        const newRow = {
          ...part,
          pos: index + 1,
        };
        array2.push(newRow);
      }
    });
    setNoGST(array);
    setGST(array2);
  }, [allInfo]);

  useEffect(() => {
    const regex = /\s(?=\d{2}\s)/g;
    const splitParts = text.split(regex).map((part) => part.trim());
    setSplitText(splitParts);
  }, [text]);
  return (
    <>
      <div className="" style={{ marginTop: "10px" }}>
        {allInfo?.otherInfo[0]?.PolicyType !== "Regular" && (
          <h5 className="text-dark" style={{ color: "black" }}>
            Depreciations(
            {addCommasToNumber(
              roundOff(
                getTotalDepreciationValueOnly(allInfo, "Glass", false) +
                  getTotalDepreciationValueOnly(allInfo, "Metal", false) +
                  getTotalNonMetaDepreciationValueOnly(allInfo) +
                  calculateLabourDepreciations(allInfo)
              )
            )}{" "}
            % ) is not deducted being{" "}
            <span style={{ fontWeight: "bold" }}>NIL DEPRECIATION</span> policy.
          </h5>
        )}
        <h5 className="text-dark" style={{ color: "black" }}>
          GST Summary Tax Wise (New Parts)
        </h5>
        <table style={{ width: "100%" }}>
          <tr>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Sr.No.
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Tax Percentage
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Actual Allowed
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              C GST
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              S GST
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              I GST
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Total
            </th>
          </tr>

          {allInfo?.GSTSummaryNewParts.map((field, index) => {
            return (
              true && (
                <>
                  <>
                    <tr>
                      <td
                        style={{
                          border: "1px solid black",
                          paddingRight: "5px",
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          paddingRight: "5px",
                        }}
                      >
                        {field.GSTPct} %
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          paddingRight: "5px",
                        }}
                      >
                        {field.TotalAssessed}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          paddingRight: "5px",
                        }}
                      >
                        {field.CGST}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          paddingRight: "5px",
                        }}
                      >
                        {field.SGST}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          paddingRight: "5px",
                        }}
                      >
                        ----
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          paddingRight: "5px",
                        }}
                      >
                        {field.GrandTotalAssessed}
                      </td>
                    </tr>
                  </>
                </>
              )
            );
          })}

          <tr>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            ></td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Grand Total
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            >
              {addCommasToNumber(
                calculateGSTWholeSectionVauesWithGST2(allInfo)
              )}
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            >
              {addCommasToNumber(
                (calculateGSTWholeSectionGST2(allInfo) / 2).toFixed(2)
              )}
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            >
              {addCommasToNumber(
                (calculateGSTWholeSectionGST2(allInfo) / 2).toFixed(2)
              )}
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            >
              ---
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            >
              {addCommasToNumber(
                Math.round(
                  calculateGSTWholeSectionVauesWithGST2(allInfo) +
                    calculateGSTWholeSectionGST2(allInfo)
                )
              )}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            ></td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            ></td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
                fontWeight: "bold",
              }}
            >
              Total Tax
            </td>
            <td
              colSpan={3}
              style={{
                border: "1px solid black",
                paddingRight: "5px",
                textAlign: "center",
              }}
            >
              {addCommasToNumber(
                roundOff(calculateGSTWholeSectionGST2(allInfo))
              )}
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            ></td>
          </tr>
        </table>
      </div>
      <div className="mt-2 mb-5">
        <h5 className="text-dark" style={{ color: "black" }}>
          GST Summary Tax Wise (labour)
        </h5>
        <table style={{ width: "100%" }}>
          <tr>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Sr.No.
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Service Acc. Code
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              GST %
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Actual Allowed
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              C GST
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              S GST
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              I GST
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Total
            </th>
          </tr>
          {getGSTSummaryLabourDetails(allInfo).map((parts, index) => {
            return true ? (
              <>
                <tr>
                  <td
                    style={{
                      border: "1px solid black",
                      paddingRight: "5px",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      border: "1px solid black",
                      paddingRight: "5px",
                    }}
                  >
                    {parts.GSTPercentage} %
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      paddingRight: "5px",
                    }}
                  >
                    {parts.TotalAssessed}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      paddingRight: "5px",
                    }}
                  >
                    {parts.CGST}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      paddingRight: "5px",
                    }}
                  >
                    {parts.SGST}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      paddingRight: "5px",
                    }}
                  >
                    {"  "}---
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      paddingRight: "5px",
                    }}
                  >
                    {parts.GrandTotalAssessed}
                  </td>
                </tr>
              </>
            ) : null;
          })}

          <tr>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            ></td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                paddingRight: "5px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Grand Total
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            >
              {addCommasToNumber(Math.round(getTotalLabourAssessed2(allInfo)))}
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            >
              {addCommasToNumber(getTotalLabourAssessedGST2(allInfo) / 2)}
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            >
              {addCommasToNumber(getTotalLabourAssessedGST2(allInfo) / 2)}
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            >
              {"  "}---
            </td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            >
              {addCommasToNumber(
                Math.round(
                  getTotalLabourAssessedGST2(allInfo) +
                    getTotalLabourAssessed2(allInfo)
                )
              )}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            ></td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            ></td>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
                fontWeight: "bold",
              }}
            >
              Total Tax
            </td>
            <td
              colSpan={3}
              style={{
                border: "1px solid black",
                paddingRight: "5px",
                textAlign: "center",
              }}
            >
              {addCommasToNumber(roundOff(getTotalLabourAssessedGST2(allInfo)))}
            </td>

            <td
              style={{
                border: "1px solid black",
                paddingRight: "5px",
              }}
            ></td>
          </tr>
        </table>
      </div>
      <div>
        <span>
          Based on details provided above, the liability under the subject
          policy of insurance works out to{" "}
          <b>
            ₹{" "}
            {addCommasToNumber(
              Math.round(getSummaryTotalWithLessSalvage(allInfo,lessExcess,lessSalvage) + totalValue)
            )}{" "}
            {/* {addCommasToNumber(
              Math.round(
                getSummaryTotalWithLessSalvage(
                  allInfo,
                  lessExcess,
                  lessSalvage
                ) 
              )
            )}{" "} */}
            <br /> (
            {numberToWords
              .toWords(Math.ceil(getSummaryTotalWithLessSalvage(allInfo,lessExcess,lessSalvage)) + totalValue)
              .toUpperCase()}
            {/* {numberToWords
              .toWords(
                Math.round(
                  getSummaryTotalWithLessSalvage(
                    allInfo,
                    lessExcess,
                    lessSalvage
                  )
                ) 
              )
              .toUpperCase()} */}
            ){" "}
          </b>{" "}
          The assessment of loss, as detailed above, is subject to the terms and
          conditions of the policy of insurance.
        </span>
      </div>
      <div>
        <h5 className="text-dark" style={{ color: "black" }}>
          Notes :
        </h5>
        <ul>
          <div>
            {splitText.map((part, index) => (
              <li key={index}>{part.replace(/\n/g, "")}</li>
            ))}
          </div>
        </ul>

        <span className="text-dark">
          Thanking you and assuring you of my best services at all times,
        </span>
        <br />
        <br />
        <div
          className="d-flex justify-content-between"
          style={{ marginBottom: "" }}
        >
          <div>
            <span>
              Enclosures :{" "}
              {allInfo?.summaryReport[0]?.Endurance !== "undefined"
                ? allInfo?.summaryReport[0]?.Endurance
                : "--"}
            </span>
          </div>
          <div className="text-end">
            <Image
              width={261}
              height={89}
              priority
              className="w50"
              src="/assets/images/stamp.jpg"
              alt="1.jpg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTSummary;
