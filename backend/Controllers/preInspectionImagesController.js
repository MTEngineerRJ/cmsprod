const db = require("../Config/dbConfig");
const { logMessage } = require("../utils/LoggerFile");

const getPreInspectionImages = (req, res) => {
  const leadId = req.params.leadId;
  const sql = "SELECT * FROM ReportImage WHERE LeadID = ?";
  db.query(sql, [leadId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
};

const updateReportImages = async (req, res) => {
  const newData = req.body.newData;
  const updateData = req.body.updateData;
  const leadId = req.params.leadId;
  const Username = req.body.Username;

  // Step 1: Set IsShow = 0 for all rows for this LeadID
  const setAllToZeroQuery = `
    UPDATE ReportImage
    SET IsShow = 0,
    SeqNo = 0
    WHERE LeadID = ${parseInt(leadId)};
  `;

  db.query(setAllToZeroQuery, (err,result) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPLOADING_INSPECTION_REPORT_DOCUMENT`,
        message: `Got error while setting IsShow = 0 for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while setting IsShow = 0 for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${err.details}, STATUS : ${`${err.status} ${err.message}`},query:${setAllToZeroQuery}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Error while setting IsShow = 0 for report images.");
      return;
    }

    console.log("allSet-->0",result);

    // Step 2: Update the existing data in updateData (set IsShow = 1 for passed FileIDs)
    updateData.forEach((row) => {
      const updateQuery = `
      UPDATE ReportImage
      SET
        FileName = '${row.filename}',
        FileUrl = '${row.fileurl}',
        SeqNo = '${parseInt(row.seqNo)}',
        IsShow = '1'
      WHERE
        FileID = ${parseInt(row.fileId)} AND LeadID = ${parseInt(leadId)};
    `;
      db.query(updateQuery, (err) => {
        if (err) {
          logMessage({
            type: "error",
            Function: `UPLOADING_INSPECTION_REPORT_DOCUMENT`,
            message: `Got error while updating the DOCUMENTS for the Inspection_report for leadId --> ${leadId}`,
            username: Username,
            leadId: leadId,
            consoleInfo: `Got error while updating the DOCUMENTS for the Inspection_report for leadId --> ${leadId}`,
            info: `{ERRMESSAGE : ${err.details}, STATUS : ${`${err.status} ${err.message}`},query:${updateQuery}, error : ${err}}}`,
          });
          console.error(err);
          res.status(500).send("Error while updating report images.");
          return;
        }
      });
    });

    // Step 3: Insert the new data from newData
    newData.forEach((row) => {
      const insertQuery = `
        INSERT INTO ReportImage (
          FileName,
          FileUrl,
          SeqNo,
          IsShow,
          LeadID
        ) VALUES (
          '${row.filename}',
          '${row.fileurl}',
          '${parseInt(row.seqNo)}',
          '1',
          '${parseInt(leadId)}'
        );
      `;
      db.query(insertQuery, (err) => {
        if (err) {
          logMessage({
            type: "error",
            Function: `UPLOADING_INSPECTION_REPORT_DOCUMENT`,
            message: `Got error while inserting the DOCUMENTS for the Inspection_report for leadId --> ${leadId}`,
            username: Username,
            leadId: leadId,
            consoleInfo: `Got error while inserting the DOCUMENTS for the Inspection_report for leadId --> ${leadId}`,
            info: `{ERRMESSAGE : ${err.details}, STATUS : ${`${err.status} ${err.message}`},query:${insertQuery}, error : ${err}}}`,
          });
          console.error(err);
          res.status(500).send("Error while inserting report images.");
          return;
        }
      });
    });

    // Log success message after updates and inserts
    logMessage({
      type: "info",
      Function: `UPLOADING_INSPECTION_REPORT_DOCUMENT`,
      message: `Successfully updated the INSPECTION report documents for leadId --> ${leadId}`,
      username: Username,
      leadId: leadId,
      consoleInfo: `Successfully updated the INSPECTION report documents for leadId --> ${leadId}`,
      info: `{message : 200 SUCCESS }`,
    });

    res.status(200).send("Successfully updated!");
  });
};




module.exports = { getPreInspectionImages, updateReportImages };
