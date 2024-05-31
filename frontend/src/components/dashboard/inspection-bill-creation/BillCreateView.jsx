import axios, { all } from "axios";
import { use, useEffect, useReducer } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  addCommasToNumber,
  roundOff,
  calculateProfessionalFees,
  calculateTotalAssessed,
} from "./functions";
import BillCreateLayoutView from "./BillCreateLayoutView";

const BillCreateView = ({ allInfo, leadID }) => {
  const router = useRouter();
  const [inspectionType, setInspectionType] = useState("");

  const [Bill, setBill] = useState("");
  const currentDate = new Date();
  const [disable, setDisable] = useState(false);
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  const [BillDate, setBillDate] = useState("");
  const [Insurer, setInsurer] = useState(
    "United India Insurance Company Limited"
  );
  const [Branch, setBranch] = useState("");
  const [Others, setOthers] = useState("");
  const [Estimate, setEstimate] = useState("");
  const [DetailsKM, setDetailsKM] = useState("");
  const [Assessed, setAssessed] = useState("");
  const [DetailsPhotoRate, setDetailsPhotoRate] = useState("");
  const [DetailsFee, setDetailsFee] = useState("");
  const [DetailsRemark, setDetailsRemark] = useState("");
  const [show, setShow] = useState(false);
  const [defaultProfFees, setDefaultProfFees] = useState(0);

  const [BillTo, setBillTo] = useState("");

  const [currentSelectedInsprectiontype, setcurrentSelectedInsprectiontype] =
    useState(1);

  const [FinalProfFees, setFinalProfFees] = useState(0);
  const [FinalTotalKM, setFinalTotalKM] = useState("");
  const [FinalVisit, setFinalVisit] = useState("");
  const [FinalConveyance, setFinalConveyance] = useState("");
  const [FinalPhotos, setFinalPhotos] = useState("");
  const [FinalCharges, setFinalCharges] = useState("");
  const [FinalPhotosCD, setFinalPhotoCD] = useState("");
  const [FinalRemark, setFinalRemark] = useState("");

  const [ReInsprectionProfFees, setReInsprectionProfFees] = useState("");
  const [ReInsprectionTotalKM, setReInsprectionTotalKM] = useState("");
  const [ReInsprectionVisit, setReInsprectionVisit] = useState("");
  const [ReInsprectionConveyance, setReInsprectionConveyance] = useState("");
  const [ReInsprectionPhotos, setReInsprectionPhotos] = useState("");
  const [ReInsprectionCharges, setReInsprectionCharges] = useState("");
  const [ReInsprectionPhotosCD, setReInsprectionPhotoCD] = useState("");
  const [ReInsprectionRemark, setReInsprectionRemark] = useState("");

  const [SpotProfFees, setSpotProfFees] = useState("");
  const [SpotTotalKM, setSpotTotalKM] = useState("");
  const [SpotVisit, setSpotVisit] = useState("");
  const [SpotConveyance, setSpotConveyance] = useState("");
  const [SpotPhotos, setSpotPhotos] = useState("");
  const [SpotCharges, setSpotCharges] = useState("");
  const [SpotPhotosCD, setSpotPhotoCD] = useState("");
  const [SpotRemark, setSpotRemark] = useState("");
  const [allServicingOffice, setAllServicingOffice] = useState([]);

  const [OtherTotal, setOtherTotal] = useState("");

  const [CGST, setCGST] = useState(0);
  const [SGST, setSGST] = useState(0);
  const [IGST, setIGST] = useState(18);

  const [allInsurer, setAllInsurer] = useState([]);

  const [CGSTValue, setCGSTValue] = useState("");
  const [SGSTValue, setSGSTValue] = useState("");
  const [IGSTValue, setIGSTValue] = useState("");

  const [Cash, setCash] = useState("");
  const [NetPay, setNetPay] = useState(0);

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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .get("/api/getAllInsurers", {
        headers: {
          Authorization: `Bearer ${userInfo[0]?.Token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("insurerdata", res.data.InsurerData.result);
        setAllInsurer(res.data.InsurerData.result);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Got error while fetching Insurer Info!");
      });
  }, []);

  useEffect(() => {
    if (!allInfo?.feesDetails) {
    } else {
      setBill(allInfo?.feesDetails?.BillSno);
      setBillDate(allInfo?.feesDetails?.BillDate || new Date());
      setInsurer(allInfo?.feesDetails?.InsuranceCompanyName);
      setBillTo(allInfo?.feesDetails?.BillTo);
      setBranch(allInfo?.feesDetails?.Branch);
      setOthers(allInfo?.feesDetails?.Others);
      setDetailsKM(allInfo?.feesDetails?.KmRate);
      setDetailsPhotoRate(allInfo?.feesDetails?.PhotsRate);
      setDetailsFee(allInfo?.feesDetails?.FeebasedOn);
      setDetailsRemark(allInfo?.feesDetails?.Remrk);

      setcurrentSelectedInsprectiontype(
        String(allInfo?.feesDetails?.Type) === "Final"
          ? 1
          : String(allInfo?.feesDetails?.Type) === "Spot"
          ? 3
          : 2
      );

      setCGST(allInfo?.feesDetails?.Cgst);
      setIGST(allInfo?.feesDetails?.Igst);
      setSGST(allInfo?.feesDetails?.Sgst);

      if (String(allInfo?.feesDetails?.Type) === "Final") {
        setFinalTotalKM(allInfo?.feesDetails?.TotalKm);
        setFinalVisit(allInfo?.feesDetails?.Visits);
        setFinalConveyance(allInfo?.feesDetails?.Conveyance);
        setFinalPhotos(allInfo?.feesDetails?.Photos);
        setFinalCharges(allInfo?.feesDetails?.Charge);
        setFinalPhotoCD(allInfo?.feesDetails?.Photos_cd);
        setFinalRemark(allInfo?.feesDetails?.Remrk);
      } else if (String(allInfo?.feesDetails?.Type) === "Spot") {
        setSpotTotalKM(allInfo?.feesDetails?.TotalKm);
        setSpotVisit(allInfo?.feesDetails?.Visits);
        setSpotConveyance(allInfo?.feesDetails?.Conveyance);
        setSpotPhotos(allInfo?.feesDetails?.Photos);
        setSpotCharges(allInfo?.feesDetails?.Charge);
        setSpotPhotoCD(allInfo?.feesDetails?.Photos_cd);
        setSpotRemark(allInfo?.feesDetails?.Remrk);
      } else {
        setReInsprectionTotalKM(allInfo?.feesDetails?.TotalKm);
        setReInsprectionVisit(allInfo?.feesDetails?.Visits);
        setReInsprectionConveyance(allInfo?.feesDetails?.Conveyance);
        setReInsprectionPhotos(allInfo?.feesDetails?.Photos);
        setReInsprectionCharges(allInfo?.feesDetails?.Charge);
        setReInsprectionPhotoCD(allInfo?.feesDetails?.Photos_cd);
        setReInsprectionRemark(allInfo?.feesDetails?.Remrk);
      }
    }
  }, [allInfo]);

  useEffect(() => {
    if (
      String(BillTo) === "Appointing Office" ||
      String(BillTo) === "Insurer"
    ) {
      let requiredStateCode = {};
      let searchCode =
        String(BillTo) === "Appointing Office"
          ? allInfo?.otherInfo[0]?.ClaimServicingOffice
          : String(BillTo) === "Insurer"
          ? allInfo?.otherInfo[0]?.PolicyIssuingOffice
          : "";
      allServicingOffice.map((office, index) => {
        if (String(office.OfficeNameWithCode) === String(searchCode)) {
          requiredStateCode = office.StateCode;
        }
      });
      console.log("requiredStateCode", requiredStateCode, searchCode);
      if (String(requiredStateCode) === "8") {
        setCGST(9);
        setSGST(9);
        setIGST(0);
      } else {
        setCGST(0);
        setSGST(0);
        setIGST(18);
      }
    } else {
      setCGST(0);
      setSGST(0);
      setIGST(0);
    }
  }, [BillTo, allInfo, allServicingOffice]);

  useEffect(() => {
    const fees = String(allInfo?.otherInfo[0]?.VehicleType)
      .toLowerCase()
      .includes("4W".toLowerCase())
      ? 700
      : 500;
    setFinalProfFees(fees);
    setReInsprectionProfFees(fees);
    setSpotProfFees(fees);
  }, [allInfo]);

  const getTotalValue = () => {
    const professionalFees = Number(calculateProfessionalFees(allInfo));

    const totalKM =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalTotalKM
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionTotalKM
        : SpotTotalKM;

    const Visits =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalVisit
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionVisit
        : SpotVisit;

    const Conveyance =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalConveyance
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionConveyance
        : SpotConveyance;

    const Photos =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalPhotos
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionPhotos
        : SpotPhotos;

    const charges =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalCharges
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionCharges
        : SpotCharges;

    const PhotoCD =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalPhotosCD
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionPhotosCD
        : SpotPhotosCD;

    const total =
      Number(professionalFees) + Number(Conveyance) + Number(PhotoCD);

    const calculate_cgst = (Number(total) * Number(CGST)) / 100;
    const calculate_igst = (Number(total) * Number(IGST)) / 100;

    const calculate_sgst = (Number(total) * Number(SGST)) / 100;

    setIGSTValue(calculate_igst);
    setCGSTValue(calculate_cgst);
    setSGSTValue(calculate_sgst);

    setNetPay(
      total +
        calculate_cgst +
        calculate_igst +
        calculate_sgst +
        Number(OtherTotal)
    );
    return (
      total +
      calculate_cgst +
      calculate_igst +
      calculate_sgst +
      Number(OtherTotal)
    );
  };

  useEffect(() => {
    const professionalFees = String(allInfo?.VehicleType).toLowerCase().includes("4w") ? 700 : 500;

    const Conveyance =
      allInfo?.feesDetails?.Conveyance !== undefined &&
      allInfo?.feesDetails?.Conveyance !== null &&
      allInfo?.feesDetails?.Conveyance !== ""
        ? allInfo?.feesDetails?.Conveyance
        : 0;

    const PhotoCD =
      allInfo?.feesDetails?.Photos_cd !== undefined &&
      allInfo?.feesDetails?.Photos_cd !== null &&
      allInfo?.feesDetails?.Photos_cd !== ""
        ? allInfo?.feesDetails?.Photos_cd
        : 0;

    const total =
      Number(professionalFees) + Number(Conveyance) + Number(PhotoCD);

    const calculate_cgst = (Number(total) * Number(CGST)) / 100;
    const calculate_igst = (Number(total) * Number(IGST)) / 100;

    const calculate_sgst = (Number(total) * Number(SGST)) / 100;
    setNetPay(total + calculate_cgst + calculate_igst + calculate_sgst);
  }, [allInfo]);

  useEffect(() => {
    setNetPay(getTotalValue());
  }, [CGST, IGST, SGST, OtherTotal, currentSelectedInsprectiontype]);

  const onSubmitHnadler = () => {
    setDisable(true);
    const payload = {
      LeadId: leadID,
      Type:
        String(currentSelectedInsprectiontype) === "1"
          ? "Final"
          : String(currentSelectedInsprectiontype) === "2"
          ? "ReInspection"
          : "Spot",
      ProfessionalFees: calculateProfessionalFees(),
      TotalKM:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalTotalKM
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionTotalKM
          : SpotTotalKM,
      Visits:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalVisit
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionVisit
          : SpotVisit,
      Conveyance:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalConveyance
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionConveyance
          : SpotConveyance,
      Photos:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalPhotos
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionPhotos
          : SpotPhotos,
      Charge:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalCharges
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionCharges
          : SpotCharges,
      Photos_cd:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalPhotosCD
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionPhotosCD
          : SpotPhotosCD,
      Cgst: CGST,
      Igst: IGST,
      Sgst: SGST,
      Total: NetPay,
      ModeOfPayement: "",
      BillID: Number(allInfo?.feesDetails?.BillSno),
      FeebasedOn: DetailsFee,
      Remrk: DetailsRemark,
      KmRate: DetailsKM,
      PhotsRate: DetailsPhotoRate,
      EstimateAmt: Estimate,
      AssessedAmt: Assessed,
      InsuranceCompanyName: allInfo?.otherInfo[0]?.InsuranceCompanyNameAddress,
      Branch: Branch,
      BillTo: BillTo,
      Others: Others,
      BillDate: BillDate,
      BillId: allInfo?.feesDetails ? allInfo?.feesDetails?.BillSno : null,
    };

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    toast.loading(
      allInfo?.feesDetails?.BillID
        ? "Updating the bill !!"
        : "Adding the bill !!",
      {
        className: "toast-loading-message",
      }
    );

    axios
      .post("/api/uploadFeeReport", payload, {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success(
          `Successfully ${
            allInfo?.feesDetails?.BillID ? "updated" : "added"
          } !`,
          {
            className: "toast-loading-message",
          }
        );
        router.push(`/claim-details?leadId=${leadID}`);
      })
      .catch((Err) => {
        console.log(Err);
        toast.dismiss();
        toast.error("Got error while adding claim!");
      });
    setDisable(false);
  };

  useEffect(() => {
    setInsurer(allInfo?.otherInfo[0]?.InsuranceCompanyNameAddress);
    setBranch(allInfo?.otherInfo[0]?.Region);
    calculateTotalAssessed(allInfo,setAssessed,setEstimate);

    const professionalFees =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalProfFees
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionProfFees
        : SpotProfFees;

    const totalKM =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalTotalKM
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionTotalKM
        : SpotTotalKM;

    const Visits =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalVisit
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionVisit
        : SpotVisit;

    const Conveyance =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalConveyance
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionConveyance
        : SpotConveyance;

    const Photos =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalPhotos
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionPhotos
        : SpotPhotos;

    const charges =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalCharges
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionCharges
        : SpotCharges;

    const PhotoCD =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalPhotosCD
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionPhotosCD
        : SpotPhotosCD;

    console.log(defaultProfFees, PhotoCD, Conveyance);
    const total =
      Number(professionalFees) + Number(Conveyance) + Number(PhotoCD);

    const calculate_cgst = (Number(total) * Number(CGST)) / 100;
    const calculate_igst = (Number(total) * Number(IGST)) / 100;

    const calculate_sgst = (Number(total) * Number(SGST)) / 100;

    setIGSTValue(calculate_igst);
    setCGSTValue(calculate_cgst);
    setSGSTValue(calculate_sgst);

    setNetPay(total + calculate_cgst + calculate_igst + calculate_sgst);
  }, [
    allInfo,
    FinalConveyance,
    FinalPhotosCD,
    FinalProfFees,
    SpotConveyance,
    SpotPhotosCD,
    SpotProfFees,
    ReInsprectionConveyance,
    ReInsprectionPhotosCD,
    ReInsprectionProfFees,
    currentSelectedInsprectiontype,
  ]);

  return (
   <>
   <BillCreateLayoutView
   allInfo={allInfo}
   BillDate={BillDate}
   setBillDate={setBillDate}
   Insurer={Insurer}
   setInsurer={setInsurer}
   allInsurer={allInsurer}
   Branch={Branch}
   BillTo={BillTo}
   setBillTo={setBillTo}
   Others={Others}
   setOthers={setOthers}
   DetailsKM={DetailsKM}
   setDetailsKM={setDetailsKM}
   Estimate={Estimate}
   Assessed={Assessed}
   DetailsPhotoRate={DetailsPhotoRate}
   setDetailsPhotoRate={setDetailsPhotoRate}
   DetailsFee={DetailsFee}
   setDetailsFee={setDetailsFee}
   DetailsRemark={DetailsRemark}
   setDetailsRemark={setDetailsRemark}
   currentSelectedInsprectiontype={currentSelectedInsprectiontype}
   setcurrentSelectedInsprectiontype={setcurrentSelectedInsprectiontype}
   FinalProfFees={FinalProfFees}
   FinalTotalKM={FinalTotalKM}
   setFinalTotalKM={setFinalTotalKM}
   FinalVisit={FinalVisit}
   setFinalVisit={setFinalVisit}
   FinalConveyance={FinalConveyance}
   setFinalConveyance={setFinalConveyance}
   FinalPhotos={FinalPhotos}
   setFinalPhotos={setFinalPhotos}
   FinalCharges={FinalCharges}
   setFinalCharges={setFinalCharges}
   FinalPhotosCD={FinalPhotosCD}
   setFinalPhotoCD={setFinalPhotoCD}
   FinalRemark={FinalRemark}
   setFinalRemark={setFinalRemark}
   ReInsprectionTotalKM={ReInsprectionTotalKM}
   setReInsprectionTotalKM={setReInsprectionTotalKM}
   ReInsprectionVisit={ReInsprectionVisit}
   setReInsprectionVisit={setReInsprectionVisit}
   ReInsprectionConveyance={ReInsprectionConveyance}
   setReInsprectionConveyance={setReInsprectionConveyance}
   ReInsprectionPhotos={ReInsprectionPhotos}
   setReInsprectionPhotos={setReInsprectionPhotos}
   ReInsprectionCharges={ReInsprectionCharges}
   setReInsprectionCharges={setReInsprectionCharges}
   ReInsprectionPhotosCD={ReInsprectionPhotosCD}
   setReInsprectionPhotoCD={setReInsprectionPhotoCD}
   ReInsprectionRemark={ReInsprectionRemark}
   setReInsprectionRemark={setReInsprectionRemark}
   SpotTotalKM={SpotTotalKM}
   setSpotTotalKM={setSpotTotalKM}
   SpotVisit={SpotVisit}
   setSpotVisit={setSpotVisit}
   SpotConveyance={SpotConveyance}
   setSpotConveyance={setSpotConveyance}
   SpotPhotos={SpotPhotos}
   setSpotPhotos={setSpotPhotos}
   SpotCharges={SpotCharges}
   setSpotCharges={setSpotCharges}
   SpotPhotosCD={SpotPhotosCD}
   setSpotPhotoCD={setSpotPhotoCD}
   SpotRemark={SpotRemark}
   setSpotRemark={setSpotRemark}
   OtherTotal={OtherTotal}
   CGST={CGST}
   setCGST={setCGST}
   CGSTValue={CGSTValue}
   SGST={SGST}
   setSGST={setSGST}
   SGSTValue={SGSTValue}
   IGST={IGST}
   setIGST={setIGST}
   IGSTValue={IGSTValue}
   NetPay={NetPay}
   disable={disable}
   onSubmitHnadler={onSubmitHnadler}
   />

   </>
  );
};

export default BillCreateView;
