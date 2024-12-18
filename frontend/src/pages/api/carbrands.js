// Import PrismaClient from @prisma/client
import { PrismaClient } from "@prisma/client";

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Use prisma client to fetch car brands
      const carBrands = await prisma.carbrands.findMany(); // Query your database
      console.log("carBrands: ", carBrands);
      res.status(200).json(carBrands);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch car brands" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
