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

  const calculateGlassDept = (part) => {
    const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
    const Depreciation =
      (assessed * Number(part.NewPartsDepreciationPct)) / 100;
    if (
      String(part.NewPartsTypeOfMaterial === "Glass") &&
      part.NewPartsIsActive && part.IsImt === 0
    ) {
      return assessed;
    }
    return 0;
  };

  const calculateMetalDepreciationWithoutValue = (allInfo) => {
    let depPct = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      if (
        String(part.NewPartsTypeOfMaterial) === "Metal" &&
        part.NewPartsIsActive && part.IsImt === 0
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
      part.NewPartsIsActive && part.IsImt === 0
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
            part.NewPartsTypeOfMaterial !== "Metal" && part.NewPartsIsActive && part.IsImt === 0
          )
      )
    ) {
      return assessed;
    }
    return 0;
  };

  const getTotalEstimate = (allInfo,type) => {
    let total = 0;
    let typeTotalValue = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsEstimate) * Number(part.QE);
      total = total + (part.NewPartsIsActive && part.IsImt === 0) ? assessed : 0;
      typeTotalValue =
        typeTotalValue +
        (part.NewPartsIsActive && part.IsImt === 0 && String(part.NewPartsGSTPct) === String(type)
          ? assessed
          : 0);
    });
    if (!type) {
      return total;
    } else {
      return typeTotalValue;
    }
  };

  //calculate New Parts overall calculation with all type gst values
  const getOverallTotalEstimate = (allInfo) => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsEstimate) * Number(part.QE);
      total = total + (part.NewPartsIsActive && part.IsImt === 0 ? assessed : 0);
    });
    return total;
  };

  //calculate New Parts overall calculation with all type gst values
  const getOverallTotalEstimateGST = (allInfo) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const estimatedValue = Number(part.NewPartsEstimate) * Number(part.QE);
      const gst  = (String(part.NewPartsWithTax) === "1" || String(part.NewPartsWithTax) === "2")  && part.IsImt === 0? (estimatedValue * Number(part.NewPartsGSTPct))/100 : 0;
      total = total + gst
    });
    return total;
  };

  //calculate New Parts overall calculation with all type gst values
  const getOverallTotalEstimateNewParts = (allGSTType,allInfo) => {
    let total = 0;
    allGSTType.map((gst, index) => {
      total = total + getTotalEstimate(allInfo,gst.field);
    });
    return total;
  };

  const getTotalGlassAssessed = (allInfo,type) => {
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

  const getTotalGlassAssessedWithGSTType = (allInfo,type) => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);

      if (
        String(part.NewPartsTypeOfMaterial) === "Glass" &&
        part.NewPartsIsActive && part.IsImt === 0 && 
        String(part.NewPartsGSTPct) === String(type)
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

  const getTotalMetalAssessedWithGST = (allInfo,type) => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;
      if (
        String(part.NewPartsTypeOfMaterial) === "Metal" &&
        part.NewPartsIsActive && part.IsImt === 0 &&
        String(part.NewPartsGSTPct) === String(type)
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

  const getTotalOtherMetalAssessesWithGST = (allInfo,type) => {
    let total = 0;
    allInfo?.newPartsDetails.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);

      if (
        String(part.NewPartsTypeOfMaterial) !== "Glass" &&
        String(part.NewPartsTypeOfMaterial) !== "Metal" &&
        part.NewPartsIsActive && part.IsImt === 0 &&
        String(part.NewPartsGSTPct) === String(type)
      ) {
        total = total + assessed;
      }
    });

    return total;
  };

  const getTotalDepreciation = (allInfo,type, other) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) === String(type) &&
        String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" &&
        part.NewPartsIsActive  && part.IsImt === 0
      ) {
        total = total + Depreciation;
      }
    });
    return total;
  };

  const getTotalDepreciationValueOnly = (allInfo,type, other) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) === String(type) &&
        part.NewPartsIsActive  && part.IsImt === 0
      ) {
        total = total + Depreciation;
      }
    });
    return total;
  };

  const getTotalNonMetaDepreciation = (allInfo,type) => {
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

  const getTotalNonMetaDepreciationValueOnly = (allInfo,type) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
        (assessed * Number(part.NewPartsDepreciationPct)) / 100;
      if (
        String(part.NewPartsTypeOfMaterial) !== "Glass" &&
        String(part.NewPartsTypeOfMaterial) !== "Metal" &&
        part.NewPartsIsActive && part.IsImt === 0
      ) {
        total = total + Depreciation;
      }
    });

    return total;
  };

  const calculateTypeNewPartsGST = (allInfo,type) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
    
      const Depreciation =
      String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" ?
      (assessed * Number(part.NewPartsDepreciationPct)) / 100 : 0;
   
      const gst = ((assessed - Depreciation) * Number(part.NewPartsGSTPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) === String(type) &&
        part.NewPartsIsActive && part.IsImt === 0
      ) {
        total = total + gst;
      }
    });
    return  total;
  };

  const calculateTypeNewPartsGSTType = (allInfo,type, gstType,deductDep) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
      String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" ?
      (assessed * Number(part.NewPartsDepreciationPct)) / 100 : 0;
   
      
      const finalAssessedValue = deductDep ? (assessed - Depreciation) : assessed;
      const gst = (finalAssessedValue * Number(part.NewPartsGSTPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) === String(type) &&
        part.NewPartsIsActive &&
        String(part.NewPartsGSTPct) === String(gstType) && part.IsImt === 0
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
        part.NewPartsIsActive && part.IsImt === 0
      ) {
        total = total + gst;
      }
    });
    return  total;
  };

  const calculateOtherTypeNewPartsGSTVijay = (allInfo) => {
    
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const Depreciation =
      String(allInfo?.otherInfo[0]?.PolicyType) === "Regular" ?
      (assessed * Number(part.NewPartsDepreciationPct)) / 100 : 0;

      const gst = ((assessed-Depreciation) * Number(part.NewPartsGSTPct)) / 100;

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

  const calculateOtherTypeNewPartsGSTType = (allInfo,type) => {
    let total = 0;
    allInfo?.newPartsDetails?.map((part, index) => {
      const assessed = Number(part.NewPartsAssessed) * Number(part.QA);
      const gst = (assessed * Number(part.NewPartsGSTPct)) / 100;

      if (
        String(part.NewPartsTypeOfMaterial) !== "Glass" &&
        String(part.NewPartsTypeOfMaterial) !== "Metal" &&
        part.NewPartsIsActive &&
        String(part.NewPartsGSTPct) === String(type) && part.IsImt === 0
      ) {
        total = total + gst;
      }
    });
    return total;
  };


  const roundOff = (number) => {
    return Math.round(number * 100) / 100;
  };

  const sortFunction = (array, type) => {
    const updatedArray = array.sort(
      (a, b) => parseFloat(a.SNO) - parseFloat(b.SNO)
    );
    let newRevisedArray = [];
    updatedArray.map((row, index) => {
      if (String(row.NewPartsGSTPct) === String(type) && row.IsImt === 0) {
        const newRow = {
          ...row,
          pos: index + 1,
        };
        newRevisedArray.push(newRow);
      }
    });
    return newRevisedArray;
  };

 module.exports={
    formatDate,
    calculateGlassDept,
    calculateMetalDepreciationWithoutValue,
    calculateMetalDept,
    calculateNonMetalDept,
    getTotalEstimate,
    getOverallTotalEstimate,
    getOverallTotalEstimateGST,
    getOverallTotalEstimateNewParts,
    getTotalGlassAssessed,
    getTotalGlassAssessedWithGSTType,
    getTotalMetalAssessed,
    getTotalMetalAssessedWithGST,
    addCommasToNumber,
    getTotalOtherMetalAssesses,
    getTotalOtherMetalAssessesWithGST,
    getTotalDepreciation,
    getTotalDepreciationValueOnly,
    getTotalNonMetaDepreciation,
    getTotalNonMetaDepreciationValueOnly,
    calculateTypeNewPartsGST,
    calculateTypeNewPartsGSTType,
    calculateOtherTypeNewPartsGST,
    calculateOtherTypeNewPartsGSTVijay,
    calculateOtherTypeNewPartsGSTType,
    roundOff,
    sortFunction
 } 