import { useEffect, useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Editor } from "draft-js";
import { Calendar } from "primereact/calendar";
// import RichTextEditor, { createEmptyValue } from "./RichTextEditor";
import { Editor } from "primereact/editor";
import {
  AccidentContent,
  AssessmentContent,
  addVariables,
  otherContent,
} from "./Content";
import {
  calculateDepreciationsPercenatge,
  getMonthsDifference,
} from "./functions";
import TimePicker from "../../common/TimePicker";
import ReactEditor from "../../common/TextEditor";

const Servey = ({
  setPhoneNumber,
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
  setThirdPartyLoss,
  DateRegistration,
  PolicyNumber,
  allDepreciations,
  DriverName,
  VehicleChassisNumber,
  Vehicle_Shifted_To,
  setVehicle_Shifted_To,
  PersonArrestedOnSpot,
  setPersonArrestedOnSpot,
  SurveyInspectiononMedium,
  setSurveyInspectiononMedium,
  PolicStationName,
  setPolicStationName,
  StationDiaryNo,
  setStationDiaryNo,
  LoadChallan,
  setLoadChallan,
  NatureOfGoodsInLoad,
  setNatureOfGoodsInLoad,
  WeightOfGoodsInLoad,
  setWeightOfGoodsInLoad,
  OriginToDestination,
  setOriginToDestination,
  LRInvoiceNoInLoad,
  setLRInvoiceNoInLoad,
  TransporterNameInLoad,
  setTransporterNameInLoad,
  NoOfPassengerInLoad,
  setNoOfPassengerInLoad,
  NatureOfGoodsThirdParty,
  setNatureOfGoodsThirdParty,
  QuantityOfGoodsThirdParty,
  setQuantityOfGoodsThirdParty,
  OriginToDestThirdParty,
  setOriginToDestThirdParty,
  LRInvoiceNoThirdParty,
  setLRInvoiceNoThirdParty,
  SaveHandler,
  claim,
}) => {
  const [hide, setHide] = useState(false);
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const dateParts = new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .split("/");
    const formattedDate =
      dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2];
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
    const doc = parser.parseFromString(htmlString, "text/html");

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
    console.log("assessment", assessment);
    setCauseOfAccident(CauseOfAccident ? CauseOfAccident : accident);
    setAssessment(Assessment ? Assessment : assessment);
    setThirdPartyLoss(ThirdPartyLoss ? ThirdPartyLoss : other);
    setPoliceAction(PoliceAction ? PoliceAction : other);
    setDetailsOfLoads(DetailsOfLoads ? DetailsOfLoads : other);
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
                      value={localDate(AccidentAddedDateTime)}
                      onChange={(e) => setAccidentAddedDateTime(e.target.value)}
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
                    Place of Accident / Survey
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
            <div className="col-lg-12">
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
                    Vehicle Shifted To :
                  </label>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={Vehicle_Shifted_To}
                    readOnly={!isEditMode}
                    onChange={(e) => setVehicle_Shifted_To(e.target.value)}
                   
                  />
                </div>
              </div>
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
                    Person Available on Spot :
                  </label>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={PersonArrestedOnSpot}
                    readOnly={!isEditMode}
                    onChange={(e) => setPersonArrestedOnSpot(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
             
            </div>
          </div>
          <hr />

          <div className="col-lg-12">
            <h4>Survey Receipt Details :</h4>
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
                      color: "#2e008b",
                      fontSize: "14px",
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
                      SurveyAllotmentDate
                        ? formatDateUpdated(SurveyAllotmentDate)
                        : ""
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
                    onChange={(e) => setInspectionDate(e.target.value)}
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
                    marginRight: "13px",
                  }}
                >
                  CD :
                </label>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="huey"
                  checked
                />
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    paddingTop: "5px",
                    color: "#2e008b",
                    fontSize: "14px",
                    marginRight: "13px",
                    marginLeft: "13px",
                  }}
                >
                  Photos :
                </label>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="huey"
                  checked
                />
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder=""
                />
              </div>
            </div>
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
                  editorContent={addVariables(
                    claim,
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
             
              <br />
            </div>
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
                editorContent={addVariables(
                  claim,
                  PoliceAction,
                  claim?.claimDetails?.ClaimServicingOffice,
                  SurveyAllotmentDate,
                  claim?.accidentDetails?.DateOfAccident,
                  PlaceOfLoss,
                  DriverName,
                  VehicleChassisNumber,
                  PolicyNumber,
                  AccidentTime
                )}
                setEditorContent={setPoliceAction}
              />
            </div>
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
                  Name of Police Station :
                </label>
              </div>
              <div className="col-lg-3">
                <input type="text" className="form-control" 
                value={PolicStationName}
                onChange={(e)=>setPolicStationName(e.target.value)}/>
              </div>
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
                  Station Diary No. (FIR) :
                </label>
              </div>
              <div className="col-lg-3">
                <input type="text" className="form-control" 
                value={StationDiaryNo}
                    onChange={(e)=>setStationDiaryNo(e.target.value)}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <h4>Loads / Challan Details :</h4>
              <hr />
            </div>
            <div className="col-lg-6 text-end">
              {isEditMode && !disable ? (
                <>
                  <button
                    className="btn btn-color m-1"
                    onClick={handleCancelHandler}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={disable}
                    className="btn btn-color m-1"
                    onClick={() => {
                      setHide(true);
                      SaveHandler(setIsEditMode);
                    }}
                  >
                    Update
                  </button>
                </>
              ) : (
                !hide &&
                claim?.accidentDetails && (
                  <button className="btn btn-color m-1" onClick={editHandler}>
                    Edit
                  </button>
                )
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Nature of Goods :
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={NatureOfGoodsInLoad}
                    onChange={(e)=>setNatureOfGoodsInLoad(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Weight of Goods Carried :
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={WeightOfGoodsInLoad}
                    onChange={(e)=>setWeightOfGoodsInLoad(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Origin - Destination :
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={OriginToDestination}
                    onChange={(e)=>setOriginToDestination(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    L/R Invoice No & Date :
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={LRInvoiceNoInLoad}
                    onChange={(e)=>setLRInvoiceNoInLoad(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Transporter Name :
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={TransporterNameInLoad}
                    onChange={(e)=>setTransporterNameInLoad(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    No of Passengers
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={NoOfPassengerInLoad}
                    onChange={(e)=>setNoOfPassengerInLoad(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">{/** <Editor /> */}</div>
          <div className="col-lg-12 mt-3">
            <h4>Third Party Loss & Injuries Details :</h4>
            <hr />
            <div className="">
              <div className="col-lg-12">
                <div className="row mt-1 mb-1">
                  <div className="col-lg-12 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mb-0"
                      style={{
                        color: "#2e008b",
                        fontSize: "14px",
                      }}
                    >
                      Details of TP Vehicle :
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <textarea
                      id="form_message"
                      name="form_message"
                      className="form-control required"
                      rows="4"
                      maxLength={2000}
                      style={
                        {
                        }
                      }
                      value={NatureOfGoodsThirdParty}
                      onChange={(e)=>setNatureOfGoodsThirdParty(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row mt-1 mb-1">
                  <div className="col-lg-12 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mb-0"
                      style={{
                        color: "#2e008b",
                        fontSize: "14px",
                      }}
                    >
                      Death /Injury details of Insured Vehicle:
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <textarea
                      id="form_message"
                      name="form_message"
                      className="form-control required"
                      rows="4"
                      maxLength={2000}
                      style={
                        {
                        }
                      }
                      value={QuantityOfGoodsThirdParty}
                      onChange={(e)=>setQuantityOfGoodsThirdParty(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row mt-1 mb-1">
                  <div className="col-lg-12 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mb-0"
                      style={{
                        color: "#2e008b",
                        fontSize: "14px",
                      }}
                    >
                      Death / Injuries Details of Insured Vehicle :
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <textarea
                      id="form_message"
                      name="form_message"
                      className="form-control required"
                      rows="4"
                      maxLength={2000}
                      style={
                        {
                        }
                      }
                      value={OriginToDestThirdParty}
                      onChange={(e)=>setOriginToDestThirdParty(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row mt-1 mb-1">
                  <div className="col-lg-12 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mb-0"
                      style={{
                        color: "#2e008b",
                        fontSize: "14px",
                      }}
                    >
                      Third Party Property Damages :
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <textarea
                      id="form_message"
                      name="form_message"
                      className="form-control required"
                      rows="4"
                      maxLength={2000}
                      style={
                        {
                        }
                      }
                      value={LRInvoiceNoThirdParty}
                      onChange={(e)=>setLRInvoiceNoThirdParty(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="col-lg-12 mt-3">
        <div className="row mt-1">
          <div className="col-lg-3"></div>
         
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
