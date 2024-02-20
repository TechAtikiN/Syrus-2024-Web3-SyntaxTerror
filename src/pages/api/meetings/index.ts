import prisma from "@/lib/prismadb";
import { Participant } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    console.log("request.body", request.body);
    try {
      const { title, description, walletAddress, date, participantIds,  status } =
        request.body;

      const newMeeting = await prisma.meeting.create({
        // @ts-ignore
        data: {
          title,
          description,
          walletAddress,
          date,
          status,
          // @ts-ignore
          participants: { // Use 'participants' instead of 'participantIds'
            connect: participantIds.map((id: string) => ({ id })),
          },
        },
      });
      response.status(200).json(newMeeting);
    } catch (error) {
      console.error("Error creating meeting:", error);
      response.status(500).json({ error: "Failed to create meeting" });
    }
  } else if (request.method === "GET") {
    try {
      const meetings = await prisma.meeting.findMany({
        include: {
          participants: true,
        },
      });
      response.status(200).json(meetings);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      response.status(500).json({ error: "Failed to fetch meetings" });
    }
  } else {
    response.setHeader("Allow", ["GET", "POST"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
