import { useRouter } from "next/router";
import DriverDetailsViewForm from "./DriverDetailsViewForm";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";

const DriverDetailsEditForm = ({
  claim,
  editHandler,
  edit,
  finalDisable,
  setFinalDisable,
  DriverName,
  setDriverName,
  DriverAddedDate,
  setDriverAddedDate,
  Verification,
  setVerification,
  updateHandlerAfterFetching,
  LicenseNumber,
  setLicenseNumber,
  setLicenseType,
  LicenseType,
  IssuingAuthority,
  setIssuingAuthority,

  onSaveHandler,

  FatherName,
  setFatherName,
  Gender,
  setGender,
  BloodGroup,
  setBloodGroup,
  setAddress,
  Address,
  setRtoName,
  RtoName,
  Mobile,
  setMobile,
  ValidUpto,
  setValidUpto,
  Vov,
  setVov,
  setPht,
  Pht,
  Photo,
  setPhoto,
  DateOfBirth,
  setDateOfBirth,
  setDateOfIssue,
  DateOfIssue,
  setIsDriverDetailsFetched,
  DLStatus,
}) => {
  const router = useRouter();
  const [editCase_02, setEditCase_02] = useState(false);
  const [editVechile, setEditVechile] = useState(false);

  const handleFetchData = () => {
    if (
      !claim?.driverDetails?.LicenseNumber ||
      claim?.driverDetails?.LicenseNumber === "null"
    ) {
      alert("Please fill License Number first!");
    } else if (
      claim?.driverOnlineDetails &&
      String(claim?.driverOnlineDetails?.LicenseNumber) ===
        String(claim?.driverDetails?.LicenseNumber)
    ) {
      const details = claim?.driverOnlineDetails;
      setFatherName(details?.FatherName);
      setBloodGroup(details?.BloodGroup);
      setAddress(details?.Address);
      setRtoName(details?.RtoName);
      setLicenseNumber(details?.LicenseNumber);
      setGender(details?.Gender);
      setMobile(details?.Mobile);
      setDriverName(details?.DriverName);
      setDateOfBirth(details?.DateOfBirth);
      setDateOfIssue(details?.DateOfIssue);
      setValidUpto(details?.ValidUpto);
      setVov(details?.Vov);
      setPht(details?.Pht);
      setPhoto(details?.Photo);

      alert("Successfully fetched!!");
    } else {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const dl_number = claim?.driverDetails?.LicenseNumber;
      const dob = claim?.driverDetails?.DateOfBirth;

      if (dl_number === "") {
        toast.error("Record Not found for empty License Number");
      }
      if (dob === "") {
        toast.error("Record Not found for empty Date Of Birth");
      }
       else {
        setFinalDisable(true);
        setEditCase_02(false);
        toast.loading("Fetching the driver details!!");
        axios
          .get("/api/getOnlineDriverData", {
            headers: {
              Authorization: `Bearer ${userInfo[0]?.Token}`,
              "Content-Type": "application/json",
            },
            params: {
              dl_number: dl_number,
              leadId: claim?.claimDetails?.LeadID,
              dob : claim?.driverDetails?.DateOfBirth
            },
          })
          .then(() => {
            toast.dismiss();
            toast.success("Successfully fetched!!");

            window.location.reload();
          })
          .catch((err) => {
            toast.dismiss();
            console.log("drivererrorr",err,err.response.data)
            toast.error("Record Not Found or Issue from server Side.");
          });
        setFinalDisable(false);
      }
    }
  };
  const [isUpdateVehicleLoading, setisUpdateVehicleLoading] = useState(false);

  const closeFunction = () => {
    setEditCase_02(false);
    setisUpdateVehicleLoading(false);
  };

  const setDate = (newDate, settingFunc) => {
    const dateObj = new Date(newDate);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    settingFunc(formattedDate);
  };

  return (
    <>
      <div className="faq_according row mt-2">
        {/* <h4 className="mb-3">Vehicle Details</h4> */}
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Driver Details</h4>
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body bgc-f6">
                <div className="row">
                  <div className="col-lg-9">
                    {editCase_02 ? (
                      <>
                        <div className="row">
                          <div className="col-lg-2">
                            <button
                              className="btn-thm m-1"
                              style={{}}
                              onClick={() => {
                                setisUpdateVehicleLoading(true);
                                onSaveHandler(3, closeFunction, closeFunction);
                              }}
                              disabled={!editCase_02 || finalDisable}
                            >
                              Save
                            </button>{" "}
                            {
                              <button
                                className="btn-thm flaticon-close"
                                style={{ fontSize: "14px" }}
                                onClick={() => setEditCase_02(false)}
                              ></button>
                            }
                          </div>
                          <div
                            className="col-lg-1"
                            style={{ marginLeft: "-20px" }}
                          >
                            <button
                              className="btn-thm m-1 flaticon-transfer"
                              style={{}}
                              disabled={!editCase_02}
                              onClick={handleFetchData}
                            ></button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-thm"
                          style={{}}
                          onClick={() => setEditCase_02(true)}
                        >
                          <span
                            className="flaticon-edit"
                            style={{ fontSize: "14px" }}
                          ></span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {isUpdateVehicleLoading ? (
                  <Loader />
                ) : editCase_02 ? (
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
                            Name
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            onChange={(e) => setDriverName(e.target.value)}
                            value={
                              DriverName && DriverName !== "null"
                                ? DriverName
                                : ""
                            }
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
                            Father Name
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            onChange={(e) => setFatherName(e.target.value)}
                            value={FatherName}
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
                            License Type <span class="req-btn">*</span>
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              LicenseType && LicenseType !== "null"
                                ? LicenseType
                                : ""
                            }
                            onChange={(e) => setLicenseType(e.target.value)}
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
                            Driving Lic. No.
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            onChange={(e) => setLicenseNumber(e.target.value)}
                            value={
                              LicenseNumber && LicenseNumber !== "null"
                                ? LicenseNumber
                                : ""
                            }
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
                            Gender
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            onChange={(e) => setGender(e.target.value)}
                            value={Gender}
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
                            Blood Group
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            onChange={(e) => setBloodGroup(e.target.value)}
                            value={BloodGroup}
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
                            Issuing Authority
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            onChange={(e) => setIssuingAuthority(e.target.value)}
                            value={IssuingAuthority}
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
                            Address
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            onChange={(e) => setAddress(e.target.value)}
                            value={Address}
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
                            Date of Birth
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            dateFormat="dd/MM/yyyy"
                            selected={
                              DateOfBirth !== null &&
                              !isNaN(new Date(DateOfBirth))
                                ? new Date(DateOfBirth)
                                : ""
                            }
                            onChange={(date) => setDate(date, setDateOfBirth)}
                          />
                        </div>
                      </div>
                    </div>
{/* 
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
                            RTO Name
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            onChange={(e) => setRtoName(e.target.value)}
                            value={RtoName}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div> */}

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
                            Issue Date
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            dateFormat="dd/MM/yyyy"
                            selected={
                              DateOfIssue !== null &&
                              !isNaN(new Date(DateOfIssue))
                                ? new Date(DateOfIssue)
                                : ""
                            }
                            onChange={(date) => setDate(date, setDateOfIssue)}
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
                            Valid Upto
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            dateFormat="dd/MM/yyyy"
                            selected={
                              ValidUpto !== null && !isNaN(new Date(ValidUpto))
                                ? new Date(ValidUpto)
                                : ""
                            }
                            onChange={(date) => setDate(date, setValidUpto)}
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
                            Type of Verification
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <select
                            type="text"
                            className="form-control form-control-add-claim"
                            id="propertyTitle"
                            value={
                              Verification
                                ? Number(Verification)
                                : Number(
                                    claim?.driverDetails?.TypeOfVerification
                                  )
                            }
                            onChange={(e) => setVerification(e.target.value)}

                            // placeholder="Enter Registration No.
                          >
                            <option value={0}>Verified By Online</option>
                            <option value={1}>Verified Manually</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <DriverDetailsViewForm
                      claim={claim}
                      FatherName={FatherName}
                      setFatherName={setFatherName}
                      Gender={Gender}
                      setGender={setGender}
                      BloodGroup={BloodGroup}
                      setLicenseTypeLinceBloodGroup={setBloodGroup}
                      setAddress={setAddress}
                      Address={Address}
                      setRtoName={setRtoName}
                      RtoName={RtoName}
                      Mobile={Mobile}
                      setMobile={setMobile}
                      ValidUpto={ValidUpto}
                      setValidUpto={setValidUpto}
                      Vov={Vov}
                      setVov={setVov}
                      setPht={setPht}
                      Pht={Pht}
                      Photo={Photo}
                      setPhoto={setPhoto}
                      DLStatus={DLStatus}
                      setIsDriverDetailsFetched={setIsDriverDetailsFetched}
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

export default DriverDetailsEditForm;
