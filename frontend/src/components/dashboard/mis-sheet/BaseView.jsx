import Link from "next/link";
import TabularView from "./TabularView";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { headCells } from "./DataHeaders";
import {
  addCommasToNumber,
  sortObjectsByOrderIdDescending,
  convertToIST,
  formatDateUpdated,
} from "./functions";

export default function BaseView({
  allRows,
  setStartDate,
  setEndDate,
  allInsurer,
  startDate,
  DateType,
  RegionType,
  setRegionType,
  setDateType,
  endDate,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  let tempData = [];
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [finalRegion, setFinalRegion] = useState("");
  const [changeInRegion, setChangeInRegion] = useState(false);

  const [InsurerType, setInsurerType] = useState("United India Insurance");

  useEffect(() => {
    toast.loading("Fetching the information!!", {
      className: "toast-loading-message",
    });
    allRows?.map((row, index) => {
      const today = new Date();
      const addedDate = new Date(row.DateOfIntimation);
      const tatInDays = Math.floor((today - addedDate) / (1000 * 60 * 60 * 24));

      const insurerTypeLowerCase = (InsurerType || "").toLowerCase(); // Lowercase insurer type
      const insuranceCompanyNameAddressLowerCase = (
        row.InsuranceCompanyNameAddress || ""
      ).toLowerCase();
      const firstTwoWordsOfInsurerType = insurerTypeLowerCase
        .split(" ")
        .slice(0, 2)
        .join(" ");

      const isShow =
        insuranceCompanyNameAddressLowerCase.includes(
          firstTwoWordsOfInsurerType
        ) && getRegionByReferenceNo(row.ReferenceNo, finalRegion);
      if (isShow) {
        const updatedRow = {
          sno: index + 1,
          ref_no: row.ReferenceNo,
          policy_no: row.PolicyNumber,
          veh_no: row.RegisteredNumber,
          insured: row.InsuredName,
          insured_gst_no: row.GST_No,
          survey_type: row.SurveyType,
          doi: formatDateUpdated(row.DateOfIntimation),
          date_of_survey: formatDateUpdated(row.DateOfSurvey),
          estimate_amt: addCommasToNumber(row.EstimateAmt),
          assessed_amt: addCommasToNumber(row.AssessedAmt),
          date_of_submit: formatDateUpdated(row.BillDate),
          tat: row.TAT,
          remarks: row.Remarks,
          bill_no: row.BillNo !== "undefined" ? row.BillNo : "-",
          bill_total: addCommasToNumber(row.BillTotal),
          bill_date: formatDateUpdated(row.BillDate),
        };
        tempData.push(updatedRow);
      }
    });
    setUpdatedData(tempData);
    toast.dismiss();
    toast.success("Fetched  Successfully !", {
      className: "toast-loading-message",
    });
  }, [allRows, InsurerType, finalRegion]);

  const changeHandler = () => {
    setStartDate(start);
    setEndDate(end);
    if (changeInRegion) {
      setFinalRegion(RegionType);
      setChangeInRegion(false);
    }
  };

  const reloadHandler = () => {
    setStartDate("");
    setEndDate("");
  };

  const getRegionByReferenceNo = (referenceNo, Region) => {
    if (RegionType === "" || RegionType === "All") {
      return true;
    }
    const defaultRegion = referenceNo?.split("/")[0];
    if (String(defaultRegion) === "DLH" && String(Region) === "Delhi")
      return true;
    if (String(defaultRegion) === "CHD" && String(Region) === "Chandigarh")
      return true;
    if (String(defaultRegion) === "JDH" && String(Region) === "Jodhpur")
      return true;
    if (String(defaultRegion) === "Spot" && String(Region) === "Spot")
      return true;
    if (String(defaultRegion) === "Jaipur" && String(Region) === "Jaipur")
      return true;
    if (String(defaultRegion) === "preInspection" && String(Region) === "preInspection")
      return true;
    if (String(defaultRegion) === "Hero" && String(Region) === "Hero")
      return true;
    return false;
  };

  return (
    <TabularView
      title="MIS Sheet"
      data={sortObjectsByOrderIdDescending(updatedData)}
      changeHandler={changeHandler}
      setStart={setStart}
      setEnd={setEnd}
      start={start}
      reloadHandler={reloadHandler}
      end={end}
      InsurerType={InsurerType}
      setInsurerType={setInsurerType}
      RegionType={RegionType}
      setRegionType={setRegionType}
      DateType={DateType}
      setDateType={setDateType}
      changeInRegion={changeInRegion}
      setChangeInRegion={setChangeInRegion}
      allInsurer={allInsurer}
      headCells={headCells}
    />
  );
}
