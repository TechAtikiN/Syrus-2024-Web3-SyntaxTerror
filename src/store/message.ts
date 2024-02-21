import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create<{
  message: {
    sender: string;
    message: any;
  }[];
}>()(
  persist(
    (set) => ({
      message: [
        {
          sender: "AI",
          message: "Hello, I am AI Judge. How can I help you today?",
        },
      ],
    }),
    {
      name: "chat",
    }
  )
);
