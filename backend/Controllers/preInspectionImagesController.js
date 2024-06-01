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

  newData.map((row, index) => {
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
              '${1}',
              '${parseInt(leadId)}'
            );
          `;
    db.query(insertQuery, (err, result) => {
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
        res
          .status(500)
          .send(
            "Error while inserting report images for preInspection Report."
          );
        return;
      }
    });
  });

  updateData.map((row, index) => {
    const updateQuery = `
    UPDATE ReportImage
    SET
      FileName = '${row.filename}',
      FileUrl = '${row.fileurl}',
      SeqNo = '${parseInt(row.seqNo)}',
      IsShow = '${1}'
    WHERE
      FileID = ${parseInt(row.fileId)} AND LeadID = ${parseInt(leadId)};
  `;
    db.query(updateQuery, (err, result) => {
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
        res
          .status(500)
          .send(
            "Error while inserting report images for preInspection Report."
          );
        return;
      }
    });
  });

  logMessage({
    type: "info",
    Function: `UPLOADING_INSPECTION_REPORT_DOCUMENT`,
    message: `Successfully uploaded the INSPECTION report documents for leadId --> ${leadId}`,
    username: Username,
    leadId: leadId,
    consoleInfo:`Successfully uploaded the INSPECTION report documents for leadId --> ${leadId}`,
    info: `{message : 200 SUCCESS }`,
  });

  res.status(200).send("Successfully updated!");
};

module.exports = { getPreInspectionImages, updateReportImages };
