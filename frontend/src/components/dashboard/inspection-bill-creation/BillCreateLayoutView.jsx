import DatePicker from "react-datepicker";
import { addCommasToNumber, roundOff } from "./functions";

const BillCreateLayoutView = ({
  allInfo,
  BillDate,
  setBillDate,
  Insurer,
  setInsurer,
  allInsurer,
  Branch,
  setBranch,
  BillTo,
  setBillTo,
  Others,
  setOthers,
  DetailsKM,
  setDetailsKM,
  Estimate,
  Assessed,
  DetailsPhotoRate,
  setDetailsPhotoRate,
  DetailsFee,
  setDetailsFee,
  DetailsRemark,
  setDetailsRemark,
  currentSelectedInsprectiontype,
  setcurrentSelectedInsprectiontype,
  FinalProfFees,
  FinalTotalKM,
  setFinalTotalKM,
  FinalVisit,
  setFinalVisit,
  FinalConveyance,
  setFinalConveyance,
  FinalPhotos,
  setFinalPhotos,
  FinalCharges,
  setFinalCharges,
  FinalPhotosCD,
  setFinalPhotoCD,
  FinalRemark,
  setFinalRemark,
  ReInsprectionTotalKM,
  setReInsprectionTotalKM,
  ReInsprectionVisit,
  setReInsprectionVisit,
  ReInsprectionConveyance,
  setReInsprectionConveyance,
  ReInsprectionPhotos,
  setReInsprectionPhotos,
  ReInsprectionCharges,
  setReInsprectionCharges,
  ReInsprectionPhotosCD,
  setReInsprectionPhotoCD,
  ReInsprectionRemark,
  setReInsprectionRemark,
  SpotTotalKM,
  setSpotTotalKM,
  SpotVisit,
  setSpotVisit,
  SpotConveyance,
  setSpotConveyance,
  SpotPhotos,
  setSpotPhotos,
  SpotCharges,
  setSpotCharges,
  SpotPhotosCD,
  setSpotPhotoCD,
  SpotRemark,
  setSpotRemark,
  OtherTotal,
  setOtherTotal,
  CGST,
  setCGST,
  CGSTValue,
  setSGST,
  SGST,
  SGSTValue,
  IGST,
  setIGST,
  IGSTValue,
  NetPay,
  disable,
  onSubmitHnadler,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6" style={{ borderRight: "1px solid grey" }}>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-1 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Bill#
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={allInfo?.feesDetails?.BillSno}
                />
              </div>
              <div className="col-lg-1 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Date
                </label>
              </div>
              <div className="col-lg-4">
                <DatePicker
                  className="form-control"
                  id="propertyTitle"
                  dateFormat="dd/MM/yyyy"
                  selected={
                    BillDate !== null && !isNaN(new Date(BillDate))
                      ? new Date(BillDate)
                      : ""
                  }
                  onChange={(date) => setBillDate(date)}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Insurer
                </label>
              </div>
              <div className="col-lg-7">
                <select
                  style={{ padding: "2px", marginTop: "3px" }}
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={Insurer}
                  onChange={(e) => setInsurer(e.target.value)}
                >
                  {allInsurer.map((insurer, index) => {
                    return (
                      <option
                        key={index}
                        data-tokens="Status1"
                        value={insurer.name}
                      >
                        {insurer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Branch
                </label>
              </div>
              <div className="col-lg-7">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={Branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                    marginTop: "5px",
                  }}
                >
                  Bill To
                </label>
              </div>
              <div className="col-lg-7">
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={BillTo}
                  onChange={(e) => setBillTo(e.target.value)}
                >
                  <option data-tokens="Status1" value={""}>
                    Select Type
                  </option>
                  <option data-tokens="Status1" value={"Insured"}>
                    Insured
                  </option>
                  <option data-tokens="Status2" value={"Appointing Office"}>
                    Appointing office
                  </option>
                  <option data-tokens="Status3" value={"Insurer"}>
                    Insurer
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Others
                </label>
              </div>
              <div className="col-lg-7">
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={Others}
                  onChange={(e) => setOthers(e.target.value)}
                />
              </div>
            </div>
          </div>
          <h4>Details</h4>
          <hr />
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontSize: "14px",
                  }}
                >
                  Estimate Amt.
                </label>
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={addCommasToNumber(roundOff(Estimate))}
                />
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontSize: "14px",
                  }}
                >
                  KM Rate
                </label>
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={DetailsKM}
                  onChange={(e) => setDetailsKM(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontSize: "14px",
                  }}
                >
                  Assessed Amt.
                </label>
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={addCommasToNumber(roundOff(Assessed))}
                />
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontSize: "14px",
                  }}
                >
                  Photos Rate
                </label>
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={DetailsPhotoRate}
                  onChange={(e) => setDetailsPhotoRate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontSize: "14px",
                  }}
                >
                  Fee Based on
                </label>
              </div>
              <div className="col-lg-9">
                <select
                  type="text"
                  className="form-select"
                  id="broker_mail_id"
                  value={DetailsFee}
                  onChange={(e) => setDetailsFee(e.target.value)}
                >
                  <option>Choose..</option>
                  <option>Estimate</option>
                  <option>Assessed</option>
                  <option>IDV</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-3 text-end my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontSize: "14px",
                  }}
                >
                  Remark
                </label>
              </div>
              <div className="col-lg-7">
                <textarea
                  name=""
                  id=""
                  cols="50"
                  rows="3"
                  value={DetailsRemark}
                  onChange={(e) => setDetailsRemark(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <table style={{ border: "1px solid black" }}>
              <tr>
                <th style={{ border: "1px solid black" }}></th>
                <th style={{ border: "1px solid black" }}>
                  <div className="col-lg-12 text-center">Report</div>
                </th>
                <th style={{ border: "1px solid black" }}>
                  <div className="col-lg-12 text-center">Name</div>
                </th>
                <th style={{ border: "1px solid black" }}>
                  <div className="col-lg-12 text-center">Reg.No.</div>
                </th>
                <th style={{ border: "1px solid black" }}>
                  <div className="col-lg-12 text-center">S.No.</div>
                </th>
              </tr>
              <tr>
                <td>
                  <div className="col-lg-12 text-center">
                    <input type="checkbox" className="" id="broker_mail_id" />
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <h5>[Final]</h5>
            <hr />
          </div>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-4">
                <input
                  type="checkbox"
                  className=""
                  id="broker_mail_id"
                  checked={
                    String(currentSelectedInsprectiontype) === "1"
                      ? true
                      : false
                  }
                  onChange={() => setcurrentSelectedInsprectiontype(1)}
                />
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Professional Fees
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalProfFees}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Total KM
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalTotalKM}
                  onChange={(e) => setFinalTotalKM(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Visits
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalVisit}
                  onChange={(e) => setFinalVisit(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Conveyance
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalConveyance}
                  onChange={(e) => setFinalConveyance(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalPhotos}
                  onChange={(e) => setFinalPhotos(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Chrg.
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalCharges}
                  onChange={(e) => setFinalCharges(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos/CD
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalPhotosCD}
                  onChange={(e) => setFinalPhotoCD(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1">
                <div className="col-lg-2 text-end my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Remark
                  </label>
                </div>
                <div className="col-lg-9">
                  <textarea
                    name=""
                    id=""
                    cols="60"
                    rows="2"
                    value={FinalRemark}
                    onChange={(e) => setFinalRemark(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <h5>[ReInspection]</h5>
            <hr />
          </div>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-4">
                <input
                  type="checkbox"
                  className=""
                  id="broker_mail_id"
                  checked={
                    String(currentSelectedInsprectiontype) === "2"
                      ? true
                      : false
                  }
                  onChange={() => setcurrentSelectedInsprectiontype(2)}
                />
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Professional Fees
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalProfFees}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Total KM
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionTotalKM}
                  onChange={(e) => setReInsprectionTotalKM(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Visits
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionVisit}
                  onChange={(e) => setReInsprectionVisit(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Conveyance
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionConveyance}
                  onChange={(e) => setReInsprectionConveyance(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionPhotos}
                  onChange={(e) => setReInsprectionPhotos(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Chrg.
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionCharges}
                  onChange={(e) => setReInsprectionCharges(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos/CD
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionPhotosCD}
                  onChange={(e) => setReInsprectionPhotoCD(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1">
                <div className="col-lg-2 text-end my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Remark
                  </label>
                </div>
                <div className="col-lg-9">
                  <textarea
                    name=""
                    id=""
                    cols="60"
                    rows="2"
                    value={ReInsprectionRemark}
                    onChange={(e) => setReInsprectionRemark(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <h5>[Spot]</h5>
            <hr />
          </div>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-4">
                <input
                  type="checkbox"
                  className=""
                  id="broker_mail_id"
                  checked={
                    String(currentSelectedInsprectiontype) === "3"
                      ? true
                      : false
                  }
                  onChange={() => setcurrentSelectedInsprectiontype(3)}
                />
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Professional Fees
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalProfFees}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Total KM
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotTotalKM}
                  onChange={(e) => setSpotTotalKM(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Visits
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotVisit}
                  onChange={(e) => setSpotVisit(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Conveyance
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotConveyance}
                  onChange={(e) => setSpotConveyance(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotPhotos}
                  onChange={(e) => setSpotPhotos(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Chrg.
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotCharges}
                  onChange={(e) => setSpotCharges(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos/CD
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotPhotosCD}
                  onChange={(e) => setSpotPhotoCD(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1">
                <div className="col-lg-2 text-end my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Remark
                  </label>
                </div>
                <div className="col-lg-9">
                  <textarea
                    name=""
                    id=""
                    cols="60"
                    rows="2"
                    value={SpotRemark}
                    onChange={(e) => setSpotRemark(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-5"></div>
              <div className="col-lg-3 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Other Total
                </label>
                <input type="checkbox" className="m-2" id="broker_mail_id" />
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={OtherTotal}
                  onChange={(e) => setOtherTotal(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-3"></div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  C GST @ :
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={CGST}
                  onChange={(e) => setCGST(e.target.value)}
                />
              </div>
              <div className="col-lg-1">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  %
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={addCommasToNumber(roundOff(CGSTValue))}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-3"></div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  S GST @ :
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={addCommasToNumber(roundOff(SGST))}
                  onChange={(e) => setSGST(e.target.value)}
                />
              </div>
              <div className="col-lg-1">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  %
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={addCommasToNumber(roundOff(SGSTValue))}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-3"></div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  I GST @ :
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={IGST}
                  onChange={(e) => setIGST(e.target.value)}
                />
              </div>
              <div className="col-lg-1">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  %
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={addCommasToNumber(roundOff(IGSTValue))}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-4">
                <input type="checkbox" className="" id="broker_mail_id" />
                <label
                  htmlFor=""
                  className="text-color m-2"
                  style={{
                    color: "#2e008b",
                    fontWeight: "bold",
                  }}
                >
                  Cash Recieved
                </label>
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Net Payable :
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={addCommasToNumber(roundOff(NetPay))}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="my_profile_setting_input">
            <button
              disabled={disable}
              className="btn float-end btn-color"
              onClick={onSubmitHnadler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillCreateLayoutView;
