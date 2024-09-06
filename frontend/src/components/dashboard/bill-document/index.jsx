import { useEffect, useState } from "react";
import BaseLayout from "./BaseLayout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";

const Index = () => {
  const [feeReport, setFeeReport] = useState({});
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

  const [allOffices, setAllOffices] = useState([]);

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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    axios
      .get("/api/getClaimServicingOffice")
      .then((res) => {
        const allOffice = res.data.data.results;
        setAllOffices(allOffice);
      })
      .catch((err) => {
        console.log(err);
      });
    const url = window.location.pathname;
    const leadId = url.split("/bill-document/")[1];
    toast.loading("Fetching bill documents!!", {
      className: "toast-loading-message",
    });
    axios
      .get("/api/getFeeReport", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: leadId,
        },
      })
      .then((res) => {
        toast.dismiss();
        setFeeReport(res.data.data);
        toast.success("Successfully Fetched !", {
          className: "toast-loading-message",
        });
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Got error while fetching the bill information!");
      });
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <header className="bg-gray-800 text-white"></header>
        <main className="flex-grow p-4">
          {" "}
          <div className="col-lg-12">
            <BaseLayout feeReport={feeReport} allOffices={allOffices} />
          </div>
        </main>
        <footer className="bg-gray-800 text-white">
          <div
            style={{
              border: "1px solid black",
              marginBottom: "5px",
              marginTop: "5px",
            }}
          ></div>
          <div className="">
            <div className="d-flex align-item-center justify-content-center">
              <h5 className="text-dark" style={{ fontSize: "12px" }}>
                69 Model Town (1st) Behind UIT Office Sri Ganganagar Rajasthan
                335001
              </h5>
            </div>
          </div>
        </footer>
        <style>
          {`
          @media print {
            footer {
              position: fixed;
              bottom: 0;
              width: 100%;
              background-color: #333; /* Customize as needed */
              color: white; /* Customize as needed */
            }
          }
        `}
        </style>
      </div>
    </>
  );
};

export default Index;
