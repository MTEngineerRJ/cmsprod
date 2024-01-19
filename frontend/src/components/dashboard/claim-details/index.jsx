import Header from "../../common/header/dashboard/Header";
import { useEffect, useState } from "react";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import ChatboxContent from "./ChatboxContent";
// import CreateList from "./CreateList";
import Form from "./Form";
import Form_01 from "./Form_01";
import Form_02 from "./Form_02";
import toast from "react-hot-toast";
import axios from "axios";
import StatusLog from "./StatusLog";
import Exemple from "./Exemple";
import UploadReort from "./UploadReport";
import PaymentDetails from "./PaymentDetails";
import GarageDetails from "./GarageDetails";
import CreateList from "./CreateList";
import CreateList_01 from "./CreateList_01";
import Video from "./Video";
import EstimateList from "./EstimateList";
import CreateList_02 from "./CreateList_02";
import CreateList_03 from "./CreateList_03";
import CreateList_04 from "./CreateList_04";
// import FloorPlans from "./FloorPlans";
// import LocationField from "./LocationField";
// import PropertyMediaUploader from "./PropertyMediaUploader";

const Index = ({}) => {
  const url = window.location.href;
  const leadId = url.split("/claim-details?leadId=")[1];
  const [claim, setClaim] = useState({});
  const [InsuredName, setInsuredName] = useState(
    claim?.InsuredName ? claim?.InsuredName : ""
  );
  const [InsuredMailAddress, setInsuredMailAddress] = useState(
    claim?.InsuredMailAddress ? claim?.InsuredMailAddress : ""
  );
  const [InsuredMobileNo1, setInsuredMobileNo1] = useState(
    claim?.InsuredMobileNo1 ? claim?.InsuredMobileNo1 : ""
  );
  const [InsuredMobileNo2, setInsuredMobileNo2] = useState(
    claim?.InsuredMobileNo2 ? claim?.InsuredMobileNo2 : ""
  );
  const [subType, setSubType] = useState("Motor");
  const [requestType, setRequestType] = useState("Spot");

  const [ClaimNumber, setClaimNumber] = useState(
    claim?.ClaimNumber ? claim?.ClaimNumber : ""
  );

  const [VehicleModel, setVehicleModel] = useState(
    claim.VehicleMakeVariantModelColor
      ? `${claim.VehicleMakeVariantModelColor},${claim.VehicleTypeOfBody}`
      : ""
  );

  const [EngineType, setEngineType] = useState(
    claim?.VehicleModeOfCheck ? claim?.VehicleModeOfCheck : ""
  );
  const [RegisteredOwner, setRegisteredOwner] = useState(
    claim?.VehicleRegisteredOwner ? claim?.VehicleRegisteredOwner : ""
  );
  const [DateRegistration, setDateRegistration] = useState(
    claim?.VehicleDateOfRegistration ? claim?.VehicleDateOfRegistration : ""
  );
  const [PUCNumber, setPUCNumber] = useState(
    claim?.VehiclePucNumber ? claim?.VehiclePucNumber : ""
  );
  const [TransferDate, setTransferDate] = useState(
    claim?.VehicleTransferDate ? claim?.VehicleTransferDate : ""
  );
  const [EngineNumber, setEngineNumber] = useState(
    claim?.VehicleEngineNumber ? claim?.VehicleEngineNumber : ""
  );
  const [AddedBy, setAddedBy] = useState(
    claim?.VehicleAddedBy ? claim?.VehicleAddedBy : ""
  );
  const [IssuingAuthority, setIssuingAuthority] = useState(
    claim?.IssuingAuthority ? claim?.IssuingAuthority : ""
  );
  const [LicenseNumber, setLicenseNumber] = useState(
    claim?.LicenseNumber ? claim?.LicenseNumber : ""
  );
  const [LicenseType, setLicenseType] = useState(
    claim?.LicenseType ? claim?.LicenseType : ""
  );
  const [VehicleChassisNumber, setVehicleChassisNumber] = useState(
    claim?.VehicleChassisNumber ? claim?.VehicleChassisNumber : ""
  );
  const [VehicleFuelType, setVehicleFuelType] = useState(
    claim?.VehicleFuelType ? claim?.VehicleFuelType : ""
  );

  const [DriverName, setDriverName] = useState(
    claim?.DriverName ? claim?.DriverName : ""
  );
  const [DriverAddedDate, setDriverAddedDate] = useState(
    claim?.DriverAddedDate ? claim?.DriverAddedDate : ""
  );
  const [Verification, setVerification] = useState(
    claim?.DriverTypeOfVerification ? claim?.DriverTypeOfVerification : ""
  );

  const [GarageNameAndAddress, setGarageNameAndAddress] = useState(
    claim?.GarageNameAndAddress ? claim?.GarageNameAndAddress : ""
  );
  const [GarageContactNo1, setGarageContactNo1] = useState(
    claim?.GarageContactNo1 ? claim?.GarageContactNo1 : ""
  );
  const [GarageContactNo2, setGarageContactNo2] = useState(
    claim?.GarageContactNo2 ? claim?.GarageContactNo2 : ""
  );
  const [GarageAddedBy, setGarageAddedBy] = useState(
    claim?.GarageAddedBy ? claim?.GarageAddedBy : ""
  );

  const [editCase, setEditCase] = useState(false);
  const [editVechile, setEditVehichle] = useState(false);
  const [edit, setEdit] = useState(false);

  const generateRegion = (region) => {
    const firstThreeLetters = region?.slice(0, 3);

    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const result = `${firstThreeLetters}/${mm}/${dd}${hh}${min}${ss}`;

    console.log(result);
    return result;
  };

  const [RegisteredNumber, setRegisteredNumber] = useState(
    claim?.VehicleRegisteredNumber ? claim?.VehicleRegisteredNumber : ""
  );

  const onSaveHandler = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const vehicleParts = VehicleModel?.split(",");

    const payload = {
      InsuredName: InsuredName ? InsuredName : claim.InsuredName,
      InsuredMailAddress: InsuredMailAddress
        ? InsuredMailAddress
        : claim.InsuredMailAddress,
      InsuredMobileNo1: InsuredMobileNo1
        ? InsuredMobileNo1
        : claim.InsuredMobileNo1,
      InsuredMobileNo2: InsuredMobileNo2
        ? InsuredMobileNo2
        : claim.InsuredMobileNo2,
      ClaimNumber: ClaimNumber ? ClaimNumber : claim.ClaimNumber,
      VehicleMakeVariantModelColor: vehicleParts[0]
        ? vehicleParts[0]
        : claim.VehicleMakeVariantModelColor,
      VehicleTypeOfBody: vehicleParts[1]
        ? vehicleParts[1]
        : claim.VehicleTypeOfBody,
      VehicleRegisteredNumber: RegisteredNumber
        ? RegisteredNumber
        : generateRegion(claim?.ClaimRegion),
      VehicleDateOfRegistration: DateRegistration
        ? DateRegistration
        : claim.VehicleDateOfRegistration,
      VehiclePucNumber: PUCNumber ? PUCNumber : claim.VehiclePucNumber,
      VehicleTransferDate: TransferDate
        ? TransferDate
        : claim.VehicleTransferDate,
      VehicleEngineNumber: EngineNumber
        ? EngineNumber
        : claim.VehicleEngineNumber,
      VehicleAddedBy: AddedBy ? AddedBy : claim.VehicleAddedBy,
      IssuingAuthority: IssuingAuthority
        ? IssuingAuthority
        : claim.IssuingAuthority,
      LicenseNumber: LicenseNumber ? LicenseNumber : claim.LicenseNumber,
      LicenseType: LicenseType ? LicenseType : claim.LicenseType,
      VehicleChassisNumber: VehicleChassisNumber
        ? VehicleChassisNumber
        : claim.VehicleChassisNumber,
      VehicleFuelType: VehicleFuelType
        ? VehicleFuelType
        : claim.VehicleFuelType,
      DriverName: DriverName ? DriverName : claim.DriverName,
      DriverAddedDate: DriverAddedDate
        ? DriverAddedDate
        : claim.DriverAddedDate,
      DriverTypeOfVerification: Verification
        ? Verification
        : claim.DriverTypeOfVerification,
      GarageNameAndAddress: GarageNameAndAddress
        ? GarageNameAndAddress
        : claim.GarageNameAndAddress,
      GarageAddedBy: GarageAddedBy ? GarageAddedBy : claim.GarageAddedBy,
      GarageContactNo1: GarageContactNo1
        ? GarageContactNo1
        : claim.GarageContactNo1,
      GarageContactNo2: GarageContactNo2
        ? GarageContactNo2
        : claim.GarageContactNo2,
      LeadId: claim.LeadId,
      token: userInfo[0].Token,
    };
    console.log(payload);
    if (
      !payload.InsuredName ||
      !payload.InsuredMailAddress ||
      !payload.InsuredMobileNo1 ||
      !payload.InsuredMobileNo2 ||
      !payload.ClaimNumber ||
      !payload.VehicleMakeVariantModelColor ||
      !payload.VehicleTypeOfBody ||
      !payload.VehicleRegisteredNumber ||
      !payload.VehicleDateOfRegistration ||
      !payload.VehiclePucNumber ||
      !payload.VehicleTransferDate ||
      !payload.VehicleEngineNumber ||
      !payload.VehicleAddedBy ||
      !payload.IssuingAuthority ||
      !payload.LicenseNumber ||
      !payload.LicenseType ||
      !payload.VehicleChassisNumber ||
      !payload.VehicleFuelType ||
      !payload.DriverAddedDate ||
      !payload.DriverName ||
      !payload.DriverTypeOfVerification ||
      !payload.GarageAddedBy ||
      !payload.GarageNameAndAddress ||
      !payload.GarageContactNo1 ||
      !payload.GarageContactNo2
    ) {
      alert("Please fill all the details before submitting!!");
    } else {
      axios
        .put("/api/updateClaimDetails", payload, {
          headers: {
            Authorization: `Bearer ${userInfo[0].Token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          alert("Successfully Updated the Information !!");
        })
        .catch((err) => {
          console.log(err);
          alert("Caught into Error ! Try Again.");
        });
      setEditCase((prop) => !prop);
      // window.location.reload();
    }
  };

  const editHandler = (value) => {
    if (value === 1) {
      setEditCase((prop) => !prop);
    } else if (value === 2) {
      setEditVehichle((prop) => !prop);
    }
  };

  const subTypeTypes = [
    { id: 1, type: "Motor", value: "Motor" },
    { id: 1, type: "Non-Motor", value: "Non-Motor" },
    { id: 1, type: "Motor-2W", value: "Motor-2W" },
    { id: 1, type: "Motor-4W", value: "Motor-4W" },
  ];

  const requestTypeTypes = [
    { id: 1, type: "SPOT", value: "SPOT" },
    { id: 1, type: "Final", value: "Final" },
    { id: 1, type: "re-inspection", value: "re-inspection" },
  ];

  const [isStatusModal, setIsStatusModal] = useState(false);

  const handleStatusUpdateHandler = () => {};

  const closeStatusUpdateHandler = () => {
    setIsStatusModal(false);
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .get("/api/getSpecificClaim", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: leadId,
        },
      })
      .then((res) => {
        console.log(res.data.data[0][0]);
        setClaim(res.data.data[0][0]);
      })
      .catch((err) => {
        toast.error(err);
      });

    axios
      .get("/api/getDocumentList", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          leadId: leadId,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [leadId]);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section
        className="our-dashbord dashbord bgc-f7 pb50"
        style={{ marginRight: "-10px" }}
      >
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                {/* <div className="col-lg-12 mb-2">
                  <div className="style2">
                    <button className="btn btn-color" onClick={editHandler}>
                      {edit ? "Save" : "Edit"}
                    </button>
                  </div>
                </div> */}
                {/* End .col */}

                <div className="row">
                  <div className="col-lg-9">
                    <div className="">
                      <div className="my_dashboard_review mb-2">
                        <div className="col-lg-12">
                          <div className="row">
                            <h4 className="">
                              CASE DETAILS
                              {editCase ? (
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
                                  onClick={() => editHandler(1)}
                                >
                                  <span
                                    className="flaticon-edit"
                                    style={{ fontSize: "14px" }}
                                  ></span>
                                </button>
                              )}
                            </h4>
                          </div>
                        </div>
                        <div
                          className=" bg-dark"
                          style={{
                            width: "100%",
                            height: "3px",
                            color: "blue",
                            border: "1px solid",
                            marginBottom: "5px",
                          }}
                        ></div>
                        {!editCase ? (
                          <div className="col-lg-12">
                            <CreateList_01
                              claim={claim}
                              InsuredName={InsuredName}
                              RegisteredNumber={RegisteredNumber}
                              subType={subType}
                              InsuredMobileNo1={InsuredMobileNo1}
                              ClaimNumber={ClaimNumber}
                              InsuredMailAddress={InsuredMailAddress}
                              requestType={requestType}
                            />
                          </div>
                        ) : (
                          <CreateList
                            claim={claim}
                            InsuredName={InsuredName}
                            setInsuredName={setInsuredName}
                            InsuredMailAddress={InsuredMailAddress}
                            setInsuredMailAddress={setInsuredMailAddress}
                            InsuredMobileNo1={InsuredMobileNo1}
                            setInsuredMobileNo1={setInsuredMobileNo1}
                            InsuredMobileNo2={InsuredMobileNo2}
                            setInsuredMobileNo2={setInsuredMobileNo2}
                            requestTypeTypes={requestTypeTypes}
                            subTypeTypes={subTypeTypes}
                            setRequestType={setRequestType}
                            requestType={requestType}
                            setSubType={setSubType}
                            subType={subType}
                            ClaimNumber={ClaimNumber}
                            setClaimNumber={setClaimNumber}
                            edit={editCase}
                            setIsStatusModal={setIsStatusModal}
                          />
                        )}
                      </div>
                      <div
                        className="row mt-2 mb-2"
                        style={{ marginLeft: "-15px" }}
                      >
                        <div className="col-lg-12">
                          <Video />
                        </div>
                      </div>
                      <div
                        className="row mt-2 mb-2"
                        style={{ marginLeft: "-15px" }}
                      >
                        <div className="col-lg-12">
                          {/* <h4 className="mb10">Case Details</h4> */}

                          {/* <div
                          className=" bg-dark"
                          style={{
                            width: "100%",
                            height: "3px",
                            color: "blue",
                            border: "1px solid",
                            marginBottom: "5px",
                          }}
                        ></div> */}
                          <Form
                            claim={claim}
                            edit={editCase}
                            editHandler={editHandler}
                            VehicleModel={VehicleModel}
                            setVehicleModel={setVehicleModel}
                            RegisteredNumber={RegisteredNumber}
                            setRegisteredNumber={setRegisteredNumber}
                            setEngineType={setEngineType}
                            EngineType={EngineType}
                            RegisteredOwner={RegisteredOwner}
                            setRegisteredOwner={setRegisteredOwner}
                            DateRegistration={DateRegistration}
                            setDateRegistration={setDateRegistration}
                            PUCNumber={PUCNumber}
                            setPUCNumber={setPUCNumber}
                            TransferDate={TransferDate}
                            setTransferDate={setTransferDate}
                            EngineNumber={EngineNumber}
                            setEngineNumber={setEngineNumber}
                            AddedBy={AddedBy}
                            setAddedBy={setAddedBy}
                            IssuingAuthority={IssuingAuthority}
                            setIssuingAuthority={setIssuingAuthority}
                            LicenseNumber={LicenseNumber}
                            setLicenseNumber={setLicenseNumber}
                            LicenseType={LicenseType}
                            setLicenseType={setLicenseType}
                            VehicleChassisNumber={VehicleChassisNumber}
                            setVehicleChassisNumber={setVehicleChassisNumber}
                            VehicleFuelType={VehicleFuelType}
                            setVehicleFuelType={setVehicleFuelType}
                          />
                        </div>
                      </div>
                      <div className="row mt-2" style={{ marginLeft: "-15px" }}>
                        <div className="col-lg-12">
                          {/* <h4 className="mb10">Case Details</h4> */}

                          {/* <div
                          className=" bg-dark"
                          style={{
                            width: "100%",
                            height: "3px",
                            color: "blue",
                            border: "1px solid",
                            mar`ginBottom: "5px",
                          }}
                        ></div> */}
                          <Form_01
                            claim={claim}
                            edit={edit}
                            DriverName={DriverName}
                            setDriverName={setDriverName}
                            DriverAddedDate={DriverAddedDate}
                            setDriverAddedDate={setDriverAddedDate}
                            Verification={Verification}
                            setVerification={setVerification}
                          />
                        </div>
                      </div>

                      <div className="row mb-2" style={{ marginLeft: "-15px" }}>
                        {/* {editCase && */}
                        <div className="col-lg-12">
                          {/* <h4 className="mb10">Case Details</h4> */}

                          {/* <div
                          className=" bg-dark"
                          style={{
                            width: "100%",
                            height: "3px",
                            color: "blue",
                            border: "1px solid",
                            marginBottom: "5px",
                          }}
                        ></div> */}
                          <Form_02
                            claim={claim}
                            edit={edit}
                            GarageNameAndAddress={GarageNameAndAddress}
                            setGarageNameAndAddress={setGarageNameAndAddress}
                            GarageContactNo1={GarageContactNo1}
                            setGarageContactNo1={setGarageContactNo1}
                            GarageContactNo2={GarageContactNo2}
                            setGarageContactNo2={setGarageContactNo2}
                            GarageAddedBy={GarageAddedBy}
                            setGarageAddedBy={setGarageAddedBy}
                          />
                        </div>
                      </div>

                      <div className="row mb-2" style={{ marginLeft: "-15px" }}>
                        <div className="col-lg-12">
                          <EstimateList />
                        </div>
                      </div>

                      <div className="row mb-2" style={{ marginLeft: "-15px" }}>
                        <div className="col-lg-12 text-center">
                          {/* <ErrorPageContent /> */}
                          <Exemple />
                        </div>
                      </div>
                      <div className="row mb-2" style={{ marginLeft: "-15px" }}>
                        <div className="col-lg-12 text-center">
                          {/* <ErrorPageContent /> */}
                          <UploadReort />
                        </div>
                      </div>
                      <div className="row mb-2" style={{ marginLeft: "-15px" }}>
                        <div className="col-lg-12 text-center">
                          {/* <ErrorPageContent /> */}
                          <PaymentDetails />
                        </div>
                      </div>
                      <div className="row mb-2" style={{ marginLeft: "-15px" }}>
                        <div className="col-lg-12 text-center">
                          {/* <ErrorPageContent /> */}
                          <GarageDetails />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="">
                      <div className="row" style={{ marginLeft: "0px" }}>
                        <div className="row mb-2 my_dashboard_review">
                          <div className="col-lg-12">
                            <h4 className="mb10">Status Log</h4>
                          </div>
                          <div
                            className=" bg-dark"
                            style={{
                              width: "100%",
                              height: "3px",
                              color: "blue",
                              border: "1px solid",
                              marginBottom: "5px",
                            }}
                          ></div>
                          <StatusLog />
                          {/* <CreateList /> */}
                        </div>
                        {/* <hr /> */}
                        <div className="row mt-2 mb-2 my_dashboard_review">
                          <div className="col-lg-12">
                            <h4 className="mb10">Comment Log</h4>
                          </div>
                          <div
                            className=" bg-dark"
                            style={{
                              width: "100%",
                              height: "3px",
                              color: "blue",
                              border: "1px solid",
                              marginBottom: "5px",
                            }}
                          ></div>
                          <ChatboxContent />
                        </div>
                        {/* <hr /> */}
                        <div className="row mt-2 my_dashboard_review">
                          <div className="col-lg-12">
                            <h4 className="mb10">Previous Year Policy</h4>
                          </div>
                          <div
                            className=" bg-dark"
                            style={{
                              width: "100%",
                              height: "3px",
                              color: "blue",
                              border: "1px solid",
                              marginBottom: "5px",
                            }}
                          ></div>
                        </div>

                        {isStatusModal && (
                          <div className="modal">
                            <div className="modal-content">
                              <h3 className="text-center">
                                Broker Status Update
                              </h3>
                              <hr />
                              <div className="d-flex justify-content-center">
                                <select
                                  className="form-select"
                                  data-live-search="true"
                                  data-width="100%"
                                  // value={buildinRef}
                                  // onChange={(e) => setBuildinRef(e.target.value)}
                                  // onChange={(e) => setBuildinRef(e.target.value)}
                                  // disabled={isDisable}
                                  style={{
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    backgroundColor: "#E8F0FE",
                                    width: "300px",
                                  }}
                                >
                                  {/* {BrokerStatus.map((item, index) => {
                          return (
                            <option key={item.id} value={item.value}>
                              {item.type}
                            </option>
                          );
                        })} */}
                                </select>
                              </div>
                              <hr />
                              {/* <p>Are you sure you want to delete the property: {property.area}?</p> */}
                              <div className="text-center" style={{}}>
                                <button
                                  className="btn w-25 btn-color"
                                  onClick={closeStatusUpdateHandler}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-color w-25"
                                  style={{ marginLeft: "12px" }}
                                  onClick={handleStatusUpdateHandler}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row mt200">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    {/* <p>© 2020 Find House. Made with love.</p> */}
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
