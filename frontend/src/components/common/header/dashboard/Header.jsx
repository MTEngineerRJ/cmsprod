import Link from 'next/link';
import { useEffect, useState } from 'react';
import HeaderMenuContent from './HeaderMenuContent';
import Image from 'next/image';

const Header = ({
  setIsRegionChange,
  setSelectedCard,
  isDashboard = true,
  setRegionSearchValue,
  setToDate,
  setFromDate,
  setInsurerChange,     
  setSelectedInsurer,
  setSelectedRegion,
  setInsurerSearchValue,
}) => {
  const [insurer, setInsurer] = useState(null);
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, []);

  // useEffect(() => {
  //   console.log("InsurerValue1:", setInsurerSearchValue);
  // }, [setInsurerSearchValue]);

  return (
    <header
      className={`header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu  ${
        navbar ? 'stricky-fixed ' : ''
      }`}>
      <div className="container-fluid p0">
        <Link
          href="/"
          className="navbar_brand float-start dn-smd">
          <Image
            width={40}
            height={45}
            className="logo1 img-fluid"
            src="/assets/images/Claim_Logo.jpg"
            alt="Claim_Logo.jpg"
          />
          <Image
            width={40}
            height={45}
            className="logo2 img-fluid"
            src="/assets/images/Claim_Logo.jpg"
            alt="Claim_Logo.jpg"
          />
          <span
            className="mb-1"
            style={{ fontSize: '25px' }}>
            Claim Management
          </span>
        </Link>

        <nav>
          <HeaderMenuContent
            setIsRegionChange={setIsRegionChange}
            isDashboard={isDashboard}
            setSelectedCard={setSelectedCard}
            setRegionSearchValue={setRegionSearchValue}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setSelectedRegion={setSelectedRegion}
            
            // Insurer-related props
            insurer={insurer}
            setInsurer={setInsurer}
            setInsurerSearchValue={setInsurerSearchValue}
            setSelectedInsurer={setSelectedInsurer}
            setInsurerChange={setInsurerChange}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;