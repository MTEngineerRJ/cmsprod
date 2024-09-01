import TabularView from "./TabularView";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { headCells } from "./DataHeader";
import {
  sortObjectsByOrderIdDescending,
  updatedFormatDate,
  convertToIST,
} from "./functions";

export default function BaseView({
  claims,
  setMajorSearch,
  status,
  selectedCard, 
  start,
  IsLoading,
  end,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  let tempData = [];
  useEffect(() => {
    claims?.map((claim, index) => {
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
            <a href={String(claim?.Region).toLowerCase().includes("preinspection") ? `/preInspection-claim-details?leadId=${claim.LeadID}` : String(claim?.Region).toLowerCase().includes("spot") ? `/spot-claim-details?leadId=${claim.LeadID}` : `/claim-details?leadId=${claim.LeadID}`}>
              {String(claim?.Region).toLowerCase().includes("preinspection") ? claim.VehicleNo : claim?.PolicyNo}
            </a>
          </div>
        ),
        registration_no: claim.RegistrationNo,
        region: claim.Region,
        added_date: updatedFormatDate(convertToIST(claim.AddedDate)),
        city: tempGarage ? tempGarage[1] : "N.Aa",
        state: tempGarage ? tempGarage[2] : "N.A.",
        assigned_garage: tempGarage ? tempGarage[0] : "N.A.",
        case_age: claim?.garageNumber,
        tat: `${claim.TAT} days`,
        repairer_mail_id: claim.RepairerMailId ? claim.RepairerMailId : "N.A.",
        document:
          claim.IsDocumentUploaded > 0 ? (
            <span className="text-success" style={{ marginLeft: "40px" }}>
              <FaCheckCircle />
            </span>
          ) : (
            <span
              className="flaticon-close text-danger"
              style={{ marginLeft: "40px" }}
            ></span>
          ),
      };
      tempData.push(updatedRow);
    });
    setUpdatedData(tempData);
  }, [status, selectedCard,claims]);

  return (
    <TabularView
      title="My Claims"
      data={sortObjectsByOrderIdDescending(updatedData)}
      start={start}
      end={end}
      IsLoading={IsLoading}
      headCells={headCells}
      setMajorSearch={setMajorSearch}
    />
  );
}
