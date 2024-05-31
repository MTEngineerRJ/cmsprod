const db = require("../Config/dbConfig");

const getVehicleParts = (req, res) => {
  const vehicleType = req.params.vehicleType;
  const sql = "SELECT * FROM VehicleParts WHERE VehicleType = ?";
  db.query(sql, [vehicleType], (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
};

const getVehicleStates = (req, res) => {
  const vehicleType = req.params.vehicleType;
  const sql = "SELECT * FROM PartCondition";
  db.query(sql, [vehicleType], (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
};

const getSpecificPreInspectionDetails = async (req, res) => {
  const leadId = req.params.leadId;

  try {
    const query = "SELECT * FROM PreInspection WHERE LeadID = ?";
    const query2 = "SELECT * FROM ReportImage WHERE LeadID = ?";
    const query3 = "SELECT * FROM DriverDetails WHERE LeadID = ?";
    const query4 = "SELECT * FROM VehicleDetails WHERE LeadID = ?";
    const query5 = "SELECT * FROM ClaimDetails WHERE LeadID = ?";

    const [
      reportPartsDetails,
      reportImagesDetails,
      driverDetails,
      vehicleDetails,
      claimDetails
    ] = await Promise.all([
      new Promise((resolve, reject) => {
        db.query(query, [leadId], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(query2, [leadId], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(query3, [leadId], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(query4, [leadId], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(query5, [leadId], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      }),
    ]);

    const sql = "SELECT * FROM vw_OfficeCodesWithOfficeNameWithCode";
    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error while fetching the report documents :", error);
        return res
          .status(500)
          .json({ error: "Error inserting data into report documents :." });
      }

      servicingOffice = results
    });

    const combinedResult = {
      reportImagesDetails,
      driverDetails,
      vehicleDetails,
      reportPartsDetails,
      claimDetails
    };

    res.json(combinedResult);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getVehiclePartsDetails = (req, res) => {
  const leadId = req.params.leadId;
  const sql = "SELECT * FROM PreInspection WHERE LeadID = ?";
  db.query(sql, [leadId], (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
};

const updateVehiclePartsDetails = async (req, res) => {
  const newData = req.body;
  const leadId = req.params.leadId;

  newData.map((row, index) => {
    if (row.isActive) {
      const insertQuery = `
            INSERT INTO PreInspection (
              PartName,
              PartState,
              Username,
              LeadID
            ) VALUES (
              '${row.PartName}',
              '${row.PartState}',
              '${row.Username}',
              '${parseInt(leadId)}'
            );
          `;
      const updateQuery = `
          UPDATE PreInspection
          SET
            PartName = '${row.PartName}',
            PartState = '${row.PartState}',
            Username = '${row.Username}'
          WHERE
            PartID = ${parseInt(row.PartID)} AND 
            LeadID = ${parseInt(leadId)};
        `;
      const requiredQuery =
        parseInt(row.PartID) > 0 ? updateQuery : insertQuery;
      console.log(requiredQuery);
      db.query(requiredQuery, (err, result) => {
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
    } else {
      if (parseInt(row.PartID) > 0) {
        const deleteQuery =
          "DELETE FROM PreInspection WHERE LeadID = ? AND PartID = ?";
        console.log("Delete", deleteQuery);
        db.query(deleteQuery, [leadId, parseInt(row.PartID)], (err, result) => {
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
      }
    }
  });

  res.status(200).send("Successfully updated!");
};

module.exports = {
  getVehicleParts,
  updateVehiclePartsDetails,
  getVehicleStates,
  getSpecificPreInspectionDetails,
  getVehiclePartsDetails,
};