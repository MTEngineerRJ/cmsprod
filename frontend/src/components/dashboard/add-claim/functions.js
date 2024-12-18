const { regionList } = require("../../../utils/regionsList");

const insurerCodeMapping = {
  "United India Insurance Company Limited": "UIIC",
  "The New India Assurance Company Limited": "NIA",
  "National Insurance Company Limited": "NIC",
  "The Oriental Insurance Company Limited": "OIC",
};

const getNextYear = (policyStartDate) => {
  if (policyStartDate && !isNaN(new Date(policyStartDate).getTime())) {
    const oneYearLater = new Date(policyStartDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    oneYearLater.setMonth(oneYearLater.getMonth());
    oneYearLater.setDate(oneYearLater.getDate() - 1);
    return oneYearLater;
  }
  return "";
};

function getMonthNumber(monthName) {
  const months = {
    jan: "01",
    feb: "02",
    mar: "03",
    apr: "04",
    may: "05",
    jun: "06",
    jul: "07",
    aug: "08",
    sep: "09",
    oct: "10",
    nov: "11",
    dec: "12",
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };

  const cleanedMonthName = monthName.trim().toLowerCase();
  if (months.hasOwnProperty(cleanedMonthName)) {
    return months[cleanedMonthName];
  } else {
    return monthName;
  }
}

function checkDateFormat(dateString) {
  const yyyy_mm_dd_regex = /^\d{4}-\d{2}-\d{2}$/;
  const dd_mm_yyyy_regex = /^\d{2}-\d{2}-\d{4}$/;

  if (yyyy_mm_dd_regex.test(dateString)) {
    return true;
  }
  return false;
}

function isValidDateFormat(dateString) {
  var pattern =
    /^\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \([\w\s]+\)$/;
  return pattern.test(dateString);
}

function convertToYYYYMMDD(dateString) {
  var date = new Date(dateString);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

const formatDateFinal = (inputDate2, type) => {
  const inputDate = isValidDateFormat(inputDate2)
    ? convertToYYYYMMDD(inputDate2)
    : inputDate2;
  if (!inputDate || inputDate === "") return inputDate;
  if (checkDateFormat(inputDate)) return inputDate;

  let dateParts = inputDate?.split(/[-/ ]/);
  let year, month, day;

  if (dateParts.length === 3) {
    day = dateParts[0];
    month = getMonthNumber(dateParts[1]);
    year = dateParts[2];
  } else if (dateParts.length === 2 && dateParts[1].length === 4) {
    month = getMonthNumber(dateParts[0]);
    year = dateParts[1];
  } else if (dateParts.length === 3 && isNaN(dateParts[1])) {
    day = dateParts[0];
    month = getMonthNumber(dateParts[1]);
    year = dateParts[2];
  } else {
    return inputDate;
  }

  day = day.padStart(2, "0");
  month = month.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const generateRegion = (region, selectedInsurer) => {
  // Find the region details from the regionList
  const regionDetails = regionList.find(
    (item) => item.Region.toLowerCase() === region.toLowerCase()
  );

  // Default to "UNK" (Unknown) if region is not found
  const regionCode = regionDetails ? regionDetails.RegionShortName : "UNK";

  // Get the insurer code from the mapping
  const insurerCode = insurerCodeMapping[selectedInsurer]
    ? insurerCodeMapping[selectedInsurer]
    : "UNKNOWN"; // Handle unexpected values

  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
  const yy = String(now.getFullYear() % 100).padStart(2, "0"); // Use the last two digits of the year

  // Return the region code and insurer code with the current date in "YY-MM" format
  return `${insurerCode}/${regionCode}/${yy}-${mm}`;
};

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate;
};

const handleInputChange_01 = (e, setInsuredMobileNo2, setPhoneNumber_01) => {
  const inputValue = e.target.value;
  const numericValue = inputValue.replace(/\D/g, "");
  const truncatedValue = numericValue.slice(0, 10);
  if (truncatedValue.length === 10) {
    setInsuredMobileNo2(truncatedValue);
  }

  setPhoneNumber_01(truncatedValue);
};

const handleInputChange = (e, setInsuredMobileNo1, setPhoneNumber) => {
  const inputValue = e.target.value;
  const numericValue = inputValue.replace(/\D/g, "");
  const truncatedValue = numericValue.slice(0, 10);
  if (truncatedValue.length === 10) {
    setInsuredMobileNo1(truncatedValue);
  }
  setPhoneNumber(truncatedValue);
};

module.exports = {
  getMonthNumber,
  getNextYear,
  checkDateFormat,
  isValidDateFormat,
  convertToYYYYMMDD,
  formatDateFinal,
  generateRegion,
  formatDate,
  handleInputChange,
  handleInputChange_01,
};
