"use client";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { InputSwitch } from "primereact/inputswitch";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";

const VehicleDamageAssessment = () => {
  const [showDamage, setShowDamage] = useState(true);
  const [maker, setMaker] = useState(null);
  console.log("maker: ", maker);
  const [model, setModel] = useState(null);
  console.log("model: ", model);
  const [carBrands, setCarBrands] = useState([]); // Initialize as an empty array
  const [modelsList, setModelsList] = useState([]);

  const damageData = {
    photos: [
      {
        src: "https://thumbs.dreamstime.com/b/car-bumper-damage-rear-37793860.jpg",
        latitude: "28.22222222222222",
        longitude: "28.22222222222222",
        timestamp: "19-10-2024 4:48 PM IST",
      },
      {
        src: "https://thumbs.dreamstime.com/b/car-bumper-damage-rear-37793860.jpg",
        latitude: "28.23456789",
        longitude: "28.23456789",
        timestamp: "20-10-2024 3:30 PM IST",
      },
    ],
    parts: [
      {
        partName: "Front Bumper",
        damageType: "Scratch",
        percentageDamage: "5.48%",
      },
    ],
    metadata: {
      latitude: "28.22222222222222",
      longitude: "28.22222222222222",
      timestamp: "19-10-2024 4:48 PM IST",
    },
    costEstimation: [
      {
        id: 1,
        partName: "Rear Bumper",
        damageType: "Minor Dent",
        paintCost: 5440,
        partCost: 0,
        labourCost: 200,
        partType: "Plastic",
        depreciation: 50,
        depreciationCost: 0,
        totalCost: 5640,
      },
      {
        id: 2,
        partName: "Diggi Back Door",
        damageType: "Minor Dent",
        paintCost: 4705,
        partCost: 0,
        labourCost: 450,
        partType: "Metal",
        depreciation: 50,
        depreciationCost: 0,
        totalCost: 5155,
      },
    ],
  };

  const vehicleTypes = [
    { label: "Car", icon: "pi pi-car" },
    { label: "Truck", icon: "pi pi-truck" },
    { label: "Motorcycle", icon: "pi pi-motorcycle" },
  ];

  const makers = [
    { label: "MARUTI SUZUKI INDIA" },
    { label: "TOYOTA" },
    { label: "HONDA" },
    { label: "HYUNDAI" },
  ];

  const models = [
    { label: "SWIFT" },
    { label: "BALENO" },
    { label: "CRETA" },
    { label: "CITY" },
  ];
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/carbrands");
      const data = await response.json();
      if (response.ok) {
        setCarBrands(data); // Update state with the fetched data
      } else {
        console.error(data.error); // Log any error from the server
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (maker) {
      async function fetchCarModels() {
        const response = await fetch(`/api/cars?maker=${maker}`);
        const data = await response.json();
        console.log("data: ", data);
        if (response.ok) {
          // Update modelsList with filtered models based on selected maker

          setModelsList(data);
        } else {
          console.error(data.error);
        }
      }
      fetchCarModels();
    }
  }, [maker]);

  useEffect(() => {
    if (model) {
      // Fetch data when a model is selected
      async function fetchData() {
        try {
          console.log("modelinsidequery: ", model);
          const modelToSend = modelsList.find(
            (item) => item.car_model === model
          )?.car_id;
          const response = await axios.get(
            `/api/dataTableValues?model=${modelToSend}`
          );
          if (response.status === 200) {
            console.log("response.data: ", response.data);
            const { partValues, labourValues, paintValues } = response.data;
            setPartData(partValues);
            setLabourData(labourValues);
            setPaintData(paintValues);
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }

      fetchData();
    }
  }, [model]);

  useEffect(() => {
    // Fetch data when a model is selected
    async function fetchData() {
      try {
        console.log("modelinsidequery: ", model);
        const modelToSend = modelsList.find(
          (item) => item.car_model === model
        )?.car_id;
        const response = await axios.get(`/api/dataTableValues?model=Creta`);
        if (response.status === 200) {
          console.log("response.data: ", response.data);
          const { partValues, labourValues, paintValues } = response.data;
          setPartData(partValues);
          setLabourData(labourValues);
          setPaintData(paintValues);
          setMaker("HYUNDAI");
          setModel("Creta");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []);

  const totalCost = damageData.costEstimation.reduce(
    (sum, item) => sum + item.totalCost,
    0
  );

  const renderVehicleButtons = () => {
    return (
      <div className="flex gap-2">
        {vehicleTypes.map((type, index) => (
          <Button
            key={index}
            icon={type.icon}
            className={`p-button-rounded  ${
              index === 0 ? "p-button-primary" : "p-button"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto", padding: "20px" }}>
      {/* Damage Photos Section */}

      {/* AI Cost Estimation Section */}
      <Card title="AI Cost Estimation">
        <div className="flex justify-between items-center mb-4">
          <div
            className="flex items-center gap-4 mb-8"
            style={{ display: "flex", justifyContent: "end", gap: "30px" }}
          >
            {/* Vehicle Type */}
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                Vehicle Type
              </span>
              {renderVehicleButtons()}
            </div>

            {/* Maker's Name */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={{ fontSize: "1rem", fontWeight: "bold" }}>
                Maker Name
              </label>
              <Dropdown
                value={maker}
                options={maker}
                onChange={(e) => setMaker(e.value)}
                placeholder="Select Maker"
                style={{
                  minWidth: "180px",
                  borderRadius: "8px",
                  padding: "5px",
                  marginBottom: "10px",
                }}
              />
            </div>

            {/* Model Name */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={{ fontSize: "1rem", fontWeight: "bold" }}>
                Model Name
              </label>
              <Dropdown
                value={model}
                options={model}
                onChange={(e) => setModel(e.value)}
                placeholder="Select Model"
                style={{
                  minWidth: "180px",
                  borderRadius: "8px",
                  padding: "5px",
                }}
              />
            </div>
          </div>
        </div>

        <DataTable value={damageData.costEstimation} responsiveLayout="scroll">
          <Column field="id" header="S. No" />
          <Column field="partName" header="Part Name" />
          <Column field="damageType" header="Damage Type" />
          <Column field="paintCost" header="Paint Cost" />
          <Column field="partCost" header="Part Cost" />
          <Column field="labourCost" header="Labour Cost" />
          <Column field="partType" header="Part Type" />
          <Column field="depreciation" header="Depreciation (%)" />
          <Column field="depreciationCost" header="Depreciation Cost" />
          <Column field="totalCost" header="Total Cost" />
        </DataTable>
        <h3 style={{ textAlign: "right", marginTop: "20px" }}>
          Total Cost: ₹{totalCost}
        </h3>
      </Card>
    </div>
  );
};

export default VehicleDamageAssessment;
