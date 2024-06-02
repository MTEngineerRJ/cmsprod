import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_01";
import MobileMenu from "../../common/header/MobileMenu";
import ClaimsHeadingCards from "./ClaimsHeadingCards";
import BaseView from "./BaseView";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import Pagination from "./Pagination";
import { useRouter } from "next/router";

const Index = () => {
  const [start, setStart] = useState(0);
  const [allClaims, setAllClaims] = useState([]);
  const [filterCardClaim, setFilterCardClaim] = useState([]);
  const [selectedCard, setSelectedCard] = useState(1);
  const [end, setEnd] = useState(10);
  const [type, setType] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(true);
  const [filterClaims, setFilterClaims] = useState([]);
  const [majorSearch, setMajorSearch] = useState("");

  const [status, setStatus] = useState([]);
  const [isRegionChange, setIsRegionChange] = useState(false);
  const [regionSearchValue, setRegionSearchValue] = useState("");

  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(
    Date.now()
  );

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
    let filterClaim;
    if (type === 1) {
      filterClaim = allClaims.filter((claim, index) =>
        claim?.PolicyNo?.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else if (type === 2) {
      filterClaim = allClaims.filter((claim, index) =>
        claim?.RegistrationNo?.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      filterClaim = allClaims.filter((claim, index) =>
        claim?.ReferenceID?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setFilterClaims(filterClaim);
  }, [searchInput]);

  const [filterAccordingClaim, setFilterAccordingClaim] = useState([]);
  const [showRegionClaim, setShowRegionClaim] = useState(false);
  useEffect(() => {
    const region = JSON.parse(localStorage.getItem("regionType"));
    if (region) {
      setShowRegionClaim(true);
      const filterAccordingToRegion = allClaims.filter((claim) => {
        if (claim.Region == region) {
          return true;
        } else {
          return false;
        }
      });
      setFilterClaims(filterAccordingToRegion);
      setFilterAccordingClaim(filterAccordingToRegion);
      setFilterCardClaim(filterAccordingToRegion);
    } else {
      setShowRegionClaim(false);
    }
  }, [regionSearchValue]);

  useEffect(() => {
    let filterClaim;
    filterClaim = allClaims.filter(
      (claim, index) =>
        String(claim?.LeadID)
          ?.toLowerCase()
          .includes(majorSearch.toLowerCase()) ||
        claim?.PolicyNo?.toLowerCase().includes(majorSearch.toLowerCase()) ||
        claim?.PolicyHolder?.toLowerCase().includes(
          majorSearch.toLowerCase()
        ) ||
        claim?.ReferenceID?.toLowerCase().includes(majorSearch.toLowerCase()) ||
        claim?.RegistrationNo?.toLowerCase().includes(
          majorSearch.toLowerCase()
        ) ||
        claim?.AssignedGarage?.toLowerCase().includes(
          majorSearch.toLowerCase()
        ) ||
        claim?.Region?.toLowerCase().includes(majorSearch.toLowerCase())
    );

    setFilterClaims(filterClaim);
  }, [majorSearch]);

  const fetchData = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === "") {
      router.push("/login");
    } else {
      const Region1 = userInfo[0]["Region1"];
      const Region2 = userInfo[0]["Region2"];
      const Region3 = userInfo[0]["Region3"];
      const Region4 = userInfo[0]["Region4"];
      const Region5 = userInfo[0]["Region5"];
      const CalimStatus = userInfo[0]["CalimStatus"];
      const Region6 = userInfo[0].IsPreInspection ? "Preinspection" : "";
      const Username = userInfo[0].Username;
      
      toast.loading("Loading the claims!!", {
        className: "toast-loading-message",
      });
      axios
        .get("/api/getAllClaims", {
          params: {
            Region1,
            Region2,
            Region3,
            Region4,
            Region5,
            Region6,
            CalimStatus,
            Username
          },
          headers: {
            Authorization: `Bearer ${userInfo[0]?.Token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.dismiss();
          toast.success("Successfully loaded all claims", {
            className: "toast-loading-message",
          });
          setAllClaims(res.data.data[0]);
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("error while fetching all claims!");
        });

      axios
        .get("/api/getStatus", {
          headers: {
            Authorization: `Bearer ${userInfo[0]?.Token}`,
            "Content-Type": "application/json",
          },
          params: {
            leadId: "",
          },
        })
        .then((res) => {
          const temp = res.data.data;
          setStatus(temp);
        })
        .catch((err) => {
          console.log(err);
        });

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let temp = [];
    let cardsDetails = [];
    if (selectedCard === 12) {
      allClaims.map((claim, index) => {
        const isAccordingToStatus = String(claim?.Region)
          .toLowerCase()
          .includes(String(regionSearchValue).toLowerCase());
        if (isAccordingToStatus) {
          temp.push(claim);
        }
      });
    } else {
      temp = allClaims.filter((claim, index) => {
        const isAccordingToStatus = String(claim?.Region)
          .toLowerCase()
          .includes(String(regionSearchValue).toLowerCase());
        if (
          String(claim?.CurrentStatus) === String(selectedCard) &&
          isAccordingToStatus
        ) {
          cardsDetails.push(claim);
          return true;
        }
        if (isAccordingToStatus) {
          cardsDetails.push(claim);
          return false;
        } else {
          return false;
        }
      });
    }
    setFilterClaims(temp);
    setFilterCardClaim(cardsDetails);
  }, [selectedCard, regionSearchValue, allClaims]);

  const getRequiredClaimsForPagination = () => {
    let requiredClaims = [];
    allClaims.map((claim, index) => {
      const isAccordingToStatus = String(claim?.Region)
        .toLowerCase()
        .includes(String(regionSearchValue).toLowerCase());
      if (
        String(claim?.CurrentStatus) === String(selectedCard) &&
        isAccordingToStatus
      ) {
        requiredClaims.push(claim);
      }
    });
    return requiredClaims;
  };

  return (
    <>
      <Header
        setIsRegionChange={setIsRegionChange}
        isDashboard={true}
        setSelectedCard={setSelectedCard}
        setRegionSearchValue={setRegionSearchValue}
      />
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
              </div>
              <div
                className="row mt-2"
                style={{ justifyContent: "space-between" }}
              >
                <ClaimsHeadingCards
                  allClaims={
                    selectedCard === 12 || majorSearch !== ""? filterClaims : filterCardClaim
                  }
                  majorSearch={majorSearch}
                  selectedCard={selectedCard}
                  regionSearchValue={regionSearchValue}
                  setSelectedCard={setSelectedCard}
                />
              </div>
{/*               <div
                className=" bg-dark"
                style={{
                  width: "101%",
                  height: "3px",
                  color: "blue",
                  border: "1px solid",
                  marginBottom: "5px",
                  marginLeft: "-12px",
                }}
              ></div> */}
              <div
                className="row my_profile_setting_input form-group"
                style={{ marginLeft: "-25px" }}
              ></div>
              <div
                className="bg-dark"
                style={{
                  width: "101%",
                  height: "3px",
                  color: "blue",
                  border: "1px solid blue",
                  marginLeft: "-12px",
                }}
              ></div>
              <div className="row">
                <BaseView
                  claims={filterClaims}
                  IsLoading={IsLoading}
                  start={start}
                  selectedCard={selectedCard}
                  end={end}
                  setMajorSearch={setMajorSearch}
                  status={status}
                />
              </div>

              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination
                      setStart={setStart}
                      setEnd={setEnd}
                      start={start}
                      end={end}
                      properties={filterClaims}
                    />
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
