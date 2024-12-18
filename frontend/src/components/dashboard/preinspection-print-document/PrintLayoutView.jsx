import React, { useState } from "react";
import { useRouter } from "next/router";

const PrintLayoutView = () => {
  const router = useRouter();
  const { leadId } = router.query;

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "rc") {
      router.push(`/rc-document/${leadId}`);
    }
    if (selectedValue === "preinspection-report-document") {
      router.push(`/preinspection-report-document/${leadId}`);
    }
    if (selectedValue === "dl") {
      router.push(`/dl-document/${leadId}`);
    }
    if (selectedValue === "billcreation") {
      router.push(`/bill-document/${leadId}`);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-2 mt-1 mb-2 text-end">
          <label htmlFor="documentType" className="text-dark fw-bold">
            Document Types:
          </label>
        </div>
        <div className="col-lg-3">
          <select
            id="documentType"
            className="form-select"
            onChange={handleSelectChange}
          >
            <option value="-">Select Documents</option>
            <option value="preinspection-report-document">Pre-Inspection Report</option>
            <option value="rc">RC</option>
            <option value="dl">DL</option>
            <option value="billcreation">Bill Creation</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default PrintLayoutView;
