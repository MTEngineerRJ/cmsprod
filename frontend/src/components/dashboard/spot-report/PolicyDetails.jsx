import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

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
      <div className="row">
        {/* <hr /> */}
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
      </div>

      <div className="row">
        <div
          className="col-lg-8"
          style={{
            borderRight: "3px solid grey",
            borderBottom: "3px solid grey",
          }}
        >
          <h4 className="text-dark" style={{ fontSize: "17px" }}>
            Policy Details :
          </h4>
          <hr />
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-7">
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
                        Policy#
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
                 
                </div>

                <div className="col-lg-5">
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
                        Insured :
                      </label>
                    </div>
                    <div className="col-lg-7">
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
                </div>
                <div className="col-lg-4">
                  <div className="row mt-1">
                    <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                        I.D.V.
                      </label>
                    </div>
                    <div className="col-lg-5">
                      <input
                        type="number"
                        className="form-control"
                        id="propertyTitle"
                        value={IDV && IDV !== "null" ? IDV : ""}
                        onChange={(e) => setIDV(e.target.value)}
                        readOnly={!isEditMode}
                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
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
                </div>
                <div className="col-lg-5">
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
                        Address :
                      </label>
                    </div>
                    <div className="col-lg-7">
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
                </div>
                <div className="col-lg-4">
                  <div className="row mt-1">
                    <div className="col-lg-7 form-group text-end">
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
                        Insurance From
                      </label>
                    </div>

                    <div className="col-lg-5">
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

                <div className="col-lg-3">
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
                    <div className="col-lg-5">
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
                </div>

                <div className="col-lg-5">
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
                        H.P.A. :
                      </label>
                    </div>
                    <div className="col-lg-7">
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
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7">
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
                        Insurers :
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
                </div>
                <div className="col-lg-5">
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
                        Claim # :
                      </label>
                    </div>
                    <div className="col-lg-7">
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
                <div className="col-lg-7">
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
                        Insurance Office :
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        readOnly={!isEditMode}
                        value={
                          PolicyIssuingOffice && PolicyIssuingOffice !== "null"
                            ? PolicyIssuingOffice
                            : ""
                        }
                        onChange={(e) => setPolicyIssuingOffice(e.target.value)}

                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 text-end">
                  <div className="form-group form-check custom-checkbox">
                    <label
                      className="form-check-label"
                      htmlFor="terms"
                      style={{
                        color: "#2e008b",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Total Loss
                    </label>
                    <input
                      className="m-2"
                      type="checkbox"
                      id="terms"
                      disabled={!isEditMode}
                      checked={
                        TotalLoss && TotalLoss !== "null" ? TotalLoss : ""
                      }
                      style={{ border: "1px solid black" }}
                      onChange={(e) => setTotalLoss(!TotalLoss)}
                    />
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="form-group form-check custom-checkbox">
                    <label
                      className="form-check-label"
                      htmlFor="terms"
                      style={{
                        color: "#2e008b",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      IMT 23
                    </label>
                    <input
                      className="m-2"
                      type="checkbox"
                      checked={IMT && IMT !== "null" ? IMT : ""}
                      id="terms"
                      disabled={!isEditMode}
                      style={{ border: "1px solid black" }}
                      onChange={(e) => setIMT(!IMT)}
                    />
                  </div>
                </div>
                <div className="col-lg-7 mt-0">
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
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <div className="mb-2" style={{ border: "2px solid grey" }}></div>
          <div className="row">
            <div className="col-lg-12" style={{ borderTop: "" }}>
              <h4 className="text-dark" style={{ fontSize: "17px" }}>
                Vehicle Details :
              </h4>
              <hr />
              <div className="row">
                <div className="col-lg-7">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row mt-1">
                        <div className="col-lg-4 my_profile_setting_input form-group text-end text-end">
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
                            Registration#
                          </label>
                        </div>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              VehicleRegisteredNumber &&
                              VehicleRegisteredNumber !== "null"
                                ? VehicleRegisteredNumber
                                : ""
                            }
                            readOnly={!isEditMode}
                            onChange={(e) =>
                              setVehicleRegisteredNumber(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
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
                            Registered Owner
                          </label>
                        </div>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            readOnly={!isEditMode}
                            value={
                              RegisteredOwner && RegisteredOwner !== "null"
                                ? RegisteredOwner
                                : ""
                            }
                            onChange={(e) => setRegisteredOwner(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    {/*<div className="col-lg-12">
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
                            Owner SR / TR
                          </label>
                        </div>
                        <div className="col-lg-8">
                          {/*<input
                            type={isEditMode ? "date" : "text"}
                            className="form-control"
                            id="propertyTitle"
                            readOnly={!isEditMode}
                            value={formatDate(OwnerSRST)}
                            onChange={(e) => setOwnerSRST(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                          {!isEditMode ? (
                            <input
                              readOnly={!isEditMode}
                              type={"text"}
                              value={OwnerSRST ? formatDate(OwnerSRST) : ""}
                              className="form-control"
                              id="propertyTitle"
                            />
                          ) : (
                            // <MyDatePicker
                            //   disable={!isEditMode}
                            //   selectedDate={
                            //     OwnerSRST ? new Date(OwnerSRST) : ""
                            //   }
                            //   setSelectedDate={setOwnerSRST}
                            // />

                            // <DatePicker
                            //   className="form-control"
                            //   id="propertyTitle"
                            //   selected={
                            //     OwnerSRST !== null &&
                            //    (OwnerSRST) // Example: YYYY-MM-DD format
                            //       ? new Date(OwnerSRST)
                            //       : ''
                            //   }
                            //   onChange={(date) => setOwnerSRST(date)}
                            // />
                            <input
                              type="date"
                              disabled={!isEditMode}
                              value={
                                OwnerSRST && OwnerSRST !== "null"
                                  ? OwnerSRST.substring(0, 10)
                                  : ""
                              }
                              onChange={(e) => setOwnerSRST(e.target.value)}
                            />
                          )}
                        </div>
                      </div> 
                            </div>*/}
                    <div className="col-lg-12">
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
                            Date of Registration :
                          </label>
                        </div>

                        <div className="col-lg-4">
                          {!isEditMode ? (
                            <input
                              readOnly={!isEditMode}
                              type={"text"}
                              value={
                                DateRegistration !== "null" &&
                                DateRegistration !== "null"
                                  ? formatDateUpdated(DateRegistration)
                                  : ""
                              }
                              className="form-control"
                              id="propertyTitle"
                            />
                          ) : (
                            <input
                              type="date"
                              disabled={!isEditMode}
                              value={localDate(DateRegistration)}
                              onChange={(e) =>
                                setDateRegistration(e.target.value)
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group text-end">
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
                            Chasis#
                          </label>
                        </div>
                        <div
                          className="col-lg-6"
                          style={{ marginLeft: "10px" }}
                        >
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              VehicleChassisNumber &&
                              VehicleChassisNumber !== "null"
                                ? VehicleChassisNumber
                                : ""
                            }
                            readOnly={!isEditMode}
                            onChange={(e) =>
                              setVehicleChassisNumber(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="m-1">
                        <label
                          className=""
                          htmlFor="terms"
                          style={{
                            color: "#2e008b",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          phy check
                        </label>
                        <input
                          className="form-check-input m-1"
                          type="checkbox"
                          value={phyCheck}
                          id="terms"
                          style={{ border: "1px solid black" }}
                          onChange={(e) => setphyCheck(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-9">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group text-end">
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
                            Engine#
                          </label>
                        </div>
                        <div
                          className="col-lg-6"
                          style={{ marginLeft: "10px" }}
                        >
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              EngineNumber && EngineNumber !== "null"
                                ? EngineNumber
                                : ""
                            }
                            readOnly={!isEditMode}
                            onChange={(e) => setEngineNumber(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="m-1">
                        <label
                          className=""
                          htmlFor="terms"
                          style={{
                            color: "#2e008b",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          phy check
                        </label>
                        <input
                          className="form-check-input m-1"
                          type="checkbox"
                          value=""
                          id="terms"
                          style={{ border: "1px solid black" }}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
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
                            Make/Variant
                          </label>
                        </div>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              VehicleMakeVariantModelColor &&
                              VehicleMakeVariantModelColor !== "null"
                                ? VehicleMakeVariantModelColor
                                : ""
                            }
                            readOnly={!isEditMode}
                            onChange={(e) =>
                              setVehicleMakeVariantModelColor(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-7">
                      <div className="row mt-1">
                        <div className="col-lg-6 my_profile_setting_input form-group text-end">
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
                            Type of Body
                          </label>
                        </div>
                        <div
                          className="col-lg-5"
                          style={{ marginLeft: "20px" }}
                        >
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              VehicleTypeOfBody && VehicleTypeOfBody !== "null"
                                ? VehicleTypeOfBody
                                : ""
                            }
                            readOnly={!isEditMode}
                            onChange={(e) =>
                              setVehicleTypeOfBody(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="row mt-1">
                        <div className="col-lg-3 text-end my_profile_setting_input form-group">
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
                            Color
                          </label>
                        </div>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            className="form-control"
                            id="color"
                            value={
                              VehicleColor && VehicleColor !== "null"
                                ? VehicleColor
                                : ""
                            }
                            readOnly={!isEditMode}
                            onChange={(e) => setVehicleColor(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="row mt-1">
                        <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                            Cubic Capacity
                          </label>
                        </div>
                        <div
                          className="col-lg-5"
                          style={{ marginLeft: "-4px" }}
                        >
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              VehicleCubicCapacity &&
                              VehicleCubicCapacity !== "null"
                                ? VehicleCubicCapacity
                                : ""
                            }
                            readOnly={!isEditMode}
                            onChange={(e) =>
                              setVehicleCubicCapacity(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="row mt-1">
                        <div className="col-lg-5 text-end my_profile_setting_input form-group">
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
                            Anti theft
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="color"
                            // value={VehicleModel}
                            value={
                              AntiTheft && AntiTheft !== "null" ? AntiTheft : ""
                            }
                            onChange={(e) => setAntiTheft(e.target.value)}
                            readOnly={!isEditMode}
                            // onChange={(e) => setVehicleTypeOfBody(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="col-lg-12">
                    <div className="row mt-1">
                      <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                          Reg Laden Wt(Kgs)
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="number"
                          className="form-control"
                          id="propertyTitle"
                          value={
                            RegLadenWt && RegLadenWt !== "null"
                              ? RegLadenWt
                              : ""
                          }
                          onChange={(e) => setRegLadenWt(e.target.value)}
                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="row mt-1">
                      <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                          Remark(if RLW N.A)
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          readonly={!isEditMode}
                          className="form-control"
                          id="propertyTitle"
                          readOnly={!isEditMode}
                          value={
                            RemarkIfRLW && RemarkIfRLW !== "null"
                              ? RemarkIfRLW
                              : ""
                          }
                          onChange={(e) => setRemarkIfRLW(e.target.value)}

                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="row mt-1">
                      <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                          Unladen WT(Kgs)
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="number"
                          className="form-control"
                          id="propertyTitle"
                          readOnly={!isEditMode}
                          value={
                            UnladenWT && UnladenWT !== "null" ? UnladenWT : ""
                          }
                          onChange={(e) => setUnladenWT(e.target.value)}

                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="row mt-1">
                      <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                          Remark(if ULW N.A)
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          readonly={!isEditMode}
                          className="form-control"
                          id="propertyTitle"
                          readOnly={!isEditMode}
                          value={
                            RemarkIfULW && RemarkIfULW !== "null"
                              ? RemarkIfULW
                              : ""
                          }
                          onChange={(e) => setRemarkIfULW(e.target.value)}

                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="row mt-1">
                      <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                          Seating Capacity
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          value={
                            VehicleSeatingCapacity &&
                            VehicleSeatingCapacity !== "null"
                              ? VehicleSeatingCapacity
                              : ""
                          }
                          readOnly={!isEditMode}
                          onChange={(e) =>
                            setVehicleSeatingCapacity(e.target.value)
                          }
                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="row mt-1">
                      <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                          Class of Vehicle
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          value={
                            VehicleClassOfVehicle &&
                            VehicleClassOfVehicle !== "null"
                              ? VehicleClassOfVehicle
                              : ""
                          }
                          readOnly={!isEditMode}
                          onChange={(e) =>
                            setVehicleClassOfVehicle(e.target.value)
                          }

                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="row mt-1">
                      <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                          Fuel Used
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          value={
                            VehicleFuelType && VehicleFuelType !== "null"
                              ? VehicleFuelType
                              : ""
                          }
                          readOnly={!isEditMode}
                          onChange={(e) => setVehicleFuelType(e.target.value)}

                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="row mt-1">
                      <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                          Odometer Reading
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="number"
                          className="form-control"
                          id="propertyTitle"
                          readOnly={!isEditMode}
                          value={
                            VehicleOdometerReading &&
                            VehicleOdometerReading !== "null"
                              ? VehicleOdometerReading
                              : ""
                          }
                          onChange={(e) =>
                            setVehicleOdometerReading(e.target.value)
                          }

                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="row mt-1">
                      <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                          Pre Accident Condition
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          readOnly={!isEditMode}
                          value={
                            VehiclePreAccidentCondition &&
                            VehiclePreAccidentCondition !== "null"
                              ? VehiclePreAccidentCondition
                              : ""
                          }
                          onChange={(e) =>
                            setVehiclePreAccidentCondition(e.target.value)
                          }

                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="row mt-1">
                      <div className="col-lg-7 my_profile_setting_input form-group text-end">
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
                          Tax Particulars
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          readOnly={!isEditMode}
                          value={formatDateUpdated(VehicleTaxParticulars)}
                          onChange={(e) =>
                            setVehicleTaxParticulars(e.target.value)
                          }

                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
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
                          Remark
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <select
                          readonly={!isEditMode}
                          style={{ padding: "2px" }}
                          className="selectpicker form-select"
                          data-live-search="true"
                          data-width="100%"
                          value={
                            VehicleRemark && VehicleRemark !== "null"
                              ? VehicleRemark
                              : ""
                          }
                          onChange={(e) => setVehicleRemark(e.target.value)}
                        >
                          <option data-tokens="Status1">
                            Verified from Original
                          </option>
                          <option data-tokens="Status2">
                            Verified from Online
                          </option>
                          <option data-tokens="Status3">
                            Verified from Orified
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4" style={{ borderBottom: "3px solid grey" }}>
          <h4 className="text-dark" style={{ fontSize: "17px" }}>
            Driver & Licence Details :
          </h4>
          <hr />
          <div className="row">
            <div className="col-lg-12">
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
                    Driver Name
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    readOnly={!isEditMode}
                    value={
                      DriverName && DriverName !== "null"
                        ? claim?.driverDetails?.FatherName === null ||
                          claim?.driverDetails?.FatherName === "null"
                          ? DriverName
                          : claim?.driverDetails?.Gender === "Male"
                          ? removeMultipleSpaces(DriverName) +
                            " " +
                            "S/o" +
                            " " +
                            removeMultipleSpaces(
                              claim?.driverDetails?.FatherName
                            )
                          : removeMultipleSpaces(DriverName) +
                            " " +
                            "D/o" +
                            " " +
                            removeMultipleSpaces(
                              claim?.driverDetails?.FatherName
                            )
                        : ""
                    }
                    onChange={(e) => setDriverName(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
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
                    Driver Lic. No.
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={
                      LicenseNumber && LicenseNumber !== "null"
                        ? LicenseNumber
                        : ""
                    }
                    readOnly={!isEditMode}
                    onChange={(e) => setLicenseNumber(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
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
                    Date of Birth
                  </label>
                </div>
                <div className="col-lg-8">
                  {!isEditMode ? (
                    <input
                      readOnly={!isEditMode}
                      type={"text"}
                      value={
                        DateOfBirth
                          ? convertDateFormatToDDMMYYYY(DateOfBirth)
                          : ""
                      }
                      className="form-control"
                      id="propertyTitle"
                    />
                  ) : (
                    <input
                      type="date"
                      disabled={!isEditMode}
                      value={localDate(DateOfBirth)}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row mt-1">
                <div className="col-lg-6 my_profile_setting_input form-group text-end text-end">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      paddingTop: "5px",
                      color: "#2e008b",
                      fontWeight: "",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                  >
                    Issue Date
                  </label>
                </div>
                <div className="col-lg-6">
                  {/* <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                  /> */}
                  {!isEditMode ? (
                    <input
                      readOnly={!isEditMode}
                      type={"text"}
                      value={
                        DateOfIssue !== "null" &&
                        DateOfIssue !== "" &&
                        DateOfIssue !== null
                          ? convertDateFormatToDDMMYYYY(DateOfIssue)
                          : ""
                      }
                      className="form-control"
                      id="propertyTitle"
                    />
                  ) : (
                    <input
                      type="date"
                      disabled={!isEditMode}
                      value={localDate(DateOfIssue)}
                      onChange={(e) => setDateOfIssue(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="row mt-1">
                <div className="col-lg-2 text-end my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      paddingTop: "5px",
                      color: "#2e008b",
                      fontWeight: "",
                      fontSize: "14px",
                      // marginTop: "-13px",
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
                        ValidUpto ? convertDateFormatToDDMMYYYY(ValidUpto) : ""
                      }
                      className="form-control"
                      id="propertyTitle"
                      // // disable={!isEdi
                    />
                  ) : (
                    <input
                      type="date"
                      disabled={!isEditMode}
                      value={localDate(ValidUpto)}
                      onChange={(e) => setValidUpto(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-12">
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
                    Issuing Authority
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={
                      IssuingAuthority && IssuingAuthority !== "null"
                        ? IssuingAuthority
                        : ""
                    }
                    readOnly={!isEditMode}
                    onChange={(e) => setIssuingAuthority(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-12">
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
                    License Type
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={
                      LicenseType && LicenseType !== "null" ? LicenseType : ""
                    }
                    readOnly={!isEditMode}
                    onChange={(e) => setLicenseType(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-12">
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
                    Badge#
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    readOnly={!isEditMode}
                    value={BadgeNumber}
                    onChange={(e) => setBadgeNumber(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-12">
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
                    Remark
                  </label>
                </div>
                <div className="col-lg-8">
                  <select
                    style={{ padding: "2px" }}
                    className="selectpicker form-select"
                    data-live-search="true"
                    data-width="100%"
                    readonly={!isEditMode}
                    value={
                      driverRemark && driverRemark !== "null"
                        ? driverRemark
                        : ""
                    }
                    onChange={(e) => setDriverRemark(e.target.value)}
                  >
                    <option data-tokens="Status1">
                      Verified from Original
                    </option>
                    <option data-tokens="Status2">Verified from Online</option>
                    <option data-tokens="Status3">Verified from Orified</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <div className="mb-2" style={{ border: "2px solid grey" }}></div>
          <div className="row" style={{ borderBottom: "" }}>
            <div className="col-lg-12">
              <h4 className="text-dark" style={{ fontSize: "17px" }}>
                Commercial Vehicle Details :
              </h4>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "6px",
                }}
              >
                <input
                  type="checkbox"
                  disabled={!isEditMode}
                  checked={showInreport}
                  onChange={(e) => setShowInReport(!showInreport)}
                />
                <label>{"  "} Show In Print</label>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="row mt-1">
                    <div className="col-lg-5 my_profile_setting_input form-group text-end">
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
                        Fitness Certificate
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <input
                        style={{ marginLeft: "-10px" }}
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        readOnly={!isEditMode}
                        value={
                          FitnessCertificate && FitnessCertificate !== "null"
                            ? FitnessCertificate
                            : ""
                        }
                        onChange={(e) => setFitnessCertificate(e.target.value)}

                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  <div className="row mt-1">
                    <div className="col-lg-7 my_profile_setting_input form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "5px",
                          color: "#2e008b",
                          fontWeight: "",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Fitness From
                      </label>
                    </div>
                    <div className="col-lg-5">
                      {/* <input
              type="date"
              className="form-control"
              id="propertyTitle"
            /> */}
                      {/*<input 
                      type={isEditMode ? "date" : "text"}
                      readonly={!isEditMode}
                      value={isEditMode ? FitnessFrom : formatDate(FitnessFrom)}
                      onChange={(e)=>setFitnessFrom(e.target.value)}
          />*/}
                      {!isEditMode ? (
                        <input
                          readOnly={!isEditMode}
                          type={"text"}
                          value={
                            FitnessFrom && FitnessFrom !== "null"
                              ? localDate(FitnessFrom)
                              : ""
                          }
                          className="form-control"
                          id="propertyTitle"
                        />
                      ) : (
                        // <MyDatePicker
                        // disable={!isEditMode}
                        // selectedDate={
                        //   FitnessFrom ? new Date(FitnessFrom) : ""
                        // }
                        // setSelectedDate={setFitnessFrom}
                        // />
                        // <DatePicker
                        //   className="form-control"
                        //   id="propertyTitle"
                        //   selected={
                        //     FitnessFrom !== null &&
                        //    (FitnessFrom) // Example: YYYY-MM-DD format
                        //       ? new Date(FitnessFrom)
                        //       : ''
                        //   }
                        //   onChange={(date) => setFitnessFrom(date)}
                        // />
                        <input
                          type="date"
                          disabled={!isEditMode}
                          value={
                            FitnessFrom && FitnessFrom !== "null"
                              ? FitnessFrom.substring(0, 10)
                              : ""
                          }
                          onChange={(e) => setFitnessFrom(e.target.value)}
                        />
                      )}
                      {/* <span className="flaticon-calendar text-dark"></span> */}
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="row mt-1">
                    <div className="col-lg-2 my_profile_setting_input form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          paddingTop: "5px",
                          color: "#2e008b",
                          fontWeight: "",
                          fontSize: "14px",
                          // marginTop: "-13px",
                        }}
                      >
                        To
                      </label>
                    </div>
                    <div className="col-lg-10">
                      {/* <input
              type="date"
              className="form-control"
              id="propertyTitle"
            /> */}
                      {/*<input
                      type={isEditMode ? "date" : "text"}
                      readonly={!isEditMode}
                      value={isEditMode ? FitnessTo : formatDate(FitnessTo)}
                      onChange={(e)=>setFitnessTo(e.target.value)}
          />*/}
                      {!isEditMode ? (
                        <input
                          readOnly={!isEditMode}
                          type={"text"}
                          value={
                            FitnessTo && FitnessTo !== "null"
                              ? localDate(FitnessTo)
                              : ""
                          }
                          className="form-control"
                          id="propertyTitle"
                        />
                      ) : (
                        // <MyDatePicker
                        // disable={!isEditMode}
                        // selectedDate={FitnessTo ? new Date(FitnessTo) : ""}
                        // setSelectedDate={setFitnessTo}
                        // />
                        // <DatePicker
                        //   className="form-control"
                        //   id="propertyTitle"
                        //   selected={
                        //     FitnessTo !== null &&
                        //    (FitnessTo) // Example: YYYY-MM-DD format
                        //       ? new Date(FitnessTo)
                        //       : ''
                        //   }
                        //   onChange={(date) => setFitnessTo(date)}
                        // />
                        <input
                          type="date"
                          disabled={!isEditMode}
                          value={
                            FitnessTo && FitnessTo !== "null"
                              ? FitnessTo.substring(0, 10)
                              : ""
                          }
                          onChange={(e) => setFitnessTo(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="row mt-1">
                    <div className="col-lg-5 my_profile_setting_input form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          paddingTop: "5px",
                          color: "#2e008b",
                          fontWeight: "",
                          fontSize: "14px",
                          // marginTop: "-13px",
                        }}
                      >
                        {" "}
                        Permit#
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <input
                        style={{ marginLeft: "-10px" }}
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        readOnly={!isEditMode}
                        value={PermitNo && PermitNo !== "null" ? PermitNo : ""}
                        onChange={(e) => setPermitNo(e.target.value)}

                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  <div className="row mt-1">
                    <div className="col-lg-7 my_profile_setting_input form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          // paddingTop: "5px",
                          color: "#2e008b",
                          fontWeight: "",
                          // marginTop: "-13px",
                          fontSize: "14px",
                        }}
                      >
                        Permit From
                      </label>
                    </div>
                    <div className="col-lg-5">
                      {!isEditMode ? (
                        <input
                          className="form-control"
                          type={"text"}
                          readonly={!isEditMode}
                          value={
                            PermitFrom && PermitFrom !== "null"
                              ? localDate(PermitFrom)
                              : ""
                          }
                        />
                      ) : (
                        // <MyDatePicker
                        // disable={!isEditMode}
                        // selectedDate={PermitFrom ? new Date(PermitFrom) : ""}
                        // setSelectedDate={setFitnessFrom}
                        // />
                        // <DatePicker
                        //   className="form-control"
                        //   id="propertyTitle"
                        //   selected={
                        //     PermitFrom !== null &&
                        //    (PermitFrom) // Example: YYYY-MM-DD format
                        //       ? new Date(PermitFrom)
                        //       : ''
                        //   }
                        //   onChange={(date) => setPermitFrom(date)}
                        // />
                        <input
                          type="date"
                          disabled={!isEditMode}
                          value={
                            PermitFrom && PermitFrom !== "null"
                              ? PermitFrom.substring(0, 10)
                              : ""
                          }
                          onChange={(e) => setPermitFrom(e.target.value)}
                        />
                      )}
                      {/* <span className="flaticon-calendar text-dark"></span> */}
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="row mt-1">
                    <div className="col-lg-2 my_profile_setting_input form-group text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          paddingTop: "5px",
                          color: "#2e008b",
                          fontWeight: "",
                          fontSize: "14px",
                          // marginTop: "-13px",
                        }}
                      >
                        To
                      </label>
                    </div>
                    <div className="col-lg-10">
                      {/* <input
              type="date"
              className="form-control"
              id="propertyTitle"
            /> */}
                      {!isEditMode ? (
                        <input
                          readOnly={!isEditMode}
                          type={"text"}
                          value={
                            PermitTo && PermitTo !== "null"
                              ? localDate(PermitTo)
                              : ""
                          }
                          className="form-control"
                          id="propertyTitle"
                        />
                      ) : (
                        // <MyDatePicker
                        // disable={!isEditMode}
                        // selectedDate={PermitTo ? new Date(PermitTo) : ""}
                        // setSelectedDate={setPermitTo}
                        // />
                        // <DatePicker
                        //   className="form-control"
                        //   id="propertyTitle"
                        //   selected={
                        //     PermitTo !== null &&
                        //    (PermitTo) // Example: YYYY-MM-DD format
                        //       ? new Date(PermitTo)
                        //       : ''
                        //   }
                        //   onChange={(date) => setPermitTo(date)}
                        // />
                        <input
                          type="date"
                          disabled={!isEditMode}
                          value={
                            PermitTo && PermitTo !== "null"
                              ? PermitTo.substring(0, 10)
                              : ""
                          }
                          onChange={(e) => setPermitTo(e.target.value)}
                        />
                      )}
                      {/* <input 
                      type={isEditMode ? "date" : "text"}
                      readonly={!isEditMode}
                      value={isEditMode ? PermitTo : formatDate(PermitTo)}
                      onChange={(e)=>setPermitTo(e.target.value)}
                      />*/}
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="row mt-1">
                    <div className="col-lg-5 my_profile_setting_input form-group text-end">
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
                        Type of Permit
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <input
                        style={{ marginLeft: "-10px" }}
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        readOnly={!isEditMode}
                        value={
                          TypeOfPermit && TypeOfPermit !== "null"
                            ? TypeOfPermit
                            : ""
                        }
                        onChange={(e) => setTypeOfPermit(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="row mt-1">
                    <div className="col-lg-5 my_profile_setting_input form-group text-end">
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
                        Authorization
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <input
                        style={{ marginLeft: "-10px" }}
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        readOnly={!isEditMode}
                        value={
                          Authorization && Authorization !== "null"
                            ? Authorization
                            : ""
                        }
                        onChange={(e) => setAuthorization(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="row mt-1">
                    <div className="col-lg-5 my_profile_setting_input form-group text-end">
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
                        Area of Operation
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <input
                        style={{ marginLeft: "-10px" }}
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        readOnly={!isEditMode}
                        value={
                          AreasOfoperation && AreasOfoperation !== "null"
                            ? AreasOfoperation
                            : ""
                        }
                        onChange={(e) => setAreasOfoperation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row mt-1">
                    <div className="col-lg-5 my_profile_setting_input form-group text-end">
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
                        Remark
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <select
                        style={{ padding: "2px" }}
                        className="selectpicker form-select"
                        data-live-search="true"
                        data-width="100%"
                        readonly={!isEditMode}
                        value={
                          commercialRemark && commercialRemark !== "null"
                            ? commercialRemark
                            : ""
                        }
                        onChange={(e) => setcommercialRemark(e.target.value)}
                      >
                        <option data-tokens="Status1">
                          Verified from Original
                        </option>
                        <option data-tokens="Status2">
                          Verified from Online
                        </option>
                        <option data-tokens="Status3">
                          Verified from Orified
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </>
  );
};

export default PolicyDetails;
