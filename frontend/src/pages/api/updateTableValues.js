// Import PrismaClient from @prisma/client
import { PrismaClient } from "@prisma/client";

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

// A utility function to handle BigInt conversion to string
function handleBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}
function convertToSnakeCase(data) {
  const convertedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key.replace(/([A-Z])/g, "_$1").toLowerCase(),
      value,
    ])
  );
  return convertedData;
}
function transformData(input) {
  const output = {};

  Object.entries(input).forEach(([key, value]) => {
    // Extract the tier and type (e.g., "rr", "dent") from the key
    const match = key.match(/^(rr|dent)([A-Za-z]+)/);
    if (match) {
      const type = match[1]; // "rr" or "dent"
      const tier = match[2]
        .toLowerCase() // Convert to lowercase for consistency
        .replace("aplusplus", "a_plus_plus") // Handle specific tier replacements
        .replace("aplus", "a_plus"); // Handle "a_plus"

      const newKey = `tier_${tier}_${type}`; // Create the new key format
      output[newKey] = value; // Assign the value to the new key
    }
  });

  return output;
}
function transformPaintData(input) {
  const output = {};

  Object.entries(input).forEach(([key, value]) => {
    // Extract the type (e.g., "metallic", "pearl") and tier (e.g., "APlusPlus", "B") from the key
    const match = key.match(/^(metallic|pearl)([A-Za-z]+)/);
    if (match) {
      const type = match[1]; // "metallic" or "pearl"
      const tier = match[2]
        .toLowerCase() // Convert to lowercase for consistency
        .replace("aplusplus", "a_plus_plus") // Handle specific tier replacements
        .replace("aplus", "a_plus"); // Handle "a_plus"

      const newKey = `tier_${tier}_${type}`; // Create the new key format
      output[newKey] = value; // Assign the value to the new key
    }
  });

  return output;
}

export default async function handler(req, res) {
  if (req.method === "PUT") {
    console.log("req.body: ", req.body);
    const { frontend, partName, partType, model, ...rest } = req.body;

    if (!frontend || !partName || !partType || !model) {
      return res.status(400).json({
        error: "frontend, partName, partType, and carName are required",
      });
    }

    try {
      // Fetch the car ID based on the car name
      const car = await prisma.cars.findFirst({
        where: { car_model: model },
      });

      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      const part = await prisma.parts.findFirst({
        where: { part_name: partName },
      });
      const partId = part.part_id;
      console.log("partId: ", partId);
      const carId = car.car_id;
      console.log("carId: ", carId);

      // Define the target table and data mapping dynamically
      let table, data, updatedRecord;
      if (frontend === "part") {
        console.log("in parts");
        console.log("partName: ", partName);
        console.log("partType: ", partType);
        table = "partvalues";
        data = Object.fromEntries(
          Object.entries(rest)
            .filter(([key]) => key.startsWith("tier")) // Only process `tier` keys
            .map(([key, value]) => [key, parseFloat(value)]) // Convert values to float
        );
        console.log("dat1: ", data);
        const dataToSend = convertToSnakeCase(data);
        console.log("dataToSend: ", dataToSend);
        updatedRecord = await prisma.partvalues.updateMany({
          where: { car_id: carId, part_id: partId },
          data: dataToSend,
        });
      } else if (frontend === "labour") {
        table = "labourvalues";
        data = Object.fromEntries(
          Object.entries(rest)
            .filter(
              ([key]) =>
                !["frontend", "partName", "partType", "model"].includes(key)
            ) // Exclude specified keys
            .map(([key, value]) => [key, parseFloat(value)]) // Convert values to float
        );

        const dataToSend = transformData(data);
        console.log("data: ", data);
        console.log("dataToSend: ", dataToSend);
        updatedRecord = await prisma.labourvalues.updateMany({
          where: { car_id: carId, part_id: partId },
          data: dataToSend,
        });
      } else if (frontend === "paint") {
        table = "paintvalues";
        data = Object.fromEntries(
          Object.entries(rest)
            .filter(
              ([key]) =>
                !["frontend", "partName", "partType", "model"].includes(key)
            ) // Exclude specified keys
            .map(([key, value]) => [key, parseFloat(value)]) // Convert values to float
        );
        console.log("data: ", data);
        const dataToSend = transformPaintData(data);
        updatedRecord = await prisma.paintvalues.updateMany({
          where: { car_id: carId, part_id: partId },
          data: dataToSend,
        });
      } else {
        return res.status(400).json({
          error:
            "Invalid frontend value. Must be 'part', 'labour', or 'paint'.",
        });
      }

      // Update the corresponding table
      console.log("table: ", table);

      // Check if any record was updated
      if (updatedRecord.count === 0) {
        return res
          .status(404)
          .json({ error: "No matching record found to update" });
      }

      res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Failed to update record" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
