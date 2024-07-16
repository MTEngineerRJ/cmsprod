import { Value } from "sass";
import { totalLossData } from "./totalLossContent";
import { calculateDepreciationsPercenatge } from "../../final-report/functions";
import { getTotalLoss } from "../../final-report/getEditorContent/totalLoss";
//--------------------REPAIR BASIS--------------------------------------
export const getTotalLossTotalCostOfNewParts = (allNewParts, claim) => {
  let total = 0;
  allNewParts?.map((part, index) => {
    const assessedValue = Number(part.assessed) * Number(part.qa);
    const dep =
      String(claim?.claimDetails?.PolicyType) === "Regular"
        ? (Number(assessedValue) * Number(part.dep)) / 100
        : 0;
    const gst = (Number(assessedValue) * Number(part.gst)) / 100;
    total += part.isActive ? assessedValue + gst : 0;
  });
  return total;
};

export const getTotalLossTotalCostOfNewPartsWithExcludingDep = (
  allNewParts,
  claim
) => {
  let total = 0;
  allNewParts?.map((part, index) => {
    const assessedValue = Number(part.assessed) * Number(part.qa);
    const dep =
      String(claim?.claimDetails?.PolicyType) === "Regular"
        ? (Number(assessedValue) * Number(part.dep)) / 100
        : 0;
    const evaluatedAssessed = assessedValue - dep;
    const gst = (Number(evaluatedAssessed) * Number(part.gst)) / 100;
    total += part.isActive ? evaluatedAssessed + gst : 0;
  });
  return total;
};

export const getTotalLossTotalCostOfLabour = (allLabour, currentGst) => {
  let total = 0;

  allLabour?.map((labour, index) => {
    const assessedValue = Number(labour.assessed);
    const dep = Number(labour.type === 1)
      ? (Number(assessedValue) * 12.5) / 100
      : 0;
    const evaluatedAssessed = assessedValue - dep;
    const gst = (Number(evaluatedAssessed) * Number(currentGst)) / 100;
    total += labour.isActive
      ? evaluatedAssessed + (labour.gst % 2 === 1 ? gst : 0)
      : 0;
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
  Object.entries(array).forEach(([key, value]) => {
    const temp = `
    <span> ${value.depPct}% depreciation on ${key} parts worth Rupees ${value.overAllValue} = ${value.Value} </span><br/>`;
    if (value?.Value > 0) {
      finalArray.push(temp);
    }
  });
  return finalArray.join("");
};

export const getDepreciationJustArray = (
  allNewParts,
  allDepreciations,
  claim
) => {
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
      arrayObject[part.type] = {
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

  return arrayObject;
};

export const getDepreciationArray = (allNewParts, allDepreciations, claim) => {
  let arrayObject = {};
  allNewParts.map((part, index) => {
    const dep = calculateDepreciationsPercenatge(
      allDepreciations,
      part.type,
      claim.vehicleDetails?.DateOfRegistration
    );

    if (dep > 0) {
      const assessedValue = Number(part.assessed) * Number(part.qa);
      const gst = (Number(assessedValue) * Number(part.gst)) / 100;
      const depreciationValue = (Number(assessedValue + gst) * Number(dep)) / 100;
      if (arrayObject.hasOwnProperty(part.type)) {
        arrayObject[part.type] = {
          depPct : dep,
          overAllValue: arrayObject[part.type].overAllValue + assessedValue + gst,
          Value: arrayObject[part.type].Value + depreciationValue,
        };
      } else {
        arrayObject[part.type] = {
          depPct: dep,
          overAllValue: assessedValue + gst,
          Value: depreciationValue,
        };
      }
    }
  });
  return getStringFromObject(arrayObject);
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
      Number(NewPartstotal) + part.isActive && part.imt
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

export const getDeprciationValueForNewParts = (allLabour,currentGst,claim, allNewParts) => {
  let totalDepValue = 0;
  allNewParts.map((part, index) => {
    const assessedVal = Number(part.assessed) * Number(part.qa);
    const depValue = (Number(assessedVal) * Number(part.dep)) / 100;
    totalDepValue += depValue;
  });

  const totalLabourAnNewPartsValue = subTotalOfNewpartsAndLabour(allLabour,currentGst,allNewParts,claim);


  return totalLabourAnNewPartsValue + (claim?.claimDetails?.PolicyType === "Regular" ? totalDepValue : 0) - Number(claim?.summaryDetails?.LessExcess);
};

export const getNetAssessedWithLessExcessDeduction = (
  claim,
  allLabour,
  allNewParts,
  currentGst
) => {
  const newPartTotal = getTotalLossTotalCostOfNewPartsWithExcludingDep(
    allNewParts,
    claim
  );
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
  // const newPartTotal = getTotalLossTotalCostOfNewPartsWithExcludingDep(
  //   allNewParts,
  //   claim
  // );
  const Total = getDeprciationValueForNewParts(allLabour,currentGst,claim, allNewParts);
  const ExpectedSalvage = Number(claim?.summaryDetails?.ExpectedSalvage);

  const totalIMT = getTotalIMTValue(allNewParts, allLabour, currentGst, claim);

  return (
    Total - (ExpectedSalvage + totalIMT)
  );
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

//(A) Cost of New Parts
export const getTotalCostOfParts = (allNewParts, claim) => {
  let total = 0;
  allNewParts?.map((part, index) => {
    const assessedValue = Number(part.assessed) * Number(part.qa);
    total += part.isActive ? assessedValue : 0;
  });
  return total;
};

//(B) Cost of Suspected Damaged Parts
export const getCostOfSuspectedDamagedParts = (allNewParts, claim) => {
  let total = 0;
  allNewParts?.map((part, index) => {
    const assessedValue = Number(part.assessed) * Number(part.qa);
    total +=
      part.isActive &&
      String(claim?.claimDetails?.PolicyType) === "Regular" &&
      Number(part.dep) > 0
        ? assessedValue
        : 0;
  });
  return total;
};

//(C) Cost of Parts Without Taxes
export const getCostOfPartsWithoutTaxes = (allNewParts, claim) => {
  let total = 0;
  allNewParts?.map((part, index) => {
    const assessedValue = Number(part.assessed) * Number(part.qa);
    total += part.isActive && Number(part.gst) === 0 ? assessedValue : 0;
  });
  return total;
};

//(D) A + B -c
export const getFirstFiltering = (allNewParts, claim) => {
  const A = getTotalCostOfParts(allNewParts, claim);
  const B = getCostOfSuspectedDamagedParts(allNewParts, claim);
  const C = getCostOfPartsWithoutTaxes(allNewParts, claim);

  return A + B - C;
};

//(E) Cost Parts With Depreciation
export const getDepreciationOnPartsSum = (
  allNewParts,
  allDepreciations,
  claim
) => {
  const depArray = getDepreciationJustArray(
    allNewParts,
    allDepreciations,
    claim
  );
  let totalDepreciation = 0;
  for (const type in depArray) {
    const temp = depArray[type];
    totalDepreciation += temp?.Value;
  }
  return totalDepreciation;
};

//(F) SuspectedParts Depreciation
export const getDepreciationOnSuspectedPartsSum = (
  allNewParts,
  allDepreciations,
  claim
) => {
  return 0;
};

//(G) Add Labour Charges (without Taxes)
export const getLabourChargesWithoutTax = (allLabour, currentGst) => {
  let total = 0;
  allLabour?.map((labour, index) => {
    const assessedValue = Number(labour.assessed);
    const dep = Number(labour.type) ? (Number(assessedValue) * 12.5) / 100 : 0;
    const evaluatedAssessed = assessedValue - dep;
    total += labour.isActive ? evaluatedAssessed : 0;
  });
  return total;
};

//(H) D - E - F + G
export const getSecondFiltering = (
  allNewParts,
  allLabour,
  allDepreciations,
  currentGst,
  claim
) => {
  const D = getFirstFiltering(allNewParts, claim);
  const E = getDepreciationOnPartsSum(allNewParts, allDepreciations, claim);
  const F = getDepreciationOnSuspectedPartsSum(
    allNewParts,
    allDepreciations,
    claim
  );
  const G = getLabourChargesWithoutTax(allLabour, currentGst);

  return D - E - F + G;
};

//(I) Less % Cash Loss
export const LessCashOnIndemnity = (
  allNewParts,
  allLabour,
  allDepreciations,
  claim
) => {
  return 0;
};

//(M) H - I -J - K + L
export const getLastFiltering = (
  allNewParts,
  allLabour,
  allDepreciations,
  claim,
  currentGst
) => {
  const H = getSecondFiltering(
    allNewParts,
    allLabour,
    allDepreciations,
    currentGst,
    claim
  );
  const I = LessCashOnIndemnity(
    allNewParts,
    allLabour,
    allDepreciations,
    claim
  );
  const J = claim?.summaryDetails?.ExpectedSalvage;
  const K = claim?.summaryDetails?.LessExcess;
  const L = getTotalIMTValue(allNewParts, allLabour, currentGst, claim);

  return H - I - J - K + L;
};

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
  string = string?.replace(
    "**getTotalLossTotalCostOfNewParts**",
    getTotalLossTotalCostOfNewParts(allNewParts, claim)
  );

  string = string?.replace(
    "$getTotalLossTotalCostOfNewParts$",
    getTotalLossTotalCostOfNewParts(allNewParts, claim)
  );

  string = string?.replace(
    "**getTotalLossTotalCostOfNewPartsWithExcludingDep**",
    getTotalLossTotalCostOfNewPartsWithExcludingDep(allNewParts, claim)
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

  string = string?.replace(
    "**getDeprciationValueForNewParts**",
    getDeprciationValueForNewParts(allLabour,currentGst,claim, allNewParts)
  );

  string = string?.replace(
    "$getDeprciationValueForNewParts$",
    getDeprciationValueForNewParts(allLabour,currentGst,claim, allNewParts)
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

  string = string?.replace(
    "$ExpectedSalvage$",
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
    "$getTotalIMTValue$",
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

  string = string?.replace(
    "**WreckValueWithout**",
    claim?.totalLoss?.WreckValueWithout
  );

  string = string?.replace("**MissingItems**", claim?.totalLoss?.MissingItem);

  string = string?.replace(
    "**IDV+Rti_Amount**",
    Number(claim?.totalLoss?.RtiAmount) + Number(claim?.claimDetails?.IDV)
  );

  string = string?.replace(
    "$IDV+Rti_Amount$",
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
    "$getTotalSalvageLossBasisAssessementWithRCWithRTI$",
    getTotalSalvageLossBasisAssessementWithRCWithRTI(claim)
  );

  string = string?.replace(
    "##getTotalSalvageLossBasisAssessementWithRCWithRTI##",
    getTotalSalvageLossBasisAssessementWithRCWithRTI(claim)
  );

  string = string?.replace(
    "**getTotalSalvageLossBasisAssessementWithRCWithRTI**",
    getTotalSalvageLossBasisAssessementWithRCWithRTI(claim)
  );

  string = string?.replace(
    "**getTotalSalvageLossBasisAssessementWithoutRCWithRTI**",
    getTotalSalvageLossBasisAssessementWORCWithRTI(claim)
  );

  string = string?.replace(
    "$getTotalSalvageLossBasisAssessementWithoutRCWithRTI$",
    getTotalSalvageLossBasisAssessementWORCWithRTI(claim)
  );

  string = string?.replace(
    "$getTotalSalvageLossBasisAssessementWithoutRC$",
    getTotalSalvageLossBasisAssessementWithoutRC(claim)
  );

  string = string?.replace(
    "**getTotalSalvageLossBasisAssessementWithoutRC**",
    getTotalSalvageLossBasisAssessementWithoutRC(claim)
  );

  //7 Sections
  string = string?.replace(
    "**getTotalCostOfParts**",
    getTotalCostOfParts(allNewParts, claim)
  );

  string = string?.replace(
    "**getCostOfSuspectedDamagedParts**",
    getCostOfSuspectedDamagedParts(allNewParts, claim)
  );

  string = string?.replace(
    "**getCostOfPartsWithoutTaxes**",
    getCostOfPartsWithoutTaxes(allNewParts, claim)
  );

  string = string?.replace(
    "**getFirstFiltering**",
    getFirstFiltering(allNewParts, claim)
  );

  string = string?.replace(
    "**getDepreciationOnPartsSum**",
    getDepreciationOnPartsSum(allNewParts, allDepreciations, claim)
  );

  string = string?.replace(
    "**getDepreciationOnSuspectedPartsSum**",
    getDepreciationOnSuspectedPartsSum(allNewParts, allDepreciations, claim)
  );

  string = string?.replace(
    "**getLabourChargesWithoutTax**",
    getLabourChargesWithoutTax(allLabour, currentGst)
  );

  string = string?.replace(
    "**getSecondFiltering**",
    getSecondFiltering(
      allNewParts,
      allLabour,
      allDepreciations,
      currentGst,
      claim
    )
  );

  string = string?.replace(
    "**LessCashOnIndemnity**",
    LessCashOnIndemnity(allNewParts, allLabour, allDepreciations, claim)
  );

  string = string?.replace(
    "**getLastFiltering**",
    getLastFiltering(
      allNewParts,
      allLabour,
      allDepreciations,
      claim,
      currentGst
    )
  );

  string = string?.replace(
    "##getLastFiltering##",
    getLastFiltering(
      allNewParts,
      allLabour,
      allDepreciations,
      claim,
      currentGst
    )
  );

  string = string?.replace(
    "$getLastFiltering$",
    getLastFiltering(
      allNewParts,
      allLabour,
      allDepreciations,
      claim,
      currentGst
    )
  );

  return string;
};
