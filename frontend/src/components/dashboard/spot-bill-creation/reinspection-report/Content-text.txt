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


function convertHtmlToString(htmlString) {
  // Create a new DOMParser
  const parser = new DOMParser();

  // Parse the HTML string
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Extract the text content from the parsed document
  const plainText = doc.body.textContent || "";

  return plainText;
}

export const otherContent = () => {
  return 'No,As stated by Insured.';
};


export const AssessmentContent = (claimServicingOffice, AllotmentDate, DateOfAccident, PlaceOfAccident,TimeOfAccident) => {
  return (`In accordance with the instructions received from **CLAIMSERVICINGOFFICE**
    dated  **ALLOTMENTDATE** , I visited, inspected/examined online video uploaded by the undersigned,
    and inspected the subject vehicle. It was reported to have met with an accident on **DATEOFACCIDENT**  **TIMEOFACCIDENT** , **PLACEOFACCIDENT** .
    Loss was discussed with the repairer and finally settled as under, subject to policy terms, conditions, and approval of the insurers. This is done keeping in view
    the cause and nature of the accident. <br/>

    <strong>Observations:</strong> Subject with good condition overall. No other damages except as mentioned above were observed over the vehicle. Policy
    report of the accident was not carried out by the insured.`);
};

export const AccidentContent = (InsuredName) => {
  return  (`
    As filled in the claim form and discussion with the insured, on the day and time of the accident, **INSUREDNAME**  was driving the subject vehicle.`);
};

export const getDocumentList = (data, leadId) => {
  let documentString = `Driving license,Certificate of registration,Repair Estimate 
  Claim form, Insurance Policy,Damage vehicle,AadhaarCard ,Pan card,Cancel Cheque,Satisfaction voucher,Dishcharge voucher
  Dismantle photographs,Renspection photographs,Repair invoice,Payment/cash receipt.`
  return documentString;
};

export const summaryNotes = () => {

  console.log()
  return 
  (`
  <ul>
    <li>01. The rates allowed above combination <br>
        of authorized dealer prices.</li>
    <li>02. The cause, nature, and circumstances <br>
        leading to the accident appear genuine, <br>
        believable, and losses recommended/assessed <br>
        are corroborating with this accident.<br></li>
    <li>03. The loss or damage or liability has arisen  <br> proximately caused by the insured perils. <br></li>
    <li>04. The prices are recommended exclusive of all taxes, duties, octroi etc.</li>
    <li>05. The used abbreviation as R.C. = Registration Certificate, D.L. = Driving License, N.A. = Not Allowed, R.A. = Repair Allowed, W&T = Wear & Tear, O.D. = Own Damaged, M.P. = Manipulated i.e. replaced by old material.</li>
    <li>06. The above said vehicle was reinspected by us after repair. Now the vehicle is ready for roadworthy condition, and all the parts replaced and all repair work done as per the final survey report.</li>
  </ul>`);
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


export const addVariables = (
  claim,string , 
  claimServicingOffice,
  AllotmentDate,
  DateOfAccident,
  PlaceOfAccident,
  DriverName,
  ChassisNumber,
  PolicyNumber,
  TimeOfAccident)=>{

    string = string?.replace("**CLAIMSERVICINGOFFICE**", `<strong>${claimServicingOffice}</strong>`);
    string = string?.replace("**ALLOTMENTDATE**", `<strong>${formatDate(AllotmentDate)}</strong>`);
    string = string?.replace("**DATEOFACCIDENT**", `<strong>${formatDate(DateOfAccident)}</strong>`);
    string = string?.replace("**PLACEOFACCIDENT**", `<strong>${PlaceOfAccident}</strong>`);
    string = string?.replace("**INSUREDNAME**", `<strong>${DriverName}</strong>`);
    string = string?.replace("**CASSISNUMBER**", `<strong>${ChassisNumber}</strong>`);
    string = string?.replace("**POLICYNUMBER**", `<strong>${PolicyNumber}</strong>`);
    string = string?.replace("**TIMEOFACCIDENT**", `<strong>${convertToReadable(TimeOfAccident)}</strong>`);
    string = string?.replace("**BREAK**", "\n");
    
    return string
}