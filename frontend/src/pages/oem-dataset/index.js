"use client";
import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { TabView, TabPanel } from "primereact/tabview";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

export default function OemDatasetUI() {
  const [maker, setMaker] = useState("");
  const [carBrands, setCarBrands] = useState([]); // Initialize as an empty array
  console.log("carBrands: ", carBrands);
  const [modelsList, setModelsList] = useState([]); // To store car models
  const [model, setModel] = useState("");
  console.log("model: ", model);
  const [selectedModel, setSelectedModel] = useState("");
  const [partData, setPartData] = useState([]);
  console.log("partData: ", partData);
  const [labourData, setLabourData] = useState([]);
  console.log("labourData: ", labourData);
  const [paintData, setPaintData] = useState([]);
  console.log("paintData: ", paintData);
  const [defaultData, setDefaultData] = useState([]);
  console.log("defaultData: ", defaultData);

  const [selectedVehicleType, setSelectedVehicleType] = useState([]);

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

  const toast = useRef(null);

  const numberEditor = (options) => (
    <InputNumber
      value={options.value}
      onValueChange={(e) => options.editorCallback(e.value)}
      min={0}
    />
  );
  async function updateRecordFromInput(inputData) {
    const apiUrl = "/api/updateTableValues"; // Replace with your API endpoint URL

    // Destructure partName and partType from the input
    const { partName, partType, ...rest } = inputData;

    if (!partName || !partType) {
      alert("partName and partType are required!");
      return;
    }

    // Determine the `frontend` value based on the keys in the input data
    let frontend;
    const keys = Object.keys(rest);

    if (keys.some((key) => key.startsWith("tier"))) {
      frontend = "part";
    } else if (
      keys.some((key) => key.startsWith("rr") || key.startsWith("dent"))
    ) {
      frontend = "labour";
    } else if (
      keys.some((key) => key.startsWith("metallic") || key.startsWith("pearl"))
    ) {
      frontend = "paint";
    } else {
      alert("Invalid input structure. Could not determine the frontend value.");
      return;
    }

    // Construct the payload
    const payload = {
      frontend,
      partName,
      partType,
      ...rest,
    };

    try {
      // Make the PUT request to the API
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating record:", errorData.error);
        alert(`Error: ${errorData.error}`);
        return;
      }

      // Parse the success response
      const data = await response.json();
      console.log("Record updated successfully:", data.message);
      //   alert("Record updated successfully!");
    } catch (error) {
      console.error("Failed to update record:", error);
      alert("Failed to update record. Please try again.");
    }
  }

  const renderDataTable = (
    data,
    columns,
    setData,
    headerGroup,
    footerGroup
  ) => {
    const onCellEditComplete = (e) => {
      console.log("e: ", e);
      const { rowData, newValue, field } = e;

      if (field === "partName" || field === "partType") {
        const updatedData = data.map((item) => {
          if (item.sNo === rowData.sNo) {
            return { ...item, [field]: newValue };
          }
          return item;
        });
        console.log("updatedData: ", updatedData);

        // Update partData, labourData, and paintData consistently
        if (field === "partName" || field === "partType") {
          setPartData(updatedData);
          setLabourData(updatedData);
          setPaintData(updatedData);
        }
      } else {
        console.log("yo");
        rowData[field] = String(newValue);
        console.log("rowData[field]: ", rowData[field]);

        console.log("model: ", model);

        updateRecordFromInput({ ...e.rowData, model });
      }

      // Display success message in toast
      toast.current.show({
        severity: "success",
        summary: "Value Updated",
        detail: `The value for ${field} has been updated to ${newValue}`,
        life: 3000,
      });
    };

    return (
      <DataTable
        value={data}
        editMode="cell"
        responsiveLayout="scroll"
        headerColumnGroup={headerGroup}
        footerColumnGroup={footerGroup}
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            editor={col.editor}
            onCellEditComplete={onCellEditComplete}
          />
        ))}
      </DataTable>
    );
  };

  const partColumns = [
    { field: "partName", header: "Part Name" },
    { field: "partType", header: "Part Type" },
    { field: "tierAPlusPlus", header: "Tier A++", editor: numberEditor },
    { field: "tierAPlus", header: "Tier A+", editor: numberEditor },
    { field: "tierB", header: "Tier B", editor: numberEditor },
    { field: "tierC", header: "Tier C", editor: numberEditor },
  ];

  const labourColumns = [
    { field: "partName", header: "Part Name" },
    { field: "partType", header: "Part Type" },
    { field: "rrAPlusPlus", header: "R&R A++", editor: numberEditor },
    { field: "dentAPlusPlus", header: "Dent A++", editor: numberEditor },
    { field: "rrAPlus", header: "R&R A+", editor: numberEditor },
    { field: "dentAPlus", header: "Dent A+", editor: numberEditor },
    { field: "rrB", header: "R&R B", editor: numberEditor },
    { field: "dentB", header: "Dent B", editor: numberEditor },
    { field: "rrC", header: "R&R C", editor: numberEditor },
    { field: "dentC", header: "Dent C", editor: numberEditor },
  ];

  const paintColumns = [
    { field: "partName", header: "Part Name" },
    { field: "partType", header: "Part Type" },
    {
      field: "metallicAPlusPlus",
      header: "Metallic A++",
      editor: numberEditor,
    },
    { field: "pearlAPlusPlus", header: "Pearl A++", editor: numberEditor },
    { field: "metallicAPlus", header: "Metallic A+", editor: numberEditor },
    { field: "pearlAPlus", header: "Pearl A+", editor: numberEditor },
    { field: "metallicB", header: "Metallic B", editor: numberEditor },
    { field: "pearlB", header: "Pearl B", editor: numberEditor },
    { field: "metallicC", header: "Metallic C", editor: numberEditor },
    { field: "pearlC", header: "Pearl C", editor: numberEditor },
  ];
  const convertPartData = (data) => {
    if (!data || !Array.isArray(data)) return []; // Return empty array if data is invalid
    return data.map((item) => ({
      partName: item.parts?.part_name,
      partType: item.parts?.part_type,
      tierAPlusPlus: item?.tier_a_plus_plus,
      tierAPlus: item?.tier_a_plus,
      tierB: item?.tier_b,
      tierC: item?.tier_c,
    }));
  };

  const convertLabourData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((item) => ({
      partName: item.parts?.part_name,
      partType: item.parts?.part_type,
      rrAPlusPlus: item?.tier_a_plus_plus_rr,
      dentAPlusPlus: item?.tier_a_plus_plus_dent,
      rrAPlus: item?.tier_a_plus_rr,
      dentAPlus: item?.tier_a_plus_dent,
      rrB: item?.tier_b_rr,
      dentB: item?.tier_b_dent,
      rrC: item?.tier_c_rr,
      dentC: item?.tier_c_dent,
    }));
  };

  const convertPaintData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((item) => ({
      partName: item?.parts.part_name,
      partType: item?.parts.part_type,
      metallicAPlusPlus: item?.tier_a_plus_plus_metallic,
      pearlAPlusPlus: item?.tier_a_plus_plus_pearl,
      metallicAPlus: item?.tier_a_plus_metallic,
      pearlAPlus: item?.tier_a_plus_pearl,
      metallicB: item?.tier_b_metallic,
      pearlB: item?.tier_b_pearl,
      metallicC: item?.tier_c_metallic,
      pearlC: item?.tier_c_pearl,
    }));
  };

  const partColumnsData = convertPartData(partData);

  const labourColumnsData = convertLabourData(labourData);

  const paintColumnsData = convertPaintData(paintData);

  const labourHeaderGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Part Name" rowSpan={3} />
        <Column header="Part Type" rowSpan={3} />
        <Column header="Tier A++" colSpan={2} />
        <Column header="Tier A+" colSpan={2} />
        <Column header="Tier B" colSpan={2} />
        <Column header="Tier C" colSpan={2} />
      </Row>
      <Row>
        <Column header="R&R" />
        <Column header="Dent" />
        <Column header="R&R" />
        <Column header="Dent" />
        <Column header="R&R" />
        <Column header="Dent" />
        <Column header="R&R" />
        <Column header="Dent" />
      </Row>
    </ColumnGroup>
  );

  // Paint Data Header Group
  const paintHeaderGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Part Name" rowSpan={3} />
        <Column header="Part Type" rowSpan={3} />
        <Column header="Tier A++" colSpan={2} />
        <Column header="Tier A+" colSpan={2} />
        <Column header="Tier B" colSpan={2} />
        <Column header="Tier C" colSpan={2} />
      </Row>
      <Row>
        <Column header="Metallic" />
        <Column header="Pearl" />
        <Column header="Metallic" />
        <Column header="Pearl" />
        <Column header="Metallic" />
        <Column header="Pearl" />
        <Column header="Metallic" />
        <Column header="Pearl" />
      </Row>
    </ColumnGroup>
  );

  return (
    <div
      style={{
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        // backgroundColor: "#f9f9f9",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.8rem",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          OEM Dataset
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
            Vehicle Type
          </span>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              icon="pi pi-car"
              className="p-button-rounded"
              style={{
                color: "#fff",
                border: "none",
                boxShadow: "none",
              }}
            />
            <Button
              icon="pi pi-motorcycle"
              className="p-button-rounded"
              style={{
                color: "#fff",
                border: "none",
                boxShadow: "none",
              }}
            />
            <Button
              icon="pi pi-motorcycle"
              className="p-button-rounded"
              style={{
                color: "#fff",
                border: "none",
                boxShadow: "none",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row", // Align dropdowns horizontally
            gap: "20px", // Space between dropdowns
            alignItems: "center", // Vertically align the dropdowns
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "1rem", fontWeight: "bold" }}>
              Maker Name
            </label>
            <Dropdown
              value={maker}
              options={carBrands.map((brand) => brand.car_maker)}
              onChange={(e) => setMaker(e.value)}
              placeholder="Select Maker"
              style={{
                minWidth: "180px",
                borderRadius: "8px",
                padding: "5px",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "1rem", fontWeight: "bold" }}>
              Model Name
            </label>
            <Dropdown
              value={model}
              options={modelsList.map((item) => item.car_model)}
              onChange={(e) => {
                console.log("e: ", e);
                setModel(e.value);
              }}
              placeholder="Select Model"
              style={{
                minWidth: "180px",
                borderRadius: "8px",
                padding: "5px",
              }}
            />
          </div>
          <div style={{ marginTop: "28px" }}>
            <Button label="Add Model" />
          </div>
          <div style={{ marginTop: "28px" }}>
            <Button label="Edit Name" />
          </div>
        </div>
      </div>

      {/* Tab View for part, labour, and paint */}
      <TabView>
        <TabPanel header="Part Data">
          {renderDataTable(partColumnsData, partColumns, setPartData)}
        </TabPanel>
        <TabPanel header="Labour Data">
          {renderDataTable(
            labourColumnsData,
            labourColumns,
            setLabourData,
            labourHeaderGroup
          )}
        </TabPanel>
        <TabPanel header="Paint Data">
          {renderDataTable(
            paintColumnsData,
            paintColumns,
            setPaintData,
            paintHeaderGroup
          )}
        </TabPanel>
      </TabView>

      {/* Toast for success messages */}
      <Toast ref={toast} />
    </div>
  );
}
