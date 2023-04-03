import React from "react"

const ChatComponent = () => {
  return (
    <div className="flex flex-col h-screen w-full max-w-2xl mx-auto bg-white shadow-md rounded-md">
      {/* Header */}
      <header className="py-4 px-6 bg-indigo-500 text-indigo-100">
        <h3 className="font-bold text-xl">React Chat App</h3>
      </header>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-8">
          <span className="inline-block mb-1 font-bold">Username1:</span>
          <p className="text-sm">Hi, how are you?</p>
        </div>
        <div className="mb-8">
          <span className="inline-block mb-1 font-bold">Username2:</span>
          <p className="text-sm">I&nbsp;m good, thanks! How about you?</p>
        </div>
      </div>

      {/* Input */}
      <footer className="py-4 px-6">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 py-2 px-4 mr-6 rounded-md border"
            placeholder="Type your message"
          />
          <button className="bg-indigo-500 hover:bg-indigo-600 text-indigo-100 py-2 px-6 font-bold rounded-md">
            Send
          </button>
        </div>
      </footer>
    </div>
  )
}
export default ChatComponent
