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
  

  export const defaultSubjectContent = (type,vehicleNo,PolicyNo,Insured,date)=>{
    
    if(String(type) === '2'){
        return `
       Status for Claim of Vehicle Number - ${vehicleNo !==undefined && vehicleNo !== "undefined" ? vehicleNo : "N.A."}, A/c ${Insured} policy Number - ${PolicyNo}
       `
    }
    else if(String(type) === '3'){
        return `
       Work Approval for Claim of Vehicle Number - ${vehicleNo !==undefined && vehicleNo !== "undefined" ? vehicleNo : "N.A."}, A/c ${Insured} policy Number - ${PolicyNo}
       `
    }
    else{
        return `
        Document Pending for Claim of Vehicle Number - ${vehicleNo !==undefined && vehicleNo !== "undefined" ? vehicleNo : "N.A."}, A/c ${Insured} policy Number - ${PolicyNo}
        `

    }
}
  
export const defaultContent = (type,vehicleNo,PolicyNo,Insured,date)=>{
    console.log("type",type)
    if(String(type) === '2'){
        return `
        Dear Sir/Madam,<br/>
  
        Greeting from the MT Engineers Legal Investigator Pvt. Ltd.,
    
        We are Appointed for the survey of vehicle no.-${vehicleNo}, 
        Insured:-${Insured} & Policy No.-${PolicyNo} on 
        ${formatDate(date)} and the approval
        is as follows:-<br/>
        <br/>
        1) What is the Status of the said vheicle<br/>
        2) How much time it will take to repair the vehicle<br/>
        3) Please provide UR & RI Snaps<br/>
        4) Invoice Bill duly signed & stamped of dealer<br/>
        5) Payment receipt duly signed & stamped of dealer<br/>
        6) Previous Year Policy<br/>
        7) Pan Card<br/>
        8) Please destory the items properly in the RI, Otherwise we will treat the part is repaired. <br/>     
        `
    }
    else if(String(type) === '3'){
        return `Dear Sir/Madam,<br/>
  
        Greeting from the MT Engineers Legal Investigator Pvt. Ltd.,
    
        We are Appointed for the survey of vehicle no.-${vehicleNo},
        Insured:-${Insured} & Policy No.-${PolicyNo} on 
        ${formatDate(date)} and the approval is as follows:- <br/>
        <br/>
         Parts  <br/>
         1) Fr Bumper- New Allowed  <br/>
         2) FR Grill- New Allowed  <br/>
         3) LH Head LIght- new Allowed  <br/>
         4) LH Fender0- Repair Allowed  <br/>
         Labour  <br/>
         1) Fr Bumper- R/R-150, Painting-2500  <br/>
         2) LH Head Light- R/R-100  <br/>
         3) LH Fender- Denting-250, Painting-2200.  <br/>
        `
    }
    else{
        return `
        Dear Sir/Madam,<br/>
        <br/>

        Greeting from the MT Engineers Legal Investigator 
        Pvt. Ltd.,We are Appointed for the survey of <br/>
        vehicle no.${vehicleNo},Insured:${Insured} 
        & Policy No.-${PolicyNo} on  ${formatDate(date)} 
        from the United India Insurance co. Ltd. <br/>
        So we request you please provide the complete contact
         deatils & mails of Repairer/insured.  <br/>
        So that we can proceed further in your case and we 
        also request you to provide the following details as 
        follows:- <br/>
       `

    }
}