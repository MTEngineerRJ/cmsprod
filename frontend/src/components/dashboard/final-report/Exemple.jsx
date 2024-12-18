import Link from "next/link";
import SmartTable from "./SmartTable";
import { useEffect, useState } from "react";
// import Select from "react-select";
import axios, { all } from "axios";
import {
  calculateDepreciationsPercenatge,
  getMonthsDifference,
} from "./functions";
import { getExpandedData } from "./extractFunction";
import toast from "react-hot-toast";

const headCells = [
  {
    id: "row",
    numeric: false,
    label: "",
    width: 10,
  },
  {
    id: "sno",
    numeric: false,
    label: "#",
    width: 10,
  },
  {
    id: "dep",
    numeric: false,
    label: "Dep%",
    width: 50,
  },
  {
    id: "item_name",
    numeric: false,
    label: "Item Name",
    width: 250,
  },
  {
    id: "hsh_code",
    numeric: false,
    label: "HSH Code",
    width: 80,
  },
  {
    id: "remark",
    numeric: false,
    label: "Remark",
    width: 120,
  },
  {
    id: "estimate",
    numeric: false,
    label: "Estimate",
    width: 100,
  },
  {
    id: "assessed",
    numeric: false,
    label: "Assessed",
    width: 100,
  },
  {
    id: "qe",
    numeric: false,
    label: "QE",
    width: 50,
  },
  {
    id: "qa",
    numeric: false,
    label: "QA",
    width: 50,
  },
  {
    id: "bill_sr",
    numeric: false,
    label: "Bill Sr.",
    width: 70,
  },
  {
    id: "gst",
    numeric: false,
    label: "GST%",
    width: 60,
  },
  {
    id: "total",
    numeric: false,
    label: "Total",
    width: 100,
  },
  {
    id: "type",
    numeric: false,
    label: "Type",
    width: 100,
  },
  
];

export default function Exemple_01({
  policyType,
  claim,
  disable,
  settotalMetalRows,
  setallNewParts,
  DateOfRegistration,
  setOverallMetailDep,
  allDepreciations,
  setAllDepreciations,
  AccidentAddedDateTime,

  setMetalSalvageValue,
  DateRegistration,
  setTotalPartsEstimate,
  setTotalPartsAssessed,
}) {
  const [updatedCode, setUpdatedCode] = useState([]);

  const [tableHeaders,setTableHeaders] = useState([headCells]);
  const [totalEstimate, setTotalEstimate] = useState(0);
  const [totalAssessed, setTotaAssessed] = useState(0);
  const [totalDifference, setTotalDifference] = useState(0);
  const [currentPolicy, setCurrentPolicy] = useState("Regular");
  const [toggleGST, setToggleGST] = useState(2);
  const [preRender, setPreRender] = useState(true);

  useEffect(()=>{
    if(claim?.claimDetails?.IMT){
      let updatedHeadCells = [...headCells];
      updatedHeadCells.push({
        id: "imt",
        numeric: false,
        label: "IMT 23",
        width: 100,
      },);
      setTableHeaders(updatedHeadCells);
    }
    else{
      setTableHeaders(headCells)
    }
  },[claim]);

  const generateSnoId = () => {
    const now = new Date();
    const yyyy = String(now.getFullYear());
    const mm = String(now.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const ms = String(now.getMilliseconds()).padStart(2, "0");
    const result = `${yyyy}${mm}${dd}${hh}${min}${ss}${ms}`;
    return result;
  };

  const [metalDep, setMetalDep] = useState(0);
  // const []
  const [change, setChange] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [openSave, setOpenSave] = useState(false);
  const [description, setDescription] = useState("Regular");
  const [sac, setSac] = useState(0);
  const [estimate, setEstimate] = useState(0);
  const [assessed, setAssessed] = useState(0);
  const [depreciation, setDepreciation] = useState(0);
  const [type, setType] = useState("");
  const [currentType, setCurrentType] = useState("Both");
  const [remark, setRemark] = useState("");
  const [updatedSNO, setUpdatedSNO] = useState(0);
  const [gst, setGst] = useState(0);
  const [change2, setChange2] = useState(false);

  const [allRows, setAllRows] = useState([]);
  const [newParts, setNewParts] = useState([]);

  const [allRemarks, setAllRemarks] = useState([
    "Not allowed",
    "Intact",
    " Repair allowed",
    "IMT23",
    "Not correlate",
    "Not relevant",
    "Damaged",
    "Broken",
    "As per PI",
    "Burnt",
    "Not payable",
  ]);

  const [changeParts, setChangeParts] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .get("/api/getAllDepreciationList", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllDepreciations(res.data.data.results);
      })
      .catch((Err) => {
        alert(Err);
      });

    const LeadID = window.location.pathname.split("/final-report/")[1];

    let snoId = 0;
    axios
      .get("/api/getNewParts", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: LeadID,
        },
      })
      .then((res) => {
        // setNewParts(res.data.userData);
        let newPart = res.data.userData;
        let temp_row = [];

        let total_assessed = 0,
          total_estimate = 0,
          total_metal = 0;
        let type = "Both";
        let metalParts = 0;
        newPart.map((part, index) => {
          if (String(part.LeadID) === String(LeadID)) {
            let overall = Number(part.Assessed) * Number(part.QA);

            const dep =
              String(claim?.claimDetails?.PolicyType) === "Regular"
                ? (Number(overall) * Number(part.DepreciationPct)) / 100
                : 0;
            overall -= dep;
            const overall_e = Number(part.Estimate) * Number(part.QE);
            const GSTT_e = (overall_e * Number(part.GSTPct)) / 100;
            const GSTT = (overall * Number(part.GSTPct)) / 100;

            const requiredTotal =
              part.WithTax === 1 || part.WithTax === 3
                ? overall + GSTT
                : overall;

            snoId = Number(snoId) < Number(part.SNO) ? part.SNO : snoId;
            const temp = {
              _id: index + 1,
              description: part.ItemName,
              dep: part.DepreciationPct,
              sac: part.HSNCode,
              remark: part.Remark,
              estimate: part.Estimate,
              assessed: part.Assessed,
              qa: part.QA,
              qe: part.QE,
              bill_sr: part.BillSr,
              gst: part.GSTPct,
              type: part.TypeOfMaterial,
              total: requiredTotal,
              sno: part.SNO,
              imt : part.IsImt,
              isActive: Number(part.IsActive),
            };

            type =
              String(part.WithTax) === "1"
                ? "Both"
                : String(part.WithTax) === "2"
                ? "Estimate"
                : "Assessed";

            if (part.IsActive === 1) {
              total_assessed = total_assessed + (overall + GSTT);

              metalParts +=
                part.TypeOfMaterial === "Metal" ? overall + GSTT : 0;

              total_metal =
                total_metal +
                (part.TypeOfMaterial === "Metal"
                  ? (Number(part.Assessed) *
                      Number(part.QA) *
                      Number(part.DepreciationPct)) /
                    100
                  : 0);
              total_estimate = total_estimate + (overall_e + GSTT_e);
            }
            temp_row.push(temp);
          }
        });
        setAllRows(temp_row);
        setCurrentType(type);
        settotalMetalRows(metalParts);
        setMetalSalvageValue(total_metal);
        setTotaAssessed(total_assessed);
        setTotalPartsAssessed(total_assessed);
        setTotalPartsEstimate(total_estimate);
        setTotalEstimate(total_estimate);
        setCurrentType(type);
        setChangeParts(true);
        const newSNO = snoId !== 0 ? snoId : generateSnoId();
        setUpdatedSNO(newSNO);
      })
      .catch((Err) => {
        console.log("newpartserror",Err)
        alert(Err);
      });
  }, []);

  const roundOff = (value) => {
    const roundedValue = parseFloat(value).toFixed(2);
    return roundedValue;
  };
  useEffect(() => {
    setallNewParts(allRows);
  }, [allRows]);

  function sortArrayOfObjects(array) {
    // Ensure the input is an array
    if (!Array.isArray(array)) {
      console.error("Input is not an array.");
      return [];
    }

    // Sort the array based on the PartType property
    const sortedArray = array.slice().sort((a, b) => {
      const partTypeA = a.PartType.toLowerCase();
      const partTypeB = b.PartType.toLowerCase();

      if (partTypeA < partTypeB) return -1;
      if (partTypeA > partTypeB) return 1;
      return 0;
    });

    return sortedArray;
  }

  useEffect(() => {
    let tempDep = sortArrayOfObjects(allDepreciations);
    // setAllDepreciations(tempDep)
  }, [allDepreciations]);

  useEffect(() => {
    changeTotalAccordingToPolicyType(currentType);
  }, [currentType]);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setChange2(false);
    setTotaAssessed(calculateTotalAssessed);
    setTotalEstimate(calculateTotalEstimated);
    setTotalDifference(totalEstimate - totalAssessed);
  }, [change2, currentType]);
  const openEditHandler = (idx) => {
    const tempIdx = allRows[idx];
    setSac(tempIdx.sac);
    setDescription(tempIdx.description);
    setAssessed(tempIdx.assessed);
    setEstimate(tempIdx.estimate);
    setGst(tempIdx.gst);
    setEditIndex(idx);
    setChange(true);
    setOpenSave(true);
  };

  useEffect(() => {
    calculateTotalAssessed();
    calculateTotalEstimated();
    handleTotalChange();
  }, [policyType]);

  const totalValue = () => {
    return gst + assessed;
  };

  const saveHandler = () => {
    setSac("");
    setDescription("");
    setAssessed(0);
    setEstimate(0);
    setGst(0);
    setEditIndex(-1);
    setChange(true);
    setOpenSave(false);
  };

  let tempValue = 0;

  const handleAddRow = () => {
    let newSNO = Number(updatedSNO) + 1;
    setUpdatedSNO(newSNO);
    // Assuming a new row has a specific structure, adjust this as needed
    const newRow = {
      _id: allRows.length, // You may use a more robust ID generation logic
      sno: generateSnoId(),
      dep: 0, // Add default values or leave empty as needed
      description: "",
      sac: "",
      remark: "",
      estimate: "",
      assessed: "",
      qe: "01",
      qa: "01",
      bill_sr: "", // Assuming bill_sr increments with each new row
      gst: 0,
      total: 0,
      type: "",
      imt : 0,
      isActive: 1,
    };

    const old = allRows;
    old.push(newRow);

    setChange(true);
    setAllRows(old);
  };

  const calculateVehicleAge = () => {
    if (
      !claim.vehicleDetails?.DateOfRegistration ||
      !claim.claimDetails?.AddedDateTime
    ) {
      return "0";
    }
    const a = getMonthsDifference(DateRegistration);

    const b = getMonthsDifference(AccidentAddedDateTime);

    return `${a - b}`;
  };

  const calculatePolicyAge = () => {
    const end = getMonthsDifference(claim?.claimDetails?.PolicyPeriodEnd);
    const start = getMonthsDifference(claim.claimDetails?.PolicyPeriodStart);

    if (end >= 0) {
      return "Already Ended";
    } else return start;
  };

  const sortNewParts = () => {
    let sortedArray = allRows;
    sortedArray.sort((a, b) => a.sno - b.sno);
    return sortedArray;
  };

  const calculateDepreciationOnMetal = () => {
    const age = calculateVehicleAge();
    const a = calculateDepreciationsPercenatge(
      allDepreciations,
      "Metal",
      age
    );
    setOverallMetailDep(a);
    return a;
  };

  const handleRemoveRow = (index) => {
    let updatedRowsss = [];
    allRows.filter((row, i) => {
      const active = String(row.sno) === String(index) ? 0 : row.isActive;
      const newRow = {
        sno: row.sno,
        dep: row.dep, // Add default values or leave empty as needed
        description: row.description,
        sac: row.sac,
        remark: row.remark,
        estimate: row.estimate,
        assessed: row.assessed,
        qe: row.qe,
        qa: row.qa,
        bill_sr: row.bill_sr, // Assuming bill_sr increments with each new row
        gst: row.gst,
        total: row.total,
        type: row.type,
        imt : row.imt,
        isActive: Number(active),
      };

      updatedRowsss.push(newRow);
    });

    setAllRows(updatedRowsss);
    setChange(true);
  };

  const editHandler = () => {
    setEdit(true);
  };

  const updateHandler = () => {
    setEdit(false);
  };

  const getSpecificRow = (rowId) =>{
    let requiredRow = {};
    allRows.map((row,index)=>{
      if(String(index) === String(rowId)){
        requiredRow = row;
      }
    });
    return requiredRow;
  }

  const handleDescriptionChange = (index,value,field)=>{
    
    let updatedRows = [];
    allRows.map((row,idx)=>{
      if(String(index) === String(idx)){
        if((String(row.estimate) === "" && String(row.assessed) === "") ||
        String(row.estimate) === ""){

        }
        const expadedData = getExpandedData(row,value,field);
        const newRow = {...expadedData};
        updatedRows.push(newRow);
      }
      else{
        updatedRows.push(row);
      }
      
    })
    setAllRows(updatedRows)
  }

 
  const calculateTotalAssessed = () => {
    let without_gst = 0,
      with_gst = 0;
    allRows.map((row, index) => {
      if (row.isActive === 1) {
        let current_total = Number(row.assessed) * Number(row.qa);
        const subtract = 0;
        without_gst = without_gst + (current_total - subtract);
        with_gst =
          with_gst +
          (current_total +
            ((current_total - subtract) * Number(row.gst)) / 100);
      }
    });
    if (String(currentType) === "Assessed" || String(currentType) === "Both") {
      setTotalPartsAssessed(with_gst);
      return with_gst;
    }

    setTotalPartsAssessed(without_gst);
    return without_gst;
  };

  const calculateTotalEstimated = () => {
    let without_gst = 0,
      with_gst = 0;
    allRows.map((row, index) => {
      if (row.isActive === 1) {
        let current_total = Number(row.estimate) * Number(row.qe);
        const subtract = 0;
        without_gst = without_gst + (current_total - subtract);
        with_gst =
          with_gst +
          (current_total +
            ((current_total - subtract) * Number(row.gst)) / 100);
      }
    });
    if (String(currentType) === "Estimate" || String(currentType) === "Both") {
      setTotalPartsEstimate(with_gst);
      return with_gst;
    }
    setTotalPartsEstimate(without_gst);
    return without_gst;
  };

  const onSaveHandler = () => {
    const LeadID = window.location.pathname.split("/final-report/")[1];
    // console.log(LeadID);
    let totalAssessed = 0, totalEstimate = 0;


    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    let tempRows = [];
    allRows.map((row, index) => {
      totalAssessed += row.isActive ?  (Number(row.assessed) * Number(row.qa)) : 0;
      totalEstimate += row.isActive ? (Number(row.estimate) * Number(row.qe)) : 0;
      const r = {
        sno: row.sno,
        dep: row.dep, // Add default values or lea ve empty as needed
        description: row.description,
        sac: row.sac,
        remark: row.remark,
        estimate: row.estimate,
        assessed: row.assessed,
        qa: row.qa,
        qe: row.qe,
        imt : row.imt,
        bill_sr: row.bill_sr, // Assuming bill_sr increments with each new row
        gst: row.gst,
        total:
          String(currentType) === "Both"
            ? 1
            : String(currentType) === "Estimate"
            ? 2
            : 3,
        isActive: row.isActive,
        type: row.type,
      };
      tempRows.push(r);
    });

    if(Number(totalAssessed) > Number(totalEstimate)){
      toast.error("Listed assessed amount(s) cannot be greater than estimate amount(s).");
      setHide(false);
    }
    else{

    const payload = {
      allRows: JSON.stringify(tempRows),
    };

    axios
      .put("/api/updateNewParts", payload, {
        headers: {
          Authorization: `Bearer ${userInfo[0]?.Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: LeadID,
        },
      })
      .then((res) => {
        alert("Successfully updated!!");
        window.location.reload();
      })
      .catch((Err) => {
        alert(Err);
      });
    }
  };

  const changeTotalAccordingToPolicyType = (policy) => {
    setCurrentType(policy);

    setPreRender(true);
    setToggleGST(2);

    const isIncludeGSTInAssessed =
      String(policy) === "Assessed" || String(policy) === "Both";
    const isIncludeGSTInEstimate =
      String(policy) === "Estimate" || String(policy) === "Both" ? true : false;

    let total_estimate = 0;
    let total_metal_sum = 0;
    let total_assessed = 0;
    let updatedOne = [];
    allRows.map((row, index) => {
      const updatedRow = row;

      //for estimate calculate
      const overall_estimate = Number(row.estimate) * Number(row.qe);
      total_estimate =
        total_estimate +
        overall_estimate +
        (isIncludeGSTInEstimate
          ? (overall_estimate * Number(row.gst)) / 100
          : 0);

      //total assessed calculate
      const overall_assessed = Number(row.assessed) * Number(row.qa);
      const subtract_dep = 0;
      const subtarct_final = overall_assessed - subtract_dep;

      total_estimate =
        total_estimate +
        subtarct_final +
        (isIncludeGSTInAssessed
          ? (overall_assessed * Number(row.gst)) / 100
          : 0);

      //total calculation for every row
      const overall = Number(row.assessed) * Number(row.qa);
      const subtract_before = 0;
      const subtract = overall - subtract_before;
      const gst = (overall * Number(row.gst)) / 100;
      const totalVal =
        String(policy) === "Both" || String(policy) === "Assessed"
          ? overall + gst
          : overall;
      updatedRow.total = totalVal;
      updatedOne.push(updatedRow);
    });
    setAllRows(updatedOne);
    setTotaAssessed(total_assessed);
    setTotalPartsAssessed(total_assessed);
    setTotalPartsEstimate(total_estimate);
    setTotalEstimate(total_estimate);
    // setToggleGST(toggleGST+1);
    setChange(true);
    setChange2(true);
    setChange(true);
  };

  const handleTotalChange = () => {
    let updatedOne = [];
    allRows.map((row, index) => {
      const updatedRow = row;

      //total assessed calculate
      const overall_assessed = Number(row.assessed) * Number(row.qa);
      const subtract_dep = 0;
      const subtarct_final = overall_assessed - subtract_dep;

      //total calculation for every row
      const total = subtarct_final;
      updatedRow.total = total;
      updatedOne.push(updatedRow);
    });

    setAllRows(updatedOne);
    setToggleGST(toggleGST + 1);
    setChange(true);
  };

  const handleQeQaChange = (index, val, field) => {
    setChange2(true);
    let oldRow = allRows;
    const currentField = allRows[index];
    const len = val.length;

    const qe =
      String(field) === "qe"
        ? String(currentField.qe) === val
          ? val.slice(-1, 1)
          : val
        : currentField.qe;
    const qa =
      String(field) === "qa"
        ? String(currentField.qa) === val
          ? val.slice(-1, 1)
          : val
        : currentField.qa;

    const overall = Number(currentField.assessed) * Number(qa);
    const subtract =
      String(policyType) === "" || String(policyType) === "Regular"
        ? (overall * Number(currentField.dep)) / 100
        : 0;

    const total_without = overall - subtract;
    const total =
      Number(currentField.assessed) * Number(qa) +
      (currentType === "Assessed" || String(currentType) === "Both"
        ? (total_without * Number(currentField.gst)) / 100
        : 0);

    const newOutput = {
      _id: currentField._id,
      sno: currentField.sno,
      dep: currentField.dep,
      description: currentField.description,
      sac: currentField.sac,
      remark: currentField.remark,
      estimate: currentField.estimate,
      assessed: currentField.assessed,
      qe: qe,
      qa: qa,
      imt : currentField.imt,
      bill_sr: currentField.bill_sr, // Assuming bill_sr increments with each new row
      gst: currentField.gst,
      total: total,
      isActive: currentField.isActive,
      type: currentField.type,
    };

    oldRow[index] = newOutput;
    setChange(true);
    setAllRows(oldRow);
  };

  const handleTypeChange = (index, val, field) => {
    setChange2(true);

    let oldRow = allRows;
    const currentField = allRows[index];
    const len = val.length;
    const age = calculateVehicleAge();

    const dep =
      claim?.vehicleDetails?.DateOfRegistration ||
      claim?.vehicleDetails?.DateOfRegistration !== "undefined"
        ? calculateDepreciationsPercenatge(
            allDepreciations,
            val,
            age
          )
        : 0;
    console.log("dep%%",dep);
    setMetalDep(dep);

    //calculate totlRows
    let totalMetalRows = 0;
    allRows.map((row, idx) => {
      if (
        (row.type === "Metal" && idx !== index) ||
        (val === "Metal" && idx === index)
      ) {
        const value = Number(row.assessed) * Number(row.qa);
        const gst = (Number(value) * Number(row.gst)) / 100;

        const totalRowMetalValue = value + gst;
        totalMetalRows = totalMetalRows + totalRowMetalValue;
      }
    });

    settotalMetalRows(totalMetalRows);

    const type =
      String(field) === "type"
        ? String(currentField.type) === val
          ? val.slice(-1, 1)
          : val
        : currentField.type;

    const overall = Number(currentField.assessed) * Number(currentField.qa);
    const subtract = 0;
    const total_without = overall - subtract;
    const total =
      Number(currentField.assessed) * Number(currentField.qa) +
      String(
        currentType === "Assessed" || String(currentType) === "Both"
          ? (total_without * Number(gst)) / 100
          : 0
      );

    const newOutput = {
      _id: currentField._id, // You may use a more robust ID generation logic
      row: currentField.row,
      sno: currentField.sno,
      dep: dep, // Add default values or lea ve empty as needed
      description: currentField.description,
      sac: currentField.sac,
      remark: currentField.remark,
      estimate: currentField.estimate,
      assessed: currentField.assessed,
      qa: currentField.qa,
      qe: currentField.qe,
      imt : currentField.imt,
      bill_sr: currentField.bill_sr, // Assuming bill_sr increments with each new row
      gst: currentField.gst,
      total: total,
      isActive: currentField.isActive,
      type: type,
    };

    let total_metal = 0;
    allRows.map((row, idx) => {
      if (String(idx) === String(index)) {
        if (val === "Metal") {
          total_metal =
            total_metal +
            (Number(currentField.assessed) *
              Number(currentField.qa) *
              Number(dep)) /
              100;
        }
      } else {
        if (val === "Metal") {
          total_metal =
            total_metal +
            (Number(row.assessed) * Number(row.qa) * Number(row.dep)) / 100;
        }
      }
    });

    oldRow[index] = newOutput;
    setAllRows(oldRow);
    setMetalSalvageValue(total_metal);
    calculateTotalAssessed();
    calculateTotalEstimated();
    setChange(true);
  };

  const [hide, setHide] = useState(false);

  const handleGSTChange = (index, val, field) => {
    setChange2(true);
    let oldRow = allRows;
    const currentField = allRows[index];
    const len = val.length;

    const gst =
      String(field) === "gst"
        ? String(currentField.gst) === val
          ? val.slice(-1, 1)
          : val
        : currentField.gst;

    const isIncludeGSTInAssessed =
      String(currentType) === "Assessed" || String(currentType) === "Both"
        ? true
        : false;

    //total assessed calculate
    const overall_assessed =
      Number(currentField.assessed) * Number(currentField.qa);
    const subtract_dep =
      String(policyType) === "" || String(policyType) === "Regular"
        ? (overall_assessed * Number(currentField.dep)) / 100
        : 0;
    const subtarct_final = overall_assessed - subtract_dep;
    // console.log(overall_assessed-(String(policyType) === "" || String(policyType) === "Regular") ? ((overall_assessed * Number(currentField.dep))/100): 0);
    const total =
      Number(currentField.assessed) * Number(currentField.qa) +
      (isIncludeGSTInAssessed ? (subtarct_final * Number(gst)) / 100 : 0);
    // console.log(total,subtarct_final,(String(policyType) === "" || String(policyType) === "Regular") ? ((overall_assessed * Number(currentField.dep))/100): 0,isIncludeGSTInAssessed,overall_assessed,currentField.dep,policyType,"total");

    const newOutput = {
      _id: currentField._id, // You may use a more robust ID generation logic
      row: currentField.row,
      sno: currentField.sno,
      dep: currentField.dep, // Add default values or lea ve empty as needed
      description: currentField.description,
      sac: currentField.sac,
      remark: currentField.remark,
      estimate: currentField.estimate,
      assessed: currentField.assessed,
      qa: currentField.qa,
      qe: currentField.qe,
      bill_sr: currentField.bill_sr, // Assuming bill_sr increments with each new row
      gst: gst,
      imt : currentField.imt,
      total: total,
      isActive: currentField.isActive,
      type: currentField.type,
    };

    oldRow[index] = newOutput;
    setAllRows(oldRow);
    calculateTotalAssessed();
    calculateTotalEstimated();
    // console.log(allRows[index].field);
    setChange(true);
    // console.log(oldRow);
  };

  const handleImtChange = (index,value,field)=>{
    let updatedRows = [];
    allRows.map((row,idx)=>{
      if(String(index) === String(idx)){
       const newRow = {
        ...row,
        imt : Number(value)
       }
        updatedRows.push(newRow);
      }
      else{
        updatedRows.push(row);
      }
      
    })
    
    setAllRows(updatedRows)
  }


  const gstToggleHandler = () => {
    setToggleGST(toggleGST + 1);
    setChange(true);
  };

  const calculateRowTotal = (sno) => {
    let requiredRow = {};
    allRows.map((row, index) => {
      if (String(row.sno) === String(sno)) {
        requiredRow = row;
      }
    });

    const overall_Value = Number(requiredRow.assessed) * Number(requiredRow.qa);
    const gstValue = (overall_Value * Number(requiredRow.gst)) / 100;

    if (
      String(currentType) === "" ||
      String(currentType) === "Both" ||
      String(currentType) === "Assessed"
    ) {
      return overall_Value + gstValue;
    }
    return overall_Value;
  };

  useEffect(() => {
    let temp = [];

    let count = 1;

    const getData = () => {
      const sortedOne = sortNewParts();
      sortedOne.map((row, index) => {
        // console.log(row);
        if (Number(row.isActive) === 1) {
          const newRow = {
            _id: index + 1,
            row: (
              <button
                className="flaticon-minus"
                onClick={() => handleRemoveRow(row.sno)}
              ></button>
            ),
            sno: count,
            dep: (
              <input
                className="form-control form-control-table p-1"
                type="text"
                value={`${row.dep}%`}
                required
                id="terms"
                style={{ border: "1px solid black" }}
              />
            ),
            item_name: (
              <input
                className="form-control form-control-table"
                type="text"
                value={row.description}
                disabled={!edit}
                onChange={(e) =>
                  handleDescriptionChange(index, e.target.value,"description")
                }
                required
                id={`${row.sno}_'depscr`}
                style={{ border: "1px solid black" }}
              />
            ),

            hsh_code: (
              <input
                className="form-control form-control-table"
                type="text"
                value={row.sac}
                onChange={(e) => handleDescriptionChange(index, e.target.value, "sac")}
                required
                disabled={!edit}
                id={`${row.sno}_sac`}
                style={{ border: "1px solid black" }}
              />
            ),

            remark: (
              <select
                style={{ marginTop: "-5px" }}
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                value={row.remark}
                onChange={(e) => handleDescriptionChange(index, e.target.value, "remark")}
                disabled={!edit}
              >
                <option data-tokens="Status1" value={" As per PI"}>
                  As per PI
                </option>
                <option data-tokens="Status2" value={"Burnt"}>
                  Burnt
                </option>
                <option data-tokens="Status1" value={"Broken"}>
                  Broken
                </option>
                <option data-tokens="Status2" value={"Damaged"}>
                  Damaged
                </option>
                <option data-tokens="Status1" value={"IMT23"}>
                  IMT23
                </option>

                <option data-tokens="Status1" value={"Intact"}>
                  Intact
                </option>
                <option data-tokens="Status1" value={"Regular"}>
                  Not allowed
                </option>
                <option data-tokens="Status1" value={"Not correlate"}>
                  Not correlate
                </option>
                <option data-tokens="Status3" value={"Not payable"}>
                  Not payable
                </option>
                <option data-tokens="Status2" value={"Not relevant"}>
                  Not relevant
                </option>

                <option data-tokens="Status2" value={"Repair allowed"}>
                  Repair allowed
                </option>
              </select>
            ),
            assessed: (
              <input
                className="form-control form-control-table"
                type="number"
                value={row.assessed}
                onChange={(e) =>
                  handleDescriptionChange(index, e.target.value, "assessed")
                }
                required
                disabled={!edit}
                id={`${row.sno}_assessed`}
                style={{ border: "1px solid black" }}
              />
            ),
            estimate: (
              <input
                className="form-control form-control-table"
                type="number"
                value={row.estimate}
                disabled={!edit}
                onChange={(e) =>
                  handleDescriptionChange(index, e.target.value, "estimate")
                }
                required
                id={`${row.sno}_estimate`}
                style={{ border: "1px solid black" }}
              />
            ),

            qe: (
              <input
                className="form-control form-control-table"
                type="number"
                value={row.qe}
                onChange={(e) => handleQeQaChange(index, e.target.value, "qe")}
                required
                disabled={!edit}
                id={`${row.sno}_qe`}
                style={{ border: "1px solid black" }}
              />
            ),
            qa: (
              <input
                className="form-control form-control-table"
                type="number"
                value={row.qa}
                onChange={(e) => handleQeQaChange(index, e.target.value, "qa")}
                required
                disabled={!edit}
                id={`${row.sno}_qa`}
                style={{ border: "1px solid black" }}
              />
            ),
            bill_sr: (
              <input
                className="form-control form-control-table"
                type="number"
                value={row.bill_sr}
                onChange={(e) => handleDescriptionChange(index, e.target.value, "bill_sr")}
                required
                disabled={!edit}
                id={`${row.sno}_bill`}
                style={{ border: "1px solid black" }}
              />
            ), // Assuming bill_sr increments with each new row
            gst: (
              <input
                className="form-control form-control-table"
                type="number"
                value={row.gst}
                onChange={(e) => handleGSTChange(index, e.target.value, "gst")}
                required
                disabled={!edit}
                id={`${row.sno}_gst`}
                style={{ border: "1px solid black" }}
              />
            ),
            total: (
              <input
                className="form-control form-control-table"
                type="number"
                value={roundOff(calculateRowTotal(row.sno))}
                // onChange={(e)=>handleChange(index,e.target.value,"gst")}
                required
                disabled={!edit}
                id={`${row.sno}_total`}
                style={{ border: "1px solid black" }}
              />
            ),
            type: (
              <select
                style={{ marginTop: "-5px" }}
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                value={row.type}
                disabled={!edit}
                onChange={(e) =>
                  handleTypeChange(index, e.target.value, "type")
                }
              >
                {allDepreciations.map((dep, index) => {
                  return index > 0 &&
                    allDepreciations[index]?.PartType ===
                      allDepreciations[index - 1]?.PartType ? null : (
                    <option data-tokens="Status1" value={dep.PartType}>
                      {dep.PartType}
                    </option>
                  );
                })}
              </select>
            ),
            imt: (
              <input
                className="form-check-input"
                type="checkbox"
                value={row.imt}
                checked={row.imt}
                disabled={!edit}
                required
                id="terms"
                onChange={(e) => handleImtChange(index, !row.imt, "imt")}
                
                style={{ border: "1px solid black", textAlign:"center" }}
              />
            ),
          };
          temp.push(newRow);
          count = count + 1;
        }
      });
    };
    getData();

    setUpdatedCode(temp);

    setChange(false);
  }, [change, edit, policyType, allRows, changeParts]);

  return (
    <SmartTable
      title=""
      disable={disable}
      ToggleGST={toggleGST}
      data={updatedCode}
      headCells={tableHeaders}
      dep={metalDep}
      handleAddRow={handleAddRow}
      handleRemoveRow={handleRemoveRow}
      editHandler={editHandler}
      updateHandler={onSaveHandler}
      currentType={currentType}
      estimate={totalAssessed}
      vehicleAge={calculateVehicleAge}
      gstToggleHandler={""}
      calculatePolicyAge={calculatePolicyAge}
      assessed={totalEstimate}
      preRender={preRender}
      difference={totalEstimate - totalAssessed}
      calculateDepreciationOnMetal={calculateDepreciationOnMetal}
      edit={edit}
      claim={claim}
      setHide={setHide}
      hide={hide}
      setEdit={setEdit}
      setCurrentType={setCurrentType}
      changeTotalAccordingToPolicyType={changeTotalAccordingToPolicyType}
    />
  );
}
