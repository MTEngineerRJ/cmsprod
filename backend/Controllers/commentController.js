const db = require("../Config/dbConfig");
const { logMessage } = require("../utils/LoggerFile");

const addComment = (req, res) => {
  const { LeadID, Comment, UserName } = req.body;

  const insertQuery = `
      INSERT INTO comments (
        LeadID,
        Comment,
        UserName
      ) VALUES (
        '${LeadID}',
        '${Comment}',
        '${UserName}'
      );
    `;

  db.query(insertQuery, (err, result) => {
    if (err) {
      logMessage({
        type: "error",
        Function: "ADDING_COMMENT_TO_CLAIM_DETAILS",
        message: `Got Error while ADDING **${Comment}** into the Claim Details`,
        username: UserName,
        leadId: LeadID,
        consoleInfo: `${err.status} ${err.details}`,
        info: `{ERRMESSAGE : ${
          err.details
        },STATUS : ${`${err.status} ${err.message}`}}`,
      });
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    

    return res.status(200).json({ message: "Added successfully", result });
  });
};

const getCommentsById = async (req, res) => {
  const leadId = req.query.leadId;
  const UserName = req.query.Username;

  db.query(
    "SELECT * FROM comments WHERE LeadID = ? ORDER BY AddedDate DESC",
    [leadId],
    (error, results) => {
      if (error) {
        logMessage({
          type: "info",
          Function: "FETCHING_SPECIFIC_COMMENTS",
          message: `Got ERROR while fetching Comments for the specified LeadID ${leadId}`,
          username: UserName,
          leadId: leadId,
          consoleInfo: `${err.status} ${err.details}`,
          info: `{ERRMESSAGE : ${
            err.details
          },STATUS : ${`${err.status} ${err.message}`}}`,
        });
        console.error("Error fetching data from comments table:", error);
        return res
          .status(500)
          .json({ error: "Error fetching data from comments table." });
      }
      
      return res.status(200).json({ results });
    }
  );
};

module.exports = { getCommentsById, addComment };
