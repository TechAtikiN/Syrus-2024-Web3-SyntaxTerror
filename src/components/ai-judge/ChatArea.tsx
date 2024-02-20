import React from "react";

const ChatArea = () => {
  const messages = [
    {
      id: 1,
      message: "Hello",
      sender: "user",
    },
    {
      id: 2,
      message: "Hi",
      sender: "ai",
    },
    {
      id: 3,
      message: "How are you?",
      sender: "user",
    },
    {
      id: 4,
      message: "I am fine",
      sender: "ai",
    },
    {
      id: 5,
      message: "How can I help you?",
      sender: "ai",
    },
    {
      id: 6,
      message: "I need help with my case",
      sender: "user",
    },
    {
      id: 7,
      message: "What kind of case is it?",
      sender: "ai",
    },
    {
      id: 8,
      message: "It is a criminal case",
      sender: "user",
    },
    {
      id: 9,
      message: "I can help you with that",
      sender: "ai",
    },
  ];

  return (
    <div className="flex-grow-reverse p-3 my-3 h-full space-y-4 scrollbar-w-0 lg:h-[80vh] overflow-y-scroll scrollbar scrollbar-w-0 w-full">
      {messages?.map((message: any, index: number) => (
        <div key={index}>
          <div
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2  ${
                message.sender === "user"
                  ? "bg-primary/20 border border-primary text-primary  rounded-br-2xl rounded-tl-2xl rounded-bl-2xl"
                  : "bg-foreground/10 border border-foreground text-foreground rounded-br-2xl rounded-tr-2xl rounded-bl-2xl"
              }`}
            >
              {message.message}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatArea;
