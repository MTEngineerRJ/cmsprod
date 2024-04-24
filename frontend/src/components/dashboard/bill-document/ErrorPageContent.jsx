import Link from "next/link";
import Form from "./Form";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const ErrorPageContent = ({ feeReport , allOffices }) => {
  const pdfRef = useRef();

  console.log(feeReport);

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
  
  const [selectedServicingOffice, setSelectedServicingOffice] = useState([]);
  

  useEffect(()=>{
    const name =
          String(feeReport?.feeDetails?.BillTo) === "Insurer"
            ? feeReport?.claimDetails?.PolicyIssuingOffice
            : feeReport?.claimDetails?.ClaimServicingOffice;

        let requiredOffice = {};
        
        allOffices.map((office, index) => {
          const stateCodeString = String((office.OfficeName)).toLowerCase()
          const nameString = String(name).toLowerCase().split(" - ")[0]
          
          if (stateCodeString.includes(nameString)) {
          
            requiredOffice = office;
          }
        });

        
        setSelectedServicingOffice(requiredOffice);
  },[allOffices,feeReport])

  const roundOff = (value) => {
    const roundedValue = parseFloat(value).toFixed();
    return roundedValue;
  };
  function numberToWords(number) {
    const units = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const teens = [
      "",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const tens = [
      "",
      "ten",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    const convertLessThanThousand = (num) => {
      if (num === 0) {
        return "";
      }

      let result = "";

      if (num >= 100) {
        result += units[Math.floor(num / 100)] + " hundred ";
        num %= 100;
      }

      if (num >= 11 && num <= 19) {
        result += teens[num - 11];
      } else {
        result += tens[Math.floor(num / 10)];
        num %= 10;

        if (num > 0) {
          result += " " + units[num];
        }
      }

      return result;
    };

    const convert = (num) => {
      if (num === 0) {
        return "zero";
      }

      let result = "";

      if (num >= 1e9) {
        result += convertLessThanThousand(Math.floor(num / 1e9)) + " billion ";
        num %= 1e9;
      }

      if (num >= 1e6) {
        result += convertLessThanThousand(Math.floor(num / 1e6)) + " million ";
        num %= 1e6;
      }

      if (num >= 1e3) {
        result += convertLessThanThousand(Math.floor(num / 1e3)) + " thousand ";
        num %= 1e3;
      }

      result += convertLessThanThousand(num);

      return result.trim();
    };

    const roundOff = (num) => Math.round(num * 100) / 100;

    const roundedNumber = roundOff(number);

    const wholePart = Math.floor(roundedNumber);
    const decimalPart = Math.round((roundedNumber - wholePart) * 100);

    const wordsWholePart = convert(wholePart);
    const wordsDecimalPart = convert(decimalPart);

    const string =
      wordsWholePart + " Rupees and " + wordsDecimalPart + " paisa";
    return string.toUpperCase();
  }

  const calculateTheTotalBillWithoutGST = () => {
    const propfessionalCharges = Number(
      feeReport?.feeDetails?.ProfessionalFees
    );
    const photoCharges =
      Number(feeReport?.feeDetails?.Photos) *
      Number(feeReport?.feeDetails?.PhotsRate);
    const conveyanceCharges = Number(feeReport?.feeDetails?.Conveyance);

    return propfessionalCharges + photoCharges + conveyanceCharges;
  };

  const calculateCGST = () => {
    const total = calculateTheTotalBillWithoutGST();

    const CGST = (Number(feeReport?.feeDetails?.Cgst) * Number(total)) / 100;

    return CGST;
  };


  const [Assessed,setAssessed]=useState(0);
  const [Estimate,setEstimate]=useState(0)

    
  function addCommasToNumber(number) {
    if (Number(number) <= 100 || number === undefined) return number;
    return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }





  const calculateTotalAssessed = () => {
    let total_assessed = 0,total_assessed2 = 0,
      total_estimate = 0,total_estimate2 = 0;
    const allNewParts = feeReport?.newPartsDetails;
    const allLabourer = feeReport?.labourDetails;

    allNewParts?.map((part, index) => {
      //assessed
      const assessed = part.NewPartsIsActive
        ? Number(part.NewPartsAssessed) * Number(part.QA)
        : 0;
      const depreciation = String(feeReport?.claimDetails?.PolicyType) === "Regular" ?
      (Number(assessed) * Number(part.NewPartsDepreciationPct)) / 100 :0;
      
      const assessed_gst = (String(part.NewPartsWithTax ) === '1' || String(part.NewPartsWithTax) === '3' ) ?
        (Number(assessed  - depreciation) * Number(part.NewPartsGSTPct)) / 100 : 0;
      const current_Assessed = (assessed - depreciation) + assessed_gst;
      total_assessed = total_assessed + current_Assessed;

      //estimate
      const current_Estimate = part.NewPartsIsActive
        ? Number(part.NewPartsEstimate) * Number(part.QE)
        : 0;
        const estimate_gst = (String(part.NewPartsWithTax) === "1" || String(part.NewPartsWithTax) === "2") ?
        (Number(current_Estimate) * Number(part.NewPartsGSTPct)) / 100 : 0;
      const current_EstimateValue = (current_Estimate) + estimate_gst;
      
      total_estimate = total_estimate + current_EstimateValue;
    });


    allLabourer?.map((part, index) => {
      //assessed
      const assessed = part.LabourIsActive ? Number(part.Assessed) : 0;
      const depreciation_of_paint =
        String(part.JobType) === "1"  && String(feeReport?.claimDetails?.PolicyType) === "Regular" ? (Number(assessed) * 12.5) / 100 : 0;
      const assessed_gst =
      (part.IsGSTIncluded % 2 !== 0 ) ?
        (Number(assessed-depreciation_of_paint) * Number(part.GSTPercentage)) / 100 : 0;
      const current_Assessed = (assessed - depreciation_of_paint) + assessed_gst;
      total_assessed2 = total_assessed2 + current_Assessed;

      //estimate
      const current_Estimate = part.LabourIsActive ? Number(part.Estimate) : 0;
      const estimate_gst =(part.IsGSTIncluded % 2 !== 0 ) ?
      (Number(current_Estimate) * Number(part.GSTPercentage)) / 100 : 0;
    const current_EstimateValue = (current_Estimate) + estimate_gst;
    
      total_estimate2 = total_estimate2 + current_EstimateValue;
    });


    const LessExcess = Number(feeReport?.SummaryDetails?.LessExcess);
    const lessImposed = Number(feeReport?.SummaryDetails?.LessImposed);
    const expectedSalvage = Number(feeReport?.SummaryDetails?.ExpectedSalvage);

    setAssessed( total_assessed + total_assessed2 - (lessImposed + LessExcess + expectedSalvage));
    setEstimate(total_estimate2 + total_estimate);
  };

  function addCommasToNumber(number) {
    if (Number(number) <= 100 || number === undefined) return number;
    return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(()=>{
    calculateTotalAssessed()
  },[feeReport])

  const calculateSGST = () => {
    const total = calculateTheTotalBillWithoutGST();

    const SGST = (Number(feeReport?.feeDetails?.Sgst) * Number(total)) / 100;

    return SGST;
  };

  const calculateIGST = () => {
    const total = calculateTheTotalBillWithoutGST();

    const SGST = (Number(feeReport?.feeDetails?.Igst) * Number(total)) / 100;

    return SGST;
  };

  const grandTotalWithGST = () => {
    const total = calculateTheTotalBillWithoutGST();
    const cgstValue = calculateCGST();
    const sgstValue = calculateSGST();
    const igstValue = calculateIGST();
    return total + cgstValue + sgstValue + igstValue;
  };

  const downloadPDF = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };
  return (
    <div
      className=""
      ref={pdfRef}
      style={{ fontSize: "12px", fontFamily: "arial" }}
    >
      <div>
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
      {/* Header Content */}

      <div>
        <h4 className="text-center text-decoration-underline">Tax Invoice</h4>
        <div className="">
          <h5>To,</h5>
          <div className="d-flex text-dark gap-5 fw-bold">
            {/* <div className="">
              {feeReport?.feeDetails?.BillTo === "Insured" ? (
                <>
                  <span style={{ marginLeft: "25px" }}>
                    {feeReport?.vehicleOnlineDetails?.RegisteredOwner} (
                    {selectedServicingOffice?.Designation} )
                  </span>
                  <br />
                  <span style={{ marginLeft: "25px" }}>
                    {feeReport?.vehicleOnlineDetails?.PermanentAddress}
                  </span>
                </>
              ) : feeReport?.feeDetails?.BillTo === "Insurer" ? (
                <>
                  <span style={{ marginLeft: "25px" }}>
                    {feeReport?.claimDetails?.InsuranceCompanyNameAddress} ,
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
                  <span style={{ marginLeft: "25px" }}>
                    GSTIN : {selectedServicingOffice?.GST_No}
                  </span>
                  <br />
                  <span style={{ marginLeft: "25px" }}>
                    State Code : {selectedServicingOffice?.StateCode}
                  </span>
                </>
              ) : (
                <>
                  <span style={{ marginLeft: "25px" }}>
                    {feeReport?.claimDetails?.InsuranceCompanyNameAddress} ,
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
                  <span style={{ marginLeft: "25px" }}>
                    GSTIN : {selectedServicingOffice?.GST_No}
                  </span>
                  <br />
                  <span style={{ marginLeft: "25px" }}>
                    State Code : {selectedServicingOffice?.StateCode}
                  </span>
                </>
              )}
            </div> */}
            <div className="container" style={{ marginLeft: "px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td rowSpan={3}>
                    <div className="">
                      {feeReport?.feeDetails?.BillTo === "Insured" ? (
                        <>
                          <span style={{ marginLeft: "25px" }}>
                            {feeReport?.vehicleOnlineDetails?.RegisteredOwner} (
                            {selectedServicingOffice?.Designation} )
                          </span>
                          <br />
                          <span style={{ marginLeft: "25px" }}>
                            {feeReport?.vehicleOnlineDetails?.PermanentAddress}
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
                      ) : (
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
                            {/* <span style={{ marginLeft: "" }}>
                              GSTIN : {selectedServicingOffice?.GST_No}
                            </span> */}
                            {/* <br />
                            <span style={{ marginLeft: "" }}>
                              State Code : {selectedServicingOffice?.StateCode}
                            </span> */}
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
                  <td>
                    <span>Assessed</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>
                      ₹{" "}
                      {addCommasToNumber(
                        roundOff(Number(Assessed))
                      )}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Policy/cover note no</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>{feeReport?.claimDetails?.PolicyNumber}</span>
                  </td>
                  <td>
                    <span>Estimate</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>
                      ₹{" "}
                      {addCommasToNumber(
                        roundOff(Number(Estimate))
                      )}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Claim No</span>
                  </td>
                  <td>:</td>
                  <td>
                    <span> {feeReport?.claimDetails?.ClaimNumber}</span>
                  </td>
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
                  </td>
                </tr>
              </table>
              {/* <div className="d-flex text-dark gap-1">
                <span>Report Ref No</span>
                <span style={{ marginLeft: "43px" }}>:</span>
                <span>{feeReport?.claimDetails?.ReferenceNo}</span>
              </div>
              <div className="d-flex text-dark gap-1">
                <span>Vehicle No</span>
                <span style={{ marginLeft: "70px" }}>:</span>
                <span>{feeReport?.vehicleOnlineDetails?.RegisteredNumber}</span>
              </div>
              <div className="d-flex text-dark gap-1">
                <span>Insured Name </span>
                <span style={{ marginLeft: "45px" }}>:</span>
                <span>{feeReport?.insuredDetails?.InsuredName} </span>
              </div>
              <div className="d-flex text-dark gap-1">
                <span>Date Of Accident</span>
                <span style={{ marginLeft: "21px" }}>:</span>
                <span>
                  {feeReport?.accidentDetails?.DateOfAccident
                    ? formatDate(feeReport?.accidentDetails?.DateOfAccident)
                    : "--"}
                </span>
              </div>
              <div className="d-flex text-dark gap-1">
                <span>Policy/cover note no</span>
                <span>:</span>
                <span>{feeReport?.claimDetails?.PolicyNumber}</span>
              </div>
              <div className="d-flex text-dark gap-1">
                <span>Claim No</span>
                <span style={{ marginLeft: "81px" }}>:</span>
                <span> {feeReport?.claimDetails?.ClaimNumber}</span>
              </div> */}
            </div>
            {/* <div className="mt-5" style={{ marginLeft: "40px" }}>
              <div className="d-flex text-dark gap-3 text-dark">
                <span>Assessed</span>
                <span>:</span>
                <span>
                  ₹{" "}
                  {addCommasToNumber(
                    roundOff(Number(feeReport?.feeDetails?.AssessedAmt))
                  )}
                </span>
              </div>
              <div className="d-flex text-dark gap-3">
                <span>Estimate</span>
                <span style={{ marginLeft: "5px" }}>:</span>
                <span>
                  ₹{" "}
                  {addCommasToNumber(
                    roundOff(Number(feeReport?.feeDetails?.EstimateAmt))
                  )}
                </span>
              </div>
              <div className="d-flex text-dark gap-3">
                <span>IDV</span>
                <span style={{ marginLeft: "42px" }}>:</span>
                <span>
                  ₹{" "}
                  {addCommasToNumber(
                    roundOff(Number(feeReport?.claimDetails?.IDV))
                  )}
                </span>
              </div>
            </div> */}
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
                // paddingRight: "10px",
                // paddingLeft: "20px",
              }}
            >
              S No.
            </th>
            <th
              style={{
                // border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Particulars
            </th>
            <th
              style={{
                textAlign: "center",
                // border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              HSN/SAC
            </th>
            <th
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                textAlign: "center",
                // paddingLeft: "20px",
              }}
            >
              Amount
            </th>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "20px",
                textAlign: "center",
                // paddingLeft: "20px",
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
                    {addCommasToNumber(
                      roundOff(Number(Estimate))
                    )}
                  </span>
                </span>
                <br />
                {/* <span style={{ paddingLeft: "10px" }}>
                  Photos/CD Expenses : <br /> {feeReport?.feeDetails?.Photos}{" "}
                  Photographs , Charged for {feeReport?.feeDetails?.Photos_cd} @
                  ₹. {roundOff(Number(feeReport?.feeDetails?.PhotsRate))}
                </span>
                <br />
                <span style={{ paddingLeft: "10px" }}>
                  Conveyance Expenses :{" "}
            </span>*/}
              </div>
            </td>
            <td
              style={
                {
                  // border: "1px solid black",
                  // paddingRight: "30px",
                  // paddingLeft: "20px",
                }
              }
            >
              <span>
                <h5 className="mt-3">47773</h5>
              </span>
              {/*<br />
              <br />
              <span>
                ₹ {roundOff(Number(feeReport?.feeDetails?.ProfessionalFees))}
              </span>
              <br />
              <span>
                ₹{" "}
                {roundOff(
                  Number(feeReport?.feeDetails?.Photos) *
                    Number(feeReport?.feeDetails?.PhotsRate)
                )}
              </span>
              <br />
              <span>
                ₹ {roundOff(Number(feeReport?.feeDetails?.Conveyance))}
              </span>*/}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              ₹ {addCommasToNumber(roundOff(calculateTheTotalBillWithoutGST()))}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
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
              <br />
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
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <span className="text-underline">
                {" "}
                ₹{" "}
                {addCommasToNumber(roundOff(calculateTheTotalBillWithoutGST()))}
              </span>{" "}
              <br />
              <br />
              <span>₹ {addCommasToNumber(roundOff(calculateCGST()))}</span>
              <br />
              <span>₹ {addCommasToNumber(roundOff(calculateSGST()))}</span>
              <br />
              <span>₹ {addCommasToNumber(roundOff(calculateIGST()))}</span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            ></td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
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
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <span>₹ {addCommasToNumber(roundOff(grandTotalWithGST()))}</span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            ></td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                textAlign: "end",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <span style={{ paddingRight: "30px" }}>Round off : ₹</span>
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <span>₹ {addCommasToNumber(roundOff(grandTotalWithGST()))}</span>
            </td>
          </tr>
          <tr>
            <td
              colSpan={4}
              style={{
                border: "1px solid black",
                textAlign: "center",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <h5 className="text-dark mt-2">
                In words : ₹. {numberToWords(grandTotalWithGST())}
              </h5>
            </td>
          </tr>
          <tr className="container" style={{ border: "1px solid black" }}>
            {/* <td colSpan={2} style={{ padding: "5px" }}>
              {feeReport?.feeDetails?.BillTo !== "Insured" && (
                <span className="text-dark">
                  <span className="fw-bold">GSTIN </span>: 08AAPCM1051K1Z9 State
                  : ({selectedServicingOffice?.StateCode})
                </span>
              )}
              <br />
              <span className="text-dark">
                <span className="fw-bold">PAN </span> : AAPCM1051K
              </span>

              <div className="d-flex gap-3 text-dark">
                <span className="fw-bold">Bank Name</span>
                <span>:</span>
                <span style={{ marginLeft: "10px" }}>HDFC BANK</span>
              </div>
              <div className="d-flex gap-3 text-dark ">
                <span>A/c No.</span>
                <span style={{ marginLeft: "30px" }}>:</span>
                <span>50200064600220</span>
              </div>
              <div className="d-flex gap-3 text-dark">
                <span>IFS Code</span>
                <span style={{ marginLeft: "16px" }}>:</span>
                <span>HDFC0000505</span>
              </div>
            </td> */}
          </tr>
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
              <div>
                {/* <h5 className="" style={{ marginLeft: "63%" }}>
                  For MT ENGINEER{" "}
                </h5>{" "} */}
                {/* <span style={{ color: "black", marginLeft: "50%" }}>
                  Insurance Surveyors & Loss assessors Pvt. Ltd.
                </span> */}
              </div>

              <div className="" style={{}}>
                <div className="text-end">
                  <Image
                    width={201}
                    height={54}
                    priority
                    className="w50"
                    src="/assets/images/stamp.jpg"
                    alt="1.jpg"
                  />
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>

      {/* footer content */}
      {/* <div
            style={{
              border: "1px solid black",
              marginBottom: "5px",
              marginTop: "5px",
            }}
          ></div>
      <div>
        <h5 className="text-center">
          H.O. Address : 58-Gandhi Nagar,Near Bal Niketan School ,Sri
          Ganganagar(Raj.)-335001
        </h5>
        <h5 className="text-center">
          Ofce: B-43,NFL Society,Sector-PI,Gr Noida-201310./E-201,MAPSKO
          Mountville,Sector-79,Gurugram(Hr)
        </h5>
      </div> */}
      {/* footer content */}
    </div>
  );
};

export default ErrorPageContent;
