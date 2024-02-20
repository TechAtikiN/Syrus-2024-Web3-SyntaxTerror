import React, { useState } from "react";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddress } from "@thirdweb-dev/react";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

const ScheduleMeetingForm = ({
  participants,
}: {
  participants: Participant[];
}) => {
  const address = useAddress();
  const [date, setDate] = React.useState<Date | undefined>(new Date());


  type FormData = {
    title: string;
    description: string;
    date: Date;
    walletAddress: string;
    status: string;
    participants?: Participant[];
    participantIds: string[];
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const router = useRouter();
  console.log("selectedParticipants", selectedParticipants);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);


    try {
      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          participantIds: selectedParticipants,
          walletAddress: address,
          date: date,
        }),
      });

      const result = await response.json();

      router.push("/court/meetings");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3 ">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        <Input
          {...register("title", { required: true })}
          className=""
          placeholder="Enter Name"
          required
        />
        <Input
          {...register("description", { required: true })}
          className=""
          placeholder="Enter Email"
          required
        />

        <Input
          className=""
          placeholder="Enter Wallet Address"
          value={address}
          {...register("walletAddress", { required: true })}
        />

        <Input
          {...register("status", { required: true })}
          className=""
          placeholder="Enter Status"
          required
        />

        <div className="flex flex-col gap-3 w-full">
          {participants.map((participant: any) => (
            <div key={participant.id} className="space-x-3">
              <Checkbox
                checked={selectedParticipants.includes(participant.id)}

                onCheckedChange={(checked) => {
                    if (checked) {
                        setSelectedParticipants([...selectedParticipants, participant.id]);
                    } else {
                        setSelectedParticipants(
                        selectedParticipants.filter((id) => id !== participant.id)
                        );
                    }
                }}
               
                value={participant.id}
              />
              <label>{participant?.name}</label>
            </div>
          ))}
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md "
        />
      </div>

      {isLoading ? (
        <Button type="submit" className="bg-primary text-background" disabled>
          <Loader2 className="animate-spin" /> Adding...
        </Button>
      ) : (
        <Button type="submit" className="bg-primary text-background">
          Schedule Hearing
        </Button>
      )}
    </form>
  );
};

export default ScheduleMeetingForm;
