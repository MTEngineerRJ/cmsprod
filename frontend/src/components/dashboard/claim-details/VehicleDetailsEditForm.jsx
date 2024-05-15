import { useRouter } from "next/router";
import VehicleDetailsViewForm from "./VehicleDetailsViewForm";
import {  useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";

const VehicleDetailsEditForm = ({
  claim,
  edit,
  editHandler,
  finalDisable,
  setFinalDisable,
  VehicleModel,
  setVehicleModel,
  VehicleRegisteredNumber,
  setVehicleRegisteredNumber,
  setEngineType,
  EngineType,
  VehicleRegisteredOwner,
  setVehicleRegisteredOwner,
  DateRegistration,
  setDateRegistration,
  PUCNumber,
  setPUCNumber,
  TransferDate,
  setTransferDate,
  EngineNumber,
  setEngineNumber,
  AddedBy,
  setAddedBy,
  IssuingAuthority,
  setIssuingAuthority,
  LicenseNumber,
  setLicenseNumber,
  LicenseType,
  setLicenseType,
  VehicleChassisNumber,
  setVehicleChassisNumber,
  VehicleFuelType,
  setVehicleFuelType,
  onSaveHandler,
  //New Fields
  setVehicleClassDescription,
  setMakerDesc,
  setMakerModel,
  setManufactureMonthYear,
  setVehicleGvw,
  setCubicCapacity,
  setVehicleSeatingCapacity,
  setVehiclePermanentAddress,
  setFitUpto,
  setPasiaModelCode,
  setRcInsuranceComp,
  setRcInsuranceUpto,
  setRcVehicleType,
  setBancsModelCode,
  setBancsMakeCode,
  setBancsSubtypeCode,
  setBancsBodyType,
  setBancsVehicleClass,
  setBancsVehicleSegment,
  setRcRtoCode,
  setVehicleBlackListStatus,
  setVehicleRegistedAt,
  setVehicleRcStatus,

  VehicleClassDescription,
  MakerDesc,
  MakerModel,
  ManufactureMonthYear,
  VehicleGvw,
  CubicCapacity,
  VehicleSeatingCapacity,
  VehiclePermanentAddress,
  FitUpto,
  PasiaModelCode,
  RcInsuranceComp,
  RcInsuranceUpto,
  RcRegisteredAt,
  RcVehicleType,

  //--
  BancsModelCode,
  BancsMakeCode,
  BancsSubtypeCode,
  BancsBodyType,
  BancsVehicleClass,
  BancsVehicleSegment,
  RcRtoCode,
  VehicleBlackListStatus,
  VehicleRegistedAt,
  VehicleInsuranceCompany,
  VehicleRcStatus,

  setVehicleInsuranceCompany,
  PermanentAddress,
  setPermanentAddress,
  ClassOfVehicle,
  setClassOfVehicle,
}) => {
  const router = useRouter();
  const [isUpdateVehicleLoading, setisUpdateVehicleLoading] = useState(false);

  const [hide, setHide] = useState(false);

  const [editCase_01, setEditCase_01] = useState(false);
  const [details, setDetails] = useState();

  const closeFunction = () => {
    setEditCase_01(false);
    setisUpdateVehicleLoading(false);
  };

  const handleFetchData = async (req, res) => {
    if (!claim?.vehicleDetails?.RegisteredNumber) {
      toast.error("Please fill Registered Number first!", {
        // position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-loading-message",
      });
    }
    if (
      claim?.vehicleOnlineDetails &&
      String(claim?.vehicleOnlineDetails?.RegisteredNumber) ===
        String(VehicleRegisteredNumber)
    ) {
      const details = claim?.vehicleOnlineDetails;

      setVehicleModel(details?.MakerModel),
        setVehicleRegisteredOwner(details?.RegisteredOwner),
        setVehicleChassisNumber(details?.ChassisNumber),
        setVehicleChassisNumber(details?.ChassisNumber);
      setDateRegistration(details?.DateOfRegistration);
      setVehicleRegisteredNumber(details?.RegisteredNumber);
      setEngineNumber(details?.EngineNumber); //is it same as ClassOfVehicle ?
      setMakerDesc(details?.MakerDesc), setMakerModel(details?.MakerModel);
      setManufactureMonthYear(details?.ManufactureMonthYear);
      setVehicleGvw(details?.rc_gvw);
      setVehicleRegisteredOwner(details?.rc_owner_name);
      setCubicCapacity(details?.CubicCapacity);
      setVehicleSeatingCapacity(details?.SeatingCapacity);
      setVehiclePermanentAddress(details?.PermanentAddress);
      setFitUpto(details?.FitUpto);
      setPasiaModelCode(details?.PasiaModelCode);
      setRcInsuranceUpto(details?.VehicleInsuranceUpto);
      setRcVehicleType(details?.VehicleType);
      setBancsModelCode(details?.BancsModelCode);
      setBancsMakeCode(details?.BancsMakeCode);
      setBancsSubtypeCode(details?.BancsSubtypeCode);
      setBancsBodyType(details?.BancsBodyType);
      setBancsVehicleClass(details?.ClassOfVehicle);
      setBancsVehicleSegment(details?.BancsVehicleSegment);
      setRcRtoCode(details?.RcRtoCode);
      setClassOfVehicle(details?.ClassOfVehicle);
      // setBancsFuelType(details?.bancs_Fuel_Type);
      setEngineNumber(details?.EngineNumber),
        setVehicleRegisteredOwner(details?.RegisteredOwner);
      // setLicenseNumber(details?.rc_regn_no),
      setVehicleFuelType(details?.FuelType),
        setVehicleRcStatus(details?.VehicleRcStatus);
      setVehicleBlackListStatus(details?.VehicleBlackListStatus);
      setVehicleRegistedAt(details?.VehicleRegistedAt);
      setVehicleInsuranceCompany(details?.VehicleInsuranceCompany);
      setVehicleModel(details?.MakerModel),
        setVehicleRegisteredOwner(details?.RegisteredOwner),
        // setDateRegistration(details?.rc_regn_dt),
        setVehicleChassisNumber(details?.ChassisNumber),
        //New Fields
        setVehicleChassisNumber(details?.ChassisNumber);
      setDateRegistration(details?.DateOfRegistration);
      setVehicleRegisteredNumber(details?.RegisteredNumber);
      setEngineNumber(details?.EngineNumber); //is it same as ClassOfVehicle ?
      setMakerDesc(details?.MakerDesc), setMakerModel(details?.MakerModel);
      setManufactureMonthYear(details?.ManufactureMonthYear);
      setVehicleGvw(details?.rc_gvw);
      setVehicleRegisteredOwner(details?.rc_owner_name);
      setCubicCapacity(details?.CubicCapacity);
      setVehicleSeatingCapacity(details?.SeatingCapacity);
      setVehiclePermanentAddress(details?.PermanentAddress);
      setFitUpto(details?.FitUpto);
      setPasiaModelCode(details?.PasiaModelCode);
      setRcInsuranceUpto(details?.VehicleInsuranceUpto);
      setRcVehicleType(details?.VehicleType);
      setBancsModelCode(details?.BancsModelCode);
      setBancsMakeCode(details?.BancsMakeCode);
      setBancsSubtypeCode(details?.BancsSubtypeCode);
      setBancsBodyType(details?.BancsBodyType);
      setBancsVehicleClass(details?.ClassOfVehicle);
      setBancsVehicleSegment(details?.BancsVehicleSegment);
      setRcRtoCode(details?.RcRtoCode);
      setClassOfVehicle(details?.ClassOfVehicle);
      // setBancsFuelType(details?.bancs_Fuel_Type);
      setEngineNumber(details?.EngineNumber),
        setVehicleRegisteredOwner(details?.RegisteredOwner);
      // setLicenseNumber(details?.rc_regn_no),
      setVehicleFuelType(details?.FuelType),
        setVehicleRcStatus(details?.VehicleRcStatus);
      setVehicleBlackListStatus(details?.VehicleBlackListStatus);
      setVehicleRegistedAt(details?.VehicleRegistedAt);
      setVehicleInsuranceCompany(details?.VehicleInsuranceCompany);

      toast.dismiss();
      toast.success("Successfully fetched !", {
        className: "toast-loading-message",
      });
    } else {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const vehicleNo = claim?.vehicleDetails?.RegisteredNumber;
      if (vehicleNo === "") {
        toast.error("Record Not found for empty Registration Number");
      } else {
        if (!userInfo) {
          router.push("/login");
        } else {
          try {
            setFinalDisable(true);
            setEditCase_01(false);
            toast.loading("Fetching Vehicle Details!!");
            const response = axios
              .get("/api/getOnlineVehicleData", {
                headers: {
                  Authorization: `Bearer ${userInfo[0]?.Token}`,
                  "Content-Type": "application/json",
                },
                params: {
                  vehicleNo: vehicleNo,
                  leadId: claim?.claimDetails?.LeadID,
                },
              })
              .then((res) => {
                toast.success("Successfully fetched!");
                toast.dismiss();
                console.log(res);
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
                toast.dismiss();
                toast.error("Record Not found or Server Error");
              });
          } catch (error) {
            toast.error("Record Not found or Server Error");
          }
          setFinalDisable(false);
        }
      }
    }
  };

  const setDate = (newDate, settingFunc) => {
    const dateObj = new Date(newDate);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    settingFunc(formattedDate);
  };

  return (
    <>
      <div className="faq_according row">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="btn accordion-button collapsed btn-clicked"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Vehicle Details</h4>
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body bgc-f6">
                <div className="row">
                  <div className="">
                    {editCase_01 ? (
                      <>
                        <div className="row">
                          <div className="col-lg-2">
                            <button
                              className="btn-thm m-1"
                              style={{}}
                              disabled={!editCase_01 || finalDisable}
                              onClick={() => {
                                setisUpdateVehicleLoading(true);
                                setHide(true);
                                onSaveHandler(2, closeFunction, closeFunction);
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditCase_01(false)}
                              className="btn-thm flaticon-close"
                              style={{ fontSize: "14px" }}
                            ></button>
                          </div>{" "}
                          <div
                            className="col-lg-1"
                            style={{ marginLeft: "-70px" }}
                          >
                            <button
                              disabled={!editCase_01}
                              className="btn-thm m-1 flaticon-transfer"
                              onClick={handleFetchData}
                            ></button>
                          </div>
                        </div>
                      </>
                    ) : (
                      claim?.claimDetails?.PolicyNumber &&
                      !hide && (
                        <button
                          className="btn-thm"
                          style={{}}
                          onClick={() => setEditCase_01(true)}
                        >
                          <span
                            className="flaticon-edit"
                            style={{ fontSize: "14px" }}
                          ></span>
                        </button>
                      )
                    )}
                  </div>
                </div>

                {isUpdateVehicleLoading ? (
                  <Loader />
                ) : editCase_01 ? (
                  <div className="row">
                    {/* <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Vehicle Model
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            disabled={false}
                          />
                        </div>
                      </div>
                    </div> */}

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Registerd Number
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleRegisteredNumber}
                            onChange={(e) =>
                              setVehicleRegisteredNumber(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Registered Owner
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              VehicleRegisteredOwner &&
                              VehicleRegisteredOwner !== "null"
                                ? VehicleRegisteredOwner
                                : ""
                            }
                            onChange={(e) =>
                              setVehicleRegisteredOwner(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              color: "#1560bd",
                              fontWeight: "",
                            }}
                          >
                            Date of Registration
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            dateFormat="dd/MM/yyyy"
                            selected={
                              DateRegistration !== null &&
                              !isNaN(new Date(DateRegistration))
                                ? new Date(DateRegistration)
                                : ""
                            }
                            onChange={(date) =>
                              setDate(date, setDateRegistration)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Engine Number
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              EngineNumber && EngineNumber !== "null"
                                ? EngineNumber
                                : ""
                            }
                            onChange={(e) => setEngineNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Chassis Number
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              VehicleChassisNumber &&
                              VehicleChassisNumber !== "null"
                                ? VehicleChassisNumber
                                : ""
                            }
                            onChange={(e) =>
                              setVehicleChassisNumber(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Maker desc.
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={MakerDesc}
                            onChange={(e) => setMakerDesc(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Maker Model
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={MakerModel}
                            onChange={(e) => setMakerModel(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Manufacture Month Year
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={ManufactureMonthYear}
                            onChange={(e) =>
                              setManufactureMonthYear(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Cubic Capacity
                          </label>
                        </div>
                        <div className="col-lg-7">
                          {console.log("MakerModel", MakerModel)}
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={CubicCapacity}
                            onChange={(e) => setCubicCapacity(e.target.value)}
                            disabled={false}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Seating Capacity
                          </label>
                        </div>
                        <div className="col-lg-7">
                          {console.log("MakerModel", MakerModel)}
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleSeatingCapacity}
                            onChange={(e) =>
                              setVehicleSeatingCapacity(e.target.value)
                            }
                            disabled={false}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Permanent Address
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={PermanentAddress}
                            onChange={(e) =>
                              setPermanentAddress(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Class Of Vehicle
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={ClassOfVehicle}
                            onChange={(e) => setClassOfVehicle(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Paisa Model Code
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={PasiaModelCode}
                            onChange={(e) => setPasiaModelCode(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div> */}

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Insurance Company{" "}
                          </label>
                        </div>

                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleInsuranceCompany}
                            onChange={(e) =>
                              setVehicleInsuranceCompany(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Insurance Upto{" "}
                          </label>
                        </div>

                        <div className="col-lg-7">
                          <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            dateFormat="dd/MM/yyyy"
                            selected={
                              RcInsuranceUpto !== null &&
                              !isNaN(new Date(RcInsuranceUpto))
                                ? new Date(RcInsuranceUpto)
                                : ""
                            }
                            onChange={(date) =>
                              setDate(date, setRcInsuranceUpto)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Registed At
                          </label>
                        </div>

                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleRegistedAt ? VehicleRegistedAt : ""}
                            onChange={(e) =>
                              setVehicleRegistedAt(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Black ListStatus{" "}
                          </label>
                        </div>

                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleBlackListStatus}
                            onChange={(e) =>
                              setVehicleBlackListStatus(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Rc Status
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleRcStatus}
                            onChange={(e) => setVehicleRcStatus(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Type
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              RcVehicleType && RcVehicleType !== "null"
                                ? RcVehicleType
                                : ""
                            }
                            onChange={(e) => setRcVehicleType(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Make Code
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={BancsMakeCode}
                            onChange={(e) => setBancsMakeCode(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Model Code
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={BancsModelCode}
                            onChange={(e) => setBancsModelCode(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Fuel Type
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={
                              VehicleFuelType && VehicleFuelType !== "null"
                                ? VehicleFuelType
                                : ""
                            }
                            onChange={(e) => setVehicleFuelType(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Body Type
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={BancsBodyType}
                            onChange={(e) => setBancsBodyType(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Vehicle Segment
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={BancsVehicleSegment}
                            onChange={(e) =>
                              setBancsVehicleSegment(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                ) : (
                  <div className="row">
                    <VehicleDetailsViewForm
                      claim={claim}
                      VehicleModel={VehicleModel}
                      setVehicleModel={setVehicleModel}
                      VehicleRegisteredNumber={VehicleRegisteredNumber}
                      setVehicleRegisteredNumber={setVehicleRegisteredNumber}
                      setEngineType={setEngineType}
                      EngineType={EngineType}
                      VehicleRegisteredOwner={VehicleRegisteredOwner}
                      setVehicleRegisteredOwner={setVehicleRegisteredOwner}
                      DateRegistration={DateRegistration}
                      setDateRegistration={setDateRegistration}
                      PUCNumber={PUCNumber}
                      setPUCNumber={setPUCNumber}
                      TransferDate={TransferDate}
                      setTransferDate={setTransferDate}
                      EngineNumber={EngineNumber}
                      setEngineNumber={setEngineNumber}
                      AddedBy={AddedBy}
                      setAddedBy={setAddedBy}
                      IssuingAuthority={IssuingAuthority}
                      setIssuingAuthority={setIssuingAuthority}
                      LicenseNumber={LicenseNumber}
                      setLicenseNumber={setLicenseNumber}
                      LicenseType={LicenseType}
                      setLicenseType={setLicenseType}
                      VehicleChassisNumber={VehicleChassisNumber}
                      setVehicleChassisNumber={setVehicleChassisNumber}
                      VehicleFuelType={VehicleFuelType}
                      setVehicleFuelType={setVehicleFuelType}
                      // New Fields
                      setVehicleClassDescription={setVehicleClassDescription}
                      setMakerDesc={setMakerDesc}
                      setMakerModel={setMakerModel}
                      setManufactureMonthYear={setManufactureMonthYear}
                      setVehicleGvw={setVehicleGvw}
                      setCubicCapacity={setCubicCapacity}
                      setVehicleSeatingCapacity={setVehicleSeatingCapacity}
                      setVehiclePermanentAddress={setVehiclePermanentAddress}
                      setFitUpto={setFitUpto}
                      setPasiaModelCode={setPasiaModelCode}
                      setRcInsuranceComp={setRcInsuranceComp}
                      setRcInsuranceUpto={setRcInsuranceUpto}
                      setRcVehicleType={setRcVehicleType}
                      setBancsModelCode={setBancsModelCode}
                      setBancsMakeCode={setBancsMakeCode}
                      setBancsSubtypeCode={setBancsSubtypeCode}
                      setBancsBodyType={setBancsBodyType}
                      setBancsVehicleClass={setBancsVehicleClass}
                      setBancsVehicleSegment={setBancsVehicleSegment}
                      setRcRtoCode={setRcRtoCode}
                      VehicleClassDescription={VehicleClassDescription}
                      MakerDesc={MakerDesc}
                      MakerModel={MakerModel}
                      ManufactureMonthYear={ManufactureMonthYear}
                      VehicleGvw={VehicleGvw}
                      CubicCapacity={CubicCapacity}
                      VehicleSeatingCapacity={VehicleSeatingCapacity}
                      VehiclePermanentAddress={VehiclePermanentAddress}
                      FitUpto={FitUpto}
                      PasiaModelCode={PasiaModelCode}
                      RcInsuranceComp={RcInsuranceComp}
                      RcInsuranceUpto={RcInsuranceUpto}
                      RcRegisteredAt={RcRegisteredAt}
                      RcVehicleType={RcVehicleType}
                      BancsModelCode={BancsModelCode}
                      BancsMakeCode={BancsMakeCode}
                      BancsSubtypeCode={BancsSubtypeCode}
                      BancsBodyType={BancsBodyType}
                      BancsVehicleClass={BancsVehicleClass}
                      BancsVehicleSegment={BancsVehicleSegment}
                      RcRtoCode={RcRtoCode}
                      PermanentAddress={PermanentAddress}
                      setPermanentAddress={setPermanentAddress}
                      setVehicleRegistedAt={setVehicleRegistedAt}
                      VehicleRegistedAt={VehicleRegistedAt}
                      ClassOfVehicle={ClassOfVehicle}
                      setClassOfVehicle={setClassOfVehicle}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleDetailsEditForm;
