import Link from "next/link";
import SmartTable from "./SmartTable";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import Select from "react-select";

const headCells = [
  {
    id: "row",
    numeric: false,
    label: "",
    width: 10,
  },
  ,
  {
    id: "sno",
    numeric: false,
    label: "#",
    width: 10,
  },
  {
    id: "part",
    numeric: false,
    label: "Vehicle Parts",
    width: 300,
  },

  {
    id: "state",
    numeric: false,
    label: "State",
    width: 120,
  },
];

export default function Exemple_01({
  partsData,
  partsState,
  specificVehicleParts,
  vehicleType,
  leadId,
}) {
  const [allRows, setAllRows] = useState(partsData);
  const [updatedCode, setUpdatedCode] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if(specificVehicleParts?.length > 0){
      setAllRows([...specificVehicleParts]);
    }
    else{
      setAllRows(partsData);
    }
   
  }, [partsData]);
  useEffect(() => {
    let temp = [];

    let count = 1;

    const getData = () => {
      allRows.map((row, index) => {
        const newRow = {
          row: (
            <button
              className="flaticon-minus"
              onClick={() => handleRemoveRow(row.id)}
            ></button>
          ),
          sno: index + 1,
          part: (
            <input
              className="form-control  form-control-table p-1"
              type="text"
              disabled={!edit}
              value={`${row.part}`}
              required
              onChange={(e) => onFeildChangeHandler(e.target.value, index + 1,"part")}
              id="terms"
              style={{ border: "1px solid black" }}
            />
          ),
          state: (
            <select
              disabled={!edit}
              style={{ marginTop: "-5px" }}
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              value={row.state}
              onChange={(e) => onFeildChangeHandler(e.target.value, index + 1,"state")}
            >
              <option key={index} data-tokens="Status1" value={""}></option>
              {partsState.map((state, index) => {
                return (
                  <option key={index} data-tokens="Status1" value={state.State}>
                    {state.State}
                  </option>
                );
              })}
            </select>
          ),
        };
        if(row.isActive){
          temp.push(newRow);
        }
        
      });
    };
    getData();

    setUpdatedCode(temp);
  }, [allRows,partsData,partsState, edit]);

  const editHandler = () => {
    setEdit(true);
  };

  const handleAddRow = () => {
    let updatedRows = [...allRows];
    let newRow = {
      id: updatedRows.length + 1,
      part: "",
      state: "",
      isActive: true,
      partId: 0,
    };

    updatedRows.push(newRow);

    setAllRows(updatedRows);
  };

  const handleRemoveRow = (id) => {

    let updatedRow = [];
    allRows.map((row,index)=>{
      if(String(row.id) !== String(id)){
        updatedRow.push({...row});
      }
      else{
        updatedRow.push({
          ...row,
          isActive : false
        })
      }
    });
    setAllRows(updatedRow);
  };

  const saveHandler = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setEdit(false);
    let updatedRows = [];
    allRows.map((row, index) => {
      let newRow = {
        PartName: row.part,
        PartState: row.state,
        VehicleType: vehicleType,
        PartID : row.partId,
        isActive : row.isActive,
        Username: userInfo[0].Username,
      };
      updatedRows.push(newRow);
    });
    toast.loading("Updating the parts details .");
    axios
      .put("/api/updatePreinspectionParts", updatedRows, {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
        },
        params: {
          leadId,
        },
      })
      .then((res) => {
        toast.success("Updated successfully !!");
        window.location.reload();
        toast.dismiss();
      })
      .catch((err) => {
        toast.error("Try Again !!");
        toast.dismiss();
      });
  };

  const onFeildChangeHandler = (value, id,field) => {
    let updatedRows = [];
    allRows.map((row, index) => {
      let updatedRow = {};

      if (String(row.id) === String(id)) {
        updatedRow = {
          ...row,
          state: String(field) === "state" ? value : row.state,
          part : String(field) === "part" ? value : row.part,
        };
      } else {
        updatedRow = {
          ...row,
        };
      }
      updatedRows.push(updatedRow);
    });
    setAllRows(updatedRows);
  };

  return (
    <SmartTable
      title=""
      data={updatedCode}
      headCells={headCells}
      handleAddRow={handleAddRow}
      editHandler={editHandler}
      edit={edit}
      saveHandler={saveHandler}
    />
  );
}
