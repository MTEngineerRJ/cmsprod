import Header from "../../common/header/dashboard/Header_01";
import { useEffect, useState } from "react";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_PreInspection";
import MobileMenu from "../../common/header/MobileMenu";
import ChatboxContent from "./ChatboxContent";
import VehicleDetailsEditForm from "./VehicleDetailsEditForm";
import axios from "axios";
import StatusLog from "./StatusLog";
import ManualUploadTabularView from "./ManualUploadTabularView";
import ClaimDetailsEditForm from "./ClaimDetailsEditForm";
import Video from "./Video";
import ClaimDetailsViewForm from "./ClaimDetailsViewForm";
import { toast, Toaster } from "react-hot-toast";
import Loader from "../../common/Loader";
import { useRouter } from "next/router";
import {
  statusOptions,
  subStatus,
  subTypeTypes,
  requestTypeTypes,
} from "./DataHeaders";
import {
  removeMultipleSpaces,
  formatDateFinal,
  calculateTheUpdateType,
  convertAndFormatDate,
  validateEmail,
  editHandler,
  updateHandlerAfterFetching,
  closeStatusUpdateHandler,
} from "./functions/index";
import AccidentEditableForm from "./AccidentEditableForm";
import { regionList } from "../../../utils/regionsList";
import UploadReportDocumentView from "./UploadedReportDocumentView";

const Index = ({}) => {
  const url = window.location.href;
  const leadId = url.split("/preInspection-claim-details?leadId=")[1];
  const [claim, setClaim] = useState({});

  const [videosList, setVideosList] = useState([]);

  const [reload, setReload] = useState(false);

  const [policyIssuingOffice, setPolicyIssuingOffice] = useState("");

  const [claimRegion, setClaimRegion] = useState("");

  const [claimServicingOffice, setClaimServicingOffice] = useState("");

  const [policyStartDate, setPolicyStartDate] = useState("");
  const [policyEndDate, setPolicyEndDate] = useState("");
  const [insuranceCompanyNameAddress, setInsuranceCompanyNameAddress] =
    useState("");
  const [insuredAddedBy, setInsuredAddedBy] = useState("");

  const [finalDisable, setFinalDisable] = useState(false);
  const [disable, setDisable] = useState(false);

  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(
    Date.now()
  );

  useEffect(() => {
    const activityHandler = () => {
      setLastActivityTimestamp(Date.now());
    };
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);

    return () => {
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("click", activityHandler);
    };
  }, []);

  useEffect(() => {
    let userData = {};
    userData = JSON.parse(localStorage.getItem("userInfo"));
    if (!userData) {
      router.push("/login");
    }
    const inactivityCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTimestamp;
      if (timeSinceLastActivity > 1200000) {
        localStorage.removeItem("userInfo");
        router.push("/login");
      }
    }, 30000);
    return () => clearInterval(inactivityCheckInterval);
  }, [lastActivityTimestamp]);

  const [InsuredName, setInsuredName] = useState("");
  const [InsuredMailAddress, setInsuredMailAddress] = useState("");
  const [InsuredMobileNo1, setInsuredMobileNo1] = useState("");
  const [InsuredMobileNo2, setInsuredMobileNo2] = useState("");

  const [subType, setSubType] = useState("Motor");
  const [inspectionType, setInspectionType] = useState("Final");

  const [documents, setDocuments] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ClaimNumber, setClaimNumber] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [VehicleModel, setVehicleModel] = useState("");

  const [EngineType, setEngineType] = useState("");
  const [VehicleRegisteredOwner, setVehicleRegisteredOwner] = useState("");
  const [DateRegistration, setDateRegistration] = useState("");
  const [PUCNumber, setPUCNumber] = useState("");
  const [TransferDate, setTransferDate] = useState("");

  const [VehicleInsuranceUpto, setVehicleInsuranceUpto] = useState("");

  const [EngineNumber, setEngineNumber] = useState("");
  const [AddedBy, setAddedBy] = useState("");
  const [IssuingAuthority, setIssuingAuthority] = useState("");

  const [LicenseNumber, setLicenseNumber] = useState("");
  const [LicenseType, setLicenseType] = useState("");
  const [VehicleChassisNumber, setVehicleChassisNumber] = useState("");
  const [VehicleFuelType, setVehicleFuelType] = useState("");

  const [DriverName, setDriverName] = useState("");
  const [DriverAddedDate, setDriverAddedDate] = useState("");
  const [Verification, setVerification] = useState("verified By Online");

  const [status, setStatus] = useState("");

  const [GarageNameAndAddress, setGarageNameAndAddress] = useState("");
  const [GarageContactNo1, setGarageContactNo1] = useState("");
  const [GarageContactNo2, setGarageContactNo2] = useState("");
  const [GarageAddedBy, setGarageAddedBy] = useState("");

  const [editCase, setEditCase] = useState(false);
  const [editCase_01, setEditCase_01] = useState(false);
  const [editCase_02, setEditCase_02] = useState(false);
  const [editVechile, setEditVehichle] = useState(false);
  const [edit, setEdit] = useState(false);
  const [BrokerMailAddress, setBrokerMailAddress] = useState("");
  const [GarageMailAddress, setGarageMailAddress] = useState("");
  const [DLStatus, setDLStatus] = useState("");
  const getNextYear = () => {
    const oneYearLater = new Date(policyStartDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    oneYearLater.setMonth(oneYearLater.getMonth());
    oneYearLater.setDate(oneYearLater.getDate() - 1);

    return oneYearLater;
  };

  const getDateConversion = (date) => {
    const formattedOneYearLater = date?.split("T")[0];
    return formattedOneYearLater;
  };

  const [VehicleClassDescription, setVehicleClassDescription] = useState("");
  const [MakerDesc, setMakerDesc] = useState("");
  const [MakerModel, setMakerModel] = useState(
    claim?.vehicleOnlineDetails?.MakerModel
  );

  const [ManufactureMonthYear, setManufactureMonthYear] = useState("");
  const [VehicleGvw, setVehicleGvw] = useState("");
  const [CubicCapacity, setCubicCapacity] = useState(
    claim?.vehicleDetails?.VehicleCubicCapacity
  );
  const [allListedRegions, setAllListedRegions] = useState(regionList);

  const [BancsBodyType, setBancsBodyType] = useState("");
  const [BancsMakeCode, setBancsMakeCode] = useState("");
  const [BancsModelCode, setBancsModelCode] = useState("");
  const [BancsSubtypeCode, setBancsSubtypeCode] = useState("");
  const [BancsVehicleClass, setBancsVehicleClass] = useState("");
  const [BancsVehicleSegment, setBancsVehicleSegment] = useState("");
  const [FitUpto, setFitUpto] = useState("");
  const [PasiaModelCode, setPasiaModelCode] = useState("");
  const [VehiclePermanentAddress, setVehiclePermanentAddress] = useState("");
  const [RcRtoCode, setRcRtoCode] = useState("");
  const [VehicleInsuranceCompany, setVehicleInsuranceCompany] = useState("");
  const [VehicleSeatingCapacity, setVehicleSeatingCapacity] = useState("");
  const [RcInsuranceComp, setRcInsuranceComp] = useState("");
  const [RcInsuranceUpto, setRcInsuranceUpto] = useState("");
  const [RcVehicleType, setRcVehicleType] = useState("");
  const [VehicleRcStatus, setVehicleRcStatus] = useState("");
  const [VehicleBlackListStatus, setVehicleBlackListStatus] = useState("");
  const [VehicleRegistedAt, setVehicleRegistedAt] = useState("");
  const [PermanentAddress, setPermanentAddress] = useState("");
  const [ClassOfVehicle, setClassOfVehicle] = useState("");

  //driver fetch details
  const [FatherName, setFatherName] = useState("");
  const [Gender, setGender] = useState("");
  const [BloodGroup, setBloodGroup] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Address, setAddress] = useState("");
  const [RtoName, setRtoName] = useState("");
  const [ValidUpto, setValidUpto] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [DateOfIssue, setDateOfIssue] = useState("");
  const [Vov, setVov] = useState("");
  const [Pht, setPht] = useState("");
  const [Photo, setPhoto] = useState("");

  //accident details
  const [DateOfAccident, setDateOfAccident] = useState("");
  const [TimeOfAccident, setTimeOfAccident] = useState("");
  const [PlaceOfSurvey, setPlaceOfSurvey] = useState("");
  const [Pin, setPin] = useState("");
  const [PlaceOfLoss, setPlaceOfLoss] = useState("");

  const [IsRcDetailsFetched, setIsRcDetailsFetched] = useState(1);
  const [IsDriverDetailsFetched, setIsDriverDetailsFetched] = useState(1);

  const [reloadClaim, setReloadClaim] = useState(false);

  const [VehicleRegisteredNumber, setVehicleRegisteredNumber] = useState("");

  const [isStatusModal, setIsStatusModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const handleStatusUpdateHandler = () => {};

  const router = useRouter();

  const [isClaimLoading, setIsClaimLoading] = useState(false);

  useEffect(() => {
    setPolicyIssuingOffice(
      claim?.claimDetails?.PolicyIssuingOffice
        ? claim?.claimDetails?.PolicyIssuingOffice
        : policyIssuingOffice
    );
    setClaimRegion(
      claim?.claimDetails?.Region ? claim?.claimDetails?.Region : claimRegion
    );
    setClaimServicingOffice(
      claim?.claimDetails?.ClaimServicingOffice
        ? claim?.claimDetails?.ClaimServicingOffice
        : claimServicingOffice
    );

    setMobile(claim?.driverDetails?.Mobile ? claim?.driverDetails?.Mobile : "");
    setPolicyStartDate(
      claim?.claimDetails?.PolicyPeriodStart
        ? formatDateFinal(claim?.claimDetails?.PolicyPeriodStart)
        : policyStartDate
    );
    setPolicyEndDate(
      claim?.claimDetails?.PolicyPeriodEnd
        ? formatDateFinal(claim?.claimDetails?.PolicyPeriodEnd)
        : policyEndDate
    );

    setInsuranceCompanyNameAddress(
      claim?.claimDetails?.InsuranceCompanyNameAddress
        ? claim?.claimDetails?.InsuranceCompanyNameAddress
        : insuranceCompanyNameAddress
    );
    setSubType(
      claim?.claimDetails?.SurveyType
        ? claim?.claimDetails?.SurveyType
        : subType
    );
    setLicenseNumber(
      claim?.driverDetails?.LicenseNumber
        ? claim?.driverDetails?.LicenseNumber
        : LicenseNumber
    );
    setIssuingAuthority(
      claim?.driverDetails?.IssuingAuthority
        ? claim?.driverDetails?.IssuingAuthority
        : IssuingAuthority
    );
    setInsuredAddedBy(
      claim?.insuredDetails?.AddedBy
        ? claim?.insuredDetails?.AddedBy
        : insuredAddedBy
    );
    setVehicleRegisteredNumber(
      claim?.vehicleDetails?.RegisteredNumber
        ? claim?.vehicleDetails?.RegisteredNumber
        : VehicleRegisteredNumber
    );
    setInsuredName(
      claim?.insuredDetails?.InsuredName
        ? claim?.insuredDetails?.InsuredName
        : InsuredName
    );
    setPolicyIssuingOffice(
      claim?.claimDetails?.PolicyIssuingOffice
        ? claim?.claimDetails?.PolicyIssuingOffice
        : policyIssuingOffice
    );

    setInsuredMailAddress(
      claim?.insuredDetails?.InsuredMailAddress
        ? claim?.insuredDetails?.InsuredMailAddress
        : InsuredMailAddress
    );
    setInsuredMobileNo1(
      claim?.insuredDetails?.InsuredMobileNo1
        ? claim?.insuredDetails?.InsuredMobileNo1
        : InsuredMobileNo1
    );
    setInsuredMobileNo2(
      claim?.insuredDetails?.InsuredMobileNo2
        ? claim?.insuredDetails?.InsuredMobileNo2
        : InsuredMobileNo2
    );
    setSubType(
      claim?.claimDetails?.SurveyType
        ? claim?.claimDetails?.SurveyType
        : subType
    );
    setInspectionType(
      claim?.claimDetails?.InspectionType
        ? claim?.claimDetails?.InspectionType
        : inspectionType
    );
    setVehicleModel(
      claim.vehicleDetails?.TypeOfBody
        ? claim.vehicleDetails?.TypeOfBody
        : VehicleModel
    );
    setEngineType(
      claim?.vehicleDetails?.ModeOfCheck
        ? claim?.vehicleDetails?.ModeOfCheck
        : EngineType
    );
    setVehicleRegisteredOwner(
      claim?.vehicleDetails?.RegisteredOwner
        ? removeMultipleSpaces(claim?.vehicleDetails?.RegisteredOwner)
        : VehicleRegisteredOwner
    );
    setDateRegistration(
      claim?.vehicleDetails?.DateOfRegistration
        ? formatDateFinal(claim?.vehicleDetails?.DateOfRegistration)
        : DateRegistration
    );
    setPUCNumber(
      claim?.vehicleDetails?.PucNumber
        ? claim?.vehicleDetails?.PucNumber
        : PUCNumber
    );
    setTransferDate(
      claim?.vehicleDetails?.TransferDate
        ? claim?.vehicleDetails?.TransferDate
        : TransferDate
    );
    setEngineNumber(
      claim?.vehicleDetails?.EngineNumber
        ? claim?.vehicleDetails?.EngineNumber
        : EngineNumber
    );
    setAddedBy(
      claim?.vehicleDetails?.AddedBy ? claim?.vehicleDetails?.AddedBy : AddedBy
    );
    setLicenseType(
      claim?.driverDetails?.LicenseType
        ? claim?.driverDetails?.LicenseType
        : LicenseType
    );
    setVehicleChassisNumber(
      claim?.vehicleDetails?.ChassisNumber
        ? claim?.vehicleDetails?.ChassisNumber
        : VehicleChassisNumber
    );
    setVehicleFuelType(
      claim?.vehicleDetails?.FuelType
        ? claim?.vehicleDetails?.FuelType
        : claim?.vehicleDetails?.BancsFuelType
        ? claim?.vehicleDetails?.BancsFuelType
        : VehicleFuelType
    );

    setDriverName(
      claim?.driverDetails?.DriverName
        ? removeMultipleSpaces(claim?.driverDetails?.DriverName)
        : DriverName
    );
    setDriverAddedDate(
      claim?.driverDetails?.AddedDate
        ? claim?.driverDetails?.AddedDate
        : DriverAddedDate
    );
    setVerification(
      claim?.driverDetails?.TypeOfVerification === 0
        ? "Verified By Online"
        : "Verified Manually"
    );
    setGarageNameAndAddress(
      claim?.garageDetails?.GarageNameAndAddress
        ? claim?.garageDetails?.GarageNameAndAddress
        : GarageNameAndAddress
    );
    setGarageContactNo1(
      claim?.garageDetails?.GarageContactNo1
        ? claim?.garageDetails?.GarageContactNo1
        : GarageContactNo1
    );
    setGarageContactNo2(
      claim?.garageDetails?.GarageContactNo2
        ? claim?.garageDetails?.GarageContactNo2
        : GarageContactNo2
    );
    setGarageAddedBy(
      claim?.garageDetails?.AddedBy
        ? claim?.garageDetails?.AddedBy
        : GarageAddedBy
    );

    // New Fields
    setVehicleClassDescription(
      claim?.vehicleDetails?.ClassDescription
        ? claim?.vehicleDetails?.ClassDescription
        : VehicleClassDescription
    );
    setMakerDesc(
      claim?.vehicleDetails?.MakerDesc
        ? claim?.vehicleDetails?.MakerDesc
        : MakerDesc
    );
    setMakerModel(
      claim?.vehicleDetails?.MakerModel
        ? claim?.vehicleDetails?.MakerModel
        : MakerModel
    );
    setManufactureMonthYear(
      claim?.vehicleDetails?.ManufactureMonthYear
        ? formatDateFinal(claim?.vehicleDetails?.ManufactureMonthYear)
        : ManufactureMonthYear
    );
    setVehicleGvw(
      claim?.vehicleDetails?.VehicleGvw
        ? claim?.vehicleDetails?.VehicleGvw
        : VehicleGvw
    );
    setCubicCapacity(
      claim?.vehicleDetails?.CubicCapacity
        ? claim?.vehicleDetails?.CubicCapacity
        : CubicCapacity
    );
    setBancsBodyType(
      claim?.vehicleDetails?.BancsBodyType
        ? claim?.vehicleDetails?.BancsBodyType
        : BancsBodyType
    );
    setBancsMakeCode(
      claim?.vehicleDetails?.BancsMakeCode
        ? claim?.vehicleDetails?.BancsMakeCode
        : BancsMakeCode
    );
    setBancsModelCode(
      claim?.vehicleDetails?.BancsModelCode
        ? claim?.vehicleDetails?.BancsModelCode
        : BancsModelCode
    );
    setBancsSubtypeCode(
      claim?.vehicleDetails?.BancsSubtypeCode
        ? claim?.vehicleDetails?.BancsSubtypeCode
        : BancsSubtypeCode
    );
    setBancsVehicleClass(
      claim?.vehicleDetails?.BancsVehicleClass
        ? claim?.vehicleDetails?.BancsVehicleClass
        : BancsVehicleClass
    );
    setBancsVehicleSegment(
      claim?.vehicleDetails?.BancsVehicleSegment
        ? claim?.vehicleDetails?.BancsVehicleSegment
        : BancsVehicleSegment
    );
    setFitUpto(
      claim?.vehicleDetails?.FitUpto ? claim?.vehicleDetails?.FitUpto : FitUpto
    );
    setPasiaModelCode(
      claim?.vehicleDetails?.PasiaModelCode
        ? claim?.vehicleDetails?.PasiaModelCode
        : PasiaModelCode
    );
    setVehiclePermanentAddress(
      claim?.vehicleDetails?.PermanentAddress
        ? claim?.vehicleDetails?.PermanentAddress
        : PermanentAddress
    );
    setRcRtoCode(
      claim?.vehicleDetails?.RcRtoCode
        ? claim?.vehicleDetails?.RcRtoCode
        : RcRtoCode
    );
    setVehicleInsuranceCompany(claim?.vehicleDetails?.VehicleInsuranceCompany);
    setVerification(
      claim?.driverDetails?.TypeOfVerification || "Verified By Online"
    );
    setVehicleSeatingCapacity(
      claim?.vehicleDetails?.SeatingCapacity
        ? claim?.vehicleDetails?.SeatingCapacity
        : VehicleSeatingCapacity
    );
    setRcInsuranceComp(
      claim?.vehicleDetails?.VehicleInsuranceCompany
        ? claim?.vehicleDetails?.VehicleInsuranceCompany
        : VehicleInsuranceCompany
    );
    setRcInsuranceUpto(
      claim?.vehicleDetails?.VehicleInsuranceUpto
        ? formatDateFinal(claim?.vehicleDetails?.VehicleInsuranceUpto)
        : VehicleInsuranceUpto
    );
    setRcVehicleType(
      claim?.vehicleDetails?.VehicleType
        ? claim?.vehicleDetails?.VehicleType
        : RcVehicleType
    );
    setVehicleRcStatus(
      claim?.vehicleDetails?.VehicleRcStatus
        ? claim?.vehicleDetails?.VehicleRcStatus
        : VehicleRcStatus
    );
    setVehicleBlackListStatus(
      claim?.vehicleDetails?.VehicleRcStatus
        ? claim?.vehicleDetails?.VehicleRcStatus
        : VehicleBlackListStatus
    );
    setVehicleRegistedAt(
      claim?.vehicleDetails?.VehicleRegistedAt
        ? claim?.vehicleDetails?.VehicleRegistedAt
        : VehicleRegistedAt
    );
    setPermanentAddress(
      claim?.vehicleDetails?.PermanentAddress
        ? claim?.vehicleDetails?.PermanentAddress
        : PermanentAddress
    );
    setClassOfVehicle(
      claim?.vehicleDetails?.ClassOfVehicle
        ? claim?.vehicleDetails?.ClassOfVehicle
        : ClassOfVehicle
    );
    // getNextYear();

    //driver details fetched
    setFatherName(
      claim?.driverDetails?.FatherName
        ? removeMultipleSpaces(claim?.driverDetails?.FatherName)
        : FatherName
    );
    setGender(
      claim?.driverDetails?.Gender ? claim?.driverDetails?.Gender : Gender
    );
    setBloodGroup(
      claim?.driverDetails?.BloodGroup
        ? claim?.driverDetails?.BloodGroup
        : BloodGroup
    );
    setAddress(
      claim?.driverDetails?.Address ? claim?.driverDetails?.Address : Address
    );
    setRtoName(
      claim?.driverDetails?.RtoName ? claim?.driverDetails?.RtoName : RtoName
    );
    setVov(claim?.driverDetails?.Vov ? claim?.driverDetails?.Vov : Vov);
    setPht(claim?.driverDetails?.Pht ? claim?.driverDetails?.Pht : Pht);
    setPhoto(claim?.driverDetails?.Photo ? claim?.driverDetails?.Photo : Photo);
    setValidUpto(
      claim.driverDetails?.ValidUpto
        ? formatDateFinal(claim.driverDetails?.ValidUpto, "valid")
        : ValidUpto
    );

    setDateOfBirth(
      claim?.driverDetails?.DateOfBirth
        ? formatDateFinal(claim?.driverDetails?.DateOfBirth, "Date O f")
        : DateOfBirth
    );
    setDateOfIssue(
      claim?.driverDetails?.DateOfIssue
        ? formatDateFinal(claim?.driverDetails?.DateOfIssue, "doi")
        : DateOfIssue
    );

    setIsDriverDetailsFetched(
      claim?.claimDetails?.IsDriverDetailsFetched
        ? claim?.claimDetails?.IsDriverDetailsFetched
        : IsDriverDetailsFetched
    );
    setIsRcDetailsFetched(
      claim?.claimDetails?.IsRcDetailsFetched
        ? claim?.claimDetails?.IsRcDetailsFetched
        : IsRcDetailsFetched
    );
    setGarageMailAddress(
      claim.garageDetails?.GarageMailAddress
        ? claim.garageDetails?.GarageMailAddress
        : ""
    );
    setBrokerMailAddress(
      claim?.claimDetails?.BrokerMailAddress
        ? claim?.claimDetails?.BrokerMailAddress
        : ""
    );
    setDLStatus(
      claim?.driverDetails?.DLStatus ? claim?.driverDetails?.DLStatus : DLStatus
    );

    //accident Details setting up according to the added claim
    setPlaceOfLoss(
      claim?.accidentDetails?.PlaceOfLoss
        ? claim?.accidentDetails?.PlaceOfLoss
        : PlaceOfLoss
    );

    setPlaceOfSurvey(
      claim?.accidentDetails?.PlaceOfSurvey
        ? claim?.accidentDetails?.PlaceOfSurvey
        : PlaceOfSurvey
    );

    setDateOfAccident(
      claim?.accidentDetails?.DateOfAccident
        ? formatDateFinal(claim?.accidentDetails?.DateOfAccident)
        : DateOfAccident
    );

    setTimeOfAccident(
      claim?.accidentDetails?.TimeOfAccident
        ? claim?.accidentDetails?.TimeOfAccident
        : TimeOfAccident
    );

    setPin(claim?.accidentDetails?.Pin ? claim?.accidentDetails?.Pin : Pin);
  }, [claim]);

  useEffect(() => {
    setDisable(true);
    setFinalDisable(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      router.push("/login");
    } else {
      axios
        .get("/api/getSpecificClaim", {
          headers: {
            Authorization: `Bearer ${userInfo[0]?.Token}`,
            "Content-Type": "application/json",
          },
          params: {
            LeadId: leadId,
            Username : userInfo[0]?.Username
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setClaim(res.data.data);
        })
        .catch((err) => {
          toast.error(err);
        });

      // axios
      //   .get("/api/getAllRegions")
      //   .then((res) => {
      //     setAllListedRegions(res.data.data);
      //   })
      //   .catch((err) => {});

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
          const tempList = res.data.data.data;

          let requiredVideos = [];
          console.log("templist", tempList);
          tempList.map((list, index) => {
            const allList = list.doc_urls;
            const allName = list.file_names;
            const allLatitude = list?.latitudes;
            const allLongitude = list?.longitudes;
            const allTimestamp = list?.timestamps;

            allList?.map((link, idx) => {
              if (
                link.toLowerCase().includes(".mp4") ||
                link.toLowerCase().includes(".mp3")
              ) {
                requiredVideos.push({
                  name: allName[idx],
                  url: allList[idx],
                  Location: allLatitude[idx] + "," + allLongitude[idx],
                  Timestamp: allTimestamp[idx],
                });
              }
            });
          });

          let requiredDocumenstList = [];
          tempList.map((listedDocument, index) => {
            let insideData = [];
            const allList = listedDocument.doc_urls;
            const allName = listedDocument.file_names;
            const allLatitude = listedDocument?.latitudes;
            const allLongitude = listedDocument?.longitudes;
            const allTimestamp = listedDocument?.timestamps;

            allList?.map((link, idx) => {
              insideData.push({
                name: allName[idx],
                url: allList[idx],
                Location: allLatitude[idx] + "," + allLongitude[idx],
                Timestamp: allTimestamp[idx],
              });
            });

            requiredDocumenstList.push({
              docName: listedDocument.DocumentName,
              leadId: leadId,
              data: insideData,
            });
          });
          setVideosList(requiredVideos);
          setDocuments(requiredDocumenstList);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("/api/getStatus", {
          headers: {
            Authorization: `Bearer ${userInfo[0].Token}`,
            "Content-Type": "application/json",
          },
          params: {
            leadId: leadId,
          },
        })
        .then((res) => {
          const temp = res.data.data;
          let selectiveStat = [];
          temp.map((stat, index) => {
            if (String(stat.LeadId) === String(leadId)) {
              selectiveStat.push(stat);
            }
          });
          setStatus(selectiveStat);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setDisable(false);
    setFinalDisable(false);
  }, [leadId]);

  useEffect(() => {
    setIsLoading(false);
  }, [claim]);

  const onSaveHandler = (APItype, func, func2) => {
    if (BrokerMailAddress && !validateEmail(BrokerMailAddress)) {
      setBrokerMailAddress("");
      toast.error("Provided Broker mail address is not proper !", {
        className: "toast-loading-message",
      });
      func(false);
      func2(false);
    } else if (GarageMailAddress && !validateEmail(GarageMailAddress)) {
      setGarageMailAddress("");
      toast.error("Provided Garage mail address is not proper !", {
        className: "toast-loading-message",
      });
      func(false);
      func2(false);
    } else if (
      (InsuredMailAddress !== null || InsuredMailAddress !== "None") &&
      !validateEmail(InsuredMailAddress)
    ) {
      setInsuredMailAddress("");
      toast.error("Provided Insured mail address is not proper !", {
        className: "toast-loading-message",
      });
      func(false);
      func2(false);
    } else {
      onFinalSubmitHandler(APItype, func, func2);
    }
  };

  const onFinalSubmitHandler = (APItype, func, func2) => {
    setFinalDisable(true);
    const type = calculateTheUpdateType(APItype);
    console.log(insuranceCompanyNameAddress);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const vehicleParts = VehicleModel?.split(",");
    const region = JSON.parse(localStorage.getItem("regionType"));
    const payload = {
      InsuredName: InsuredName
        ? InsuredName
        : claim.insuredDetails?.InsuredName,
      InsuredMailAddress: InsuredMailAddress
        ? InsuredMailAddress
        : claim.insuredDetails?.InsuredMailAddress,
      InsuredMobileNo1: InsuredMobileNo1
        ? InsuredMobileNo1
        : claim.insuredDetails?.InsuredMobileNo1,
      PolicyIssuingOffice: policyIssuingOffice
        ? policyIssuingOffice
        : claim.claimDetails?.PolicyIssuingOffice,
      ClaimRegion: claimRegion ? claimRegion : claim.claimDetails?.ClaimRegion,
      ClaimServicingOffice: claimServicingOffice
        ? claimServicingOffice
        : claim.claimDetails?.ClaimServicingOffice,
      PolicyPeriodStart: policyStartDate,
      PolicyPeriodEnd: policyEndDate,
      InsuranceCompanyNameAddress: insuranceCompanyNameAddress
        ? insuranceCompanyNameAddress
        : claim.claimDetails?.InsuranceCompanyNameAddress,
      InsuredAddedBy: insuredAddedBy
        ? insuredAddedBy
        : claim.claimDetails?.InsuredAddedBy,
      InsuredMobileNo2: InsuredMobileNo2
        ? InsuredMobileNo2
        : claim.insuredDetails?.InsuredMobileNo2,
      ClaimNumber: ClaimNumber ? ClaimNumber : claim.claimDetails?.ClaimNumber,
      VehicleTypeOfBody: VehicleModel
        ? VehicleModel
        : claim.claimDetails?.VehicleType,
      SurveyType: subType ? subType : "Motor",
      InspectionType: inspectionType ? inspectionType : "Final",
      VehicleDateOfRegistration: DateRegistration,
      VehiclePucNumber: PUCNumber
        ? PUCNumber
        : claim.vehicleDetails?.VehiclePucNumber,
      VehicleTransferDate: TransferDate,
      VehicleEngineNumber: EngineNumber
        ? EngineNumber
        : claim.vehicleDetails?.VehicleEngineNumber,
      VehicleAddedBy: AddedBy ? AddedBy : claim.vehicleDetails?.VehicleAddedBy,
      IssuingAuthority: IssuingAuthority
        ? IssuingAuthority
        : claim.driverDetails?.IssuingAuthority,
      LicenseNumber: LicenseNumber
        ? LicenseNumber
        : claim.driverDetails?.LicenseNumber,
      LicenseType: LicenseType ? LicenseType : claim.driverDetails?.LicenseType,
      VehicleChassisNumber: VehicleChassisNumber
        ? VehicleChassisNumber
        : claim.vehicleDetails?.VehicleChassisNumber,
      VehicleFuelType: VehicleFuelType
        ? VehicleFuelType
        : claim.vehicleDetails?.VehicleFuelType,
      DriverName: DriverName ? DriverName : claim.driverDetails?.DriverName,
      DriverAddedDate: DriverAddedDate,
      DriverTypeOfVerification: Verification
        ? Verification
        : claim.driverDetails?.DriverTypeOfVerification,
      GarageNameAndAddress: GarageNameAndAddress
        ? GarageNameAndAddress
        : claim.garageDetails?.GarageNameAndAddress,
      GarageAddedBy: GarageAddedBy
        ? GarageAddedBy
        : claim.garageDetails?.GarageAddedBy,
      GarageContactNo1,
      GarageContactNo2,
      LeadId: claim.claimDetails?.LeadID,
      VehicleClassDescription,
      MakerDesc,
      MakerModel,
      VehicleGvw,
      CubicCapacity,
      VehicleSeatingCapacity,
      VehiclePermanentAddress,
      FitUpto: FitUpto !== "" ? FitUpto : claim?.vehicleDetails?.FitUpto,
      PasiaModelCode,
      RcInsuranceComp,
      RcInsuranceUpto,
      RcVehicleType,
      BancsModelCode,
      BancsMakeCode,
      BancsSubtypeCode,
      BancsBodyType,
      BancsVehicleClass,
      BancsVehicleSegment,
      RcRtoCode,
      VehicleRcStatus,
      VehicleBlackListStatus,
      VehicleRegistedAt,
      VehicleInsuranceCompany,
      ManufactureMonthYear,
      PermanentAddress,
      ClassOfVehicle,
      insuredAddedBy,
      VehicleRegisteredNumber,
      VehicleRegisteredOwner,
      FatherName,
      Gender,
      BloodGroup,
      Mobile,
      Address,
      RtoName,
      ValidUpto: ValidUpto ? convertAndFormatDate(ValidUpto) : "",
      Vov,
      Photo,
      Pht,
      DateOfBirth: DateOfBirth ? convertAndFormatDate(DateOfBirth) : "",
      ClassOfVehicle,
      DateOfIssue: DateOfIssue ? convertAndFormatDate(DateOfIssue) : "",
      SeatingCapacity: VehicleSeatingCapacity,
      IsDriverDetailsFetched,
      IsRcDetailsFetched,
      GarageMailAddress,
      BrokerMailAddress,
      PlaceOfLoss,
      PlaceOfSurvey,
      DateOfAccident: DateOfAccident,
      TimeOfAccident,
      PlaceOfLoss,
      Pin,
      token: userInfo[0].Token,
      Username : userInfo[0]?.Username
    };
    setDisable(true);

    toast.loading("Updating claim Details!!", {
      className: "toast-loading-message",
    });
    axios
      .put("/api/updateClaimDetails", payload, {
        headers: {
          Authorization: `Bearer ${userInfo[0]?.Token}`,
          "Content-Type": "application/json",
        },
        params: {
          type: type,
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully fetched !", {
          className: "toast-loading-message",
        });
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Caught into Error ! Try Again.", {
          className: "toast-loading-message",
        });
      });
    if (func) {
      func(false);
    } else {
      setEditCase((prop) => !prop);
    }

    setDisable(false);
    setFinalDisable(false);
    func(false);
    func2(false);
    window.location.reload();
  };

  return (
    <>
      <Toaster />
      <Header region={claim ? claim?.claimDetails?.ClaimRegion : "N.A."} />
      <MobileMenu />
      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu
            leadId={leadId}
            isInspectionType = {1}
            VehicleType={RcVehicleType}
            email={claim.insuredDetails?.InsuredMailAddress}
            policyNo={claim.claimDetails?.PolicyNumber}
            vehicleNo={claim.vehicleDetails?.RegisteredNumber}
            Insured={claim.insuredDetails?.InsuredName}
            Region={claim?.claimDetails?.Region}
            BrokerMailAddress={BrokerMailAddress}
            GarageMailAddress={GarageMailAddress}
            isClaimPage={true}
          />
        </div>
      </div>
      <section
        className="our-dashbord dashbord bgc-f7 pb50"
        style={{ marginRight: "-10px" }}
      >
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
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

                {isLoading ? (
                  <Loader />
                ) : claim.claimDetails?.InsuredName ? (
                  <div className="row">
                    <div
                      className="smartTable-noDataFound col-12"
                      style={{ marginTop: "110px", marginBottom: "40px" }}
                    >
                      <div className="ring">
                        Loading
                        <span className="load"></span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="">
                        <div className="my_dashboard_review mb-2 bgc-f6">
                          <div className="col-lg-12">
                            <div className="row">
                              <div className="col-lg-2">
                                <h4 className="mt-2">Case Details</h4>
                              </div>
                              {editCase ? (
                                <div className="col-lg-2">
                                  {" "}
                                  <button
                                    className="btn-thm m-1"
                                    style={{}}
                                    disabled={finalDisable}
                                    onClick={() => {
                                      setIsClaimLoading(true);
                                      onSaveHandler(
                                        1,
                                        setEditCase,
                                        setIsClaimLoading
                                      );
                                    }}
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditCase(false)}
                                    className="btn-thm flaticon-close"
                                    style={{ fontSize: "14px" }}
                                  ></button>
                                </div>
                              ) : (
                                claim?.vehicleDetails?.RegisteredNumber && (
                                  <button
                                    className="col-lg-1 btn-thm m-1"
                                    style={{}}
                                    onClick={() =>
                                      editHandler(
                                        1,
                                        setEditCase,
                                        setEditCase_01,
                                        setEditCase_02
                                      )
                                    }
                                  >
                                    <span
                                      className="flaticon-edit"
                                      style={{ fontSize: "14px" }}
                                    ></span>
                                  </button>
                                )
                              )}
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
                          {isClaimLoading ? (
                            <Loader />
                          ) : !editCase ? (
                            <div className="col-lg-12">
                              <ClaimDetailsViewForm
                                disable={disable}
                                finalDisable={finalDisable}
                                claim={claim}
                                InsuredName={InsuredName}
                                inspectionType={inspectionType}
                                setInspectionType={setInspectionType}
                                setInsuredName={setInsuredName}
                                InsuredMailAddress={InsuredMailAddress}
                                setInsuredMailAddress={setInsuredMailAddress}
                                InsuredMobileNo1={InsuredMobileNo1}
                                setInsuredMobileNo1={setInsuredMobileNo1}
                                InsuredMobileNo2={InsuredMobileNo2}
                                setInsuredMobileNo2={setInsuredMobileNo2}
                                requestTypeTypes={requestTypeTypes}
                                subTypeTypes={subTypeTypes}
                                setRequestType={setInspectionType}
                                requestType={inspectionType}
                                setSubType={setSubType}
                                subType={subType}
                                ClaimNumber={ClaimNumber}
                                setClaimNumber={setClaimNumber}
                                edit={editCase}
                                setIsStatusModal={setIsStatusModal}
                                policyIssuingOffice={policyIssuingOffice}
                                setPolicyIssuingOffice={setPolicyIssuingOffice}
                                claimRegion={claimRegion}
                                setClaimRegion={setClaimRegion}
                                claimServicingOffice={claimServicingOffice}
                                setClaimServicingOffice={
                                  setClaimServicingOffice
                                }
                                policyStartDate={policyStartDate}
                                setPolicyStartDate={setPolicyStartDate}
                                policyEndDate={policyEndDate}
                                setPolicyEndDate={setPolicyEndDate}
                                insuranceCompanyNameAddress={
                                  insuranceCompanyNameAddress
                                }
                                setInsuranceCompanyNameAddress={
                                  setInsuranceCompanyNameAddress
                                }
                                insuredAddedBy={insuredAddedBy}
                                setInsuredAddedBy={setInsuredAddedBy}
                                VehicleRegisteredNumber={
                                  VehicleRegisteredNumber
                                }
                                setVehicleRegisteredNumber={
                                  setVehicleRegisteredNumber
                                }
                                setBrokerMailAddress={setBrokerMailAddress}
                                setGarageMailAddress={setGarageMailAddress}
                              />
                            </div>
                          ) : (
                            <ClaimDetailsEditForm
                              claim={claim}
                              allListedRegions={allListedRegions}
                              finalDisable={finalDisable}
                              disable={disable}
                              inspectionType={inspectionType}
                              setInspectionType={setInspectionType}
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
                              setRequestType={setInspectionType}
                              requestType={inspectionType}
                              setSubType={setSubType}
                              subType={subType}
                              ClaimNumber={ClaimNumber}
                              setClaimNumber={setClaimNumber}
                              edit={editCase}
                              setIsStatusModal={setIsStatusModal}
                              policyIssuingOffice={policyIssuingOffice}
                              setPolicyIssuingOffice={setPolicyIssuingOffice}
                              claimRegion={claimRegion}
                              setClaimRegion={setClaimRegion}
                              claimServicingOffice={claimServicingOffice}
                              setClaimServicingOffice={setClaimServicingOffice}
                              policyStartDate={policyStartDate}
                              setPolicyStartDate={setPolicyStartDate}
                              policyEndDate={policyEndDate}
                              setPolicyEndDate={setPolicyEndDate}
                              insuranceCompanyNameAddress={
                                insuranceCompanyNameAddress
                              }
                              setInsuranceCompanyNameAddress={
                                setInsuranceCompanyNameAddress
                              }
                              insuredAddedBy={insuredAddedBy}
                              setInsuredAddedBy={setInsuredAddedBy}
                              VehicleRegisteredNumber={VehicleRegisteredNumber}
                              setVehicleRegisteredNumber={
                                setVehicleRegisteredNumber
                              }
                              setBrokerMailAddress={setBrokerMailAddress}
                              setGarageMailAddress={setGarageMailAddress}
                              BrokerMailAddress={BrokerMailAddress}
                              GarageMailAddress={GarageMailAddress}
                            />
                          )}
                        </div>
                        <div
                          className="row mt-2 mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12">
                            <Video videos={videosList} />
                          </div>
                        </div>

                        <div
                          className="row mt-2 mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12">
                            <VehicleDetailsEditForm
                              setFinalDisable={setFinalDisable}
                              disable={disable}
                              finalDisable={finalDisable}
                              onSaveHandler={onSaveHandler}
                              claim={claim}
                              edit={editCase_01}
                              editHandler={editHandler}
                              VehicleModel={VehicleModel}
                              setVehicleModel={setVehicleModel}
                              setEngineType={setEngineType}
                              EngineType={EngineType}
                              VehicleRegisteredNumber={VehicleRegisteredNumber}
                              setVehicleRegisteredNumber={
                                setVehicleRegisteredNumber
                              }
                              VehicleRegisteredOwner={VehicleRegisteredOwner}
                              setVehicleRegisteredOwner={
                                setVehicleRegisteredOwner
                              }
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
                              // New Fields
                              updateHandlerAfterFetching={
                                updateHandlerAfterFetching
                              }
                              setVehicleClassDescription={
                                setVehicleClassDescription
                              }
                              setMakerDesc={setMakerDesc}
                              setMakerModel={setMakerModel}
                              setVehicleGvw={setVehicleGvw}
                              setCubicCapacity={setCubicCapacity}
                              setVehicleSeatingCapacity={
                                setVehicleSeatingCapacity
                              }
                              setVehiclePermanentAddress={
                                setVehiclePermanentAddress
                              }
                              setFitUpto={setFitUpto}
                              setPasiaModelCode={setPasiaModelCode}
                              setRcInsuranceComp={setRcInsuranceComp}
                              setRcInsuranceUpto={setRcInsuranceUpto}
                              setRcVehicleType={setRcVehicleType}
                              setBancsModelCode={setBancsModelCode}
                              setBancsMakeCode={setBancsMakeCode}
                              setBancsSubtypeCode={setBancsSubtypeCode}
                              setBancsBodyType={setBancsBodyType}
                              setBancsVehicleClass={setBancsVehicleClass}
                              setBancsVehicleSegment={setBancsVehicleSegment}
                              setRcRtoCode={setRcRtoCode}
                              VehicleClassDescription={VehicleClassDescription}
                              MakerDesc={MakerDesc}
                              MakerModel={MakerModel}
                              ManufactureMonthYear={ManufactureMonthYear}
                              setManufactureMonthYear={setManufactureMonthYear}
                              VehicleGvw={VehicleGvw}
                              CubicCapacity={CubicCapacity}
                              VehicleSeatingCapacity={VehicleSeatingCapacity}
                              VehiclePermanentAddress={VehiclePermanentAddress}
                              FitUpto={FitUpto}
                              PasiaModelCode={PasiaModelCode}
                              RcInsuranceComp={RcInsuranceComp}
                              RcInsuranceUpto={RcInsuranceUpto}
                              RcVehicleType={RcVehicleType}
                              BancsModelCode={BancsModelCode}
                              BancsMakeCode={BancsMakeCode}
                              BancsSubtypeCode={BancsSubtypeCode}
                              BancsBodyType={BancsBodyType}
                              BancsVehicleClass={BancsVehicleClass}
                              BancsVehicleSegment={BancsVehicleSegment}
                              RcRtoCode={RcRtoCode}
                              setVehicleRcStatus={setVehicleRcStatus}
                              VehicleRcStatus={VehicleRcStatus}
                              VehicleBlackListStatus={VehicleBlackListStatus}
                              setVehicleBlackListStatus={
                                setVehicleBlackListStatus
                              }
                              setVehicleRegistedAt={setVehicleRegistedAt}
                              VehicleRegistedAt={VehicleRegistedAt}
                              setVehicleInsuranceCompany={
                                setVehicleInsuranceCompany
                              }
                              VehicleInsuranceCompany={VehicleInsuranceCompany}
                              PermanentAddress={PermanentAddress}
                              setPermanentAddress={setPermanentAddress}
                              ClassOfVehicle={ClassOfVehicle}
                              setClassOfVehicle={setClassOfVehicle}
                              VehicleInsuranceUpto={VehicleInsuranceUpto}
                              setVehicleInsuranceUpto={setVehicleInsuranceUpto}
                            />
                          </div>
                        </div>

                        <div
                          className="row mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12 text-center">
                            <ManualUploadTabularView
                              finalDisable={finalDisable}
                              disable={disable}
                              documents={documents}
                              leadId={leadId}
                              uploadedFiles={uploadedFiles}
                              setUploadedFiles={setUploadedFiles}
                            />
                          </div>
                        </div>

                        <div
                          className="row mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12 text-center">
                            <UploadReportDocumentView
                              leadId={leadId}
                              uploadedFiles={uploadedFiles}
                              documents={documents}
                            />
                          </div>
                        </div>

                        
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="">
                        <div className="row" style={{ marginLeft: "0px" }}>
                          <div className="row mb-2 my_dashboard_review bgc-f6">
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
                            <StatusLog
                              finalDisable={finalDisable}
                              leadId={leadId}
                              status={status}
                              statusOptions={statusOptions}
                              subStatus={subStatus}
                              documents={documents}
                              claim={claim}
                            />
                          </div>
                          <div className="row mt-2 mb-2 my_dashboard_review bgc-f6">
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
                            <ChatboxContent
                              finalDisable={finalDisable}
                              leadId={leadId}
                            />
                          </div>

                          
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* End .row */}

              <div className="row mt200">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      {" "}
                      &copy; {new Date().getFullYear()} Infostics. Made with
                      love.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
           
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
