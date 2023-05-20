import React, { useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import sendMessage from "../../chat/mutations/sendMessage"
import user from "/public/user.png"
import Image from "next/image"
interface ChatMessage {
  speaker: string
  message: string
}
const ChatWidget = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("") // "message"
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { speaker: "AI", message: "How can I help you?" },
  ]) //
  const [sendMessageMutation] = useMutation(sendMessage) // [{user: "user", message: "message"}
  const toggleWidgetOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = async () => {
    setLoading(true)
    try {
      setChatHistory([...chatHistory, { message: message, speaker: "human" }])
      const response = await sendMessageMutation({ slug, message, history: chatHistory })
      setChatHistory([...chatHistory, { message: response.message, speaker: "AI" }])
      setMessage("")
    } catch (error) {
      console.error(error)
      setChatHistory([
        ...chatHistory,
        { speaker: "AI", message: "There was an error with your message. Please try again." },
      ])
    }
    setLoading(false)
  }

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen && (
        <div className="bg-white shadow-lg max-w-md p-4 mx-auto rounded-lg">
          {chatHistory.map((chat, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-none">
                {chat.speaker === "AI" && (
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://robohash.org/2603:6010:b000:ba40::1009.png"
                  />
                )}
                {chat.speaker === "human" && (
                  <Image className="w-10 h-10 rounded-full" src={user} alt="User Avatar" />
                )}
              </div>
              <div className="ml-3">
                <div
                  className="bg-blue-600 p-3 rounded-r-lg rounded-t-lg
                   text-white"
                >
                  {chat["message"]}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <input
              className="p-2 border border-gray-300
                 w-full rounded-md"
              placeholder="Type your message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              disabled={loading}
              onKeyPress={async (e) => {
                if (e.key === "Enter") {
                  await handleSendMessage()
                }
              }}
            />
          </div>
        </div>
      )}
      <div
        className="bg-blue-600 text-white w-14 h-14
           flex items-center justify-center rounded-full
           cursor-pointer"
        onClick={toggleWidgetOpen}
      >
        <div
          className={"transform transition-transform duration-200 " + (isOpen ? "rotate-45" : "")}
        >
          &#x2B; {/* Plus sign character */}
        </div>
      </div>
    </div>
  )
}

export default ChatWidget
