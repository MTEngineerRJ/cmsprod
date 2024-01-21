// import axios from "axios";
// import { useRef, useState } from "react";
// import { useReducer } from "react";
import { FaEye } from "react-icons/fa";
// import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import Exemple from "./Exemple_01";
import Image from "next/image";
// import toast from "react-hot-toast";

const EstimateList = (edit) => {
  const router = useRouter();

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
                <div className="col-lg-1 m-1">
                  {/*<button
                    className="btn-thm mb-1"
                    style={{ marginTop: "-10px" }}
                    onClick={editHandler}
                  >
                    {edit ? "Save" : <span className="flaticon-edit"></span>}
  </button>*/}
                </div>
              </button>
            </h2>
            <div
              id="collapseEight"
              class="accordion-collapse collapse"
              aria-labelledby="headingEight"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div className="row">
                  <div className="col-lg-4 text-start mb-2">
                    <table className="m-1" style={{ border: "1px solid grey" }}>
                      <tr>
                        <th
                          style={{ border: "1px solid grey", padding: "15px" }}
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
                          style={{ border: "1px solid grey", padding: "15px" }}
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
                              style={{ border: "1px solid black", marginLeft:"20px" }}
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
                  </div>
                  <div className="col-lg-4">
                    <div
                      className="container"
                      style={{ border: "1px solid black", width:"200px", height:"100px" }}
                    ></div>
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

export default EstimateList;