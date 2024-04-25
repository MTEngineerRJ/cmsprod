import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const Form_driver = ({
  claim,
  DLStatus,
  DriverName,
  setDriverName,
  DriverAddedDate,
  setDriverAddedDate,
  Verification,
  setVerification,
  LicenseNumber,
  setLicenseNumber,
  setLicenseType,
  LicenseType,
  IssuingAuthority,
  setIssuingAuthority,

  onSaveHandler,

  FatherName,
  setFatherName,
  Gender,
  setGender,
  BloodGroup,
  setBloodGroup,
  setAddress,
  Address,
  setRtoName,
  RtoName,
  Mobile,
  setMobile,
  ValidUpto,
  setValidUpto,
  Vov,
  setVov,
  setPht,
  Pht,
  Photo,
  setPhoto,
  DateOfBirth,
  setDateOfBirth,
  setDateOfIssue,
  DateOfIssue,
  setIsDriverDetailsFetched,
}) => {
  const formatDate = (val) => {
    const date = new Date(val);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  function formatDateToDDMMYYYY(date) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options);
    return formattedDate;
  }
  const setDate = (inputString) => {
    let modifiedString = inputString;

    // Check if inputString is in "dd/mm/yyyy" format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(inputString)) {
      modifiedString = inputString.replace(/\//g, "-");
    }

    // Check if inputString is in "yyyy-mm-dd" format
    if (/^\d{4}-\d{2}-\d{2}$/.test(inputString)) {
      const [year, month, day] = inputString.split("-");
      modifiedString = `${day}-${month}-${year}`;
    }
    return modifiedString;
  };
  const statusOptions = [
    {
      id: 1,
      value: "Claim Appointment",
    },
    {
      id: 2,
      value: "Estimate Approval Pending",
    },
    {
      id: 3,
      value: "Vehicle Under repair",
    },
    {
      id: 4,
      value: "Invoice Approval Pending",
    },
    {
      id: 5,
      value: "Surveyor Report Pending",
    },
    {
      id: 6,
      value: "Hard Copies Pending",
    },
    {
      id: 7,
      value: "Soft Copy Completed",
    },
    {
      id: 8,
      value: "Payment Pending",
    },
    {
      id: 9,
      value: "Settled Cases",
    },
    {
      id: 10,
      value: "Withdrawl/Rejected",
    },
    {
      id: 11,
      value: "More Info Required",
    },
    {
      id: 12,
      value: "My Claims",
    },
  ];

  const checkStatus = (val) => {
    let status = "";
    statusOptions.map((stat, index) => {
      if (String(stat.id) === String(val)) status = stat.value;
    });
    return status;
  };

  function convertDateFormat(originalDate) {
    const parts = originalDate.split("-");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  console.log("ValidUpto", ValidUpto);
  return (
    <>
      <div className="col-lg-12 m-2">
        <div className="row">
          <div className="row">
            <table className="m-1" style={{ border: "1px solid grey" }}>
              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-3">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Name
                      </label>
                    </div>
                    <div className="col-lg-9 text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {claim?.driverDetails?.DriverName &&
                        claim?.driverDetails?.DriverName !== "null"
                          ? claim?.driverDetails?.DriverName
                          : ""}
                      </label>
                    </div>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-3">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Status
                      </label>
                    </div>
                    <div className="col-lg-9 text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                        value={DLStatus}
                      >
                        {DLStatus}
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
                      Valid Upto
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
                      {claim?.driverDetails?.ValidUpto &&
                      claim?.driverDetails?.ValidUpto !== "null"
                        ? convertDateFormat(claim?.driverDetails?.ValidUpto)
                        : ""}
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-3">
                      <label
                        htmlFor=""
                        className=" text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        DL No.
                      </label>
                    </div>
                    <div className="col-lg-9 text-end">
                      <label
                        htmlFor=""
                        className=" text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {claim?.driverDetails?.LicenseNumber &&
                        claim?.driverDetails?.LicenseNumber !== "null"
                          ? claim?.driverDetails?.LicenseNumber
                          : ""}
                      </label>
                    </div>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-5">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Father Name
                      </label>
                    </div>
                    <div className="col-lg-7 text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {claim?.driverDetails?.FatherName}
                      </label>
                    </div>
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
                        Gender
                      </label>
                    </div>
                    <div className="col-lg-6 text-end">
                      <label
                        htmlFor=""
                        className=" text-color "
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {claim?.driverDetails?.Gender}
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label
                        htmlFor=""
                        className=" text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        License Type
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
                        {claim?.driverDetails?.LicenseType &&
                        claim?.driverDetails?.LicenseType !== "null"
                          ? claim?.driverDetails?.LicenseType
                          : ""}
                      </label>
                    </div>
                  </div>
                </td>

                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label
                        htmlFor=""
                        className=" text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Verification Type
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
                        {String(claim?.driverDetails?.TypeOfverification) ===
                        "1"
                          ? "Verified Manually"
                          : "Verified by Online"}
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
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
                        Blood Group
                      </label>
                    </div>
                    <div className="col-lg-6 text-end">
                      <label
                        htmlFor=""
                        className=" text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {claim?.driverDetails?.BloodGroup
                          ? claim?.driverDetails?.BloodGroup
                          : ""}
                      </label>
                    </div>
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
                        Mobile
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
                        {claim?.driverDetails?.Mobile}
                      </label>
                    </div>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-3">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Address
                      </label>
                    </div>
                    <div className="col-lg-9 text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {claim?.driverDetails?.Address}
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
                      Date Of Birth
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
                      {claim?.driverDetails?.DateOfBirth &&
                      claim?.driverDetails?.DateOfBirth !== "null"
                        ? convertDateFormat(claim?.driverDetails?.DateOfBirth)
                        : ""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label
                        htmlFor=""
                        className=" text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        RTO Name
                      </label>
                    </div>
                    <div className="col-lg-6 text-end">
                      <label
                        htmlFor=""
                        className=" text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {claim?.driverDetails?.RtoName}
                      </label>
                    </div>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-7 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Issued Date
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-5 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.driverDetails?.DateOfIssue &&
                      claim?.driverDetails?.DateOfIssue !== "null"
                        ? convertDateFormat(claim?.driverDetails?.DateOfIssue)
                        : ""}
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

export default Form_driver;
