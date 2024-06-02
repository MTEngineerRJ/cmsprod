import { useEffect, useState } from "react";
import CopyrightFooter from "../../common/footer/CopyrightFooter";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/DefaultHeader";
import MobileMenu from "../../common/header/MobileMenu_01";
import Exemple from "./Exemple";
import DocumentUpload from "./DocumentUpload"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Index = ({ leadId, token, content ,type}) => {
  const [check, setCheck] = useState(false);
  const [leadToken, setLeadToken] = useState(token ? token : "");
  const [status, setStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [document, setDocument] = useState([]);
  const [uploadedData, setUpdatedData] = useState([]);

  const [isNotValidLink, setIsNotValidLink] = useState(true);



  const router = useRouter();


  const types = [
    { name: "Certificate of registration" },
    { name: "Insurance policy" },
    { name: "Damage vehicle photographs/video" },
    { name: "Aadhar card" },
    { name: "Pan card" },
    {name : "Signature"},
    { name: "Images" },
    { name: "Videos" },
  ];

  useEffect(() => {
    const unserInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .get("/api/getStatus", {
        headers: {
          Authorization: `Bearer ${""}`,
          "Content-Type": "application/json",
        },
        params: {
          leadId: "",
        },
      })
      .then((res) => {
        const temp = res.data.data;
        console.log(temp);
        const updatedStatus = temp.filter((data, index) => {
          if (String(data.LeadId) === leadId) {
            return true;
          } else {
            return false;
          }
        });

        const statlen = updatedStatus.length;

        setStatus(updatedStatus[statlen - 1]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/api/getDocumentList", {
        headers: {
          Authorization: `Bearer ${""}`,
          "Content-Type": "application/json",
        },
        params: {
          leadId: leadId,
        },
      })
      .then((res) => {
        const temp = res.data.data;
        console.log(temp);
        const updatedStatus = temp?.filter((data, index) => {
          if (String(data.LeadId) === leadId) {
            return true;
          } else {
            return false;
          }
        });

        setDocument(updatedStatus);
      })
      .catch((err) => {
        console.log(err);
      });                               

    setIsLoading(false);

    setCheck(true);
  }, []);

  useEffect(() => {
    const unserInfo = JSON.parse(localStorage.getItem("userInfo"));

    const current_url = window.location.href
    const current_type = current_url?.split("&type=")[1]
    const type_ = current_type?.split("&content=")[0]
    console.log(type_, current_type,current_url )
    const payload = {
      token: token,
      leadId: Number(leadId),
      type:Number(type_)
    };
    // console.log('22222222222222',payload)
    axios
      .post("/api/getClaimDetails", payload, {
        headers: {
          Authorization: `Bearer ${""}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsNotValidLink(false);
        // alert("Successfully found!!");
      })
      .catch((Err) => {
        // alert(Err)
      });
    setCheck(false);
  }, [check]);


  const calculateDocuments=()=>{
    const url = window.location.pathname;
    const inputString = url?.split("&content=")[1];
    const numberOfCommas = (inputString?.split(",").length - 1);
   if(inputString === "")
    return 10;
    return numberOfCommas;
  }

   const onSubmitHandler = () => {

    console.log("uploaded",uploadedData);

    let data = [];
    for (let i = 0; i < 17; i = i + 1) {
      const temp = types[i].name;
      const tempArray = [];
      uploadedData.map((data, index) => {
        if (data.docName === temp) {
          tempArray.push(data.data);
        }
      });

      if (tempArray.length > 0) {
        data.push({
          leadId: leadId,
          docName: temp,
          data: tempArray,
        });
      }
    }

    console.log(String(calculateDocuments()) !== String(data.length),data.length,data)
    if (
      !data)
       {
        toast.error("Please upload all the required data !!!");
     
    } else {

      const unserInfo = JSON.parse(localStorage.getItem("userInfo"));
      
      
      const payload = JSON.stringify({type:type, data: data });

      toast.loading("Saving the media's to DB !!", {
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
          toast.dismiss();
          // toast.success("Successfully added");
          toast.success("Successfully Saved !", {
            // position: toast.POSITION.BOTTOM_LEFT,
            className: "toast-loading-message",
          });
          window.location.reload();
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("Got error while saving to DB!");
        });
    }
  };
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />
      <toaster/>

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {isLoading ? (
        <section className="our-error bgc-f7 mt-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="ring">
                  Loading
                  <span className="load"></span>
                </div>{" "}
              </div>
            </div>
          </div>
        </section>
      ) : isNotValidLink ? (
        <section className="our-error bgc-f7 mt-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <p style={{ color: "black" }}>
                  The page cannot be accessed with the provided link.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="our-error bgc-f7 mt-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <DocumentUpload
                  setUpdatedData={setUpdatedData}
                  uploadedData={uploadedData}
                  leadId={leadId}
                  status={status}
                  content={content}
                  document={document}
                />
                <button className="btn btn-color" onClick={onSubmitHandler}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* <!-- Our Footer --> */}
      {/* <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section> */}

      {/* <!-- Our Footer Bottom Area --> */}
      <div className="footer_middle_area">
        <div className="container">
          <CopyrightFooter />
        </div>
      </div>
    </>
  );
};

export default Index;