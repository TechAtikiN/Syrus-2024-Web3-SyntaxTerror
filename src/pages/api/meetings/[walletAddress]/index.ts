import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

interface IParams {
  walletAddress?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { walletAddress } = params;
  const meetings = await prisma.meeting.findMany({
    where: {
      walletAddress,
    },
    include: {
      participants: true,
    },
  });
  return NextResponse.json(meetings);
}

