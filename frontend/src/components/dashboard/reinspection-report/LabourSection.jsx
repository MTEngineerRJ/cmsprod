import { useEffect, useState } from "react";
import MyDatePicker from "../../common/MyDatePicker";
import toast from "react-hot-toast";
import axios from "axios";
import DatePicker from "react-datepicker";
import Exemple_01 from "./Exemple_01";
import "react-datepicker/dist/react-datepicker.css";
import LabourForm from "./LabourForm";

const LabourSection = ({calculateVehicleAge,calculateDepreciationOnMetal}) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-9" style={{ borderRight: "1px solid black" }}>
          <Exemple_01
            currentGst={currentGst}
            setTotalAssessed={setTotalAssessed}
            totalAssessed={totalAssessed}
            setTotalEstimate={setTotalEstimate}
            totalEstimate={totalEstimate}
            taxAmount={taxAmount}
            setTaxAmount={setTaxAmount}
            toggleEstimate={toggleEstimate}
            setToggleEstimate={setToggleEstimate}
            toggleLabor={toggleLabor}
            setToggleLabor={setToggleLabor}
            allRows={allRows}
            setAllRows={setAllRows}
            setReload={setReload}
          />
        </div>
        <div className="col-lg-3">
          <LabourForm
            currentGst={currentGst}
            setCurrentGST={setCurrentGst}
            setTotalAssessed={setTotalAssessed}
            totalAssessed={totalAssessed}
            totalEstimate={totalEstimate}
            taxAmount={taxAmount}
            setTaxAmount={setTaxAmount}
            toggleEstimate={toggleEstimate}
            setToggleEstimate={setToggleEstimate}
            toggleLabor={toggleLabor}
            setToggleLabor={setToggleLabor}
            setReload={setReload}
            overallMetalDep={overallMetalDep}
            totalAgeOfvehicle={totalAgeOfvehicle}
          />
        </div>
        <div className="col-lg-12 mt-5">
          <div className="row mt-1">
            <div className="col-lg-5"></div>
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

export default LabourSection;
