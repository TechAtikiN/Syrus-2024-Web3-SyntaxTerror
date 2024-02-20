import ChatArea from "@/components/ai-judge/ChatArea";
import ChatInput from "@/components/ai-judge/ChatInput";
import Image from "next/image";
import React from "react";

const AIJudge = () => {
  return (
    <div className=" justify-between h-[85vh] flex flex-col p-8 items-center w-full">
      <div className="space-y-3 w-full">
        <div className="relative h-32 w-full rounded-xl">
          <Image
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L25zMTQ2NTEtaW1hZ2Uta3d2eWQybmIuanBn.jpg"
            alt="AI Judge"
            className="w-full h-full object-cover  rounded-xl"
            unoptimized
            fill
          />

          <h3 className="absolute h-full top-6 w-full text-center justify-center items-center text-5xl font-semibold  text-white dark:text-black ">
            AI Judge
          </h3>
        </div>
      </div>

      {/* <PDFUpload /> */}
      <ChatArea />
      <ChatInput />
    </div>
  );
};

export default AIJudge;
