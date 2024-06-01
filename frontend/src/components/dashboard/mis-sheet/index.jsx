import { useEffect, useState } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_01";
import MobileMenu from "../../common/header/MobileMenu";
import BaseView from "./BaseView";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import ExportToExcel from "./ExportToExcel";
import { useRouter } from "next/router";
import { convertToYYYYMMDD } from "./functions";

const Index = () => {
  const [allRows, setAllRows] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [allInsurer, setAllInsurer] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [RegionType, setRegionType] = useState("All");
  const [DateType, setDateType] = useState("intimation");

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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const Start = startDate ? convertToYYYYMMDD(startDate) : null;
    const End = endDate ? convertToYYYYMMDD(endDate) : null;

    toast.loading("Fetching the information!!", {
      className: "toast-loading-message",
    });
    axios
      .get("/api/misSheet", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          startDate: Start,
          EndDate: End,
          DateType: DateType,
          username : userInfo[0].Username
        },
      })
      .then((res) => {
        setAllRows(res.data.userData.misSheetDetails);
        toast.dismiss();
        toast.success("Fetched  Successfully !", {
          className: "toast-loading-message",
        });
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Got error while fetching Info!");
      });
  }, [startDate, endDate]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    axios
      .get("/api/getAllInsurers", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllInsurer(res.data.InsurerData.result);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Got error while fetching Insurer Info!");
      });
  }, []);
  return (
    <>
      <Header />
      <Toaster />
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      <section className="our-dashbord dashbord bgc-f6 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>

                <ExportToExcel
                  RegionType={RegionType}
                  setRegionType={setRegionType}
                  allRows={allRows}
                />

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <BaseView
                          RegionType={RegionType}
                          setRegionType={setRegionType}
                          allRows={allRows}
                          setStartDate={setStartDate}
                          setEndDate={setEndDate}
                          startDate={startDate}
                          allInsurer={allInsurer}
                          DateType={DateType}
                          setDateType={setDateType}
                          endDate={endDate}
                        />
                      </div>

                      <div className="mbp_pagination"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      {" "}
                      &copy; {new Date().getFullYear()} Infostics. Made with
                      love.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
