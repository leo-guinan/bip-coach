import React, { Suspense, useEffect, useRef, useState } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import Chat from "../core/components/Chat"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import updateChatSession from "../chat/mutations/updateChatSession"

let socket

type Message = {
  source: "human" | "bot"
  message: string
}

interface ChatMessage {
  message: string
  id: number
  source: "human" | "bot"
}

const ChatSession: BlitzPage = () => {
  const client = useRef<W3CWebSocket>(null)
  const router = useRouter()
  console.log(router.query)
  const sessionId = router?.query?.session_id
    ? (router.query.session_id[0] as unknown as string)
    : ""
  console.log(sessionId)
  const [chat, setChat] = useState<ChatMessage[]>([
    { message: "How can I help you?", id: 1, source: "bot" },
  ])
  const [newMessage, setNewMessage] = useState<Message>({ message: "", source: "human" })

  const [updateChatSessionMutation] = useMutation(updateChatSession)

  useEffect(() => {
    console.log("newMessage", newMessage)
    if (newMessage.message === "") return
    setChat((c) => [
      ...c.filter((value) => value.id !== -1),
      {
        message: newMessage.message,
        id: Math.floor(Math.random() * 1000),
        source: newMessage.source,
      },
    ])
    setNewMessage({ message: "", source: "human" })
  }, [newMessage])

  useEffect(() => {
    if (!router.isReady) return
    void updateChatSessionMutation({ sessionId })

    const connectSocket = () => {
      // client.current = new W3CWebSocket(`${sessionId}/`)
      client.current = new W3CWebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}${sessionId}/`)

      client.current.onopen = () => {
        console.log("WebSocket Client Connected")
      }

      client.current.onmessage = (message: MessageEvent) => {
        console.log("message", message)
        const data = JSON.parse(message.data)
        setNewMessage({ message: data.message, source: "bot" })
      }

      client.current.onclose = (event: CloseEvent) => {
        console.log(`WebSocket closed with code ${event.code}`)
        setTimeout(() => {
          console.log("Reconnecting...")
          connectSocket()
        }, 5000) // retries after 5 seconds.
      }

      client.current.onerror = (error: ErrorEvent) => {
        console.log(`WebSocket Error: ${error.message}`)
      }
    }

    void updateChatSessionMutation({ sessionId })
    connectSocket()
  }, [router, sessionId])

  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <Chat client={client} chat={chat} setChat={setChat} />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

export default ChatSession
