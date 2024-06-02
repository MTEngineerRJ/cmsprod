import Link from "next/link";
import Image from "next/image";
import SmartTable from "./SmartTable";
import { useEffect } from "react";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { forEach } from "jszip";
import { FaCross, FaDropbox, FaRedo, FaUpload } from "react-icons/fa";

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

export default function Exemple({
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
  const [disable,setDisable]=useState(false);

  // const [uploadedData, setUploadedData] = useState([]);

  const [change, setChange] = useState(false);

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
          setLoc(latitude + "," + longitude);
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
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

  useEffect(() => {
    // Suggest to the browser that it shouldn't allow user scaling (zooming)
    const viewportMeta = window.document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
  }, []);



  const handleUpload = (result, label, idx) => {
    location();
    try {
      const fileUrl = result.info.secure_url;
      console.log(uploadedData, label, result);

      const newUploadData = {
        docName: label,
        index: idx,
        leadId: leadId,
        data: [
          {
            name: result.info.original_filename + "." + result.info.format,
            thumbnail_url: result.info.thumbnail_url,
            url: result.info.url,
            location: loc,
            time: result.info.created_at,
          },
        ],
      };

      let oldData = uploadedData;
      oldData.push(newUploadData);
      setUpdatedData(oldData);
      setChange(true);
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  };

  const checkWithinTheContent = (row) => {
    
    const present = content.includes(row.doc_name);
    console.log("checkWithinTheContent",row.doc_name,present)
    return present;
  };

  const checkAlreadyDone = (label) => {
    return false;
  };

  const checkId = (status, row) => {
    if (status?.Status === 1 && Number(row.serial_num) <= 10) return true;
    return false;
  };
  const checkIsUploaded = (label) => {
    // console.log(uploadedData);
    let selectedField = {};
    uploadedData.map((data, idx) => {
      if (String(label) === String(data.docName)) {
        selectedField = data;
      }
    });

    return selectedField;
  };

  const isVideo = (url)=>{
    return url.includes(".mp4");
  }

  console.log(uploadedData);

  useEffect(() => {
   
    const getData = () => {
      const tempData = [];
      data.map((row, index) => {
        const isUploaded = checkIsUploaded(row.doc_name);
        const isDone = checkAlreadyDone(row.doc_name);
        const isVideoImagesIncluede = ((String(content) === "" && String(row.doc_name) !== "Images") || (String(content) === "" && String(row.doc_name) !== "Videos"))
        const isAccordingToStatus = content

          ? checkWithinTheContent(row)
          : checkId(status, row);
        if (!isDone && isAccordingToStatus) {
          const updatedRow = {
            _id: index + 1,
            serial_num: row.serial_num,
            doc_name: row.doc_name,
            files: uploadedData.map((file, idx) => {
              if (file.docName === row.doc_name) {
                return (
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    key={idx}
                  >
                   {! isVideo(file.data[0].url) ?  

                    <Image
                      src={file.data[0].name}
                      width={90}
                      height={90}
                    /> 
                    :
                    <video width="300" height="200" controls>
                    <source src={file.data[0].url} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                    }
                    <a>{file.data[0].name[0]}</a>
                    <div className="row">
                      <div className="col-lg-12">
                        <a
                          className="btn btn-color w-25"
                          href={file.data[0].url}
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
              <CldUploadWidget
                onUpload={(result) =>
                  handleUpload(result, row.doc_name, row.serial_num)
                }
                // onOpen={(widget) => {
                //   // widget.update({ sources: ['camera'] });
                //   widget.update({ sources: ["camera"] });
                // }}
                uploadPreset="mpbjdclg"
                options={{
                  cloudName: "dcrq3m6dx", // Your Cloudinary cloud name
                  allowedFormats: ["jpg", "png","mp4"], // Specify allowed formats
                  maxFiles: 50,
                }}
              >
                {({ open }) => (
                  <div className="">
                    <button
                      className="btn btn-color w-100"
                      style={{}}
                      onClick={() => open()}
                      title="Upload File"
                    >
                      <span className="">
                        {" "}
                        <FaUpload />
                      </span>
                    </button>
                  </div>
                )}
              </CldUploadWidget>
            ),
          };

          console.log("row",content,row.doc_name)
          if(((String(content) === "" && String(row.doc_name) === "Images") || (String(content) === "" && String(row.doc_name) === "Videos"))){
           
          }
          else{
            tempData.push(updatedRow)
          }
          
        }
      });
      return tempData;
    };
    // getData();
    setChange(false);
    setUpdatedCode(getData());
  }, [uploadedData, change, document]);

  useEffect(() => {
    if (uploadedData) {
      console.log(uploadedData);
    }
  }, [uploadedData]);
  console.log(uploadedData);

  return (
    <SmartTable
      title="Documents Upload"
      data={updatedCode}
      disable={disable}
      headCells={headCells}
    />
  );
}
