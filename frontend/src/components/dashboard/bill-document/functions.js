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

  const getProfessionalFees = (feeReport)=>{
    const inspectionType = feeReport?.claimDetails?.InspectionType ;
    const InspectionTypeOfConduct = feeReport?.claimDetails?.InspectionTypeOfConduct;
    let fees = 0;
    if(String(inspectionType).toLowerCase().includes("pre-inspection")){
    if(String(InspectionTypeOfConduct).toLowerCase().includes("digital")){
      fees = String(feeReport?.vehicleDetails?.VehicleType)
      .toLowerCase()
      .includes("4W".toLowerCase())
      ? 40 :
      String(feeReport?.vehicleDetails?.VehicleType)
      .toLowerCase()
      .includes("2W".toLowerCase())
      ? 30
      : 41;
    }
    else{
      fees = String(feeReport?.vehicleDetails?.VehicleType)
      .toLowerCase()
      .includes("4W".toLowerCase())
      ? 140 :
      String(feeReport?.vehicleDetails?.VehicleType)
      .toLowerCase()
      .includes("2W".toLowerCase())
      ? 75
      : 150;
    }
  }
  else{
    fees = String(feeReport?.vehicleDetails?.VehicleType)
      .toLowerCase()
      .includes("2W".toLowerCase())
      ? 500 :
      700;
  }
  return fees;
  }

  const calculateTheTotalBillWithoutGST = (feeReport) => {
    const is4W = String(feeReport?.vehicleDetails?.VehicleType).toLowerCase().includes("4w") ;
    const propfessionalCharges = getProfessionalFees(feeReport);
    const photoCharges =
      Number(feeReport?.feeDetails?.Photos) *
      Number(feeReport?.feeDetails?.PhotsRate);
    const conveyanceCharges = Number(feeReport?.feeDetails?.Conveyance);

    return propfessionalCharges + photoCharges + conveyanceCharges;
  };



  function addCommasToNumber(number) {
    if (Number(number) <= 100 || number === undefined) return number;
    return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const calculateTotalAssessed = (feeReport,setAssessed,setEstimate) => {
    let total_assessed = 0,
      total_assessed2 = 0,
      total_estimate = 0,
      total_estimate2 = 0;
    const allNewParts = feeReport?.newPartsDetails;
    const allLabourer = feeReport?.labourDetails;

    allNewParts?.map((part, index) => {
      //assessed
      const assessed = part.NewPartsIsActive
        ? Number(part.NewPartsAssessed) * Number(part.QA)
        : 0;
      const depreciation =
        String(feeReport?.claimDetails?.PolicyType) === "Regular"
          ? (Number(assessed) * Number(part.NewPartsDepreciationPct)) / 100
          : 0;

      const assessed_gst =
        String(part.NewPartsWithTax) === "1" ||
        String(part.NewPartsWithTax) === "3"
          ? (Number(assessed - depreciation) * Number(part.NewPartsGSTPct)) /
            100
          : 0;
      const current_Assessed = assessed - depreciation + assessed_gst;
      total_assessed = total_assessed + current_Assessed;

      //estimate
      const current_Estimate = part.NewPartsIsActive
        ? Number(part.NewPartsEstimate) * Number(part.QE)
        : 0;
      const estimate_gst =
        String(part.NewPartsWithTax) === "1" ||
        String(part.NewPartsWithTax) === "2"
          ? (Number(current_Estimate) * Number(part.NewPartsGSTPct)) / 100
          : 0;
      const current_EstimateValue = current_Estimate + estimate_gst;

      total_estimate = total_estimate + current_EstimateValue;
    });

    allLabourer?.map((part, index) => {
      //assessed
      const assessed = part.LabourIsActive ? Number(part.Assessed) : 0;
      const depreciation_of_paint =
        String(part.JobType) === "1" &&
        String(feeReport?.claimDetails?.PolicyType) === "Regular"
          ? (Number(assessed) * 12.5) / 100
          : 0;
      const assessed_gst =
        part.IsGSTIncluded % 2 !== 0
          ? (Number(assessed - depreciation_of_paint) *
              Number(part.GSTPercentage)) /
            100
          : 0;
      const current_Assessed = assessed - depreciation_of_paint + assessed_gst;
      total_assessed2 = total_assessed2 + current_Assessed;

      //estimate
      const current_Estimate = part.LabourIsActive ? Number(part.Estimate) : 0;
      const estimate_gst =
        part.IsGSTIncluded % 2 !== 0
          ? (Number(current_Estimate) * Number(part.GSTPercentage)) / 100
          : 0;
      const current_EstimateValue = current_Estimate + estimate_gst;

      total_estimate2 = total_estimate2 + current_EstimateValue;
    });

    const LessExcess = Number(feeReport?.SummaryDetails?.LessExcess);
    const lessImposed = Number(feeReport?.SummaryDetails?.LessImposed);
    const expectedSalvage = Number(feeReport?.SummaryDetails?.ExpectedSalvage);

    setAssessed(
      total_assessed +
        total_assessed2 -
        (lessImposed + LessExcess + expectedSalvage)
    );
    setEstimate(total_estimate2 + total_estimate);
  };

  const calculateSGST = (feeReport) => {
    const total = calculateTheTotalBillWithoutGST(feeReport);

    const SGST = (Number(feeReport?.feeDetails?.Sgst) * Number(total)) / 100;

    return SGST;
  };

  const calculateCGST = (feeReport) => {
    const total = calculateTheTotalBillWithoutGST(feeReport);

    const CGST = parseFloat(parseFloat(Number(feeReport?.feeDetails?.Cgst) * Number(total)) / 100);

    return CGST;
  };

  const calculateIGST = (feeReport) => {
    const total = calculateTheTotalBillWithoutGST(feeReport);

    const SGST = (Number(feeReport?.feeDetails?.Igst) * Number(total)) / 100;

    return SGST;
  };

  const grandTotalWithGST = (feeReport) => {
    const total = calculateTheTotalBillWithoutGST(feeReport);
    const cgstValue = calculateCGST(feeReport);
    const sgstValue = calculateSGST(feeReport);
    const igstValue = calculateIGST(feeReport);
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

  module.exports = {
    formatDate,
    roundOff,
    numberToWords,
    calculateTheTotalBillWithoutGST,
    addCommasToNumber,
    calculateTotalAssessed,
    calculateCGST,
    calculateIGST,
    calculateSGST,
    grandTotalWithGST,
    downloadPDF
  }