import Image from "next/image";
import SmartTable from "./SmartTable";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Modal from "react-modal";
import Webcam from "react-webcam";
import dotenv from "dotenv";
// import toast from 'react-hot-toast';
import { Toaster, toast } from "react-hot-toast";

import { createCanvas, loadImage } from "canvas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faCamera,
  faCloudArrowUp,
  faTimes,
  faVideo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

dotenv.config({ path: ".env.development" });

import AWS from "aws-sdk";
const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const REGION = process.env.NEXT_PUBLIC_AWS_REGION;

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});


const myBucket = new AWS.S3({ params: { Bucket: S3_BUCKET }, region: REGION });
const headCells = [
  {
    id: "doc_name",
    numeric: false,
    label: "Document Name",
    width: 120,
  },
  {
    id: "files",
    numeric: false,
    label: "Files",
    width: 150,
  },
  {
    id: "action",
    numeric: false,
    label: "Action",
    width: 50,
  },
];

const data = [
  
  {
    _id: "6144145976c7fe",
    serial_num: "1",
    doc_name: "Certificate of registration",
    action: "2021-09-17 19:10:50",
  },
  
 
  {
    _id: "6144145976c7fe",
    serial_num: "2",
    doc_name: "Insurance policy",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "3",
    doc_name: "Damage vehicle photographs/video",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "4",
    doc_name: "Aadhar card",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "5",
    doc_name: "Signature",
    action: "2021-09-17 19:10:50",
  },
 
  {
    _id: "6144145976c7fe",
    serial_num: "6",
    doc_name: "Videos",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "7",
    doc_name: "Images",
    action: "2021-09-17 19:10:50",
  },
];

export default function DocumentUpload({
  setUpdatedData,
  uploadedData,
  leadId,
  status,
  document,
  content,
}) {
  const [updatedCode, setUpdatedCode] = useState([]);
  const [filesUrl, setFilesUrl] = useState("");
  const [attachment, setAttachment] = useState("");
  const [loc, setLoc] = useState("");
  const [index, setIndex] = useState(-1);
  const [currentLabel, setCurrentLabel] = useState("");
  const [mediaArray, setMediaArray] = useState([]);
  const [change, setChange] = useState(false);
  const [isVIdeoDisable, setisVIdeoDisable] = useState(true);
  const [isVIdeoCaptureDisable, setisVIdeoCaptureDisable] = useState(true);
  const[lat, setLat] = useState("");
  const[long, setLong] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  
  useEffect(()=>{
  const content = urlParams.get('content');
  const isVideoDisable = content === 'Images';
  const isVideoCaptureDisable = content === 'Vidoes';
  setisVIdeoDisable(!isVideoDisable)
  setisVIdeoCaptureDisable(!isVideoCaptureDisable)
  

  },[urlParams])



  const getIndex = (label, datas) => {
    let index = -1;
    datas.map((data, idx) => {
      if (String(data[idx].docName) === String(label)) index = idx;
    });
    return index;
  };
  const location = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude)
          setLong(longitude)
          setLoc(latitude + "," + longitude);
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
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

  // Webcam logic here
  const [modalIsOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState(null);
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("imgg", imageSrc);
    setImg(imageSrc);
  }, [webcamRef]);

  function openModal(label, idx) {
    setIndex(idx);
    setCurrentLabel(label);

    setIsOpen(true);
  }

  function closeModal() {
    setIndex(-1);
    setCurrentLabel("");
    setIsCapturingVideo(false);
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      width: "100%",
      height: "80%",
      top: "60%",
      maxHeight: "80%",
      overflow: "auto",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "0px",
    },
  };

  function getUserMediaWithConstraints(videoConstraints) {
    return navigator.mediaDevices.getUserMedia({ video: videoConstraints });
  }

  const [videoConst, setVideoConst] = useState({
    width: 1280,
    height: 720,
    facingMode: "user",
  });

  const updateVideoConstraints = () => {
    const isMobileView = window.innerWidth < 768;
    const updatedConstraints = isMobileView
      ? { width: 1280, height: 720, facingMode: "environment" }
      : { width: 1280, height: 720, facingMode: "user" };

    setVideoConst(updatedConstraints);
  };

  useEffect(() => {
    getUserMediaWithConstraints(videoConst)
      .then((stream) => {
        const videoElement = document.getElementById("videoElement");
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }, [videoConst]);

  const [capturedImage, setCapturedImage] = useState([]);
  const [capturedVideo, setCapturedVideo] = useState([]);
  const [isCapturingVideo, setIsCapturingVideo] = useState(false);
  const [modalDocName, setModalDocName] = useState("");
  const [capturedMedia, setCapturedMedia] = useState({});

  const [retake, setRetake] = useState(false);

  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const [uploadedUrl, setUploadedUrl] = useState([]);
  const [blob, setBlob] = useState([]);

  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setuploadedVideos] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState([]);

  const [imageFileName, setImageFileName] = useState("");
  const cancelCapture = () => {
    setuploadedVideos((prev) => prev.slice(0, -1));
    setUploadedUrl((prevImages) => prevImages.slice(0, -1));
    setIsImage(false);
    setRetake(false);
  };

  useEffect(() => {
    setMediaArray([...uploadedUrl, ...uploadedVideos]);
  }, [uploadedUrl, uploadedVideos]);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [webcamOpened, setWebcamOpened] = useState(false);
  const [isCapturingEnabled, setIsCapturingEnabled] = useState(false);

  const handleWebcamOpen = () => {
    setWebcamOpened(true);
    setIsCapturingEnabled(true);
  };
  function generateRandomFileName(extension) {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ""); // Remove slashes from the date

    const formattedTime = currentDate
      .toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/:/g, ""); // Remove colons from the time

    const randomString = Math.random().toString(36).substring(7); // Generate a random string

    if (extension === "jpg")
      return `image_${formattedDate}_${formattedTime}_${randomString}.${extension}`;

    return `video_${formattedDate}_${formattedTime}_${randomString}.${extension}`;
  }



  const uploadFiles = () => {

    toast.loading("Uploading the media!!", {
      className: "toast-loading-message",
    });


    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    uploadedUrl.forEach((url, index) => {
      
      const fileName = uploadedFileName[index];
      const params = {
        ACL: "public-read",
        Body: url,
        Bucket: S3_BUCKET,
        Key: url.name,
        ContentType: url.type,
        ContentDisposition: "inline",
      };


     

      myBucket.putObject(params).send((err, data) => {
        if (err) {
          toast.dismiss();
          toast.error("Got error while adding claim!");
        } else {
          toast.dismiss();
          toast.success("Successfully uploaded !", {
            className: "toast-loading-message",
          });
          const S3_URL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(
            url.name
          )}`;
         
          const newUploadData = {
            docName: currentLabel,
            index: index,
            leadId: leadId,
            data: [
              {
                name: url.name,
                thumbnail_url: S3_URL,
                url: S3_URL,
                location: loc,
                time: new Date(),
              },
            ],
          };


          console.log("newUploadData",newUploadData);

          setUpdatedData((oldData) => [...oldData, newUploadData]);
        }
      });
    });

    setIsOpen(false);
    setUploadedUrl([]);
    setuploadedVideos([]);
    setIsImage(false);
    setIsVideo(false);
    setUploadedFileName([]);
  };


  
  function getFileNameFromUrl(url) {
    const urlObject = new URL(url);

    const pathname = urlObject.pathname;

    const parts = pathname.split('/');
    const filename = parts[parts.length - 1];

    return filename;
}
  const handleUploadImage = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const name = generateRandomFileName("jpg");
      const image = await loadImage(imageSrc);
  
      const canvas = createCanvas(image.width, image.height);
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
  
      const date = new Date();
      context.font = '20px Arial';
      context.fillStyle = 'white';
      const textMargin = 25; // Margin from the right and bottom
      const textBaselineOffset = 25; // Offset from the bottom
      context.fillText(`Latitude: ${lat.toFixed(2)}, Longitude: ${long.toFixed(2)}`, canvas.width - context.measureText(`Latitude: ${lat.toFixed(2)}, Longitude: ${long.toFixed(2)}`).width - textMargin, canvas.height - textBaselineOffset);
      context.fillText(`Date: ${date.toLocaleDateString()}, Time: ${date.toLocaleTimeString()}`, canvas.width - context.measureText(`Date: ${date.toLocaleDateString()}, Time: ${date.toLocaleTimeString()}`).width - textMargin, canvas.height - textBaselineOffset - 25);
  
      const capturedImage = canvas.toDataURL('image/jpeg');
  
      const byteCharacters = atob(capturedImage.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
  
      // Create a File object
      const file = new File([blob], name, { type: "image/jpeg" });
  
      setUploadedUrl((prevImages) => [...prevImages, file]);
      setImageFileName(name);
      setUploadedFileName((prevName) => [...prevName, name]);
      setIsImage(true);
      setRetake(true);
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  };
  
  
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const changeCameraConstraints = () => {
    if (videoConst.facingMode === "user") {
      setVideoConst({
        height: videoConst.height,
        width: videoConst.width,
        facingMode: "environment",
      });
    } else {
      setVideoConst({
        height: videoConst.height,
        width: videoConst.width,
        facingMode: "user",
      });
    }
  };


  function getUploadedVideoName() {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
  
    return "captured_video"+formattedDateTime+".mp4";
  }

  const handleUploadVideo = async () => {
    console.log("isCapturingVideo00000000", isCapturingVideo);
    try {
      if (!isCapturingVideo) {
        // Start capturing video
        setIsCapturingVideo(true);
        setCapturedVideo(null);
        chunksRef.current = []; // Reset chunks
        const videoConstraints = {
          width: 1280,
          height: 720,
          facingMode: "user", // or 'environment' for rear camera
        };

        const mediaRecorder = new MediaRecorder(webcamRef.current.stream);
        console.log("webcamRef.current.stream ->>", webcamRef.current.stream);
        console.log("MEdia", mediaRecorder);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };



        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          const videoFile = new File([blob], getUploadedVideoName(), {
            type: "video/mp4",
          });

          const base64 = await blobToBase64(blob);
          setUploadedUrl((prevBase64Array) => [...prevBase64Array, videoFile]);
          const videoUrl = URL.createObjectURL(blob);
          const name = generateRandomFileName("mp4");
          if (videoUrl) {
            setUploadedFileName((prevName) => [...prevName, name]);
          }
        };

        mediaRecorder.start();
      } else {
        mediaRecorderRef.current.stop();
        setIsCapturingVideo(false);
      }
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  };

  const checkWithinTheContent = (row) => {
    
    const present = content.includes(row.doc_name);
    return present;
  };


  const checkId = (status, row) => {
    if (status?.Status === 1 && Number(row.serial_num) <= 10) return true;
    return false;
  };
  const checkIsUploaded = (label) => {
    let selectedField = {};
    uploadedData.map((data, idx) => {
      if (String(label) === String(data.docName)) {
        selectedField = data;
      }
    });

    return selectedField;
  };

  const uploadCancelHandler = () => {
    setUploadedUrl([]);
    setuploadedVideos([]);
    setUploadedFileName([]);
    setIsCapturingVideo(false);
  };

  useEffect(() => {
    window.addEventListener("resize", updateVideoConstraints);

    return () => {
      window.removeEventListener("resize", updateVideoConstraints);
    };
  }, []);


  useEffect(() => {
    const getData = () => {
      const tempData = [];
      data.map((row, index) => {
      
        row.doc_name === "Images"
          ? setisVIdeoDisable(false)
          : setisVIdeoDisable(true);
          setisVIdeoDisable(row.doc_name !== "Images");

        const isUploaded = checkIsUploaded(row.doc_name);
        const isVideoImagesIncluede = ((String(content) === "" && String(row.doc_name) === "Images") || (String(content) === "" && String(row.doc_name) === "Videos"))
       

        const isAccordingToStatus = content !==""
          ? checkWithinTheContent(row)
          : true;

        if (isAccordingToStatus && !isVideoImagesIncluede) {
          const updatedRow = {
            _id: index + 1,
            serial_num: row.serial_num,
            doc_name: row.doc_name,
            files: uploadedData.map((file, idx) => {
              if (file.docName === row.doc_name) {
                const fileName = String(file.data[0].thumbnail_url); // Convert to string
                return (
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    key={idx}
                  >

                    {fileName.endsWith(".jpg") || fileName.endsWith(".png") ? (
                      <img
                        src={fileName}
                        alt="Image"
                        width={90}
                        height={90}
                      />
                    ) : (
                      <video width={90} height={90} controls loop autoPlay>
                        <source src={fileName} type="video/mp4" />{" "}
                      </video>
                    )}

                    <a>{getFileNameFromUrl(fileName)}</a>
                    <div className="row">
                      <div className="col-lg-12">
                        <a
                          className="btn btn-color w-25"
                          href={fileName} 
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View"
                        >
                          <span className="flaticon-view"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }),
            action: (
              <div>
                <div className="">
                  <button
                    className="btn btn-color w-100"
                    style={{}}
                    onClick={() => openModal(row.doc_name, index)}
                    title="Upload File"
                  >
                    <span className="">
                      {" "}
                      <FaUpload />
                    </span>
                  </button>
                </div>
              </div>
            ),
          };

          tempData.push(updatedRow);
        }
      });
      return tempData;
    };
    setChange(false);
    const updatedSections = getData();
    setUpdatedCode(updatedSections)
  }, [uploadedData, change, content, document]);


  return (
    <>
      <Toaster />
      <SmartTable
        title="Documents Upload"
        data={updatedCode}
        headCells={headCells}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12 text-end mb-1">
              <button
                className="btn flaticon-close w-25 bg-danger text-light"
                onClick={closeModal}
              ></button>
            </div>
            <Webcam
              style={{ marginLeft: "" }}
              audio={false}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1280}
              onUserMedia={() => handleWebcamOpen()}
              videoConstraints={videoConst}
            />
          </div>
          <div className="" onClick={changeCameraConstraints}>
            <img
              src="https://th.bing.com/th?id=OIP.UKGBmbTeRXuAeK4TtheaOAEsEs&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
              width={"20px"}
            />
          </div>
        </div>


        {console.log("RETake", retake)}

        <div
          className="mb-3"
          style={{ display: "flex", justifyContent: "center", gap: "15px" }}
        >
          {!uploadedUrl.length && webcamOpened && isCapturingEnabled ? (
            ""
          ) : (
            <>
              <button
                className="btn btn-color w-50"
                title="Retake"
                onClick={cancelCapture}
                disabled={!retake}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </button>
              {/* Additional buttons or functionality can be added here */}
            </>
          )}

          {webcamOpened && isCapturingEnabled && (
            <>
              <button
                className="btn btn-color w-50"
                onClick={handleUploadImage}
                title="Capture Image"
              >
                <FontAwesomeIcon icon={faCamera} />
              </button>


             {isVIdeoDisable && <button
                className="btn btn-color w-100 p-1"
                onClick={handleUploadVideo}
              >
                <FontAwesomeIcon icon={faVideo} />
                {isCapturingVideo
                  ? "Stop Capture Video"
                  : "Start Capture Video"}
              </button>}
            </>
          )}

          {uploadedUrl.length && (
            <>
              <button
                className="btn btn-color w-50"
                onClick={uploadCancelHandler}
                title="Cancel"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
          
                <button
                  className="btn btn-color w-100"
                  title="Upload"
                  onClick={uploadFiles}
                >
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </button>
            </>
          )}
        </div>
        <div className="row">
          <div className="col-lg-4">
            {uploadedUrl.map((file, index) => (
              <div key={`media_${index}`} className="mb-3">
                {file instanceof File && file.type.startsWith("image/") ? (
                  // Display Image
                  <>
                    <img
                      className="col-lg-3"
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded Media ${index + 1}`}
                      width={300}
                      height={200}
                    />
                    <label className="mb-3">{(file.name)}</label>
                  </>
                ) : (
                  // Display Video
                  <video width={300} height={200} controls>
                    <source src={file} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </div>
        </div>
       
      </Modal>
    </>
  );
}
