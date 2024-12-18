// import axios from "axios";
// import { useRef, useState } from "react";
// import { useReducer } from "react";
import { FaEye } from "react-icons/fa";
// import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import Exemple from "./UploadReportTableView";
import Form_garage from "./GarageDetailsViewForm";
// import toast from "react-hot-toast";

const GarageDetails = (edit, editHandler) => {
  const router = useRouter();

  const [editCase_03, setEditCase_03] = useState(false);
  const [editVechile, setEditVechile] = useState(false);

  return (
    <>
      <div className=" faq_according row">
        {/* <h4 className="mb-3">Vehicle Details</h4> */}
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingNine">
              <button
                class="btn accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseNine"
                aria-expanded="false"
                aria-controls="collapseNine"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Garage Details</h4>
              </button>
            </h2>
            <div
              id="collapseNine"
              class="accordion-collapse collapse"
              aria-labelledby="headingNine"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body bgc-f6">
                <div className="col-lg-1 m-1">
                  {editCase_03 ? (
                    <button
                      className="btn-thm m-1"
                      style={{}}
                      onClick={() => onSaveHandler()}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn-thm m-1"
                      style={{}}
                      onClick={() => editHandler(3)}
                    >
                      <span
                        className="flaticon-edit"
                        style={{ fontSize: "14px" }}
                      ></span>
                    </button>
                  )}
                </div>
                {!editVechile ? (
                  <div className="row">
                    <div className="col-lg-12 text-start mb-2">
                      <label className="">
                        Megapower Car Services, Bypass Road Kunjwani, Jammu
                      </label>
                    </div>
                    <table className="m-1" style={{ border: "1px solid grey" }}>
                      <tr>
                        <td
                          style={{ border: "1px solid grey", padding: "5px" }}
                        >
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              marginRight: "50px",
                            }}
                          >
                            SPOC Name
                          </label>
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "bold",
                            }}
                          >
                            Estimate Amount
                          </label>
                        </td>
                        <td style={{ border: "1px solid grey" }}>
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                              marginRight: "50px",
                            }}
                          >
                            SPOC Email
                          </label>
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
                        </td>
                        <td style={{ border: "1px solid grey" }}>
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                              marginRight: "50px",
                            }}
                          >
                            SPOC Mobile
                          </label>
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
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{ border: "1px solid grey", padding: "5px" }}
                        >
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              marginRight: "50px",
                            }}
                          >
                            Action
                          </label>
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "bold",
                            }}
                          >
                            Estimate Amount
                          </label>
                        </td>
                        <td style={{ border: "1px solid grey" }}>
                          <div className="col-lg-12">
                            <label
                              htmlFor=""
                              className="text-color text-start"
                              style={{
                                color: "#1560bd",
                                fontWeight: "",
                                marginRight: "50px",
                              }}
                            >
                              Date
                            </label>
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
                        </td>
                        <td style={{ border: "1px solid grey" }}>
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                              marginRight: "50px",
                            }}
                          >
                            Towing Required
                          </label>
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
                        </td>
                      </tr>
                    </table>
                  </div>
                ) : (
                  <div className="row">
                    <Form_garage />
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

export default GarageDetails;
