// import axios from "axios";
// import { useRef, useState } from "react";
// import { useReducer } from "react";
import { FaEye } from "react-icons/fa";
// import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import { useState } from "react";
import Exemple from "./Exemple_01";
import Image from "next/image";
import EstimateList_01 from "./EstimateList_01";
// import toast from "react-hot-toast";

const EstimateList = ({ edit, finalDisable , onSaveHandler }) => {
  const router = useRouter();

  const editHandler = () => {
    setEdit(true);
  };

  const [editCase_10, setEditCase_10] = useState(false);

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
            <h2 class="accordion-header" id="headingEight">
              <button
                class="btn accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEight"
                aria-expanded="false"
                aria-controls="collapseEight"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Estimate List</h4>
                <div className="col-lg-1 m-1"></div>
              </button>
            </h2>
            <div
              id="collapseEight"
              class="accordion-collapse collapse"
              aria-labelledby="headingEight"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body bgc-f6">
                <div className="row">
                  <div className="col-lg-2  ">
                    {editCase_10 ? (
                      <>
                        <button
                          className="btn-thm m-1"
                          style={{}}
                          disabled={finalDisable}
                          onClick={() => onSaveHandler(setEditCase_10)}
                        >
                          Save
                        </button>
                        <button
                          className="btn-thm flaticon-close"
                          style={{ fontSize: "14px" }}
                        ></button>
                      </>
                    ) : (
                      <button
                        className="btn-thm"
                        style={{}}
                        onClick={() => setEditCase_10(true)}
                      >
                        <span
                          className="flaticon-edit"
                          style={{ fontSize: "14px" }}
                        ></span>
                      </button>
                    )}
                  </div>
                  {editCase_10 && (
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

                {editCase_10 ? (
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
                            Garage ID
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
                            Amount
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
                            Garage
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
                ) : (
                  <div className="row">
                    <div className="col-lg-4 text-start mb-2">
                      <table
                        className="m-1"
                        style={{ border: "1px solid grey" }}
                      >
                        <tr>
                          <th
                            style={{
                              border: "1px solid grey",
                              padding: "15px",
                            }}
                          >
                            <div className="row">
                              <label
                                htmlFor=""
                                className="col-lg-12 text-color text-start"
                                style={{
                                  color: "black",
                                  fontSize: "15px",
                                }}
                              >
                                Select
                              </label>
                            </div>
                          </th>
                          <th
                            style={{
                              border: "1px solid grey",
                              padding: "15px",
                            }}
                          >
                            <div className="row">
                              <label
                                htmlFor=""
                                className="col-lg-12 text-color text-start"
                                style={{
                                  color: "black",
                                  fontSize: "15px",
                                }}
                              >
                                GarageID
                              </label>
                            </div>
                          </th>
                          <th
                            style={{ border: "1px solid grey", padding: "5px" }}
                          >
                            <div className="row">
                              <label
                                htmlFor=""
                                className="col-lg-12 text-color text-start"
                                style={{
                                  color: "black",
                                  fontSize: "15px",
                                }}
                              >
                                Garage
                              </label>
                            </div>
                          </th>
                          <th
                            style={{ border: "1px solid grey", padding: "5px" }}
                          >
                            <div className="row">
                              <label
                                htmlFor=""
                                className="col-lg-12 text-color text-start"
                                style={{
                                  color: "black",
                                  fontSize: "15px",
                                }}
                              >
                                Amount
                              </label>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <td
                            style={{ border: "1px solid grey", padding: "5px" }}
                          >
                            <div className="row">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                required
                                id="terms"
                                style={{
                                  border: "1px solid black",
                                  marginLeft: "20px",
                                }}
                              />
                            </div>
                          </td>
                          <td
                            style={{ border: "1px solid grey", padding: "5px" }}
                          >
                            <div className="row">
                              <label
                                htmlFor=""
                                className="col-lg-12 text-color text-start"
                                style={{
                                  color: "black",
                                  fontSize: "15px",
                                }}
                              >
                                Name
                              </label>
                            </div>
                          </td>
                          <td
                            style={{ border: "1px solid grey", padding: "5px" }}
                          >
                            <div className="row">
                              <label
                                htmlFor=""
                                className="col-lg-12 text-color text-start"
                                style={{
                                  color: "black",
                                  fontSize: "15px",
                                }}
                              >
                                Name
                              </label>
                            </div>
                          </td>
                          <td
                            style={{ border: "1px solid grey", padding: "5px" }}
                          >
                            <div className="row">
                              <label
                                htmlFor=""
                                className="col-lg-12 text-color text-start"
                                style={{
                                  color: "black",
                                  fontSize: "15px",
                                }}
                              >
                                Name
                              </label>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <div className="col-lg-12 text-end">
                        <button
                          className="col-lg-12 btn btn-color"
                          style={{ marginLeft: "" }}
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div
                        className="container"
                        style={{
                          border: "1px solid black",
                          width: "200px",
                          height: "100px",
                        }}
                      ></div>
                    </div>
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

export default EstimateList;
