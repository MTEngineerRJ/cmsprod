import axios from "axios";
import { useEffect, useState } from "react";
import {
  calculateDepreciationsPercenatge,
  getMonthsDifference,
} from "./functions";

const LabourForm = ({
  currentGst,
  allLabour,
  setTotalAssessed,
  totalRemainingAssessed,
  totalAssessed,
  disable,
  totalTaxableAMount,
  totalEstimate,
  taxAmount,
  allDepreciations,
  claim,
  setTaxAmount,
  overallMetalDep,
  setCurrentGST,
  totalAgeOfvehicle,
  toggleEstimate,
  setToggleEstimate,
  toggleLabor,
  setToggleLabor,
  laborWOPaint,
  towingCharges,
  setTowingCharges,
  loadBody,
  setLoadBody,
  cabin,
  leadId,
  depMetal,
  ageOfVehicle,
  setCabin,
  setReload,
  DateRegistration,
  AccidentAddedDateTime,
  ageOfVehicleTotal,
  metaldepPct,
}) => {

  const [totalLabourSum, setTotalLabourSum] = useState(0)
  useEffect(()=>{

    
    
    let total = 0;
    allLabour.map((labour,index)=>{
      const assessed = Number(labour.assessed);
      if(labour.isActive){
        
       total += assessed;
      }
    })


    setTotalLabourSum(total)
  },[allLabour])

  const calculateVehicleAge = () => {
    if (
      !claim.vehicleDetails?.DateOfRegistration  ||
      !claim.claimDetails?.AddedDateTime
    ) {
      return "0";
    }
    const a = getMonthsDifference(DateRegistration);

    const b = getMonthsDifference(AccidentAddedDateTime);
    console.log(DateRegistration,AccidentAddedDateTime,a-b)
   
    return `${a-b}`;
  };

  const calculateTotalGSTForAssessed = () => {
    const a = (Number(totalAssessed) * Number(currentGst)) / 100;
    const b = totalAssessed + a;
  };

  const calculateAssessedTotal = ()=>{
    let total = 0;
    claims
  }

  const roundOff = (value)=>{
    const roundedValue = parseFloat(value).toFixed(2);
    return roundedValue
  }

  const calculateDepreciationOnMetal = () => {
    const a = calculateDepreciationsPercenatge(
      allDepreciations,
      "Metal",
      claim.vehicleDetails?.DateOfRegistration
    );

    console.log(a);
    return a;
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12 mb-2 mt-2">
            <div className="row mt-1">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="col-lg-12">
                      <input
                        className="form-check-input m-1"
                        type="checkbox"
                        value=""
                        onChange={() => {
                          setToggleEstimate(toggleEstimate + 1);
                          setReload(true);
                        }}
                        id="remeberMe"
                      />
                      Estimate W/O Tax :
                    </div>
                    <div className="col-lg-12 text-center">{roundOff(totalEstimate)}</div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-lg-12 text-end">Assessed:</div>
                    <div className="col-lg-12 text-end">{roundOff(totalLabourSum)}</div>
                  </div>
                  {"   "}
                </div>
              </div>
              {/* <div className="col-lg-6">
                <select
                  className="selectpicker form-select p-1"
                  style={{ fontSize: "smaller" }}
                  data-live-search="true"
                  data-width="100%"
                >
                  <option data-tokens="Status1" value={"Regular"}>
                    Regular
                  </option>
                  <option data-tokens="Status2" value={"Add on Policy"}>
                    Add on Policy
                  </option>
                </select>
              </div> */}
              {/*<div className="col-lg-8">
               
                Labour With Paint  Dep%:{((laborWOPaint) * (Number(12.5))/100)}
            </div>*/}
              <div className="col-lg-8">
                <input
                  className="form-check-input m-1"
                  type="checkbox"
                  value=""
                  id="remeberMe"
                />
                Paint :{roundOff(laborWOPaint)}
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            {/*<div className="row mt-1 mb-1">
              {/*} <div className="col-lg-4 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color mt-2"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Cabin :
                </label>
                </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={cabin}
                  onChange={(e) => setCabin(e.target.value)}
                  // placeholder="Enter Registration No."
                />
              </div>
            </div>*/}
          </div>
          {/*<div className="col-lg-12">
            <div className="row">
              <div className="col-lg-4 my_profile_setting_input form-group text-end mt-1 mb-0">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Load Body
                </label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={loadBody}
                  onChange={(e) => setLoadBody(e.target.value)}
                  // placeholder="Enter Registration No."
                />
              </div>
                </div>
          </div>*/}
          <div className="col-lg-12">
            {/*<div className="row">
              <div className="col-lg-12 my_profile_setting_input form-group text-end mt-1 mb-0">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Towing Charge
                </label>
              </div>
              <div className="col-lg-12">
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={towingCharges}
                  onChange={(e) => setTowingCharges(e.target.value)}
                  // placeholder="Enter Registration No."
                />
              </div>
                </div>*/}
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-12 my_profile_setting_input form-group text-end mt-1 mb-0">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Taxable Amount
                </label>
              </div>
              <div className="col-lg-12">
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={roundOff(totalTaxableAMount)}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-6">
                <div className="col-lg-12 my_profile_setting_input form-group text-end mt-1 mb-0">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    GST @
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={currentGst }
                    onChange={(e) => {
                      setCurrentGST(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="col-lg-12 my_profile_setting_input form-group text-end mt-1 mb-0">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Tax Amount
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={roundOff(taxAmount)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-6">
                <div className="col-lg-12 my_profile_setting_input form-group text-end mt-1 mb-0">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Other Remark
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="col-lg-12 my_profile_setting_input form-group text-end mt-1 mb-0">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Amount
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={roundOff(totalTaxableAMount + taxAmount)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-12 my_profile_setting_input form-group text-end text-end mt-1 mb-0">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Total Amount
                </label>
              </div>
              <div className="col-lg-12">
                <input
                  type="text"
                  className="form-control form-control-table"
                  id="propertyTitle"
                  value={
                    roundOff(totalTaxableAMount + taxAmount + totalRemainingAssessed)
                  }
                  // placeholder="Enter Registration No."
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1"></div>
          </div>

          {/* <div className="col-lg-12 text-center mt-2">
            <div className="my_profile_setting_input">
              <button className="btn btn-color w-100">Update Status</button>
            </div>
          </div> */}
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default LabourForm;
