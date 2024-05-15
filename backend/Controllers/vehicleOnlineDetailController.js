const db = require("../Config/dbConfig");
const axios = require("axios");
const convertObjectToString = require("../Config/getObjectToString");
const { formatDate } = require("../Config/getFormattedDate");

const getSpecificVehicleDetails = async (req, res) => {
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
    const vehicleDetails = await executeQuery(
      "SELECT * FROM VehicleDetails WHERE LeadId=?",
      [leadId]
    );

    const combinedResult = {
      vehicleDetails,
    };

    res.json(combinedResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getOnlineVehicleData = (req, res) => {
  const vehicleNo = req.query.vehicleNo;
  const leadId = req.query.leadId;

  const payload = {
    id_number: vehicleNo,
  };

  axios
    .post("https://kyc-api.surepass.io/api/v1/rc/rc-full", payload, {
      headers: {
        Authorization: `Bearer ${process.env.SUREPASS_AUTHORIZATION_TOKEN}`,
      },
    })
    .then((result) => {
      const details = result?.data?.data;
      const stringformat = convertObjectToString(details);

      // const additionalInfo = result?.data?.additionalInfo;
      const stringformat2 = convertObjectToString(details);

      const formattedDateOfRegistration = formatDate(
        details?.registration_date
      );
      const formattedFitUpto = formatDate(details?.fit_up_to);
      const formattedMonthYear = formatDate(details?.manufacturing_date);
      const formattedInsuranceUpto = formatDate(details?.insurance_upto);
      const formattedTaxParticulars = formatDate(details?.tax_upto);
      const formattedVehicleType = String(details?.vehicle_category)
        .toLowerCase()
        .includes("2w")
        ? "2W"
        : "4W";

      //Commercial Vehicle Details
      const formattedPermitTo = formatDate(details?.permit_valid_upto);
      const formattedPermitFrom = formatDate(details?.permit_valid_from);

      const surveyType = formattedVehicleType === "2W" ? "Motor2W" : "Motor4W";

      if (!details) {
        return res.status(500).send("Internal Server Error");
      }
      const insertVehicleDetails = `
      INSERT INTO VehicleDetailsOnline (
        RegisteredNumber, 
        TypeOfBody,        
        DateOfRegistration, 
        EngineNumber,       
        ChassisNumber,  
        FuelType,         
        MakerDesc,     
        MakerModel,    
        CubicCapacity,  
        SeatingCapacity,  
        FitUpto,        
        VehicleType,    
        VehicleRcStatus,
        VehicleBlackListStatus, 
        VehicleRegistedAt,    
        ManufactureMonthYear,  
        PermanentAddress,     
        RegisteredOwner,    
        VehicleInsuranceUpto,  
        ApiResponse,
        PucValidUntil,        
        PucNumber,            
        MakeVariantModelColor,
        TaxParticulars,         
        RegLadenWt,           
        VehicleInsuranceCompany, 
        OtherInfo,
        Remark,
        LeadId
    )
    VALUES (
      '${details?.rc_number}',
        '${details?.body_type}',
        '${formattedDateOfRegistration}',
        '${details?.vehicle_engine_number}',
        '${details?.vehicle_chasi_number}',
        '${details?.fuel_type}',
        '${details?.maker_description}',
        '${details?.maker_model}',
        '${details?.cubic_capacity}',
        '${details?.seat_capacity}',
        '${formattedFitUpto}',
        '${formattedVehicleType}',
        '${details?.rc_status}',
        '${details?.blacklist_status}',
        '${details?.registered_at}',
        '${formattedMonthYear}',
        '${details?.permanent_address}',
        '${details?.owner_name}',
        '${formattedInsuranceUpto}',
        '${stringformat}',
        '${details?.pucc_upto}',
        '${details?.pucc_number}',
        '${details?.variant}',
        '${formattedTaxParticulars}',
        '${details?.vehicle_gross_weight}',
        '${details?.insurance_company}',
        '${stringformat2}',
        '${"Verified from Online"}',
        ${leadId}
    );
    `;

      const updateVehicleDetails = `
        UPDATE VehicleDetails
          SET
        RegisteredNumber = '${details?.rc_number}',
        TypeOfBody = '${details?.body_type}',
        DateOfRegistration = '${formattedDateOfRegistration}',
        EngineNumber = '${details?.vehicle_engine_number}',
        ChassisNumber = '${details?.vehicle_chasi_number}',
        FuelType = '${details?.fuel_type}',
        MakerDesc = '${details?.maker_description}',
        MakerModel = '${details?.maker_model}',
        CubicCapacity = '${details?.cubic_capacity}',
        SeatingCapacity = '${details?.seat_capacity}',
        FitUpto = '${formattedFitUpto}',
        VehicleType = '${formattedVehicleType}',
        VehicleRcStatus = '${details?.rc_status}',
        VehicleBlackListStatus = '${details?.blacklist_status}',
        VehicleRegistedAt = '${details?.registered_at}',
        ManufactureMonthYear = '${formattedMonthYear}',
        PermanentAddress = '${details?.permanent_address}',
        RegisteredOwner = '${details?.owner_name}',
        VehicleInsuranceUpto ='${formattedInsuranceUpto}',
        PucValidUntil='${details?.pucc_upto}',
        PucNumber='${details?.pucc_number}',
        MakeVariantModelColor='${details?.variant}',
        TaxParticulars='${formattedTaxParticulars}',
        RegLadenWt='${details?.vehicle_gross_weight}',
        VehicleInsuranceCompany = '${details?.insurance_company}',
        Remark='${"Verified from Online"}'
        WHERE
            LeadId = ${leadId};

        `;

      const insertIntoCommercialVehicleDetails = `
        INSERT INTO CommercialVehicleDetails (
            PermitTo,
            PermitNo,
            PermitFrom,
          TypeOfPermit,
          LeadID 
        ) VALUES (
          '${formattedPermitTo}',
         '${details?.permit_number}',
         '${formattedPermitFrom}', 
         '${details?.permit_type}',
          '${leadId}'
        );
        `;

      const updateCommercialVehicleDetails = `
        UPDATE CommercialVehicleDetails
              SET
              PermitTo='${formattedPermitTo}',
              PermitNo='${details?.permit_number}',
              PermitFrom='${formattedPermitFrom}',
              TypeOfPermit='${details?.permit_type}'
              WHERE LeadID = ${leadId};
        `;

      db.query(
        "SELECT * FROM CommercialVehicleDetails WHERE LeadID=?",
        [leadId],
        (err, result2) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error", err);
            return;
          }

          const query = result2?.length
            ? updateCommercialVehicleDetails
            : insertIntoCommercialVehicleDetails;

          db.query(query, (err, result2) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error", err);
              return;
            }
          });
        }
      );
      db.query(
        "DELETE FROM VehicleDetailsOnline WHERE LeadId=?",
        [leadId],
        (error, results) => {
          if (error) {
            console.error("Error updating data in driver Details:", error);
            return res
              .status(500)
              .json({ error: "Error updating data in driver Details." });
          }
          db.query(insertVehicleDetails, (error, results) => {
            if (error) {
              console.error("Error updating data in driver Details:", error);
              return res
                .status(500)
                .json({ error: "Error updating data in driver Details." });
            }
            db.query(updateVehicleDetails, (error, results) => {
              if (error) {
                console.error("Error updating data in driver Details:", error);
                return res
                  .status(500)
                  .json({ error: "Error updating data in driver Details." });
              }
              db.query(
                "UPDATE ClaimDetails SET SurveyType =? WHERE LeadID=?",
                [surveyType, leadId],
                (error, results) => {
                  if (error) {
                    console.error(
                      "Error updating data in driver Details:",
                      error
                    );
                    return res.status(500).json({
                      error: "Error updating data in driver Details.",
                    });
                  }
                  res
                    .status(200)
                    .json({ message: "Data updated successfully." });
                }
              );
            });
          });
        }
      );
    })
    .catch((Err) => {
      console.log(Err);
      return res.status(500).send("Internal Server Error");
    });
};

module.exports = { getOnlineVehicleData, getSpecificVehicleDetails };
