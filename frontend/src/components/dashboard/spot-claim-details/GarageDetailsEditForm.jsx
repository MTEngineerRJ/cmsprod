import { useRouter } from "next/router";
import GarageDetailsViewForm from "./GarageDetailsViewForm";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../common/Loader";

const GarageDetailsEditForm = ({
  claim,
  finalDisable,
  GarageNameAndAddress,
  setGarageNameAndAddress,
  GarageContactNo1,
  setGarageContactNo1,
  GarageContactNo2,
  setGarageContactNo2,
  GarageAddedBy,
  onSaveHandler,
}) => {
  const router = useRouter();
  const [editCase_03, setEditCase_03] = useState(false);
  const [isUpdateVehicleLoading, setisUpdateVehicleLoading] = useState(false);

  const closeFunction = () => {
    setEditCase_03(false);
    setisUpdateVehicleLoading(false);
  };

  return (
    <>
      <div className="faq_according row mt-2">
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
                <div className="col-lg-1 m-1"></div>
              </button>
            </h2>
            <div
              id="collapseSeven"
              class="accordion-collapse collapse"
              aria-labelledby="headingSeven"
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
                          disabled={!editCase_03 || finalDisable}
                          onClick={() => {
                            setisUpdateVehicleLoading(true);
                            onSaveHandler(4, closeFunction, closeFunction);
                          }}
                        >
                          Save
                        </button>{" "}
                        <button
                          disabled={!editCase_03}
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
                            onChange={(e) =>
                              setGarageNameAndAddress(e.target.value)
                            }
                            value={GarageNameAndAddress}
                            // disabled={!edit}
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
                            Contact Number <span class="req-btn">*</span>
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={GarageContactNo1}
                            onChange={(e) =>
                              setGarageContactNo1(e.target.value)
                            }
                            // disabled={!edit}
                            // placeholder="Enter Registration No."
                          />

                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={GarageContactNo2}
                            onChange={(e) =>
                              setGarageContactNo2(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <GarageDetailsViewForm
                      claim={claim}
                      GarageNameAndAddress={GarageNameAndAddress}
                      GarageContactNo1={GarageContactNo1}
                      GarageAddedBy={GarageAddedBy}
                    />
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

export default GarageDetailsEditForm;
