import { useState, useEffect } from "react";

const SearchFields = ({
  setSearchInput,
  setType,
  changeHandler,
  setStart,
  setEnd,
  allInsurer,
  reloadHandler,
  InsurerType,
  RegionType,
  setRegionType,
  setInsurerType,
  DateType,
  setDateType,
  changeInRegion,
  setChangeInRegion,
  start,
  end,
}) => {
  const [regions, setRegions] = useState([]);

  // Insurer to region mapping
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

  // Update the regions when insurer is changed
  useEffect(() => {
    // Show only Preinspection and Spot if the insurer is not in the predefined list
    setRegions(insurerRegionMapping[InsurerType] || ["Preinspection", "Spot"]);
    setRegionType("All"); // Reset the region to "All" when insurer changes
  }, [InsurerType, setRegionType]);

  const handleRegionType = (value) => {
    setRegionType(value);
    setChangeInRegion(true);
  };

  const searchHandler = ({}) => {
    setType(0); // Set to a default type if necessary, or change as needed
    setSearchInput(searchValue);
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="row my_profile_setting_input form-group">
          <div className="col-lg-3">
            <div className="row">
              <div className="col-lg-12">
                <label>Insurer Name</label>
              </div>
              <div className="col-lg-12">
                <select
                  style={{ padding: "2px" }}
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={InsurerType}
                  onChange={(e) => setInsurerType(e.target.value)}
                >
                  <option value="">Select Insurer</option>{" "}
                  {/* Initial empty value */}
                  {allInsurer.map((insurer, index) => (
                    <option key={index} value={insurer.name}>
                      {insurer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="row">
              <div className="col-lg-12">
                <label>Type Of Date</label>
              </div>
              <div className="col-lg-12">
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={DateType}
                  onChange={(e) => setDateType(e.target.value)}
                >
                  <option value={"intimation"}>Date Of Intimation</option>
                  <option value={"submit"}>Date Of Submit</option>
                </select>
              </div>
            </div>
          </div>

          {InsurerType && (
            <div className="col-lg-2">
              <div className="row">
                <div className="col-lg-12">
                  <label>Region</label>
                </div>
                <div className="col-lg-12">
                  <select
                    className="selectpicker form-select"
                    data-live-search="true"
                    data-width="100%"
                    value={RegionType}
                    onChange={(e) => handleRegionType(e.target.value)}
                  >
                    <option value={"All"}>All</option>
                    {regions.map((region, index) => (
                      <option key={index} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="col-lg-2">
            <div className="row">
              <div className="col-lg-12">
                <label>From</label>
              </div>
              <div className="col-lg-12">
                <input
                  type="date"
                  className="form-control"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="row">
              <div className="col-lg-12">
                <label>To</label>
              </div>
              <div className="col-lg-12">
                <input
                  type="date"
                  className="form-control"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-1">
            <div className="my_profile_setting_input">
              <button
                className="btn float-end btn-color mt-0"
                onClick={reloadHandler}
              >
                Reload
              </button>
            </div>
            <div className="my_profile_setting_input">
              <button
                className="btn float-end btn-color mt-1"
                onClick={changeHandler}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFields;
