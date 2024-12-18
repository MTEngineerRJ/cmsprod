import { useEffect, useState } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_PreInspection";
import MobileMenu from "../../common/header/MobileMenu";
import BillCreateView from "./BillCreateView";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const Index = () => {
  const [allInfo, setAllInfo] = useState(null);
  const [leadID, setLeadID] = useState(0);
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
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const url = window.location.pathname;
    const leadId = url.split("/inspection-bill-creation/")[1];
    setLeadID(leadId);

    toast.loading("Fetching bill creation!!", {
      className: "toast-loading-message",
    });
    axios
      .get("/api/getBillInfo", {
        headers: {
          Authorization: `Bearer ${userData[0].Token}`,
        },
        params: {
          LeadId: leadId,
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully fetched !", {
          className: "toast-loading-message",
        });
        setAllInfo(res.data.data);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Got error while fetching details!");
        console.log(err);
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
          <SidebarMenu leadId={leadID} isClaimPage={false}/>
        </div>
      </div>

      <section className="our-dashbord dashbord bgc-f7 pb50">
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

                <div className="col-lg-12 mb-2">
                  <div className="style2"></div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="my_dashboard_review bgc-f6">
                      <div className="row">
                        <div className="col-lg-12">
                          <h4 className="mb10">Bill Creation</h4>
                        </div>
                        <div
                          className=" bg-dark"
                          style={{
                            width: "100%",
                            height: "3px",
                            color: "blue",
                            border: "1px solid",
                            marginBottom: "5px",
                          }}
                        ></div>
                        <BillCreateView allInfo={allInfo} leadID={leadID} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3"></div>
                </div>
              </div>

              <div className="row mt200">
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
