import axios from "axios";
import toast from "react-hot-toast";
import MyDatePicker from "../../common/MyDatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
const CreateList = ({
  claim,
  InsuredName,
  setInsuredName,
  InsuredMailAddress,
  setInsuredMailAddress,
  InsuredMobileNo1,
  setInsuredMobileNo1,
  InsuredMobileNo2,
  setInsuredMobileNo2,
  requestTypeTypes,
  setRequestType,
  requestType,
  setSubType,
  subType,
  subTypeTypes,
  policyIssuingOffice,
  setPolicyIssuingOffice,
  claimRegion,
  setClaimRegion,
  claimServicingOffice,
  setClaimServicingOffice,
  policyStartDate,
  setPolicyStartDate,
  policyEndDate,
  setPolicyEndDate,
  insuranceCompanyNameAddress,
  setInsuranceCompanyNameAddress,
  insuredAddedBy,
  setInsuredAddedBy,
  edit,
  setIsStatusModal,
}) => {
  console.log(
    InsuredName,
    InsuredMobileNo1,
    InsuredMailAddress,
    insuranceCompanyNameAddress
  );
  const formatDate = (val) => {
    const date = new Date(val);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };
  

  console.log("policyStartDate", policyStartDate);

  const statusOptions = [
    {
      id: 1,
      value: "Claim Appointment",
    },
    {
      id: 2,
      value: "Estimate Approval Pending",
    },
    {
      id: 3,
      value: "Vehicle Under repair",
    },
    {
      id: 4,
      value: "Invoice Approval Pending",
    },
    {
      id: 5,
      value: "Surveyor Report Pending",
    },
    {
      id: 6,
      value: "Hard Copies Pending",
    },
    {
      id: 7,
      value: "Soft Copy Completed",
    },
    {
      id: 8,
      value: "Payment Pending",
    },
    {
      id: 9,
      value: "Settled Cases",
    },
    {
      id: 10,
      value: "Withdrawl/Rejected",
    },
    {
      id: 11,
      value: "More Info Required",
    },
    {
      id: 12,
      value: "My Claims",
    },
  ];

  console.log("policyEndDate", policyEndDate);
  useEffect(() => {
    // Update policyStartEnd when policyStartDate changes
    if (
      policyEndDate == "null" ||
      policyEndDate == null ||
      policyEndDate == ""
    ) {
      if (policyStartDate && !isNaN(new Date(policyStartDate).getTime())) {
        const oneYearLater = new Date(policyStartDate);
        oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
        oneYearLater.setDate(oneYearLater.getDate() - 1);

        const formattedOneYearLater = oneYearLater.toLocaleDateString("en-US");
        console.log("policyStartDate", policyStartDate);
        console.log("formattedOneYearLater", formattedOneYearLater);

        setPolicyEndDate(formattedOneYearLater);
      }
    }
  }, [policyStartDate]);

  const getNextYear = () => {
    if (policyStartDate && !isNaN(new Date(policyStartDate).getTime())) {
      const oneYearLater = new Date(policyStartDate);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      oneYearLater.setMonth(oneYearLater.getMonth());
      oneYearLater.setDate(oneYearLater.getDate() - 1);

      const formattedOneYearLater = oneYearLater.toISOString().split("T")[0];
      return formattedOneYearLater;
    }
    return "";
  };

  const checkStatus = (val) => {
    let status = "";
    statusOptions.map((stat, index) => {
      if (String(stat.id) === String(val)) status = stat.value;
    });
    return status;
  };

  const sendMailHandler = (vehicleNo, PolicyNo, Insured, mailAddress) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const payload = {
      vehicleNo: vehicleNo,
      PolicyNo: PolicyNo,
      Insured: Insured,
      toMail: mailAddress,
      leadId: claim?.claimDetails?.LeadID,
      date: formatDate(new Date()),
    };

    toast.loading("Sending Acknowledgment Mail!!");
    axios
      .post("/api/sendEmail1", payload, {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
        },
      })
      .then((res) => {
        toast.dismiss();
        alert("Successfully sent the mail!");
        window.location.reload();
      })
      .catch((err) => {
        toast.dismiss();
        alert(err);
      });
  };
  const openStatusUpdateHandler = () => {
    setIsStatusModal(true);
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
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
                value={InsuredName}
                onChange={(e) => setInsuredName(e.target.value)}
                disabled={!edit}
                // placeholder="Enter Registration No."
              />
              {/* <button
                href="#"
                className="btn btn-color w-50"
                style={{ marginLeft: "12px" }}
                onClick={() => openStatusUpdateHandler}
                title="Update Status"
              >
                <Link href="#">
                  <span className="flaticon-edit text-light"></span>
                </Link>
              </button>*/}
            </div>
          </div>
          {/* <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input type="text" className="form-control" id="propertyTitle" />
        </div> */}
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Phone
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={InsuredMobileNo1}
                onChange={(e) => setInsuredMobileNo1(e.target.value)}
                disabled={!edit}
                // placeholder="Enter Registration No."
              />

              {/* <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={InsuredMobileNo2}
                onChange={(e) => setInsuredMobileNo2(e.target.value)}
                disabled={!edit}
                // placeholder="Enter Registration No."
              /> */}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Phone - 2
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={InsuredMobileNo1}
                onChange={(e) => setInsuredMobileNo1(e.target.value)}
                disabled={!edit}
                // placeholder="Enter Registration No."
              />

              {/* <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={InsuredMobileNo2}
                onChange={(e) => setInsuredMobileNo2(e.target.value)}
                disabled={!edit}
                // placeholder="Enter Registration No."
              /> */}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Email
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={InsuredMailAddress ? InsuredMailAddress : ""}
                onChange={(e) => setInsuredMailAddress(e.target.value)}
                disabled={!edit}
                // placeholder="Enter Registration No."
              />
              {!claim.claimDetails?.IsMailSent  && claim?.insuredDetails?.InsuredMailAddress !== "null" && (
                  <button
                    onClick={() =>
                      sendMailHandler(
                        claim?.vehichleDetails?.VehicleEngineNumber,
                        claim?.claimDetails?.ReferenceNo,
                        claim?.insuredDetails?.InsuredName,
                        claim.insuredDetails?.InsuredMailAddress
                      )
                    }
                  >
                    sendEmail
                  </button>
                )}
            </div>
            {/* <div className="col-lg-1">
              {!InsuredMailAddress && (
                <button
                  title="Send Mails"
                  className="btn btn-color flaticon-envelope w60"
                  // style={{ marginTop: "-1px" }}
                  onClick={() =>
                    sendMailHandler(
                      claim.insuredDetails?.VehicleRegisteredNumber,
                      claim.insuredDetails?.PolicyNumber,
                      claim.insuredDetails?.InsuredName
                    )
                  }
                ></button>
              )}
            </div> */}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Policy Issuing Office
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={policyIssuingOffice}
                onChange={(e) => setPolicyIssuingOffice(e.target.value)}
                // placeholder="Enter Registration No."
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Claim Region
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={claimRegion}
                onChange={(e) => setClaimRegion(e.target.value)}

                // placeholder="Enter Registration No."
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Claim Servicing Office
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={claimServicingOffice}
                onChange={(e) => setClaimServicingOffice(e.target.value)}
                // placeholder="Enter Registration No."
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Survey Type
              </label>
            </div>
            <div className="col-lg-7">
              <select
                className="form-control p-1"
                disabled={!edit}
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
              >
                {subTypeTypes.map((sub, index) => {
                  return (
                    <option
                      key={sub.id}
                      style={{
                        // paddingTop: "15px",
                        color: "#1560bd",
                        fontSize: "14px",
                        // marginTop: "-13px",
                      }}
                      value={sub.value}
                    >
                      {sub.type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Policy Start Date
              </label>
            </div>
            <div className="col-lg-7">
              {/*<input
            // type="date"
              className="form-control"
              id="propertyTitle"
              value={formatDate(policyStartDate)}
              // onChange={(e)=>setPolicyStartDate(e.target.value)}
              // placeholder="Enter Registration No."
            />*/}

              <DatePicker
                className="form-control"
                id="propertyTitle"
                selected={
                  policyStartDate !== null && !isNaN(new Date(policyStartDate))
                    ? new Date(policyStartDate)
                    : null
                }
                onChange={(date) => setPolicyStartDate(date)}
              />
              {/* <MyDatePicker
                selectedDate={
                  policyStartDate && !isNaN(new Date(policyStartDate))
                    ? new Date(policyStartDate)
                    : ""
                }
                setSelectedDate={setPolicyStartDate}
              /> */}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Policy End Date
              </label>
            </div>
            <div className="col-lg-7">
              {/*<input
          // type="date"
            className="form-control"
            id="propertyTitle"
            value={formatDate(policyEndDate)}
            // onChange={(e)=>setPolicyEndDate(e.target.value)}
            // placeholder="Enter Registration No."
          />*/}
              {/* <input
                className="form-control"
                type="text"
                disable={true}
                value={getNextYear()}
              /> */}
              <DatePicker
                className="form-control"
                id="form"
                selected={
                  policyEndDate !== null && !isNaN(new Date(policyEndDate))
                    ? new Date(policyEndDate)
                    : null
                }
                onChange={(date) => setPolicyEndDate(date)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Insurance Company Name & Address
              </label>
            </div>
            <div className="col-lg-7">
              <input
                className="form-control"
                id="propertyTitle"
                value={insuranceCompanyNameAddress}
                onChange={(e) => setInsuranceCompanyNameAddress(e.target.value)}
                // placeholder="Enter Registration No."
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Insured Added By
              </label>
            </div>
            <div className="col-lg-7">
              <input
                className="form-control"
                id="propertyTitle"
                value={insuredAddedBy}
                onChange={(e) => setInsuredAddedBy(e.target.value)}
                // placeholder="Enter Registration No."
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Inspection Type
              </label>
            </div>
            <div className="col-lg-7">
              <select
                className="form-control p-1"
                disabled={!edit}
                value={!requestType ? "" : requestType}
                onChange={(e) => setRequestType(e.target.value)}
              >
                {requestTypeTypes.map((sub, index) => {
                  return (
                    <option
                      key={sub.id}
                      style={{
                        // paddingTop: "15px",
                        color: "#1560bd",
                        fontSize: "14px",
                        // marginTop: "-13px",
                      }}
                      value={sub.value}
                    >
                      {sub.type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mt-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  // paddingTop: "15px",
                  color: "#1560bd",
                  fontSize: "14px",
                  // marginTop: "-13px",
                }}
              >
                Endorsement Doc
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
      {/* <div className="col-lg-12">
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
                    fontSize:"14px",
                    // marginTop: "-13px",
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
                    fontSize:"14px",
                    // marginTop: "-13px",
                  }}
                >
                  Phone 
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
                    fontSize:"14px",
                    // marginTop: "-13px",
                  }}
                >
                  Email 
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
                    fontSize:"14px",
                    // marginTop: "-13px",
                  }}
                >
                  Registration No. 
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
                    fontSize:"14px",
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
                    fontSize:"14px",
                    // marginTop: "-13px",
                  }}
                >
                  Status 
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
                    fontSize:"14px",
                    // marginTop: "-13px",
                  }}
                >
                  Sub Status 
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
                    fontSize:"14px",
                    // marginTop: "-13px",
                  }}
                >
                  Intimation Date 
                </label>
              </div>
              <div className="col-lg-7">
                
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
                    fontSize:"14px",
                    // marginTop: "-13px",
                  }}
                >
                  Inspection Type 
                </label>
              </div>
              <div className="col-lg-7">
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={inspectionType}
                  onChange={(e)=>setInspectionType(e.target.value)}
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
                    fontSize:"14px",
                    // marginTop: "-13px",
                  }}
                >
                  Endorsement Doc 
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
      </div> */}
    </>
  );
};

export default CreateList;
