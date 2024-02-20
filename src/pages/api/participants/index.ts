import prisma from "@/lib/prismadb";
import { Participant } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const participantsData = request.body.participants; // Access participants array from the request body
      console.log("participantsData", participantsData);

      // Iterate over the array of participants and create each one
      const createdParticipants = await prisma.participant.createMany({
        data: participantsData,
      });

     

      response.status(200).json(createdParticipants);
    } catch (error) {
      console.error("Error creating participants:", error);
      response.status(500).json({ error: "Failed to create participants" });
    }
  } else if (request.method === "GET") {
    try {
      const participants = await prisma.participant.findMany({
        include: {
          Meeting: true,
        },
      });

      response.status(200).json(participants);
    } catch (error) {
      console.error("Error fetching participants:", error);
      response.status(500).json({ error: "Failed to fetch participants" });
    }
  } else {
    response.setHeader("Allow", ["GET", "POST"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
