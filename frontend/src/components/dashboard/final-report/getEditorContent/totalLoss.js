import { getTotalLossTotalCostOfNewParts } from "../AllCustomFunctions/totalLossFunctions";
import {
  getTotalSalvageLossBasisAssessementWithoutRC,
  getTotalSalvageLossBasisAssessementWithRC,
  getTotalLossBasisAssessement,
  getNetAssessedWithLessExcessDeduction,
} from "../AllCustomFunctions/totalLossFunctions";
export const getTotalLoss = (
  claim,
  allLabour,
  allNewParts,
  currentGst,
  allDepreciations
) => {
  const string = `<div class="col-lg-6 offset-3">
      <h4 class="text-center text-dark mb-5">
        Total Loss Calculation (**POLICYTYPE**)
      </h4>

      <table style=" width: 100% ">
        <tr>
          <td style=" width: 30% " class="text-start">
            <h5
              class="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              1. Assessment on REPAIRs Basis :
            </h5>
          </td>

          <td style=" width: 45% " class="text-end">
            <span class="fw-bold text-dark text-decoration-underline">
             
              Amt. In Rs.
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>A. Cost of New Parts</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="text-dark">
            Rs. **getTotalLossTotalCostOfNewParts**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="">
            <span>B. Add: Labour & Repairs</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span> Rs. **getTotalLossTotalCostOfLabour**</span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>SUB TOTAL (A+B)</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>
             Rs. **subTotalOfNewpartsAndLabour**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>C. Less: Depreciation ( if applicable) </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            </span>
          </td>
        </tr>
        <tr>
          <td>
           <h5>**getDepreciationArray**</h5>
          <td/>
        </tr>
        <tr>
          <td style=" width: 30% " class="text-start">
            <span>D. Less: Policy/Imposed Excess [Including (0)] </span>
          </td>

          <td style=" width: 45% " class="text-end ">
            <span class="">
              
            Rs.  **lessExcess**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 30% " class="text-start">
            <span>E. Net assessed Amount on Repairs basis </span>
          </td>

          <td style=" width: 45% " class="text-end">
            <span>
              
            Rs.  **getDeprciationValueForNewParts**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 30% " class="text-start">
            <span>F. Less: Expected Salvage value of parts. </span>
          </td>

          <td style=" width: 45% " class="text-end">
            <span>Rs. **ExpectedSalvage** </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 30% " class="">
            <span> G. Add: IMT23 Liability (if applicable) </span>
          </td>

          <td style=" width: 45% " class="text-end">
            <span>Rs. **getTotalIMTValue** </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 30% " class="text-start">
            <span>Total Amount after salvage</span>
          </td>

          <td style=" width: 45% " class="text-end">
          
            <span>Rs. **finalNetAssessedAmountWithIMTAndSalvage**</span>
          </td>
        </tr>
      </table>
      <div>
        <p class="text-dark mt-4">
          Note: The above Net assessed is without dismantling of the vehicle.
          The Net assessed Amount may exceed after dismantling of the same..
        </p>
      </div>


      <table style="width: 100%; margin-bottom: 10px;">
        <tr>
          <td style=" width: 30% " class="text-start">
            <h5
              class="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              2. Assessment on TOTAL LOSS Basis :
            </h5>
          </td>

          <td style=" width: 45% " class="text-end">
            <span class="fw-bold text-dark text-decoration-underline">
             
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>A. Sum Insured i.e. IDV of the vehicle</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
              **IDV**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="">
            <span>B. Less: Missing Items</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>Rs. **MissingItems** </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>C. Less: Policy Excess</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>
            Rs.
              **lessExcess**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>D. Net assessed on TOTAL LOSS Basis </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs. **getTotalLossBasisAssessement**
            </span>
          </td>
        </tr>
      </table>

      <table style="width: 100%; margin-bottom: 10px;">
        <tr>
          <td style=" width: 30% " class="text-start">
            <h5
              class="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              3. Assessment on NET OF SALVAGE LOSS Basis With RC :
            </h5>
          </td>

          <td style=" width: 45% " class="text-end">
            <span class="fw-bold text-dark text-decoration-underline">
              
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>A. Sum Insured i.e. IDV of the vehicle</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  **IDV**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="">
            <span>B. Less: Missing Items</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span> 
            Rs.  **MissingItems**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>C. Less: Policy Excess</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>
              
            Rs.  ${claim?.summaryDetails?.LessExcess}
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>
              D. Wreck value of the damaged vehicle (As agreed upon by insured)
            </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs. **WreckValueWith**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>E. Net assessed on NET OF SALVAGE LOSS Basis </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
              **getTotalSalvageLossBasisAssessementWithRC**
            </span>
          </td>
        </tr>
      </table>


      <table style="width: 100%; margin-bottom: 10px;">
        <tr>
          <td style=" width: 30% " class="text-start">
            <h5
              class="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              4. Assessment on NET OF SALVAGE LOSS Basis Without RC :
            </h5>
          </td>

          <td style=" width: 45% " class="text-end">
            <span class="fw-bold text-dark text-decoration-underline">
              
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>A. Sum Insured i.e. IDV of the vehicle</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs.  **IDV+Rti_Amount**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="">
            <span>B. Less: Missing Items</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>Rs. ${claim?.totalLoss?.MissingItem} </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>C. Less: Policy Excess</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>
              
            Rs. ${claim?.summaryDetails?.LessExcess}
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>
              D. Wreck value of the damaged vehicle (As agreed upon by insured){" "}
            </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
            Rs.  ${claim?.totalLoss?.WreckValueWithout}
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>E. Net assessed on NET OF SALVAGE LOSS Basis </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  **getTotalSalvageLossBasisAssessementWithoutRC**
            </span>
          </td>
        </tr>
      </table>

      <table style="width: 100%; margin-bottom: 10px;">
        <tr>
          <td style=" width: 30% " class="text-start">
            <h5
              class="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              5. Assessment on  NET OF SALVAGE LOSS Basis With RC With RTI :
            </h5>
          </td>

          <td style=" width: 45% " class="text-end">
            <span class="fw-bold text-dark text-decoration-underline">
              
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>A. Sum Insured i.e. IDV of the vehicle+ RTI </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs.  $IDV+Rti_Amount$
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="">
            <span>B. Less: Missing Items</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>Rs. ${claim?.totalLoss?.MissingItem} </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>C. Less: Policy Excess</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>
              
            Rs. ${claim?.summaryDetails?.LessExcess}
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>
              D. Wreck value of the damaged vehicle (As agreed upon by insured){" "}
            </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
            Rs.  ${claim?.totalLoss?.WreckValueWith}
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>E. Net assessed on NET OF SALVAGE LOSS Basis </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  $getTotalSalvageLossBasisAssessementWithRCWithRTI$
            </span>
          </td>
        </tr>
      </table>

      <table style="width: 100%; margin-bottom: 10px;">
        <tr>
          <td style=" width: 30% " class="text-start">
            <h5
              class="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              6. Assessment on  NET OF SALVAGE LOSS Basis Without RC With RTI :
            </h5>
          </td>

          <td style=" width: 45% " class="text-end">
            <span class="fw-bold text-dark text-decoration-underline">
              
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>A. Sum Insured i.e. IDV of the vehicle+ RTI </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs. ${
              Number(claim?.totalLoss?.RtiAmount) +
              Number(claim?.claimDetails?.IDV)
            }
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="">
            <span>B. Less: Missing Items</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>Rs. ${claim?.totalLoss?.MissingItem} </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>C. Less: Policy Excess</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>
              
            Rs. ${claim?.summaryDetails?.LessExcess}
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>
              D. Wreck value of the damaged vehicle (As agreed upon by insured){" "}
            </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
            Rs.  ${claim?.totalLoss?.WreckValueWithout}
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>E. Net assessed on NET OF SALVAGE LOSS Basis </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  $getTotalSalvageLossBasisAssessementWithoutRCWithRTI$
            </span>
          </td>
        </tr>
      </table>

      <table style="width: 100%; margin-bottom: 10px;">
        <tr>
          <td style=" width: 30% " class="text-start">
            <h5
              class="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              7. Assessment on CASH LOSS on Repairs Basis :
            </h5>
          </td>

          <td style=" width: 45% " class="text-end">
            <span class="fw-bold text-dark text-decoration-underline">
              
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>A. Cost of NEW PARTS</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs.  $getTotalLossTotalCostOfNewParts$
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="">
            <span>B. Add: Cost of Suspected Damaged parts.</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>Rs. **getCostOfSuspectedDamagedParts** </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>C. Less: Taxes on Rs. <span  class="fw-bold text-dark">**getTotalCostOfParts**</span>  </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>
              
            Rs. **getCostOfPartsWithoutTaxes**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>
              D. [A+B-C]
            </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
            Rs.  **getFirstFiltering**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>E. Less: Depreciation (if applicable)</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
             $getDepreciationArrayValueWithoutGST$
            </span>
          </td>
        </tr>

         <tr>
          <td>
           <h5>
        $getDepreciationArrayWithoutGST$

           </h5>
          <td/>
        </tr>
         <tr>
          

        </tr>
        <tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>F. Less: Suspected parts Depreciation @ $getDepreciationFinalValue$ %
              On parts worth Rs. $getCostOfSuspectedDamagedParts$
            </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  **getDepreciationOnSuspectedPartsSum**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>G. Add: Labour Charges (without taxes)</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  **getLabourChargesWithoutTax**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>H. [D-E-F+G]</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  **getSecondFiltering**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>I. Less: **CashLoss** % for Cash Loss Indemnity on Rs. $getSecondFiltering$ </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  **LessCashOnIndemnity**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>J. Less: Salvage Value</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  $ExpectedSalvage$
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>K. Less: Excess Clause</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  **LessExcess**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>L. Add: IMT23 Liability (if applicable)</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  $getTotalIMTValue$
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>M. Net assessed on CASH LOSS Basis [H-I-J-K+L]</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
             
            Rs.  **getLastFiltering**
            </span>
          </td>
        </tr>
      </table>
      
      <table style="width: 100%; margin-bottom: 10px;">
        <tr>
          <td style=" width: 30% " class="text-start">
            <h5
              class="text-dark text-decoration-underline"
              style={{ color: "black" }}
            >
              8. Summary of ASSESSMENT
            </h5>
          </td>

          <td style=" width: 45% " class="text-end">
            <span class="fw-bold text-dark text-decoration-underline">
              
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>A. Assessment on Repairs Basis</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs.  $getNetAssessedWithLessExcessDeduction$
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="">
            <span>B. Assessment on TOTAL LOSS Basis</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>Rs. $getTotalLossBasisAssessement$ </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>C. Assessment on NET OF SALVAGE LOSS Basis with RC</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span>
              
            Rs.  $getTotalSalvageLossBasisAssessementWithRC$
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>D. Assessment on NET OF SALVAGE LOSS Basis without RC </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs.  $getTotalSalvageLossBasisAssessementWithoutRC$
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>E. Assessment on NET OF SALVAGE LOSS Basis with RC with RTI</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs.  **getTotalSalvageLossBasisAssessementWithRCWithRTI**
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>F. Assessment on NET OF SALVAGE LOSS Basis without RC with RTI </span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs.   ##getTotalSalvageLossBasisAssessementWithRCWithRTI##
            </span>
          </td>
        </tr>
        <tr>
          <td style=" width: 60% " class="text-start">
            <span>G. Assessment on CASH LOSS on Repairs Basis</span>
          </td>

          <td style=" width: 40% " class="text-end">
            <span class="fw-bold text-dark">
              
            Rs.  ##getLastFiltering##
            </span>
          </td>
        </tr>
        
      </table>


      <div>
        <h4 class="text-dark text-decoration-underline">
          RECOMMENDATIONS :
        </h4>
        <div>
          <p class="text-dark">
            The Net assessed Amount on repairs basis is exceeding the prescribed
            limit of CTL i.e. 75% of the IDV. The matter was discussed with the
            C.A. officials and as instructed I worked out the insurers Net
            assessed Amount on different mode of settlement as above.
          </p>
          <p class="text-dark">
            (A). The Net assessed Amount of insurers (without dismantling of the
            vehicle) on REPAIR BASIS worked out is Rs. ${getNetAssessedWithLessExcessDeduction(
              claim,
              allLabour,
              allNewParts,
              currentGst
            )} and is liable
            to increase further, therefore is uneconomical.
          </p>
          <p class="text-dark">
            (B) The Net assessed Amount of insurers on TOTAL LOSS BASIS worked
            out is Rs. ${getTotalLossBasisAssessement(
              claim
            )} To this expenses to
            collect/scrutinize/store/advertise/sell the salvage, which would be
            uneconomical.
          </p>
          <p class="text-dark">
            (C) The Net assessed Amount for insurers on NET OF SALVAGE LOSS
            BASIS WITH RC worked out to Rs. ${getTotalSalvageLossBasisAssessementWithRC(
              claim
            )} is the most economical
            mode of settlement for the insurers, if the decision to disposal of
            salvage is taken within stipulated time limit. Also there will not
            be any further expenses.
          </p>

           <p class="text-dark">
            (C) The Net assessed Amount for insurers on NET OF SALVAGE LOSS
            BASIS WITH RC worked out to Rs. ${getTotalSalvageLossBasisAssessementWithRC(
              claim
            )} is the most economical
            mode of settlement for the insurers, if the decision to disposal of
            salvage is taken within stipulated time limit. Also there will not
            be any further expenses.
          </p>

           <p class="text-dark">
            (D) The Net assessed Amount for insurers on NET OF SALVAGE LOSS 
            BASIS WITHOUT RC worked out to Rs. ${getTotalSalvageLossBasisAssessementWithoutRC(
              claim
            )}
            is the most economical mode of settlement for the insurers, 
            if the decision to disposal of salvage is taken within stipulated
             time limit.  Also there will not be any further expenses.
          </p>

           <p class="text-dark">
            (E) The Net assessed Amount for insurers on NET OF SALVAGE LOSS BASIS 
            WITH RC WITH RIT worked out to ${
              getTotalSalvageLossBasisAssessementWithRC(claim) +
              claim?.totalLoss?.RtiAmount
            } is the 
            most economical mode of settlement for the insurers, if the decision 
            to disposal of salvage is taken within stipulated time limit. 
            Also there will not be any further expenses.
          </p>

           <p class="text-dark">
            (F) The Net assessed Amount for insurers on NET OF SALVAGE LOSS 
            BASIS WITHOUT RC WITH RTI worked out to ${
              getTotalSalvageLossBasisAssessementWithRC(claim) +
              claim?.totalLoss?.RtiAmount
            }
             is another mode of settlement for the insurers if RC is cancelled 
             and decision to disposal of salvage is taken within stipulated 
             time limit. Also there will not be any further expenses.
          </p>
         
          <p class="text-dark">
            (G) The Net assessed Amount for insurers on CASH LOSS BASIS i.e. Rs.
             <Total_CL_Basis> will be the most economical hence RECOMMENDED, 
             however insurers may suitably decide. The above recommendations 
             are subject to disposal of wreck within time limit mentioned in 
             offer. Here, it is to be noted that the market prices recede due 
             to increase in age of vehicle.  The climate further worsens the 
             condition when the vehicle kept unutilized.
          </p>
          <p class="text-dark">
            The consent letter from the Insured to settle the claim on Net of
            Salvage loss basis(Without RC) for Rs. $getLastFiltering$ is to be obtained
            at your end. If the claim is settled on Net of Salvage loss basis
            the policy will have to be cancelled with immediate effect without
            refund of any premium; the Insured will not submit any Bills/Cash
            memos of repairs/replacement and salvage of damaged parts.
          </p>
        </div>
      </div>
    </div>`;

  return string;
};
