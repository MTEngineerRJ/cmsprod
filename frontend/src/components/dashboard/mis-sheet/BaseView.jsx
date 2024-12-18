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
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [finalRegion, setFinalRegion] = useState("");
  const [changeInRegion, setChangeInRegion] = useState(false);
  const [InsurerType, setInsurerType] = useState("United India Insurance");

  // Predefined insurer-to-region mapping
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
      "Ahmedabad",
      "Indore",
      "Ludhiana",
      "Nagpur",
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
    "The Oriental Insurance Company Limited": [
      "Ahmedabad",
      "Indore",
      "Vadodara",
      "Nagpur",
      "Delhi RO1",
      "Lucknow",
      "Chandigarh",
      "Jaipur",
      "Dehradun",
      "Ambala",
      "Delhi RO2",
      "Guwahati",
      "Preinspection",
      "Spot",
    ],
  };

  useEffect(() => {
    toast.loading("Fetching the information!!", {
      className: "toast-loading-message",
    });
    let tempData = [];
    allRows?.map((row, index) => {
      const today = new Date();
      const addedDate = new Date(row.DateOfIntimation);
      const tatInDays = Math.floor((today - addedDate) / (1000 * 60 * 60 * 24));

      const insurerTypeLowerCase = (InsurerType || "").toLowerCase();
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
    console.log("tempData: ", tempData);
    toast.dismiss();
    toast.success("Fetched Successfully!", {
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

    // Regular expression to match the region code (e.g., DLH, CHD, etc.)
    const regionCodeRegex = /([A-Z]{3})\/?\d+/;

    const match = referenceNo?.match(regionCodeRegex);
    if (!match) return false;

    const regionCode = match[1]; // Extract region code (e.g., DLH, CHD, JPR, etc.)

    // Mapping region codes to region names
    const regionMapping = {
      DLH: "Delhi",
      CHD: "Chandigarh",
      JDH: "Jodhpur",
      JPR: "Jaipur",
      LDN: "Ludhiana",
      BHP: "Bhopal",
      DHD: "Dehradun",
      LKW: "Lucknow",
      AHB: "Ahmadabad",
      VDD: "Vadodara",
      HH: "Hero",
      PI: "Preinspection",
      SPOT: "Spot",
    };

    return regionMapping[regionCode] === Region;
  };

  // Show only Preinspection and Spot if the selected insurer is not predefined
  const getRegionsForInsurer = (insurerType) => {
    return insurerRegionMapping[insurerType]
      ? insurerRegionMapping[insurerType]
      : ["Preinspection", "Spot"];
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
      regions={getRegionsForInsurer(InsurerType)} // Pass the filtered regions based on insurer
    />
  );
}
