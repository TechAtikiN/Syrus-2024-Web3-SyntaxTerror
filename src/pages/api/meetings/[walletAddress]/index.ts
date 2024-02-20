import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

interface IParams {
  walletAddress?: string;
}

export default async function handler(  request: NextApiRequest,
  response: NextApiResponse) {
  if (request.method === "GET") {
    const { walletAddress } = request.query as IParams;

    try {
      const meetings = await prisma.meeting.findMany({
        where: {
          walletAddress,
        },
        include: {
          participants: true,
        },
      });

      response.status(200).json(meetings);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      return NextResponse.error();
    }
  } else {
    response.status(200).json({ message: 'Success' });

  }
  
}



