import React from "react";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

const InsuranceParticulars = ({ allInfo }) => {
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    const pdf = new jsPDF("p", "mm", "a4", true);

    const generatePage = (pageNumber) => {
      return new Promise((resolve) => {
        html2canvas(input, {
          useCORS: true,
          scale: 2,
          logging: true,
          allowTaint: true,
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
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

          if (pageNumber < totalPages) {
            pdf.addPage(); // Add a new page for the next iteration
            resolve();
          } else {
            resolve(); // Resolve when all pages are generated
          }
        });
      });
    };

    const totalPages = 3;

    let currentPage = 1;

    const generateAllPages = () => {
      if (currentPage <= totalPages) {
        generatePage(currentPage).then(() => {
          currentPage++;
          generateAllPages(); // Recursively generate the next page
        });
      } else {
        pdf.save("invoice.pdf");
      }
    };

    generateAllPages();
  };

  //   const input = pdfRef.current;

  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4", true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //     const imgY = 30;

  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       imgX,
  //       imgY,
  //       imgWidth * ratio,
  //       imgHeight * ratio
  //     );
  //     pdf.save("invoice.pdf");
  //   });
  // };

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

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  //*******************functions******************************//

  const calculateGlassDept = (part) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
    const Depreciation =
      (assessed * Number(part.NewPartsDepreciationPct)) / 100;
    if (
      String(part.NewPartsTypeOfMaterial === "Glass") &&
      part.NewPartsIsActive
    ) {
      return assessed;
    }
    return 0;
  };

  const calculateMetalDept = (part) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
    const Depreciation =
      (assessed * Number(part.NewPartsDepreciationPct)) / 100;
    if (
      String(part.NewPartsTypeOfMaterial === "Metal") &&
      part.NewPartsIsActive
    ) {
      return assessed;
    }
    return 0;
  };

  const calculateNonMetalDept = (part) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
    const Depreciation =
      (assessed * Number(part.NewPartsDepreciationPct)) / 100;
    if (
      String(
        part.NewPartsTypeOfMaterial !== "Glass" &&
          String(
            part.NewPartsTypeOfMaterial !== "Metal" && part.NewPartsIsActive
          )
      )
    ) {
      return assessed;
    }
    return 0;
  };

  const getTotalEstimate = () => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsEstimate) * Number(part.QE);
      total = total + part.NewPartsIsActive ? assessed : 0;
    });
    return total;
  };

  const getTotalGlassAssessed = () => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);

      if (
        String(part.NewPartsTypeOfMaterial) === "Glass" &&
        part.NewPartsIsActive
      ) {
        total = total + assessed;
      }
    });
    return total;
  };

  const getTotalMetalAssessed = () => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;
      if (
        String(part.NewPartsTypeOfMaterial) === "Metal" &&
        part.NewPartsIsActive
      ) {
        total = total + assessed;
      }
    });
    return total;
  };

  function convertToReadable(timeStr) {
    try {
      // Split the time string into hours and minutes
      const [hours, minutes] = timeStr.split(":");

      // Convert hours and minutes to numbers
      const hour = parseInt(hours, 10);
      const minute = parseInt(minutes, 10);

      // Format the time in readable format
      const formattedHour = (hour % 12 || 12).toString().padStart(2, "0"); // Convert to 12-hour format
      const period = hour < 12 ? "AM" : "PM";
      const readableTime = `${formattedHour}:${minutes} ${period}`; // Example: 09:49 AM
      return readableTime;
    } catch (error) {
      return "Invalid time format. Please provide time in HH:MM format.";
    }
  }

  function addCommasToNumber(number) {
    if (Number(number) <= 100 || number === undefined) return number;
    return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function convertToBulletPointsAndParseHTML(text) {
    // Convert HTML tags to plain text
    const plainText = text.replace(/<[^>]*>?/gm, "");

    // Split the text into sentences
    const sentences = plainText
      .split(/\d+\./)
      .filter((sentence) => sentence.trim() !== "");

    // Convert sentences into bullet points
    const bulletPoints = sentences.map(
      (sentence) => `<li>${sentence.trim()}</li>`
    );

    // Join bullet points into an unordered list
    const bulletList = `<ul>${bulletPoints.join("")}</ul>`;

    return bulletList;
  }

  const getTotalOtherMetalAssesses = () => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);

      if (
        String(part.NewPartsTypeOfMaterial) !== "Glass" &&
        String(part.NewPartsTypeOfMaterial) !== "Metal" &&
        part.NewPartsIsActive
      ) {
        total = total + assessed;
      }
    });
    return total;
  };

  const getTotalDepreciation = (type, other) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) === String(type) &&
        part.NewPartsIsActive
      ) {
        total = total + Depreciation;
      }
    });
    return total;
  };

  const getTotalNonMetaDepreciation = () => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;
      if (
        String(part.NewPartsTypeOfMaterial) !== "Glass" &&
        String(part.NewPartsTypeOfMaterial) !== "Metal" &&
        part.NewPartsIsActive
      ) {
        total = total + Depreciation;
      }
    });
    return total;
  };

  const calculateTypeNewPartsGST = (type) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const gst = (assessed * Number(part.NewPartsGSTPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) === String(type) &&
        part.NewPartsIsActive
      ) {
        total = total + gst;
      }
    });
    return total;
  };

  const calculateOtherTypeNewPartsGST = () => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const gst = (assessed * Number(part.NewPartsGSTPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) !== "Glass" &&
        String(part.NewPartsTypeOfMaterial) !== "Metal" &&
        part.NewPartsIsActive
      ) {
        total = total + gst;
      }
    });
    return total;
  };

  const calculateEstimateNewPartsGST = (type) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsEstimate) * Number(part.QE);
      const gst = (assessed * Number(part.NewPartsGSTPct)) / 100;

      total = total + part.NewPartsIsActive ? gst : 0;
    });
    return total;
  };

  const getTotalEvaluationOfAssessedForNewParts = () => {
    const glassValue =
      calculateTypeNewPartsGST("Glass") +
      getTotalGlassAssessed() -
      getTotalDepreciation("Glass", false);
    const metalValue =
      calculateTypeNewPartsGST("Metal") +
      getTotalMetalAssessed() -
      getTotalDepreciation("Metal", false);
    const nonMetalValue =
      calculateOtherTypeNewPartsGST() +
      getTotalOtherMetalAssesses() -
      getTotalNonMetaDepreciation();

    return glassValue + metalValue + nonMetalValue;
  };

  ///******************Labour *********************888*/

  const getTotalLabourEstimate = () => {
    let total = 0;
    allInfo?.labourDetails?.map((part, index) => {
      const estimate = Number(part.Estimate);

      if (part.LabourIsActive) {
        total = total + estimate;
      }
    });
    return total;
  };

  const getTotalLabourAssessed = () => {
    let total = 0;
    allInfo?.labourDetails?.map((part, index) => {
      const assessed = Number(part.Assessed);

      if (part.LabourIsActive) {
        total = total + assessed;
      }
    });
    return total;
  };

  const getTotalLabourEstimateGST = () => {
    let total = 0;
    allInfo?.labourDetails?.map((part, index) => {
      const estimate = Number(part.Estimate);

      const gst = (estimate * Number(part.GSTPercentage)) / 100;
      if (part.LabourIsActive) {
        total = total + gst;
      }
    });
    return total;
  };

  const getTotalLabourAssessedGST = () => {
    let total = 0;
    allInfo?.labourDetails?.map((part, index) => {
      const assessed = Number(part.Assessed);

      const gst = (assessed * Number(part.GSTPercentage)) / 100;
      if (part.LabourIsActive) {
        total = total + gst;
      }
    });
    return total;
  };

  //*************SUMMARY**************** *//

  const lessExcess = Number(allInfo?.summaryReport[0]?.LessExcess) || 0;
  const lessSalvage = Number(allInfo?.summaryReport[0]?.ExpectedSalvage) || 0;

  const getSummaryTotalWithLessExcess = () => {
    return (
      getTotalLabourAssessed() +
      getTotalLabourAssessedGST() +
      getTotalEvaluationOfAssessedForNewParts() +
      lessExcess
    );
  };

  function convertToProperHTML(htmlString) {
    // Create a new DOMParser
    const parser = new DOMParser();

    // Parse the HTML string
    const doc = parser.parseFromString(htmlString, "text/html");

    // Extract the text content from the parsed document
    const plainText = doc.body.textContent || "";

    return plainText;
  }

  const getSummaryTotalWithLessSalvage = () => {
    return (
      getTotalLabourAssessed() +
      getTotalLabourAssessedGST() +
      getTotalEvaluationOfAssessedForNewParts() +
      lessExcess +
      lessSalvage
    );
  };

  //********Value********* */

  const newPartsGST = () => {
    let gst = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      gst = part.NewPartsGSTPct;
    });
    return gst;
  };

  const labourGST = () => {
    let gst = 0;
    allInfo?.labourDetails.map((part, index) => {
      gst = part.GSTPercentage;
    });
    return gst;
  };

  const roundOff = (number) => {
    return Math.round(number * 100) / 100;
  };

  function calculateAge() {
    const birthDate = allInfo?.otherInfo[0]?.DateOfBirth;
    if (!birthDate) {
      return "Invalid date";
    }

    // Split the birthDate string into day, month, and year components
    var dateComponents = birthDate?.split("/");
    var birthDay = parseInt(dateComponents[0]);
    var birthMonth = parseInt(dateComponents[1]);
    var birthYear = parseInt(dateComponents[2]);

    // Get the current date
    var currentDate = new Date();

    // Calculate the difference in years and months
    var yearsDiff = currentDate.getFullYear() - birthYear;
    var monthsDiff = currentDate.getMonth() - (birthMonth - 1);

    // Adjust years and months if the current month is before the birth month
    if (
      monthsDiff < 0 ||
      (monthsDiff === 0 && currentDate.getDate() < birthDay)
    ) {
      yearsDiff--;
      monthsDiff += 12;
    }

    // Construct the age string
    var ageString = yearsDiff + " years ";
    if (monthsDiff > 0) {
      ageString += monthsDiff + " months";
    }
    return ageString;
  }

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

    const roundedNumber = roundOff(number);

    const wholePart = Math.floor(roundedNumber);
    const decimalPart = Math.round((roundedNumber - wholePart) * 100);

    const wordsWholePart = convert(wholePart);
    const wordsDecimalPart = convert(decimalPart);

    return wordsWholePart + " Rupees and " + wordsDecimalPart + " paisa";
  }

  //*************************** */

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
            <span> {String(allInfo?.otherInfo[0]?.InsuranceCompanyNameAddress).toUpperCase()}</span>
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
              {allInfo?.driverOnlineDetails?.FatherName
                ? String(allInfo?.driverOnlineDetails?.Gender) === "Female"
                  ? ` D/o ${allInfo?.driverOnlineDetails?.FatherName}`
                  : ` S/o ${allInfo?.driverOnlineDetails?.FatherName}`
                : "-"}
              ,{" "}
              {allInfo?.driverOnlineDetails?.Mobile === null
                ? allInfo?.driverOnlineDetails?.Mobile
                : allInfo?.otherInfo[0]?.InsuredMobileNo1}{" "}
              <br />
              {/* {allInfo?.vehicleOnlineDetails?.PermanentAddress} */}
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
      {/* <div className="text-start d-flex text-dark">
        <div className="d-flex gap-5">
          <label htmlFor="">(a) Policy / Cover Note No. </label>
          <span> : </span>
          <span className="fw-bold text-dark">
            {allInfo?.otherInfo[0]?.PolicyNumber}
          </span>
        </div>
        <div className="d-flex gap-4" style={{ marginLeft: "82px" }}>
          <div>
            <label htmlFor="">IDV</label>
          </div>
          <div>
            <span>:</span>
          </div>
          <span> ₹ {addCommasToNumber(allInfo?.otherInfo[0]?.IDV)}</span>
        </div>
      </div>
      <div className="d-flex gap-5">
        <div className="d-flex gap-4">
          <label htmlFor="">(b) Period of Insurance</label>
          <span style={{ marginLeft: "42px" }}> : </span>
          <span>
            {formatDate(allInfo?.otherInfo[0]?.PolicyPeriodStart)} to{" "}
            {formatDate(allInfo?.otherInfo[0]?.PolicyPeriodEnd)}
          </span>
        </div>
        <div className="d-flex gap-4" style={{ marginLeft: "20px" }}>
          <label htmlFor="">Claim No. </label>
          <span>:</span>
          <span> {allInfo?.otherInfo[0]?.ClaimNumber} </span>
        </div>
      </div>
      <div className="d-flex gap-5">
        <div className="d-flex gap-4">
          <label htmlFor="">(c) Endorsement </label>
          <span style={{ marginLeft: "74px" }}>:</span>
          <span> --</span>
        </div>
      </div>
      <div className="text-start d-flex gap-5">
        <div className="d-flex gap-4">
          <label htmlFor="">(d) Insurers </label>
          <span style={{ marginLeft: "101px" }}>:</span>
          <span> {allInfo?.otherInfo[0]?.InsuranceCompanyNameAddress}</span>
        </div>
      </div>
      <div className="text-start d-flex gap-5">
        <div className="d-flex gap-4">
          <label htmlFor="">(e) Insured </label>
          <span style={{ marginLeft: "105px" }}>:</span>
          <span>
            {" "}
            {allInfo?.otherInfo[0]?.InsuredName}
            {allInfo?.driverOnlineDetails?.FatherName
              ? String(allInfo?.driverOnlineDetails?.Gender) === "Female"
                ? ` D/o ${allInfo?.driverOnlineDetails?.FatherName}`
                : `S/o ${allInfo?.driverOnlineDetails?.FatherName}`
              : "-"}
            ,{" "}
            {allInfo?.driverOnlineDetails?.Mobile === null
              ? allInfo?.driverOnlineDetails?.Mobile
              : allInfo?.otherInfo[0]?.InsuredMobileNo1}{" "}
            <br />
            {allInfo?.vehicleOnlineDetails?.PermanentAddress}
          </span>
        </div>
      </div>
      <div className="text-start d-flex gap-5">
        <div className="d-flex gap-4">
          <label htmlFor="">(f) H.P.A. </label>
          <span style={{ marginLeft: "112px" }}>:</span>
          <span>
            {" "}
            {allInfo?.otherInfo[0]?.HPA ? allInfo?.otherInfo[0]?.HPA : "-"}{" "}
          </span>
        </div>
      </div>
      <div className="text-start d-flex gap-5">
        <div className="d-flex gap-4">
          <label htmlFor="">(g) Appointed By </label>
          <span style={{ marginLeft: "69px" }}>:</span>
          <span> {allInfo?.otherInfo[0]?.ClaimServicingOffice}</span>
        </div>
      </div> */}
    </div>
  );
};

export default InsuranceParticulars;
