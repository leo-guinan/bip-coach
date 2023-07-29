import React, { Fragment, Suspense, useEffect, useRef, useState } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import Chat from "../core/components/Chat"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { Dialog, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import AccountData from "../account/components/AccountData"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"
import ChatSession from "./[...session_id]"
import { useCurrentUser } from "../users/hooks/useCurrentUser"
import Default from "../core/components/Default"

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
const Home: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <Suspense fallback="Loading...">
            <>
              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                  {/*  new chat button */}
                  <Default />
                </div>
              </main>
            </>
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

export default Home
