import React from "react";

const VehicleDetails = ({ allInfo }) => {
  function convertDateFormat(dateString) {
    if (!dateString) return dateString;
    const [year, month, day] = dateString?.split("-");
    return `${day}/${month}/${year}`;
  }
  function getYearFromDate(dateString) {
    if (!dateString) return dateString;
    const [year] = dateString?.split("-");
    return year;
  }

  const getCurrentImage = () => {
    const tempData = allInfo?.reportImagesDetails;
    tempData?.sort((a, b) => a.SeqNo - b.SeqNo);
    let src = "";
    let name = "";
    if (tempData?.length > 0) {
      src = tempData[0]?.FileUrl;
      name = tempData[0]?.FileName;
    }
    return { src, name };
  };
  return (
    <>
      <div
        className=""
        style={{
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <div>
          <table style={{ width: "100%" }}>
            <tr>
              <td>
                <div>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      border: "2px solid #2e008b",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <div>
                      <label htmlFor="" className="fw-bold text-primary">
                        Company :
                      </label>
                      <span className="text-danger">
                        {" "}
                        {allInfo?.vehicleDetails.length > 0 &&
                          allInfo?.vehicleDetails[0]
                            ?.VehicleInsuranceCompany}{" "}
                      </span>
                    </div>
                    <div>
                      <label htmlFor="" className="fw-bold text-primary">
                        Branch :
                      </label>
                      <span className="text-danger">
                        {" "}
                        {allInfo?.claimDetails.length > 0 &&
                          allInfo?.claimDetails.length > 0 &&
                          allInfo?.claimDetails[0]?.PolicyIssuingOffice}{" "}
                      </span>
                    </div>
                    <div>
                      <label htmlFor="" className="fw-bold text-primary">
                        Report Status :{" "}
                      </label>
                      <span className="btn btn-success "> Recommended</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "75%" }}>
                <div className="mt-2">
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      className="card"
                      style={{
                        border: "2px solid #2e008b",
                        padding: "3px",
                        marginRight: "5px",
                        width: "200px", // fixed width
                        height: "250px", // fixed height
                        overflow: "hidden", // prevents overflow
                        textOverflow: "ellipsis", // handles text overflow
                      }}
                    >
                      <table style={{ width: "100%", height: "100%" }}>
                        <tr>
                          <td>
                            <img
                              width={20}
                              height={20}
                              priority
                              // className="w100"
                              // src={getCurrentImage().src}
                              src="/assets/images/card_1.jpg"
                              alt={getCurrentImage().name}
                            />
                            {/* <span className="flaticon-invoice"></span> */}
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td style={{}}>
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              Reg .Owner Name{" "}
                            </span>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "darkblue",
                              }}
                            >
                              {allInfo?.vehicleDetails.length > 0 &&
                                allInfo?.vehicleDetails[0]?.RegisteredOwner}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              Registration No.
                            </span>
                          </td>
                          <td
                            style={{
                              textAlign: "end",
                              fontWeight: "bold",
                              color: "darkblue",
                            }}
                          >
                            <span style={{ fontSize: "10px" }}>
                              {allInfo?.vehicleDetails.length > 0 &&
                                allInfo?.vehicleDetails[0]?.RegisteredNumber}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              Chassis No.
                            </span>
                          </td>
                          <td
                            style={{
                              textAlign: "end",
                              fontWeight: "bold",
                              color: "darkblue",
                            }}
                          >
                            {" "}
                            <span style={{ fontSize: "10px" }}>
                              {allInfo?.vehicleDetails.length > 0 &&
                                allInfo?.vehicleDetails[0]?.ChassisNumber}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              Engine No.
                            </span>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            {" "}
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "darkblue",
                              }}
                            >
                              {allInfo?.vehicleDetails.length > 0 &&
                                allInfo?.vehicleDetails[0]?.EngineNumber}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div
                      className="card"
                      style={{
                        border: "2px solid #2e008b",
                        padding: "5px",
                        marginRight: "5px",
                        width: "200px", // fixed width
                        height: "250px", // fixed height
                        overflow: "hidden", // prevents overflow
                        textOverflow: "ellipsis", // handles text overflow
                      }}
                    >
                      <table style={{ width: "100%", height: "100%" }}>
                        <tr>
                          <td>
                            <img
                              width={20}
                              height={20}
                              priority
                              // className="w100"
                              // src={getCurrentImage().src}
                              src="/assets/images/card_1.jpg"
                              alt={getCurrentImage().name}
                            />
                            {/* <span className="flaticon-invoice"></span> */}
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="">
                            <span
                              className="mt-2"
                              style={{
                                // width: "90%",
                                fontSize: "10px",
                                color: "blue",
                              }}
                            >
                              Vehicle Description{" "}
                            </span>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "darkblue",
                              }}
                            >
                              {allInfo?.vehicleDetails.length > 0 &&
                                allInfo?.vehicleDetails[0]?.MakerModel}
                              ,
                              {allInfo?.vehicleDetails.length > 0 &&
                                allInfo?.vehicleDetails[0]?.MakerDesc}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              Manufacturing Year
                            </span>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "darkblue",
                              }}
                            >
                              {getYearFromDate(
                                allInfo?.vehicleDetails[0]?.ManufactureMonthYear
                              )}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              Meter Reading (In KM)
                            </span>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            {" "}
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "darkblue",
                              }}
                            >
                              {allInfo?.vehicleDetails.length > 0 &&
                                allInfo?.vehicleDetails[0]?.OdometerReading}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              Fuel Used
                            </span>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            {" "}
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "darkblue",
                              }}
                            >
                              {allInfo?.vehicleDetails[0]?.FuelType}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div
                      className="card "
                      style={{
                        border: "2px solid #2e008b",
                        padding: "5px",
                        marginRight: "5px",
                        width: "200px", // fixed width
                        height: "250px", // fixed height
                        overflow: "hidden", // prevents overflow
                        textOverflow: "ellipsis", // handles text overflow
                      }}
                    >
                      <table style={{ width: "100%", height: "100%" }}>
                        <tr>
                          <td>
                            <img
                              width={20}
                              height={20}
                              priority
                              // className="w100"
                              // src={getCurrentImage().src}
                              src="/assets/images/card_1.jpg"
                              alt={getCurrentImage().name}
                            />
                            {/* <span className="flaticon-invoice"></span> */}
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              Vehicle Color{" "}
                            </span>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "darkblue",
                              }}
                            >
                              {allInfo?.claimDetails.length > 0 &&
                                allInfo?.vehicleDetails[0]?.MakeVariantModelColor?.split(
                                  ","
                                )[1]}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              Document
                            </span>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "darkblue",
                              }}
                            >
                              Verified
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              PUC Valid Upto :
                            </span>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            {" "}
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "darkblue",
                              }}
                            >
                              {convertDateFormat(
                                allInfo?.vehicleDetails[0]?.PucValidUntil
                              )}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontSize: "10px", color: "blue" }}>
                              Fit Upto :
                            </span>
                          </td>
                          <td style={{ textAlign: "end" }}>
                            {" "}
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "darkblue",
                              }}
                            >
                              {convertDateFormat(
                                allInfo?.vehicleDetails[0]?.FitUpto
                              )}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div
                      className="card "
                      style={{
                        border: "2px solid #2e008b",
                        padding: "5px",
                        marginRight: "5px",
                        width: "200px", // fixed width
                        height: "250px", // fixed height
                        // overflow: "hidden", // prevents overflow
                        textOverflow: "ellipsis", // handles text overflow
                      }}
                    >
                      <img
                        width={481}
                        height={209}
                        priority
                        className="w100 mt-2"
                        src={getCurrentImage().src}
                        // src="/assets/images/Claim_Logo.jpg"
                        alt={getCurrentImage().name}
                      />
                    </div>
                  </div>
                </div>
              </td>
              {/* <td style={{ width: "25%", textAlign: "center" }}>
                <img
                  width={481}
                  height={209}
                  priority
                  className="w100 mt-2"
                  src={getCurrentImage().src}
                  // src="/assets/images/Claim_Logo.jpg"
                  alt={getCurrentImage().name}
                />
              </td> */}
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default VehicleDetails;
