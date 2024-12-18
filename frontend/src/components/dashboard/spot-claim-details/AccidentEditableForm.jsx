import { useRouter } from "next/router";
import AccidentViewForm from "./AccidentViewForm";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../common/Loader";
import TimePicker from "../../common/TimePicker";
import { setDate, closeFunction } from "./functions/AccidentSectionFunctions";

const AccidentEditableForm = ({
  claim,
  onSaveHandler,
  finalDisable,
  PlaceOfLoss,
  setPlaceOfLoss,
  PlaceOfSurvey,
  setPlaceOfSurvey,
  TimeOfAccident,
  setTimeOfAccident,
  DateOfAccident,
  setDateOfAccident,
  Pin,
  setPin,
}) => {
  const router = useRouter();
  const [editCase_03, setEditCase_03] = useState(false);
  const [isUpdateVehicleLoading, setisUpdateVehicleLoading] = useState(false);

  return (
    <>
      <div className="faq_according row mt-2">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTen">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTen"
                aria-expanded="false"
                aria-controls="collapseTen"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Accident Details</h4>
                <div className="col-lg-1 m-1"></div>
              </button>
            </h2>
            <div
              id="collapseTen"
              class="accordion-collapse collapse"
              aria-labelledby="headingTen"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body bgc-f6">
                <div className="row">
                  <div className="col-lg-2">
                    {editCase_03 ? (
                      <>
                        <button
                          className="btn-thm m-1"
                          style={{}}
                          disabled={finalDisable}
                          onClick={() => {
                            setisUpdateVehicleLoading(true);
                            onSaveHandler(5, closeFunction, closeFunction);
                          }}
                        >
                          Save
                        </button>{" "}
                        <button
                          onClick={() => setEditCase_03(false)}
                          className="btn-thm flaticon-close"
                          style={{ fontSize: "14px" }}
                        ></button>
                      </>
                    ) : (
                      claim?.claimDetails?.PolicyNumber && (
                        <button
                          className="btn-thm"
                          style={{}}
                          onClick={() => setEditCase_03(true)}
                        >
                          <span
                            className="flaticon-edit"
                            style={{ fontSize: "14px" }}
                          ></span>
                        </button>
                      )
                    )}
                  </div>
                  <div className="col-lg-2 text-start"></div>
                </div>
                {isUpdateVehicleLoading ? (
                  <Loader />
                ) : editCase_03 ? (
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Date Of Accident
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            dateFormat="dd/MM/yyyy"
                            selected={
                              DateOfAccident !== null &&
                              !isNaN(new Date(DateOfAccident))
                                ? new Date(DateOfAccident)
                                : ""
                            }
                            onChange={(date) => {
                              setDate(date, setDateOfAccident);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Time Of Accident
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <TimePicker
                            selectedTime={TimeOfAccident ? TimeOfAccident : ""}
                            setSelectedTime={setTimeOfAccident}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Place Of Accident
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={PlaceOfLoss ? PlaceOfLoss : ""}
                            onChange={(e) => setPlaceOfLoss(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Pin Code
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={Pin}
                            onChange={(e) => setPin(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Place Of Survey
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={PlaceOfSurvey ? PlaceOfSurvey : ""}
                            onChange={(e) => setPlaceOfSurvey(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <AccidentViewForm claim={claim} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccidentEditableForm;
