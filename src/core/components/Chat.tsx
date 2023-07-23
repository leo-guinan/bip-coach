import React, { useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import sendMessage from "../../chat/mutations/sendMessage"
import ReactMarkdown from "react-markdown"
import { useCurrentUser } from "../../users/hooks/useCurrentUser"

interface ChatMessage {
  message: string
  id: number
  source: "human" | "bot"
}

const Chat = () => {
  const currentUser = useCurrentUser()
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<ChatMessage[]>([])

  const [sendMessageMutation] = useMutation(sendMessage)

  const handleSendMessage = async (event) => {
    event.preventDefault()
    setChat([...chat, { message, id: Math.floor(Math.random() * 1000), source: "human" }])
    const response = await sendMessageMutation({ message })
    setChat([
      ...chat,
      { message, id: Math.floor(Math.random() * 1000), source: "human" },
      { message: response.message, id: Math.floor(Math.random() * 1000), source: "bot" },
    ])
    // setChat([...chat, { message, id: Math.floor(Math.random() * 1000), source: "human" }, {
    //   message: "Message Received",
    //   id: Math.floor(Math.random() * 1000),
    //   source: "bot"
    // }])
    setMessage("")
  }

  return (
    <div className="flex flex-col h-screen bg-gray-800">
      {currentUser && (
        <>
          <div className="overflow-auto w-full h-full p-5 mb-10">
            {chat.map(({ message, id, source }) => (
              <>
                {source === "human" ? (
                  <div key={id} className="my-3 bg-gray-300 rounded p-3 text-sm w-3/4">
                    {message}
                  </div>
                ) : (
                  <div
                    key={id}
                    className="my-3 bg-gray-700 rounded p-3 text-sm text-white  flex-row-reverse w-3/4"
                  >
                    <ReactMarkdown>{message}</ReactMarkdown>
                  </div>
                )}
              </>
            ))}
          </div>

          <div className="fixed w-full bottom-0">
            <form onSubmit={handleSendMessage}>
              <input
                className="w-full h-8 px-3 rounded mb-0 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 "
                value={message}
                placeholder="Type your message here..."
                onChange={(e) => setMessage(e.target.value)}
              />

              <button className="hidden" type="submit">
                Send
              </button>
            </form>
          </div>
        </>
      )}
      {!currentUser && (
        <>
          {/*login or signup buttons*/}
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold">Build In Public Coach</h1>
            <p className="text-xl">Login or Signup to start chatting</p>
            <div className="flex gap-4 mt-4">
              <a
                href="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Signup
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Chat
