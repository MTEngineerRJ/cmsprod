// import axios from "axios";
// import { useRef, useState } from "react";
// import { useReducer } from "react";
import { FaEye } from "react-icons/fa";
// import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import Exemple from "./Exemple_01";
// import toast from "react-hot-toast";
import PaymentDetails_01 from "./PaymentsDetails_01";
import { useState } from "react";

const PaymentDetails = ({ edit, finalDisable , onSaveHandler }) => {
  const router = useRouter();

  const [editCase_11, setEditCase_11] = useState(false);

  const editHandler = () => {
    setEdit(true);
  };

  //   const togglePasswordVisibility = () => {
  //     setPasswordVisible(!passwordVisible);
  //   };

  //   const togglePasswordVisibility_01 = () => {
  //     setPasswordVisible_01(!passwordVisible_01);
  //   };

  return (
    <>
      <div className="faq_according row">
        {/* <h4 className="mb-3">Vehicle Details</h4> */}
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFive">
              <button
                class="btn accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Payment Details</h4>
                <div className="col-lg-1 m-1"></div>
              </button>
            </h2>
            <div
              id="collapseFive"
              class="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body bgc-f6">
                <div className="row">
                  <div className="col-lg-1">
                    {editCase_11 ? (
                      <>
                        <button
                          className="btn-thm m-1"
                          style={{}}
                          disabled={finalDisable}
                          onClick={() => onSaveHandler(setEditCase_11)}
                        >
                          Save
                        </button>{" "}
                        <button
                          className="btn-thm flaticon-close"
                          style={{ fontSize: "14px" }}
                        ></button>
                      </>
                    ) : (
                      <button
                        className="btn-thm"
                        style={{}}
                        onClick={() => setEditCase_11(true)}
                      >
                        <span
                          className="flaticon-edit"
                          style={{ fontSize: "14px" }}
                        ></span>
                      </button>
                    )}
                  </div>
                  {editCase_11 && (
                    <div className="col-lg-2 text-start">
                      {/* <button
                        className="btn-thm"
                        // onClick={handleFetchData}
                        style={{}}
                      >
                        Fetch Details
                      </button> */}
                    </div>
                  )}
                </div>

                {editCase_11 ? (
                  <div className="row">
                    <PaymentDetails_01 />
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row mt-1 mb-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Estimate Amount
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="row mt-1 mb-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Invoice Amount
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="row mt-1 mb-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Allowed Amount
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1 mb-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Customer Share
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            // placeholder="Enter Registration No."
                          />
                        </div>
                        <div className="col-lg-12 text-end">
                          <button className="btn btn-color mt-1 ">Save</button>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-12">
                    <div className="row">
                      <Exemple />
                    </div>
                  </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default PaymentDetails;
