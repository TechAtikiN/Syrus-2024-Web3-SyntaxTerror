import ChatArea from "@/components/ai-judge/ChatArea";
import ChatInput from "@/components/ai-judge/ChatInput";
import PDFUpload from "@/components/ai-judge/PDFUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const AIJudge = () => {
  const [fileKey, setFileKey] = useState("");
  const [fileName, setFileName] = useState("")
  const [fileUrl, setFileUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch('/api/ai-judge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file_key: fileKey,
        file_name: fileName,
        file_url: fileUrl
      })
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <div className=" justify-between h-[90vh] flex flex-col p-8 items-center w-full">
      <div className="space-y-3 w-full">
        <div className="relative h-32 w-full rounded-xl">
          {/* <Image
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L25zMTQ2NTEtaW1hZ2Uta3d2eWQybmIuanBn.jpg"
            alt="AI Judge"
            className="w-full h-full object-cover  rounded-xl"
            unoptimized
            fill
          /> */}

          {/* <h3 className="absolute h-full top-6 w-full text-center justify-center items-center text-5xl font-semibold  text-white dark:text-black ">
            AI Judge
          </h3> */}
        </div>
      </div>

      <PDFUpload
        setFileKey={setFileKey}
        setFileName={setFileName}
        setFileUrl={setFileUrl}
      />
      {/* <ChatArea /> */}
      <form onSubmit={handleSubmit} className='w-full flex justify-center items-center space-x-4'>
        <input
          type="text"
          placeholder="Type your message here"
          className="w-full form-input py-3 text-base"
        />
        <Button variant={'outline'} type='submit'>Submit</Button>
      </form>
    </div>
  );
};

export default AIJudge;
