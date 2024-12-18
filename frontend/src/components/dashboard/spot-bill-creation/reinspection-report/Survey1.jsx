import { useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Editor } from "draft-js";
import { Calendar } from "primereact/calendar";

import { Editor } from "primereact/editor";
import { AccidentContent, AssessmentContent } from "./Content";
import {
  calculateDepreciationsPercenatge,
  getMonthsDifference,
} from "./functions";
import MyDatePicker from "../../common/MyDatePicker";
import getTime from "date-fns/getTime";
import MyDatePickerTime from "../../common/MyDatePickerTime";

const Servey = ({
  phoneNumber,
  setPhoneNumber,
  applicantNumber,
  setApplicantNumber,
  DetailsOfLoads,
  setDetailsOfLoads,
  CauseOfAccident,
  setCauseOfAccident,
  PoliceAction,
  setPoliceAction,
  ThirdPartyLoss,
  Assessment,
  setAssessment,
  setPin,
  Pin,
  setPlaceOfSurvey,
  PlaceOfSurvey,

  AccidentAddedDateTime,
  setAccidentAddedDateTime,
  setPlaceOfLoss,
  PlaceOfLoss,
  SurveyAllotmentDate,
  setSurveyAllotmentDate,
  setSurveyConductedDate,
  SurveyConductedDate,
  setThirdPartyLoss,

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
  allDepreciations,
  InsuredName,
  setInsuredName,
  InsuredMobileNo1,
  setInsuredMobileNo1,
  InsuredMobileNo2,
  setInsuredMobileNo2,
  ClaimRegion,
  setClaimRegion,

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

  VehicleModel,
  setVehicleModel,
  VehicleTaxParticulars,
  setVehicleTaxParticulars,
  VehicleSeatingCapacity,
  setVehicleSeatingCapacity,

  SaveHandler,
  claim,
}) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const formatTime = (dateString) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const calculateVehicleAge = () => {
    if (
      !claim.vehicleDetails?.DateOfRegistration ||
      !claim.claimDetails?.AddedDateTime
    ) {
      return "0";
    }
    const a = getMonthsDifference(claim.vehicleDetails?.DateOfRegistration);

    const b = getMonthsDifference(claim.claimDetails?.AddedDateTime);
    // setAgeOfVehicle(a+b);
    console.log("age", a);
    return `${a}`;
  };

  const calculateDepreciationOnMetal = () => {
    const a = calculateDepreciationsPercenatge(
      allDepreciations,
      "Metal",
      claim.vehicleDetails?.DateOfRegistration
    );
    //  setDepMetal(a);
    console.log("dep", a);
    return a;
  };

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

  // const Editor = SomeComponent.Editor;
  const [editorContent, setEditorContent] = useState("");

  const formatText = (command) => {
    if (typeof window !== "undefined") {
      const selectedText = window.getSelection().toString();

      const selection = window.getSelection();
      if (selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);

      // Create a span element
      const span = document.createElement("span");

      switch (command) {
        case "bold":
          span.style.fontWeight = "bold";
          break;
        case "italic":
          span.style.fontStyle = "italic";
          break;
        case "justifyCenter":
          span.style.textAlign = "center";
          break;
        case "justifyRight":
          span.style.textAlign = "right";
          break;
        case "justifyLeft":
          span.style.textAlign = "left";
          break;
        default:
          break;
      }

      // Surround the selected content with the created span element
      range.surroundContents(span);
    }
  };
  const [text, setText] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);

  const handleCancelHandler = () => {
    setIsEditMode(false);
  };

  const editHandler = () => {
    setIsEditMode(true);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6" style={{ borderRight: "1px solid black" }}>
          <div className="row">
            <div className="col-lg-12">
              <h4>Accident Details :</h4>
              <hr />
            </div>
            <div className="col-lg-12">
              <div className="row mt-1">
                <div className="col-lg-3 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color mt-2"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                  >
                    Date of Accident
                  </label>
                </div>
                <div className="col-lg-8">
                  {!isEditMode ? (
                    <input
                      readOnly={!isEditMode}
                      type={"text"}
                      value={
                        AccidentAddedDateTime
                          ? formatDate(AccidentAddedDateTime)
                          : ""
                      }
                      className="form-control"
                      id="propertyTitle"
                    />
                  ) : (
                    <MyDatePicker
                      disable={!isEditMode}
                      selectedDate={
                        AccidentAddedDateTime && AccidentAddedDateTime!=="null"
                          ? new Date(AccidentAddedDateTime)
                          : ""
                      }
                      setSelectedDate={setAccidentAddedDateTime}
                      
                    />
                  )}
                  {/*<input
                  type={isEditMode ? "datetime-local" : "text"}
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e)=>setAccidentAddedDateTime(e.target.value)}
                value={isEditMode? AccidentAddedDateTime : formatDate(AccidentAddedDateTime)}
                placeholder="MM-DD-YYYY"
                min={AccidentAddedDateTime}
                  
                  readonly={!isEditMode}
             
                  /> */}
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1 mb-1">
                <div className="col-lg-3 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color mt-2"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Time of Accident
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    readOnly={!isEditMode}
                    value={
                      AccidentAddedDateTime
                        ? formatTime(AccidentAddedDateTime)
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row">
                <div className="col-lg-5 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color mt-2"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                  >
                    Place of Accident
                  </label>
                </div>
                <div className="col-lg-7" style={{ marginRight: "-10px" }}>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    readonly={!isEditMode}
                    value={PlaceOfLoss}
                    onChange={(e) => setPlaceOfLoss(e.target.value)}
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
              <div className="row">
                <div className="col-lg-3 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                  >
                    Pin
                  </label>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={Pin}
                    readOnly={!isEditMode}
                    onChange={(e) => setPin(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
              {/* <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input type="text" className="form-control" id="propertyTitle" />
        </div> */}
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-3 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color mt-2"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                  >
                    Place of Survey
                  </label>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={PlaceOfSurvey}
                    readOnly={!isEditMode}
                    onChange={(e) => setPlaceOfSurvey(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
              {/* <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input type="text" className="form-control" id="propertyTitle" />
        </div> */}
            </div>
          </div>
          <hr />

          <div className="col-lg-12">
            <h4>Survey Details :</h4>
            <hr />
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="row mt-1">
                <div className="col-lg-7 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                  >
                    Allotment Date :
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

                   value={isEditMode? SurveyAllotmentDate : formatDate(SurveyAllotmentDate)} 
          onChange={(e)=>setSurveyAllotmentDate(e.target.value)} />*/}
                  {!isEditMode ? (
                    <input
                      readOnly={!isEditMode}
                      type={"text"}
                      value={
                        SurveyAllotmentDate
                          ? formatDate(SurveyAllotmentDate)
                          : ""
                      }
                      className="form-control"
                      id="propertyTitle"
                    />
                  ) : (
                    <MyDatePicker
                      disable={!isEditMode}
                      selectedDate={
                        SurveyAllotmentDate && SurveyAllotmentDate!=="null" ? new Date(SurveyAllotmentDate) : ""
                      }
                      setSelectedDate={setSurveyAllotmentDate}
                    />
                  )}
                  {/* <span className="flaticon-calendar m-1 text-dark"></span> */}
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row mt-1">
                <div className="col-lg-5 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                  >
                    Inspection :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    value={claim?.claimDetails?.InspectionType}
                    className="form-control"
                    id="propertyTitle"
                  />

                  {/* <span className="flaticon-calendar m-1 text-dark"></span> */}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-2">
            <div className="row">
              <div className="col-lg-4 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    paddingTop: "5px",
                    color: "#2e008b",
                    fontSize: "14px",
                    // marginTop: "-13px",
                  }}
                >
                  Spot Survey Recieved :
                </label>
              </div>
              <div className="col-lg-8">
                {/*} <input
                type={isEditMode ? "date" : "text"}
                readonly={!isEditMode}
                value={ isEditMode ? SurveyConductedDate : formatDate(SurveyConductedDate)}
                onChange={(e)=>setSurveyConductedDate(e.target.value)}
                // placeholder="Enter Registration No."
                />*/}
                {!isEditMode ? (
                  <input
                    readOnly={!isEditMode}
                    type={"text"}
                    value={
                      SurveyConductedDate ? formatDate(SurveyConductedDate) : ""
                    }
                    className="form-control"
                    id="propertyTitle"
                  />
                ) : (
                  <MyDatePicker
                    disable={!isEditMode}
                    selectedDate={
                      SurveyConductedDate&& SurveyConductedDate!=="null" ? new Date(SurveyConductedDate) : ""
                    }
                    setSelectedDate={setSurveyConductedDate}
                  />
                )}
              </div>
            </div>
            {/* <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input type="text" className="form-control" id="propertyTitle" />
        </div> */}
          </div>
          <div className="col-lg-12 mt-3">
            <h4>Cause & Nature of Accident :</h4>
            <hr />
          </div>
          <div className="col-lg-12">
            <div>
              <div className="">
                <Editor
                  placeholder={AccidentContent(
                    claim?.insuredDetails?.InsuredName
                  )}
                  readOnly={!isEditMode}
                  value={CauseOfAccident}
                  onChange={setCauseOfAccident}
                  style={{ height: "150px" }}
                />
              </div>
              {/*  <Editor/>*/}
              {/* <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                style={{ width: "100%", height: "150px" }}
              /> */}
              <br />
              {/* <button onClick={() => formatText("bold")}>Bold</button>
              <button onClick={() => formatText("italic")}>Italic</button>
              <button onClick={() => formatText("justifyCenter")}>
                Align Center
              </button>
              <button onClick={() => formatText("justifyRight")}>
                Align Right
              </button>
              <button onClick={() => formatText("justifyLeft")}>
                Align Left
              </button> */}
            </div>
            {/* <textarea
              className="form-control"
              placeholder="Enter text here..."
              cols="20"
              rows="4"
              wrap="hard"
              required
            /> */}
          </div>
          <div className="col-lg-12 mb-3">
            <h4>Police Action :</h4>
            <hr />
          </div>
          <div className="col-lg-12 mb-2">
            <div className="">
              <Editor
                readonly={!isEditMode}
                value={PoliceAction}
                onChange={setPoliceAction}
                style={{ height: "80px" }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <h4>Details of Loads / Passenger :</h4>
              <hr />
            </div>
            <div className="col-lg-6 text-end">
              {isEditMode ? (
                <>
                  <button
                    className="btn btn-color m-1"
                    onClick={handleCancelHandler}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-color m-1" onClick={SaveHandler}>
                    Update
                  </button>
                </>
              ) : (
                <button className="btn btn-color m-1" onClick={editHandler}>
                  Edit
                </button>
              )}
              {/* <button className="btn btn-color m-1">Add</button> */}
              {/* <button className="btn btn-color m-1" onClick={handleEditClick}>
            Modify
          </button> */}
            </div>
          </div>
          <div className="row">
            <div className="">
              <Editor
                readOnly={!isEditMode}
                value={DetailsOfLoads}
                onChange={setDetailsOfLoads}
                style={{ height: "100px" }}
              />
            </div>
          </div>
          <div className="col-lg-12">{/** <Editor /> */}</div>
          <div className="col-lg-12 mt-3">
            <h4>Third Party Loss / Injuries :</h4>
            <hr />
            <div className="">
              <Editor
                readOnly={!isEditMode}
                value={ThirdPartyLoss}
                onChange={setThirdPartyLoss}
                style={{ height: "100px" }}
              />
            </div>
          </div>
          <div className="col-lg-12">{/** <Editor /> */}</div>
          <div className="col-lg-12 mt-3">
            <h4>Assesment :</h4>
            <hr />
            <div className="">
              <Editor
                placeholder={AssessmentContent(
                  claim?.claimDetails?.InsuranceCompanyNameAddress,
                  formatDate(claim?.claimDetails?.AddedDateTime),
                  formatDate("")
                )}
                readOnly={!isEditMode}
                value={Assessment}
                onChange={setAssessment}
                style={{ height: "300px" }}
              />
            </div>
          </div>
          <div className="col-lg-12 mb-2">{/** <Editor /> */}</div>
        </div>
        <hr />
      </div>
      <div className="col-lg-12 mt-3">
        <div className="row mt-1">
          <div className="col-lg-3"></div>
          <div className="col-lg-2">
            {/*} <div className="row mt-1">
              <div className="col-lg-7 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    // paddingTop: "15px",
                    color: "#2e008b",
                    fontWeight: "",
                    // marginTop: "-13px",
                    fontSize: "13px",
                  }}
                >
                  Age of Vehicle
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  // value={props.assessed}
                  // readOnly={!isEditMode}
                  // onChange={(e) => setLicenseType(e.target.value)}

                  // placeholder="Enter Registration No."
                />
              </div>
                </div>*/}
          </div>
          <div className="col-lg-2">
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
                  Age of Policy
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={calculateVehicleAge()}
                  // value={props.assessed}
                  // readOnly={!isEditMode}
                  // onChange={(e) => setLicenseType(e.target.value)}

                  // placeholder="Enter Registration No."
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className="row mt-1">
              <div className="col-lg-8 my_profile_setting_input form-group text-end">
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
                  Depreciation on metal(%)
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={calculateDepreciationOnMetal()}
                  // value={props.difference}
                  // readOnly={!isEditMode}
                  // onChange={(e) => setLicenseType(e.target.value)}

                  // placeholder="Enter Registration No."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="text-center">
          <div className="my_profile_setting_input">
            <button className="btn btn-color fw-bold w-25">Submit</button>
          </div>
        </div>
      </div> */}

      {/* <div className="col-lg-4">
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
              }}
            >
              Endo. Doc 
            </label>
          </div>
          <div className="col-lg-8">
            <input
              type="text"
              className="form-control"
              id="propertyTitle"
              // placeholder="Enter Registration No."
            />
          </div>
        </div>
      </div> */}

      {/* <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Description</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
          ></textarea>
        </div>
      </div> */}
      {/* End .col */}

      {/* <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Type</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="type1">Type1</option>
            <option data-tokens="Type2">Type2</option>
            <option data-tokens="Type3">Type3</option>
            <option data-tokens="Type4">Type4</option>
            <option data-tokens="Type5">Type5</option>
          </select>
        </div>
      </div> */}
      {/* End .col */}

      {/* <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Status</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="Status1">Status1</option>
            <option data-tokens="Status2">Status2</option>
            <option data-tokens="Status3">Status3</option>
            <option data-tokens="Status4">Status4</option>
            <option data-tokens="Status5">Status5</option>
          </select>
        </div>
      </div> */}
      {/* End .col */}

      {/* <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExamplePrice">Price</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExamplePrice"
          />
        </div>
      </div> */}
      {/* End .col */}

      {/* <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">Area</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleArea"
          />
        </div>
      </div> */}
      {/* End .col */}

      {/* <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Rooms</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="Status1">1</option>
            <option data-tokens="Status2">2</option>
            <option data-tokens="Status3">3</option>
            <option data-tokens="Status4">4</option>
            <option data-tokens="Status5">5</option>
            <option data-tokens="Status6">Other</option>
          </select>
        </div>
      </div> */}
      {/* End .col */}

      {/* <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start">Back</button>
          <button className="btn btn2 float-end">Next</button>
        </div>
      </div> */}
    </>
  );
};

export default Servey;
