import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StatusLog = ({
  leadId,
  finalDisable,
  status,
  statusOptions,
  subStatus,
  claim,
  documents,
}) => {
  const [stat, setStat] = useState(0);
  const [subStage, setSubStage] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(1);

  let data = [
    {
      serial_num: "1",
      doc_name: "Driving licence",
    },
    {
      serial_num: "2",
      doc_name: "Certificate of registration",
    },
    {
      serial_num: "3",
      doc_name: "Repair Estimate",
    },
    {
      serial_num: "4",
      doc_name: "Claim form",
    },
    {
      serial_num: "5",
      doc_name: "Insurance policy",
    },
    {
      serial_num: "6",
      doc_name: "Damage vehicle photographs/video",
    },
    {
      serial_num: "7",
      doc_name: "Aadhar card",
    },
    {
      serial_num: "8",
      doc_name: "Pan card",
    },
    {
      serial_num: "9",
      doc_name: " Cancel cheque",
    },
    {
      serial_num: "10",
      doc_name: " Satisfaction voucher",
    },
    {
      serial_num: "11",
      doc_name: "Discharge voucher",
    },
    {
      serial_num: "12",
      doc_name: "Dismantle photographs",
    },
    {
      serial_num: "13",
      doc_name: "Reinspection photographs",
    },
    {
      serial_num: "14",
      doc_name: "Repair Invoice",
    },
    {
      serial_num: "15",
      doc_name: "Payment/cash receipt",
    },
    {
      serial_num: "16",
      doc_name: "Images",
    },
    {
      serial_num: "17",
      doc_name: "Videos",
    },
  ];

  useEffect(() => {
    let stat2 = {};
    if (status.length <= 0) {
    } else {
      status?.map((stat, index) => {
        if (String(stat.LeadId) === String(leadId)) {
          stat2 = stat;
        }
      });
    }

    setCurrentStatus(stat2?.Status);
  }, [status.length]);

  console.log("data", documents);

  const getValueFromDocName = (docName) => {
    let value = 0;
    data.map((temp, index) => {
      if (String(temp.doc_name) === String(docName)) {
        value = temp.serial_num;
      }
    });

    return value;
  };

  const getUpperBound = () => {
    return 5;
  };

  //function to update the status on documents validation
  const checkIsValidated = () => {
    if (
      String(stat) === "10" ||
      String(stat) === "11" ||
      String(stat) === "1"
    ) {
      return true;
    }
    let arr = new Array(data.length + 1).fill(0);
    documents?.map((doc, index) => {
      const value = getValueFromDocName(doc.docName);
      arr[value] = value;
    });

    const upperValue = getUpperBound();
    arr[0] = 1;

    let canUpdateStatus = true;
    arr.map((value, index) => {
      if (index === 2 && Number(value) === 0) {
        canUpdateStatus = false;
      }
    });

    return canUpdateStatus;
  };

  function csvToArray(id) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const csvString = userInfo[0]?.CalimStatus;
    const rows = csvString.split("\n");

    const result = [];

    rows.forEach((row) => {
      const columns = row.split(",");
      result.push(columns);
    });

    let inside = -1;
    result.map((value, index) => {
      if (String(value) === String(id)) {
        inside = index;
      }
    });

    return id === 10 ? inside : 1;
  }

  const onSubmitHandler = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const isValid = csvToArray(stat);

    const canUpdate = checkIsValidated();

    if ((!canUpdate && stat > 1) || !isValid) {
      toast.error("Cannot update Status as documents are not filled !");
    } else {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const payload = {
        LeadId: Number(leadId),
        Status: stat,
        subStage: subStage ? Number(subStage) : Number(3),
        token: Number(userInfo[0].Token),
        Username : userInfo[0]?.Username
      };

      toast.loading("updating the status!!", {
        // position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-loading-message",
      });
      axios
        .put("/api/updateStatus", payload, {
          headers: {
            Authorization: `Bearer ${userInfo[0].Token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.dismiss();
          // toast.success("Successfully added");
          toast.success("Successfully updated !", {
            // position: toast.POSITION.BOTTOM_LEFT,
            className: "toast-loading-message",
          });
          window.location.reload();
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("Got error while updating status!");
        });
    }
  };

  const getShowOption = (stat) => {
    if (currentStatus === 10 || currentStatus === 11 || stat.id === 10 || stat.id === 11 ) {
      return true;
    }
    else if (currentStatus === 1 && (stat.id === 1 || stat.id === currentStatus || stat.id === 7)){
      return true;
    }
    else if(currentStatus === 7 && (stat.id === 1 || stat.id === currentStatus || stat.id === currentStatus +1)){
      return true;
    }
     else if (
      currentStatus >7 &&
      (stat.id === currentStatus -1 || stat.id === currentStatus || stat.id === currentStatus +1)
    ) {
      return true;
    }
  };
  return (
    <>
      <div className="col-lg-12">
        <div className="row my_profile_setting_input form-group">
          <div className="col-lg-12 mb-2 mt-2">
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              value={stat ? stat : currentStatus}
              onChange={(e) => setStat(e.target.value)}
            >
              {statusOptions.map((stat, index) => {
                return getShowOption(stat) ? (
                  <option key={index} data-tokens="Status1" value={stat.id}>
                    {stat.value}
                  </option>
                ) : null;
              })}
            </select>
          </div>

          <div className="col-lg-12 text-center mt-2">
            <div className="my_profile_setting_input">
              <button
                className="btn btn-color w-100"
                disabled={finalDisable}
                onClick={onSubmitHandler}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default StatusLog;
