import { getTotalLossTotalCostOfNewParts } from "../AllCustomFunctions/totalLossFunctions";
 

export const getTotalLoss = ()=>{

  const string =
`<div>
      <h4 className="text-center text-dark mb-5">
        Total Loss Calculation (Nil Depreciation)
      </h4>

      <table style={{ width: "100%" }}>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <h5
              className="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              1. Assessment on REPAIRs Basis :
            </h5>
          </td>

          <td style={{ width: "45%" }} className="text-end">
            <span className="fw-bold text-dark text-decoration-underline">
              {" "}
              Amt. In Rs.
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>A. Cost of New Parts</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
             **getTotalLossTotalCostOfNewParts**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="">
            <span>B. Add: Labour & Repairs</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span> **getTotalLossTotalCostOfLabour**</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>SUB TOTAL (A+B)</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span>
              {" "}
              **subTotalOfNewpartsAndLabour**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>C. Less: Depreciation ( if applicable) </span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              
            </span>
          </td>
        </tr>
        <tr>
          {/* <td style={{ width: "60%" }} className="text-start">
            <span>
              50 % depreciation on Plastic parts worth Rupees 104208.00 = 52104{" "}
            </span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              xyz
            </span>
          </td> */}

          **getDepreciationArray**
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>D. Less: Policy/Imposed Excess [Including (0)] </span>
          </td>

          <td style={{ width: "45%" }} className="text-end ">
            <span className="">
              {" "}
              **LessExcess**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>E. Net assessed Amount on Repairs basis </span>
          </td>

          <td style={{ width: "45%" }} className="text-end">
            <span>
              {" "}
              **getNetAssessedWithlessExcessDeduction**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>F. Less: Expected Salvage value of parts. </span>
          </td>

          <td style={{ width: "45%" }} className="text-end">
            <span> **ExpectedSalvage** </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="">
            <span> G. Add: IMT23 Liability (if applicable) </span>
          </td>

          <td style={{ width: "45%" }} className="text-end">
            <span> **getTotalIMTValue** Nos.</span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <span>Total Amount after salvage</span>
          </td>

          <td style={{ width: "45%" }} className="text-end">
            {/* <span>-- CC</span>
            <span style={{ marginLeft: "60px" }}>
              Fuel Used : ---
            </span> */}
            <span>**finalNetAssessedAmountWithIMTAndSalvage**</span>
          </td>
        </tr>
      </table>
      <div>
        <p className="text-dark mt-4">
          Note: The above Net assessed is without dismantling of the vehicle.
          The Net assessed Amount may exceed after dismantling of the same..
        </p>
      </div>

      {/* Section - 1 end */}

      {/* Section - 1 start */}

      <table style={{ width: "100%", marginBottom: "10px" }}>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <h5
              className="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              2. Assessment on TOTAL LOSS Basis :
            </h5>
          </td>

          <td style={{ width: "45%" }} className="text-end">
            <span className="fw-bold text-dark text-decoration-underline">
              {" "}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>A. Sum Insured i.e. IDV of the vehicle</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              **IDV**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="">
            <span>B. Less: Missing Items</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span> **MissingItems** </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>C. Less: Policy Excess</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span>
              {" "}
              **LessExcess**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>D. Net assessed on TOTAL LOSS Basis </span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              **getTotalLossBasisAssessement**
            </span>
          </td>
        </tr>
      </table>

      <table style={{ width: "100%", marginBottom: "10px" }}>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <h5
              className="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              3. Assessment on NET OF SALVAGE LOSS Basis With RC :
            </h5>
          </td>

          <td style={{ width: "45%" }} className="text-end">
            <span className="fw-bold text-dark text-decoration-underline">
              {" "}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>A. Sum Insured i.e. IDV of the vehicle</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              **IDV**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="">
            <span>B. Less: Missing Items</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span> 
              **MissingItems**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>C. Less: Policy Excess</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span>
              {" "}
              **LessExcess**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>
              D. Wreck value of the damaged vehicle (As agreed upon by insured){" "}
            </span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
             **WreckValueWith**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>E. Net assessed on NET OF SALVAGE LOSS Basis </span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              **getTotalSalvageLossBasisAssessementWithRC**
            </span>
          </td>
        </tr>
      </table>


      <table style={{ width: "100%", marginBottom: "10px" }}>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <h5
              className="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              4. Assessment on NET OF SALVAGE LOSS Basis Without RC :
            </h5>
          </td>

          <td style={{ width: "45%" }} className="text-end">
            <span className="fw-bold text-dark text-decoration-underline">
              {" "}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>A. Sum Insured i.e. IDV of the vehicle</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              **IDV+Rti_Amount**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="">
            <span>B. Less: Missing Items</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span> **MissingItems** </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>C. Less: Policy Excess</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span>
              {" "}
             **LessExcess**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>
              D. Wreck value of the damaged vehicle (As agreed upon by insured){" "}
            </span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              **WreckValueWith**
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>E. Net assessed on NET OF SALVAGE LOSS Basis </span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              **getTotalSalvageLossBasisAssessementWithoutRC**
            </span>
          </td>
        </tr>
      </table>
      
      <table style={{ width: "100%", marginBottom: "10px" }}>
        <tr>
          <td style={{ width: "30%" }} className="text-start">
            <h5
              className="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              6. Summary of ASSESSMENT
            </h5>
          </td>

          <td style={{ width: "45%" }} className="text-end">
            <span className="fw-bold text-dark text-decoration-underline">
              {" "}
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>A. Assessment on Repairs Basis</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              ---
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="">
            <span>B. Assessment on TOTAL LOSS Basis</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span>--- </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>C. Assessment on NET OF SALVAGE LOSS Basis with RC</span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span>
              {" "}
              ---
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>D. Assessment on NET OF SALVAGE LOSS Basis without RC </span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              ---
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ width: "60%" }} className="text-start">
            <span>E. Net assessed on NET OF SALVAGE LOSS Basis </span>
          </td>

          <td style={{ width: "40%" }} className="text-end">
            <span className="fw-bold text-dark">
              {" "}
              ---
            </span>
          </td>
        </tr>
      </table>

      {/* Section - 1 end */}

      <div>
        <h4 className="text-dark text-decoration-underline">
          RECOMMENDATIONS :
        </h4>
        <div>
          <p className="text-dark">
            The Net assessed Amount on repairs basis is exceeding the prescribed
            limit of CTL i.e. 75% of the IDV. The matter was discussed with the
            C.A. officials and as instructed I worked out the insurers Net
            assessed Amount on different mode of settlement as above.
          </p>
          <p className="text-dark">
            (A). The Net assessed Amount of insurers (without dismantling of the
            vehicle) on REPAIR BASIS worked out is Rs. 498735.72 and is liable
            to increase further, therefore is uneconomical.
          </p>
          <p className="text-dark">
            (B) The Net assessed Amount of insurers on TOTAL LOSS BASIS worked
            out is Rs. 621266.00 To this expenses to
            collect/scrutinize/store/advertise/sell the salvage, which would be
            uneconomical.
          </p>
          <p className="text-dark">
            (C) The Net assessed Amount for insurers on NET OF SALVAGE LOSS
            BASIS WITH RC worked out to Rs. 370266.00 is the most economical
            mode of settlement for the insurers, if the decision to disposal of
            salvage is taken within stipulated time limit. Also there will not
            be any further expenses.
          </p>
          <p className="text-dark">
            (D) The Net assessed Amount for insurers on NET OF SALVAGE LOSS
            BASIS WITHOUT RC worked out to Rs. 499266.00 is the most economical
            mode of settlement for the insurers, if the decision to disposal of
            salvage is taken within stipulated time limit. Also there will not
            be any further expenses.
          </p>
          <p className="text-dark">
            I have tried my best to obtain the highest available market price
            for the Wreck, however in case the insurer gets greater value the
            assessment may be revised accordingly at your end.
          </p>
          <p className="text-dark">
            The consent letter from the Insured to settle the claim on Net of
            Salvage loss basis(Without RC) for Rs. 499266.00 is to be obtained
            at your end. If the claim is settled on Net of Salvage loss basis
            the policy will have to be cancelled with immediate effect without
            refund of any premium; the Insured will not submit any Bills/Cash
            memos of repairs/replacement and salvage of damaged parts.
          </p>
        </div>
      </div>
    </div>;`


    return string;
}