import React, { Suspense, useEffect, useRef, useState } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import Chat from "../../core/components/Chat"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import updateChatSession from "../../chat/mutations/updateChatSession"
import { v4 as uuidv4 } from "uuid"
import StartSession from "../../chat/components/StartSession"

let socket

type Message = {
  source: "human" | "bot"
  message: string
  id: number
}

interface ChatMessage {
  message: string
  id: number
  source: "human" | "bot"
}

const DailyOkPage: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <StartSession chatType="daily_ok" />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

export default DailyOkPage
