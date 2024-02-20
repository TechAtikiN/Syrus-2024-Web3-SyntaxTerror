import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { GetServerSideProps } from "next";
import ScheduleMeetingForm from "@/components/meetings/ScheduleMeetingForm";
import { useRouter } from "next/router";



const CreateMeetingPage = ({
  participants,
}: {
  participants: Participant[];
}) => {
  type FormData = {
    email: string;
    walletAddress: string;
    name: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const participants = [
      {
        name: data.name,
        email: data.email,
        walletAddress: data.walletAddress,
      },
    ];

    try {
      const response = await fetch("/api/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participants }),
      });

      const result = await response.json();
      router.reload()
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container gap-7">
      <div className="flex items-center gap-2">
        <div className="h-8 w-2 bg-primary rounded-md"></div>
        <h3 className="text-2xl font-semibold uppercase">Add Participants</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3 ">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <Input
            {...register("name", { required: true })}
            className=""
            placeholder="Enter Name"
            required
          />
          <Input
            {...register("email", { required: true })}
            className=""
            placeholder="Enter Email"
            required
          />

          <Input
            className=""
            placeholder="Enter Wallet Address"
            {...register("walletAddress", { required: true })}
            required
          />
        </div>
        {isLoading ? (
          <Button type="submit" className="bg-primary text-background" disabled>
            <Loader2 className="animate-spin" /> Adding...
          </Button>
        ) : (
          <Button type="submit" className="bg-primary text-background">
            Add
          </Button>
        )}
      </form>

      <div className="flex items-center gap-2 mt-3">
        <div className="h-8 w-2 bg-primary rounded-md"></div>
        <h3 className="text-2xl font-semibold uppercase">Schedule Meeting</h3>
      </div>

      <ScheduleMeetingForm participants={participants as Participant[]} />
    </div>
  );
};

export default CreateMeetingPage;

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch("http://localhost:3000/api/participants");
  const participants = await res.json();

  // Pass data to the page via props
  return { props: { participants } };
}) satisfies GetServerSideProps<{ participants: Participant[] }>;
