import Link from "next/link";
import SmartTable_01 from "./SmartTable_01";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { SERVER_DIRECTORY } from "next/dist/shared/lib/constants";
import { ro } from "date-fns/locale";
import { getExpandedData } from "./extractFunction";

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
    id: "bill_sr",
    numeric: false,
    label: "Bill Sr.",
    width: 50,
  },
  {
    id: "job_type",
    numeric: false,
    label: "Job Type",
    width: 100,
  },
  {
    id: "description",
    numeric: false,
    label: "Description",
    width: 290,
  },
  {
    id: "sac",
    numeric: false,
    label: "SAC",
    width: 50,
  },

  {
    id: "estimate",
    numeric: false,
    label: "Estimate",
    width: 80,
  },
  {
    id: "assessed",
    numeric: false,
    label: "Assessed",
    width: 20,
  },

  {
    id: "gst",
    numeric: false,
    label: "GST%",
    width: 50,
  },
];

export default function Exemple_01({
  currentGst,
  setTotalAssessed,
  totalAssessed,
  totalEstimate,
  setTotalEstimate,
  claim,
  disable,
  taxAmount,
  setCurrentGST,
  allRows,
  setAllRows,
  setTaxAmount,
  toggleEstimate,
  setToggleEstimate,
  reload,
  setReload,
  setAllLabour,
  toggleLabor,
  setToggleLabor,

  ageOfVehicleTotal,
  metaldepPct,
  totalPartsEstimate,
  totalLabrorEstimate,
  totalPartsAssessed,
  totalLabrorAssessed,

  setTotalPartsEstimate,
  setTotalLabrorEstimate,
  setTotalPartsAssessed,
  setTotalLabrorAssessed,
}) {
  const [updatedCode, setUpdatedCode] = useState([]);

  // const []

  const [lastIndex, setLastIndex] = useState(1000);

  const [change, setChange] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [openSave, setOpenSave] = useState(false);
  const [description, setDescription] = useState("");
  const [sac, setSac] = useState(0);
  const [estimate, setEstimate] = useState(0);
  const [assessed, setAssessed] = useState(0);
  const [type, setType] = useState("");
  const [remark, setRemark] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const LeadID = window.location.pathname.split("/final-report/")[1];

    axios
      .get("/api/getLabrorer", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: LeadID,
        },
      })
      .then((res) => {
        console.log(res);

        // setNewParts(res.data.userData);
        let newPart = res.data.userData;
        
        let temp_row = [];
        let gst_pct = 0;
        newPart.map((part, index) => {
          if (String(part.LeadId) === String(LeadID)) {
            gst_pct = part.GSTPercentage;
            const temp = {
              description: part.Description,
              sac: part.SAC,
              estimate: part.Estimate,
              assessed: part.Assessed,
              bill_sr: part.BillSr,
              gst: part.IsGSTIncluded ? part.IsGSTIncluded : 0,
              type: part.JobType,
              sno: part.SNO,
              isActive: Number(part.IsActive),
            };
            temp_row.push(temp);
            setLastIndex(part.ReportID);
          }
        });
        setAllLabour(temp_row)

        setCurrentGST(Number(gst_pct) !== 0 ? Number(gst_pct) : 18 );
        setAllRows(temp_row);
        setChange(true);
      })
      .catch((Err) => {
        alert(Err);
      });
  }, []);

  
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


  const handleAddRow = () => {
    const newRow = {
      _id: allRows.length,
      sno: generateSnoId(), // You may use a more robust ID ge
      description: "",
      sac: "",
      estimate: "",
      assessed: "",
      bill_sr: "",
      gst: 0,
      type: 0,
      gstPct: currentGst,
      isActive: 1,
    };

    const old = allRows;
    old.push(newRow);
    setLastIndex(lastIndex + 1);
    setChange(true);
    setAllRows(old);
  };

  const editHandler = () => {
    setEdit(true);
  };

  const updateHandler = () => {
    setEdit(false);
  };

  const handleRemoveRow = (index) => {
    console.log(allRows);

    let updatedRowsss = [];
    allRows.filter((row, i) => {
      console.log(row.sno, index);
      const active = String(row.sno) === String(index) ? 0 : row.isActive;
      const newRow = {
        sno: row.sno, // Add default values or leave empty as needed
        description: row.description,
        sac: row.sac,
        estimate: row.estimate,
        assessed: row.assessed,
        bill_sr: row.bill_sr, // Assuming bill_sr increments with each new row
        gst: row.gst,
        gstPct: row.gstPct,
        type: row.type,
        isActive: Number(active),
      };

      updatedRowsss.push(newRow);
    });

    console.log(updatedRowsss, index);
    setAllRows(updatedRowsss);
    setChange(true);
  };

  const onSaveHandler = () => {
    const LeadID = window.location.pathname.split("/final-report/")[1];
    // console.log(LeadID)

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    let temp = [];
    allRows.map((row, index) => {
      const row2 = {
        sno: row.sno,
        description: row.description,
        assessed: row.assessed,
        estimate: row.estimate,
        sac: row.sac,
        gst: row.gst,
        type: Number(row.type),
        bill_sr: row.bill_sr,
        isActive: row.isActive,
      };
      temp.push(row2);
    });

    const payload = {
      gstPct: currentGst,
      allRows: JSON.stringify(temp),
    };

    axios
      .put("/api/updateLabrorer", payload, {
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
  };

  const [hide,setHide] = useState(false)
  const sliceVal = (val) => {
    return val.slice(-1, 1);
  };

  const returnValue = (row, type) => {
    if (String(type) === "sac") return row.sac;
    if (String(type) === "bill_sr") return row.sac;
    if (String(type) === "description") return row.sac;
    if (String(type) === "assessed") return row.sac;
    if (String(type) === "estimate") return row.sac;
  };

  const sortNewParts = () => {
    let sortedArray = allRows;
    sortedArray.sort((a, b) => a.sno - b.sno);
    return sortedArray;
  };

  const handleDescriptionChange = (index,value,field)=>{
    let updatedRows = [];
    allRows.map((row,idx)=>{
      if(String(index) === String(idx)){
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

  useEffect(() => {
    let temp = [];
    if (allRows) {
      const getData = () => {
        let count = 1;
        const sortedOne = sortNewParts();

        sortedOne.map((row, index) => {
          if (Number(row.isActive) === 1) {
            const newRow = {
              _id: index + 1, // You may use a more robust ID generation logic
              row: (
                <button
                  className="flaticon-minus"
                  onClick={() => handleRemoveRow(row.sno)}
                ></button>
              ),
              sno: count,
              dep: row.dep,
              bill_sr: (
                <input
                  className="form-control"
                  type="text"
                  placeholder="Bill Serial No"
                  value={row.bill_sr}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value, "bill_sr")
                  }
                  required
                  disabled={!edit}
                  id="terms"
                  style={{ border: "1px solid black" }}
                />
              ),
              description: (
                <input
                  className="form-control"
                  type="text"
                  placeholder="job description"
                  value={row.description}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value, "description")
                  }
                  required
                  disabled={!edit}
                  id="terms"
                  style={{ border: "1px solid black" }}
                />
              ),
              job_type: (
                <select
                  style={{ marginTop: "-5px" }}
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={row.type}
                  disabled={!edit}
                  onChange={(e) => handleDescriptionChange(index, e.target.value, "type")}
                >
                  <option data-tokens="Status1" value={0}>
                    Non-Paint
                  </option>
                  <option data-tokens="Status2" value={1}>
                    Paint
                  </option>
                </select>
              ),
              sac: (
                <input
                  className="form-control"
                  type="text"
                  value={row.sac}
                  onChange={(e) => handleDescriptionChange(index, e.target.value, "sac")}
                  required
                  disabled={!edit}
                  id="terms"
                  style={{ border: "1px solid black" }}
                />
              ),
              estimate: (
                <input
                  className="form-control"
                  type="text"
                  value={row.estimate}
                  disabled={!edit}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value, "estimate")
                  }
                  required
                  id="terms"
                  style={{ border: "1px solid black" }}
                />
              ),
              assessed: (
                <input
                  className="form-control"
                  type="text"
                  value={row.assessed}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value, "assessed")
                  }
                  required
                  disabled={!edit}
                  id="terms"
                  style={{ border: "1px solid black" }}
                />
              ),
              gst: (
                <div className="col-lg-12 text-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={row.gst}
                    checked={row.gst % 2 !== 0}
                    onChange={(e) => handleDescriptionChange(index, row.gst + 1, "gst")}
                    id="remeberMe"
                  />
                </div>
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
    }
  }, [change, edit, allRows]);

  return (
    <SmartTable_01
      title=""
      data={updatedCode}
      headCells={headCells}
      setToggleEstimate={setToggleEstimate}
      toggleEstimate={toggleEstimate}
      totalAssessed={totalAssessed}
      taxAmount={taxAmount}
      totalEstimate={totalEstimate}
      handleAddRow={handleAddRow}
      editHandler={editHandler}
      allDepreciations
      claim={claim}
      disable={disable}
      updateHandler={onSaveHandler}
      edit={edit}
      setEdit={setEdit}
      hide={hide}
      setHide={setHide}
    />
  );
}
