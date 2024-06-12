import React, { useEffect } from "react";
import { useRef, useState } from "react";
import {
  formatDate,
  calculateGlassDept,
  calculateMetalDepreciationWithoutValue,
  calculateMetalDept,
  calculateNonMetalDept,
  getOverallTotalEstimate,
  getOverallTotalEstimateGST,
  getOverallTotalEstimateNewParts,
  getTotalGlassAssessed,
  getTotalGlassAssessedWithGSTType,
  getTotalMetalAssessed,
  getTotalMetalAssessedWithGST,
  addCommasToNumber,
  getTotalOtherMetalAssesses,
  getTotalOtherMetalAssessesWithGST,
  getTotalDepreciation,
  getTotalDepreciationValueOnly,
  getTotalNonMetaDepreciation,
  getTotalNonMetaDepreciationValueOnly,
  calculateTypeNewPartsGST,
  calculateTypeNewPartsGSTType,
  calculateOtherTypeNewPartsGSTVijay,
  calculateOtherTypeNewPartsGSTType,
  roundOff,
  sortFunction,
} from "./functions/LossDamageDetailsFunctions";

const LossDamagesDetails = ({ allInfo }) => {
  const [allGSTType, setAllGSTType] = useState([]);

  useEffect(() => {
    let array = [];
    const newParts = allInfo?.newPartsDetails;
    newParts?.map((part, index) => {
      let indexValue = -1;
      array?.map((temp, idx) => {
        if (String(temp.field) === String(part.NewPartsGSTPct)) {
          indexValue = idx;
        }
      });

      if (indexValue === -1 && Number(part.IsImt) === 0) {
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

  return (
    <div>
      <div>
        <h5 className="text-dark">PARTICULARS OF LOSS/DAMAGES :</h5>
        <span className="">
          In accordance with the instructions received from{" "}
          <b>
            {allInfo?.otherInfo[0]?.InsuranceCompanyNameAddress}{" "}
            {allInfo?.otherInfo[0]?.ClaimServicingOffice}
          </b>{" "}
          dated <b>{formatDate(allInfo?.otherInfo[0]?.AddedDateTime)}</b> I
          visited <b>{allInfo?.otherInfo[0]?.GarageNameAndAddress}</b> and
          inspected the subject vehicle, reported to have met with an accident
          on <b>{formatDate(allInfo?.otherInfo[0]?.AddedDateTime)}</b> Between{" "}
          {allInfo?.otherInfo[0]?.PlaceOfLoss} and snapped the vehicle from
          different angles before and after dismantling. <br />
          <br />
          <span className="">
            Loss was discussed with the repairer and finally settled as under
            subject to policy terms, conditions and approval of the Insurers
            keeping in view the cause & nature of accident and my physical
            inspection before and after dismantling.{" "}
          </span>
        </span>
      </div>
      <hr />
      <div className="">
        <span>
          <b>Observation : </b> Subject with good condition overall. No other
          damages except as mentioned above were observed over vehicle. Police
          report of accident not carried out by Insured.
        </span>
      </div>
      <br />
      <div className="">
        <h5 className="text-dark">NEW PARTS :</h5>
        <table border={1} style={{ width: "100%" }}>
          <tr>
            <th
              rowSpan={2}
              style={{ border: "1px solid black", padding: "10px" }}
            >
              E. No.
            </th>
            <th
              rowSpan={2}
              style={{ border: "1px solid black", padding: "10px" }}
            >
              Parts Description
            </th>
            <th
              rowSpan={2}
              style={{ border: "1px solid black", padding: "10px" }}
            >
              HSN Code
            </th>
            <th
              rowSpan={2}
              style={{ border: "1px solid black", padding: "10px" }}
            >
              Bill S. No
            </th>
            <th
              rowSpan={2}
              style={{ border: "1px solid black", padding: "10px" }}
            >
              Remark
            </th>
            <th
              rowSpan={2}
              style={{ border: "1px solid black", padding: "10px" }}
            >
              Estimated
            </th>
            <th
              colSpan={3}
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Assessed
            </th>
            <th
              rowSpan={2}
              style={{ border: "1px solid black", padding: "10px" }}
            >
              GST
            </th>
          </tr>
          <tr>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Glass/ 2nd Hand/ Repair
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Metal ({calculateMetalDepreciationWithoutValue(allInfo)}%)
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Non Metal
            </th>
          </tr>
          {allGSTType?.map((field, index) => {
            return (
              <>
                <tr>
                  <th colSpan={2}>Parts with {field.field} % GST</th>
                  <th
                    style={{ border: "1px solid black", padding: "10px" }}
                  ></th>
                  <th
                    style={{ border: "1px solid black", padding: "10px" }}
                  ></th>
                  <th
                    style={{ border: "1px solid black", padding: "10px" }}
                  ></th>
                  <th
                    style={{ border: "1px solid black", padding: "10px" }}
                  ></th>
                  <th
                    style={{ border: "1px solid black", padding: "10px" }}
                  ></th>
                  <th
                    style={{ border: "1px solid black", padding: "10px" }}
                  ></th>
                  <th
                    style={{ border: "1px solid black", padding: "10px" }}
                  ></th>
                </tr>

                {sortFunction(allInfo?.newPartsDetails, field.field).map(
                  (part, index) => {
                    return part.NewPartsIsActive === 1 &&
                      String(part.NewPartsGSTPct) === String(field.field) ? (
                      <tr key={index}>
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        >
                          {part.pos}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        >
                          {part.NewPartsItemName}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        ></td>
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        >
                          {part.NewPartsBillSr}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        >
                          {part.NewPartsRemark}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        >
                          {roundOff(part.NewPartsEstimate)}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        >
                          {String(part.NewPartsTypeOfMaterial) === "Glass"
                            ? roundOff(calculateGlassDept(part))
                            : 0}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        >
                          {String(part.NewPartsTypeOfMaterial) === "Metal"
                            ? roundOff(calculateMetalDept(part))
                            : 0}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        >
                          {String(part.NewPartsTypeOfMaterial) !== "Metal" &&
                          String(part.NewPartsTypeOfMaterial) !== "Glass"
                            ? roundOff(calculateNonMetalDept(part))
                            : 0}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        >
                          {" "}
                          {roundOff(part.NewPartsGSTPct)}.00
                        </td>
                      </tr>
                    ) : null;
                  }
                )}
                <tr>
                  <td
                    colSpan={6}
                    style={{ border: "none", padding: "5px" }}
                    className="text-end"
                  >
                    <span className="mt-0 fw-bold">Sub Total : </span>
                    <br />
                  </td>
                  <td style={{ border: "1px solid black", padding: "5px" }}>
                    {addCommasToNumber(
                      roundOff(
                        getTotalGlassAssessedWithGSTType(allInfo, field.field)
                      )
                    )}
                  </td>
                  <td style={{ border: "1px solid black", padding: "5px" }}>
                    {addCommasToNumber(
                      roundOff(
                        getTotalMetalAssessedWithGST(allInfo, field.field)
                      )
                    )}
                  </td>
                  <td style={{ border: "1px solid black", padding: "5px" }}>
                    {addCommasToNumber(
                      roundOff(
                        getTotalOtherMetalAssessesWithGST(allInfo, field.field)
                      )
                    )}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={6}
                    style={{ border: "none", padding: "5px" }}
                    className="text-end"
                  >
                    <span className="mt-0 fw-bold">
                      Gst @ {field.field} % :{" "}
                    </span>
                    <br />
                  </td>

                  <td style={{ border: "1px solid black", padding: "5px" }}>
                    {addCommasToNumber(
                      roundOff(
                        calculateTypeNewPartsGSTType(
                          allInfo,
                          "Glass",
                          field.field,
                          false
                        )
                      )
                    )}
                  </td>
                  <td style={{ border: "1px solid black", padding: "5px" }}>
                    {addCommasToNumber(
                      roundOff(
                        calculateTypeNewPartsGSTType(
                          allInfo,
                          "Metal",
                          field.field,
                          false
                        )
                      )
                    )}
                  </td>
                  <td style={{ border: "1px solid black", padding: "5px" }}>
                    {addCommasToNumber(
                      roundOff(
                        calculateOtherTypeNewPartsGSTType(
                          allInfo,
                          field.field,
                          false
                        )
                      )
                    )}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={6}
                    // rowSpan={6}
                    style={{ borderBottom: "1px solid black", padding: "5px" }}
                    className="text-end"
                  >
                    <span className="mt-0 fw-bold"> Total : </span>
                    <br />
                  </td>

                  <td style={{ border: "1px solid black", padding: "5px" }}>
                    {addCommasToNumber(
                      roundOff(
                        calculateTypeNewPartsGSTType(
                          allInfo,
                          "Glass",
                          field.field,
                          false
                        ) +
                          getTotalGlassAssessedWithGSTType(allInfo, field.field)
                      )
                    )}
                  </td>
                  <td style={{ border: "1px solid black", padding: "5px" }}>
                    {addCommasToNumber(
                      roundOff(
                        calculateTypeNewPartsGSTType(
                          allInfo,
                          "Metal",
                          field.field
                        ) + getTotalMetalAssessedWithGST(allInfo, field.field)
                      )
                    )}
                  </td>
                  <td style={{ border: "1px solid black", padding: "5px" }}>
                    {addCommasToNumber(
                      roundOff(
                        calculateOtherTypeNewPartsGSTType(
                          allInfo,
                          field.field
                        ) +
                          getTotalOtherMetalAssessesWithGST(
                            allInfo,
                            field.field
                          )
                      )
                    )}
                  </td>
                </tr>
              </>
            );
          })}

          <tr>
            <td
              colSpan={5}
              style={{ borderTop: "1px solid black", padding: "5px" }}
              className="text-end"
            >
              <span className="mt-0 fw-bold">Total : </span>
              <br />
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(roundOff(getOverallTotalEstimate(allInfo)))}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(roundOff(getTotalGlassAssessed(allInfo)))}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(roundOff(getTotalMetalAssessed(allInfo)))}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(roundOff(getTotalOtherMetalAssesses(allInfo)))}
            </td>
            <td
              rowSpan={5}
              style={{ border: "1px solid black", padding: "5px" }}
            ></td>
          </tr>
          <tr>
            <td
              colSpan={5}
              style={{ border: "none", padding: "5px" }}
              className="text-end"
            >
              <span className="mt-0 fw-bold">Less: Depreciation : </span>
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>----</td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {String(allInfo?.otherInfo[0]?.PolicyType) === "Regular"
                ? addCommasToNumber(
                    roundOff(
                      getTotalDepreciationValueOnly(allInfo, "Glass", false)
                    )
                  )
                : 0}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {String(allInfo?.otherInfo[0]?.PolicyType) === "Regular"
                ? addCommasToNumber(
                    roundOff(
                      getTotalDepreciationValueOnly(allInfo, "Metal", false)
                    )
                  )
                : 0}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {String(allInfo?.otherInfo[0]?.PolicyType) === "Regular"
                ? addCommasToNumber(
                    roundOff(getTotalNonMetaDepreciationValueOnly(allInfo))
                  )
                : 0}
            </td>
          </tr>
          <tr>
            <td
              colSpan={5}
              style={{ border: "none", padding: "5px" }}
              className="text-end"
            >
              <span className="mt-0 fw-bold">Total : </span>
              <br />
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(roundOff(getOverallTotalEstimate(allInfo, 0)))}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(
                  getTotalGlassAssessed(allInfo) -
                    getTotalDepreciation(allInfo, "Glass", false)
                )
              )}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(
                  getTotalMetalAssessed(allInfo) -
                    getTotalDepreciation(allInfo, "Metal", false)
                )
              )}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(
                  getTotalOtherMetalAssesses(allInfo) -
                    getTotalNonMetaDepreciation(allInfo)
                )
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={5}
              style={{ border: "none", padding: "5px" }}
              className="text-end"
            >
              <span className="mt-0 fw-bold">Add : Applicable GST : </span>
              <br />
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(getOverallTotalEstimateGST(allInfo, 0))
              )}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(calculateTypeNewPartsGST(allInfo, "Glass"))
              )}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(calculateTypeNewPartsGST(allInfo, "Metal"))
              )}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(calculateOtherTypeNewPartsGSTVijay(allInfo))
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={5}
              // rowSpan={6}
              style={{ border: "none", padding: "5px" }}
              className="text-end"
            >
              <span className="mt-0 fw-bold">Net Total F : </span>
              <br />
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(
                  getOverallTotalEstimateNewParts(allGSTType, allInfo, 0) +
                    getOverallTotalEstimateGST(allInfo, 0)
                )
              )}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(
                  calculateTypeNewPartsGST(allInfo, "Glass") +
                    getTotalGlassAssessed(allInfo) -
                    getTotalDepreciation(allInfo, "Glass", false)
                )
              )}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(
                  calculateTypeNewPartsGST(allInfo, "Metal") +
                    getTotalMetalAssessed(allInfo) -
                    getTotalDepreciation(allInfo, "Metal", false)
                )
              )}
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                roundOff(
                  calculateOtherTypeNewPartsGSTVijay(allInfo) +
                    getTotalOtherMetalAssesses(allInfo) -
                    getTotalNonMetaDepreciation(allInfo)
                )
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={5}
              // rowSpan={6}
              style={{ border: "none", padding: "5px" }}
              className="text-end"
            >
              <span className="mt-0 fw-bold">Grand Total F : </span>
              <br />
            </td>
            <td style={{ border: "1px solid black", padding: "5px" }}>
              {addCommasToNumber(
                Math.round(
                  getOverallTotalEstimateNewParts(allGSTType, allInfo, 0) +
                    getOverallTotalEstimateGST(allInfo, 0)
                )
              )}
            </td>
            <td
              colSpan={3}
              style={{
                border: "1px solid black",
                padding: "5px",
                textAlign: "center",
              }}
            >
              {addCommasToNumber(
                Math.round(
                  calculateOtherTypeNewPartsGSTVijay(allInfo) +
                    getTotalOtherMetalAssesses(allInfo) -
                    getTotalNonMetaDepreciation(allInfo) +
                    calculateTypeNewPartsGST(allInfo, "Metal") +
                    getTotalMetalAssessed(allInfo) -
                    getTotalDepreciation(allInfo, "Metal", false) +
                    calculateTypeNewPartsGST(allInfo, "Glass") +
                    getTotalGlassAssessed(allInfo) -
                    getTotalDepreciation(allInfo, "Glass", false)
                )
              )}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default LossDamagesDetails;
