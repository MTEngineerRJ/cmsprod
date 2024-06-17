const formatDate = (dateString) => {
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    };
  
    const dateParts = new Date(dateString).toLocaleDateString("en-GB", options).split('/');
    const formattedDate = dateParts[0] + '-' + dateParts[1] + '-' + dateParts[2];
    return formattedDate;
  };

  function convertToReadable(timeStr) {
    try {
      // Split the time string into hours and minutes
      const [hours, minutes] = timeStr.split(":");
  
      // Convert hours and minutes to numbers
      const hour = parseInt(hours, 10);
      const minute = parseInt(minutes, 10);
  
      // Format the time in readable format
      const formattedHour = (hour % 12 || 12).toString().padStart(2, "0"); // Convert to 12-hour format
      const period = hour < 12 ? "AM" : "PM";
      const readableTime = `${formattedHour}:${minutes} ${period}`; // Example: 09:49 AM
      return readableTime;
    } catch (error) {
      return "Invalid time format. Please provide time in HH:MM format.";
    }
  }
  
  
export const addVariables = (string,claim)=>{
  
      string = string?.replace("**CLAIMSERVICINGOFFICE**", `<strong>${claim?.otherInfo[0]?.ClaimServicingOffice}</strong>`);
      string = string?.replace("**ALLOTMENTDATE**", `<strong>${formatDate(claim?.otherInfo[0]?.AllotmentDate)}</strong>`);
      string = string?.replace("**DATEOFACCIDENT**", `<strong>${formatDate(claim?.otherInfo[0]?.DateOfAccident)}</strong>`);
      string = string?.replace("**PLACEOFACCIDENT**", `<strong>${claim?.otherInfo[0]?.PlaceOfAccident}</strong>`);
      string = string?.replace("**INSUREDNAME**", `<strong>${claim?.otherInfo[0]?.DriverName}</strong>`);
      string = string?.replace("**CASSISNUMBER**", `<strong>${claim?.otherInfo[0]?.ChassisNumber}</strong>`);
      string = string?.replace("**POLICYNUMBER**", `<strong>${claim?.otherInfo[0]?.PolicyNumber}</strong>`);
      string = string?.replace("**TIMEOFACCIDENT**", `<strong>${convertToReadable(claim?.otherInfo[0]?.TimeOfAccident)}</strong>`);
      string = string?.replace("**BREAK**", "\n");
      
      return string
  }