import Link from "next/link";
import { useRouter } from "next/router";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";

const SidebarMenu = ({ leadId, email, policyNo, vehicleNo, Insured }) => {
  console.log(leadId);
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
                    src="/assets/images/header-logo2.png"
                    alt="header-logo2.png"
                  />
                  <span>FindHouse</span>
                </Link>
              </li>
              {/* End header */}

              <li className="title">
                {/* <span>Main</span> */}
                <ul>
                  <li
                    className={`treeview ${
                      isSinglePageActive("/my-dashboard", route.pathname)
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
                      isSinglePageActive("/add-claim", route.pathname)
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
                      isSinglePageActive(
                        `/final-report/${leadId}`,
                        route.pathname
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href={`/final-report/${leadId}`} title="Final Report">
                      <i className="flaticon-invoice"></i>
                      {/* <span> Message</span> */}
                    </Link>
                  </li>
                  <li
                    className={`treeview ${
                      isSinglePageActive(
                        `/send-mail/${leadId}?email=${email}&policyNo=${policyNo}&vehicle=${vehicleNo}&Insured=${Insured}`,
                        route.pathname
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      href={`/send-mail/${leadId}?email=${email}&policyNo=${policyNo}&vehicle=${vehicleNo}&Insured=${Insured}`}
                      title="Send Mail"
                    >
                      <i className="flaticon-envelope"></i>
                      {/* <span> Message</span> */}
                    </Link>
                  </li>
                  <li
                    className={`treeview ${
                      isSinglePageActive("/bill-creation", route.pathname)
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href="/bill-creation" title="Bill Creation">
                      <i className="flaticon-document"></i>
                      <span> </span>
                    </Link>
                  </li>
                  <li
                    className={`treeview ${
                      isSinglePageActive("/mis-sheet", route.pathname)
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href="/mis-sheet" title="MIS Sheet">
                      <i className="flaticon-document"></i>
                      <span> </span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* End Main */}

              <li className="title">
                {/* <span>Manage Listings</span> */}
                <ul>
                  {/* <li
                    className={`treeview ${
                      isParentPageActive(myProperties, route.pathname)
                        ? "active"
                        : ""
                    }`}
                  >
                    <a data-bs-toggle="collapse" href="#my-property">
                      <i className="flaticon-home"></i>{" "}
                      <span>My Properties</span>
                      <i className="fa fa-angle-down pull-right"></i>
                    </a>
                    <ul className="treeview-menu collapse" id="my-property">
                      {myProperties.map((item) => (
                        <li key={item.id}>
                          <Link href={item.route}>
                            <i className="fa fa-circle"></i> {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li> */}
                  {/* end properties */}

                  {/* <li
                    className={`treeview ${
                      isParentPageActive(reviews, route.pathname)
                        ? "active"
                        : ""
                    }`}
                  >
                    <a data-bs-toggle="collapse" href="#review">
                      <i className="flaticon-chat"></i>
                      <span>Reviews</span>
                      <i className="fa fa-angle-down pull-right"></i>
                    </a>
                    <ul className="treeview-menu collapse" id="review">
                      {reviews.map((item) => (
                        <li key={item.id}>
                          <Link href={item.route}>
                            <i className="fa fa-circle"></i> {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li> */}
                  {/* End Review */}

                  {/* <li
                    className={`treeview ${
                      isSinglePageActive("/my-saved-search", route.pathname)
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link href="/my-saved-search">
                      <i className="flaticon-magnifying-glass"></i>
                      <span> Saved Search</span>
                    </Link>
                  </li> */}
                </ul>
              </li>
              {/* End manage listing */}

              <li className="title">
                {/* <span>Manage Account</span> */}
                {/* <ul>
                  {manageAccount.map((item) => (
                    <li
                      className={
                        isSinglePageActive(item.route, route.pathname)
                          ? "active"
                          : ""
                      }
                      key={item.id}
                    >
                      <Link href={item.route}>
                        <i className={item.icon}></i> <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul> */}
              </li>
            </ul>
          </div>
        </div>
        {/* <main>{children}</main> */}
      </div>
    </>
  );
};

export default SidebarMenu;
