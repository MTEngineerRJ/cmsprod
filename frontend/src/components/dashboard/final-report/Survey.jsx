import { useEffect, useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Editor } from "draft-js";
import { Calendar } from "primereact/calendar";
// import RichTextEditor, { createEmptyValue } from "./RichTextEditor";
import { Editor } from "primereact/editor";
import { AccidentContent, AssessmentContent, addVariables, otherContent } from "./Content";
import {
  calculateDepreciationsPercenatge,
  getMonthsDifference,
} from "./functions";
import MyDatePicker from "../../common/MyDatePicker";
import getTime from "date-fns/getTime";
import MyDatePickerTime from "../../common/MyDatePickerTime";
import TimePicker from "../../common/TimePicker";
import ReactEditor from "../../common/TextEditor";
import toast from "react-hot-toast";

const Servey = ({
  phoneNumber,
  setPhoneNumber,
  applicantNumber,
  disable,
  setApplicantNumber,
  DetailsOfLoads,
  AccidentTime,
  setAccidentTime,
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
  InspectionDate,
  setInspectionDate,
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


  const [hide,setHide] = useState(false);
  
  const handleChangeAccidentDate = (value) =>{
    const newDate = new Date(value);
    const policyStartDate = new Date(claim?.claimDetails?.PolicyPeriodStart);
    const policyEndDate = new Date(claim?.claimDetails?.PolicyPeriodEnd);

    if((policyStartDate <= newDate && newDate <= policyEndDate) || newDate === ""){
      setAccidentAddedDateTime((value));
    }
    else if (policyStartDate > newDate) {
      toast.error("Update failed: The new accident date is before the policy start date.");
    } else if (policyEndDate < newDate) {
      toast.error("Update failed: The new accident date is after the policy end date.");
    }
  }

  const handleChangeSurveyDate = (value) =>{
    const newSurveyDate = new Date(value);
    const intimationDate = new Date(claim?.claimDetails?.AddedDateTime);

    if(intimationDate <= newSurveyDate || InspectionDate === ""){
      setInspectionDate((value));
    }
    else {
      toast.error("Update failed: The new survey allotment date is before the mentioned intimation date.");
    } 
  }
  const formatDate = (dateString) => {
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    };

    const dateParts = new Date(dateString).toLocaleDateString("en-GB", options).split('/');
    const formattedDate = dateParts[0] + '-' + dateParts[1] + '-' + dateParts[2];
    return formattedDate;
};
  function isvaliddate(date) {
    return (
      date !== null &&
      date !== undefined &&
      date !== "null" &&
      date !== "undefined"
    );
  }
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
  function localDate(dateString) {
    if (dateString && dateString !== "null") {
      return new Date(dateString).toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Kolkata",
      });
    } else {
      return "";
    }
  }

  const formatTime = (dateString) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  function convertHtmlToString(htmlString) {
    // Create a new DOMParser
    const parser = new DOMParser();
  
    // Parse the HTML string
    const doc = parser.parseFromString(htmlString, 'text/html');
  
    // Extract the text content from the parsed document
    const plainText = doc.body.textContent || "";
  
    return plainText;
  }
  

  useEffect(() => {
    const accident = AccidentContent(claim?.driverDetails?.DriverName);
    const assessment = AssessmentContent(
      claim?.claimDetails?.ClaimServicingOffice,
      SurveyAllotmentDate,
      claim?.accidentDetails?.DateOfAccident,
      claim?.accidentDetails?.PlaceOfLoss
    );
    
    const other = otherContent();
    console.log("assessment",assessment)
    setCauseOfAccident(CauseOfAccident ? (CauseOfAccident) : accident);
    setAssessment(Assessment ? (Assessment) : assessment);
    setThirdPartyLoss(ThirdPartyLoss ? (ThirdPartyLoss) : other);
    setPoliceAction(PoliceAction ? (PoliceAction) : other);
    setDetailsOfLoads(DetailsOfLoads ? (DetailsOfLoads) : other);
  }, [CauseOfAccident]);
   
  const calculateVehicleAge = () => {
    if (
      !claim.vehicleDetails?.DateOfRegistration ||
      !claim.claimDetails?.AddedDateTime
    ) {
      return "0";
    }
    const a = getMonthsDifference(DateRegistration);

    const b = getMonthsDifference(AccidentAddedDateTime);
    console.log(DateRegistration, AccidentAddedDateTime, a - b);

    return `${a - b}`;
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
  function convertTimeFormat(inputTime) {
    // Parse the input time string
    const parsedTime = new Date("2000-01-01 " + inputTime);

    // Check if the parsed time is valid
    if (isNaN(parsedTime)) {
      console.error("Invalid time format");
      return null;
    }

    // Format the time in the desired format
    const formattedTime = parsedTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formattedTime;
  }

  useEffect(() => {
    console.log("Time", convertTimeFormat(formatTime(AccidentAddedDateTime)));
    setAccidentTime(convertTimeFormat(formatTime(AccidentAddedDateTime)));
  }, []);

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
                      value={formatDateUpdated(AccidentAddedDateTime)}
                      className="form-control"
                      id="propertyTitle"
                    />
                  ) : (
                    <input
                      type="date"
                      disabled={!isEditMode}
                      value={
                        localDate(AccidentAddedDateTime) 
                      }
                      onChange={(e) => handleChangeAccidentDate(e.target.value)}
                      // onChange={(e) => setAccidentAddedDateTime(e.target.value)}
                    />
                  )}
                 
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
                  {!isEditMode ? (
                    <input type="text" value={AccidentTime} readOnly={true} />
                  ) : (
                    <TimePicker
                      selectedTime={AccidentTime ? AccidentTime : ""}
                      setSelectedTime={setAccidentTime}
                    />
                  )}
                  {console.log(AccidentTime)}
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
                    readOnly={!isEditMode}
                    value={PlaceOfLoss ? PlaceOfLoss : ""}
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
                    value={Pin ? Pin : ""}
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
                    value={PlaceOfSurvey ? PlaceOfSurvey : ""}
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
                 
                  <input
                    readOnly={!isEditMode}
                    type={"text"}
                    value={
                      SurveyAllotmentDate ? formatDateUpdated(SurveyAllotmentDate) : ""
                    }
                    className="form-control"
                    id="propertyTitle"
                  />

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
                    Inspection Date:
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    readOnly={!isEditMode}
                    type="date"
                    value={
                      InspectionDate && InspectionDate !== "null"
                        ? InspectionDate
                        : ""
                    }
                    onChange={(e) => handleChangeSurveyDate(e.target.value)}
                    // onChange={(e) => setInspectionDate(e.target.value)}
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

                <input
                  readOnly={!isEditMode}
                  type="text"
                  placeholder="Not conducted, As stated by insured"
                  value={
                    SurveyConductedDate && SurveyConductedDate !== "null"
                      ? SurveyConductedDate
                      : ""
                  }
                  onChange={(e) => setSurveyConductedDate(e.target.value)}
                />
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
                <ReactEditor
                  readOnly={!isEditMode}
                  index={1}
                  editorContent={addVariables(claim,
                    CauseOfAccident,
                    claim?.claimDetails?.ClaimServicingOffice,
                    SurveyAllotmentDate,
                    claim?.accidentDetails?.DateOfAccident,
                    PlaceOfLoss,
                    DriverName,
                    VehicleChassisNumber,
                    PolicyNumber,
                    AccidentTime
                    )}
                  setEditorContent={setCauseOfAccident}
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
              <ReactEditor
                index={3}
                readOnly={!isEditMode}
                editorContent={addVariables(claim,
                  PoliceAction,
                  claim?.claimDetails?.ClaimServicingOffice,
                  SurveyAllotmentDate,
                  claim?.accidentDetails?.DateOfAccident,
                  PlaceOfLoss,
                  DriverName,
                  VehicleChassisNumber,
                  PolicyNumber,
                  AccidentTime)}
                setEditorContent={setPoliceAction}
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
              {isEditMode  && !disable ? (
                <>
                  <button
                    className="btn btn-color m-1"
                    onClick={handleCancelHandler}
                  >
                    Cancel
                  </button>
                  <button disabled={disable} className="btn btn-color m-1" 
                  onClick={()=>{
                    setHide(true)
                    SaveHandler(setIsEditMode)
                  }}>
                    Update
                  </button>
                </>
              ) : (
                 !hide && claim?.accidentDetails && <button className="btn btn-color m-1" onClick={editHandler}>
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
              <ReactEditor
                index={9}
                readOnly={!isEditMode}
                editorContent={DetailsOfLoads}
                setEditorContent={setDetailsOfLoads}
              />
            </div>
          </div>
          <div className="col-lg-12">{/** <Editor /> */}</div>
          <div className="col-lg-12 mt-3">
            <h4>Third Party Loss / Injuries :</h4>
            <hr />
            <div className="">
              <ReactEditor
                index={4}
                readOnly={!isEditMode}
                editorContent={addVariables(claim,
                  ThirdPartyLoss,
                  claim?.claimDetails?.ClaimServicingOffice,
                  SurveyAllotmentDate,
                  claim?.accidentDetails?.DateOfAccident,
                  PlaceOfLoss,
                  DriverName,
                  VehicleChassisNumber,
                  PolicyNumber,
                  AccidentTime)}
                setEditorContent={setThirdPartyLoss}
              />
            </div>
          </div>
          <div className="col-lg-12">{/** <Editor /> */}</div>
          <div className="col-lg-12 mt-3">
            <h4>Assesment :</h4>
            <hr />
            {/* <div className="row">
              <RichTextEditor
                value={value}
                onChange={this._onChange}
                className="react-rte-demo"
                placeholder="Tell a story"
                toolbarClassName="demo-toolbar"
                editorClassName="demo-editor"
                readOnly={this.state.readOnly}
                blockStyleFn={getTextAlignClassName}
                customControls={[
                  // eslint-disable-next-line no-unused-vars
                  (setValue, getValue, editorState) => {
                    let choices = new Map([
                      ["1", { label: "1" }],
                      ["2", { label: "2" }],
                      ["3", { label: "3" }],
                    ]);
                    return (
                      <ButtonGroup key={1}>
                        <Dropdown
                          choices={choices}
                          selectedKey={getValue("my-control-name")}
                          onChange={(value) =>
                            setValue("my-control-name", value)
                          }
                        />
                      </ButtonGroup>
                    );
                  },
                  <ButtonGroup key={2}>
                    <IconButton
                      label="Remove Link"
                      iconName="remove-link"
                      focusOnClick={false}
                      onClick={() => console.log("You pressed a button")}
                    />
                  </ButtonGroup>,
                ]}
              />
            </div> */}
            <div className="">
              <ReactEditor
                index={5}
                readOnly={!isEditMode}
                editorContent={addVariables(claim,
                  Assessment,
                  claim?.claimDetails?.ClaimServicingOffice,
                  SurveyAllotmentDate,
                  AccidentAddedDateTime,
                  PlaceOfLoss,
                  DriverName,
                  VehicleChassisNumber,
                  PolicyNumber,
                  AccidentTime)}
                setEditorContent={setAssessment}
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
                  Age of Vehicle
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
    </>
  );
};

export default Servey;
