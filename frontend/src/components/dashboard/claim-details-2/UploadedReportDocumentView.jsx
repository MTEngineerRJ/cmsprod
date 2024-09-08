import UploadedReportTabularView from "./UploadedReportTabularView";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import AWS from "aws-sdk";



export default function UploadReportDocumentView({ leadId, documents ,uploadedFiles}) {
  const [alluploadedDocs, setAlluploadedDocs] = useState([]);

  const [canReset,setCanReset] = useState(false);
  const [canUndo,setCanUndo] = useState(false);
  const [temporaryResetData,setTemporaryResetData] = useState([]);
  const [allSequencedDocs, setAllSequencedDocs] = useState([]);
  const [updatedCode, setUpdatedCode] = useState([]);
  const [disable, setDisable] = useState(true);

  const getIfAllSelected = ()=>{
    let isPresentCount = 0;
    alluploadedDocs.map((doc,index)=>{
      if(Number(doc.selected)){
        isPresentCount += 1;
      }
    });
    return isPresentCount === alluploadedDocs.length ;
  }

  const selectAllHandler = (value)=>{
    const selectValue = getIfAllSelected() ? 0 : 1;
    let updatedRows = [];
    alluploadedDocs.map((doc,index)=>{
      let newRow = {
        ...doc,
        selected : selectValue
      };
      updatedRows.push(newRow);
    });
    setAlluploadedDocs(updatedRows);
  }

  const headCells = [
    {
      id: "id",
      numeric: false,
      label: "S. No.",
      width: 10,
    },
    {
      id: "filename",
      numeric: false,
      label: "Document Name",
      width: 120,
    },
    {
      id: "uploadedAt",
      numeric: false,
      label: "Uploaded At",
      width: 150,
    },
    {
      id: "seqNo",
      numeric: false,
      label: "Sequence No.",
      width: 120,
    },
    {
      id: "selected",
      numeric: false,
      label: (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <span>Opt For Selection</span>{" "}
          <span style={{display:"flex",flexDirection:"row"}}><input
              type="checkbox"
              disabled={disable}
              checked={getIfAllSelected()}
              onChange={(e) => selectAllHandler(e.target.value)}
            />
            <span>Select All</span>
            </span>
        </div>
      ),
      width: 50,
    },
  ];

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .get("/api/getPreInspectionImages", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
        },
        params: {
          LeadId: leadId,
        },
      })
      .then((res) => {
        let tempData = [];
        let data = res?.data?.data;
        let resultedData = data;
        // resultedData.sort((a, b) => a.addeddatetime.getTime() - b.addeddatetime.getTime());


        resultedData?.map((doc, index) => {
          let newDoc = {
            id: index + 1,
            fileId: doc.FileID,
            filename: doc.FileName,
            fileurl: doc.FileUrl,
            seqNo: doc.SeqNo,
            selected: doc.IsShow,
            uploadedAt: doc?.uploadedAt ? doc?.uploadedAt : doc?.modified,
            isNewAdded: false,
          };
          tempData.push(newDoc);
        });
        if(tempData.length > 0){
          setCanReset(true);
        }
        setAllSequencedDocs(tempData);
      })
      .catch((err) => {});
  }, [documents,uploadedFiles]);

  useEffect(() => {
    let tempDocs = [...allSequencedDocs];
    let updatedDocs = [];
    documents.map((docLabel, index) => {
      let docData = docLabel?.data;

      if (
        String(docLabel?.docName)
        .toLowerCase()
        .includes("damage vehicle photographs/video") ||
        String(docLabel?.docName)
          .toLowerCase()
          .includes("signature")
      ) {
        docData?.map((doc, idx) => {
          const check = isInsidetheSelectedImage(doc.url);

          if (!check) {
            let newDoc = {
              id: updatedDocs.length + allSequencedDocs.length + 1,
              fileId: "",
              filename: String(doc.url).split("amazonaws.com/")[1],
              fileurl: doc.url,
              seqNo: 0,
              selected: 0,
              uploadedAt: getUplaodedDetails(doc.Timestamp),
              isNewAdded: true,
            };
            tempDocs.push(newDoc);
          }
        });
      }
    });
    setAlluploadedDocs(tempDocs);
  }, [documents, allSequencedDocs]);

  useEffect(() => {
    let reformedData = [];
    alluploadedDocs?.map((doc, idx) => {
      let newDoc = {
        ...doc,
        filename: (
          <a href={decodeURIComponent(doc.fileurl)} key={idx} target="_blank">
            {decodeURIComponent(doc.filename)}
          </a>
        ),
        uploadedAt: formatDateWithWeekday(doc.uploadedAt),
        seqNo: (
          <select
            value={doc.seqNo}
            disabled={disable}
            onChange={(e) => updateRowHandler(idx, "seqNo", e.target.value)}
          >
            <option key={-1}></option>
            {alluploadedDocs.map((doc, index) => {
              return (
                <option
                  disabled={checkAlreadySelectedSequence(index + 1)}
                  key={index}
                >
                  {index + 1}
                </option>
              );
            })}
          </select>
        ),
        selected: (
          <input
            type="checkbox"
            disabled={disable}
            checked={doc.selected }
            onChange={(e) => updateRowHandler(idx, "selected", !doc.selected)}
          />
        ),
      };
      reformedData.push(newDoc);
    });
    setUpdatedCode(reformedData);
  }, [alluploadedDocs, disable]);

  function formatDateWithWeekday(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const weekday = weekdayNames[date.getDay()];
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
    const formattedDate = `${month} ${day}, ${year} (${weekday}) ${hours}:${minutesFormatted} ${ampm}`;

    return formattedDate;
  }



  const makeFieldsEditable = () => {
    setDisable(false);
  };

  const checkAlreadySelectedSequence = (value) => {
    let isPresent = false;
    alluploadedDocs.map((doc, index) => {
      if (Number(doc.seqNo) === Number(value)) {
        isPresent = true;
      }
    });
    return isPresent;
  };

  const downloadAllFiles = async () => {
    try {
      const zip = new JSZip();
      
      for (const doc of alluploadedDocs) {
        const fileName = doc.filename;
        const path = doc.fileurl;
        const response = await fetch(path);
        const blob = await response.blob();
        zip.file(decodeURIComponent(fileName), blob, { binary: true });
      }
  
      const content = await zip.generateAsync({ type: "blob" });
  
      const a = document.createElement("a");
      const url = URL.createObjectURL(content);
      a.href = url;
      a.download = "downloadedFiles.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  
      toast.success("Successfully downloaded the zip!");
    } catch (error) {
      console.log("Error during download:", error);
      toast.error("Error during download. Please try again.");
    }
  };
  


  const updateRowHandler = (id, field, value) => {
    let updatedRows = [];
    alluploadedDocs.map((doc, idx) => {
      let newRow = {};
      if (String(idx) === String(id)) {
        newRow = {
          ...doc,
          seqNo: String(field) === "seqNo" ? value : doc.seqNo,
          selected: String(field) === "selected" ?  value : doc.selected,
        };
      } else {
        newRow = { ...doc };
      }
      updatedRows.push(newRow);
    });
    setAlluploadedDocs(updatedRows);
  };

  const getUplaodedDetails = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      timeZone: "UTC",
      hour12: true,
      timeStyle: "short",
      dateStyle: "medium",
    });
  };

  const isInsidetheSelectedImage = (fileurl) => {
    let isThere = false;
    allSequencedDocs?.map((row, index) => {
      if (String(row.fileurl) === String(fileurl)) {
        isThere = true;
      }
    });
    return isThere;
  };

  const resetSequenceHandler = ()=>{
    let updatedData = [];
    alluploadedDocs.map((doc,index)=>{
      let newDoc = {
        ...doc,
        selected : 0,
        seqNo : 0
      };
      updatedData.push(newDoc);
    });
    setTemporaryResetData(alluploadedDocs);
    setAlluploadedDocs(updatedData);
    setCanReset(false);
    setCanUndo(true);
  }

  const undoHandler = ()=>{
    setAlluploadedDocs(temporaryResetData);
    setCanUndo(false);
  }

  const saveHandler = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let updateData = [],
      newData = [];

    alluploadedDocs.map((doc, index) => {
      if (Number(doc.fileId) > 0 && Number(doc?.selected) === 1) {
        updateData.push(doc);
      } else if ( Number(doc?.selected) === 1) {
        if(!Number(doc.seqNo)){
          toast.error("Please select the desired sequence_No first to Opt the Image for View. ")
        }
        else{
          newData.push(doc);
        }
      }
      else if(Number(doc?.seqNo) > 0 ){
        toast.error("Please select the desired Opt first to decide the sequence Number for the Image. ")
      }
    });
    
    const payload = {
      updateData,
      newData,
      Username : userInfo[0]?.Username
    };
    axios
      .put("/api/updateReportImages", payload, {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
        },
        params: {
          leadId: leadId,
        },
      })
      .then((res) => {
        toast.success("Successfully updated !!");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Caught into Error ! Try Again.", {
          className: "toast-loading-message",
        });
      });
  };

  return (
    <UploadedReportTabularView
      title="Images Documents"
      data={(updatedCode)}
      headCells={headCells}
      disable={disable}
      saveHandler={saveHandler}
      resetSequenceHandler={resetSequenceHandler}
      canReset={canReset}
      canUndo={canUndo}
      undoHandler={undoHandler}
      downloadAllFiles={downloadAllFiles}
      makeFieldsEditable={makeFieldsEditable}
    />
  );
}
