import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import {
  formatDate,
  getNextYear,
  setDate,
  handleInputChange,
  handleInputChange_01,
  openStatusUpdateHandler,
} from "./functions/ClaimSectionFunctions";

const insurerRegionMapping = {
  "United India Insurance Company Limited": [
    "Delhi",
    "Chandigarh",
    "Jaipur",
    "Jodhpur",
    "Hero",
    "Preinspection",
    "Spot",
  ],
  "National Insurance Company Limited": [
    "Bhopal",
    "Lucknow",
    "Dehradun",
    "Ludhiana",
    "Ahmedabad",
    "Vadodara",
    "Jaipur",
    "Preinspection",
    "Spot",
  ],
  "The New India Assurance Company Limited": [
    "Bhopal",
    "Lucknow",
    "Dehradun",
    "Ludhiana",
    "Ahmedabad",
    "Vadodara",
    "Jaipur",
    "Preinspection",
    "Spot",
  ],
};

const ClaimDetailsEditForm = ({
  claim,
  disable,
  finalDisable,
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
  allListedRegions,
  edit,
  setIsStatusModal,
  setBrokerMailAddress,
  setGarageMailAddress,
  BrokerMailAddress,
  GarageMailAddress,
}) => {
  const [allServicingOffice, setAllServicingOffice] = useState([]);

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [phoneNumber_01, setPhoneNumber_01] = useState(null);

  const filteredRegions = useMemo(() => {
    // If no insurance company is selected, return all regions
    if (!insuranceCompanyNameAddress) return allListedRegions;

    // Find the regions for the selected insurance company
    const companyRegions = insurerRegionMapping[insuranceCompanyNameAddress];

    if (companyRegions) {
      // First, filter the regions based on the company-specific list
      const filteredByCompany = allListedRegions?.filter((region) =>
        companyRegions.includes(region.Region)
      );

      return filteredByCompany;
    }

    // If insurer is not in the mapping, return only Preinspection and Spot regions
    const defaultRegions = allListedRegions?.filter(
      (region) => region.Region === "Preinspection" || region.Region === "Spot"
    );

    return defaultRegions;
  }, [insuranceCompanyNameAddress, allListedRegions]);

  // Ensure the current claim region is valid after filtering
  useEffect(() => {
    if (filteredRegions && filteredRegions.length > 0) {
      // If current claim region is not in the filtered list, set to the first available region
      const isCurrentRegionValid = filteredRegions.some(
        (region) => region.Region === claimRegion
      );

      if (!isCurrentRegionValid) {
        setClaimRegion(filteredRegions[0].Region);
      }
    }
  }, [filteredRegions, claimRegion, setClaimRegion]);

  useEffect(() => {
    setPolicyEndDate(getNextYear(policyStartDate));
  }, [policyStartDate]);

  useEffect(() => {
    axios
      .get("/api/getClaimServicingOffice")
      .then((res) => {
        setAllServicingOffice(res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (policyStartDate && !isNaN(new Date(policyStartDate).getTime())) {
      const oneYearLater = new Date(policyStartDate);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      oneYearLater.setDate(oneYearLater.getDate() - 1);

      const formattedOneYearLater = oneYearLater.toLocaleDateString("en-US");
      const dateObj = new Date(formattedOneYearLater);
      const yyyy = dateObj.getFullYear();
      const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
      const dd = String(dateObj.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}-${mm}-${dd}`;
      console.log("formattedDate", formattedDate);
      setPolicyEndDate(formattedDate);
    }
  }, [policyStartDate]);

  const sendMailHandler = (vehicleNo, PolicyNo, Insured, mailAddress) => {
    if (
      !mailAddress ||
      mailAddress === "null" ||
      mailAddress === "None" ||
      mailAddress === "undeifned"
    ) {
      toast.error("Please fill the email !!!");
    } else {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const payload = {
        vehicleNo:
          vehicleNo === "undefined" ||
          vehicleNo === "null" ||
          vehicleNo === undefined ||
          !vehicleNo
            ? "N.A."
            : vehicleNo,
        PolicyNo:
          PolicyNo === "undefined" ||
          PolicyNo === "null" ||
          PolicyNo === undefined ||
          !PolicyNo
            ? "N.A."
            : PolicyNo,
        Insured: Insured,
        toMail: mailAddress,
        leadId: claim?.claimDetails?.LeadID,
        BrokerMailAddress: claim?.claimDetails?.BrokerMailAddress,
        GarageMailAddress: claim?.garageDetails?.GarageMailAddress,
        Region: claim?.claimDetails?.Region,
        type: 4,
        date: formatDate(new Date()),
        Username: userInfo[0].Username,
      };

      toast.loading("Sending Acknowledgment Mail!!");
      axios
        .post("/api/acklowdmentEmail", payload, {
          headers: {
            Authorization: `Bearer ${userInfo[0].Token}`,
          },
        })
        .then((res) => {
          toast.dismiss();
          toast.success("Successfully sent the mail!");
          window.location.reload();
        })
        .catch((err) => {
          toast.dismiss();
          toast.error(err);
        });
    }
  };

  // const sendMessageHandler = (PolicyNo, Insured, phoneNumber) => {
  //   console.log("phoneNumber: ", phoneNumber);
  //   if (
  //     !phoneNumber ||
  //     phoneNumber === "null" ||
  //     phoneNumber === "None" ||
  //     phoneNumber === "undeifned"
  //   ) {
  //     toast.error("Please fill the number !!!");
  //   } else {
  //     const url = `https://cmsprod.vercel.app/claim-details?leadId=${claim?.claimDetails?.LeadID}`;
  //     console.log("url: ", url);
  //     const text = `Dear ${Insured} Deputed for motor claim survey of Policy No. ${PolicyNo} Please visit ${url} From MT Engineer`;

  //     const payload = {
  //       username: "mt engineer",
  //       apikey: "N4pHWt1mmIbX",
  //       senderid: "MTENG",
  //       route: "Trans",
  //       mobile: phoneNumber,
  //       text: text,
  //       TID: "1307173200339592814",
  //       PEID: "1301172992987166851",
  //     };

  //     toast.loading("Sending Acknowledgment Message!!");
  //     console.log("payload: ", payload);
  //     axios
  //       .get("https://vapio.in/api.php", { params: payload })
  //       .then((res) => {
  //         console.log("done");
  //         console.log("res: ", res);
  //         toast.dismiss();
  //         toast.success("Successfully sent the Message");
  //         // window.location.reload();
  //       })
  //       .catch((err) => {
  //         console.log("errer", err);
  //         toast.dismiss();
  //         toast.error(err);
  //       });
  //   }
  // };

  const sendMessageHandler = (PolicyNo, Insured, phoneNumber) => {
    console.log("phoneNumber: ", phoneNumber);

    if (
      !phoneNumber ||
      phoneNumber === "null" ||
      phoneNumber === "None" ||
      phoneNumber === "undefined"
    ) {
      toast.error("Please fill the number !!!");
      return;
    }

    const claimLeadId = "12345"; // Replace with `claim?.claimDetails?.LeadID` if available
    const url = `https://cmsprod.vercel.app/claim-details?leadId=${claimLeadId}`;
    console.log("url: ", url);

    const text = `Dear ${Insured} Deputed for motor claim survey of Policy No. ${PolicyNo} Please visit ${url} From MT Engineer`;

    const payload = {
      username: "mt engineer",
      apikey: "N4pHWt1mmIbX",
      senderid: "MTEINV",
      route: "Trans",
      mobile: phoneNumber,
      text: text,
      TID: "1307173200339592814",
      PEID: "1301172992987166851",
    };

    toast.loading("Sending Acknowledgment Message!!");
    console.log("payload: ", payload);

    axios
      .get("/api/sendMessage", { params: payload }) // Use the proxy API route
      .then((res) => {
        console.log("Message sent successfully:", res);
        toast.dismiss();
        toast.success("Successfully sent the Message");
        // Optional: Reload the page if needed
        // window.location.reload();
      })
      .catch((err) => {
        console.error("Error sending message:", err);
        toast.dismiss();
        toast.error("Failed to send the message. Please try again.");
      });
  };
  useEffect(() => {
    setPolicyEndDate(claim?.claimDetails?.PolicyPeriodEnd);
  }, []);

  return (
    <>
      <Toaster />
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
                Phone
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="propertyTitle"
                value={InsuredMobileNo1}
                onChange={(e) => handleInputChange(e, setInsuredMobileNo1)}
                disabled={!edit}
                // placeholder="Enter Registration No."
              />
            </div>
            <div className="col-lg-1" style={{ marginLeft: "-20px" }}>
              {claim?.insuredDetails?.InsuredMailAddress !== "null" && (
                <button
                  className="btn btn-color-icon p-0 flaticon-envelope"
                  title="Send Message"
                  style={{ width: "100%" }}
                  onClick={() =>
                    sendMessageHandler(
                      claim?.claimDetails?.PolicyNumber,
                      claim?.insuredDetails?.InsuredName,
                      claim.insuredDetails?.InsuredMobileNo1
                    )
                  }
                >
                  {/* Send Email */}
                </button>
              )}
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
                value={InsuredMobileNo2}
                onChange={(e) => handleInputChange_01(e, setInsuredMobileNo2)}
                disabled={!edit}
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
                Email
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="email"
                className="form-control"
                id="propertyTitle"
                value={InsuredMailAddress ? InsuredMailAddress : ""}
                onChange={(e) => setInsuredMailAddress(e.target.value)}
                disabled={!edit}
                // placeholder="Enter Registration No."
              />
            </div>
            <div className="col-lg-1" style={{ marginLeft: "-20px" }}>
              {!claim.claimDetails?.IsMailSent &&
                claim?.insuredDetails?.InsuredMailAddress !== "null" && (
                  <button
                    className="btn btn-color-icon p-0 flaticon-envelope"
                    title="Send Mail"
                    style={{ width: "100%" }}
                    onClick={() =>
                      sendMailHandler(
                        claim?.vehichleDetails?.RegisteredNumber,
                        claim?.claimDetails?.PolicyNumber,
                        claim?.insuredDetails?.InsuredName,
                        claim.insuredDetails?.InsuredMailAddress
                      )
                    }
                  >
                    {/* Send Email */}
                  </button>
                )}
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
                Garage Mail Id
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="email"
                className="form-control"
                id="GarageMailAddress"
                value={GarageMailAddress}
                onChange={(e) => setGarageMailAddress(e.target.value)}
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
                Broker Mail Id
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="email"
                className="form-control"
                id="propertyTitle"
                value={BrokerMailAddress}
                onChange={(e) => setBrokerMailAddress(e.target.value)}
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
                Policy Issuing Office
              </label>
            </div>
            <div className="col-lg-7">
              <select
                type="text"
                className="form-control form-control-add-claim"
                id="propertyTitle"
                value={policyIssuingOffice}
                onChange={(e) => setPolicyIssuingOffice(e.target.value)}
              >
                {allServicingOffice.map((office, index) => {
                  return (
                    <option key={index} style={{ padding: "4px" }}>
                      {office.OfficeNameWithCode}
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
                {!String(requestType)
                  .toLowerCase()
                  .includes("re-inspection") ? (
                  requestTypeTypes.map((sub, index) => {
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
                  })
                ) : (
                  <option
                    key={"re-Inspection"}
                    style={{
                      // paddingTop: "15px",
                      color: "#1560bd",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                    value={"re-Inspection"}
                  >
                    Re-Inspection
                  </option>
                )}
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
                  color: "#1560bd",
                  fontSize: "14px",
                }}
              >
                Claim Region
              </label>
            </div>
            <div className="col-lg-7">
              <select
                type="text"
                className="form-control form-control-add-claim"
                id="propertyTitle"
                value={claimRegion}
                onChange={(e) => setClaimRegion(e.target.value)}
              >
                {filteredRegions?.map((region, index) => {
                  return (
                    <option key={index} value={region.Region}>
                      {region.Region}
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
                Claim Servicing Office
              </label>
            </div>
            <div className="col-lg-7">
              <select
                type="text"
                className="form-control form-control-add-claim"
                id="propertyTitle"
                value={claimServicingOffice}
                onChange={(e) => setClaimServicingOffice(e.target.value)}
                // placeholder="Enter Registration No."
              >
                {allServicingOffice?.map((office, index) => {
                  return (
                    <option key={index}>{office.OfficeNameWithCode}</option>
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
              <DatePicker
                className="form-control"
                id="propertyTitle"
                dateFormat="dd/MM/yyyy"
                selected={
                  policyStartDate !== null && !isNaN(new Date(policyStartDate))
                    ? new Date(policyStartDate)
                    : ""
                }
                onChange={(date) => {
                  setDate(date, setPolicyStartDate);
                }}
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
                Policy End Date
              </label>
            </div>
            <div className="col-lg-7">
              <DatePicker
                className="form-control"
                id="propertyTitle"
                dateFormat="dd/MM/yyyy"
                selected={
                  policyEndDate !== null && !isNaN(new Date(policyEndDate))
                    ? new Date(policyEndDate)
                    : ""
                }
                onChange={(date) => {
                  setDate(date, setPolicyEndDate);
                }}
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
                readOnly
                // placeholder="Enter Registration No."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimDetailsEditForm;
