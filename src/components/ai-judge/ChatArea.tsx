
import { useMessagesStore } from "@/store/messagesStore";
import React from "react";

type Message = {
  sender: string;
  message: string;
};

const ChatArea = () => {
  const [messages, setMessages] = useMessagesStore((state) => [state.messages, state.setMessages])

  return (
    <div className="flex-grow-reverse p-3 my-3 h-full space-y-6 scrollbar-w-0 overflow-y-scroll scrollbar scrollbar-w-0 w-full">
      {messages?.map((message: Message, index: number) => (
        <div key={index}>
          <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
            }`}>

            {/* show the message by the sender i.e AI or user. Show in a Chat bubble format */}
            <div className={`flex flex-col max-w-[80%] p-3 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}>
              <p>{message.message}</p>
              <div className="flex justify-end mt-2 text-xs">
                <p>{message.sender}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatArea;
