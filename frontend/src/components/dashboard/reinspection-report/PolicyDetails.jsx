import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import ReactEditor from "../../common/TextEditor";

const PolicyDetails = ({
  setIsStatusModal,
  setPolicyType,
  policyType,
  isEditMode,
  setIsEditMode,
  setPhoneNumber,
  setApplicantNumber,
  disable,
  handleUpdateClick,
  IDV,
  setShowInReport,
  showInreport,
  setIDV,
  PolicyPeriodEnd,
  setPolicyPeriodEnd,
  setPolicyPeriodStart,
  PolicyPeriodStart,
  HPA,
  setHPA,
  ClaimServicingOffice,
  setClaimServicingOffice,
  VehicleMakeVariantModelColor,
  setVehicleMakeVariantModelColor,
  VehicleColor,
  setVehicleColor,
  DateOfBirth,
  setDateOfBirth,

  claim,
  ReferenceNo,
  setReferenceNo,
  ClaimNumber,
  EngineType,
  setEngineType,
  DateRegistration,
  setDateRegistration,
  PUCNumber,
  setPUCNumber,
  TransferDate,
  setTransferDate,
  AddedBy,
  setAddedBy,
  Verification,
  setVerification,

  GarageNameAndAddress,
  setGarageNameAndAddress,
  GarageContactNo,
  setGarageContactNo1,
  GarageContactNo2,
  setGarageContactNo2,
  GarageAddedBy,
  setGarageAddedBy,

  ClaimAddedDateTime,
  setClaimAddedDateTime,
  PolicyIssuingOffice,
  setPolicyIssuingOffice,

  PolicyNumber,
  setPolicyNumber,
  InsuranceCompanyNameAddress,
  setInsuranceCompanyNameAddress,
  InsuredAddress,
  setInsuredAddress,
  InsuredName,
  setInsuredName,
  setClaimNumber,

  DriverName,
  setDriverName,
  IssuingAuthority,
  setIssuingAuthority,
  LicenseNumber,
  setLicenseNumber,
  LicenseType,
  setLicenseType,
  BadgeNumber,
  setBadgeNumber,

  VehicleRegisteredNumber,
  setVehicleRegisteredNumber,
  RegisteredOwner,
  setRegisteredOwner,
  VehicleChassisNumber,
  setVehicleChassisNumber,
  EngineNumber,
  setEngineNumber,
  VehicleTypeOfBody,
  setVehicleTypeOfBody,
  VehicleCubicCapacity,
  setVehicleCubicCapacity,
  VehicleClassOfVehicle,
  setVehicleClassOfVehicle,
  VehicleFuelType,
  setVehicleFuelType,
  VehicleOdometerReading,
  setVehicleOdometerReading,
  VehiclePreAccidentCondition,
  setVehiclePreAccidentCondition,
  DateOfIssue,
  setDateOfIssue,
  VehicleTaxParticulars,
  setVehicleTaxParticulars,
  VehicleSeatingCapacity,
  setVehicleSeatingCapacity,

  VehicleType,
  setVehicleType,
  AntiTheft,
  setAntiTheft,
  RegLadenWt,
  setRegLadenWt,
  RemarkIfRLW,
  setRemarkIfRLW,
  RemarkIfULW,
  setRemarkIfULW,
  UnladenWT,
  setUnladenWT,
  VehicleRemark,
  setVehicleRemark,
  driverRemark,
  setDriverRemark,
  FitnessCertificate,
  setFitnessCertificate,
  FitnessFrom,
  setFitnessFrom,
  setFitnessTo,
  FitnessTo,
  PermitNo,
  setPermitNo,
  PermitFrom,
  setPermitFrom,
  PermitTo,
  setPermitTo,
  TypeOfPermit,
  setTypeOfPermit,
  Authorization,
  setAuthorization,
  AreasOfoperation,
  setAreasOfoperation,
  commercialRemark,
  setcommercialRemark,
  setValidUpto,
  ValidUpto,
  TotalLoss,
  setTotalLoss,
  exportHandler,
  IMT,
  setIMT,
  phyCheck,
  setphyCheck,
}) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    console.log("hidehide", hide);

    // Allow only numeric input
    const numericValue = inputValue.replace(/\D/g, "");

    // Restrict to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setApplicantNumber(truncatedValue);
    }

    setPhoneNumber(truncatedValue);
  };

  function removeMultipleSpaces(inputString) {
    // Use regular expression to replace multiple spaces with a single space
    const cleanedString = inputString?.replace(/\s+/g, " ").trim();
    return cleanedString;
  }

  function isvaliddate(date) {
    return (
      date !== null &&
      date !== undefined &&
      date !== "null" &&
      date !== "undefined"
    );
  }

  const openStatusUpdateHandler = () => {
    setIsStatusModal(true);
  };

  const formatDateUpdated = (dateString) => {
    if (!isvaliddate(dateString)) {
      console.error("Invalid date:", dateString);
      return null;
    }
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear().toString().slice(-4); // Get last two digits of the year

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const updatedFormatDate = (dateString) => {
    const isValidDate = (date) => {
      return (
        date !== null &&
        date !== undefined &&
        date !== "null" &&
        date !== "undefined"
      );
    };

    if (!isValidDate(dateString)) {
      console.error("Invalid date:", dateString);
      return null;
    }

    const separator = dateString.includes("/") ? "/" : "-";
    const parts = dateString.split(separator);
    let formattedDate;

    if (parts.length === 3 && parts[0].length === 4) {
      // YYYY-MM-DD format
      const [year, month, day] = parts;
      formattedDate = `${day?.padStart(2, "0")}-${month?.padStart(
        2,
        "0"
      )}-${year}`;
    } else {
      // MM-DD-YYYY format
      const [day, month, year] = parts;
      formattedDate = `${day?.padStart(2, "0")}-${month?.padStart(
        2,
        "0"
      )}-${year}`;
    }

    return formattedDate;
  };

  function removeTrailingSpaces(date) {
    return date.trim();
  }

  function localDate(dateString) {
    if (dateString && dateString !== "null") {
      const date = new Date(dateString);
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      };
      return date
        .toLocaleDateString("fr-CA", options)
        .replace(/\//g, "-")
        .trim();
    } else {
      return "";
    }
  }

  const convertDateFormatToDDMMYYYY = (dateString) => {
    if (
      !dateString ||
      dateString === undefined ||
      dateString === null ||
      dateString === "null" ||
      dateString === "undefined"
    ) {
      return dateString;
    }
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatDate = (dateString) => {
    if (!isvaliddate(dateString)) {
      console.error("Invalid date:", dateString);
      return null;
    }
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };
  function formatDateToISO(dateString) {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  }

  const formatDatenEXT = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const formatDateNextyear = (date) => {
    const dateObject = new Date(date);

    // Add 1 year to the date
    dateObject.setFullYear(dateObject.getFullYear() + 1);
    return formatDate(dateObject);
  };

  const getNextYear = () => {
    if (PolicyPeriodStart && !isNaN(new Date(PolicyPeriodStart).getTime())) {
      const oneYearLater = new Date(PolicyPeriodStart);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      oneYearLater.setMonth(oneYearLater.getMonth());
      oneYearLater.setDate(oneYearLater.getDate() - 1);
      const formattedDate = oneYearLater.toISOString().split("T")[0];
      console.log(formattedDate);
      return formattedDate;
    }
    return "";
  };

  function convertDateFormat(inputDate) {
    // Split the input date string based on "-" or "/"
    const parts = inputDate.split(/[-/]/);

    // Rearrange the parts to form the "yyyy-mm-dd" format
    const yyyy = parts[2];
    const mm = parts[1];
    const dd = parts[0];

    // Return the rearranged date parts joined with "-"
    return `${yyyy}-${mm}-${dd}`;
  }

  useEffect(() => {
    setPolicyPeriodEnd(getNextYear(PolicyPeriodStart));
  }, [PolicyPeriodStart]);
  //Update Document
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const [startDate, setStartDate] = useState("");

  const [hide, setHide] = useState(false);

  console.log("hidehide", hide);

  const handleCancelHnadler = () => {
    setIsEditMode(false);
  };

  return (
    <>
      {/* <div className="row">
        <div className="col-lg-3">
          <div className="row mt-1 mb-1">
            <div className="col-lg-6 text-end my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                Reference No. #
              </label>
            </div>
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={ReferenceNo}
                readOnly={!isEditMode}
                onChange={(e) => setReferenceNo(e.target.value)}
                // placeholder="Enter Registration No."
              />
            </div>
          </div>
        </div>

        <div className="col-lg-2">
          <div className="row mt-1">
            <div className="col-lg-3 text-end my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#2e008b",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                Date
              </label>
            </div>
            <div className="col-lg-9">
              {!isEditMode ? (
                <input
                  readOnly={!isEditMode}
                  type={"text"}
                  value={
                    ClaimAddedDateTime
                      ? formatDateUpdated(ClaimAddedDateTime)
                      : ""
                  }
                  className="form-control"
                  id="propertyTitle"
                />
              ) : (
                <input
                  type="date"
                  disabled={!isEditMode}
                  //
                  value={localDate(ClaimAddedDateTime)}
                  onChange={(e) => setClaimAddedDateTime(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="row">
            <div className="col-lg-3 text-end my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#2e008b",
                  fontWeight: "",
                  fontSize: "14px",
                  marginTop: "5px",
                }}
              >
                Vehicle
              </label>
            </div>
            <div className="col-lg-7">
              {!isEditMode ? (
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  readOnly={true}
                  value={VehicleType ? VehicleType : ""}
                />
              ) : (
                <select
                  style={{ padding: "2px", marginTop: "3px" }}
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={VehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  readOnly={!isEditMode}
                >
                  <option data-tokens="Status1">Select</option>
                  <option data-tokens="Status2">Swift</option>
                  <option data-tokens="Status3">Honda</option>
                  <option data-tokens="Status4">Maruti Sukuzi</option>
                </select>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4 text-end">
          <button className="btn btn-color m-1 " onClick={exportHandler}>
            <span className="ma-1">Export To Final</span>
          </button>
          {isEditMode ? (
            <>
              <button
                className="btn btn-color m-1"
                onClick={handleCancelHnadler}
              >
                Cancel
              </button>
              {
                <button
                  disabled={disable}
                  className="btn btn-color m-1"
                  onClick={() => {
                    setHide(true);
                    handleUpdateClick(setIsEditMode);
                  }}
                >
                  Update
                </button>
              }
            </>
          ) : (
            !hide &&
            claim?.claimDetails && (
              <button className="btn btn-color m-1" onClick={handleEditClick}>
                Edit
              </button>
            )
          )}
        </div>
        <hr />
      </div> */}

      <div className="row">
        <div
          className="col-lg-12"
          style={{
            borderRight: "3px solid grey",
            borderBottom: "3px solid grey",
          }}
        >
          {/* <hr /> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12 text-end">
                  {isEditMode ? (
                    <>
                      <button
                        className="btn btn-color m-1"
                        onClick={handleCancelHnadler}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-color m-1"
                        onClick={handleUpdateClick}
                      >
                        Update
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-color m-1"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-color m-1"
                    onClick={handleEditClick}
                  >
                    Add
                  </button>
                  <button
                    className="btn btn-color m-1"
                    onClick={handleEditClick}
                  >
                    Modify
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <div className="row mt-1">
                    <div className="col-lg-4 my_profile_setting_input form-group text-end text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          paddingTop: "5px",
                          color: "#2e008b",
                          fontWeight: "",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Ref#
                      </label>
                    </div>
                    <div className="col-lg-8" style={{ marginLeft: "" }}>
                      <input
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        value={
                          PolicyNumber && PolicyNumber !== "null"
                            ? PolicyNumber
                            : ""
                        }
                        readOnly={!isEditMode}
                        onChange={(e) => setPolicyNumber(e.target.value)}

                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-lg-4 text-end my_profile_setting_input form-group">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          paddingTop: "5px",
                          color: "#2e008b",
                          fontWeight: "",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Insurers :
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        readOnly={!isEditMode}
                        value={
                          InsuredName && InsuredName !== "null"
                            ? InsuredName
                            : ""
                        }
                        onChange={(e) => setInsuredName(e.target.value)}
                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-lg-4 text-end my_profile_setting_input form-group">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "15px",
                          color: "#2e008b",
                          fontWeight: "",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Policy# :
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="InsuredAddress"
                        // value={
                        //   InsuredAddress && InsuredAddress !== "null"
                        //     ? InsuredAddress
                        //     : ""
                        // }/
                        value={InsuredAddress}
                        onChange={(e) => setInsuredAddress(e.target.value)}
                        readOnly={!isEditMode}

                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-lg-4 text-end my_profile_setting_input form-group">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "15px",
                          color: "#2e008b",
                          fontWeight: "",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Reg# :
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        value={HPA && HPA !== "null" ? HPA : ""}
                        readOnly={!isEditMode}
                        onChange={(e) => setHPA(e.target.value)}
                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-lg-4 my_profile_setting_input form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "15px",
                          color: "#2e008b",
                          fontWeight: "",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Make/Mod. :
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        value={
                          InsuranceCompanyNameAddress &&
                          InsuranceCompanyNameAddress !== "Null"
                            ? InsuranceCompanyNameAddress
                            : ""
                        }
                        readOnly={!isEditMode}
                        onChange={(e) =>
                          setInsuranceCompanyNameAddress(e.target.value)
                        }

                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-lg-4 text-end my_profile_setting_input form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "15px",
                          color: "#2e008b",
                          fontWeight: "",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Insured :
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        // value={claim.claimDetails?.ClaimNumber ? claim.claimDetails.ClaimNumber : ''}
                        value={ClaimNumber}
                        readOnly={!isEditMode}
                        onChange={(e) => setClaimNumber(e.target.value)}

                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row mt-1">
                    <div className="col-lg-2 form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "15px",
                          color: "#2e008b",
                          fontWeight: "bold",
                          paddingRight: "-10px",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Date :
                      </label>
                    </div>
                    <div className="col-lg-4">
                      {!isEditMode ? (
                        <input
                          readOnly={!isEditMode}
                          type={"text"}
                          value={
                            PolicyPeriodStart && PolicyPeriodStart !== "null"
                              ? formatDateUpdated(PolicyPeriodStart)
                              : ""
                          }
                          className="form-control"
                          id="propertyTitle"
                        />
                      ) : (
                        <input
                          type="date"
                          disabled={!isEditMode}
                          value={localDate(PolicyPeriodStart)}
                          onChange={(e) => setPolicyPeriodStart(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-lg-6 mt-2">
                      <div className="row">
                        <div className="col-lg-4 my_profile_setting_input form-group text-end">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              paddingTop: "5px",
                              color: "#2e008b",
                              fontWeight: "",
                              // marginTop: "-13px",
                              fontSize: "14px",
                            }}
                          >
                            Office :
                          </label>
                        </div>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            readOnly={!isEditMode}
                            value={
                              PolicyIssuingOffice &&
                              PolicyIssuingOffice !== "null"
                                ? PolicyIssuingOffice
                                : ""
                            }
                            onChange={(e) =>
                              setPolicyIssuingOffice(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-1">
                      <div className="row" style={{ paddingRight: "0px" }}>
                        <div className="col-lg-4 my_profile_setting_input form-group text-end">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              paddingTop: "5px",
                              color: "#2e008b",
                              fontWeight: "",
                              // marginTop: "-13px",
                              fontSize: "14px",
                            }}
                          >
                            Appointing Office :
                          </label>
                        </div>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              ClaimServicingOffice &&
                              ClaimServicingOffice !== "null"
                                ? ClaimServicingOffice
                                : ""
                            }
                            onChange={(e) =>
                              setClaimServicingOffice(e.target.value)
                            }
                            readOnly={!isEditMode}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-1">
                      <div className="row">
                        <div className="col-lg-4 my_profile_setting_input form-group text-end">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              paddingTop: "5px",
                              color: "#2e008b",
                              fontWeight: "",
                              // marginTop: "-13px",
                              fontSize: "14px",
                            }}
                          >
                            Claim # :
                          </label>
                        </div>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            readOnly={!isEditMode}
                            value={
                              PolicyIssuingOffice &&
                              PolicyIssuingOffice !== "null"
                                ? PolicyIssuingOffice
                                : ""
                            }
                            onChange={(e) =>
                              setPolicyIssuingOffice(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-1">
                      <div className="row">
                        <div className="col-lg-4 form-group text-end">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#2e008b",
                              fontWeight: "bold",
                              paddingRight: "-10px",
                              // marginTop: "-13px",
                              fontSize: "14px",
                            }}
                          >
                            Allotment Date :
                          </label>
                        </div>
                        <div className="col-lg-8">
                          {!isEditMode ? (
                            <input
                              readOnly={!isEditMode}
                              type={"text"}
                              value={
                                PolicyPeriodStart &&
                                PolicyPeriodStart !== "null"
                                  ? formatDateUpdated(PolicyPeriodStart)
                                  : ""
                              }
                              className="form-control"
                              id="propertyTitle"
                            />
                          ) : (
                            <input
                              type="date"
                              disabled={!isEditMode}
                              value={localDate(PolicyPeriodStart)}
                              onChange={(e) =>
                                setPolicyPeriodStart(e.target.value)
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-1">
                      <div className="row">
                        <div className="col-lg-4 my_profile_setting_input form-group text-end">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              paddingTop: "5px",
                              color: "#2e008b",
                              fontWeight: "",
                              // marginTop: "-13px",
                              fontSize: "14px",
                            }}
                          >
                            Chasis # :
                          </label>
                        </div>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            readOnly={!isEditMode}
                            value={
                              PolicyIssuingOffice &&
                              PolicyIssuingOffice !== "null"
                                ? PolicyIssuingOffice
                                : ""
                            }
                            onChange={(e) =>
                              setPolicyIssuingOffice(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-1">
                      <div className="row" style={{ paddingRight: "0px" }}>
                        <div className="col-lg-4 my_profile_setting_input form-group text-end">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              paddingTop: "5px",
                              color: "#2e008b",
                              fontWeight: "",
                              // marginTop: "-13px",
                              fontSize: "14px",
                            }}
                          >
                            Engine # :
                          </label>
                        </div>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              ClaimServicingOffice &&
                              ClaimServicingOffice !== "null"
                                ? ClaimServicingOffice
                                : ""
                            }
                            onChange={(e) =>
                              setClaimServicingOffice(e.target.value)
                            }
                            readOnly={!isEditMode}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-1">
                      <div className="row">
                        <div className="col-lg-4 form-group text-end">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#2e008b",
                              fontWeight: "bold",
                              paddingRight: "-10px",
                              // marginTop: "-13px",
                              fontSize: "14px",
                            }}
                          >
                            Date of Loss :
                          </label>
                        </div>
                        <div className="col-lg-8">
                          {!isEditMode ? (
                            <input
                              readOnly={!isEditMode}
                              type={"text"}
                              value={
                                PolicyPeriodStart &&
                                PolicyPeriodStart !== "null"
                                  ? formatDateUpdated(PolicyPeriodStart)
                                  : ""
                              }
                              className="form-control"
                              id="propertyTitle"
                            />
                          ) : (
                            <input
                              type="date"
                              disabled={!isEditMode}
                              value={localDate(PolicyPeriodStart)}
                              onChange={(e) =>
                                setPolicyPeriodStart(e.target.value)
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-1">
                      <div className="row">
                        <div className="col-lg-4 form-group text-end">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#2e008b",
                              fontWeight: "bold",
                              paddingRight: "-10px",
                              // marginTop: "-13px",
                              fontSize: "14px",
                            }}
                          >
                            Inspection :
                          </label>
                        </div>
                        <div className="col-lg-8">
                          {!isEditMode ? (
                            <input
                              readOnly={!isEditMode}
                              type={"text"}
                              value={
                                PolicyPeriodStart &&
                                PolicyPeriodStart !== "null"
                                  ? formatDateUpdated(PolicyPeriodStart)
                                  : ""
                              }
                              className="form-control"
                              id="propertyTitle"
                            />
                          ) : (
                            <input
                              type="date"
                              disabled={!isEditMode}
                              value={localDate(PolicyPeriodStart)}
                              onChange={(e) =>
                                setPolicyPeriodStart(e.target.value)
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-3">
                      <div className="row" style={{ paddingRight: "0px" }}>
                        <div className="col-lg-4 my_profile_setting_input form-group text-end">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              paddingTop: "5px",
                              color: "#2e008b",
                              fontWeight: "",
                              // marginTop: "-13px",
                              fontSize: "14px",
                            }}
                          >
                            Survey Place :
                          </label>
                        </div>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              ClaimServicingOffice &&
                              ClaimServicingOffice !== "null"
                                ? ClaimServicingOffice
                                : ""
                            }
                            onChange={(e) =>
                              setClaimServicingOffice(e.target.value)
                            }
                            readOnly={!isEditMode}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-lg-3">
                  <div className="row mt-1">
                    <div className="col-lg-2 my_profile_setting_input form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "15px",
                          color: "#2e008b",
                          fontWeight: "",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Type
                      </label>
                    </div>
                    <div className="col-lg-10">
                      <select
                        style={{ padding: "2px" }}
                        className="selectpicker form-select"
                        data-live-search="true"
                        data-width="100%"
                        disabled={!isEditMode}
                        value={
                          policyType && policyType !== "null" ? policyType : ""
                        }
                        onChange={(e) => setPolicyType(e.target.value)}
                      >
                        <option data-tokens="Status1" value={"Regular"}>
                          Regular
                        </option>
                        <option data-tokens="Status2" value={"Add on Policy"}>
                          Add on Policy
                        </option>
                        <option
                          data-tokens="Status3"
                          value={"Add on Policy(Not Effective)"}
                        >
                          Add on Policy(Not Effective)
                        </option>
                      </select>
                    </div>
                  </div>
                </div> */}

              {/* <div className="col-lg-2">
                  <div className="row mt-1">
                    <div className="col-lg-2 my_profile_setting_input form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "15px",
                          color: "#2e008b",
                          fontWeight: "",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        To
                      </label>
                    </div>
                    <div className="col-lg-10">
                      {!isEditMode ? (
                        <input
                          readOnly={!isEditMode}
                          type={"text"}
                          value={
                            PolicyPeriodEnd && PolicyPeriodEnd !== "null"
                              ? formatDateUpdated(PolicyPeriodEnd)
                              : ""
                          }
                          className="form-control"
                          id="propertyTitle"
                        />
                      ) : (
                        <input
                          type="date"
                          disabled={!isEditMode}
                          value={localDate(PolicyPeriodEnd)}
                          onChange={(e) => setPolicyPeriodEnd(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div> */}
            </div>
            <div className="col-lg-12 mt-4">
              <div className="row">
                <div className="col-lg-8 mb-2">
                  <ReactEditor />
                </div>
                <div className="col-lg-4 mb-2">
                  <ReactEditor />
                </div>
              </div>
            </div>
            <div className="col-lg-12 mb-2">
              <div className="row">
                <div className="col-lg-2">
                  <div className="row">
                    <div className="col-lg-5 form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "15px",
                          color: "#2e008b",
                          fontWeight: "bold",
                          paddingRight: "-10px",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        # of Photos :
                      </label>
                    </div>
                    <div className="col-lg-7">
                      {!isEditMode ? (
                        <input
                          readOnly={!isEditMode}
                          type={"text"}
                          value={
                            PolicyPeriodStart && PolicyPeriodStart !== "null"
                              ? formatDateUpdated(PolicyPeriodStart)
                              : ""
                          }
                          className="form-control"
                          id="propertyTitle"
                        />
                      ) : (
                        <input
                          type="date"
                          disabled={!isEditMode}
                          value={localDate(PolicyPeriodStart)}
                          onChange={(e) => setPolicyPeriodStart(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-2 form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "15px",
                          color: "#2e008b",
                          fontWeight: "bold",
                          paddingRight: "-10px",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Encloser :
                      </label>
                    </div>
                    <div className="col-lg-10">
                      {!isEditMode ? (
                        <input
                          readOnly={!isEditMode}
                          type={"text"}
                          value={
                            PolicyPeriodStart && PolicyPeriodStart !== "null"
                              ? formatDateUpdated(PolicyPeriodStart)
                              : ""
                          }
                          className="form-control"
                          id="propertyTitle"
                        />
                      ) : (
                        <input
                          type="date"
                          disabled={!isEditMode}
                          value={localDate(PolicyPeriodStart)}
                          onChange={(e) => setPolicyPeriodStart(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="row">
                    <div className="col-lg-5 form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "15px",
                          color: "#2e008b",
                          fontWeight: "bold",
                          paddingRight: "-10px",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Submitted :
                      </label>
                    </div>
                    <div className="col-lg-6">
                      {!isEditMode ? (
                        <input
                          className="text-center"
                          type="checkbox"
                          id="terms"
                          // disabled={!isEditMode}
                          style={{
                            border: "1px solid black",
                            marginLeft: "0px",
                          }}
                        />
                      ) : (
                        <input
                          type="date"
                          disabled={!isEditMode}
                          value={localDate(PolicyPeriodStart)}
                          onChange={(e) => setPolicyPeriodStart(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <hr /> */}
        </div>
      </div>
    </>
  );
};

export default PolicyDetails;
