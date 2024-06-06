const db = require("../Config/dbConfig");
const { JSDOM } = require("jsdom");
const emailHandler = require("../Config/getEmailContent");

const dotenv = require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const generateUniqueToken = require("../Config/generateToken");
const createToken = require("../Config/generateJWTToken");
const { splitStringToArray } = require("../Config/getStringFromCSV");
const { csvStringToArray } = require("../Config/getArrayFromCSVString");
const { logMessage } = require("../utils/LoggerFile");

function convertToDDMMYYYY(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

const sendEmail1 = (req, res) => {
  const {
    vehicleNo,
    PolicyNo,
    Insured,
    Date,
    leadId,
    toMail,
    type,
    BrokerMailAddress,
    GarageMailAddress,
    Region,
    InspectionType,
  } = req.body;

  if (leadId === undefined || !leadId) {
    logMessage({
      type: "warn",
      Function: "SENDING_ADD_CLAIM_MAIL",
      message: `Not able to send mail as LeadId is MISSING..`,
      username: "",
      leadId: leadId,
      consoleInfo: `Not able to send mail as LeadId is MISSING..`,
      info: `{ERRMESSAGE: ${result}, STATUS: ${`400 || 500 `}}`,
    });
    res.status(400).send("LeadId is empty");
    return;
  }

  const sql = "SELECT * FROM ClaimStatus WHERE LeadId =?";
  db.query(sql, [leadId], (err, result) => {
    if (err) {
      logMessage({
        type: "error",
        Function: "SENDING_ADD_CLAIM_MAIL",
        message: `Got error while fetching the Claim Status for leadId --> ${leadId}`,
        username: "",
        leadId: leadId,
        consoleInfo: `${err.status} ${err.details}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const content = emailHandler(result[0]?.Status,InspectionType);

    const InsuredToken = generateUniqueToken();
    const ImageToken = generateUniqueToken();
    const VideoToken = generateUniqueToken();

    const insertClaimDetails = `
          UPDATE ClaimDetails
          SET
          InsuredToken = '${InsuredToken}',
          ImageToken ='${ImageToken}',
          VideoToken ='${VideoToken}'
          WHERE LeadId = ${leadId};
        `;

    db.query(insertClaimDetails, (err, result2) => {
      if (err) {
        logMessage({
          type: "error",
          Function: "SENDING_ADD_CLAIM_MAIL",
          message: `Got error while updating the tokens for the specific claim  of leadId --> ${leadId}`,
          username: "",
          leadId: leadId,
          consoleInfo: `Got error while updating the tokens for the specific claim  of leadId --> ${leadId}`,
          info: `{ERRMESSAGE : ${
            err.details
          }, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
        });
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const emailContent = `
      Dear Sir/Madam,<br/>
  
      Greeting from the MT Engineers Legal Investigator Pvt. Ltd., <br/>
  
      ${
        !String(InspectionType).toLowerCase().includes("pre-inspection")
          ? `We are Appointed for the survey of vehicle no.${vehicleNo}, <br/>
      Insured:${Insured} & Policy No.-${PolicyNo} on ${convertToDDMMYYYY(Date)} <br/>
      from the United India Insurance co. Ltd. So we request <br/>
      you please provide the complete contact deatils & mails of Repairer/insured.<br/>
      So that we  can procedd further in your case and we also request <br/>
      you to provide the following details as follows:-`
          : ` We have request for the Pre Inspection of vehicle no :- ${vehicleNo ? vehicleNo : "A/c"} 
       on ${convertToDDMMYYYY(Date)} .So please provide the document mentioned 
      below and photographs of said vehicle So that we can 
      proceed further in your case as follows:-`
      }
      <br/>
      <strong> ${content} </strong>

      Please provide the clear copy of all the documents so that  <br/>
      the claim processing can be fast or <br/>
      <p><a href=https://cmsprod.vercel.app/${
        String(InspectionType).toLowerCase().includes("pre-inspection")
          ? "inspection-documents"
          : "documents"
      }/${leadId}?token=${InsuredToken}&type=${1}&content=${
    String(InspectionType).toLowerCase().includes("pre-inspection")
      ? "Certificate%20of%20registration%2CAadhar%20card%2CInsurance%20policy%2CVehicle%20photographs%2Fvideo%2CSignature"
      : ""
  } target="_blank">Click Here</a> to fill the documents information .</p> <br/>

  ${
    String(InspectionType).toLowerCase().includes("pre-inspection")
      ? ""
      : `Please provide the clear Vahicle Videos so that the claim <br/>
      processing can be fast or <br/>
      <p><a href=https://cmsprod.vercel.app/documents/${leadId}?token=${ImageToken}&type=${2}&content=${"Images"} target="_blank">Click Here</a> to fill the documents information .</p> <br/>`
  }

      Please provide the  all the clear Images of the Vehicle so  <br/>
      that the claim processing can be fast or <br/>
      <p><a href=https://cmsprod.vercel.app/documents/${leadId}?token=${VideoToken}&type=${3}&content=${"Videos"} target="_blank">Click Here</a> to fill the documents information .</p> <br/>

    ${String(InspectionType).toLowerCase().includes("pre-inspection")
    ? "" :`Note:- <strong> If We Cannot get the response with in 02 days we will inform the insurer that the insured <br/>
    is not interseted in the claim. So close the file as"No Claim" in non copperation & non submission of the documents. </strong> <br/>`}

  `;

  const currentMailAddress = String(InspectionType)
  .toLowerCase()
  .includes("pre-inspection")
  ? process.env.NODEMAILER_PI_EMAIL
  : Region === "Delhi"
  ? process.env.NODEMAILER_DELHI_EMAIL
  : Region === "Jodhpur"
  ? process.env.NODEMAILER_JODHPUR_EMAIL
  : Region === "Jaipur"
  ? process.env.NODEMAILER_JAIPUR_EMAIL
  : Region === "Hero"
  ? process.env.NODEMAILER_HERO_EMAIL
  : process.env.NODEMAILER_CHANDIGARH_EMAIL;
const currentMailAddressPass = String(InspectionType)
  .toLowerCase()
  .includes("pre-inspection")
  ? process.env.NODEMAILER_PI_EMAIL_PASSWORD
  : Region === "Delhi"
  ? process.env.NODEMAILER_DELHI_EMAIL_PASSWORD
  : Region === "Jodhpur"
  ? process.env.NODEMAILER_JODHPUR_EMAIL_PASSWORD
  : Region === "Jaipur"
  ? process.env.NODEMAILER_JAIPUR_EMAIL_PASSWORD
  : Region === "Hero"
  ? process.env.NODEMAILER_HERO_EMAIL_PASSWORD
  : process.env.NODEMAILER_CHANDIGARH_EMAIL_PASSWORD;


      const transporter2 = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: currentMailAddress,
          pass: currentMailAddressPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const ccContent =
        GarageMailAddress && BrokerMailAddress
          ? `${GarageMailAddress},${BrokerMailAddress}`
          : GarageMailAddress
          ? GarageMailAddress
          : BrokerMailAddress;

      const mailOptions = {
        from: currentMailAddress,
        to: toMail,
        cc: ccContent,
        subject:  String(InspectionType)
        .toLowerCase()
        .includes("pre-inspection") ?  `Pre Inspection Request of Vehicle Number - ${vehicleNo ? vehicleNo : "A/c"} ` : `Survey Request for Claim of Vehicle Number - ${vehicleNo} A/c ${
          Insured ? Insured : "N.A."
        }  policy Number - ${PolicyNo}`,
        html: emailContent,
      };
      transporter2.sendMail(mailOptions, (error, info) => {
        if (error) {
          logMessage({
            type: "error",
            Function: "SENDING_ADD_CLAIM_MAIL",
            message: `Got error while sending the MAIL from : ${currentMailAddress} , to : ${toMail} , cc : ${ccContent} for LeadId --> ${leadId}`,
            username: "",
            leadId: leadId,
            consoleInfo: `Got error while sending the MAIL from : ${currentMailAddress} , to : ${toMail} , cc : ${ccContent} for LeadId --> ${leadId}`,
            info: `{ERRMESSAGE : ${
              err.details
            }, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
          });
          console.error(error);
          res.status(500).send("Internal Server Error");
        } else if (String(type) === "1") {
          console.log(type, String(type) === "1");

          const insertClaimDetails = `
            UPDATE ClaimDetails
            SET
            IsMailSent = 1
            WHERE LeadId = ${leadId};
          `;
          db.query(insertClaimDetails, (err, result2) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
              return;
            }
            logMessage({
              type: "info",
              Function: "SENDING_ADD_CLAIM_MAIL",
              message: `Successfully Sent the MAIL from : ${currentMailAddress} , to : ${toMail} , cc : ${ccContent} for LeadId --> ${leadId}`,
              username: "",
              leadId: leadId,
              consoleInfo: `Successfully Sent the MAIL from : ${currentMailAddress} , to : ${toMail} , cc : ${ccContent} for LeadId --> ${leadId}`,
              info: `{message : SUCCESS }`,
            });
            res.status(200).send("Email sent successfully");
          });
        }
      });
    });
  });
};

const acknowledgmentMail = (req, res) => {
  const {
    vehicleNo,
    PolicyNo,
    Insured,
    Date,
    leadId,
    toMail,
    type,
    BrokerMailAddress,
    GarageMailAddress,
    Username,
    inspectionType,
  } = req.body;
  const sql = "SELECT * FROM ClaimStatus WHERE LeadId =?";
  const sql1 = "SELECT Region FROM ClaimDetails WHERE LeadId =?";

  db.query(sql, [leadId], (err, result) => {
    if (err) {
      logMessage({
        type: "error",
        Function: "SENDING_ACKNOWLEDMENT_MAIL",
        message: `Got error while fetching the Claim Status for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `${err.status} ${err.details}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    db.query(sql1, [leadId], (err, resultRegion) => {
      if (err) {
        logMessage({
          type: "error",
          Function: "SENDING_ACKNOWLEDMENT_MAIL",
          message: `Got error while fetching the Region for leadId --> ${leadId}`,
          username: Username,
          leadId: leadId,
          consoleInfo: `${err.status} ${err.details}`,
          info: `{ERRMESSAGE : ${
            err.details
          }, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
        });
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      const content = emailHandler(result[0]?.Status, inspectionType);
      const Region = resultRegion[0]?.Region; // Updated assignment for Region

      const InsuredToken = generateUniqueToken();
      const ImageToken = generateUniqueToken();
      const VideoToken = generateUniqueToken();

      const insertClaimDetails = `
            UPDATE ClaimDetails
            SET
            InsuredToken = '${InsuredToken}',
            ImageToken ='${ImageToken}',
            VideoToken ='${VideoToken}'
            WHERE LeadId = ${leadId};
          `;

      db.query(insertClaimDetails, (err, result2) => {
        if (err) {
          logMessage({
            type: "error",
            Function: "SENDING_ACKNOWLEDMENT_MAIL",
            message: `Got error while updating the tokens for the specific claim  of leadId --> ${leadId}`,
            username: Username,
            leadId: leadId,
            consoleInfo: `Got error while updating the tokens for the specific claim  of leadId --> ${leadId}`,
            info: `{ERRMESSAGE : ${
              err.details
            }, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
          });
          console.error(err);
          res.status(500).send("Internal Server Error");
          return;
        }

        const emailContent = `
            Dear Sir/Madam,<br/>
      
            Greeting from the MT Engineers Legal Investigator Pvt. Ltd., <br/>
      
            ${
              !String(inspectionType).toLowerCase().includes("pre-inspection")
                ? `We are Appointed for the survey of vehicle no.${vehicleNo}, <br/>
            Insured:${Insured} & Policy No.-${PolicyNo} on ${Date} <br/>
            from the United India Insurance co. Ltd. So we request <br/>
            you please provide the complete contact deatils & mails of Repairer/insured.<br/>
            So that we  can procedd further in your case and we also request <br/>
            you to provide the following details as follows:-`
                : ` We have request for the Pre Inspection of vehicle no:- ${vehicleNo ? vehicleNo : "A/c"}
             on ${convertToDDMMYYYY(Date)} .So please provide the document mentioned 
            below and photographs of said vehicle So that we can 
            proceed further in your case as follows:-`
            }
            <br/>

      
            <strong>${content}</strong><br/>
      
            Please provide the clear copy of all the documents so that  <br/>
            the claim processing can be fast or <br/>
            <p><a href=https://cmsprod.vercel.app/${
              String(inspectionType).toLowerCase().includes("pre-inspection")
                ? "inspection-documents"
                : "documents"
            }/${leadId}?token=${InsuredToken}&type=${1}&content=${
          String(inspectionType).toLowerCase().includes("pre-inspection")
            ? "Certificate%20of%20registration%2CAadhar%20card%2CInsurance%20policy%2CDamage%20vehicle%20photographs%2Fvideo%2CSignature"
            : ""
        } target="_blank">Click Here</a> to fill the documents information .</p> <br/>
      
        ${
          String(inspectionType).toLowerCase().includes("pre-inspection")
            ? ""
            : `Please provide the clear Vahicle Videos so that the claim <br/>
            processing can be fast or <br/>
            <p><a href=https://cmsprod.vercel.app/documents/${leadId}?token=${ImageToken}&type=${2}&content=${"Images"} target="_blank">Click Here</a> to fill the documents information .</p> <br/>`
        }
      
            Please provide the  all the clear Images of the Vehicle so  <br/>
            that the claim processing can be fast or <br/>
            <p><a href=https://cmsprod.vercel.app/documents/${leadId}?token=${VideoToken}&type=${3}&content=${"Videos"} target="_blank">Click Here</a> to fill the documents information .</p> <br/>
      
          ${String(inspectionType).toLowerCase().includes("pre-inspection")
          ? ""
          :`Note:- <strong> If We Cannot get the response with in 02 days we will inform the insurer that the insured <br/>
          is not interseted in the claim. So close the file as"No Claim" in non copperation & non submission of the documents. </strong> <br/>`}
      
    `;

        const currentMailAddress = String(inspectionType)
          .toLowerCase()
          .includes("pre-inspection")
          ? process.env.NODEMAILER_PI_EMAIL
          : Region === "Delhi"
          ? process.env.NODEMAILER_DELHI_EMAIL
          : Region === "Jodhpur"
          ? process.env.NODEMAILER_JODHPUR_EMAIL
          : Region === "Jaipur"
          ? process.env.NODEMAILER_JAIPUR_EMAIL
          : Region === "Hero"
          ? process.env.NODEMAILER_HERO_EMAIL
          : process.env.NODEMAILER_CHANDIGARH_EMAIL;
        const currentMailAddressPass = String(inspectionType)
          .toLowerCase()
          .includes("pre-inspection")
          ? process.env.NODEMAILER_PI_EMAIL_PASSWORD
          : Region === "Delhi"
          ? process.env.NODEMAILER_DELHI_EMAIL_PASSWORD
          : Region === "Jodhpur"
          ? process.env.NODEMAILER_JODHPUR_EMAIL_PASSWORD
          : Region === "Jaipur"
          ? process.env.NODEMAILER_JAIPUR_EMAIL_PASSWORD
          : Region === "Hero"
          ? process.env.NODEMAILER_HERO_EMAIL_PASSWORD
          : process.env.NODEMAILER_CHANDIGARH_EMAIL_PASSWORD;

        const transporter2 = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: currentMailAddress,
            pass: currentMailAddressPass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const mailOptions = {
          from: currentMailAddress,
          to: toMail,
          cc: `${GarageMailAddress},${BrokerMailAddress}`,
          subject: String(inspectionType)
          .toLowerCase()
          .includes("pre-inspection") ?  `Pre Inspection Request of Vehicle Number - ${vehicleNo?vehicleNo: "A/c"}` : `Survey Request for Claim of Vehicle Number - ${vehicleNo} A/c ${
            Insured ? Insured : "N.A."
          }  policy Number - ${PolicyNo}`,
          html: emailContent,
        };

        transporter2.sendMail(mailOptions, (error, info) => {
          if (error) {
            logMessage({
              type: "error",
              Function: "SENDING_ACKNOWLEDMENT_MAIL",
              message: `Got error while sending the MAIL from : ${currentMailAddress} , to : ${toMail} , cc : ${`${GarageMailAddress},${BrokerMailAddress}`} for LeadId --> ${leadId}`,
              username: Username,
              leadId: leadId,
              consoleInfo: `Got error while sending the MAIL from : ${currentMailAddress} , to : ${toMail} , cc : ${`${GarageMailAddress},${BrokerMailAddress}`} for LeadId --> ${leadId}`,
              info: `{ERRMESSAGE : ${
                error.details
              }, STATUS : ${`${error.status} ${error.message}`}, error : ${error}}}`,
            });
            console.error(error);
            res.status(500).send("Internal Server Error");
          }
          const insertStatusDetails = `
              UPDATE ClaimDetails
              SET
              IsMailSent = 1
              WHERE LeadId = ${leadId};
            `;

          db.query(insertStatusDetails, (err, result2) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
              return;
            }
            logMessage({
              type: "info",
              Function: "SENDING_ACKNOWLEDMENT_MAIL",
              message: `Successfully Sent the MAIL from : ${currentMailAddress} , to : ${toMail} , cc : ${`${GarageMailAddress},${BrokerMailAddress}`} for LeadId --> ${leadId}`,
              username: Username,
              leadId: leadId,
              consoleInfo: `Successfully Sent the MAIL from : ${currentMailAddress} , to : ${toMail} , cc : ${`${GarageMailAddress},${BrokerMailAddress}`} for LeadId --> ${leadId}`,
              info: `{message : SUCCESS }`,
            });
            res.status(200).send("Email sent successfully");
          });
        });
      });
    });
  });
};

const sendCustomEmail = (req, res) => {
  const {
    vehicleNo,
    PolicyNo,
    Insured,
    Date,
    content,
    content2,
    leadId,
    toMail,
    fromEmail,
    subject,
    body,
    Region,
    isPreInspection,
    Username,
  } = req.body;

  if (leadId === undefined || !leadId) {
    logMessage({
      type: "warn",
      Function: "SENDING_CUSTOM_MAIL",
      message: `Not able to send mail as LeadId is MISSING..`,
      username: "",
      leadId: leadId,
      consoleInfo: `Not able to send mail as LeadId is MISSING..`,
      info: `{ERRMESSAGE: ${result}, STATUS: ${`400 || 500 `}}`,
    });
    res.status(400).send("LeadId is empty");
    return;
  }

  const emailArray = csvStringToArray(toMail);

  const sql = "SELECT Token FROM ClaimDetails WHERE LeadId =?";
  db.query(sql, [leadId], (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: "SENDING_CUSTOM_MAIL",
        message: `Got error while fetching the Claim Status for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `${err.status} ${err.details}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (!result2[0]?.Token) {
      const generatedToken = generateUniqueToken();
      const insertClaimDetails = `
        UPDATE ClaimDetails
        SET
        InsuredToken = '${generatedToken}'
        WHERE LeadId = ${leadId};
      `;
      db.query(insertClaimDetails, (err, result2) => {
        if (err) {
          logMessage({
            type: "error",
            Function: "SENDING_CUSTOM_MAIL",
            message: `Got error while updating the tokens for the specific claim  of leadId --> ${leadId}`,
            username: Username,
            leadId: leadId,
            consoleInfo: `Got error while updating the tokens for the specific claim  of leadId --> ${leadId}`,
            info: `{ERRMESSAGE : ${
              err.details
            }, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
          });
          console.error(err);
          res.status(500).send("Internal Server Error");
          return;
        }

        const emailContent = `
          ${body}
          <br/>
  
          <strong>${content}</strong>

          <br/>
    
          Please provide the clear copy of all the documents so that
          the claim processing can be fast or
          <p><a href=https://cmsprod.vercel.app/documents/${leadId}?token=${generatedToken}&type=${1}&content=${encodeURIComponent(
          content2
        )} target="_blank">Click Here</a> to fill the documents information .</p>
    
          <br/>
          ${isPreInspection ? "" : ` Note:- 
            <strong>If We Cannot get the response with in 02 days we will 
              inform the insurer that the insured is not interseted in the claim. 
              So close the file as"No Claim" in non copperation & non submission
              of the documents. </strong>`}
          
        `;

        const mainEmail = emailArray.length > 0 ? emailArray[0] : "";
        const ccArray =
          emailArray.length > 2
            ? `${emailArray[1]},${emailArray[2]}`
            : emailArray.length > 1
            ? `${emailArray[1]}`
            : "";

        if (mainEmail) {
          const mailOptions = {
            from: fromEmail,
            to: mainEmail,
            cc: ccArray,
            subject: isPreInspection ? `Pre Inspection Request of Vehicle Number - ${vehicleNo?vehicleNo : "A/c"} ` : subject,
            html: emailContent,
          };

          const currentMailAddress =
          isPreInspection
          ? process.env.NODEMAILER_PI_EMAIL
          :
            Region === "Delhi"
              ? process.env.NODEMAILER_DELHI_EMAIL
              : Region === "Jodhpur"
              ? process.env.NODEMAILER_JODHPUR_EMAIL
              : Region === "Jaipur"
              ? process.env.NODEMAILER_JAIPUR_EMAIL
              : Region === "Hero"
              ? process.env.NODEMAILER_HERO_EMAIL
              : process.env.NODEMAILER_CHANDIGARH_EMAIL;
          const currentMailAddressPass =
          isPreInspection
          ? process.env.NODEMAILER_PI_EMAIL_PASSWORD
          :
            Region === "Delhi"
              ? process.env.NODEMAILER_DELHI_EMAIL_PASSWORD
              : Region === "Jodhpur"
              ? process.env.NODEMAILER_JODHPUR_EMAIL_PASSWORD
              : Region === "Jaipur"
              ? process.env.NODEMAILER_JAIPUR_EMAIL_PASSWORD
              : Region === "Hero"
              ? process.env.NODEMAILER_HERO_EMAIL_PASSWORD
              : process.env.NODEMAILER_CHANDIGARH_EMAIL_PASSWORD;

          const transporter2 = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: currentMailAddress,
              pass: currentMailAddressPass,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          transporter2.sendMail(mailOptions, (error, info) => {
            if (error) {
              logMessage({
                type: "error",
                Function: "SENDING_CUSTOM_MAIL",
                message: `Got error while sending the MAIL from : ${fromEmail} , to : ${mainEmail} , cc : ${ccArray} for LeadId --> ${leadId}`,
                username: Username,
                leadId: leadId,
                consoleInfo: `Got error while sending the MAIL from : ${fromEmail} , to : ${mainEmail} , cc : ${ccArray} for LeadId --> ${leadId}`,
                info: `{ERRMESSAGE : ${
                  error.details
                }, STATUS : ${`${error.status} ${error.message}`}, error : ${error}}}`,
              });
              console.error(error);
              res.status(500).send("Internal Server Error");
            } else {
              logMessage({
                type: "info",
                Function: "SENDING_CUSTOM_MAIL",
                message: `Successfully Sent the MAIL from : ${fromEmail} , to : ${mainEmail} , cc : ${ccArray} for LeadId --> ${leadId}`,
                username: Username,
                leadId: leadId,
                consoleInfo: `Successfully Sent the MAIL from : ${fromEmail} , to : ${mainEmail} , cc : ${ccArray} for LeadId --> ${leadId}`,
                info: `{message : SUCCESS }`,
              });
              res.status(200).send("Email sent successfully");
            }
          });
        }
      });
    } else {
      const emailContent = `
        ${body}
        <br/>
  
        <strong>${content}</strong>

        <br/>
  
        Please provide the clear copy of all the documents so that
         the claim processing can be fast or
        <br/>

        <p><a href=https://cmsprod.vercel.app/documents/${leadId}?token=${
        result2[0].Token
      }&type=${1}&content=${encodeURIComponent(
        content2
      )} target="_blank">Click Here</a> to fill the documents information .</p>
  
        <br/>

        ${isPreInspection ? "" : ` Note:- 
            <strong>If We Cannot get the response with in 02 days we will 
              inform the insurer that the insured is not interseted in the claim. 
              So close the file as"No Claim" in non copperation & non submission
              of the documents. </strong>`}
  
      `;

      emailArray.map((email, index) => {
        const mailOptions = {
          from: fromEmail,
          to: email,
          subject: isPreInspection ? `Pre Inspection Request of Vehicle Number - ${vehicleNo?vehicleNo:"A/c"}` : subject,
          html: emailContent,
        };

        const currentMailAddress =
        isPreInspection
          ? process.env.NODEMAILER_PI_EMAIL
          :
          Region === "Delhi"
            ? process.env.NODEMAILER_DELHI_EMAIL
            : Region === "Jodhpur"
            ? process.env.NODEMAILER_JODHPUR_EMAIL
            : Region === "Jaipur"
            ? process.env.NODEMAILER_JAIPUR_EMAIL
            : Region === "Hero"
            ? process.env.NODEMAILER_HERO_EMAIL
            : process.env.NODEMAILER_CHANDIGARH_EMAIL;
        const currentMailAddressPass =
        isPreInspection
          ? process.env.NODEMAILER_PI_EMAIL_PASSWORD
          :
          Region === "Delhi"
            ? process.env.NODEMAILER_DELHI_EMAIL_PASSWORD
            : Region === "Jodhpur"
            ? process.env.NODEMAILER_JODHPUR_EMAIL_PASSWORD
            : Region === "Jaipur"
            ? process.env.NODEMAILER_JAIPUR_EMAIL_PASSWORD
            : Region === "Hero"
            ? process.env.NODEMAILER_HERO_EMAIL_PASSWORD
            : process.env.NODEMAILER_CHANDIGARH_EMAIL_PASSWORD;

        const transporter2 = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: currentMailAddress,
            pass: currentMailAddressPass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        transporter2.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully");
          }
        });
      });
    }
  });
};

const sendEmail2 = (req, res) => {
  //garage email
  const { vehicleNo, PolicyNo, Insured, toMail, Date, leadId } = req.body;

  const generatedToken = generateUniqueToken();

  const emailContent = `
      Dear Sir/Madam,<br/>
  
      Greeting from the MT Engineers Legal Investigator Pvt. Ltd.,
  
        We are Appointed for the survey of vehicle no.-${vehicleNo},
       Insured:-${Insured} & Policy No.-${PolicyNo} on ${Date} and 
       the approval is as follows:-<br/>
       <br/>
       Parts<br/>
       1) Fr Bumper- New Allowed<br/>
       2) FR Grill- New Allowed<br/>
       3) LH Head LIght- new Allowed<br/>
       4) LH Fender0- Repair Allowed<br/>
       <br/>
       Labour<br/>
       1) Fr Bumper- R/R-150, Painting-2500<br/>
       2) LH Head Light- R/R-100<br/>
       3) LH Fender- Denting-250, Painting-2200 <br/>
       
       Further approval will be provided after dismentaling of the vehicle.
           <p><a href=https://cmsprod.vercel.app/documents/${leadId}?token=${generatedToken}&content=${""} target="_blank">Click Here</a> to fill the documents information .</p>
  
       Note:- Pleasae consider that the the claim is payable  subject to 
        policy terms & conditions & Cashless facility will be allowed 
        Subject to all the documents get verified from online. 
        It is for your information please.
    `;

  const mailOptions = {
    from: "infosticstech@gmail.com",
    to: toMail,
    subject: "Survey Request for Vehicle Claim",
    html: emailContent,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
};

const sendEmail3 = (req, res) => {
  //
  const { vehicleNo, PolicyNo, Insured, toMail, Date, leadId } = req.body;

  const generatedToken = generateUniqueToken();

  const emailContent = `
      Dear Sir/Madam,<br/>
  
      Greeting from the MT Engineers Legal Investigator Pvt. Ltd.,
  
      We are Appointed for the survey of vehicle no.-${vehicleNo}, Insured:-${Insured} & Policy No.-${PolicyNo} on ${Date} and the approval
      is as follows:- <br/>
        1) What is the Status of the said vheicle
        2) How much time it will take to repair the vehicle
        3) Please provide UR & RI Snaps
        4) Invoice Bill duly signed & stamped of dealer
        5) Payment receipt duly signed & stamped of dealer
        6) Previous Year Policy
        7) Pan Card
        8) Please destorey the items properly in the RI, Otherwise we will treat the part is repaired

        <p><a href=https://cmsprod.vercel.app/documents/${leadId}?token=${generatedToken}&content=${""} target="_blank">Click Here</a> to fill the documents information .</p>
  
          
        Please provide the clear copy of all the documents so that the claim processing can be fast
    
    Note:- If We Cannot get the response with in 01 day we will inform the insurer that the insured is not interseted in the
            claim. So close the file as"No Claim" in non copperation & non submission of the documents. 
    `;

  const mailOptions = {
    from: "infosticstech@gmail.com",
    to: toMail,
    subject: "Survey Request for Vehicle Claim",
    html: emailContent,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
};

module.exports = {
  sendEmail1,
  sendEmail2,
  sendEmail3,
  sendCustomEmail,
  acknowledgmentMail,
};
