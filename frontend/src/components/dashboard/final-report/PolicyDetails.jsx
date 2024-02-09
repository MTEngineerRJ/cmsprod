import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import RcDetails from "./RcDetails";
import { BsTypeH3 } from "react-icons/bs";
import DateComponent from './dateComponent';
import MyDatePicker from "../../common/MyDatePicker";

const PolicyDetails = ({
  setIsStatusModal,
  setPolicyType,
  policyType,
  TypeOfDate,
  setTypeOfDate,
  isEditMode,
  setIsEditMode,
  phoneNumber,
  setPhoneNumber,
  applicantNumber,
  setApplicantNumber,

  handleUpdateClick,
  IDV,
  setIDV,
  PolicyPeriodEnd,
  setPolicyPeriodEnd,
  setPolicyPeriodStart,
  PolicyPeriodStart,
  HPA,
  setHPA,
  ClaimServicingOffice,
  setClaimServicingOffice,
  OwnerSRST,
  setOwnerSRST,
  VehicleMakeVariantModelColor,
  setVehicleMakeVariantModelColor,
  VehicleColor,
  setVehicleColor,
  ValidUntilNtv,
  setValidUntilNtv,
  ValidFrom,
  setValidFrom,
  ValidUntilTv,
  setValidUntilTv,

  ReferenceNo,
  setReferenceNo,
  InsuredMailAddress,
  setInsuredMailAddress,
  requestType,
  setRequestType,
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
  ClaimIsActive,
  setClaimIsActive,
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
  InsuredMobileNo1,
  setInsuredMobileNo1,
  InsuredMobileNo2,
  setInsuredMobileNo2,
  ClaimRegion,
  setClaimRegion,
  setClaimNumber,

  DriverName,
  setDriverName,
  DriverAddedDate,
  setDriverAddedDate,
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
  VehicleModel,
  setVehicleModel,
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
  MailRecieveDate,
  setMailRecieveDate,
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


  RCOwner,
  setRCOwner,
  RCSDW,
  setRCSDW,
  RCMakerName,
  setRCMakerName,
  RCModelName,
  setRCModelName,
  RCTaxValidUpto,
  setRCTaxValidUpto,
  RCVehicleDescription,
  setRCVehicleDescription,
  EmissionNorm,
  setEmissionNorm,
  StandingCapacity,
  setStandingCapacity,
  Financier,
  setFinancier,
  InsuranceValidUpto,
  setInsuranceValidUpto,
  PUCCNumber,
  setPUCCNumber,
  PUCCValidUpto,
  setPUCCValidUpto,
  RegisteringAuthority,
  setRegisteringAuthority
}) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric input
    const numericValue = inputValue.replace(/\D/g, "");

    // Restrict to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setApplicantNumber(truncatedValue);
    }

    setPhoneNumber(truncatedValue);
  };

  const openStatusUpdateHandler = () => {
    setIsStatusModal(true);
  };

  
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };


  const formatDateNextyear=(date)=>{
    const dateObject = new Date(date);

  // Add 1 year to the date
  dateObject.setFullYear(dateObject.getFullYear() + 1);
return formatDate(dateObject);
  }

  //Update Document
  const handleEditClick = () => {
    setIsEditMode(true);
  };


  // const handleUpdateClick = () => {
  //   const payload = {
  //     // Insured Details
  //     InsuredMailAddress,
  //     InsuredMobileNo1,
  //     InsuredMobileNo2,
  //     ClaimNumber,
  //     EngineType,
  //     DateRegistration,
  //     TransferDate,
  //     AddedBy,
  //     Verification,
  //     GarageNameAndAddress,
  //     GarageContactNo2,
  //     GarageAddedBy,
  //     ClaimAddedDateTime,
  //     ClaimIsActive,

  //     // Policy Detail
  //     ReferenceNo,
  //     PolicyNumber,
  //     PolicyIssuingOffice,
  //     InsuranceCompanyNameAddress,
  //     ClaimRegion,
  //     InsuredName,
  //     InsuredAddress,

  //     // Drivers Details
  //     DriverName,
  //     DriverAddedDate,
  //     IssuingAuthority,
  //     LicenseNumber,
  //     LicenseType,
  //     BadgeNumber,

  //     // Vehicle Details
  //     VehicleRegisteredNumber,
  //     RegisteredOwner,
  //     VehicleChassisNumber,
  //     EngineNumber,
  //     VehicleModel,
  //     VehicleTypeOfBody,
  //     VehicleCubicCapacity,
  //     VehicleClassOfVehicle,
  //     VehicleFuelType,
  //     VehicleOdometerReading,
  //     VehiclePreAccidentCondition,
  //     VehicleTaxParticulars,
  //     PUCNumber,
  //     VehicleSeatingCapacity,

  //     LeadId,
  //   };
  //   console.log("payload", payload);
  //   try {
  //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //     axios.put(`/api/updateClaimDetails`, payload, {
  //       headers: {
  //         Authorization: `Bearer ${userInfo[0].Token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setIsEditMode(false);
  //   } catch (error) {
  //     console.log("Error in Updating Claim: ", error);
  //   }
  // };
  const [startDate, setStartDate] = useState(new Date());

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
                  fontWeight: "",
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
                  fontWeight: "",
                  marginTop: "5px",
                }}
              >
                Date
              </label>
            </div>
            <div className="col-lg-9">
               <MyDatePicker
               disable={!isEditMode}
                selectedDate={MailRecieveDate ? new Date(MailRecieveDate) : new Date()}
                setSelectedDate={setMailRecieveDate}
              /> 
              {/*<input 
              readOnly={!isEditMode}
              type={isEditMode ? "date" : "text"}
              value={formatDate(MailRecieveDate)}
              onChange={(e)=>setMailRecieveDate(e.target.value)}
              className="form-control" 
            id="propertyTitle" />*/}
            </div>
            {/* <span
              className="col-lg-1 flaticon-calendar text-dark fs-6"
              style={{ marginLeft: "-20px" }}
            ></span> */}
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
                  marginTop: "5px",
                }}
              >
                Vehicle
              </label>
            </div>
            <div className="col-lg-7">
              <select
                // style={{ marginTop: "5px" }}
                style={{ padding: "2px", marginTop: "3px" }}
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                value={VehicleType}
                onChange={(e)=>setVehicleType(e.target.value)}
                disabled={!isEditMode}
              >
                <option data-tokens="Status1">Select</option>
                <option data-tokens="Status2">Swift</option>
                <option data-tokens="Status3">Honda</option>
                <option data-tokens="Status4">Maruti Sukuzi</option>
              </select>
            </div>
          </div>
          {/* <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input type="text" className="form-control" id="propertyTitle" />
        </div> */}
        </div>
        <div className="col-lg-4 text-end">
          {isEditMode ? (
            <>
              <button
                className="btn btn-color m-1"
                onClick={handleCancelHnadler}
              >
                Cancel
              </button>
              <button className="btn btn-color m-1" onClick={handleUpdateClick}>
                Update
              </button>
            </>
          ) : (
            <button className="btn btn-color m-1" onClick={handleEditClick}>
              Edit
            </button>
          )}
          {/* <button className="btn btn-color m-1" onClick={handleEditClick}>
            Add
          </button> */}
          {/* <button className="btn btn-color m-1" onClick={handleEditClick}>
            Modify
          </button> */}
        </div>
        <hr />
      </div>

      <div className="row">
        <div className="col-lg-8" style={{ borderRight: "1px solid grey" }}>
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
                        value={PolicyNumber}
                        readOnly={!isEditMode}
                        onChange={(e) => setPolicyNumber(e.target.value)}

                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                  {/* <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input type="text" className="form-control" id="propertyTitle" />
        </div> */}
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
                          fontSize: "15px",
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
                        value={InsuredName}
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
                        value={IDV}
                        onChange={(e) => setIDV(e.target.value)}
                        readonly={!isEditMode}
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
                          fontSize: "15px",
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
                        readOnly={!isEditMode}
                        value={policyType}
                        onChange={(e) => setPolicyType(e.target.value)}
                      >
                      <option data-tokens="Status1" value={""}></option>
                        
                        <option data-tokens="Status1" value={"Regular"}>Regular</option>
                        <option data-tokens="Status2" value={"Add on Policy"}>Add on Policy</option>
                        <option data-tokens="Status3" value={"Add on Policy(Not Effective)"}>
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
                          fontSize: "15px",
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
                     {/* <input 
                      type={isEditMode ? "date" : "text"} 
                      readOnly={!isEditMode} 
                      value={isEditMode ? PolicyPeriodStart : formatDate(PolicyPeriodStart)} 
                      onChange={(e)=>setPolicyPeriodStart(e.target.value)}/>
                      {/* <span className="flaticon-calendar text-dark"></span> */}
                      {/* <input
                        type="date"
                        className="form-control"
                        id="propertyTitle"
                      /> */}

                      <MyDatePicker
                      disable={!isEditMode}
                        selectedDate={PolicyPeriodStart ? new Date(PolicyPeriodStart) : new Date()}
                        setSelectedDate={setPolicyPeriodStart}
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
                        To
                      </label>
                    </div>
                    <div className="col-lg-10">

                     <input
                      readOnly={!isEditMode}
                      value={formatDateNextyear(PolicyPeriodStart)}
                       
                      />
                    {/* <input 
                      type={"text"} 
                      readOnly={!isEditMode}
                      value={ formatDateNextyear(PolicyPeriodStart)} 
                      />*/}
                    </div>
                    {/* <span
                      className="col-lg-1 flaticon-calendar text-dark fs-4"
                      style={{ marginLeft: "-30px" }}
                    ></span> */}
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
                          fontSize: "15px",
                        }}
                      >
                        H.P.A. :
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <input
                        type="number"
                        className="form-control"
                        id="mobile"
                        value={HPA}
                        readOnly={!isEditMode}
                        onChange={(e) => setHPA(e.target.value)}
                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-6">
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
                          fontSize:"15px"
                        }}
                      >
                        Insurance 
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <input
                        type="number"
                        className="form-control"
                        id="mobile"
                        value={InsuredMobileNo1}
                        readOnly={!isEditMode}
                        onChange={(e) => setInsuredMobileNo1(e.target.value)}
                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div> */}
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
                          fontSize: "15px",
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
                        value={InsuranceCompanyNameAddress}
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
                        value={PolicyIssuingOffice}
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
                      value=""
                      id="terms"
                      style={{ border: "1px solid black" }}
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
                      value=""
                      id="terms"
                      style={{ border: "1px solid black" }}
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
                        value={ClaimServicingOffice}
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
          <hr />
          <div className="row">
            <div
              className="col-lg-12"
              style={{ borderRight: "1px solid grey" }}
            >
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
                            value={VehicleRegisteredNumber}
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
                            value={RegisteredOwner}
                            onChange={(e) => setRegisteredOwner(e.target.value)}

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
                          />*/}

                          <MyDatePicker
                          disable={!isEditMode}
                          selectedDate={OwnerSRST ? new Date(OwnerSRST) : new Date()}
                          setSelectedDate={setOwnerSRST}
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
                            Date of :
                          </label>
                        </div>
                        <div className="col-lg-4">
                          <select
                            style={{ padding: "2px" }}
                            className="selectpicker form-select"
                            data-live-search="true"
                            data-width="100%"
                            type={isEditMode ? "date" : "text"}
                            readOnly={!isEditMode}
                            value={TypeOfDate}
                            onChange={(e)=>setTypeOfDate(e.target.value)}
                          >
                            <option data-tokens="Status1">choose..</option>
                            <option data-tokens="Status2" value="Purchase">Purchase</option>
                            <option data-tokens="Status3" value="Registration">Registration</option>
                          </select>
                        </div>
                        <div className="col-lg-4">
                        <MyDatePicker
                        disable={!isEditMode}
                        selectedDate={DateRegistration ? new Date(DateRegistration) : new Date()}
                        setSelectedDate={setDateRegistration}
                      /> 
                         {/* <input
                            type={isEditMode ? "date" : "text"}
                            readonly={!isEditMode}
                            className="form-control"
                            id="propertyTitle"
                            value={
                              isEditMode
                                ? DateRegistration
                                : formatDate(DateRegistration)
                            }
                            onChange={(e) =>
                              setDateRegistration(e.target.value)
                            }
                            // placeholder="Enter Registration No."
                          />*/}
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
                            value={VehicleChassisNumber}
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
                          value=""
                          id="terms"
                          style={{ border: "1px solid black" }}
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
                            value={EngineNumber}
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
                            value={VehicleMakeVariantModelColor}
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
                            value={VehicleTypeOfBody}
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
                            value={VehicleColor}
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
                            value={VehicleCubicCapacity}
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
                            value={AntiTheft}
                            onChange={(e) => setAntiTheft(e.target.value)}
                            readOnly={!isEditMode}
                            // onChange={(e) => setVehicleTypeOfBody(e.target.value)}

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
                            PUC Details
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
                            value={VehicleTypeOfBody}
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
                            Upto
                          </label>
                        </div>
                        <div className="col-lg-9">
                          <input
                            type="text"
                            className="form-control"
                            id="color"
                            // value={VehicleModel}
                            readOnly={!isEditMode}
                            // onChange={(e) => setVehicleTypeOfBody(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-lg-12">
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
                          fontSize: "15px",
                        }}
                      >
                        Anti Theft
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <input
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        // value={VehicleCubicCapacity}
                        readOnly={!isEditMode}

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
                          fontSize: "15px",
                        }}
                      >
                        PUC Details
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <input
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        value={PUCNumber}
                        readOnly={!isEditMode}
                        onChange={(e) => setPUCNumber(e.target.value)}

                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div> */}

                    {/* <div className="col-lg-12">
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
                          fontSize:"15px"
                        }}
                      >
                        Remark
                      </label>
                    </div>
                    <div className="col-lg-7">
                      <input
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        readOnly={!isEditMode}

                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div> */}
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
                          value={RegLadenWt}
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
                          value={RemarkIfRLW}
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
                          value={UnladenWT}
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
                          value={RemarkIfULW}
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
                          value={VehicleSeatingCapacity}
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
                    {/* <div className="row mt-1">
                  <div className="col-lg-4 my_profile_setting_input form-group text-end">
                    <label
                      htmlFor=""
                      className="text-color"
                      style={{
                        // paddingTop: "15px",
                        color: "#2e008b",
                        fontWeight: "",
                        // marginTop: "-13px",
                        fontSize:"14px"
                      }}
                    >
                      Class Of Vehicle
                    </label>
                  </div>
                  <div className="col-lg-7">
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      readOnly={!isEditMode}
                      value={VehicleClassOfVehicle}
                      // placeholder="Enter Registration No."
                    />
                  </div>
                </div> */}
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
                          value={VehicleClassOfVehicle}
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
                          value={VehicleFuelType}
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
                          value={VehicleOdometerReading}
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
                          value={VehiclePreAccidentCondition}
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
                          value={VehicleTaxParticulars}
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
                          value={VehicleRemark}
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
        <div className="col-lg-4">
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
                    value={DriverName}
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
                    value={LicenseNumber}
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
                  {/* <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    // value={LicenseNumber}
                    // readOnly={!isEditMode}
                    // onChange={(e) => setLicenseNumber(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
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
                  <MyDatePicker
                  disable={!isEditMode}
                    selectedDate={DateOfIssue ? new Date(DateOfIssue) : new Date()}
                    setSelectedDate={setDateOfIssue}
                  /> 
                  {/*<input 
                  type={isEditMode ? "date" : "text"} 
                  readonly={!isEditMode} 
                  value={isEditMode ? DateOfIssue : formatDate(DateOfIssue)} 
                onChange={(e)=>setDateOfIssue(e.target.value)}/>*/}
                  {/* <span className="flaticon-calendar text-dark"></span> */}
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
                  {/* <input
              type="date"
              className="form-control"
              id="propertyTitle"
            /> */}

                  <MyDatePicker
                  disable={!isEditMode}
                    selectedDate={ValidUntilNtv ? new Date(ValidUntilNtv) : new Date()}
                    setSelectedDate={setValidUntilNtv}
                  /> 
                 {/* <input 
                  type={isEditMode ? "date" : "text"} 
                  readonly={!isEditMode}
                  value={isEditMode ? ValidUntilNtv: formatDate(ValidUntilNtv)} 
          onChange={(e)=>setValidUntilNtv(e.target.value)}/>*/}
                  {/* <span className="flaticon-calendar text-dark"></span> */}
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
                    Valid From
                  </label>
                </div>
                <div className="col-lg-6">
                  {/* <input
                  type="date"
                  className="form-control"
                  id="propertyTitle"
                  /> */}
                  <MyDatePicker
                      disable={!isEditMode}
                        selectedDate={ValidFrom ? new Date(ValidFrom) : new Date()}
                        setSelectedDate={setValidFrom}
                      /> 
                {/*<input 
                  type={isEditMode ? "date" : "text"} 
                  readonly={!isEditMode} 
                  value={isEditMode ? ValidFrom:formatDate(ValidFrom)} 
                onChange={(e)=>setValidFrom(e.target.value)}/>*/}
                  {/* <span className="flaticon-calendar text-dark"></span> */}
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
                  {/* <input
              type="date"
              className="form-control"
              id="propertyTitle"
            /> */}
                  <MyDatePicker
                  disable={!isEditMode}
                    selectedDate={ValidUntilTv ? new Date(ValidUntilTv) : new Date()}
                    setSelectedDate={setValidUntilTv}
                  /> 
                  {/*<input 
                  type={isEditMode ? "date" : "text"} 
                  readonly={!isEditMode} 
                  value={isEditMode ? ValidUntilTv : formatDate(ValidUntilTv)} 
          onChange={(e)=>setValidUntilTv(e.target.value)}/>*/}
                  {/* <span className="flaticon-calendar text-dark"></span> */}
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="row mt-1">
                <div className="col-lg-4 my_profile_setting_input form-group">
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
                    value={IssuingAuthority}
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
                    value={LicenseType}
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
                    value={driverRemark}
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
          <hr />
          <div className="row">
            <div className="col-lg-12">
              <h4 className="text-dark" style={{ fontSize: "17px" }}>
                Commercial Vehicle Details :
              </h4>
              <hr />
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
                        value={FitnessCertificate}
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
                      <MyDatePicker
                      disable={!isEditMode}
                      selectedDate={ FitnessFrom ? new Date(FitnessFrom) : new Date()}
                      setSelectedDate={setFitnessFrom}
                      />
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
                      <MyDatePicker
                      disable={!isEditMode}
                      selectedDate={FitnessTo ? new Date(FitnessTo) : new Date()}
                      setSelectedDate={setFitnessTo}
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
                        value={PermitNo}
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
                      <input
                        type={isEditMode ? "date" : "text"}
                        readonly={!isEditMode}
                        value={isEditMode ? PermitFrom : formatDate(PermitFrom)}
                        onChange={(e) => setPermitFrom(e.target.value)}
                      />
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
                      <MyDatePicker
                      disable={!isEditMode}
                      selectedDate={PermitTo ? new Date(PermitTo) : new Date()}
                      setSelectedDate={setPermitTo}
                      />
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
                        value={TypeOfPermit}
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
                        value={Authorization}
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
                        value={AreasOfoperation}
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
                        value={commercialRemark}
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
        <div className="row">
          <RcDetails
          RCOwner={RCOwner}
                setRCOwner={setRCOwner}
                RCSDW={RCSDW}
                setRCSDW={setRCSDW}
                RCMakerName={RCMakerName}
                setRCMakerName={setRCMakerName}
                RCModelName={RCModelName}
                setRCModelName={setRCModelName}
                RCTaxValidUpto={RCTaxValidUpto}
                setRCTaxValidUpto={setRCTaxValidUpto}
                RCVehicleDescription={RCVehicleDescription}
                setRCVehicleDescription={setRCVehicleDescription}
                EmissionNorm={EmissionNorm}
                setEmissionNorm={setEmissionNorm}
                StandingCapacity={StandingCapacity}
                setStandingCapacity={setStandingCapacity}
                Financier={Financier}
                setFinancier={setFinancier}
                InsuranceValidUpto={InsuranceValidUpto}
                setInsuranceValidUpto={setInsuranceValidUpto}
                PUCCNumber={PUCCNumber}
                setPUCCNumber={setPUCCNumber}
                PUCCValidUpto={PUCCValidUpto}
                setPUCCValidUpto={setPUCCValidUpto}
                RegisteringAuthority={RegisteringAuthority}
                setRegisteringAuthority={setRegisteringAuthority}

                VehicleRegisteredNumber={VehicleRegisteredNumber}
                setVehicleRegisteredNumber={setVehicleRegisteredNumber}

                RegisteredOwner={RegisteredOwner}
                setRegisteredOwner={setRegisteredOwner}

                PolicyNumber={PolicyNumber}
                setPolicyNumber={setPolicyNumber}

                formatDate={formatDate}
                FitnessTo={FitnessTo}
                setFitnessTo={setFitnessTo}
                isEditMode={isEditMode}
                VehicleChassisNumber={VehicleChassisNumber}
                        setVehicleChassisNumber={setVehicleChassisNumber}
                        EngineNumber={EngineNumber}
                        setEngineNumber={setEngineNumber}
                        DateRegistration={DateRegistration}
                        setDateRegistration={setDateRegistration}
                        VehicleClassOfVehicle={VehicleClassOfVehicle}
                        setVehicleClassOfVehicle={setVehicleClassOfVehicle}
                        VehicleFuelType={VehicleFuelType}
                        setVehicleFuelType={setVehicleFuelType}
                        setVehicleColor={setVehicleColor}
                        VehicleColor={VehicleColor}
                        VehicleSeatingCapacity={VehicleSeatingCapacity}
                        setVehicleSeatingCapacity={setVehicleSeatingCapacity}
                        InsuranceCompanyNameAddress={InsuranceCompanyNameAddress}
                        setInsuranceCompanyNameAddress={setInsuranceCompanyNameAddress}
          />
        </div>
      </div>

      <hr style={{ color: "#2e008b", height: "1px" }} />
    </>
  );
};

export default PolicyDetails;
