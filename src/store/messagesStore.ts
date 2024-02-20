import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Message = {
  sender: string
  message: any
}

interface MessageStore {
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

export const useMessagesStore = create<MessageStore>()(
  devtools(
    persist(
      (set) => ({
        messages: [
          {
            sender: 'AI',
            message: 'Hello, I am AI Judge. How can I help you today?',
          },
        ],
        // push new messgae to the messages array
        setMessages: (messages) => set({ messages }),
      }),
      {
        name: 'messages',
      },
    ),
  ),
)