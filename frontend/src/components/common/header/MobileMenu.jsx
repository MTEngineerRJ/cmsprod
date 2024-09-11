import Link from "next/link";
import MobileMenuContent from "./MobileMenuContent";
import SidebarMenu from "./dashboard/SidebarMenu";
import SidebarMenuWithoutLogin from "./dashboard/SidebarMenu_without_Login";
import Image from "next/image";
import { useEffect, useState } from "react";

const MobileMenu = () => {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setisUserLoggedIn(true);
    }
  }, []);
  return (
    // <!-- Main Header Nav For Mobile -->
    <div className="stylehome1 h0 mega-menu-wrapper">
      <div className="mobile-menu">
        <div className="header stylehome1">
          <div className="main_logo_home2 text-center">
            <Image
              width={40}
              height={45}
              className="nav_logo_img contain mt20"
              src="/assets/images/Claim_Logo.jpg"
              alt="header-logo2.png"
            />
            <span className="mt-0">Claim Management</span>
          </div>
          {/* main_logo_home2 */}

          <ul className="menu_bar_home2">
            <li className="list-inline-item list_s">
              <Link href="/login">
                <span className="flaticon-user"></span>
              </Link>
            </li>
            <li
              className="list-inline-item"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <a>
                <span></span>
              </a>
            </li>
          </ul>
          {/* menu_bar_home2 */}
        </div>
      </div>
      {/* <!-- /.mobile-menu --> */}

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
        data-bs-scroll="true"
      >
        {/* <MobileMenuContent /> */}
        {
          isUserLoggedIn ?
            <SidebarMenu />
            :
            <SidebarMenuWithoutLogin />
        }
      </div>
    </div>
  );
};

export default MobileMenu;
