const db = require("../Config/dbConfig");
const { logMessage } = require("../utils/LoggerFile");

const getMISSheet = async (req, res) => {
  const startDate = req.query.startDate;
  const EndDate = req.query.EndDate;
  const DateType = req.query.DateType;
  const username = req.query.username;
  // return;
  const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) {
          logMessage({
            type: "error",
            Function: "FETCHING_MIS_SHEET",
            message: "Got Error while fetching wih MIS_SHEET",
            username: username,
            leadId: "",
            consoleInfo: `${err.status} ${err.details}`,
            info: `{ERRMESSAGE : ${err.details},STATUS : ${`${err.status} ${err.message}`},params : {
              startDate : ${startDate},endDate : ${EndDate}, dateType : ${DateType}
            }}`,
          });
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  };

  try {
    const misSheetDetails =
      DateType === "intimation"
        ? await executeQuery("CALL GetMisSheetByDateOfIntimation(?,?)", [
            startDate,
            EndDate,
          ])
        : await executeQuery("CALL GetMisSheetByDateOfSubmit(?,?)", [
            startDate,
            EndDate,
          ]);

    const combinedResult = {
      misSheetDetails,
    };

    logMessage({
      type: "info",
      Function: "FETCHING_MIS_SHEET",
      message: "Successfully Fetched the MIS SHEET",
      username: username,
      leadId: "",
      consoleInfo: `200 OK`,
      info: `{message : "SUCCESS",params : {
        startDate : ${startDate},endDate : ${EndDate}, dateType : ${DateType}
      }}`,
    });

    res.json(combinedResult);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getMISSheet };
