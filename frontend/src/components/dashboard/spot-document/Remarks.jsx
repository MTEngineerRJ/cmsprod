import React, { useEffect } from "react";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { array } from "prop-types";

const Remarks = ({ allInfo }) => {
  const pdfRef = useRef();
  let count = 1;

  const [allGSTType, setAllGSTType] = useState([]);

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

  const calculateMetalDepreciationWithoutValue = () => {
    let depPct = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      if (
        String(part.NewPartsTypeOfMaterial) === "Metal" &&
        part.NewPartsIsActive
      ) {
        depPct = Number(part.NewPartsDepreciationPct);
      }
    });
    return depPct;
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

  const getTotalEstimate = (type) => {
    let total = 0;
    let typeTotalValue = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsEstimate) * Number(part.QE);
      total = total + part.NewPartsIsActive ? assessed : 0;
      typeTotalValue =
        typeTotalValue +
        (part.NewPartsIsActive && String(part.NewPartsGSTPct) === String(type)
          ? assessed
          : 0);
    });

    console.log("type", type, total, typeTotalValue);
    if (!type) {
      return total;
    } else {
      return typeTotalValue;
    }
  };

  //calculate New Parts overall calculation with all type gst values
  const getOverallTotalEstimate = () => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsEstimate) * Number(part.QE);
      total = total + (part.NewPartsIsActive ? assessed : 0);
    });
    return total;
  };

  //calculate New Parts overall calculation with all type gst values
  const getOverallTotalEstimateGST = () => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const estimatedValue = Number(part.NewPartsEstimate) * Number(part.QE);
      const gst =
        String(part.NewPartsWithTax) === "1" ||
        String(part.NewPartsWithTax) === "2"
          ? (estimatedValue * Number(part.NewPartsGSTPct)) / 100
          : 0;
      total = total + gst;
    });
    return total;
  };

  //calculate New Parts overall calculation with all type gst values
  const getOverallTotalEstimateNewParts = () => {
    let total = 0;
    allGSTType.map((gst, index) => {
      total = total + getTotalEstimate(gst.field);
    });
    return total;
  };

  const getTotalGlassAssessed = (type) => {
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

  const getTotalGlassAssessedWithGSTType = (type) => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);

      if (
        String(part.NewPartsTypeOfMaterial) === "Glass" &&
        part.NewPartsIsActive &&
        String(part.NewPartsGSTPct) === String(type)
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

  const getTotalMetalAssessedWithGST = (type) => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;
      if (
        String(part.NewPartsTypeOfMaterial) === "Metal" &&
        part.NewPartsIsActive &&
        String(part.NewPartsGSTPct) === String(type)
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

  const getTotalOtherMetalAssessesWithGST = (type) => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);

      if (
        String(part.NewPartsTypeOfMaterial) !== "Glass" &&
        String(part.NewPartsTypeOfMaterial) !== "Metal" &&
        part.NewPartsIsActive &&
        String(part.NewPartsGSTPct) === String(type)
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
        String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" &&
        part.NewPartsIsActive
      ) {
        total = total + Depreciation;
      }
    });
    return total;
  };

  const getTotalDepreciationValueOnly = (type, other) => {
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

  const getTotalDepreciationWithGSTType = (type, other, gstType) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) === String(type) &&
        part.NewPartsIsActive &&
        String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" &&
        String(part.NewPartsGSTPct) === String(gstType)
      ) {
        total = total + Depreciation;
      }
    });
    return total;
  };

  const getTotalNonMetaDepreciation = (type) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;
      if (
        String(part.NewPartsTypeOfMaterial) !== "Glass" &&
        String(part.NewPartsTypeOfMaterial) !== "Metal" &&
        String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" &&
        part.NewPartsIsActive
      ) {
        total = total + Depreciation;
      }
    });

    return total;
  };

  const getTotalNonMetaDepreciationValueOnly = (type) => {
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

  const getTotalNonMetaDepreciationWithGST = (type) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;
      if (
        String(part.NewPartsTypeOfMaterial) !== "Glass" &&
        String(part.NewPartsTypeOfMaterial) !== "Metal" &&
        String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" &&
        part.NewPartsIsActive &&
        String(part.NewPartsGSTPct) === String(type)
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

      const Depreciation =
        String(allInfo?.otherInfo[0]?.PolicyType) === "Regular"
          ? (assessed * Number(part.NewPartsDepreciationPct)) / 100
          : 0;

      const gst =
        ((assessed - Depreciation) * Number(part.NewPartsGSTPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) === String(type) &&
        part.NewPartsIsActive
      ) {
        total = total + gst;
      }
    });
    return total;
  };

  const calculateTypeNewPartsGSTType = (type, gstType, deductDep) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        String(allInfo?.otherInfo[0]?.PolicyType) === "Regular"
          ? (assessed * Number(part.NewPartsDepreciationPct)) / 100
          : 0;

      const finalAssessedValue = deductDep ? assessed - Depreciation : assessed;
      const gst = (finalAssessedValue * Number(part.NewPartsGSTPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) === String(type) &&
        part.NewPartsIsActive &&
        String(part.NewPartsGSTPct) === String(gstType)
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


  return (
    <div>
      <div>
        <h6 className="text-dark">11. REMARKS :</h6>
        <span className="">
          In accordance with the instructions received from United India
          Insurance Co. Ltd. SVC DRO1 dated 08-03-2024 I visited SPOT and
          inspected the subject vehicle, reported to have met with an accident
          on 05-03-2024 Near Nogma, Shahjahanpur and snapped the vehicle from
          different angles.
        </span>
        <br />
        <span>
          <span className="fw-bold text-dark text-decoration-underline">
            Observation{" "}
          </span>
          : Subject Vehicle with good condition overall.No other damages except
          as mentioned above were observed over vehicle.
        </span>
        <br />
        <br />
        <span className="fw-bold text-dark">
          {`Remarks : 1. As per written statement Tp vehicle (${allInfo?.otherInfo[0]?.EngineNumber} , ${String(allInfo?.otherInfo[0]?.MakerDesc).split(" ")[0]})
          was involved in this accident.`}
        </span><br />
        <span className="fw-bold text-dark">
          2. Subject Vehicle with good condition overall.No other damages except
          as mentioned above were observed over vehicle.
        </span>
      </div>
      <div
        style={{
          border: "1px solid black",
          marginBottom: "5px",
          marginTop: "5px",
        }}
      ></div>
    </div>
  );
};

export default Remarks;
