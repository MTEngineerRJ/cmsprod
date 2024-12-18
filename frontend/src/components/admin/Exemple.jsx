import Link from "next/link";
import SmartTable from "./SmartTable";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { isDate } from "date-fns";

const headCells = [
  {
    id: "lead_id",
    numeric: false,
    label: "Lead Id",
    width: 100,
  },
  {
    id: "reference_id",
    numeric: false,
    label: "MT Reference ID",
    width: 100,
  },
  {
    id: "policy_holder",
    numeric: false,
    label: "Insured Name",
    width: 150,
  },
  {
    id: "policy_no",
    numeric: false,
    label: "Policy No.",
    width: 150,
  },
  {
    id: "region",
    numeric: false,
    label: "Region",
    width: 100,
  },
  {
    id: "added_date",
    numeric: false,
    label: "Date",
    width: 100,
  },
  {
    id: "assigned_garage",
    numeric: false,
    label: "Assigned Garage",
    width: 100,
  },
  {
    id: "case_age",
    numeric: false,
    label: "Garage Contact. No.",
    width: 150,
  },
  {
    id: "tat",
    numeric: false,
    label: "TAT(Days)",
    width: 150,
  },
  {
    id: "repairer_mail_id",
    numeric: false,
    label: "Repairer Mail Id",
    width: 150,
  },
  {
    id: "document",
    numeric: false,
    label: "Upload Document",
    width: 100,
  },
];

const data = [
  {
    _id: "6144145976c7fe",
    email: "minageres123@gmail.com",
    name: "Mina",
    phone: <Link href="/claim-details">9617099995114</Link>,
    subject: "test",
    message: "ahlannn",
    date: "2021-09-17 19:10:50",
    serial: "123",
  },
  //   {
  //     _id: "6143989f9d87cc",
  //     email: "as@a.com",
  //     name: "as",
  //     phone: "+9617646699991",
  //     subject: "as",
  //     message: "as",
  //     date: "2021-09-16 22:18:31",
  //   },
  //   {
  //     _id: "614397edc9177d8c8",
  //     email: "amine@amine.com",
  //     name: "amine",
  //     phone: "+334343439393993",
  //     subject: "1234",
  //     message: "3434",
  //     date: "2021-09-16 22:15:57",
  //   },
  //   {
  //     _id: "6143be67dfca4985c",
  //     email: "dominique.amine@gmail.com",
  //     name: "Dominique",
  //     phone: "+96189904686",
  //     subject: "Dev ",
  //     message: "Ohmaga",
  //     date: "2021-09-16 21:33:04",
  //   },
  //   {
  //     _id: "61141e57a7dbd8a189e",
  //     email: "amineamine19961996@gmail.com",
  //     name: "amine amine",
  //     phone: "+96176776341",
  //     subject: "qw",
  //     message: "qw",
  //     date: "2021-08-11 22:00:39",
  //   },
];

export default function Exemple({
  claims,
  setMajorSearch,
  status,
  start, 
  end,
}) {
  const [updatedData, setUpdatedData] = useState([]);

  const getISTtIME=(utcTimestamp)=>{

    const utcDate = new Date(utcTimestamp);

    // Convert to Indian Standard Time (IST)
    const istDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  
    // Log the IST time to the console
    console.log("Indian Standard Time (IST):", istDate.toISOString());
  
    // Return the IST time as a string
    return istDate.toISOString();
  } 
  const getValue = (leadId) => {
    let val = "";
    //console.log(status,leadId)
    status.map((stat, index) => {
      if (String(stat.LeadId) === String(leadId)) {
        val = stat.Status;
      }
    });
    return val;
  };

  function convertToIST(utcTimestamp) {
    const utcDate = new Date(utcTimestamp);

    const istDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  
    // Format IST date and time with hours, minutes, AM/PM
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      // hour: 'numeric', 
      // minute: 'numeric', 
      // hour12: true 
    };
    const formattedISTDateTime = istDate.toLocaleString("en-US", options);
  
    // Return the formatted IST date and time as a string
    return formattedISTDateTime;
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.lead_id - a.lead_id);
  };

  let tempData = [];
  useEffect(() => {
    const region = JSON.parse(localStorage.getItem("regionType"));
    const today = new Date();
    claims?.map((claim, index) => {
      const tempValue = getValue(claim.LeadID);
      // const addedDate = new Date(claim.AddedDate.toDateString());
      const formatdate_ = new Date(claim.AddedDate);
      const day = formatdate_.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
      const month = (formatdate_.getMonth() + 1).toString().padStart(2, '0'); // Get month (zero-based) and pad with leading zero if needed
      const year = formatdate_.getFullYear(); // Get full year

      const addedDate = `${day}/${month}/${year}`;
      const tatInDays = claim?.tat;
      const tempGarage = claim?.AssignedGarage?.split(",").map((item) =>
        item.trim()
      );
      const updatedRow = {
        lead_id: claim.LeadID,
        reference_id: claim.ReferenceID,
        policy_holder: claim.PolicyHolder,
        policy_no: (
          <div
            style={{ textDecorationLine: "underline", color: "lightskyblue" }}
          >
            <a href={`/claim-details?leadId=${claim.LeadID}`}>
              {claim.PolicyNo}
            </a>
          </div>
        ),
        registration_no: claim.RegistrationNo,
        region: claim.Region,
        added_date: convertToIST(claim.AddedDate),
        // added_date: new Date(claim.AddedDate).toLocaleString(undefined, {
        //   timeZone: "Asia/Kolkata",
        // }),
        city: tempGarage ? tempGarage[1] : "N.Aa",
        state: tempGarage ? tempGarage[2] : "N.A.",
        assigned_garage: tempGarage ? tempGarage[0] : "N.A.",
        case_age: "N.A.",
        tat: `${tatInDays} days`,
        repairer_mail_id: claim.RepairerMailId ? claim.RepairerMailId : "N.A.",
        document:
          claim.IsDocumentUploaded > 0 ? (
            <span className="text-success" style={{ marginLeft: "40px" }}>
              <FaCheckCircle />
            </span>
          ) : (
            //   src="data:image/jpeg;base64,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"
            <span
              className="flaticon-close text-danger"
              style={{ marginLeft: "40px" }}
            ></span>
          ),
      };
      tempData.push(updatedRow);
    });
    setUpdatedData(tempData);
  }, [status, claims]);
  //console.log(updatedData);
  return (
    <SmartTable
      title="My Claims"
      data={sortObjectsByOrderIdDescending(updatedData)}
      start={start}
      end={end}
      headCells={headCells}
      setMajorSearch={setMajorSearch}
    />
  );
}
