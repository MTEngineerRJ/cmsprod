import axios from "axios";
import { useRouter } from "next/router";
import { use, useEffect, useReducer } from "react";
import { useState } from "react";
import MyDatePicker from "../../common/MyDatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import {
  getNextYear,
  formatDateFinal,
  generateRegion,
  handleInputChange,
  handleInputChange_01,
} from "./functions";
import { regionList } from "../../../utils/regionsList";

const CreateView = () => {
  const [applicantNumber, setApplicantNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber_01, setPhoneNumber_01] = useState("");
  const [phoneNumber_02, setPhoneNumber_02] = useState("");
  const [disable, setDisable] = useState(false);
  const [showPreInspection,setShowPreInspection] = useState(false);
  const [showSpot,setShowSpot] = useState(false);
  const [showFinal,setShowFinal] = useState(false);
  
  const router = useRouter();
  const todayDate = new Date();
  const formattedTodayDate = todayDate.toISOString().split("T")[0];
  const regionType = JSON.parse(localStorage.getItem("regionType"));

  const [region, setRegion] = useState(regionType);
  const [date, setDate] = useState(formattedTodayDate);
  const [surveyType, setSurveyType] = useState("Motor");
  const [inspectionType, setInspectionType] = useState("Final");
  const [policyNumber, setPolicyNumber] = useState("");
  const [policyIssuingOffice, setPolicyIssuingOffice] = useState("");
  const [policyStartDate, setPolicyStartDate] = useState("");
  const [policyStartEnd, setPolicyStartEnd] = useState("");
  const [claimSurvicingOffice, setClaimSurvicingOffice] = useState("");
  const [insuredName, setInsuredName] = useState("");
  const [insuredMobileNo1, setInsuredMobileNo1] = useState("");
  const [insuredMobileNo2, setInsuredMobileNo2] = useState("");
  const [insuredMailAddress, setInsuredMailAddress] = useState("");
  const [vehicleParticular, setVehicleParticular] = useState("");
  const [placeOfLoss, setPlaceOfLoss] = useState("");
  const [natureOfLoss, setNatureOfLoss] = useState("");
  const [estimatedLoss, setEstimatedLoss] = useState("");
  const [garageName, setGarageName] = useState("");
  const [garageNumber, setGarageNumber] = useState("");
  const [garageMailId, setGarageMailId] = useState("");
  const [claimNumber, setClaimNumber] = useState("");
  const [allListedRegions, setAllListedRegions] = useState(regionList);

  const [allServicingOffice, setAllServicingOffice] = useState([]);
  const [brokerMailId, setBrokerMailId] = useState("intimationmt@gmail.com");

  useEffect(() => {
    setPolicyStartEnd(getNextYear(policyStartDate));
  }, [policyStartDate]);

  useEffect(() => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo[0].IsPreInspection){
      setShowPreInspection(true);
    }
    if(userInfo[0].IsSpotInspection){
      setShowSpot(true);
    }
    if(userInfo[0].IsFinalInspection){
      setShowFinal(true);
    }
    axios
      .get("/api/getClaimServicingOffice")
      .then((res) => {
        setAllServicingOffice(res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
 
  }, []);

  const submitHandler = () => {
    setDisable(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const payload = {
      SurveyType: surveyType ? surveyType : "Motor",
      ReferenceNo: generateRegion(region),
      PolicyIssuingOffice: policyIssuingOffice,
      PolicyNumber: policyNumber,
      PolicyPeriodStart: formatDateFinal(policyStartDate),
      PolicyPeriodEnd: formatDateFinal(policyStartEnd),
      ClaimServicingOffice: claimSurvicingOffice,
      ClaimNumber: claimNumber,
      AddedBy: userInfo[0].Username,
      Region: String(inspectionType).toLowerCase().includes("pre-inspection") ? "Preinspection" : region,
      InspectionType: inspectionType ? inspectionType : "Final",
      IsClaimCompleted: 0,
      IsActive: 1,
      InsuredName: insuredName,
      InsuredMobileNo1: insuredMobileNo1,
      InsuredMailAddress: insuredMailAddress,
      InsuredMobileNo2: insuredMobileNo2,
      InsuredAddress: "",
      RegisteredNumber: vehicleParticular,
      GarageMailAddress: garageMailId,
      BrokerMailAddress: brokerMailId,
      GarageNameAndAddress: garageName,
      GarageContactNo1: garageNumber,
      GarageContactNo2: garageNumber,
      PlaceOfLoss: placeOfLoss,
      NatureOfLoss: natureOfLoss,
      EstimatedLoss: estimatedLoss,
    };
    if(String(payload.InspectionType).toLowerCase() === "pre-inspection" && !payload.RegisteredNumber){
      
        toast.error("Please fill the Vehicle Number !!", {
          className: "toast-loading-message",
        });
        setDisable(false);
    }
    else if(String(payload.InspectionType).toLowerCase() === "pre-inspection" && !payload.InsuredName){
      
      toast.error("Please fill the Insured Name !!", {
        className: "toast-loading-message",
      });
      setDisable(false);
  }
    else if (!payload.PolicyNumber && String(payload.InspectionType).toLowerCase() !== "pre-inspection") {
      toast.error("Policy Number should be filled !!", {
        className: "toast-loading-message",
      });
      setDisable(false);
    } else if (!region && String(payload.InspectionType).toLowerCase() !== "pre-inspection") {
      toast.error("Region should be filled!!", {
        className: "toast-loading-message",
      });
      setDisable(false);
    } else {
      toast.loading("Adding claim!!", {
        className: "toast-loading-message",
      });
      axios
        .post("/api/addClaim", payload, {
          headers: {
            Authorization: `Bearer ${userInfo[0].Token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.dismiss();
          toast.success("Successfully added !", {
            className: "toast-loading-message",
          });
          router.push("/my-dashboard");
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("Got error while adding claim!");
        });
    }
  };

  return (
    <>
      <Toaster />
      <div className="row">
        <div className="col-lg-4">
          <div className="row mt-1 mb-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Region
              </label>
            </div>
            <div className="col-lg-7">
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option data-tokens="Status1">Select Region</option>
                {allListedRegions.map((region, idx) => {
                  return (
                    <option key={idx} data-tokens="type1" value={region.Region}>
                      {region.Region}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Broker Mail Id
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="email"
                className="form-control"
                id="broker_mail_id"
                value={brokerMailId}
                onChange={(e) => setBrokerMailId(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Inspection Type
              </label>
            </div>
            <div className="col-lg-7">
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                value={inspectionType}
                onChange={(e) => setInspectionType(e.target.value)}
              >
                {showFinal && <option data-tokens="Status2" value={"Final"}>
                  Final
                </option>}
                {showSpot && <option data-tokens="Status1" value={"spot"}>
                  Spot
                </option>}

                {showPreInspection && <option data-tokens="Status3" value={"pre-inspection"}>
                  Pre-inspection
                </option>}
              </select>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Date
              </label>
            </div>
            <div className="col-lg-7">
              <MyDatePicker
                type="date"
                className="form-control"
                id="propertyTitle"
                selectedDate={date}
                setSelectedDate={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Policy Number
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Policy Issuing Office
              </label>
            </div>
            <div className="col-lg-7">
              <select
                type="text"
                className="form-control form-control-add-claim"
                id="propertyTitle"
                value={policyIssuingOffice}
                onChange={(e) => setPolicyIssuingOffice(e.target.value)}
              >
                <option key={-1} value={""}></option>
                {allServicingOffice.map((office, index) => {
                  return (
                    <option key={index}>{office.OfficeNameWithCode}</option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Policy Period Start
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="date"
                value={
                  policyStartDate && policyStartDate !== "null"
                    ? policyStartDate.substring(0, 10)
                    : ""
                }
                onChange={(e) => setPolicyStartDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Policy Period End
              </label>
            </div>
            <div className="col-lg-7">
              <MyDatePicker
                type="date"
                className="form-control"
                id="propertyTitle"
                setSelectedDate={setPolicyStartEnd}
                selectedDate={policyStartEnd}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Claim Number
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={claimNumber}
                onChange={(e) => setClaimNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Claim Servicing Office
              </label>
            </div>
            <div className="col-lg-7">
              <select
                type="text"
                className="form-control form-control-add-claim"
                id="propertyTitle"
                value={claimSurvicingOffice}
                onChange={(e) => setClaimSurvicingOffice(e.target.value)}
              >
                <option key={-1} value={""}></option>
                {allServicingOffice.map((office, index) => {
                  return (
                    <option key={index}>{office.OfficeNameWithCode}</option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Insured Name
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={insuredName}
                onChange={(e) => setInsuredName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Insured Mobile No. 1
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                maxLength={10}
                className="form-control"
                id="formGroupExampleInput3"
                value={phoneNumber}
                onChange={(e) =>
                  handleInputChange(e, setInsuredMobileNo1, setPhoneNumber)
                }
                pattern="[0-9]*"
                title="Please enter only 10 digits"
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Insured Mobile No. 2
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                maxLength={10}
                className="form-control"
                id="propertyTitle"
                value={phoneNumber_01}
                onChange={(e) =>
                  handleInputChange_01(
                    e,
                    setInsuredMobileNo2,
                    setPhoneNumber_01
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Insured Mail Address
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="email"
                className="form-control"
                id="propertyTitle"
                value={insuredMailAddress}
                onChange={(e) => setInsuredMailAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Vehicle Particulars
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={vehicleParticular}
                onChange={(e) => setVehicleParticular(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Place of Loss
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={placeOfLoss}
                onChange={(e) => setPlaceOfLoss(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Nature of Loss
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={natureOfLoss}
                onChange={(e) => setNatureOfLoss(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Estimated Loss
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={estimatedLoss}
                onChange={(e) => setEstimatedLoss(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Garage Mail id
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="email"
                className="form-control"
                id="garageMailId"
                value={garageMailId}
                onChange={(e) => setGarageMailId(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Garage Name & Add.
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={garageName}
                onChange={(e) => setGarageName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Garage Contact No.
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                maxLength={10}
                className="form-control"
                id="propertyTitle"
                value={garageNumber}
                onChange={(e) => setGarageNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
{/* 
        <div className="col-lg-4">
          <div className="row mt-1">
            <div className="col-lg-5 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Type Of Report
              </label>
            </div>
            <div className="col-lg-7">
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                // value={inspectionType}
                // onChange={(e) => setInspectionType(e.target.value)}
              >
                { <option data-tokens="Status2" value={"final-report"}>
                  Final Report
                </option>}
                { <option data-tokens="Status1" value={"spot-report"}>
                  Spot Report
                </option>}

                { <option data-tokens="Status3" value={"pre-inspection-report"}>
                  Pre-inspection Report
                </option>}

                { <option data-tokens="Status3" value={"re-inspection-report"}>
                  Re-Insepction Report
                </option>}
              </select>
            </div>
          </div>
        </div>

         */}

        <div className="col-lg-12">
          <div className="my_profile_setting_input">
            <button
              disabled={disable}
              className="btn float-end btn-color"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateView;
