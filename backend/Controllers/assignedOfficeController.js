const db = require("../Config/dbConfig");

const getAssignedOffice = (req, res) => {
  const name = req.query.name;
  const sql = "SELECT * FROM OfficeCodes WHERE EmployeeName = ?";
  db.query(sql, [name],(error, results) => {
    if (error) {
      console.error("Error while fetching the report documents :", error);
      return res
        .status(500)
        .json({ error: "Error inserting data into report documents :." });
    }

    return res.status(200).json({ results });
  });
};

module.exports = { getAssignedOffice };
