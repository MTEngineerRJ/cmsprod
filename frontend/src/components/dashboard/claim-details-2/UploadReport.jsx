
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import AWS from 'aws-sdk';
import toast from "react-hot-toast";
import { uploadReportTableHeaders } from "./DataHeaders";


AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
});


const REGION = process.env.NEXT_PUBLIC_REGION;

const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;

const myBucket= new AWS.S3({params:{Bucket:S3_BUCKET},region:REGION});


const UploadReort = ({ leadId ,claim}) => {
  const [garage, setGarage] = useState("");
  const [reportType, setReportType] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [disable,setDisable]=useState(false);
  const [loc,setLoc]=useState("")
  const router = useRouter();

  const [allDocumentLabels,setALlDocumentLabels]=useState([]);

  useEffect(()=>{
    axios.get("/api/getDocumentListLabels", {
      headers: {
        Authorization: `Bearer ${""}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
        setALlDocumentLabels(res.data.data.results);
    })  
    .catch((err) => {
      console.log(err);
    });
  },[]);



  const location = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLoc(latitude + "," + longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };


  const onUploadDoc =  ()  => {

    const unserInfo = JSON.parse(localStorage.getItem("userInfo"))
   
    location();
    
    setDisable(true);
   
    const selectedFileCurrent = uploadedFile;
    
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
      
          const payload = {
            garage: garage,
            reportType: reportType,
            fileName: fileName,
            fileUrl: S3_URL,
            LeadId: leadId,
            token: unserInfo[0].Token,
            uploadedBy: unserInfo[0].Username
          };

          toast.loading("Uploading the  report!!", {
            // position: toast.POSITION.BOTTOM_LEFT,
            className: "toast-loading-message",
          });

          axios.post("/api/uploadReportDocument",payload).
          then((res)=>{
            toast.dismiss();
            // toast.success("Successfully added");
            toast.success("Successfully added !", {
              // position: toast.POSITION.BOTTOM_LEFT,
              className: "toast-loading-message",
            });
            window.location.reload();
          }).
          catch((err)=>{
            toast.error("Got error while adding report!");
          })

        }
      })

       
        
    setDisable(false)
  };



  
  const [data,setData]=useState([])

  
  useEffect(()=>{
    axios.get("/api/getDocumentListLabels",{
      params:{
        leadId : leadId
      }
    })
    .then((res)=>{
      const tempAllDocsLabel = res.data.data.results;
      const allLabelCount = uploadReportTableHeaders.length
      let newAddOnLabels = []

      uploadReportTableHeaders.map((data,index)=>{
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

  },[])


  const fileUploadHandler = async (e) => {
    const file = e.target.files[0];
   setUploadedFile(file);
   setFileName(file.name)
  };
  // Helper function to read file asynchronously
  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="faq_according row">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button
                class="btn accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Upload Report</h4>
                <div className="col-lg-1 m-1"></div>
              </button>
            </h2>
            <div
              id="collapseFour"
              class="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body bgc-f6">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row mt-1 mb-1">
                      <div className="col-lg-3 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            color: "#1560bd",
                            fontWeight: "",
                          }}
                        >
                          Select Gaarge <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <select
                          className="selectpicker form-select"
                          data-live-search="true"
                          data-width="100%"
                          value={garage}
                          onChange={(e) => setGarage(e.target.value)}
                        >
                          <option data-tokens="Status1">-</option>
                          <option data-tokens="Status1">
                            {claim?.garageDetails?.GarageNameAndAddress}
                          </option>
                          {/* <option data-tokens="Status2">Delhi</option>
                                      <option data-tokens="Status3">Chandigarh</option> */}
                        </select>
                      </div>
                      <div className="col-lg-4">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            color: "#1560bd",
                            cursor: "pointer",
                            fontWeight: "",
                          }}
                        >
                          Simple Preliminary Report{" "}
                          <span className="flaticon-pdf"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row mt-1 mb-1">
                      <div className="col-lg-3 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            color: "#1560bd",
                            fontWeight: "",
                          }}
                        >
                          Report Type <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <select
                          className="selectpicker form-select"
                          data-live-search="true"
                          data-width="100%"
                          value={reportType}
                          onChange={(e) => setReportType(e.target.value)}
                        >
                          {data.map((type, index) => {
                            return (
                              <option
                                data-tokens="Status1"
                                value={type.doc_name}
                                key={type.serial_num}
                              >
                                {type.doc_name}
                              </option>
                            );
                          })}

                          {/* <option data-tokens="Status2">Delhi</option>
                                      <option data-tokens="Status3">Chandigarh</option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row mt-1 mb-1">
                      <div className="col-lg-3 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            color: "#1560bd",
                            fontWeight: "",
                          }}
                        >
                          File Name <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          value={fileName}
                          onChange={(e) => setFileName(e.target.value)}
                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row mt-1 mb-1">
                      <div className="col-lg-3 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            color: "#1560bd",
                            fontWeight: "",
                          }}
                        >
                          Attach File <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="file"
                          className="form-control"
                          id="fileInput"
                          onChange={fileUploadHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 text-end">
                    <button
                      className="btn btn-color mt-0 "
                      onClick={(e)=>onUploadDoc(e)}
                      disabled={disable}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadReort;
