import { useRouter } from "next/router";
import MyAccount from "./MyAccount";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { regionList } from "../../../../utils/regionsList";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const insurerRegionMapping = {
  "United India Insurance Company Limited": [
    "Delhi",
    "Chandigarh",
    "Jaipur",
    "Jodhpur",
    "Hero",
    "Preinspection",
    "Spot",
  ],
  "National Insurance Company Limited": [
    "Bhopal",
    "Lucknow",
    "Dehradun",
    "Ludhiana",
    "Ahmedabad",
    "Vadodara",
    "Jaipur",
    "Ahmedabad",
    "Indore",
    "Ludhiana",
    "Nagpur",
    "Preinspection",
    "Spot",
  ],
  "The New India Assurance Company Limited": [
    "Bhopal",
    "Lucknow",
    "Dehradun",
    "Ludhiana",
    "Ahmedabad",
    "Vadodara",
    "Jaipur",
    "Preinspection",
    "Spot",
  ],
  "The Oriental Insurance Company Limited": [
    "Ahmedabad",
    "Indore",
    "Vadodara",
    "Nagpur",
    "Delhi RO1",
    "Lucknow",
    "Chandigarh",
    "Jaipur",
    "Dehradun",
    "Ambala",
    "Delhi RO2",
    "Guwahati",
    "Preinspection",
    "Spot",
  ],
};

const HeaderMenuContent = ({
  setIsRegionChange,
  isDashboard,
  setSelectedCard,
  setRegionSearchValue,
  setFromDate,
  setToDate,
  setInsurerChange,
  setInsurerSearchValue,
}) => {
  const route = useRouter();
  const [regionValue, setRegionValue] = useState("");
  const [allListedRegions, setAllListedRegions] = useState([]);
  const [name, setName] = useState("");
  const [localFromDate, setLocalFromDate] = useState(null);
  const [localToDate, setLocalToDate] = useState(null);
  const [selectedInsurer, setSelectedInsurer] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [allInsurers, setAllInsurers] = useState([]);

  // Convert UTC date to local time
  const convertToLocalTime = (utcDate) => {
    if (!utcDate) return null;
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 5); // Adjust from UTC to local time
    return date;
  };

  // Handle From Date Change
  const handleFromDateChange = (e) => {
    const date = e.value instanceof Date ? e.value : new Date(e.value);
    if (!isNaN(date)) {
      // Add 5 hours to the selected date to adjust for UTC-5
      date.setHours(date.getHours() + 5);
      const formattedDate = date.toISOString(); // Format in ISO format (UTC)

      setLocalFromDate(date);
      setFromDate(formattedDate); // Send adjusted date to parent
    } else {
      console.error("Invalid From Date:", e.value);
    }
  };

  // Handle To Date Change
  const handleToDateChange = (e) => {
    const date = e.value instanceof Date ? e.value : new Date(e.value);
    if (!isNaN(date)) {
      // Add 5 hours to the selected date to adjust for UTC-5
      date.setHours(date.getHours() + 20);
      const formattedDate = date.toISOString(); // Format in ISO format (UTC)

      setLocalToDate(date);
      setToDate(formattedDate); // Send adjusted date to parent
    } else {
      console.error("Invalid To Date:", e.value);
    }
  };

  // Fetch insurers on component mount
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
        setAllInsurers(res.data.InsurerData.result);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Got error while fetching Insurer Info!");
      });

    // Fetch initial dates from backend
    axios
      .get("/api/getDates")
      .then((response) => {
        const fromDate = convertToLocalTime(response.data.fromDate);
        const toDate = convertToLocalTime(response.data.toDate);
        setLocalFromDate(fromDate);
        setLocalToDate(toDate);
      })
      .catch((error) => {});
  }, []);

  // Handle insurer selection
  const handleInsurerChange = (e) => {
    const insurer = e.value;
    setSelectedInsurer(insurer);
    setSelectedRegion(null); // Reset region when insurer changes
    setRegionSearchValue(""); // Reset region search value

    // Update the parent state with the selected insurer
    if (setInsurerSearchValue) {
      setInsurerSearchValue(insurer); // Pass the insurer value to the parent component
    }

    // Optionally, if you want to trigger any insurer change action
    if (setInsurerChange) {
      setInsurerChange(true);
    }

    // Filter regions based on selected insurer, ensuring uniqueness
    if (insurer) {
      const regionsForInsurer = [
        ...new Set(
          regionList
            .filter(
              (region) =>
                insurerRegionMapping[insurer]?.includes(region.Region) ||
                region.Region === "Preinspection" ||
                region.Region === "Spot"
            )
            .map((region) => region.Region) // Extract only the region names
        ),
      ].map((uniqueRegion) => ({
        Region: uniqueRegion, // Re-map to the original structure if needed
      }));

      setAllListedRegions(regionsForInsurer);
    } else {
      setAllListedRegions([]);
    }
  };

  // Handle region change
  const handleRegionChange = (e) => {
    const region = e.value;
    setSelectedRegion(region);
    if (isDashboard) {
      setIsRegionChange(true);
    }
    setRegionSearchValue(region);
    setSelectedCard(1);
  };

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      {/* Insurer Dropdown */}
      <li className="last">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <Dropdown
            value={selectedInsurer}
            options={[
              { label: "Select Insurer", value: null },
              ...allInsurers.map((insurer) => ({
                label: insurer.name,
                value: insurer.name,
              })),
            ]}
            onChange={handleInsurerChange}
            placeholder="Select Insurer"
            style={{ width: "200px" }}
          />
        </div>
      </li>

      {/* Region Dropdown */}
      <li className="last">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <Dropdown
            value={selectedRegion}
            options={allListedRegions.map((region) => ({
              label: region.Region,
              value: region.Region,
            }))}
            onChange={handleRegionChange}
            placeholder="Select Region"
            disabled={!selectedInsurer}
            style={{ width: "200px" }}
          />
        </div>
      </li>

      {/* From Date Calendar */}
      <li className="calendar-item mt-2">
        <div className="flex-auto">
          <Calendar
            id="fromDateCalendar"
            value={localFromDate || null}
            onChange={handleFromDateChange}
            placeholder="From Date"
            style={{ width: "100px" }}
          />
        </div>
      </li>

      {/* To Date Calendar */}
      <li className="calendar-item mt-2">
        <div className="flex-auto">
          <Calendar
            id="toDateCalendar"
            value={localToDate || null}
            onChange={handleToDateChange}
            placeholder="To Date"
            style={{ width: "100px" }}
          />
        </div>
      </li>


      {/* User Profile Section */}
      <li className="user_setting mt-2">
        <div className="dropdown">
          <a className="btn dropdown-toggle" href="#" data-bs-toggle="dropdown">
            <Image
              width={45}
              height={45}
              className="rounded-circle"
              src="data:image/jpeg;base64,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"
              alt="e1.png"
            />
            <span className="dn-1199 ms-1">{name}</span>
          </a>
          <div className="dropdown-menu">
            <MyAccount />
          </div>
        </div>
      </li>
    </ul>
  );
};

export default HeaderMenuContent;
