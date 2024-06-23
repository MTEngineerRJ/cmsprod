import { Value } from "sass";
import { getTotalLoss } from "../getEditorContent/totalLoss";
import { calculateDepreciationsPercenatge } from "../functions";

//--------------------REPAIR BASIS--------------------------------------
export const getTotalLossTotalCostOfNewParts = (allNewParts, claim) => {
  let total = 0;
  allNewParts?.map((part, index) => {
    const assessedValue = Number(part.assessed) * Number(part.qa);
    const dep =
      String(claim?.claimDetails?.PolicyType) === "Regular"
        ? (Number(assessedValue) * Number(part.dep)) / 100
        : 0;
    const evaluatedAssessed = assessedValue - dep;
    const gst = (Number(evaluatedAssessed) * Number(part.gst)) / 100;
    total = Number(total) + part.isActive ? assessedValue + gst : 0;
  });
  return total;
};

export const getTotalLossTotalCostOfLabour = (allLabour, currentGst) => {
  let total = 0;
  allLabour?.map((labour, index) => {
    const assessedValue = Number(labour.assessed);
    const dep = Number(labour.type) ? (Number(assessedValue) * 12.5) / 100 : 0;
    const evaluatedAssessed = assessedValue - dep;
    const gst = (Number(evaluatedAssessed) * Number(currentGst)) / 100;
    total = Number(total) + labour.isActive ? assessedValue + gst : 0;
  });
  return total;
};

export const subTotalOfNewpartsAndLabour = (
  allLabour,
  currentGst,
  allNewParts,
  claim
) => {
  return (
    getTotalLossTotalCostOfNewParts(allNewParts, claim) +
    getTotalLossTotalCostOfLabour(allLabour, currentGst)
  );
};

const getStringFromObject = (array) => {
  let finalArray = [];
  const result = Object.entries(array).map(([key, value]) => {
    const temp = `
    <span> ${value.depPct} % depreciation on ${key} parts worth Rupees ${value.overAllValue} = ${value.Value} </span> <br/>`;
    //    <td style={{ width: "40%" }} className="text-end">
    //   <span className="fw-bold text-dark">
    //     {" "}
    //     ${value.Value}
    //   </span>
    // </td>
    if (value?.Value > 0) {
      finalArray.push(temp);
    }
  });
  return finalArray;
};

export const getDepreciationArray = (allNewParts, allDepreciations, claim) => {
  let arrayObject = {};
  allNewParts.map((part, index) => {
    const dep = calculateDepreciationsPercenatge(
      allDepreciations,
      part.type,
      claim.vehicleDetails?.DateOfRegistration
    );

    const assessedValue = Number(part.assessed) * Number(part.qa);
    const depreciationValue = (Number(assessedValue) * Number(dep)) / 100;
    if (arrayObject.hasOwnProperty(part.type)) {
      arrayObject[part.type] += {
        ...arrayObject[part.type],
        overAllValue: arrayObject[part.type].overAllValue + assessedValue,
        Value: arrayObject[part.type].Value + depreciationValue,
      };
    } else {
      arrayObject[part.type] = {
        depPct: dep,
        overAllValue: assessedValue,
        Value: depreciationValue,
      };
    }
  });

  console.log("arrayObject", getStringFromObject(arrayObject));

  return String(claim?.claimDetails?.PolicyType) === "Regular"
    ? getStringFromObject(arrayObject)
    : "";
};

export const getTotalIMTValue = (allNewParts, allLabour, currentGst, claim) => {
  let NewPartstotal = 0;
  allNewParts.map((part, index) => {
    const assessedValue = Number(part.assessed) * Number(part.qa);
    const dep =
      String(claim?.claimDetails?.PolicyType) === "Regular"
        ? (Number(assessedValue) * Number(part.dep)) / 100
        : 0;
    const evaluatedAssessed = assessedValue - dep;
    const gst = (Number(evaluatedAssessed) * Number(part.gst)) / 100;
    NewPartstotal =
      Number(NewPartstotal) + part.isActive && labour.imt
        ? assessedValue + gst
        : 0;
  });

  let labourtotal = 0;
  allLabour.map((labour, index) => {
    const assessedValue = Number(labour.assessed);
    const dep = Number(labour.type) ? (Number(assessedValue) * 12.5) / 100 : 0;
    const evaluatedAssessed = assessedValue - dep;
    const gst = (Number(evaluatedAssessed) * Number(currentGst)) / 100;
    labourtotal =
      Number(labourtotal) + labour.isActive && labour.imt
        ? assessedValue + gst
        : 0;
  });

  return NewPartstotal + labourtotal;
};

export const getNetAssessedWithLessExcessDeduction = (
  claim,
  allLabour,
  allNewParts,
  currentGst
) => {
  const newPartTotal = getTotalLossTotalCostOfNewParts(allNewParts, claim);
  const labourTotal = getTotalLossTotalCostOfLabour(allLabour, currentGst);
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);

  return newPartTotal + labourTotal - lessExcess;
};

export const finalNetAssessedAmountWithIMTAndSalvage = (
  claim,
  allLabour,
  allNewParts,
  currentGst
) => {
  const newPartTotal = getTotalLossTotalCostOfNewParts(allNewParts, claim);
  const labourTotal = getTotalLossTotalCostOfLabour(allLabour, currentGst);
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const ExpectedSalvage = Number(claim?.summaryDetails?.ExpectedSalvage);

  const totalIMT = getTotalIMTValue(allNewParts, allLabour, currentGst, claim);

  return newPartTotal + labourTotal + totalIMT - (lessExcess + ExpectedSalvage);
};

//-------------------------TOTAL LOSS BASIS -----------------------------------

export const getTotalLossBasisAssessement = (claim) => {
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const IDV = Number(claim?.claimDetails?.IDV);
  const MissingItems = Number(claim?.totalLoss?.MissingItem);

  return IDV - (lessExcess + MissingItems);
};

//--------------------NET SALVAGE LOSS BASIS WITH RC-------------------------------

export const getTotalSalvageLossBasisAssessementWithRC = (claim) => {
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const IDV = Number(claim?.claimDetails?.IDV);
  const MissingItems = Number(claim?.totalLoss?.MissingItem);
  const wreckValue = Number(claim?.totalLoss?.WreckValueWith);

  return IDV - (lessExcess + MissingItems + wreckValue);
};

//-----------------NET SALVAGE LOSS BASIS WITHOUT RC--------------------------

export const getTotalSalvageLossBasisAssessementWithoutRC = (claim) => {
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const IDV = Number(claim?.claimDetails?.IDV);
  const MissingItems = Number(claim?.totalLoss?.MissingItem);
  const WreckValueWithout = Number(claim?.totalLoss?.WreckValueWithout);

  return IDV - (lessExcess + MissingItems + WreckValueWithout);
};

//---------NET SALVAGE LOSS BASIS WITH RC WITH RTI_AMOUNT--------------------------

export const getTotalSalvageLossBasisAssessementWithRCWithRTI = (claim) => {
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const Rti_Amount = Number(claim?.totalLoss?.RtiAmount);
  const IDV = Number(claim?.claimDetails?.IDV);
  const MissingItems = Number(claim?.totalLoss?.MissingItem);
  const WreckValueWith = Number(claim?.totalLoss?.WreckValueWith);

  return IDV + Rti_Amount - (lessExcess + MissingItems + WreckValueWith);
};

//---------NET SALVAGE LOSS BASIS WITHOUT RC WITH RTI_AMOUNT--------------------------

export const getTotalSalvageLossBasisAssessementWORCWithRTI = (claim) => {
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const Rti_Amount = Number(claim?.totalLoss?.RtiAmount);
  const IDV = Number(claim?.claimDetails?.IDV);
  const MissingItems = Number(claim?.totalLoss?.MissingItem);
  const WreckValueWithout = Number(claim?.totalLoss?.WreckValueWithout);

  return IDV + Rti_Amount - (lessExcess + MissingItems + WreckValueWithout);
};

//---------ASSESSMENT ON CASH LOSS ON REPAIRS BASIS-----------------------

//------------REPLACE Functions-------------------------

export const replaceFunction = (
  tempString,
  allLabour,
  allNewParts,
  currentGst,
  claim,
  allDepreciations
) => {
  let string = getTotalLoss(
    claim,
    allLabour,
    allNewParts,
    currentGst,
    allDepreciations
  );
  console.log("replaceFunction", string);
  string = string?.replace(
    "**getTotalLossTotalCostOfNewParts**",
    getTotalLossTotalCostOfNewParts(allNewParts, claim)
  );

  string = string?.replace(
    "**getTotalLossTotalCostOfLabour**",
    getTotalLossTotalCostOfLabour(allLabour, currentGst)
  );

  string = string?.replace(
    "**subTotalOfNewpartsAndLabour**",
    subTotalOfNewpartsAndLabour(allLabour, currentGst, allNewParts, claim)
  );

  string = string?.replace(
    "**getDepreciationArray**",
    getDepreciationArray(allNewParts, allDepreciations, claim)
  );

  string = string?.replace(
    "$getDepreciationArray$",
    getDepreciationArray(allNewParts, allDepreciations, claim)
  );

  string = string?.replace("**lessExcess**", claim?.summaryDetails?.LessExcess);

  string = string?.replace(
    "**getNetAssessedWithLessExcessDeduction**",
    getNetAssessedWithLessExcessDeduction(
      claim,
      allLabour,
      allNewParts,
      currentGst
    )
  );

  string = string?.replace(
    "$getNetAssessedWithLessExcessDeduction$",
    getNetAssessedWithLessExcessDeduction(
      claim,
      allLabour,
      allNewParts,
      currentGst
    )
  );

  if (claim?.claimDetails?.PolicyType !== "Regular") {
    string = string?.replace("**POLICYTYPE**", "NIL DEPRECIATION");
  } else {
    string = string?.replace("**POLICYTYPE**", "REGULAR");
  }
  string = string?.replace(
    "**ExpectedSalvage**",
    claim?.summaryDetails?.ExpectedSalvage
  );

  string = string?.replace("**lessExcess**", claim?.summaryDetails?.LessExcess);

  string = string?.replace("**LessExcess**", claim?.summaryDetails?.LessExcess);

  string = string?.replace("**IDV**", claim?.claimDetails?.IDV);

  string = string?.replace(
    "**getTotalIMTValue**",
    getTotalIMTValue(allNewParts, allLabour, currentGst, claim)
  );

  string = string?.replace(
    "**finalNetAssessedAmountWithIMTAndSalvage**",
    finalNetAssessedAmountWithIMTAndSalvage(
      claim,
      allLabour,
      allNewParts,
      currentGst
    )
  );

  string = string?.replace("**IDV**", claim?.claimDetails?.IDV);

  string = string?.replace("**MissingItems**", claim?.totalLoss?.MissingItem);

  string = string?.replace(
    "**WreckValueWith**",
    claim?.totalLoss?.WreckValueWith
  );

  string = string?.replace("**MissingItems**", claim?.totalLoss?.MissingItem);

  string = string?.replace(
    "**IDV+Rti_Amount**",
    Number(claim?.totalLoss?.RtiAmount) + Number(claim?.claimDetails?.IDV)
  );

  string = string?.replace(
    "**getTotalLossBasisAssessement**",
    getTotalLossBasisAssessement(claim)
  );

  string = string?.replace(
    "$getTotalLossBasisAssessement$",
    getTotalLossBasisAssessement(claim)
  );

  string = string?.replace(
    "**getTotalSalvageLossBasisAssessementWithRC**",
    getTotalSalvageLossBasisAssessementWithRC(claim)
  );

  string = string?.replace(
    "$getTotalSalvageLossBasisAssessementWithRC$",
    getTotalSalvageLossBasisAssessementWithRC(claim)
  );

  string = string?.replace(
    "$getTotalSalvageLossBasisAssessementWithoutRC$",
    getTotalSalvageLossBasisAssessementWithoutRC(claim)
  );

  string = string?.replace(
    "**getTotalSalvageLossBasisAssessementWithoutRC**",
    getTotalSalvageLossBasisAssessementWithoutRC(claim)
  );

  return string;
};
