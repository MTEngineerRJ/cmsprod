const { PrenispectionHeadingCardsContent } = require("./DataHeader");

// Function to convert UTC timestamp to IST (Indian Standard Time)
function convertToIST(utcTimestamp) {
  const utcDate = new Date(utcTimestamp);
  const istDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedISTDateTime = istDate.toLocaleString("en-US", options);
  return formattedISTDateTime;
}

// Function to sort objects by `lead_id` in descending order
const sortObjectsByOrderIdDescending = (data) => {
  return data.sort((a, b) => b.lead_id - a.lead_id);
};

// Function to format date (e.g., converting 'MM/DD/YYYY' or 'YYYY/MM/DD' to 'DD-MM-YYYY')
const updatedFormatDate = (dateString) => {
  const isValidDate = (date) => {
    return (
      date !== null &&
      date !== undefined &&
      date !== "null" &&
      date !== "undefined"
    );
  };

  if (!isValidDate(dateString)) {
    return null;
  }

  const separator = dateString.includes("/") ? "/" : "-";
  const parts = dateString.split(separator);
  let formattedDate;

  if (parts.length === 3 && parts[0].length === 4) {
    const [year, month, day] = parts;
    formattedDate = `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
  } else {
    const [month, day, year] = parts;
    formattedDate = `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
  }

  return formattedDate;
};

// Function to check if a claim's date is within the selected date range
const isWithinDateRange = (claimDate, fromDate, toDate) => {
  if (!fromDate || !toDate) return true; // Include all claims if no date range
  const claimDateObj = new Date(claimDate);
  return claimDateObj >= new Date(fromDate) && claimDateObj <= new Date(toDate);
};

// Function to filter claims by region, insurer, and date range
const getAccordingToRegionAndDate = (allClaims, region, fromDate, toDate, insurerSearchValue) => {
  let updatedClaims = [];
  const formattedFromDate = updatedFormatDate(fromDate);
  const formattedToDate = updatedFormatDate(toDate);

  // If no filters are applied, return all claims within the date range
  if ((!region || String(region) === "undefined") && !insurerSearchValue) {
    return allClaims.filter((claim) =>
      isWithinDateRange(claim.AddedDate, formattedFromDate, formattedToDate)
    );
  }

  allClaims?.forEach((claim) => {
    const regionMatch = !region || 
      String(claim.Region).toLowerCase() === String(region).toLowerCase();
    
    const insurerMatch = !insurerSearchValue || 
      claim?.InsuranceCompany?.toLowerCase().includes(insurerSearchValue.toLowerCase());
    
    const dateMatch = isWithinDateRange(claim.AddedDate, formattedFromDate, formattedToDate);

    if (regionMatch && insurerMatch && dateMatch) {
      updatedClaims.push(claim);
    }
  });

  return updatedClaims;
};

// Function to format the data according to the selected region (e.g., for Preinspection)
const formatTheDataToHeaders = (selectedRegion, allClaims) => {
  if (selectedRegion !== "Preinspection") return allClaims;
  else {
    let getHeaders = [];
    PrenispectionHeadingCardsContent.map((header) => {
      getHeaders.push(header.id);
    });
    return allClaims.filter((claim) => getHeaders.includes(claim.CurrentStatus));
  }
};

module.exports = {
  updatedFormatDate,
  sortObjectsByOrderIdDescending,
  convertToIST,
  isWithinDateRange,
  getAccordingToRegionAndDate,
  formatTheDataToHeaders,
};
