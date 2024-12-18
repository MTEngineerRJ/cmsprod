// import axios from "axios";
// import { useRef, useState } from "react";
// import { useReducer } from "react";
import { FaEye } from "react-icons/fa";
// import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
// import toast from "react-hot-toast";

const Form = () => {
  const router = useRouter();

  //   const togglePasswordVisibility = () => {
  //     setPasswordVisible(!passwordVisible);
  //   };

  //   const togglePasswordVisibility_01 = () => {
  //     setPasswordVisible_01(!passwordVisible_01);
  //   };

  return (
    <>
      <div className=" faq_according row">
        {/* <h4 className="mb-3">Vehicle Details</h4> */}
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="btn accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
                style={{ padding: "10px 10px 0 40px" }}
              >
                <h4 className="">Vehicle Details</h4>
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Name <span class="req-btn">*</span>
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
                    {/* <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input type="text" className="form-control" id="propertyTitle" />
        </div> */}
                  </div>

                  <div className="col-lg-6">
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Phone <span class="req-btn">*</span>
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
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Email <span class="req-btn">*</span>
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
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          LeadID <span class="req-btn">*</span>
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
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Registration No. <span class="req-btn">*</span>
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
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Insurer ClaimID
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
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Status <span class="req-btn">*</span>
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
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Sub Status <span class="req-btn">*</span>
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
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Intimation Date <span class="req-btn">*</span>
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
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Request Type <span class="req-btn">*</span>
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
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Endorsement Doc <span class="req-btn">*</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default Form;
