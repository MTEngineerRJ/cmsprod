const getTotalGlassAssessed = (allInfo) => {
  let total = 0;
  allInfo?.newPartsDetails.map((part, index) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);

    if (
      String(part.NewPartsTypeOfMaterial) === "Glass" &&
      part.NewPartsIsActive && part.IsImt === 0
    ) {
      total = total + assessed;
    }
  });
  return total;
};

const getTotalMetalAssessed = (allInfo) => {
  let total = 0;
  allInfo?.newPartsDetails.map((part, index) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
    const Depreciation =
      (assessed * Number(part.NewPartsDepreciationPct)) / 100;
    if (
      String(part.NewPartsTypeOfMaterial) === "Metal" &&
      part.NewPartsIsActive && part.IsImt === 0
    ) {
      total = total + assessed;
    }
  });
  return total;
};

function addCommasToNumber(number) {
  if (Number(number) <= 100 || number === undefined) return number;
  return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getTotalOtherMetalAssesses = (allInfo) => {
  let total = 0;
  allInfo?.newPartsDetails.map((part, index) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);

    if (
      String(part.NewPartsTypeOfMaterial) !== "Glass" &&
      String(part.NewPartsTypeOfMaterial) !== "Metal" &&
      part.NewPartsIsActive && part.IsImt === 0
    ) {
      total = total + assessed;
    }
  });
  return total;
};

const getTotalDepreciation = (allInfo, type, other) => {
  let total = 0;
  allInfo?.newPartsDetails?.map((part, index) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
    const Depreciation =
      (assessed * Number(part.NewPartsDepreciationPct)) / 100;

    if (
      String(part.NewPartsTypeOfMaterial) === String(type) &&
      String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" &&
      part.NewPartsIsActive && part.IsImt === 0
    ) {
      total = total + Depreciation;
    }
  });
  return total;
};

const getTotalNonMetaDepreciation = (allInfo) => {
  let total = 0;
  allInfo?.newPartsDetails?.map((part, index) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
    const Depreciation =
      (assessed * Number(part.NewPartsDepreciationPct)) / 100;
    if (
      String(part.NewPartsTypeOfMaterial) !== "Glass" &&
      String(part.NewPartsTypeOfMaterial) !== "Metal" &&
      String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" &&
      part.NewPartsIsActive && part.IsImt === 0
    ) {
      total = total + Depreciation;
    }
  });
  return total;
};

const calculateTypeNewPartsGST = (allInfo, type) => {
  let total = 0;
  allInfo?.newPartsDetails?.map((part, index) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);

    const Depreciation =
      String(allInfo?.otherInfo[0]?.PolicyType) === "Regular"
        ? (assessed * Number(part.NewPartsDepreciationPct)) / 100
        : 0;

    const gst = ((assessed - Depreciation) * Number(part.NewPartsGSTPct)) / 100;

    if (
      String(part.NewPartsTypeOfMaterial) === String(type) &&
      part.NewPartsIsActive && part.IsImt === 0
    ) {
      total = total + gst;
    }
  });
  return total;
};

const calculateOtherTypeNewPartsGST = (allInfo) => {
  let total = 0;
  allInfo?.newPartsDetails?.map((part, index) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);

    const Depreciation =
      String(allInfo?.otherInfo[0]?.PolicyType) === "Regular"
        ? (assessed * Number(part.NewPartsDepreciationPct)) / 100
        : 0;

    const gst = ((assessed - Depreciation) * Number(part.NewPartsGSTPct)) / 100;

    if (
      String(part.NewPartsTypeOfMaterial) !== "Glass" &&
      String(part.NewPartsTypeOfMaterial) !== "Metal" &&
      part.NewPartsIsActive && part.IsImt === 0
    ) {
      total = total + gst;
    }
  });
  return total;
};

const getTotalEvaluationOfAssessedForNewParts = (allInfo) => {
  const glassValue =
    calculateTypeNewPartsGST(allInfo, "Glass") +
    getTotalGlassAssessed(allInfo) -
    getTotalDepreciation(allInfo, "Glass", false);
  const metalValue =
    calculateTypeNewPartsGST(allInfo, "Metal") +
    getTotalMetalAssessed(allInfo) -
    getTotalDepreciation(allInfo, "Metal", false);
  const nonMetalValue =
    calculateOtherTypeNewPartsGST(allInfo) +
    getTotalOtherMetalAssesses(allInfo) -
    getTotalNonMetaDepreciation(allInfo);

  return glassValue + metalValue + nonMetalValue;
};

const getTotalLabourEstimate = (allInfo) => {
  let total = 0;
  allInfo?.labourDetails?.map((part, index) => {
    const estimate = Number(part.Estimate);

    if (part.LabourIsActive && part.IsImt === 0) {
      total = total + estimate;
    }
  });
  return total;
};

const getTotalLabourAssessed = (allInfo) => {
  let total = 0;
  allInfo?.labourDetails?.map((part, index) => {
    const dep =
      String(part.JobType) === "1" &&
      String(allInfo?.otherInfo[0]?.PolicyType) === "Regular"
        ? Number(Number(part.Assessed) * Number(12.5)) / 100
        : 0;
    const assessed = Number(part.Assessed) - dep;

    const assessedvalue = assessed * Number(part.GSTPercentage);
    const gst = Number(assessedvalue) / 100;
    if (part.LabourIsActive && part.IsImt === 0) {
      total = total + (assessed + gst);
    }
  });
  return total;
};

const getTotalLabourAssessedGSTValuess = (allInfo) => {
  let total = 0;
  allInfo?.labourDetails?.map((part, index) => {
    const dep =
      String(part.JobType) === "1" &&
      String(allInfo?.otherInfo[0]?.PolicyType) === "Regular"
        ? Number(Number(part.Assessed) * Number(12.5)) / 100
        : 0;
    const assessed = Number(part.Assessed) - dep;

    const assessedvalue = assessed * Number(part.GSTPercentage);
    const gst =Number(part.IsGSTIncluded) %2 === 1 ? Number(assessedvalue) / 100 : 0;
    if (part.LabourIsActive && part.IsImt === 0) {
      total = total + +gst;
    }
  });
  return total;
};

const calculateLabourDepreciations = (allInfo) => {
  let totalDep = 0;
  allInfo?.labourDetails?.map((labour, index) => {
    if (String(labour.JobType) === "1" && labour.LabourIsActive && labour.IsImt === 0) {
      const dep = Number(Number(labour.Assessed) * 12.5) / 100;
      totalDep = Number(totalDep) + Number(dep);
    }
  });
  return String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" ? totalDep : 0;
};

const getSummaryTotalWithLessExcess = (allInfo, lessExcess) => {
  return (
    getTotalLabourAssessedSum(allInfo) -
    calculateLabourDepreciations(allInfo) +
    getTotalLabourAssessedGSTValuess(allInfo) +
    getTotalEvaluationOfAssessedForNewParts(allInfo) -
    lessExcess
  );
};

const getSummaryTotalWithLessSalvage = (allInfo, lessExcess, lessSalvage) => {
  return (
    getTotalLabourAssessedSum(allInfo) -
    calculateLabourDepreciations(allInfo) +
    getTotalLabourAssessedGSTValuess(allInfo) +
    getTotalEvaluationOfAssessedForNewParts(allInfo) -
    lessExcess -
    lessSalvage
  );
};

//calculate New Parts overall calculation with all type gst values
const getOverallTotalEstimateNewParts = (allInfo) => {
  let total = 0;
  allInfo?.newPartsDetails.map((labour, index) => {
    const estimatedValue = Number(labour.NewPartsEstimate) * Number(labour.QE);
    const gst =
      String(labour.NewPartsWithTax) === "1" ||
      String(labour.NewPartsWithTax) === "2" 
        ? (estimatedValue * Number(labour.NewPartsGSTPct)) / 100
        : 0;
    total = total + (Number(labour.IsImt) === 0 ? (estimatedValue + gst) : 0);
  });
  return total;
};

const calculateEstimateNewPartsGST2 = (allInfo, type) => {
  let total = 0;

  allInfo?.newPartsDetails?.map((part, index) => {
    const assessed = Number(part.NewPartsEstimate) * Number(part.QE);
    const gst = (assessed * Number(part.NewPartsGSTPct)) / 100;

    total = total + (part.NewPartsIsActive && part.IsImt === 0) ? gst : 0;
  });

  return total;
};

const roundOff = (number) => {
  return Math.round(number * 100) / 100;
};

const getTotalLabourAssessedSum = (allInfo) => {
  let total = 0;
  allInfo?.labourDetails?.map((part, index) => {
    const dep =
      String(part.JobType) === "1"
        ? Number(Number(part.Assessed) * Number(12.5)) / 100
        : 0;
    const assessed = Number(part.Assessed);

    const assessedvalue = assessed * Number(part.GSTPercentage);
    const gst = Number(assessedvalue) / 100;
    if (part.LabourIsActive && part.IsImt === 0) {
      total = total + assessed;
    }
  });
  return total;
};

module.exports = {
  getTotalGlassAssessed,
  getTotalMetalAssessed,
  addCommasToNumber,
  getTotalOtherMetalAssesses,
  getTotalDepreciation,
  getTotalNonMetaDepreciation,
  calculateTypeNewPartsGST,
  calculateOtherTypeNewPartsGST,
  getTotalEvaluationOfAssessedForNewParts,
  getTotalLabourEstimate,
  getTotalLabourAssessed,
  getTotalLabourAssessedGSTValuess,
  calculateLabourDepreciations,
  getSummaryTotalWithLessExcess,
  getSummaryTotalWithLessSalvage,
  getOverallTotalEstimateNewParts,
  calculateEstimateNewPartsGST2,
  roundOff,
  getTotalLabourAssessedSum,
};
