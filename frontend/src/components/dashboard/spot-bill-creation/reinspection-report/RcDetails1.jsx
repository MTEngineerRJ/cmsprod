import { useEffect, useState } from "react";
import MyDatePicker from "../../common/MyDatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const RcDetails = ({
  RCOwner,
  setRCOwner,
  formatDate,
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
  setRegisteringAuthority,

  VehicleChassisNumber,
  setVehicleChassisNumber,
  EngineNumber,
  setEngineNumber,
  DateRegistration,
  setDateRegistration,
  VehicleClassOfVehicle,
  setVehicleClassOfVehicle,
  VehicleFuelType,
  setVehicleFuelType,
  setVehicleColor,
  VehicleColor,
  VehicleSeatingCapacity,
  setVehicleSeatingCapacity,
  InsuranceCompanyNameAddress,
  setInsuranceCompanyNameAddress,

  VehicleRegisteredNumber,
  setVehicleRegisteredNumber,
  RegisteredOwner,
  setRegisteredOwner,
  PolicyNumber,
  setPolicyNumber,
  isEditMode,
  FitnessTo,
  setFitnessTo,
}) => {
  return (
    <>
      <div className="row">
        <div
          className="col-lg-12 mt-3"
          style={{ borderBottom: "3px solid grey" }}
        >
          <h4 className="text-dark" style={{ fontSize: "17px" }}>
            RC Details :
          </h4>
          <hr />
          <div className="row">
            <div className="col-lg-4">
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
                    onChange={(e) => setVehicleRegisteredNumber(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Owner Name
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
            <div className="col-lg-4">
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
                    Son/Daughter/Wife of
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    readOnly={!isEditMode}
                    value={RCSDW}
                    onChange={(e) => setRCSDW(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Chasis#
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={VehicleChassisNumber}
                    readOnly={!isEditMode}
                    onChange={(e) => setVehicleChassisNumber(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Engine#
                  </label>
                </div>
                <div className="col-lg-8">
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
            <div className="col-lg-4">
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
                    Maker Name
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={RCMakerName}
                    readOnly={!isEditMode}
                    onChange={(e) => setRCMakerName(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Model Name
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={RCModelName}
                    readOnly={!isEditMode}
                    onChange={(e) => setRCModelName(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Registration Date
                  </label>
                </div>
                <div className="col-lg-8">
                { !isEditMode ? 
                  <input 
              readOnly={!isEditMode}
              type={ "text"}
              value={DateRegistration ? formatDate(DateRegistration) : ""}
             
              className="form-control" 
            id="propertyTitle" />
            :
                <MyDatePicker
                disable={!isEditMode}
                selectedDate={DateRegistration ? new Date(DateRegistration) : ""}
                setSelectedDate={setDateRegistration}
                />}
                  {/*<input
                    type={isEditMode ? "date" : "text"}
                    className="form-control"
                    id="propertyTitle"

                    value={formatDate(DateRegistration)}
                    readOnly={!isEditMode}
                    onChange={(e) => setDateRegistration(e.target.value)}
                    // placeholder="Enter Registration No."
                  />*/}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Tax Valid Upto
                  </label>
                </div>
                <div className="col-lg-7">
                  {/* <input
                    type={isEditMode ? "date" : "text"}
                    className="form-control"
                    id="propertyTitle"
                    value={formatDate(RCTaxValidUpto)}
                    readOnly={!isEditMode}
                    onChange={(e) => setRCTaxValidUpto(e.target.value)}

                    // placeholder="Enter Registration No."
                  />*/}
                  { !isEditMode ? 
                    <input 
                readOnly={!isEditMode}
                type={ "text"}
                value={RCTaxValidUpto ? formatDate(RCTaxValidUpto) : ""}
               
                className="form-control" 
              id="propertyTitle" />
              :
                  <MyDatePicker
                    disable={!isEditMode}
                    selectedDate={RCTaxValidUpto ? new Date(RCTaxValidUpto) : ""}
                    setSelectedDate={setRCTaxValidUpto}
                    />}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Vehicle Class
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={VehicleClassOfVehicle}
                    readOnly={!isEditMode}
                    onChange={(e) => setVehicleClassOfVehicle(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Vehicle Description
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    // disabled={!isEditMode}
                    className="form-control"
                    id="propertyTitle"
                    readOnly={!isEditMode}
                    value={RCVehicleDescription}
                    onChange={(e) => setRCVehicleDescription(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Fuel Type
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={VehicleFuelType}
                    readOnly={!isEditMode}
                    onChange={(e) => setVehicleFuelType(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Emmission Norm
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    // disabled={!isEditMode}
                    className="form-control"
                    id="propertyTitle"
                    readOnly={!isEditMode}
                    value={EmissionNorm}
                    onChange={(e) => setEmissionNorm(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Color
                  </label>
                </div>
                <div className="col-lg-8">
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
            <div className="col-lg-4">
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
                    Seat Capacity
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={VehicleSeatingCapacity}
                    readOnly={!isEditMode}
                    onChange={(e) => setVehicleSeatingCapacity(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Standing Capacity
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={StandingCapacity}
                    readOnly={!isEditMode}
                    onChange={(e) => setStandingCapacity(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Financier
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    readOnly={!isEditMode}
                    value={Financier}
                    onChange={(e) => setFinancier(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Insurance Company
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="number"
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
            <div className="col-lg-4">
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
                    Insurance Policy No.
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={PolicyNumber}
                    readOnly={!isEditMode}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Insurance Valid Upto
                  </label>
                </div>
                <div className="col-lg-7">
                  {/*<input
                    type={isEditMode ? "date" : "text"}
                    className="form-control"
                    id="propertyTitle"
                    value={formatDate(InsuranceValidUpto)}
                    readOnly={!isEditMode}
                    onChange={(e) => setInsuranceValidUpto(e.target.value)}
                  />*/}
                  { !isEditMode ? 
                    <input 
                readOnly={!isEditMode}
                type={ "text"}
                value={InsuranceValidUpto ? formatDate(InsuranceValidUpto) : ""}
               
                className="form-control" 
              id="propertyTitle" />
              :
              <DatePicker
                      className="form-control"
                      id="propertyTitle"
                      selected={
                        InsuranceValidUpto !== null && !isNaN(new Date(InsuranceValidUpto))
                          ? new Date(InsuranceValidUpto)
                          : null
                      }
                      onChange={(date) => setInsuranceValidUpto(date)}
                    />
                  // <MyDatePicker
                  // disable={!isEditMode}
                  //   selectedDate={InsuranceValidUpto ? new Date(InsuranceValidUpto) : ""}
                  //   setSelectedDate={setInsuranceValidUpto}
                  // /> 
                }
                  
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    Fitness Valid Upto
                  </label>
                </div>
                <div className="col-lg-7">
                  {/*<input
                    type={isEditMode ? "date" : "text"}
                    className="form-control"
                    id="color"
                    // value={VehicleModel}
                    value={formatDate(FitnessTo)}
                    onChange={(e) => setFitnessTo(e.target.value)}
                    readOnly={!isEditMode}
                    // onChange={(e) => setVehicleTypeOfBody(e.target.value)}

                    // placeholder="Enter Registration No."
                  />*/}
                  { !isEditMode ? 
                    <input 
                readOnly={!isEditMode}
                type={ "text"}
                value={FitnessTo ? formatDate(FitnessTo)  : ""}
               
                className="form-control" 
              id="propertyTitle" />
              :
                  <MyDatePicker
                  disable={!isEditMode}
                    selectedDate={FitnessTo ? new Date(FitnessTo) : ""}
                    setSelectedDate={setFitnessTo}
                  /> }
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    PUCC No.
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={PUCCNumber}
                    readOnly={!isEditMode}
                    onChange={(e) => setPUCCNumber(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
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
                    PUCC Valid Upto
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="color"
                    value={PUCCValidUpto}
                    readOnly={!isEditMode}
                    onChange={(e) => setPUCCValidUpto(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
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
                  Registering Authority
                </label>
              </div>
              <div className="col-lg-7">
                <input
                  type="number"
                  className="form-control"
                  id="propertyTitle"
                  value={RegisteringAuthority}
                  onChange={(e) => setRegisteringAuthority(e.target.value)}
                  placeholder="Enter Registration No."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RcDetails;
