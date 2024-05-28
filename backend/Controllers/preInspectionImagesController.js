const db = require("../Config/dbConfig");

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
      console.log("insertQuery",insertQuery);
    db.query(insertQuery, (err, result) => {
      if (err) {
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
  console.log("updateQuery",updateQuery);
    db.query(updateQuery, (err, result) => {
      if (err) {
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

  res.status(200).send("Successfully updated!");
};

module.exports = { getPreInspectionImages, updateReportImages };
