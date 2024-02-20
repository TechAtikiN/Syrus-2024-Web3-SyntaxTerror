import React from "react";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "../ui/avatar";

interface MeetingCardProps {
  meeting: Meeting;
}

const MeetingCard = ({ meeting }: MeetingCardProps) => {
  return (
    <div className="flex flex-col gap-2 border-t-4 border-primary rounded-lg p-4 shadow-md  dark:border-t-4 dark:border ">
      <h3 className="text-lg font-semibold mt-3">{meeting.title}</h3>
      <p className="text-sm">{meeting.description}</p>
      <p className="text-sm">
        <span className="bg-yellow-100 text-yellow-800  text-xs border-yellow-500 px-2 py-1 rounded-3xl border">
          {meeting.status}
        </span>
      </p>
      <p className="text-sm">Date : {format(meeting.createdAt, "PPP")}</p>

      <div className="flex flex-col justify-between gap-2 ">
        <h3 className="text-base font-semibold mt-3">Participants</h3>
        <div className="flex items-center -space-x-3">
          {meeting.participants.map((participant) => (
            <Avatar key={participant.id}>
              <AvatarImage
                src="https://cdn-icons-png.freepik.com/256/3237/3237472.png"
                className="shadow-lg"
              />
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
