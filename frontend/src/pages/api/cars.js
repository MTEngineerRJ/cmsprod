// Import PrismaClient from @prisma/client
import { PrismaClient } from "@prisma/client";

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { maker } = req.query; // Extract the maker query parameter

    if (!maker) {
      return res
        .status(400)
        .json({ error: "Maker query parameter is required" });
    }

    try {
      // Fetch car models based on the selected maker
      const cars = await prisma.cars.findMany({
        where: {
          carbrands: {
            car_maker: maker, // Filter cars by the car brand name
          },
        },
        select: {
          car_id: true,
          car_model: true, // Only return the car model
        },
      });

      if (cars.length === 0) {
        return res
          .status(404)
          .json({ error: "No cars found for the selected maker" });
      }

      // Return the list of car models

      res.status(200).json(cars);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch car models" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
