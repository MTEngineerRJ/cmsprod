const db = require("../Config/dbConfig");
const axios = require("axios");
const convertObjectToString = require("../Config/getObjectToString");
const { formatDate } = require("../Config/getFormattedDate");
const { breakString } = require("../Config/splitBase");
const { logMessage } = require("../utils/LoggerFile");

const getSpecificDriverDetails = async (req, res) => {
  const leadId = req.query.LeadId;

  const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  };

  try {
    const driverDetails = await executeQuery(
      "SELECT * FROM DriverDetails WHERE LeadId=?",
      [leadId]
    );

    const combinedResult = {
      driverDetails,
    };

    res.json(combinedResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

function arrayToCSV(array) {
  return array.join(',') + '';
}

const getOnlineDriverDetails = (req, res) => {
  const dl_number = req.query.dl_number;
  const dob = req.query.dob;
  const leadId = req.query.leadId;
  const Username = req.query.Username;

  const payload = {
    id_number: dl_number,
    dob: dob,
  };

  axios
    .post(
      "https://kyc-api.surepass.io/api/v1/driving-license/driving-license",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.SUREPASS_AUTHORIZATION_TOKEN}`,
        },
      }
    )
    .then((result) => {
      const details = result?.data?.data;

      if (!details) {
        logMessage({
          type: "warn",
          Function: "FETCHING_ONLINE_DRIVER_DETAILS",
          message: `Got No response while fetching driver details for LeadId --> ${leadId}`,
          username: Username,
          leadId: leadId,
          consoleInfo: `Check for the issue as doesn't fetched the Information for mentioned DrivingLicenseNo ${dl_number}, DOB: ${dob} on LeadId --> ${leadId}`,
          info: `{ERRMESSAGE: ${result}, STATUS: ${`400 || 500 `}}`,
        });
        return res.status(500).send("Internal Server Error");
      }

      const formattedDateOfbirth = formatDate(details?.dob);
      const formattedDateOfIssue = formatDate(details?.doi);
      const formattedValidupto = formatDate(details?.doe);
      const formattedPhoto = details?.profile_image;
      const formattedSign = breakString(details?.sign);
      const updatedLicenseType = arrayToCSV(details?.vehicle_classes);
      const stringformat = convertObjectToString(details);

      const insertDriverDetails = `
        INSERT INTO DriverDetailsOnline (
          LicenseNumber,
          DriverName,  
          Photo,     
          ValidUpto,      
          ValidFrom,     
          Address,         
          IssuingAuthority, 
          BloodGroup,     
          Gender,         
          FatherName,    
          DateOfBirth,   
          DateOfIssue,  
          ApiResponse,
          TypeOfVerification,
          DLStatus, 
          Remark,
          LicenseType,    
          LeadID
        )
        VALUES (
          '${details?.license_number}',
          '${details?.name}',
          '${formattedPhoto}',
          '${formattedValidupto}',
          '${formattedDateOfIssue}',
          '${details?.permanent_address},${details?.state}-${details?.permanent_zip}',
          '${details?.ola_name} , ${details?.ola_code}',
          '${details?.blood_group}',
          '${details?.gender}',
          '${details?.father_or_husband_name}',
          '${formattedDateOfbirth}',
          '${formattedDateOfIssue}',
          '${stringformat}',
          "Online",
          '${details?.current_status}',
          '${"Verified from Online"}',
          '${updatedLicenseType}',
          '${leadId}'
        );
      `;

      const updateDriverQuery = `
        UPDATE DriverDetails
        SET
          LicenseNumber = '${details?.license_number}',
          DriverName = '${details?.name}',
          Photo = '${formattedPhoto}',
          ValidUpto = '${formattedValidupto}',
          ValidFrom = '${formattedDateOfIssue}',
          Address = '${details?.permanent_address},${details?.state}-${details?.permanent_zip}',
          IssuingAuthority = '${details?.ola_name} , ${details?.ola_code}',
          BloodGroup = '${details?.blood_group}',
          Gender = '${details?.gender}',
          FatherName = '${details?.father_or_husband_name}',
          DateOfBirth = '${formattedDateOfbirth}',
          DateOfIssue = '${formattedDateOfIssue}',
          TypeOfVerification = 'Online',
          DLStatus = '${details?.current_status}',
          LicenseType = '${updatedLicenseType}',
          Remark='${"Verified from Online"}'
        WHERE
          LeadID = ${leadId};
      `;

      db.getConnection((err, connection) => {
        if (err) {
          logMessage({
            type: "error",
            Function: "FETCHING_ONLINE_DRIVER_DETAILS",
            message: `Got error while getting the database connection.`,
            username: Username,
            leadId: leadId,
            consoleInfo: `${err.status} ${err.details}`,
            info: `{ERRMESSAGE : ${err.details}, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
          });
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }

        connection.beginTransaction((err) => {
          if (err) {
            logMessage({
              type: "error",
              Function: "FETCHING_ONLINE_DRIVER_DETAILS",
              message: `Got error while starting the TRANSACTION for fetching online driver details and updating the database.`,
              username: Username,
              leadId: leadId,
              consoleInfo: `${err.status} ${err.details}`,
              info: `{ERRMESSAGE : ${err.details}, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
            });
            console.error(err);
            connection.release();
            return res.status(500).send("Internal Server Error");
          }

          connection.query("DELETE FROM DriverDetailsOnline WHERE LeadID=?", [leadId], (err, results) => {
            if (err) {
              logMessage({
                type: "error",
                Function: "FETCHING_ONLINE_DRIVER_DETAILS",
                message: `Got error while deleting existing driver details for LeadId --> ${leadId}`,
                username: Username,
                leadId: leadId,
                consoleInfo: `${err.status} ${err.details}`,
                info: `{ERRMESSAGE : ${err.details}, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
              });
              console.error(err);
              return connection.rollback(() => {
                connection.release();
                res.status(500).send("Internal Server Error");
              });
            }

            connection.query(insertDriverDetails, (err, results) => {
              if (err) {
                logMessage({
                  type: "error",
                  Function: "FETCHING_ONLINE_DRIVER_DETAILS",
                  message: `Got error while inserting new driver ONLINE details for LeadId --> ${leadId}`,
                  username: Username,
                  leadId: leadId,
                  consoleInfo: `${err.status} ${err.details}`,
                  info: `{ERRMESSAGE : ${err.details}, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
                });
                console.error(err);
                return connection.rollback(() => {
                  connection.release();
                  res.status(500).send("Internal Server Error");
                });
              }

              connection.query(updateDriverQuery, (err, results) => {
                if (err) {
                  logMessage({
                    type: "error",
                    Function: "FETCHING_ONLINE_DRIVER_DETAILS",
                    message: `Got error while updating driver details for LeadId --> ${leadId}`,
                    username: Username,
                    leadId: leadId,
                    consoleInfo: `${err.status} ${err.details}`,
                    info: `{ERRMESSAGE : ${err.details}, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
                  });
                  console.error(err);
                  return connection.rollback(() => {
                    connection.release();
                    res.status(500).send("Internal Server Error");
                  });
                }

                connection.commit((err) => {
                  if (err) {
                    logMessage({
                      type: "error",
                      Function: "FETCHING_ONLINE_DRIVER_DETAILS",
                      message: `Got error while committing the TRANSACTION for fetching and updating driver details dL_nUMBER : ${dl_number} , DOB : ${dob}.`,
                      username: Username,
                      leadId: leadId,
                      consoleInfo: `${err.status} ${err.details}`,
                      info: `{ERRMESSAGE : ${err.details}, STATUS : ${`${err.status} ${err.message}`}, error : ${err}}}`,
                    });
                    console.error(err);
                    return connection.rollback(() => {
                      connection.release();
                      res.status(500).send("Internal Server Error");
                    });
                  }

                  logMessage({
                    type: "info",
                    Function: "FETCHING_ONLINE_DRIVER_DETAILS",
                    message: `Transaction for updating and fetching driver details online has been successfully committed.`,
                    username: Username,
                    leadId: leadId,
                    consoleInfo: `200 OK`,
                    info: `Transaction for updating and fetching driver details online has been successfully committed.`,
                  });

                  connection.release();
                  res.status(200).json({ message: "Data updated successfully." });
                });
              });
            });
          });
        });
      });
    })
    .catch((error) => {
      logMessage({
        type: "error",
        Function: "FETCHING_ONLINE_DRIVER_DETAILS",
        message: `Error while fetching driving details online: ${error.message}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `${error.status} ${error.details}`,
        info: `{ERRMESSAGE : ${error.message}, STATUS : ${`${error.status} ${error.message}`}, error : ${error}}}`,
      });
      console.error(error);
      res.status(500).send("Record Not Found!");
    });
};


module.exports = {
  getOnlineDriverDetails,
  getSpecificDriverDetails,
};
