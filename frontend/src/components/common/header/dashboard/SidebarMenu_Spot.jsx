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

const SidebarMenu = ({ isInspectionType,leadId, email, policyNo, vehicleNo, Insured ,Region,BrokerMailAddress,GarageMailAddress}) => {
  
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isBill,setIsBill]=useState(true)
  
  const [isprint,setIsPrint]=useState(true);
  const toggle = () => setIsOpen(!isOpen);


  const checkIsActive = (path)=>{
    const defaultUrl = window.location.href;
    return defaultUrl.toLowerCase().includes(path.toLowerCase());
  }

  useEffect(()=>{
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
  }
  },[]);

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
                        `/spot-claim-details`
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href={`/spot-claim-details?leadId=${leadId}`} title="Spot Claim Details">
                      <i className="flaticon-building"></i>
                      {/* <span> Message</span> */}
                    </Link>
                  </li>
                  <li
                    className={`treeview ${
                      checkIsActive(
                        `/spot-report`
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href={`/spot-report/${leadId}`} title="Spot Report">
                      <i className="flaticon-invoice"></i>
                     
                    </Link>
                  </li>
                  <li
                    className={`treeview ${
                      checkIsActive(
                        `/send-mail`
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      href={`/send-mail/${leadId}?email=${email}&policyNo=${policyNo}&vehicle=${vehicleNo}&Insured=${Insured}&Region=${Region}&GarageMailAddress=${GarageMailAddress}&BrokerMailAddress=${BrokerMailAddress}`}
                      title="Send Mail"
                    >
                      <i className="flaticon-envelope"></i>
                      {/* <span> Message</span> */}
                    </Link>
                  </li>
                 
                 {isBill && <li
                    className={`treeview ${
                      checkIsActive("/spot-bill-creation")
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      href={`/spot-bill-creation/${leadId}`}
                      title="Bill Creation"
                    >
                      <i className="flaticon-document"></i>
                      <span> </span>
                    </Link>
                  </li>
                  }
                  
                  {isprint && <li
                    className={`treeview ${
                      isSinglePageActive(
                        `/spot-print-document/${leadId}`,
                        route.pathname
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      href={`/spot-print-document/${leadId}`}
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
