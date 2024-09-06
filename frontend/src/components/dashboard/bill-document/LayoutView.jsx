import Image from "next/image";

const LayoutView = ({
    feeReport,
    pdfRef,
    selectedServicingOffice,
    formatDate,
    addCommasToNumber,
    roundOff,
    Estimate,
    Assessed,
    calculateTheTotalBillWithoutGST,
    calculateCGST,
    calculateIGST,
    calculateSGST,
    grandTotalWithGST,
    numberToWords,
    selectedAssignedOffice,
    setSelectedAssignedOffice
})=>{
  console.log({feeReport})
    return (<div
      className=""
      ref={pdfRef}
      style={{ fontSize: "12px", fontFamily: "arial" }}
    >
      <div>
{/*         <img
          width={421}
          height={139}
          priority
          className="w50"
          src="/assets/images/header.jpg"
          alt="1.jpg"
        /> */}
      </div>
      <div
        style={{
          border: "1px solid black",
          marginBottom: "5px",
          marginTop: "5px",
        }}
      ></div>

      <div>
        <h4 className="text-center text-decoration-underline">Tax Invoice</h4>
        <div className="">
          <h5>To,</h5>
          <div className="d-flex text-dark gap-5 fw-bold">
            <div className="container" style={{ marginLeft: "px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td rowSpan={3}>
                    <div className="">
                      {feeReport?.feeDetails?.BillTo === "Insured" ? (
                        <>
                          <span style={{ marginLeft: "25px" }}>
                            {feeReport?.vehicleDetails?.RegisteredOwner} (
                            {selectedServicingOffice?.Designation} )
                          </span>
                          <br />
                          <span style={{ marginLeft: "25px" }}>
                            {feeReport?.vehicleDetails?.PermanentAddress}
                          </span>
                        </>
                      ) : feeReport?.feeDetails?.BillTo === "Insurer" ? (
                        <>
                          <span style={{ marginLeft: "25px" }}>
                            {
                              feeReport?.claimDetails
                                ?.InsuranceCompanyNameAddress
                            }{" "}
                            ,
                          </span>
                          <br />
                          <span style={{ marginLeft: "25px" }}>
                            {selectedServicingOffice?.OfficeNameWithCode}
                          </span>
                          <br />
                          <span style={{ marginLeft: "25px" }}>
                            {selectedServicingOffice?.State}
                          </span>
                          <br />
                          <div
                            className="d-flex gap-5"
                            style={{ marginLeft: "25px" }}
                          >
                            <span style={{ marginLeft: "" }}>
                              GSTIN : {selectedServicingOffice?.GST_No}
                            </span>
                            <br />
                            <span style={{ marginLeft: "" }}>
                              State Code : {selectedServicingOffice?.StateCode}
                            </span>
                          </div>
                        </>
                      ) 
                      : feeReport?.feeDetails?.BillTo === "Assigned Office" ? (
                        <>
                          <span style={{ marginLeft: "25px" }}>
                            {
                             selectedAssignedOffice?.OfficeAddress
                            }
                            ,
                          </span>
                          <br />
                          <span style={{ marginLeft: "25px" }}>
                            {`${ selectedAssignedOffice?.OfficeName ? selectedAssignedOffice?.OfficeName : '-'} ${selectedAssignedOffice?.OfficeCode ? selectedAssignedOffice?.OfficeCode : '-'}`}
                          </span>
                          <br />
                          <span style={{ marginLeft: "25px" }}>
                            {selectedAssignedOffice?.State}
                          </span>
                          <br />
                          <div
                            className="d-flex gap-5"
                            style={{ marginLeft: "25px" }}
                          >
                            <span style={{ marginLeft: "" }}>
                              GSTIN : {selectedAssignedOffice?.GST_No}
                            </span>
                            <br />
                            <span style={{ marginLeft: "" }}>
                              State Code : {selectedAssignedOffice?.StateCode}
                            </span>
                          </div>
                        </>
                      ):
                      
                      (
                        <>
                          <span style={{ marginLeft: "25px" }}>
                            {
                              feeReport?.claimDetails
                                ?.InsuranceCompanyNameAddress
                            }{" "}
                            ,
                          </span>
                          <br />
                          <span style={{ marginLeft: "25px" }}>
                            {selectedServicingOffice?.OfficeNameWithCode}
                          </span>
                          <br />
                          <span style={{ marginLeft: "25px" }}>
                            {selectedServicingOffice?.State}
                          </span>
                          <br />
                          <div
                            className="container"
                            style={{ marginLeft: "10px" }}
                          >
                            <table style={{ width: "45%" }}>
                              <tr>
                                <td>
                                  <span>GSTIN</span>
                                </td>
                                <td>:</td>
                                <td>
                                  <span>
                                    {" "}
                                    {selectedServicingOffice?.GST_No}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span>State Code</span>
                                </td>
                                <td>:</td>
                                <td>
                                  <span>
                                    {" "}
                                    {selectedServicingOffice?.StateCode}
                                  </span>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td style={{ marginBottom: "-10px" }}>
                    <span>Bill No.</span>
                  </td>
                  <td style={{ width: "5%" }}>:</td>
                  <td style={{ width: "" }}>
                    <span> {feeReport?.feeDetails?.BillSno}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Date</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>
                      {feeReport?.feeDetails?.BillDate
                        ? formatDate(new Date(feeReport?.feeDetails?.BillDate))
                        : "-"}
                    </span>{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Code</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>2300012369</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div
            className="d-flex text-dark fw-bold mb-1"
            style={{ marginLeft: "25px" }}
          >
            <div className="container">
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ width: "20%" }}>
                    <span>Report Ref No</span>
                  </td>
                  <td style={{ width: "2%" }}>:</td>
                  <td style={{ width: "20%" }}>
                    <span>{feeReport?.claimDetails?.ReferenceNo}</span>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <span>Vehicle No</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>
                      {feeReport?.vehicleDetails?.RegisteredNumber}
                    </span>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <span>Insured Name </span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>{feeReport?.insuredDetails?.InsuredName} </span>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <span>Date Of Accident</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>
                      {feeReport?.accidentDetails?.DateOfAccident
                        ? formatDate(feeReport?.accidentDetails?.DateOfAccident)
                        : "--"}
                    </span>
                  </td>
                  {!String(feeReport?.claimDetails?.InspectionType).toLowerCase().includes("spot") && 
                  <td><td>
                    <span>Assessed</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>
                      ₹ {addCommasToNumber(roundOff(Number(Assessed)))}
                    </span>
                  </td> </td>}
                </tr>
                <tr>
                  <td>
                    <span>Policy/cover note no</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>{feeReport?.claimDetails?.PolicyNumber}</span>
                  </td>
                  {!String(feeReport?.claimDetails?.InspectionType).toLowerCase().includes("spot") && 
                  <td><td>
                    <span>Estimate</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>
                      ₹ {addCommasToNumber(roundOff(Number(Estimate)))}
                    </span>
                  </td></td> }
                </tr>
                <tr>
                  <td>
                    <span>Claim No</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span> {feeReport?.claimDetails?.ClaimNumber}</span>
                  </td>
                  {!String(feeReport?.claimDetails?.InspectionType).toLowerCase().includes("spot") && 
                  <td>
                  <td style={{ width: "10%" }}>
                    <span>IDV</span>
                  </td>
                  <td style={{ width: "2%" }}>:</td>
                  <td style={{ width: "20%" }}>
                    <span>
                      ₹{" "}
                      {addCommasToNumber(
                        roundOff(Number(feeReport?.claimDetails?.IDV))
                      )}
                    </span>
                  </td></td>}
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>
        <table style={{ width: "100%", fontWeight: "bold", color: "black" }}>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                border: "1px solid black",
                textAlign: "center",
                width: "5%",
              }}
            >
              S No.
            </th>
            <th
              style={{
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Particulars
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              HSN/SAC
            </th>
            <th
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              Amount
            </th>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              1
            </td>
            <td>
              <div>
                <h5 className="text-decoration-underline m-2">
                  {feeReport?.feeDetails?.Type}
                </h5>
                <span style={{ paddingLeft: "10px" }}>
                  Professional Fee :{" "}
                  <span style={{ marginLeft: "40px", fontWeight: "lighter" }}>
                    {" "}
                    Estimate Amount ₹{" "}
                    {addCommasToNumber(roundOff(Number(Estimate)))}
                  </span>
                </span>
                <br />
              </div>
            </td>
            <td>
              <span>
                <h5 className="mt-3">47773</h5>
              </span>
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              ₹{" "}
              {addCommasToNumber(
                roundOff(calculateTheTotalBillWithoutGST(feeReport))
              )}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
              }}
            ></td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                textAlign: "end",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              {" "}
              <span>Sub Total : ₹</span>
              <br />
              <br />
              <span>
                C GST @{" "}
                {addCommasToNumber(
                  roundOff(Number(feeReport?.feeDetails?.Cgst))
                )}{" "}
                %
              </span>
              <br />
              <span>
                S GST @{" "}
                {addCommasToNumber(
                  roundOff(Number(feeReport?.feeDetails?.Sgst))
                )}{" "}
                %{" "}
              </span>
              <br/>
              <span>
                I GST @{" "}
                {addCommasToNumber(
                  roundOff(Number(feeReport?.feeDetails?.Igst))
                )}{" "}
                %
              </span>
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              <span className="text-underline">
                {" "}
                ₹{" "}
                {addCommasToNumber(
                  roundOff(calculateTheTotalBillWithoutGST(feeReport))
                )}
              </span>{" "}
              <br />
              <br />
              <span>
                ₹ {addCommasToNumber(roundOff(calculateCGST(feeReport)))}
              </span>
              <br />
              <span>
                ₹ {addCommasToNumber(roundOff(calculateSGST(feeReport)))}
              </span>
              <br />
              <span>
                ₹ {addCommasToNumber(roundOff(calculateIGST(feeReport)))}
              </span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
              }}
            ></td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
              }}
            >
              <div className="d-flex text-dark justify-content-between">
                <span style={{ paddingLeft: "10px" }}>ADVANCE RECEIPT</span>
                <span style={{ paddingRight: "30px" }}>Grand Total : </span>
              </div>
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              <span>
                ₹ {addCommasToNumber(roundOff(grandTotalWithGST(feeReport)))}
              </span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
              }}
            ></td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                textAlign: "end",
              }}
            >
              <span style={{ paddingRight: "30px" }}>Round off : ₹</span>
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              <span>
                ₹ {addCommasToNumber(roundOff(grandTotalWithGST(feeReport)))}
              </span>
            </td>
          </tr>
          <tr>
            <td
              colSpan={4}
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              <h5 className="text-dark mt-2">
                In words : ₹. {numberToWords(grandTotalWithGST(feeReport))}
              </h5>
            </td>
          </tr>
          <tr className="container" style={{ border: "1px solid black" }}></tr>
        </table>
        {feeReport?.feeDetails?.BillTo !== "Insured" && (
          <table
            style={{ width: "100%", border: "1px solid black", color: "black" }}
          >
            <tr>
              <td style={{ width: "20%", paddingLeft: "5px" }}>
                <span className="fw-bold">GSTIN</span>
              </td>
              <td style={{ width: "3%" }}>:</td>
              <td style={{ width: "30%" }}>
                <span> 08AAPCM1051K1Z9</span>
              </td>
              <td>
                <span className="fw-bold">State</span>
                <span style={{ marginLeft: "10px" }}>:</span>
                <span style={{ marginLeft: "10px" }}>
                  ({selectedServicingOffice?.StateCode})
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ width: "10%", paddingLeft: "5px" }}>
                <span className="fw-bold">PAN</span>
              </td>
              <td>:</td>
              <td>
                <span>AAPCM1051K</span>
              </td>
            </tr>
            <tr>
              <td style={{ width: "10%", paddingLeft: "5px" }}>
                <span className="fw-bold">Bank Name</span>
              </td>
              <td>:</td>
              <td>
                <span style={{ marginLeft: "10px" }}>HDFC BANK</span>
              </td>
            </tr>
            <tr>
              <td style={{ width: "10%", paddingLeft: "5px" }}>
                <span>A/c No.</span>
              </td>
              <td>:</td>
              <td>
                <span>50200064600220</span>
              </td>
            </tr>
            <tr>
              <td style={{ width: "10%", paddingLeft: "5px" }}>
                <span>IFS Code</span>s
              </td>
              <td>:</td>
              <td>
                <span>HDFC0000505</span>
              </td>
            </tr>
          </table>
        )}
        <table style={{ width: "100%", border: "1px solid black" }}>
          <tr style={{ border: "1px solid black" }}>
            <td></td>
            <td colSpan={2} className="">
              <div></div>

              <div className="" style={{}}>
                <div className="text-end">
{/*                   <Image
                    width={201}
                    height={54}
                    priority
                    className="w50"
                    src="/assets/images/stamp.jpg"
                    alt="1.jpg"
                  /> */}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>)
}

export default LayoutView;
