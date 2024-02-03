import Link from "next/link";
import SmartTable_01 from "./SmartTable_01";
import { useEffect, useState } from "react";
import { all } from "axios";

const headCells = [
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
    width: 150,
  },
  {
    id: "description",
    numeric: false,
    label: "Description",
    width: 150,
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
    width: 100,
  },
  {
    id: "assessed",
    numeric: false,
    label: "Assessed",
    width: 100,
  },

  {
    id: "gst",
    numeric: false,
    label: "GST%",
    width: 50,
  },

  // {
  //   id: "total",
  //   numeric: false,
  //   label: "Total Value",
  //   width: 100,
  // },
  // {
  //   id: "type",
  //   numeric: false,
  //   label: "Type",
  //   width: 100,
  // },
];

export default function Exemple_01() {
  const [updatedCode, setUpdatedCode] = useState([]);

  // const []
  const [change, setChange] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [openSave, setOpenSave] = useState(false);
  const [description, setDescription] = useState("Regular");
  const [sac, setSac] = useState(0);
  const [estimate, setEstimate] = useState(0);
  const [assessed, setAssessed] = useState(0);
  const [type, setType] = useState("");
  const [remark, setRemark] = useState("");
  const [currentGst, setCurrentGst] = useState(0);

  const [edit, setEdit] = useState(false);

  const [allRows, setAllRows] = useState(
    Array.from({ length: 2 }, (_, index) => ({
      _id: index + 1,
      sno: index + 1,
      description: "",
      sac: "",
      estimate: "",
      assessed: "",
      bill_sr: index + 123, // Assuming bill_sr increments with each new row
      gst: 0
    }))
  );


  const handleAddRow = () => {
    const newRow = {
      _id: allRows.length, // You may use a more robust ID ge
      description: "",
      sac: "",
      estimate: 0,
      assessed: 0,
      gst: 0
    };

    const old = allRows;
    old.push(newRow);

    setChange(true);
    setAllRows(old);
  };

  const editHandler = () => {
    setEdit(true);
  };

  const updateHandler = () => {
    setEdit(false);
  };

  const handleChange = (index, val, field) => {

    let oldRow = allRows;
    const currentField = allRows[index];
    const len = val.length;

    const description =
      String(field) === "description"
        ? String(currentField.description) === val
          ? val.slice(-1, 1)
          : val
        : currentField.description;
    const sac =
      String(field) === "sac"
        ? String(currentField.sac) === val
          ? val.slice(-1, 1)
          : val
        : currentField.sac;
    const estimate =
      String(field) === "estimate"
        ? String(currentField.estimate) === val
          ? val.slice(-1, 1)
          : val
        : currentField.estimate;
    const assessed =
      String(field) === "assessed"
        ? String(currentField.assessed) === val
          ? val.slice(-1, 1)
          : val
        : currentField.assessed;

    const gst =
      String(field) === "gst"
        ? String(currentField.gst) === val
          ? val.slice(-1, 1)
          : val
        : currentField.gst;

    const newOutput = {
      _id: currentField._id, // You may use a more robust ID generation logic
      sno: currentField.sno,
      description: description,
      sac: sac,
      estimate: estimate,
      assessed: assessed,
      gst: gst
    };

    oldRow[index] = newOutput;
    setAllRows(oldRow);
    // console.log(allRows[index].field);
    setChange(true);
    // console.log(oldRow);
  };
  useEffect(() => {
    let temp = [];
    const getData = () => {
      allRows.map((row, index) => {
        const newRow = {
          _id: index + 1, // You may use a more robust ID generation logic
          sno: index + 1,
          dep: row.dep, // Add default values or leave empty as needed
          description: (
            <select
              style={{ marginTop: "-5px" }}
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              value={row.description}
              disabled={!edit}
              onChange={(e) =>
                handleChange(index, e.target.value, "description")
              }
            >
              <option data-tokens="Status1" value={"Regular"}>
                Regular
              </option>
              <option data-tokens="Status2" value={"Add on Policy"}>
                Add on Policy
              </option>
              <option
                data-tokens="Status3"
                value={"Add on Policy(Not Effective)"}
              >
                Add on Policy(Not Effective)
              </option>
            </select>
          ),
          job_type: (
            <select
              style={{ marginTop: "-5px" }}
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              value={row.description}
              disabled={!edit}
              onChange={(e) =>
                handleChange(index, e.target.value, "description")
              }
            >
              <option data-tokens="Status1" value={"Non-Paint"}>
                Non-Paint
              </option>
              <option data-tokens="Status2" value={"Paint"}>
                Paint
              </option>
            </select>
          ),
          sac: (
            <input
              className="form-control"
              type="text"
              value={row.sac}
              onChange={(e) => handleChange(index, e.target.value, "sac")}
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
              onChange={(e) => handleChange(index, e.target.value, "estimate")}
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
              onChange={(e) => handleChange(index, e.target.value, "assessed")}
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
                onChange={(e) => handleChange(index, currentGst+1, "gst")}
                id="remeberMe"
              />
            </div>
          )
        };
        temp.push(newRow);
      });
    };
    getData();
    setUpdatedCode(temp);
    setChange(false);
  }, [change, edit]);

  return (
    <SmartTable_01
      title=""
      data={updatedCode}
      headCells={headCells}
      handleAddRow={handleAddRow}
      editHandler={editHandler}
      updateHandler={updateHandler}
      edit={edit}
    />
  );
}
