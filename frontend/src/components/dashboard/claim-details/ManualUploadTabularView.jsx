import SmartTable from "./SmartTable";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import AWS from "aws-sdk";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Upload, RefreshCw, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
    id: "file",
    numeric: false,
    label: "File",
    width: 120,
  },
  {
    id: "date",
    numeric: false,
    label: "Uploaded On",
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

  const [predictionResults, setPredictionResults] = useState([]);
  console.log("predictionResults: ", predictionResults);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [damageFiles, setDamageFiles] = useState([]);
  const [classifiedDamages, setClassifiedDamages] = useState([]); // New state to store damage classification
  const [error, setError] = useState("");

  // Mapping of numeric values to their respective damage classifications
  const damageLabels = {
    0: "Damaged",
    1: "Dent",
    2: "Scratch",
    3: "Not Damaged",
    4: "Not Damaged ",
  };

  const handleDamageFileUploadAndPredict = async () => {
    if (damageFiles.length === 0) {
      toast.error("Please select at least one file!");
      return;
    }

    const formData = new FormData();
    damageFiles.forEach((file) => formData.append("files", file));

    try {
      toast.loading("Predicting damage...", {
        className: "toast-loading-message",
      });

      const response = await fetch("http://4.240.96.14:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch predictions: ${errorMessage}`);
      }

      const data = await response.json();
      setPredictionResults(data.results);
      console.log("data.results: ", data.results);
      sessionStorage.setItem("predictionResults", JSON.stringify(data.results));

      toast.dismiss();
      toast.success("Prediction completed!");
      setShowPredictionModal(true);
    } catch (error) {
      console.error("Error:", error);
      toast.dismiss();
      toast.error(`An error occurred: ${error.message}`);
    }
  };
  useEffect(() => {
    // Analyze and store the classified damages whenever prediction results are updated
    const newClassifiedDamages = [];

    predictionResults.forEach((result) => {
      Object.entries(result.damage_classification).forEach(
        ([part, severity]) => {
          if ([0, 1, 2].includes(severity)) {
            newClassifiedDamages.push({
              part,
              severity: damageLabels[severity] || "Unknown",
            });
          }
        }
      );
    });

    setClassifiedDamages(newClassifiedDamages); // Store classified damages in state
    console.log("Classified Damages: ", newClassifiedDamages); // Log the classified damages
  }, [predictionResults]); // Run the effect when predictionResults changes

  const handleDamageFileChange = (event) => {
    setDamageFiles(Array.from(event.target.files));
  };
  const renderPredictionModal = () => {
    if (!showPredictionModal) return null;

    const downloadPDF = async () => {
      try {
        // Temporarily hide the buttons to ensure they don't appear in the PDF
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
          button.style.display = "none";
        });
    
        const doc = new jsPDF();
        const margin = 10; // Margin for the PDF content
        const imgWidth = 190; // Image width for A4 paper size
        const pageHeight = doc.internal.pageSize.height; // Page height in PDF units
        let yOffset = margin; // Initial vertical offset for positioning content
        let isFirstPage = true; // Track whether we're on the first page
    
        for (const result of predictionResults) {
          // Create a canvas for the modal content of each result
          const contentElement = document.querySelector(".max-w-4xl");
          if (!contentElement) {
            throw new Error("Unable to find content to export.");
          }
    
          // Use html2canvas to capture the content
          const canvas = await html2canvas(contentElement, {
            useCORS: true,
            allowTaint: false,
            scrollX: 0,
            scrollY: -window.scrollY, // Ensure the capture respects the current scroll position
          });
    
          const imgData = canvas.toDataURL("image/png");
          const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain the aspect ratio
    
          // Check if the image fits on the current page; add a new page only if necessary
          if (!isFirstPage && yOffset + imgHeight > pageHeight - margin) {
            doc.addPage();
            yOffset = margin;
          }
    
          // Add the captured image content to the PDF
          doc.addImage(imgData, "PNG", margin, yOffset, imgWidth, imgHeight);
          yOffset += imgHeight + margin; // Update the yOffset for the next content
    
          isFirstPage = false; // After the first iteration, subsequent pages are not the first
        }
    
        // Save the PDF file
        doc.save("assessment_results.pdf");
    
        // Show success toast
        toast.success("PDF downloaded successfully!");
      } catch (error) {
        console.error("PDF generation error:", error);
        toast.error(`Failed to generate PDF: ${error.message}`);
      } finally {
        // Restore the buttons after the PDF is generated
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
          button.style.display = "";
        });
      }
    };
    

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-w-4xl">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Damage Prediction Results</h2>
            <Button
              onClick={() => setShowPredictionModal(false)}
              className="text-red-500 hover:text-red-700"
              style={{ marginRight: "50px" }}
            >
              Close
            </Button>
            <Button onClick={downloadPDF} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {predictionResults.map((result, index) => {
            // Filter out undamaged parts
            const filteredDamageClassification = Object.entries(
              result.damage_classification
            ).filter(
              ([, severity]) => severity && severity !== "None" // Adjust this condition as per your "no damage" indicator
            );

            // Skip rendering this result if no parts are damaged
            if (filteredDamageClassification.length === 0) return null;

            return (
              <div key={index} className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">
                  {result.fileName || `Image ${index + 1}`}
                </h3>

                <div className="flex gap-4 mb-4" style={{ display: "flex" }}>
                  {/* DataTable container with reduced size */}
                  <div className="flex-1 max-w-[300px]">
                    <h3 className="text-lg font-semibold mb-3">
                      Damage Classification:
                    </h3>
                    <DataTable
                      value={filteredDamageClassification.map(
                        ([part, severity]) => ({
                          part,
                          severity: damageLabels[severity] || "Unknown",
                        })
                      )}
                      responsiveLayout="scroll"
                      className="text-sm" // Reduces font size for the DataTable
                      style={{ width: "450px" }}
                    >
                      <Column field="part" header="Vehicle Part" />
                      <Column field="severity" header="Damage Classification" />
                    </DataTable>
                  </div>

                  {/* Images container with reduced size */}
                  <div className="flex flex-col gap-4 w-[200px]">
                    {/* Segmented Image */}
                    <div className="flex flex-col items-center mb-4">
                      <h3 className="text-sm font-bold mb-2">
                        Segmented Image
                      </h3>
                      <img
                        src={result.segmented_image_filename}
                        alt="Segmented Image"
                        style={{ width: "150px", height: "150px" }} // Adjusted image size
                        className="object-contain border"
                      />
                    </div>

                    {/* Damaged Image */}
                    <div className="flex flex-col items-center mb-4">
                      <h3 className="text-sm font-bold mb-2">Damaged Image</h3>
                      <img
                        src={result.damaged_image_filename}
                        alt="Damaged Image"
                        style={{ width: "150px", height: "150px" }} // Adjusted image size
                        className="object-contain border"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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
    const formattedDate = `${month} ${day}, ${year} ${hours}:${minutesFormatted} ${ampm}`;

    return formattedDate;
  }

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

      const dates = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {allInfo?.map((data, index) => {
            return (
              <div key={index}>{formatDateWithWeekday(data?.Timestamp)}</div>
            );
          })}
        </div>
      );
      const temp = {
        _id: docs._id,
        serial_num: docs.serial_num,
        date: dates,
        doc_name: docs.doc_name,
        file: alllinks,
        action:
          docs.doc_name === "Damage vehicle photographs/video" ? (
            <div className="flex items-center space-x-2">
              <input
                type="file"
                id="damageFileInput"
                multiple
                style={{ display: "none" }}
                onChange={handleDamageFileChange}
              ></input>
              <button
                disabled={finalDisable}
                className="btn btn-thm"
                onClick={() =>
                  document.getElementById("damageFileInput").click()
                }
              >
                <FaUpload />
              </button>
              <button
                disabled={damageFiles.length === 0}
                className="btn btn-thm"
                onClick={handleDamageFileUploadAndPredict}
              >
                Predict Damage
              </button>
              {damageFiles.length > 0 && (
                <span>{damageFiles.length} file(s) selected</span>
              )}
            </div>
          ) : (
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

    setUpdatedCode(tempCode);
  }, [documents, uploadedFiles, changes, damageFiles]);

  return (
    <>
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
      {renderPredictionModal()}
    </>
  );
}
