// import axios from "axios";
// import { useRef, useState } from "react";
// import { useReducer } from "react";
import { FaEye } from "react-icons/fa";
// import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
// import toast from "react-hot-toast";

const Form = ({ claim,
   edit,
   GarageNameAndAddress ,
   setGarageNameAndAddress,
   GarageContactNo1,
   setGarageContactNo1,
   GarageContactNo2,
   setGarageContactNo2,
   GarageAddedBy,
   setGarageAddedBy }) => {
  const router = useRouter();

  const formatDate = (val) => {
    const date = new Date(val);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

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
      <div className="row mt-2">
        {/* <h4 className="mb-3">Vehicle Details</h4> */}
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingSeven">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Garage Details</h4>
                <div className="col-lg-1 m-1">
                 
                </div>
              </button>
            </h2>
            <div
              id="collapseSeven"
              class="accordion-collapse collapse"
              aria-labelledby="headingSeven"
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
                          Name & Address<span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          onChange={(e)=>setGarageNameAndAddress(e.target.value)}
                          value={GarageNameAndAddress ? GarageNameAndAddress : claim.GarageNameAndAddress}
                          disabled={!edit}
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
                          Contact Number <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={GarageContactNo1 ? GarageContactNo1 : claim.GarageContactNo1}
                            onChange={(e)=>setGarageContactNo1(e.target.value)}
                            disabled={!edit}
                            // placeholder="Enter Registration No."
                          />
                        
                       
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={GarageContactNo2 ? GarageContactNo2 : claim.GarageContactNo2}
                            onChange={(e)=>setGarageContactNo2(e.target.value)}
                            disabled={!edit}
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
                          Added Date <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          value={formatDate(claim.GarageAddedDate)}
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
                          Added By <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          value={GarageAddedBy ? GarageAddedBy :claim.GarageAddedBy}
                          onChange={(e)=>setGarageAddedBy(e.target.value)}
                          disabled={!edit}
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
                          Modified Date <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          value={formatDate(claim.GarageModifiedDate)}
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