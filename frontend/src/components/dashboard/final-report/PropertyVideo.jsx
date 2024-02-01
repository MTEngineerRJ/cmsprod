import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios'
import ModalVideo from "react-modal-video";
import PolicyDetails from "./PolicyDetails";
import Servey from "./Survey";
import Exemple from "./Exemple";
import Exemple_01 from "./Exemple_01";
import Summary from "./Summary";
import Table from "./Table";
import EditableTable from "./Editable";

const materials = [
  { qty: "12", desc: "12", price: "12" },
  { qty: "", desc: "", price: "" },
  { qty: "", desc: "", price: "" },
  { qty: "", desc: "", price: "" },
  { qty: "", desc: "", price: "" },
  { qty: "", desc: "", price: "" },
  { qty: "", desc: "", price: "" },
  { qty: "", desc: "", price: "" },
];

const PropertyVideo = ({ SomeComponent ,leadId}) => {
  const [isOpen, setOpen] = useState(false);

  const [policyType,setPolicyType]=useState("Regular");
  const [includeDepreciation,setIncludeDepreciation]=useState(true);

  const [claim, setClaim] = useState([]);
  const [applicantNumber, setApplicantNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
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
        // console.log(res.data.data);
        setClaim(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const [subType, setSubType] = useState("Motor");

  const [ReferenceNo, setReferenceNo] = useState("");
  const [InsuredMailAddress, setInsuredMailAddress] = useState("");
  const [requestType, setRequestType] = useState("Spot");
  const [ClaimNumber, setClaimNumber] = useState("");
  const [EngineType, setEngineType] = useState("");
  const [DateRegistration, setDateRegistration] = useState("");
  const [PUCNumber, setPUCNumber] = useState("");
  const [TransferDate, setTransferDate] = useState("");
  const [AddedBy, setAddedBy] = useState("");
  const [Verification, setVerification] = useState("");
  const [GarageNameAndAddress, setGarageNameAndAddress] = useState("");
  const [GarageContactNo1, setGarageContactNo1] = useState("");
  const [GarageContactNo2, setGarageContactNo2] = useState("");
  const [GarageAddedBy, setGarageAddedBy] = useState("");
  const [ClaimAddedDateTime, setClaimAddedDateTime] = useState("");
  const [ClaimIsActive, setClaimIsActive] = useState("");
  const [PolicyIssuingOffice, setPolicyIssuingOffice] = useState("");

  //Policy Details
  const [PolicyNumber, setPolicyNumber] = useState("");
  const [InsuranceCompanyNameAddress, setInsuranceCompanyNameAddress] =
    useState("");
  const [InsuredAddress, setInsuredAddress] = useState("");
  const [InsuredName, setInsuredName] = useState("");
  const [InsuredMobileNo1, setInsuredMobileNo1] = useState("");
  const [InsuredMobileNo2, setInsuredMobileNo2] = useState("");
  const [ClaimRegion, setClaimRegion] = useState("");
  //Drivers Details
  const [DriverName, setDriverName] = useState("");
  const [DriverAddedDate, setDriverAddedDate] = useState("");
  const [IssuingAuthority, setIssuingAuthority] = useState("");
  const [LicenseNumber, setLicenseNumber] = useState("");
  const [LicenseType, setLicenseType] = useState("");
  const [BadgeNumber, setBadgeNumber] = useState("");
  //Vehicle Details
  const [VehicleRegisteredNumber, setVehicleRegisteredNumber] = useState("");
  const [RegisteredOwner, setRegisteredOwner] = useState("");
  const [VehicleChassisNumber, setVehicleChassisNumber] = useState("");
  const [EngineNumber, setEngineNumber] = useState("");
  const [VehicleTypeOfBody, setVehicleTypeOfBody] = useState("");
  const [VehicleCubicCapacity, setVehicleCubicCapacity] = useState("");
  const [VehicleClassOfVehicle, setVehicleClassOfVehicle] = useState("");
  const [VehicleFuelType, setVehicleFuelType] = useState("");
  const [VehicleOdometerReading, setVehicleOdometerReading] = useState("");
  const [VehiclePreAccidentCondition, setVehiclePreAccidentCondition] =
    useState("");
  const [VehicleModel, setVehicleModel] = useState("");
  const [VehicleTaxParticulars, setVehicleTaxParticulars] = useState("");
  const [VehicleSeatingCapacity, setVehicleSeatingCapacity] = useState();
  // const [PolicyType, setPolicyType] = useState();

  useEffect(() => {
    setInsuredMailAddress(claim?.InsuredMailAddress || "");
    setInsuredMobileNo1(claim?.InsuredMobileNo1 || "");
    setInsuredMobileNo2(claim?.InsuredMobileNo2 || "");
    setClaimNumber(claim?.ClaimNumber || "");
    setEngineType(claim?.VehicleModeOfCheck || "");
    setDateRegistration(claim?.VehicleDateOfRegistration || "");
    setTransferDate(claim?.VehicleTransferDate || "");
    setAddedBy(claim?.VehicleAddedBy || "");
    setVerification(claim?.DriverTypeOfVerification || "");
    setGarageNameAndAddress(claim?.GarageNameAndAddress || "");
    setGarageContactNo1(claim?.GarageContactNo1 || "");
    setGarageContactNo2(claim?.GarageContactNo2 || "");
    setGarageAddedBy(claim?.GarageAddedBy || "");
    setClaimAddedDateTime(claim?.ClaimAddedDateTime || "");
    setClaimIsActive(claim?.ClaimIsActive?.type || "");
    // Policy Detail
    setReferenceNo(claim?.claimDetails?.ReferenceNo || "");
    setPolicyNumber(claim?.claimDetails?.PolicyNumber || "");
    setPolicyIssuingOffice(claim?.claimDetails?.PolicyIssuingOffice || "");
    setInsuranceCompanyNameAddress(
      claim?.claimDetails?.InsuranceCompanyNameAddress
    );
    setClaimRegion(claim?.claimDetails?.ClaimRegion || "");
    setInsuredName(claim?.insuredDetails?.InsuredName || "");
    setInsuredAddress(claim?.insuredDetails?.InsuredAddress || "");
    setPolicyType(claim?.insuredDetails?.PolicyType || "");
    console.log("reference no", VehicleSeatingCapacity);

    //Drivers Details
    setDriverName(claim?.driverDetails?.DriverName || "");
    setDriverAddedDate(claim?.driverDetails?.DriverAddedDate || "");
    setIssuingAuthority(claim?.driverDetails?.IssuingAuthority || "");
    setLicenseNumber(claim?.driverDetails?.LicenseNumber || "");
    setLicenseType(claim?.driverDetails?.LicenseType || "");
    setBadgeNumber(claim?.driverDetails?.BadgeNumber || "");

    //Vehicle Detais
    setVehicleRegisteredNumber(
      claim?.vehicleDetails?.VehicleRegisteredNumber || ""
    );
    setRegisteredOwner(claim?.vehicleDetails?.VehicleRegisteredOwner || "");
    setVehicleChassisNumber(claim?.vehicleDetails?.VehicleChassisNumber || "");
    setEngineNumber(claim?.vehicleDetails?.VehicleEngineNumber || "");
    setVehicleModel(
      claim?.VehicleMakeVariantModelColor
        ? `${claim.VehicleMakeVariantModelColor}`
        : ""
    );
    setVehicleTypeOfBody(claim?.vehicleDetails?.VehicleTypeOfBody || "");
    setVehicleCubicCapacity(claim?.vehicleDetails?.VehicleCubicCapacity);
    setVehicleClassOfVehicle(claim?.vehicleDetails?.VehicleClassOfVehicle);
    setVehicleFuelType(claim?.vehicleDetails?.VehicleFuelType || "");
    setVehicleOdometerReading(
      claim?.vehicleDetails?.VehicleOdometerReading || ""
    );
    setVehiclePreAccidentCondition(
      claim?.vehicleDetails?.VehiclePreAccidentCondition || ""
    );
    setVehicleTaxParticulars(
      claim?.vehicleDetails?.VehicleTaxParticulars || ""
    );
    setPUCNumber(claim?.vehicleDetails?.VehiclePucNumber || "");
    setVehicleSeatingCapacity(
      claim?.vehicleDetails?.VehicleSeatingCapacity || 0
    );
  }, [claim]);

  useEffect(()=>{

    if(String(policyType) === "Add on Policy"){
      setIncludeDepreciation(false);
    }
    else{
      setIncludeDepreciation(true);
    }
  },[policyType])
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="oqNZOOWF8qM"
        onClose={() => setOpen(false)}
        allow="picture-in-picture"
      />
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#descriptions"
            role="tab"
          >
            Policy & Vehicle
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link "
            data-bs-toggle="tab"
            href="#description"
            role="tab"
          >
            Survey
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link "
            data-bs-toggle="tab"
            href="#newparts"
            role="tab"
          >
            New Parts
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#labour"
            role="tab"
          >
            Labour
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#summary"
            role="tab"
          >
            Summary & Notes
          </a>
        </li>
      </ul>
      {/* End .nav-tabs */}

      <div className="tab-content" id="myTabContent2">
        <div
          className="tab-pane fade show active"
          id="descriptions"
          role="tabpanel"
        >
          <div className="property_video">
            <div className="thumb">
              <PolicyDetails 
              setPolicyType={setPolicyType} 
              policyType={policyType}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              applicantNumber={applicantNumber}
              setApplicantNumber={setApplicantNumber}

              ReferenceNo={ReferenceNo}
              setReferenceNo={setReferenceNo}
              InsuredMailAddress={InsuredMailAddress}
              setInsuredMailAddress={setInsuredMailAddress}
              requestType={requestType}
              setRequestType={setRequestType}
              ClaimNumber={ClaimNumber}
              EngineType={EngineType}
              setEngineType={setEngineType}
              DateRegistration={DateRegistration}
              setDateRegistration={setDateRegistration}
              PUCNumber={PUCNumber}
              setPUCNumber={setPUCNumber}
              TransferDate={TransferDate}
              setTransferDate={setTransferDate}
              AddedBy={AddedBy}
              setAddedBy={setAddedBy}
              Verification={Verification}
              setVerification={setVerification}

              GarageNameAndAddress={GarageNameAndAddress}
              setGarageNameAndAddress={setGarageNameAndAddress}
              GarageContactNo={GarageContactNo1}
              setGarageContactNo1={setGarageContactNo1}
              GarageContactNo2={GarageContactNo2}
              setGarageContactNo2={setGarageContactNo2}
              GarageAddedBy={GarageAddedBy}
              setGarageAddedBy={setGarageAddedBy}

              ClaimAddedDateTime={ClaimAddedDateTime}
              setClaimAddedDateTime={setClaimAddedDateTime}
              ClaimIsActive={ClaimIsActive}
              setClaimIsActive={setClaimIsActive}
              PolicyIssuingOffice={PolicyIssuingOffice}
              setPolicyIssuingOffice={setPolicyIssuingOffice}

              PolicyNumber={PolicyNumber}
              setPolicyNumber={setPolicyNumber}
              InsuranceCompanyNameAddress={InsuranceCompanyNameAddress}
              setInsuranceCompanyNameAddress={setInsuranceCompanyNameAddress}
              InsuredAddress={InsuredAddress}
              setInsuredAddress={setInsuredAddress}
              InsuredName={InsuredName}
              setInsuredName={setInsuredName}
              InsuredMobileNo1={InsuredMobileNo1}
              setInsuredMobileNo1={setInsuredMobileNo1}
              InsuredMobileNo2={InsuredMobileNo2}
              setInsuredMobileNo2={setInsuredMobileNo2}
              ClaimRegion={ClaimRegion}
              setClaimRegion={setClaimRegion}

              DriverName={DriverName}
              setDriverName={setDriverName}
              DriverAddedDate={DriverAddedDate}
              setDriverAddedDate={setDriverAddedDate}
              IssuingAuthority={IssuingAuthority}
              setIssuingAuthority={setIssuingAuthority}
              LicenseNumber={LicenseNumber}
              setLicenseNumber={setLicenseNumber}
              LicenseType={LicenseType}
              setLicenseType={setLicenseType}
              BadgeNumber={BadgeNumber}

              VehicleRegisteredNumber={VehicleRegisteredNumber}
              setVehicleRegisteredNumber={setVehicleRegisteredNumber}
              RegisteredOwner={RegisteredOwner}
              setRegisteredOwner={setRegisteredOwner}
              VehicleChassisNumber={VehicleChassisNumber}
              setVehicleChassisNumber={setVehicleChassisNumber}
              EngineNumber={EngineNumber}
              setEngineNumber={setEngineNumber}
              VehicleTypeOfBody={VehicleTypeOfBody}
              setVehicleTypeOfBody={setVehicleTypeOfBody}
              VehicleCubicCapacity={VehicleCubicCapacity}
              setVehicleCubicCapacity={setVehicleCubicCapacity}
              VehicleClassOfVehicle={VehicleClassOfVehicle}
              setVehicleClassOfVehicle={setVehicleClassOfVehicle}
              VehicleFuelType={VehicleFuelType}
              setVehicleFuelType={setVehicleFuelType}
              VehicleOdometerReading={VehicleOdometerReading}
              setVehicleOdometerReading={setVehicleOdometerReading}
              VehiclePreAccidentCondition={VehiclePreAccidentCondition}
              setVehiclePreAccidentCondition={setVehiclePreAccidentCondition}

              VehicleModel={VehicleModel}
              setVehicleModel={setVehicleModel}
              VehicleTaxParticulars={VehicleTaxParticulars}
              setVehicleTaxParticulars={setVehicleTaxParticulars}
              VehicleSeatingCapacity={VehicleSeatingCapacity}
              setVehicleSeatingCapacity={setVehicleSeatingCapacity}
 />
              {/* <Image
                width={692}
                height={390}
                className="pro_img  w100 w-100 cover"
                src="/assets/images/background/7.jpg"
                alt="7.jpg"
              />
              <div className="overlay_icon">
                <div
                  onClick={() => setOpen(true)}
                  role="button"
                  className="video_popup_btn red popup-youtube"
                >
                  <span className="flaticon-play"></span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="tab-pane fade show " id="description" role="tabpanel">
          <div className="property_video">
            <div className="thumb">
              <Servey SomeComponent={SomeComponent} 
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              applicantNumber={applicantNumber}
              setApplicantNumber={setApplicantNumber}

              ReferenceNo={ReferenceNo}
              setReferenceNo={setReferenceNo}
              InsuredMailAddress={InsuredMailAddress}
              setInsuredMailAddress={setInsuredMailAddress}
              requestType={requestType}
              setRequestType={setRequestType}
              ClaimNumber={ClaimNumber}
              EngineType={EngineType}
              setEngineType={setEngineType}
              DateRegistration={DateRegistration}
              setDateRegistration={setDateRegistration}
              PUCNumber={PUCNumber}
              setPUCNumber={setPUCNumber}
              TransferDate={TransferDate}
              setTransferDate={setTransferDate}
              AddedBy={AddedBy}
              setAddedBy={setAddedBy}
              Verification={Verification}
              setVerification={setVerification}

              GarageNameAndAddress={GarageNameAndAddress}
              setGarageNameAndAddress={setGarageNameAndAddress}
              GarageContactNo={GarageContactNo1}
              setGarageContactNo1={setGarageContactNo1}
              GarageContactNo2={GarageContactNo2}
              setGarageContactNo2={setGarageContactNo2}
              GarageAddedBy={GarageAddedBy}
              setGarageAddedBy={setGarageAddedBy}

              ClaimAddedDateTime={ClaimAddedDateTime}
              setClaimAddedDateTime={setClaimAddedDateTime}
              ClaimIsActive={ClaimIsActive}
              setClaimIsActive={setClaimIsActive}
              PolicyIssuingOffice={PolicyIssuingOffice}
              setPolicyIssuingOffice={setPolicyIssuingOffice}

              PolicyNumber={PolicyNumber}
              setPolicyNumber={setPolicyNumber}
              InsuranceCompanyNameAddress={InsuranceCompanyNameAddress}
              setInsuranceCompanyNameAddress={setInsuranceCompanyNameAddress}
              InsuredAddress={InsuredAddress}
              setInsuredAddress={setInsuredAddress}
              InsuredName={InsuredName}
              setInsuredName={setInsuredName}
              InsuredMobileNo1={InsuredMobileNo1}
              setInsuredMobileNo1={setInsuredMobileNo1}
              InsuredMobileNo2={InsuredMobileNo2}
              setInsuredMobileNo2={setInsuredMobileNo2}
              ClaimRegion={ClaimRegion}
              setClaimRegion={setClaimRegion}

              DriverName={DriverName}
              setDriverName={setDriverName}
              DriverAddedDate={DriverAddedDate}
              setDriverAddedDate={setDriverAddedDate}
              IssuingAuthority={IssuingAuthority}
              setIssuingAuthority={setIssuingAuthority}
              LicenseNumber={LicenseNumber}
              setLicenseNumber={setLicenseNumber}
              LicenseType={LicenseType}
              setLicenseType={setLicenseType}
              BadgeNumber={BadgeNumber}

              VehicleRegisteredNumber={VehicleRegisteredNumber}
              setVehicleRegisteredNumber={setVehicleRegisteredNumber}
              RegisteredOwner={RegisteredOwner}
              setRegisteredOwner={setRegisteredOwner}
              VehicleChassisNumber={VehicleChassisNumber}
              setVehicleChassisNumber={setVehicleChassisNumber}
              EngineNumber={EngineNumber}
              setEngineNumber={setEngineNumber}
              VehicleTypeOfBody={VehicleTypeOfBody}
              setVehicleTypeOfBody={setVehicleTypeOfBody}
              VehicleCubicCapacity={VehicleCubicCapacity}
              setVehicleCubicCapacity={setVehicleCubicCapacity}
              VehicleClassOfVehicle={VehicleClassOfVehicle}
              setVehicleClassOfVehicle={setVehicleClassOfVehicle}
              VehicleFuelType={VehicleFuelType}
              setVehicleFuelType={setVehicleFuelType}
              VehicleOdometerReading={VehicleOdometerReading}
              setVehicleOdometerReading={setVehicleOdometerReading}
              VehiclePreAccidentCondition={VehiclePreAccidentCondition}
              setVehiclePreAccidentCondition={setVehiclePreAccidentCondition}

              VehicleModel={VehicleModel}
              setVehicleModel={setVehicleModel}
              VehicleTaxParticulars={VehicleTaxParticulars}
              setVehicleTaxParticulars={setVehicleTaxParticulars}
              VehicleSeatingCapacity={VehicleSeatingCapacity}
              setVehicleSeatingCapacity={setVehicleSeatingCapacity}

              />
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
          id="newparts"
          role="tabpanel"
        >
          <div className="property_video">
            <div className="thumb">
              {/* <EditableTable /> */}
              {/* <Table data={materials} /> */}
              <Exemple 
              claim={claim}
              policyType={policyType} 
              includeDepreciation={includeDepreciation}
              ClaimAddedDateTime={ClaimAddedDateTime}
              PolicyStartDate={claim.claimDetails?.PolicyPeriodStart}
              VehicleAddedDate = {claim.vehicleDetails?.VehicleDateOfRegistration}
              />
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
          id="labour"
          role="tabpanel"
        >
          <div className="property_video">
            <div className="thumb">
              <Exemple_01 />
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
          id="summary"
          role="tabpanel"
        >
          <div className="property_video">
            <div className="thumb">
              <Summary />
            </div>
          </div>
        </div>
        {/* <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
          id="table"
          role="tabpanel"
        >
          <div className="property_video">
            <div className="thumb">
              <Table data={materials} />
            </div>
          </div>
        </div> */}
      </div>
      {/* End .tab-conten */}
    </>
  );
};

export default PropertyVideo;
