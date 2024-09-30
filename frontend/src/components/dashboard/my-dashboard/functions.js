const { PrenispectionHeadingCardsContent } = require("./DataHeader");

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

const sortObjectsByOrderIdDescending = (data) => {
  return data.sort((a, b) => b.lead_id - a.lead_id);
};

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

const getAccordingToRegion = (allClaims,region)=>{
  let updatedClaims = [];
  if(String(region) === "" || String(region) === undefined ||
  String(region) === "undefined"){
    return allClaims;
  }
  allClaims?.map((claim,index)=>{
    if(String(claim.Region).toLowerCase() === String(region).toLowerCase()){
      updatedClaims.push(claim);
    }
  });
  return updatedClaims;
}

const formatTheDataToHeaders = (selectedRegion, allClaims) => {
  if(selectedRegion !== 'Preinspection')
    return allClaims;
  else{
    let getHeaders = [];
    PrenispectionHeadingCardsContent.map((header,index) => {
      getHeaders.push(header.id)
    })
    console.log({selectedRegion, allClaims})
    return allClaims.filter((claim) => getHeaders.includes(claim.CurrentStatus))
    
  }
}
module.exports = {
  updatedFormatDate,
  sortObjectsByOrderIdDescending,
  convertToIST,
  getAccordingToRegion,
  formatTheDataToHeaders
};
