import MeetingCard from "@/components/card/MeetingCard";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import axios from "axios";

export function MeetingsPage({ meetings }: { meetings: Meeting[] }) {
  return (
    <div className="page-container gap-10">
      <div className="flex items-center- justify-between">
        <h3 className="text-2xl font-semibold uppercase">Meetings</h3>
        <Link
          href="/court/meetings/create"
          className="bg-primary rounded-lg p-2 text-background text-sm"
        >
          Schedule Hearing
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting: any) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}

export default MeetingsPage;

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await axios.get("http://localhost:3000/api/meetings");
  const meetings = await res.data;
  console.log(meetings);
  return { props: { meetings } };
}) satisfies GetServerSideProps<{ meetings: Meeting[] }>;
