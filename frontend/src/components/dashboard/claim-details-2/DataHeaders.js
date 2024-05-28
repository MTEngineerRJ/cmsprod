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

const subStatus = [
  {
    id: 1,
    value: "Withdrawl/Reject",
  },
  {
    id: 2,
    value: "More Info Required",
  },
  {
    id: 3,
    value: "More forward!",
  },
];

const uploadReportTableHeaders = [
  {
    id: "doc_name",
    numeric: false,
    label: "File Name",
    width: 100,
  },

  {
    id: "file",
    numeric: false,
    label: "File",
    width: 100,
  },
  {
    id: "UploadedBy",
    numeric: false,
    label: "Uploaded By",
    width: 100,
  },
  {
    id: "verified_by",
    numeric: false,
    label: "Verified By",
    width: 100,
  },
  {
    id: "subject",
    numeric: false,
    label: "Action",
    width: 100,
  },
];

const subTypeTypes = [
  { id: 1, type: "Motor", value: "Motor" },
  { id: 1, type: "Non-Motor", value: "Non-Motor" },
  { id: 1, type: "Motor-2W", value: "Motor-2W" },
  { id: 1, type: "Motor-4W", value: "Motor-4W" },
];

const requestTypeTypes = [
  { id: 1, type: "SPOT", value: "SPOT" },
  { id: 1, type: "Final", value: "Final" },
  { id: 1, type: "re-inspection", value: "re-inspection" },
];

const ManualUploadHeaders = [
  {
    id: "serial_num",
    numeric: false,
    label: "S. No.",
    width: 10,
  },
  {
    id: "doc_name",
    numeric: false,
    label: "Document Name",
    width: 120,
  },
  {
    id: "date",
    numeric: false,
    label: "Uploaded On",
    width: 120,
  },
  {
    id: "file",
    numeric: false,
    label: "File",
    width: 150,
  },
  {
    id: "action",
    numeric: false,
    label: "Action",
    width: 50,
  },
];

let ManualUploadLabelData = [
  {
    _id: "6144145976c7fe",
    serial_num: "1",
    doc_name: "Driving licence",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "2",
    doc_name: "Certificate of registration",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "3",
    doc_name: "Repair Estimate",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "4",
    doc_name: "Claim form",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "5",
    doc_name: "Insurance policy",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "6",
    doc_name: "Damage vehicle photographs/video",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "7",
    doc_name: "Aadhar card",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "8",
    doc_name: "Pan card",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "9",
    doc_name: " Cancel cheque",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "10",
    doc_name: " Satisfaction voucher",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "11",
    doc_name: "Discharge voucher",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "12",
    doc_name: "Dismantle photographs",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "13",
    doc_name: "Reinspection photographs",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "14",
    doc_name: "Repair Invoice",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "15",
    doc_name: "Payment/cash receipt",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "16",
    doc_name: "Images",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "17",
    doc_name: "Videos",
  },
];

  
let UploadReportLabelData = [
  {
    _id: "6144145976c7fe",
    serial_num: "1",
    doc_name: "Driving licence",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "2",
    doc_name: "Certificate of registration",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "3",
    doc_name: "Repair Estimate",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "4",
    doc_name: "Claim form",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "5",
    doc_name: "Insurance policy",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "6",
    doc_name: "Damage vehicle photographs/video",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "7",
    doc_name: "Aadhar card",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "8",
    doc_name: "Pan card"
  },
  {
    _id: "6144145976c7fe",
    serial_num: "9",
    doc_name: " Cancel cheque",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "10",
    doc_name: " Satisfaction voucher",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "11",
    doc_name: "Discharge voucher",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "12",
    doc_name: "Dismantle photographs",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "13",
    doc_name: "Reinspection photographs",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "14",
    doc_name: "Repair Invoice",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "15",
    doc_name: "Payment/cash receipt",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "16",
    doc_name: "Images",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "17",
    doc_name: "Videos",
  },
];

module.exports = {
  subStatus,
  statusOptions,
  subTypeTypes,
  requestTypeTypes,
  uploadReportTableHeaders,
  ManualUploadHeaders,
  ManualUploadLabelData,
  UploadReportLabelData
};
