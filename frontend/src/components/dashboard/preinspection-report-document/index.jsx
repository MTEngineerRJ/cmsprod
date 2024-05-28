import { useEffect, useState } from "react";
import BaseLayout from "./BaseLayout";
import axios from "axios";
import PrintComponent from "./PrintComponent";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const Index = () => {
  const [allInfo, setAllInfo] = useState(null);
  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(
    Date.now()
  );

  const router = useRouter();

  useEffect(() => {
    const activityHandler = () => {
      setLastActivityTimestamp(Date.now());
    };
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);
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
    const leadId = url.split("/preinspection-report-document/")[1];

    console.log(leadId);
    toast.loading("Loading the report!!", {
      className: "toast-loading-message",
    });
    axios
      .get("/api/preinspectionPrintDocumentDetails", {
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
  }, []);
  return (
    <>
      <div>
        <PrintComponent >
          <Toaster />
          <div>
            {
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <BaseLayout allInfo={allInfo}/>
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
