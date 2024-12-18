import { Value } from "sass";
import { totalLossData } from "./totalLossContent";
import { calculateDepreciationsPercenatge } from "../../final-report/functions";
import { getTotalLoss } from "../../final-report/getEditorContent/totalLoss";
const roundOff = (number) => {
  return Math.round(number * 100) / 100;
};

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
  return roundOff(total);
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
  return roundOff(total);
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
  return roundOff(total);
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

    if (dep > 0) {
      const assessedValue = Number(part.assessed) * Number(part.qa);
      const gst = (Number(assessedValue) * Number(part.gst)) / 100;
      const depreciationValue =
        (Number(assessedValue + gst) * Number(dep)) / 100;
      if (arrayObject.hasOwnProperty(part.type)) {
        arrayObject[part.type] = {
          depPct: dep,
          overAllValue:
            arrayObject[part.type].overAllValue + assessedValue + gst,
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

  return arrayObject;
};


export const getDepreciationArrayWithoutGST = (
  allNewParts,
  allDepreciations,
  claim
) => {
  let arrayObject = {};
  let totalDepreciationValue = 0;
  let depPct = 0;
  allNewParts.map((part, index) => {
    const dep = calculateDepreciationsPercenatge(
      allDepreciations,
      part.type,
      claim?.vehicleDetails?.DateOfRegistration
    );

    if (dep > 0) {
      depPct = dep;
      const assessedValue = Number(part.assessed) * Number(part.qa);
      const depreciationValue = (Number(assessedValue) * Number(dep)) / 100;
      if (claim?.claimDetails?.PolicyType === "Regular") {
        totalDepreciationValue += roundOff(depreciationValue);
      }
      if (arrayObject.hasOwnProperty(part.type)) {
        arrayObject[part.type] = {
          depPct: dep,
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
    }
  });
  const string = getStringFromObject(arrayObject);
  return { string, totalDepreciationValue,depPct };
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
      const depreciationValue =
        (Number(assessedValue + gst) * Number(dep)) / 100;
      if (arrayObject.hasOwnProperty(part.type)) {
        arrayObject[part.type] = {
          depPct: dep,
          overAllValue:
            arrayObject[part.type].overAllValue + assessedValue + gst,
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

  return roundOff(NewPartstotal + labourtotal);
};

export const getDeprciationValueForNewParts = (
  allLabour,
  currentGst,
  claim,
  allNewParts
) => {
  let totalDepValue = 0;
  allNewParts.map((part, index) => {
    const assessedVal = Number(part.assessed) * Number(part.qa);
    const depValue = (Number(assessedVal) * Number(part.dep)) / 100;
    totalDepValue += depValue;
  });

  const totalLabourAnNewPartsValue = subTotalOfNewpartsAndLabour(
    allLabour,
    currentGst,
    allNewParts,
    claim
  );

  return roundOff(
    totalLabourAnNewPartsValue +
    (claim?.claimDetails?.PolicyType === "Regular" ? totalDepValue : 0) -
    Number(claim?.summaryDetails?.LessExcess)
  );
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

  return roundOff(newPartTotal + labourTotal - lessExcess);
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
  const Total = getDeprciationValueForNewParts(
    allLabour,
    currentGst,
    claim,
    allNewParts
  );
  const ExpectedSalvage = Number(claim?.summaryDetails?.ExpectedSalvage);

  const totalIMT = getTotalIMTValue(allNewParts, allLabour, currentGst, claim);

  return roundOff(Total - (ExpectedSalvage + totalIMT));
};

//-------------------------TOTAL LOSS BASIS -----------------------------------

export const getTotalLossBasisAssessement = (claim) => {
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const IDV = Number(claim?.claimDetails?.IDV);
  const MissingItems = Number(claim?.totalLoss?.MissingItem);

  return roundOff(IDV - (lessExcess + MissingItems));
};

//--------------------NET SALVAGE LOSS BASIS WITH RC-------------------------------

export const getTotalSalvageLossBasisAssessementWithRC = (claim) => {
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const IDV = Number(claim?.claimDetails?.IDV);
  const MissingItems = Number(claim?.totalLoss?.MissingItem);
  const wreckValue = Number(claim?.totalLoss?.WreckValueWith);

  return roundOff(IDV - (lessExcess + MissingItems + wreckValue));
};

//-----------------NET SALVAGE LOSS BASIS WITHOUT RC--------------------------

export const getTotalSalvageLossBasisAssessementWithoutRC = (claim) => {
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const IDV = Number(claim?.claimDetails?.IDV);
  const MissingItems = Number(claim?.totalLoss?.MissingItem);
  const WreckValueWithout = Number(claim?.totalLoss?.WreckValueWithout);

  return roundOff(IDV - (lessExcess + MissingItems + WreckValueWithout));
};

//---------NET SALVAGE LOSS BASIS WITH RC WITH RTI_AMOUNT--------------------------

export const getTotalSalvageLossBasisAssessementWithRCWithRTI = (claim) => {
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const Rti_Amount = Number(claim?.totalLoss?.RtiAmount);
  const IDV = Number(claim?.claimDetails?.IDV);
  const MissingItems = Number(claim?.totalLoss?.MissingItem);
  const WreckValueWith = Number(claim?.totalLoss?.WreckValueWith);

  return roundOff(IDV + Rti_Amount - (lessExcess + MissingItems + WreckValueWith));
};

//---------NET SALVAGE LOSS BASIS WITHOUT RC WITH RTI_AMOUNT--------------------------

export const getTotalSalvageLossBasisAssessementWORCWithRTI = (claim) => {
  const lessExcess = Number(claim?.summaryDetails?.LessExcess);
  const Rti_Amount = Number(claim?.totalLoss?.RtiAmount);
  const IDV = Number(claim?.claimDetails?.IDV);
  const MissingItems = Number(claim?.totalLoss?.MissingItem);
  const WreckValueWithout = Number(claim?.totalLoss?.WreckValueWithout);

  return roundOff(IDV + Rti_Amount - (lessExcess + MissingItems + WreckValueWithout));
};

//---------ASSESSMENT ON CASH LOSS ON REPAIRS BASIS-----------------------

//(A) Cost of New Parts
export const getTotalCostOfParts = (allNewParts, claim) => {
  let total = 0;
  allNewParts?.map((part, index) => {
    const assessedValue = Number(part.assessed) * Number(part.qa);
    total += part.isActive ? assessedValue : 0;
  });
  return roundOff(total);
};

//(B) Cost of Suspected Damaged Parts
export const getCostOfSuspectedDamagedParts = (allNewParts, claim) => {
  return Number(claim?.totalLoss?.SuspectedParts);
};

//(C) Cost of Parts Without Taxes
export const getCostOfPartsWithoutTaxes = (allNewParts, claim) => {
  const a = getTotalCostOfParts(allNewParts, claim);
  const b = getTotalLossTotalCostOfNewParts(allNewParts, claim);
  return roundOff(b - a);
};

//(D) A + B -c
export const getFirstFiltering = (allNewParts, claim) => {
  const A = getTotalLossTotalCostOfNewParts(allNewParts, claim);
  const B = getCostOfSuspectedDamagedParts(allNewParts, claim);
  const C = getCostOfPartsWithoutTaxes(allNewParts, claim);

  return roundOff(A + B - C);
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
  return roundOff(totalDepreciation);
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
    total += labour.isActive ? assessedValue : 0;
  });
  return roundOff(total);
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
  const E = getDepreciationArrayWithoutGST(
    allNewParts,
    allDepreciations,
    claim
  ).totalDepreciationValue;
  const F = getDepreciationOnSuspectedPartsSum(
    allNewParts,
    allDepreciations,
    claim
  );
  const G = getLabourChargesWithoutTax(allLabour, currentGst);

  return roundOff(D - E - F + G);
};

//(I) Less % Cash Loss
export const LessCashOnIndemnity = (
  allNewParts,
  allLabour,
  allDepreciations,
  currentGst,
  claim
) => {
  const totalVal = getSecondFiltering(
    allNewParts,
    allLabour,
    allDepreciations,
    currentGst,
    claim
  );

  const cashLoss = Number(claim?.totalLoss?.CashLoss);
  const reducedValue = (Number(totalVal) * Number(cashLoss)) / 100;

  return roundOff(reducedValue);
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
    currentGst,
    claim
  );
  const J = claim?.summaryDetails?.ExpectedSalvage;
  const K = claim?.summaryDetails?.LessExcess;
  const L = getTotalIMTValue(allNewParts, allLabour, currentGst, claim);

  return roundOff(H - I - J - K + L);
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
    roundOff(getTotalLossTotalCostOfNewParts(allNewParts, claim))
  );

  string = string?.replace(
    "$getTotalLossTotalCostOfNewParts$",
    roundOff(getTotalLossTotalCostOfNewParts(allNewParts, claim))
  );

  string = string?.replace(
    "**getTotalLossTotalCostOfNewPartsWithExcludingDep**",
    roundOff(getTotalLossTotalCostOfNewPartsWithExcludingDep(allNewParts, claim))
  );

  string = string?.replace(
    "**getTotalLossTotalCostOfLabour**",
    roundOff(getTotalLossTotalCostOfLabour(allLabour, currentGst))
  );

  string = string?.replace(
    "**subTotalOfNewpartsAndLabour**",
    roundOff(subTotalOfNewpartsAndLabour(allLabour, currentGst, allNewParts, claim))
  );
  string = string?.replace(
    "**getDepreciationArray**",
    getDepreciationArray(allNewParts, allDepreciations, claim)
  );

  string = string?.replace(
    "**getDepreciationArrayWithoutGST**",
    getDepreciationArrayWithoutGST(allNewParts, allDepreciations, claim).string
  );

  string = string?.replace(
    "$getDepreciationArrayWithoutGST$",
    getDepreciationArrayWithoutGST(allNewParts, allDepreciations, claim).string
  );

  string = string?.replace(
    "**getDepreciationArrayValueWithoutGST**",
    roundOff(getDepreciationArrayWithoutGST(allNewParts, allDepreciations, claim)
      .totalDepreciationValue)
  );

  string = string?.replace(
    "$getDepreciationArrayValueWithoutGST$",
    roundOff(getDepreciationArrayWithoutGST(allNewParts, allDepreciations, claim)
      .totalDepreciationValue)
  );

  string = string?.replace(
    "$getDepreciationArray$",
    getDepreciationArray(allNewParts, allDepreciations, claim)
  );

  string = string?.replace("**lessExcess**", claim?.summaryDetails?.LessExcess);

  string = string?.replace(
    "**getNetAssessedWithLessExcessDeduction**",
    roundOff(getNetAssessedWithLessExcessDeduction(
      claim,
      allLabour,
      allNewParts,
      currentGst
    ))
  );

  string = string?.replace(
    "$getNetAssessedWithLessExcessDeduction$",
    roundOff(getNetAssessedWithLessExcessDeduction(
      claim,
      allLabour,
      allNewParts,
      currentGst
    ))
  );

  string = string?.replace(
    "**getDeprciationValueForNewParts**",
    roundOff(getDeprciationValueForNewParts(allLabour, currentGst, claim, allNewParts))
  );

  string = string?.replace(
    "$getDeprciationValueForNewParts$",
    roundOff(getDeprciationValueForNewParts(allLabour, currentGst, claim, allNewParts))
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
    roundOff(getTotalIMTValue(allNewParts, allLabour, currentGst, claim))
  );

  string = string?.replace(
    "$getTotalIMTValue$",
    roundOff(getTotalIMTValue(allNewParts, allLabour, currentGst, claim))
  );

  string = string?.replace(
    "**finalNetAssessedAmountWithIMTAndSalvage**",
    roundOff(finalNetAssessedAmountWithIMTAndSalvage(
      claim,
      allLabour,
      allNewParts,
      currentGst
    ))
  );

  string = string?.replace("**IDV**", claim?.claimDetails?.IDV);

  string = string?.replace("**MissingItems**", claim?.totalLoss?.MissingItem);

  string = string?.replace("**CashLoss**", claim?.totalLoss?.CashLoss);

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
    roundOff(getTotalLossBasisAssessement(claim))
  );

  string = string?.replace(
    "$getTotalLossBasisAssessement$",
    roundOff(getTotalLossBasisAssessement(claim))
  );

  string = string?.replace(
    "**getTotalSalvageLossBasisAssessementWithRC**",
    roundOff(getTotalSalvageLossBasisAssessementWithRC(claim))
  );

  string = string?.replace(
    "$getTotalSalvageLossBasisAssessementWithRC$",
    roundOff(getTotalSalvageLossBasisAssessementWithRC(claim))
  );

  string = string?.replace(
    "$getTotalSalvageLossBasisAssessementWithRCWithRTI$",
    roundOff(getTotalSalvageLossBasisAssessementWithRCWithRTI(claim))
  );

  string = string?.replace(
    "##getTotalSalvageLossBasisAssessementWithRCWithRTI##",
    roundOff(getTotalSalvageLossBasisAssessementWithRCWithRTI(claim))
  );

  string = string?.replace(
    "**getTotalSalvageLossBasisAssessementWithRCWithRTI**",
    roundOff(getTotalSalvageLossBasisAssessementWithRCWithRTI(claim))
  );

  string = string?.replace(
    "**getTotalSalvageLossBasisAssessementWithoutRCWithRTI**",
    roundOff(getTotalSalvageLossBasisAssessementWORCWithRTI(claim))
  );

  string = string?.replace(
    "$getTotalSalvageLossBasisAssessementWithoutRCWithRTI$",
    roundOff(getTotalSalvageLossBasisAssessementWORCWithRTI(claim))
  );

  string = string?.replace(
    "$getTotalSalvageLossBasisAssessementWithoutRC$",
    roundOff(getTotalSalvageLossBasisAssessementWithoutRC(claim))
  );

  string = string?.replace(
    "**getTotalSalvageLossBasisAssessementWithoutRC**",
    roundOff(getTotalSalvageLossBasisAssessementWithoutRC(claim))
  );

  //7 Sections
  string = string?.replace(
    "**getTotalCostOfParts**",
    roundOff(getTotalCostOfParts(allNewParts, claim))
  );

  string = string?.replace(
    "**getCostOfSuspectedDamagedParts**",
    roundOff(getCostOfSuspectedDamagedParts(allNewParts, claim))
  );

  string = string?.replace(
    "**getDepreciationFinalValue**",
    roundOff(getDepreciationArrayWithoutGST(allNewParts, allDepreciations, claim)
      .depPct)
  );

  string = string?.replace(
    "$getDepreciationFinalValue$",
    roundOff(getDepreciationArrayWithoutGST(allNewParts, allDepreciations, claim)
      .depPct)
  );

  string = string?.replace(
    "**getCostOfPartsWithoutTaxes**",
    roundOff(getCostOfPartsWithoutTaxes(allNewParts, claim))
  );

  string = string?.replace(
    "**getFirstFiltering**",
    roundOff(getFirstFiltering(allNewParts, claim))
  );

  string = string?.replace(
    "**getDepreciationOnPartsSum**",
    roundOff(getDepreciationOnPartsSum(allNewParts, allDepreciations, claim))
  );

  string = string?.replace(
    "**getDepreciationOnSuspectedPartsSum**",
    roundOff(getDepreciationOnSuspectedPartsSum(allNewParts, allDepreciations, claim))
  );

  string = string?.replace(
    "**getLabourChargesWithoutTax**",
    roundOff(getLabourChargesWithoutTax(allLabour, currentGst))
  );

  string = string?.replace(
    "**getSecondFiltering**",
    roundOff(getSecondFiltering(
      allNewParts,
      allLabour,
      allDepreciations,
      currentGst,
      claim
    ))
  );

  string = string?.replace(
    "$getSecondFiltering$",
    roundOff(getSecondFiltering(
      allNewParts,
      allLabour,
      allDepreciations,
      currentGst,
      claim
    ))
  );

  string = string?.replace(
    "**LessCashOnIndemnity**",
    roundOff(LessCashOnIndemnity(allNewParts, allLabour, allDepreciations,currentGst, claim))
  );

  string = string?.replace(
    "**getLastFiltering**",
    roundOff(getLastFiltering(
      allNewParts,
      allLabour,
      allDepreciations,
      claim,
      currentGst
    ))
  );

  string = string?.replace(
    "##getLastFiltering##",
    roundOff(getLastFiltering(
      allNewParts,
      allLabour,
      allDepreciations,
      claim,
      currentGst
    ))
  );

  string = string?.replace(
    "$getLastFiltering$",
    roundOff(getLastFiltering(
      allNewParts,
      allLabour,
      allDepreciations,
      claim,
      currentGst
    ))
  );

  return string;
};
