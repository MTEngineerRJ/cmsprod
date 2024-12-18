import SmartTable from "./SmartTable_01";
import { useEffect, useState } from "react";
import axios from "axios";
import { uploadReportTableHeaders } from "./DataHeaders";

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

  return (
    <SmartTable
      title="Survey Upload Report"
      data={uploadedData}
      headCells={uploadReportTableHeaders}
    />
  );
}
