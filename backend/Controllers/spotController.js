const db = require("../Config/dbConfig");
const { logMessage } = require("../utils/LoggerFile");

const getDamageParts = (req, res) => {
  const leadId = req.params.leadId;
  db.query(
    "SELECT * FROM SpotReport WHERE LeadID=?",
    [leadId],
    (err, result2) => {
      if (err) {
        console.log(err);
        console.error(err);
        res.status(500).send("Internal Server Error ");
        return;
      }
      res.status(200).send(result2);
    }
  );
};

const getDamagePartsTypes = (req, res) => {
  db.query(
    "SELECT * FROM SpotReportType ",
    (err, result2) => {
      if (err) {
        console.log(err);
        console.error(err);
        res.status(500).send("Internal Server Error ");
        return;
      }
      res.status(200).send(result2);
    }
  );
};

const updateDamageParts = async (req, res) => {
  try {
    const leadId = req.params.leadId;

    const data = JSON.parse(req.body.allRows);
    let insertCount = 0;
    let updateCount = 0;

    data.map((row, index) => {
      if (row.isActive) {
        const insertQuery = `
                INSERT INTO SpotReport (
                  Headings,
                  PartDescription,
                  LeadID
                ) VALUES (
                  '${row.heading}',
                  '${row.description}',
                  '${parseInt(leadId)}'
                );
              `;
        const updateQuery = `
              UPDATE SpotReport
              SET
                Headings = '${row.heading}',
                PartDescription = '${row.description}',
              WHERE
                ReportID = ${parseInt(row.sno)} AND 
                LeadID = ${parseInt(leadId)};
            `;
        const requiredQuery = parseInt(row?.sno) > 0 ? updateQuery : insertQuery;
        db.query(requiredQuery, (err, result) => {
          if (err) {
            logMessage({
              type: "error",
              Function: `UPDATING_SPOT_DAMAGE_REPORT`,
              message: `Got error while ${
                requiredQuery === updateQuery ? "updating" : "Inserting"
              } the damage Parts Details  for the spot_report for leadId --> ${leadId}`,
              username: row.Username,
              leadId: leadId,
              consoleInfo: `Got error while ${
                requiredQuery === updateQuery ? "updating" : "Inserting"
              } the damage Parts Details  for the spot_report for leadId --> ${leadId}`,
              info: `{ERRMESSAGE : ${
                err.details
              }, STATUS : ${`${err.status} ${err.message}`},query:${requiredQuery}, error : ${err}}}`,
            });
            console.error(err);
            res
              .status(500)
              .send(
                "Error while updating/inserting damage parts  for spot Report."
              );
            return;
          }
        });
      } else {
        if (parseInt(row.sno) > 0) {
          const deleteQuery =
            "DELETE FROM SpotReport WHERE LeadID = ? AND ReportID = ?";
          db.query(deleteQuery, [leadId, parseInt(row.sno)], (err, result) => {
            if (err) {
              logMessage({
                type: "error",
                Function: `UPDATING_SPOT_DAMAGE_REPORT`,
                message: `Got error while deleting the damage Parts Details  for the spot_report for leadId --> ${leadId}`,
                username: row.Username,
                leadId: leadId,
                consoleInfo: `Got error while deleting the damage parts Details  for the spot_report for leadId --> ${leadId}`,
                info: `{ERRMESSAGE : ${
                  err.details
                }, STATUS : ${`${err.status} ${err.message}`},query:${deleteQuery}, error : ${err}}}`,
              });
              console.error(err);
              res
                .status(500)
                .send("Error while deleting damage parts  for spot Report.");
              return;
            }
          });
        }
      }
    });

    logMessage({
      type: "info",
      Function: `UPDATING_INSPECTION_REPORT`,
      message: `Updated successfully the Inspection report for leadId ---> ${leadId}`,
      username: data.length > 0 ? data[0].Username : "",
      leadId: leadId,
      consoleInfo: `Updated successfully the Inspection report for leadId ---> ${leadId}`,
      info: `{message : 200 SUCCESS }`,
    });

    res.status(200).send("Successfully updated!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getDamageParts, updateDamageParts, getDamagePartsTypes };
