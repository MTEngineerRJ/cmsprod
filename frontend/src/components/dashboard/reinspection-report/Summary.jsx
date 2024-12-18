import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactEditor from "../../common/TextEditor";
import { addVariables, getDocumentList, summaryNotes } from "./Content";
import axios from "axios";

const Summary = ({
  claim,
  disable,
  DepreciationValue,
  FinalReportNotes,
  setFinalReportNotes,
  totalPartsEstimate,
  totalLabrorEstimate,
  totalPartsAssessed,
  totalLabrorAssessed,
  setLessImposed,
  setEndurance,
  Endurance,
  lessImposed,
  setLessExcess,
  totalMetalRows,
  settotalMetalRows,
  OtherRemark,
  setOtherRemark,
  lessExcess,
  other,
  saveHandler,
  setOther,
  metalSalvageValue,
  setMetalSalvageValue,
  setLessImposedSum,
  LessImposed,

  calculateDepreciationOnMetal,
  calculateVehicleAge,
  leadId,

  TotalLabor,
  setTotalLabor,
  TotalEstimate,
  setTotalEstimate,
  LessExcess,
  setLessExcessSum,
  ExpectedSalvage,
  setExpectedSalvage,
  MetalPercent,
  setMetalPercent,
  RemarkOnSalvage,
  setRemarkOnSalvage,
  TotalCostOfParts,
  setTotalCostOfParts,
  Other,
  setOtherSum,
  GrandTotal,
  setGrandTotal,
  DepreciationOnParts,
  setDepreciationOnParts,
  NetAssessedAmoun,
  setNetAssessedAmount,
  SavageDepreciationDetails,
  setSavageDepreciationDetails,
  CashLess,
  setCashLess,
  NoteOfSelf,
  setNoteOfSelf,
  RepairAutoDate,
  setRepairAutoDate,
  RepairCompletionDate,
  setRepairCompletionDate,
  PartyAgreed,
  setPartyAgreed,
  ReasonThereofDelay,
  setReasonThereofDelay,
  AnyFurtherConversation,
  setAnyFurtherConversation,
  RepairingPhotoDate,
  setRepairingPhotoDate,
  ReinspectionDate,
  setReinspectionDate,
  SalveDestroy,
  setSalveDestroy,
  BillNo,
  setBillNo,
  BillDate,
  setBillDate,
  BillAmount,
  setBillAmount,
}) => {
  const [allNewParts, setAllNewParts] = useState([]);
  useEffect(() => {
    if (
      LessExcess === undefined ||
      LessExcess === null ||
      LessExcess === "undefined" ||
      LessExcess === "null"
    ) {
      setLessExcess(0);
    }
    if (
      LessImposed === undefined ||
      LessImposed === null ||
      LessImposed === "undefined" ||
      LessImposed === "null"
    ) {
      setLessImposed(0);
    }
    if (
      ExpectedSalvage === undefined ||
      ExpectedSalvage === null ||
      ExpectedSalvage === "undefined" ||
      ExpectedSalvage === "null"
    ) {
      setExpectedSalvage(0);
    }
  }, [lessExcess, lessImposed, ExpectedSalvage]);
  console.log(
    "setTotalLabrorAssessed",
    totalLabrorAssessed,
    totalPartsAssessed,
    LessExcess,
    LessImposed,
    ExpectedSalvage,
    DepreciationOnParts
  );
  const [applicantNumber, setApplicantNumber] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [videosList, setVideosList] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [metalSalvageTotal, setmetalSalvageTotal] = useState(0);

  const returnTotal = () => {
    const a =
      Number(totalLabrorAssessed) +
      Number(totalPartsAssessed) +
      (Number(LessExcess) - Number(LessImposed) + Number(Other));
    const b = (totalMetalRows * MetalPercent) / 100;

    return a - b > 1 ? a - b : 0;
  };

  const roundOff = (value) => {
    const roundedValue = parseFloat(value).toFixed(2);
    return roundedValue;
  };

  console.log(totalMetalRows, "total", metalSalvageValue);

  useEffect(() => {
    console.log(FinalReportNotes);
  }, [FinalReportNotes]);
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

  console.log("summ", FinalReportNotes);

  console.log("meta", totalMetalRows);

  const handleOtherValue = (val) => {
    const finalVal = val === "" ? 0 : val;
    setOtherSum(finalVal);
  };

  const getNewpartAssessedTotalWithDepWithGST = () => {
    console.log("getNewpartAssessedTotalWithDepWithGST", allNewParts);

    let total = 0;
    allNewParts?.map((part, index) => {
      const totalAssess = Number(part.Assessed) * Number(part.QA);
      const depreciation =
        (Number(totalAssess) * Number(part.DepreciationPct)) / 100;
      const gst =
        part.WithTax === 1 || part.WithTax === 2
          ? ((totalAssess - depreciation) * Number(part.GSTPct)) / 100
          : 0;

      total += totalAssess - depreciation + gst;
    });

    return total;
  };

  const getNewpartAssessedTotalWithoutDepWithGST = () => {
    console.log("getNewpartAssessedTotalWithoutDepWithGST", allNewParts);
    let total = 0;
    allNewParts?.map((part, index) => {
      const totalAssess = Number(part.Assessed) * Number(part.QA);
      const gst =
        part.WithTax === 1 || part.WithTax === 2
          ? (totalAssess * Number(part.GSTPct)) / 100
          : 0;

      total += totalAssess + gst;
    });

    return total;
  };
  // const Editor = SomeComponent.Editor;
  const [editorContent, setEditorContent] = useState("");

  const formatText = (command) => {
    if (typeof window !== "undefined") {
      const selectedText = window.getSelection().toString();

      const selection = window.getSelection();
      if (selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);

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

  useEffect(() => {
    if (Endurance === undefined) {
      setEndurance(getDocumentList());
    }

    console.log("Endurance", Endurance, getDocumentList());
    const summary = summaryNotes(claim);
    if (RemarkOnSalvage === "undefined" || RemarkOnSalvage === null) {
      setRemarkOnSalvage("This is a metal salvage depreciation %");
    }
    setTotalEstimate(totalPartsEstimate + totalLabrorEstimate);
    setTotalLabor(totalLabrorAssessed);
    setTotalCostOfParts(totalPartsAssessed);
    setGrandTotal(
      Number(totalLabrorAssessed) +
        Number(totalPartsAssessed) -
        (Number(LessExcess) + Number(LessImposed) + Number(Other))
    );
    setMetalPercent(metalSalvageValue);
    // setExpectedSalvage( (Number(totalLabrorAssessed + totalPartsAssessed) *
    //     Number(metalSalvageValue)) /
    //   100);
    setDepreciationOnParts(
      (Number(totalLabrorAssessed + totalPartsAssessed) *
        Number(metalSalvageValue)) /
        100
    );
    setNetAssessedAmount(returnTotal());

    console.log(LessExcess, LessImposed, Other);
  }, []);

  useEffect(() => {
    if (Endurance === undefined) {
      setEndurance(getDocumentList());
    }

    console.log("Endurance", Endurance, getDocumentList());
  }, [Endurance]);

  useEffect(() => {
    console.log(documents);
    if (Endurance === "" || Endurance === "undefined") {
      setEndurance(getDocumentList(documents, leadId));
    }
    if (
      FinalReportNotes === "" ||
      FinalReportNotes === null ||
      FinalReportNotes === "undefined"
    ) {
      setFinalReportNotes(`
     01. The rates allowed above combination 
      of authorized dealer prices.<br>
      02. The cause, nature, and circumstances 
            leading to the accident appear genuine, 
            believable, and losses recommended/assessed 
            are corroborating with this accident.<br>
      03. The loss or damage or liability has arisen  proximately caused by the insured perils.<br> 
      04. The prices are recommended exclusive of all taxes, duties, octroi etc.<br>
      05. The used abbreviation as R.C. = Registration Certificate, D.L. = Driving License, N.A. = Not Allowed, R.A. = Repair Allowed, W&T = Wear & Tear, O.D. = Own Damaged, M.P. = Manipulated i.e. replaced by old material.<br>
      06. The above said vehicle was reinspected by us after repair. Now the vehicle is ready for roadworthy condition, and all the parts replaced and all repair work done as per the final survey report. <br>
      `);
    }
  }, [documents, Endurance, FinalReportNotes]);

  const [hide, setHide] = useState(false);
  useEffect(() => {
    console.log("metalPercent", MetalPercent, totalMetalRows);
    if (Number(MetalPercent) > 0)
      setExpectedSalvage(
        roundOff((Number(totalMetalRows) * Number(MetalPercent)) / 100)
      );
  }, [MetalPercent, totalMetalRows]);

  useEffect(() => {
    const LeadID = window.location.pathname.split("/final-report/")[1];
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    axios
      .get("/api/getNewParts", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: LeadID,
        },
      })
      .then((res) => {
        const data = res.data.userData;
        let newData = [];
        data.map((row, index) => {
          if (String(row.LeadID) === LeadID) {
            newData.push(row);
          }
        });
        setAllNewParts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-12" style={{ borderRight: "1px solid black" }}>
          <div className="row">
            <div className="col-lg-12">
              <h4>Remarks / Damages :</h4>
              {/* <hr /> */}
            </div>
            <ReactEditor
              index={8}
              readOnly={!isEdit}
              editorContent={addVariables(
                claim,
                FinalReportNotes,
                claim?.accidentDetails?.ClaimServicingOffice,
                claim?.accidentDetails?.SurveyAllotmentDate,
                claim?.accidentDetails?.DateOfAccident,
                claim?.accidentDetails?.PlaceOfLoss,
                claim?.claimDetails?.InsuredName,
                claim?.vehicleDetails?.ChassisNumber,
                claim?.claimDetails?.PolicyNumber,
                claim?.accidentDetails?.TimeOfAccident
              )}
              setEditorContent={setFinalReportNotes}
            />
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12">
              <h4>Notes :</h4>
              {/* <hr /> */}
            </div>
            <ReactEditor
              index={8}
              readOnly={!isEdit}
              editorContent={addVariables(
                claim,
                FinalReportNotes,
                claim?.accidentDetails?.ClaimServicingOffice,
                claim?.accidentDetails?.SurveyAllotmentDate,
                claim?.accidentDetails?.DateOfAccident,
                claim?.accidentDetails?.PlaceOfLoss,
                claim?.claimDetails?.InsuredName,
                claim?.vehicleDetails?.ChassisNumber,
                claim?.claimDetails?.PolicyNumber,
                claim?.accidentDetails?.TimeOfAccident
              )}
              setEditorContent={setFinalReportNotes}
            />
          </div>
          <div className="row">
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
                    Endosers :
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
                        // paddingTop: "15px",
                        // paddingBottom: "15px",
                        // backgroundColor: "#E8F0FE",
                        // //color: "white",
                      }
                    }
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
                    Note to Self :
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
                        // paddingTop: "15px",
                        // paddingBottom: "15px",
                        // backgroundColor: "#E8F0FE",
                        // //color: "white",
                      }
                    }
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
