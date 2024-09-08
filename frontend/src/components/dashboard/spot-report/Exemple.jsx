import SmartTable from "./SmartTable";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { getMonthsDifference, getDescriptionData } from "./functions";
import { allDefaultDamagesRows } from "./utils/getDamagesRows";
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
    id: "heading",
    numeric: false,
    label: "Headings",
    width: 120,
  },
  {
    id: "description",
    numeric: false,
    label: "Description",
    width: 250,
  },
  {
    id: "dropdown",
    numeric: false,
    label: "",
    width: 120,
  },
];

export default function Exemple_01({
  claim,
  AccidentAddedDateTime,
  DateRegistration,
  LeadId,
}) {
  const [updatedCode, setUpdatedCode] = useState([]);
  const [change, setChange] = useState(false);
  const [updatedSNO, setUpdatedSNO] = useState(0);
  const [hide, setHide] = useState(false);
  const [allRows, setAllRows] = useState(allDefaultDamagesRows);
  const [changeParts, setChangeParts] = useState(false);
  const [edit, setEdit] = useState(false);
  const [damagesType, setDamagesType] = useState([]);

  const [defaultStoredInfo, setDefaultStoredInfo] = useState(false);
  const handleAddRow = () => {
    const newRow = {
      _id: allRows.length,
      sno: "",
      heading: "",
      description: "",
      isSelected: false,
      isActive: true,
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

  const handleRemoveRow = (index) => {
    let updatedRowsss = [];
    allRows.filter((row, i) => {
      const active = String(row.sno) === String(index) ? 0 : row.isActive;
      const newRow = {
        sno: row.sno,
        heading: row.heading,
        description: row.description,
        isSelected: false,
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

  const focusInputsHandler = (id) => {
    let updatedRows = [];
    allRows.map((row, index) => {
      let updatedRow = {};
      if (String(row.id) === String(id)) {
        updatedRow = {
          ...row,
          isSelected: true,
        };
      } else {
        updatedRow = {
          ...row,
          isSelected: false,
        };
      }
      updatedRows.push(updatedRow);
    });
    setAllRows(updatedRows);
  };

  const onFeildChangeHandler = (value, id, field) => {
    let updatedRows = [];
    allRows.map((row, index) => {
      let updatedRow = {};
      const desp = getDescriptionData(row, field, value);
      if (String(row.id) === String(id)) {
        updatedRow = {
          ...row,
          heading: String(field) === "heading" ? value : row.heading,
          description: desp,
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

  const convertToCSV = (array) => {};

  const saveHandler = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let updatedRows = [];

    allRows?.map((row, index) => {
      let dropdownArray = row.dropdown;
      let updatedRow = {
        ...row,
        dropdown: dropdownArray.join(","),
        Username: userInfo[0]?.Username,
      };
      updatedRows.push(updatedRow);
    });
    const payload = {
      LeadId,
      allRows: JSON.stringify(updatedRows),
    };
    toast.loading("Updating the Damages Parts.");
    axios
      .put("/api/updateSpotDamageParts", payload, {
        headers: {
          Authorization: `Bearer ${userInfo[0]?.Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: LeadId,
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully updated!!");
        window.location.reload();
      })
      .catch((Err) => {
        toast.dismiss();
        toast.error(Err);
      });
  };

  const sortArray = (array) => {
    return array.sort()
  }

  useEffect(() => {
    const mainUrl = window.location.href;
    const leadID = mainUrl.split("/spot-report/")[1];
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .get("/api/getAllDamageParts", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
        },
        params: {
          LeadId: leadID,
        },
      })
      .then((res) => {
        const tempData = res?.data?.userData;
        let updatedRows = [];
        tempData?.map((data, index) => {
          let row = {
            id: index + 1,
            sno: data?.ReportID,
            heading: data?.Headings,
            description: data?.PartDescription,
            dropdown: String(data.dropdown).split(","),
            isActive: true,
            isSelected: false,
          };
          updatedRows.push(row);
        });
        setAllRows([...updatedRows]);
        setDefaultStoredInfo(true);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    setDefaultStoredInfo(false);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .get("/api/getAllDamagePartsType", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
        },
      })
      .then((res) => {
        const tempData = res.data.data;
        let updatedData = [];
        tempData.map((data, index) => {
          const newRow = {
            id: index + 1,
            sno: "",
            heading: data.category,
            description: "",
            isActive: true,
            isSelected: false,
            dropdown: String(data.parts_details).split(","),
          };
          updatedData.push(newRow);
        });
        if (allRows.length === 0) {
          setAllRows(updatedData);
        }
      })
      .catch((err) => {});
  }, [defaultStoredInfo]);

  useEffect(() => {
    let temp = [];
    let count = 1;
    const getData = () => {
      allRows.map((row, index) => {
        const customStyle = row.isSelected ? { height: "60px" } : {};
        if (Number(row.isActive) === 1) {
          const newRow = {
            _id: row.id,
            row: (
              <button
                disabled={edit}
                className="flaticon-minus"
                onClick={() => handleRemoveRow(row.id)}
              ></button>
            ),
            sno: index + 1,
            heading: (
              <input
                disabled={!edit}
                className={
                  row.isSelected
                    ? "form-control form-control-table p-1"
                    : "form-control form-control-table p-1"
                }
                type="text"
                value={`${row.heading}`}
                onFocus={() => focusInputsHandler(row.id)}
                onChange={(e) =>
                  onFeildChangeHandler(e.target.value, row.id, "heading")
                }
                required
                id="terms"
                style={{ border: "1px solid black", ...customStyle }}
              />
            ),
            description: (
              <textarea
                disabled={!edit}
                className={
                  row.isSelected
                    ? "form-control form-control-table p-1 focused"
                    : "form-control form-control-table p-1"
                }
                type="text"
                onFocus={() => focusInputsHandler(row.id)}
                value={`${row.description}`}
                onChange={(e) =>
                  onFeildChangeHandler(e.target.value, row.id, "description")
                }
                required
                id="terms"
                style={{ border: "1px solid black", ...customStyle }}
              ></textarea>
            ),
            dropdown: row.isSelected ? (
              <select
                disabled={!edit}
                style={{ marginTop: "", border:"1px solid black" }}
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                onChange={(e) =>
                  onFeildChangeHandler(e.target.value, row.id, "dropdown")
                }
              >
                <option data-tokens="Status2" value={""}></option>
                {sortArray(row.dropdown)?.map((type, index) => {
                  return (
                    <option key={index} data-tokens="Status2" value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            ) : (
              ""
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
  }, [change, edit, allRows]);

  return (
    <SmartTable
      title=""
      disable={!edit}
      data={updatedCode}
      headCells={headCells}
      vehicleAge={calculateVehicleAge}
      handleAddRow={handleAddRow}
      edit={edit}
      saveHandler={saveHandler}
      editHandler={editHandler}
      setHide={setHide}
      claim={claim}
    />
  );
}
