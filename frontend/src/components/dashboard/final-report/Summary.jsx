import { useEffect, useState } from "react";
import MyDatePicker from "../../common/MyDatePicker";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Editor } from "draft-js";
import { Editor } from "primereact/editor";
import ReactEditor from "../../common/TextEditor";
import { addVariables, getDocumentList, summaryNotes } from "./Content";
import axios from "axios";

const Summary = ({
  isEditMode,
  allLabour,
  currentGst,
  metaldepPct,
  ageOfVehicleTotal,
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

  const getImtAmount = ()=>{
    let totalAmount = 0,totalAmount2=0;
    allNewParts.map((part,index)=>{
      if(part.IsActive && part.IsImt === 1){
        const totalAssess = Number(part.Assessed) * Number(part.QA);
        const depreciation =
        String(claim?.claimDetails?.PolicyType).toLowerCase().includes("regular")
        ?  (Number(totalAssess) * Number(part.DepreciationPct)) / 100 : 0;
        const gst =((totalAssess - depreciation) * Number(part.GSTPct)) / 100;
  
        totalAmount += Number((totalAssess - depreciation) + gst);
      }
    })
    allLabour.map((part,index)=>{
      if(part.isActive && part?.imt){
        const totalAssess = Number(part.assessed) ;
        const depreciation =
          String(part.type) === "1" ?
          (Number(totalAssess) * Number(12.5)) / 100 : 0;
        const gst =
          (Number(part.gst) % 2) === 1 
            ? ((totalAssess - depreciation) * Number(currentGst)) / 100
            : 0;
  
        totalAmount2 += Number(((totalAssess - depreciation) + gst));
      }
    });
    
    return (totalAmount + totalAmount2) / 2;
  }

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

  function addCommasToNumber(number) {
    if (Number(number) <= 100 || number === undefined) return number;
    return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-2" style={{ borderRight: "1px solid black" }}>
          <div className="row">
            <div className="col-lg-12">
              <h4>Original Estimate :</h4>
              {/* <hr /> */}
            </div>
            <div className="col-lg-12">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Total Labour
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={addCommasToNumber(roundOff(totalLabrorEstimate))}
                    // placeholder="Enter Registration No."
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
                      fontWeight: "",
                    }}
                  >
                    Total Cost of Parts
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={addCommasToNumber(roundOff(totalPartsEstimate))}
                    // placeholder="Enter Registration No."
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
                      fontWeight: "",
                    }}
                  >
                    Total Estimate
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={addCommasToNumber(roundOff(totalPartsEstimate + totalLabrorEstimate))}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
             
            </div>
          </div>
          <hr />
        </div>
        <div className="col-lg-5" style={{ borderRight: "1px solid black" }}>
          <div className="row">
            <div className="col-lg-12">
              <h4>Assessed Value :</h4>
              {/* <hr /> */}
            </div>
            <div className="col-lg-4">
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
                    Total Labour
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={addCommasToNumber(roundOff(totalLabrorAssessed))}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Total Cost of Parts With GST (- Depreciations)
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    readOnly={!isEdit}
                    value={addCommasToNumber(roundOff(getNewpartAssessedTotalWithDepWithGST()))}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
              <div className="row mb-1 mt-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Total Cost Of Parts With GST
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={addCommasToNumber(roundOff(getNewpartAssessedTotalWithoutDepWithGST()))}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Depreciations on Parts
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={addCommasToNumber(roundOff(DepreciationValue))}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                      Total
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      readOnly={!isEdit}
                      value={addCommasToNumber(roundOff(totalLabrorAssessed + totalPartsAssessed))}
                      // placeholder="Enter Registration No."
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 d-flex flex-row">
                <div className="row mt-1 mb-1">
                  <div className="col-lg-12 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mb-0"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      Less Excess
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={LessExcess}
                      readOnly={!isEdit}
                      onChange={(e) => setLessExcessSum(e.target.value)}
                      // placeholder="Enter Registration No."
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
                        fontWeight: "",
                      }}
                    >
                      Less Imposed
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={LessImposed}
                      readOnly={!isEdit}
                      onChange={(e) => setLessImposedSum(e.target.value)}
                      // placeholder="Enter Registration No."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Other
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={OtherRemark}
                    readOnly={!isEdit}
                    onChange={(e) => setOtherRemark(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Other
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={Other}
                    onChange={(e) => setOtherSum(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8"></div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Grand Total
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={addCommasToNumber(roundOff(
                      Number(totalLabrorAssessed) +
                        Number(getNewpartAssessedTotalWithDepWithGST()) -
                        Number(LessExcess ? LessExcess : 0) -
                        Number(LessImposed ? LessImposed : 0) +
                        Number(Other ? Other : 0))
                    )}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-12">
              <h5>Salvage Details</h5>
              {/* <hr /> */}
            </div>
            <div className="col-lg-3">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                      fontSize: "14px",
                    }}
                  >
                    Metal %
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="number"
                    className="form-control"
                    id="propertyTitle"
                    value={MetalPercent}
                    readOnly={!isEdit}
                    onChange={(e) => setMetalPercent(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                      fontSize: "14px",
                    }}
                  >
                    Expected Salvage
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={isEdit ? addCommasToNumber(ExpectedSalvage) : addCommasToNumber(roundOff(ExpectedSalvage))}
                    readOnly={!isEdit}
                    onChange={(e) => setExpectedSalvage(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                      fontSize: "14px",
                    }}
                  >
                    Remark on Salvage
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    readOnly={!isEdit}
                    value={RemarkOnSalvage}
                    onChange={(e) => setRemarkOnSalvage(e.target.value)}
                    placeholder="This is a metal salvage depreciation %"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <hr />
          </div>
          <div className="row">
            <div className="col-lg-8 text-end">
              <label
                htmlFor=""
                className="text-color mb-0"
                style={{
                  paddingTop: "10px",
                  color: "#2e008b",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Depreciation on Parts
              </label>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group"></div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    readOnly={!isEdit}
                    value={addCommasToNumber(roundOff(DepreciationValue))}
                    
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 text-end">
              <label
                htmlFor=""
                className="text-color mb-0"
                style={{
                  paddingTop: "10px",
                  color: "#2e008b",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Net Assessed Amount
              </label>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group"></div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={addCommasToNumber(roundOff(
                      Number(totalLabrorAssessed) +
                        getNewpartAssessedTotalWithDepWithGST() -
                        (LessExcess ? LessExcess : 0) -
                        (LessImposed ? LessImposed : 0) +
                        (Other ? Other : 0) -
                        (ExpectedSalvage !== "NaN" ? ExpectedSalvage : 0)
                    ))}
                    readOnly={!isEdit}
                    
                  />
                </div>
              </div>
            </div>
          </div>
           <div className="row">
            <div className="col-lg-6">
              {claim?.claimDetails?.IMT ? <div className="row">
                <div className="col-lg-5 text-end">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      paddingTop: "10px",
                      color: "#2e008b",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    IMT-23 Liability
                  </label>
                </div>
                <div className="col-lg-6">
                  <div className="row mt-1 mb-1">
                    <div className="col-lg-12">
                      <input
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        value={roundOff(
                          getImtAmount())}
                        readOnly={!isEdit}
                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div>
              </div> : ""}
            </div>
            {claim?.claimDetails?.IMT ? <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-7 text-end">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      paddingTop: "10px",
                      color: "#2e008b",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Assessed Amount (IMT 23)
                  </label>
                </div>
                <div className="col-lg-5">
                  <div className="row mt-1 mb-1">
                    <div className="col-lg-12 my_profile_setting_input form-group"></div>
                    <div className="col-lg-12">
                      <input
                        type="text"
                        className="form-control"
                        id="propertyTitle"
                        value={roundOff(
                          (Number(totalLabrorAssessed) +
                            getNewpartAssessedTotalWithDepWithGST() -
                            (LessExcess ? LessExcess : 0) -
                            (LessImposed ? LessImposed : 0) +
                            (Other ? Other : 0) -
                            (ExpectedSalvage !== "NaN" ? ExpectedSalvage : 0)) + getImtAmount()
                        )}
                        readOnly={!isEdit}
                        // placeholder="Enter Registration No."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> : ""}
          </div> 
        </div>
        <div className="col-lg-5">
          <div className="row">
            <div className="col-lg-6">
              <h4>Notes :</h4>
            </div>
            <div className="col-lg-6 text-end" style={{ marginTop: "-20px" }}>
              {!isEdit
                ? !hide &&
                  claim?.claimDetails && (
                    <button
                      className="btn btn-color m-1"
                      onClick={() => setIsEdit(true)}
                    >
                      Edit
                    </button>
                  )
                : !disable && (
                    <>
                      {" "}
                      <button
                        className="btn btn-color m-1"
                        onClick={() => setIsEdit(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-color m-1"
                        disabled={disable}
                        onClick={() => {
                          setHide(true);
                          saveHandler(setHide);
                        }}
                      >
                        Update
                      </button>
                    </>
                  )}

              
            </div>
            <div className="col-lg-12">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group"></div>
                <div className="col-lg-12">
                  <div className="">
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
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <h5>Enclosure, Remarks & Other Details </h5>
              {/* <hr /> */}
            </div>
            <div className="row">
              <span className="col-lg-7">Endurance :</span>
              <div className="col-lg-4">
                {!isEdit ? (
                  <label>{CashLess ? "CashLess" : "With Cash"}</label>
                ) : (
                  <>
                    <label htmlFor="" className="m-1">
                      Cash Less
                    </label>

                    <input
                      className="form-check-input mt-2"
                      type="checkbox"
                      value={CashLess}
                      checked={CashLess}
                      readOnly={!isEdit}
                      onChange={(e) => setCashLess(1 - CashLess)}
                      // value={row.gst}
                      // onChange={(e) => handleChange(index, row.gst + 1, "gst")}
                      id="remeberMe"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group"></div>
                <div className="col-lg-12">
                  <textarea
                    name=""
                    id=""
                    cols="50"
                    rows="3"
                    value={Endurance}
                    readOnly={!isEdit}
                    onChange={(e) => setEndurance(e.target.value)}
                  ></textarea>
                  {/* <div className="card">
                    <Editor />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <h5>Note Of Self : </h5>
              {/* <hr /> */}
            </div>
            <div className="col-lg-12">
              <div className="row mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group"></div>
                <div className="col-lg-12">
                  <textarea
                    name=""
                    id=""
                    cols="50"
                    rows="3"
                    readOnly={!isEdit}
                    value={NoteOfSelf}
                    onChange={(e) => setNoteOfSelf(e.target.value)}
                  ></textarea>
                  {/* <div className="card">
                    <Editor />
                  </div> */}
                </div>
              </div>
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
                    Repair Auto Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    value={RepairAutoDate}
                    readOnly={!isEdit}
                    onChange={(e) => setRepairAutoDate(e.target.value)}
                    // placeholder="Enter Registration No."
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
                    Repair Completion Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    value={RepairCompletionDate}
                    readOnly={!isEdit}
                    onChange={(e) => setRepairCompletionDate(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Party Agreed
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={PartyAgreed}
                    readOnly={!isEdit}
                    onChange={(e) => setPartyAgreed(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-8">
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
                    Reason thereof Delay
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={ReasonThereofDelay}
                    readOnly={!isEdit}
                    onChange={(e) => setReasonThereofDelay(e.target.value)}
                    // placeholder="Enter Registration No."
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
                    Any Further Conversation
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={AnyFurtherConversation}
                    readOnly={!isEdit}
                    onChange={(e) => setAnyFurtherConversation(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Repairin Photo Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    value={RepairingPhotoDate}
                    readOnly={!isEdit}
                    onChange={(e) => setRepairingPhotoDate(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Reinspection Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    value={ReinspectionDate}
                    readOnly={!isEdit}
                    onChange={(e) => setReinspectionDate(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Salve Destroy
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={SalveDestroy}
                    readOnly={!isEdit}
                    onChange={(e) => setSalveDestroy(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Bill No.
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={BillNo}
                    readOnly={!isEdit}
                    onChange={(e) => setBillNo(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Bill Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    value={BillDate}
                    readOnly={!isEdit}
                    onChange={(E) => setBillDate(E.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Bill Amount
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={BillAmount}
                    readOnly={!isEdit}
                    onChange={(E) => setBillAmount(E.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />
        </div>
        <div className="col-lg-12 mt-5">
          <div className="row mt-1">
            <div className="col-lg-5"></div>
            <div className="col-lg-2">
              {/*<div className="row mt-1">
                <div className="col-lg-7 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontWeight: "",
                      // marginTop: "-13px",
                      fontSize: "12px",
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
                      fontSize: "12px",
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
                <div className="col-lg-7 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontWeight: "",
                      // marginTop: "-13px",
                      fontSize: "12px",
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
      </div>
    </>
  );
};

export default Summary;
