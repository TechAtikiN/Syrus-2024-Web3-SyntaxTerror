import { useChatStore } from "@/store/message";
import { useMessagesStore } from "@/store/messagesStore";
import React from "react";

type Message = {
  sender: string;
  message: string;
};

const DocumentSummary = ({ documentText }: { documentText :string}) => {
  // Split the document text into sections
  const cleanedText = documentText.replace(/\*/g, '');

  const sections = cleanedText.split('\n\n');
  return (
    <div>
    {sections.map((section, index) => (
      <div key={index}>
        {section.includes('*') ? (
          <ul>
            {section.split('* ').map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>{section}</p>
        )}
      </div>
    ))}
  </div>
  );
};


const ChatArea = () => {
  const [messages, setMessages] = useMessagesStore((state) => [
    state.messages,
    state.setMessages,
  ]);

  const chat = useChatStore((state) => state.message);

  return (
    <div className="flex-grow-reverse p-3 my-3 h-full space-y-6 scrollbar-w-0 overflow-y-scroll scrollbar scrollbar-w-0 w-full">
      {chat?.map((message: Message, index: number) => (
        <div key={index}>
          <div
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* show the message by the sender i.e AI or user. Show in a Chat bubble format */}
            <div
              className={`flex flex-col max-w-[80%] p-3  ${
                message.sender === "user"
                  ? "dark:bg-primary/40 bg-primary text-white rounded-tl-2xl rounded-br-2xl rounded-bl-2xl"
                  : "bg-gray-100 dark:bg-gray-800 border rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
              }`}
            >
              <p> {message.sender === "AI" ? <DocumentSummary documentText={message.message} /> : message.message}</p>
              <div className="flex justify-end mt-1 text-xs">
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
