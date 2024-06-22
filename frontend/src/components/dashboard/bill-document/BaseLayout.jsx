import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  roundOff,
  formatDate,
  numberToWords,
  calculateTheTotalBillWithoutGST,
  addCommasToNumber,
  calculateTotalAssessed,
  calculateCGST,
  calculateIGST,
  calculateSGST,
  grandTotalWithGST
} from "./functions";
import LayoutView from "./LayoutView";
import axios from "axios";
const BaseLayout = ({ feeReport, allOffices }) => {
  const pdfRef = useRef();

  const [Assessed, setAssessed] = useState(0);
  const [Estimate, setEstimate] = useState(0);

  const [selectedServicingOffice, setSelectedServicingOffice] = useState([]);
  const [selectedAssignedOffice, setSelectedAssignedOffice] = useState([]);

  useEffect(() => {
    const name =
      String(feeReport?.feeDetails?.BillTo) === "Insurer"
        ? feeReport?.claimDetails?.PolicyIssuingOffice
        : feeReport?.claimDetails?.ClaimServicingOffice;

    let requiredOffice = {};

    allOffices.map((office, index) => {
      const stateCodeString = String(office.OfficeName).toLowerCase();
      const nameString = String(name).toLowerCase().split(" - ")[0];

      if (stateCodeString.includes(nameString)) {
        requiredOffice = office;
      }
    });

    setSelectedServicingOffice(requiredOffice);
  }, [allOffices, feeReport]);

  useEffect(()=>{
    if(feeReport?.claimDetails?.AssignedTo !== ''){
    
    axios
        .get("/api/getAssignedOffice", {
          params: {
            name: feeReport?.claimDetails?.AssignedTo,
          },
        })
        .then((res) => {
          const requiredAAssignedInfo = res.data.data.results[0];
          setSelectedAssignedOffice(requiredAAssignedInfo);
        })
        .catch((err) => {});
      }
  },[feeReport]);

  useEffect(() => {
    calculateTotalAssessed(feeReport, setAssessed, setEstimate);
  }, [feeReport]);

  return (
    <LayoutView
      feeReport={feeReport}
      pdfRef={pdfRef}
      selectedServicingOffice={selectedServicingOffice}
      formatDate={formatDate}
      addCommasToNumber={addCommasToNumber}
      roundOff={roundOff}
      Estimate={Estimate}
      Assessed={Assessed}
      calculateTheTotalBillWithoutGST={calculateTheTotalBillWithoutGST}
      calculateCGST={calculateCGST}
      calculateSGST={calculateSGST}
      calculateIGST={calculateIGST}
      grandTotalWithGST={grandTotalWithGST}
      numberToWords={numberToWords}
      selectedAssignedOffice={selectedAssignedOffice}
      setSelectedAssignedOffice={setSelectedAssignedOffice}
    />
  );
};

export default BaseLayout;
