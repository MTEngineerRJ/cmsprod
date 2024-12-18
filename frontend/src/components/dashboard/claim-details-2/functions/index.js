const formatDate = (dateString) => {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const formatDate2 = (val) => {
    const date = new Date(val);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Month is zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  
  function removeMultipleSpaces(inputString) {
    // Use regular expression to replace multiple spaces with a single space
    const cleanedString = inputString.replace(/\s+/g, " ").trim();
    return cleanedString;
  }

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
    // Regular expressions to match yyyy-mm-dd and dd-mm-yyyy formats
    const yyyy_mm_dd_regex = /^\d{4}-\d{2}-\d{2}$/;
    const dd_mm_yyyy_regex = /^\d{2}-\d{2}-\d{4}$/;

    if (yyyy_mm_dd_regex.test(dateString)) {
      return true;
    }
    return false;
  }

  const formatDateFinal = (inputDate, type) => {
    if (!inputDate) return inputDate; // Check if inputDate is falsy
    if (checkDateFormat(inputDate)) return inputDate;

    let dateParts = inputDate.split(/[-/ ]/);
    let year, month, day;

    if (dateParts.length === 3) {
      // Case: dd/mm/yyyy or dd-mm-yyyy
      day = dateParts[0];
      month = getMonthNumber(dateParts[1]);
      year = dateParts[2];
    } else if (dateParts.length === 2 && dateParts[1].length === 4) {
      // Case: jan-yyyy or jan/yyyy
      day = "01"; // Assuming the first day of the month
      month = getMonthNumber(dateParts[0]);
      year = dateParts[1];
    } else if (dateParts.length === 3 && isNaN(dateParts[1])) {
      // Case: dd-jan-yyyy
      day = dateParts[0];
      month = getMonthNumber(dateParts[1]);
      year = dateParts[2];
    } else {
      return inputDate;
    }

    day = day.padStart(2, "0");
    month = month.padStart(2, "0");

    console.log("inputdATE", inputDate, type, `${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  const calculateTheUpdateType = (type) => {
    if (String(type) === "1") return "updateClaimDetails";
    else if (String(type) === "2") return "updateVehicleDetails";
    else if (String(type) === "3") return "updateDriverDetails";
    else if (String(type) === "5") return "updateAccidentDetails";
    return "updategarageDetails";
  };

  function convertAndFormatDate(inputDate) {
    const trimmedDate = inputDate;
    const dateObject = new Date(trimmedDate);
    const formattedDate = dateObject.toLocaleDateString("en-GB");

    return formattedDate;
  }

  function validateEmail(email) {
    if (
      !email ||
      email === "null" ||
      email === "undefined" ||
      email === "None" ||
      email === ""
    ) {
      return true;
    } else {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return pattern.test(email);
    }
  }

  const editHandler = (value,setEditCase,setEditCase_01,setEditCase_02) => {
    if (value === 1) {
      setEditCase((prop) => !prop);
    } else if (value === 2) {
      setEditCase_01((prop) => !prop);
    } else if (value === 3) {
      setEditCase_02((prop) => !prop);
    }
  };

  const closeStatusUpdateHandler = (setIsStatusModal) => {
    setIsStatusModal(false);
  };

  const updateHandlerAfterFetching = () => {
   
  
  };

  module.exports={
    formatDate,
    formatDate2,
    removeMultipleSpaces,
    getMonthNumber,
    formatDateFinal,
    calculateTheUpdateType,
    convertAndFormatDate,
    validateEmail,
    editHandler,
    updateHandlerAfterFetching,
    closeStatusUpdateHandler
  }
