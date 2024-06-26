import SmartTable from "./SmartTable";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
const myBucket = new AWS.S3({ params: { Bucket: S3_BUCKET }, region: REGION });

const headCells = [
  {
    id: "serial_num",
    numeric: false,
    label: "S. No.",
    width: 10,
  },
  {
    id: "doc_name",
    numeric: false,
    label: "Document Name",
    width: 120,
  },
  {
    id: "date",
    numeric: false,
    label: "Uploaded On",
    width: 120,
  },
  // {
  //   id: "status",
  //   numeric: false,
  //   label: "Status",
  //   width: 120,
  // },
  {
    id: "file",
    numeric: false,
    label: "File",
    width: 150,
  },
  {
    id: "action",
    numeric: false,
    label: "Action",
    width: 50,
  },
];

let LabelData = [
  {
    _id: "6144145976c7fe",
    serial_num: "1",
    doc_name: "Driving licence",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "2",
    doc_name: "Certificate of registration",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "3",
    doc_name: "Repair Estimate",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "4",
    doc_name: "Claim form",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "5",
    doc_name: "Insurance policy",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "6",
    doc_name: "Damage vehicle photographs/video",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "7",
    doc_name: "Aadhar card",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "8",
    doc_name: "Pan card",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "9",
    doc_name: " Cancel cheque",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "10",
    doc_name: " Satisfaction voucher",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "11",
    doc_name: "Discharge voucher",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "12",
    doc_name: "Dismantle photographs",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "13",
    doc_name: "Reinspection photographs",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "14",
    doc_name: "Repair Invoice",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "15",
    doc_name: "Payment/cash receipt",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "16",
    doc_name: "Images",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "17",
    doc_name: "Videos",
  },
];

export default function Exemple({ finalDisable, documents, leadId }) {
  const [updatedCode, setUpdatedCode] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [data, setData] = useState(LabelData);
  const [disable, setDisable] = useState(false);

  const [isAdded, setIsAdded] = useState(false);

  const [newLabel, setNewLabel] = useState("");

  const [currentDoc, setCurrentDoc] = useState("");

  const [changes, setChanges] = useState(false);

  const [loc, setLoc] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setUploadedFiles(documents);
  }, [documents]);

  useEffect(() => {
    axios
      .get("/api/getDocumentListLabels", {
        params: {
          leadId: leadId,
        },
      })
      .then((res) => {
        const tempAllDocsLabel = res.data.data.results;
        const allLabelCount = LabelData.length;
        let newAddOnLabels = [];

        LabelData.map((data, index) => {
          newAddOnLabels.push(data);
        });

        tempAllDocsLabel.map((doc, index) => {
          const newLabel = {
            _id: allLabelCount + 1,
            serial_num: allLabelCount + 1,
            doc_name: doc.DocumentName,
          };
          newAddOnLabels.push(newLabel);
        });

        setData(newAddOnLabels);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [documents]);

  const checkValue = (label) => {
    let requiredInfo = [];
    documents.map((doc, index) => {
      if (String(doc.DocumentName) === String(label)) {
        if (doc.Photo1 !== "") {
          requiredInfo.push({
            name: doc.Attribute1,
            url: doc.Photo1,
          });
        }
        if (doc.Photo2 !== "") {
          requiredInfo.push({
            name: doc.Attribute2,
            url: doc.Photo2,
          });
        }
        if (doc.Photo3 !== "") {
          requiredInfo.push({
            name: doc.Attribute3,
            url: doc.Photo3,
          });
        }
        if (doc.Photo4 !== "") {
          requiredInfo.push({
            name: doc.Attribute4,
            url: doc.Photo4,
          });
        }
        if (doc.Photo5 !== "") {
          requiredInfo.push({
            name: doc.Attribute5,
            url: doc.Photo5,
          });
        }
      }
    });
  };

  const getAllLabelLinks = (docName) => {
    let requiredLinks = [];
    uploadedFiles.map((file, index) => {
      if (String(docName) === String(file.docName)) {
        requiredLinks = file.data;
      }
    });
    return requiredLinks;
  };

  const getIndex = (docName, fileData) => {
    let index = -1;

    fileData.map((file, idx) => {
      if (String(docName) === String(file.docName)) {
        index = idx;
      }
    });

    return index;
  };

  function getFileNameFromUrl(url) {
    // Create a URL object
    const urlObject = new URL(url);

    // Get the pathname (e.g., '/invoice.pdf')
    const pathname = urlObject.pathname;

    // Split the pathname using '/' and get the last part (filename)
    const parts = pathname.split("/");
    const filename = parts[parts.length - 1];

    return filename;
  }

  const location = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLoc(latitude + "," + longitude);
          // You can use the latitude and longitude here as needed
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  location();

  const addNewLabel = () => {
    const paylaod = {
      leadId: leadId,
      DocumentName: newLabel,
    };

    toast.loading("Adding new Document Label!");
    axios
      .post("/api/addDocumentLabel", paylaod)
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully added the document !!", {
          // position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-loading-message",
        });
        window.location.reload();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Caught into Error ! Try Again.", {
          className: "toast-loading-message",
        });
      });
  };

  let docCurrentName = "Driving license";
  useEffect(() => {
    setCurrentDoc(docCurrentName);
  }, [docCurrentName]);

  function formatFilename(filename, leadId, extension) {
    // Split the filename into base and extension parts
    var parts = filename.split(".");
    var base = parts.slice(0, -1).join(".");
    var ext = parts[parts.length - 1];

    // Concatenate the base filename, leadId, and extension with underscores
    var formattedFilename = filename + "_" + leadId + "." + extension;

    return formattedFilename;
  }
  function getNameAndExtension(filename) {
    // Split the filename into base and extension parts
    var parts = filename?.split(".");

    // Extract the name and extension
    var name = parts.slice(0, -1).join(".");
    var extension = parts[parts.length - 1];

    // Return an object containing the name and extension
    return {
      name: name,
      extension: extension,
    };
  }

  const handleFileInputChange = async (e, idx, docs) => {
    location();

    setDisable(true);

    const selectedFileCurrent = e.target.files[idx];
    const { name, extension } = getNameAndExtension(selectedFileCurrent.name);
    const url = window.location.href;
    const LeadId = url.split("claim-details?leadId=")[1];

    const formattedName = formatFilename(name, LeadId, extension);
    const params = {
      ACL: "public-read",
      Body: selectedFileCurrent,
      Bucket: S3_BUCKET,
      Key: formattedName,
      ContentType: "image/jpeg",
      ContentDisposition: "inline",
    };

    myBucket.putObject(params).send((err, data) => {
      if (err) {
        toast.error("Error while uploading!!");
      } else {
        const S3_URL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(
          formattedName
        )}`;

        const payloadMain = {
          leadId: leadId,
          docName: docCurrentName,
          data: [
            {
              name: selectedFileCurrent.name,
              url: S3_URL,
              Timestamp: new Date(),
              Location: loc,
            },
          ],
        };

        toast.loading("Uploading files!!", {
          className: "toast-loading-message",
        });
        axios
          .post("/api/uploadManualDocument", payloadMain, {
            headers: {
              Authorization: `Bearer ${""}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            toast.dismiss();
            toast.success("Successfully updated !", {
              className: "toast-loading-message",
            });
            let oldFiles = uploadedFiles;

            const index = getIndex(docCurrentName, oldFiles);
            const currentTimeStamp = new Date();

            if (index !== -1) {
              const oldFile = oldFiles[index];
              const oldData = oldFile.data;
              oldData.push({
                name: selectedFileCurrent.name,
                url: S3_URL,
                Timestamp: currentTimeStamp,
                Location: loc,
              });
              const newUpload = {
                leadId: leadId,
                docName: docCurrentName,
                data: oldData,
              };
              oldFiles[index] = newUpload;
              setChanges(true);
              setUploadedFiles(oldFiles);
            } else {
              let newData = [];
              newData.push({
                name: selectedFileCurrent.name,
                url: S3_URL,
                Timestamp: currentTimeStamp,
                Location: loc,
              });
              const newUpload = {
                leadId: leadId,
                docName: docCurrentName,
                data: newData,
              };
              const oldFiles = uploadedFiles;
              oldFiles.push(newUpload);
              console.log(oldFiles);
              setChanges(true);
              setUploadedFiles(oldFiles);
            }
          })
          .catch((err) => {
            toast.dismiss();
            toast.error("Try Again!!");
          });
      }
    });

    setDisable(false);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleButtonClick = (doc_name) => {
    setDisable(true);
    console.log(doc_name);
    docCurrentName = doc_name;
    // Trigger file input click when button is clicked
    document.getElementById("fileInput").click();
  };

  const getFileName = (idx) => {
    let currentIndex = "";
    selectedFile.map((file, index) => {
      if (file?.index === idx) {
        currentIndex = file?.file;
      }
    });
    return currentIndex;
  };

  const types = [
    { name: "Driving licence" },
    { name: "Certificate of registration" },
    { name: "Repair Estimate" },
    { name: "Claim form" },
    { name: "Insurance policy" },
    { name: "Damage vehicle photographs/video" },
    { name: "Aadhar card" },
    { name: "Pan card" },
    { name: "Cancel cheque" },
    { name: "Satisfaction voucher" },
    { name: "Discharge voucher" },
    { name: "Dismantle photographs" },
    { name: "Reinspection photographs" },
    { name: "Repair Invoice" },
    { name: "Payment/cash receipt" },
  ];

  const onSubmitHandler = () => {
    setDisable(true);

    const tempArray = [];
    uploadedFiles.map((file, index) => {
      const data = file.data;

      const uploadData = [];
      data?.map((temp, idx) => {
        if (temp?.upload && temp.upload === true) {
          uploadData.push({
            name: temp.name,
            url: temp.url,
            Timestamp: temp.Timestamp,
            Location: temp.Location,
          });
        }
      });

      if (uploadData.length > 0) {
        tempArray.push({
          leadId: file.leadId,
          docName: file.docName,
          data: uploadData,
        });
      }
    });

    if (tempArray.length <= 0) {
      toast.error("No Data to be uploaded!!");
    } else {
      const payload = JSON.stringify({ data: tempArray });

      toast.loading("Uploading files!!", {
        // position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-loading-message",
      });
      axios
        .post("/api/uploadDocument", payload, {
          headers: {
            Authorization: `Bearer ${""}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.dismiss();
          toast.success("Successfully updated !", {
            // position: toast.POSITION.BOTTOM_LEFT,
            className: "toast-loading-message",
          });
          window.location.reload();
        })
        .catch((err) => {
          // isNotValidLink(true);
          toast.dismiss();
          toast.error("Try Again!!");
        });
    }
    setDisable(false);
  };

  const downloadAllFiles = async () => {
    toast.loading("Downloading the zip. Please Wait !!", {
      className: "toast-loading-message",
    });
    try {
      const zip = new JSZip();

      // Iterate through uploadedFiles
      for (const file of uploadedFiles) {
        const data = file.data;

        // Iterate through data array
        if (file.data) {
          for (const docFile of data) {
            const fileName = docFile.name;
            const path = docFile.url;

            // Fetch the image content
            const response = await fetch(path);
            const blob = await response.blob();

            // Add the image to the zip file
            zip.file(decodeURIComponent(fileName), blob, { binary: true });
          }
        }
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
      toast.dismiss();
      toast.success("Successfully downloaded the zip!", {
        className: "toast-loading-message",
      });
    } catch (error) {
      console.log("Error during download:", error);
      toast.dismiss();
      toast.error("Error during download. Please try again.", {
        className: "toast-loading-message",
      });
    }
  };

  let tempCode = [];
  useEffect(() => {
    setChanges(false);
    data.map((docs, index) => {
      const allInfo = getAllLabelLinks(docs.doc_name);
      const fileName = getFileName(index);

      const alllinks = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {allInfo?.map((info, idx) => (
            <a href={decodeURIComponent(info.url)} key={idx} target="_blank">
              {info.name}
            </a>
          ))}
        </div>
      );

      const temp = {
        _id: docs._id,
        serial_num: docs.serial_num,
        doc_name: docs.doc_name,
        file: alllinks,
        action: (
          <>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => handleFileInputChange(e, index, docs.doc_name)}
            ></input>
            <button
              disabled={finalDisable}
              className="btn btn-thm"
              onClick={() => handleButtonClick(docs.doc_name)}
            >
              <FaUpload />
            </button>
            <p>
              {fileName ? `Selected File: ${fileName?.name}` : "Choose File"}
            </p>
          </>
        ),
        verify: docs.verify,
      };

      tempCode.push(temp);
    });
    // data = tempCode;
    setUpdatedCode(tempCode);
  }, [documents, uploadedFiles, changes]);

  return (
    <SmartTable
      title="Customer Documents"
      data={updatedCode}
      headCells={headCells}
      disable={disable}
      downloadAllFiles={downloadAllFiles}
      onSubmitHandler={onSubmitHandler}
      addNewLabel={addNewLabel}
      setNewLabel={setNewLabel}
      closeModal={closeModal}
      openModal={openModal}
      isModalOpen={isModalOpen}
    />
  );
}
