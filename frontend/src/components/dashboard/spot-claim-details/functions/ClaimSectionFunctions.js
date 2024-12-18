const formatDate = (val) => {
  const date = new Date(val);
  const formattedDate = date.toLocaleDateString("en-GB");
  return formattedDate;
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

const claimRegions = [
  { id: 1, title: "Delhi", value: "Delhi" },
  { id: 2, title: "Jodhpur", value: "Jodhpur" },
  { id: 3, title: "Chandigarh", value: "Chandigarh" },
];

const getNextYear = (policyStartDate) => {
  // if (policyStartDate && !isNaN(new Date(policyStartDate).getTime())) {
  const oneYearLater = new Date(policyStartDate);
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  oneYearLater.setMonth(oneYearLater.getMonth());
  oneYearLater.setDate(oneYearLater.getDate() - 1);

  return oneYearLater;
  // }
};

const checkStatus = (val) => {
  let status = "";
  statusOptions.map((stat, index) => {
    if (String(stat.id) === String(val)) status = stat.value;
  });
  return status;
};

const setDate = (newDate, settingFunc) => {
  const dateObj = new Date(newDate);
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}-${mm}-${dd}`;
  settingFunc(formattedDate);
};

const handleInputChange = (e,setInsuredMobileNo1) => {
  const inputValue = e.target.value;

  // Allow only numeric input
  const numericValue = inputValue.replace(/\D/g, "");

  // Restrict to 10 digits
  const truncatedValue = numericValue.slice(0, 10);

  setInsuredMobileNo1(truncatedValue);
};

const handleInputChange_01 = (e,setInsuredMobileNo2) => {
  const inputValue = e.target.value;

  // Allow only numeric input
  const numericValue = inputValue.replace(/\D/g, "");

  // Restrict to 10 digits
  const truncatedValue = numericValue.slice(0, 10);
  setInsuredMobileNo2(truncatedValue);
};

const openStatusUpdateHandler = (setIsStatusModal) => {
  setIsStatusModal(true);
};

module.exports = {
  formatDate,
  statusOptions,
  claimRegions,
  getNextYear,
  checkStatus,
  setDate,
  handleInputChange,
  handleInputChange_01,
  openStatusUpdateHandler,
};
