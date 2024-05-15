const VehicleDetailsViewForm = ({
  claim,
  VehicleModel,
  VehicleRegisteredNumber,
  VehicleRegisteredOwner,
  DateRegistration,
  EngineNumber,
  VehicleChassisNumber,
  VehicleFuelType,
  MakerModel,
  VehicleSeatingCapacity,
  RcInsuranceUpto,
  BancsModelCode,
  BancsMakeCode,
  BancsBodyType,
  BancsVehicleSegment,
  MakerDesc,
  ManufactureMonthYear,
  CubicCapacity,
  PasiaModelCode,
  VehicleRegistedAt,
}) => {
  function convertDateFormat(originalDate) {
    const parts = originalDate.split("-");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  return (
    <>
      <div className="col-lg-12 m-2">
        <div className="row">
          <div className="row">
            <table className="m-1" style={{ border: "1px solid grey" }}>
              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Vehicle Model
                      </label>
                    </div>
                    <div className="col-lg-6 text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {VehicleModel && VehicleModel !== "null"
                          ? VehicleModel
                          : ""}
                      </label>
                    </div>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Registerd No.
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {VehicleRegisteredNumber &&
                      VehicleRegisteredNumber !== "null"
                        ? VehicleRegisteredNumber
                        : ""}
                    </label>
                  </div>
                </td>

                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Registered Owner{" "}
                      </label>
                    </div>
                    <div className="col-lg-6  text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {VehicleRegisteredOwner &&
                        VehicleRegisteredOwner !== "null"
                          ? VehicleRegisteredOwner
                          : ""}
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Date of Registration
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {DateRegistration && DateRegistration !== "null"
                        ? convertDateFormat(DateRegistration)
                        : ""}
                    </label>
                  </div>
                </td>

                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Engine Number
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {EngineNumber && EngineNumber !== "null"
                        ? EngineNumber
                        : ""}
                    </label>
                  </div>
                </td>

                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Chassis Number
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {VehicleChassisNumber && VehicleChassisNumber !== "null"
                        ? VehicleChassisNumber
                        : ""}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Maker Desc.
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {MakerDesc && MakerDesc !== "null" ? MakerDesc : ""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Maker Model
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {MakerModel && MakerModel !== "null" ? MakerModel : ""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Manufacture Month Year
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {ManufactureMonthYear && ManufactureMonthYear !== "Null"
                        ? convertDateFormat(ManufactureMonthYear)
                        : ""}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Cubic Capacity
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {CubicCapacity && CubicCapacity !== "null"
                        ? CubicCapacity
                        : ""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Seating Capacity
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {VehicleSeatingCapacity &&
                      VehicleSeatingCapacity !== "null"
                        ? VehicleSeatingCapacity
                        : ""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Permanent Address
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleDetails?.PermanentAddress &&
                      claim?.vehicleDetails?.PermanentAddress !== "null"
                        ? claim?.vehicleDetails?.PermanentAddress
                        : ""}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                {/* <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Class Of Vehicle
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleDetails?.VehicleClassDescription &&
                      claim?.vehicleDetails?.VehicleClassDescription !== "null"
                        ? claim?.vehicleDetails?.VehicleClassDescription
                        : ""}
                    </label>
                  </div>
                </td>

                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Pasia Model Code
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {PasiaModelCode && PasiaModelCode !== "null"
                        ? PasiaModelCode
                        : ""}
                    </label>
                  </div>
                </td> */}
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Vehicle Insurance Company
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleDetails?.VehicleInsuranceCompany &&
                      claim?.vehicleDetails?.VehicleInsuranceCompany !== "null"
                        ? claim?.vehicleDetails?.VehicleInsuranceCompany
                        : ""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      VehicleRcStatus
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleDetails?.VehicleRcStatus}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Vehicle Type
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleDetails?.VehicleType &&
                      claim?.vehicleDetails?.VehicleType !== "null"
                        ? claim?.vehicleDetails?.VehicleType
                        : ""}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Vehicle Insurance Upto
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {RcInsuranceUpto
                        ? convertDateFormat(RcInsuranceUpto)
                        : ""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Vehicle RegistedAt
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {VehicleRegistedAt}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Vehicle Black ListStatus
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleDetails?.VehicleBlackListStatus}
                    </label>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleDetailsViewForm;
