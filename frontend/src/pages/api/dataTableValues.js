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

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { model } = req.query;
    console.log("model: ", model?.trim());

    if (!model) {
      return res
        .status(400)
        .json({ error: "Model query parameter is required" });
    }

    try {
      const { car_id } = model; // Assuming model contains car_id, else you can modify based on your data structure

      // Fetch data from partvalues, labourvalues, and paintvalues tables using car_id
      const partValues = await prisma.partvalues.findMany({
        where: { car_id },
        include: {
          parts: {
            // Include part details from the parts table
            select: {
              part_name: true,
              part_type: true,
            },
          },
        },
      });
      console.log("partValues: ", partValues);

      const labourValues = await prisma.labourvalues.findMany({
        where: { car_id },
        include: {
          parts: {
            // Include part details from the parts table
            select: {
              part_name: true,
              part_type: true,
            },
          },
        },
      });
      console.log("labourValues: ", labourValues);

      const paintValues = await prisma.paintvalues.findMany({
        where: { car_id },
        include: {
          parts: {
            // Include part details from the parts table
            select: {
              part_name: true,
              part_type: true,
            },
          },
        },
      });
      console.log("paintValues: ", paintValues);

      // Convert BigInt values to strings
      const dataToReturn = {
        partValues: handleBigInt(partValues),
        labourValues: handleBigInt(labourValues),
        paintValues: handleBigInt(paintValues),
      };

      // Return the data from all three tables
      res.status(200).json(dataToReturn);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
