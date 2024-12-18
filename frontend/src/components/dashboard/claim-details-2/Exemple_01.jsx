import Link from "next/link";
import SmartTable from "./SmartTable_01";
import { useEffect, useState } from "react";
import axios from "axios";
import { file } from "jszip";

const headCells = [
  {
    id: "doc_name",
    numeric: false,
    label: "File Name",
    width: 100,
  },

  {
    id: "file",
    numeric: false,
    label: "File",
    width: 100,
  },
  {
    id: "UploadedBy",
    numeric: false,
    label: "Uploaded By",
    width: 100,
  },
  {
    id: "verified_by",
    numeric: false,
    label: "Verified By",
    width: 100,
  },
  {
    id: "subject",
    numeric: false,
    label: "Action",
    width: 100,
  },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "City",
  //   width: 100,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "State",
  //   width: 100,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Assigned Garage",
  //   width: 100,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Case Age (Days)",
  //   width: 150,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Case Age (Insurer)",
  //   width: 150,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Officer",
  //   width: 100,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Request Type",
  //   width: 100,
  // },
  // {
  //   id: "serial",
  //   numeric: false,
  //   label: "Insurer Claim ID.",
  //   width: 100,
  // },
];

const data = [
  {
    _id: "6144145976c7fe",
    serial_num: "1",
    doc_name: "Driving licence",
    date: "2021-09-17 19:10:50",
    status: "verified",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "2",
    doc_name: "Certificate of registration",
    date: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "3",
    doc_name: "Repair Estimate",
    date: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "4",
    doc_name: "Claim form",
    date: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "5",
    doc_name: "Insurance policy",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "6",
    doc_name: "Damage vehicle photographs/video",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "7",
    doc_name: "Aadhar card",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "8",
    doc_name: "Pan card",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "9",
    doc_name: " Cancel cheque",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "10",
    doc_name: " Satisfaction voucher",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "11",
    doc_name: "Discharge voucher",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "12",
    doc_name: "Dismantle photographs",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "13",
    doc_name: "Reinspection photographs",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "14",
    doc_name: "Repair Invoice",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
  {
    _id: "6144145976c7fe",
    serial_num: "15",
    doc_name: "Payment/cash receipt",
    action: "2021-09-17 19:10:50",
    verify: (
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        required
        id="terms"
        style={{ border: "1px solid black" }}
      />
    ),
  },
];

export default function Exemple({ leadId }) {
  const [allDocs, setAllDocs] = useState([]);

  const [change, setChange] = useState(false);

  const [uploadedData, setUploadedData] = useState([]);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    axios
      .get("/api/getAllUploadByLeadId", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          leadId: leadId,
        },
      })
      .then((res) => {
        console.log("Responseeeeeeeeee",res.data);
        setAllDocs(res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const verifyReport = (reportId) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const payload = {
      reportId: reportId,
      userName: userInfo[0].Username,
    };
    axios
      .post("/api/verifyReportUpload", payload, {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("Successfully updated!");
        setChange(true);
      })
      .catch((err) => {
        alert("Try Again!");
      });
  };

  useEffect(() => {
    const getData = () => {
      const tempData = [];
      allDocs.map((row, index) => {
        console.log(row);
        const updatedRow = {
          doc_name: row.ReportType ? row.ReportType : "Driving Licence",
          file: (
            <a
              href={row?.FilePath}
              target="_blank"
              rel="noopener noreferrer"
              title="View"
            >
              {row.FileName !== "" ? row.FileName : "Driving Licence"}
            </a>
          ),
          UploadedBy: <h4>{row?.AddedDateTime}</h4>,
          verified_by: !row?.IsVerified ? (
            <span style={{ color: "red" }}>Not Verified</span>
          ) : (
            <span style={{ color: "green" }}>{row?.VerifiedBy}</span>
          ),
          subject: row?.IsVerified ? (
            "-"
          ) : (
            <button onClick={() => verifyReport(row.ReportId)}>Verify</button>
          ),
        };
        tempData.push(updatedRow);
      });
      return tempData;
    };

    setChange(false);
    const temp = getData();
    setUploadedData(temp);
  }, [allDocs, change]);

  console.log('uploadedData',uploadedData);

  return (
    <SmartTable
      title="Survey Upload Report"
      data={uploadedData}
      headCells={headCells}
    />
  );
}
