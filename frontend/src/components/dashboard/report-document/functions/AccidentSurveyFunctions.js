const getTotalGlassAssessed = (allInfo) => {
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

const getTotalMetalAssessed = (allInfo) => {
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
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const formattedHour = (hour % 12 || 12).toString().padStart(2, "0"); // Convert to 12-hour format
    const period = hour < 12 ? "AM" : "PM";
    const readableTime = `${formattedHour}:${minutes} ${period}`; // Example: 09:49 AM
    return readableTime;
  } catch (error) {
    return "Invalid time format. Please provide time in HH:MM format.";
  }
}

const getTotalOtherMetalAssesses = (allInfo) => {
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

const getTotalDepreciation = (allInfo, type, other) => {
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

const getTotalNonMetaDepreciation = (allInfo) => {
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

const calculateTypeNewPartsGST = (allInfo, type) => {
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

const calculateOtherTypeNewPartsGST = (allInfo) => {
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

const getTotalLabourAssessed = (allInfo) => {
  let total = 0;
  allInfo?.labourDetails?.map((part, index) => {
    const assessed = Number(part.Assessed);

    if (part.LabourIsActive) {
      total = total + assessed;
    }
  });
  return total;
};

const getTotalLabourAssessedGST = (allInfo) => {
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

const formatDate = (dateString) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const dateParts = new Date(dateString)
    .toLocaleDateString("en-GB", options)
    .split("/");
  const formattedDate = dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2];
  return formattedDate;
};

function reverseDate(date) {
  if (!date || typeof date !== 'string' || !date.includes('-')) {
    return 'Invalid date format';
  }

  const parts = date.split('-');
  if (parts.length !== 3) {
    return 'Invalid date format';
  }

  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

module.exports = {
  getTotalGlassAssessed,
  getTotalMetalAssessed,
  convertToReadable,
  getTotalOtherMetalAssesses,
  getTotalDepreciation,
  getTotalNonMetaDepreciation,
  calculateTypeNewPartsGST,
  calculateOtherTypeNewPartsGST,
  getTotalEvaluationOfAssessedForNewParts,
  getTotalLabourAssessed,
  getTotalLabourAssessedGST,
  formatDate,
  reverseDate
};
