import Image from "next/image";
import { useEffect, useState } from "react";

import ModalVideo from "react-modal-video";
import Exemple from "./Exemple";
import axios from "axios";

const PropertyVideo = ({ vehicleType,leadId }) => {
  const [isOpen, setOpen] = useState(false);
  const [partsData, setPartsData] = useState([]);
  const [partsState, setPartState] = useState([]);
  const [specificVehicleParts, setspecificVehicleParts] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    const leadId = url.split("&leadId=")[1];
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .get("/api/getAllVehicleParts", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
        },
        params: {
          vehicleType: vehicleType,
        },
      })
      .then((res) => {
        const tempData = res?.data?.data;
        let updatedData = [];
        tempData.map((part, index) => {
          let newRow = {
            id: index + 1,
            part: part?.PartName,
            state: "",
            isActive : true ,
            partId : Number(part?.PartID)
          };
          updatedData.push(newRow);
        });
        setPartsData(updatedData);
      })
      .catch((err) => {});

    axios
      .get("/api/getAllVehiclePartsState", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
        },
      })
      .then((res) => {
        const tempState = res.data.data;
        setPartState(tempState);
      })
      .catch((err) => {});
      axios
      .get("/api/getAllSpecificVehicleParts", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
        },
        params: {
          leadId: leadId,
        },
      })
      .then((res) => {
        const tempData = res?.data?.data;
        let updatedData = [];
        tempData.map((part, index) => {
          let newRow = {
            id: index + 1,
            part: part?.PartName,
            state: part?.PartState,
            isActive : true ,
            partId : Number(part?.PartID)
          };
          updatedData.push(newRow);
        });
        setspecificVehicleParts(updatedData);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="oqNZOOWF8qM"
        onClose={() => setOpen(false)}
        allow="picture-in-picture"
      />
      <ul className="nav nav-tabs bgc-f6" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#newparts"
            role="tab"
            style={{ padding: "10px" }}
          >
            {vehicleType === "2W"
              ? "Two Wheeler Inspection Report"
              : "Four Wheeler Inspection Report"}
          </a>
        </li>
      </ul>

      <div className="tab-content bgc-f6" id="myTabContent2">
        <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199 active show"
          id="newparts"
          role="tabpanel"
        >
          <div className="property_video">
            <div className="thumb">
              <div className="row">
                <Exemple
                  partsState={partsState}
                  specificVehicleParts={specificVehicleParts}
                  partsData={partsData}
                  vehicleType={vehicleType}
                  leadId={leadId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .tab-conten */}
    </>
  );
};

export default PropertyVideo;
