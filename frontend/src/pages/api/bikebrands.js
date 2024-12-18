// Import PrismaClient from @prisma/client
import { PrismaClient } from "@prisma/client";

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Use prisma client to fetch car brands
      const bikeBrands = await prisma.bikebrands.findMany(); // Query your database

      res.status(200).json(bikeBrands);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch bike brands" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
