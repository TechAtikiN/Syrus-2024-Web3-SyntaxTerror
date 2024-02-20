import ChatArea from "@/components/ai-judge/ChatArea";
import ChatInput from "@/components/ai-judge/ChatInput";
import PDFUpload from "@/components/ai-judge/PDFUpload";
import { Button } from "@/components/ui/button"
import { useMessagesStore } from "@/store/messagesStore";
import React, { useState } from "react";

const AIJudge = () => {
  const [fileKey, setFileKey] = useState("");
  const [fileName, setFileName] = useState("")
  const [fileUrl, setFileUrl] = useState("")
  const [prompt, setPrompt] = useState("")

  const [messages, setMessages] = useMessagesStore((state) => [state.messages, state.setMessages])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setMessages([...messages, { sender: 'user', message: prompt }])
    e.preventDefault()
    const response = await fetch('/api/ai-judge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file_key: fileKey,
        file_name: fileName,
        file_url: fileUrl,
        message: prompt
      })
    })

    const data = await response.json()
    setMessages([...messages, { sender: 'AI', message: data.name }])
  }

  return (
    <div className=" justify-between h-[90vh] flex flex-col p-8 items-center w-full">
      {
        !fileUrl ? <PDFUpload setFileKey={setFileKey} setFileName={setFileName} setFileUrl={setFileUrl} />
          : <ChatArea />
      }
      <form onSubmit={handleSubmit} className='w-full flex justify-center items-center space-x-4'>
        <input
          onChange={(e) => {
            setPrompt(e.target.value)
          }}
          type="text"
          placeholder="Type your message here"
          className="w-full form-input py-3 text-base"
        />
        <Button
          variant={'outline'} type='submit'>Submit</Button>
      </form>
      {/* <ChatArea /> */}
    </div>
  );
};

export default AIJudge;
