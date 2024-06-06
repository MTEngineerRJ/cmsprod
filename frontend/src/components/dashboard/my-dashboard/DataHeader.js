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
      label: "Policy No./ Vehicle No.",
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

  const ClaimsHeadingCardsContent = [
    {
      id: 1,
      blockStyle: "",
      icon: "flaticon-home",
      timer: "37",
      name: "Claim Appointment",
      color: "#a5d9c5",
    },
    {
      id: 2,
      blockStyle: "",
      icon: "flaticon-home",
      timer: "37",
      name: "Estimate Approval Pending",
      color: "#AFEEEE",
    },
    {
      id: 3,
      blockStyle: "style2",
      icon: "flaticon-view",
      timer: "24",
      name: "Vehicle Under Repair",
      color: "#98FB98",
    },
    {
      id: 4,
      blockStyle: "style3",
      icon: "flaticon-chat",
      timer: "12",
      name: "Invoice Approval Pending",
      color: "#9ACD32",
    },
    {
      id: 5,
      blockStyle: "style4",
      icon: "flaticon-heart",
      timer: "18",
      name: "Surveyor Report Uploaded",
      color: "#FFA07A",
    },
    {
      id: 6,
      blockStyle: "",
      icon: "flaticon-home",
      timer: "37",
      name: "Hard Copies Pending",
      color: "#FFB6C1",
    },
    {
      id: 7,
      blockStyle: "style2",
      icon: "flaticon-view",
      timer: "24",
      name: "Soft Copy Completed",
      color: "#FFE4E1",
    },
    {
      id: 8,
      blockStyle: "style3",
      icon: "flaticon-chat",
      timer: "12",
      name: "Payment Pending",
      color: "#B0C4DE",
    },
    {
      id: 9,
      blockStyle: "style4",
      icon: "flaticon-heart",
      timer: "18",
      name: "Settled Cases",
      color: "#7FFFD4",
    },
    {
      id: 10,
      blockStyle: "",
      icon: "flaticon-home",
      timer: "37",
      name: "Withdrawn / Rejected",
      color: "#FFFACD",
    },
    {
      id: 11,
      blockStyle: "style2",
      icon: "flaticon-view",
      timer: "24",
      name: "More Info Required",
      color: "#FFEFD5",
    },
    {
      id: 12,
      blockStyle: "style2",
      icon: "flaticon-chat",
      timer: "12",
      name: "My Claims",
      color: "#E6E6FA",
    },
  ];


module.exports = {headCells,ClaimsHeadingCardsContent}