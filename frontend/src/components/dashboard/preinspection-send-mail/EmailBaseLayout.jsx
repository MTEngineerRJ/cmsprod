import React, { useEffect, useState } from "react";
import { data } from "./data";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { defaultContent, defaultSubjectContent } from "./EmailContent";
import {
  handleCheckboxChange,
  createStringFromSelectedItems,
  createStringFromSelectedItems2,
  handleSelectChange,
} from "./functions";
import { regionList } from "../../../utils/regionsList";
const EmailBaseLayout = ({
  leadId,
  email,
  policyNo,
  Insured,
  vehicleNo,
  Region,
  BrokerMailAddress,
  GarageMailAddress,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [emailAddress, setEmailAddress] = useState("");
  const [policyNos, setPolicyNo] = useState(policyNo ? policyNo : "");
  const [date, setDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("showDocument");
  const [fromEmail, setFromEmail] = useState("mt.chro123@gmail.com");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState(1);
  const [allRegions,setAllRegions] = useState(regionList);
  const router = useRouter();
  useEffect(() => {
    if (!leadId) {
      return () => {};
    }
    
  }, []);

  useEffect(() => {
    setSubject(defaultSubjectContent(type, vehicleNo, policyNo, Insured, date));

    let requiredString = "";

    if (
      email !== undefined &&
      email !== "None" &&
      email !== "undefined" &&
      email !== "null" &&
      email !== ""
    ) {
      requiredString += email + ",";
    }
    if (
      BrokerMailAddress !== undefined &&
      BrokerMailAddress !== "undefined" &&
      BrokerMailAddress !== "null" &&
      BrokerMailAddress !== ""
    ) {
      requiredString += BrokerMailAddress + ",";
    }
    if (
      GarageMailAddress !== undefined &&
      GarageMailAddress !== "undefined" &&
      GarageMailAddress !== "null" &&
      GarageMailAddress !== ""
    ) {
      requiredString += GarageMailAddress + ",";
    }

    setEmailAddress(requiredString);
  }, [type, email, BrokerMailAddress, GarageMailAddress]);

  useEffect(() => {

    let requiredEmail = '';
    allRegions.map((region,index)=>{
      console.log("region",region.Region,Region)
      if(String(region.Region).toLowerCase() ===
        String(Region).toLowerCase()){
          
          requiredEmail = region.MailAddress;
        }
    })
    setFromEmail(requiredEmail);
   
    
  }, [Region,allRegions]);

  useEffect(() => {
    const getData = () => {
      const newContent = defaultContent(
        type,
        vehicleNo,
        policyNo,
        Insured,
        new Date()
      );
      setBody(newContent);
    };

    getData();
  }, [type, policyNos, date, BrokerMailAddress, GarageMailAddress, email]);

  const handleSubmit = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const mainUrl = window.location.href;
    const leadUrl = mainUrl?.split("/send-mail/")[1];
    const requiredLeadId = leadUrl?.split("?")[0];
    const payload = {
      toMail: emailAddress ? emailAddress : email,
      PolicyNo: policyNos ? policyNos : policyNo,
      Date: date ? date : new Date(),
      vehicleNo: vehicleNo,
      Insured: Insured,
      content:
        selectedItems.length > 0
          ? createStringFromSelectedItems(selectedItems)
          : String(type) === "2" || String(type) === "3"
          ? "1) Images\n"
          : "",
      content2:
        selectedItems.length > 0
          ? createStringFromSelectedItems2(selectedItems)
          : String(type) === "2" || String(type) === "3"
          ? "Images,"
          : "",
      leadId: requiredLeadId,
      subject: subject,
      body: body,
      Region: Region ? Region : "Chandigarh",
      fromEmail: fromEmail,
    };

    if (
      !payload.toMail ||
      String(payload.toMail) === "None" ||
      payload.toMail === "undefined"
    ) {
      toast.error("Email is required field !!");
    } else if (!payload.fromEmail) {
      toast.error("Email is required field !!");
    } else if (!payload.PolicyNo) {
      toast.error("PolicyNo is required field !!");
    } else if (
      (!payload.content || !payload.content2) &&
      String(type) === "1"
    ) {
      toast.error("Please select the documents to be passed over email!");
    } else {
      toast.loading("Sending the customized email!!", {
        className: "toast-loading-message",
      });

      axios
        .post("/api/sendCustomEmail", payload, {
          headers: {
            Authorization: `Bearer ${userInfo[0].Token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.dismiss();
          toast.success("Successfully sent !", {
            className: "toast-loading-message",
          });
          router.push(`/claim-details?leadId=${requiredLeadId}`);
        })
        .catch((Err) => {
          toast.dismiss();
          toast.error("Got error while sending email!");
        });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-1 mt-1 mb-2">
          <label htmlFor="documentType" className="text-dark fw-bold">
            Mail Type:
          </label>
        </div>
        <div className="col-lg-3">
          <select
            id="documentType"
            value={type}
            onChange={(e) => handleSelectChange(e,setType)}
            className="form-select"
          >
            <option value={1}>Document Pending</option>
            <option value={2}>Status</option>
            <option value={3}>Work Approval</option>
          </select>
        </div>

        <div
          id="document-section"
          className="col-lg-12"
          style={{
            display: selectedOption === "showDocument" ? "block" : "none",
          }}
        >
          <div className="row">
            <div className="col-lg-6">
              <div className="row mt-3 mb-1">
                <div className="col-lg-4 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mt-1"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Type of Documents:
                  </label>
                </div>
                <div className="col-lg-8">
                  {data?.map((stat, index) => (
                    <div key={index} className="row">
                      <div className="col-lg-4">
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          data-tokens="Status1"
                          value={stat.serial_num}
                          onChange={(e) =>
                            handleCheckboxChange(
                              setSelectedItems,
                              stat.serial_num,
                              stat.doc_name,
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="col-lg-8">
                        <label htmlFor={`checkbox-${index}`}>
                          {stat.doc_name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4>Selected Items:</h4>
                <ul>
                  {selectedItems.map((item) => (
                    <li key={item.id}>{item.value}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-4 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mt-1"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      From :
                    </label>
                  </div>
                  <div className="col-lg-7">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="otherInput"
                      name="otherInput"
                      placeholder={email}
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-4 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mt-1"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      Policy No. :
                    </label>
                  </div>
                  <div className="col-lg-7">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="otherInput"
                      name="otherInput"
                      placeholder={policyNo}
                      value={policyNos}
                      onChange={(e) => setPolicyNo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-4 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mt-2"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      Date :
                    </label>
                  </div>
                  <div className="col-lg-7">
                    <input
                      required
                      type="date"
                      className="form-control"
                      id="otherInput"
                      name="otherInput"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row card">
                  <h4 className="col-12 text-center mt-1">Mail Box</h4>
                  <hr />
                  <div className="row">
                    <h5 className="">To:</h5>
                    <input
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                  </div>
                  <hr />
                  <div className="row">
                    <h5 className="">Subject :</h5>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <hr />
                  <div className="row" style={{ height: "200px" }}>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 text-end">
                <button className="btn btn-color w-10" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          id="input-section"
          className="col-lg-12"
          style={{ display: selectedOption === "showInput" ? "block" : "none" }}
        >
          <div className="row">
            <div className="col-lg-6">
              <div className="row mt-3 mb-1">
                <div className="col-lg-4 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mt-1"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Type of Documents:
                  </label>
                </div>
                <div className="col-lg-8">
                  {data?.map((stat, index) => (
                    <div key={index} className="row">
                      <div className="col-lg-4">
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          data-tokens="Status1"
                          value={stat.serial_num}
                          onChange={(e) =>
                            handleCheckboxChange(
                              stat.serial_num,
                              stat.doc_name,
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="col-lg-8">
                        <label htmlFor={`checkbox-${index}`}>
                          {stat.doc_name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4>Selected Items:</h4>
                <ul>
                  {selectedItems.map((item) => (
                    <li key={item.id}>{item.value}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="col-lg-12">
                <div className="row mt-3 mb-1">
                  <div className="col-lg-4 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mt-1"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      Email Address :
                    </label>
                  </div>
                  <div className="col-lg-7">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="otherInput"
                      name="otherInput"
                      placeholder={email}
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row mt-3 mb-1">
                  <div className="col-lg-4 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mt-1"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      Policy No. :
                    </label>
                  </div>
                  <div className="col-lg-7">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="otherInput"
                      name="otherInput"
                      placeholder={policyNo}
                      value={policyNos}
                      onChange={(e) => setPolicyNo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row mt-3 mb-1">
                  <div className="col-lg-4 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mt-2"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      Date :
                    </label>
                  </div>
                  <div className="col-lg-7">
                    <input
                      required
                      type="date"
                      className="form-control"
                      id="otherInput"
                      name="otherInput"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row card">
                  <h4 className="col-12 text-center mt-1">Mail Box</h4>
                  <hr />
                  <div className="row">
                    <h5 className="">To :</h5>
                    <input
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                    />
                  </div>
                  <hr />
                  <div className="row">
                    <h5 className="">Subject :</h5>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <hr />
                  <div className="row" style={{ height: "200px" }}>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 text-end">
                <button className="btn btn-color w-10" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          id="input-section"
          className="col-lg-12"
          style={{
            display: selectedOption === "showInput_01" ? "block" : "none",
          }}
        >
          <div className="row">
            <div className="col-lg-6">
              <div className="row mt-3 mb-1">
                <div className="col-lg-4 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mt-1"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Type of Documents:
                  </label>
                </div>
                <div className="col-lg-8">
                  {data?.map((stat, index) => (
                    <div key={index} className="row">
                      <div className="col-lg-4">
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          data-tokens="Status1"
                          value={stat.serial_num}
                          onChange={(e) =>
                            handleCheckboxChange(
                              stat.serial_num,
                              stat.doc_name,
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="col-lg-8">
                        <label htmlFor={`checkbox-${index}`}>
                          {stat.doc_name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4>Selected Items:</h4>
                <ul>
                  {selectedItems.map((item) => (
                    <li key={item.id}>{item.value}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="col-lg-12">
                <div className="row mt-3 mb-1">
                  <div className="col-lg-4 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mt-1"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      From :
                    </label>
                  </div>
                  <div className="col-lg-7">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="otherInput"
                      name="otherInput"
                      placeholder={email}
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row mt-3 mb-1">
                  <div className="col-lg-4 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mt-1"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      Policy No. :
                    </label>
                  </div>
                  <div className="col-lg-7">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="otherInput"
                      name="otherInput"
                      placeholder={policyNo}
                      value={policyNos}
                      onChange={(e) => setPolicyNo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row mt-3 mb-1">
                  <div className="col-lg-4 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mt-2"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      Date :
                    </label>
                  </div>
                  <div className="col-lg-7">
                    <input
                      required
                      type="date"
                      className="form-control"
                      id="otherInput"
                      name="otherInput"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row card">
                  <h4 className="col-12 text-center mt-1">Mail Box</h4>
                  <hr />
                  <div className="row">
                    <h5 className="">To :</h5>
                    <input
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                  </div>
                  <hr />
                  <div className="row">
                    <h5 className="">Subject :</h5>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <hr />
                  <div className="row" style={{ height: "200px" }}>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 text-end">
                <button className="btn btn-color w-10" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          id="input-section"
          className="col-lg-12"
          style={{
            display: selectedOption === "showInput_02" ? "block" : "none",
          }}
        ></div>
      </div>
    </>
  );
};

export default EmailBaseLayout;
