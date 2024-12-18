import { useEffect, useState } from "react";
import ErrorPageContent from "./ErrorPageContent";
import axios from "axios";
import Image from "next/image";
import { useRef } from "react";
import PrintComponent from "./PrintComponent";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const Index = () => {
  const [allInfo, setAllInfo] = useState(null);
  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(
    Date.now()
  );
  const [spotInfo,setspotInfo] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const activityHandler = () => {
      setLastActivityTimestamp(Date.now());
    };

    // Attach event listeners for user activity
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);

    // Cleanup event listeners when the component is unmounted
    return () => {
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("click", activityHandler);
    };
  }, []);

  useEffect(() => {
    let userData = {};
    userData = JSON.parse(localStorage.getItem("userInfo"));
    if (!userData) {
      router.push("/login");
    }
    const inactivityCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTimestamp;
      if (timeSinceLastActivity > 1200000) {
        localStorage.removeItem("userInfo");
        router.push("/login");
      }
    }, 30000);
    return () => clearInterval(inactivityCheckInterval);
  }, [lastActivityTimestamp]);

  useEffect(() => {
    let userData = {};
    userData = JSON.parse(localStorage.getItem("userInfo"));
    const url = window.location.pathname;
    const leadId = url.split("/spot-document/")[1];

    console.log(leadId);
    toast.loading("Loading the report!!", {
      // position: toast.POSITION.BOTTOM_LEFT,
      className: "toast-loading-message",
    });
    axios
      .get("/api/getReportInfo", {
        headers: {
          Authorization: `Bearer ${userData[0]?.Token}`,
        },
        params: {
          LeadId: leadId,
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully loaded !", {
          className: "toast-loading-message",
        });
        setAllInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error("Got error while loading report!");
      });

      axios
      .get("/api/getSpotReportInfo", {
        headers: {
          Authorization: `Bearer ${userData[0].Token}`,
        },
        params:{
          LeadId : leadId
        }
      })
      .then((res) => {
       const tempData = res?.data?.data;
       setspotInfo(tempData)
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div>
        <PrintComponent allInfo={allInfo}>
          <Toaster />
          <div>
            {
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <ErrorPageContent
                     spotInfo={spotInfo}
                     allInfo={allInfo} />
                  </div>
                </div>
              </div>
            }
          </div>
        </PrintComponent>
      </div>
    </>
  );
};

export default Index;
