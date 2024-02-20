import React from 'react'
import { Input } from '../ui/input'

const ChatInput = () => {
  return (
    <div className='w-full '>
        <Input
            type="text"
            placeholder="Type your message here"
            className="w-full mx-auto"
        />

    </div>
  )
}

export default ChatInput