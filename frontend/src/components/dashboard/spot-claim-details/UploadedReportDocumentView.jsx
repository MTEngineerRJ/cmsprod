import UploadedReportTabularView from "./UploadedReportTabularView";
  import { useEffect, useState } from "react";
  import JSZip from "jszip";
  import {  FaUpload } from "react-icons/fa";
  import axios from "axios";
  import toast from "react-hot-toast";
  import AWS from 'aws-sdk';



  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_REGION,
  });
  
  const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;
  
  const REGION ='ap-south-1';
  console.log("AWS credentials:", process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID, process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY);
  console.log("AWS region:", process.env.NEXT_PUBLIC_REGION);
  console.log("S3 bucket:", S3_BUCKET);
  const myBucket= new AWS.S3({params:{Bucket:S3_BUCKET},region:REGION});

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
      width: 150,
    },
    {
        id: "verified",
        numeric: false,
        label: "Verified",
        width: 120,
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
      doc_name: "Pan card"
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

  export default function UploadReportDocumentView({ leadId  }) {
    const [updatedCode, setUpdatedCode] = useState([]);
    const [selectedFile, setSelectedFile] = useState([]);
    const [uploadedFiles,setUploadedFiles]=useState([]);
    const [data,setData]=useState([])
    const [documents,setDocuments]=useState([])
    const [disable,setDisable]=useState(false);

    const [addReport,setAllReport]=useState([])

    const [isAdded,setIsAdded]=useState(false);

    const [newLabel,setNewLabel]=useState("");

   
    const [currentDoc,setCurrentDoc]=useState("");

    const [changes,setChanges]=useState(false);

    const [loc,setLoc]=useState("")

    console.log("leadId------>", leadId);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };




  useEffect(()=>{
    axios.get("/api/getDocumentListLabels",{
      params:{
        leadId : leadId
      }
    })
    .then((res)=>{
      console.log("allDocLists",res);
      const tempAllDocsLabel = res.data.data.results;
      const allLabelCount = LabelData.length
      let newAddOnLabels = []

      LabelData.map((data,index)=>{
        newAddOnLabels.push(data)
      })

      tempAllDocsLabel.map((doc,index)=>{
        const newLabel = {
          _id:allLabelCount+2,
          serial_num:allLabelCount+2,
          doc_name:doc.DocumentName
        };
        newAddOnLabels.push(newLabel)
      });

      
      setData(newAddOnLabels);
    })
    .catch((err)=>{
        console.log(err);
    })

    axios.get("/api/getUploadedReportDocuments",{
        params:{
          leadId : leadId
        }
      })
      .then((res)=>{
        const tempData = res.data.data.results;
        let storedData = [];
        tempData.map((report,index)=>{
            console.log("reportData",report);
            let indexValue = -1;
            storedData?.map((row,idx)=>{
                if(String(row.docName)=== String(report.ReportType)){
                    indexValue = idx;
                }
            })
            if(indexValue === -1){
                let insideData = {
                    name : report?.FileName,
                    url : report?.FilePath,
                    isVerified : report?.IsVerified,
                    verifiedBy : report?.VerifiedBy,
                    verifiedAt : report?.ModifiedDateTime,
                    uploadedAt : report?.AddedDateTime,
                    garageName : report?.GarageName,
                    uploadedBy:report.UploadedBy
                };
                let newDataData = [];
                newDataData.push(insideData)
                const newData = {
                    docName : report.ReportType,
                    leadId : report.LeadId,
                    data : newDataData
                };

                storedData.push(newData);
            }
            else{
                 const oldReport = storedData[indexValue];
                 let oldData = oldReport?.data;
                
                 let insideData = {
                    name : report.FileName,
                    url : report.FilePath,
                    isVerified:report.IsVerified,
                    verifiedBy : report.VerifiedBy,
                    verifiedAt : report.ModifiedDateTime,
                    uploadedAt : report.AdddedDateTime,
                    garageName : report?.GarageName,
                    uploadedBy:report.UploadedBy
                };

                oldData.push(insideData);

                storedData[indexValue] = {
                    docName : oldReport?.docName,
                    leadId : oldReport?.leadId,
                    data : oldData
                };
            }
        })

        console.log("allData",storedData,tempData)
        setDocuments(storedData)
       
      })
      .catch((err)=>{
          console.log(err);
      })

  },[])



    const getAllLabelLinks = (docName)=>{
      let requiredLinks=[];
      let docFile = {};
      console.log('getAllLabelLinks',uploadedFiles,documents)
      documents?.map((file,index)=>{

        console.log(docName,file.docName)
        if(String(docName).toLowerCase().includes(String(file.docName).toLowerCase())){
          docFile = file
          requiredLinks=file.data;
        }
      })

      return {requiredLinks,docFile};
    }

    const formatDate = (dateString) => {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
  
      const dateParts = new Date(dateString)
        .toLocaleDateString("en-GB", options)
        .split("/");
      const formattedDate =
        dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2];
      return formattedDate;
    };
  // console.log("selectedFile-------->",selectedFile);
    
  
  const getIndex = (docName,fileData)=>{
    let index = -1;
    console.log("getIndex",docName,fileData);
    fileData.map((file,idx)=>{
      console.log(String(docName) === String(file.docName));
      if(String(docName) === String(file.docName)){
        index=idx;
      }
    })
    console.log(index);
    return index;
  }



  function getFileNameFromUrl(url) {
    // Create a URL object
    const urlObject = new URL(url);

    // Get the pathname (e.g., '/invoice.pdf')
    const pathname = urlObject.pathname;

    // Split the pathname using '/' and get the last part (filename)
    const parts = pathname.split('/');
    const filename = parts[parts.length - 1];

    return filename;
}


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


const addNewLabel = ()=>{
  const paylaod = {
    leadId : leadId,
    DocumentName : newLabel
  };

  toast.loading("Adding new Document Label!");
  axios.post("/api/addDocumentLabel",paylaod)
  .then((res)=>{
    toast.dismiss();
    toast.success("Successfully added the document !!", {
      // position: toast.POSITION.BOTTOM_LEFT,
      className: "toast-loading-message",
    });
    window.location.reload()

  })
  .catch((err)=>{
    toast.dismiss();
    toast.error("Caught into Error ! Try Again.", {
      className: "toast-loading-message",
    });
  });

}

let docCurrentName="Driving license";
useEffect(()=>{
  setCurrentDoc(docCurrentName)
},[docCurrentName])

  const handleFileInputChange = async (e, idx,docs)  => {
   
    location();
    
    setDisable(true);
   
    const selectedFileCurrent = e.target.files[idx];
    
      const params = {
        ACL:'public-read',
        Body:selectedFileCurrent,
        Bucket:S3_BUCKET,
        Key:selectedFileCurrent.name,
        ContentType: 'image/jpeg',
        ContentDisposition: 'inline'
      };

     
      myBucket.putObject(params).send((err,data)=>{
        if(err){
          toast.error("Error while uploading!!");
        }
        else{
          const S3_URL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(selectedFileCurrent.name)}`;
          
          const payloadMain={
            leadId:leadId,
            docName:docCurrentName,
            data:[{
              name:selectedFileCurrent.name,
              url:S3_URL,
              Timestamp:new Date(),
              Location:loc
            }]
          };

        
          toast.loading("Uploading files!!", {
            className: "toast-loading-message",
          });
          axios.post("/api/uploadManualDocument", payloadMain, {
              headers: {
                Authorization: `Bearer ${""}`,
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              toast.dismiss()
              toast.success("Successfully updated !", {
                // position: toast.POSITION.BOTTOM_LEFT,
                className: "toast-loading-message",
              });
              let oldFiles = uploadedFiles;

              const index = getIndex(docCurrentName,oldFiles);
              const currentTimeStamp=new Date();
  
              if(index!==-1){
                  const oldFile = oldFiles[index];
                  const oldData = oldFile.data;
                  oldData.push({
                    name:getFileNameFromUrl(S3_URL),
                    url:res.data.userData,
                    Timestamp:currentTimeStamp,
                    Location: loc
  
                  });
                  const newUpload={
                    leadId:leadId,
                    docName:docCurrentName,
                    data:oldData,
                   
                  }
                  oldFiles[index]=newUpload;
                  console.log(oldFiles);
                  setChanges(true)
                  setUploadedFiles(oldFiles);
              }
              else{
  
                let newData = [];
                newData.push({
                  name:getFileNameFromUrl(S3_URL),
                  url:S3_URL,
                  Timestamp:currentTimeStamp,
                  Location: loc,
                  
                })  
                const newUpload={
                  leadId:leadId,
                  docName:docCurrentName,
                  data:newData
                }
                const oldFiles = uploadedFiles;
                oldFiles.push(newUpload);
                console.log(oldFiles);
                setChanges(true)
                setUploadedFiles(oldFiles);
              }
            })
            .catch((err) => {
              // isNotValidLink(true);
              toast.dismiss()
              toast.error("Try Again!!")
            });
         
      
            
          
          

        }
      })

       
        
    setDisable(false)
  };

  
  
const handleReload = () => {
  window.location.reload();
};

    const handleButtonClick = (doc_name) => {
      setDisable(true)
      console.log(doc_name)
      docCurrentName =(doc_name)
      // Trigger file input click when button is clicked
      document.getElementById('fileInput').click();
    };

const getFileName = (idx)=>{
    let currentIndex = "";
    selectedFile.map((file,index)=>{
      if((file?.index)===idx){
        currentIndex=file?.file;
      }
    });
    return currentIndex
  }

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
        data?.map((temp,idx)=>{
          if(temp?.upload && temp.upload === true){
            uploadData.push({
              name:temp.name,
              url:temp.url,
              Timestamp:temp.Timestamp,
              Location:temp.Location
            })
          }
        });

        if(uploadData.length > 0){
          tempArray.push({
            leadId:file.leadId,
            docName:file.docName,
            data:uploadData
          });
        }
      });

      if(tempArray.length<=0){
        toast.error("No Data to be uploaded!!");
      }
      else{
      const payload = JSON.stringify({ data: tempArray });

      toast.loading("Uploading files!!", {
        // position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-loading-message",
      });
      axios.post("/api/uploadDocument", payload, {
          headers: {
            Authorization: `Bearer ${""}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.dismiss()
          toast.success("Successfully updated !", {
            // position: toast.POSITION.BOTTOM_LEFT,
            className: "toast-loading-message",
          });
          window.location.reload();
        })
        .catch((err) => {
          // isNotValidLink(true);
          toast.dismiss()
          toast.error("Try Again!!")
        });
        

      }
      setDisable(false)
    
  };

  const VerifyReport = (docName)=>{

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const payload = {
        leadId : leadId,
        DocumentName : docName,
        VerifiedBy : userInfo[0]?.Username,
        ModifiedDateTime : new Date()
    }
    axios.post("/api/verifyReportUpload", payload)
    .then((res) => {
        toast.dismiss()
        toast.success("Successfully verified !", {
          // position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-loading-message",
        });
        window.location.reload();
      })
      .catch((err) => {
        // isNotValidLink(true);
        toast.dismiss()
        toast.error("Try Again!!")
      });
  }



   const downloadAllFiles = async () => {
    try {
      const zip = new JSZip();
  
      // Iterate through uploadedFiles
      for (const file of documents) {
        const data = file.data;
  
        // Iterate through data array
        if(file.data){
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
  
      toast.success("Successfully downloaded the zip!");
    } catch (error) {
      console.log("Error during download:", error);
      toast.error("Error during download. Please try again.");
    }
  };


  let tempCode = [];
  useEffect(() => {
    const currentDate = new Date()
    console.log("useEffect",documents)
    setChanges(false)
    data.map((docs, index) => {
      const {requiredLinks,docFile} = getAllLabelLinks(docs.doc_name);
      
      console.log("docFile",docFile)
      const showInfo = docFile?.data?.length ? docFile?.data[0] : {};
      const alllinks = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {requiredLinks?.map((info, idx) => (
            <div key={idx}>
                <div style={{display:"flex",flexDirection:"row"}}>
                <a href={info.url} key={idx} target="_blank">
                    {decodeURIComponent((info.name))}
                </a>
                <p style={{fontSize:"10px",marginLeft:"10px",marginLeft:"12px"}}>{info?.uploadedAt ? formatDate(info?.uploadedAt) : "-"}</p>
                </div>
            <p>({info?.uploadedBy})</p>
            </div>
          ))}
        </div>
      );

      const temp = {
        _id: docs._id,
        serial_num: docs.serial_num,
        doc_name: docs.doc_name,
        file: alllinks,
        
        verified: ( 
        showInfo?.isVerified  === 1 ?
        <div key={index}>
        <div style={{display:"flex",flexDirection:"row"}}>
        <span style={{textDecoration:"underline",color:"green"}}>{showInfo?.verifiedBy}</span> : 
        <p style={{fontSize:"10px",marginLeft:"10px",marginLeft:"12px"}}>{showInfo?.verifiedAt ? formatDate(showInfo?.verifiedAt) : "-"}</p>
        </div>
        <p>({showInfo?.verifiedBy})</p>
        </div> :
         String(docFile?.leadId) === String(leadId) ?
         <span style={{textDecoration:"underline",color:"red"}}>Not Verified</span> : <span>--</span> ),
        action: 
        (docFile?.leadId && showInfo?.isVerified) ? <span style={{textDecoration:"underline",color:"green"}}>Verified</span> : !docFile?.leadId ? <>--</> : <>
        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e)=>handleFileInputChange(e,index,docs.doc_name)} ></input>
        <button  disabled={disable} className="btn btn-thm" onClick={()=>VerifyReport(docs.doc_name)}
        >Verify</button>
       
        </>,
        verify: docs.verify,
      };

      tempCode.push(temp);
    });
    // data = tempCode;
    setUpdatedCode(tempCode);
  }, [documents,uploadedFiles,changes,data]);

    return (
      <UploadedReportTabularView
        title="Report Documents"
        data={updatedCode}
        headCells={headCells}
        disable={disable}
        downloadAllFiles={downloadAllFiles}
        onSubmitHandler={onSubmitHandler}
        addNewLabel = {addNewLabel}
        setNewLabel={setNewLabel}
        closeModal={closeModal}
        openModal={openModal}
        isModalOpen={isModalOpen}
      />
    );
  }