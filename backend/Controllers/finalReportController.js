const db = require("../Config/dbConfig");
const { formatDate } = require("../Config/getFormattedDate");
const { logMessage } = require("../utils/LoggerFile");

const updateFinalReport = (req, res) => {
  const {
    PolicyType,
    TypeOfDate,
    IDV,
    PolicyPeriodStart,
    PolicyPeriodEnd,
    HPA,
    ClaimServicingOffice,
    OwnerSRST,
    VehicleMakeVariantModelColor,
    DateOfIssue,
    MailRecieveDate,
    ValidFrom,
    VehicleType,
    ValidUntilNtv,
    ValidUntilTv,
    phoneNumber,
    AntiTheft,
    RegLadenWt,
    RemarkIfRLW,
    Pin,
    DateOfRegistration,
    PlaceOfSurvey,
    UnladenWT,
    RemarkIfULW,
    VehicleRemark,
    InsuranceCompanyNameAddress,
    InsuredAddress,
    InsuredMailAddress,
    InsuredMobileNo1,
    InsuredMobileNo2,
    InsuredName,
    requestType,
    ClaimNumber,
    EngineType,
    DateRegistration,
    PUCNumber,
    TransferDate,
    AddedBy,
    Verification,
    GarageAddedBy,
    InspectionDate,
    GarageContactNo1,
    GarageContactNo2,
    GarageNameAndAddress,
    ClaimAddedDateTime,
    PolicyIssuingOffice,
    PolicyNumber,
    DriverName,
    DriverAddedDate,
    IssuingAuthority,
    LicenseNumber,
    LicenseType,
    BadgeNumber,
    driverRemark,
    VehicleRegisteredNumber,
    RegisteredOwner,
    VehicleChassisNumber,
    EngineNumber,
    VehicleTypeOfBody,
    VehicleCubicCapacity,
    VehicleClassOfVehicle,
    VehicleFuelType,
    VehicleOdometerReading,
    VehiclePreAccidentCondition,
    VehicleModel,
    VehicleTaxParticulars,
    VehicleSeatingCapacity,
    AccidentAddedDateTime,
    AccidentTime,
    PlaceOfLoss,
    SurveyAllotmentDate,
    SurveyConductedDate,
    FitnessCertificate,
    FitnessFrom,
    FitnessTo,
    PermitTo,
    PermitNo,
    PermitFrom,
    TypeOfPermit,
    Authorization,
    AreasOfoperation,
    commercialRemark,
    FinalReportNotes,
    DetailsOfLoads,
    CauseOfAccident,
    PoliceAction,
    ThirdPartyLoss,
    Assessment,
    leadId,
    TotalLabor,
    TotalEstimate,
    LessExcess,
    ExpectedSalvage,
    MetalPercent,
    RemarkOnSalvage,
    TotalCostOfParts,
    Other,
    GrandTotal,
    DepreciationOnParts,
    NetAssessedAmount,
    SavageDepreciationDetails,
    CashLess,
    NoteOfSelf,
    RepairAutoDate,
    RepairCompletionDate,
    PartyAgreed,
    ReasonThereofDelay,
    AnyFurtherConversation,
    RepairingPhotoDate,
    ReinspectionDate,
    isActive,
    SalveDestroy,
    BillNo,
    BillDate,
    BillAmount,
    AddedDateTime,
    Endurance,
    OtherRemark,
    TotalLoss,
    DateOfBirth,
    OriginToDestThirdParty,
    LRInvoiceNoThirdParty,
    QuantityOfGoodsThirdParty,
    NatureOfGoodsThirdParty,
    NoOfPassengerInLoad,
    TransporterNameInLoad,
    LRInvoiceNoInLoad,
    OriginToDestination,
    WeightOfGoodsInLoad,
    NatureOfGoodsInLoad,
    StationDiaryNo,
    PolicStationName,
    SurveyInspectiononMedium,
    PersonArrestedOnSpot,
    Vehicle_Shifted_To,
    IMT,
    ValidUpto,
    Username,
    InspectionType,
    CommTaxRatePct,
    CashLoss,
    SuspectedParts,
    WreckValueWith,
    WreckValueWithout,
    RtiAmount,
    MissingItem,
    TotalLossEditor,
  } = req.body;

  //Claim Dates
  const formattedPolicyEnd = formatDate(PolicyPeriodEnd);
  const formattedPolicyStart = formatDate(PolicyPeriodStart);
  const formattedMailRecevingDate = formatDate(MailRecieveDate);

  //Vehicle Dates
  const formattedDateOfRegistration = formatDate(DateOfRegistration);
  const formattedTransferDate = formatDate(TransferDate);
  const formattedTaxParticulars = formatDate(VehicleTaxParticulars);

  //Driver Dates
  const formattedDateOfbirth = formatDate(DateOfBirth);
  const formattedDateOfIssue = formatDate(DateOfIssue);
  const formattedValidUntilNtv = formatDate(ValidUntilNtv);
  const formattedValidUntilTv = formatDate(ValidUntilTv);
  const formattedValidupto = formatDate(ValidUpto);
  const formattedDriverAddedDate = formatDate(DriverAddedDate);

  //Accident Dates
  const formattedDateOfAccident = formatDate(AccidentAddedDateTime);
  const formattedSurveyConductedDate = formatDate(SurveyConductedDate);
  const formattedInspectionDate = formatDate(InspectionDate);

  //Commercial Vehicle Details
  const formattedFitnessFrom = formatDate(FitnessFrom);
  const formattedFittnessTo = formatDate(FitnessTo);
  const formattedPermitTo = formatDate(PermitTo);
  const formattedPermitFrom = formatDate(PermitFrom);

  //summary Dates
  const formattedRepairAutoDate = formatDate(RepairAutoDate);
  const formattedRepairCompletionDate = formatDate(RepairCompletionDate);
  const formattedReparingPhotoDate = formatDate(RepairingPhotoDate);
  const formattedReInspectionDate = formatDate(ReinspectionDate);
  const formattedBillDate = formatDate(BillDate);

  const updateDriverDetails = `
    UPDATE DriverDetails
    SET
    AddedDate = '${formattedDriverAddedDate}' ,
    DriverName = '${DriverName}',
    LicenseNumber='${LicenseNumber}',
    LicenseType='${LicenseType}',
    IssuingAuthority = '${IssuingAuthority}',
    DateOfIssue = '${formattedDateOfIssue}',
    ValidFrom='${ValidFrom}',
    ValidUntilNtv = '${formattedValidUntilNtv}',
    ValidUntilTv = '${formattedValidUntilTv}',
    BadgeNumber='${BadgeNumber}',
    Remark='${driverRemark}',
    DateOfBirth='${formattedDateOfbirth}',
    ValidUpto='${formattedValidupto}'
    WHERE LeadID = ${leadId};
  `;

  // Update ClaimDetails query with CASE statement
  const updateClaimDetails = `
    UPDATE ClaimDetails
    SET
    InsuranceCompanyNameAddress = '${InsuranceCompanyNameAddress}',
    SurveyType = '${""}',
    PolicyIssuingOffice='${PolicyIssuingOffice}',
    PolicyNumber = '${PolicyNumber}',
    PolicyPeriodStart='${formattedPolicyStart}',
    PolicyPeriodEnd='${formattedPolicyEnd}' ,
    ClaimNumber = '${ClaimNumber}',
    ClaimServicingOffice='${ClaimServicingOffice}',
    InspectionType = '${InspectionType}',
    PolicyType='${PolicyType}',
    IDV='${IDV}',
    MailRecieveDate='${formattedMailRecevingDate}',
    HPA='${HPA}',
    TotalLoss = ${TotalLoss ? 1 : 0},
    IMT = ${IMT ? 1 : 0}
    WHERE LeadID = ${leadId};
  `;

  // Update VehicleDetails query with CASE statement

  const updateVehicleDetails = `
    UPDATE VehicleDetails
    SET
    TypeOfVerification = '${Verification}',
    RegisteredNumber = '${VehicleRegisteredNumber}',
    RegisteredOwner='${RegisteredOwner}',
    TransferDate = '${formattedTransferDate}',
    DateOfRegistration = '${formattedDateOfRegistration}',
    MakeVariantModelColor = '${VehicleMakeVariantModelColor}',
    EngineNumber='${EngineNumber}',
    ChassisNumber = '${VehicleChassisNumber}',
    TypeOfBody = '${VehicleTypeOfBody}',
    ClassOfVehicle = '${VehicleClassOfVehicle}',
    PreAccidentCondition='${VehiclePreAccidentCondition}',
    SeatingCapacity = '${VehicleSeatingCapacity}',
    CubicCapacity = '${VehicleCubicCapacity}',
    FuelType = '${VehicleFuelType}',
    TaxParticulars='${formattedTaxParticulars}',
    OdometerReading = '${VehicleOdometerReading}',
    PucNumber='${PUCNumber}',
    OwnerSrDate='${OwnerSRST}',
    RegLadenWt='${RegLadenWt}',
    RemarkIfRLW='${RemarkIfRLW}',
    UnladenWT='${UnladenWT}',
    RemarkIfULW='${RemarkIfULW}',
    Remark='${VehicleRemark}',
    VehicleType='${VehicleType}',
    AntiTheft='${AntiTheft}'
    WHERE LeadID = ${leadId};
  `;

  // Update GarageDetails query with CASE statement
  const updateGarageDetails = `
    UPDATE GarageDetails
    SET
    GarageNameAndAddress = '${GarageNameAndAddress}',
    GarageContactNo1 = '${GarageContactNo1}',
    AddedBy='${GarageAddedBy}'
    WHERE LeadID = ${leadId};
  `;

  // Update InsuredDetails query with CASE statement
  const updateInsuredDetails = `
    UPDATE InsuredDetails
    SET
    InsuredName = '${InsuredName}',
    InsuredMobileNo1 = '${InsuredMobileNo1}',
    InsuredMobileNo2='${InsuredMobileNo2}',
    InsuredMailAddress = '${InsuredMailAddress}',
    InsuredAddress = '${InsuredAddress}'
    WHERE LeadID = ${leadId};
  `;

  // Update AccidentDetails query with CASE statement
  const updateAccidentDetails = `
    UPDATE AccidentDetails
    SET
    PlaceOfLoss = '${PlaceOfLoss}',
    SurveyConductedDate ='${formattedSurveyConductedDate}',
    Pin='${Pin}',
    InspectionDate='${formattedInspectionDate}',
    PlaceOfSurvey='${PlaceOfSurvey}',
    DetailsOfLoads='${DetailsOfLoads}',
    CauseOfAccident='${CauseOfAccident}',
    PoliceAction='${PoliceAction}',
    ThirdPartyLoss='${ThirdPartyLoss}',
    Assessment='${Assessment}',
    DateOfAccident='${formattedDateOfAccident}',
    TimeOfAccident='${AccidentTime}'
    WHERE LeadID = ${leadId};
  `;

  const insertIntoCommercialVehicleDetails = `
    INSERT INTO CommercialVehicleDetails (
      FitnessCertificate,
        FitnessFrom,
        FitnessTo,
        PermitTo,
        PermitNo,
        PermitFrom,
      TypeOfPermit,
      Authorization,
      AreasOfoperation,
      Remark,
      IsActive,
      LeadID 
    ) VALUES (
      '${FitnessCertificate}',
     '${formattedFitnessFrom}',
     '${formattedFittnessTo}', 
     '${formattedPermitTo}',
      '${PermitNo}',
     '${formattedPermitFrom}',
      '${TypeOfPermit}',
      '${Authorization}',
      '${AreasOfoperation}',
      '${commercialRemark}',
      ${isActive},
      '${leadId}'
    );
    `;

  const updateCommercialVehicleDetails = `
    UPDATE CommercialVehicleDetails
          SET
          FitnessCertificate = '${FitnessCertificate}',
          FitnessFrom ='${formattedFitnessFrom}' ,
          FitnessTo='${formattedFittnessTo}',
          PermitTo='${PermitTo}',
          PermitNo='${formattedPermitTo}',
          PermitFrom='${formattedPermitFrom}',
          TypeOfPermit='${TypeOfPermit}',
          Authorization='${Authorization}',
          AreasOfoperation='${AreasOfoperation}',
          Remark='${commercialRemark}',
          IsActive = ${isActive}
          WHERE LeadID = ${leadId};
    `;

  const insertIntoAccidentSpotDetails = `
    INSERT INTO AccidentDetailsSpot (
        OriginToDestThirdParty,
        LRInvoiceNoThirdParty,
        QuantityOfGoodsThirdParty,
        NatureOfGoodsThirdParty,
        NoOfPassengersInLoad,
        TransporterNameInLoad,
        LRInvoiceNoInLoad,
        OriginToDestInLoad,
        WeightOfGoodsInLoad,
        NatureOfGoodsInLoad,
        StationDiaryNo,
        PoliceStationName,
        SurveyInspectionMedium,
        PersonArrestedOnSpot,
        Vehicle_Shifted_To,
        LeadID
    ) VALUES (
        '${OriginToDestThirdParty}',
        '${LRInvoiceNoThirdParty}',
        '${QuantityOfGoodsThirdParty}',
        '${NatureOfGoodsThirdParty}',
        '${NoOfPassengerInLoad}',
        '${TransporterNameInLoad}',
        '${LRInvoiceNoInLoad}',
        '${OriginToDestination}',
        '${WeightOfGoodsInLoad}',
        '${NatureOfGoodsInLoad}',
        '${StationDiaryNo}',
        '${PolicStationName}',
        '${SurveyInspectiononMedium}',
        '${PersonArrestedOnSpot}',
        '${Vehicle_Shifted_To}',
        ${leadId}
    );
`;

  const updateIntoAccidentSpotDetails = `
    UPDATE AccidentDetailsSpot
          SET
          OriginToDestThirdParty = '${OriginToDestThirdParty}',
          LRInvoiceNoThirdParty ='${LRInvoiceNoThirdParty}' ,
          QuantityOfGoodsThirdParty='${QuantityOfGoodsThirdParty}',
          NatureOfGoodsThirdParty='${NatureOfGoodsThirdParty}',
          NoOfPassengersInLoad='${NoOfPassengerInLoad}',
          TransporterNameInLoad='${TransporterNameInLoad}',
          LRInvoiceNoInLoad='${LRInvoiceNoInLoad}',
              OriginToDestInLoad='${OriginToDestination}',
          WeightOfGoodsInLoad='${WeightOfGoodsInLoad}',
          NatureOfGoodsInLoad='${NatureOfGoodsInLoad}',
          StationDiaryNo = '${StationDiaryNo}',
           PoliceStationName='${PolicStationName}',
          SurveyInspectionMedium='${SurveyInspectiononMedium}',
          PersonArrestedOnSpot = '${PersonArrestedOnSpot}',
           Vehicle_Shifted_To='${Vehicle_Shifted_To}'
          WHERE LeadID = ${leadId};
    `;

  const updateSummaryDetails = `
    UPDATE SummaryReport
          SET
          TotalLabour = '${TotalLabor}',
          TotalEstimate ='${TotalEstimate}' ,
          TotalCostOfParts='${TotalCostOfParts}',
          LessExcess='${LessExcess}',
          ExpectedSalvage='${ExpectedSalvage}',
          MetalPercent='${MetalPercent}',
          RemarkOnSalvage='${RemarkOnSalvage}',
          Other='${Other}',
          GrandTotal='${GrandTotal}',
          DepreciationOnParts='${DepreciationOnParts}',
          NetAssessedAmount='${NetAssessedAmount}',
          SavageDepreciationDetails='${SavageDepreciationDetails}',
          CashLess=${CashLess ? 1 : 0},
          NoteOfSelf='${NoteOfSelf}',
          RepairAutoDate='${formattedRepairAutoDate}',
          RepairCompletionDate='${formattedRepairCompletionDate}',
          PartyAgreed='${PartyAgreed}', 
          ReasonThereofDelay='${ReasonThereofDelay}',
          AnyFurtherConversation='${AnyFurtherConversation}',
          RepairingPhotoDate='${formattedReparingPhotoDate}',
          ReinspectionDate='${formattedReInspectionDate}',
          SalveDestroy='${SalveDestroy}',
          BillNo='${BillNo}',
          BillDate='${formattedBillDate}',
          BillAmount='${BillAmount}',
          Endurance='${Endurance}',
          OtherRemark='${OtherRemark}',
          SummaryNotes='${FinalReportNotes.replace(/'/g, "''").replace(
            /\n/g,
            "<br>"
          )}'
          WHERE LeadId = ${leadId};
    `;

  const insertSummaryDetails = `
      INSERT INTO SummaryReport (
        LeadId, TotalLabour, TotalEstimate, TotalCostOfParts, LessExcess, ExpectedSalvage, MetalPercent, RemarkOnSalvage,
       Other, GrandTotal, DepreciationOnParts, NetAssessedAmount, SavageDepreciationDetails, CashLess,
        NoteOfSelf, RepairAutoDate, RepairCompletionDate, PartyAgreed, ReasonThereofDelay, AnyFurtherConversation,
        RepairingPhotoDate, ReinspectionDate, SalveDestroy, BillNo, BillDate, BillAmount, Endurance,OtherRemark,SummaryNotes
      ) VALUES (
        ${leadId}, ${TotalLabor}, ${TotalEstimate}, ${TotalCostOfParts}, '${LessExcess}', '${ExpectedSalvage}', ${MetalPercent},
        '${RemarkOnSalvage}', '${Other}', ${GrandTotal}, ${DepreciationOnParts}, ${NetAssessedAmount},
        '${SavageDepreciationDetails}', '${CashLess}', '${NoteOfSelf}', '${formattedRepairAutoDate}', '${formattedRepairCompletionDate}',
        '${PartyAgreed}', '${ReasonThereofDelay}', '${AnyFurtherConversation}', '${formattedReparingPhotoDate}', '${formattedReInspectionDate}',
        '${SalveDestroy}', '${BillNo}', '${formattedBillDate}', '${BillAmount}', '${Endurance}','${OtherRemark}','${FinalReportNotes}'
      );
    `;

  const insertTotalLossQuery = `
  INSERT INTO TotalLoss (
      CommTaxRatePct,
      CashLoss,
      SuspectedParts,
      WreckValueWith,
      WreckValueWithout,
      MissingItem,
      RtiAmount,
      totalLossEditorContent,
      LeadID
  )
  VALUES (
    '${CommTaxRatePct}',
    '${CashLoss}',
    '${SuspectedParts}',
    '${WreckValueWith}',
    '${WreckValueWithout}',
    '${RtiAmount}',
    '${MissingItem}',
    '${TotalLossEditor}',
    '${leadId}'
  );
  `;

  const updateTotalLossQuery = `
  UPDATE TotalLoss
  SET
      CommTaxRatePct = '${CommTaxRatePct}',
      CashLoss = '${CashLoss}',
      SuspectedParts = '${SuspectedParts}',
      WreckValueWith = '${WreckValueWith}',
      WreckValueWithout = '${WreckValueWithout}',
      MissingItem = '${MissingItem}',
      RtiAmount = '${RtiAmount}',
      totalLossEditorContent = '${TotalLossEditor}'
  WHERE
      LeadID = '${leadId}';
`;

  const newPartsQuery = `
    UPDATE NewPartsReport
          SET
          IsImt = ${0}
          WHERE LeadID = ${leadId};
    `;
  const LabourQuery = `
    UPDATE LabourReport
          SET
          IsImt = ${0}
          WHERE LeadID = ${leadId};
    `;

  if (String(InspectionType).toLowerCase().includes("spot")) {
    db.query(
      "SELECT * FROM AccidentDetailsSpot WHERE LeadID=?",
      [leadId],
      (err, result2) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error", err);
          return;
        }

        const query = result2?.length
          ? updateIntoAccidentSpotDetails
          : insertIntoAccidentSpotDetails;
        db.query(query, (err, result2) => {
          if (err) {
            logMessage({
              type: "error",
              Function: `UPDATING_FINAL_REPORT`,
              message: `Got error while ${
                query === updateIntoAccidentSpotDetails
                  ? "Updating"
                  : "Inserting"
              } the Accident Spot Details DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
              username: Username,
              leadId: leadId,
              consoleInfo: `Got error while ${
                query === updateIntoAccidentSpotDetails
                  ? "Updating"
                  : "Inserting"
              } the Accident Spot Details  for the ${InspectionType}_report for leadId --> ${leadId}`,
              info: `{ERRMESSAGE : ${
                err.details
              }, STATUS : ${`${err.status} ${err.message}`},query:${query}, error : ${err}}}`,
            });
            console.error(err);
            res.status(500).send("Internal Server Error", err);
            return;
          }
        });
      }
    );
  }

  if (!IMT) {
    db.query(newPartsQuery, (err, result2) => {
      if (err) {
        logMessage({
          type: "error",
          Function: `UPDATING_NEW_PART_WHEN_IMT_ZERO_FINAL_REPORT`,
          message: `Got error while updating the ACCIDENT DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
          username: Username,
          leadId: leadId,
          consoleInfo: `Got error while updating the New parts when IMT is 0 for the ${InspectionType}_report for leadId --> ${leadId}`,
          info: `{ERRMESSAGE : ${
            err.details
          }, STATUS : ${`${err.status} ${err.message}`},query:${updateAccidentDetails}, error : ${err}}}`,
        });
        console.error(err);
        res.status(500).send("Internal Server Error", err);
        return;
      }
    });
    db.query(LabourQuery, (err, result2) => {
      if (err) {
        logMessage({
          type: "error",
          Function: `UPDATING_LABOUR_WHEN_IMT_ZERO_FINAL_REPORT`,
          message: `Got error while updating the ACCIDENT DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
          username: Username,
          leadId: leadId,
          consoleInfo: `Got error while updating the Labour when IMT is 0 for the ${InspectionType}_report for leadId --> ${leadId}`,
          info: `{ERRMESSAGE : ${
            err.details
          }, STATUS : ${`${err.status} ${err.message}`},query:${updateAccidentDetails}, error : ${err}}}`,
        });
        console.error(err);
        res.status(500).send("Internal Server Error", err);
        return;
      }
    });
  }

  db.query(updateClaimDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while updating the CLAIM DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while updating the CLAIM DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${updateClaimDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });

  db.query(updateAccidentDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while updating the ACCIDENT DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while updating the ACCIDENT DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${updateAccidentDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });
  db.query(updateDriverDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while updating the DRIVER DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while updating the DRIVER DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${updateDriverDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });
  db.query(updateGarageDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while updating the GARAGE DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while updating the GARAGE DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${updateGarageDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });

  db.query(updateInsuredDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while updating the INSURED DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while updating the INSURED DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${updateInsuredDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });
  db.query(updateVehicleDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while updating the VEHICLE DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while updating the VEHICLE DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${updateVehicleDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });

  db.query(
    "SELECT * FROM SummaryReport WHERE LeadId=?",
    [leadId],
    (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error", err);
        return;
      }

      const query = result2?.length
        ? updateSummaryDetails
        : insertSummaryDetails;

      db.query(query, (err, result2) => {
        if (err) {
          logMessage({
            type: "error",
            Function: `UPDATING_FINAL_REPORT`,
            message: `Got error while ${
              query === updateSummaryDetails ? "Updating" : "Inserting"
            } the SUMMARY DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
            username: Username,
            leadId: leadId,
            consoleInfo: `Got error while ${
              query === updateSummaryDetails ? "Updating" : "Inserting"
            } the SUMMARY DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
            info: `{ERRMESSAGE : ${
              err.details
            }, STATUS : ${`${err.status} ${err.message}`},query:${query}, error : ${err}}}`,
          });
          console.error(err);
          res.status(500).send("Internal Server Error", err);
          return;
        }
      });
    }
  );

  db.query(
    "SELECT * FROM TotalLoss WHERE LeadID=?",
    [leadId],
    (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error", err);
        return;
      }

      const query = result2?.length
        ? updateTotalLossQuery
        : insertTotalLossQuery;

      db.query(query, (err, result2) => {
        if (err) {
          logMessage({
            type: "error",
            Function: `UPDATING_FINAL_REPORT`,
            message: `Got error while ${
              query === updateTotalLossQuery ? "Updating" : "Inserting"
            } the Total Loss DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
            username: Username,
            leadId: leadId,
            consoleInfo: `Got error while ${
              query === updateTotalLossQuery ? "Updating" : "Inserting"
            } the Total Loss for the ${InspectionType}_report for leadId --> ${leadId}`,
            info: `{ERRMESSAGE : ${
              err.details
            }, STATUS : ${`${err.status} ${err.message}`},query:${query}, error : ${err}}}`,
          });
          console.error(err);
          res.status(500).send("Internal Server Error", err);
          return;
        }
      });
    }
  );

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
          logMessage({
            type: "error",
            Function: `UPDATING_FINAL_REPORT`,
            message: `Got error while ${
              query === updateCommercialVehicleDetails
                ? "Updating"
                : "Inserting"
            } the COMMERCIAL DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
            username: Username,
            leadId: leadId,
            consoleInfo: `Got error while ${
              query === updateCommercialVehicleDetails
                ? "Updating"
                : "Inserting"
            } the COMMERCIAL DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
            info: `{ERRMESSAGE : ${
              err.details
            }, STATUS : ${`${err.status} ${err.message}`},query:${query}, error : ${err}}}`,
          });
          console.error(err);
          res.status(500).send("Internal Server Error", err);
          return;
        }
      });
    }
  );

  logMessage({
    type: "info",
    Function: `UPDATING_FINAL_REPORT`,
    message: `Updated successfully the final report for leadId ---> ${leadId}`,
    username: Username,
    leadId: leadId,
    consoleInfo: `Updated successfully the final report for leadId ---> ${leadId}`,
    info: `{message : 200 SUCCESS }`,
  });
  res.status(200).send("Successfully Updated!!");
};

const exportToFinal = (req, res) => {
  const {
    PolicyType,
    TypeOfDate,
    IDV,
    PolicyPeriodStart,
    PolicyPeriodEnd,
    HPA,
    ClaimServicingOffice,
    OwnerSRST,
    VehicleMakeVariantModelColor,
    DateOfIssue,
    MailRecieveDate,
    ValidFrom,
    VehicleType,
    ValidUntilNtv,
    ValidUntilTv,
    phoneNumber,
    AntiTheft,
    RegLadenWt,
    RemarkIfRLW,
    Pin,
    DateOfRegistration,
    PlaceOfSurvey,
    UnladenWT,
    RemarkIfULW,
    VehicleRemark,
    InsuranceCompanyNameAddress,
    InsuredAddress,
    InsuredMailAddress,
    InsuredMobileNo1,
    InsuredMobileNo2,
    InsuredName,
    requestType,
    ClaimNumber,
    EngineType,
    DateRegistration,
    PUCNumber,
    TransferDate,
    AddedBy,
    Verification,
    GarageAddedBy,
    InspectionDate,
    GarageContactNo1,
    GarageContactNo2,
    GarageNameAndAddress,
    ClaimAddedDateTime,
    PolicyIssuingOffice,
    PolicyNumber,
    DriverName,
    DriverAddedDate,
    IssuingAuthority,
    LicenseNumber,
    LicenseType,
    BadgeNumber,
    driverRemark,
    VehicleRegisteredNumber,
    RegisteredOwner,
    VehicleChassisNumber,
    EngineNumber,
    VehicleTypeOfBody,
    VehicleCubicCapacity,
    VehicleClassOfVehicle,
    VehicleFuelType,
    VehicleOdometerReading,
    VehiclePreAccidentCondition,
    VehicleModel,
    VehicleTaxParticulars,
    VehicleSeatingCapacity,
    AccidentAddedDateTime,
    AccidentTime,
    PlaceOfLoss,
    SurveyAllotmentDate,
    SurveyConductedDate,
    FitnessCertificate,
    FitnessFrom,
    FitnessTo,
    PermitTo,
    PermitNo,
    PermitFrom,
    TypeOfPermit,
    Authorization,
    AreasOfoperation,
    commercialRemark,
    FinalReportNotes,
    DetailsOfLoads,
    CauseOfAccident,
    PoliceAction,
    ThirdPartyLoss,
    Assessment,
    leadId,
    TotalLabor,
    TotalEstimate,
    LessExcess,
    ExpectedSalvage,
    MetalPercent,
    RemarkOnSalvage,
    TotalCostOfParts,
    Other,
    GrandTotal,
    DepreciationOnParts,
    NetAssessedAmount,
    SavageDepreciationDetails,
    CashLess,
    NoteOfSelf,
    RepairAutoDate,
    RepairCompletionDate,
    PartyAgreed,
    ReasonThereofDelay,
    AnyFurtherConversation,
    RepairingPhotoDate,
    ReinspectionDate,
    isActive,
    SalveDestroy,
    BillNo,
    BillDate,
    BillAmount,
    AddedDateTime,
    Endurance,
    OtherRemark,
    TotalLoss,
    DateOfBirth,
    OriginToDestThirdParty,
    LRInvoiceNoThirdParty,
    QuantityOfGoodsThirdParty,
    NatureOfGoodsThirdParty,
    NoOfPassengerInLoad,
    TransporterNameInLoad,
    LRInvoiceNoInLoad,
    OriginToDestination,
    WeightOfGoodsInLoad,
    NatureOfGoodsInLoad,
    StationDiaryNo,
    PolicStationName,
    SurveyInspectiononMedium,
    PersonArrestedOnSpot,
    Vehicle_Shifted_To,
    IMT,
    ValidUpto,
    Username,
    InspectionType,
    CommTaxRatePct,
    CashLoss,
    SuspectedParts,
    WreckValueWith,
    WreckValueWithout,
    RtiAmount,
    MissingItem,
    TotalLossEditor,
  } = req.body;

  //Claim Dates
  const formattedPolicyEnd = formatDate(PolicyPeriodEnd);
  const formattedPolicyStart = formatDate(PolicyPeriodStart);
  const formattedMailRecevingDate = formatDate(MailRecieveDate);

  //Vehicle Dates
  const formattedDateOfRegistration = formatDate(DateOfRegistration);
  const formattedTransferDate = formatDate(TransferDate);
  const formattedTaxParticulars = formatDate(VehicleTaxParticulars);

  //Driver Dates
  const formattedDateOfbirth = formatDate(DateOfBirth);
  const formattedDateOfIssue = formatDate(DateOfIssue);
  const formattedValidUntilNtv = formatDate(ValidUntilNtv);
  const formattedValidUntilTv = formatDate(ValidUntilTv);
  const formattedValidupto = formatDate(ValidUpto);
  const formattedDriverAddedDate = formatDate(DriverAddedDate);

  //Accident Dates
  const formattedDateOfAccident = formatDate(AccidentAddedDateTime);
  const formattedSurveyConductedDate = formatDate(SurveyConductedDate);
  const formattedInspectionDate = formatDate(InspectionDate);

  //Commercial Vehicle Details
  const formattedFitnessFrom = formatDate(FitnessFrom);
  const formattedFittnessTo = formatDate(FitnessTo);
  const formattedPermitTo = formatDate(PermitTo);
  const formattedPermitFrom = formatDate(PermitFrom);

  //summary Dates
  const formattedRepairAutoDate = formatDate(RepairAutoDate);
  const formattedRepairCompletionDate = formatDate(RepairCompletionDate);
  const formattedReparingPhotoDate = formatDate(RepairingPhotoDate);
  const formattedReInspectionDate = formatDate(ReinspectionDate);
  const formattedBillDate = formatDate(BillDate);

  const insertDriverDetails = `
  INSERT INTO DriverDetails (
    AddedDate, DriverName, LicenseNumber, LicenseType, IssuingAuthority,
    DateOfIssue, ValidFrom, ValidUntilNtv, ValidUntilTv, BadgeNumber,
    Remark, DateOfBirth, ValidUpto
  ) VALUES (
    '${formattedDriverAddedDate}', '${DriverName}', '${LicenseNumber}', '${LicenseType}', '${IssuingAuthority}',
    '${formattedDateOfIssue}', '${ValidFrom}', '${formattedValidUntilNtv}', '${formattedValidUntilTv}', '${BadgeNumber}',
    '${driverRemark}', '${formattedDateOfbirth}', '${formattedValidupto}'
  );
`;

  const insertClaimDetails = `
  INSERT INTO ClaimDetails (
    InsuranceCompanyNameAddress, SurveyType, PolicyIssuingOffice, PolicyNumber,
    PolicyPeriodStart, PolicyPeriodEnd, ClaimNumber, ClaimServicingOffice, InspectionType,
    PolicyType, IDV, MailRecieveDate, HPA, TotalLoss, IMT
  ) VALUES (
    '${InsuranceCompanyNameAddress}', '${""}', '${PolicyIssuingOffice}', '${PolicyNumber}',
    '${formattedPolicyStart}', '${formattedPolicyEnd}', '${ClaimNumber}', '${ClaimServicingOffice}', '${"Final"}',
    '${PolicyType}', '${IDV}', '${formattedMailRecevingDate}', '${HPA}', ${
    TotalLoss ? 1 : 0
  }, ${IMT ? 1 : 0}
  );
`;

  const insertVehicleDetails = `
  INSERT INTO VehicleDetails (
    TypeOfVerification, RegisteredNumber, RegisteredOwner, TransferDate, DateOfRegistration,
    MakeVariantModelColor, EngineNumber, ChassisNumber, TypeOfBody, ClassOfVehicle,
    PreAccidentCondition, SeatingCapacity, CubicCapacity, FuelType, TaxParticulars,
    OdometerReading, PucNumber, OwnerSrDate, RegLadenWt, RemarkIfRLW,
    UnladenWT, RemarkIfULW, Remark, VehicleType, AntiTheft
  ) VALUES (
    '${Verification}', '${VehicleRegisteredNumber}', '${RegisteredOwner}', '${formattedTransferDate}', '${formattedDateOfRegistration}',
    '${VehicleMakeVariantModelColor}', '${EngineNumber}', '${VehicleChassisNumber}', '${VehicleTypeOfBody}', '${VehicleClassOfVehicle}',
    '${VehiclePreAccidentCondition}', '${VehicleSeatingCapacity}', '${VehicleCubicCapacity}', '${VehicleFuelType}', '${formattedTaxParticulars}',
    '${VehicleOdometerReading}', '${PUCNumber}', '${OwnerSRST}', '${RegLadenWt}', '${RemarkIfRLW}',
    '${UnladenWT}', '${RemarkIfULW}', '${VehicleRemark}', '${VehicleType}', '${AntiTheft}'
  );
`;

  const insertGarageDetails = `
  INSERT INTO GarageDetails (
    GarageNameAndAddress, GarageContactNo1, AddedBy
  ) VALUES (
    '${GarageNameAndAddress}', '${GarageContactNo1}', '${GarageAddedBy}'
  );
`;

  const insertInsuredDetails = `
  INSERT INTO InsuredDetails (
    InsuredName, InsuredMobileNo1, InsuredMobileNo2, InsuredMailAddress, InsuredAddress
  ) VALUES (
    '${InsuredName}', '${InsuredMobileNo1}', '${InsuredMobileNo2}', '${InsuredMailAddress}', '${InsuredAddress}'
  );
`;

  const insertAccidentDetails = `
  INSERT INTO AccidentDetails (
    PlaceOfLoss, SurveyConductedDate, Pin, InspectionDate, PlaceOfSurvey,
    DetailsOfLoads, CauseOfAccident, PoliceAction, ThirdPartyLoss, Assessment,
    DateOfAccident, TimeOfAccident
  ) VALUES (
    '${PlaceOfLoss}', '${formattedSurveyConductedDate}', '${Pin}', '${formattedInspectionDate}', '${PlaceOfSurvey}',
    '${DetailsOfLoads}', '${CauseOfAccident}', '${PoliceAction}', '${ThirdPartyLoss}', '${Assessment}',
    '${formattedDateOfAccident}', '${AccidentTime}'
  );
`;

  const insertCommercialVehicleDetails = `
  INSERT INTO CommercialVehicleDetails (
    FitnessCertificate, FitnessFrom, FitnessTo, PermitTo, PermitNo,
    PermitFrom, TypeOfPermit, Authorization, AreasOfoperation, Remark,
    IsActive
  ) VALUES (
    '${FitnessCertificate}', '${formattedFitnessFrom}', '${formattedFittnessTo}', '${formattedPermitTo}', '${PermitNo}',
    '${formattedPermitFrom}', '${TypeOfPermit}', '${Authorization}', '${AreasOfoperation}', '${commercialRemark}',
    ${isActive}
  );
`;

  const insertIntoAccidentSpotDetails = `
  INSERT INTO AccidentDetailsSpot (
    OriginToDestThirdParty, LRInvoiceNoThirdParty, QuantityOfGoodsThirdParty,
    NatureOfGoodsThirdParty, NoOfPassengersInLoad, TransporterNameInLoad,
    LRInvoiceNoInLoad, OriginToDestInLoad, WeightOfGoodsInLoad,
    NatureOfGoodsInLoad, StationDiaryNo, PoliceStationName,
    SurveyInspectionMedium, PersonArrestedOnSpot, Vehicle_Shifted_To
  ) VALUES (
    '${OriginToDestThirdParty}', '${LRInvoiceNoThirdParty}', '${QuantityOfGoodsThirdParty}',
    '${NatureOfGoodsThirdParty}', '${NoOfPassengerInLoad}', '${TransporterNameInLoad}',
    '${LRInvoiceNoInLoad}', '${OriginToDestination}', '${WeightOfGoodsInLoad}',
    '${NatureOfGoodsInLoad}', '${StationDiaryNo}', '${PolicStationName}',
    '${SurveyInspectiononMedium}', '${PersonArrestedOnSpot}', '${Vehicle_Shifted_To}'
  );
`;

  const insertSummaryDetails = `
  INSERT INTO SummaryReport (
    TotalLabour, TotalEstimate, TotalCostOfParts, LessExcess,
    ExpectedSalvage, MetalPercent, RemarkOnSalvage, Other, GrandTotal,
    DepreciationOnParts, NetAssessedAmount, SavageDepreciationDetails, CashLess,
    NoteOfSelf, RepairAutoDate, RepairCompletionDate, PartyAgreed,
    ReasonThereofDelay, AnyFurtherConversation, RepairingPhotoDate,
    ReinspectionDate, SalveDestroy, BillNo, BillDate, BillAmount,
    Endurance, OtherRemark, SummaryNotes
  ) VALUES (
    ${TotalLabor}, ${TotalEstimate}, ${TotalCostOfParts}, '${LessExcess}',
    '${ExpectedSalvage}', ${MetalPercent}, '${RemarkOnSalvage}', '${Other}', ${GrandTotal},
    ${DepreciationOnParts}, ${NetAssessedAmount}, '${SavageDepreciationDetails}', '${CashLess}',
    '${NoteOfSelf}', '${formattedRepairAutoDate}', '${formattedRepairCompletionDate}', '${PartyAgreed}',
    '${ReasonThereofDelay}', '${AnyFurtherConversation}', '${formattedReparingPhotoDate}',
    '${formattedReInspectionDate}', '${SalveDestroy}', '${BillNo}', '${formattedBillDate}', '${BillAmount}',
    '${Endurance}', '${OtherRemark}', '${FinalReportNotes.replace(
    /'/g,
    "''"
  ).replace(/\n/g, "<br>")}'
  );
`;

  const insertTotalLossQuery = `
  INSERT INTO TotalLoss (
    CommTaxRatePct, CashLoss, SuspectedParts, WreckValueWith,
    WreckValueWithout, MissingItem, RtiAmount, totalLossEditorContent
  ) VALUES (
    '${CommTaxRatePct}', '${CashLoss}', '${SuspectedParts}', '${WreckValueWith}',
    '${WreckValueWithout}', '${MissingItem}', '${RtiAmount}', '${TotalLossEditor}'
  );
`;

  const newPartsQuery = `
  INSERT INTO NewPartsReport (IsImt)
  VALUES (${0});
`;

  const LabourQuery = `
  INSERT INTO LabourReport (IsImt)
  VALUES (${0});
`;

  if (!IMT) {
    db.query(newPartsQuery, (err, result2) => {
      if (err) {
        logMessage({
          type: "error",
          Function: `UPDATING_NEW_PART_WHEN_IMT_ZERO_FINAL_REPORT`,
          message: `Got error while inserting the ACCIDENT DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
          username: Username,
          leadId: leadId,
          consoleInfo: `Got error while inserting the New parts when IMT is 0 for the ${InspectionType}_report for leadId --> ${leadId}`,
          info: `{ERRMESSAGE : ${
            err.details
          }, STATUS : ${`${err.status} ${err.message}`},query:${newPartsQuery}, error : ${err}}}`,
        });
        console.error(err);
        res.status(500).send("Internal Server Error", err);
        return;
      }
    });
    db.query(LabourQuery, (err, result2) => {
      if (err) {
        logMessage({
          type: "error",
          Function: `UPDATING_LABOUR_WHEN_IMT_ZERO_FINAL_REPORT`,
          message: `Got error while inserting the ACCIDENT DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
          username: Username,
          leadId: leadId,
          consoleInfo: `Got error while inserting the Labour when IMT is 0 for the ${InspectionType}_report for leadId --> ${leadId}`,
          info: `{ERRMESSAGE : ${
            err.details
          }, STATUS : ${`${err.status} ${err.message}`},query:${LabourQuery}, error : ${err}}}`,
        });
        console.error(err);
        res.status(500).send("Internal Server Error", err);
        return;
      }
    });
  }

  db.query(insertClaimDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while inserting the CLAIM DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while inserting the CLAIM DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${insertClaimDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });

  db.query(insertAccidentDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while inserting the ACCIDENT DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while inserting the ACCIDENT DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${insertAccidentDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });
  db.query(insertDriverDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while inserting the DRIVER DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while inserting the DRIVER DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${insertDriverDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });
  db.query(insertGarageDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while inserting the GARAGE DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while inserting the GARAGE DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${insertGarageDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });

  db.query(insertInsuredDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while inserting the INSURED DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while inserting the INSURED DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${insertInsuredDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });
  db.query(insertVehicleDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while inserting the VEHICLE DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while inserting the VEHICLE DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${insertVehicleDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });

  db.query(insertSummaryDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while inserting the SUMMARY DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while inserting the SUMMARY DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${insertSummaryDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });

  db.query(insertTotalLossQuery, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while inserting the Total Loss DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while inserting the Total Loss for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${insertTotalLossQuery}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });

  db.query(insertCommercialVehicleDetails, (err, result2) => {
    if (err) {
      logMessage({
        type: "error",
        Function: `UPDATING_FINAL_REPORT`,
        message: `Got error while inserting the COMMERCIAL DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        username: Username,
        leadId: leadId,
        consoleInfo: `Got error while inserting the COMMERCIAL DETAILS for the ${InspectionType}_report for leadId --> ${leadId}`,
        info: `{ERRMESSAGE : ${
          err.details
        }, STATUS : ${`${err.status} ${err.message}`},query:${insertCommercialVehicleDetails}, error : ${err}}}`,
      });
      console.error(err);
      res.status(500).send("Internal Server Error", err);
      return;
    }
  });

  logMessage({
    type: "info",
    Function: `INSERT_FINAL_REPORT`,
    message: `Inserted successfully the final report for leadId ---> ${leadId}`,
    username: Username,
    leadId: leadId,
    consoleInfo: `Inserted successfully the final report for leadId ---> ${leadId}`,
    info: `{message : 200 SUCCESS }`,
  });
  res.status(200).send("Successfully Inserted!!");
};

module.exports = { updateFinalReport, exportToFinal };
