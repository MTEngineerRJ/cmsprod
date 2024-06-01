 
const db = require("../Config/dbConfig");
const { logMessage } = require("../utils/LoggerFile");
const { getStatusMapped } = require("../utils/getStatusName");

 const getStatus = (req, res) => {
    const leadId = req.query.LeadId;
    const sql = "SELECT * FROM ClaimStatus WHERE LeadId = ?";
    db.query(sql,[leadId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send(result);
    });
  };

  const updateStatus = (req, res) => {
    const { LeadId, Status, Username, subStage } = req.body;
    const NewStatus = Number(Status) < 1 ? 1 : Number(Status);
  
    const sql = "SELECT * FROM ClaimStatus WHERE LeadId = ?";
    db.query(sql, [LeadId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!result.length) {
        res.status(404).send("LeadId not found");
        return;
      }
      const oldStatus = getStatusMapped(result[0].Status);
      const currentStatus = getStatusMapped(Status);
      const statusDetails = `
        UPDATE ClaimStatus
        SET
        Status = '${NewStatus}',
        SubStatus = '${1}'
        WHERE LeadId = ${LeadId};
      `;
  
      db.query(statusDetails, (err, result) => {
        if (err) {
          logMessage({
            type: "error",
            Function: "UPDATING_CLAIM_STATUS",
            message: `Got Error while updating Status of Claim Details of LeadID ${LeadId} from ${oldStatus} -> ${currentStatus}`,
            username: Username,
            leadId: LeadId,
            consoleInfo: `${err.status} ${err.details}`,
            info: `{ERRMESSAGE : ${err.details},STATUS : ${`${err.status} ${err.message}`}}`,
          });
          console.error(err);
          res.status(500).send("Internal Server Error");
          return;
        }
  
        if ((String(currentStatus).toLowerCase().includes("withdrawal") || String(currentStatus).toLowerCase().includes("more info required")) &&
          (!String(oldStatus).toLowerCase().includes("withdrawal") && !String(oldStatus).toLowerCase().includes("more info required"))) {
          logMessage({
            type: "debug",
            Function: "UPDATING_CLAIM_STATUS",
            message: `This last update of status was from ${oldStatus} ---> ${currentStatus} for LeadId ${LeadId}`,
            username: Username,
            leadId: LeadId,
            consoleInfo: `Status Updated to ${currentStatus} from ${oldStatus}, LeadID -- ${LeadId} (PLEASE CHECK THIS UPDATION).`,
            info: `Status Updated to ${currentStatus} from ${oldStatus}, LeadID -- ${LeadId} (PLEASE CHECK THIS UPDATION).`,
          });
        }
  
        if (!(String(currentStatus).toLowerCase().includes("withdrawal") && !String(currentStatus).toLowerCase().includes("more info required")) &&
          (String(oldStatus).toLowerCase().includes("withdrawal") || String(oldStatus).toLowerCase().includes("more info required"))) {
          logMessage({
            type: "debug",
            Function: "UPDATING_CLAIM_STATUS",
            message: `This last update of status was from ${oldStatus} ---> ${currentStatus} for LeadId ${LeadId}`,
            username: Username,
            leadId: LeadId,
            consoleInfo: `Status Updated to ${currentStatus} from ${oldStatus}, LeadID -- ${LeadId} (PLEASE CHECK THIS UPDATION).`,
            info: `Status Updated to ${currentStatus} from ${oldStatus}, LeadID -- ${LeadId} (PLEASE CHECK THIS UPDATION).`,
          });
        }
  
        logMessage({
          type: "info",
          Function: "UPDATING_CLAIM_STATUS",
          message: `This last update of status was from ${oldStatus} ---> ${currentStatus} for LeadId ${LeadId}`,
          username: Username,
          leadId: LeadId,
          consoleInfo: `Status Updated to ${currentStatus} from ${oldStatus}, LeadID -- ${LeadId} (PLEASE CHECK THIS UPDATION).`,
          info: `Status Updated to ${currentStatus} from ${oldStatus}, LeadID -- ${LeadId} (PLEASE CHECK THIS UPDATION).`,
        });
  
        res.send(result);
      });
    });
  };
  
  

  module.exports={getStatus,updateStatus}