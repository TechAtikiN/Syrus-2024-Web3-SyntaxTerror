import MeetingCard from "@/components/card/MeetingCard";

import React from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";

export function MeetingsPage() {
    const address = useAddress();
    const [meetings, setMeetings] = React.useState([]);
    React.useEffect(() => {
        axios.get(`http://localhost:3000/api/meetings/${address}`).then((res) => {
            setMeetings(res.data);
        });
    }, []);


  return (
    <div className="page-container gap-10">
      <div className="flex items-center- justify-between">
        <h3 className="text-2xl font-semibold uppercase">Scheduled Meetings</h3>
        {/* <Link
          href="/court/meetings/create"
          className="bg-primary rounded-lg p-2 text-background text-sm"
        >
          Schedule Hearing
        </Link> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings?.map((meeting: any) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}

export default MeetingsPage;

// export const getServerSideProps = (async (conext: any) => {
//   const address = useAddress();

//   const res = await axios.get(`http://localhost:3000/api/meetings/${address}`);
//   const meetings = await res.data;
//   console.log(meetings);
//   return { props: { meetings } };
// }) satisfies GetServerSideProps<{ meetings: Meeting[] }>;
