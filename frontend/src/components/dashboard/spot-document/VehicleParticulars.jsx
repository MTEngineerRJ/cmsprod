import React from "react";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

const VehicleParticulars = ({ allInfo }) => {
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

    var dateComponents = birthDate?.split("/");
    var birthDay = parseInt(dateComponents[0]);
    var birthMonth = parseInt(dateComponents[1]);
    var birthYear = parseInt(dateComponents[2]);

    var currentDate = new Date();

    var yearsDiff = currentDate.getFullYear() - birthYear;
    var monthsDiff = currentDate.getMonth() - (birthMonth - 1);

    if (
      monthsDiff < 0 ||
      (monthsDiff === 0 && currentDate.getDate() < birthDay)
    ) {
      yearsDiff--;
      monthsDiff += 12;
    }

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

  const changeFormat = (dateString) => {
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
        <h6 className="text-dark" style={{ color: "black" }}>
          4. VEHICLE PARTICULARS :
        </h6>
        <span style={{ marginLeft: "110px" }}>
          {allInfo?.otherInfo[0]?.Remark}
        </span>
      </div>
      <table style={{ width: "100%" }}>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>(a) Registered Number</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start">
            <span className="fw-bold text-dark">
              {" "}
              {allInfo?.otherInfo[0]?.RegisteredNumber}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="">
            <span> (b) Registered Owner</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start">
            <span> {allInfo?.otherInfo[0]?.RegisteredOwner}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>(c) Date of Registration</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start">
            <span>
              {" "}
              {formatDate(allInfo?.otherInfo[0]?.DateOfRegistration)}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>(d) Chassis Number </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start">
            <span className="fw-bold text-dark">
              {" "}
              {allInfo?.otherInfo[0]?.ChassisNumber}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>(e) Engine Number </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start">
            <span className="fw-bold text-dark">
              {" "}
              {allInfo?.otherInfo[0]?.EngineNumber}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>(f) Make / Variant/ Model /Color </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start ">
            <span className="">
              {" "}
              {allInfo?.otherInfo[0]?.MakerDesc},
              {allInfo?.otherInfo[0]?.MakerModel}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>(g) Type of Body and Class of vehicle</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start">
            <span>
              {" "}
              {allInfo?.otherInfo[0]?.VehicleBancsBodyType} (S) -{" "}
              {allInfo?.otherInfo[0]?.ClassOfVehicle}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>(h) Pre Accident Condition</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start">
            <span> {allInfo?.otherInfo[0]?.PreAccidentCondition}</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="">
            <span> (k) Seating Capacity</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start">
            <span> {allInfo?.otherInfo[0]?.SeatingCapacity} Nos.</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>(l) Cubic Capacity </span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start">
            <span>{allInfo?.otherInfo[0]?.CubicCapacity} CC</span>
            <span style={{ marginLeft: "60px" }}>
              Fuel Used : {allInfo?.otherInfo[0]?.FuelType}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>(m) Tax particulars</span>
          </td>
          <td style={{ width: "5%" }} className="text-start">
            <span>:</span>
          </td>
          <td style={{ width: "45%" }} className="text-start">
            <span> {formatDate(allInfo?.otherInfo[0]?.TaxParticulars)}</span>
          </td>
        </tr>
        {allInfo?.otherInfo[0]?.commercial_status ? (
          <tr>
            <td style={{ width: "36%" }} className="text-start">
              <span>(n) Fitness Certificate Number </span>
            </td>
            <td style={{ width: "7%" }} className="text-start">
              <span>:</span>
            </td>
            <td style={{ width: "55%" }} className="text-start">
              <span className="fw-bold text-dark">
                {allInfo?.otherInfo[0]?.FitnessCertificate}{" "}
              </span>
            </td>
          </tr>
        ) : (
          ""
        )}
        {allInfo?.otherInfo[0]?.commercial_status ? (
          <tr>
            <td style={{ width: "36%" }} className="text-start">
              <span style={{ marginLeft: "20px" }}>Valid Upto </span>
            </td>
            <td style={{ width: "7%" }} className="text-start">
              <span>:</span>
            </td>
            <td style={{ width: "55%" }} className="text-start">
              <span>
                {" "}
                {allInfo?.otherInfo[0]?.FitnessTo
                  ? changeFormat(allInfo?.otherInfo[0]?.FitnessTo)
                  : "-"}
              </span>
            </td>
          </tr>
        ) : (
          ""
        )}

        {allInfo?.otherInfo[0]?.commercial_status ? (
          <tr>
            <td style={{ width: "36%" }} className="text-start">
              <span>(o) Permit Number </span>
            </td>
            <td style={{ width: "7%" }} className="text-start">
              <span>:</span>
            </td>
            <td style={{ width: "55%" }} className="text-start">
              <span> {allInfo?.otherInfo[0]?.PermitNo}</span>
            </td>
          </tr>
        ) : (
          ""
        )}

        {allInfo?.otherInfo[0]?.commercial_status ? (
          <tr>
            <td style={{ width: "36%" }} className="text-start">
              <span style={{ marginLeft: "20px" }}>Valid Upto </span>
            </td>
            <td style={{ width: "7%" }} className="text-start">
              <span>:</span>
            </td>
            <td style={{ width: "55%" }} className="text-start">
              <span>
                {" "}
                {allInfo?.otherInfo[0]?.PermitTo
                  ? changeFormat(allInfo?.otherInfo[0]?.PermitTo)
                  : "-"}
              </span>

              <span>{"        "}</span>

              <span>&nbsp;&nbsp;&nbsp;w.e.f&nbsp;&nbsp;&nbsp;</span>

              <span>{"         "}</span>

              <span>
                {" "}
                {allInfo?.otherInfo[0]?.PermitFrom
                  ? changeFormat(allInfo?.otherInfo[0]?.PermitFrom)
                  : "-"}
              </span>
            </td>
          </tr>
        ) : (
          ""
        )}

        {allInfo?.otherInfo[0]?.commercial_status ? (
          <tr>
            <td style={{ width: "36%" }} className="text-start">
              <span>(p) Type Of Permit </span>
            </td>
            <td style={{ width: "7%" }} className="text-start">
              <span>:</span>
            </td>
            <td style={{ width: "55%" }} className="text-start">
              <span className="fw-bold text-dark">
                {allInfo?.otherInfo[0]?.TypeOfPermit}{" "}
              </span>
            </td>
          </tr>
        ) : (
          ""
        )}

        {allInfo?.otherInfo[0]?.commercial_status ? (
          <tr>
            <td style={{ width: "36%" }} className="text-start">
              <span>(q) Authorization / validity </span>
            </td>
            <td style={{ width: "7%" }} className="text-start">
              <span>:</span>
            </td>
            <td style={{ width: "55%" }} className="text-start">
              <span>{allInfo?.otherInfo[0]?.Authorization}</span>
            </td>
          </tr>
        ) : (
          ""
        )}
        {allInfo?.otherInfo[0]?.commercial_status ? (
          <tr>
            <td style={{ width: "36%" }} className="text-start">
              <span> (r) Route / Areas of Operation</span>
            </td>
            <td style={{ width: "7%" }} className="text-start">
              <span>:</span>
            </td>
            <td style={{ width: "55%" }} className="text-start">
              <span> {allInfo?.otherInfo[0]?.AreasOfOperation}</span>
            </td>
          </tr>
        ) : (
          ""
        )}
        {allInfo?.otherInfo[0]?.commercial_status ? (
          <tr>
            <td style={{ width: "36%" }} className="text-start">
              <span> (t) Commercial Remark</span>
            </td>
            <td style={{ width: "7%" }} className="text-start">
              <span>:</span>
            </td>
            <td style={{ width: "55%" }} className="text-start">
              <span> {allInfo?.otherInfo[0]?.Remark}</span>
            </td>
          </tr>
        ) : (
          ""
        )}
      </table>
    </div>
  );
};

export default VehicleParticulars;
