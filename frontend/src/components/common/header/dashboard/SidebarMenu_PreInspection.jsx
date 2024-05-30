import Link from "next/link";
import { useRouter } from "next/router";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";

const SidebarMenu = ({ VehicleType,leadId, email, policyNo, vehicleNo, Insured ,Region,BrokerMailAddress,GarageMailAddress,isClaimPage}) => {
  
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isBill,setIsBill]=useState(true)
  
  const [isprint,setIsPrint]=useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [isFinalReport,setIsFinalReport] = useState(false);
  const [ isClaimDetails,setIsClaimDetails] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const openQuoteModal = () => {
    setIsQuoteModalOpen();
  };
  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const myProperties = [
    { id: 1, name: "General Elements", route: "/my-properties" },
    { id: 2, name: "Advanced Elements", route: "/my-properties" },
    { id: 3, name: "Editors", route: "/my-properties" },
  ];
  const reviews = [
    { id: 1, name: "My Reviews", route: "/my-review" },
    { id: 2, name: "Visitor Reviews", route: "/my-review" },
  ];
  const manageAccount = [
    {
      id: 1,
      name: "My Package",
      route: "/my-package",
      icon: "flaticon-box",
    },
    {
      id: 2,
      name: "My Profile",
      route: "/my-profile",
      icon: "flaticon-user",
    },
    { id: 3, name: "Logout", route: "/login", icon: "flaticon-logout" },
  ];

  const checkIsActive = (path)=>{
    const defaultUrl = window.location.href;
    return defaultUrl.toLowerCase().includes(path.toLowerCase());
  }

  useEffect(()=>{
    const url = window.location.href;
    let userData = JSON.parse(localStorage.getItem("userInfo"))
    if(!userData){
      route.push("/login")
    }
    else{
    if(String(userData[0].isBill) === "0"){
      setIsBill(false)
    }
    if(String(userData[0].IsPrintDocument) === "0"){
      setIsPrint(false)
    }
    if(String(url).includes("/claim-details")){
      setIsClaimDetails(true);
    }
    if(String(url).includes("/inspection-report")){
      setIsFinalReport(true);
    }
  }
  },[]);

  const isIncludingPath = (checkPath,currentPath)=>{
    return String(currentPath).toLowerCase().includes(checkPath)
  }

  return (
    <>
      <div className="container">
        <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              Logo
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>

            <ul className="sidebar-menu">
              <li className="sidebar_header header">
                <Link href="/">
                  <Image
                    width={40}
                    height={45}
                    src="/assets/images/Claim_Logo.jpg"
                    alt="header-logo2.png"
                  />
                  <span style={{ fontSize: "21px" }}>Claim Management</span>
                </Link>
              </li>
              {/* End header */}

              <li className="title">
                {/* <span>Main</span> */}
                <ul>
                  <li
                    className={`treeview ${
                      checkIsActive("/my-dashboard")
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href="/my-dashboard" title="Dashboard">
                      <i className="flaticon-home"></i>
                      {/* <span> Dashboard</span> */}
                    </Link>
                  </li>
                  <li
                    className={`treeview ${
                      checkIsActive("/add-claim")
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href="/add-claim" title="Add Claims">
                      <i className="flaticon-plus"></i>
                      {/* <span> Create Listing</span> */}
                    </Link>
                  </li>
                  <li
                    className={`treeview ${
                      checkIsActive(
                        `/preinspection-claim-details?`
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href={`/preInspection-claim-details?leadId=${leadId}`} title="Preinspection Claim Details">
                      <i className="flaticon-building"></i>
                      {/* <span> Message</span> */}
                    </Link>
                  </li>
                  {isClaimPage && <li
                    className={`treeview ${
                      isIncludingPath(
                        `inspection-report`,
                          route.pathname
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href={`inspection-report?vehicleType=${VehicleType}&leadId=${leadId}`} title="Final Report">
                      <i className="flaticon-invoice"></i>
                     
                    </Link>
                  </li>}
                  {isClaimPage && <li
                    className={`treeview ${
                      isIncludingPath(
                        `/preinspection-send-email`,
                        route.pathname
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      href={`/preinspection-send-email/${leadId}?email=${email}&policyNo=${policyNo}&vehicle=${vehicleNo}&Insured=${Insured}&Region=${Region}&GarageMailAddress=${GarageMailAddress}&BrokerMailAddress=${BrokerMailAddress}`}
                      title="Send Mail"
                    >
                      <i className="flaticon-envelope"></i>
                      {/* <span> Message</span> */}
                    </Link>
                  </li>}
                 
                 {isBill && <li
                    className={`treeview ${
                      checkIsActive("/bill-creation",route.pathname)
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      href={`/bill-creation/${leadId}`}
                      title="Bill Creation"
                    >
                      <i className="flaticon-document"></i>
                      <span> </span>
                    </Link>
                  </li>
                  }
                  
                  {isprint && <li
                    className={`treeview ${
                      isIncludingPath(
                        `/preinspection-print-document`,
                        route.pathname
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      href={`/preinspection-print-document/${leadId}`}
                      title="Print Document"
                    >
                      <i className="flaticon-pdf"></i>
                      <span> </span>
                    </Link>
                  </li>}
                </ul>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
