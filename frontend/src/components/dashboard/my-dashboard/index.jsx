import Header from '../../common/header/dashboard/Header';
import SidebarMenu from '../../common/header/dashboard/SidebarMenu_01';
import MobileMenu from '../../common/header/MobileMenu';
import ClaimsHeadingCards from './ClaimsHeadingCards';
import BaseView from './BaseView';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Pagination from './Pagination';
import { useRouter } from 'next/router';
import { formatTheDataToHeaders, updatedFormatDate } from './functions';

const Index = () => {
  const [start, setStart] = useState(0);
  const [allClaims, setAllClaims] = useState([]);
  console.log('allClaims: ', allClaims);
  const [filterCardClaim, setFilterCardClaim] = useState([]);
  const [selectedCard, setSelectedCard] = useState(1);
  const [end, setEnd] = useState(10);
  const [type, setType] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(true);
  const [filterClaims, setFilterClaims] = useState([]);
  console.log('filterClaims: ', filterClaims);
  const [majorSearch, setMajorSearch] = useState('');

  const [status, setStatus] = useState([]);
  const [isRegionChange, setIsRegionChange] = useState(false);
  const [regionSearchValue, setRegionSearchValue] = useState('');
  

  const [fromDate, setFromDate] = useState(null);
  console.log('fromDate11: ', fromDate);
  const [toDate, setToDate] = useState(null);
  console.log('toDate: ', toDate);

  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(Date.now());

  const [insurerSearchValue, setInsurerSearchValue] = useState('');
  console.log('insurerSearchValue1: ', insurerSearchValue);
  
  const [selectedInsurer, setSelectedInsurer] = useState(null);


  useEffect(() => {
    // Log the region and date range when they are updated
    console.log('Region Search Value:', regionSearchValue);
    console.log('From Date:', fromDate);
    console.log('To Date:', toDate);
  }, [regionSearchValue, fromDate, toDate]);

  useEffect(() => {
    const activityHandler = () => {
      setLastActivityTimestamp(Date.now());
    };
    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('keydown', activityHandler);
    window.addEventListener('click', activityHandler);
    return () => {
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keydown', activityHandler);
      window.removeEventListener('click', activityHandler);
    };
  }, []);

  useEffect(() => {
    let userData = {};
    userData = JSON.parse(localStorage.getItem('userInfo'));
    if (!userData) {
      router.push('/login');
    }
    const inactivityCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTimestamp;
      if (timeSinceLastActivity > 1200000) {
        localStorage.removeItem('userInfo');
        router.push('/login');
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

    setFilterClaims(formatTheDataToHeaders(regionSearchValue, filterClaim));
  }, [searchInput]);

  const [filterAccordingClaim, setFilterAccordingClaim] = useState([]);
  const [showRegionClaim, setShowRegionClaim] = useState(false);
  useEffect(() => {
    const region = JSON.parse(localStorage.getItem('regionType'));
    if (region) {
      setShowRegionClaim(true);
      const filterAccordingToRegion = allClaims.filter((claim) => {
        if (claim.Region == region) {
          return true;
        } else {
          return false;
        }
      });

      setFilterClaims(formatTheDataToHeaders(regionSearchValue, filterAccordingClaim));
      setFilterAccordingClaim(filterAccordingToRegion);
      setFilterCardClaim(filterAccordingToRegion);
    } else {
      setShowRegionClaim(false);
    }
  }, [regionSearchValue]);

  useEffect(() => {
    let filterClaim;
    
    // Existing search logic for type-based filtering
    if (type === 1) {
      filterClaim = allClaims.filter((claim) =>
        claim?.PolicyNo?.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else if (type === 2) {
      filterClaim = allClaims.filter((claim) =>
        claim?.RegistrationNo?.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      filterClaim = allClaims.filter((claim) =>
        claim?.ReferenceID?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // Insurer filtering
    if (insurerSearchValue) {
      filterClaim = filterClaim.filter((claim) => 
        claim?.InsuranceCompany?.toLowerCase().includes(insurerSearchValue.toLowerCase())
      );
    }

    setFilterClaims(formatTheDataToHeaders(regionSearchValue, filterClaim));
  }, [searchInput, insurerSearchValue, type]);

  useEffect(() => {
    let filterClaim;
    filterClaim = allClaims.filter(
      (claim, index) =>
        String(claim?.LeadID)?.toLowerCase().includes(majorSearch.toLowerCase()) ||
        claim?.PolicyNo?.toLowerCase().includes(majorSearch.toLowerCase()) ||
        claim?.PolicyHolder?.toLowerCase().includes(majorSearch.toLowerCase()) ||
        claim?.ReferenceID?.toLowerCase().includes(majorSearch.toLowerCase()) ||
        claim?.RegistrationNo?.toLowerCase().includes(majorSearch.toLowerCase()) ||
        claim?.AssignedGarage?.toLowerCase().includes(majorSearch.toLowerCase()) ||
        claim?.Region?.toLowerCase().includes(majorSearch.toLowerCase())
    );

    setFilterClaims(formatTheDataToHeaders(regionSearchValue, filterClaim));
  }, [majorSearch]);

  const fetchData = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log('userInfo: ', userInfo);
    if (!userInfo || userInfo === '') {
      router.push('/login');
    } else {
      const CalimStatus = userInfo[0]['CalimStatus'];
      const Username = userInfo[0].Username;
  
      toast.loading('Loading the claims!!', {
        className: 'toast-loading-message',
      });
  
      axios
        .get('/api/getAllClaims', {
          params: {
            CalimStatus,
            Username,
            fromDate: fromDate && toDate ? updatedFormatDate(fromDate) : null,
            toDate: fromDate && toDate ? updatedFormatDate(toDate) : null,
          },
          headers: {
            Authorization: `Bearer ${userInfo[0]?.Token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          toast.dismiss();
          toast.success('Successfully loaded all claims', {
            className: 'toast-loading-message',
          });
          setAllClaims(res.data.data[0]);
        })
        .catch((err) => {
          toast.dismiss();
          toast.error('Error while fetching all claims!');
        });
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate]);

  useEffect(() => {
    let temp = [];
    let cardsDetails = [];

    const isWithinDateRange = (claimDate) => {
      if (!fromDate || !toDate) return true;
      const claimDateObj = new Date(claimDate.split('/').reverse().join('-'));
      const fromDateObj = new Date(fromDate.split('/').reverse().join('-'));
      const toDateObj = new Date(toDate.split('/').reverse().join('-'));
      return claimDateObj >= fromDateObj && claimDateObj <= toDateObj;
    };

    if (selectedCard === 12) {
      temp = allClaims.filter((claim) => {
        const isAccordingToRegion = String(claim?.Region)
          .toLowerCase()
          .includes(String(regionSearchValue).toLowerCase());
        
        const isAccordingToInsurer = !insurerSearchValue || 
          claim?.InsuranceCompany?.toLowerCase().includes(insurerSearchValue.toLowerCase());

        return isAccordingToRegion && 
               isWithinDateRange(claim.AddedDate) && 
               isAccordingToInsurer;
      });
    } else {
      temp = allClaims.filter((claim) => {
        const isAccordingToRegion = String(claim?.Region)
          .toLowerCase()
          .includes(String(regionSearchValue).toLowerCase());
        
        const isAccordingToInsurer = !insurerSearchValue || 
          claim?.InsuranceCompany?.toLowerCase().includes(insurerSearchValue.toLowerCase());
        
        const isInDateRange = isWithinDateRange(claim.AddedDate);

        if (
          String(claim?.CurrentStatus) === String(selectedCard) &&
          isAccordingToRegion &&
          isInDateRange &&
          isAccordingToInsurer
        ) {
          cardsDetails.push(claim);
          return true;
        }
        if (isAccordingToRegion && isInDateRange && isAccordingToInsurer) {
          cardsDetails.push(claim);
          return false;
        } else {
          return false;
        }
      });
    }

    setFilterClaims(temp);
    setFilterCardClaim(cardsDetails);
  }, [
    selectedCard, 
    regionSearchValue, 
    allClaims, 
    fromDate, 
    toDate, 
    insurerSearchValue
  ]);

  return (
    <>
      <Header
        setIsRegionChange={setIsRegionChange}
        isDashboard={true}
        setSelectedCard={setSelectedCard}
        setRegionSearchValue={setRegionSearchValue}
        setToDate={setToDate}
        setFromDate={setFromDate}
        insurerSearchValue={insurerSearchValue}
        setInsurerSearchValue={setInsurerSearchValue}
        setSelectedInsurer={setSelectedInsurer}
      />
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true">
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
                        aria-controls="DashboardOffcanvasMenu">
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row mt-2"
                style={{ justifyContent: 'space-between' }}>
                <ClaimsHeadingCards
                  allClaims={
                    selectedCard === 12 || majorSearch !== '' ? filterClaims : filterCardClaim
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
                style={{ marginLeft: '-25px' }}></div>
              <div
                className="bg-dark"
                style={{
                  width: '101%',
                  height: '3px',
                  color: 'blue',
                  border: '1px solid blue',
                  marginLeft: '-12px',
                }}></div>
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
                    <p> &copy; {new Date().getFullYear()} Infostics. Made with love.</p>
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
